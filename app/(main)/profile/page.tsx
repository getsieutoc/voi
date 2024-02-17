import { Separator } from '@/components/ui';
import { findOneUser } from '@/services/users';
import { redirect } from 'next/navigation';
import { getSession } from '@/lib/auth';

import { NotificationsForm, ProfileForm } from '@/components/client';

export default async function ProfilePage() {
  const { session } = await getSession();

  if (!session) {
    redirect('/');
  }

  const user = await findOneUser({ id: session.user.id });

  if (!user) {
    return (
      <div>
        <p>Something is wrong, please refresh the page.</p>
        <p>
          If this message still persists, please contact support@sieutoc.website
        </p>
      </div>
    );
  }

  return (
    <div className="mt-4 flex h-full flex-col gap-8">
      <h1 className="text-2xl">General Settings</h1>

      <Separator />

      <div className="grid grid-cols-2 gap-16">
        <ProfileForm user={user} />

        <NotificationsForm user={user} />
      </div>
    </div>
  );
}
