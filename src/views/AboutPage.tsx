'use client';

import React from 'react';
import Link from 'next/link';
import { 
  ShieldCheck, HardDrive, Database, 
  Cpu, Zap, ArrowRight, Play, CheckCircle2, Code2, Server
} from 'lucide-react';
import { SEOHead } from '../components/common/SEOHead';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import './AboutPage.css';

export const AboutPage: React.FC = () => {
  return (
    <div className="about-page-root">
      <SEOHead
        title="Tentang ERASTACK • Rekayasa Software POS Offline-First"
        description="Pelajari filosofi rekayasa, prinsip arsitektur data lokal, dan komitmen EraStack dalam membangun platform POS mandiri kelas produksi."
      />

      <section className="about-hero-section">
        <div className="container">
          <div className="about-hero-content">
            <Badge variant="cyan" size="sm" dot>Arsitektur & Filosofi Rekayasa</Badge>
            
            <h1 className="about-hero-title">
              Membangun Perangkat Lunak POS dengan <span className="highlight-text">Kedaulatan Data Lokal</span>
            </h1>

            <p className="about-hero-desc">
              EraStack dikembangkan dengan keyakinan bahwa operasi transaksi bisnis harian tidak seharusnya lumpuh ketika jaringan internet terganggu atau server pihak ketiga mengalami downtime.
            </p>

            <div className="about-stats-pills">
              <div className="about-stat-box">
                <strong className="stat-big-number">Offline-First</strong>
                <span className="stat-sub-label">Arsitektur Operasional Primer</span>
              </div>
              <div className="about-stat-box">
                <strong className="stat-big-number">SQLite WAL</strong>
                <span className="stat-sub-label">Penyimpanan Terstruktur Lokal</span>
              </div>
              <div className="about-stat-box">
                <strong className="stat-big-number">Active Dev</strong>
                <span className="stat-sub-label">Tahap Pengembangan Aktif</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="about-values-section" id="principles">
        <div className="container">
          <div className="section-head-center">
            <Badge variant="lime" size="sm">Prinsip Rekayasa</Badge>
            <h2 className="section-main-title">4 Pilar Arsitektur EraStack</h2>
            <p className="section-main-subtitle">
              Aturan non-kompromis yang mendasari setiap baris kode di dalam ekosistem EraStack.
            </p>
          </div>

          <div className="values-grid">
            <div className="value-card">
              <div className="value-icon-box blue">
                <HardDrive size={24} />
              </div>
              <h3 className="value-title">1. Offline-First Mandate</h3>
              <p className="value-desc">
                Operasi kasir, mutasi stok, pencetakan nota, dan pencarian produk dieksekusi secara lokal tanpa bergantung pada ketersediaan koneksi internet eksternal.
              </p>
              <ul className="value-check-list">
                <li><CheckCircle2 size={15} className="text-emerald" /> Transaksi tetap berjalan saat jaringan putus</li>
                <li><CheckCircle2 size={15} className="text-emerald" /> Database SQLite lokal sebagai sumber kebenaran</li>
              </ul>
            </div>

            <div className="value-card">
              <div className="value-icon-box green">
                <Database size={24} />
              </div>
              <h3 className="value-title">2. Kedaulatan & Kepemilikan Data</h3>
              <p className="value-desc">
                Seluruh data transaksi dan stok tersimpan di media penyimpanan lokal pengguna. Pemilik bisnis memiliki kendali penuh atas file database tanpa vendor lock-in.
              </p>
              <ul className="value-check-list">
                <li><CheckCircle2 size={15} className="text-emerald" /> Ekspor/impor database mandiri (.sqlite)</li>
                <li><CheckCircle2 size={15} className="text-emerald" /> Tidak ada penguncian data di cloud tertutup</li>
              </ul>
            </div>

            <div className="value-card">
              <div className="value-icon-box purple">
                <Cpu size={24} />
              </div>
              <h3 className="value-title">3. Controlled Local AI</h3>
              <p className="value-desc">
                Pemrosesan kecerdasan buatan dijalankan secara lokal di perangkat melalui dispatcher tool terkontrol (whitelist functions) tanpa raw SQL query bebas.
              </p>
              <ul className="value-check-list">
                <li><CheckCircle2 size={15} className="text-emerald" /> Analisis data tanpa biaya API eksternal</li>
                <li><CheckCircle2 size={15} className="text-emerald" /> Privasi data operasional tetap terjaga</li>
              </ul>
            </div>

            <div className="value-card">
              <div className="value-icon-box blue">
                <Zap size={24} />
              </div>
              <h3 className="value-title">4. Zero-Bloat Performance</h3>
              <p className="value-desc">
                Menolak pustaka berlebih yang membebani memori. Aplikasi didesain ringan agar responsif digunakan pada perangkat kasir standar hingga spesifikasi menengah.
              </p>
              <ul className="value-check-list">
                <li><CheckCircle2 size={15} className="text-emerald" /> Antarmuka responsif tanpa lag DOM</li>
                <li><CheckCircle2 size={15} className="text-emerald" /> Optimal untuk Windows desktop & Android</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="about-story-section">
        <div className="container">
          <div className="story-content-card">
            <div className="story-left-col">
              <Badge variant="cyan" size="sm">Status Proyek</Badge>
              <h2 className="story-heading">Status Pengembangan Saat Ini</h2>
              <p className="story-paragraph">
                EraStack saat ini berada dalam tahap <strong>Active Development</strong>. Modul inti transaksi POS kasir, katalog produk, kalkulasi diskon, dan manajemen stok lokal telah beroperasi secara penuh.
              </p>
              <p className="story-paragraph">
                Pengembangan fitur lanjutan seperti sinkronisasi antar perangkat asinkron dan modul laporan mendalam terus disempurnakan sesuai kaidah rekayasa perangkat lunak modern.
              </p>
            </div>

            <div className="story-right-col">
              <div className="story-highlight-box">
                <Code2 size={32} className="highlight-icon" />
                <h4 className="highlight-title">Open Architecture Standards</h4>
                <p className="highlight-desc">
                  Menerapkan standar arsitektur bersih dengan TypeScript strict mode, SQLite schema versioning, dan pemisahan lapisan core, database, dan antarmuka UI.
                </p>
                <div className="highlight-badge-row">
                  <span className="h-badge">TypeScript Strict</span>
                  <span className="h-badge">SQLite WAL</span>
                  <span className="h-badge">ESC/POS Protocol</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="about-cta-section">
        <div className="container">
          <div className="about-cta-card">
            <div className="cta-content-group">
              <h2 className="cta-big-title">Eksplorasi Antarmuka Kasir EraStack</h2>
              <p className="cta-sub-title">
                Buka terminal kasir interaktif untuk mencoba alur transaksi langsung di peramban Anda.
              </p>
            </div>

            <div className="cta-buttons-row">
              <Link href="/pos" className="btn-full-wrap">
                <Button size="lg" variant="primary" leftIcon={<Play size={18} />}>
                  Coba Demo Kasir Web
                </Button>
              </Link>
              <Link href="/docs" className="btn-full-wrap">
                <Button size="lg" variant="secondary" rightIcon={<ArrowRight size={16} />}>
                  Dokumentasi Teknis
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
