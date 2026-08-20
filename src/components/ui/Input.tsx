import React, { forwardRef } from 'react';
import './Input.css';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  hint?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(({
  label,
  error,
  hint,
  leftIcon,
  rightIcon,
  id,
  className = '',
  disabled,
  ...props
}, ref) => {
  const inputId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);

  return (
    <div className={`input-group ${error ? 'has-error' : ''} ${disabled ? 'is-disabled' : ''} ${className}`}>
      {label && (
        <label htmlFor={inputId} className="input-label">
          {label}
        </label>
      )}

      <div className="input-wrapper">
        {leftIcon && <span className="input-icon-left">{leftIcon}</span>}
        <input
          ref={ref}
          id={inputId}
          disabled={disabled}
          className={`input-control ${leftIcon ? 'with-left-icon' : ''} ${rightIcon ? 'with-right-icon' : ''}`}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? `${inputId}-error` : hint ? `${inputId}-hint` : undefined}
          {...props}
        />
        {rightIcon && <span className="input-icon-right">{rightIcon}</span>}
      </div>

      {error ? (
        <p id={`${inputId}-error`} className="input-error-msg" role="alert">
          {error}
        </p>
      ) : hint ? (
        <p id={`${inputId}-hint`} className="input-hint-msg">
          {hint}
        </p>
      ) : null}
    </div>
  );
});

Input.displayName = 'Input';
