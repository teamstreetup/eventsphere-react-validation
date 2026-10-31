import React from 'react';
import { Check, User, Briefcase, Ticket, ShieldCheck } from 'lucide-react';

const STEPS = [
  { id: 1, title: 'Personal Details', icon: User },
  { id: 2, title: 'Academic Profile', icon: Briefcase },
  { id: 3, title: 'Pass & Workshops', icon: Ticket },
  { id: 4, title: 'Security & Review', icon: ShieldCheck },
];

export const StepProgressBar = ({ currentStep, onStepClick, completedSteps }) => {
  const fillWidth = `${((currentStep - 1) / (STEPS.length - 1)) * 100}%`;

  return (
    <div className="step-progress-wrapper no-print">
      <div className="steps-list">
        <div className="steps-line-bg" />
        <div className="steps-line-fill" style={{ width: fillWidth }} />

        {STEPS.map((step) => {
          const isCompleted = completedSteps.includes(step.id);
          const isActive = currentStep === step.id;
          const StepIcon = step.icon;

          return (
            <button
              key={step.id}
              type="button"
              className={`step-item ${isActive ? 'active' : ''} ${isCompleted ? 'completed' : ''}`}
              onClick={() => onStepClick(step.id)}
              disabled={!isCompleted && step.id > currentStep}
              title={`Step ${step.id}: ${step.title}`}
            >
              <div className="step-circle">
                {isCompleted && !isActive ? (
                  <Check size={18} strokeWidth={3} />
                ) : (
                  <StepIcon size={18} />
                )}
              </div>
              <span className="step-label">{step.title}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
