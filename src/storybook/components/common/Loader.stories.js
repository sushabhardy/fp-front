import React from 'react';
import Loader from './Loader';

export default {
    component: Loader,
    title: 'Common/Loader',
    argTypes: {
        variant: {
            control: {
                type: 'select',
                options: [
                    'inline',
                    'fullscreenp-center',
                    'parent-wrap',
                    'fullscreen-bottom'
                ],
            },
        }
    }
};

const Template = args => <Loader {...args} />;

export const Default = Template.bind({});
Default.args = {
    title: 'Verifying...',
    variant: 'fullscreen-bottom'
};
