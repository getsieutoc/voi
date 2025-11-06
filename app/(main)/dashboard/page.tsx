import { Roadmap } from '@/components/client';
import { getSession } from '@/lib/auth';
import { redirect } from 'next/navigation';

export default async function DashboardPage() {
  const { user } = await getSession();

  if (!user) {
    redirect('/');
  }

  return <Roadmap />;
}
