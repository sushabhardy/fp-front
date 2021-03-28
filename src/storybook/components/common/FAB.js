/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { Fab, Icon } from '@material-ui/core'
import React, { Component } from 'react'

const FAB = props => {
  return (
    <Fab onClick={props.onClicked} variant="extended" disabled={props.disabled}>
        { props.iconName ? <Icon>{props.iconName}</Icon> : null}
        {props.buttonText}
    </Fab>
  )
}

export default FAB
