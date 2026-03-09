// src/features/home/index.tsx
import type { FC } from "react";
import HeroSection from "./components/HeroSection";
import FeaturesSection from "./components/FeaturesSection";
import QuickStartSection from "./components/QuickStartSection";
import ArchitectureSection from "./components/ArchitectureSection";
import CommunitySection from "./components/CommunitySection";
import Footer from "../../components/layout/Footer";

const HomePage: FC = () => {
  return (
    <>
      <div
        style={{
          padding: "2rem 4rem 0",
          maxWidth: "1600px",
          margin: "0 auto",
          position: "relative",
        }}
      >
        <HeroSection />
        <FeaturesSection />
        <QuickStartSection />
        <ArchitectureSection />
        <CommunitySection />
      </div>
      <Footer />
    </>
  );
};

export default HomePage;
