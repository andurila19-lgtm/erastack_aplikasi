'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { 
  Store, MapPin, CheckCircle2, TrendingUp, 
  Quote, Download, MessageSquare, ArrowRight, 
  Coffee, ShoppingCart, Utensils, Scissors, 
  Shirt, Wrench, ShieldCheck, Users
} from 'lucide-react';
import { SEOHead } from '../components/common/SEOHead';
import { CASE_STUDIES, type CaseStudyItem } from '../data/projectsData';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import './ProjectsPage.css';

const CATEGORIES = [
  'Semua Industri',
  'Kafe & Kuliner',
  'Minimarket & Retail',
  'Restoran & Meja',
  'Jasa & Barbershop',
  'Fashion & Butik',
  'Bengkel & Servis',
] as const;

export const ProjectsPage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('Semua Industri');

  const filteredStudies = useMemo(() => {
    if (selectedCategory === 'Semua Industri') {
      return CASE_STUDIES;
    }
    return CASE_STUDIES.filter(item => item.category === selectedCategory);
  }, [selectedCategory]);

  const renderCategoryIcon = (category: string) => {
    switch (category) {
      case 'Kafe & Kuliner':
        return <Coffee size={14} className="cat-icon" />;
      case 'Minimarket & Retail':
        return <ShoppingCart size={14} className="cat-icon" />;
      case 'Restoran & Meja':
        return <Utensils size={14} className="cat-icon" />;
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
        title="Studi Kasus & Kisah Sukses Toko Nyata • ERASTACK POS"
        description="Pelajari kisah sukses pengusaha kafe, minimarket, restoran, butik, dan bengkel di seluruh Indonesia yang meningkatkan omset dan kelancaran kasir bersama ERASTACK POS."
      />

      <section className="projects-hero-section">
        <div className="container">
          <div className="projects-hero-content">
            <Badge variant="lime" size="sm" dot>Kisah Sukses Pengusaha Nyata</Badge>
            
            <h1 className="projects-hero-title">
              Kisah Nyata Bisnis & UMKM yang <span className="highlight-text">Sukses Berkembang</span>
            </h1>

            <p className="projects-hero-desc">
              Lihat bagaimana berbagai usaha nyata di seluruh penjuru nusantara menghilangkan antrean kasir, merapikan pembukuan stok, dan menghemat biaya operasional bersama ERASTACK POS.
            </p>

            <div className="projects-stats-bar">
              <div className="stat-pill">
                <Users size={16} className="text-brand" />
                <div className="stat-text">
                  <strong>1.200+ Toko Aktif</strong>
                  <span>Tersebar di 34 Provinsi</span>
                </div>
              </div>

              <div className="stat-pill">
                <ShieldCheck size={16} className="text-emerald" />
                <div className="stat-text">
                  <strong>0 Transaksi Hilang</strong>
                  <span>100% Aman Tanpa Internet</span>
                </div>
              </div>

              <div className="stat-pill">
                <TrendingUp size={16} className="text-purple" />
                <div className="stat-text">
                  <strong>+35% Rata-rata Omset</strong>
                  <span>Pelayanan Kasir Cepat</span>
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
            {filteredStudies.map(study => (
              <article key={study.id} className="study-card">
                <div className="study-card-header">
                  <div className="study-tag-row">
                    <span className="industry-chip">
                      {renderCategoryIcon(study.category)}
                      <span>{study.category}</span>
                    </span>
                    <span className="location-chip">
                      <MapPin size={12} />
                      <span>{study.location}</span>
                    </span>
                  </div>

                  <div className="growth-metric-badge">
                    <TrendingUp size={14} className="growth-icon" />
                    <span>{study.highlightMetric}</span>
                  </div>
                </div>

                <div className="study-store-info">
                  <h3 className="store-name-title">{study.storeName}</h3>
                  <span className="store-branches-tag">{study.branches}</span>
                </div>

                <div className="story-comparison-box">
                  <div className="story-part challenge">
                    <span className="story-part-label text-error">Kendala Sebelumnya:</span>
                    <p className="story-part-text">{study.challenge}</p>
                  </div>

                  <div className="story-part solution">
                    <span className="story-part-label text-success">Solusi ERASTACK POS:</span>
                    <p className="story-part-text">{study.solution}</p>
                  </div>
                </div>

                <div className="results-metrics-row">
                  {study.results.map((res, idx) => (
                    <div key={idx} className="result-metric-item">
                      <strong className="res-val">{res.val}</strong>
                      <span className="res-lbl">{res.label}</span>
                    </div>
                  ))}
                </div>

                <div className="features-used-box">
                  <span className="features-box-label">Fitur yang Digunakan:</span>
                  <div className="features-pill-list">
                    {study.featuresUsed.map((feat, idx) => (
                      <span key={idx} className="feat-chip">
                        <CheckCircle2 size={12} className="feat-chip-icon" />
                        <span>{feat}</span>
                      </span>
                    ))}
                  </div>
                </div>

                <div className="owner-quote-card">
                  <Quote size={18} className="quote-icon" />
                  <p className="quote-text">"{study.ownerQuote}"</p>
                  <div className="quote-author-row">
                    <div className="author-avatar-dot">{study.ownerName.charAt(0)}</div>
                    <div className="author-name-group">
                      <strong className="author-name">{study.ownerName}</strong>
                      <span className="author-role">{study.ownerRole} • {study.storeName}</span>
                    </div>
                  </div>
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
                Siap Membuat Kasir Toko Anda Selancar Bisnis di Atas?
              </h2>
              <p className="cta-desc-main">
                Tinggalkan pencatatan manual dan kekhawatiran internet mati. Unduh aplikasi kasir ERASTACK POS secara gratis hari ini.
              </p>
            </div>

            <div className="cta-actions-group">
              <Link href="/downloads" className="btn-wrap-full">
                <Button size="lg" variant="primary" leftIcon={<Download size={18} />}>
                  Unduh ERASTACK POS Gratis
                </Button>
              </Link>
              <a 
                href="https://wa.me/6281234567890" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="btn-wrap-full"
              >
                <Button size="lg" variant="secondary" leftIcon={<MessageSquare size={18} />}>
                  Konsultasi Toko via WhatsApp
                </Button>
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
