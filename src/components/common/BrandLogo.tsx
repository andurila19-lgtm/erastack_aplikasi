import React from 'react';
import './BrandLogo.css';

export interface BrandLogoProps {
  variant?: 'full' | 'icon' | 'wordmark';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const BrandLogo: React.FC<BrandLogoProps> = ({
  variant = 'full',
  size = 'md',
  className = '',
}) => {
  return (
    <div className={`brand-logo-container size-${size} ${className}`}>
      {variant !== 'wordmark' && (
        <img
          src="/brand/erastack-icon.png"
          alt="ERASTACK Icon"
          className="brand-logo-icon-img"
          loading="eager"
        />
      )}
      {variant !== 'icon' && (
        <div className="brand-wordmark-wrap">
          <img
            src="/brand/erastack-wordmark.png"
            alt="ERASTACK"
            className="brand-wordmark-img"
            loading="eager"
          />
        </div>
      )}
    </div>
  );
};
