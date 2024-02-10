'use client';

import { Provider as JotaiProvider } from 'jotai';
import { SessionProvider } from 'next-auth/react';
import { configs } from '@/lib/swr';
import { SWRConfig } from 'swr';

export function GeneralProviders({ children }: { children: React.ReactNode }) {
  return (
    <SWRConfig value={configs}>
      <SessionProvider>
        <JotaiProvider>{children}</JotaiProvider>
      </SessionProvider>
    </SWRConfig>
  );
}
