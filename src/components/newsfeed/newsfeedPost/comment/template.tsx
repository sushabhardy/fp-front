import React from 'react'
import PropTypes from 'prop-types'
import { IonGrid, IonRow, IonCol, IonAvatar, IonLabel, IonItem } from '@ionic/react'
import classes from './style.module.css'
import TimeAgo from 'timeago-react'
import PP_PLACE_HOLDER from '../../../../images/pp.png'

const Comment = props => {
  return (
    <IonGrid className={[classes.CommentCtr, 'ion-no-margin'].join(' ')}>
      <IonRow>
        <IonCol size="12">
          <IonItem className={[classes.Comment, 'ion-no-padding'].join(' ')}>
            <IonAvatar className="ion-no-border" slot="start">
              <img className={classes.CommentAvatar} src={props.ppStoragePath || PP_PLACE_HOLDER} />
            </IonAvatar>
            <IonLabel>
              <h6 className={classes.CommentName}>{props.commentorName}</h6>
              <p className={classes.CommentTime}> {<TimeAgo datetime={new Date(props.createdTime)} />}</p>
            </IonLabel>
          </IonItem>
        </IonCol>
      </IonRow>
      <IonRow>
        <IonCol size="12">
          <IonLabel>
            <p className={[classes.CommentBody, 'ion-margin-top'].join(' ')}> {props.comment} </p>
          </IonLabel>
        </IonCol>
      </IonRow>
    </IonGrid>
  )
}

Comment.propTypes = {
  comment: PropTypes.string.isRequired,
  ppStoragePath: PropTypes.string.isRequired,
  commentorName: PropTypes.string.isRequired,
  createdTime: PropTypes.number.isRequired
}

export default Comment
