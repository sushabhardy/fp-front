import React from 'react'
import PropTypes from 'prop-types'
import { IonModal, IonContent, IonItem, IonLabel, IonInput, IonButtons, IonButton, IonIcon, IonTitle, IonHeader, IonToolbar, IonList } from '@ionic/react'
import { arrowBack } from 'ionicons/icons'
import classes from './style.module.css'

const EditAbout = props => {
  return (
    <IonModal isOpen={props.show}>
    <IonHeader>
      <IonToolbar className={classes.Toolbar}>
        <IonButtons className="ion-no-margin" slot="start">
          <IonButton onClick={props.close} slot="icon-only">
            <IonIcon icon={arrowBack} slot="start" />
          </IonButton>
        </IonButtons>
        <IonTitle>
          <h3 color="dark" className={classes.Heading}>Edit About</h3>
        </IonTitle>
      </IonToolbar>
    </IonHeader>
    <IonContent>
      <IonList>
        <IonItem>
          <IonLabel position="floating">Age</IonLabel>
          <IonInput value={props.age} type="text" onIonChange={(e) => props.setAge(e.detail.value)} />
        </IonItem>
        <IonItem>
          <IonLabel position="floating">Gender</IonLabel>
          <IonInput value={props.gender} type="text" onIonChange={(e) => props.setGender(e.detail.value)} />
        </IonItem>
      </IonList>
    </IonContent>
  </IonModal>
  )
}

EditAbout.propTypes = {
  close: PropTypes.func.isRequired,
  show: PropTypes.bool.isRequired,
  age: PropTypes.string.isRequired,
  gender: PropTypes.string.isRequired,
  setAge: PropTypes.func.isRequired,
  setGender: PropTypes.func.isRequired
}

export default EditAbout
