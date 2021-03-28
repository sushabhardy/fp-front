import React from 'react'
import PropTypes from 'prop-types'
import { IonModal } from '@ionic/react'

const EditVideos = props => {
  return (
    <IonModal isOpen={props.show}>
    </IonModal>
  )
}

EditVideos.propTypes = {
  close: PropTypes.func.isRequired,
  show: PropTypes.bool.isRequired
}

export default EditVideos
