import type { FC } from "react";
import { useScrollProgress } from "../hooks/useScrollProgress";

const ReadingProgress: FC = () => {
  const progress = useScrollProgress();

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        height: "2px",
        backgroundColor: "var(--color-bg-secondary)",
        zIndex: 100,
      }}
    >
      <div
        style={{
          height: "100%",
          width: `${progress}%`,
          backgroundColor: "var(--color-accent)",
          transition: "width 100ms linear",
        }}
      />
    </div>
  );
};

export default ReadingProgress;
