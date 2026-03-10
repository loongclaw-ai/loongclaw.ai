// src/features/home/components/CyberWires.tsx
import type { FC } from 'react';
import { useTheme } from '../../../contexts/useTheme';

const CyberWires: FC = () => {
  const { theme } = useTheme();

  // Dynamic stroke color based on theme
  const strokeColor = theme === 'dark'
    ? 'rgba(139, 148, 158, 0.15)'
    : 'rgba(70, 100, 110, 0.15)';

  return (
    <svg
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        pointerEvents: 'none',
        zIndex: 0,
        opacity: 0.8,
      }}
      preserveAspectRatio="none"
      viewBox="0 0 1000 1000"
    >
      {/* Curved cyber wires */}
      <path
        d="M -100 800 C 300 800, 400 400, 1100 200"
        fill="none"
        stroke={strokeColor}
        strokeWidth="1"
      />
      <path
        d="M -100 850 C 400 900, 600 300, 1100 300"
        fill="none"
        stroke={strokeColor}
        strokeWidth="1"
      />
      <path
        d="M -100 900 C 200 950, 800 500, 1100 400"
        fill="none"
        stroke={strokeColor}
        strokeWidth="1"
      />
      <path
        d="M 500 1100 C 450 700, 900 600, 700 300 C 600 150, 400 300, 500 500 C 550 600, 700 800, 1100 900"
        fill="none"
        stroke={strokeColor}
        strokeWidth="1"
        strokeOpacity="0.3"
      />
      <path
        d="M 600 1100 C 550 750, 850 650, 750 350 C 650 200, 450 350, 550 550 C 600 650, 750 850, 1100 950"
        fill="none"
        stroke={strokeColor}
        strokeWidth="1"
        strokeOpacity="0.2"
      />
      <path
        d="M -50 400 C 200 450, 300 700, 700 900"
        fill="none"
        stroke={strokeColor}
        strokeWidth="1"
        strokeDasharray="4 4"
        strokeOpacity="0.2"
      />
    </svg>
  );
};

export default CyberWires;
