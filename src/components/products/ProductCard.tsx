import React from 'react';
import Link from 'next/link';
import { 
  Monitor, Smartphone, Terminal, HardDrive, 
  ArrowRight, Download, CheckCircle2, ShieldCheck, 
  Tag
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
              <Badge variant="lime" size="sm" dot>
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
              <CheckCircle2 size={14} className="feature-check-icon" />
              <span>{feat}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="product-specs-bar">
        <div className="spec-metric">
          <span className="spec-metric-label">Ukuran:</span>
          <span className="spec-metric-value">{product.size}</span>
        </div>
        <div className="spec-metric">
          <span className="spec-metric-label">Arsitektur:</span>
          <span className="spec-metric-value text-emerald">{product.architecture}</span>
        </div>
        <div className="spec-metric">
          <span className="spec-metric-label">Lisensi:</span>
          <span className="spec-metric-value">{product.license}</span>
        </div>
      </div>

      <div className="product-card-footer">
        <Link href={product.detailUrl} className="btn-detail-link">
          <Button variant="secondary" size="md" rightIcon={<ArrowRight size={15} />}>
            Lihat Keunggulan
          </Button>
        </Link>

        {product.primaryActionUrl && (
          <Link href={product.primaryActionUrl} className="btn-download-link">
            <Button variant="primary" size="md" leftIcon={<Download size={15} />}>
              {product.primaryActionText || 'Unduh'}
            </Button>
          </Link>
        )}
      </div>
    </div>
  );
};
