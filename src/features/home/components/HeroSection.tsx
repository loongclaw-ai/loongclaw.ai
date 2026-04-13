// src/features/home/components/HeroSection.tsx
import type { FC } from "react";
import { useTranslation } from "react-i18next";
import StatsMatrix from "./StatsMatrix";
import TerminalWindow from "./TerminalWindow";
import { useTheme, THEMES } from "../../../contexts/useTheme";
import { docsSiteUrl } from "../../../utils/site";

const HeroSection: FC = () => {
  const { t } = useTranslation();
  const { theme } = useTheme();
  const isDark = theme === THEMES.DARK;
  const titleParts = t("hero.title_part1").split(" ").filter(Boolean);

  const accentLineColor = isDark
    ? "var(--color-accent)"
    : "rgb(177, 35, 28)";
  return (
    <section className="hero-section">
      {/* Left column */}
      <div className="hero-left">
        {/* Accent line - desktop only */}
        <div
          className="hero-accent-line"
          style={{
            position: "absolute",
            left: "-2rem",
            top: "0",
            bottom: "0",
            width: "1px",
            background: `linear-gradient(180deg, transparent 0%, ${accentLineColor} 20%, ${accentLineColor} 80%, transparent 100%)`,
            opacity: 0.3,
          }}
        />

        {/* Badge */}
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "0.5rem",
            padding: "0.4rem 0.8rem",
            borderRadius: "4px",
            border: "1px solid var(--color-border)",
            background: "var(--color-bg-tertiary)",
            marginBottom: "1.5rem",
            fontSize: "0.7rem",
            color: "var(--color-text-secondary)",
            fontFamily: "var(--font-mono)",
            letterSpacing: "0.05em",
          }}
        >
          <span
            style={{
              width: "6px",
              height: "6px",
              borderRadius: "50%",
              background: "#22c55e",
              animation: "pulse 2s ease-in-out infinite",
            }}
          />
          {t("hero.badge")}
        </div>

        {/* Title with glow effect */}
        <div style={{ position: "relative" }}>
          <h1
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(2.5rem, 5vw, 4rem)",
              fontWeight: 800,
              lineHeight: 1,
              letterSpacing: "-0.02em",
              textTransform: "uppercase",
              marginBottom: "1.5rem",
              color: "var(--color-text-primary)",
              position: "relative",
            }}
          >
            {titleParts.map((part, index) => (
              <span
                key={part}
                style={{
                  display: "block",
                  background:
                    index === titleParts.length - 1
                      ? "linear-gradient(135deg, var(--color-text-primary) 0%, var(--color-text-accent) 100%)"
                      : "linear-gradient(135deg, var(--color-text-primary) 0%, var(--color-text-secondary) 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                {part}
              </span>
            ))}
          </h1>
        </div>

        {/* Subtitle */}
        <p
          style={{
            fontSize: "1rem",
            lineHeight: 1.6,
            maxWidth: "90%",
            marginBottom: "2rem",
            color: "var(--color-text-secondary)",
            fontFamily: "var(--font-mono)",
          }}
        >
          {t("hero.title_part2")}
        </p>

        {/* Description with border */}
        <p
          style={{
            fontSize: "0.85rem",
            lineHeight: 1.7,
            opacity: 0.8,
            maxWidth: "85%",
            marginBottom: "2.5rem",
            borderLeft: "2px solid var(--color-border-medium)",
            paddingLeft: "1rem",
            color: "var(--color-text-muted)",
            fontFamily: "var(--font-mono)",
          }}
        >
          {t("hero.description")}
        </p>

        {/* Stats */}
        <StatsMatrix />

        {/* CTA Buttons */}
        <div className="hero-cta">
          <button
            className="hero-btn hero-btn-primary"
            onClick={() => {
              const el = document.getElementById("quick-start");
              if (el) {
                el.scrollIntoView({ behavior: "smooth", block: "start" });
              }
            }}
          >
            {t("hero.btn_get_started")}
          </button>
          <a
            href={`${docsSiteUrl}/use-loong/common-setups`}
            target="_blank"
            rel="noopener noreferrer"
            className="hero-btn hero-btn-secondary"
          >
            {t("hero.btn_view_playbooks")}
          </a>
        </div>

        {/* Tech stack pills */}
        <div
          style={{
            display: "flex",
            gap: "0.5rem",
            marginTop: "2rem",
            flexWrap: "wrap",
          }}
        >
          {["Rust", "Providers", "Channels", "Gateway", "Policy"].map((tech) => (
            <span
              key={tech}
              style={{
                padding: "0.25rem 0.6rem",
                borderRadius: "4px",
                border: "1px solid var(--color-border)",
                background: "var(--color-bg-secondary)",
                fontSize: "0.65rem",
                color: "var(--color-text-muted)",
                fontFamily: "var(--font-mono)",
                letterSpacing: "0.02em",
              }}
            >
              {tech}
            </span>
          ))}
        </div>
      </div>

      {/* Right column: Terminal */}
      <div className="hero-right">
        {/* A Letter from the Developer button - HIDDEN
        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <a
            href="#developer-letter"
            onClick={(e) => {
              e.preventDefault();
              setShowNotification(false);
              const el = document.getElementById("developer-letter");
              if (el) {
                el.scrollIntoView({ behavior: "smooth", block: "start" });
              }
            }}
            className="hero-btn hero-btn-secondary"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.6rem",
              textDecoration: "none",
              fontSize: "1rem",
              position: "relative",
              padding: "0.8rem 1.4rem",
            }}
          >
            {showNotification && (
              <span
                style={{
                  position: "absolute",
                  top: "-8px",
                  left: "-8px",
                  width: "18px",
                  height: "18px",
                  background: "#ef4444",
                  color: "white",
                  borderRadius: "50%",
                  fontSize: "11px",
                  fontWeight: "bold",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  boxShadow: "0 0 0 2px var(--color-bg-primary)",
                  zIndex: 5,
                }}
              >
                1
              </span>
            )}
            <Mail size={22} strokeWidth={1.5} />
            {t("community.letter_title").toUpperCase()}
          </a>
        </div>
        */}

        <TerminalWindow />
      </div>
    </section>
  );
};

export default HeroSection;
