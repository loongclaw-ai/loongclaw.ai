// src/features/home/components/StatsMatrix.tsx
import type { FC } from "react";

interface Stat {
  label: string;
  value: string;
}

const stats: Stat[] = [
  { label: "Min Hardware", value: "Raspberry Pi 4" },
  { label: "RAM Footprint", value: "256 MB" },
  { label: "Cold Boot", value: "< 0.4s" },
  { label: "Inference", value: "42 TOK/s" },
];

const StatsMatrix: FC = () => {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(2, 1fr)",
        gap: "1px",
        background: "var(--color-border)",
        border: "1px solid var(--color-border)",
        borderRadius: "4px",
        marginBottom: "2.5rem",
        width: "fit-content",
        overflow: "hidden",
      }}
    >
      {stats.map((stat) => (
        <div
          key={stat.label}
          className="stat-item"
          style={{
            background: "var(--color-bg-primary)",
            padding: "1rem 1.5rem",
            display: "flex",
            flexDirection: "column",
            gap: "0.25rem",
            cursor: "default",
            transition: "all 0.2s ease",
          }}
        >
          <span
            style={{
              fontSize: "0.6rem",
              textTransform: "uppercase",
              letterSpacing: "0.12em",
              color: "var(--color-text-muted)",
              fontFamily: "var(--font-mono)",
            }}
          >
            {stat.label}
          </span>
          <span
            style={{
              fontSize: "1.1rem",
              fontWeight: 600,
              color: "var(--color-text-primary)",
              fontFamily: "var(--font-mono)",
              letterSpacing: "-0.01em",
            }}
          >
            {stat.value}
          </span>
        </div>
      ))}
    </div>
  );
};

export default StatsMatrix;
