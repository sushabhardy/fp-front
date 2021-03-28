import React from 'react'
import PropTypes from 'prop-types'
import { IonModal } from '@ionic/react'

const EditBlockedUsers = props => {
  return (
    <IonModal isOpen={props.show}>
    </IonModal>
  )
}

EditBlockedUsers.propTypes = {
  close: PropTypes.func.isRequired,
  show: PropTypes.bool.isRequired
}

export default EditBlockedUsers
