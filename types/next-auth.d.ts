/* eslint-disable @typescript-eslint/no-unused-vars */
import NextAuth, { DefaultSession, Account } from 'next-auth';
import { User as PrismaUser } from '@prisma/client';
import { JWT } from 'next-auth/jwt';

declare module 'next-auth/adapters' {
  interface AdapterUser extends PrismaUser {}
}

declare module 'next-auth' {
  interface Session {
    user: DefaultSession['user'] & Pick<PrismaUser, 'id' | 'username' | 'role'>;
  }
}
