import type { FC } from 'react';

const Footer: FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      style={{
        padding: '1rem 0',
        borderTop: '1px solid var(--color-border)',
      }}
    >
      <div
        style={{
          maxWidth: '1600px',
          margin: '0 auto',
          padding: '0 4rem',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <div
          style={{
            fontSize: '0.8rem',
            color: 'var(--color-text-muted)',
          }}
        >
          © {currentYear} LoongClaw AI · MIT License
        </div>
      </div>
    </footer>
  );
};

export default Footer;
