'use server';

import { getSession } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
// import deepmerge from 'deepmerge';
// import { Vote, VoteWithPayload } from '@/types';

// const richInclude = {
//   votes: true,
//   tags: true,
//   user: true,
// };

export async function createVote(
  input: Parameters<typeof prisma.vote.create>[0]
) {
  const { user } = await getSession();

  if (!user) {
    throw new Error('Unauthorized');
  }

  const response = await prisma.vote.create(input);

  return response;
}
