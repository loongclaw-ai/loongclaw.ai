import type { FC } from 'react';
import { useState, useEffect } from 'react';
import { getChangelogIndex } from '../../utils/content-loader';

interface ReleaseContent {
  version: string;
  date: string;
  html: string;
}

const ChangelogPage: FC = () => {
  const [releases, setReleases] = useState<ReleaseContent[]>([]);
  const [loading, setLoading] = useState(true);
  const { releases: releaseIndex } = getChangelogIndex();

  useEffect(() => {
    const loadReleases = async () => {
      const loadedReleases = await Promise.all(
        releaseIndex.map(async (release) => {
          const relativePath = release.contentPath.replace('/src/', '');
          const module = await import(`../../${relativePath}`);
          return {
            version: module.frontmatter.version,
            date: module.frontmatter.date,
            html: module.html,
          };
        })
      );
      setReleases(loadedReleases);
      setLoading(false);
    };

    loadReleases();
  }, [releaseIndex]);

  if (loading) {
    return (
      <div style={{ padding: '4rem', maxWidth: '1000px', margin: '0 auto' }}>
        <h1 style={{ fontFamily: "'Syncopate', sans-serif", fontSize: '2.5rem', color: '#C9D1D9' }}>
          Changelog
        </h1>
        <p style={{ color: '#8B949E' }}>Loading...</p>
      </div>
    );
  }

  return (
    <div
      style={{
        padding: '4rem',
        maxWidth: '1000px',
        margin: '0 auto',
      }}
    >
      <h1
        style={{
          fontFamily: "'Syncopate', sans-serif",
          fontSize: '2.5rem',
          marginBottom: '3rem',
          color: '#C9D1D9',
        }}
      >
        Changelog
      </h1>

      {releases.map((release) => (
        <div
          key={release.version}
          style={{
            marginBottom: '3rem',
            paddingBottom: '3rem',
            borderBottom: '1px solid rgba(139, 148, 158, 0.1)',
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'baseline',
              gap: '1rem',
              marginBottom: '1rem',
            }}
          >
            <h2
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: '1.5rem',
                color: '#C9D1D9',
              }}
            >
              {release.version}
            </h2>
            <span
              style={{
                fontSize: '0.85rem',
                color: '#8B949E',
                fontFamily: "'JetBrains Mono', monospace",
              }}
            >
              {release.date}
            </span>
          </div>

          <div
            className="changelog-content"
            dangerouslySetInnerHTML={{ __html: release.html }}
            style={{
              color: '#C9D1D9',
              lineHeight: '1.7',
            }}
          />
        </div>
      ))}
    </div>
  );
};

export default ChangelogPage;
