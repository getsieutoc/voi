import { cva, type VariantProps } from 'class-variance-authority';
import { PROJECT_NAME } from '@/lib/constants';
import { cn } from '@/lib/utils';
import NextLink from 'next/link';
import { forwardRef } from 'react';

const logoVariants = cva('font-bold', {
  variants: {
    size: {
      xs: 'text-xs',
      sm: 'text-sm',
      md: 'text-base',
      lg: 'text-xl',
      xl: 'text-4xl',
    },
  },
  defaultVariants: {
    size: 'lg',
  },
});

interface LogoProps
  extends React.HTMLAttributes<HTMLHeadingElement>,
    VariantProps<typeof logoVariants> {
  value?: string;
  href?: string;
}

const Logo = forwardRef<HTMLHeadingElement, LogoProps>(
  ({ value, className, size, href = '/' }, ref) => {
    return (
      <NextLink href={href}>
        <h1 ref={ref} className={cn(logoVariants({ size, className }))}>
          {value ?? PROJECT_NAME}
        </h1>
      </NextLink>
    );
  }
);

Logo.displayName = 'Logo';

export { Logo };
export type { LogoProps };
