/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { Icon, TextField } from '@material-ui/core'
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles'
import React, { Component } from 'react'
import theme from '../../../theme.js'
import LabelWithIcon from './LabelWithIcon.js'

const TextInput = props => (
  <ThemeProvider theme={createMuiTheme(theme)}>
    <TextField
      onChange={props.onChange}
      variant="filled"
      {...props}
      label = {
        <LabelWithIcon
          labelText={props.labelText}
          labelIcon={props.labelIcon}
        />
      }
    />
  </ThemeProvider>
)

export default TextInput
