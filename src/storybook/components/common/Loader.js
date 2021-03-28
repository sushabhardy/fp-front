/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from 'react'
import PropTypes from 'prop-types'
import { CircularProgress, createMuiTheme, ThemeProvider } from '@material-ui/core'
import theme from '../../theme'

function Loader (props) {
  return (
        <ThemeProvider theme={createMuiTheme(theme)}>
            <div className={'fp-loader ' + (props.variant || 'inline')}>
                <div className="fp-loader-wrapper">
                    <div className="fp-loader-progress-wrapper">
                        <CircularProgress size={64}/>
                    </div>
                    <div className="fp-loader-progress-title">
                        {props.title}
                    </div>
                </div>
            </div>
        </ThemeProvider>
  )
}

export default Loader
