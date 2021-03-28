import React from 'react';
import ChangeProfilePicture from './ChangeProfilePicture';

export default {
    component: ChangeProfilePicture,
    title: 'Profile/ChangeProfilePicture'
};

const Template = args => <div className="fp-padding-medium"><ChangeProfilePicture {...args} /></div>;

export const Default = Template.bind({});
Default.args = {
    profileImgUrl: 'https://images.unsplash.com/photo-1537944434965-cf4679d1a598?auto=format&fit=crop&w=400&h=250&q=60',
    userFullName: 'Ishan',
    onFileChange: () => {},
    uploading: false
};
