import React, { Component } from 'react'
import { IonApp } from '@ionic/react'
import PropTypes from 'prop-types'
import classes from './style.module.css'

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css'

import './storybook/css/index.css'
import './storybook/css/video.css'

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css'
import '@ionic/react/css/structure.css'
import '@ionic/react/css/typography.css'

import 'video-react/dist/video-react.css'

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css'
import '@ionic/react/css/float-elements.css'
import '@ionic/react/css/text-alignment.css'
import '@ionic/react/css/text-transformation.css'
import '@ionic/react/css/flex-utils.css'
import '@ionic/react/css/display.css'

/* Theme variables */
import './theme/variables.css'
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom'
import { connect } from 'react-redux'
import VerifyOTP from './components/auth/verify-otp/template'
import LoginViaMobile from './components/auth/login-via-mobile/template'
import Newsfeed from './components/newsfeed/template'
import Discover from './components/discover/template'
import Auditions from './components/auditions/template'
import NewsfeedPost from './components/newsfeed/newsfeedPost/template'
import { authenticate } from './components/auth/actions'
import Auth from './components/auth/auth/template'
import CreatePost from './components/newsfeed/create-post/template'
import { Plugins } from '@capacitor/core'
import ProfileFilter from './components/discover/profile-filter/template'
import AuditionFilter from './components/auditions/audition-filter/template'
import { auth } from './firebase/'
import Profile from './components/profile/template'
import PostAudition from './components/auditions/post-audition/template'
import EditProfile from './components/profile/edit-profile/template'
import Signup from './components/auth/signup/template'
import CompleteProfile from './components/auth/complete-profile/template'

const { PushNotifications } = Plugins

interface IProps{
  isAuthenticated: Boolean,
  authenticate: (uid, spToken, idpToken, name, pp, profileComplete) => void,
  isOtpSent: Boolean,
  isProfileComplete: Boolean
}

class App extends Component<IProps, {}> {
  constructor () {
    super(null, null)
    this.push()
    auth.onIdTokenChanged(async user => {
      if (user) {
        const idpToken = await auth.currentUser?.getIdToken()
        idpToken && localStorage.setItem('idpToken', idpToken)
      }
    })
  }

  static propTypes = {
    isAuthenticated: PropTypes.bool,
    isOtpSent: PropTypes.bool,
    isOtpVerified: PropTypes.bool,
    authenticate: PropTypes.func,
    isProfileComplete: PropTypes.bool
  }

  push = () => {
    PushNotifications.register()

    PushNotifications.addListener('registration', (spToken) => {
      // alert(spToken.value)
      localStorage.setItem('deviceId', spToken.value)
    })

    PushNotifications.addListener('registrationError', (e) => {
      console.log(e)
      localStorage.removeItem('deviceId')
    })

    PushNotifications.addListener('pushNotificationReceived', ({ id, title, body }) => {
      // setNotification(notification)
    })

    PushNotifications.addListener('pushNotificationActionPerformed', (notification) => {
      console.log(notification)
    })
  }

  render () {
    let routes = null
    if (this.props.isAuthenticated) {
      if (!this.props.isProfileComplete) {
        routes = (
          <Switch>
            <Route path="/" exact>
              <Signup />
            </Route>
            <Route path="/newsfeed" exact>
              <Signup />
            </Route>
            <Route path="/signup" exact>
              <Signup />
            </Route>
            <Route path="/complete-profile" exact>
              <CompleteProfile />
            </Route>
          </Switch>
        )
      } else {
        routes = (
        <Switch>
          <Route path="/" exact>
            <Newsfeed />
          </Route>
          <Route path="/auth" exact>
            <Newsfeed />
          </Route>
          <Route path="/profile" exact>
            <Profile />
          </Route>
          <Route path="/edit-profile" exact>
            <EditProfile />
          </Route>
          <Route path="/newsfeed" exact>
            <Newsfeed />
          </Route>
          <Route path="/discover" exact>
            <Discover />
          </Route>
          <Route path="/filter-profiles" exact>
            <ProfileFilter />
          </Route>
          <Route path="/auditions" exact>
            <Auditions />
          </Route>
          <Route path="/filter-auditions" exact>
            <AuditionFilter />
          </Route>
          <Route path="/post-audition" exact>
            <PostAudition />
          </Route>
          <Route path="/login-via-mobile" exact>
            <Newsfeed />
          </Route>
          <Route path="/newsfeed/:postId" exact>
            <NewsfeedPost />
          </Route>
          <Route path="/create-post" exact>
            <CreatePost />
          </Route>
          <Redirect to="/" />
        </Switch>
        )
      }
    } else if (this.props.isOtpSent) {
      routes = (
        <Switch>
          <Route path="/login-via-mobile" exact>
            <VerifyOTP />
          </Route>
        </Switch>
      )
    } else {
      routes = (
        <Switch>
          <Route path="/" exact>
            <Auth />
          </Route>
          <Route path="/auth" exact>
            <Auth />
          </Route>
          <Route path="/login-via-mobile" exact>
            <LoginViaMobile />
          </Route>
          <Redirect to="/" />
        </Switch>)
    }
    return (
      <BrowserRouter>
        <IonApp className={classes.Parent}>
          {routes}
        </IonApp></BrowserRouter>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.auth.spToken !== null,
    isOtpVerified: state.auth.otpVerified,
    isOtpSent: state.auth.otpSent,
    isProfileComplete: state.auth.profileComplete
  }
}

const mapDispatchToProps = dispatch => {
  return {
    authenticate: (uid, spToken, idpToken, name, pp, profileComplete) => dispatch(authenticate(uid, spToken, idpToken, name, pp, profileComplete))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
