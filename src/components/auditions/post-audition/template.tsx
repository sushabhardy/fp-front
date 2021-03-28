import React, { useState } from 'react'
// import PropTypes from 'prop-types'
import { IonPage, IonLoading, IonCheckbox, IonContent, IonInput, IonTextarea, IonButtons, IonToggle, IonDatetime, IonButton, IonTitle, IonHeader, IonToolbar, IonGrid, IonIcon, IonList, IonSelectOption, IonLabel, IonItem, IonSelect, IonRange, IonAlert, IonChip } from '@ionic/react'
import { Link } from 'react-router-dom'
import classes from './style.module.css'
import { arrowBack, cameraOutline, clipboardOutline, colorPaletteOutline, imageOutline, mailOpenOutline, maleFemaleOutline, micOutline, musicalNoteOutline, newspaperOutline, notificationsCircleOutline, paperPlaneOutline, trailSignOutline, videocamOffOutline, walletOutline } from 'ionicons/icons'
import { LANGUAGES, CATEGORIES, CITIES, GENDERS, getHeaders } from '../../../utils/util'
import { Plugins, CameraResultType, CameraSource } from '@capacitor/core'
import Media from '../../media/template'
import axiosInstance from '../../../axios/axios'
import { uploadPhoto } from '../../../firebase'

const PostAudition = props => {
  const [loading, setLoading] = useState(false)
  const [title, setTitle] = useState('')
  const [categories, setCategories] = useState(['Actor'])
  const [languages, setLanguages] = useState(['Kannada'])
  const [city, setCity] = useState('Bangalore')
  const [pay, setPay] = useState(null)
  const [numOfRequirements, setNumOfRequirements] = useState(10)
  const [genders, setGenders] = useState(['Male'])
  const [ageGroup, setAgeGroup] = useState({ lower: 18, upper: 32 })
  const [deadline, setDeadline] = useState('2021-02-20')
  const [isChargeable, setIsChargeable] = useState(true)
  const [description, setDescription] = useState('')
  const [isPhotosAllowed, setIsPhotosAllowed] = useState(false)
  const [isVideosAllowed, setIsVideosAllowed] = useState(false)
  const [isPDFAllowed, setIsPDFAllowed] = useState(false)
  const [isAudiosAllowed, setIsAudiosAllowed] = useState(false)
  const [banner, setBanner] = useState(null)
  const [error, setError] = useState(null)
  const [applicationFee, setApplicationFee] = useState('0')
  const { Camera } = Plugins

  const postAuditionHandler = async (e) => {
    e.preventDefault()
    setLoading(true)
    const userId = localStorage.getItem('userId')
    const bannerUrl = await uploadPhoto(banner, `ionic/${userId}/auditions`)
    const audition = {
      title,
      languages,
      city,
      salary: pay,
      gender: genders[0],
      ageLower: ageGroup.lower,
      ageUpper: ageGroup.upper,
      isChargeable,
      categories,
      description,
      isPhotosAllowed,
      isVideosAllowed,
      isPDFAllowed,
      isAudiosAllowed,
      bannerUrl,
      numOfRequirements,
      creatorId: userId
    }
    try {
      await axiosInstance.post('/auditions/createAudition', { audition: audition }, { headers: getHeaders() })
    } catch (e) {
      console.log(e)
      e && setError(e)
    }
    setLoading(false)
  }

  const addBannerHandler = async (e) => {
    e.preventDefault()
    const photo = await Camera.getPhoto({
      resultType: CameraResultType.DataUrl,
      source: CameraSource.Prompt,
      quality: 80,
      width: 500
    })
    if (!photo || !photo.dataUrl) {
      return
    }
    const pic = { src: photo.dataUrl }
    setBanner(pic)
  }

  /**
   * Check if submission is allowed.
   */
  const allowSubmission =
    title &&
    categories &&
    languages &&
    city &&
    pay &&
    numOfRequirements &&
    genders &&
    ageGroup &&
    deadline &&
    description &&
    banner

  return (
    <IonPage>
      <IonGrid className={[classes.PostAudition, 'ion-no-padding', 'ion-no-margin'].join(' ')}>
        <IonHeader className="ion-no-margin ion-no-padding">
          <IonToolbar className="ion-no-margin ion-no-padding">
            <IonButtons className="ion-no-margin" slot="start">
              <IonButton slot="icon-only">
                <Link to="/auditions">
                  <IonIcon icon={arrowBack} slot="center" />
                </Link>
              </IonButton>
            </IonButtons>
            <IonTitle>
              <h3 color="dark" className={classes.Heading}>Post Audition</h3>
            </IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent style={{ height: '100%' }}>
          <IonList>
            <IonItem>
              <IonLabel style={{ display: 'flex' }} position="floating"><IonIcon slot="start" color="primary" icon={clipboardOutline} />&nbsp;Title</IonLabel>
              <IonInput value={title} type="text" onIonChange={ e => setTitle(e.detail.value) } />
            </IonItem>
            <IonItem>
              <IonLabel style={{ display: 'flex' }}><IonIcon slot="start" color="primary" icon={colorPaletteOutline} />&nbsp;Categories</IonLabel>
              <IonSelect value={categories} multiple={true} okText="Select" cancelText="Dismiss" onIonChange={e => setCategories(e.detail.value)}>
                {Object.values(CATEGORIES).map(({ name }, i) => (
                  <IonSelectOption key={i} value={name}>{name}</IonSelectOption>
                ))}
              </IonSelect>
            </IonItem>
            {categories.length > 1 && <IonList>{categories.map((category, i) => <IonChip key={i}>{category}</IonChip>)}</IonList>}
            <IonItem>
              <IonLabel style={{ display: 'flex' }}><IonIcon slot="start" color="primary" icon={micOutline} />&nbsp;Languages</IonLabel>
              <IonSelect value={languages} multiple={true} okText="Select" cancelText="Dismiss" onIonChange={e => setLanguages(e.detail.value)}>
                {LANGUAGES.map((language, i) => (
                  <IonSelectOption key={i} value={language}>{language}</IonSelectOption>
                ))}
              </IonSelect>
            </IonItem>
            {languages.length > 1 && <IonList>{languages.map((language, i) => <IonChip key={i}>{language}</IonChip>)}</IonList>}
            <IonItem>
              <IonLabel style={{ display: 'flex' }}><IonIcon slot="start" color="primary" icon={maleFemaleOutline} />&nbsp;Gender</IonLabel>
              <IonSelect multiple={true} value={genders} okText="Select" cancelText="Dismiss" onIonChange={e => setGenders(e.detail.value)}>
                {GENDERS.map((gender, i) => (
                  <IonSelectOption key={i} value={gender}>{gender}</IonSelectOption>
                ))}
              </IonSelect>
            </IonItem>
            {genders.length > 1 && <IonList>{genders.map((gender, i) => <IonChip key={i}>{gender}</IonChip>)}</IonList>}
            <IonItem>
              <IonLabel style={{ display: 'flex' }}><IonIcon slot="start" color="primary" icon={trailSignOutline} />&nbsp;City</IonLabel>
              <IonSelect value={city} okText="Select" cancelText="Dismiss" onIonChange={e => setCity(e.detail.value)}>
                {CITIES.map((city, i) => (
                  <IonSelectOption key={i} value={city}>{city}</IonSelectOption>
                ))}
              </IonSelect>
            </IonItem>
            <IonItem>
              <IonLabel style={{ display: 'flex' }} position="floating"><IonIcon slot="start" color="primary" icon={walletOutline} />&nbsp;Pay (K/Mo)</IonLabel>
              <IonInput value={pay} type="number" onIonChange={ e => setPay(e.detail.value as any) } />
            </IonItem>
            <IonItem>
              <IonRange value={ageGroup} onIonChange={e => setAgeGroup(e.detail.value as any) } className={[classes.Range, 'ion-no-margin', 'ion-no-padding'].join(' ')} dualKnobs={true} pin={true} step={2} min={18} max={60}>
                <IonLabel slot="start">18 (age)</IonLabel>
                <IonLabel slot="end">60 (age)</IonLabel>
              </IonRange>
            </IonItem>
            <IonItem>
              <IonRange value={numOfRequirements} onIonChange={e => setNumOfRequirements(e.detail.value as any) } className={[classes.Range, 'ion-no-margin', 'ion-no-padding'].join(' ')} pin={true} step={2} min={1} max={25}>
                <IonLabel slot="start">1 (requirement)</IonLabel>
                <IonLabel slot="end">25 (requirement)</IonLabel>
              </IonRange>
            </IonItem>
            <IonItem>
              <IonLabel style={{ display: 'flex' }}><IonIcon slot="start" color="primary" icon={notificationsCircleOutline} />&nbsp;Deadline</IonLabel>
              <IonDatetime displayFormat="MMM D, YYYY" placeholder="Select Date" value={deadline} onIonChange={e => setDeadline(e.detail.value!)}></IonDatetime>
            </IonItem>
            <IonItem>
              <IonLabel style={{ display: 'flex' }}><IonIcon slot="start" color="primary" icon={walletOutline} />&nbsp;Application Fee</IonLabel>
              <IonToggle checked={isChargeable} onIonChange={e => setIsChargeable(e.detail.checked as any)} />
            </IonItem>
            {isChargeable && <IonItem>
              <IonLabel style={{ display: 'flex' }} position="floating"><IonIcon slot="start" color="primary" icon={walletOutline} />&nbsp;Fees (Rs.)</IonLabel>
              <IonInput value={applicationFee} type="number" onIonChange={ e => setApplicationFee(e.detail.value) } />
            </IonItem>}
            <IonItem>
              <IonLabel style={{ display: 'flex' }} position="floating"><IonIcon slot="start" color="primary" icon={mailOpenOutline} />&nbsp;Description</IonLabel>
              <IonTextarea value={description} onIonChange={e => setDescription(e.detail.value as any)} />
            </IonItem>
            {banner && <IonItem>
              <Media photos={[banner]} />
            </IonItem>}
            {/* <IonItem> */}
              <IonButton onClick={addBannerHandler} expand="block" size="default" fill="outline"><IonIcon slot="start" color="primary" icon={imageOutline} />&nbsp;Upload Banner</IonButton>
            {/* </IonItem> */}
            {/* <IonItem> */}
              {/* <IonButton expand="block" size="default" fill="outline"><IonIcon slot="start" color="primary" icon={copyOutline} />&nbsp;Upload PDF</IonButton> */}
            {/* </IonItem> */}
            {/* <IonItem> */}
              {/* <IonButton expand="block" size="default" fill="outline"><IonIcon slot="start" color="primary" icon={caretForwardCircleOutline} />&nbsp;Upload Video</IonButton> */}
            {/* </IonItem> */}
            <IonItem>
              <p style={{ display: 'flex' }}><IonIcon slot="start" color="tertiary" icon={cameraOutline} />&nbsp;Allow Photos</p>
              <IonCheckbox color="tertiary" slot="start" checked={isPhotosAllowed} onIonChange={(e) => setIsPhotosAllowed(e.detail.checked as any)} />
            </IonItem>
            <IonItem>
              <p style={{ display: 'flex' }}><IonIcon slot="start" color="tertiary" icon={videocamOffOutline} />&nbsp;Allow Videos</p>
              <IonCheckbox color="tertiary" slot="start" checked={isVideosAllowed} onIonChange={(e) => setIsVideosAllowed(e.detail.checked as any)} />
            </IonItem>
            <IonItem>
              <p style={{ display: 'flex' }}><IonIcon slot="start" color="tertiary" icon={musicalNoteOutline} />&nbsp;Allow Audios</p>
              <IonCheckbox color="tertiary" slot="start" checked={isAudiosAllowed} onIonChange={(e) => setIsAudiosAllowed(e.detail.checked as any)} />
            </IonItem>
            <IonItem>
              <p style={{ display: 'flex' }}><IonIcon slot="start" color="tertiary" icon={newspaperOutline} />&nbsp;Allow PDFs</p>
              <IonCheckbox color="tertiary" slot="start" checked={isPDFAllowed} onIonChange={(e) => setIsPDFAllowed(e.detail.checked as any)} />
            </IonItem>
          </IonList>
          <IonButton disabled={allowSubmission} className="ion-margin-horizontal" onClick={postAuditionHandler} expand="full">
            <IonLabel style={{ display: 'flex', alignItems: 'center' }}><IonIcon slot="start" color="white" icon={paperPlaneOutline} />&nbsp;POST</IonLabel>
          </IonButton>
          </IonContent>
        </IonGrid>
        <IonLoading
          isOpen={loading}
          message={'Posting audition...'}
        />
        <IonAlert
          isOpen={!!error}
          onDidDismiss={() => setError(null)}
          // header={'Filmy Profiles'}
          subHeader={'Error posting audition!'}
          message={error}
          buttons={['OK']}
        />
      </IonPage>
  )
}

PostAudition.propTypes = {

}

export default PostAudition
