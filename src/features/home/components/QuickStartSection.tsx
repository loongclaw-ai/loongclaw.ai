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
      <div className="quickstart-shell">
        <div className="quickstart-aside">
          <p className="story-kicker">{t('quickstart.kicker')}</p>
          <h2 className="quickstart-title">{t('quickstart.title')}</h2>
          <p className="quickstart-subtitle">{t('quickstart.subtitle')}</p>
          <p className="quickstart-note">{t('quickstart.note')}</p>

          <StepIndicator 
            steps={translatedSteps} 
            activeStep={activeStep}
            onStepClick={handleStepClick}
          />
        </div>

        <div
          className="quickstart-panel"
          style={{
            minHeight: '340px',
          }}
        >
          {codeBlocks.map((code, index) => {
            const stepNumber = index + 1;
            const isActive = stepNumber === activeStep;
            const step = translatedSteps[index];
            
            return (
              <div
                key={stepNumber}
                className={`quickstart-stage ${isActive ? 'quickstart-stage-active' : ''}`}
              >
                <CodeBlock code={code} language="bash" />
                <div className="quickstart-stage-footer">
                  <span className="quickstart-stage-caption">{step.title}</span>
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
                    {t('common.open_full_guide')}
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default QuickStartSection;
