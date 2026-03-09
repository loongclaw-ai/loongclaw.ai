// src/features/docs/components/DocsSidebar.tsx
import type { FC } from "react";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Zap } from "lucide-react";
import { getDocsIndex } from "../../../utils/content-loader";
import type { DocSection } from "../../../types";

interface DocsSidebarProps {
  onClose?: () => void;
}

const PILLAR_ORDER = [
  "foundations",
  "connectivity",
  "runtime",
  "orchestration",
  "operations",
];

const DocsSidebar: FC<DocsSidebarProps> = ({ onClose }) => {
  const { t, i18n } = useTranslation();
  const location = useLocation();
  const { sections } = getDocsIndex(i18n.language);
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

  const isActive = (path: string) => {
    return (
      location.pathname === path || location.pathname.startsWith(`${path}/`)
    );
  };

  const sortedSections = [...sections].sort((a, b) => {
    const indexA = PILLAR_ORDER.indexOf(a.id);
    const indexB = PILLAR_ORDER.indexOf(b.id);
    if (indexA !== -1 && indexB !== -1) return indexA - indexB;
    if (indexA !== -1) return -1;
    if (indexB !== -1) return 1;
    return 0;
  });

  const renderSection = (section: DocSection, depth = 0) => {
    const hasChildren = section.children && section.children.length > 0;
    const isPillar = depth === 0;

    return (
      <div
        key={section.id}
        className={isPillar ? "sidebar-section" : "sidebar-sub-section"}
      >
        {isPillar ? (
          <Link
            to={section.path}
            className={`sidebar-section-title ${isActive(section.path) ? "active" : ""}`}
            onClick={onClose}
          >
            {section.id === "foundations" && (
              <Zap size={12} className="sidebar-zap-icon" />
            )}
            {t(`docs_menu.${section.id}`, { defaultValue: section.title })}
          </Link>
        ) : (
          <Link
            to={section.path}
            onMouseEnter={() => setHoveredItem(section.path)}
            onMouseLeave={() => setHoveredItem(null)}
            onClick={onClose}
            className={`sidebar-child-link ${isActive(section.path) ? "active" : ""} ${hoveredItem === section.path ? "hovered" : ""}`}
          >
            {t(`docs_menu.${section.id}`, { defaultValue: section.title })}
          </Link>
        )}

        {hasChildren && (
          <div className="sidebar-children">
            {section.children!.map((child) => renderSection(child, depth + 1))}
          </div>
        )}
      </div>
    );
  };

  return (
    <nav className="docs-sidebar-nav">
      {sortedSections.map((section) => renderSection(section))}
    </nav>
  );
};

export default DocsSidebar;
