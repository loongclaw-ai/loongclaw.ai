import type { FC } from 'react';

const crates = [
  {
    name: 'contracts',
    role: 'Shared types, capability model. Zero deps',
    level: 0,
    color: 'var(--color-accent)',
  },
  {
    name: 'kernel',
    role: 'Policy engine, audit, capability tokens',
    level: 1,
    deps: ['contracts'],
    color: '#3B82F6',
  },
  {
    name: 'protocol',
    role: 'Transport contracts, typed routing',
    level: 1,
    color: '#22c55e',
  },
  {
    name: 'app',
    role: 'Providers, tools, channels, memory',
    level: 2,
    deps: ['contracts', 'kernel'],
    color: '#F97316',
  },
  {
    name: 'spec',
    role: 'Execution spec runner',
    level: 2,
    deps: ['contracts', 'kernel', 'protocol'],
    color: '#A855F7',
  },
  {
    name: 'bench',
    role: 'Benchmark harness',
    level: 2,
    deps: ['contracts', 'kernel', 'spec'],
    color: '#EC4899',
  },
  {
    name: 'daemon',
    role: 'CLI binary (loongclawd)',
    level: 3,
    deps: ['all'],
    color: '#EF4444',
  },
];

const highlights = [
  '零循环依赖 - 严格的 DAG 结构',
  '稳定内核契约 - contracts crate 零内部依赖',
  '业务逻辑与核心分离 - extension planes 架构',
  'Capability-gated by default - 每个操作都需授权',
];

const ArchitectureSection: FC = () => {
  return (
    <section
      style={{
        padding: '4rem 0',
        borderTop: '1px solid var(--color-border)',
      }}
    >
      {/* Section header */}
      <div
        style={{
          textAlign: 'center',
          marginBottom: '3rem',
        }}
      >
        <h2
          style={{
            fontSize: '1.75rem',
            fontWeight: 700,
            color: 'var(--color-text-primary)',
            marginBottom: '0.75rem',
          }}
        >
          7-Crate 严格 DAG 架构
        </h2>
        <p
          style={{
            fontSize: '1rem',
            color: 'var(--color-text-secondary)',
            maxWidth: '600px',
            margin: '0 auto',
          }}
        >
          清晰的依赖方向，稳定的内核契约
        </p>
      </div>

      {/* Architecture diagram */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '1.5rem',
          maxWidth: '800px',
          margin: '0 auto 3rem',
        }}
      >
        {/* Level 0: Leaf */}
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <CrateNode crate={crates[0]} />
        </div>

        {/* Level 1 */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '3rem' }}>
          <CrateNode crate={crates[1]} />
          <CrateNode crate={crates[2]} />
        </div>

        {/* Level 2 */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '2rem' }}>
          <CrateNode crate={crates[3]} />
          <CrateNode crate={crates[4]} />
          <CrateNode crate={crates[5]} />
        </div>

        {/* Level 3: Binary */}
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <CrateNode crate={crates[6]} isBinary />
        </div>
      </div>

      {/* Highlights */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '1rem',
          maxWidth: '800px',
          margin: '0 auto',
        }}
      >
        {highlights.map((highlight, index) => (
          <div
            key={index}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem',
              padding: '1rem',
              background: 'var(--color-bg-secondary)',
              border: '1px solid var(--color-border)',
              borderRadius: '6px',
            }}
          >
            <span
              style={{
                color: 'var(--color-success)',
                fontSize: '1rem',
              }}
            >
              ✓
            </span>
            <span
              style={{
                fontSize: '0.85rem',
                color: 'var(--color-text-secondary)',
              }}
            >
              {highlight}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
};

interface CrateNodeProps {
  crate: {
    name: string;
    role: string;
    level: number;
    color: string;
    deps?: string[];
  };
  isBinary?: boolean;
}

const CrateNode: FC<CrateNodeProps> = ({ crate, isBinary }) => {
  return (
    <div
      style={{
        padding: '0.75rem 1.25rem',
        background: isBinary
          ? 'var(--color-bg-tertiary)'
          : 'var(--color-bg-secondary)',
        border: `2px solid ${isBinary ? 'var(--color-accent)' : crate.color}`,
        borderRadius: '6px',
        textAlign: 'center',
        minWidth: '140px',
        position: 'relative',
      }}
    >
      <div
        style={{
          fontSize: '0.9rem',
          fontWeight: 700,
          color: crate.color,
          fontFamily: 'var(--font-mono)',
          marginBottom: '0.25rem',
        }}
      >
        {crate.name}
      </div>
      <div
        style={{
          fontSize: '0.7rem',
          color: 'var(--color-text-muted)',
          lineHeight: 1.4,
        }}
      >
        {crate.role}
      </div>
      {isBinary && (
        <div
          style={{
            position: 'absolute',
            top: '-8px',
            right: '-8px',
            padding: '0.15rem 0.4rem',
            background: 'var(--color-accent)',
            color: 'var(--color-bg-primary)',
            fontSize: '0.6rem',
            fontWeight: 700,
            borderRadius: '4px',
          }}
        >
          BINARY
        </div>
      )}
    </div>
  );
};

export default ArchitectureSection;
