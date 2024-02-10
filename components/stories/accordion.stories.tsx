import type { Meta, StoryObj } from '@storybook/react';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui';
import { AccordionImplProps } from '@radix-ui/react-accordion';

const meta: Meta<typeof Accordion> = {
  title: 'Accordion',
  component: Accordion,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
};
export default meta;
type Story = StoryObj<AccordionImplProps>;

export const Default: Story = {
  render: (_args) => {
    return (
      <div className="w-[400px]">
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="item-1">
            <AccordionTrigger>Is it accessible?</AccordionTrigger>
            <AccordionContent>
              Yes. It adheres to the WAI-ARIA design pattern.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger>Is it styled?</AccordionTrigger>
            <AccordionContent>
              Yes. It comes with default styles that matches the other
              components&apos; aesthetic.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3">
            <AccordionTrigger>Is it animated?</AccordionTrigger>
            <AccordionContent>
              Yes. It&apos;s animated by default, but you can disable it if you
              prefer.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    );
  },
};
