import { NextRequest, NextResponse } from 'next/server';
import { findPosts } from '@/services/posts';
import { Status } from '@/prisma/client/client';

export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl;

  const model = searchParams.get('model');
  const search = searchParams.get('search');
  const status = searchParams.get('status');

  if (model === 'post') {
    const results = await findPosts({
      take: 10,
      where: {
        OR: search
          ? [
              {
                title: { contains: search, mode: 'insensitive' },
              },
              {
                description: { contains: search, mode: 'insensitive' },
              },
            ]
          : undefined,
        status: status ? (status as Status) : undefined,
      },
    });

    return NextResponse.json(results);
  }

  return NextResponse.json(null);
}
