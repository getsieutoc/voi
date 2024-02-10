import type { Meta, StoryObj } from '@storybook/react';

import { Button, ButtonProps } from '@/components/ui';

const variantOptions: ButtonProps['variant'][] = ['solid', 'outline', 'ghost'];
const sizeOptions: ButtonProps['size'][] = ['xs', 'sm', 'md', 'lg'];

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: 'Button',
  component: Button,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'centered',
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  argTypes: {
    variant: {
      control: 'radio',
      options: variantOptions,
    },
    size: {
      control: 'radio',
      options: sizeOptions,
    },
  },
} satisfies Meta<typeof Button>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Variants: Story = {
  parameters: {
    controls: { exclude: ['variant', 'asChild'] },
  },

  args: {
    size: 'md',
    isLoading: false,
  },

  render: (args) => (
    <div style={{ display: 'flex', gap: '10px' }}>
      {variantOptions.map((opt) => {
        return (
          <Button key={opt} variant={opt} {...args}>
            Button
          </Button>
        );
      })}
    </div>
  ),
};

export const Sizes: Story = {
  parameters: {
    controls: { exclude: ['size', 'asChild'] },
  },

  args: {
    variant: 'solid',
    isLoading: false,
  },

  render: (args) => (
    <div style={{ display: 'flex', gap: '10px' }}>
      {sizeOptions.map((opt) => {
        const { variant } = args;

        return (
          <Button key={opt} variant={variant} size={opt}>
            Button
          </Button>
        );
      })}
    </div>
  ),
};

export const Loading: Story = {
  parameters: {
    controls: { exclude: ['asChild'] },
  },

  args: {
    size: 'md',
    variant: 'solid',
    isLoading: false,
  },

  render: (args) => (
    <Button isLoading {...args}>
      Button
    </Button>
  ),
};
