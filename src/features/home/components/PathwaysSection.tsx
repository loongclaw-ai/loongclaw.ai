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
      <div className="pathway-shell">
        <div className="pathway-intro">
          <p className="story-kicker">{t("pathways.kicker")}</p>
          <h2 className="pathway-heading">{t("pathways.title")}</h2>
          <p className="pathway-subtitle">{t("pathways.subtitle")}</p>
          <div className="pathway-intro-stack">
            <div className="pathway-intro-block">
              <span className="pathway-intro-label">{pathways[0].label}</span>
              <p className="pathway-intro-copy">{pathways[0].description}</p>
            </div>
            <div className="pathway-intro-block">
              <span className="pathway-intro-label">{pathways[3].label}</span>
              <p className="pathway-intro-copy">{pathways[3].description}</p>
            </div>
          </div>
        </div>

        <div className="pathway-list">
          {pathways.map((pathway, index) => (
            <a
              key={pathway.title}
              href={pathway.href}
              target="_blank"
              rel="noopener noreferrer"
              className="pathway-row"
            >
              <div className="pathway-row-index">{String(index + 1).padStart(2, "0")}</div>
              <div className="pathway-row-icon">
                <pathway.icon size={18} />
              </div>
              <div className="pathway-row-copy">
                <div className="pathway-row-topline">
                  <span className="pathway-row-label">{pathway.label}</span>
                  <h3 className="pathway-row-title">{pathway.title}</h3>
                </div>
                <p className="pathway-row-desc">{pathway.description}</p>
              </div>
              <span className="pathway-row-link">
                {t("common.open_docs")}
                <ArrowRight size={14} />
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PathwaysSection;
