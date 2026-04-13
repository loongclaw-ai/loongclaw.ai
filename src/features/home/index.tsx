// src/features/home/index.tsx
import type { FC } from "react";
import { useTranslation } from "react-i18next";
import SeoHead from "../../components/seo/SeoHead";
import HeroSection from "./components/HeroSection";
import FeaturesSection from "./components/FeaturesSection";
import PathwaysSection from "./components/PathwaysSection";
import PlaybooksSection from "./components/PlaybooksSection";
import QuickStartSection from "./components/QuickStartSection";
import RuntimeSurfaceSection from "./components/RuntimeSurfaceSection";
import DocsNavigatorSection from "./components/DocsNavigatorSection";
import ArchitectureSection from "./components/ArchitectureSection";
import CommunitySection from "./components/CommunitySection";
import Footer from "../../components/layout/Footer";
import { getHomeSeo } from "../../seo/metadata";

const HomePage: FC = () => {
  const { t, i18n } = useTranslation();
  const seo = getHomeSeo(t, i18n.language);

  return (
    <>
      <SeoHead {...seo} />
      <div className="home-container">
        <HeroSection />
        <FeaturesSection />
        <QuickStartSection />
        <PathwaysSection />
        <PlaybooksSection />
        <RuntimeSurfaceSection />
        <DocsNavigatorSection />
        <ArchitectureSection />
        <CommunitySection />
      </div>
      <Footer />
    </>
  );
};

export default HomePage;
