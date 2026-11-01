import React from 'react';
import { AlertCircle, CheckCircle2 } from 'lucide-react';

export const FormField = ({
  label,
  name,
  required = false,
  hint,
  error,
  isTouched = false,
  isValid = false,
  children,
  className = ''
}) => {
  return (
    <div className={`form-group ${className}`}>
      {label && (
        <label htmlFor={name} className="field-label">
          <span>
            {label}
            {required && <span className="req-star" aria-hidden="true">*</span>}
          </span>
          {hint && <span className="field-hint">{hint}</span>}
        </label>
      )}

      {children}

      {isTouched && error && (
        <div className="error-msg" role="alert">
          <AlertCircle size={14} style={{ flexShrink: 0 }} />
          <span>{error}</span>
        </div>
      )}

      {isTouched && !error && isValid && (
        <div className="success-hint">
          <CheckCircle2 size={13} style={{ flexShrink: 0 }} />
          <span>Looks great!</span>
        </div>
      )}
    </div>
  );
};

