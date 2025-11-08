import { Navbar } from '@/components/client';
import { Separator } from '@/components/ui';
import { ReactNode } from 'react';

export default function MainLayout({ children }: { children: ReactNode }) {
  return (
    <div className="mx-auto flex h-dvh max-w-screen-lg flex-col gap-4 p-4 text-sm">
      <Navbar />

      <Separator />

      {children}

      <Separator />

      <div className="flex items-center justify-between">
        <a href="https://github.com/getsieutoc" target="_blank">
          Made by ⚡Sieutoc
        </a>
      </div>
    </div>
  );
}
