import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '@/prisma/client/client';

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });

declare global {
  // We need var in declare global
  // eslint-disable-next-line no-var, vars-on-top
  var prisma: PrismaClient | undefined;
}

const prisma = global.prisma || new PrismaClient({ adapter });

if (process.env.NODE_ENV === 'development') {
  global.prisma = prisma;
}

export { prisma };
