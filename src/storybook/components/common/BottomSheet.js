import React, { useState } from 'react';
import reactDom from 'react-dom';

function BottomSheet(props) {
    let paddingTop = props.startFrom*100 + 'vh';

    const [className, setClass] = useState('fp-bottom-sheet-close')

    return (
        reactDom.createPortal(
            <div className={"fp-bottom-sheet-wrapper " + className}  style={{paddingTop}}>
                <div className="fp-bottom-sheet-bg" onClick={()=>{
                    setClass('');
                    props.onClose();
                }}></div>
                <div className="fp-bottom-sheet-body-wrapper" >
                    <div className="fp-bottom-sheet-body" style={{height: props.bodyHeight || 'auto'}}>
                        {props.children}
                    </div>
                </div>
            </div>
        , document.body)
    );
}

export default BottomSheet;