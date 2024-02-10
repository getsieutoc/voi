import { Prisma } from '@prisma/client';

export enum HttpMethod {
  CONNECT = 'CONNECT',
  DELETE = 'DELETE',
  GET = 'GET',
  HEAD = 'HEAD',
  OPTIONS = 'OPTIONS',
  PATCH = 'PATCH',
  POST = 'POST',
  PUT = 'PUT',
  TRACE = 'TRACE',
}

export type PostWithPayload = Prisma.PostGetPayload<{
  include: {
    votes: true;
    tags: true;
    user: true;
  };
}>;
