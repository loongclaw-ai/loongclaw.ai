import { useTranslation } from "react-i18next";
import { useLocation } from "react-router-dom";
import { getDocsIndex } from "../../../utils/content-loader";
import type { DocSection } from "../../../types";

interface BreadcrumbItem {
  label: string;
  path: string;
}

export function useBreadcrumb(): BreadcrumbItem[] {
  const { t, i18n } = useTranslation();
  const location = useLocation();
  const lang = i18n.language;

  // Handle root documentation path
  if (location.pathname === "/docs" || location.pathname === "/docs/") {
    return [
      {
        label: t("nav.docs", { defaultValue: "Documentation" }),
        path: "/docs",
      },
    ];
  }

  // Get docs index to find section hierarchy
  const docsIndex = getDocsIndex(lang);
  const items: BreadcrumbItem[] = [];

  const findPath = (
    sections: DocSection[],
    targetPath: string,
    currentPath: BreadcrumbItem[] = []
  ): boolean => {
    for (const section of sections) {
      const newPath = [...currentPath, { label: section.title, path: section.path }];
      if (section.path === targetPath) {
        items.push(...newPath);
        return true;
      }
      if (section.children && section.children.length > 0) {
        if (findPath(section.children, targetPath, newPath)) {
          return true;
        }
      }
    }
    return false;
  };

  findPath(docsIndex.sections as DocSection[], location.pathname);

  return items;
}
