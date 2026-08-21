import React, { useState } from 'react';
import { 
  LogIn, LayoutDashboard, ShoppingBag, ShoppingCart, 
  CreditCard, Receipt, PackageCheck, BarChart3, ChevronRight 
} from 'lucide-react';
import { Badge } from '../ui/Badge';
import './WorkflowSection.css';

interface WorkflowStep {
  id: string;
  stepNumber: string;
  title: string;
  category: string;
  icon: React.ReactNode;
  description: string;
  technicalDetails: string;
  previewData: {
    label: string;
    value: string;
  }[];
}

const WORKFLOW_STEPS: WorkflowStep[] = [
  {
    id: 'login',
    stepNumber: '01',
    title: 'Autentikasi & Shift Kasir',
    category: 'Akses Sistem',
    icon: <LogIn size={18} />,
    description: 'Kasir masuk menggunakan PIN lokal dan membuka shift baru dengan mencatat modal awal kas (cash drawer float).',
    technicalDetails: 'Penyimpanan sesi lokal di memory & log audit ke tabel shift SQLite.',
    previewData: [
      { label: 'Role Aktif', value: 'Kasir Shift 1' },
      { label: 'Modal Awal Kas', value: 'Rp 200.000' },
      { label: 'Status Sesi', value: 'Shift Dibuka' },
    ],
  },
  {
    id: 'dashboard',
    stepNumber: '02',
    title: 'Terminal Penjualan (POS)',
    category: 'Operasi Kasir',
    icon: <LayoutDashboard size={18} />,
    description: 'Antarmuka kasir siap menerima input belanja melalui sentuhan kategori produk, pencarian SKU, atau barcode scanner.',
    technicalDetails: 'Katalog produk di-cache dalam memory untuk pencarian instan tanpa delay database.',
    previewData: [
      { label: 'Katalog Aktif', value: 'Tersedia' },
      { label: 'Mode Input', value: 'Scan Barcode / Touch' },
      { label: 'Antrean Transaksi', value: 'Standby' },
    ],
  },
  {
    id: 'cart',
    stepNumber: '03',
    title: 'Staging Keranjang & Diskon',
    category: 'Perhitungan',
    icon: <ShoppingCart size={18} />,
    description: 'Item belanja terakumulasi secara otomatis, menghitung kuantitas, harga satuan, dan diskon per item atau per transaksi.',
    technicalDetails: 'Validasi batas kuantitas terhadap ketersediaan stok lokal sebelum pembayaran.',
    previewData: [
      { label: 'Item di Keranjang', value: '3 Produk (6 Pcs)' },
      { label: 'Subtotal Belanja', value: 'Rp 185.500' },
      { label: 'Diskon Terpasang', value: 'Rp 0' },
    ],
  },
  {
    id: 'payment',
    stepNumber: '04',
    title: 'Pembayaran & Kembalian',
    category: 'Finansial',
    icon: <CreditCard size={18} />,
    description: 'Kasir memilih metode bayar (Tunai, QRIS lokal/statis, Transfer), sistem menghitung uang diterima dan nilai kembalian secara tepat.',
    technicalDetails: 'Kalkulasi angka presisi berbasis integer mata uang untuk menghindari floating-point rounding issue.',
    previewData: [
      { label: 'Metode Bayar', value: 'Tunai (Cash)' },
      { label: 'Nominal Diterima', value: 'Rp 200.000' },
      { label: 'Kembalian', value: 'Rp 14.500' },
    ],
  },
  {
    id: 'receipt',
    stepNumber: '05',
    title: 'Pencetakan Struk (ESC/POS)',
    category: 'Hardware Output',
    icon: <Receipt size={18} />,
    description: 'Struk transaksi dikirim ke printer thermal via Bluetooth atau USB menggunakan protokol ESC/POS dan membuka laci uang.',
    technicalDetails: 'Format output thermal 58mm/80mm teks monospaced standar industri.',
    previewData: [
      { label: 'Status Print', value: 'Cetak Selesai' },
      { label: 'Laci Uang RJ11', value: 'Triggered Open' },
      { label: 'Nomor Nota', value: 'TX-20260820-0042' },
    ],
  },
  {
    id: 'inventory-update',
    stepNumber: '06',
    title: 'Mutasi Stok Atomic Commit',
    category: 'Database Integrity',
    icon: <PackageCheck size={18} />,
    description: 'Secara bersamaan dengan pencatatan transaksi, kuantitas stok produk terkait langsung dipotong dalam transaksi database SQLite ACID.',
    technicalDetails: 'Dibungkus dalam db.transaction() agar data penjualan dan mutasi stok selalu sinkron.',
    previewData: [
      { label: 'Stok Terpotong', value: '-6 Pcs Selesai' },
      { label: 'Tipe Mutasi', value: 'OUT_SALE' },
      { label: 'Konsistensi Data', value: 'ACID Committed' },
    ],
  },
  {
    id: 'reports',
    stepNumber: '07',
    title: 'Laporan & Rekonsiliasi Shift',
    category: 'Pelaporan',
    icon: <BarChart3 size={18} />,
    description: 'Pada akhir shift atau tutup toko, data transaksi diagregasi menjadi laporan omset, laba kotor, dan rekonsiliasi kas laci fisik.',
    technicalDetails: 'Query agregasi SQLite lokal untuk omset harian dan evaluasi selisih kas fisik.',
    previewData: [
      { label: 'Total Omset Shift', value: 'Rp 4.850.000' },
      { label: 'Total Nota', value: '142 Transaksi' },
      { label: 'Selisih Kas Laci', value: 'Rp 0 (Cocok)' },
    ],
  },
];

export const WorkflowSection: React.FC = () => {
  const [activeStepId, setActiveStepId] = useState<string>('login');

  const activeStep = WORKFLOW_STEPS.find(s => s.id === activeStepId) || WORKFLOW_STEPS[0];

  return (
    <section className="workflow-section" id="workflow">
      <div className="container workflow-container">
        <div className="section-head-center">
          <Badge variant="lime" size="sm">Alur Kerja Sistem</Badge>
          <h2 className="section-main-title">
            Workflow Transaksi Nyata dari Input hingga Pelaporan
          </h2>
          <p className="section-main-subtitle">
            Pahami bagaimana setiap tahapan operasional kasir dijalankan di dalam sistem EraStack secara berurutan dan terstruktur.
          </p>
        </div>

        <div className="workflow-stepper-nav">
          {WORKFLOW_STEPS.map((step, idx) => {
            const isActive = step.id === activeStepId;
            return (
              <button
                key={step.id}
                type="button"
                className={`workflow-step-btn ${isActive ? 'is-active' : ''}`}
                onClick={() => setActiveStepId(step.id)}
              >
                <span className="step-btn-num">{step.stepNumber}</span>
                <span className="step-btn-icon">{step.icon}</span>
                <span className="step-btn-label">{step.title}</span>
              </button>
            );
          })}
        </div>

        <div className="workflow-detail-card">
          <div className="workflow-card-left">
            <div className="workflow-meta-top">
              <span className="workflow-step-badge">Tahap {activeStep.stepNumber}</span>
              <span className="workflow-cat-badge">{activeStep.category}</span>
            </div>

            <h3 className="workflow-step-title">{activeStep.title}</h3>
            <p className="workflow-step-desc">{activeStep.description}</p>

            <div className="workflow-tech-box">
              <span className="tech-box-label">Catatan Rekayasa (Engineering):</span>
              <p className="tech-box-text">{activeStep.technicalDetails}</p>
            </div>
          </div>

          <div className="workflow-card-right">
            <div className="workflow-terminal-mockup">
              <div className="terminal-topbar">
                <div className="terminal-prompt-prefix">&gt;_</div>
                <span className="term-title">EraStack Runtime Pipeline Inspector</span>
                <span className="term-chip">v1.0.4 • Local</span>
              </div>
              <div className="terminal-body">
                <div className="terminal-heading">
                  <span className="term-icon">{activeStep.icon}</span>
                  <strong>{activeStep.title}</strong>
                </div>

                <div className="terminal-metrics-list">
                  {activeStep.previewData.map((data, i) => (
                    <div key={i} className="term-metric-row">
                      <span className="term-lbl">{data.label}:</span>
                      <strong className="term-val">{data.value}</strong>
                    </div>
                  ))}
                </div>

                <div className="terminal-status-tag">
                  <span className="term-status-dot" />
                  <span>Pipeline Execution: NORMAL</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
