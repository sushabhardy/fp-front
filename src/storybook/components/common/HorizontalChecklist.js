/* eslint-disable react/prop-types */
import { Icon } from '@material-ui/core'
import React from 'react'

const HorizontalChecklist = props => {
  return (
        <div className="horizontal-checklist">
            {
                props.items.map((p, i) => {
                  var current = i === props.currentlyActive
                  var done = i < props.currentlyActive
                  return (
                        <div key={i} className={'horizontal-checklist-item' + (current ? ' current' : ' ') + (done ? ' done' : ' ') }>
                            <div className="horizontal-checklist-item--indicator">
                                {
                                    done ? <Icon>check_circle</Icon> : <Icon>radio_button_unchecked</Icon>
                                }
                            </div>
                            <div className="horizontal-checklist-item--content">
                                <span>
                                    {p.itemName}
                                </span>
                            </div>
                        </div>
                  )
                })
            }
        </div>
  )
}

export default HorizontalChecklist
