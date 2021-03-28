import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { useParams, useLocation, Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { IonGrid, IonRow, IonCol, IonRefresher, IonRefresherContent, IonText, IonIcon, IonButton, IonAvatar, IonLabel, IonItem, IonPage, IonHeader, IonButtons, IonToolbar, IonInput, IonToast, IonContent, IonList, IonInfiniteScroll, IonInfiniteScrollContent, IonAlert } from '@ionic/react'
import TimeAgo from 'timeago-react'
import classes from './style.module.css'
import { heart, heartOutline, shareOutline, arrowBack } from 'ionicons/icons'
import Comment from './comment/template'
import InlineLoader from '../../loader/template'
import axios from '../../../axios/axios'
import { getHeaders } from '../../../utils/util'
import Media from '../../media/template'

const NewsfeedPost = props => {
  const location = useLocation()
  const [liked, setLiked] = useState(false)
  const [loading, setLoading] = useState(false)
  const [comments, setComments] = useState([])
  const selectedPostId = useParams<{ postId: string }>().postId
  const post = props.posts[selectedPostId]
  const [ppUri, setPpUri] = useState(null)
  const [showToast, setShowToast] = useState(false)
  const [since, setSince] = useState(null)
  const [error, setError] = useState(null)
  const [comment, setComment] = useState('')

  useEffect(() => {
    const query = new URLSearchParams(location?.search)
    query.forEach((v, k) => {
      setPpUri(v)
    })
    return () => {}
  }, [])

  useEffect(() => {
    (async () => {
      setLoading(true)
      let response
      const limit = process.env.REACT_APP_DEFAULT_LIMIT
      const paginateParams = since ? `after=${since}&limit=${limit}` : ''
      try {
        response = await axios.get(`/newsfeed/comments?postId=${selectedPostId}&${paginateParams}`, { headers: getHeaders() })
      } catch (e) {
        console.log(e)
        e && setError(e)
        e && setLoading(false)
      }
      if (response) {
        const { data: { comments: res } } = response
        setComments(res)
        setLoading(false)
      }
    })()
  }, [])

  const likePostHandler = async e => {
    e.preventDefault()
    setLiked(liked => !liked)
    let response
    try {
      response = await axios.post('/newsfeed/likes', { postId: selectedPostId }, { headers: getHeaders() })
    } catch (e) {
      console.log(e)
      setLiked(liked => !liked)
    }
    const { data: { error, message } } = response
    error && setLiked(liked => !liked)
    error && setError(message)
  }

  const loadComments = async event => {
    const limit = process.env.REACT_APP_DEFAULT_LIMIT || 5
    const paginateParams = since ? `after=${since}&limit=${limit}` : ''
    let response
    try {
      response = await axios.get(`/newsfeed/comments?postId=${selectedPostId}&${paginateParams}`, { headers: getHeaders() })
    } catch (e) {
      console.log(e)
      e && setError(e)
      e && setLoading(false)
    }
    if (response) {
      const { data: { success, error, comments: res, message, after } } = response
      success && setComments(comments.concat(res))
      success && setLoading(false)
      error && setError(message)
      after && setSince(after)
      event.target.complete()
      if (comments.length === 100) {
        event.target.disabled = true
      }
    }
  }

  const commentPostHandler = async e => {
    e.preventDefault()
    const obj = {
      commentorName: 'You',
      ppStoragePath: props.pp,
      comment: comment,
      postId: selectedPostId
    }
    setComments(comments.concat([obj]))
    setComment('')
    try {
      await axios.post('/newsfeed/comment', { comment: obj }, { headers: getHeaders() })
    } catch (e) {
      console.log(e)
    }
  }

  /**
   * Check if submission is allowed.
   */
  const allowSubmission = () => comment == null || comment === ''

  return (
    <IonPage>
        <IonGrid style={{ marginBottom: '6rem' }} className="ion-no-margin ion-no-padding">
          <IonHeader>
            <IonToolbar>
              <IonButtons className="ion-no-margin" slot="start">
                <IonButton slot="icon-only">
                  <Link to="/newsfeed">
                    <IonIcon icon={arrowBack} slot="center" />
                  </Link>
                </IonButton>
              </IonButtons>
            </IonToolbar>
          </IonHeader>
          <IonContent>
          <IonGrid className={[classes.Post, 'ion-no-border'].join(' ')}>
            <IonRow>
              <IonCol size="8">
                <IonItem>
                  <IonAvatar className="ion-no-border" slot="start">
                    <img src={ppUri} />
                  </IonAvatar>
                  <IonLabel>
                    <h3 className={classes.Username}>{post.creatorName}</h3>
                    <p> {<TimeAgo datetime={post?.createdTime} />}</p>
                  </IonLabel>
                </IonItem>
              </IonCol>
              <IonCol size="4" className={classes.FollowCtr}>
                <IonButton onClick={(e) => { e.preventDefault(); setShowToast(true) }} className={classes.FollowBtn} fill="solid" size="small" expand="block" color="primary"> <p className={classes.FollowText}><strong>FOLLOW</strong></p> </IonButton>
              </IonCol>
            </IonRow>
            <IonRow>
            </IonRow>
            <IonRow className="ion-text-center">
              <IonCol className="ion-no-margin" size="12">
                <Media photos={post.photos}/>
              </IonCol>
            </IonRow>
            <IonRow className={classes.PostContent}>
              <IonCol size="12">
                <IonLabel>
                  <IonText color="dark"><h3 className={classes.Title}>{post.title}</h3></IonText>
                  <p className={[classes.Description, 'ion-margin-top'].join(' ')}>{post.body}</p>
                </IonLabel>
              </IonCol>
            </IonRow>
            <IonRow>
              <IonCol className={[classes.StatsCtr, 'ion-text-start'].join(' ')} size="8">
                <IonLabel>
                  <p className={classes.Stats}><strong>{post.likes_count}</strong> likes | <strong>{post.comments_count}</strong> comments</p>
                </IonLabel>
              </IonCol>
            </IonRow>
            <IonRow className={[classes.Ctrls, 'ion-margin-top'].join(' ')}>
              <IonCol className="ion-no-padding ion-text-start" size="1">
                <IonButton onClick={likePostHandler} fill="clear" size="small" color="medium"><IonIcon color={liked ? 'danger' : '' } style={{ fontSize: '25px' }} slot="start" icon={liked ? heart : heartOutline}/></IonButton>
              </IonCol>
              <IonCol className="ion-no-padding ion-text-end" size="1">
                <IonButton onClick={(e) => { e.preventDefault(); setShowToast(true) }} fill="clear" size="small" color="medium"><IonIcon style={{ fontSize: '25px' }} slot="start" icon={shareOutline}/></IonButton>
              </IonCol>
            </IonRow>
          </IonGrid>
          {/* comments */}
          <IonGrid>
            <IonRow>
              <IonCol className="" size="12">
                <IonItem className={classes.CommentCtr}>
                  <IonInput placeholder="Your comment" value={comment} onIonChange={(e) => setComment(e.detail.value as any)} className="" />
                  <IonButton disabled={allowSubmission()} onClick={commentPostHandler} fill="clear">
                    COMMENT
                  </IonButton>
                </IonItem>
              </IonCol>
            </IonRow>
          </IonGrid>
          <IonGrid className="ion-no-margin">
            <IonRow>
              <IonCol>
                <IonLabel className="ion-text-start" color="dark"><p className={classes.CommentsHeading}>Comments ({ comments.length ?? 0 })</p></IonLabel>
              </IonCol>
            </IonRow>
            {/* <IonContent> */}
              <IonRefresher className="ion-margin-top" slot="fixed" onIonRefresh={loadComments}>
                <IonRefresherContent
                  refreshingSpinner="circles">
                </IonRefresherContent>
              </IonRefresher>
              <IonList>
                {
                  loading
                    ? <div className={classes.Loader}><InlineLoader /><p className="ion-no-margin" >Fetching comments...</p></div>
                    : comments.map((comment, i) => (
                        <Comment { ...comment } key={i}/>))
                }
              </IonList>
              <IonInfiniteScroll
                onIonInfinite={async event => await loadComments(event)}
              >
                <IonInfiniteScrollContent
                  loadingSpinner="bubbles"
                  loadingText="Loading more comments..."
                >
                </IonInfiniteScrollContent>
              </IonInfiniteScroll>
            {/* </IonContent> */}
          </IonGrid>
          </IonContent>
        </IonGrid>
        <IonToast
          isOpen={showToast}
          onDidDismiss={() => setShowToast(false)}
          message="Not supported in proof of concept."
          duration={200}
        />
        <IonAlert
          isOpen={!!error}
          onDidDismiss={() => setError(null)}
          // header={'Filmy Profiles'}
          subHeader={'Error fetching comments!'}
          message={error}
          buttons={['OK']}
        />
    </IonPage>
  )
}

NewsfeedPost.propTypes = {
  posts: PropTypes.object.isRequired,
  pp: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired
}

const mapStateToProps = state => {
  return {
    posts: state.newsfeed.postsMap,
    name: state.auth.name,
    pp: state.auth.pp
  }
}

const mapDispatchToProps = dispatch => {
  return {

  }
}

export default connect(mapStateToProps, mapDispatchToProps)(NewsfeedPost)
