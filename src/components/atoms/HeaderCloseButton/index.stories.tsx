import React from 'react'

import { ComponentStory, ComponentMeta } from '@storybook/react'

import { HeaderCloseButton } from '.'

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Atoms/HeaderCloseButton',
  component: HeaderCloseButton,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    onClose: {
      action: 'closed',
      description: 'onCloseイベントハンドラ',
      table: {
        type: { summary: 'function' },
      },
    },
  },
} as ComponentMeta<typeof HeaderCloseButton>

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof HeaderCloseButton> = (args) => <HeaderCloseButton {...args} />

export const Normal = Template.bind({})
