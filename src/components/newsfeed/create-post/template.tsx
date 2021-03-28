import { IonModal, IonPage, IonLoading, IonHeader, IonTitle, IonButtons, IonToolbar, IonContent, IonGrid, IonRow, IonCol, IonInput, IonItem, IonLabel, IonTextarea, IonButton, IonIcon, IonAvatar, IonToast } from '@ionic/react'
import React, { useState } from 'react'
import PropTypes from 'prop-types'
import classes from './style.module.css'
import { linkOutline, cameraOutline, micOutline, brushOutline, newspaperOutline, arrowBack } from 'ionicons/icons'
import { Plugins, CameraResultType, CameraSource } from '@capacitor/core'
import PP_PLACE_HOLDER from '../../../images/pp.png'
import TimeAgo from 'timeago-react'
import { connect } from 'react-redux'
import { addPost } from '../actions'
import { Link } from 'react-router-dom'
import Media from '../../media/template'
import { uploadPhotos } from '../../../firebase'
import { useHistory } from 'react-router'

const CreatePost = props => {
  const history = useHistory()
  const [photos, setPhotos] = useState([])
  const [title, setTitle] = useState('')
  const [desc, setDesc] = useState('')
  const { Camera } = Plugins
  const [showToast, setShowToast] = useState(false)
  const [uploading, setUploading] = useState(false)

  const addPhotosHandler = async (e) => {
    e.preventDefault()
    const photo = await Camera.getPhoto({
      resultType: CameraResultType.DataUrl,
      source: CameraSource.Prompt,
      quality: 80,
      width: 500
    })
    console.log(photo)
    if (!photo || !photo.dataUrl) {
      return
    }
    const pic = { src: photo.dataUrl }
    setPhotos(photos.concat([pic]))
  }

  const addPostHandler = async (e) => {
    e.preventDefault()
    setUploading(true)
    const userId = localStorage.getItem('userId')
    const downloadURLs = await uploadPhotos(photos, `ionic/${userId}/photos`)
    const pics = downloadURLs.map(url => { return { src: url } })
    await props.addPost({
      title: title,
      body: desc,
      photos: pics,
      uid: props.uid,
      name: props.name,
      pp: props.pp
    })
    setUploading(false)
    history.push('/newsfeed')
  }

  /**
   * Check if submission is allowed.
   */
  const allowSubmission = () => !title || !desc

  return (
    <IonPage>
      <IonModal isOpen={props.show}>
        <IonHeader>
          <IonToolbar className={classes.Toolbar}>
            <IonButtons className="ion-no-margin" slot="start">
              <IonButton slot="icon-only">
                <Link to="/newsfeed">
                  <IonIcon icon={arrowBack} slot="center" />
                </Link>
              </IonButton>
            </IonButtons>
            <IonTitle>
              <h3 color="dark" className={classes.Heading}>Write Post</h3>
            </IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent>
          <IonGrid>
            <IonRow>
              <IonCol>
                <IonItem>
                  <IonAvatar className="ion-no-border" slot="start">
                    <img src={props.pp || PP_PLACE_HOLDER} />
                  </IonAvatar>
                  <IonLabel>
                    <h3 className={classes.Username}>{props.name}</h3>
                    <p> {<TimeAgo datetime={null} />}</p>
                  </IonLabel>
                </IonItem>
              </IonCol>
            </IonRow>
            <IonRow>
              <IonCol>
                <IonItem>
                  <IonLabel className="ion-margin-horizontal" position="floating"><IonIcon slot="start" color="medium" icon={brushOutline} />&nbsp;</IonLabel>
                  <IonInput value={title} onIonChange={(e) => setTitle(e.detail.value as any)} type="text" />
                </IonItem>
              </IonCol>
            </IonRow>
            <IonRow>
              <IonCol>
                <IonItem>
                  <IonLabel position="floating"><IonIcon slot="start" color="medium" icon={newspaperOutline} />&nbsp;</IonLabel>
                  <IonTextarea value={desc} onIonChange={(e) => setDesc(e.detail.value as any)} />
                </IonItem>
              </IonCol>
            </IonRow>
            <IonRow className="ion-text-center">
              <IonCol className="ion-no-margin" size="12">
                {photos && <Media photos={photos} />}
              </IonCol>
            </IonRow>
            <IonRow className={[classes.MediaBtnsCtr].join(' ')}>
              <IonCol className="ion-no-padding" size="4">
                <IonButton onClick={(e) => { e.preventDefault(); setShowToast(true) }} className="ion-no-margin" fill="clear" expand="block">
                  <IonIcon color="primary" slot="start" icon={linkOutline} />
                  <IonLabel className={classes.MediaBtn}>Link</IonLabel>
                </IonButton>
              </IonCol>
              <IonCol className="ion-no-padding" size="4">
                <IonButton onClick={addPhotosHandler} className="ion-no-margin" fill="clear" expand="block">
                  <IonIcon color="success" slot="start" icon={cameraOutline} />
                  <IonLabel className={classes.MediaBtn}>Photos</IonLabel>
                </IonButton>
              </IonCol>
              <IonCol className="ion-no-padding" size="4">
                <IonButton onClick={(e) => { e.preventDefault(); setShowToast(true) }} className="ion-no-margin" fill="clear" expand="block">
                  <IonIcon color="danger" slot="start" icon={micOutline} />
                  <IonLabel className={classes.MediaBtn}>Audio</IonLabel>
                </IonButton>
              </IonCol>
            </IonRow>
            <IonRow>
              <IonCol>
                <IonButton disabled={allowSubmission()} onClick={addPostHandler} expand="full">
                  <IonLabel>POST</IonLabel>
                </IonButton>
              </IonCol>
            </IonRow>
          </IonGrid>
        </IonContent>
      </IonModal>
      <IonToast
        isOpen={showToast}
        onDidDismiss={() => setShowToast(false)}
        message="Not supported in proof of concept."
        duration={7000}
      />
      <IonLoading
        isOpen={uploading}
        message={'Please wait...'}
      />
    </IonPage>
  )
}

CreatePost.propTypes = {
  show: PropTypes.bool,
  pp: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  uid: PropTypes.string.isRequired,
  addPost: PropTypes.func.isRequired,
  history: PropTypes.any,
  redirectTo: PropTypes.string
}

CreatePost.defaultProps = {
  show: true
}

const mapStateToProps = state => {
  return {
    name: state.auth?.name,
    pp: state.auth?.pp,
    uid: state.auth?.uid,
    redirectTo: state.newsfeed?.redirectTo
  }
}

const mapDispatchToProps = dispatch => {
  return {
    addPost: ({ title, body, photos, uid, name, pp }) => dispatch(addPost({ title, body, photos, uid, name, pp }))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CreatePost)
