import React, { useState } from 'react';

export default {
    component: null,
    title: 'StyleGuide/Spacings'
};

const Template = args => {

    return(
        <div className="fp-container">
            <h1 className="fp-h1 fp-margin-bottom-medium">Spacing Tokens</h1>

            <div className="fp-subtitle fp-margin-bottom-medium">
                Usage: fp-margin-*, fp-margin-top-*, fp-margin-bottom-*, fp-margin-left-*, fp-margin-right-* <br/><br/>
                fp-padding-*, fp-padding-top-*, fp-padding-bottom-*, fp-padding-left-*, fp-padding-right-* <br/>
                <br/>* denotes one of the tokens below
            </div>
            <div className="fp-margin-bottom-xx-small">
                <br/><span style={{width:'120px', marginBottom:'8px', display:'inline-block'}}>none</span>0px
                <br/><span style={{width:'120px', marginBottom:'8px', display:'inline-block'}}>tiny</span>4px
                <br/><span style={{width:'120px', marginBottom:'8px', display:'inline-block'}}>xxx-small</span>8px
                <br/><span style={{width:'120px', marginBottom:'8px', display:'inline-block'}}>xx-small</span>12px
                <br/><span style={{width:'120px', marginBottom:'8px', display:'inline-block'}}>x-small</span>16px
                <br/><span style={{width:'120px', marginBottom:'8px', display:'inline-block'}}>small</span>20px
                <br/><span style={{width:'120px', marginBottom:'8px', display:'inline-block'}}>medium</span>24px
                <br/><span style={{width:'120px', marginBottom:'8px', display:'inline-block'}}>large</span>32px
                <br/><span style={{width:'120px', marginBottom:'8px', display:'inline-block'}}>x-large</span>40px
                <br/><span style={{width:'120px', marginBottom:'8px', display:'inline-block'}}>xx-large</span>48px
                <br/><span style={{width:'120px', marginBottom:'8px', display:'inline-block'}}>xxx-large</span>56px
                <br/><span style={{width:'120px', marginBottom:'8px', display:'inline-block'}}>jumbo</span>64px
                <br/><span style={{width:'120px', marginBottom:'8px', display:'inline-block'}}>x-jumbo</span>72px
                <br/><span style={{width:'120px', marginBottom:'8px', display:'inline-block'}}>xx-jumbo</span>80px
                <br/><span style={{width:'120px', marginBottom:'8px', display:'inline-block'}}>xxx-jumbo</span>96px
                <br/><span style={{width:'120px', marginBottom:'8px', display:'inline-block'}}>humongous</span>128px
            </div>
        </div>
    )
};

export const Default = Template.bind({});
Default.args = {

};
