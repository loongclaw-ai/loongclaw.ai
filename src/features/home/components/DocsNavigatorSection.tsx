import type { FC } from "react";
import { ArrowRight } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useTheme, THEMES } from "../../../contexts/useTheme";
import { docsSiteUrl } from "../../../utils/site";

const DocsNavigatorSection: FC = () => {
  const { t } = useTranslation();
  const { theme } = useTheme();
  const isDark = theme === THEMES.DARK;
  const dividerColor = isDark
    ? "var(--color-border)"
    : "rgb(177, 35, 28)";

  const pages = [
    {
      title: t("docs_nav.get_started_title"),
      description: t("docs_nav.get_started_desc"),
      href: `${docsSiteUrl}/get-started/overview`,
    },
    {
      title: t("docs_nav.setups_title"),
      description: t("docs_nav.setups_desc"),
      href: `${docsSiteUrl}/use-loong/common-setups`,
    },
    {
      title: t("docs_nav.providers_title"),
      description: t("docs_nav.providers_desc"),
      href: `${docsSiteUrl}/use-loong/providers-and-models`,
    },
    {
      title: t("docs_nav.channels_title"),
      description: t("docs_nav.channels_desc"),
      href: `${docsSiteUrl}/use-loong/channels`,
    },
    {
      title: t("docs_nav.tools_title"),
      description: t("docs_nav.tools_desc"),
      href: `${docsSiteUrl}/use-loong/tools-and-memory`,
    },
    {
      title: t("docs_nav.gateway_title"),
      description: t("docs_nav.gateway_desc"),
      href: `${docsSiteUrl}/use-loong/gateway-and-supervision`,
    },
    {
      title: t("docs_nav.build_title"),
      description: t("docs_nav.build_desc"),
      href: `${docsSiteUrl}/build-on-loong/overview`,
    },
    {
      title: t("docs_nav.reference_title"),
      description: t("docs_nav.reference_desc"),
      href: `${docsSiteUrl}/reference/why-loong`,
    },
  ];

  return (
    <section className="section-padding" style={{ borderTop: `1px solid ${dividerColor}` }}>
      <div className="section-header" style={{ textAlign: "center" }}>
        <p className="story-kicker">{t("docs_nav.kicker")}</p>
        <h2
          style={{
            fontSize: "1.75rem",
            fontWeight: 700,
            color: "var(--color-text-primary)",
            marginBottom: "0.75rem",
          }}
        >
          {t("docs_nav.title")}
        </h2>
        <p
          style={{
            fontSize: "1rem",
            color: "var(--color-text-secondary)",
            maxWidth: "700px",
            margin: "0 auto",
          }}
        >
          {t("docs_nav.subtitle")}
        </p>
      </div>

      <div className="docs-runway">
        {pages.map((page) => (
          <a
            key={page.title}
            href={page.href}
            target="_blank"
            rel="noopener noreferrer"
            className="docs-runway-item"
          >
            <div className="docs-runway-copy">
              <h3 className="docs-runway-title">{page.title}</h3>
              <p className="docs-runway-desc">{page.description}</p>
            </div>
            <span className="docs-runway-link">
              {t("common.open_docs")}
              <ArrowRight size={14} />
            </span>
          </a>
        ))}
      </div>
    </section>
  );
};

export default DocsNavigatorSection;
