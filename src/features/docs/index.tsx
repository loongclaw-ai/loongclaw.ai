import type { FC } from "react";
import { useRef, useState, useEffect } from "react";
import DocsSidebar from "./components/DocsSidebar";
import DocContent from "./components/DocContent";
import ReadingProgress from "./components/ReadingProgress";
import BackToTop from "./components/BackToTop";
import TableOfContents from "./components/TableOfContents";
import Breadcrumb from "./components/Breadcrumb";
import { useHeadings } from "./hooks/useHeadings";

const DocsPage: FC = () => {
  const contentRef = useRef<HTMLElement>(null);
  const headings = useHeadings(contentRef);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Add keyboard handler for mobile sidebar
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && sidebarOpen) {
        setSidebarOpen(false);
      }
    };

    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [sidebarOpen]);

  return (
    <div className="docs-page-wrapper">
      <ReadingProgress />

      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div
          className="mobile-sidebar-overlay"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Mobile Sidebar */}
      <div className={`mobile-sidebar-container ${sidebarOpen ? "open" : ""}`}>
        <DocsSidebar onClose={() => setSidebarOpen(false)} />
      </div>

      {/* Layout Container */}
      <div className="docs-layout-container">
        {/* Desktop Sidebar - always visible */}
        <aside className="docs-sidebar-desktop">
          <DocsSidebar />
        </aside>

        {/* Main Content Area */}
        <main className="docs-main-content">
          <div className="docs-content-inner">
            {/* Breadcrumb - visible on both mobile and desktop (restyled) */}
            <div className="breadcrumb-container">
              <Breadcrumb />
            </div>

            <div className="docs-article-container">
              <article className="docs-article">
                <DocContent contentRef={contentRef} />
              </article>

              {/* Desktop TOC - Integrated into the article flow */}
              <aside className="docs-toc-container">
                <TableOfContents items={headings} />
              </aside>
            </div>
          </div>
        </main>
      </div>

      <BackToTop />

      {/* Mobile sidebar toggle button */}
      <button
        className="sidebar-toggle-btn"
        onClick={() => setSidebarOpen(true)}
        aria-label="Open navigation menu"
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <line x1="3" y1="6" x2="21" y2="6" />
          <line x1="3" y1="12" x2="21" y2="12" />
          <line x1="3" y1="18" x2="21" y2="18" />
        </svg>
      </button>
    </div>
  );
};

export default DocsPage;
