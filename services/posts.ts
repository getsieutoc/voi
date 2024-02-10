'use server';

import { revalidatePath } from 'next/cache';
import { getSession } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import deepmerge from 'deepmerge';
import { Post, PostWithPayload } from '@/types';

const richInclude = {
  votes: true,
  tags: true,
  user: true,
};

export async function createPost(
  input: Parameters<typeof prisma.post.create>[0]
) {
  const { session } = await getSession();

  if (!session) {
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
    include: richInclude,
  });

  return response;
}

// TODO: Implement rate limit because we have to allow this one public
export async function getPostById(id: string): Promise<PostWithPayload | null> {
  const response = await prisma.post.findUnique({
    where: { id },
    include: richInclude,
  });

  return response;
}

export async function updatePost(id: string, data: Partial<Post>) {
  const { session } = await getSession();

  if (!session) {
    throw new Error('Unauthorized');
  }

  const response = await prisma.post.update({ where: { id }, data });

  return response;
}

export async function deletePost(id: string) {
  const { session } = await getSession();

  if (!session) {
    throw new Error('Unauthorized');
  }

  const response = await prisma.post.delete({ where: { id } });

  revalidatePath('/');

  return response;
}
