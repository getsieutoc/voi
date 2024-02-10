import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';
import * as React from 'react';

const inputVariants = cva(
  'flex w-full border border-input bg-background ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
  {
    variants: {
      size: {
        xs: 'h-6 rounded-sm px-2 py-2 text-xs',
        sm: 'h-8 rounded px-2 py-2 text-sm',
        md: 'h-10 rounded-md px-4 py-2 text-base',
        lg: 'h-12 rounded-lg px-4 py-3 text-lg',
        xl: 'h-14 rounded-xl px-6 py-4 text-xl',
      },
    },
    defaultVariants: {
      size: 'md',
    },
  }
);

type InputHTMLAttributes<T> = Omit<React.InputHTMLAttributes<T>, 'size'>;

export interface InputProps
  extends InputHTMLAttributes<HTMLInputElement>,
    VariantProps<typeof inputVariants> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, size, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(inputVariants({ size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Input.displayName = 'Input';

export { Input };
