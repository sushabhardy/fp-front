import React from 'react'
import LOGO from '../../images/logo-small.png'
import classes from './style.module.css'

const Logo = props => {
  return (
    <div className={classes.Logo}>
      <img className={classes.LogoImage} src={LOGO} alt="FP" />
    </div>
  )
}

Logo.propTypes = {

}

export default Logo
