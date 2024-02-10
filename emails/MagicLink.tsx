import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Html,
  Link,
  Preview,
  Text,
} from '@react-email/components';
import { PROJECT_NAME } from '@/lib/constants';
import * as React from 'react';

interface MagicLinkTemplateProps {
  confirmUrl: string;
  baseUrl: string;
}

export default function MagicLinkTemplate({
  confirmUrl,
  baseUrl,
}: MagicLinkTemplateProps) {
  return (
    <Html>
      <Head />
      <Preview>Log in to Sieutoc</Preview>

      <Body style={main as React.CSSProperties}>
        <Container style={container as React.CSSProperties}>
          <Link href={baseUrl} target="_blank">
            <Heading style={logo}>{PROJECT_NAME}</Heading>
          </Link>

          <Heading style={h1}>Login</Heading>

          <div>
            <Text style={text}>
              Click the button below to log in to {PROJECT_NAME}.
            </Text>
            <Text style={text}>This button will expire in 30 minutes.</Text>
          </div>

          <Button
            className="login-button"
            href={confirmUrl}
            target="_blank"
            style={button}
          >
            Login to {PROJECT_NAME}
          </Button>

          <div>
            <Text style={text}>Or, copy and paste this url:</Text>
            <code style={code}>{confirmUrl}</code>
            <Text style={{ ...text, color: '#ababab' }}>
              If you didn&apos;t try to login, you can safely ignore this email.
            </Text>
          </div>

          <Text style={footer}>Made by ⚡Sieutoc</Text>
        </Container>
      </Body>
    </Html>
  );
}

const main = {
  lineHeight: '1.2rem',
  backgroundColor: '#ffffff',
  fontFamily:
    "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
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

const h1 = {
  color: '#333',
  fontSize: '18px',
  fontWeight: 'bold',
  padding: '0',
  margin: '30px 0',
};

const button = {
  display: 'block',
  fontSize: '1.125rem',
  fontWeight: 'bold',
  padding: '14px 32px',
  background: '#e2af03',
  color: '#ffffff',
  borderRadius: '8px',
  margin: '20px 0',

  '&:hover': {
    background: '#7e5100',
    cursor: 'pointer',
  },
};

const text = {
  lineHeight: '1.25rem',
  color: '#333',
  fontSize: '14px',
  margin: '4px 0',
};

const footer = {
  color: '#898989',
  fontWeight: 'bold',
  margin: '20px 0',
};

const code = {
  display: 'inline-block',
  padding: '10px',
  width: '100%',
  backgroundColor: '#f4f4f4',
  borderRadius: '4px',
  border: '1px solid #eee',
  color: '#333',
  fontSize: '10px',
};
