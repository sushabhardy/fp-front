import React from 'react'
import HorizontalChecklist from './HorizontalChecklist'

export default {
  component: HorizontalChecklist,
  title: 'Common/Horizontal Checklist'
}

const Template = args => <HorizontalChecklist {...args} />

export const Default = Template.bind({})
Default.args = {
  items: [
    { itemName: 'First' },
    { itemName: 'Second' },
    { itemName: 'Third' }
  ],
  currentlyActive: 1
}
