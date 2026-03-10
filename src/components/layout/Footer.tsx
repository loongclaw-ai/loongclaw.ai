import type { FC } from "react";

export const Footer: FC = () => {
  return (
    <footer
      style={{
        borderTop: "1px solid var(--color-border-light)",
        padding: "0.5rem 4rem",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        fontSize: "0.7rem",
        color: "var(--color-text-muted)",
        fontFamily: "var(--font-mono)",
        backgroundColor: "var(--color-bg-secondary)",
        flexShrink: 0,
      }}
    >
      <div>© 2025 LoongClaw. Open source under MIT License.</div>
      <div style={{ display: "flex", gap: "1.5rem" }}>
        <a
          href="https://github.com/loongclaw"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            color: "inherit",
            transition: "color var(--transition-base)",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.color = "var(--color-text-primary)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.color = "inherit";
          }}
        >
          GitHub
        </a>
        <a
          href="https://twitter.com/loongclaw"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            color: "inherit",
            transition: "color var(--transition-base)",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.color = "var(--color-text-primary)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.color = "inherit";
          }}
        >
          Twitter
        </a>
        <a
          href="https://discord.gg/loongclaw"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            color: "inherit",
            transition: "color var(--transition-base)",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.color = "var(--color-text-primary)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.color = "inherit";
          }}
        >
          Discord
        </a>
      </div>
    </footer>
  );
};

export default Footer;
