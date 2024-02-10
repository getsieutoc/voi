import { Role } from '@/types';
import { useSession } from 'next-auth/react';

export type UseAuthOptions = Parameters<typeof useSession>[0];

export const useAuth = (options?: UseAuthOptions) => {
  const { data: session, status, ...rest } = useSession(options);

  const isLoading = status === 'loading';
  const isAuthenticated = !!session && status === 'authenticated';
  const isAdmin = session?.user.role === Role.ADMIN;

  return { ...rest, session, status, isAuthenticated, isAdmin, isLoading };
};
