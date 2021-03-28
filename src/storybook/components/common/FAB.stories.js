import React from 'react';
import FAB from './FAB';

export default {
  component: FAB,
  title: 'Common/FAB',
};

const Template = args => (
  <div style={{height: '200vh', backgroundImage:'linear-gradient(0deg, #ccc, #fff)'}}>
    <FAB {...args} />
  </div>
);

export const Default = Template.bind({});
Default.args = {
    iconName: '',
    buttonText: 'Continue',
    disabled: false
};
