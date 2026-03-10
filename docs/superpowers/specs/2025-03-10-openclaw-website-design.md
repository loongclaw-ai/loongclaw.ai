# OpenClaw Website Architecture Design

**Date:** 2025-03-10
**Status:** Approved
**Type:** Frontend Architecture Refactor

---

## 1. Project Overview

### 1.1 Purpose
OpenClaw is an open-source AI assistant runtime designed for severe constraints. This design document outlines the frontend architecture for its official documentation website.

### 1.2 Target Audience
- Developers interested in local AI deployment
- Open-source contributors
- Technical decision-makers evaluating edge AI solutions

### 1.3 Design Philosophy
- **Nocturnal Protocol**: Dark, brutalist, terminal-inspired aesthetic
- **Minimalist**: Ruthless simplicity, every element serves a purpose
- **Technical**: Monospace fonts, system-inspired visual language

---

## 2. Requirements Summary

### 2.1 Confirmed Pages
| Page | Purpose |
|------|---------|
| Home | Product introduction, value proposition, CTA |
| Documentation | Complete docs with sidebar navigation |
| Community | Resources, Discord, contribution guides |
| Changelog | Version history, release notes |

### 2.2 Navigation Pattern
- **Global**: Top NavBar with logo, main links, GitHub CTA
- **Documentation**: Left sidebar for doc sections, right content area
- **Removed**: SystemAxis sidebar (simplified to top navigation)

---

## 3. Architecture Design

### 3.1 Directory Structure (Feature-Based)

```
src/
├── app/
│   ├── layouts/
│   │   ├── RootLayout.tsx      # Global layout: background, fonts, providers
│   │   └── DocsLayout.tsx      # Docs layout: sidebar + content area
│   ├── router.tsx              # React Router configuration
│   └── providers.tsx           # Global Context providers
│
├── features/                   # Feature-based organization
│   ├── home/
│   │   ├── components/
│   │   │   ├── HeroSection.tsx
│   │   │   ├── TerminalWindow.tsx
│   │   │   ├── StatsMatrix.tsx
│   │   │   └── CyberBackground.tsx
│   │   ├── hooks/
│   │   │   └── useTerminalCursor.ts
│   │   └── index.tsx           # HomePage export
│   │
│   ├── docs/
│   │   ├── components/
│   │   │   ├── DocsSidebar.tsx
│   │   │   ├── DocPage.tsx
│   │   │   ├── CodeBlock.tsx
│   │   │   └── TableOfContents.tsx
│   │   ├── data/
│   │   │   ├── docs-structure.ts   # Navigation tree
│   │   │   └── *.md                # Content files
│   │   ├── hooks/
│   │   │   └── useDocsNavigation.ts
│   │   └── index.tsx
│   │
│   ├── community/
│   │   ├── components/
│   │   │   ├── ResourceCard.tsx
│   │   │   ├── DiscordBanner.tsx
│   │   │   └── ContributionGuide.tsx
│   │   └── index.tsx
│   │
│   └── changelog/
│       ├── components/
│       │   ├── VersionList.tsx
│       │   └── ReleaseCard.tsx
│       ├── data/
│       │   └── releases.ts
│       └── index.tsx
│
├── components/                 # Shared UI components
│   ├── ui/
│   │   ├── Button.tsx
│   │   ├── Card.tsx
│   │   └── Badge.tsx
│   └── layout/
│       ├── NavBar.tsx
│       └── Footer.tsx
│
├── lib/
│   ├── utils.ts
│   └── constants.ts
│
├── types/
│   └── index.ts
│
└── styles/
    ├── index.css
    ├── variables.css
    └── docs.css
```

### 3.2 Routing Structure

```
/                          → HomePage
/docs                      → DocsLayout + Getting Started
/docs/installation         → DocsLayout + Installation
/docs/quickstart           → DocsLayout + Quick Start
/docs/api                  → DocsLayout + API Reference
/docs/configuration        → DocsLayout + Configuration
/community                 → CommunityPage
/changelog                 → ChangelogPage
```

### 3.3 Component Hierarchy

```
RootLayout
├── CyberBackground (fixed, z-0)
├── NavBar (fixed, z-10)
├── Routes
│   ├── / → HomePage
│   │   ├── HeroSection
│   │   │   ├── StatsMatrix
│   │   │   └── TerminalWindow
│   │   └── (other sections)
│   │
│   ├── /docs/* → DocsLayout
│   │   ├── DocsSidebar
│   │   └── DocPage
│   │       ├── TableOfContents
│   │       └── CodeBlock
│   │
│   ├── /community → CommunityPage
│   │   ├── ResourceCard[]
│   │   └── DiscordBanner
│   │
│   └── /changelog → ChangelogPage
│       └── VersionList
│           └── ReleaseCard[]
│
└── Footer
```

---

## 4. Technical Specifications

### 4.1 Technology Stack
- **Framework**: React 19 + TypeScript
- **Build**: Vite 7
- **Router**: React Router 7
- **Styling**: CSS Modules + CSS Variables
- **Icons**: Lucide React (consistent with terminal aesthetic)

### 4.2 CSS Architecture
```css
/* variables.css */
:root {
  /* Colors */
  --color-bg-primary: #0D1117;
  --color-bg-secondary: #161B22;
  --color-bg-tertiary: #21262D;
  --color-text-primary: #C9D1D9;
  --color-text-secondary: #8B949E;
  --color-text-muted: #586069;
  --color-accent: #C9D1D9;

  /* Typography */
  --font-mono: 'JetBrains Mono', monospace;
  --font-display: 'Syncopate', sans-serif;
  --font-chinese: 'Noto Serif SC', serif;

  /* Spacing */
  --sidebar-width: 280px;
  --content-max-width: 1200px;
}
```

### 4.3 Responsive Breakpoints
- **Mobile**: < 768px (DocsSidebar becomes drawer)
- **Tablet**: 768px - 1024px
- **Desktop**: > 1024px

---

## 5. Feature Specifications

### 5.1 Navigation (NavBar)
**Props:**
```typescript
interface NavBarProps {
  activeRoute?: string;
}
```

**Behavior:**
- Fixed position at top
- Transparent background with blur on scroll
- Links: Home, Documentation, Community, Changelog
- GitHub button with hover state

### 5.2 Documentation System

**DocsSidebar:**
```typescript
interface DocSection {
  title: string;
  path: string;
  children?: DocSection[];
}

interface DocsSidebarProps {
  sections: DocSection[];
  currentPath: string;
}
```

**DocPage:**
- Renders markdown content
- Auto-generates table of contents from headings
- Code blocks with copy button and syntax highlighting

### 5.3 Terminal Window (HomePage)
- Simulated terminal with blinking cursor
- Typing animation for commands
- Copy-to-clipboard functionality
- Scroll-triggered animations

---

## 6. Data Structures

### 6.1 Documentation Structure
```typescript
// types/index.ts
export interface DocNode {
  id: string;
  title: string;
  path: string;
  description?: string;
  children?: DocNode[];
}

export interface Release {
  version: string;
  date: string;
  changes: {
    type: 'feat' | 'fix' | 'perf' | 'breaking';
    description: string;
  }[];
}

export interface CommunityResource {
  title: string;
  description: string;
  url: string;
  type: 'discord' | 'github' | 'forum' | 'blog';
}
```

### 6.2 Content Storage (V1)
Documentation content stored as:
- `features/docs/data/docs-structure.ts` - Navigation tree
- `features/docs/content/*.md` - Markdown files
- Imported and processed at build time

**Future (V2):** MDX with frontmatter, or headless CMS

---

## 7. Implementation Phases

### Phase 1: Foundation
- [ ] Restructure to feature-based architecture
- [ ] Update NavBar (remove SystemAxis dependencies)
- [ ] Create RootLayout and DocsLayout
- [ ] Setup routing

### Phase 2: Home Page
- [ ] Migrate existing components to features/home/
- [ ] Refactor styles to CSS variables
- [ ] Add Footer component

### Phase 3: Documentation
- [ ] Build DocsSidebar with navigation
- [ ] Create DocPage renderer
- [ ] Add CodeBlock with syntax highlighting
- [ ] Populate initial content

### Phase 4: Community & Changelog
- [ ] Build Community page with resource cards
- [ ] Build Changelog with version list

### Phase 5: Polish
- [ ] Mobile responsiveness
- [ ] SEO meta tags
- [ ] OpenGraph images
- [ ] Performance optimization

---

## 8. Design Principles

1. **Cohesion**: Each feature is self-contained with its own components, hooks, and data
2. **Composition**: Complex components built from simple, reusable UI primitives
3. **Consistency**: All visual elements follow the Nocturnal Protocol theme
4. **Accessibility**: Keyboard navigation, screen reader support, sufficient contrast

---

## 9. Notes

- SystemAxis component removed to simplify navigation
- Terminal aesthetic preserved through CyberBackground and TerminalWindow
- Documentation sidebar will use similar visual language (borders, monospace, dark tones)
- Search functionality deferred to V2

---

**Approved By:** User
**Date:** 2025-03-10
