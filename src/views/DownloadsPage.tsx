'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  Download, Monitor, Smartphone, Tag, 
  CheckCircle2, ShieldCheck, HelpCircle, 
  ChevronDown, BookOpen, HardDrive, Database
} from 'lucide-react';
import { SEOHead } from '../components/common/SEOHead';
import { DOWNLOAD_RELEASES } from '../data/downloadsData';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import './DownloadsPage.css';

export const DownloadsPage: React.FC = () => {
  const [openGuide, setOpenGuide] = useState<number | null>(0);

  return (
    <div className="downloads-page-root">
      <SEOHead
        title="Pusat Unduhan Resmi • ERASTACK POS"
        description="Unduh paket biner installer resmi ERASTACK POS untuk Windows Desktop (.exe) dan Android (.apk). Database SQLite lokal mandiri tanpa ketergantungan internet."
      />

      <section className="downloads-hero-section">
        <div className="container">
          <div className="downloads-hero-content">
            <Badge variant="cyan" size="sm" dot>Pusat Unduhan Resmi</Badge>
            
            <h1 className="downloads-hero-title">
              Unduh Paket Biner Resmi <span className="highlight-text">ERASTACK POS</span>
            </h1>

            <p className="downloads-hero-desc">
              Pilih paket biner sesuai sistem operasi perangkat kasir Anda. Seluruh file biner resmi telah diverifikasi dengan checksum integritas data.
            </p>

            <div className="downloads-benefit-pills">
              <div className="benefit-pill">
                <HardDrive size={16} className="text-brand" />
                <span>Operasi Mandiri Offline</span>
              </div>
              <div className="benefit-pill">
                <Database size={16} className="text-emerald" />
                <span>Penyimpanan SQLite Lokal</span>
              </div>
              <div className="benefit-pill">
                <ShieldCheck size={16} className="text-purple" />
                <span>Biner Terverifikasi Kriptografis</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="downloads-cards-section">
        <div className="container">
          <div className="section-head-center">
            <h2 className="section-main-title">Pilih Paket Sistem Operasi</h2>
            <p className="section-main-subtitle">
              Tersedia untuk sistem operasi Windows desktop dan perangkat mobile Android.
            </p>
          </div>

          <div className="download-main-grid">
            {DOWNLOAD_RELEASES.map(release => (
              <div key={release.id} className="user-dl-card">
                <div className="dl-card-top">
                  <div className="dl-icon-wrap">
                    {release.platform === 'windows' && <Monitor size={26} className="text-brand" />}
                    {release.platform === 'android' && <Smartphone size={26} className="text-emerald" />}
                    {release.platform === 'utilities' && <Tag size={26} className="text-purple" />}
                  </div>

                  <div className="dl-title-wrap">
                    <div className="dl-badge-row">
                      {release.badge && (
                        <Badge variant="cyan" size="sm" dot>
                          {release.badge}
                        </Badge>
                      )}
                      <span className="dl-version-tag">{release.version}</span>
                    </div>
                    <h3 className="dl-item-title">{release.name}</h3>
                  </div>
                </div>

                <div className="dl-target-device">
                  <span className="target-label">Target Perangkat:</span>
                  <p className="target-value">{release.recommendedFor}</p>
                </div>

                <div className="dl-features-box">
                  <span className="features-head">Karakteristik Modul:</span>
                  <ul className="dl-feature-list">
                    {release.features.map((feat, idx) => (
                      <li key={idx} className="dl-feature-item">
                        <CheckCircle2 size={15} className="feat-check" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="dl-meta-info-row">
                  <div className="meta-item">
                    <span className="meta-label">Ukuran Biner:</span>
                    <strong className="meta-val">{release.fileSize}</strong>
                  </div>
                  <div className="meta-item">
                    <span className="meta-label">Target OS:</span>
                    <strong className="meta-val">{release.platform === 'windows' ? 'Windows 10/11' : 'Android 8.0+'}</strong>
                  </div>
                </div>

                <div className="dl-action-area">
                  <a href={release.downloadUrl} download={release.fileName} className="dl-btn-link">
                    <Button variant="primary" size="lg" leftIcon={<Download size={18} />}>
                      Unduh Paket ({release.fileSize})
                    </Button>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="installation-guide-section">
        <div className="container">
          <div className="section-head-center">
            <Badge variant="cyan" size="sm">Panduan Instalasi</Badge>
            <h2 className="section-main-title">Petunjuk Pemasangan Paket</h2>
            <p className="section-main-subtitle">
              Langkah-langkah instalasi aplikasi kasir pada perangkat kasir Anda.
            </p>
          </div>

          <div className="guides-accordion-wrap">
            <div className={`guide-card ${openGuide === 0 ? 'is-open' : ''}`}>
              <button
                type="button"
                className="guide-head-btn"
                onClick={() => setOpenGuide(openGuide === 0 ? null : 0)}
              >
                <div className="guide-title-left">
                  <Monitor size={20} className="text-brand" />
                  <span className="guide-q">Instalasi pada Windows Desktop (.exe)</span>
                </div>
                <ChevronDown size={18} className={`guide-chevron ${openGuide === 0 ? 'rotate' : ''}`} />
              </button>

              {openGuide === 0 && (
                <div className="guide-body">
                  <ol className="guide-steps-list">
                    <li>Unduh file installer Windows (.exe) pada kartu unduhan di atas.</li>
                    <li>Jalankan file installer yang telah selesai diunduh.</li>
                    <li>Ikuti panduan wizard instalasi hingga selesai.</li>
                    <li>Shortcut aplikasi EraStack POS akan terpasang di desktop komputer Anda.</li>
                    <li>Buka aplikasi untuk menginisialisasi database SQLite lokal pertama kali.</li>
                  </ol>
                </div>
              )}
            </div>

            <div className={`guide-card ${openGuide === 1 ? 'is-open' : ''}`}>
              <button
                type="button"
                className="guide-head-btn"
                onClick={() => setOpenGuide(openGuide === 1 ? null : 1)}
              >
                <div className="guide-title-left">
                  <Smartphone size={20} className="text-emerald" />
                  <span className="guide-q">Instalasi pada Android Mobile (.apk)</span>
                </div>
                <ChevronDown size={18} className={`guide-chevron ${openGuide === 1 ? 'rotate' : ''}`} />
              </button>

              {openGuide === 1 && (
                <div className="guide-body">
                  <ol className="guide-steps-list">
                    <li>Unduh paket APK langsung dari peramban web pada perangkat Android Anda.</li>
                    <li>Buka berkas unduhan dan izinkan instalasi dari sumber browser jika diminta sistem keamanan Android.</li>
                    <li>Pilih opsi Pasang / Install dan tunggu proses instalasi selesai.</li>
                    <li>Aplikasi siap digunakan untuk transaksi kasir lokal.</li>
                  </ol>
                </div>
              )}
            </div>

            <div className={`guide-card ${openGuide === 2 ? 'is-open' : ''}`}>
              <button
                type="button"
                className="guide-head-btn"
                onClick={() => setOpenGuide(openGuide === 2 ? null : 2)}
              >
                <div className="guide-title-left">
                  <HelpCircle size={20} className="text-purple" />
                  <span className="guide-q">Koneksi Printer Thermal ESC/POS & Barcode Scanner</span>
                </div>
                <ChevronDown size={18} className={`guide-chevron ${openGuide === 2 ? 'rotate' : ''}`} />
              </button>

              {openGuide === 2 && (
                <div className="guide-body">
                  <ol className="guide-steps-list">
                    <li>Hubungkan printer thermal USB ke port komputer atau sambungkan via Bluetooth pada perangkat Android.</li>
                    <li>Buka menu Pengaturan Hardware di dalam aplikasi kasir EraStack.</li>
                    <li>Pilih tipe port dan lakukan Uji Cetak (Test Print).</li>
                    <li>Hubungkan barcode scanner USB, perangkat akan langsung dikenali sebagai keyboard input standar (HID).</li>
                  </ol>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      <section className="store-help-section">
        <div className="container">
          <div className="store-help-card">
            <div className="help-icon-wrap">
              <BookOpen size={32} className="help-icon" />
            </div>

            <div className="help-content">
              <h3 className="help-title">Dokumentasi & Panduan Lengkap</h3>
              <p className="help-desc">
                Pelajari dokumentasi teknis arsitektur, konfigurasi hardware ESC/POS, skema database SQLite, dan panduan penggunaan kasir.
              </p>
            </div>

            <div className="help-actions">
              <Link href="/docs" className="btn-wrap-full">
                <Button variant="accent" size="lg">
                  Buka Dokumentasi Teknis
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
