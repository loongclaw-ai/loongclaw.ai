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
        display: "none",
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
