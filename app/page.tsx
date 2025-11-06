import { Logo } from '@/components/client/logo';
import { AuthButton } from '@/components/client/auth-button';
import { getSession } from '@/lib/auth';
import { redirect } from 'next/navigation';
import { PROJECT_DESC } from '@/lib/constants';

export default async function HomePage() {
  const { user } = await getSession();

  if (user) {
    redirect('/dashboard');
  }

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="flex flex-col items-center gap-6 text-center">
        <Logo size="xl" href="/" />
        <p className="text-muted-foreground text-lg">{PROJECT_DESC}</p>
        <AuthButton />
      </div>
    </div>
  );
}

