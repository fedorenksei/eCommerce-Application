import { Meta, StoryObj } from '@storybook/react';
import { TextInput } from './TextInput';

const meta = {
  component: TextInput,
} satisfies Meta<typeof TextInput>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  args: {
    placeholder: 'Alex',
  },
  parameters: {
    backgrounds: {
      default: 'light',
      values: [
        {
          name: 'light',
          value: '#FFFFFF',
        },
        {
          name: 'dark',
          value: '#252B42',
        },
      ],
    },
  },
};

export const Disabled: Story = {
  args: {
    placeholder: 'Alex',
    disabled: true,
  },
};

export const WithDefaultValue: Story = {
  args: {
    placeholder: 'Alex',
    defaultValue: 'smth default',
  },
};
