import type { Meta, StoryObj } from '@storybook/react';

import {
  Button,
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from '@/components/ui';

const meta: Meta<typeof HoverCard> = {
  title: 'Hover Card',
  component: HoverCard,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
};

export default meta;

type Story = StoryObj<typeof HoverCard>;

export const Default: Story = {
  render: (_args) => {
    return (
      <HoverCard>
        <HoverCardTrigger asChild>
          <Button>Hover</Button>
        </HoverCardTrigger>
        <HoverCardContent>
          The React Framework – created and maintained by @vercel.
        </HoverCardContent>
      </HoverCard>
    );
  },
};
