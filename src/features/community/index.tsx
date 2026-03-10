import type { FC } from 'react';
import { getCommunityIndex } from '../../utils/content-loader';

const CommunityPage: FC = () => {
  const { resources } = getCommunityIndex();

  return (
    <div
      style={{
        padding: '4rem',
        maxWidth: '1200px',
        margin: '0 auto',
      }}
    >
      <h1
        style={{
          fontFamily: 'var(--font-display)',
          fontSize: '2.5rem',
          marginBottom: '1rem',
          color: 'var(--color-text-primary)',
        }}
      >
        Community
      </h1>
      <p
        style={{
          color: 'var(--color-text-secondary)',
          marginBottom: '3rem',
          maxWidth: '600px',
          fontSize: '1.1rem',
        }}
      >
        Connect with developers, contributors, and users. OpenClaw is built by the community, for the community.
      </p>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '1.5rem',
        }}
      >
        {resources.map((resource) => (
          <a
            key={resource.title}
            href={resource.url}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              border: '1px solid var(--color-border)',
              padding: '1.5rem',
              borderRadius: '4px',
              background: 'var(--color-bg-secondary)',
              transition: 'all var(--transition-base)',
              textDecoration: 'none',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = 'var(--color-text-muted)';
              e.currentTarget.style.background = 'var(--color-bg-tertiary)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = 'var(--color-border)';
              e.currentTarget.style.background = 'var(--color-bg-secondary)';
            }}
          >
            <h3
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: '1rem',
                marginBottom: '0.5rem',
                color: 'var(--color-text-primary)',
              }}
            >
              {resource.title}
            </h3>
            <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.9rem' }}>
              {resource.description}
            </p>
          </a>
        ))}
      </div>
    </div>
  );
};

export default CommunityPage;
