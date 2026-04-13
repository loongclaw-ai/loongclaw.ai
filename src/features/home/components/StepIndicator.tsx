// src/features/home/components/StepIndicator.tsx
import type { FC } from 'react';

interface StepIndicatorProps {
  steps: { number: number; title: string; description: string; href?: string }[];
  activeStep?: number;
  onStepClick?: (step: number) => void;
}

const StepIndicator: FC<StepIndicatorProps> = ({ steps, activeStep = 1, onStepClick }) => {
  return (
    <div className="quickstart-steps">
      {steps.map((step) => {
        const isActive = step.number === activeStep;
        const isClickable = step.number !== activeStep;

        return (
          <div
            key={step.number}
            role="button"
            tabIndex={isClickable ? 0 : -1}
            className={`quickstart-step ${isActive ? 'quickstart-step-active' : ''}`}
            onClick={() => isClickable && onStepClick?.(step.number)}
            onKeyDown={(e) => {
              if (isClickable && (e.key === 'Enter' || e.key === ' ')) {
                e.preventDefault();
                onStepClick?.(step.number);
              }
            }}
            onMouseEnter={(e) => {
              if (isClickable) {
                e.currentTarget.style.opacity = '0.86';
              }
            }}
            onMouseLeave={(e) => {
              if (isClickable) {
                e.currentTarget.style.opacity = '0.64';
              }
            }}
          >
            <div className="quickstart-step-index">
              {step.number}
            </div>

            <div className="quickstart-step-copy">
              <span className="quickstart-step-title">{step.title}</span>
              <span className="quickstart-step-desc">{step.description}</span>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default StepIndicator;
