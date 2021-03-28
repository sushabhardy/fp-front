import React, { useState } from 'react';

export default {
    component: null,
  title: 'StyleGuide/Colors'
};

const Template = args => {
    const [show, toggle] = useState(false);

    return(
        <div className="fp-container">
            <h1 className="fp-h1 fp-margin-bottom-medium">Color Tokens</h1>

            <div className="fp-subtitle fp-margin-bottom-medium">
                Usage: fp-color-*, fp-bg-color-* <br/>
                * denotes one of the tokens below
            </div>
            <div className="fp-margin-bottom-xx-small">
                <span style={{width: '120px', display:'inline-block'}}>blue</span>
                &nbsp;
                <span className="fp-bg-color-blue" style={{display:'inline-block', height: '24px', width: '24px', verticalAlign: 'middle'}}></span>
            </div>
            <div className="fp-margin-bottom-xx-small">
                <span style={{width: '120px', display:'inline-block'}}>warm-blue</span>
                &nbsp;
                <span className="fp-bg-color-warm-blue" style={{display:'inline-block', height: '24px', width: '24px', verticalAlign: 'middle'}}></span>
            </div>
            <div className="fp-margin-bottom-xx-small">
                <span style={{width: '120px', display:'inline-block'}}>hot-pink</span>
                &nbsp;
                <span className="fp-bg-color-hot-pink" style={{display:'inline-block', height: '24px', width: '24px', verticalAlign: 'middle'}}></span>
            </div>
            <div className="fp-margin-bottom-xx-small">
                <span style={{width: '120px', display:'inline-block'}}>blueblack</span>
                &nbsp;
                <span className="fp-bg-color-blueblack" style={{display:'inline-block', height: '24px', width: '24px', verticalAlign: 'middle'}}></span>
            </div>
            <div className="fp-margin-bottom-xx-small">
                <span style={{width: '120px', display:'inline-block'}}>pink</span>
                &nbsp;
                <span className="fp-bg-color-pink" style={{display:'inline-block', height: '24px', width: '24px', verticalAlign: 'middle'}}></span>
            </div>
        </div>
    )
};

export const Default = Template.bind({});
Default.args = {
    startFrom: 0.2,
    bodyHeight: '200vh'
};
