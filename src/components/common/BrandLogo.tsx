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
          width={size === 'lg' ? 38 : size === 'md' ? 30 : 26}
          height={size === 'lg' ? 38 : size === 'md' ? 30 : 26}
          style={{ height: size === 'lg' ? '38px' : size === 'md' ? '30px' : '26px', width: 'auto' }}
        />
      )}
      {variant !== 'icon' && (
        <div className="brand-wordmark-wrap">
          <img
            src="/brand/erastack-wordmark.png"
            alt="ERASTACK"
            className="brand-wordmark-img"
            loading="eager"
            width={size === 'lg' ? 120 : size === 'md' ? 100 : 85}
            height={size === 'lg' ? 24 : size === 'md' ? 20 : 18}
            style={{ height: size === 'lg' ? '24px' : size === 'md' ? '20px' : '18px', width: 'auto' }}
          />
        </div>
      )}
    </div>
  );
};
