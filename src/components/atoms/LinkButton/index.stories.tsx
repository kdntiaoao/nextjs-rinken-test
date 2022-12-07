import React from 'react'

import { ComponentStory, ComponentMeta } from '@storybook/react'

import { LinkButton } from '.'

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Atoms/LinkButton',
  component: LinkButton,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    reverse: { control: 'boolean' },
    children: {
      control: 'text',
    },
  },
} as ComponentMeta<typeof LinkButton>

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof LinkButton> = (args) => <LinkButton {...args} />

export const Normal = Template.bind({})
Normal.args = {
  reverse: false,
  children: 'LinkButton',
}
