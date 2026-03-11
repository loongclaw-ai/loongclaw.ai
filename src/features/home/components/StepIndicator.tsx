// src/features/home/components/StepIndicator.tsx
import type { FC } from 'react';

interface StepIndicatorProps {
  steps: { number: number; title: string; description: string }[];
  activeStep?: number;
}

const StepIndicator: FC<StepIndicatorProps> = ({ steps, activeStep = 1 }) => {
  return (
    <div
      style={{
        display: 'flex',
        gap: '2rem',
        alignItems: 'flex-start',
        justifyContent: 'center',
      }}
    >
      {steps.map((step, index) => {
        const isActive = step.number === activeStep;
        const isCompleted = step.number < activeStep;

        return (
          <div
            key={step.number}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '0.75rem',
              flex: 1,
            }}
          >
            {/* Step number circle */}
            <div
              style={{
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 600,
                fontSize: '1rem',
                background: isActive
                  ? 'var(--color-accent)'
                  : isCompleted
                  ? 'var(--color-success)'
                  : 'var(--color-bg-tertiary)',
                color: isActive || isCompleted
                  ? 'var(--color-bg-primary)'
                  : 'var(--color-text-muted)',
                border: `2px solid ${
                  isActive
                    ? 'var(--color-accent)'
                    : isCompleted
                    ? 'var(--color-success)'
                    : 'var(--color-border)'
                }`,
                transition: 'all 0.3s ease',
              }}
            >
              {step.number}
            </div>

            {/* Connector line */}
            {index < steps.length - 1 && (
              <div
                style={{
                  position: 'absolute',
                  width: '60px',
                  height: '2px',
                  background: isCompleted
                    ? 'var(--color-success)'
                    : 'var(--color-border)',
                  marginLeft: '60px',
                  marginTop: '20px',
                }}
              />
            )}

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
