'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { 
  Store, CheckCircle2, ArrowRight, Play,
  Coffee, ShoppingCart, Scissors, 
  Shirt, Wrench, HardDrive, Database, Cpu
} from 'lucide-react';
import { SEOHead } from '../components/common/SEOHead';
import { USE_CASES, type UseCaseItem } from '../data/projectsData';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import './ProjectsPage.css';

const CATEGORIES = [
  'Semua Industri',
  'Kafe & Kuliner',
  'Minimarket & Retail',
  'Jasa & Barbershop',
  'Fashion & Butik',
  'Bengkel & Servis',
] as const;

export const ProjectsPage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('Semua Industri');

  const filteredUseCases = useMemo(() => {
    if (selectedCategory === 'Semua Industri') {
      return USE_CASES;
    }
    return USE_CASES.filter(item => item.category === selectedCategory);
  }, [selectedCategory]);

  const renderCategoryIcon = (category: string) => {
    switch (category) {
      case 'Kafe & Kuliner':
        return <Coffee size={14} className="cat-icon" />;
      case 'Minimarket & Retail':
        return <ShoppingCart size={14} className="cat-icon" />;
      case 'Jasa & Barbershop':
        return <Scissors size={14} className="cat-icon" />;
      case 'Fashion & Butik':
        return <Shirt size={14} className="cat-icon" />;
      case 'Bengkel & Servis':
        return <Wrench size={14} className="cat-icon" />;
      default:
        return <Store size={14} className="cat-icon" />;
    }
  };

  return (
    <div className="projects-page-root">
      <SEOHead
        title="Solusi Industri & Skenario Penggunaan • ERASTACK POS"
        description="Pelajari bagaimana arsitektur offline-first ERASTACK POS dirancang untuk menyelesaikan kebutuhan operasional kafe, minimarket, distro, bengkel, dan industri jasa."
      />

      <section className="projects-hero-section">
        <div className="container">
          <div className="projects-hero-content">
            <Badge variant="cyan" size="sm" dot>Solusi & Skenario Industri</Badge>
            
            <h1 className="projects-hero-title">
              Dirancang untuk Karakteristik <span className="highlight-text">Operasional Nyata</span>
            </h1>

            <p className="projects-hero-desc">
              Setiap industri bisnis memiliki alur transaksi dan kebutuhan kasir yang unik. Pelajari bagaimana sistem EraStack memetakan fitur ke setiap skenario bisnis.
            </p>

            <div className="projects-stats-bar">
              <div className="stat-pill">
                <HardDrive size={16} className="text-brand" />
                <div className="stat-text">
                  <strong>100% Offline Engine</strong>
                  <span>Operasi kasir mandiri tanpa internet</span>
                </div>
              </div>

              <div className="stat-pill">
                <Database size={16} className="text-emerald" />
                <div className="stat-text">
                  <strong>SQLite Local Persistence</strong>
                  <span>Kedaulatan data di perangkat sendiri</span>
                </div>
              </div>

              <div className="stat-pill">
                <Cpu size={16} className="text-purple" />
                <div className="stat-text">
                  <strong>Hardware Standards</strong>
                  <span>Integrasi printer thermal & barcode</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="projects-directory-section">
        <div className="container">
          <div className="category-scroll-wrapper">
            <div className="category-filter-nav">
              {CATEGORIES.map(cat => (
                <button
                  key={cat}
                  type="button"
                  className={`cat-pill-btn ${selectedCategory === cat ? 'is-active' : ''}`}
                  onClick={() => setSelectedCategory(cat)}
                >
                  {cat !== 'Semua Industri' && renderCategoryIcon(cat)}
                  <span>{cat}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="studies-grid">
            {filteredUseCases.map(useCase => (
              <article key={useCase.id} className="study-card">
                <div className="study-card-header">
                  <div className="study-tag-row">
                    <span className="industry-chip">
                      {renderCategoryIcon(useCase.category)}
                      <span>{useCase.category}</span>
                    </span>
                  </div>

                  <div className="growth-metric-badge">
                    <span>{useCase.badgeText}</span>
                  </div>
                </div>

                <div className="study-store-info">
                  <h3 className="store-name-title">{useCase.title}</h3>
                  <p className="target-profile-desc">{useCase.targetProfile}</p>
                </div>

                <div className="story-comparison-box">
                  <div className="story-part challenge">
                    <span className="story-part-label text-error">Tantangan Operasional:</span>
                    <ul className="usecase-point-list">
                      {useCase.operationalChallenges.map((ch, i) => (
                        <li key={i}>{ch}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="story-part solution">
                    <span className="story-part-label text-success">Pendekatan Solusi EraStack:</span>
                    <ul className="usecase-point-list">
                      {useCase.systemSolutions.map((sol, i) => (
                        <li key={i}>{sol}</li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="features-used-box">
                  <span className="features-box-label">Modul Sistem Terkait:</span>
                  <div className="features-pill-list">
                    {useCase.relevantFeatures.map((feat, idx) => (
                      <span key={idx} className="feat-chip">
                        <CheckCircle2 size={12} className="feat-chip-icon" />
                        <span>{feat}</span>
                      </span>
                    ))}
                  </div>
                </div>

                <div className="hardware-setup-box">
                  <span className="hardware-box-label">Rekomendasi Hardware:</span>
                  <p className="hardware-setup-text">{useCase.hardwareSetup}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="projects-cta-section">
        <div className="container">
          <div className="projects-cta-card">
            <div className="cta-head-wrap">
              <Store size={44} className="cta-icon-white" />
              <h2 className="cta-title-main">
                Uji Coba EraStack POS di Lingkungan Bisnis Anda
              </h2>
              <p className="cta-desc-main">
                Coba antarmuka kasir langsung melalui browser web atau unduh aplikasi desktop/mobile resmi.
              </p>
            </div>

            <div className="cta-actions-group">
              <Link href="/pos" className="btn-wrap-full">
                <Button size="lg" variant="primary" leftIcon={<Play size={18} />}>
                  Coba Demo Kasir Web
                </Button>
              </Link>
              <Link href="/downloads" className="btn-wrap-full">
                <Button size="lg" variant="secondary" rightIcon={<ArrowRight size={16} />}>
                  Lihat Halaman Unduhan
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
