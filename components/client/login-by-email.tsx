'use client';

import { useKeyPressEvent, useState } from '@/hooks';
import {
  AlertDescription,
  AlertTitle,
  Button,
  Alert,
  Input,
} from '@/components/ui';
import { SendHorizontal, AlertTriangle, Check } from '@/components/icons';
import { emailOtp, signIn } from '@/lib/auth-client';

export type LoginByEmailProps = {
  isRequested?: boolean;
};

export const LoginByEmail = ({ isRequested }: LoginByEmailProps) => {
  const [isFocused, setFocused] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSendOtp = async () => {
    if (isLoading || !email) return;

    setLoading(true);
    setError(null);

    try {
      await emailOtp.sendVerificationOtp(
        { email, type: 'sign-in' },
        {
          onSuccess: () => {
            setOtpSent(true);
          },
          onError: (ctx) => {
            setError(ctx.error.message || 'Failed to send OTP');
          },
        }
      );
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async () => {
    if (isLoading || !email || !otp) return;

    setLoading(true);
    setError(null);

    try {
      await signIn.emailOtp(
        { email, otp },
        {
          onSuccess: () => {
            window.location.href = '/dashboard';
          },
          onError: (ctx) => {
            setError(ctx.error.message || 'Invalid OTP');
          },
        }
      );
    } finally {
      setLoading(false);
    }
  };

  useKeyPressEvent('Enter', (e) => {
    if (isFocused && !isLoading) {
      e.preventDefault();
      if (!otpSent && email) {
        handleSendOtp();
      } else if (otpSent && otp) {
        handleVerifyOtp();
      }
    }
  });

  return (
    <div className="flex w-full flex-col gap-4">
      {isRequested && (
        <Alert>
          <AlertTriangle className="h-4 w-4" />
          <AlertTitle>Check your mailbox!</AlertTitle>
          <AlertDescription>
            We sent an email to you with a verification code.
          </AlertDescription>
        </Alert>
      )}

      {otpSent && (
        <Alert>
          <Check className="h-4 w-4" />
          <AlertTitle>Code sent!</AlertTitle>
          <AlertDescription>
            Enter the 6-digit code we sent to {email}
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
        disabled={otpSent}
      />

      {otpSent && (
        <Input
          onChange={(e) => setOtp(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          placeholder="Enter 6-digit code"
          name="login-otp"
          value={otp}
          maxLength={6}
        />
      )}

      {error && <p className="text-sm text-red-500">{error}</p>}

      {!otpSent ? (
        <Button
          onClick={handleSendOtp}
          isLoading={isLoading}
          disabled={isLoading || !email}
        >
          <SendHorizontal className="mr-4" />
          Send Login Code
        </Button>
      ) : (
        <div className="flex gap-2">
          <Button
            onClick={() => {
              setOtpSent(false);
              setOtp('');
              setError(null);
            }}
            variant="ghost"
            disabled={isLoading}
          >
            Change Email
          </Button>
          <Button
            onClick={handleVerifyOtp}
            isLoading={isLoading}
            disabled={isLoading || !otp}
            className="flex-1"
          >
            Verify Code
          </Button>
        </div>
      )}
    </div>
  );
};
