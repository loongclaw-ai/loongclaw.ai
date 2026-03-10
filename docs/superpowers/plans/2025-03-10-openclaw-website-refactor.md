# OpenClaw Website Refactor Implementation Plan

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Refactor OpenClaw website to feature-based modular architecture with Documentation, Community, and Changelog pages.

**Architecture:** Feature-based organization with self-contained modules per page. Shared UI components in `components/ui/` and `components/layout/`. React Router for navigation. CSS Variables for theming.

**Tech Stack:** React 19, TypeScript, Vite 7, React Router 7, CSS Modules

**Design Reference:** `docs/superpowers/specs/2025-03-10-openclaw-website-design.md`

---

## File Structure Overview

### New Directories
```
src/
├── app/
│   ├── layouts/
│   │   ├── RootLayout.tsx
│   │   └── DocsLayout.tsx
│   ├── router.tsx
│   └── providers.tsx
├── features/
│   ├── home/
│   │   ├── components/
│   │   ├── hooks/
│   │   └── index.tsx
│   ├── docs/
│   │   ├── components/
│   │   ├── data/
│   │   ├── hooks/
│   │   └── index.tsx
│   ├── community/
│   │   ├── components/
│   │   └── index.tsx
│   └── changelog/
│       ├── components/
│       ├── data/
│       └── index.tsx
├── components/
│   ├── ui/
│   └── layout/
├── lib/
├── types/
└── styles/
    ├── variables.css
    └── docs.css
```

### Modified Files
- `src/App.tsx` - Simplified to use router
- `src/main.tsx` - Add providers
- `src/index.css` - Split into variables.css
- `src/components/*` - Migrate to features/

---

## Chunk 1: Foundation Setup

### Task 1: Create Directory Structure

**Files:**
- Create: `src/app/layouts/`
- Create: `src/app/providers.tsx`
- Create: `src/features/home/components/`
- Create: `src/features/home/hooks/`
- Create: `src/features/docs/components/`
- Create: `src/features/docs/data/`
- Create: `src/features/docs/hooks/`
- Create: `src/features/community/components/`
- Create: `src/features/changelog/components/`
- Create: `src/features/changelog/data/`
- Create: `src/components/ui/`
- Create: `src/components/layout/`
- Create: `src/lib/`
- Create: `src/types/`
- Create: `src/styles/`

- [ ] **Step 1: Create all directories**

```bash
mkdir -p src/app/layouts
mkdir -p src/features/home/components
mkdir -p src/features/home/hooks
mkdir -p src/features/docs/components
mkdir -p src/features/docs/data
mkdir -p src/features/docs/hooks
mkdir -p src/features/community/components
mkdir -p src/features/changelog/components
mkdir -p src/features/changelog/data
mkdir -p src/components/ui
mkdir -p src/components/layout
mkdir -p src/lib
mkdir -p src/types
mkdir -p src/styles
```

- [ ] **Step 2: Verify structure**

```bash
find src -type d | sort
```

Expected: All directories listed above exist

- [ ] **Step 3: Commit**

```bash
git add -A
git commit -m "chore: create feature-based directory structure

- Add app/ layouts and providers
- Add features/ for home, docs, community, changelog
- Add components/ui and components/layout
- Add lib/, types/, styles/"
```

---

### Task 2: Extract CSS Variables

**Files:**
- Read: `src/index.css`
- Create: `src/styles/variables.css`
- Modify: `src/index.css`

- [ ] **Step 1: Extract CSS variables to variables.css**

```css
/* src/styles/variables.css */
/* Google Fonts Import */
@import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@100;400;500;700;800&family=Noto+Serif+SC:wght@400;700;900&family=Syncopate:wght@400;700&display=swap');

/* Nocturnal Protocol Theme */
:root {
  /* Core Colors */
  --color-bg-primary: #0D1117;
  --color-bg-secondary: #161B22;
  --color-bg-tertiary: #21262D;
  --color-border: rgba(139, 148, 158, 0.2);
  --color-border-light: rgba(139, 148, 158, 0.1);
  --color-border-medium: rgba(139, 148, 158, 0.15);

  /* Text Colors */
  --color-text-primary: #C9D1D9;
  --color-text-secondary: #8B949E;
  --color-text-muted: #586069;
  --color-text-accent: #FFFFFF;

  /* Accent Colors */
  --color-accent: #C9D1D9;
  --color-accent-hover: #FFFFFF;

  /* Typography */
  --font-mono: 'JetBrains Mono', 'Fira Code', 'SF Mono', Consolas, monospace;
  --font-display: 'Syncopate', 'Orbitron', 'Audiowide', sans-serif;
  --font-chinese: 'Noto Serif SC', 'Noto Sans SC', serif;

  /* Spacing Scale */
  --space-xs: 0.25rem;
  --space-sm: 0.5rem;
  --space-md: 1rem;
  --space-lg: 1.5rem;
  --space-xl: 2rem;
  --space-2xl: 3rem;
  --space-3xl: 4rem;

  /* Layout */
  --docs-sidebar-width: 280px;
  --content-max-width: 1200px;

  /* Z-index Layers */
  --z-background: 0;
  --z-content: 1;
  --z-sticky: 10;
  --z-overlay: 100;

  /* Transitions */
  --transition-fast: 150ms ease;
  --transition-base: 200ms ease;
  --transition-slow: 300ms ease;
}

/* Base Reset */
*, *::before, *::after {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html {
  font-size: 16px;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-rendering: optimizeLegibility;
}

body {
  font-family: var(--font-mono);
  background: var(--color-bg-primary);
  color: var(--color-text-primary);
  min-height: 100vh;
  overflow-x: hidden;
  line-height: 1.6;
}

/* Selection */
::selection {
  background: rgba(139, 148, 158, 0.3);
  color: var(--color-text-primary);
}

/* Scrollbar */
::-webkit-scrollbar {
  width: 6px;
  height: 6px;
}

::-webkit-scrollbar-track {
  background: var(--color-bg-secondary);
}

::-webkit-scrollbar-thumb {
  background: var(--color-text-muted);
  border-radius: 3px;
}

::-webkit-scrollbar-thumb:hover {
  background: var(--color-text-secondary);
}

/* Animations */
@keyframes blink {
  0%, 50% { opacity: 1; }
  51%, 100% { opacity: 0; }
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}

.animate-blink {
  animation: blink 1s infinite;
}

.animate-fade-in {
  animation: fadeIn 0.6s ease-out forwards;
}
```

- [ ] **Step 2: Simplify index.css to import variables**

```css
/* src/index.css */
@import './styles/variables.css';

/* Background gradient */
body {
  background: radial-gradient(circle at 50% -20%, #1c2128 0%, var(--color-bg-primary) 80%);
  background-attachment: fixed;
}

/* Link Styles */
a {
  color: inherit;
  text-decoration: none;
  transition: opacity var(--transition-base);
}

a:hover {
  opacity: 0.8;
}

/* Button Base */
button {
  font-family: inherit;
  border: none;
  cursor: pointer;
  transition: all var(--transition-base);
}

button:focus-visible {
  outline: 2px solid var(--color-text-secondary);
  outline-offset: 2px;
}

/* Code & Pre */
code, pre {
  font-family: var(--font-mono);
}
```

- [ ] **Step 3: Verify build succeeds**

```bash
bun run build
```

Expected: Build completes without errors

- [ ] **Step 4: Commit**

```bash
git add src/styles/variables.css src/index.css
git commit -m "refactor: extract CSS variables to dedicated file

- Create variables.css with all theme tokens
- Simplify index.css to imports only
- Add docs-specific layout variables"
```

---

### Task 3: Create Types

**Files:**
- Create: `src/types/index.ts`

- [ ] **Step 1: Define shared types**

```typescript
// src/types/index.ts

// Navigation
export interface NavItem {
  label: string;
  path: string;
  external?: boolean;
}

// Documentation
export interface DocSection {
  id: string;
  title: string;
  path: string;
  description?: string;
  children?: DocSection[];
}

export interface DocNode extends DocSection {
  content?: string;
  prev?: string;
  next?: string;
}

// Changelog
export type ChangeType = 'feat' | 'fix' | 'perf' | 'breaking' | 'docs';

export interface Change {
  type: ChangeType;
  description: string;
}

export interface Release {
  version: string;
  date: string;
  changes: Change[];
}

// Community
export type ResourceType = 'discord' | 'github' | 'forum' | 'blog' | 'twitter';

export interface CommunityResource {
  title: string;
  description: string;
  url: string;
  type: ResourceType;
  icon?: string;
}

// Stats
export interface Stat {
  label: string;
  value: string;
}

// Terminal
export interface TerminalCommand {
  prompt: string;
  command: string;
  output?: string[];
}
```

- [ ] **Step 2: Verify no TypeScript errors**

```bash
bun run lint
```

- [ ] **Step 3: Commit**

```bash
git add src/types/index.ts
git commit -m "feat: add shared TypeScript types

- NavItem for navigation
- DocSection/DocNode for documentation
- Release/Change for changelog
- CommunityResource for community page
- Stat and TerminalCommand types"
```

---

## Chunk 2: Layout Components

### Task 4: Create RootLayout

**Files:**
- Create: `src/app/layouts/RootLayout.tsx`

- [ ] **Step 1: Create RootLayout component**

```tsx
// src/app/layouts/RootLayout.tsx
import type { FC, ReactNode } from 'react';
import CyberWires from '../../features/home/components/CyberBackground';

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
      <CyberWires />
      {children}
    </div>
  );
};

export default RootLayout;
```

- [ ] **Step 2: Verify component compiles**

```bash
bun run build
```

- [ ] **Step 3: Commit**

```bash
git add src/app/layouts/RootLayout.tsx
git commit -m "feat: create RootLayout component

- Wraps page content with global background
- Includes CyberWires background effect"
```

---

### Task 5: Migrate CyberWires to CyberBackground

**Files:**
- Read: `src/components/CyberWires.tsx`
- Create: `src/features/home/components/CyberBackground.tsx`
- Delete: `src/components/CyberWires.tsx` (in later task)

- [ ] **Step 1: Copy and rename CyberWires**

```tsx
// src/features/home/components/CyberBackground.tsx
import type { FC } from 'react';

export const CyberBackground: FC = () => {
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
      <path
        d="M -100 800 C 300 800, 400 400, 1100 200"
        fill="none"
        stroke="rgba(139, 148, 158, 0.15)"
        strokeWidth="1"
      />
      <path
        d="M -100 850 C 400 900, 600 300, 1100 300"
        fill="none"
        stroke="rgba(139, 148, 158, 0.15)"
        strokeWidth="1"
      />
      <path
        d="M -100 900 C 200 950, 800 500, 1100 400"
        fill="none"
        stroke="rgba(139, 148, 158, 0.15)"
        strokeWidth="1"
      />
      <path
        d="M 500 1100 C 450 700, 900 600, 700 300 C 600 150, 400 300, 500 500 C 550 600, 700 800, 1100 900"
        fill="none"
        stroke="rgba(139, 148, 158, 0.15)"
        strokeWidth="1"
        strokeOpacity="0.3"
      />
      <path
        d="M 600 1100 C 550 750, 850 650, 750 350 C 650 200, 450 350, 550 550 C 600 650, 750 850, 1100 950"
        fill="none"
        stroke="rgba(139, 148, 158, 0.15)"
        strokeWidth="1"
        strokeOpacity="0.2"
      />
      <path
        d="M -50 400 C 200 450, 300 700, 700 900"
        fill="none"
        stroke="rgba(139, 148, 158, 0.15)"
        strokeWidth="1"
        strokeDasharray="4 4"
        strokeOpacity="0.2"
      />
    </svg>
  );
};

export default CyberBackground;
```

- [ ] **Step 2: Commit**

```bash
git add src/features/home/components/CyberBackground.tsx
git commit -m "feat: migrate CyberWires to CyberBackground

- Move to features/home/components/
- Rename for clarity"
```

---

### Task 6: Create NavBar (Updated)

**Files:**
- Read: `src/components/NavBar.tsx`
- Create: `src/components/layout/NavBar.tsx`
- Modify: `src/components/layout/NavBar.tsx`

- [ ] **Step 1: Create updated NavBar without SystemAxis references**

```tsx
// src/components/layout/NavBar.tsx
import { useState, type FC } from 'react';
import { Link, useLocation } from 'react-router-dom';
import type { NavItem } from '../../types';

const navItems: NavItem[] = [
  { label: 'Documentation', path: '/docs' },
  { label: 'Community', path: '/community' },
  { label: 'Changelog', path: '/changelog' },
];

export const NavBar: FC = () => {
  const [githubHovered, setGithubHovered] = useState(false);
  const location = useLocation();

  const isActive = (path: string) => {
    if (path === '/docs') {
      return location.pathname.startsWith('/docs');
    }
    return location.pathname === path;
  };

  return (
    <nav
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottom: '1px solid rgba(139, 148, 158, 0.1)',
        padding: '1.5rem 4rem',
        position: 'sticky',
        top: 0,
        zIndex: 10,
        backgroundColor: 'rgba(13, 17, 23, 0.8)',
        backdropFilter: 'blur(8px)',
      }}
    >
      {/* Logo Section */}
      <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <div
          style={{
            width: '24px',
            height: '24px',
            border: '2px solid #C9D1D9',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            fontFamily: "'Syncopate', sans-serif",
            fontSize: '0.7rem',
            fontWeight: 700,
            color: '#C9D1D9',
          }}
        >
          OC
        </div>
        <div
          style={{
            fontFamily: "'Syncopate', sans-serif",
            fontWeight: 700,
            fontSize: '1rem',
            letterSpacing: '0.1em',
            color: '#C9D1D9',
            textTransform: 'uppercase',
          }}
        >
          OPENCLAW
        </div>
      </Link>

      {/* Navigation Links & GitHub */}
      <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
        {navItems.map((item) => {
          const active = isActive(item.path);
          return (
            <Link
              key={item.path}
              to={item.path}
              style={{
                color: active ? '#C9D1D9' : '#8B949E',
                textDecoration: 'none',
                fontSize: '0.75rem',
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
                fontFamily: "'JetBrains Mono', monospace",
                transition: 'color 0.2s ease',
                position: 'relative',
                fontWeight: active ? 700 : 400,
              }}
            >
              {item.label}
            </Link>
          );
        })}

        {/* GitHub Button */}
        <button
          style={{
            border: '1px solid rgba(201, 209, 217, 0.3)',
            background: githubHovered ? '#C9D1D9' : 'transparent',
            color: githubHovered ? '#0D1117' : '#C9D1D9',
            padding: '0.4rem 1rem',
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: '0.7rem',
            textTransform: 'uppercase',
            letterSpacing: '0.05em',
            cursor: 'pointer',
            transition: 'all 0.2s ease',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
          }}
          onMouseEnter={() => setGithubHovered(true)}
          onMouseLeave={() => setGithubHovered(false)}
          onClick={() => window.open('https://github.com', '_blank')}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
          </svg>
          GitHub
        </button>
      </div>
    </nav>
  );
};

export default NavBar;
```

- [ ] **Step 2: Verify component compiles**

```bash
bun run build
```

- [ ] **Step 3: Commit**

```bash
git add src/components/layout/NavBar.tsx
git commit -m "feat: create updated NavBar in layout/

- Add Documentation, Community, Changelog links
- Add active state tracking with useLocation
- Sticky positioning with blur backdrop
- Remove SystemAxis references"
```

---

### Task 7: Create Footer

**Files:**
- Create: `src/components/layout/Footer.tsx`

- [ ] **Step 1: Create Footer component**

```tsx
// src/components/layout/Footer.tsx
import type { FC } from 'react';

export const Footer: FC = () => {
  return (
    <footer
      style={{
        borderTop: '1px solid rgba(139, 148, 158, 0.1)',
        padding: '2rem 4rem',
        marginTop: 'auto',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        fontSize: '0.7rem',
        color: '#586069',
        fontFamily: "'JetBrains Mono', monospace",
      }}
    >
      <div>
        © 2025 OpenClaw. Open source under MIT License.
      </div>
      <div style={{ display: 'flex', gap: '1.5rem' }}>
        <a
          href="https://github.com/openclaw"
          target="_blank"
          rel="noopener noreferrer"
          style={{ color: 'inherit' }}
        >
          GitHub
        </a>
        <a
          href="https://twitter.com/openclaw"
          target="_blank"
          rel="noopener noreferrer"
          style={{ color: 'inherit' }}
        >
          Twitter
        </a>
        <a
          href="https://discord.gg/openclaw"
          target="_blank"
          rel="noopener noreferrer"
          style={{ color: 'inherit' }}
        >
          Discord
        </a>
      </div>
    </footer>
  );
};

export default Footer;
```

- [ ] **Step 2: Commit**

```bash
git add src/components/layout/Footer.tsx
git commit -m "feat: create Footer component

- Add copyright and license info
- Social links: GitHub, Twitter, Discord
- Minimal design matching theme"
```

---

## Chunk 3: Router and Providers

### Task 8: Create Router Configuration

**Files:**
- Create: `src/app/router.tsx`

- [ ] **Step 1: Create router with all routes**

```tsx
// src/app/router.tsx
import { createBrowserRouter, Outlet } from 'react-router-dom';
import RootLayout from './layouts/RootLayout';
import NavBar from '../components/layout/NavBar';
import Footer from '../components/layout/Footer';
import HomePage from '../features/home';
import DocsPage from '../features/docs';
import CommunityPage from '../features/community';
import ChangelogPage from '../features/changelog';

// Layout wrapper with NavBar and Footer
const PageLayout = () => (
  <RootLayout>
    <NavBar />
    <main style={{ flex: 1, position: 'relative', zIndex: 1 }}>
      <Outlet />
    </main>
    <Footer />
  </RootLayout>
);

export const router = createBrowserRouter([
  {
    path: '/',
    element: <PageLayout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: 'docs',
        element: <DocsPage />,
      },
      {
        path: 'docs/*',
        element: <DocsPage />,
      },
      {
        path: 'community',
        element: <CommunityPage />,
      },
      {
        path: 'changelog',
        element: <ChangelogPage />,
      },
    ],
  },
]);

export default router;
```

- [ ] **Step 2: Commit**

```bash
git add src/app/router.tsx
git commit -m "feat: create router configuration

- Define routes: /, /docs, /docs/*, /community, /changelog
- PageLayout wrapper with NavBar and Footer
- Use createBrowserRouter from react-router-dom"
```

---

### Task 9: Update App.tsx

**Files:**
- Read: `src/App.tsx`
- Modify: `src/App.tsx`

- [ ] **Step 1: Simplify App.tsx to use RouterProvider**

```tsx
// src/App.tsx
import type { FC } from 'react';
import { RouterProvider } from 'react-router-dom';
import router from './app/router';

const App: FC = () => {
  return <RouterProvider router={router} />;
};

export default App;
```

- [ ] **Step 2: Verify build succeeds**

```bash
bun run build
```

- [ ] **Step 3: Commit**

```bash
git add src/App.tsx
git commit -m "refactor: simplify App.tsx to use RouterProvider

- Remove inline route definitions
- Import router from app/router"
```

---

## Chunk 4: Home Feature Migration

### Task 10: Migrate Home Components

**Files:**
- Read: `src/components/StatsMatrix.tsx`
- Read: `src/components/TerminalWindow.tsx`
- Read: `src/components/HeroSection.tsx`
- Create: `src/features/home/components/StatsMatrix.tsx`
- Create: `src/features/home/components/TerminalWindow.tsx`
- Create: `src/features/home/components/HeroSection.tsx`

- [ ] **Step 1: Copy StatsMatrix to features/home/**

Copy content from `src/components/StatsMatrix.tsx` to `src/features/home/components/StatsMatrix.tsx` unchanged.

- [ ] **Step 2: Copy TerminalWindow to features/home/**

Copy content from `src/components/TerminalWindow.tsx` to `src/features/home/components/TerminalWindow.tsx` unchanged.

- [ ] **Step 3: Copy HeroSection to features/home/**

Update imports in HeroSection to use local components:

```tsx
// src/features/home/components/HeroSection.tsx
import { useState, type FC } from 'react';
import StatsMatrix from './StatsMatrix';
import TerminalWindow from './TerminalWindow';

// ... rest of component (same as original)
```

- [ ] **Step 4: Commit**

```bash
git add src/features/home/components/
git commit -m "feat: migrate home components to features/home/

- StatsMatrix, TerminalWindow, HeroSection
- Update imports to use relative paths"
```

---

### Task 11: Create Home Page Index

**Files:**
- Create: `src/features/home/index.tsx`
- Read: `src/components/CyberWires.tsx` (for reference)

- [ ] **Step 1: Create HomePage export**

```tsx
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
```

- [ ] **Step 2: Commit**

```bash
git add src/features/home/index.tsx
git commit -m "feat: create HomePage index export

- Wraps HeroSection with layout styles
- Location metadata overlay"
```

---

### Task 12: Delete Old Components

**Files:**
- Delete: `src/components/CyberWires.tsx`
- Delete: `src/components/SystemAxis.tsx`
- Delete: `src/components/StatsMatrix.tsx`
- Delete: `src/components/TerminalWindow.tsx`
- Delete: `src/components/HeroSection.tsx`
- Delete: `src/components/NavBar.tsx`
- Delete: `src/components/index.ts`

- [ ] **Step 1: Delete old component files**

```bash
rm -f src/components/CyberWires.tsx
rm -f src/components/SystemAxis.tsx
rm -f src/components/StatsMatrix.tsx
rm -f src/components/TerminalWindow.tsx
rm -f src/components/HeroSection.tsx
rm -f src/components/NavBar.tsx
rm -f src/components/index.ts
```

- [ ] **Step 2: Verify build succeeds**

```bash
bun run build
```

- [ ] **Step 3: Commit**

```bash
git add -A
git commit -m "chore: remove old component files

- Deleted migrated components from src/components/
- SystemAxis removed entirely"
```

---

## Chunk 5: Documentation Feature

### Task 13: Create Docs Structure

**Files:**
- Create: `src/features/docs/data/docs-structure.ts`

- [ ] **Step 1: Define documentation structure**

```typescript
// src/features/docs/data/docs-structure.ts
import type { DocSection } from '../../../types';

export const docsStructure: DocSection[] = [
  {
    id: 'getting-started',
    title: 'Getting Started',
    path: '/docs',
    description: 'Quick start guide for OpenClaw',
    children: [
      {
        id: 'installation',
        title: 'Installation',
        path: '/docs/installation',
        description: 'Install OpenClaw on your system',
      },
      {
        id: 'quickstart',
        title: 'Quick Start',
        path: '/docs/quickstart',
        description: 'Run your first model in 5 minutes',
      },
    ],
  },
  {
    id: 'guides',
    title: 'Guides',
    path: '/docs/guides',
    description: 'Detailed usage guides',
    children: [
      {
        id: 'model-management',
        title: 'Model Management',
        path: '/docs/guides/model-management',
        description: 'Pull, list, and remove models',
      },
      {
        id: 'configuration',
        title: 'Configuration',
        path: '/docs/guides/configuration',
        description: 'Customize OpenClaw settings',
      },
    ],
  },
  {
    id: 'api',
    title: 'API Reference',
    path: '/docs/api',
    description: 'REST API documentation',
    children: [
      {
        id: 'generate',
        title: 'Generate',
        path: '/docs/api/generate',
        description: 'Generate completions',
      },
      {
        id: 'chat',
        title: 'Chat',
        path: '/docs/api/chat',
        description: 'Chat completions API',
      },
    ],
  },
];

export default docsStructure;
```

- [ ] **Step 2: Commit**

```bash
git add src/features/docs/data/docs-structure.ts
git commit -m "feat: add documentation structure

- Define sections: Getting Started, Guides, API Reference
- Hierarchical navigation tree"
```

---

### Task 14: Create DocsSidebar

**Files:**
- Create: `src/features/docs/components/DocsSidebar.tsx`

- [ ] **Step 1: Create DocsSidebar component**

```tsx
// src/features/docs/components/DocsSidebar.tsx
import { Link, useLocation } from 'react-router-dom';
import type { FC } from 'react';
import type { DocSection } from '../../../types';

interface DocsSidebarProps {
  sections: DocSection[];
}

export const DocsSidebar: FC<DocsSidebarProps> = ({ sections }) => {
  const location = useLocation();

  const isActive = (path: string) => {
    return location.pathname === path || location.pathname.startsWith(`${path}/`);
  };

  return (
    <aside
      style={{
        width: '280px',
        borderRight: '1px solid rgba(139, 148, 158, 0.1)',
        padding: '2rem 1.5rem',
        position: 'fixed',
        left: 0,
        top: '73px', // NavBar height
        bottom: 0,
        overflowY: 'auto',
        backgroundColor: 'rgba(13, 17, 23, 0.95)',
      }}
    >
      {sections.map((section) => (
        <div key={section.id} style={{ marginBottom: '1.5rem' }}>
          <Link
            to={section.path}
            style={{
              display: 'block',
              color: isActive(section.path) ? '#C9D1D9' : '#8B949E',
              fontWeight: isActive(section.path) ? 700 : 600,
              fontSize: '0.85rem',
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
              marginBottom: '0.5rem',
              fontFamily: "'Syncopate', sans-serif",
            }}
          >
            {section.title}
          </Link>
          {section.children && (
            <div style={{ paddingLeft: '0.75rem' }}>
              {section.children.map((child) => (
                <Link
                  key={child.id}
                  to={child.path}
                  style={{
                    display: 'block',
                    color: location.pathname === child.path ? '#C9D1D9' : '#586069',
                    fontSize: '0.8rem',
                    padding: '0.35rem 0',
                    fontFamily: "'JetBrains Mono', monospace",
                    borderLeft: location.pathname === child.path ? '2px solid #C9D1D9' : '2px solid transparent',
                    paddingLeft: '0.75rem',
                    marginLeft: '-0.75rem',
                  }}
                >
                  {child.title}
                </Link>
              ))}
            </div>
          )}
        </div>
      ))}
    </aside>
  );
};

export default DocsSidebar;
```

- [ ] **Step 2: Commit**

```bash
git add src/features/docs/components/DocsSidebar.tsx
git commit -m "feat: create DocsSidebar component

- Fixed position left sidebar
- Section hierarchy with children
- Active state styling"
```

---

### Task 15: Create CodeBlock

**Files:**
- Create: `src/features/docs/components/CodeBlock.tsx`

- [ ] **Step 1: Create CodeBlock component**

```tsx
// src/features/docs/components/CodeBlock.tsx
import { useState, type FC } from 'react';

interface CodeBlockProps {
  code: string;
  language?: string;
  filename?: string;
}

export const CodeBlock: FC<CodeBlockProps> = ({ code, language = 'bash', filename }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      style={{
        border: '1px solid rgba(139, 148, 158, 0.2)',
        borderRadius: '4px',
        overflow: 'hidden',
        margin: '1rem 0',
      }}
    >
      {/* Header */}
      <div
        style={{
          background: 'rgba(139, 148, 158, 0.05)',
          padding: '0.5rem 1rem',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          borderBottom: '1px solid rgba(139, 148, 158, 0.1)',
        }}
      >
        <span
          style={{
            fontSize: '0.7rem',
            color: '#8B949E',
            fontFamily: "'JetBrains Mono', monospace",
            textTransform: 'uppercase',
          }}
        >
          {filename || language}
        </span>
        <button
          onClick={handleCopy}
          style={{
            background: 'transparent',
            border: 'none',
            color: copied ? '#3FB950' : '#8B949E',
            fontSize: '0.7rem',
            cursor: 'pointer',
            fontFamily: "'JetBrains Mono', monospace",
          }}
        >
          {copied ? 'Copied!' : 'Copy'}
        </button>
      </div>

      {/* Code */}
      <pre
        style={{
          background: '#161B22',
          padding: '1rem',
          margin: 0,
          overflowX: 'auto',
          fontSize: '0.85rem',
          lineHeight: 1.6,
          fontFamily: "'JetBrains Mono', monospace",
          color: '#C9D1D9',
        }}
      >
        <code>{code}</code>
      </pre>
    </div>
  );
};

export default CodeBlock;
```

- [ ] **Step 2: Commit**

```bash
git add src/features/docs/components/CodeBlock.tsx
git commit -m "feat: create CodeBlock component

- Syntax highlighting container
- Copy to clipboard functionality
- Terminal-style header with language/filename"
```

---

### Task 16: Create DocPage Content

**Files:**
- Create: `src/features/docs/components/DocContent.tsx`

- [ ] **Step 1: Create DocContent with sample content**

```tsx
// src/features/docs/components/DocContent.tsx
import type { FC } from 'react';
import { useLocation } from 'react-router-dom';
import CodeBlock from './CodeBlock';

const contentMap: Record<string, { title: string; content: React.ReactNode }> = {
  '/docs': {
    title: 'Getting Started',
    content: (
      <>
        <p style={{ marginBottom: '1rem', color: '#C9D1D9' }}>
          OpenClaw is an open-source AI assistant runtime designed for severe constraints.
          This guide will help you get up and running in minutes.
        </p>

        <h2 style={{ marginTop: '2rem', marginBottom: '1rem', fontFamily: "'Syncopate', sans-serif", fontSize: '1.2rem' }}>
          Prerequisites
        </h2>
        <ul style={{ marginLeft: '1.5rem', color: '#C9D1D9' }}>
          <li>Linux, macOS, or Windows with WSL2</li>
          <li>Minimum 256MB RAM</li>
          <li>curl installed</li>
        </ul>

        <h2 style={{ marginTop: '2rem', marginBottom: '1rem', fontFamily: "'Syncopate', sans-serif", fontSize: '1.2rem' }}>
          Installation
        </h2>
        <p style={{ marginBottom: '1rem', color: '#C9D1D9' }}>
          Install OpenClaw using the install script:
        </p>
        <CodeBlock
          code="curl -sSfL https://openclaw.ai/install.sh | sh"
          language="bash"
        />

        <h2 style={{ marginTop: '2rem', marginBottom: '1rem', fontFamily: "'Syncopate', sans-serif", fontSize: '1.2rem' }}>
          Verify Installation
        </h2>
        <CodeBlock
          code="claw --version"
          language="bash"
        />
      </>
    ),
  },
  '/docs/installation': {
    title: 'Installation',
    content: (
      <>
        <p style={{ marginBottom: '1rem', color: '#C9D1D9' }}>
          OpenClaw supports multiple installation methods.
        </p>
        <CodeBlock
          code="# macOS with Homebrew\nbrew install openclaw"
          language="bash"
        />
        <CodeBlock
          code="# Linux with apt\nsudo apt install openclaw"
          language="bash"
        />
      </>
    ),
  },
  '/docs/quickstart': {
    title: 'Quick Start',
    content: (
      <>
        <p style={{ marginBottom: '1rem', color: '#C9D1D9' }}>
          Pull your first model and start chatting:
        </p>
        <CodeBlock
          code="claw pull literati-7b\nclaw run"
          language="bash"
        />
      </>
    ),
  },
};

export const DocContent: FC = () => {
  const location = useLocation();
  const doc = contentMap[location.pathname] || contentMap['/docs'];

  return (
    <article style={{ maxWidth: '800px' }}>
      <h1
        style={{
          fontFamily: "'Syncopate', sans-serif",
          fontSize: '2rem',
          marginBottom: '1.5rem',
          color: '#C9D1D9',
        }}
      >
        {doc.title}
      </h1>
      {doc.content}
    </article>
  );
};

export default DocContent;
```

- [ ] **Step 2: Commit**

```bash
git add src/features/docs/components/DocContent.tsx
git commit -m "feat: create DocContent component

- Route-based content rendering
- Sample content for getting-started, installation, quickstart
- Integrated CodeBlock usage"
```

---

### Task 17: Create Docs Page Index

**Files:**
- Create: `src/features/docs/index.tsx`

- [ ] **Step 1: Create Docs page wrapper**

```tsx
// src/features/docs/index.tsx
import type { FC } from 'react';
import DocsSidebar from './components/DocsSidebar';
import DocContent from './components/DocContent';
import docsStructure from './data/docs-structure';

const DocsPage: FC = () => {
  return (
    <div style={{ display: 'flex', minHeight: 'calc(100vh - 73px)' }}>
      <DocsSidebar sections={docsStructure} />
      <main
        style={{
          marginLeft: '280px',
          padding: '3rem 4rem',
          flex: 1,
        }}
      >
        <DocContent />
      </main>
    </div>
  );
};

export default DocsPage;
```

- [ ] **Step 2: Commit**

```bash
git add src/features/docs/index.tsx
git commit -m "feat: create DocsPage index

- Layout with sidebar and content area
- Fixed sidebar offset for main content"
```

---

## Chunk 6: Community Feature

### Task 18: Create Community Page

**Files:**
- Create: `src/features/community/index.tsx`

- [ ] **Step 1: Create Community page**

```tsx
// src/features/community/index.tsx
import type { FC } from 'react';
import type { CommunityResource } from '../../types';

const resources: CommunityResource[] = [
  {
    title: 'GitHub',
    description: 'Star us, report issues, and contribute to the codebase.',
    url: 'https://github.com/openclaw',
    type: 'github',
  },
  {
    title: 'Discord',
    description: 'Join our community for real-time support and discussions.',
    url: 'https://discord.gg/openclaw',
    type: 'discord',
  },
  {
    title: 'Twitter',
    description: 'Follow us for updates, tips, and community highlights.',
    url: 'https://twitter.com/openclaw',
    type: 'twitter',
  },
];

const CommunityPage: FC = () => {
  return (
    <div
      style={{
        padding: '4rem',
        maxWidth: '1200px',
        margin: '0 auto',
      }}
    >
      <h1
        style={{
          fontFamily: "'Syncopate', sans-serif",
          fontSize: '2.5rem',
          marginBottom: '1rem',
          color: '#C9D1D9',
        }}
      >
        Community
      </h1>
      <p
        style={{
          color: '#8B949E',
          marginBottom: '3rem',
          maxWidth: '600px',
          fontSize: '1.1rem',
        }}
      >
        Connect with developers, contributors, and users. OpenClaw is built by the community, for the community.
      </p>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '1.5rem',
        }}
      >
        {resources.map((resource) => (
          <a
            key={resource.title}
            href={resource.url}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              border: '1px solid rgba(139, 148, 158, 0.2)',
              padding: '1.5rem',
              borderRadius: '4px',
              background: 'rgba(139, 148, 158, 0.05)',
              transition: 'all 0.2s ease',
              textDecoration: 'none',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = 'rgba(139, 148, 158, 0.4)';
              e.currentTarget.style.background = 'rgba(139, 148, 158, 0.1)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = 'rgba(139, 148, 158, 0.2)';
              e.currentTarget.style.background = 'rgba(139, 148, 158, 0.05)';
            }}
          >
            <h3
              style={{
                fontFamily: "'Syncopate', sans-serif",
                fontSize: '1rem',
                marginBottom: '0.5rem',
                color: '#C9D1D9',
              }}
            >
              {resource.title}
            </h3>
            <p style={{ color: '#8B949E', fontSize: '0.9rem' }}>
              {resource.description}
            </p>
          </a>
        ))}
      </div>
    </div>
  );
};

export default CommunityPage;
```

- [ ] **Step 2: Commit**

```bash
git add src/features/community/index.tsx
git commit -m "feat: create Community page

- Grid layout with resource cards
- GitHub, Discord, Twitter resources
- Hover effects on cards"
```

---

## Chunk 7: Changelog Feature

### Task 19: Create Changelog Data

**Files:**
- Create: `src/features/changelog/data/releases.ts`

- [ ] **Step 1: Create releases data**

```typescript
// src/features/changelog/data/releases.ts
import type { Release } from '../../../types';

export const releases: Release[] = [
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

export default releases;
```

- [ ] **Step 2: Commit**

```bash
git add src/features/changelog/data/releases.ts
git commit -m "feat: add changelog releases data

- Sample release data for v2.x series
- Includes feat, fix, perf, breaking, docs types"
```

---

### Task 20: Create Changelog Page

**Files:**
- Create: `src/features/changelog/index.tsx`

- [ ] **Step 1: Create Changelog page**

```tsx
// src/features/changelog/index.tsx
import type { FC } from 'react';
import type { Change, ChangeType } from '../../types';
import releases from './data/releases';

const typeLabels: Record<ChangeType, { label: string; color: string }> = {
  feat: { label: 'Feature', color: '#3FB950' },
  fix: { label: 'Fix', color: '#58A6FF' },
  perf: { label: 'Performance', color: '#A371F7' },
  breaking: { label: 'Breaking', color: '#F85149' },
  docs: { label: 'Docs', color: '#8B949E' },
};

const ChangeBadge: FC<{ type: ChangeType }> = ({ type }) => {
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

const ChangelogPage: FC = () => {
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
```

- [ ] **Step 2: Commit**

```bash
git add src/features/changelog/index.tsx
git commit -m "feat: create Changelog page

- Version list with date headers
- Change badges by type (feat, fix, perf, breaking, docs)
- Color-coded labels"
```

---

## Chunk 8: Final Verification

### Task 21: Verify Build

**Files:**
- All source files

- [ ] **Step 1: Run full build**

```bash
bun run build
```

Expected: Build completes without errors

- [ ] **Step 2: Run lint**

```bash
bun run lint
```

Expected: No linting errors

- [ ] **Step 3: Final commit**

```bash
git add -A
git commit -m "feat: complete OpenClaw website refactor

- Feature-based modular architecture
- Documentation, Community, Changelog pages
- Updated NavBar with routing
- Removed SystemAxis
- CSS variables for theming
- Type-safe TypeScript throughout"
```

---

## Summary

This plan implements:

1. **Foundation**: Directory structure, CSS variables, types
2. **Layout**: RootLayout, NavBar, Footer
3. **Routing**: React Router with all pages
4. **Home**: Migrated components to features/home/
5. **Docs**: Full documentation system with sidebar
6. **Community**: Resource grid page
7. **Changelog**: Version history with badges

**Key Design Decisions**:
- Feature-based organization over technical layers
- CSS variables for maintainable theming
- Fixed sidebar for docs, top navigation for global
- TypeScript interfaces for all data structures
- Terminal aesthetic preserved throughout
