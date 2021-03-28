import React, { useState } from 'react'
import { IonItem, IonButton, IonLabel, IonChip, IonAvatar, IonImg } from '@ionic/react'
import logo from '../../../../images/logo-small.png'
import PropTypes from 'prop-types'
import axios from '../../../../axios/axios'

const ProfileSmall = props => {
  const [following, setFollowing] = useState(props.isFollowing)

  const followHandler = async () => {
    setFollowing(true)
    const { data: { success, followed, error } } = await axios.put(`/follow/ckivd1ogw0000zsleh6uj0hta/${props.id}`)
    success && setFollowing(followed)
    error && setFollowing(false)
  }

  return (
    <IonItem>
      <IonAvatar className="ion-no-border" slot="start">
        <IonImg src={props.pp || logo} />
      </IonAvatar>
      <IonLabel>
        <h3>{props.firstName + ' ' + props.lastName}</h3>
        <p>{props.about || 'Hey there!. Up for work.'}</p>
        <IonChip color="primary"><p>{props.followersCount || 0} Followers</p></IonChip>
        <IonButton onClick={followHandler} style={{ fontSize: '0.7rem' }} size="small" fill={following ? 'outline' : 'solid'} slot="end">{following ? 'FOLLOWING' : 'FOLLOW'}</IonButton>
      </IonLabel>
    </IonItem>
  )
}

ProfileSmall.propTypes = {
  id: PropTypes.string.isRequired,
  firstName: PropTypes.string.isRequired,
  lastName: PropTypes.string.isRequired,
  about: PropTypes.string.isRequired,
  isFollowing: PropTypes.bool,
  followersCount: PropTypes.string.isRequired,
  pp: PropTypes.string.isRequired,
  viewsCount: PropTypes.string.isRequired
}

export default ProfileSmall
