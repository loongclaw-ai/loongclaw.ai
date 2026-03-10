// src/app/layouts/RootLayout.tsx
import type { FC, ReactNode } from 'react';
import CyberWires from '../../features/home/components/CyberWires';
import NavBar from '../../components/layout/NavBar';
import Footer from '../../components/layout/Footer';

interface RootLayoutProps {
  children: ReactNode;
}

export const RootLayout: FC<RootLayoutProps> = ({ children }) => {
  return (
    <div
      style={{
        background: 'var(--bg-gradient)',
        backgroundAttachment: 'fixed',
        color: 'var(--color-text-primary)',
        fontFamily: "'JetBrains Mono', monospace",
        height: '100vh',
        overflow: 'hidden',
        display: 'flex',
        position: 'relative',
      }}
    >
      {/* Cyber background wires */}
      <CyberWires />

      {/* Main content area */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          width: '100%',
          height: '100vh',
          position: 'relative',
          zIndex: 1,
        }}
      >
        {/* Navigation - Fixed at top */}
        <NavBar />

        {/* Page content - Scrollable middle area */}
        <main style={{ flex: 1, overflow: 'auto' }}>{children}</main>

        {/* Footer - Fixed at bottom */}
        <Footer />
      </div>
    </div>
  );
};

export default RootLayout;
