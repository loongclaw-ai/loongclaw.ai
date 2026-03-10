import type { Release, ChangeType } from '../../types';

const releases: Release[] = [
  {
    version: 'v2.0.4',
    date: '2025-03-10',
    changes: [
      { type: 'feat', description: 'Added support for new quantization formats' },
      { type: 'perf', description: 'Improved inference speed by 15%' },
      { type: 'fix', description: 'Fixed memory leak in long-running sessions' },
    ],
  },
  {
    version: 'v2.0.3',
    date: '2025-03-01',
    changes: [
      { type: 'feat', description: 'New REST API endpoints for batch processing' },
      { type: 'docs', description: 'Updated API documentation with examples' },
    ],
  },
  {
    version: 'v2.0.2',
    date: '2025-02-20',
    changes: [
      { type: 'fix', description: 'Resolved issue with model loading on ARM64' },
      { type: 'perf', description: 'Reduced cold start time' },
    ],
  },
  {
    version: 'v2.0.0',
    date: '2025-02-01',
    changes: [
      { type: 'breaking', description: 'New configuration format (see migration guide)' },
      { type: 'feat', description: 'Complete rewrite of inference engine' },
      { type: 'feat', description: 'Multi-model concurrent support' },
    ],
  },
];

const typeLabels: Record<ChangeType, { label: string; color: string }> = {
  feat: { label: 'Feature', color: '#3FB950' },
  fix: { label: 'Fix', color: '#58A6FF' },
  perf: { label: 'Performance', color: '#A371F7' },
  breaking: { label: 'Breaking', color: '#F85149' },
  docs: { label: 'Docs', color: '#8B949E' },
};

const ChangeBadge = ({ type }: { type: ChangeType }) => {
  const { label, color } = typeLabels[type];
  return (
    <span
      style={{
        display: 'inline-block',
        padding: '0.2rem 0.5rem',
        borderRadius: '12px',
        fontSize: '0.7rem',
        fontWeight: 600,
        backgroundColor: `${color}20`,
        color: color,
        marginRight: '0.75rem',
        fontFamily: "'JetBrains Mono', monospace",
      }}
    >
      {label}
    </span>
  );
};

const ChangelogPage = () => {
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

          <ul style={{ listStyle: 'none', padding: 0 }}>
            {release.changes.map((change, index) => (
              <li
                key={index}
                style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  marginBottom: '0.75rem',
                  fontSize: '0.95rem',
                  color: '#C9D1D9',
                }}
              >
                <ChangeBadge type={change.type} />
                <span>{change.description}</span>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default ChangelogPage;
