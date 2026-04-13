// src/features/home/components/FeaturesSection.tsx
import type { FC } from 'react';
import { Puzzle, Rocket, ShieldCheck, Waypoints } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useTheme, THEMES } from '../../../contexts/useTheme';
import FeatureCard from './FeatureCard';

const FeaturesSection: FC = () => {
  const { t } = useTranslation();
  const { theme } = useTheme();

  const features = [
    {
      icon: Rocket,
      title: t('features.first_value_title'),
      description: t('features.first_value_desc'),
      details: t('features.first_value_details', { returnObjects: true }) as string[],
    },
    {
      icon: Waypoints,
      title: t('features.truthful_title'),
      description: t('features.truthful_desc'),
      details: t('features.truthful_details', { returnObjects: true }) as string[],
    },
    {
      icon: ShieldCheck,
      title: t('features.governed_title'),
      description: t('features.governed_desc'),
      details: t('features.governed_details', { returnObjects: true }) as string[],
    },
    {
      icon: Puzzle,
      title: t('features.extend_title'),
      description: t('features.extend_desc'),
      details: t('features.extend_details', { returnObjects: true }) as string[],
    },
  ];

  const isDark = theme === THEMES.DARK;
  const dividerColor = isDark
    ? 'var(--color-border)'
    : 'rgb(177, 35, 28)';
  return (
    <section className="section-padding reveal-stage" data-reveal style={{ borderTop: `1px solid ${dividerColor}` }}>
      {/* Section header */}
      <div className="section-header" style={{ textAlign: 'center' }}>
        <h2
          style={{
            fontSize: '1.75rem',
            fontWeight: 700,
            color: 'var(--color-text-primary)',
            marginBottom: '0.75rem',
          }}
        >
          {t('features.title')}
        </h2>
        <p
          style={{
            fontSize: '1rem',
            color: 'var(--color-text-secondary)',
            maxWidth: '600px',
            margin: '0 auto',
          }}
        >
          {t('features.subtitle')}
        </p>
      </div>

      {/* Feature cards grid */}
      <div
        className="features-grid"
        style={{
          display: 'grid',
          gap: '1rem',
        }}
      >
        {features.map((feature) => (
          <FeatureCard key={feature.title} {...feature} />
        ))}
      </div>
    </section>
  );
};

export default FeaturesSection;
