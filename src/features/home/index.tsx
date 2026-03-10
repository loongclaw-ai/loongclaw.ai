// src/features/home/index.tsx
import type { FC } from "react";
import HeroSection from "./components/HeroSection";

const HomePage: FC = () => {
  return (
    <div
      style={{
        padding: "2rem 4rem",
        maxWidth: "1600px",
        margin: "0 auto",
        position: "relative",
      }}
    >
      <HeroSection />
    </div>
  );
};

export default HomePage;
