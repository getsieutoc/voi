import type { Meta, StoryObj } from '@storybook/react';
import {
  Table,
  TableCaption,
  Tbody,
  Td,
  Tfoot,
  Th,
  Thead,
  Tr,
} from '@/components/ui';

//👇 This default export determines where your story goes in the story list
const meta: Meta<typeof Table> = {
  title: 'Table',
  component: Table,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
};

export default meta;
type Story = StoryObj<typeof Table>;

const invoices = [
  {
    invoice: 'INV001',
    paymentStatus: 'Paid',
    totalAmount: '$250.00',
    paymentMethod: 'Credit Card',
  },
  {
    invoice: 'INV002',
    paymentStatus: 'Pending',
    totalAmount: '$150.00',
    paymentMethod: 'PayPal',
  },
  {
    invoice: 'INV003',
    paymentStatus: 'Unpaid',
    totalAmount: '$350.00',
    paymentMethod: 'Bank Transfer',
  },
  {
    invoice: 'INV004',
    paymentStatus: 'Paid',
    totalAmount: '$450.00',
    paymentMethod: 'Credit Card',
  },
  {
    invoice: 'INV005',
    paymentStatus: 'Paid',
    totalAmount: '$550.00',
    paymentMethod: 'PayPal',
  },
  {
    invoice: 'INV006',
    paymentStatus: 'Pending',
    totalAmount: '$200.00',
    paymentMethod: 'Bank Transfer',
  },
  {
    invoice: 'INV007',
    paymentStatus: 'Unpaid',
    totalAmount: '$300.00',
    paymentMethod: 'Credit Card',
  },
];
export const Default: Story = {
  parameters: {
    controls: { exclude: ['placeholder'] },
  },

  render: (_args) => {
    return (
      <Table>
        <TableCaption>A list of your recent invoices.</TableCaption>
        <Thead>
          <Tr>
            <Th className="w-[100px]">Invoice</Th>
            <Th>Status</Th>
            <Th>Method</Th>
            <Th className="text-right">Amount</Th>
          </Tr>
        </Thead>
        <Tbody>
          {invoices.map((invoice) => (
            <Tr key={invoice.invoice}>
              <Td className="font-medium">{invoice.invoice}</Td>
              <Td>{invoice.paymentStatus}</Td>
              <Td>{invoice.paymentMethod}</Td>
              <Td className="text-right">{invoice.totalAmount}</Td>
            </Tr>
          ))}
        </Tbody>
        <Tfoot>
          <Tr>
            <Td colSpan={3}>Total</Td>
            <Td className="text-right">$2,500.00</Td>
          </Tr>
        </Tfoot>
      </Table>
    );
  },
};
