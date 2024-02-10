import { GeneralProviders, ThemeProvider } from '@/components/client';
import { PROJECT_DESC, PROJECT_NAME } from '@/lib/constants';
import { Inter } from 'next/font/google';
import { ReactNode } from 'react';
import { Metadata } from 'next';
import { cn } from '@/lib/utils';
import './globals.css';

const fontSans = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
});

export const metadata: Metadata = {
  title: PROJECT_NAME,
  description: PROJECT_DESC,
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html
      className={cn(fontSans.variable, 'dark')}
      suppressHydrationWarning
      lang="en"
    >
      <body>
        <GeneralProviders>
          <ThemeProvider
            disableTransitionOnChange
            defaultTheme="system"
            attribute="class"
            enableSystem
          >
            {children}
          </ThemeProvider>
        </GeneralProviders>
      </body>
    </html>
  );
}
