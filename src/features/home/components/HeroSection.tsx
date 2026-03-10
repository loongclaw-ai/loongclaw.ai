// src/features/home/components/HeroSection.tsx
import { useState } from 'react';
import type { FC } from 'react';
import StatsMatrix from './StatsMatrix';
import TerminalWindow from './TerminalWindow';

const HeroSection: FC = () => {
  const [primaryHovered, setPrimaryHovered] = useState(false);
  const [secondaryHovered, setSecondaryHovered] = useState(false);

  return (
    <section
      style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '4rem',
        alignItems: 'start',
        paddingTop: '2rem',
      }}
    >
      {/* Left column */}
      <div style={{ position: 'relative' }}>
        {/* Title */}
        <h1
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(3rem, 6vw, 5rem)',
            fontWeight: 800,
            lineHeight: 0.9,
            letterSpacing: '-0.02em',
            textTransform: 'uppercase',
            marginBottom: '1.5rem',
            color: 'var(--color-text-primary)',
          }}
        >
          Loong
          <br />
          Claw
        </h1>

        {/* Description */}
        <p
          style={{
            fontSize: '0.9rem',
            lineHeight: 1.6,
            opacity: 0.7,
            maxWidth: '80%',
            marginBottom: '2.5rem',
            borderLeft: '2px solid var(--color-text-muted)',
            paddingLeft: '1rem',
            color: 'var(--color-text-primary)',
            fontFamily: 'var(--font-mono)',
          }}
        >
          An open-source AI assistant runtime designed for severe constraints. Classical
          architecture meets brutalist efficiency. Deploy sentient infrastructure locally with
          minimal hardware footprint.
        </p>

        {/* Stats */}
        <StatsMatrix />

        {/* CTA Buttons */}
        <div style={{ display: 'flex', gap: '1rem' }}>
          <button
            style={{
              background: primaryHovered ? 'var(--color-accent-hover)' : 'var(--color-accent)',
              color: 'var(--color-bg-primary)',
              border: 'none',
              padding: '0.8rem 2rem',
              fontFamily: 'var(--font-display)',
              fontSize: '0.8rem',
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
              cursor: 'pointer',
              transition: 'all var(--transition-base)',
            }}
            onMouseEnter={() => setPrimaryHovered(true)}
            onMouseLeave={() => setPrimaryHovered(false)}
            onClick={() => alert('System initializing...')}
          >
            Initialize System
          </button>
          <a
            href="https://github.com/LoongClaw/LoongClaw"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              background: secondaryHovered ? 'var(--color-bg-tertiary)' : 'transparent',
              color: 'var(--color-text-primary)',
              border: `1px solid ${secondaryHovered ? 'var(--color-text-primary)' : 'var(--color-border)'}`,
              padding: '0.8rem 2rem',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.8rem',
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
              cursor: 'pointer',
              transition: 'all var(--transition-base)',
              textDecoration: 'none',
              display: 'inline-flex',
              alignItems: 'center',
            }}
            onMouseEnter={() => setSecondaryHovered(true)}
            onMouseLeave={() => setSecondaryHovered(false)}
          >
            View Source
          </a>
        </div>
      </div>

      {/* Right column: Terminal */}
      <TerminalWindow />
    </section>
  );
};

export default HeroSection;
