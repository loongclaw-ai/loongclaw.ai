import type { FC } from "react";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { getDocsIndex } from "../../../utils/content-loader";
import type { DocSection } from "../../../types";

const DocsSidebar: FC = () => {
  const { t } = useTranslation();
  const location = useLocation();
  const { sections } = getDocsIndex();
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

  const isActive = (path: string) => {
    return (
      location.pathname === path || location.pathname.startsWith(`${path}/`)
    );
  };

  return (
    <aside
      style={{
        width: "260px",
        minWidth: "260px",
        borderRight: "1px solid var(--color-border-light)",
        padding: "2rem 1.5rem",
        overflowY: "auto",
        height: "100%",
      }}
    >
      {sections.map((section: DocSection) => (
        <div key={section.id} style={{ marginBottom: "1.5rem" }}>
          <Link
            to={section.path}
            style={{
              display: "block",
              color: isActive(section.path)
                ? "var(--color-text-primary)"
                : "var(--color-text-secondary)",
              fontWeight: isActive(section.path) ? 700 : 600,
              fontSize: "0.75rem",
              textTransform: "uppercase",
              letterSpacing: "0.1em",
              marginBottom: "0.5rem",
              fontFamily: "var(--font-display)",
              textDecoration: "none",
              transition: "color 200ms ease",
            }}
          >
            {t(`docs_menu.${section.id}`, { defaultValue: section.title })}
          </Link>
          {section.children && (
            <div style={{ paddingLeft: "0.75rem" }}>
              {section.children.map((child: DocSection) => (
                <Link
                  key={child.id}
                  to={child.path}
                  onMouseEnter={() => setHoveredItem(child.path)}
                  onMouseLeave={() => setHoveredItem(null)}
                  style={{
                    display: "block",
                    color:
                      location.pathname === child.path
                        ? "var(--color-text-primary)"
                        : "var(--color-text-muted)",
                    fontSize: "0.85rem",
                    padding: "0.4rem 0",
                    fontFamily: "var(--font-mono)",
                    borderLeft:
                      location.pathname === child.path
                        ? "2px solid var(--color-text-primary)"
                        : "2px solid transparent",
                    paddingLeft: "0.75rem",
                    marginLeft: "-0.75rem",
                    textDecoration: "none",
                    transition: "all 200ms ease",
                    transform: hoveredItem === child.path ? "translateX(2px)" : "none",
                  }}
                >
                  {t(`docs_menu.${child.id}`, { defaultValue: child.title })}
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
