import React from 'react'
import PropTypes from 'prop-types'
import { IonModal } from '@ionic/react'

const EditLinks = props => {
  return (
    <IonModal isOpen={props.show}>
    </IonModal>
  )
}

EditLinks.propTypes = {
  close: PropTypes.func.isRequired,
  show: PropTypes.bool.isRequired
}

export default EditLinks
