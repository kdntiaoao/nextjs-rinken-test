import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'

import { Heading } from '.'

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Atoms/Heading',
  component: Heading,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    component: {
      control: 'select',
      options: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'],
    },
    children: {
      control: 'text'
    }
  },
} as ComponentMeta<typeof Heading>

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof Heading> = (args) => <Heading {...args} />

export const Normal = Template.bind({})
Normal.args = {
  component: 'h1',
  children: 'Heading'
}
