// src/features/home/index.tsx
import type { FC } from 'react';
import HeroSection from './components/HeroSection';

const HomePage: FC = () => {
  return (
    <div
      style={{
        padding: '2rem 4rem',
        maxWidth: '1600px',
        margin: '0 auto',
        position: 'relative',
      }}
    >
      {/* Location Metadata */}
      <div
        style={{
          position: 'absolute',
          top: '2rem',
          right: '4rem',
          fontSize: '0.5rem',
          color: '#586069',
          letterSpacing: '0.2em',
          opacity: 0.5,
          fontFamily: "'JetBrains Mono', monospace",
          textTransform: 'uppercase',
        }}
      >
        LAT.35.6895_LONG.139.6917
      </div>

      <HeroSection />
    </div>
  );
};

export default HomePage;
