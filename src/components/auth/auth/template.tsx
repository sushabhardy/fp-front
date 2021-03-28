/* eslint-disable dot-notation */
import React from 'react'
import classes from './style.module.css'
import GOOGLE from '../../../images/google_logo.png'
import { IonGrid, IonPage } from '@ionic/react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { authenticate } from '../actions'
import { auth } from '../../../firebase/'
import firebase from 'firebase'
import axios from '../../../axios/axios'
import film from '../../../images/film.svg'

const provider = new firebase.auth.GoogleAuthProvider()

const Auth = props => {
  /**
   * Continue with google
   */
  const continueWithGoogleHandler = async (e) => {
    e.preventDefault()
    // {
    //   credential: { idToken },
    //   user: {
    //     displayName,
    //     email,
    //     emailVerified,
    //     photoURL,
    //     refreshToken,
    //     uid,
    //     metadata: {
    //       creationTime,
    //       lastSignInTime
    //     }
    //   }
    // }
    const { user } = await auth.signInWithPopup(provider)
    const idpToken = await auth.currentUser.getIdToken()

    /**
     * Do SP login and get spToken
     */
    const { data: { success, spToken, userId, name, profileComplete } } = await axios.post('/auth/verifySSO', { idpToken, displayName: user['displayName'], email: user['email'], googleId: user['uid'] })
    success && localStorage.setItem('spToken', spToken)
    success && localStorage.setItem('name', name)
    success && localStorage.setItem('idpToken', idpToken)
    success && localStorage.setItem('userId', userId)
    success && localStorage.setItem('pp', user['photoURL'])
    props.authenticate(userId, spToken, idpToken, name, user['photoURL'], profileComplete)
  }

  return (
    <IonPage>
      <IonGrid className="ion-no-padding">
        <div className={classes.Container}>
          <div className={classes.LogoContainer}>
            <div className={classes.Logo}>
              <img src={film} />
            </div>
            <h2 className="fp-h2">FILMY PROFILES</h2>
            <p style={{ textAlign: 'center' }} className="fp-p">Create your online portfolio and connect with directors, producers & people in the film industry for auditions</p>
          </div>
          <div style={{ width: '100%' }}>
            <div className={classes.GoogleContainer}>
              <button onClick={continueWithGoogleHandler} className={classes.GoogleBtn}>
                <img className={classes.GoogleLogo} src={GOOGLE} alt="G"/>
                <h6 className={[classes.GoogleHeading, 'ion-no-margin ion-no-padding'].join(' ')}>Continue with Google</h6>
              </button>
            </div>
            <div className={classes.LoginContainer}>
              <Link to="/login-via-mobile" className={classes.LoginBtn}>
                Login with Mobile Number
              </Link>
            </div>
          </div>
        </div>
      </IonGrid>
    </IonPage>
  )
}

Auth.propTypes = {
  authenticate: PropTypes.func.isRequired,
  signUp: PropTypes.func.isRequired
}

const mapDispatchToProps = dispatch => {
  return {
    authenticate: (uid, spToken, idpToken, name, pp, profileComplete) => dispatch(authenticate(uid, spToken, idpToken, name, pp, profileComplete))
  }
}

export default connect(null, mapDispatchToProps)(Auth)
