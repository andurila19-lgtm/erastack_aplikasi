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
    id: 'fnb',
    name: 'Kuliner & F&B',
    icon: <UtensilsCrossed size={20} />,
    tagline: 'Kafe, Restoran, Kedai Kopi, & Fast Food',
    description: 'Manajemen nomor meja, cetak struk pesanan ke dapur (Kitchen Printer), split bill otomatis, dan kontrol stok bahan baku resep makanan.',
    features: ['Dukungan kitchen & bar printer', 'Modul meja & nomor antrean', 'Resep bahan baku (BOM) otomatis'],
  },
  {
    id: 'retail',
    name: 'Minimarket & Retail',
    icon: <Store size={20} />,
    tagline: 'Toko Kelontong, Swalayan, & Toko Plastik',
    description: 'Pencarian kilat puluhan ribu SKU barang dengan barcode scanner, harga grosir bertingkat, dan notifikasi stok menipis.',
    features: ['Scan puluhan ribu barcode instan', 'Harga grosir & kuantitas bertingkat', 'Cetak label barcode harga rak'],
  },
  {
    id: 'counter',
    name: 'Counter HP & Gadget',
    icon: <Smartphone size={20} />,
    tagline: 'Konter Pulsa, Toko Aksesoris, & Service HP',
    description: 'Pencatatan nomor seri IMEI, penjualan pulsa & paket data PPOB, serta pelacakan status nota servis handphone pelanggan.',
    features: ['Pelacakan serial number / IMEI', 'Laporan transaksi pulsa & PPOB', 'Tracking nota tanda terima servis'],
  },
  {
    id: 'fashion',
    name: 'Fashion & Butik',
    icon: <ShoppingBag size={20} />,
    tagline: 'Distro, Toko Pakaian, & Toko Sepatu',
    description: 'Manajemen produk dengan varian warna, ukuran (S, M, L, XL), cetak barcode mandiri, dan integrasi katalog penjualan digital.',
    features: ['Matriks varian ukuran & warna', 'Cetak barcode label pakaian', 'Diskon promo member & voucher'],
  },
  {
    id: 'services',
    name: 'Barbershop & Salon',
    icon: <Scissors size={20} />,
    tagline: 'Pangkas Rambut, Salon Kecantikan, & Spa',
    description: 'Perhitungan komisi kapster / terapis otomatis per layanan, antrean pelanggan, dan pencatatan riwayat treatment pelanggan setia.',
    features: ['Bagi hasil & komisi staf otomatis', 'Manajemen reservasi & antrean', 'Database pelanggan & riwayat servis'],
  },
  {
    id: 'workshop',
    name: 'Bengkel & Sparepart',
    icon: <Wrench size={20} />,
    tagline: 'Bengkel Motor, Mobil, & Toko Onderdil',
    description: 'Penggabungan biaya jasa mekanik dan sparepart dalam satu nota, pencatatan nomor polisi kendaraan, dan pengingat servis berkala.',
    features: ['Nota gabungan jasa servis + part', 'Catatan nopol & riwayat kendaraan', 'Manajemen komisi mekanik'],
  },
];

export const BusinessSolutionsSection: React.FC = () => {
  const [selectedId, setSelectedId] = useState<string>('fnb');

  const selectedSolution = SOLUTIONS.find((s) => s.id === selectedId) || SOLUTIONS[0];

  return (
    <section className="solutions-section" id="solutions">
      <div className="container solutions-container">
        <div className="section-head-center">
          <Badge variant="cyan" size="sm">Solusi Spesifik Industri</Badge>
          <h2 className="section-main-title">
            Dirancang Khusus Sesuai Karakteristik Usaha Anda
          </h2>
          <p className="section-main-subtitle">
            Setiap industri memiliki alur transaksi yang berbeda. Pilih jenis bisnis Anda untuk melihat fitur kasir yang relevan.
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
                <span className="mockup-bar-title">{selectedSolution.name} • Preset Workflow</span>
              </div>
              <div className="mockup-content-body">
                <div className="workflow-step">
                  <span className="step-num">01</span>
                  <div className="step-info">
                    <span className="step-title">Setup Katalog & Kategori</span>
                    <span className="step-desc">Impor data produk via Excel atau input langsung</span>
                  </div>
                </div>
                <div className="workflow-step">
                  <span className="step-num">02</span>
                  <div className="step-info">
                    <span className="step-title">Hubungkan Mesin & Printer</span>
                    <span className="step-desc">Auto-detect printer kasir thermal USB & Bluetooth</span>
                  </div>
                </div>
                <div className="workflow-step">
                  <span className="step-num">03</span>
                  <div className="step-info">
                    <span className="step-title">Mulai Jualan 100% Offline</span>
                    <span className="step-desc">Scan barcode kilat tanpa takut internet gangguan</span>
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
