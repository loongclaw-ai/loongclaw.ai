import type { FC } from 'react';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useTheme, THEMES } from '../../../contexts/useTheme';

const crates = [
  {
    name: 'contracts',
    roleKey: 'architecture.crate_role_0',
    level: 0,
    color: 'var(--color-accent)',
  },
  {
    name: 'kernel',
    roleKey: 'architecture.crate_role_1',
    level: 1,
    deps: ['contracts'],
    color: '#3B82F6',
  },
  {
    name: 'protocol',
    roleKey: 'architecture.crate_role_2',
    level: 1,
    color: '#22c55e',
  },
  {
    name: 'app',
    roleKey: 'architecture.crate_role_3',
    level: 2,
    deps: ['contracts', 'kernel'],
    color: '#F97316',
  },
  {
    name: 'spec',
    roleKey: 'architecture.crate_role_4',
    level: 2,
    deps: ['contracts', 'kernel', 'protocol'],
    color: '#A855F7',
  },
  {
    name: 'bench',
    roleKey: 'architecture.crate_role_5',
    level: 2,
    deps: ['contracts', 'kernel', 'spec'],
    color: '#EC4899',
  },
  {
    name: 'daemon',
    roleKey: 'architecture.crate_role_6',
    level: 3,
    deps: ['all'],
    color: '#EF4444',
  },
];

const highlightsKeys = [
  'architecture.hl1',
  'architecture.hl2',
  'architecture.hl3',
  'architecture.hl4',
];

const ArchitectureSection: FC = () => {
  const { t } = useTranslation();
  const { theme } = useTheme();
  const isDark = theme === THEMES.DARK;
  const dividerColor = isDark
    ? 'var(--color-border)'
    : 'rgb(177, 35, 28)';
  
  const [hoveredCrate, setHoveredCrate] = useState<string | null>(null);

  return (
    <section className="section-padding" style={{ borderTop: `1px solid ${dividerColor}` }}>
      {/* Section header */}
      <div className="section-header" style={{ textAlign: 'center' }}>
        <h2
          style={{
            fontSize: '1.75rem',
            fontWeight: 700,
            color: 'var(--color-text-primary)',
            marginBottom: '0.75rem',
          }}
        >
          {t('architecture.title')}
        </h2>
        <p
          style={{
            fontSize: '1rem',
            color: 'var(--color-text-secondary)',
            maxWidth: '600px',
            margin: '0 auto',
          }}
        >
          {t('architecture.subtitle')}
        </p>
      </div>

      {/* Architecture diagram */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '2rem',
          maxWidth: '800px',
          margin: '0 auto 3rem',
          padding: '2rem 1rem',
        }}
      >
        {/* Level 0: Leaf */}
        <div className="crate-level" style={{ justifyContent: 'center' }}>
          <CrateNode 
            crate={crates[0]} 
            isHovered={hoveredCrate === crates[0].name}
            onHover={setHoveredCrate}
          />
        </div>

        {/* Level 1 */}
        <div className="crate-level" style={{ justifyContent: 'center' }}>
          <CrateNode 
            crate={crates[1]} 
            isHovered={hoveredCrate === crates[1].name}
            onHover={setHoveredCrate}
          />
          <CrateNode 
            crate={crates[2]} 
            isHovered={hoveredCrate === crates[2].name}
            onHover={setHoveredCrate}
          />
        </div>

        {/* Level 2 */}
        <div className="crate-level" style={{ justifyContent: 'center', flexWrap: 'wrap', gap: '1.5rem' }}>
          <CrateNode 
            crate={crates[3]} 
            isHovered={hoveredCrate === crates[3].name}
            onHover={setHoveredCrate}
          />
          <CrateNode 
            crate={crates[4]} 
            isHovered={hoveredCrate === crates[4].name}
            onHover={setHoveredCrate}
          />
          <CrateNode 
            crate={crates[5]} 
            isHovered={hoveredCrate === crates[5].name}
            onHover={setHoveredCrate}
          />
        </div>

        {/* Level 3: Binary */}
        <div className="crate-level" style={{ justifyContent: 'center' }}>
          <CrateNode 
            crate={crates[6]} 
            isBinary 
            isHovered={hoveredCrate === crates[6].name}
            onHover={setHoveredCrate}
          />
        </div>
      </div>

      {/* Highlights */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '1rem',
          maxWidth: '800px',
          margin: '0 auto',
        }}
      >
        {highlightsKeys.map((hlKey, index) => (
          <div
            key={index}
            style={{
              display: 'flex',
              alignItems: 'flex-start',
              gap: '0.75rem',
              padding: '1rem 1.25rem',
              background: 'var(--color-bg-secondary)',
              border: '1px solid var(--color-border)',
              borderRadius: '6px',
              transition: 'all 0.2s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = '#22c55e';
              e.currentTarget.style.transform = 'translateY(-2px)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = 'var(--color-border)';
              e.currentTarget.style.transform = 'translateY(0)';
            }}
          >
            <span
              style={{
                color: '#22c55e',
                fontSize: '1.1rem',
                fontWeight: 600,
                flexShrink: 0,
              }}
            >
              ✓
            </span>
            <span
              style={{
                fontSize: '0.85rem',
                color: 'var(--color-text-secondary)',
                lineHeight: 1.5,
              }}
            >
              {t(hlKey)}
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
    roleKey: string;
    level: number;
    color: string;
    deps?: string[];
  };
  isBinary?: boolean;
  isHovered?: boolean;
  onHover?: (name: string | null) => void;
}

const CrateNode: FC<CrateNodeProps> = ({ crate, isBinary, isHovered, onHover }) => {
  const { t } = useTranslation();
  return (
    <div
      role="button"
      tabIndex={0}
      style={{
        padding: '1rem 1.5rem',
        background: isBinary
          ? 'var(--color-bg-tertiary)'
          : 'var(--color-bg-secondary)',
        border: `2px solid ${isBinary ? 'var(--color-accent)' : crate.color}`,
        borderRadius: '8px',
        textAlign: 'center',
        minWidth: '160px',
        maxWidth: '200px',
        position: 'relative',
        cursor: 'pointer',
        transition: 'all 0.3s cubic-bezier(0.25, 1, 0.5, 1)',
        transform: isHovered ? 'scale(1.05) translateY(-4px)' : 'scale(1)',
        boxShadow: isHovered
          ? `0 8px 24px rgba(0, 0, 0, 0.2), 0 0 0 1px ${crate.color}`
          : 'none',
      }}
      onMouseEnter={() => onHover?.(crate.name)}
      onMouseLeave={() => onHover?.(null)}
      onFocus={() => onHover?.(crate.name)}
      onBlur={() => onHover?.(null)}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
        }
      }}
    >
      <div
        style={{
          fontSize: '0.95rem',
          fontWeight: 700,
          color: crate.color,
          fontFamily: 'var(--font-mono)',
          marginBottom: '0.5rem',
          letterSpacing: '-0.02em',
        }}
      >
        {crate.name}
      </div>
      <div
        style={{
          fontSize: '0.75rem',
          color: 'var(--color-text-muted)',
          lineHeight: 1.5,
        }}
      >
        {t(crate.roleKey)}
      </div>
      {isBinary && (
        <div
          style={{
            position: 'absolute',
            top: '-10px',
            right: '-10px',
            padding: '0.2rem 0.5rem',
            background: 'var(--color-accent)',
            color: 'var(--color-bg-primary)',
            fontSize: '0.65rem',
            fontWeight: 700,
            borderRadius: '4px',
            letterSpacing: '0.05em',
          }}
        >
          {t('architecture.binary')}
        </div>
      )}
    </div>
  );
};

export default ArchitectureSection;
