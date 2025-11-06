'use client';

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

      <DialogContent>
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
