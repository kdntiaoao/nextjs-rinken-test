import React from 'react'

import { ComponentStory, ComponentMeta } from '@storybook/react'

import { HeaderUserButton } from '.'

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Atoms/HeaderUserButton',
  component: HeaderUserButton,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {},
} as ComponentMeta<typeof HeaderUserButton>

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof HeaderUserButton> = () => <HeaderUserButton />

export const Normal = Template.bind({})
