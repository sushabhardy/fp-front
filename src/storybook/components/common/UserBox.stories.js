/* eslint-disable import/no-anonymous-default-export */
import React from 'react';
import UserBox from './UserBox';

export default {
    component: UserBox,
    title: 'Common/UserBox',
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

const Template = args => <div className="fp-padding-medium"><UserBox {...args} /></div>;

export const Default = Template.bind({});
Default.args = {
    name: 'Sumit Kumar',
    username: 'sm.kumar',
    cover: '',
    pp: ''
};
