import type { FC } from 'react';

export const Footer: FC = () => {
  return (
    <footer
      style={{
        borderTop: '1px solid var(--color-border-light)',
        padding: '2rem 4rem',
        marginTop: 'auto',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        fontSize: '0.7rem',
        color: 'var(--color-text-muted)',
        fontFamily: 'var(--font-mono)',
        backgroundColor: 'var(--color-bg-secondary)',
      }}
    >
      <div>© 2025 OpenClaw. Open source under MIT License.</div>
      <div style={{ display: 'flex', gap: '1.5rem' }}>
        <a
          href="https://github.com/openclaw"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            color: 'inherit',
            transition: 'color var(--transition-base)',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.color = 'var(--color-text-primary)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.color = 'inherit';
          }}
        >
          GitHub
        </a>
        <a
          href="https://twitter.com/openclaw"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            color: 'inherit',
            transition: 'color var(--transition-base)',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.color = 'var(--color-text-primary)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.color = 'inherit';
          }}
        >
          Twitter
        </a>
        <a
          href="https://discord.gg/openclaw"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            color: 'inherit',
            transition: 'color var(--transition-base)',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.color = 'var(--color-text-primary)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.color = 'inherit';
          }}
        >
          Discord
        </a>
      </div>
    </footer>
  );
};

export default Footer;
