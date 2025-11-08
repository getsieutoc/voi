import nodemailer from 'nodemailer';
import { z } from 'zod';

import { EMAIL_FROM } from './constants';

const emailPayloadSchema = z.object({
  to: z.email(),
  subject: z.string().min(1),
  html: z.string(),
  text: z.string(),
});

type EmailPayload = z.infer<typeof emailPayloadSchema>;

const smtpOptions = {
  host: process.env.SMTP_HOST || 'localhost',
  port: Number(process.env.SMTP_PORT || 1025),
  auth: {
    user: process.env.SMTP_USER || 'mailpit',
    pass: process.env.SMTP_PASSWORD || 'topsecret',
  },
};

export const sendEmail = async (data: EmailPayload) => {
  const validatedData = emailPayloadSchema.parse(data);

  const transporter = nodemailer.createTransport(smtpOptions);

  return transporter.sendMail({
    from: EMAIL_FROM,
    ...validatedData,
  });
};
