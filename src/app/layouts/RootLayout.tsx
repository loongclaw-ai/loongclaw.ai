// src/app/layouts/RootLayout.tsx
import type { FC, ReactNode } from 'react';

interface RootLayoutProps {
  children: ReactNode;
}

export const RootLayout: FC<RootLayoutProps> = ({ children }) => {
  return (
    <div
      style={{
        backgroundColor: '#0D1117',
        color: '#C9D1D9',
        fontFamily: "'JetBrains Mono', monospace",
        minHeight: '100vh',
        overflowX: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
      }}
    >
      {children}
    </div>
  );
};

export default RootLayout;
