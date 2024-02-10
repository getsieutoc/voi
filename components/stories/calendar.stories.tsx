import type { Meta, StoryObj } from '@storybook/react';
import { Calendar } from '@/components/ui';

const meta = {
  title: 'Calendar',
  component: Calendar,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof Calendar>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    mode: 'default',
  },

  render: (args) => {
    return (
      <div className="flex-row space-y-4">
        <Calendar mode={args.mode} className="rounded-md border" />
      </div>
    );
  },
};
