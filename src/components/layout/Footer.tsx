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
        className="footer-container"
        style={{
          maxWidth: '1600px',
          margin: '0 auto',
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
          © {currentYear} Loong · MIT License
        </div>
      </div>
    </footer>
  );
};

export default Footer;
