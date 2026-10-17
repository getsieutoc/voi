'use server';

import { revalidatePath } from 'next/cache';
import { getSession } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import deepmerge from 'deepmerge';
import { Post, Status } from '@/prisma/client/client';

type PostInput = Pick<Post, 'title' | 'description' | 'status'>;

// Only the post's owner or an admin may change it; status is admin-only.
async function authorizePostChange(postId: string) {
  const { user, isAdmin } = await getSession();

  if (!user) {
    throw new Error('Unauthorized');
  }

  if (!isAdmin) {
    const post = await prisma.post.findUnique({
      where: { id: postId },
      select: { userId: true },
    });

    if (post?.userId !== user.id) {
      throw new Error('Unauthorized');
    }
  }

  return { isAdmin };
}

export async function createPost({ title, description, status }: PostInput) {
  const { user, isAdmin } = await getSession();

  if (!user) {
    throw new Error('Unauthorized');
  }

  const response = await prisma.post.create({
    data: {
      title,
      description,
      status: isAdmin ? status : undefined,
      userId: user.id,
    },
  });

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

export async function updatePost(
  id: string,
  { title, description, status }: Partial<PostInput>
) {
  const { isAdmin } = await authorizePostChange(id);

  const response = await prisma.post.update({
    where: { id },
    data: { title, description, status: isAdmin ? status : undefined },
  });

  return response;
}

export async function deletePost(id: string) {
  await authorizePostChange(id);

  const response = await prisma.post.delete({ where: { id } });

  revalidatePath('/');

  return response;
}

export async function updatePostStatus(postId: string, status: Status) {
  const { isAdmin } = await getSession();

  if (!isAdmin) {
    throw new Error('Unauthorized: Admin only');
  }

  const response = await prisma.post.update({
    where: { id: postId },
    data: { status },
  });

  revalidatePath('/dashboard');

  return response;
}
