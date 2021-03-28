import * as actionTypes from './actionTypes'

const initialState = {
  error: null,
  loading: false,
  postsMap: {}
}

const addNewPost = (state, action) => {
  const posts = state.postsMap
  return {
    ...state,
    postsMap: { ...action.post, ...posts }
  }
}

const fetchNewsfeedStart = (state, action) => {
  return {
    ...state,
    loading: true,
    error: null
  }
}

const fetchNewsfeedSuccess = (state, action) => {
  const posts = state.postsMap
  return {
    ...state,
    loading: false,
    error: null,
    postsMap: { ...posts, ...action.postsMap }
  }
}

const fetchNewsfeedFail = (state, action) => {
  return {
    ...state,
    error: action.error,
    loading: false
  }
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_NEWSFEED_START: return fetchNewsfeedStart(state, action)
    case actionTypes.FETCH_NEWSFEED_FAIL: return fetchNewsfeedFail(state, action)
    case actionTypes.FETCH_NEWSFEED_SUCCESS: return fetchNewsfeedSuccess(state, action)
    case actionTypes.ADD_NEW_POST: return addNewPost(state, action)
    default: return state
  }
}

export default reducer
