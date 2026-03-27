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
      <div className="home-container">
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
