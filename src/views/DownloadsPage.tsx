'use client';

import React, { useState } from 'react';
import { 
  Download, Monitor, Smartphone, Tag, 
  CheckCircle2, ShieldCheck, HelpCircle, 
  ChevronDown, MessageSquare, HardDrive
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
        title="Pusat Unduhan Aplikasi Kasir ERASTACK POS"
        description="Unduh aplikasi kasir pintar ERASTACK POS untuk komputer Windows dan HP Android. Gratis, mudah dipasang, dan langsung siap dipakai jualan tanpa internet."
      />

      <section className="downloads-hero-section">
        <div className="container">
          <div className="downloads-hero-content">
            <Badge variant="lime" size="sm" dot>Pusat Unduhan Resmi • Siap Pakai</Badge>
            
            <h1 className="downloads-hero-title">
              Unduh Aplikasi Kasir <span className="highlight-text">ERASTACK POS</span> untuk Usaha Anda
            </h1>

            <p className="downloads-hero-desc">
              Pilih aplikasi kasir sesuai perangkat yang Anda miliki di toko. Pemasangan sangat mudah dalam 1 menit, langsung siap melayani transaksi pelanggan tanpa perlu koneksi internet.
            </p>

            <div className="downloads-benefit-pills">
              <div className="benefit-pill">
                <CheckCircle2 size={16} className="text-emerald" />
                <span>100% Bebas Biaya Langganan</span>
              </div>
              <div className="benefit-pill">
                <HardDrive size={16} className="text-brand" />
                <span>Bisa Dipakai Tanpa Internet</span>
              </div>
              <div className="benefit-pill">
                <ShieldCheck size={16} className="text-emerald" />
                <span>Aplikasi Resmi & 100% Aman</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="downloads-cards-section">
        <div className="container">
          <div className="section-head-center">
            <h2 className="section-main-title">Pilih Perangkat Kasir Anda</h2>
            <p className="section-main-subtitle">
              Klik tombol unduh di bawah ini sesuai komputer atau smartphone yang Anda gunakan di toko.
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
                        <Badge variant="lime" size="sm" dot>
                          {release.badge}
                        </Badge>
                      )}
                      <span className="dl-version-tag">{release.version}</span>
                    </div>
                    <h3 className="dl-item-title">{release.name}</h3>
                  </div>
                </div>

                <div className="dl-target-device">
                  <span className="target-label">Cocok untuk:</span>
                  <p className="target-value">{release.recommendedFor}</p>
                </div>

                <div className="dl-features-box">
                  <span className="features-head">Keunggulan Aplikasi:</span>
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
                    <span className="meta-label">Ukuran File:</span>
                    <strong className="meta-val">{release.fileSize} (Hemat Kuota)</strong>
                  </div>
                  <div className="meta-item">
                    <span className="meta-label">Waktu Pasang:</span>
                    <strong className="meta-val">&lt; 1 Menit</strong>
                  </div>
                </div>

                <div className="dl-action-area">
                  <a href={release.downloadUrl} download={release.fileName} className="dl-btn-link">
                    <Button variant="primary" size="lg" leftIcon={<Download size={18} />}>
                      Unduh Sekarang ({release.fileSize})
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
            <Badge variant="cyan" size="sm">Panduan Pemasangan</Badge>
            <h2 className="section-main-title">Cara Mudah Memasang Aplikasi Kasir</h2>
            <p className="section-main-subtitle">
              Ikuti petunjuk sederhana berikut untuk mulai mencatat transaksi penjualan di toko Anda.
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
                  <span className="guide-q">Cara Pasang di Komputer / Laptop Kasir (Windows)</span>
                </div>
                <ChevronDown size={18} className={`guide-chevron ${openGuide === 0 ? 'rotate' : ''}`} />
              </button>

              {openGuide === 0 && (
                <div className="guide-body">
                  <ol className="guide-steps-list">
                    <li>Klik tombol <strong>Unduh untuk Komputer Kasir (Windows)</strong> di atas.</li>
                    <li>Buka file installer yang sudah selesai diunduh.</li>
                    <li>Ikuti petunjuk di layar (cukup klik <strong>Lanjut / Next</strong> sampai selesai).</li>
                    <li>Ikon kasir ERASTACK POS akan otomatis muncul di layar desktop komputer Anda.</li>
                    <li>Buka aplikasi, masukkan nama toko Anda, dan kasir langsung siap dipakai jualan!</li>
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
                  <span className="guide-q">Cara Pasang di HP & Tablet Kasir (Android)</span>
                </div>
                <ChevronDown size={18} className={`guide-chevron ${openGuide === 1 ? 'rotate' : ''}`} />
              </button>

              {openGuide === 1 && (
                <div className="guide-body">
                  <ol className="guide-steps-list">
                    <li>Klik tombol <strong>Unduh untuk HP & Tablet (Android)</strong> langsung dari HP Anda.</li>
                    <li>Setelah unduhan selesai, klik notifikasi file unduhan untuk mulai memasang.</li>
                    <li>Jika HP Anda meminta izin pasang aplikasi, centang opsi <strong>Izinkan dari sumber ini</strong>.</li>
                    <li>Tekan tombol <strong>Pasang / Install</strong> dan tunggu beberapa detik.</li>
                    <li>Aplikasi kasir siap digunakan di mana saja.</li>
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
                  <span className="guide-q">Cara Menghubungkan Printer Struk Kasir & Scanner Barcode</span>
                </div>
                <ChevronDown size={18} className={`guide-chevron ${openGuide === 2 ? 'rotate' : ''}`} />
              </button>

              {openGuide === 2 && (
                <div className="guide-body">
                  <ol className="guide-steps-list">
                    <li>Colokkan kabel USB printer struk thermal ke komputer atau nyalakan Bluetooth printer di HP Anda.</li>
                    <li>Buka menu <strong>Pengaturan Printer</strong> di dalam aplikasi kasir ERASTACK POS.</li>
                    <li>Pilih merk printer Anda, lalu klik tombol <strong>Uji Cetak Struk</strong>.</li>
                    <li>Colokkan barcode scanner ke komputer, scanner langsung otomatis bisa membaca barcode produk tanpa setting tambahan.</li>
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
              <MessageSquare size={32} className="help-icon" />
            </div>

            <div className="help-content">
              <h3 className="help-title">Butuh Bantuan Memasang di Toko Anda?</h3>
              <p className="help-desc">
                Tim teknis kami siap memandu pemasangan aplikasi kasir, printer thermal, dan scanner barcode toko Anda secara gratis sampai lancar digunakan.
              </p>
            </div>

            <div className="help-actions">
              <a href="https://wa.me/6281234567890" target="_blank" rel="noopener noreferrer" className="btn-wrap-full">
                <Button variant="accent" size="lg">
                  Konsultasi Gratis via WhatsApp
                </Button>
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
