import type { FC } from 'react';

export const Footer: FC = () => {
  return (
    <footer
      style={{
        borderTop: '1px solid rgba(139, 148, 158, 0.1)',
        padding: '2rem 4rem',
        marginTop: 'auto',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        fontSize: '0.7rem',
        color: '#586069',
        fontFamily: "'JetBrains Mono', monospace",
      }}
    >
      <div>
        © 2025 OpenClaw. Open source under MIT License.
      </div>
      <div style={{ display: 'flex', gap: '1.5rem' }}>
        <a
          href="https://github.com/openclaw"
          target="_blank"
          rel="noopener noreferrer"
          style={{ color: 'inherit' }}
        >
          GitHub
        </a>
        <a
          href="https://twitter.com/openclaw"
          target="_blank"
          rel="noopener noreferrer"
          style={{ color: 'inherit' }}
        >
          Twitter
        </a>
        <a
          href="https://discord.gg/openclaw"
          target="_blank"
          rel="noopener noreferrer"
          style={{ color: 'inherit' }}
        >
          Discord
        </a>
      </div>
    </footer>
  );
};

export default Footer;
