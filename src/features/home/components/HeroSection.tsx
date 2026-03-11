// src/features/home/components/HeroSection.tsx
import type { FC } from "react";
import StatsMatrix from "./StatsMatrix";
import TerminalWindow from "./TerminalWindow";
import { useTheme, THEMES } from "../../../contexts/useTheme";

const HeroSection: FC = () => {
  const { theme } = useTheme();
  const isDark = theme === THEMES.DARK;

  const accentLineColor = isDark
    ? "var(--color-accent)"
    : "rgb(177, 35, 28)";
  return (
    <section
      style={{
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: "4rem",
        alignItems: "center",
        minHeight: "calc(100vh - 200px)",
        paddingTop: "2rem",
      }}
    >
      {/* Left column */}
      <div style={{ position: "relative" }}>
        {/* Accent line */}
        <div
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
          v0.1.2 Available
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
            <span
              style={{
                display: "block",
                background:
                  "linear-gradient(135deg, var(--color-text-primary) 0%, var(--color-text-secondary) 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Loong
            </span>
            <span
              style={{
                display: "block",
                background:
                  "linear-gradient(135deg, var(--color-text-primary) 0%, var(--color-text-accent) 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Claw
            </span>
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
          An open-source AI assistant runtime designed for severe constraints.
          Classical architecture meets brutalist efficiency.
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
          Deploy sentient infrastructure locally with minimal hardware
          footprint. Optimized for edge devices and constrained environments.
        </p>

        {/* Stats */}
        <StatsMatrix />

        {/* CTA Buttons */}
        <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
          <button
            className="hero-btn hero-btn-primary"
            onClick={() => alert("System initializing...")}
          >
            Initialize System
          </button>
          <a
            href="https://github.com/loongclaw-ai/loongclaw"
            target="_blank"
            rel="noopener noreferrer"
            className="hero-btn hero-btn-secondary"
          >
            View Source
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
          {["Rust", "WebAssembly", "Agent", "Plugin"].map((tech) => (
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
      <TerminalWindow />
    </section>
  );
};

export default HeroSection;
