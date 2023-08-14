import type { Meta, StoryObj } from '@storybook/react';
import { Header6 } from './Header6';

const meta = {
  component: Header6,
} satisfies Meta<typeof Header6>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  args: {
    children: 'Some header',
  },
};
