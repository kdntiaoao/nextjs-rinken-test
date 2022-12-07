import React from 'react'

import { ComponentStory, ComponentMeta } from '@storybook/react'

import { HeaderNavButton } from '.'

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Atoms/HeaderNavButton',
  component: HeaderNavButton,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    pointerEvent: {
      control: 'boolean',
    },
    onClick: {
      action: 'clicked',
      description: 'onClickイベントハンドラ',
      table: {
        type: { summary: 'function' },
      },
    },
    children: {
      control: 'text',
    },
  },
} as ComponentMeta<typeof HeaderNavButton>

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof HeaderNavButton> = (args) => <HeaderNavButton {...args} />

export const Normal = Template.bind({})
Normal.args = {
  pointerEvents: true,
  children: 'Navigation',
}
