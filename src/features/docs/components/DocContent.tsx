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
        <p style={{ color: '#8B949E' }}>Loading...</p>
      </article>
    );
  }

  if (error || !data) {
    return (
      <article style={{ maxWidth: '800px' }}>
        <h1
          style={{
            fontFamily: "'Syncopate', sans-serif",
            fontSize: '2rem',
            marginBottom: '1.5rem',
            color: '#C9D1D9',
          }}
        >
          {doc?.title || 'Page Not Found'}
        </h1>
        <p style={{ color: '#8B949E' }}>
          {error ? 'Failed to load content.' : 'Content not found.'}
        </p>
      </article>
    );
  }

  return (
    <article style={{ maxWidth: '800px' }}>
      <h1
        style={{
          fontFamily: "'Syncopate', sans-serif",
          fontSize: '2rem',
          marginBottom: '1.5rem',
          color: '#C9D1D9',
        }}
      >
        {data.title}
      </h1>
      {data.description && (
        <p
          style={{
            color: '#8B949E',
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
          color: '#C9D1D9',
          lineHeight: '1.7',
        }}
      />
    </article>
  );
};

export default DocContent;
