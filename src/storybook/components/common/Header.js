/* eslint-disable react/prop-types */
import { Button, Icon } from '@material-ui/core'
import React from 'react'
import { Link } from 'react-router-dom'

const Header = props => {
  return (
        <div className={'fp-header' + (props.withSeparator ? ' with-separator' : ' ')}>
            <div className="fp-header-nav">
                <Link style={{ textDecoration: 'none' }} to={props.goBackTo || '/'}>
                    <Button onClick={props.onBack}>
                        <Icon color="black">{props.icon || 'arrow_back_ios_new'}</Icon>
                    </Button>
                </Link>
            </div>
            <div className={'fp-header-ts-wrapper' + (props.imgNode ? ' with-img' : ' ')}>
                <div className="fp-header-ts-main">
                    <h1>{props.headerTitle}</h1>
                    <p>{props.headerSubtitle}</p>
                </div>
                {
                    props.imgNode
                      ? <div className="fp-header-ts-img-container">
                        <img style={{ opacity: '0.2', height: '3.4rem', width: '3.4rem' }} src={props.imgNode} />
                    </div>
                      : null
                }
            </div>
        </div>
  )
}

export default Header
