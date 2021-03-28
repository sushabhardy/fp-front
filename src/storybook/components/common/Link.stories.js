
import React from 'react';
import Link from './Link';

export default {
    component: Link,
    title: 'Common/Link',
};

const Template = args => <div className="fp-padding-medium"><Link {...args} >Click here</Link></div>;

export const Default = Template.bind({});
Default.args = {
    href: 'https://filmyprofiles.in',
    target: '_blank'
};
