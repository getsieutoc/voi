import type { Meta, StoryObj } from '@storybook/react';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui';

const meta: Meta<typeof Tabs> = {
  title: 'Tabs',
  component: Tabs,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
};

export default meta;

type Story = StoryObj<typeof Tabs>;

export const Default: Story = {
  render: (_args) => {
    return (
      <Tabs defaultValue="account" className="w-[400px]">
        <TabsList>
          <TabsTrigger value="account">Account</TabsTrigger>
          <TabsTrigger value="password">Password</TabsTrigger>
        </TabsList>
        <TabsContent value="account">
          Make changes to your account here.
        </TabsContent>
        <TabsContent value="password">Change your password here.</TabsContent>
      </Tabs>
    );
  },
};
