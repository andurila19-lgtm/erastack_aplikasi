'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { 
  Download, Calendar, 
  CheckCircle2, Zap, ShieldCheck, 
  HelpCircle, ArrowRight, Monitor, Smartphone, 
  RefreshCw, MessageSquare, History, Tag
} from 'lucide-react';
import { SEOHead } from '../components/common/SEOHead';
import { RELEASES_DATA, type PlatformRelease, type ReleaseChangeItem } from '../data/releasesData';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import './ReleasesPage.css';

const FILTER_TYPES = [
  { id: 'all', label: 'Semua Perubahan' },
  { id: 'feature', label: 'Fitur Baru' },
  { id: 'improvement', label: 'Peningkatan Kinerja' },
  { id: 'fix', label: 'Perbaikan Sistem' },
] as const;

export const ReleasesPage: React.FC = () => {
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'feature' | 'improvement' | 'fix'>('all');

  const renderChangeIcon = (type: ReleaseChangeItem['type']) => {
    switch (type) {
      case 'feature':
        return <CheckCircle2 size={16} className="change-icon text-emerald" />;
      case 'improvement':
        return <Zap size={16} className="change-icon text-brand" />;
      case 'fix':
        return <ShieldCheck size={16} className="change-icon text-orange" />;
    }
  };

  const renderChangeTypeBadge = (type: ReleaseChangeItem['type']) => {
    switch (type) {
      case 'feature':
        return <span className="type-tag tag-feature">Fitur Baru</span>;
      case 'improvement':
        return <span className="type-tag tag-improvement">Peningkatan</span>;
      case 'fix':
        return <span className="type-tag tag-fix">Perbaikan</span>;
    }
  };

  return (
    <div className="releases-page-root">
      <SEOHead
        title="Riwayat Rilis & Catatan Pembaruan • ERASTACK POS"
        description="Lihat catatan pembaruan versi resmi ERASTACK POS. Pantau penambahan fitur baru, peningkatan kecepatan scan barcode, dan perbaikan kasir toko Anda."
      />

      <section className="releases-hero-section">
        <div className="container">
          <div className="releases-hero-content">
            <Badge variant="lime" size="sm" dot>Catatan Rilis & Pembaruan Sistem</Badge>
            
            <h1 className="releases-hero-title">
              Riwayat Rilis & <span className="highlight-text">Pembaruan Toko</span>
            </h1>

            <p className="releases-hero-desc">
              Pantau fitur baru, peningkatan kecepatan kasir, dan penyempurnaan sistem yang kami hadirkan secara berkala untuk mendukung kelancaran usaha toko Anda.
            </p>

            <div className="releases-stats-bar">
              <div className="stat-card-pill">
                <Tag size={16} className="text-brand" />
                <div className="stat-text-group">
                  <strong>Versi Terbaru: v1.0.4</strong>
                  <span>Rilis Stabil Resmi</span>
                </div>
              </div>

              <div className="stat-card-pill">
                <RefreshCw size={16} className="text-emerald" />
                <div className="stat-text-group">
                  <strong>Pembaruan Gratis</strong>
                  <span>Bebas Biaya Upgrade</span>
                </div>
              </div>

              <div className="stat-card-pill">
                <ShieldCheck size={16} className="text-purple" />
                <div className="stat-text-group">
                  <strong>Data Toko 100% Aman</strong>
                  <span>Riwayat Tidak Hilang</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="releases-timeline-section">
        <div className="container">
          <div className="filter-nav-wrapper">
            <div className="filter-scroll-row">
              {FILTER_TYPES.map(filter => (
                <button
                  key={filter.id}
                  type="button"
                  className={`filter-chip-btn ${selectedFilter === filter.id ? 'is-active' : ''}`}
                  onClick={() => setSelectedFilter(filter.id as any)}
                >
                  {filter.label}
                </button>
              ))}
            </div>
          </div>

          <div className="releases-cards-stack">
            {RELEASES_DATA.map(release => {
              const visibleChanges = release.changes.filter(c => {
                if (selectedFilter === 'all') return true;
                return c.type === selectedFilter;
              });

              if (visibleChanges.length === 0) return null;

              return (
                <article key={release.version} className={`release-timeline-card ${release.isLatest ? 'is-latest' : ''}`}>
                  <div className="release-card-header">
                    <div className="version-badge-group">
                      <span className="version-number-tag">{release.version}</span>
                      {release.isLatest && (
                        <Badge variant="lime" size="sm" dot>
                          Versi Paling Baru
                        </Badge>
                      )}
                      <span className="channel-chip">{release.channel}</span>
                    </div>

                    <div className="release-date-tag">
                      <Calendar size={13} />
                      <span>{release.releaseDate}</span>
                    </div>
                  </div>

                  <h3 className="release-tagline-title">{release.tagline}</h3>

                  <div className="practical-benefit-banner">
                    <strong className="benefit-label">Manfaat untuk Toko Anda:</strong>
                    <p className="benefit-text">{release.practicalBenefit}</p>
                  </div>

                  <div className="changes-list-box">
                    <h4 className="changes-section-heading">Rincian Pembaruan Sistem:</h4>
                    <div className="changes-items-grid">
                      {visibleChanges.map((change, idx) => (
                        <div key={idx} className="change-item-row">
                          <div className="change-icon-col">
                            {renderChangeIcon(change.type)}
                          </div>
                          <div className="change-content-col">
                            <div className="change-title-row">
                              {renderChangeTypeBadge(change.type)}
                              <strong className="change-title-text">{change.title}</strong>
                            </div>
                            <p className="change-desc-text">{change.description}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="release-download-footer">
                    <span className="footer-label">Unduh Versi Ini:</span>
                    <div className="footer-actions-row">
                      <Link href="/downloads" className="btn-dl-wrap">
                        <Button size="sm" variant="primary" leftIcon={<Monitor size={15} />}>
                          Windows Setup ({release.windowsFileSize})
                        </Button>
                      </Link>
                      <Link href="/downloads" className="btn-dl-wrap">
                        <Button size="sm" variant="secondary" leftIcon={<Smartphone size={15} />}>
                          Android APK ({release.androidFileSize})
                        </Button>
                      </Link>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="update-guide-section">
        <div className="container">
          <div className="update-guide-card">
            <div className="guide-header-center">
              <RefreshCw size={32} className="update-icon" />
              <h2 className="guide-main-heading">Cara Memperbarui Aplikasi Kasir Toko Anda</h2>
              <p className="guide-main-subheading">
                Proses pembaruan sangat mudah dan tidak akan menghapus data produk atau riwayat penjualan toko Anda.
              </p>
            </div>

            <div className="update-steps-grid">
              <div className="step-box">
                <span className="step-num">1</span>
                <strong>Unduh Installer Terbaru</strong>
                <p>Klik tombol unduh untuk Windows atau Android pada versi paling baru di atas.</p>
              </div>

              <div className="step-box">
                <span className="step-num">2</span>
                <strong>Jalankan Installer</strong>
                <p>Buka file unduhan dan klik "Lanjut / Pasang". Anda tidak perlu menghapus aplikasi versi lama.</p>
              </div>

              <div className="step-box">
                <span className="step-num">3</span>
                <strong>Langsung Siap Pakai</strong>
                <p>Buka aplikasi kasir. Seluruh data stok, produk, dan laporan toko tetap tersimpan rapi.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="releases-cta-section">
        <div className="container">
          <div className="releases-cta-box">
            <div className="cta-content-left">
              <h3 className="cta-headline">Ada Pertanyaan Seputar Pembaruan Toko?</h3>
              <p className="cta-subheadline">
                Tim teknis kami siap memandu pembaruan sistem kasir toko Anda secara gratis via WhatsApp.
              </p>
            </div>

            <div className="cta-actions-right">
              <a 
                href="https://wa.me/6281234567890" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="btn-link-full"
              >
                <Button variant="primary" size="lg" leftIcon={<MessageSquare size={18} />}>
                  Konsultasi via WhatsApp
                </Button>
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
