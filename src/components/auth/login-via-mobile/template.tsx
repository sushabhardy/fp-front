/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
import React, { useRef, useState } from 'react'
import { IonAlert, IonButton, IonButtons, IonToast, IonCol, IonGrid, IonHeader, IonIcon, IonInput, IonItem, IonLabel, IonLoading, IonPage, IonRow, IonTitle, IonToolbar } from '@ionic/react'
import { connect } from 'react-redux'
import { sendOTP, dismissError } from '../actions'
import PropTypes from 'prop-types'
import classes from './style.module.css'
import { arrowBack } from 'ionicons/icons'
import Logo from '../../logo/template'
import { Link } from 'react-router-dom'
import Header from '../../../storybook/components/common/Header'
import TextInput from '../../../storybook/components/common/form/TextInput'
import FAB from '../../../storybook/components/common/FAB'

const LoginViaMobile = props => {
  const [showToast, setShowToast] = useState(false)
  const [mobile, setMobile] = useState(null)

  const loginHandler = (e) => {
    e.preventDefault()
    mobile && props.sendOTP(mobile)
  }

  return (
    <IonPage>
      <IonGrid className="ion-no-margin ion-no-padding">
        <IonGrid>
          {/** Mobile */}
          <IonRow>
            <IonCol size="12">
              <Header
                headerTitle="Login"
                headerSubtitle="Enter your mobile number"
                onBack={() => {}}
              />
              <div
                style={{
                  padding: '24px'
                }}
              >
                <TextInput
                  onChange={(e) => setMobile(e.target.value)}
                  labelIcon="phone_android"
                  labelText="Mobile number"
                  placeholder=""
                />
                <p>Forgot mobile number ? Try to <span className="fp-color-hot-pink">Login with Google</span></p>
              </div>
            </IonCol>
          </IonRow>
          {/** Submit */}
          <IonRow>
            {/* <IonCol>
              <IonButton className={[classes.LoginBtn].join(' ')} fill="solid" expand="full" onClick={loginHandler}>
              Submit
              </IonButton>
            </IonCol> */}
            <div
              style={{
                backgroundImage: 'linear-gradient(0deg, #ccc, #fff)',
                height: '200vh'
              }}
            >
              <FAB
                onClicked={loginHandler}
                buttonText="Login"
                iconName=""
              />
            </div>
          </IonRow>
        </IonGrid>
        <IonAlert
          isOpen={!!props.error || false}
          onDidDismiss={() => props.dismissError()}
          header={'Error occured'}
          message={props.error || 'Unknown eror'}
          buttons={['OK']}
        />
        <IonLoading
          isOpen={props.loading || false}
          message={'Sending OTP...'}
        />
      </IonGrid>
    </IonPage>
  )
}

LoginViaMobile.propTypes = {
  sendOTP: PropTypes.func.isRequired,
  loading: PropTypes.bool,
  dismissError: PropTypes.func.isRequired,
  error: PropTypes.string
}

const mapStateToProps = state => {
  return {
    loading: state.auth?.loading,
    error: state.auth?.error
  }
}

const mapDispatchToProps = dispatch => {
  return {
    sendOTP: (mobile) => dispatch(sendOTP(mobile)),
    dismissError: () => dispatch(dismissError())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginViaMobile)
