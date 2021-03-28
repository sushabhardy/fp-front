/* eslint-disable react/prop-types */
import { Icon } from '@material-ui/core'
import React from 'react'

const LabelWithIcon = props => {
  return (
      <div className="fp-label-with-icon-wrapper">
        <Icon {...props}>{props.labelIcon}</Icon>
        <span>{props.labelText}</span>
      </div>
  )
}

export default LabelWithIcon
