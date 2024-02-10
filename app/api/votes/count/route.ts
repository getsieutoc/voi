import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl;

  const postId = searchParams.get('postId');

  if (!postId) {
    throw new Error('postId is required for counting');
  }

  const results = await prisma.vote.count({
    where: { postId },
  });

  return NextResponse.json(results);
}
