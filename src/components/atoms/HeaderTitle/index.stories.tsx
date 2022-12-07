import React from 'react'

import { ComponentStory, ComponentMeta } from '@storybook/react'

import { HeaderTitle } from '.'

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Atoms/HeaderTitle',
  component: HeaderTitle,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    children: {
      control: 'text',
    },
  },
} as ComponentMeta<typeof HeaderTitle>

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof HeaderTitle> = (args) => <HeaderTitle {...args} />

export const Normal = Template.bind({})
Normal.args = {
  children: 'Title',
}
