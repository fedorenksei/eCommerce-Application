import type { Meta, StoryObj } from '@storybook/react';
import { Text } from './Text';

const meta = {
  component: Text,
} satisfies Meta<typeof Text>;

export default meta;
type Story = StoryObj<typeof meta>;

const LOREM_IPSUM = {
  short: 'Lorem ipsum dolor',
  long: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut varius, nulla in posuere tincidunt, leo elit scelerisque mi, eu volutpat eros ipsum in orci. Ut commodo imperdiet efficitur. Proin convallis vehicula magna. Ut vel lorem at odio blandit dignissim. Aliquam porta pulvinar mi, vitae accumsan orci maximus et. Aliquam porttitor ante mattis pellentesque lacinia. Etiam laoreet justo sed ultrices volutpat. Suspendisse sapien urna, iaculis at suscipit et, tempor vitae enim. In cursus sapien id mollis tempus. Quisque vel commodo tortor, eget ullamcorper magna. Duis dapibus felis a eros aliquam, sit amet mattis odio convallis. Cras lacinia consectetur pharetra. Aliquam tempor tempor lectus fermentum blandit.',
};

export const Header3: Story = {
  args: {
    children: LOREM_IPSUM.short,
    tag: 'h3',
  },
};

export const Paragraph: Story = {
  args: {
    children: LOREM_IPSUM.long,
    tag: 'p',
  },
};

export const Example: Story = {
  args: {
    children: 'paragraph',
    tag: 'p',
  },
};
