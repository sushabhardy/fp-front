import React from 'react'
import classes from './style.module.css'
import loader from '../../images/loader.svg'

const InlineLoader = props => {
  return (
    <img
      src={loader}
      className={classes.InlineLoader}
    />
  )
}

export default InlineLoader
