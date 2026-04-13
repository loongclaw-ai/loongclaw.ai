import type { FC } from "react";
import { Bot, Boxes, Shield, TerminalSquare } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useTheme, THEMES } from "../../../contexts/useTheme";

const RuntimeSurfaceSection: FC = () => {
  const { t } = useTranslation();
  const { theme } = useTheme();
  const isDark = theme === THEMES.DARK;
  const dividerColor = isDark
    ? "var(--color-border)"
    : "rgb(177, 35, 28)";

  const groups = [
    {
      icon: Bot,
      title: t("runtime.entrypoints_title"),
      description: t("runtime.entrypoints_desc"),
      items: t("runtime.entrypoints_items", { returnObjects: true }) as string[],
    },
    {
      icon: TerminalSquare,
      title: t("runtime.operator_title"),
      description: t("runtime.operator_desc"),
      items: t("runtime.operator_items", { returnObjects: true }) as string[],
    },
    {
      icon: Boxes,
      title: t("runtime.delivery_title"),
      description: t("runtime.delivery_desc"),
      items: t("runtime.delivery_items", { returnObjects: true }) as string[],
    },
    {
      icon: Shield,
      title: t("runtime.governance_title"),
      description: t("runtime.governance_desc"),
      items: t("runtime.governance_items", { returnObjects: true }) as string[],
    },
  ];

  return (
    <section className="section-padding reveal-stage" data-reveal style={{ borderTop: `1px solid ${dividerColor}` }}>
      <div className="section-header" style={{ textAlign: "center" }}>
        <p className="story-kicker">{t("runtime.kicker")}</p>
        <h2
          style={{
            fontSize: "1.75rem",
            fontWeight: 700,
            color: "var(--color-text-primary)",
            marginBottom: "0.75rem",
          }}
        >
          {t("runtime.title")}
        </h2>
        <p
          style={{
            fontSize: "1rem",
            color: "var(--color-text-secondary)",
            maxWidth: "700px",
            margin: "0 auto",
          }}
        >
          {t("runtime.subtitle")}
        </p>
      </div>

      <div className="runtime-rack">
        {groups.map((group) => (
          <div key={group.title} className="runtime-module">
            <div className="runtime-module-top">
              <span className="runtime-dot" />
              <span className="runtime-dot runtime-dot-faint" />
              <span className="runtime-dot runtime-dot-faint" />
            </div>

            <div className="runtime-icon">
              <group.icon size={22} />
            </div>

            <div className="runtime-copy">
              <h3 className="runtime-title">{group.title}</h3>
              <p className="runtime-desc">{group.description}</p>
            </div>

            <div className="runtime-chipset">
              {group.items.map((item) => (
                <span key={item} className="runtime-chip">
                  {item}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default RuntimeSurfaceSection;
