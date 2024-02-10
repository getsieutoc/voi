'use client';

import { useKeyPressEvent, useSearchParams, useState } from '@/hooks';
import {
  AlertDescription,
  AlertTitle,
  Button,
  Alert,
  Input,
} from '@/components/ui';
import { SendHorizontal, AlertTriangle } from '@/components/icons';
import { signIn } from 'next-auth/react';

export type LoginByEmailProps = {
  isRequested?: boolean;
};

export const LoginByEmail = ({ isRequested }: LoginByEmailProps) => {
  const [isFocused, setFocused] = useState(false);

  const [isLoading, setLoading] = useState(false);

  // Get error message added by next/auth in URL.
  const searchParams = useSearchParams();
  const error = searchParams?.get('error');
  const errorMessage = Array.isArray(error) ? error.pop() : error;

  const [email, setEmail] = useState('');

  const handleSignIn = async () => {
    if (isLoading) return;

    const callbackUrl = searchParams?.get('callbackUrl') ?? '/';

    setLoading(true);

    await signIn('email', {
      callbackUrl,
      email,
    });
  };

  useKeyPressEvent('Enter', (e) => {
    if (isFocused && email && !isLoading) {
      e.preventDefault();
      handleSignIn();
    }
  });

  return (
    <div className="flex w-full flex-col gap-4">
      {isRequested && (
        <Alert>
          <AlertTriangle className="h-4 w-4" />
          <AlertTitle>Check your mailbox!</AlertTitle>
          <AlertDescription>
            We sent an email to you with a magic link that will sign you in. You
            can close this window.
          </AlertDescription>
        </Alert>
      )}

      <Input
        onChange={(e) => setEmail(e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        placeholder="email@example.com"
        name="login-email"
        value={email}
      />
      {errorMessage && <p>{errorMessage}</p>}

      <Button onClick={handleSignIn} isLoading={isLoading} disabled={isLoading}>
        <SendHorizontal className="mr-4" />
        Login with Email
      </Button>
    </div>
  );
};
