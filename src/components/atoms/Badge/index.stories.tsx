import React from 'react'

import { ComponentStory, ComponentMeta } from '@storybook/react'

import { Badge } from '.'

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Atoms/Badge',
  component: Badge,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    color: {
      control: 'select',
      options: ['primary', 'secondary', 'warning'],
    },
    children: {
      control: 'text',
    },
  },
} as ComponentMeta<typeof Badge>

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof Badge> = (args) => (
  <div className="flex">
    <Badge {...args} />
  </div>
)

export const Normal = Template.bind({})
Normal.args = {
  children: '1',
}
