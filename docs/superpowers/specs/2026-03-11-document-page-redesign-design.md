# Document Page Redesign - Minimal Editor

**Date:** 2026-03-11
**Project:** LoongClaw Website
**Component:** Document Page (`/docs/*`)
**Design System:** Minimal Editor (Content-First)

---

## 1. Design Overview

### Core Philosophy
Content-first design that removes distractions and creates an immersive reading experience. Emphasizes whitespace, breathing room, typographic hierarchy, subtle animations, and restrained color usage.

### Visual Keywords
Whitespace, breathing room, typographic hierarchy, subtle animation, restrained colors

### Design Principles
1. **Content is King** - Every design decision serves readability
2. **Progressive Disclosure** - Information revealed as needed
3. **Quiet Confidence** - Subtle interactions, not flashy effects
4. **Consistency** - Align with existing brand (brutalist tech aesthetic)

---

## 2. Color System

Maintain existing theme variables with refined usage:

| Element | Dark Mode | Light Mode | Usage |
|---------|-----------|------------|-------|
| Background Primary | `#0D1116` | `#E8F4F6` | Page background |
| Background Secondary | `#161B22` | `#D4E8EC` | Sidebar, cards |
| Background Tertiary | `#21262D` | `#B8D8DE` | Code blocks, hover states |
| Text Primary | `#C9D1D9` | `#1A2A30` | Headings, body text |
| Text Secondary | `#8B949E` | `#3D5A63` | Descriptions, meta |
| Text Muted | `#586069` | `#5E7A85` | Disabled, placeholders |
| Border | `rgba(139,148,158,0.1)` | `rgba(70,100,110,0.15)` | Dividers, outlines |
| Accent | `#FFFFFF` | `#0D1A20` | Active states, CTAs |

---

## 3. Layout Specifications

### 3.1 Overall Structure

```
┌──────────────────────────────────────────────────────────────┐
│  [NavBar - fixed, full width]                                │
├──────────────────────────────────────────────────────────────┤
│  [Sidebar - 260px]  │  [Content Area - max 720px]           │
│  Fixed position     │  Scrollable                           │
│  Full height        │  Generous whitespace                  │
└──────────────────────────────────────────────────────────────┘
```

### 3.2 Sidebar Layout

- **Width:** 260px (reduced from 280px)
- **Position:** Fixed, left side
- **Background:** Same as page background (`--color-bg-primary`)
- **Border:** 1px solid `var(--color-border-light)` on right
- **Padding:** 2rem 1.5rem
- **Scroll:** Independent scroll with custom scrollbar

### 3.3 Content Area Layout

- **Max Width:** 720px (reduced from 800px)
- **Padding:** 4rem 5rem 8rem
- **Alignment:** Centered with auto margins
- **Background:** Transparent (inherits page background)

### 3.4 Responsive Breakpoints

| Breakpoint | Sidebar | Content |
|------------|---------|---------|
| < 768px | Hidden, hamburger menu | Full width, 1.5rem padding |
| 768px - 1023px | Fixed 240px | Flexible |
| >= 1024px | Fixed 260px | max 720px |

---

## 4. Typography System

### 4.1 Font Stack

```css
--font-mono: "JetBrains Mono", "Fira Code", "SF Mono", Consolas, monospace;
--font-display: "Syncopate", "Orbitron", sans-serif;
```

### 4.2 Type Scale

| Element | Size | Weight | Line Height | Letter Spacing | Margin Top | Margin Bottom |
|---------|------|--------|-------------|----------------|------------|---------------|
| H1 (Page Title) | 2.25rem | 700 | 1.2 | -0.02em | 0 | 1.5rem |
| Description | 1.1rem | 400 | 1.6 | 0 | 0 | 2.5rem |
| H2 (Section) | 1.5rem | 600 | 1.3 | -0.01em | 3rem | 1rem |
| H3 (Subsection) | 1.125rem | 600 | 1.4 | 0 | 2rem | 0.75rem |
| Body | 1rem | 400 | 1.8 | 0 | 0 | 1.5rem |
| List Item | 1rem | 400 | 1.7 | 0 | 0 | 0.75rem |
| Code Inline | 0.9em | 400 | inherit | 0 | 0 | 0 |
| Code Block | 0.875rem | 400 | 1.6 | 0 | 0 | 1.5rem |

### 4.3 Sidebar Typography

| Element | Size | Weight | Transform | Letter Spacing |
|---------|------|--------|-----------|----------------|
| Section Title | 0.75rem | 600 | uppercase | 0.1em |
| Child Link | 0.85rem | 400 | none | 0 |
| Active Link | 0.85rem | 500 | none | 0 |

---

## 5. Component Specifications

### 5.1 Sidebar Navigation

**Section Header:**
- Color: `var(--color-text-secondary)`
- Hover: Color shifts to `var(--color-text-primary)`
- Cursor: pointer
- Transition: 200ms ease

**Child Links:**
- Default: `var(--color-text-muted)`
- Hover: Color shifts to `var(--color-text-secondary)`, translateX(2px)
- Active: `var(--color-text-primary)` with 2px left border accent
- Transition: 200ms ease
- Border: 2px solid transparent (default), 2px solid accent (active)

**Expand/Collapse Animation:**
- Duration: 300ms
- Easing: ease
- Property: max-height, opacity

### 5.2 Content Area Components

**Page Header:**
- H1 with gradient text effect (reuse existing pattern)
- Description below with secondary color
- Optional: Reading time estimate

**Section Dividers (H2):**
```css
border-bottom: 1px solid var(--color-border);
padding-bottom: 0.5rem;
```

**Blockquote:**
```css
border-left: 3px solid var(--color-accent);
padding-left: 1.5rem;
margin: 2rem 0;
color: var(--color-text-secondary);
font-style: italic;
```

**Code Block:**
```css
background: var(--color-bg-tertiary);
border-radius: 8px;
padding: 1.25rem;
overflow-x: auto;
margin-bottom: 1.5rem;
font-size: 0.875rem;
line-height: 1.6;
```

**Inline Code:**
```css
background: var(--color-bg-tertiary);
padding: 0.2rem 0.4rem;
border-radius: 4px;
font-size: 0.9em;
```

**Links in Content:**
- Default: `var(--color-accent)`
- Hover: underline animation (left to right)
- Transition: 250ms ease

### 5.3 Table of Contents (Floating)

**Position:** Right side of content area (desktop only, >= 1280px)

**Style:**
- Fixed position, top: 120px
- Width: 200px
- Font size: 0.8rem
- Color: `var(--color-text-muted)`

**Active State:**
- Color: `var(--color-text-primary)`
- Font weight: 500

**Animation:**
- Smooth scroll on click
- Active indicator follows scroll position

---

## 6. Animation Specifications

### 6.1 Page Load

```css
@keyframes contentFadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
/* Duration: 400ms, Easing: ease-out */
```

### 6.2 Sidebar Interactions

| Interaction | Animation | Duration |
|-------------|-----------|----------|
| Link Hover | translateX(2px) + color change | 200ms ease |
| Section Expand | max-height + opacity | 300ms ease |
| Active Indicator | Instant (no animation) | - |

### 6.3 Content Interactions

| Interaction | Animation | Duration |
|-------------|-----------|----------|
| Link Hover | underline slide-in | 250ms ease |
| Code Block Hover | border-color brighten | 200ms ease |
| Button Hover | opacity + subtle lift | 200ms ease |

### 6.4 Scroll Behavior

- Native smooth scroll: `scroll-behavior: smooth`
- Reading progress bar: width transition tied to scroll position
- TOC highlight: instant update on scroll

---
## 7. Additional Features

### 7.1 Reading Progress Bar

**Position:** Fixed top of content area (below navbar)
**Height:** 2px
**Color:** `var(--color-accent)`
**Behavior:** Width 0% → 100% based on scroll position
**Z-index:** Above content, below navbar

### 7.2 Back to Top Button

**Position:** Fixed bottom-right (24px from edges)
**Size:** 40px × 40px
**Shape:** Circle
**Background:** `var(--color-bg-secondary)`
**Border:** 1px solid `var(--color-border)`
**Icon:** Up arrow (Lucide)
**Appearance:** After scrolling 500px
**Animation:** Fade in/out 200ms
**Hover:** Background lightens, subtle lift

### 7.3 Mobile Sidebar

**Trigger:** Hamburger icon in navbar (on mobile)
**Animation:** Slide in from left 300ms ease
**Overlay:** Backdrop blur + dark overlay
**Close:** Click overlay, swipe left, or close button

---

## 8. Implementation Checklist

### Phase 1: Layout & Structure
- [ ] Adjust sidebar width (280px → 260px)
- [ ] Adjust content max-width (800px → 720px)
- [ ] Update content padding values
- [ ] Implement responsive breakpoints

### Phase 2: Typography
- [ ] Update heading sizes and margins
- [ ] Adjust body text line-height (1.7 → 1.8)
- [ ] Update paragraph spacing
- [ ] Style blockquotes

### Phase 3: Components
- [ ] Redesign sidebar navigation styling
- [ ] Update code block styling (border-radius, padding)
- [ ] Add link underline animation
- [ ] Style lists with custom bullets

### Phase 4: Interactions
- [ ] Implement page load fade-in
- [ ] Add sidebar link hover effects
- [ ] Implement smooth scroll behavior
- [ ] Add section expand/collapse animation

### Phase 5: Enhancements
- [ ] Add reading progress bar
- [ ] Implement back-to-top button
- [ ] Add floating TOC (desktop)
- [ ] Implement mobile sidebar

### Phase 6: Polish
- [ ] Test all animations respect `prefers-reduced-motion`
- [ ] Verify color contrast ratios (WCAG AA)
- [ ] Test responsive behavior at all breakpoints
- [ ] Cross-browser testing

---

## 9. Anti-Patterns to Avoid

1. **Don't** use emoji as icons - use Lucide/Heroicons
2. **Don't** animate width/height - use transform instead
3. **Don't** rely on color alone for meaning - add icons/text
4. **Don't** use instant state changes - always add transitions
5. **Don't** break keyboard navigation - ensure focus states
6. **Don't** ignore reduced-motion preference
7. **Don't** use horizontal scroll on mobile
8. **Don't** place touch targets too close (< 44px)

---

## 10. References

- **Existing Components:**
  - `src/features/docs/index.tsx` - Main docs page
  - `src/features/docs/components/DocsSidebar.tsx` - Sidebar
  - `src/features/docs/components/DocContent.tsx` - Content
- **Theme Variables:** `src/styles/variables.css`
- **Global Styles:** `src/index.css`
- **Design Skill:** `ui-ux-pro-max` - Typography, spacing, animation guidelines

---

## 11. Success Criteria

1. **Readability Score:** Content should be easily scannable with clear hierarchy
2. **Visual Comfort:** Generous whitespace reduces eye strain during long reading sessions
3. **Navigation Efficiency:** Users can find and navigate to any doc page within 2 clicks
4. **Performance:** Animations run at 60fps, no layout shifts
5. **Accessibility:** Full keyboard navigation, screen reader compatible, WCAG AA compliant

---

**Approved By:** [User]
**Implementation Plan:** Next Step - Create detailed implementation plan using writing-plans skill
