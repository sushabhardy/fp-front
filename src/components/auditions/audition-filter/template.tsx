import React, { useState } from 'react'
import { IonGrid, IonItem, IonLabel, IonContent, IonHeader, IonIcon, IonButton, IonRefresher, IonRefresherContent, IonInfiniteScrollContent, IonInfiniteScroll, IonToolbar, IonTitle, IonButtons, IonList, IonPage, IonSelect, IonSelectOption, IonRange, IonAlert, IonChip } from '@ionic/react'
import { CATEGORIES, CITIES, GENDERS, getHeaders, LANGUAGES } from '../../../utils/util'
import { arrowBack, colorPaletteOutline, maleFemaleOutline, micOutline, searchOutline, trailSignOutline } from 'ionicons/icons'
import classes from './style.module.css'
import axios from '../../../axios/axios'
import AuditionSmall from '../audition/audition-small/template'
// import InlineLoader from '../../loader/template'
import { Link } from 'react-router-dom'
import InlineLoader from '../../loader/template'

const AuditionFilter = props => {
  // TODO: finalize init values
  const [city, setCity] = useState('Bangalore')
  const [languages, setLanguages] = useState(['Kannada'])
  const [gender, setGender] = useState('Female')
  const [category, setCategory] = useState('Actor')
  const [ageGroup, setAgeGroup] = useState({ lower: 18, upper: 32 })
  const [loading, setLoading] = useState(false)
  const [auditions, setAuditions] = useState([])
  const [error, setError] = useState(null)
  const [since, setSince] = useState(null)

  const filterAuditionsHandler = async (e) => {
    e.preventDefault()
    setLoading(true)
    const languagesStr = languages.length ? languages.reduce((prev, curr) => prev + ',' + curr) : ''
    let response
    try {
      response = await axios.get(`/auditions?category=${category}&languages=${languagesStr}&city=${city}&gender=${gender}&ageLower=${ageGroup.lower}&ageUpper=${ageGroup.upper}`, { headers: getHeaders() })
    } catch (e) {
      console.log(e)
      e && setError(e)
      e && setLoading(false)
    }
    if (response) {
      const { data: { success, error, after, auditions: res, message } } = response
      success && setAuditions(res)
      success && setLoading(false)
      error && setError(message)
      error && setLoading(false)
      after && setSince(after)
    }
  }

  const loadAuditions = async event => {
    const limit = process.env.REACT_APP_DEFAULT_LIMIT || 5
    const languagesStr = languages.length ? languages.reduce((prev, curr) => prev + ',' + curr) : ''
    const paginateParams = since ? `after=${since}&limit=${limit}&` : ''
    let response
    try {
      response = await axios.get(`/auditions?${paginateParams}&category=${category}&languages=${languagesStr}&city=${city}&gender=${gender}&ageLower=${ageGroup.lower}&ageUpper=${ageGroup.upper}`, { headers: getHeaders() })
    } catch (e) {
      console.log(e)
      e && setError(e)
    }
    if (response) {
      const { data: { success, error, after, auditions: res, message } } = response
      success && setAuditions(auditions.concat(res))
      success && setLoading(false)
      error && setError(message)
      after && setSince(after)
      event.target.complete()
      if (auditions.length === 100) {
        event.target.disabled = true
      }
    }
  }

  const allowSubmission = () => {
    return languages.length === 0 || !city || !gender || !ageGroup || !category
  }

  return (
    <IonPage>
      <IonGrid className={[classes.AuditionFilter, 'ion-no-padding', 'ion-no-margin'].join(' ')}>
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
              <h3 color="dark" className={classes.Heading}>Find Auditions</h3>
            </IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent>
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
              <IonLabel style={{ display: 'flex' }}><IonIcon slot="start" color="primary" icon={colorPaletteOutline} />&nbsp;Category</IonLabel>
              <IonSelect value={category} okText="Select" cancelText="Dismiss" onIonChange={e => setCategory(e.detail.value)}>
                {Object.keys(CATEGORIES).map((category, i) => (
                  <IonSelectOption key={i} value={CATEGORIES[category].name}>{CATEGORIES[category].name}</IonSelectOption>
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
              <IonRange value={ageGroup} onIonChange={e => setAgeGroup(e.detail.value as any) } className="ion-no-margin ion-no-padding" dualKnobs={true} pin={true} step={2} min={18} max={60}>
                <IonLabel slot="start">18 (age)</IonLabel>
                <IonLabel slot="end">60 (age)</IonLabel>
              </IonRange>
            </IonItem>
          </IonList>
        </IonContent>
          <IonButton disabled={allowSubmission()} className="ion-margin-horizontal" onClick={filterAuditionsHandler} expand="full">
            <IonLabel style={{ display: 'flex', alignItems: 'center' }}><IonIcon slot="start" color="white" icon={searchOutline} />&nbsp;Search</IonLabel>
          </IonButton>
        {/* <IonContent> */}
          <IonRefresher className="ion-margin-top" slot="fixed" onIonRefresh={loadAuditions}>
            <IonRefresherContent
              refreshingSpinner="circles">
            </IonRefresherContent>
          </IonRefresher>
          <IonList style={{ marginBottom: '4rem' }}>
            {
              loading
                ? <div className={classes.Loader}><InlineLoader /><p className="ion-no-margin" >Fetching auditions...</p></div>
                : auditions.map((audition, i) => (
                    <AuditionSmall { ...audition } key={i}/>))
            }
            {!loading && auditions.length === 0 && <h2 className={[classes.Heading, 'ion-text-center'].join(' ')}>No auditions to show!</h2>}
          </IonList>
          <IonInfiniteScroll
            onIonInfinite={async event => await loadAuditions(event)}
          >
            <IonInfiniteScrollContent
              loadingSpinner="bubbles"
              loadingText="Loading more auditions..."
            >
            </IonInfiniteScrollContent>
          </IonInfiniteScroll>
        {/* </IonContent> */}
      </IonGrid>
      <IonAlert
          isOpen={!!error}
          onDidDismiss={() => setError(null)}
          // header={'Filmy Profiles'}
          subHeader={'Error finding auditions!'}
          message={error}
          buttons={['OK']}
        />
    </IonPage>
  )
}

export default AuditionFilter
