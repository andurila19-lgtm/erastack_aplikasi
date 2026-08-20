import React from 'react';
import './StatusDot.css';

export interface StatusDotProps {
  status?: 'ready' | 'online' | 'offline' | 'busy' | 'error';
  pulse?: boolean;
  label?: string;
  size?: 'sm' | 'md';
}

export const StatusDot: React.FC<StatusDotProps> = ({
  status = 'ready',
  pulse = true,
  label,
  size = 'md',
}) => {
  return (
    <span className={`status-container status-size-${size}`} title={label}>
      <span className={`status-dot status-${status}`}>
        {pulse && <span className={`status-pulse status-pulse-${status}`} aria-hidden="true" />}
      </span>
      {label && <span className="status-label">{label}</span>}
    </span>
  );
};
