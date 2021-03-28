/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useEffect, useState, useHistory, useRef } from 'react'
import PropTypes from 'prop-types'
import SwipeableViews from 'react-swipeable-views'
import { Player, ControlBar, PlayToggle, LoadingSpinner, BigPlayButton } from 'video-react'

import '../../css/video.css'
import { MobileStepper, Button, Avatar } from '@material-ui/core'
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft'
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight'

import LikeIcon from '../../assets/icons/newsfeed/like.svg'
import CommentIcon from '../../assets/icons/newsfeed/comment.svg'
import ShareIcon from '../../assets/icons/newsfeed/share.svg'

import FilledLikeIcon from '../../assets/icons/newsfeed/like-filled.svg'
import FilledCommentIcon from '../../assets/icons/newsfeed/comment-filled.svg'
import axios from '../../../axios/axios'
import share from '../../utils/share'
import ReactTimeago from 'react-timeago'
import { getHeaders } from '../../../utils/util'
import PP_PLACEHOLDER from '../../../images/pp.png'

function PostCard (props) {
  const [index, setIndex] = useState(0)
  const [ppUri] = useState(PP_PLACEHOLDER)
  const [liked, setLiked] = useState(props.isLiked)
  const isMountedRef = useRef(null)
  const [error, setError] = useState(null)
  const [likesCount, setLikesCount] = useState(parseInt(props.likesCount))

  const likePostHandler = async (e) => {
    e.preventDefault()
    setLiked(liked => !liked)
    liked ? setLikesCount(likesCount => likesCount - 1) : setLikesCount(likesCount => likesCount + 1)
    let response
    try {
      response = await axios.post('/newsfeed/likes', { postId: props.id }, { headers: getHeaders() })
    } catch (e) {
      console.log(e)
      setLiked(liked => !liked)
    }
    const { data: { error, message } } = response
    error && setLiked(liked => !liked)
    error && setError(message)
  }

  const gotoPostHandler = (e) => {}

  return (
        <div className="fp-card fp-overflow-hidden">
            <div className="fp-avatar-summary fp-margin-bottom-small" onClick={props.onClickAvatar}>
                <Avatar alt={props.creatorName} src={props.ppSrc}>
                    {props.creatorName[0]}
                </Avatar>
                <div className="fp-user-summary">
                    <div className="fp-user-full-name">{props.creatorName}</div>
                    <div className="fp-username">@{props.creatorUsername}</div>
                </div>
            </div>
            {props.media.length > 0 && <div className="fp-newsfeed-post-media-viewer fp-margin-bottom-small">
                <SwipeableViews
                    onChangeIndex={index => {
                      setIndex(index)
                    }}
                    enableMouseEvents
                    index = {index}
                >
                    {
                        props.media.map((media, index) => {
                          if (media.mediaType === 'img') { return <img key={index} style={{ pointerEvents: 'none', width: '100%', height: 'auto', display: 'block' }} src={media.thumbnail || media.src} /> } else if (media.mediaType === 'video') {
                            return (
                                    <Player
                                        key={index}
                                        playsInline
                                        poster={media.thumbnail}
                                        src={media.src}
                                        fluid={false}
                                        height={'100%'}
                                        width={'auto'}
                                    >
                                        <BigPlayButton position="center" />
                                        <ControlBar autoHide={false}>
                                            <LoadingSpinner />
                                            <PlayToggle />
                                        </ControlBar>
                                    </Player>
                            )
                          }
                        })
                    }
                </SwipeableViews>
                <MobileStepper
                    variant="dots"
                    steps={props.media.length}
                    position="static"
                    className="fp-newsfeed-post-media-viewer-control"
                    activeStep={index}
                    nextButton={
                        <Button size="small" onClick={() => {}}>
                            <KeyboardArrowRight />
                        </Button>
                    }
                    backButton={
                        <Button size="small" onClick={() => {}}>
                            <KeyboardArrowLeft />
                        </Button>
                    }
                />
            </div>}
            <div className="fp-newsfeed-post-body fp-margin-bottom-small">
                <div className="fp-post-timeago fp-margin-bottom-xxx-small">
                    Posted <ReactTimeago date = {props.createdTime}/>
                </div>
                <span>
                    {props.body}
                </span>
            </div>
            <div className="fp-newsfeed-post-actions">
                <div onClick={likePostHandler} className={liked ? 'fp-liked' : ''}>
                    {
                        liked
                          ? <img src={FilledLikeIcon}/>
                          : <img src={LikeIcon}/>
                    }
                    <span>
                        {likesCount}
                    </span>
                </div>
                <div onClick={gotoPostHandler} className={props.commented ? 'fp-commented' : ''}>
                    {
                        props.commented
                          ? <img src={FilledCommentIcon}/>
                          : <img src={CommentIcon}/>
                    }
                    <span>
                        {props.commentsCount}
                    </span>
                </div>
                <div>
                    <img src={ShareIcon} onClick={() => share('post', props.postDetails)}/>
                    <span>Share</span>
                </div>
            </div>
        </div>
  )
}

export default PostCard
