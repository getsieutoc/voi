import { Role } from '@/prisma/client/enums';
import { useSession } from '@/lib/auth-client';

export const useAuth = () => {
  const { data, isPending, error } = useSession();

  const session = data?.session ?? null;
  const user = data?.user ?? null;
  const isLoading = isPending;
  const isAuthenticated = !!session && !!user;
  const isAdmin = user?.role === Role.ADMIN;

  return { session, user, isAuthenticated, isAdmin, isLoading, error };
};
