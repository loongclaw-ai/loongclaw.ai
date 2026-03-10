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
          fontFamily: "'Syncopate', sans-serif",
          fontSize: '2.5rem',
          marginBottom: '1rem',
          color: '#C9D1D9',
        }}
      >
        Community
      </h1>
      <p
        style={{
          color: '#8B949E',
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
              border: '1px solid rgba(139, 148, 158, 0.2)',
              padding: '1.5rem',
              borderRadius: '4px',
              background: 'rgba(139, 148, 158, 0.05)',
              transition: 'all 0.2s ease',
              textDecoration: 'none',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = 'rgba(139, 148, 158, 0.4)';
              e.currentTarget.style.background = 'rgba(139, 148, 158, 0.1)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = 'rgba(139, 148, 158, 0.2)';
              e.currentTarget.style.background = 'rgba(139, 148, 158, 0.05)';
            }}
          >
            <h3
              style={{
                fontFamily: "'Syncopate', sans-serif",
                fontSize: '1rem',
                marginBottom: '0.5rem',
                color: '#C9D1D9',
              }}
            >
              {resource.title}
            </h3>
            <p style={{ color: '#8B949E', fontSize: '0.9rem' }}>
              {resource.description}
            </p>
          </a>
        ))}
      </div>
    </div>
  );
};

export default CommunityPage;
