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
        border: '1px solid rgba(139, 148, 158, 0.2)',
        borderRadius: '4px',
        overflow: 'hidden',
        margin: '1rem 0',
      }}
    >
      <div
        style={{
          background: 'rgba(139, 148, 158, 0.05)',
          padding: '0.5rem 1rem',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          borderBottom: '1px solid rgba(139, 148, 158, 0.1)',
        }}
      >
        <span
          style={{
            fontSize: '0.7rem',
            color: '#8B949E',
            fontFamily: "'JetBrains Mono', monospace",
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
            color: copied ? '#3FB950' : '#8B949E',
            fontSize: '0.7rem',
            cursor: 'pointer',
            fontFamily: "'JetBrains Mono', monospace",
          }}
        >
          {copied ? 'Copied!' : 'Copy'}
        </button>
      </div>
      <pre
        style={{
          background: '#161B22',
          padding: '1rem',
          margin: 0,
          overflowX: 'auto',
          fontSize: '0.85rem',
          lineHeight: 1.6,
          fontFamily: "'JetBrains Mono', monospace",
          color: '#C9D1D9',
        }}
      >
        <code>{code}</code>
      </pre>
    </div>
  );
};

export default CodeBlock;
