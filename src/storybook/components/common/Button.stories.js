import React from 'react';
import Button from './Button';

export default {
  component: Button,
  title: 'Common/Button',
  argTypes: {
    variant: {
        control: {
            type: 'select',
            options: [
                'default',
                'rounded-bordered',
                'flat'
            ],
        },
    }
}
};

const Template = args => (
    <div className="fp-padding-medium">
        <Button {...args}>Click me</Button>
    </div>
);

export const Default = Template.bind({});

Default.args = {
    variant: 'rounded-bordered',
    onClick: () => {alert('clicked')},
    className: ''
};
