import React, { useState } from 'react';
import BottomSheet from './BottomSheet';

export default {
  component: BottomSheet,
  title: 'Common/BottomSheet',
};

const Template = args => {
    const [show, toggle] = useState(false);

    return(
        <div>
            <button onClick={()=>toggle(true)}>show</button>
            {
                show ?
                <BottomSheet {...args} onClose={()=>toggle(false)}>
                    Hello
                </BottomSheet>
                : null
            }
        </div>
    )
};

export const Default = Template.bind({});
Default.args = {
    startFrom: 0.2,
    bodyHeight: '200vh'
};
