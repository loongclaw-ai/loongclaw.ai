import { useState, type FC } from 'react';

interface CodeBlockProps {
  code: string;
  language?: string;
  filename?: string;
}

export const CodeBlock: FC<CodeBlockProps> = ({ code, language = 'bash', filename }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      style={{
        border: '1px solid var(--color-border)',
        borderRadius: '4px',
        overflow: 'hidden',
        margin: '1rem 0',
      }}
    >
      <div
        style={{
          background: 'var(--color-bg-secondary)',
          padding: '0.5rem 1rem',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          borderBottom: '1px solid var(--color-border-light)',
        }}
      >
        <span
          style={{
            fontSize: '0.7rem',
            color: 'var(--color-text-secondary)',
            fontFamily: 'var(--font-mono)',
            textTransform: 'uppercase',
          }}
        >
          {filename || language}
        </span>
        <button
          onClick={handleCopy}
          style={{
            background: 'transparent',
            border: 'none',
            color: copied ? '#3FB950' : 'var(--color-text-secondary)',
            fontSize: '0.7rem',
            cursor: 'pointer',
            fontFamily: 'var(--font-mono)',
          }}
        >
          {copied ? 'Copied!' : 'Copy'}
        </button>
      </div>
      <pre
        style={{
          background: 'var(--color-bg-secondary)',
          padding: '1rem',
          margin: 0,
          overflowX: 'auto',
          fontSize: '0.85rem',
          lineHeight: 1.6,
          fontFamily: 'var(--font-mono)',
          color: 'var(--color-text-primary)',
        }}
      >
        <code>{code}</code>
      </pre>
    </div>
  );
};

export default CodeBlock;
