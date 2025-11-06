import { createAuthClient } from 'better-auth/react';
import { emailOTPClient } from 'better-auth/client/plugins';
import { adminClient } from 'better-auth/client/plugins';

export const authClient = createAuthClient({
  plugins: [emailOTPClient(), adminClient()],
});

export const { useSession, signOut, emailOtp, signIn } = authClient;