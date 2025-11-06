'use client';

import { Provider as JotaiProvider } from 'jotai';
import { configs } from '@/lib/swr';
import { SWRConfig } from 'swr';

export function GeneralProviders({ children }: { children: React.ReactNode }) {
  return (
    <SWRConfig value={configs}>
      <JotaiProvider>{children}</JotaiProvider>
    </SWRConfig>
  );
}
