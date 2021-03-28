import React from 'react'
import PropTypes from 'prop-types'
import { IonModal } from '@ionic/react'

const EditExperience = props => {
  return (
    <IonModal isOpen={props.show}>
    </IonModal>
  )
}

EditExperience.propTypes = {
  close: PropTypes.func.isRequired,
  show: PropTypes.bool.isRequired
}

export default EditExperience
