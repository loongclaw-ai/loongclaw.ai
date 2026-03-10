import type { FC } from 'react';
import { useLocation } from 'react-router-dom';
import { findDocByPath } from '../../../utils/content-loader';
import { useDocContent } from '../../../hooks/useContent';

const DocContent: FC = () => {
  const location = useLocation();
  const doc = findDocByPath(location.pathname);
  const { data, loading, error } = useDocContent(doc?.contentPath || null);

  if (loading) {
    return (
      <article style={{ maxWidth: '800px' }}>
        <p style={{ color: 'var(--color-text-secondary)' }}>Loading...</p>
      </article>
    );
  }

  if (error || !data) {
    return (
      <article style={{ maxWidth: '800px' }}>
        <h1
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: '2rem',
            marginBottom: '1.5rem',
            color: 'var(--color-text-primary)',
          }}
        >
          {doc?.title || 'Page Not Found'}
        </h1>
        <p style={{ color: 'var(--color-text-secondary)' }}>
          {error ? 'Failed to load content.' : 'Content not found.'}
        </p>
      </article>
    );
  }

  return (
    <article style={{ maxWidth: '800px' }}>
      <h1
        style={{
          fontFamily: 'var(--font-display)',
          fontSize: '2rem',
          marginBottom: '1.5rem',
          color: 'var(--color-text-primary)',
        }}
      >
        {data.title}
      </h1>
      {data.description && (
        <p
          style={{
            color: 'var(--color-text-secondary)',
            marginBottom: '2rem',
            fontSize: '1.1rem',
          }}
        >
          {data.description}
        </p>
      )}
      <div
        className="doc-markdown-content"
        dangerouslySetInnerHTML={{ __html: data.html }}
        style={{
          color: 'var(--color-text-primary)',
          lineHeight: '1.7',
        }}
      />
    </article>
  );
};

export default DocContent;
