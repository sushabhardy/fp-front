import React from 'react';
import OnboardingImageUploader from './OnboardingImageUploader';

export default {
    component: OnboardingImageUploader,
    title: 'Profile/OnboardingImageUploader'
};

const Template = args => <div className="fp-padding-medium"><OnboardingImageUploader {...args} /></div>;

export const Default = Template.bind({});
Default.args = {
    imageUrls: [
        'https://images.unsplash.com/photo-1537944434965-cf4679d1a598?auto=format&fit=crop&w=400&h=250&q=60',
        'https://i.ibb.co/yyqGWyX/Screen-Shot-2021-02-24-at-9-34-53-PM.jpg'
    ],
    onImageUrlsChange: (imageUrls) => {console.log(imageUrls)},
    uploadProgress: [],
    onRemoveImg: (index) => {console.log(index)}
};
