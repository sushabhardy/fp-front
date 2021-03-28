/* eslint-disable import/no-anonymous-default-export */
import React from 'react';
import CompleteProfile from './CompleteProfile';

export default {
    component: CompleteProfile,
    title: 'Common/CompleteProfile',
    // argTypes: {
    //     variant: {
    //         control: {
    //             type: 'select',
    //             options: [
    //                 'inline',
    //                 'fullscreenp-center',
    //                 'parent-wrap',
    //                 'fullscreen-bottom'
    //             ],
    //         },
    //     }
    // }
};

const Template = args => <div className="fp-padding-medium"><CompleteProfile {...args} /></div>;

export const Default = Template.bind({});
Default.args = {
    heading: 'Complete your profile',
    icon: 'arrow_forward_ios_new',
    next: 'Add photos'
};
