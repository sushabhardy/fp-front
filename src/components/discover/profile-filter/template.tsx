import React, { useEffect, useState } from 'react'
import { IonGrid, IonItem, IonLabel, IonContent, IonHeader, IonRefresher, IonInfiniteScroll, IonInfiniteScrollContent, IonIcon, IonButton, IonToolbar, IonTitle, IonButtons, IonList, IonPage, IonSelect, IonSelectOption, IonRange, IonRefresherContent, IonAlert, IonChip } from '@ionic/react'
import { CITIES, GENDERS, getHeaders, LANGUAGES } from '../../../utils/util'
import { arrowBack, maleFemaleOutline, micOutline, searchOutline, trailSignOutline } from 'ionicons/icons'
import classes from './style.module.css'
import axios from '../../../axios/axios'
import ProfileSmall from '../profile/profile-small/template'
import InlineLoader from '../../loader/template'
import { Link } from 'react-router-dom'

const ProfileFilter = props => {
  // TODO: finalize init values
  const [city, setCity] = useState('Bangalore')
  const [languages, setLanguages] = useState(['Kannada'])
  const [gender, setGender] = useState('Female')
  const [category, setCategory] = useState('Actor')
  const [ageGroup, setAgeGroup] = useState({ lower: 18, upper: 32 })
  const [loading, setLoading] = useState(false)
  const [profiles, setProfiles] = useState([])
  const [error, setError] = useState(null)
  const [since, setSince] = useState(null)

  useEffect(() => {
    const query = new URLSearchParams(location?.search)
    query.forEach((v, k) => {
      if (k.includes('category')) {
        setCategory(v)
      }
    })
    return () => {
      // cleanup
    }
  }, [location])

  const filterProfilesHandler = async (e) => {
    e.preventDefault()
    setLoading(true)
    const languagesStr = languages.length ? languages.reduce((prev, curr) => prev + ',' + curr) : ''
    let response
    try {
      response = await axios.get(`/users?category=${category}&languages=${languagesStr}&city=${city}&gender=${gender}&ageLower=${ageGroup.lower}&ageUpper=${ageGroup.upper}`, { headers: getHeaders() })
    } catch (e) {
      e && setError(e)
      e && setLoading(false)
    }
    if (response) {
      const { data: { success, error, users, after, message } } = response
      success && setProfiles(users)
      success && setLoading(false)
      error && setError(message)
      error && setLoading(false)
      after && setSince(after)
    }
  }

  const loadProfiles = async event => {
    const limit = process.env.REACT_APP_DEFAULT_LIMIT || 5
    const languagesStr = languages.length ? languages.reduce((prev, curr) => prev + ',' + curr) : ''
    const paginateParams = since ? `after=${since}&limit=${limit}&` : ''
    let response
    try {
      response = await axios.get(`/users?${paginateParams}category=${category}&languages=${languagesStr}&city=${city}&gender=${gender}&ageLower=${ageGroup.lower}&ageUpper=${ageGroup.upper}`, { headers: getHeaders() })
    } catch (e) {
      e && setError(e)
      e && setLoading(false)
    }
    if (response) {
      const { data: { success, error, users, after, message } } = response
      success && setProfiles(profiles.concat(users))
      success && setLoading(false)
      error && setError(message)
      after && setSince(after)
      event.target.complete()
      if (profiles.length === 100) {
        event.target.disabled = true
      }
    }
  }

  const allowSubmission = () => {
    return languages.length === 0 || !city || !gender || !ageGroup
  }

  return (
    <IonPage>
      <IonGrid className={[classes.ProfileFilter, 'ion-no-padding', 'ion-no-margin'].join(' ')}>
        <IonHeader className="ion-no-margin ion-no-padding">
          <IonToolbar className="ion-no-margin ion-no-padding">
            <IonButtons className="ion-no-margin" slot="start">
              <IonButton slot="icon-only">
                <Link to="/newsfeed">
                  <IonIcon icon={arrowBack} slot="center" />
                </Link>
              </IonButton>
            </IonButtons>
            <IonTitle>
              <h3 color="dark" className={classes.Heading}>Find profiles</h3>
            </IonTitle>
          </IonToolbar>
        </IonHeader>
        {/* <IonContent> */}
          <IonList>
            <IonItem>
              <IonLabel style={{ display: 'flex' }}><IonIcon slot="start" color="primary" icon={trailSignOutline} />&nbsp;City</IonLabel>
              <IonSelect value={city} okText="Select" cancelText="Dismiss" onIonChange={e => setCity(e.detail.value)}>
                {CITIES.map((city, i) => (
                  <IonSelectOption key={i} value={city}>{city}</IonSelectOption>
                ))}
              </IonSelect>
            </IonItem>
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
              <IonSelect value={gender} okText="Select" cancelText="Dismiss" onIonChange={e => setGender(e.detail.value)}>
                {GENDERS.map((gender, i) => (
                  <IonSelectOption key={i} value={gender}>{gender}</IonSelectOption>
                ))}
              </IonSelect>
            </IonItem>
            <IonItem>
              <IonRange value={ageGroup} onIonChange={e => setAgeGroup(e.detail.value as any) } className={[classes.Range, 'ion-no-margin', 'ion-no-padding'].join(' ')} dualKnobs={true} pin={true} step={2} min={18} max={60}>
                <IonLabel slot="start">18 (age)</IonLabel>
                <IonLabel slot="end">60 (age)</IonLabel>
              </IonRange>
            </IonItem>
          </IonList>
          <IonButton disabled={allowSubmission()} className="ion-margin-horizontal" onClick={filterProfilesHandler} expand="full">
            <IonLabel style={{ display: 'flex', alignItems: 'center' }}><IonIcon slot="start" color="white" icon={searchOutline} />&nbsp;Search</IonLabel>
          </IonButton>
        {/* </IonContent> */}
        <IonContent>
          <IonRefresher className="ion-margin-top" slot="fixed" onIonRefresh={loadProfiles}>
            <IonRefresherContent
              refreshingSpinner="circles">
            </IonRefresherContent>
          </IonRefresher>
          <IonList>
            {
              loading
                ? <div className={classes.Loader}><InlineLoader /><p className="ion-no-margin" >Fetching profiles...</p></div>
                : profiles.map((profile, i) => (
                    <ProfileSmall { ...profile } key={i}/>))
            }
            {!loading && profiles.length === 0 && <h2 className={[classes.Heading, 'ion-text-center'].join(' ')}>No profiles to show!</h2>}
          </IonList>
          <IonInfiniteScroll
            onIonInfinite={async event => await loadProfiles(event)}
          >
            <IonInfiniteScrollContent
              loadingSpinner="bubbles"
              loadingText="Loading more profiles..."
            >
            </IonInfiniteScrollContent>
          </IonInfiniteScroll>
        </IonContent>
      </IonGrid>
      <IonAlert
          isOpen={!!error}
          onDidDismiss={() => setError(null)}
          // header={'Filmy Profiles'}
          subHeader={'Error finding profies!'}
          message={error}
          buttons={['OK']}
        />
    </IonPage>
  )
}

export default ProfileFilter
