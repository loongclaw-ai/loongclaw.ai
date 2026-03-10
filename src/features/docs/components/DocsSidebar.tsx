import type { FC } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { getDocsIndex } from '../../../utils/content-loader';
import type { DocSection } from '../../../types';

const DocsSidebar: FC = () => {
  const location = useLocation();
  const { sections } = getDocsIndex();

  const isActive = (path: string) => {
    return location.pathname === path || location.pathname.startsWith(`${path}/`);
  };

  return (
    <aside
      style={{
        width: '280px',
        minWidth: '280px',
        borderRight: '1px solid var(--color-border-light)',
        padding: '2rem 1.5rem',
        backgroundColor: 'var(--color-bg-secondary)',
        overflowY: 'auto',
        height: '100%',
      }}
    >
      {sections.map((section: DocSection) => (
        <div key={section.id} style={{ marginBottom: '1.5rem' }}>
          <Link
            to={section.path}
            style={{
              display: 'block',
              color: isActive(section.path) ? 'var(--color-text-primary)' : 'var(--color-text-secondary)',
              fontWeight: isActive(section.path) ? 700 : 600,
              fontSize: '0.85rem',
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
              marginBottom: '0.5rem',
              fontFamily: 'var(--font-display)',
              textDecoration: 'none',
            }}
          >
            {section.title}
          </Link>
          {section.children && (
            <div style={{ paddingLeft: '0.75rem' }}>
              {section.children.map((child: DocSection) => (
                <Link
                  key={child.id}
                  to={child.path}
                  style={{
                    display: 'block',
                    color: location.pathname === child.path ? 'var(--color-text-primary)' : 'var(--color-text-muted)',
                    fontSize: '0.8rem',
                    padding: '0.35rem 0',
                    fontFamily: 'var(--font-mono)',
                    borderLeft: location.pathname === child.path ? '2px solid var(--color-text-primary)' : '2px solid transparent',
                    paddingLeft: '0.75rem',
                    marginLeft: '-0.75rem',
                    textDecoration: 'none',
                    transition: 'color var(--transition-base)',
                  }}
                >
                  {child.title}
                </Link>
              ))}
            </div>
          )}
        </div>
      ))}
    </aside>
  );
};

export default DocsSidebar;
