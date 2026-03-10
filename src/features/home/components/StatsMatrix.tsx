// src/features/home/components/StatsMatrix.tsx
import type { FC } from 'react';

interface Stat {
  label: string;
  value: string;
}

const stats: Stat[] = [
  { label: 'Min Hardware', value: 'Raspberry Pi 4' },
  { label: 'RAM Footprint', value: '256 MB' },
  { label: 'Cold Boot', value: '< 0.4s' },
  { label: 'Inference', value: '42 TOK/s' },
];

const StatsMatrix: FC = () => {
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(2, 1fr)',
        gap: '1px',
        background: 'var(--color-border)',
        border: '1px solid var(--color-border)',
        marginBottom: '3rem',
        width: 'fit-content',
      }}
    >
      {stats.map((stat) => (
        <div
          key={stat.label}
          style={{
            background: 'var(--color-bg-primary)',
            padding: '1rem 1.5rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '0.2rem',
          }}
        >
          <span
            style={{
              fontSize: '0.55rem',
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
              color: 'var(--color-text-secondary)',
              fontFamily: 'var(--font-mono)',
            }}
          >
            {stat.label}
          </span>
          <span
            style={{
              fontSize: '1.25rem',
              fontWeight: 700,
              color: 'var(--color-text-primary)',
              fontFamily: 'var(--font-mono)',
            }}
          >
            {stat.value}
          </span>
        </div>
      ))}
    </div>
  );
};

export default StatsMatrix;
