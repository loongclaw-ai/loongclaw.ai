// src/components/layout/NavBar.tsx
import { Link, useLocation } from 'react-router-dom';
import type { FC } from 'react';

const NavBar: FC = () => {
  const location = useLocation();

  const isActive = (path: string): boolean => {
    return location.pathname === path;
  };

  const getLinkStyle = (path: string): React.CSSProperties => ({
    color: isActive(path) ? 'var(--color-text-accent)' : 'var(--color-text-secondary)',
    fontWeight: isActive(path) ? 700 : 400,
    textDecoration: 'none',
    transition: 'color var(--transition-base), font-weight var(--transition-base)',
    fontSize: '0.875rem',
    letterSpacing: '0.05em',
  });

  return (
    <nav
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 'var(--z-sticky)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 'var(--space-md) var(--space-xl)',
        backgroundColor: 'rgba(13, 17, 23, 0.8)',
        backdropFilter: 'blur(12px)',
        borderBottom: '1px solid var(--color-border)',
      }}
    >
      {/* Logo / Home Link */}
      <Link
        to="/"
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 'var(--space-sm)',
          textDecoration: 'none',
          color: 'var(--color-text-accent)',
          fontFamily: 'var(--font-display)',
          fontSize: '1.25rem',
          fontWeight: 700,
          letterSpacing: '0.1em',
        }}
      >
        <span>OPENCLAW</span>
      </Link>

      {/* Navigation Items */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 'var(--space-xl)',
        }}
      >
        <Link to="/docs" style={getLinkStyle('/docs')}>
          Documentation
        </Link>
        <Link to="/community" style={getLinkStyle('/community')}>
          Community
        </Link>
        <Link to="/changelog" style={getLinkStyle('/changelog')}>
          Changelog
        </Link>

        {/* GitHub Button */}
        <a
          href="https://github.com/OpenClaw/OpenClaw"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 'var(--space-sm)',
            padding: 'var(--space-sm) var(--space-md)',
            backgroundColor: 'var(--color-bg-tertiary)',
            border: '1px solid var(--color-border)',
            borderRadius: '6px',
            color: 'var(--color-text-primary)',
            textDecoration: 'none',
            fontSize: '0.875rem',
            fontWeight: 500,
            transition: 'all var(--transition-base)',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = 'var(--color-bg-secondary)';
            e.currentTarget.style.borderColor = 'var(--color-border-medium)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = 'var(--color-bg-tertiary)';
            e.currentTarget.style.borderColor = 'var(--color-border)';
          }}
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="currentColor"
            style={{ flexShrink: 0 }}
          >
            <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z" />
          </svg>
          <span>GitHub</span>
        </a>
      </div>
    </nav>
  );
};

export default NavBar;
