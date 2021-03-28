import React from 'react';
import OTP_Input from './OTP_Input';

export default {
  component: OTP_Input,
  title: 'Common/Form Elements/OTP Input',
};

const Template = args => <div style={{padding:'24px'}}><OTP_Input isInputNum={true} {...args} /></div>;

export const Default = Template.bind({});
Default.args = {
    numInputs: 6,
    isDisabled: false,
    hasErrored: false
};