import {
  Body,
  Button,
  Container,
  Font,
  Head,
  Heading,
  Html,
  Preview,
  Text,
} from '@react-email/components';
import { PROJECT_NAME } from '@/lib/constants';
import * as React from 'react';

type OtpEmailTemplateProps = {
  otp: string;
  type: string;
};

export const OtpEmailTemplate = ({ otp, type }: OtpEmailTemplateProps) => {
  const getSubjectText = () => {
    if (type === 'email-verification') return 'verify your email';
    if (type === 'forget-password') return 'reset your password';
    return 'login';
  };

  return (
    <Html>
      <Head>
        <title>{`Your ${PROJECT_NAME} verification code`}</title>

        <Font
          fontFamily="Roboto"
          fallbackFontFamily="Arial"
          fontWeight={400}
          fontStyle="normal"
        />
      </Head>

      <Preview>{`Your verification code is: ${otp}`}</Preview>

      <Body style={main}>
        <Container style={container}>
          <Heading style={logo}>{`${PROJECT_NAME}`}</Heading>

          <div>
            <Text style={text}>
              {`Enter this code to ${getSubjectText()} for ${PROJECT_NAME}:`}
            </Text>
          </div>

          <div style={otpContainer}>
            <code style={otpCode}>{otp}</code>
          </div>

          <div>
            <Text style={text}>This code will expire in 5 minutes.</Text>

            <Text style={{ ...text, color: '#ababab', marginTop: 50 }}>
              If you didn&apos;t request this code, you can safely ignore this
              email.
            </Text>
          </div>

          <Text style={footer}>Powered by ⚡Sieutoc</Text>
        </Container>
      </Body>
    </Html>
  );
};

const main = {
  lineHeight: '1.2rem',
  backgroundColor: '#ffffff',
};

const container = {
  paddingLeft: '12px',
  paddingRight: '12px',
  margin: '0 auto',
};

const logo = {
  color: '#111',
  fontSize: '32px',
  fontWeight: 'bold',
  padding: '0',
  margin: '30px 0',
};

const text = {
  lineHeight: '1.25rem',
  color: '#333',
  fontSize: '14px',
  margin: '4px 0',
};

const footer = {
  color: '#898989',
  fontSize: '12px',
  margin: '20px 0',
};

const otpContainer = {
  margin: '32px 0',
  padding: '20px',
  backgroundColor: '#f4f4f4',
  borderRadius: '8px',
  border: '2px solid #e2af03',
  textAlign: 'center' as const,
};

const otpCode = {
  fontSize: '32px',
  fontWeight: 'bold',
  letterSpacing: '8px',
  color: '#111',
  fontFamily: 'monospace',
};
