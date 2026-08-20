'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  Monitor, Smartphone, Download, CheckCircle2, 
  ShieldCheck, Database, Cpu, Printer, 
  Zap, ArrowRight, HardDrive, 
  Copy, Check, ChevronRight, BarChart3, Lock, Store, ShoppingBag
} from 'lucide-react';
import { SEOHead } from '../components/common/SEOHead';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import './ProductDetailPage.css';

interface SpecItem {
  param: string;
  value: string;
  detail: string;
}

const POS_SPECS: SpecItem[] = [
  { param: 'Kebutuhan Internet', value: '100% Bebas Kuota (Offline Total)', detail: 'Transaksi kasir dan cetak struk nota tetap jalan lancar tanpa koneksi internet' },
  { param: 'Penyimpanan Data Toko', value: 'Memori Komputer/HP Sendiri', detail: 'Catatan keuangan dan stok barang tersimpan aman 100% milik Anda' },
  { param: 'Biaya Pemakaian', value: 'Gratis Rp 0 Selamanya', detail: 'Bebas biaya langganan bulanan dan tanpa potongan komisi penjualan' },
  { param: 'Dukungan Printer Struk', value: 'Universal (USB, Bluetooth, LAN)', detail: 'Langsung colok printer thermal kasir 58mm & 80mm tanpa instal driver rumit' },
  { param: 'Dukungan Barcode Scanner', value: 'Semua Scanner USB & Wireless', detail: 'Deteksi barcode barang secepat kilat untuk mempercepat antrean pembeli' },
  { param: 'Proteksi Mati Lampu', value: '100% Aman & Terlindungi', detail: 'Data transaksi yang sedang dicatat tidak akan rusak saat listrik padam mendadak' },
  { param: 'Perangkat yang Didukung', value: 'Windows 10 / 11 & Android 8.0+', detail: 'Bisa dipasang di komputer kasir, laptop toko, maupun HP/tablet Android' },
  { param: 'Keamanan Aplikasi', value: '100% Resmi & Bebas Iklan', detail: 'Bebas virus, bebas iklan pop-up, dan hemat baterai serta memori' },
];

export const ProductDetailPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'pos' | 'sqlite' | 'ai' | 'hardware'>('pos');

  const [aiPrompt, setAiPrompt] = useState('Berapa ringkasan penjualan dan laba kotor hari ini?');
  const [aiResult, setAiResult] = useState<{
    latency: string;
    summary: string;
    metrics: { label: string; val: string }[];
  }>({
    latency: 'Instan (0.04 Detik)',
    summary: 'Total transaksi hari ini tercatat 142 nota dengan omset kotor Rp 4.850.000. Laba bersih terestimasi Rp 1.455.000 (Margin 30.0%). Produk paling laris: Paket Kopi Susu Aren (48 cup).',
    metrics: [
      { label: 'Total Transaksi', val: '142 Nota' },
      { label: 'Total Omset', val: 'Rp 4.850.000' },
      { label: 'Laba Bersih', val: 'Rp 1.455.000' },
      { label: 'Biaya Kuota API', val: 'Rp 0 (Gratis)' },
    ],
  });

  const handleRunAiSample = (prompt: string, summary: string, metrics: { label: string; val: string }[]) => {
    setAiPrompt(prompt);
    setAiResult({
      latency: 'Instan (0.04 Detik)',
      summary,
      metrics,
    });
  };

  return (
    <div className="product-detail-page-root">
      <SEOHead
        title="ERASTACK POS — Aplikasi Kasir Offline & Asisten Toko Cerdas"
        description="Aplikasi kasir pintar 100% offline-first untuk Windows & Android: Ringan, cepat, langsung colok printer thermal, dan gratis digunakan selamanya tanpa biaya langganan."
      />

      <div className="detail-breadcrumb-bar">
        <div className="container">
          <nav className="breadcrumb-nav" aria-label="Breadcrumb">
            <Link href="/" className="breadcrumb-link">Beranda</Link>
            <ChevronRight size={13} className="breadcrumb-sep" />
            <Link href="/products" className="breadcrumb-link">Produk Kasir</Link>
            <ChevronRight size={13} className="breadcrumb-sep" />
            <span className="breadcrumb-curr">ERASTACK POS</span>
          </nav>
        </div>
      </div>

      <section className="detail-hero-section">
        <div className="container">
          <div className="detail-hero-grid">
            <div className="detail-hero-info">
              <div className="detail-badges-row">
                <Badge variant="lime" size="sm" dot>Aplikasi Kasir Unggulan</Badge>
                <span className="version-pill-tag">v1.0.4 Stabil</span>
                <span className="rating-pill-tag">★ 4.9 (25.000+ Toko Aktif)</span>
              </div>

              <h1 className="detail-product-title">
                ERASTACK POS: Aplikasi Kasir Cerdas <span className="highlight-text">Bebas Kuota</span> & Mandiri
              </h1>

              <p className="detail-product-desc">
                Dirancang khusus untuk pengusaha toko di Indonesia yang membutuhkan sistem kasir berkecepatan tinggi tanpa kompromi. Beroperasi 100% mandiri di perangkat kasir Anda tanpa bergantung pada koneksi internet dan tanpa biaya sewa bulanan.
              </p>

              <div className="detail-os-platforms-row">
                <div className="os-badge-card">
                  <Monitor size={18} className="os-card-icon" />
                  <div className="os-card-text">
                    <strong>Komputer & Laptop Kasir</strong>
                    <span>Windows 10 / 11 (64-bit)</span>
                  </div>
                </div>
                <div className="os-badge-card">
                  <Smartphone size={18} className="os-card-icon" />
                  <div className="os-card-text">
                    <strong>HP & Tablet Kasir</strong>
                    <span>Android 8.0 hingga 15+</span>
                  </div>
                </div>
              </div>

              <div className="detail-actions-row">
                <Link href="/downloads" className="btn-wrap-full">
                  <Button size="lg" variant="primary" leftIcon={<Download size={18} />}>
                    Unduh Aplikasi Kasir Gratis (v1.0.4)
                  </Button>
                </Link>
                <a href="#fitur-kasir" className="btn-wrap-full">
                  <Button size="lg" variant="secondary" rightIcon={<ArrowRight size={16} />}>
                    Lihat Keunggulan Toko
                  </Button>
                </a>
              </div>

              <div className="detail-trust-points">
                <span className="trust-item">
                  <CheckCircle2 size={15} className="trust-icon" />
                  <span>100% Bisa Dipakai Tanpa Internet</span>
                </span>
                <span className="trust-item">
                  <CheckCircle2 size={15} className="trust-icon" />
                  <span>Gratis Selamanya Tanpa Biaya Sewa</span>
                </span>
                <span className="trust-item">
                  <CheckCircle2 size={15} className="trust-icon" />
                  <span>Asisten AI Toko Tanpa Kuota</span>
                </span>
              </div>
            </div>

            <div className="detail-hero-stats-panel">
              <div className="stats-glass-card">
                <div className="stats-header">
                  <h3 className="stats-title">Ringkasan Keunggulan Toko</h3>
                  <span className="stats-status-tag">Terverifikasi 100%</span>
                </div>

                <div className="stats-metrics-list">
                  <div className="metric-row">
                    <div className="metric-info">
                      <span className="metric-name">Kecepatan Scan Barcode</span>
                      <span className="metric-sub">Pencarian 50.000 barang instan</span>
                    </div>
                    <span className="metric-badge green">&lt; 2 ms (Instan)</span>
                  </div>

                  <div className="metric-row">
                    <div className="metric-info">
                      <span className="metric-name">Kecepatan Cetak Struk Struk</span>
                      <span className="metric-sub">Langsung keluar tanpa jeda</span>
                    </div>
                    <span className="metric-badge green">&lt; 0.1 Detik</span>
                  </div>

                  <div className="metric-row">
                    <div className="metric-info">
                      <span className="metric-name">Kebutuhan Komputer Kasir</span>
                      <span className="metric-sub">Komputer lama tetap lancar</span>
                    </div>
                    <span className="metric-badge blue">Sangat Ringan</span>
                  </div>

                  <div className="metric-row">
                    <div className="metric-info">
                      <span className="metric-name">Biaya Kuota / Langganan</span>
                      <span className="metric-sub">Bebas potongan komisi</span>
                    </div>
                    <span className="metric-badge green">Rp 0 / Selamanya</span>
                  </div>

                  <div className="metric-row">
                    <div className="metric-info">
                      <span className="metric-name">Keamanan saat Mati Lampu</span>
                      <span className="metric-sub">Transaksi tersimpan permanen</span>
                    </div>
                    <span className="metric-badge purple">100% Aman</span>
                  </div>
                </div>

                <div className="stats-panel-footer">
                  <Lock size={14} className="footer-lock-icon" />
                  <span>Kedaulatan Data Toko: Seluruh data penjualan milik Anda seutuhnya</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="architecture-section" id="fitur-kasir">
        <div className="container">
          <div className="section-head-center">
            <Badge variant="cyan" size="sm">Kemudahan Toko</Badge>
            <h2 className="section-main-title">
              Fitur Lengkap untuk Melancarkan Operasional Toko Anda
            </h2>
            <p className="section-main-subtitle">
              Setiap tombol dan menu dirancang mudah dipelajari kasir baru hanya dalam 5 menit.
            </p>
          </div>

          <div className="arch-tabs-nav-wrap">
            <div className="arch-tabs-nav">
              <button
                type="button"
                className={`arch-nav-btn ${activeTab === 'pos' ? 'is-active' : ''}`}
                onClick={() => setActiveTab('pos')}
              >
                <Zap size={16} />
                <span>Kasir Cepat & Antrean Lancar</span>
              </button>

              <button
                type="button"
                className={`arch-nav-btn ${activeTab === 'sqlite' ? 'is-active' : ''}`}
                onClick={() => setActiveTab('sqlite')}
              >
                <Database size={16} />
                <span>Data Aman Tanpa Internet</span>
              </button>

              <button
                type="button"
                className={`arch-nav-btn ${activeTab === 'ai' ? 'is-active' : ''}`}
                onClick={() => setActiveTab('ai')}
              >
                <Cpu size={16} />
                <span>Asisten Pintar Laba & Stok</span>
              </button>

              <button
                type="button"
                className={`arch-nav-btn ${activeTab === 'hardware' ? 'is-active' : ''}`}
                onClick={() => setActiveTab('hardware')}
              >
                <Printer size={16} />
                <span>Langsung Colok Printer & Scanner</span>
              </button>
            </div>
          </div>

          <div className="arch-tab-content-card">
            {activeTab === 'pos' && (
              <div className="tab-pane-content">
                <div className="pane-left-info">
                  <div className="pane-badge-group">
                    <span className="pane-cat-tag">Kecepatan Tinggi</span>
                    <span className="pane-status-pill">Kasir Instan &lt; 2ms</span>
                  </div>
                  <h3 className="pane-title">Kasir Cepat untuk Melayani Antrean Ramai</h3>
                  <p className="pane-desc">
                    Saat jam sibuk atau antrean panjang, kasir tidak boleh menunggu loading internet atau layar berputar. ERASTACK POS memproses pencarian barcode, pemotongan stok otomatis, dan perhitungan diskon dalam hitungan milidetik secara lokal.
                  </p>

                  <div className="pipeline-steps-list">
                    <div className="pipeline-step">
                      <span className="step-badge">1</span>
                      <div className="step-detail">
                        <strong>Scan Barcode atau Sentuh Layar</strong>
                        <span>Menerima sinyal barcode scanner USB/Bluetooth tanpa jeda keyboard buffer.</span>
                      </div>
                    </div>
                    <div className="pipeline-step">
                      <span className="step-badge">2</span>
                      <div className="step-detail">
                        <strong>Hitung Kembalian & Diskon Otomatis</strong>
                        <span>Nominal kembalian tampil dengan angka besar dan jelas agar kasir tidak salah hitung.</span>
                      </div>
                    </div>
                    <div className="pipeline-step">
                      <span className="step-badge">3</span>
                      <div className="step-detail">
                        <strong>Struk Keluar & Stok Otomatis Berkurang</strong>
                        <span>Struk nota tercetak instan dan stok barang otomatis terpotong rapi.</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="pane-right-showcase">
                  <div className="cashier-demo-box">
                    <div className="demo-box-head">
                      <Store size={18} className="text-brand" />
                      <span className="demo-head-title">Simulasi Kasir Toko Aktif</span>
                      <span className="demo-status-pill">Siap Melayani</span>
                    </div>

                    <div className="demo-cart-preview">
                      <div className="demo-cart-row">
                        <span>2x Kopi Susu Aren</span>
                        <strong>Rp 48.000</strong>
                      </div>
                      <div className="demo-cart-row">
                        <span>1x Roti Bakar Cokelat</span>
                        <strong>Rp 22.000</strong>
                      </div>
                      <div className="demo-divider" />
                      <div className="demo-cart-total">
                        <span>Total Belanja:</span>
                        <span className="total-num">Rp 70.000</span>
                      </div>
                      <div className="demo-cash-row">
                        <span>Uang Tunai Pembeli:</span>
                        <span>Rp 100.000</span>
                      </div>
                      <div className="demo-change-row">
                        <span>Kembalian Uang:</span>
                        <strong className="change-num">Rp 30.000</strong>
                      </div>
                    </div>

                    <div className="demo-footer-banner">
                      <CheckCircle2 size={16} className="text-emerald" />
                      <span>Transaksi selesai dalam 0.8 detik • Nota siap cetak</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'sqlite' && (
              <div className="tab-pane-content">
                <div className="pane-left-info">
                  <div className="pane-badge-group">
                    <span className="pane-cat-tag">Penyimpanan Mandiri</span>
                    <span className="pane-status-pill">100% Offline Lokal</span>
                  </div>
                  <h3 className="pane-title">Data Toko Tersimpan Aman di Komputer Sendiri</h3>
                  <p className="pane-desc">
                    Aplikasi kasir lain menyimpan data Anda di server internet mereka sehingga Anda harus membayar sewa setiap bulan. Dengan ERASTACK POS, data penjualan tersimpan langsung di dalam komputer/HP kasir Anda sendiri secara privat dan permanen.
                  </p>

                  <div className="sqlite-comparison-grid">
                    <div className="compare-box erastack">
                      <div className="compare-head">
                        <CheckCircle2 size={16} className="text-emerald" />
                        <strong>ERASTACK POS (Offline Lokal)</strong>
                      </div>
                      <ul className="compare-list">
                        <li>Bisa jualan lancar walau internet mati</li>
                        <li>Gratis selamanya tanpa biaya sewa</li>
                        <li>Data penjualan 100% rahasia toko Anda</li>
                      </ul>
                    </div>

                    <div className="compare-box cloud">
                      <div className="compare-head">
                        <span className="cross-bullet">✕</span>
                        <strong>Kasir Cloud Online Biasa</strong>
                      </div>
                      <ul className="compare-list">
                        <li>Kasir macet saat internet drop / mati lampu</li>
                        <li>Data terkunci jika telat bayar langganan</li>
                        <li>Risiko kebocoran data di server luar</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="pane-right-showcase">
                  <div className="sqlite-features-card">
                    <h4 className="card-subhead">Keamanan Data Usaha Anda</h4>
                    <div className="spec-bullet-row">
                      <HardDrive size={18} className="spec-bullet-icon" />
                      <div>
                        <strong>Bebas Disandera Biaya Langganan</strong>
                        <p>Seluruh riwayat toko tetap bisa Anda akses selamanya tanpa perlu membayar biaya sewa software.</p>
                      </div>
                    </div>
                    <div className="spec-bullet-row">
                      <ShieldCheck size={18} className="spec-bullet-icon" />
                      <div>
                        <strong>Proteksi Aman saat Mati Listrik</strong>
                        <p>Sistem pencatatan aman memastikan file database tidak akan rusak meskipun komputer kasir mendadak mati lampu.</p>
                      </div>
                    </div>
                    <div className="spec-bullet-row">
                      <Copy size={18} className="spec-bullet-icon" />
                      <div>
                        <strong>Cadangkan (Backup) 1-Klik Mudah</strong>
                        <p>Cukup salin 1 file cadangan ke flashdisk atau Google Drive untuk mengamankan seluruh riwayat toko Anda.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'ai' && (
              <div className="tab-pane-content">
                <div className="pane-left-info">
                  <div className="pane-badge-group">
                    <span className="pane-cat-tag">Kecerdasan Buatan Toko</span>
                    <span className="pane-status-pill">100% Bebas Kuota</span>
                  </div>
                  <h3 className="pane-title">AI Asisten Bisnis Toko: Analisis Penjualan Tanpa Internet</h3>
                  <p className="pane-desc">
                    Tanyakan apa saja tentang rekap omset harian, barang yang mau habis, hingga jam paling ramai di toko Anda seperti mengobrol dengan manajer toko berpengalaman. Bekerja langsung di komputer & HP kasir Anda tanpa menghabiskan kuota internet.
                  </p>

                  <div className="ai-sample-queries">
                    <span className="queries-label">Pilih Contoh Pertanyaan Toko:</span>
                    <div className="query-btn-row">
                      <button
                        type="button"
                        className="query-pill-btn"
                        onClick={() => handleRunAiSample(
                          'Berapa ringkasan penjualan dan laba kotor hari ini?',
                          'Total transaksi hari ini tercatat 142 nota dengan omset kotor Rp 4.850.000. Laba bersih terestimasi Rp 1.455.000 (Margin 30.0%). Produk paling laris: Paket Kopi Susu Aren (48 cup).',
                          [
                            { label: 'Total Transaksi', val: '142 Nota' },
                            { label: 'Total Omset', val: 'Rp 4.850.000' },
                            { label: 'Laba Bersih', val: 'Rp 1.455.000' },
                            { label: 'Biaya Kuota API', val: 'Rp 0 (Gratis)' },
                          ]
                        )}
                      >
                        📊 Laba Hari Ini
                      </button>

                      <button
                        type="button"
                        className="query-pill-btn"
                        onClick={() => handleRunAiSample(
                          'Produk apa saja yang stoknya berada di bawah batas aman?',
                          'Terdeteksi 3 produk di bawah batas minimum: Gula Aren Cair (Sisa 2 botol, estimasi habis besok), Cup 16oz (Sisa 18 pcs), dan Biji Kopi Arabica (Sisa 1.2 kg). Direkomendasikan melakukan restock segera.',
                          [
                            { label: 'Item Kritis', val: '3 Produk' },
                            { label: 'Estimasi Habis', val: '24 Jam' },
                            { label: 'Rekomendasi', val: 'Pesan Suplier' },
                            { label: 'Status Data', val: '100% Akurat' },
                          ]
                        )}
                      >
                        ⚠️ Cek Stok Menipis
                      </button>

                      <button
                        type="button"
                        className="query-pill-btn"
                        onClick={() => handleRunAiSample(
                          'Jam berapa toko mengalami traffic pembeli paling padat?',
                          'Analisis 7 hari terakhir menunjukkan jam sibuk utama terjadi pada pukul 12:00 - 13:30 (Siang) dan 18:30 - 20:30 (Malam). Disarankan menambah 1 kasir aktif pada rentang waktu tersebut.',
                          [
                            { label: 'Puncak Siang', val: '12:00 - 13:30' },
                            { label: 'Puncak Malam', val: '18:30 - 20:30' },
                            { label: 'Rata-rata Nota/Jam', val: '38 Nota' },
                            { label: 'Saran Shift', val: '+1 Kasir Siaga' },
                          ]
                        )}
                      >
                        ⏰ Jam Sibuk Toko
                      </button>
                    </div>
                  </div>
                </div>

                <div className="pane-right-showcase">
                  <div className="ai-sandbox-card">
                    <div className="ai-sandbox-head">
                      <div className="ai-status-indicator">
                        <span className="live-dot" />
                        <span>Asisten Toko Siap Menjawab</span>
                      </div>
                      <span className="ai-latency-tag">{aiResult.latency}</span>
                    </div>

                    <div className="ai-prompt-display">
                      <span className="prompt-label">Pertanyaan Pemilik Toko:</span>
                      <p className="prompt-text">"{aiPrompt}"</p>
                    </div>

                    <div className="ai-response-box">
                      <span className="response-label">Hasil Analisis AI Asisten Toko:</span>
                      <p className="response-text">{aiResult.summary}</p>
                    </div>

                    <div className="ai-metrics-grid">
                      {aiResult.metrics.map((m, idx) => (
                        <div key={idx} className="ai-metric-item">
                          <span className="ai-metric-label">{m.label}</span>
                          <span className="ai-metric-val">{m.val}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'hardware' && (
              <div className="tab-pane-content">
                <div className="pane-left-info">
                  <div className="pane-badge-group">
                    <span className="pane-cat-tag">Kemudahan Perangkat</span>
                    <span className="pane-status-pill">Langsung Siap Pakai</span>
                  </div>
                  <h3 className="pane-title">Kompatibilitas Penuh dengan Semua Printer & Scanner Toko</h3>
                  <p className="pane-desc">
                    Tinggalkan kerumitan menginstal driver printer kasir yang sering gagal di Windows atau Android. ERASTACK POS langsung mendeteksi printer thermal USB, printer Bluetooth, dan barcode scanner secara otomatis.
                  </p>

                  <div className="hardware-compat-list">
                    <div className="compat-item">
                      <Printer size={18} className="compat-icon" />
                      <div className="compat-text">
                        <strong>Printer Thermal Kasir 58mm & 80mm</strong>
                        <span>Mendukung koneksi kabel USB, Bluetooth nirkabel, dan kabel LAN. Bisa buka laci kasir otomatis.</span>
                      </div>
                    </div>
                    <div className="compat-item">
                      <Zap size={18} className="compat-icon" />
                      <div className="compat-text">
                        <strong>Barcode & 2D QR Scanner</strong>
                        <span>Mendukung semua scanner barcode USB dan wireless untuk membaca kode barang secara instan.</span>
                      </div>
                    </div>
                    <div className="compat-item">
                      <BarChart3 size={18} className="compat-icon" />
                      <div className="compat-text">
                        <strong>Laci Kasir Uang Otomatis (Cash Drawer)</strong>
                        <span>Laci uang terbuka otomatis saat transaksi pembayaran tunai selesai.</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="pane-right-showcase">
                  <div className="receipt-preview-card">
                    <div className="receipt-head">
                      <span className="receipt-dot" />
                      <span className="receipt-brand">STRUK KASIR RESMI</span>
                      <span className="receipt-dot" />
                    </div>

                    <div className="receipt-body">
                      <div className="receipt-store-title">KOPI NUSANTARA INDONESIA</div>
                      <div className="receipt-sub">Jl. Sukajadi No. 45, Bandung</div>
                      <div className="receipt-line-dashed" />
                      
                      <div className="receipt-item-row">
                        <span>2x Kopi Susu Aren (L)</span>
                        <span className="tabular-nums">Rp 48.000</span>
                      </div>
                      <div className="receipt-item-row">
                        <span>1x Roti Bakar Cokelat</span>
                        <span className="tabular-nums">Rp 22.000</span>
                      </div>
                      
                      <div className="receipt-line-dashed" />
                      <div className="receipt-item-row bold">
                        <span>TOTAL PEMBAYARAN</span>
                        <span className="tabular-nums">Rp 70.000</span>
                      </div>
                      <div className="receipt-item-row">
                        <span>TUNAI (CASH)</span>
                        <span className="tabular-nums">Rp 100.000</span>
                      </div>
                      <div className="receipt-item-row">
                        <span>KEMBALI</span>
                        <span className="tabular-nums">Rp 30.000</span>
                      </div>
                      <div className="receipt-line-dashed" />
                      <div className="receipt-footer-text">
                        Terima Kasih Atas Kunjungan Anda<br />
                        Dicetak Cepat dengan ERASTACK POS (0.1 Detik)
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      <section className="specs-table-section">
        <div className="container">
          <div className="section-head-center">
            <Badge variant="lime" size="sm">Spesifikasi Lengkap</Badge>
            <h2 className="section-main-title">Tabel Kemampuan & Spesifikasi ERASTACK POS</h2>
            <p className="section-main-subtitle">
              Transparansi penuh tentang kelebihan sistem kasir untuk memajukan usaha toko Anda.
            </p>
          </div>

          <div className="specs-table-wrap">
            <table className="specs-table">
              <thead>
                <tr>
                  <th className="th-param">Kelebihan Kasir Toko</th>
                  <th className="th-val">Spesifikasi ERASTACK POS</th>
                  <th className="th-detail">Manfaat untuk Usaha Anda</th>
                </tr>
              </thead>
              <tbody>
                {POS_SPECS.map((spec, idx) => (
                  <tr key={idx}>
                    <td className="td-param">{spec.param}</td>
                    <td className="td-val">
                      <span className="spec-val-highlight">{spec.value}</span>
                    </td>
                    <td className="td-detail">{spec.detail}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="download-hub-section">
        <div className="container">
          <div className="download-card-wrapper">
            <div className="download-head-group">
              <Badge variant="lime" size="sm" dot>Unduh Aplikasi Kasir</Badge>
              <h2 className="download-main-title">Unduh ERASTACK POS v1.0.4 Sekarang</h2>
              <p className="download-main-desc">
                Pilih aplikasi kasir sesuai perangkat yang Anda gunakan di toko. Gratis selamanya dan langsung siap pakai.
              </p>
            </div>

            <div className="binaries-grid">
              <div className="binary-card">
                <div className="binary-top-row">
                  <div className="binary-icon-box">
                    <Monitor size={24} className="text-brand" />
                  </div>
                  <Badge variant="cyan" size="sm">Untuk PC Kasir & Laptop</Badge>
                </div>

                <div className="binary-title-group">
                  <h3 className="binary-name">ERASTACK POS untuk Komputer Kasir (Windows)</h3>
                  <span className="binary-meta">Versi 1.0.4 • Installer Cepat (48.2 MB)</span>
                </div>

                <p className="binary-desc">
                  Cocok untuk komputer PC kasir, laptop toko, dan mesin POS layar sentuh Windows 10 & 11.
                </p>

                <div className="store-benefits-pill-box">
                  <div className="benefit-item-mini">
                    <CheckCircle2 size={14} className="text-emerald" />
                    <span>100% Bisa jalan tanpa internet</span>
                  </div>
                  <div className="benefit-item-mini">
                    <CheckCircle2 size={14} className="text-emerald" />
                    <span>Langsung colok printer struk & barcode scanner</span>
                  </div>
                </div>

                <Link href="/downloads" className="btn-wrap-full">
                  <Button variant="primary" size="lg" leftIcon={<Download size={18} />}>
                    Unduh untuk Komputer Kasir (.exe)
                  </Button>
                </Link>
              </div>

              <div className="binary-card">
                <div className="binary-top-row">
                  <div className="binary-icon-box">
                    <Smartphone size={24} className="text-emerald" />
                  </div>
                  <Badge variant="lime" size="sm">Untuk HP & Tablet</Badge>
                </div>

                <div className="binary-title-group">
                  <h3 className="binary-name">ERASTACK POS untuk HP & Tablet (Android)</h3>
                  <span className="binary-meta">Versi 1.0.4 • Standalone APK (28.5 MB)</span>
                </div>

                <p className="binary-desc">
                  Cocok untuk smartphone Android, tablet kasir, dan mesin POS portabel (Sunmi, iMin, Samsung, Xiaomi).
                </p>

                <div className="store-benefits-pill-box">
                  <div className="benefit-item-mini">
                    <CheckCircle2 size={14} className="text-emerald" />
                    <span>Scan barcode langsung pakai kamera HP</span>
                  </div>
                  <div className="benefit-item-mini">
                    <CheckCircle2 size={14} className="text-emerald" />
                    <span>Cetak struk via Bluetooth tanpa kabel</span>
                  </div>
                </div>

                <Link href="/downloads" className="btn-wrap-full">
                  <Button variant="secondary" size="lg" leftIcon={<Download size={18} />}>
                    Unduh untuk HP / Tablet (.apk)
                  </Button>
                </Link>
              </div>
            </div>

            <div className="security-guarantee-bar">
              <ShieldCheck size={18} className="shield-icon" />
              <span>
                Aplikasi resmi ERASTACK <strong>100% Aman, Bebas Virus & Bebas Iklan</strong>. Gratis digunakan selamanya untuk memajukan usaha toko Anda.
              </span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
