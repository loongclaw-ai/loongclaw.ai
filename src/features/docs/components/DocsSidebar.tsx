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
        borderRight: '1px solid rgba(139, 148, 158, 0.1)',
        padding: '2rem 1.5rem',
        position: 'fixed',
        left: 0,
        top: '73px',
        bottom: 0,
        overflowY: 'auto',
        backgroundColor: 'rgba(13, 17, 23, 0.95)',
      }}
    >
      {sections.map((section: DocSection) => (
        <div key={section.id} style={{ marginBottom: '1.5rem' }}>
          <Link
            to={section.path}
            style={{
              display: 'block',
              color: isActive(section.path) ? '#C9D1D9' : '#8B949E',
              fontWeight: isActive(section.path) ? 700 : 600,
              fontSize: '0.85rem',
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
              marginBottom: '0.5rem',
              fontFamily: "'Syncopate', sans-serif",
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
                    color: location.pathname === child.path ? '#C9D1D9' : '#586069',
                    fontSize: '0.8rem',
                    padding: '0.35rem 0',
                    fontFamily: "'JetBrains Mono', monospace",
                    borderLeft: location.pathname === child.path ? '2px solid #C9D1D9' : '2px solid transparent',
                    paddingLeft: '0.75rem',
                    marginLeft: '-0.75rem',
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
