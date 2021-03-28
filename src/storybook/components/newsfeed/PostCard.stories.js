import React from 'react';
import PostCard from './PostCard';

export default {
    component: PostCard,
    title: 'Newsfeed/Post Card',
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

const Template = args => <div className="fp-padding-medium"><PostCard {...args} /></div>;

export const Default = Template.bind({});
Default.args = {
    userImg: 'https://i.ibb.co/yfGdL6h/Rectangle-29.png',
    userFullName: 'Sumit Kumar',
    username: 'sm.kumar',
    description: 'Ongoing shoot for my upcoming movie with production houese KGT. Movie will be aired on 24th August over Netflix!',
    datetime: 1614180434912,
    numLikes: 10,
    numComments: 3,
    media: [
        {
            mediaType: 'img',
            mediaThumbnailURL: 'https://images.unsplash.com/photo-1537944434965-cf4679d1a598?auto=format&fit=crop&w=400&h=250&q=60',
            mediaURL: 'https://images.unsplash.com/photo-1537944434965-cf4679d1a598?auto=format&fit=crop&w=1200&h=750&q=60'
        },
        {
            mediaType: 'video',
            mediaThumbnailURL: 'https://i.ibb.co/yyqGWyX/Screen-Shot-2021-02-24-at-9-34-53-PM.jpg',
            mediaURL: 'https://media.w3.org/2010/05/sintel/trailer_hd.mp4'
        },
        {
            mediaType: 'img',
            mediaThumbnailURL: 'https://images.unsplash.com/photo-1518732714860-b62714ce0c59?auto=format&fit=crop&w=400&h=250&q=60',
            mediaURL: 'https://images.unsplash.com/photo-1518732714860-b62714ce0c59?auto=format&fit=crop&w=1200&h=750&q=60'
        }
    ],
    sharePostDetails:{
        url: 'filmyprofiles.in',
        title: 'Checkout this post',
        text: 'Something'
    },
    onClickAvatar: () => {

    }
};
