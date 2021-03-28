/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */

import React, { useState } from 'react'

function Link (props) {
  return (
    <a href={props.href} target={props.target} className={'fp-link ' + props.className}>
        {props.children}
    </a>
  )
}

export default Link
