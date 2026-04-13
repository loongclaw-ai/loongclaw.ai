import type { FC } from 'react';
import { Puzzle, Rocket, ShieldCheck, Waypoints } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useTheme, THEMES } from '../../../contexts/useTheme';

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
      <div className="why-shell">
        <div className="why-aside">
          <p className="story-kicker">{t('features.kicker')}</p>
          <h2 className="why-title">{t('features.title')}</h2>
          <p className="why-lead">{t('features.subtitle')}</p>
          <p className="why-body">{t('features.lead_copy_1')}</p>
          <p className="why-body">{t('features.lead_copy_2')}</p>
          <div className="why-principles">
            {(t('features.principles', { returnObjects: true }) as string[]).map((item) => (
              <span key={item} className="why-principle-pill">
                {item}
              </span>
            ))}
          </div>
        </div>

        <div className="why-track">
          {features.map((feature, index) => (
            <article key={feature.title} className="why-card">
              <div className="why-card-meta">
                <span className="why-card-index">{String(index + 1).padStart(2, '0')}</span>
                <div className="why-card-icon">
                  <feature.icon size={20} />
                </div>
              </div>
              <h3 className="why-card-title">{feature.title}</h3>
              <p className="why-card-copy">{feature.description}</p>
              <ul className="why-card-list">
                {feature.details.map((detail) => (
                  <li key={detail} className="why-card-list-item">
                    <span className="why-card-bullet" />
                    <span>{detail}</span>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
