import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { IonModal, IonThumbnail, IonHeader, IonTitle, IonButtons, IonIcon, IonToolbar, IonContent, IonButton } from '@ionic/react'
import { arrowBack, addOutline } from 'ionicons/icons'
import classes from './style.module.css'
import axios from '../../../../axios/axios'
import { CATEGORIES } from '../../../../utils/util'

const EditPhotos = props => {
  const [, setPhotos] = useState([])

  useEffect(() => {
    (async () => {
      const userId = localStorage.getItem('userId')
      const { data: { photos, success } } = await axios.get(`/photos/${userId}`)
      success && setPhotos(photos)
    })()
    return () => {
      // cleanup
    }
  }, [])

  const addPhotoHandler = async e => {
    e.preventDefault()
  }

  return (
    <IonModal isOpen={props.show}>
      <IonHeader>
        <IonToolbar className={classes.Toolbar}>
          <IonButtons slot="start">
            <IonButton onClick={props.close} slot="icon-only">
              <IonIcon icon={arrowBack} slot="start" />
            </IonButton>
          </IonButtons>
          <IonButtons slot="end">
            <IonButton onClick={(e) => addPhotoHandler(e)} slot="icon-only">
              <IonIcon icon={addOutline} slot="start" />
            </IonButton>
          </IonButtons>
          <IonTitle>
            <h3 color="dark" className={classes.Heading}>Edit Photos</h3>
          </IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        {Object.keys(CATEGORIES).map((category, i) => (
          <div onClick={() => {}} className={classes.ThumbnailContainer} key={i} >
            <IonThumbnail className={classes.Thumbnail}>
              <img className={classes.ThumbnailImage} src={CATEGORIES[category].imgSrc} />
            </IonThumbnail>
          </div>
        ))}
      </IonContent>
    </IonModal>
  )
}

EditPhotos.propTypes = {
  show: PropTypes.bool.isRequired,
  close: PropTypes.func.isRequired
}

export default EditPhotos
