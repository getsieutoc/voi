import type { Meta, StoryObj } from '@storybook/react';
import Image from 'next/image';
import { AspectRatio } from '@/components/ui';

const meta = {
  title: 'AspectRatio',
  component: AspectRatio,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof AspectRatio>;
export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  argTypes: {
    ratio: {
      description: 'ratio number',
      type: 'number',
      defaultValue: 16 / 9,
    },
  },
  render: (args) => (
    <div className="w-[450px]">
      <AspectRatio ratio={args.ratio} className="bg-muted">
        <Image
          src="https://images.unsplash.com/photo-1588345921523-c2dcdb7f1dcd?w=800&dpr=2&q=80"
          alt="Photo by Drew Beamer"
          fill
          className="rounded-md object-cover"
        />
      </AspectRatio>
    </div>
  ),
};
