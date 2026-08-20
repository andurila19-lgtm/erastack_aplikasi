'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  Monitor, Smartphone, Download, CheckCircle2, 
  ShieldCheck, Database, Cpu, Printer, 
  Zap, ArrowRight, HardDrive, 
  Copy, ChevronRight, BarChart3, Lock, Store
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
  { param: 'Kebutuhan Jaringan', value: 'Offline-First Mandiri', detail: 'Seluruh transaksi kasir, mutasi stok, dan pencetakan nota tetap beroperasi tanpa koneksi internet.' },
  { param: 'Penyimpanan Data', value: 'SQLite Lokal (WAL Mode)', detail: 'Data keuangan dan stok tersimpan di media penyimpanan perangkat lokal pengguna.' },
  { param: 'Model Lisensi', value: 'Mandiri / Bebas Sewa', detail: 'Tidak ada biaya langganan bulanan wajib atau potongan persentase per transaksi.' },
  { param: 'Dukungan Printer Struk', value: 'ESC/POS (USB & Bluetooth)', detail: 'Kompatibel dengan printer thermal standar 58mm dan 80mm.' },
  { param: 'Dukungan Barcode Scanner', value: 'USB HID & Wireless 2.4G', detail: 'Mendukung pemindai barcode 1D dan 2D standar keyboard emulation.' },
  { param: 'Integritas Transaksi', value: 'ACID Transactional', detail: 'Mutasi stok dan nota dibungkus dalam blok transaksi database yang konsisten.' },
  { param: 'Platform Perangkat', value: 'Windows 10/11 & Android', detail: 'Dapat dijalankan di komputer PC desktop, laptop, tablet, dan smartphone.' },
  { param: 'Status Pengembangan', value: 'Active Development', detail: 'Fitur inti POS, inventaris, dan pelaporan lokal beroperasi secara stabil.' },
];

export const ProductDetailPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'pos' | 'sqlite' | 'ai' | 'hardware'>('pos');

  const [aiPrompt, setAiPrompt] = useState('Berapa ringkasan penjualan dan laba kotor hari ini?');
  const [aiResult, setAiResult] = useState<{
    latency: string;
    summary: string;
    metrics: { label: string; val: string }[];
  }>({
    latency: 'Simulasi Lokal',
    summary: 'Total transaksi hari ini tercatat 142 nota dengan omset kotor Rp 4.850.000. Laba kotor terestimasi Rp 1.455.000 (Margin 30.0%). Produk paling laris: Beras Premium 5kg (48 pack).',
    metrics: [
      { label: 'Total Transaksi', val: '142 Nota' },
      { label: 'Total Omset', val: 'Rp 4.850.000' },
      { label: 'Laba Kotor', val: 'Rp 1.455.000' },
      { label: 'Mode AI', val: 'On-Device Tool' },
    ],
  });

  const handleRunAiSample = (prompt: string, summary: string, metrics: { label: string; val: string }[]) => {
    setAiPrompt(prompt);
    setAiResult({
      latency: 'Simulasi Lokal',
      summary,
      metrics,
    });
  };

  return (
    <div className="product-detail-page-root">
      <SEOHead
        title="ERASTACK POS — Aplikasi Kasir Offline-First & Manajemen Bisnis"
        description="Aplikasi kasir offline-first untuk Windows & Android: Ringan, cepat, integrasi printer thermal ESC/POS, dan penyimpanan SQLite lokal mandiri."
      />

      <div className="detail-breadcrumb-bar">
        <div className="container">
          <nav className="breadcrumb-nav" aria-label="Breadcrumb">
            <Link href="/" className="breadcrumb-link">Beranda</Link>
            <ChevronRight size={13} className="breadcrumb-sep" />
            <Link href="/products" className="breadcrumb-link">Produk</Link>
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
                <Badge variant="cyan" size="sm" dot>Core POS Module</Badge>
                <span className="version-pill-tag">v1.0.4 Stabil</span>
                <span className="rating-pill-tag">Offline-First Engine</span>
              </div>

              <h1 className="detail-product-title">
                ERASTACK POS: Sistem Kasir <span className="highlight-text">Offline-First</span> & Manajemen Bisnis
              </h1>

              <p className="detail-product-desc">
                Dirancang untuk operasional transaksi bisnis yang membutuhkan keandalan tanpa ketergantungan koneksi internet. Beroperasi mandiri di perangkat lokal Anda dengan penyimpanan database SQLite.
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
                    <span>Android 8.0+</span>
                  </div>
                </div>
              </div>

              <div className="detail-actions-row">
                <Link href="/pos" className="btn-wrap-full">
                  <Button size="lg" variant="primary" leftIcon={<Zap size={18} />}>
                    Coba Demo Kasir Web
                  </Button>
                </Link>
                <Link href="/downloads" className="btn-wrap-full">
                  <Button size="lg" variant="secondary" leftIcon={<Download size={18} />}>
                    Unduh Installer (v1.0.4)
                  </Button>
                </Link>
              </div>

              <div className="detail-trust-points">
                <span className="trust-item">
                  <HardDrive size={15} className="trust-icon" />
                  <span>Operasi Mandiri Tanpa Internet</span>
                </span>
                <span className="trust-item">
                  <Database size={15} className="trust-icon" />
                  <span>Penyimpanan SQLite Lokal</span>
                </span>
                <span className="trust-item">
                  <Cpu size={15} className="trust-icon" />
                  <span>Local AI Tool Calling</span>
                </span>
              </div>
            </div>

            <div className="detail-hero-stats-panel">
              <div className="stats-glass-card">
                <div className="stats-header">
                  <h3 className="stats-title">Spesifikasi Arsitektur</h3>
                  <span className="stats-status-tag">Local-First</span>
                </div>

                <div className="stats-metrics-list">
                  <div className="metric-row">
                    <div className="metric-info">
                      <span className="metric-name">Basis Database</span>
                      <span className="metric-sub">Penyimpanan relasional lokal</span>
                    </div>
                    <span className="metric-badge green">SQLite (WAL)</span>
                  </div>

                  <div className="metric-row">
                    <div className="metric-info">
                      <span className="metric-name">Protokol Printer</span>
                      <span className="metric-sub">Format nota monospaced</span>
                    </div>
                    <span className="metric-badge green">ESC/POS</span>
                  </div>

                  <div className="metric-row">
                    <div className="metric-info">
                      <span className="metric-name">Pemindai Barcode</span>
                      <span className="metric-sub">Keyboard emulation input</span>
                    </div>
                    <span className="metric-badge blue">USB HID / 2.4G</span>
                  </div>

                  <div className="metric-row">
                    <div className="metric-info">
                      <span className="metric-name">Konsistensi Stok</span>
                      <span className="metric-sub">Pencatatan atomic commit</span>
                    </div>
                    <span className="metric-badge green">ACID Wrapped</span>
                  </div>

                  <div className="metric-row">
                    <div className="metric-info">
                      <span className="metric-name">Pencadangan Data</span>
                      <span className="metric-sub">Ekspor berkas database</span>
                    </div>
                    <span className="metric-badge purple">File .sqlite</span>
                  </div>
                </div>

                <div className="stats-panel-footer">
                  <Lock size={14} className="footer-lock-icon" />
                  <span>Kedaulatan Data: Seluruh riwayat transaksi tersimpan di perangkat lokal</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="architecture-section" id="fitur-kasir">
        <div className="container">
          <div className="section-head-center">
            <Badge variant="cyan" size="sm">Modul Sistem</Badge>
            <h2 className="section-main-title">
              Fitur Operasional ERASTACK POS
            </h2>
            <p className="section-main-subtitle">
              Eksplorasi modul inti kasir, database lokal, analisis AI, dan integrasi hardware.
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
                <span>Transaksi Kasir</span>
              </button>

              <button
                type="button"
                className={`arch-nav-btn ${activeTab === 'sqlite' ? 'is-active' : ''}`}
                onClick={() => setActiveTab('sqlite')}
              >
                <Database size={16} />
                <span>Database SQLite Lokal</span>
              </button>

              <button
                type="button"
                className={`arch-nav-btn ${activeTab === 'ai' ? 'is-active' : ''}`}
                onClick={() => setActiveTab('ai')}
              >
                <Cpu size={16} />
                <span>Local AI Assistant</span>
              </button>

              <button
                type="button"
                className={`arch-nav-btn ${activeTab === 'hardware' ? 'is-active' : ''}`}
                onClick={() => setActiveTab('hardware')}
              >
                <Printer size={16} />
                <span>Integrasi Hardware</span>
              </button>
            </div>
          </div>

          <div className="arch-tab-content-card">
            {activeTab === 'pos' && (
              <div className="tab-pane-content">
                <div className="pane-left-info">
                  <div className="pane-badge-group">
                    <span className="pane-cat-tag">Terminal Kasir</span>
                    <span className="pane-status-pill">Offline-First Engine</span>
                  </div>
                  <h3 className="pane-title">Antarmuka Kasir Berkecepatan Tinggi</h3>
                  <p className="pane-desc">
                    Memproses pencarian barcode, pemotongan stok otomatis, dan perhitungan diskon secara lokal tanpa delay jaringan internet.
                  </p>

                  <div className="pipeline-steps-list">
                    <div className="pipeline-step">
                      <span className="step-badge">1</span>
                      <div className="step-detail">
                        <strong>Scan Barcode atau Sentuh Layar</strong>
                        <span>Menerima sinyal pemindai barcode USB/Bluetooth secara langsung.</span>
                      </div>
                    </div>
                    <div className="pipeline-step">
                      <span className="step-badge">2</span>
                      <div className="step-detail">
                        <strong>Kalkulasi Diskon & Subtotal</strong>
                        <span>Perhitungan angka berbasis integer mata uang untuk akurasi nominal.</span>
                      </div>
                    </div>
                    <div className="pipeline-step">
                      <span className="step-badge">3</span>
                      <div className="step-detail">
                        <strong>Commit Transaksi & Cetak Nota</strong>
                        <span>Struk nota dicetak dan mutasi stok dicatat ke database lokal.</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="pane-right-showcase">
                  <div className="cashier-demo-box">
                    <div className="demo-box-head">
                      <Store size={18} className="text-brand" />
                      <span className="demo-head-title">Terminal Kasir Aktif</span>
                      <span className="demo-status-pill">Siap Transaksi</span>
                    </div>

                    <div className="demo-cart-preview">
                      <div className="demo-cart-row">
                        <span>2x Beras Premium 5kg</span>
                        <strong>Rp 136.000</strong>
                      </div>
                      <div className="demo-cart-row">
                        <span>1x Minyak Goreng 2L</span>
                        <strong>Rp 34.000</strong>
                      </div>
                      <div className="demo-divider" />
                      <div className="demo-cart-total">
                        <span>Total Belanja:</span>
                        <span className="total-num">Rp 170.000</span>
                      </div>
                      <div className="demo-cash-row">
                        <span>Uang Tunai:</span>
                        <span>Rp 200.000</span>
                      </div>
                      <div className="demo-change-row">
                        <span>Kembalian:</span>
                        <strong className="change-num">Rp 30.000</strong>
                      </div>
                    </div>

                    <div className="demo-footer-banner">
                      <CheckCircle2 size={16} className="text-emerald" />
                      <span>Transaksi tercatat ke SQLite lokal • Nota siap cetak</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'sqlite' && (
              <div className="tab-pane-content">
                <div className="pane-left-info">
                  <div className="pane-badge-group">
                    <span className="pane-cat-tag">Penyimpanan Terstruktur</span>
                    <span className="pane-status-pill">Offline Persistence</span>
                  </div>
                  <h3 className="pane-title">Kedaulatan Data di Media Lokal</h3>
                  <p className="pane-desc">
                    Data transaksi dan master produk tersimpan langsung di perangkat lokal pengguna tanpa ketergantungan wajib pada server cloud pihak ketiga.
                  </p>

                  <div className="sqlite-comparison-grid">
                    <div className="compare-box erastack">
                      <div className="compare-head">
                        <CheckCircle2 size={16} className="text-emerald" />
                        <strong>EraStack (Offline-First)</strong>
                      </div>
                      <ul className="compare-list">
                        <li>Operasi kasir normal saat jaringan offline</li>
                        <li>Kepemilikan file database (.sqlite) seutuhnya</li>
                        <li>Privasi data transaksi tersimpan di perangkat lokal</li>
                      </ul>
                    </div>

                    <div className="compare-box cloud">
                      <div className="compare-head">
                        <span className="cross-bullet">○</span>
                        <strong>Cloud POS Standar</strong>
                      </div>
                      <ul className="compare-list">
                        <li>Membutuhkan koneksi internet aktif untuk transaksi</li>
                        <li>Data tersimpan di server cloud pihak ketiga</li>
                        <li>Akses tergantung pada langganan layanan cloud</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="pane-right-showcase">
                  <div className="sqlite-features-card">
                    <h4 className="card-subhead">Keamanan Data Operasional</h4>
                    <div className="spec-bullet-row">
                      <HardDrive size={18} className="spec-bullet-icon" />
                      <div>
                        <strong>Kemandirian Sistem</strong>
                        <p>Riwayat transaksi tetap dapat diakses tanpa biaya sewa software berkala.</p>
                      </div>
                    </div>
                    <div className="spec-bullet-row">
                      <ShieldCheck size={18} className="spec-bullet-icon" />
                      <div>
                        <strong>Proteksi WAL Mode</strong>
                        <p>Write-Ahead Logging mencegah korupsi file basis data saat terjadi pemadaman listrik mendadak.</p>
                      </div>
                    </div>
                    <div className="spec-bullet-row">
                      <Copy size={18} className="spec-bullet-icon" />
                      <div>
                        <strong>Pencadangan Mandiri</strong>
                        <p>Dapat menyalin berkas database .sqlite ke flashdisk atau media penyimpanan eksternal.</p>
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
                    <span className="pane-cat-tag">Analisis Lokal</span>
                    <span className="pane-status-pill">On-Device Tool Calling</span>
                  </div>
                  <h3 className="pane-title">Local AI Assistant untuk Analisis Penjualan</h3>
                  <p className="pane-desc">
                    Menganalisis data penjualan dan audit stok secara lokal di perangkat kasir Anda tanpa mengirimkan data ke API cloud eksternal.
                  </p>

                  <div className="ai-sample-queries">
                    <span className="queries-label">Pilih Contoh Pertanyaan Analisis:</span>
                    <div className="query-btn-row">
                      <button
                        type="button"
                        className="query-pill-btn"
                        onClick={() => handleRunAiSample(
                          'Berapa ringkasan penjualan dan laba kotor hari ini?',
                          'Total transaksi hari ini tercatat 142 nota dengan omset kotor Rp 4.850.000. Laba kotor terestimasi Rp 1.455.000 (Margin 30.0%). Produk paling laris: Beras Premium 5kg (48 pack).',
                          [
                            { label: 'Total Transaksi', val: '142 Nota' },
                            { label: 'Total Omset', val: 'Rp 4.850.000' },
                            { label: 'Laba Kotor', val: 'Rp 1.455.000' },
                            { label: 'Mode AI', val: 'On-Device Tool' },
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
                          'Terdeteksi 3 produk di bawah batas minimum: Minyak Goreng 2L (Sisa 2 pcs), Gula Pasir 1kg (Sisa 4 pcs), dan Kertas Thermal 58mm (Sisa 3 roll). Direkomendasikan melakukan restock segera.',
                          [
                            { label: 'Item Kritis', val: '3 Produk' },
                            { label: 'Threshold', val: '< 5 Pcs' },
                            { label: 'Rekomendasi', val: 'Pesan Suplier' },
                            { label: 'Status Data', val: 'Tervalidasi' },
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
                          'Analisis riwayat nota menunjukkan jam sibuk utama terjadi pada pukul 12:00 - 13:30 (Siang) dan 18:30 - 20:30 (Sore). Disarankan memastikan kesiapan laci kasir pada rentang waktu tersebut.',
                          [
                            { label: 'Puncak Siang', val: '12:00 - 13:30' },
                            { label: 'Puncak Sore', val: '18:30 - 20:30' },
                            { label: 'Volume', val: 'Tinggi' },
                            { label: 'Kesiapan', val: 'Kasir & Struk' },
                          ]
                        )}
                      >
                        ⏰ Jam Sibuk
                      </button>
                    </div>
                  </div>
                </div>

                <div className="pane-right-showcase">
                  <div className="ai-sandbox-card">
                    <div className="ai-sandbox-head">
                      <div className="ai-status-indicator">
                        <span className="live-dot" />
                        <span>Local Dispatcher Ready</span>
                      </div>
                      <span className="ai-latency-tag">{aiResult.latency}</span>
                    </div>

                    <div className="ai-prompt-display">
                      <span className="prompt-label">Query Pengguna:</span>
                      <p className="prompt-text">"{aiPrompt}"</p>
                    </div>

                    <div className="ai-response-box">
                      <span className="response-label">Hasil Eksekusi Tool Analitik:</span>
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
                    <span className="pane-cat-tag">Standar Periferal</span>
                    <span className="pane-status-pill">Universal Protocol</span>
                  </div>
                  <h3 className="pane-title">Dukungan Universal Printer & Scanner</h3>
                  <p className="pane-desc">
                    Kompatibel dengan printer thermal ESC/POS (USB & Bluetooth), barcode scanner USB HID, dan laci uang kasir RJ11 standar industri.
                  </p>

                  <div className="hardware-compat-list">
                    <div className="compat-item">
                      <Printer size={18} className="compat-icon" />
                      <div className="compat-text">
                        <strong>Printer Thermal Kasir 58mm & 80mm</strong>
                        <span>Mendukung koneksi USB, Bluetooth nirkabel, dan protokol ESC/POS standar.</span>
                      </div>
                    </div>
                    <div className="compat-item">
                      <Zap size={18} className="compat-icon" />
                      <div className="compat-text">
                        <strong>Barcode Scanner 1D & 2D</strong>
                        <span>Mendukung pemindai barcode USB HID dan wireless 2.4G keyboard emulation.</span>
                      </div>
                    </div>
                    <div className="compat-item">
                      <BarChart3 size={18} className="compat-icon" />
                      <div className="compat-text">
                        <strong>Laci Kasir Uang (Cash Drawer RJ11)</strong>
                        <span>Terbuka otomatis saat perintah pencetakan struk pembayaran tunai selesai.</span>
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
                      <div className="receipt-store-title">TOKO SEMBAKO BAROKAH</div>
                      <div className="receipt-sub">Terminal Kasir 01 • Struk Belanja</div>
                      <div className="receipt-line-dashed" />
                      
                      <div className="receipt-item-row">
                        <span>2x Beras Premium 5kg</span>
                        <span className="tabular-nums">Rp 136.000</span>
                      </div>
                      <div className="receipt-item-row">
                        <span>1x Minyak Goreng 2L</span>
                        <span className="tabular-nums">Rp 34.000</span>
                      </div>
                      
                      <div className="receipt-line-dashed" />
                      <div className="receipt-item-row bold">
                        <span>TOTAL PEMBAYARAN</span>
                        <span className="tabular-nums">Rp 170.000</span>
                      </div>
                      <div className="receipt-item-row">
                        <span>TUNAI (CASH)</span>
                        <span className="tabular-nums">Rp 200.000</span>
                      </div>
                      <div className="receipt-item-row">
                        <span>KEMBALIAN</span>
                        <span className="tabular-nums">Rp 30.000</span>
                      </div>
                      <div className="receipt-line-dashed" />
                      <div className="receipt-footer-text">
                        Terima Kasih Atas Kunjungan Anda<br />
                        Dicetak dengan ERASTACK POS (ESC/POS)
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
            <Badge variant="cyan" size="sm">Spesifikasi Sistem</Badge>
            <h2 className="section-main-title">Tabel Kemampuan & Spesifikasi ERASTACK POS</h2>
            <p className="section-main-subtitle">
              Ringkasan teknis kapabilitas sistem kasir offline-first.
            </p>
          </div>

          <div className="specs-table-wrap">
            <table className="specs-table">
              <thead>
                <tr>
                  <th className="th-param">Parameter Sistem</th>
                  <th className="th-val">Spesifikasi ERASTACK POS</th>
                  <th className="th-detail">Keterangan Arsitektural</th>
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
              <Badge variant="lime" size="sm" dot>Pusat Unduhan</Badge>
              <h2 className="download-main-title">Unduh ERASTACK POS v1.0.4</h2>
              <p className="download-main-desc">
                Pilih paket biner resmi sesuai dengan target sistem operasi kasir Anda.
              </p>
            </div>

            <div className="binaries-grid">
              <div className="binary-card">
                <div className="binary-top-row">
                  <div className="binary-icon-box">
                    <Monitor size={24} className="text-brand" />
                  </div>
                  <Badge variant="cyan" size="sm">Windows Desktop</Badge>
                </div>

                <div className="binary-title-group">
                  <h3 className="binary-name">ERASTACK POS Windows Desktop (.exe)</h3>
                  <span className="binary-meta">Versi 1.0.4 • Installer Resmi (48.2 MB)</span>
                </div>

                <p className="binary-desc">
                  Untuk komputer PC kasir, laptop, dan terminal POS layar sentuh Windows 10 & 11 (64-bit).
                </p>

                <div className="store-benefits-pill-box">
                  <div className="benefit-item-mini">
                    <CheckCircle2 size={14} className="text-emerald" />
                    <span>Database SQLite lokal terintegrasi</span>
                  </div>
                  <div className="benefit-item-mini">
                    <CheckCircle2 size={14} className="text-emerald" />
                    <span>Dukungan printer ESC/POS & scanner USB HID</span>
                  </div>
                </div>

                <Link href="/downloads" className="btn-wrap-full">
                  <Button variant="primary" size="lg" leftIcon={<Download size={18} />}>
                    Unduh Installer Windows (.exe)
                  </Button>
                </Link>
              </div>

              <div className="binary-card">
                <div className="binary-top-row">
                  <div className="binary-icon-box">
                    <Smartphone size={24} className="text-emerald" />
                  </div>
                  <Badge variant="lime" size="sm">Android Mobile</Badge>
                </div>

                <div className="binary-title-group">
                  <h3 className="binary-name">ERASTACK POS Android Package (.apk)</h3>
                  <span className="binary-meta">Versi 1.0.4 • Standalone APK (28.5 MB)</span>
                </div>

                <p className="binary-desc">
                  Untuk smartphone Android, tablet kasir, dan mesin POS portabel (Android 8.0+).
                </p>

                <div className="store-benefits-pill-box">
                  <div className="benefit-item-mini">
                    <CheckCircle2 size={14} className="text-emerald" />
                    <span>Dukungan printer thermal Bluetooth 58mm</span>
                  </div>
                  <div className="benefit-item-mini">
                    <CheckCircle2 size={14} className="text-emerald" />
                    <span>Pemindaian barcode via kamera atau scanner</span>
                  </div>
                </div>

                <Link href="/downloads" className="btn-wrap-full">
                  <Button variant="secondary" size="lg" leftIcon={<Download size={18} />}>
                    Unduh Package Android (.apk)
                  </Button>
                </Link>
              </div>
            </div>

            <div className="security-guarantee-bar">
              <ShieldCheck size={18} className="shield-icon" />
              <span>
                Paket biner resmi diverifikasi dengan tanda tangan kriptografis digital dan hash SHA-256 publik.
              </span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
