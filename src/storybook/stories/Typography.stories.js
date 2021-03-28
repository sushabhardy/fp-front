import React, { useState } from 'react';

export default {
    component: null,
  title: 'StyleGuide/Typography'
};

const Template = args => {
    const [show, toggle] = useState(false);

    return(
        <div className="fp-container">
            <h1 className="fp-h1 fp-margin-bottom-xx-large">Typography</h1>

            <h1 className="fp-h2 fp-margin-bottom-medium">Font Weights</h1>
            <div className="fp-subtitle fp-margin-bottom-small">
                Usage: fp-font-weight-*
            </div>
            <div className="fp-margin-bottom-xx-large">
                <span style={{width:'120px', marginBottom:'8px', display:'inline-block'}}>regular</span> 
                <br/><span className="fp-font-weight-regular">This is a line</span>
                
                <br/><br/><span style={{width:'120px', marginBottom:'8px', display:'inline-block'}}>medium</span>
                <br/><span className="fp-font-weight-medium">This is a line</span>
                
                <br/><br/><span style={{width:'120px', marginBottom:'8px', display:'inline-block'}}>semi-bold</span>
                <br/><span className="fp-font-weight-semi-bold">This is a line</span>

                <br/><br/><span style={{width:'120px', marginBottom:'8px', display:'inline-block'}}>bold</span>
                <br/><span className="fp-font-weight-bold">This is a line</span>
            </div>

            <h1 className="fp-h2 fp-margin-bottom-medium">Alignment classes</h1>
            <div className="fp-subtitle fp-margin-bottom-small">
                Usage: fp-text-align-*
            </div>
            <div className="fp-margin-bottom-xx-large">
                <span style={{width:'120px', marginBottom:'8px', display:'inline-block'}}>left</span> 
                <br/><span className="fp-text-align-left">This is a line</span>
                
                <br/><br/><span style={{width:'120px', marginBottom:'8px', display:'inline-block'}}>right</span>
                <br/><span className="fp-text-align-right">This is a line</span>
                
                <br/><br/><span style={{width:'120px', marginBottom:'8px', display:'inline-block'}}>center</span>
                <br/><span className="fp-text-align-semi-center">This is a line</span>
            </div>

            <h1 className="fp-h2 fp-margin-bottom-medium">Headings</h1>
            <div className="fp-subtitle fp-margin-bottom-small">
                Usage: fp-*
            </div>
            <div className="fp-margin-bottom-xx-small">
                <span style={{width:'120px', marginBottom:'8px', display:'inline-block'}}>h1</span> 
                <br/><span className="fp-h1">This is a line</span>
                
                <br/><br/><span style={{width:'120px', marginBottom:'8px', display:'inline-block'}}>h2</span>
                <br/><span className="fp-h2">This is a line</span>
                
                <br/><br/><span style={{width:'120px', marginBottom:'8px', display:'inline-block'}}>h3</span>
                <br/><span className="fp-h3">This is a line</span>

                <br/><br/><span style={{width:'120px', marginBottom:'8px', display:'inline-block'}}>h4</span>
                <br/><span className="fp-h4">This is a line</span>
            </div>


            <h1 className="fp-h2 fp-margin-bottom-medium fp-margin-top-xx-large">Others</h1>
            <div className="fp-subtitle fp-margin-bottom-small">
                Usage: fp-*
            </div>
            <div className="fp-margin-bottom-xx-small">
                <span style={{width:'120px', marginBottom:'8px', display:'inline-block'}}>p</span> 
                <br/><span className="fp-p">This is a line</span>
                
                <br/><br/><span style={{width:'120px', marginBottom:'8px', display:'inline-block'}}>subtite</span>
                <br/><span className="fp-subtitle">This is a line</span>
                
                <br/><br/><span style={{width:'120px', marginBottom:'8px', display:'inline-block'}}>body-text</span>
                <br/><span className="fp-body-text">This is a line</span>

                <br/><br/><span style={{width:'120px', marginBottom:'8px', display:'inline-block'}}>body-small-text</span>
                <br/><span className="fp-body-small-text">This is a line</span>

                <br/><br/><span style={{width:'120px', marginBottom:'8px', display:'inline-block'}}>body-tiny-text</span>
                <br/><span className="fp-body-tiny-text">This is a line</span>
            </div>
        </div>
    )
};

export const Default = Template.bind({});
Default.args = {
};
