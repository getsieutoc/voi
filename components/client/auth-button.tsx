'use client';

import * as React from 'react';
import {
  Button,
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui';
import { useDisclosure } from '@/hooks';

import { LoginByEmail } from './login-by-email';

export const AuthButton = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const dialogRef = React.useRef<HTMLDivElement>(null);

  // Safe state management to prevent race conditions
  React.useEffect(() => {
    // This ensures the ref is properly initialized before being accessed
    return () => {
      // Cleanup to prevent memory leaks and stale refs
      if (isOpen) {
        onClose();
      }
    };
  }, [isOpen, onClose]);

  const handleOpenChange = (isOpen: boolean) => {
    if (isOpen) {
      onOpen();
    } else {
      onClose();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button size="sm" onClick={onOpen}>
          Login
        </Button>
      </DialogTrigger>

      <DialogContent ref={dialogRef}>
        <DialogHeader>
          <DialogTitle>Getting Started</DialogTitle>
        </DialogHeader>

        <div className="flex flex-col gap-4">
          <LoginByEmail />
        </div>
      </DialogContent>
    </Dialog>
  );
};
