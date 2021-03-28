import { IonIcon } from '@ionic/react'
import React from 'react'
import classes from './style.module.css'
import { homeOutline, search, add, film, person } from 'ionicons/icons'
import { NavLink } from 'react-router-dom'

const FPTabs = props => {
  return (
    <div className={classes.Tabs}>
      <NavLink activeClassName={classes.Active} className={classes.Tab} to="/newsfeed">
        <IonIcon icon={homeOutline} />
      </NavLink>
      <NavLink activeClassName={classes.Active} className={classes.Tab} to="/discover">
        <IonIcon icon={search} />
      </NavLink>
      <NavLink activeClassName={classes.Active} className={classes.Tab} to="/create-post">
        <IonIcon icon={add} />
      </NavLink>
      <NavLink activeClassName={classes.Active} className={classes.Tab} to="/auditions">
        <IonIcon icon={film} />
      </NavLink>
      <NavLink activeClassName={classes.Active} className={classes.Tab} to="/profile">
        <IonIcon icon={person} />
      </NavLink>
    </div>
  )
}

FPTabs.propTypes = {

}

export default FPTabs
