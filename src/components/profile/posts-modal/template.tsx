import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { IonContent, IonHeader, IonModal, IonToolbar, IonButton, IonButtons, IonIcon, IonTitle, IonRefresher, IonRefresherContent, IonList, IonInfiniteScroll, IonInfiniteScrollContent, IonAlert } from '@ionic/react'
import InlineLoader from '../../loader/template'
import classes from './style.module.css'
import { arrowBack } from 'ionicons/icons'
import Post from '../../newsfeed/post/template'
import axios from '../../../axios/axios'
import { getHeaders } from '../../../utils/util'
// import { Link } from 'react-router-dom'

const PostsModal = props => {
  const [loading, setLoading] = useState(false)
  const [posts, setPosts] = useState([])
  const [since, setSince] = useState(null)
  const [error, setError] = useState(null)

  useEffect(() => {
    (async () => {
      setLoading(true)
      const limit = process.env.REACT_APP_DEFAULT_LIMIT
      const paginateParams = since ? `after=${since}&limit=${limit}&` : ''
      let response
      try {
        response = await axios.get(`/${props.apiEndpoint}?${paginateParams}`, { headers: getHeaders() })
      } catch (e) {
        console.log(e)
        e && setError(e)
        e && setLoading(false)
      }
      if (response) {
        const { data: { posts: res, after } } = response
        after && setSince(after)
        setPosts(res)
        setLoading(false)
      }
    })()
    return () => {
      // cleanup
    }
  }, [])

  const load = async event => {
    const limit = process.env.REACT_APP_DEFAULT_LIMI
    const paginateParams = since ? `after=${since}&limit=${limit}&` : ''
    let response
    try {
      response = await axios.get(`/${props.apiEndpoint}?${paginateParams}`, { headers: getHeaders() })
    } catch (e) {
      console.log(e)
      e && setError(e)
      e && setLoading(false)
    }
    if (response) {
      const { data: { posts: res, after } } = response
      after && setSince(after)
      event.target.complete()
      setPosts(res)
      setLoading(false)
      const LIMIT = process.env.REACT_APP_DEFAULT_LIMIT
      if (posts.length === parseInt(LIMIT)) {
        event.target.disabled = true
      }
    }
  }

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
            <h3 color="dark" className={classes.Heading}>{props.title}</h3>
          </IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonRefresher className="ion-margin-top" slot="fixed" onIonRefresh={load}>
          <IonRefresherContent
            refreshingSpinner="circles">
          </IonRefresherContent>
        </IonRefresher>
        <IonList>
          {
            !loading
              ? posts.map((post, i) => (
                  <Post post={post} key={i}/>))
              : <div className={classes.Loader}><InlineLoader /><p className="ion-no-margin" >Fetching {props.title}...</p></div>
          }
        </IonList>
        <IonInfiniteScroll onIonInfinite={async event => await load(event)}>
          <IonInfiniteScrollContent
            loadingSpinner="bubbles"
            loadingText="Loading more ..."
          >
          </IonInfiniteScrollContent>
        </IonInfiniteScroll>
      </IonContent>
      <IonAlert
          isOpen={!!error}
          onDidDismiss={() => setError(null)}
          // header={'Filmy Profiles'}
          subHeader={'Error finding auditions!'}
          message={error}
          buttons={['OK']}
        />
    </IonModal>
  )
}

PostsModal.propTypes = {
  show: PropTypes.bool.isRequired,
  close: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  uid: PropTypes.string.isRequired,
  apiEndpoint: PropTypes.string.isRequired
}

export default PostsModal
