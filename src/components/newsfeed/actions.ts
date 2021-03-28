import * as actionTypes from './actionTypes'
import axios from '../../axios/axios'
import { getHeaders } from '../../utils/util'
import cuid from 'cuid'

export const fetchNewsfeedStart = () => {
  return {
    type: actionTypes.FETCH_NEWSFEED_START
  }
}

export const fetchNewsfeedFail = error => {
  return {
    type: actionTypes.FETCH_NEWSFEED_FAIL,
    error: error
  }
}

export const fetchNewsfeedSuccess = posts => {
  return {
    type: actionTypes.FETCH_NEWSFEED_SUCCESS,
    postsMap: posts
  }
}

export const addNewPost = post => {
  return {
    type: actionTypes.ADD_NEW_POST,
    post: post
  }
}

export const fetchNewsfeed = () => {
  return async dispatch => {
    try {
      dispatch(fetchNewsfeedStart())
      const { data: { success, error, posts, message, after } } = await axios.get('/newsfeed', { headers: getHeaders() })
      // TODO: refactor
      const postsMap = new Map()
      success && posts && posts.forEach(post => {
        postsMap[post.id] = post
      })
      localStorage.setItem('newsfeed_after', after)
      success && posts && dispatch(fetchNewsfeedSuccess(postsMap))
      error && dispatch(fetchNewsfeedFail(message))
    } catch (e) {
      console.log(e)
      dispatch(fetchNewsfeedFail(e.message))
    }
  }
}

export const fetchNewsfeedMore = () => {
  return async dispatch => {
    try {
      const since = localStorage.getItem('newsfeed_after') || process.env.DEFAULT_AFTER
      const limit = process.env.DEFAULT_LIMIT || 5
      const { data: { success, posts, error, message, after } } = await axios.get(`/newsfeed?after=${since}&limit=${limit}`, { headers: getHeaders() })
      const postsMap = new Map()
      success && posts && posts.forEach(post => {
        postsMap[post.id] = post
      })
      localStorage.setItem('newsfeed_after', after)
      dispatch(fetchNewsfeedSuccess(postsMap))
      error && dispatch(fetchNewsfeedFail(message))
    } catch (e) {
      console.log(e)
      dispatch(fetchNewsfeedFail(e.message))
    }
  }
}

export const addPost = ({ title, body, photos, uid, name, pp }) => {
  return async dispatch => {
    // TODO: move to constructor
    const id = cuid()
    const post = {
      [id]: {
        creatorId: uid,
        id: id,
        creatorName: name,
        title: title,
        body: body,
        photos: photos
      }
    }
    await axios.post('/newsfeed/createPost', { post: { creatorId: uid, title: title, body: body, photos: photos } }, { headers: getHeaders() })
    dispatch(addNewPost(post))
  }
}
