import { IonPage, IonThumbnail, IonContent, IonGrid, IonHeader, IonButtons, IonIcon, IonTitle, IonToolbar } from '@ionic/react'
import React from 'react'
import classes from './style.module.css'
import logo from '../../images/logo-small.png'
import { paperPlaneOutline, notificationsOutline } from 'ionicons/icons'
import { CATEGORIES } from '../../utils/util'
import { useHistory } from 'react-router'

const Discover = props => {
  const history = useHistory()

  const gotoProfileFilter = (e, category) => {
    e.preventDefault()
    const queryParams = [
      'category=' + encodeURIComponent(category)
    ]
    history.push({
      pathname: '/filter-profiles',
      search: queryParams.join('&')
    })
  }
  return (
    <IonPage>
      <IonGrid className={[classes.Discover, 'ion-no-padding', 'ion-no-margin'].join(' ')}>
        <IonHeader className="ion-no-margin ion-no-padding">
          <IonToolbar className="ion-no-margin ion-no-padding">
            <IonButtons className="ion-padding-horizontal ion-no-margin" slot="start">
              <IonIcon icon={notificationsOutline}/>
            </IonButtons>
            <IonTitle className="ion-padding-horizontal ion-text-center">
              <img className={classes.Logo} src={logo} />
            </IonTitle>
            <IonButtons className="ion-padding-horizontal ion-no-margin" slot="end">
              <IonIcon icon={paperPlaneOutline}/>
            </IonButtons>
          </IonToolbar>
        </IonHeader>
        <IonContent className="padding">
          {Object.keys(CATEGORIES).map((category, i) => (
            <div onClick={(e) => gotoProfileFilter(e, CATEGORIES[category].name)} className={classes.ThumbnailContainer} key={i} >
              <IonThumbnail className={classes.Thumbnail}>
                <img className={classes.ThumbnailImage} src={CATEGORIES[category].imgSrc} />
                <h3 className={classes.ThumbnailHeading}>{CATEGORIES[category].name}</h3>
              </IonThumbnail>
            </div>
          ))}
        </IonContent>
      </IonGrid>
    </IonPage>
  )
}

Discover.propTypes = {

}

export default Discover
