import type { FC, RefObject } from "react";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { findDocByPath } from "../../../utils/content-loader";
import { useDocContent } from "../../../hooks/useContent";

interface DocContentProps {
  contentRef?: React.RefObject<HTMLElement | null>;
}

const DocContent: FC<DocContentProps> = ({ contentRef }) => {
  const { t, i18n } = useTranslation();
  const location = useLocation();
  const doc = findDocByPath(location.pathname, i18n.language);
  const { data, loading, error } = useDocContent(doc?.contentPath || null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  if (loading) {
    return (
      <article ref={contentRef as RefObject<HTMLElement>} style={{ maxWidth: "720px" }}>
        <p style={{ color: "var(--color-text-secondary)" }}>{t("docs_menu.loading", { defaultValue: "Loading..." })}</p>
      </article>
    );
  }

  if (error || !data) {
    return (
      <article ref={contentRef as RefObject<HTMLElement>} className="doc-markdown-content" style={{ maxWidth: "720px" }}>
        <h1>
          {doc ? t(`docs_menu.${doc.id}`, { defaultValue: doc.title }) : t("docs_menu.page_not_found", { defaultValue: "Page Not Found" })}
        </h1>
        <p style={{ color: "var(--color-text-secondary)" }}>
          {error ? t("docs_menu.failed_load", { defaultValue: "Failed to load content." }) : t("docs_menu.not_found", { defaultValue: "Content not found." })}
        </p>
      </article>
    );
  }

  return (
    <article
      ref={contentRef as RefObject<HTMLElement>}
      className="doc-markdown-content"
      style={{
        maxWidth: "720px",
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? "translateY(0)" : "translateY(10px)",
        transition: "opacity 400ms ease-out, transform 400ms ease-out",
      }}
    >
      {/* Markdown content usually starts with its own H1 */}
      <div
        dangerouslySetInnerHTML={{ __html: data.html }}
      />
    </article>
  );
};

export default DocContent;
