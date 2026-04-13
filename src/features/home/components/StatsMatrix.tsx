// src/features/home/components/StatsMatrix.tsx
import type { FC } from "react";
import { useTranslation } from "react-i18next";

interface Stat {
  labelKey: string;
  value: string;
}

const stats: Stat[] = [
  { labelKey: "stats.providers", value: "42+" },
  { labelKey: "stats.channels", value: "25+" },
  { labelKey: "stats.operator", value: "audit · tasks · skills" },
  { labelKey: "stats.rollouts", value: "5 playbooks" },
];

const StatsMatrix: FC = () => {
  const { t } = useTranslation();
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "auto auto auto auto",
        gap: "1px",
        background: "var(--color-border)",
        border: "1px solid var(--color-border)",
        borderRadius: "4px",
        marginBottom: "1.6rem",
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
            padding: "0.5rem 0.78rem",
            display: "flex",
            flexDirection: "column",
            gap: "0.2rem",
            cursor: "default",
            transition: "all 0.2s ease",
          }}
        >
          <span
            style={{
              fontSize: "0.54rem",
              textTransform: "uppercase",
              letterSpacing: "0.1em",
              color: "var(--color-text-muted)",
              fontFamily: "var(--font-mono)",
            }}
          >
            {t(stat.labelKey)}
          </span>
          <span
            style={{
              fontSize: "0.78rem",
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
