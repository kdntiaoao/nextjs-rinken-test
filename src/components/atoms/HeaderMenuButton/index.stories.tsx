import React from 'react'

import { ComponentStory, ComponentMeta } from '@storybook/react'

import { HeaderMenuButton } from '.'

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Atoms/HeaderMenuButton',
  component: HeaderMenuButton,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    onOpen: {
      action: 'open',
      description: 'onOpenイベントハンドラ',
      table: {
        type: { summary: 'function' },
      },
    },
  },
} as ComponentMeta<typeof HeaderMenuButton>

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof HeaderMenuButton> = (args) => <HeaderMenuButton {...args} />

export const Normal = Template.bind({})
