import { betterAuth } from 'better-auth';
import { prismaAdapter } from 'better-auth/adapters/prisma';
import { admin } from 'better-auth/plugins/admin';
import { emailOTP } from 'better-auth/plugins/email-otp';
import { prisma } from '@/lib/prisma';
import { sendEmail } from '@/lib/nodemailer';
import { render } from '@react-email/render';
import { OtpEmailTemplate } from '@/emails/otp-email';
import { headers } from 'next/headers';
import { Role } from '@/types';

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: 'postgresql',
  }),

  emailAndPassword: {
    enabled: false, // We're using Email OTP instead
  },

  plugins: [
    emailOTP({
      async sendVerificationOTP({ email, otp, type }) {
        const otpTemplate = OtpEmailTemplate({ otp, type });

        await sendEmail({
          to: email,
          subject: `Your login code`,
          html: await render(otpTemplate),
          text: await render(otpTemplate, { plainText: true }),
        });
      },
      otpLength: 6,
      expiresIn: 300, // 5 minutes
    }),

    admin({
      defaultRole: 'member',
    }),
  ],

  session: {
    expiresIn: 60 * 60 * 24 * 7, // 7 days
    updateAge: 60 * 60 * 24, // 1 day
  },

  advanced: {
    cookiePrefix: 'voi',
  },
});

export async function getSession() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const isAdmin = session?.user?.role === Role.ADMIN;

  return {
    session: session?.session ?? null,
    user: session?.user ?? null,
    isAdmin,
  };
}
