import { IonCol, IonGrid, IonRow, IonSlide, IonSlides, IonImg } from '@ionic/react'
import React from 'react'
import PropTypes from 'prop-types'

const slideOpts = {
  initialSlide: 1,
  speed: 400,
  spaceBetween: 20
}
const Media = props => {
  return props.photos && props.photos.length !== 0
    ? (
      <IonGrid className="ion-no-padding ion-no-margin">
        <IonRow style={{ height: '10rem' }}>
          <IonCol size="12">
            <IonSlides key={props.photos.length} style={{ height: '10rem' }} pager={true} options={slideOpts}>
              {props.photos.map(({ src }, i) => (
                <IonSlide key={i}>
                  <IonImg src={src} />
                </IonSlide>
              ))}
            </IonSlides>
          </IonCol>
        </IonRow>
      </IonGrid>
      )
    : null
}

Media.propTypes = {
  photos: PropTypes.array,
  videos: PropTypes.array,
  audios: PropTypes.array
}

export default Media
