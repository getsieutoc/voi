import type { Meta, StoryObj } from '@storybook/react';

import { Slider } from '@/components/ui';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: 'Slider',
  component: Slider,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'centered',
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
} satisfies Meta<typeof Slider>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (_args) => (
    <div className="flex w-[500px] flex-col gap-4">
      <Slider defaultValue={[50]} max={100} step={1} className="w-[100%]" />

      <Slider defaultValue={[25, 75]} max={100} step={1} className="w-[100%]" />
    </div>
  ),
};
