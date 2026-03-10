import type { FC, ReactNode } from 'react';
import { useLocation } from 'react-router-dom';
import CodeBlock from './CodeBlock';

const contentMap: Record<string, { title: string; content: ReactNode }> = {
  '/docs': {
    title: 'Getting Started',
    content: (
      <>
        <p style={{ marginBottom: '1rem', color: '#C9D1D9' }}>
          OpenClaw is an open-source AI assistant runtime designed for severe constraints.
          This guide will help you get up and running in minutes.
        </p>

        <h2 style={{ marginTop: '2rem', marginBottom: '1rem', fontFamily: "'Syncopate', sans-serif", fontSize: '1.2rem' }}>
          Prerequisites
        </h2>
        <ul style={{ marginLeft: '1.5rem', color: '#C9D1D9' }}>
          <li>Linux, macOS, or Windows with WSL2</li>
          <li>Minimum 256MB RAM</li>
          <li>curl installed</li>
        </ul>

        <h2 style={{ marginTop: '2rem', marginBottom: '1rem', fontFamily: "'Syncopate', sans-serif", fontSize: '1.2rem' }}>
          Installation
        </h2>
        <p style={{ marginBottom: '1rem', color: '#C9D1D9' }}>
          Install OpenClaw using the install script:
        </p>
        <CodeBlock
          code="curl -sSfL https://openclaw.ai/install.sh | sh"
          language="bash"
        />

        <h2 style={{ marginTop: '2rem', marginBottom: '1rem', fontFamily: "'Syncopate', sans-serif", fontSize: '1.2rem' }}>
          Verify Installation
        </h2>
        <CodeBlock
          code="claw --version"
          language="bash"
        />
      </>
    ),
  },
  '/docs/installation': {
    title: 'Installation',
    content: (
      <>
        <p style={{ marginBottom: '1rem', color: '#C9D1D9' }}>
          OpenClaw supports multiple installation methods.
        </p>
        <CodeBlock
          code="# macOS with Homebrew\nbrew install openclaw"
          language="bash"
        />
        <CodeBlock
          code="# Linux with apt\nsudo apt install openclaw"
          language="bash"
        />
      </>
    ),
  },
  '/docs/quickstart': {
    title: 'Quick Start',
    content: (
      <>
        <p style={{ marginBottom: '1rem', color: '#C9D1D9' }}>
          Pull your first model and start chatting:
        </p>
        <CodeBlock
          code="claw pull literati-7b\nclaw run"
          language="bash"
        />
      </>
    ),
  },
};

export const DocContent: FC = () => {
  const location = useLocation();
  const doc = contentMap[location.pathname] || contentMap['/docs'];

  return (
    <article style={{ maxWidth: '800px' }}>
      <h1
        style={{
          fontFamily: "'Syncopate', sans-serif",
          fontSize: '2rem',
          marginBottom: '1.5rem',
          color: '#C9D1D9',
        }}
      >
        {doc.title}
      </h1>
      {doc.content}
    </article>
  );
};

export default DocContent;
