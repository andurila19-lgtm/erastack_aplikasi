import React, { useState } from 'react';
import { 
  UtensilsCrossed, Store, Smartphone, ShoppingBag, 
  Scissors, Wrench, Check 
} from 'lucide-react';
import { Badge } from '../ui/Badge';
import './BusinessSolutionsSection.css';

interface SolutionCategory {
  id: string;
  name: string;
  icon: React.ReactNode;
  tagline: string;
  description: string;
  features: string[];
}

const SOLUTIONS: SolutionCategory[] = [
  {
    id: 'retail',
    name: 'Retail & Toko Kelontong',
    icon: <Store size={20} />,
    tagline: 'Minimarket, Toko Bahan Pokok, & Toko Plastik',
    description: 'Pencarian cepat katalog SKU menggunakan barcode scanner USB HID, pemotongan stok otomatis, dan pencatatan riwayat nota penjualan.',
    features: ['Integrasi barcode scanner USB HID', 'Katalog SKU & kategori bertingkat', 'Pencatatan harga modal & harga jual'],
  },
  {
    id: 'fnb',
    name: 'Kuliner & Kedai Kopi',
    icon: <UtensilsCrossed size={20} />,
    tagline: 'Kafe, Kedai Kopi, & Food Stall',
    description: 'Antarmuka kasir layar sentuh untuk input pesanan cepat, pencetakan struk thermal 58mm/80mm, dan pemantauan stok bahan baku.',
    features: ['Navigasi sentuh kategori menu', 'Cetak nota thermal Bluetooth/USB', 'Peringatan stok bahan baku menipis'],
  },
  {
    id: 'fashion',
    name: 'Fashion & Butik',
    icon: <ShoppingBag size={20} />,
    tagline: 'Distro, Toko Pakaian, & Toko Sepatu',
    description: 'Manajemen varian produk berdasarkan ukuran dan warna, pencarian SKU fleksibel, dan penerapan diskon promo pada transaksi.',
    features: ['Struktur varian ukuran & warna', 'Pencarian SKU cepat', 'Penerapan diskon per item & per nota'],
  },
  {
    id: 'services',
    name: 'Jasa & Barbershop',
    icon: <Scissors size={20} />,
    tagline: 'Pangkas Rambut, Studio Grooming, & Salon',
    description: 'Katalog fleksibel untuk item layanan jasa dan produk fisik, pembayaran tunai/non-tunai, dan rekapitulasi shift staf.',
    features: ['Katalog kombinasi jasa & produk', 'Rekap transaksi per shift kasir', 'Penyimpanan data lokal di perangkat'],
  },
  {
    id: 'workshop',
    name: 'Bengkel & Sparepart',
    icon: <Wrench size={20} />,
    tagline: 'Bengkel Motor & Toko Onderdil',
    description: 'Struk transaksi yang menggabungkan biaya jasa servis montir dan suku cadang dalam satu nota pembayaran terstruktur.',
    features: ['Nota rincian jasa & suku cadang', 'Audit mutasi stok masuk dan keluar', 'Ekspor rekap laporan penjualan'],
  },
];

export const BusinessSolutionsSection: React.FC = () => {
  const [selectedId, setSelectedId] = useState<string>('retail');

  const selectedSolution = SOLUTIONS.find((s) => s.id === selectedId) || SOLUTIONS[0];

  return (
    <section className="solutions-section" id="solutions">
      <div className="container solutions-container">
        <div className="section-head-center">
          <Badge variant="cyan" size="sm">Skenario Operasional</Badge>
          <h2 className="section-main-title">
            Disesuaikan dengan Karakteristik Operasional Bisnis
          </h2>
          <p className="section-main-subtitle">
            Setiap sektor usaha memiliki kebutuhan transaksi yang berbeda. Pilih bidang usaha untuk melihat implementasi alur kerja terkait.
          </p>
        </div>

        <div className="solutions-tabs-nav">
          {SOLUTIONS.map((s) => {
            const isSelected = s.id === selectedId;
            return (
              <button
                key={s.id}
                type="button"
                className={`solution-nav-btn ${isSelected ? 'is-active' : ''}`}
                onClick={() => setSelectedId(s.id)}
              >
                <span className="btn-icon">{s.icon}</span>
                <span className="btn-text">{s.name}</span>
              </button>
            );
          })}
        </div>

        <div className="solution-spotlight-card">
          <div className="spotlight-left">
            <div className="spotlight-badge-row">
              <span className="spotlight-icon-wrap">{selectedSolution.icon}</span>
              <span className="spotlight-tag">{selectedSolution.tagline}</span>
            </div>

            <h3 className="spotlight-title">{selectedSolution.name}</h3>
            <p className="spotlight-description">{selectedSolution.description}</p>

            <div className="spotlight-checklist">
              {selectedSolution.features.map((feat, idx) => (
                <div key={idx} className="spotlight-feature-row">
                  <div className="spotlight-check-dot">
                    <Check size={12} />
                  </div>
                  <span>{feat}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="spotlight-right">
            <div className="spotlight-mockup-box">
              <div className="mockup-header-bar">
                <span className="mockup-dot red" />
                <span className="mockup-dot yellow" />
                <span className="mockup-dot green" />
                <span className="mockup-bar-title">{selectedSolution.name} • Alur Kerja</span>
              </div>
              <div className="mockup-content-body">
                <div className="workflow-step">
                  <span className="step-num">01</span>
                  <div className="step-info">
                    <span className="step-title">Konfigurasi Katalog Produk</span>
                    <span className="step-desc">Input data SKU, nama item, harga modal, dan barcode</span>
                  </div>
                </div>
                <div className="workflow-step">
                  <span className="step-num">02</span>
                  <div className="step-info">
                    <span className="step-title">Koneksi Hardware Kasir</span>
                    <span className="step-desc">Hubungkan printer thermal USB/Bluetooth dan barcode scanner</span>
                  </div>
                </div>
                <div className="workflow-step">
                  <span className="step-num">03</span>
                  <div className="step-info">
                    <span className="step-title">Operasi Kasir Offline</span>
                    <span className="step-desc">Transaksi diproses dan dicatat langsung ke database SQLite lokal</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
