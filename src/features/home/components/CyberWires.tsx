// src/features/home/components/CyberWires.tsx
import type { FC } from "react";
import { useTheme, THEMES } from "../../../contexts/useTheme";

const CyberWires: FC = () => {
  const { theme } = useTheme();

  // Dynamic stroke color based on theme
  const primaryColor =
    theme === THEMES.DARK
      ? "rgba(139, 148, 158, 0.2)"
      : "rgba(177, 35, 28, 0.25)";

  const secondaryColor =
    theme === THEMES.DARK
      ? "rgba(139, 148, 158, 0.1)"
      : "rgba(177, 35, 28, 0.12)";

  const accentColor =
    theme === THEMES.DARK
      ? "rgba(139, 148, 158, 0.15)"
      : "rgba(177, 35, 28, 0.18)";

  return (
    <svg
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        pointerEvents: "none",
        zIndex: 0,
        opacity: 0.85,
      }}
      preserveAspectRatio="none"
      viewBox="0 0 1440 900"
    >
      {/* Main dragon body - classic serpentine dragon shape */}
      <path
        d="M -100 200
           C 100 200, 200 100, 350 150
           C 500 200, 450 350, 600 380
           C 750 410, 850 280, 1000 320
           C 1150 360, 1200 500, 1350 480
           C 1500 460, 1550 600, 1700 580"
        fill="none"
        stroke={primaryColor}
        strokeWidth="2.5"
        strokeLinecap="round"
      />

      {/* Dragon body underside line */}
      <path
        d="M -80 230
           C 120 230, 220 130, 370 180
           C 520 230, 470 380, 620 410
           C 770 440, 870 310, 1020 350
           C 1170 390, 1220 530, 1370 510
           C 1520 490, 1570 630, 1720 610"
        fill="none"
        stroke={secondaryColor}
        strokeWidth="2"
        strokeLinecap="round"
      />

      {/* Dragon tail - long flowing downward curve */}
      <path
        d="M 1350 480
           C 1450 520, 1500 650, 1400 750
           C 1300 850, 1150 800, 1100 900"
        fill="none"
        stroke={primaryColor}
        strokeWidth="2"
        strokeLinecap="round"
      />

      {/* Dragon tail inner curve */}
      <path
        d="M 1370 510
           C 1470 550, 1520 680, 1420 780
           C 1320 880, 1170 830, 1120 930"
        fill="none"
        stroke={secondaryColor}
        strokeWidth="1.5"
        strokeLinecap="round"
      />

      {/* Dragon head outline - upper curve */}
      <path
        d="M 350 150
           C 300 120, 250 140, 200 100
           C 150 60, 100 80, 50 50"
        fill="none"
        stroke={primaryColor}
        strokeWidth="1.5"
        strokeLinecap="round"
      />

      {/* Dragon head lower curve */}
      <path
        d="M 370 180
           C 320 150, 270 170, 220 130
           C 170 90, 120 110, 70 80"
        fill="none"
        stroke={secondaryColor}
        strokeWidth="1.5"
        strokeLinecap="round"
      />

      {/* Dragon whisker - long flowing line */}
      <path
        d="M 200 100
           C 180 180, 280 280, 220 420
           C 160 560, 20 600, 60 750"
        fill="none"
        stroke={accentColor}
        strokeWidth="1.5"
        strokeLinecap="round"
      />

      {/* Dragon whisker - second line */}
      <path
        d="M 220 130
           C 200 200, 300 300, 240 440
           C 180 580, 50 620, 90 770"
        fill="none"
        stroke={secondaryColor}
        strokeWidth="1"
        strokeLinecap="round"
      />

      {/* Dragon horn / spine accent */}
      <path
        d="M 250 135
           C 230 80, 200 60, 180 20"
        fill="none"
        stroke={primaryColor}
        strokeWidth="1"
        strokeLinecap="round"
      />

      {/* Mid-body wave accent */}
      <path
        d="M 600 250
           C 700 220, 800 280, 900 260
           C 1000 240, 1100 300, 1200 280"
        fill="none"
        stroke={accentColor}
        strokeWidth="1"
        strokeLinecap="round"
        strokeDasharray="6 3"
      />

      {/* Lower body flow */}
      <path
        d="M 400 550
           C 550 500, 700 600, 850 550
           C 1000 500, 1150 600, 1300 550"
        fill="none"
        stroke={accentColor}
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
};

export default CyberWires;
