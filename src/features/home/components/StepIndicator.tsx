// src/features/home/components/StepIndicator.tsx
import type { FC } from 'react';

interface StepIndicatorProps {
  steps: { number: number; title: string; description: string }[];
  activeStep?: number;
  onStepClick?: (step: number) => void;
}

const StepIndicator: FC<StepIndicatorProps> = ({ steps, activeStep = 1, onStepClick }) => {
  return (
    <div
      style={{
        display: 'flex',
        gap: '2rem',
        alignItems: 'flex-start',
        justifyContent: 'center',
      }}
    >
      {steps.map((step) => {
        const isActive = step.number === activeStep;
        const isClickable = step.number !== activeStep;

        return (
          <div
            key={step.number}
            role="button"
            tabIndex={isClickable ? 0 : -1}
            onClick={() => isClickable && onStepClick?.(step.number)}
            onKeyDown={(e) => {
              if (isClickable && (e.key === 'Enter' || e.key === ' ')) {
                e.preventDefault();
                onStepClick?.(step.number);
              }
            }}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '0.75rem',
              flex: 1,
              cursor: isClickable ? 'pointer' : 'default',
              opacity: isClickable ? 0.6 : 1,
              transition: 'opacity 0.2s ease',
            }}
            onMouseEnter={(e) => {
              if (isClickable) {
                e.currentTarget.style.opacity = '0.8';
              }
            }}
            onMouseLeave={(e) => {
              if (isClickable) {
                e.currentTarget.style.opacity = '0.6';
              }
            }}
          >
            {/* Step number circle */}
            <div
              style={{
                width: '44px',
                height: '44px',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 600,
                fontSize: '1rem',
                background: isActive
                  ? 'var(--color-accent)'
                  : 'var(--color-bg-tertiary)',
                color: isActive
                  ? 'var(--color-bg-primary)'
                  : 'var(--color-text-muted)',
                border: `2px solid ${
                  isActive
                    ? 'var(--color-accent)'
                    : 'var(--color-border)'
                }`,
                transition: 'all 0.2s ease',
                minWidth: '44px',
                minHeight: '44px',
              }}
            >
              {step.number}
            </div>

            {/* Title */}
            <span
              style={{
                fontWeight: isActive ? 600 : 400,
                color: isActive
                  ? 'var(--color-text-primary)'
                  : 'var(--color-text-secondary)',
                fontSize: '0.9rem',
                textAlign: 'center',
              }}
            >
              {step.title}
            </span>

            {/* Description */}
            <span
              style={{
                color: 'var(--color-text-muted)',
                fontSize: '0.75rem',
                textAlign: 'center',
                maxWidth: '150px',
              }}
            >
              {step.description}
            </span>
          </div>
        );
      })}
    </div>
  );
};

export default StepIndicator;
