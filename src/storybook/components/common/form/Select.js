/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { FormControl, Icon, InputLabel, MenuItem, Select, TextField } from '@material-ui/core'
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles'
import React, { Component } from 'react'
import theme from '../../../theme.js'
import LabelWithIcon from './LabelWithIcon.js'

const TextInput = props => (
  <ThemeProvider theme={createMuiTheme(theme)}>
    <FormControl>
      <InputLabel id="demo-simple-select-label">
        <LabelWithIcon
            labelText={props.labelText}
            labelIcon={props.labelIcon}
        />
      </InputLabel>
      <Select
        labelId="demo-simple-select-label"
        variant="filled"
        {...props}
      >
        {
          props.options.map((o, i) => <MenuItem key={i} value={o.value}>{o.label}</MenuItem>)
        }
      </Select>
    </FormControl>
  </ThemeProvider>
)

export default TextInput
