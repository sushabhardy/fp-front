import React, { useState, useEffect } from 'react'
import { IonList, IonInfiniteScroll, IonRefresher, IonRefresherContent, IonContent, IonInfiniteScrollContent, IonPage, IonGrid, IonToast } from '@ionic/react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { fetchNewsfeed, fetchNewsfeedMore } from './actions'
import InlineLoader from '../loader/template'
import { Link } from 'react-router-dom'
import classes from './style.module.css'
import { logout } from '../auth/actions'
import { auth } from '../../firebase'
import PostCard from '../../storybook/components/newsfeed/PostCard'
import Header from '../../storybook/components/common/Header'
import hashtag from '../../storybook/assets/icons/general/toc-24px.svg'
import CompleteProfile from '../../storybook/components/common/CompleteProfile'
import UserBox from '../../storybook/components/common/UserBox'

const Newsfeed = props => {
  const [showToast, setShowToast] = useState(false)

  useEffect(() => {
    Object.keys(props.postsMap).length === 0 && props.fetchNewsfeed()
    return () => {
      // cleanup
    }
  }, [])

  const logoutHandler = async (e) => {
    e.preventDefault()
    localStorage.removeItem('userId')
    localStorage.removeItem('idpToken')
    localStorage.removeItem('spToken')
    localStorage.removeItem('name')
    localStorage.removeItem('pp')
    localStorage.removeItem('newsfeed_after')
    await auth.signOut()
    props.logout()
  }

  const loadPosts = async event => {
    await props.fetchNewsfeedMore()
    event.target.complete()
    if (Object.keys(props.postsMap).length === 100) {
      event.target.disabled = true
    }
  }

  return (
    <IonPage>
      <IonGrid className={[classes.Newsfeed, 'ion-no-padding', 'ion-no-margin'].join(' ')}>
        <IonContent>
          <IonRefresher className="ion-margin-top" slot="fixed" onIonRefresh={loadPosts}>
            <IonRefresherContent
              refreshingSpinner="circles">
            </IonRefresherContent>
          </IonRefresher>
          <Header
            icon="menu"
            headerTitle={`Hey ${localStorage.getItem('name').split(' ')[0]}`}
            headerSubtitle="Check out your today's feed"
            imgNode={hashtag}
            onBack={logoutHandler}
          />
          <Link className={classes.Tab} to="/profile">
            <img src={'https://images.unsplash.com/photo-1537944434965-cf4679d1a598?auto=format&fit=crop&w=1200&h=750&q=60'} alt="pp"/>
          </Link>
          <div className={classes.HorizontalList}>
            {/* TODO: connect api */}
            <CompleteProfile
              heading="Complete your profile"
              icon="arrow_forward_ios_new"
              next="Add photos"
            />
            <UserBox
              name="Sushabh Deshmukh"
              username="sushabhardy"
            />
             <UserBox
              name="Sushabh Deshmukh"
              username="sushabhardy"
            />
             <UserBox
              name="Sushabh Deshmukh"
              username="sushabhardy"
            />
             <UserBox
              name="Sushabh Deshmukh"
              username="sushabhardy"
            />
             <UserBox
              name="Sushabh Deshmukh"
              username="sushabhardy"
            />
             <UserBox
              name="Sushabh Deshmukh"
              username="sushabhardy"
            />
          </div>
          <IonList>
            {
              !props.loading
                ? Object.values(props.postsMap).map((post, i) => (
                    <div key={i}>
                      <div className="fp-padding-medium">
                      <PostCard key={i} {...post} />
                    </div>
                    </div>))
                : <div className={classes.Loader}><InlineLoader /><p className="ion-no-margin" >Fetching newsfeed...</p></div>
            }
          </IonList>
          <IonInfiniteScroll
            onIonInfinite={async event => await loadPosts(event)}
          >
            <IonInfiniteScrollContent
              loadingSpinner="bubbles"
              loadingText="Loading more posts..."
            >
            </IonInfiniteScrollContent>
          </IonInfiniteScroll>
        </IonContent>
      </IonGrid>
      <IonToast
        isOpen={showToast}
        onDidDismiss={() => setShowToast(false)}
        message="Not supported in proof of concept."
        duration={200}
      />
    </IonPage>
  )
}

const mapStateToProps = state => {
  return {
    loading: state.newsfeed.loading,
    error: state.newsfeed.error,
    postsMap: state.newsfeed.postsMap
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchNewsfeed: () => dispatch(fetchNewsfeed()),
    fetchNewsfeedMore: () => dispatch(fetchNewsfeedMore()),
    logout: () => dispatch(logout())
  }
}

Newsfeed.propTypes = {
  fetchNewsfeed: PropTypes.func.isRequired,
  fetchNewsfeedMore: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  error: PropTypes.string,
  postsMap: PropTypes.object.isRequired,
  logout: PropTypes.func.isRequired
}

export default connect(mapStateToProps, mapDispatchToProps)(Newsfeed)
