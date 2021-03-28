import React from 'react';

const Button = props => {
    return (
        <a onClick={props.onClick} className={"fp-button " + "fp-button-variant-" + (props.variant || 'default') + ' ' + props.className}>
            {props.children}
        </a>
    )
}


export default Button;