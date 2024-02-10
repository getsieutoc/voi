import type { Meta, StoryObj } from '@storybook/react';

import { Input, InputProps } from '@/components/ui';

const sizeOptions: InputProps['size'][] = ['xs', 'sm', 'md', 'lg', 'xl'];

const meta = {
  title: 'Input',
  component: Input,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  // argTypes: {
  //   size: {
  //     control: 'radio',
  //     options: sizeOptions,
  //   },
  // },
} satisfies Meta<typeof Input>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (_args) => (
    <div style={{ display: 'flex', gap: '10px' }}>
      {sizeOptions.map((opt) => {
        return <Input key={opt} size={opt} placeholder="Demo" />;
      })}
    </div>
  ),
};
