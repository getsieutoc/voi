import { betterAuth } from 'better-auth';
import { prismaAdapter } from 'better-auth/adapters/prisma';
import { admin } from 'better-auth/plugins/admin';
import { emailOTP } from 'better-auth/plugins/email-otp';
import { prisma } from '@/lib/prisma';
import { sendEmail } from '@/lib/nodemailer';
import { headers } from 'next/headers';
import { Role } from '@/types';
import { PROJECT_NAME } from './constants';

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
        const getSubjectText = () => {
          if (type === 'email-verification') return 'verify your email';
          if (type === 'forget-password') return 'reset your password';
          return 'login';
        };

        // Simple HTML template without React rendering
        const html = `
          <!DOCTYPE html>
          <html>
            <head>
              <style>
                body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
                .container { max-width: 600px; margin: 0 auto; padding: 20px; }
                .header { font-size: 32px; font-weight: bold; color: #111; margin: 30px 0; }
                .otp-container { margin: 32px 0; padding: 20px; background: #f4f4f4; border-radius: 8px; border: 2px solid #e2af03; text-align: center; }
                .otp-code { font-size: 32px; font-weight: bold; letter-spacing: 8px; color: #111; font-family: monospace; }
                .footer { color: #898989; font-size: 12px; margin-top: 20px; }
              </style>
            </head>
            <body>
              <div class="container">
                <h1 class="header">${PROJECT_NAME}</h1>
                <p>Enter this code to ${getSubjectText()} for ${PROJECT_NAME}:</p>
                <div class="otp-container">
                  <code class="otp-code">${otp}</code>
                </div>
                <p>This code will expire in 5 minutes.</p>
                <p style="color: #ababab; margin-top: 50px;">
                  If you didn't request this code, you can safely ignore this email.
                </p>
                <p class="footer">Powered by ⚡Sieutoc</p>
              </div>
            </body>
          </html>
        `;

        const text = `
          ${PROJECT_NAME}
          
          Your verification code: ${otp}
          
          Enter this code to ${getSubjectText()} for ${PROJECT_NAME}.
          This code will expire in 5 minutes.
          
          If you didn't request this code, you can safely ignore this email.
          
          Powered by ⚡Sieutoc
        `;

        await sendEmail({
          to: email,
          subject: `Your ${PROJECT_NAME} login code`,
          html,
          text,
        });
      },
      otpLength: 6,
      expiresIn: 300, // 5 minutes
    }),

    admin({
      defaultRole: 'MEMBER',
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
