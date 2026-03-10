// src/features/home/components/HeroSection.tsx
import type { FC } from 'react';

const HeroSection: FC = () => {
  return (
    <section
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '70vh',
        position: 'relative',
      }}
    >
      <h1
        style={{
          fontSize: '4rem',
          fontWeight: 700,
          letterSpacing: '-0.02em',
          marginBottom: '1.5rem',
          textAlign: 'center',
          fontFamily: "'Syncopate', sans-serif",
          textTransform: 'uppercase',
        }}
      >
        OpenClaw
      </h1>
      <p
        style={{
          fontSize: '1.25rem',
          color: '#8B949E',
          textAlign: 'center',
          maxWidth: '600px',
          lineHeight: 1.6,
          marginBottom: '2rem',
        }}
      >
        An open-source AI assistant runtime designed for severe constraints.
      </p>
    </section>
  );
};

export default HeroSection;
