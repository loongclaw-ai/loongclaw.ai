import type { FC } from "react";
import { ArrowRight, Bot, Boxes, Cable, ShieldCheck, Wrench } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useTheme, THEMES } from "../../../contexts/useTheme";
import { docsSiteUrl } from "../../../utils/site";

const PathwaysSection: FC = () => {
  const { t } = useTranslation();
  const { theme } = useTheme();
  const isDark = theme === THEMES.DARK;
  const dividerColor = isDark
    ? "var(--color-border)"
    : "rgb(177, 35, 28)";

  const pathways = [
    {
      icon: Bot,
      title: t("pathways.local_title"),
      description: t("pathways.local_desc"),
      href: `${docsSiteUrl}/get-started/overview`,
      label: t("pathways.local_label"),
    },
    {
      icon: Boxes,
      title: t("pathways.provider_title"),
      description: t("pathways.provider_desc"),
      href: `${docsSiteUrl}/use-loong/providers-and-models`,
      label: t("pathways.provider_label"),
    },
    {
      icon: Cable,
      title: t("pathways.channel_title"),
      description: t("pathways.channel_desc"),
      href: `${docsSiteUrl}/use-loong/channels`,
      label: t("pathways.channel_label"),
    },
    {
      icon: ShieldCheck,
      title: t("pathways.gateway_title"),
      description: t("pathways.gateway_desc"),
      href: `${docsSiteUrl}/use-loong/gateway-and-supervision`,
      label: t("pathways.gateway_label"),
    },
    {
      icon: Wrench,
      title: t("pathways.skills_title"),
      description: t("pathways.skills_desc"),
      href: `${docsSiteUrl}/use-loong/managed-skills`,
      label: t("pathways.skills_label"),
    },
  ];

  return (
    <section className="section-padding reveal-stage" data-reveal style={{ borderTop: `1px solid ${dividerColor}` }}>
      <div className="section-header" style={{ textAlign: "center" }}>
        <p className="story-kicker">{t("pathways.kicker")}</p>
        <h2
          style={{
            fontSize: "1.75rem",
            fontWeight: 700,
            color: "var(--color-text-primary)",
            marginBottom: "0.75rem",
          }}
        >
          {t("pathways.title")}
        </h2>
        <p
          style={{
            fontSize: "1rem",
            color: "var(--color-text-secondary)",
            maxWidth: "680px",
            margin: "0 auto",
          }}
        >
          {t("pathways.subtitle")}
        </p>
      </div>

      <div className="pathway-flow">
        {pathways.map((pathway, index) => (
          <a
            key={pathway.title}
            href={pathway.href}
            target="_blank"
            rel="noopener noreferrer"
            className="pathway-node"
          >
            <div className="pathway-node-top">
              <span className="pathway-index">
                {String(index + 1).padStart(2, "0")}
              </span>
              <div className="pathway-icon">
                <pathway.icon size={22} />
              </div>
            </div>

            <div className="pathway-rail">
              <span className="pathway-label">{pathway.label}</span>
            </div>

            <h3 className="pathway-title">{pathway.title}</h3>
            <p className="pathway-copy">{pathway.description}</p>

            <span className="pathway-link">
              {t("common.open_docs")}
              <ArrowRight size={14} />
            </span>
          </a>
        ))}
      </div>
    </section>
  );
};

export default PathwaysSection;
