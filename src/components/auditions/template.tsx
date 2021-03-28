import React, { useState, useEffect } from 'react'
import classes from './style.module.css'
import { IonGrid, IonPage, IonToolbar, IonRefresher, IonRefresherContent, IonInfiniteScroll, IonInfiniteScrollContent, IonAvatar, IonButton, IonLabel, IonItem, IonHeader, IonButtons, IonIcon, IonTitle, IonList, IonContent, IonToast } from '@ionic/react'
import SEARCH_AUDITION_IMAGE from '../../images/search-audition.png'
import POST_AUDITION_IMAGE from '../../images/post-audition.png'
import { arrowBack, arrowForward } from 'ionicons/icons'
import { Link, useHistory } from 'react-router-dom'
import AuditionSmall from './audition/audition-small/template'
import axios from '../../axios/axios'
import { getHeaders } from '../../utils/util'
import { connect } from 'react-redux'

const Auditions = props => {
  const history = useHistory()
  const [loading, setLoading] = useState(false)
  const [auditions, setAuditions] = useState([])
  const [error, setError] = useState(null)
  const [showToast, setShowToast] = useState(false)
  const [since, setSince] = useState(null)

  useEffect(() => {
    (async () => {
      setLoading(true)
      const limit = process.env.REACT_APP_DEFAULT_LIMIT || 5
      const paginateParams = since ? `after=${since}&limit=${limit}&` : ''
      const { data: { success, message, after, error, auditions: res } } = await axios.get(`/recentAuditions?${paginateParams}`, { headers: getHeaders() })
      after && setSince(after)
      success && setAuditions(res)
      success && setLoading(false)
      error && setError(message)
      error && setLoading(false)
    })()
    return () => {
      // cleanup
    }
  }, [])

  const gotoAuditionFilter = (e) => {
    e.preventDefault()
    history.push('/filter-auditions')
  }

  const gotoPostAudition = (e) => {
    e.preventDefault()
    history.push('/post-audition')
  }

  const loadAuditions = async event => {
    const limit = process.env.REACT_APP_DEFAULT_LIMIT || 5
    const paginateParams = since ? `after=${since}&limit=${limit}&` : ''
    const userId = localStorage.getItem('userId')
    const { data: { success, auditions: res, message, after } } = await axios.get(`/recentAuditions?${paginateParams}userId=${userId}`, { headers: getHeaders() })
    success && setAuditions(auditions.concat(res))
    success && setLoading(false)
    error && setError(message)
    after && setSince(after)
    event.target.complete()
    if (auditions.length === 100) {
      event.target.disabled = true
    }
  }

  return (
    <IonPage>
      <IonGrid className={[classes.Discover, 'ion-no-padding', 'ion-no-margin'].join(' ')}>
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
              <h3 color="dark" className={classes.Heading}>Auditions</h3>
            </IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonList>
          <IonItem onClick={gotoPostAudition}>
            <IonAvatar className="ion-no-border" slot="start">
              <img src={POST_AUDITION_IMAGE} />
            </IonAvatar>
            <IonLabel>
              <h3 className={classes.Heading}>Post Audition</h3>
            </IonLabel>
            <IonIcon icon={arrowForward} slot="end" />
          </IonItem>
          <IonItem onClick={gotoAuditionFilter}>
            <IonAvatar className="ion-no-border" slot="start">
              <img src={SEARCH_AUDITION_IMAGE} />
            </IonAvatar>
            <IonLabel>
              <h3 className={classes.Heading}>Search Audition</h3>
            </IonLabel>
            <IonIcon icon={arrowForward} slot="end" />
          </IonItem>
        </IonList>
        <IonContent>
          <IonRefresher className="ion-margin-top" slot="fixed" onIonRefresh={loadAuditions}>
            <IonRefresherContent
              refreshingSpinner="circles">
            </IonRefresherContent>
          </IonRefresher>
          <IonList>
            {
              !loading &&
                auditions.map((audition, i) => (
                    <AuditionSmall { ...audition } key={i}/>))
            }
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
        </IonContent>
      </IonGrid>
      <IonToast
        isOpen={showToast}
        onDidDismiss={() => setShowToast(false)}
        message="Not supported in proof of concept."
        duration={7000}
      />
      {error && error}
    </IonPage>
  )
}

const mapStateToProps = state => {
  return {
    mobile: state.auth.mobile,
    pp: state.auth.pp,
    name: state.auth.name,
    userId: state.auth.uid
  }
}

Auditions.propTypes = {

}

export default connect(mapStateToProps, null)(Auditions)
