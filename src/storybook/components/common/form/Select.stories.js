import React from 'react';
import Select from './Select';

export default {
  component: Select,
  title: 'Common/Form Elements/Select',
};

const Template = args => <div style={{padding:'24px'}}><Select {...args} /></div>;

export const Default = Template.bind({});
Default.args = {
    labelText: "Current city",
    labelIcon: "location_on",
    placeholder: "",
    options: [
      {value: 1, label: 'Mumbai'},
      {value: 2, label: 'Pune'},
      {value: 3, label: 'Bangalore'},
    ]
};