import type { FC } from 'react';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useTheme, THEMES } from '../../../contexts/useTheme';
import StepIndicator from './StepIndicator';
import CodeBlock from './CodeBlock';

const stepsKeys = [
  { number: 1, titleKey: 'quickstart.step1_title', descKey: 'quickstart.step1_desc' },
  { number: 2, titleKey: 'quickstart.step2_title', descKey: 'quickstart.step2_desc' },
  { number: 3, titleKey: 'quickstart.step3_title', descKey: 'quickstart.step3_desc' },
];

const installCode = `# Clone the repository
git clone https://github.com/loongclaw-ai/loongclaw.git
cd loongclaw

# Run install script (Linux/macOS)
./scripts/install.sh --setup

# Or Windows PowerShell
pwsh ./scripts/install.ps1 -Setup`;

const configCode = `# Set your provider API key
export PROVIDER_API_KEY=sk-...

# Or configure via setup command
loongclaw setup`;

const chatCode = `# Start interactive chat
loongclaw chat

# Or run diagnostics
loongclaw doctor --fix`;

const codeBlocks = [installCode, configCode, chatCode];

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
  }));

  return (
    <section
      style={{
        padding: '4rem 0',
        borderTop: `1px solid ${dividerColor}`,
      }}
    >
      {/* Section header */}
      <div
        style={{
          textAlign: 'center',
          marginBottom: '3rem',
        }}
      >
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
        style={{
          maxWidth: '600px',
          margin: '0 auto',
          position: 'relative',
          minHeight: '280px',
        }}
      >
        {codeBlocks.map((code, index) => {
          const stepNumber = index + 1;
          const isActive = stepNumber === activeStep;
          
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
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default QuickStartSection;
