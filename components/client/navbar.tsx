'use client';

import { Skeleton } from '@/components/ui';
import { useAuth } from '@/hooks';

import { CreateNewPostButton } from './create-new-post';
import { ProfileMenu } from './profile-menu';
import { AuthButton } from './auth-button';
import { Logo } from './logo';

export const Navbar = () => {
  const { user, isAuthenticated, isLoading } = useAuth();

  return (
    <div className="flex w-full items-center justify-between">
      <Logo />

      {isLoading ? (
        <Skeleton className="h-8 w-32" />
      ) : (
        <div className="flex justify-between gap-12">
          {isAuthenticated && <CreateNewPostButton />}

          {user ? <ProfileMenu user={user} /> : <AuthButton />}
        </div>
      )}
    </div>
  );
};
