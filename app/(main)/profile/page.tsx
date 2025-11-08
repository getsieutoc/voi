import { Separator } from '@/components/ui';
import { findOneUser } from '@/services/users';
import { redirect } from 'next/navigation';
import { getSession } from '@/lib/auth';
import { NotificationsForm, ProfileForm } from '@/components/client';
import { EMAIL_FROM } from '@/lib/constants';

export default async function ProfilePage() {
  const { user } = await getSession();

  if (!user) {
    redirect('/');
  }

  const fullUser = await findOneUser({ id: user.id });

  if (!fullUser) {
    return (
      <div>
        <p>Something is wrong, please refresh the page.</p>
        <p>If this message still persists, please contact {EMAIL_FROM}</p>
      </div>
    );
  }

  return (
    <div className="mt-4 flex h-full flex-col gap-8">
      <h1 className="text-2xl">General Settings</h1>

      <Separator />

      <div className="grid grid-cols-2 gap-16">
        <ProfileForm user={fullUser} />

        <NotificationsForm user={fullUser} />
      </div>
    </div>
  );
}
