import nodemailer from 'nodemailer';

import { EMAIL_FROM, EMAIL_REGEX } from './constants';

type EmailPayload = {
  to: string;
  subject: string;
  html: string;
  text: string;
};

const smtpOptions = {
  host: process.env.SMTP_HOST || 'localhost',
  port: Number(process.env.SMTP_PORT || 1025),
  auth: {
    user: process.env.SMTP_USER || 'mailpit',
    pass: process.env.SMTP_PASSWORD || 'topsecret',
  },
};

export const sendEmail = async (data: EmailPayload) => {
  const isValidEmail = EMAIL_REGEX.test(data.to);

  if (!isValidEmail) {
    throw new Error('Invalid email address');
  }

  const transporter = nodemailer.createTransport(smtpOptions);

  return await transporter.sendMail({
    from: EMAIL_FROM,
    ...data,
  });
};
