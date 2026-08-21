import React from 'react';
import Link from 'next/link';
import { 
  Monitor, Smartphone, Terminal, HardDrive, 
  ArrowRight, Download, CheckCircle2, ShieldCheck, 
  Tag, Cpu
} from 'lucide-react';
import type { ProductItem } from '../../data/productsData';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import './ProductCard.css';

export interface ProductCardProps {
  product: ProductItem;
  featured?: boolean;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, featured = false }) => {
  const renderPlatformIcon = (platform: 'windows' | 'android' | 'web' | 'linux') => {
    switch (platform) {
      case 'windows':
        return <Monitor size={15} className="platform-icon" />;
      case 'android':
        return <Smartphone size={15} className="platform-icon" />;
      default:
        return <HardDrive size={15} className="platform-icon" />;
    }
  };

  const renderPlatformName = (platforms: ProductItem['platforms']) => {
    if (platforms.includes('windows') && platforms.includes('android')) {
      return 'Windows & Android';
    }
    if (platforms.includes('windows')) {
      return 'Windows 10/11';
    }
    if (platforms.includes('android')) {
      return 'Android APK';
    }
    return 'Multi-Platform';
  };

  return (
    <div className={`product-card-root ${featured ? 'is-featured' : ''}`}>
      <div className="product-card-header">
        <div className="product-category-row">
          <span className="platform-pill">
            {renderPlatformIcon(product.platforms[0])}
            <span>{renderPlatformName(product.platforms)}</span>
          </span>

          <div className="product-badges-group">
            {product.badgeText && (
              <Badge variant="cyan" size="sm" dot>
                {product.badgeText}
              </Badge>
            )}
            <span className="version-tag">{product.version}</span>
          </div>
        </div>

        <h3 className="product-name">{product.name}</h3>
        <p className="product-tagline">{product.tagline}</p>
      </div>

      <p className="product-description">{product.description}</p>

      <div className="product-features-box">
        <span className="features-label">Fitur & Keunggulan Toko:</span>
        <ul className="product-feature-list">
          {product.features.map((feat, idx) => (
            <li key={idx} className="feature-item">
              <CheckCircle2 size={15} className="feature-check-icon" />
              <span className="feature-text">{feat}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="product-specs-bar">
        <div className="spec-metric">
          <span className="spec-metric-label">Ukuran</span>
          <strong className="spec-metric-value">{product.size}</strong>
        </div>
        <div className="spec-metric">
          <span className="spec-metric-label">Arsitektur</span>
          <strong className="spec-metric-value text-brand">{product.architecture}</strong>
        </div>
        <div className="spec-metric">
          <span className="spec-metric-label">Lisensi</span>
          <strong className="spec-metric-value">{product.license}</strong>
        </div>
      </div>

      <div className="product-card-footer">
        <Link href={product.detailUrl} className="card-btn-link">
          <Button variant="secondary" size="md" rightIcon={<ArrowRight size={14} />}>
            {product.detailActionText || 'Lihat Panduan'}
          </Button>
        </Link>

        {product.primaryActionUrl && (
          <Link 
            href={product.primaryActionUrl} 
            className="card-btn-link"
            download={product.primaryActionUrl.endsWith('.exe') || product.primaryActionUrl.endsWith('.apk') ? true : undefined}
          >
            <Button 
              variant="primary" 
              size="md" 
              leftIcon={product.primaryActionUrl.includes('ai-lab') ? <Cpu size={14} /> : <Download size={14} />}
            >
              {product.primaryActionText || 'Unduh'}
            </Button>
          </Link>
        )}
      </div>
    </div>
  );
};
