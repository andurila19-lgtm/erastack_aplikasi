import React from 'react';
import './Badge.css';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'default' | 'success' | 'warning' | 'error' | 'info' | 'lime' | 'cyan' | 'outline';
  size?: 'sm' | 'md';
  dot?: boolean;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'default',
  size = 'md',
  dot = false,
  className = '',
  ...props
}) => {
  return (
    <span className={`badge badge-${variant} badge-${size} ${className}`} {...props}>
      {dot && <span className="badge-dot" aria-hidden="true" />}
      <span className="badge-text">{children}</span>
    </span>
  );
};
