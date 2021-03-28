import React from 'react'
import PropTypes from 'prop-types'
import { IonModal, IonContent, IonItem, IonLabel, IonSelect, IonSelectOption, IonToggle, IonInput, IonButtons, IonButton, IonIcon, IonTitle, IonHeader, IonToolbar, IonList } from '@ionic/react'
import { arrowBack } from 'ionicons/icons'
import classes from './style.module.css'
import { CITIES, LANGUAGES } from '../../../../utils/util'

const EditContactInfo = props => {
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
          <h3 color="dark" className={classes.Heading}>Edit Contact Info</h3>
        </IonTitle>
      </IonToolbar>
    </IonHeader>
    <IonContent>
      <IonList>
        <IonItem>
          <IonLabel>City</IonLabel>
          <IonSelect value={props.city} okText="Select" cancelText="Dismiss" onIonChange={e => props.setCity(e.detail.value)}>
            {CITIES.map((city, i) => (
              <IonSelectOption key={i} value={city}>{city}</IonSelectOption>
            ))}
          </IonSelect>
        </IonItem>
        <IonItem>
          <IonLabel>Languages</IonLabel>
          <IonSelect value={props.languages} multiple={true} okText="Select" cancelText="Dismiss" onIonChange={e => props.setLanguages(e.detail.value)}>
            {LANGUAGES.map((language, i) => (
              <IonSelectOption key={i} value={language}>{language}</IonSelectOption>
            ))}
          </IonSelect>
        </IonItem>
        <IonItem>
          <IonLabel position="floating">Email</IonLabel>
          <IonInput value={props.email} type="email" disabled/>
        </IonItem>
        <IonItem>
          <IonLabel>Should email be public?</IonLabel>
          <IonToggle checked={props.shouldEmailBePublic} onIonChange={e => props.setShouldEmailBePublic(e.detail.checked)} />
        </IonItem>
        <IonItem>
          <IonLabel position="floating">Firstname</IonLabel>
          <IonInput value={props.occupation} type="text" onIonChange={ e => props.setOccupation(e.detail.value) } />
        </IonItem>
      </IonList>
    </IonContent>
  </IonModal>
  )
}

EditContactInfo.propTypes = {
  close: PropTypes.func.isRequired,
  show: PropTypes.bool.isRequired,
  city: PropTypes.string.isRequired,
  languages: PropTypes.array.isRequired,
  shouldEmailBePublic: PropTypes.bool.isRequired,
  occupation: PropTypes.string.isRequired,
  setCity: PropTypes.func.isRequired,
  email: PropTypes.string.isRequired,
  setLanguages: PropTypes.func.isRequired,
  setShouldEmailBePublic: PropTypes.func.isRequired,
  setOccupation: PropTypes.func.isRequired
}

export default EditContactInfo
