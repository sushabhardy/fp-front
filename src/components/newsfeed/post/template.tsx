import React, { useEffect, useRef, useState } from 'react'
import { IonAlert, IonAvatar, IonButton, IonCol, IonGrid, IonIcon, IonItem, IonLabel, IonRow, IonText } from '@ionic/react'
import { heartOutline, heart, chatbubbleEllipsesOutline, shareOutline } from 'ionicons/icons'
import classes from './style.module.css'
import PropTypes from 'prop-types'
import TimeAgo from 'timeago-react'
// import { database, storage } from '../../../data-access/db'
import PP_PLACE_HOLDER from '../../../images/pp.png'
import { useHistory } from 'react-router'
// import { SAMPLE_IMAGES } from '../../feed'
import Media from '../../media/template'
import axios from '../../../axios/axios'
import { getHeaders } from '../../../utils/util'

const Post = props => {
  const [ppUri] = useState(PP_PLACE_HOLDER)
  const [liked, setLiked] = useState(props.post.isLiked)
  const history = useHistory()
  const isMountedRef = useRef(null)
  const [error, setError] = useState(null)

  useEffect(() => {
    isMountedRef.current = true
    // ;(async () => {
    //   const pp = (await database.ref('users/basic_data/' + props.post.creator_uid + '/pp_storage_path').once('value')).val()
    //   pp && storage
    //     .ref(pp)
    //     .getDownloadURL()
    //     .then(url => {
    //       isMountedRef.current && setPpUri(url)
    //     })
    // })()
    return () => {
      isMountedRef.current = false
    }
  }, [props.post.creator_uid])

  const likePostHandler = async (e) => {
    e.preventDefault()
    setLiked(liked => !liked)
    let response
    try {
      response = await axios.post('/newsfeed/likes', { postId: props.post.id }, { headers: getHeaders() })
    } catch (e) {
      console.log(e)
      setLiked(liked => !liked)
    }
    const { data: { error, message } } = response
    error && setLiked(liked => !liked)
    error && setError(message)
  }

  const gotoPostHandler = (e) => {
    e.preventDefault()
    const queryParams = [
      'pp=' + encodeURIComponent(ppUri)
    ]
    history.push({
      pathname: `/newsfeed/${props.post?.id}`,
      search: queryParams.join('&')
    })
  }

  return (
    <IonGrid className={[classes.Post, 'ion-no-border'].join(' ')}>
      <IonRow>
        <IonCol size="12">
          <IonItem>
            <IonAvatar className="ion-no-border" slot="start">
              <img src={props.post.ppSrc} />
            </IonAvatar>
            <IonLabel>
              <h3 className={classes.Username}>{props.post.creatorName}</h3>
              <p> {<TimeAgo datetime={props.post?.createdTime} />}</p>
            </IonLabel>
          </IonItem>
        </IonCol>
      </IonRow>
      <IonRow>
      </IonRow>
      <IonRow className="ion-text-center">
        <IonCol className="ion-no-margin" size="12">
          <Media photos={props.post.photos}/>
        </IonCol>
      </IonRow>
      <IonRow className={classes.PostContent}>
        <IonCol size="12">
          <IonLabel>
            <IonText color="dark"><h3 className={classes.Title}>{props.post.title}</h3></IonText>
            <p className={[classes.Description, 'ion-margin-top'].join(' ')}>{props.post.body}</p>
          </IonLabel>
        </IonCol>
      </IonRow>
      <IonRow>
        <IonCol className={[classes.StatsCtr, 'ion-text-start'].join(' ')} size="8">
          <IonLabel>
            <p className={classes.Stats}><strong>{props.post.likes_count || 0}</strong> likes | <strong>{props.post.comments_count || 0}</strong> comments</p>
          </IonLabel>
        </IonCol>
        <IonCol className={[classes.ReadMore, 'ion-text-start'].join(' ')} size="4">
          <IonLabel color="primary">
            <p onClick={gotoPostHandler} style={{ fontSize: '12px' }} className={classes.ReadMoreText}>READ MORE</p>
          </IonLabel>
        </IonCol>
      </IonRow>
      <IonRow className={[classes.Ctrls, 'ion-margin-top'].join(' ')}>
        <IonCol className="ion-no-padding ion-text-start" size="4">
          <IonButton onClick={likePostHandler} fill="clear" size="small" color="dark"><IonIcon slot="start" color={liked ? 'danger' : ''} icon={liked ? heart : heartOutline}/><p className={classes.Ctrl}>Like</p></IonButton>
        </IonCol>
        <IonCol className="ion-no-padding ion-text-center" size="4">
          <IonButton onClick={gotoPostHandler} fill="clear" size="small" color="dark"><IonIcon slot="start" icon={chatbubbleEllipsesOutline}/><p className={classes.Ctrl}>Comment</p></IonButton>
        </IonCol>
        <IonCol className="ion-no-padding ion-text-end" size="4">
          <IonButton fill="clear" size="small" color="dark"><IonIcon slot="start" icon={shareOutline}/><p className={classes.Ctrl}>Share</p></IonButton>
        </IonCol>
      </IonRow>
      <IonAlert
          isOpen={!!error}
          onDidDismiss={() => setError(null)}
          // header={'Filmy Profiles'}
          subHeader={'Error fetching comments!'}
          message={error}
          buttons={['OK']}
        />
    </IonGrid>
  )
}

Post.propTypes = {
  post: PropTypes.any
}

export default Post
