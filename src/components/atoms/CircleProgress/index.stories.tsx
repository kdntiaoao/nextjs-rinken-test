import React from 'react'

import { ComponentStory, ComponentMeta } from '@storybook/react'

import { CircleProgress } from '.'

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Atoms/CircleProgress',
  component: CircleProgress,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    percent: { control: { type: 'number', min: 0, max: 1 } },
    strokeWidth: { control: { type: 'number' } },
    children: {
      control: 'text',
    },
  },
} as ComponentMeta<typeof CircleProgress>

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof CircleProgress> = (args) => (
  <div className="flex">
    <CircleProgress {...args} />
  </div>
)

export const Normal = Template.bind({})
Normal.args = {
  percent: 0.8,
  children: '80%',
}
