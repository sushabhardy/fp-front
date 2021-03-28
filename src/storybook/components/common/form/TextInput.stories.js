import React from 'react';
import TextInput from './TextInput';

export default {
  component: TextInput,
  title: 'Common/Form Elements/Text Input',
};

const Template = args => <div style={{padding:'24px'}}><TextInput {...args} /></div>;

export const Default = Template.bind({});
Default.args = {
    labelText: "Mobile number",
    labelIcon: "phone_android",
    placeholder: ""
};
