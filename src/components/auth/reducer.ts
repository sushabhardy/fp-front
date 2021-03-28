import * as actionTypes from './actionTypes'

const initialState = {
  error: null,
  loading: false,
  otpVerified: false,
  spToken: null,
  idpToken: null,
  uid: null,
  otpSent: false,
  mobile: null,
  profileComplete: false
}

export const logout = (state, action) => {
  return {
    ...state,
    spToken: null,
    uid: null,
    otpVerified: false,
    loading: false,
    error: null,
    otpSent: false
  }
}

export const verifyOTPStart = (state, action) => {
  return {
    ...state,
    loading: true,
    otpVerified: false,
    spToken: null,
    uid: null
  }
}

export const verifyOTPSuccess = (state, action) => {
  return {
    ...state,
    loading: false,
    error: null,
    otpVerified: true,
    profileComplete: true
  }
}

export const verifyOTPFail = (state, action) => {
  return {
    ...state,
    loading: false,
    error: action?.error,
    otpVerified: false,
    spToken: null
  }
}

export const authenticate = (state, action) => {
  return {
    ...state,
    loading: false,
    spToken: action?.spToken,
    idpToken: action?.idpToken,
    uid: action?.uid,
    name: action?.name,
    pp: action?.pp,
    profileComplete: action?.profileComplete
  }
}

export const dismissError = (state, action) => {
  return {
    ...state,
    error: null,
    spToken: null,
    loading: false,
    uid: null,
    otpVerified: false
  }
}

export const otpSendStart = (state, action) => {
  return {
    ...state,
    loading: true,
    mobile: action?.mobile,
    error: action?.error,
    otpSent: false
  }
}

export const otpSendFail = (state, action) => {
  return {
    ...state,
    loading: false,
    error: action?.error,
    otpSent: false
  }
}

export const otpSendSuccess = (state, action) => {
  return {
    ...state,
    loading: false,
    error: null,
    otpSent: true
  }
}

export const verifyMobile = (state, action) => {
  return {
    ...state,
    mobile: action?.mobile
  }
}

export const completeProfile = (state, action) => {
  return {
    ...state,
    profileComplete: true
  }
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.VERIFY_OTP_START: return verifyOTPStart(state, action)
    case actionTypes.VERIFY_OTP_FAIL: return verifyOTPFail(state, action)
    case actionTypes.VERIFY_OTP_SUCCESS: return verifyOTPSuccess(state, action)
    case actionTypes.AUTHENTICATE: return authenticate(state, action)
    case actionTypes.DISMISS_ERROR: return dismissError(state, action)
    case actionTypes.LOGOUT: return logout(state, action)
    case actionTypes.OTP_SEND_START: return otpSendStart(state, action)
    case actionTypes.OTP_SEND_SUCCESS: return otpSendSuccess(state, action)
    case actionTypes.OTP_SEND_FAIL: return otpSendFail(state, action)
    case actionTypes.VERIFY_MOBILE: return verifyMobile(state, action)
    case actionTypes.COMPLETE_PROFILE: return completeProfile(state, action)
    default: return state
  }
}

export default reducer
