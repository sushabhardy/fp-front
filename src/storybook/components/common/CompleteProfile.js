/* eslint-disable react/prop-types */
import React from 'react'
import './complete-profile.css'
import { Icon } from '@material-ui/core'

function CompleteProfile (props) {
  return (
      <div className="fp-complete-profile-box">
            <h4 className="fp-h2 fp-complete-profile-box-heading">Complete <br /> your profile</h4>
            <div className="fp-complete-profile-box-perentage">
              <div className="fp-complete-profile-box-completion">
              </div>
            </div>
            <div className="fp-complete-profile-box-next">
              <p>{props.next}</p>
              <Icon className="fp-icon-small">{props.icon || 'arrow_forward_ios_new'}</Icon>
            </div>
      </div>
  )
}

export default CompleteProfile
