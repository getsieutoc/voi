import type { Meta, StoryObj } from '@storybook/react';
import { Badge, BadgeProps } from '@/components/ui';

const variants: BadgeProps['variant'][] = [
  'default',
  'destructive',
  'outline',
  'secondary',
];
const meta = {
  title: 'Badge',
  component: Badge,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      options: variants,
    },
  },
} satisfies Meta<typeof Badge>;

export default meta;

type Story = StoryObj<typeof meta>;
export const Variant: Story = {
  args: {
    variant: 'default',
  },

  render: (args) => <Badge variant={args.variant}>{args.variant}</Badge>,
};
