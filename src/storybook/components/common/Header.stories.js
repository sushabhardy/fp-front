import { Avatar } from '@material-ui/core';
import React from 'react';
import Header from './Header';

export default {
  component: Header,
  title: 'Common/Header',
  argTypes: { onBack: { action: 'clicked' } }
};

const Template = args => (
    <div>
        <Header {...args} />
    </div>
) ;

export const Default = Template.bind({});
Default.args = {
    headerTitle: 'Login',
    headerSubtitle: 'Enter your mobile number to login',
    imgNode: <Avatar>I</Avatar>,
    onBack: ()=>{},
    withSeparator: true
};
