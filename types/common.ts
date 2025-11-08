import { Prisma } from '@/prisma/client/client';
import { auth } from '@/lib/auth';

export type Session = typeof auth.$Infer.Session;

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
    user: true;
    _count: true;
  };
}>;

export type NotifyMeOption = 'all' | 'mine' | 'nothing';

export type Preferences = {
  notifyMe?: NotifyMeOption;
};
