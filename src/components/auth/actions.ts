import * as actionTypes from './actionTypes'
import { push } from 'react-router-redux'
import axios from '../../axios/axios'
import { auth } from '../../firebase'

export const verifyOTPStart = () => {
  return {
    type: actionTypes.VERIFY_OTP_START
  }
}

export const verifyOTPSuccess = () => {
  return {
    type: actionTypes.VERIFY_OTP_SUCCESS
  }
}

export const verifyOTPFail = (error) => {
  return {
    type: actionTypes.VERIFY_OTP_FAIL,
    error: error
  }
}

export const authenticateSuccess = (uid, spToken, idpToken, name, pp, profileComplete = true) => {
  return {
    type: actionTypes.AUTHENTICATE,
    spToken: spToken,
    idpToken: idpToken,
    uid: uid,
    name: name,
    pp: pp,
    profileComplete: profileComplete
  }
}

export const oTPSendStart = (mobile) => {
  return {
    type: actionTypes.OTP_SEND_START,
    mobile: mobile
  }
}

export const oTPSendSuccess = () => {
  return {
    type: actionTypes.OTP_SEND_SUCCESS
  }
}

export const oTPSendFail = (error) => {
  return {
    type: actionTypes.OTP_SEND_FAIL,
    error: error
  }
}

export const dismissError = () => {
  return {
    type: actionTypes.DISMISS_ERROR
  }
}

export const sendOTP = (mobile) => {
  return async dispatch => {
    try {
      dispatch(oTPSendStart(mobile))
      const { data: { success, error, message, userId, customToken } } = await axios.post('/auth/sendOTP', { mobile })
      success && dispatch(oTPSendSuccess())
      success && userId && localStorage.setItem('userId', userId)
      !success && error && dispatch(oTPSendFail(message))
      const idpToken = await (await auth.signInWithCustomToken(customToken)).user.getIdToken()
      success && customToken && localStorage.setItem('idpToken', idpToken)
    } catch (e) {
      console.log(e)
      dispatch(oTPSendFail(e.message))
    }
  }
}

/**
 * Verify OTP Handler
 * @param identifier
 * @param otp
 */
export const verifyOTP = (identifier, otp) => {
  return async dispatch => {
    try {
      dispatch(verifyOTPStart())
      const userId = localStorage.getItem('userId')
      /**
       * Do SP Login and get spToken from SP
       */
      const idpToken = localStorage.getItem('idpToken')
      const { data: { success, error, name, spToken, message, pp = '', profileComplete = true } } = await axios.post('/auth/verifyOTP', { mobile: identifier, otp: otp, userId, idpToken: idpToken })
      success && localStorage.setItem('spToken', spToken)
      success && localStorage.setItem('name', name)
      success && dispatch(authenticate(userId, spToken, idpToken, name, pp, profileComplete))
      success && dispatch(verifyOTPSuccess())
      error && dispatch(verifyOTPFail(message))
    } catch (e) {
      console.log(e)
      dispatch(verifyOTPFail(e.message))
    }
  }
}

export const resendOTP = (mobile) => {
  return async dispatch => {
    try {
      const { data: { success, error } } = await axios.post('/auth/resendOTP', { mobile })
      success && dispatch(oTPSendSuccess())
      error && dispatch(verifyOTPFail(error))
    } catch (e) {
      console.log(e)
      dispatch(verifyOTPFail(e.message))
    }
  }
}

export const logoutSuccess = () => {
  return {
    type: actionTypes.LOGOUT
  }
}

export const logout = () => {
  return dispatch => {
    dispatch(logoutSuccess())
    dispatch(push('/auth'))
  }
}

export const authenticate = (uid, spToken, idpToken, name, pp, profileComplete) => {
  return dispatch => {
    dispatch(authenticateSuccess(uid, spToken, idpToken, name, pp, profileComplete))
    dispatch(push('/newsfeed'))
  }
}

export const verifyMobile = (mobile) => {
  return {
    type: actionTypes.VERIFY_MOBILE,
    mobile: mobile
  }
}

export const completeProfile = () => {
  return {
    type: actionTypes.COMPLETE_PROFILE
  }
}
