/* eslint-disable react/prop-types */
/* eslint-disable import/no-duplicates */
import React from 'react'
import './userbox.css'
import pp from './cover.jpg'
import cover from './cover.jpg'

function UserBox (props) {
  return (
    <div className="fp-user-box">
        <div className="fp-user-cover">
          <img src={props.cover || cover} alt="cover" />
        </div>
        <div className="fp-user-pp">
          <img src={props.pp || pp} alt="cover" />
        </div>
        <div className="fp-user-box-summary">
          <h4 className="fp-h4 fp-user-box-full-name">{props.name}</h4>
          <p className="fp-p fp-user-box-username">@{props.username}</p>
        </div>
    </div>
  )
}

export default UserBox
