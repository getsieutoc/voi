import type { Meta, StoryObj } from '@storybook/react';
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  AvatarProps,
} from '@/components/ui';

const sizeOptions: AvatarProps['size'][] = ['xs', 'sm', 'md', 'lg', 'xl'];
const meta = {
  title: 'Avatar',
  component: Avatar,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    size: {
      options: sizeOptions,
    },
  },
} satisfies Meta<typeof Avatar>;

export default meta;

type Story = StoryObj<typeof meta>;
export const Default: Story = {
  args: {
    size: 'md',
  },

  render: (args) => (
    <Avatar size={args.size}>
      <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
      <AvatarFallback>CN</AvatarFallback>
    </Avatar>
  ),
};
