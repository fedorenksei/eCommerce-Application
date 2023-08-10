import type { Meta, StoryObj } from '@storybook/react';
import { Palette } from './Palette';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta = {
  title: 'Test/Palette',
  component: Palette,
  parameters: {},
} satisfies Meta<typeof Palette>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Basic: Story = {
  args: {
    primary: true,
    label: 'Palette',
  },
};
