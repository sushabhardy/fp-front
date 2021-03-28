import React, { useState } from 'react'
// import PropTypes from 'prop-types'
import classes from './style.module.css'
// import logo from '../../../images/logo-small.png'
import { IonPage, IonToggle, IonGrid, IonToast, IonItem, IonAvatar, IonButton, IonTextarea, IonContent, IonLabel, IonInput, IonButtons, IonHeader, IonToolbar, IonTitle, IonIcon, IonList, IonItemDivider } from '@ionic/react'
import { arrowBack, arrowForward, brushOutline, flameOutline, logoFacebook, logoTwitter, logoYoutube, logoInstagram, saveOutline, toggleOutline } from 'ionicons/icons'
import SAMPLE from '../../../images/post-audition.png'
import EditAbout from './edit-about/template'
import EditContactInfo from './edit-contact-info/template'
import EditCertification from './edit-certification/template'
import EditExperience from './edit-experience/template'
import EditLinks from './edit-links/template'
import EditPhotos from './edit-photos/template'
import EditVideos from './edit-videos/template'
import EditBlockedUsers from './edit-blocked-users/template'
import { Link } from 'react-router-dom'

const EditProfile = props => {
  const [firstName, setFirstName] = useState('Sushabh')
  const [lastName, setLastName] = useState('Deshmukh')
  const [about, setAbout] = useState('')
  const [tagline, setTagline] = useState('')
  const [upForWork, setUpForWork] = useState(false)
  const [age, setAge] = useState('18')
  const [gender, setGender] = useState('Male')
  const [instagramProfile, setInstagramProfile] = useState('')
  const [facebookProfile, setFacebookProfile] = useState('')
  const [youtubeProfile, setYoutubeProfile] = useState('')
  const [twitterProfile, setTwitterProfile] = useState('')
  const [occupation, setOccupation] = useState('Occupation')
  const [city, setCity] = useState('Bangalore')
  const [languages, setLanguages] = useState(['Kannada'])
  const [email] = useState('sushabh.deshmukh@gmail.com')
  const [shouldEmailBePublic, setShouldEmailBePublic] = useState(true)

  // toast
  const [showToast, setShowToast] = useState(false)

  // modals
  const [showEditAbout, setShowEditAbout] = useState(false)
  const [showEditContactInfo, setShowEditContactInfo] = useState(false)
  const [showEditCertification, setShowEditCertification] = useState(false)
  const [showEditExperience, setShowEditExperience] = useState(false)
  const [showEditPhotos, setShowEditPhotos] = useState(false)
  const [showEditVideos, setShowEditVideos] = useState(false)
  const [showEditLinks, setShowEditLinks] = useState(false)
  const [showEditBlockedUsers, setShowEditBlockedUsers] = useState(false)

  return (
    <IonPage>
      <IonGrid className={[classes.EditProfile, 'ion-no-padding', 'ion-no-margin'].join(' ')}>
          <IonHeader>
            <IonToolbar className={classes.Toolbar}>
              <IonButtons className="ion-no-margin" slot="start">
                <IonButton slot="icon-only">
                  <Link to="/profile">
                    <IonIcon icon={arrowBack} slot="center" />
                  </Link>
                </IonButton>
              </IonButtons>
              <IonTitle>
                <h3 color="dark" className={classes.Heading}>Edit Profile</h3>
              </IonTitle>
            </IonToolbar>
          </IonHeader>
          <IonContent>
            <IonList>
              <IonItemDivider>Tell us about you</IonItemDivider>
              <IonItem>
                <IonLabel color="medium" position="fixed"><IonIcon slot="start" color="primary" icon={brushOutline} />&nbsp;Firstname</IonLabel>
                <IonInput value={firstName} type="text" onIonChange={ e => setFirstName(e.detail.value) } />
              </IonItem>
              <IonItem>
                <IonLabel style={{ display: 'flex' }} color="medium" position="fixed"><IonIcon slot="start" color="primary" icon={brushOutline} />&nbsp;Lastname</IonLabel>
                <IonInput value={lastName} type="text" onIonChange={ e => setLastName(e.detail.value) } />
              </IonItem>
              <IonItem>
                <IonLabel style={{ display: 'flex' }} color="medium" position="fixed" ><IonIcon slot="start" color="primary" icon={flameOutline} />&nbsp;Tagline</IonLabel>
                <IonInput value={tagline} type="text" onIonChange={ e => setTagline(e.detail.value) } />
              </IonItem>
              <IonItem>
                <IonLabel style={{ display: 'flex' }} color="medium" position="floating"><IonIcon slot="start" color="primary" icon={saveOutline} />&nbsp;About</IonLabel>
                <IonTextarea value={about} onIonChange={e => setAbout(e.detail.value as any)} />
              </IonItem>
              <IonItem>
                <IonLabel style={{ display: 'flex' }}><IonIcon slot="start" color="primary" icon={toggleOutline} />&nbsp;Available for work</IonLabel>
                <IonToggle checked={upForWork} onIonChange={e => setUpForWork(e.detail.checked)} />
              </IonItem>
              <IonItemDivider>Link your social networks</IonItemDivider>
              <IonItem>
                <IonLabel style={{ display: 'flex' }} position="fixed"><IonIcon slot="start" color="dark" icon={logoInstagram} />&nbsp;Instagram</IonLabel>
                <IonInput value={instagramProfile} type="text" onIonChange={ e => setInstagramProfile(e.detail.value) } />
              </IonItem>
              <IonItem>
                <IonLabel style={{ display: 'flex' }} position="fixed"><IonIcon slot="start" color="primary" icon={logoFacebook} />&nbsp;Facebook</IonLabel>
                <IonInput value={facebookProfile} type="text" onIonChange={ e => setFacebookProfile(e.detail.value) } />
              </IonItem>
              <IonItem>
                <IonLabel style={{ display: 'flex' }} position="fixed"><IonIcon slot="start" color="primary" icon={logoTwitter} />&nbsp;Twitter</IonLabel>
                <IonInput value={twitterProfile} type="text" onIonChange={ e => setTwitterProfile(e.detail.value) } />
              </IonItem>
              <IonItem>
                <IonLabel style={{ display: 'flex' }} position="fixed"><IonIcon slot="start" color="danger" icon={logoYoutube} />&nbsp;YouTube</IonLabel>
                <IonInput value={youtubeProfile} type="text" onIonChange={ e => setYoutubeProfile(e.detail.value) } />
              </IonItem>
            </IonList>
            <IonButton className="ion-margin-horizontal" onClick={() => {}} expand="full">
              <IonLabel>SAVE</IonLabel>
            </IonButton>
            <IonItemDivider>Bio details</IonItemDivider>
            <IonItem onClick={(e) => { setShowEditAbout(true) }}>
              <IonAvatar className="ion-no-border" slot="start">
                <img src={SAMPLE} />
              </IonAvatar>
              <IonLabel>
                <h3 className={classes.Heading}>About</h3>
              </IonLabel>
              <IonIcon icon={arrowForward} slot="end" />
            </IonItem>
            <IonItem onClick={(e) => { setShowEditContactInfo(true) }}>
              <IonAvatar className="ion-no-border" slot="start">
                <img src={SAMPLE} />
              </IonAvatar>
              <IonLabel>
                <h3 className={classes.Heading}>Contact Info</h3>
              </IonLabel>
              <IonIcon icon={arrowForward} slot="end" />
            </IonItem>
            <IonItem onClick={(e) => { setShowToast(true) }}>
              <IonAvatar className="ion-no-border" slot="start">
                <img src={SAMPLE} />
              </IonAvatar>
              <IonLabel>
                <h3 className={classes.Heading}>Certification</h3>
              </IonLabel>
              <IonIcon icon={arrowForward} slot="end" />
            </IonItem>
            <IonItem onClick={(e) => { setShowToast(true) }}>
              <IonAvatar className="ion-no-border" slot="start">
                <img src={SAMPLE} />
              </IonAvatar>
              <IonLabel>
                <h3 className={classes.Heading}>Experience</h3>
              </IonLabel>
              <IonIcon icon={arrowForward} slot="end" />
            </IonItem>
            <IonItemDivider>Portfolio</IonItemDivider>
            <IonItem onClick={(e) => { setShowEditPhotos(true) }}>
              <IonAvatar className="ion-no-border" slot="start">
                <img src={SAMPLE} />
              </IonAvatar>
              <IonLabel>
                <h3 className={classes.Heading}>Photos</h3>
              </IonLabel>
              <IonIcon icon={arrowForward} slot="end" />
            </IonItem>
            <IonItem onClick={(e) => { setShowToast(true) }}>
              <IonAvatar className="ion-no-border" slot="start">
                <img src={SAMPLE} />
              </IonAvatar>
              <IonLabel>
                <h3 className={classes.Heading}>Videos</h3>
              </IonLabel>
              <IonIcon icon={arrowForward} slot="end" />
            </IonItem>
            <IonItem onClick={(e) => { setShowToast(true) }}>
              <IonAvatar className="ion-no-border" slot="start">
                <img src={SAMPLE} />
              </IonAvatar>
              <IonLabel>
                <h3 className={classes.Heading}>YouTube/VOOT Links</h3>
              </IonLabel>
              <IonIcon icon={arrowForward} slot="end" />
            </IonItem>
            <IonItemDivider>Settings</IonItemDivider>
            <IonItem onClick={(e) => { setShowToast(true) }}>
              <IonAvatar className="ion-no-border" slot="start">
                <img src={SAMPLE} />
              </IonAvatar>
              <IonLabel>
                <h3 className={classes.Heading}>Blocked Users</h3>
              </IonLabel>
              <IonIcon icon={arrowForward} slot="end" />
            </IonItem>
          </IonContent>
          <EditAbout
            gender={gender}
            setGender={setGender}
            age={age}
            setAge={setAge}
            close={() => setShowEditAbout(false)}
            show={showEditAbout}
          />
          <EditContactInfo
            occupation={occupation}
            setOccupation={setOccupation}
            email={email}
            shouldEmailBePublic={shouldEmailBePublic}
            setShouldEmailBePublic={setShouldEmailBePublic}
            city={city}
            languages={languages}
            setCity={setCity}
            setLanguages={setLanguages}
            close={() => setShowEditContactInfo(false)}
            show={showEditContactInfo}
          />
          <EditCertification show={showEditCertification} close={() => setShowEditCertification(false)}/>
          <EditExperience show={showEditExperience} close={() => setShowEditExperience(false)}/>
          <EditPhotos show={showEditPhotos} close={() => setShowEditPhotos(false)}/>
          <EditVideos show={showEditVideos} close={() => setShowEditVideos(false)}/>
          <EditLinks show={showEditLinks} close={() => setShowEditLinks(false)}/>
          <EditBlockedUsers show={showEditBlockedUsers} close={() => setShowEditBlockedUsers(false)}/>
      </IonGrid>
      <IonToast
        isOpen={showToast}
        onDidDismiss={() => setShowToast(false)}
        message="Not supported in proof of concept."
        duration={4000}
      />
    </IonPage>
  )
}

EditProfile.propTypes = {

}

export default EditProfile
