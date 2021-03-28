/* eslint-disable no-unused-vars */
/* eslint-disable multiline-ternary */
import React, { useEffect, useState } from 'react'
// import PropTypes from 'prop-types'
import { IonPage, IonContent, IonSlides, IonSlide, IonImg, IonSegment, IonSegmentButton, IonRow, IonCol, IonAvatar, IonBadge, IonLabel, IonItem, IonGrid, IonHeader, IonToolbar, IonTitle, IonButtons, IonIcon, IonList } from '@ionic/react'
import ProfileSmall from '../discover/profile/profile-small/template'
import axios from '../../axios/axios'
import classes from './style.module.css'
import { notificationsOutline, paperPlaneOutline, arrowForward, arrowForwardCircleSharp, arrowBackCircleSharp, personSharp, flowerSharp, reloadCircleSharp, filmSharp } from 'ionicons/icons'
import logo from '../../images/logo-small.png'
import SAMPLE from '../../images/post-audition.png'
import PostsModal from './posts-modal/template'
import { useHistory } from 'react-router'
import { getHeaders } from '../../utils/util'
import { Button, Icon } from '@material-ui/core'
import { Link } from 'react-router-dom'

const slideOpts = {
  initialSlide: 1,
  speed: 400,
  spaceBetween: 20
}

const Profile = props => {
  const history = useHistory()
  const [showYourPosts, setShowYourPosts] = useState(false)
  const [showBookmarkedPosts, setShowBookmarkedPosts] = useState(false)
  const [showLikedPosts, setShowLikedPosts] = useState(false)
  const [showTransactions, setShowTransactions] = useState(false)
  const [show1, setShow1] = useState('experience')
  const [show2, setShow2] = useState('about')
  const [show3, setShow3] = useState('photos')

  const [loading, setLoading] = useState(true)
  const [profile, setProfile] = useState(null)

  useEffect(() => {
    let mounted = true
    ; (async () => {
      const userId = localStorage.getItem('userId')
      setLoading(true)
      const { data: { profile: res } } = await axios.get(`/profile/${userId}`, { headers: getHeaders() })
      if (mounted) {
        setProfile(res)
        setLoading(false)
      }
    })()
    return () => {
      // cleanup
      mounted = false
    }
  }, [])

  const renderCertification = () => {
    return (
      <IonList>
        <IonItem>
          <IonLabel>NA</IonLabel>
        </IonItem>
      </IonList>
    )
  }

  const renderContact = () => {
    return (
      <IonList>
        <IonItem>
          <IonLabel>NA</IonLabel>
        </IonItem>
      </IonList>
    )
  }

  const renderAbout = () => {
    return (
      <IonList>
        <IonItem>
          <IonLabel>Age</IonLabel>
          <IonBadge color="light" slot="end">{profile.age}</IonBadge>
        </IonItem>
        <IonItem>
          <IonLabel>Gender</IonLabel>
          <IonBadge color="light" slot="end">{profile.gender}</IonBadge>
        </IonItem>
        <IonItem>
          <IonLabel>Tagline</IonLabel>
          <IonBadge color="light" slot="end">{profile.tagline}</IonBadge>
        </IonItem>
      </IonList>
    )
  }

  const renderExperience = () => {
    return (
      <IonList>
        <IonItem>
          <IonLabel>Indian Film School</IonLabel>
          <IonBadge color="warning" slot="end">{profile.certification}</IonBadge>
        </IonItem>
      </IonList>
    )
  }

  const renderRecommendations = () => {
    return (
      <IonList>
        <IonItem>
          <IonLabel>NA</IonLabel>
        </IonItem>
      </IonList>
    )
  }

  const renderPhotos = () => {
    return (
      <IonSlides style={{ height: '20rem' }} pager={true} options={slideOpts}>
        <IonSlide>
          <IonImg src={SAMPLE} />
        </IonSlide>
      </IonSlides>
    )
  }

  return (
    <IonPage>
      {!loading ? (
      <IonGrid className={[classes.Profile, 'ion-no-padding', 'ion-no-margin'].join(' ')}>
          <IonContent>
            <div className={classes.ProfileHeader}>
              <div>
                <Link style={{ textDecoration: 'none' }} to="/newsfeed">
                  <Button onClick={() => {}}>
                      <Icon className="fp-color-hot-pink">{'arrow_back_ios_new'}</Icon>
                  </Button>
                </Link>
              </div>
              <div>
                <div className={classes.UserPP}>
                  <img src={'https://images.unsplash.com/photo-1537944434965-cf4679d1a598?auto=format&fit=crop&w=1200&h=750&q=60'} alt="pp" />
                  <div className={classes.UserActiveBall} />
                </div>
                <div className={classes.UserDetails}>
                  <h2 className="fp-h2">{localStorage.getItem('name')}</h2>
                  <p className="fp-subtitle">{`@${profile.username} • ${profile.age || '24'} ${profile.gender || 'M'} • ${profile.category || 'Actor'} • Active 24h ago`}</p>
                  <p>{'I am a passionate actor!'}</p>
                </div>
              </div>
              <div>
                <Button onClick={() => {}}>
                    <Icon className="fp-color-warm-blue">{'settings'}</Icon>
                </Button>
              </div>
            </div>
            <div className={classes.ProfileStats}>
              <div className={classes.Stat}>
                <p className="fp-body-line-text">Followers</p>
                <h2 className="fp-h2">{profile.followersCount || 0}</h2>
              </div>
              <div className={classes.Stat}>
                <p className="fp-body-line-text">Posts</p>
                <h2 className="fp-h2">{profile.postsCount || 0}</h2>
              </div>
              <div className={classes.Stat}>
                <p className="fp-body-line-text">Following</p>
                <h2 className="fp-h2">{profile.followeesCount || 0}</h2>
              </div>
            </div>
            <IonSegment color="primary" value="portfolio" style={{ padding: '1rem 0rem 0rem 1rem', width: '80%', margin: '0 auto' }} className="fp-color-hot-pink" onIonChange={() => {}}>
              <IonSegmentButton value="bio">
                <IonLabel>BIO</IonLabel>
              </IonSegmentButton>
              <IonSegmentButton value="portfolio">
                <IonLabel>PORTFOLIO</IonLabel>
              </IonSegmentButton>
              <IonSegmentButton value="links">
                <IonLabel>LINKS</IonLabel>
              </IonSegmentButton>
            </IonSegment>
            <div className={classes.Portfolio}>
              {profile.photos.map((media, i) => {
                return (<div key={i} className={classes.PortfolioMedia}>
                  <img src={media.src || 'https://images.unsplash.com/photo-1537944434965-cf4679d1a598?auto=format&fit=crop&w=1200&h=750&q=60'} alt="poc" />
                </div>)
              })}
            </div>
          </IonContent>
      </IonGrid>) : null}
    </IonPage>
  )
}

Profile.propTypes = {

}

export default Profile
