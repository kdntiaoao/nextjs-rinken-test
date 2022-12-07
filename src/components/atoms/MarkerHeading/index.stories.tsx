import React from 'react'

import { ComponentStory, ComponentMeta } from '@storybook/react'

import { MarkerHeading } from '.'

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Atoms/MarkerHeading',
  component: MarkerHeading,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    component: {
      control: 'select',
      options: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'p'],
    },
    children: {
      control: 'text',
    },
  },
} as ComponentMeta<typeof MarkerHeading>

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof MarkerHeading> = (args) => <MarkerHeading {...args} />

export const Normal = Template.bind({})
Normal.args = {
  component: 'h1',
  children: 'MarkerHeading',
}
