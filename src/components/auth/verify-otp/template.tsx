import React, { useEffect, useState } from 'react'
import { IonAlert, IonButton, IonCol, IonGrid, IonLabel, IonPage, IonRow } from '@ionic/react'
import { connect } from 'react-redux'
import { dismissError, verifyOTP, resendOTP } from '../actions'
import PropTypes from 'prop-types'
import Header from '../../../storybook/components/common/Header'
import OTPInput from '../../../storybook/components/common/form/OTP_Input'
import FAB from '../../../storybook/components/common/FAB'
import Loader from '../../../storybook/components/common/Loader'

const VerifyOTP = props => {
  const [timer, setTimer] = useState(null)
  const [enableResendOTPButton, setEnableResendOTPButton] = useState(false)
  const [timeLeft, setTimeLeft] = useState(30)
  const [otp, setOtp] = useState('')

  const verifyOTPHandler = (e) => {
    e.preventDefault()
    props.mobile && otp && props.verifyOTP(props.mobile, otp)
  }

  const countDown = () => {
    return setInterval(() => {
      setTimeLeft(prevTimeLeft => prevTimeLeft - 1)
    }, 1000)
  }

  useEffect(() => {
    if (timeLeft === 0 && timer) {
      clearInterval(timer)
      setTimeLeft(30)
      setEnableResendOTPButton(true)
    }
    if (!timer) {
      setTimer(countDown)
      setEnableResendOTPButton(false)
    }
    return () => {
      timeLeft === 0 && timer && clearInterval(timer)
    }
  }, [timeLeft])

  const resendOTP = (e) => {
    console.log('a')
    e.preventDefault()
    setTimer(countDown)
    setEnableResendOTPButton(false)
    props.resendOTP(props.mobile)
  }

  return (
    <IonPage>
      <IonGrid className="ion-no-padding">
        <IonGrid>
          {/** OTP */}
          <IonRow>
            <IonCol size="12">
              <Header
                headerTitle="Verify your mobile"
                headerSubtitle="We have sent a one-time password (OTP) to your mobile number"
                withSeparator
                goBackTo="/login-via-mobile"
                onBack={() => {}}
              />
              <div style={{ margin: '0 auto' }}>
                <p className="ion-text-center">Please enter the 6-digit OTP sent to <p className="ion-text-center fp-color-hot-pink"><strong>{props.mobile}</strong></p></p>
              </div>
              <div
                style={{
                  padding: '24px'
                }}
              >
                <OTPInput
                  onChange={(e) => setOtp(e)}
                  isInputNum={true}
                  numInputs={6}
                  otp={otp}
                />
              </div>
              <div className="ion-text-center">
                {enableResendOTPButton ? <IonButton color="danger" className="ion-no-margin ion-no-padding" type="reset" fill="clear" onClick={resendOTP}>Resend</IonButton> : null}
                {!enableResendOTPButton ? <IonLabel>{`${timeLeft}`}</IonLabel> : null}
              </div>
            </IonCol>
          </IonRow>
          {/** Submit */}
          <IonRow>
            <div
              style={{
                backgroundImage: 'linear-gradient(0deg, #ccc, #fff)',
                height: '200vh'
              }}
            >
              <FAB
                onClicked={verifyOTPHandler}
                buttonText="Verify"
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
        {props.loading &&
        <Loader
          title="Verifying..."
          variant="fullscreen-bottom"
        />}
      </IonGrid>
    </IonPage>
  )
}

VerifyOTP.propTypes = {
  verifyOTP: PropTypes.func.isRequired,
  resendOTP: PropTypes.func.isRequired,
  dismissError: PropTypes.func.isRequired,
  mobile: PropTypes.string.isRequired,
  loading: PropTypes.bool,
  error: PropTypes.string
}

const mapStateToProps = state => {
  return {
    mobile: state.auth?.mobile,
    loading: state.auth?.loading,
    error: state.auth?.error,
    isAuthenticated: state.auth?.spToken !== null
  }
}

const mapDispatchToProps = dispatch => {
  return {
    verifyOTP: (mobile, otp) => dispatch(verifyOTP(mobile, otp)),
    resendOTP: (mobile) => dispatch(resendOTP(mobile)),
    dismissError: () => dispatch(dismissError())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(VerifyOTP)
