import type { Meta, StoryObj } from '@storybook/react';

import { Label, Input } from '@/components/ui';

//👇 This default export determines where your story goes in the story list
const meta: Meta<typeof Label> = {
  title: 'Label',
  component: Label,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
};

export default meta;
type Story = StoryObj<typeof Label>;

export const Default: Story = {
  parameters: {
    controls: { exclude: ['placeholder'] },
  },

  render: (_args) => {
    return (
      <div className="w-[300px]">
        <Label>Name</Label>
        <Input placeholder="Your name" />
      </div>
    );
  },
};
