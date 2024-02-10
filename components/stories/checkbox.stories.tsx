import type { Meta, StoryObj } from '@storybook/react';

import { Checkbox, CheckboxTypes, Label } from '@/components/ui';

const checkboxSizes: CheckboxTypes['size'][] = ['xs', 'sm', 'md', 'lg'];
const meta = {
  title: 'Checkbox',
  component: Checkbox,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    size: {
      options: checkboxSizes,
    },
  },
} satisfies Meta<typeof Checkbox>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <div>
      <div className="items-top flex space-x-2">
        <Checkbox id="terms1" size={args.size} />
        <div className="grid gap-1.5 leading-none">
          <Label htmlFor="terms1">Accept terms and conditions</Label>
          <p className="text-sm text-muted-foreground">
            You agree to our Terms of Service and Privacy Policy.
          </p>
        </div>
      </div>
    </div>
  ),
};
export const Sizes: Story = {
  render: (_args) => (
    <>
      {checkboxSizes.map((size, idx) => (
        <div key={idx} className="items-top my-5 flex space-x-2">
          <Checkbox id="terms1" size={size} />
          <div className="grid gap-1.5 leading-none">
            <Label htmlFor="terms1">Accept terms and conditions</Label>
            <div className="text-sm text-muted-foreground">
              You agree to our Terms of Service and Privacy Policy.
            </div>
          </div>
        </div>
      ))}
    </>
  ),
};
