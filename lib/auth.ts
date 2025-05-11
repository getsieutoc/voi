import { getServerSession, NextAuthOptions } from 'next-auth';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import EmailProvider from 'next-auth/providers/email';
import MagicLinkTemplate from '@/emails/MagicLink';
import { render } from '@react-email/render';
import { cookies } from 'next/headers';
import { prisma } from '@/lib/prisma';
import { Role } from '@/types';
import nodemailer from 'nodemailer';

import { EMAIL_FROM, EMAIL_REGEX, PROJECT_NAME } from './constants';
import { AdapterUser } from 'next-auth/adapters';

export const authOptions: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,

  adapter: PrismaAdapter(prisma),

  providers: [
    EmailProvider({
      server: {
        host: process.env.SMTP_HOST,
        port: Number(process.env.SMTP_PORT),
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASSWORD,
        },
      },

      from: EMAIL_FROM,

      async sendVerificationRequest({ identifier, url, provider }) {
        if (!process.env.NEXTAUTH_URL) {
          throw new Error('Can not send email because NEXTAUTH_URL is not set');
        }

        const isValidEmail = EMAIL_REGEX.test(identifier);

        if (!isValidEmail) {
          throw new Error('Invalid email address');
        }

        const magicTemplate = MagicLinkTemplate({
          confirmUrl: url,
          baseUrl: process.env.NEXTAUTH_URL,
        });

        const transporter = nodemailer.createTransport(provider.server);

        await transporter.sendMail({
          to: identifier,
          subject: `Login to ${PROJECT_NAME}`,
          html: render(magicTemplate),
          text: render(magicTemplate, { plainText: true }),
        });
      },
    }),
  ],

  session: { strategy: 'jwt' },

  callbacks: {
    signIn: async ({ account, email }) => {
      if (account && account.provider === 'email') {
        const cookieStore = cookies();
        cookieStore.set('verificationRequest', `${!!email}`);

        return true;
      }

      return false;
    },

    jwt: async ({ token, user, account }) => {
      if (account) {
        token.account = account;
      }

      if (user) {
        token.user = user;
      }

      return token;
    },

    session: async ({ session, token }) => {
      if (token && token.user) {
        session.user = {
          ...session.user,
          id: token.sub as string, // we can be sure sub is inside token
          role: (token.user as AdapterUser).role,
        };
      }

      return session;
    },
  },
};

export async function getSession() {
  const session = await getServerSession(authOptions);

  const isAdmin = session?.user?.role === Role.ADMIN;

  return {
    session,
    isAdmin,
  };
}
