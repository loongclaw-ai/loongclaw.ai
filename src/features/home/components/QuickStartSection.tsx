import type { FC } from 'react';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useTheme, THEMES } from '../../../contexts/useTheme';
import StepIndicator from './StepIndicator';
import CodeBlock from './CodeBlock';
import { docsSiteUrl } from '../../../utils/site';

const stepsKeys = [
  {
    number: 1,
    titleKey: 'quickstart.step1_title',
    descKey: 'quickstart.step1_desc',
    href: `${docsSiteUrl}/get-started/installation`,
  },
  {
    number: 2,
    titleKey: 'quickstart.step2_title',
    descKey: 'quickstart.step2_desc',
    href: `${docsSiteUrl}/get-started/first-run`,
  },
  {
    number: 3,
    titleKey: 'quickstart.step3_title',
    descKey: 'quickstart.step3_desc',
    href: `${docsSiteUrl}/get-started/doctor-and-health`,
  },
];

const installCode = `# Recommended install
curl -fsSL https://raw.githubusercontent.com/eastreams/loong/dev/scripts/install.sh | bash -s -- --onboard

# Working from a local checkout instead
bash scripts/install.sh --source --onboard`;

const firstRunCode = `# Supported first-run loop
loong onboard
loong ask --message "Summarize this repository and suggest the best next step."

# Continue the session
loong chat`;

const doctorCode = `# Check runtime health
loong doctor

# Apply the safe repair path
loong doctor --fix

# Inspect health in machine-readable form
loong doctor --json`;

const codeBlocks = [installCode, firstRunCode, doctorCode];

const QuickStartSection: FC = () => {
  const { t } = useTranslation();
  const { theme } = useTheme();
  const isDark = theme === THEMES.DARK;
  const dividerColor = isDark
    ? 'var(--color-border)'
    : 'rgb(177, 35, 28)';
  
  const [activeStep, setActiveStep] = useState(1);

  const handleStepClick = (step: number) => {
    if (step !== activeStep) {
      setActiveStep(step);
    }
  };

  const translatedSteps = stepsKeys.map(step => ({
    number: step.number,
    title: t(step.titleKey),
    description: t(step.descKey),
    href: step.href,
  }));

  return (
    <section
      id="quick-start"
      className="section-padding reveal-stage"
      data-reveal
      style={{ borderTop: `1px solid ${dividerColor}` }}
    >
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
          {t('quickstart.title')}
        </h2>
        <p
          style={{
            fontSize: '1rem',
            color: 'var(--color-text-secondary)',
            maxWidth: '600px',
            margin: '0 auto',
          }}
        >
          {t('quickstart.subtitle')}
        </p>
      </div>

      {/* Step indicator - clickable */}
      <div style={{ marginBottom: '2rem' }}>
        <StepIndicator 
          steps={translatedSteps} 
          activeStep={activeStep}
          onStepClick={handleStepClick}
        />
      </div>

      {/* Code blocks - cross fade with height preservation */}
      <div
        className="quickstart-code-container"
        style={{
          margin: '0 auto',
          position: 'relative',
          minHeight: '360px',
        }}
      >
        {codeBlocks.map((code, index) => {
          const stepNumber = index + 1;
          const isActive = stepNumber === activeStep;
          const step = translatedSteps[index];
          
          return (
            <div
              key={stepNumber}
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                opacity: isActive ? 1 : 0,
                zIndex: isActive ? 1 : 0,
                transform: isActive ? 'translateY(0)' : 'translateY(8px)',
                transition: isActive 
                  ? 'opacity 300ms ease 50ms, transform 300ms ease 50ms'
                  : 'opacity 200ms ease, transform 200ms ease',
                pointerEvents: isActive ? 'auto' : 'none',
              }}
            >
              <CodeBlock code={code} language="bash" />
              <div
                style={{
                  marginTop: '1rem',
                  display: 'flex',
                  justifyContent: 'flex-end',
                }}
              >
                <a
                  href={step.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hero-btn hero-btn-secondary"
                  style={{
                    fontSize: '0.7rem',
                    padding: '0.6rem 1rem',
                  }}
                >
                  {t('quickstart.full_guide')}
                </a>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default QuickStartSection;
