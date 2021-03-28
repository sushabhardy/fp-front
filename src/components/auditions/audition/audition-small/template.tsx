import React from 'react'
import PropTypes from 'prop-types'
import { IonItem, IonCardContent, IonButton, IonCard, IonCardHeader, IonCardSubtitle, IonCardTitle, IonBadge } from '@ionic/react'
import job from '../../../../images/job.jpeg'
import classes from './style.module.css'

const AuditionSmall = props => {
  return (
    <IonCard>
      <img src={job} />
      <IonCardHeader className="ion-no-padding ion-padding-horizontal ion-padding-top">
        <IonCardSubtitle>{props.city || 'Bangalore'}</IonCardSubtitle>
        <IonItem className="ion-no-padding">
          <IonCardTitle className={classes.JobHeading} slot="start">
            {props.title || 'TEST JOB'}
          </IonCardTitle>
          <IonButton expand="block" fill="solid" slot="end">APPLY</IonButton>
        </IonItem>
      </IonCardHeader>
      <IonCardContent>
        <p className={classes.JobSubHeading}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Officia sint itaque incidunt labore id libero tempore omnis saepe et veniam.</p>
        <IonBadge className={classes.Badge} color="light">{props.ageGroup || '22-30'}</IonBadge>
        <IonBadge className={classes.Badge} color="light">{props.gender || 'Male'}</IonBadge>
        <IonBadge className={classes.Badge} color="light">{props.languages || 'Kannada'}</IonBadge>
        <IonBadge className={classes.Badge} color="warning">{props.salary || '20K/Mo'}</IonBadge>
      </IonCardContent>
    </IonCard>
  )
}

AuditionSmall.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  city: PropTypes.string.isRequired,
  salary: PropTypes.string.isRequired,
  createdTime: PropTypes.string.isRequired,
  updatedTime: PropTypes.string.isRequired,
  // expirationTime: PropTypes.string.isRequired,
  ageGroup: PropTypes.string.isRequired,
  languages: PropTypes.string.isRequired,
  gender: PropTypes.string.isRequired
  // views: PropTypes.string.isRequired,
  // applicants: PropTypes.string.isRequired
}

export default AuditionSmall
