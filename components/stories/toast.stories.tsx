import type { Meta, StoryObj } from '@storybook/react';
import { Button, Toaster, toast } from '@/components/ui';

//👇 This default export determines where your story goes in the story list
const meta: Meta<typeof Toaster> = {
  title: 'Toaster',
  component: Toaster,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
};

export default meta;
type Story = StoryObj<typeof Toaster>;

export const Default: Story = {
  render: (_args) => {
    return (
      <>
        <Toaster />
        <div>
          <code>{`<Toaster /> must import RootLayout component (exp: app/layout.tsx)`}</code>
        </div>
        <Button
          variant="outline"
          onClick={() =>
            toast('Event has been created', {
              description: 'Sunday, December 03, 2023 at 9:00 AM',
              action: {
                label: 'Undo',
                onClick: () => {
                  console.info('Undo');
                },
              },
            })
          }
        >
          Show Toast
        </Button>
      </>
    );
  },
};
