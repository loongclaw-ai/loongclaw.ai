import type { FC } from "react";
import {
  ArrowRight,
  Building2,
  Laptop2,
  MessageSquareShare,
  Send,
  TowerControl,
} from "lucide-react";
import { useTranslation } from "react-i18next";
import { useTheme, THEMES } from "../../../contexts/useTheme";
import { docsSiteUrl } from "../../../utils/site";

const PlaybooksSection: FC = () => {
  const { t } = useTranslation();
  const { theme } = useTheme();
  const isDark = theme === THEMES.DARK;
  const dividerColor = isDark
    ? "var(--color-border)"
    : "rgb(177, 35, 28)";

  const playbooks = [
    {
      icon: MessageSquareShare,
      title: t("playbooks.lark_title"),
      description: t("playbooks.lark_desc"),
      href: `${docsSiteUrl}/use-loong/volcengine-feishu-lark-playbook`,
    },
    {
      icon: Building2,
      title: t("playbooks.wecom_title"),
      description: t("playbooks.wecom_desc"),
      href: `${docsSiteUrl}/use-loong/wecom-rollout-playbook`,
    },
    {
      icon: Send,
      title: t("playbooks.telegram_title"),
      description: t("playbooks.telegram_desc"),
      href: `${docsSiteUrl}/use-loong/byteplus-coding-telegram-playbook`,
    },
    {
      icon: Laptop2,
      title: t("playbooks.local_title"),
      description: t("playbooks.local_desc"),
      href: `${docsSiteUrl}/use-loong/local-outbound-playbook`,
    },
    {
      icon: TowerControl,
      title: t("playbooks.gateway_title"),
      description: t("playbooks.gateway_desc"),
      href: `${docsSiteUrl}/use-loong/gateway-rollout-playbook`,
    },
  ];

  return (
    <section className="section-padding reveal-stage" data-reveal style={{ borderTop: `1px solid ${dividerColor}` }}>
      <div className="section-header" style={{ textAlign: "center" }}>
        <p className="story-kicker">{t("playbooks.kicker")}</p>
        <h2
          style={{
            fontSize: "1.75rem",
            fontWeight: 700,
            color: "var(--color-text-primary)",
            marginBottom: "0.75rem",
          }}
        >
          {t("playbooks.title")}
        </h2>
        <p
          style={{
            fontSize: "1rem",
            color: "var(--color-text-secondary)",
            maxWidth: "700px",
            margin: "0 auto",
          }}
        >
          {t("playbooks.subtitle")}
        </p>
      </div>

      <div className="playbook-stage">
        {playbooks.map((playbook, index) => (
          <a
            key={playbook.title}
            href={playbook.href}
            target="_blank"
            rel="noopener noreferrer"
            className={`playbook-card ${index === 0 ? "playbook-card-featured" : ""}`}
          >
            <div className="playbook-card-top">
              <span className="playbook-tag">
                {index === 0 ? t("playbooks.featured_label") : t("playbooks.playbook_label")}
              </span>
              <div className="playbook-icon">
                <playbook.icon size={22} />
              </div>
            </div>

            <h3 className="playbook-title">{playbook.title}</h3>
            <p className="playbook-copy">{playbook.description}</p>

            <span className="playbook-link">
              {t("common.open_playbook")}
              <ArrowRight size={14} />
            </span>
          </a>
        ))}
      </div>
    </section>
  );
};

export default PlaybooksSection;
