/* eslint-disable react/prop-types */
/* eslint-disable camelcase */
/* eslint-disable no-unused-vars */
import React, { useState } from 'react'
import PropTypes from 'prop-types'
import OtpInput from 'react-otp-input'

function OTPInput (props) {
  return (
        <div>
            <OtpInput
                onChange={(props.onChange)}
                {...props}
                value={props.otp}
                containerStyle='fp-otp-input-container'
                inputStyle='fp-otp-input'
                focusStyle='fp-otp-input--focus'
                disabledStyle='fp-otp-input--disabled'
                errorStyle='fp-otp-input--error'
            />
        </div>
  )
}

export default OTPInput
