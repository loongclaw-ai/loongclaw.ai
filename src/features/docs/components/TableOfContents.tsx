import type { FC } from "react";
import { useState, useEffect, useRef } from "react";

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
  const [isCollapsed, setIsCollapsed] = useState(false);
  const containerRef = useRef<HTMLUListElement>(null);
  const [indicatorTop, setIndicatorTop] = useState(0);
  const [indicatorHeight, setIndicatorHeight] = useState(0);

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

  useEffect(() => {
    const activeLink = containerRef.current?.querySelector(".toc-link.active") as HTMLElement;
    if (activeLink) {
      setIndicatorTop(activeLink.offsetTop);
      setIndicatorHeight(activeLink.offsetHeight);
    }
  }, [activeId, items]);

  const handleClick = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  if (items.length === 0) return null;

  return (
    <nav
      aria-label="Table of contents"
      className="toc-nav"
    >
      {/* Header with collapse toggle */}
      <div className="toc-header">
        <p className="toc-title">On this page</p>
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="toc-collapse-btn"
          aria-label={isCollapsed ? "Expand table of contents" : "Collapse table of contents"}
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            style={{
              transform: isCollapsed ? "rotate(-90deg)" : "rotate(0deg)",
              transition: "transform 200ms ease",
            }}
          >
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </button>
      </div>

      {/* TOC Items */}
      <ul ref={containerRef} className={`toc-list ${isCollapsed ? "collapsed" : ""}`}>
        <div
          className="toc-active-indicator"
          style={{
            transform: `translateY(${indicatorTop}px)`,
            height: `${indicatorHeight}px`,
          }}
        />
        {items.map((item) => (
          <li key={item.id} className="toc-item">
            <button
              onClick={() => handleClick(item.id)}
              className={`toc-link ${activeId === item.id ? "active" : ""} level-${item.level}`}
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
