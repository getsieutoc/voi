'use server';

import { revalidatePath } from 'next/cache';
import { getSession } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { Prisma } from '@/prisma/client/client';

export type FindOneArgs =
  | { id: string; email?: never }
  | { email: string; id?: never };

export async function findOneUser({ id, email }: FindOneArgs) {
  const { user } = await getSession();

  if (!user) {
    throw new Error('Unauthorized');
  }

  if (id) {
    return await prisma.user.findUnique({
      where: { id },
      include: { posts: true },
    });
  }

  if (email) {
    return await prisma.user.findUnique({
      where: { email },
      include: { posts: true },
    });
  }

  throw new Error('Need either id or email');
}

export async function updateUser(
  id: string,
  data: Prisma.UserUpdateInput,
  options?: { revalidatePath: string }
) {
  const { user } = await getSession();

  if (!user) {
    throw new Error('Unauthorized');
  }

  const response = await prisma.user.update({ where: { id }, data });

  if (options?.revalidatePath) {
    revalidatePath(options.revalidatePath);
  }

  return response;
}
