'use server';

import { revalidatePath } from 'next/cache';
import { getSession } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import deepmerge from 'deepmerge';
import { Post, Status } from '@/prisma/client/client';

export async function createPost(
  input: Parameters<typeof prisma.post.create>[0]
) {
  const { user } = await getSession();

  if (!user) {
    throw new Error('Unauthorized');
  }

  const response = await prisma.post.create(input);

  revalidatePath('/');

  return response;
}

type PostFindManyArgs = Parameters<typeof prisma.post.findMany>[0];

// TODO: Implement rate limit because we have to allow this one public
export async function findPosts(input: PostFindManyArgs = {}) {
  const args = deepmerge<PostFindManyArgs>(
    {
      orderBy: [{ votes: { _count: 'desc' } }],
    },
    input
  );

  const response = await prisma.post.findMany({
    ...args,
    include: {
      user: true,
      _count: {
        select: { votes: true },
      },
    },
  });

  return response;
}

export async function updatePost(id: string, data: Partial<Post>) {
  const { user } = await getSession();

  if (!user) {
    throw new Error('Unauthorized');
  }

  const response = await prisma.post.update({ where: { id }, data });

  return response;
}

export async function deletePost(id: string) {
  const { user } = await getSession();

  if (!user) {
    throw new Error('Unauthorized');
  }

  const response = await prisma.post.delete({ where: { id } });

  revalidatePath('/');

  return response;
}

export async function updatePostStatus(postId: string, status: Status) {
  const { user } = await getSession();

  if (!user || user.role !== 'ADMIN') {
    throw new Error('Unauthorized: Admin only');
  }

  const response = await prisma.post.update({
    where: { id: postId },
    data: { status },
  });

  revalidatePath('/dashboard');

  return response;
}
