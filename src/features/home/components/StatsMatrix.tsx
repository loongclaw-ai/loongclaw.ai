// src/features/home/components/StatsMatrix.tsx
import type { FC } from "react";
import { useTranslation } from "react-i18next";

interface Stat {
  labelKey: string;
  value: string;
}

const stats: Stat[] = [
  { labelKey: "stats.min_hardware", value: "Raspberry Pi 4" },
  { labelKey: "stats.ram_footprint", value: "256 MB" },
  { labelKey: "stats.cold_boot", value: "< 0.4s" },
  { labelKey: "stats.inference", value: "42 TOK/s" },
];

const StatsMatrix: FC = () => {
  const { t } = useTranslation();
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
          key={stat.labelKey}
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
            {t(stat.labelKey)}
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
