# Document Page Redesign Implementation Plan

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Redesign the Document page with Minimal Editor aesthetic - content-first layout, refined typography, enhanced navigation, and polished interactions.

**Architecture:** Update existing React components (`DocsPage`, `DocsSidebar`, `DocContent`) with refined CSS-in-JS styling, add new UI components (ReadingProgress, BackToTop, TableOfContents), and extend CSS with animation keyframes.

**Tech Stack:** React + TypeScript + Vite, CSS-in-JS (inline styles), existing theme variables

---

## File Structure

### Modified Files
1. **`src/features/docs/index.tsx`** - Main docs page layout (adjust sidebar/content dimensions)
2. **`src/features/docs/components/DocsSidebar.tsx`** - Sidebar navigation (new hover states, active styling)
3. **`src/features/docs/components/DocContent.tsx`** - Content area (new typography, spacing, animations)
4. **`src/index.css`** - Add animation keyframes and new utility classes

### New Files
1. **`src/features/docs/components/ReadingProgress.tsx`** - Top progress bar based on scroll
2. **`src/features/docs/components/BackToTop.tsx`** - Floating button appears after scroll
3. **`src/features/docs/components/TableOfContents.tsx`** - Floating TOC for desktop
4. **`src/features/docs/hooks/useScrollProgress.ts`** - Hook for scroll position tracking
5. **`src/features/docs/hooks/useHeadings.ts`** - Hook to extract headings from content

---

## Chunk 1: Layout Foundation

### Task 1: Update Main Docs Page Layout

**Files:**
- Modify: `src/features/docs/index.tsx`

**Context:** Adjust sidebar width from 280px to 260px, content max-width to 720px, and update responsive behavior.

- [ ] **Step 1: Update sidebar and content dimensions**

```tsx
// Update the main container styles
<div style={{ display: 'flex', height: '100%' }}>
  <DocsSidebar />
  <main
    style={{
      flex: 1,
      padding: '4rem 5rem 8rem',  // Updated: more breathing room
      overflowY: 'auto',
      display: 'flex',
      justifyContent: 'center',    // Center the content
    }}
  >
    <DocContent />
  </main>
</div>
```

- [ ] **Step 2: Verify changes render correctly**

Run: `bun run dev`
Check: Sidebar width is 260px, content has more padding

- [ ] **Step 3: Commit**

```bash
git add src/features/docs/index.tsx
git commit -m "feat(docs): update main layout dimensions

- Sidebar: 280px -> 260px
- Content padding: 3rem 4rem 6rem -> 4rem 5rem 8rem
- Add centering for content area

Co-Authored-By: Claude Opus 4.6 <noreply@anthropic.com>"
```

---

### Task 2: Update Sidebar Component Dimensions

**Files:**
- Modify: `src/features/docs/components/DocsSidebar.tsx`

**Context:** Change width from 280px to 260px, remove background color (use page bg), add border-right.

- [ ] **Step 1: Update sidebar container styles**

```tsx
// In the aside element, update these styles:
style={{
  width: "260px",                    // Changed from 280px
  minWidth: "260px",
  borderRight: "1px solid var(--color-border-light)",  // Add border
  padding: "2rem 1.5rem",
  // Remove: backgroundColor: "var(--color-bg-secondary)"
  overflowY: "auto",
  height: "100%",
}}
```

- [ ] **Step 2: Update section header styles**

```tsx
// In section Link, update:
style={{
  display: "block",
  color: isActive(section.path)
    ? "var(--color-text-primary)"
    : "var(--color-text-secondary)",
  fontWeight: isActive(section.path) ? 700 : 600,
  fontSize: "0.75rem",               // Slightly smaller
  textTransform: "uppercase",
  letterSpacing: "0.1em",            // Increased from 0.05em
  marginBottom: "0.5rem",
  fontFamily: "var(--font-display)",
  textDecoration: "none",
  transition: "color 200ms ease",    // Add transition
}}
```

- [ ] **Step 3: Update child link styles**

```tsx
// In child Link, update:
style={{
  display: "block",
  color: location.pathname === child.path
    ? "var(--color-text-primary)"
    : "var(--color-text-muted)",
  fontSize: "0.85rem",               // Increased from 0.8rem
  padding: "0.4rem 0",               // Slightly more padding
  fontFamily: "var(--font-mono)",
  borderLeft: location.pathname === child.path
    ? "2px solid var(--color-text-primary)"
    : "2px solid transparent",
  paddingLeft: "0.75rem",
  marginLeft: "-0.75rem",
  textDecoration: "none",
  transition: "all 200ms ease",      // Changed to "all" for hover effect
}}
```

- [ ] **Step 4: Add hover effect handlers**

```tsx
// Add state for hover tracking at top of component
const [hoveredItem, setHoveredItem] = useState<string | null>(null);

// In child Link, add:
onMouseEnter={() => setHoveredItem(child.path)}
onMouseLeave={() => setHoveredItem(null)}
style={{
  // ... existing styles
  transform: hoveredItem === child.path ? "translateX(2px)" : "none",
}}
```

- [ ] **Step 5: Test sidebar rendering**

Run: `bun run dev`
Check: Sidebar has correct width, border visible, hover effects work

- [ ] **Step 6: Commit**

```bash
git add src/features/docs/components/DocsSidebar.tsx
git commit -m "feat(docs): refine sidebar styling

- Width: 280px -> 260px
- Remove separate background, add border-right
- Update section header typography
- Add hover translateX effect
- Update child link font size

Co-Authored-By: Claude Opus 4.6 <noreply@anthropic.com>"
```

---

## Chunk 2: Content Typography & Spacing

### Task 3: Update DocContent Component - Typography

**Files:**
- Modify: `src/features/docs/components/DocContent.tsx`

**Context:** Update heading sizes, line heights, margins per design spec.

- [ ] **Step 1: Update page title (h1) styles**

```tsx
// In h1 element:
style={{
  fontFamily: "var(--font-display)",
  fontSize: "2.25rem",               // Increased from 2rem
  fontWeight: 700,
  lineHeight: 1.2,                   // Tighter for large text
  letterSpacing: "-0.02em",
  marginBottom: "1.5rem",
  color: "var(--color-text-primary)",
}}
```

- [ ] **Step 2: Update description styles**

```tsx
// In description p element:
style={{
  color: "var(--color-text-secondary)",
  marginBottom: "2.5rem",            // Increased from 2rem
  fontSize: "1.1rem",
  lineHeight: 1.6,
}}
```

- [ ] **Step 3: Update content container max-width**

```tsx
// In article element:
style={{
  maxWidth: "720px",                 // Decreased from 800px
  width: "100%",
}}
```

- [ ] **Step 4: Add page load animation wrapper**

```tsx
// Wrap content in animated div
import { useEffect, useState } from "react";

const [isVisible, setIsVisible] = useState(false);

useEffect(() => {
  setIsVisible(true);
}, []);

// In return:
<article
  style={{
    maxWidth: "720px",
    width: "100%",
    opacity: isVisible ? 1 : 0,
    transform: isVisible ? "translateY(0)" : "translateY(10px)",
    transition: "opacity 400ms ease-out, transform 400ms ease-out",
  }}
>
```

- [ ] **Step 5: Test content rendering**

Run: `bun run dev`
Check: Larger title, better spacing, fade-in animation works

- [ ] **Step 6: Commit**

```bash
git add src/features/docs/components/DocContent.tsx
git commit -m "feat(docs): update content typography and layout

- H1: 2rem -> 2.25rem with tighter line-height
- Description: increased margin-bottom
- Content max-width: 800px -> 720px
- Add page load fade-in animation

Co-Authored-By: Claude Opus 4.6 <noreply@anthropic.com>"
```

---

### Task 4: Update Markdown Content Styles (CSS)

**Files:**
- Modify: `src/index.css`

**Context:** Update .doc-markdown-content styles for better typography.

- [ ] **Step 1: Update heading styles**

```css
/* Update existing h2 styles */
.doc-markdown-content h2 {
  font-family: var(--font-display);
  font-size: 1.5rem;           /* Increased from 1.2rem */
  font-weight: 600;
  line-height: 1.3;
  letter-spacing: -0.01em;
  margin-top: 3rem;            /* Increased from 2rem */
  margin-bottom: 1rem;
  padding-bottom: 0.5rem;
  border-bottom: 1px solid var(--color-border);
  color: var(--color-text-primary);
}

/* Update existing h3 styles */
.doc-markdown-content h3 {
  font-family: var(--font-display);
  font-size: 1.125rem;         /* Increased from 1rem */
  font-weight: 600;
  line-height: 1.4;
  margin-top: 2rem;            /* Increased from 1.5rem */
  margin-bottom: 0.75rem;
  color: var(--color-text-primary);
}
```

- [ ] **Step 2: Update paragraph styles**

```css
.doc-markdown-content p {
  margin-bottom: 1.5rem;       /* Increased from 1rem */
  line-height: 1.8;            /* Increased from 1.7 */
  color: var(--color-text-primary);
}
```

- [ ] **Step 3: Update list styles**

```css
.doc-markdown-content ul,
.doc-markdown-content ol {
  margin-left: 1.25rem;        /* Decreased from 1.5rem */
  margin-bottom: 1.5rem;       /* Increased from 1rem */
}

.doc-markdown-content li {
  margin-bottom: 0.75rem;      /* Increased from 0.5rem */
  line-height: 1.7;
}

/* Better bullet styling for unordered lists */
.doc-markdown-content ul {
  list-style: none;
  padding: 0;
}

.doc-markdown-content ul li {
  position: relative;
  padding-left: 1.25rem;
}

.doc-markdown-content ul li::before {
  content: "•";
  position: absolute;
  left: 0;
  color: var(--color-text-secondary);
}
```

- [ ] **Step 4: Update code block styles**

```css
.doc-markdown-content pre {
  background: var(--color-bg-tertiary);
  padding: 1.25rem;            /* Increased from 1rem */
  border-radius: 8px;          /* Increased from 4px */
  overflow-x: auto;
  margin-bottom: 1.5rem;
  border: 1px solid transparent;
  transition: border-color 200ms ease;
}

.doc-markdown-content pre:hover {
  border-color: var(--color-border-medium);
}
```

- [ ] **Step 5: Add blockquote styles**

```css
.doc-markdown-content blockquote {
  border-left: 3px solid var(--color-accent);
  padding-left: 1.5rem;
  margin: 2rem 0;
  color: var(--color-text-secondary);
  font-style: italic;
}

.doc-markdown-content blockquote p {
  margin-bottom: 0;
}
```

- [ ] **Step 6: Add link underline animation**

```css
.doc-markdown-content a {
  color: var(--color-accent);
  text-decoration: none;
  position: relative;
}

.doc-markdown-content a::after {
  content: '';
  position: absolute;
  bottom: -2px;
  left: 0;
  width: 0;
  height: 1px;
  background: var(--color-accent);
  transition: width 250ms ease;
}

.doc-markdown-content a:hover::after {
  width: 100%;
}
```

- [ ] **Step 7: Test markdown rendering**

Run: `bun run dev`
Visit: `/docs/getting-started`
Check: Headings have proper spacing, lists look good, code blocks have rounded corners

- [ ] **Step 8: Commit**

```bash
git add src/index.css
git commit -m "feat(docs): refine markdown content styles

- Update heading sizes (h2: 1.5rem, h3: 1.125rem)
- Increase margins (h2 mt: 3rem, p mb: 1.5rem)
- Add border-bottom to h2 sections
- Improve list bullet styling
- Round code block corners (8px)
- Add blockquote styling
- Add link underline animation

Co-Authored-By: Claude Opus 4.6 <noreply@anthropic.com>"
```

---

## Chunk 3: Custom Hooks

### Task 5: Create useScrollProgress Hook

**Files:**
- Create: `src/features/docs/hooks/useScrollProgress.ts`

**Context:** Hook to track scroll progress for reading progress bar.

- [ ] **Step 1: Create hook file**

```typescript
import { useState, useEffect } from "react";

export function useScrollProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const updateProgress = () => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const scrollHeight =
        document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrollProgress = scrollHeight > 0 ? (scrollTop / scrollHeight) * 100 : 0;
      setProgress(scrollProgress);
    };

    window.addEventListener("scroll", updateProgress, { passive: true });
    updateProgress();

    return () => window.removeEventListener("scroll", updateProgress);
  }, []);

  return progress;
}
```

- [ ] **Step 2: Commit**

```bash
git add src/features/docs/hooks/useScrollProgress.ts
git commit -m "feat(docs): add useScrollProgress hook

Track scroll position as percentage (0-100)
for reading progress indicator

Co-Authored-By: Claude Opus 4.6 <noreply@anthropic.com>"
```

---

### Task 6: Create useHeadings Hook

**Files:**
- Create: `src/features/docs/hooks/useHeadings.ts`

**Context:** Hook to extract h2/h3 headings from markdown content for TOC.

- [ ] **Step 1: Create hook file**

```typescript
import { useState, useEffect } from "react";

export interface Heading {
  id: string;
  text: string;
  level: number;
}

export function useHeadings(contentRef: React.RefObject<HTMLElement>) {
  const [headings, setHeadings] = useState<Heading[]>([]);

  useEffect(() => {
    if (!contentRef.current) return;

    const elements = contentRef.current.querySelectorAll("h2, h3");
    const extractedHeadings: Heading[] = [];

    elements.forEach((el, index) => {
      // Generate ID if not present
      if (!el.id) {
        el.id = `heading-${index}`;
      }

      extractedHeadings.push({
        id: el.id,
        text: el.textContent || "",
        level: el.tagName === "H2" ? 2 : 3,
      });
    });

    setHeadings(extractedHeadings);
  }, [contentRef]);

  return headings;
}
```

- [ ] **Step 2: Commit**

```bash
git add src/features/docs/hooks/useHeadings.ts
git commit -m "feat(docs): add useHeadings hook

Extract h2/h3 headings from content for table of contents
Auto-generate IDs if missing

Co-Authored-By: Claude Opus 4.6 <noreply@anthropic.com>"
```

---

## Chunk 4: UI Components

### Task 7: Create ReadingProgress Component

**Files:**
- Create: `src/features/docs/components/ReadingProgress.tsx`

**Context:** Top progress bar showing reading progress.

- [ ] **Step 1: Create component file**

```tsx
import type { FC } from "react";
import { useScrollProgress } from "../hooks/useScrollProgress";

const ReadingProgress: FC = () => {
  const progress = useScrollProgress();

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        height: "2px",
        backgroundColor: "var(--color-bg-secondary)",
        zIndex: 100,
      }}
    >
      <div
        style={{
          height: "100%",
          width: `${progress}%`,
          backgroundColor: "var(--color-accent)",
          transition: "width 100ms linear",
        }}
      />
    </div>
  );
};

export default ReadingProgress;
```

- [ ] **Step 2: Commit**

```bash
git add src/features/docs/components/ReadingProgress.tsx
git commit -m "feat(docs): add ReadingProgress component

Fixed top bar showing scroll progress (2px height)
Uses useScrollProgress hook

Co-Authored-By: Claude Opus 4.6 <noreply@anthropic.com>"
```

---

### Task 8: Create BackToTop Component

**Files:**
- Create: `src/features/docs/components/BackToTop.tsx`

**Context:** Floating button that appears after scrolling 500px.

- [ ] **Step 1: Create component file**

```tsx
import type { FC } from "react";
import { useState, useEffect } from "react";

const BackToTop: FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      setIsVisible(window.scrollY > 500);
    };

    window.addEventListener("scroll", toggleVisibility, { passive: true });
    toggleVisibility();

    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <button
      onClick={scrollToTop}
      style={{
        position: "fixed",
        bottom: "24px",
        right: "24px",
        width: "40px",
        height: "40px",
        borderRadius: "50%",
        backgroundColor: "var(--color-bg-secondary)",
        border: "1px solid var(--color-border)",
        color: "var(--color-text-primary)",
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? "translateY(0)" : "translateY(10px)",
        transition: "opacity 200ms ease, transform 200ms ease, background-color 200ms ease",
        zIndex: 50,
        fontSize: "1.2rem",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.backgroundColor = "var(--color-bg-tertiary)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.backgroundColor = "var(--color-bg-secondary)";
      }}
      aria-label="Back to top"
    >
      ↑
    </button>
  );
};

export default BackToTop;
```

- [ ] **Step 2: Commit**

```bash
git add src/features/docs/components/BackToTop.tsx
git commit -m "feat(docs): add BackToTop component

Floating button appears after 500px scroll
Smooth scroll to top on click
Fade in/out animation

Co-Authored-By: Claude Opus 4.6 <noreply@anthropic.com>"
```

---

### Task 9: Create TableOfContents Component

**Files:**
- Create: `src/features/docs/components/TableOfContents.tsx`

**Context:** Floating TOC for desktop (>= 1280px) showing current section.

- [ ] **Step 1: Create component file**

```tsx
import type { FC } from "react";
import { useState, useEffect } from "react";

interface TOCItem {
  id: string;
  text: string;
  level: number;
}

interface TableOfContentsProps {
  items: TOCItem[];
}

const TableOfContents: FC<TableOfContentsProps> = ({ items }) => {
  const [activeId, setActiveId] = useState<string>("");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: "-20% 0% -80% 0%" }
    );

    items.forEach((item) => {
      const element = document.getElementById(item.id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, [items]);

  const handleClick = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  if (items.length === 0) return null;

  return (
    <nav
      style={{
        position: "fixed",
        top: "120px",
        right: "24px",
        width: "200px",
        maxHeight: "calc(100vh - 200px)",
        overflowY: "auto",
        display: "none", // Hidden by default, shown on large screens via media query
      }}
      className="toc-nav"
    >
      <p
        style={{
          fontSize: "0.75rem",
          fontWeight: 600,
          textTransform: "uppercase",
          letterSpacing: "0.1em",
          color: "var(--color-text-secondary)",
          marginBottom: "1rem",
        }}
      >
        On this page
      </p>
      <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
        {items.map((item) => (
          <li key={item.id} style={{ marginBottom: "0.5rem" }}>
            <button
              onClick={() => handleClick(item.id)}
              style={{
                fontSize: "0.8rem",
                lineHeight: 1.4,
                color:
                  activeId === item.id
                    ? "var(--color-text-primary)"
                    : "var(--color-text-muted)",
                fontWeight: activeId === item.id ? 500 : 400,
                background: "none",
                border: "none",
                cursor: "pointer",
                textAlign: "left",
                padding: 0,
                paddingLeft: item.level === 3 ? "1rem" : 0,
                transition: "color 200ms ease",
                fontFamily: "var(--font-mono)",
              }}
            >
              {item.text}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default TableOfContents;
```

- [ ] **Step 2: Add responsive CSS for TOC**

Add to `src/index.css`:

```css
@media (min-width: 1280px) {
  .toc-nav {
    display: block !important;
  }
}
```

- [ ] **Step 3: Commit**

```bash
git add src/features/docs/components/TableOfContents.tsx src/index.css
git commit -m "feat(docs): add TableOfContents component

Floating TOC for large screens (>= 1280px)
Shows h2/h3 headings with active state
IntersectionObserver for scroll tracking

Co-Authored-By: Claude Opus 4.6 <noreply@anthropic.com>"
```

---

## Chunk 5: Integration

### Task 10: Integrate All Components into DocsPage

**Files:**
- Modify: `src/features/docs/index.tsx`

**Context:** Add ReadingProgress, BackToTop, and TableOfContents to main page.

- [ ] **Step 1: Import and add components**

```tsx
import type { FC } from "react";
import { useRef } from "react";
import DocsSidebar from "./components/DocsSidebar";
import DocContent from "./components/DocContent";
import ReadingProgress from "./components/ReadingProgress";
import BackToTop from "./components/BackToTop";
import TableOfContents from "./components/TableOfContents";
import { useHeadings } from "./hooks/useHeadings";

const DocsPage: FC = () => {
  const contentRef = useRef<HTMLDivElement>(null);
  const headings = useHeadings(contentRef);

  return (
    <>
      <ReadingProgress />
      <div style={{ display: "flex", height: "100%" }}>
        <DocsSidebar />
        <main
          style={{
            flex: 1,
            padding: "4rem 5rem 8rem",
            overflowY: "auto",
            display: "flex",
            justifyContent: "center",
          }}
          ref={contentRef}
        >
          <DocContent />
        </main>
        <TableOfContents items={headings} />
      </div>
      <BackToTop />
    </>
  );
};

export default DocsPage;
```

- [ ] **Step 2: Update DocContent to forward ref**

Modify `src/features/docs/components/DocContent.tsx`:

```tsx
// Add forwardRef
import { forwardRef } from "react";

const DocContent = forwardRef<HTMLElement>((props, ref) => {
  // ... existing component logic

  return (
    <article
      ref={ref as any}
      style={{
        maxWidth: "720px",
        width: "100%",
        // ... rest of styles
      }}
    >
      {/* ... content */}
    </article>
  );
});

DocContent.displayName = "DocContent";

export default DocContent;
```

Actually, a simpler approach - wrap DocContent in a div that gets the ref:

```tsx
// In DocsPage:
<div ref={contentRef} style={{ maxWidth: "720px", width: "100%" }}>
  <DocContent />
</div>
```

- [ ] **Step 3: Test full integration**

Run: `bun run dev`
Visit: `/docs/getting-started`
Check:
- Reading progress bar at top
- Back to top button appears on scroll
- TOC visible on large screens (resize window)
- All components work together

- [ ] **Step 4: Commit**

```bash
git add src/features/docs/index.tsx
git commit -m "feat(docs): integrate all enhancement components

- Add ReadingProgress bar
- Add BackToTop button
- Add TableOfContents (desktop)
- Connect useHeadings hook to content

Co-Authored-By: Claude Opus 4.6 <noreply@anthropic.com>"
```

---

## Chunk 6: Polish & Testing

### Task 11: Add Smooth Scroll Behavior

**Files:**
- Modify: `src/styles/variables.css`

**Context:** Add global smooth scroll.

- [ ] **Step 1: Add smooth scroll to html**

```css
html {
  font-size: 16px;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-rendering: optimizeLegibility;
  scroll-behavior: smooth;
}
```

- [ ] **Step 2: Commit**

```bash
git add src/styles/variables.css
git commit -m "feat(docs): add global smooth scroll

scroll-behavior: smooth on html element

Co-Authored-By: Claude Opus 4.6 <noreply@anthropic.com>"
```

---

### Task 12: Verify Reduced Motion Support

**Files:**
- Modify: `src/index.css`

**Context:** Respect prefers-reduced-motion.

- [ ] **Step 1: Add reduced motion media query**

```css
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
```

- [ ] **Step 2: Commit**

```bash
git add src/index.css
git commit -m "feat(docs): respect prefers-reduced-motion

Disable animations for users who prefer reduced motion

Co-Authored-By: Claude Opus 4.6 <noreply@anthropic.com>"
```

---

### Task 13: Export Hooks and Components

**Files:**
- Create: `src/features/docs/hooks/index.ts`
- Modify: `src/features/docs/components/index.ts` (or create)

**Context:** Clean exports for maintainability.

- [ ] **Step 1: Create hooks index file**

```typescript
export { useScrollProgress } from "./useScrollProgress";
export { useHeadings } from "./useHeadings";
export type { Heading } from "./useHeadings";
```

- [ ] **Step 2: Create components index file**

```typescript
export { default as DocContent } from "./DocContent";
export { default as DocsSidebar } from "./DocsSidebar";
export { default as ReadingProgress } from "./ReadingProgress";
export { default as BackToTop } from "./BackToTop";
export { default as TableOfContents } from "./TableOfContents";
```

- [ ] **Step 3: Commit**

```bash
git add src/features/docs/hooks/index.ts src/features/docs/components/index.ts
git commit -m "chore(docs): add clean exports for hooks and components

Create index.ts files for easier imports

Co-Authored-By: Claude Opus 4.6 <noreply@anthropic.com>"
```

---

## Final Verification Checklist

Before considering complete, verify:

### Layout
- [ ] Sidebar width is 260px with border-right
- [ ] Content max-width is 720px, centered
- [ ] Responsive behavior works at all breakpoints

### Typography
- [ ] H1 is 2.25rem with proper spacing
- [ ] H2 has border-bottom and 3rem top margin
- [ ] Body text has 1.8 line-height
- [ ] Lists have custom bullet styling

### Interactions
- [ ] Sidebar links have hover translateX effect
- [ ] Content links have underline animation
- [ ] Code blocks brighten border on hover
- [ ] Page loads with fade-in animation

### Enhancements
- [ ] Reading progress bar tracks scroll
- [ ] Back to top button appears after 500px
- [ ] TOC visible on >= 1280px screens
- [ ] TOC highlights current section

### Accessibility
- [ ] All interactive elements have focus states
- [ ] Color contrast meets WCAG AA
- [ ] Reduced motion preference respected
- [ ] Semantic HTML structure

---

## Summary

This implementation plan covers:
1. ✅ Layout adjustments (sidebar/content dimensions)
2. ✅ Typography refinements (headings, spacing, line-height)
3. ✅ Sidebar navigation styling (hover effects, active states)
4. ✅ Content area styles (code blocks, quotes, links)
5. ✅ Animation system (page load, hover effects, smooth scroll)
6. ✅ Enhancement components (progress bar, back-to-top, TOC)
7. ✅ Accessibility (reduced motion, focus states)

**Estimated Tasks:** 13
**Estimated Time:** 60-90 minutes

---

**Plan complete and saved to `docs/superpowers/plans/2026-03-11-document-page-redesign-plan.md`. Ready to execute?**
