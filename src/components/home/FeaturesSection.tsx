import React from 'react';
import { 
  Zap, Package, BarChart3, Bot, Users, Printer, 
  Check
} from 'lucide-react';
import { Badge } from '../ui/Badge';
import './FeaturesSection.css';

interface FeatureItem {
  id: string;
  title: string;
  badge: string;
  description: string;
  icon: React.ReactNode;
  highlights: string[];
  visualMetric: { label: string; value: string };
}

const FEATURES: FeatureItem[] = [
  {
    id: 'pos',
    title: 'Point of Sale (Kasir Digital Cepat)',
    badge: 'Latensi < 15ms',
    description: 'Proses kasir kilat dengan pencarian barcode instan, dukungan multi-pembayaran (Tunai, QRIS, Transfer), dan pencetakan nota otomatis via USB / Bluetooth.',
    icon: <Zap size={22} className="feature-icon-blue" />,
    highlights: ['Scan barcode scanner otomatis', 'Split bill & diskon bertingkat', 'Cetak struk thermal 58mm / 80mm'],
    visualMetric: { label: 'Kecepatan Scan', value: '12ms' },
  },
  {
    id: 'inventory',
    title: 'Kelola Stok Barang & Bahan Baku',
    badge: 'Otomatis Real-time',
    description: 'Mutasi stok berkurang otomatis setiap ada transaksi kasir. Notifikasi dini saat stok menipis serta pencatatan HPP akurat berbasis Average/FIFO.',
    icon: <Package size={22} className="feature-icon-lime" />,
    highlights: ['Kartu stok & riwayat mutasi', 'Resep bahan baku (BOM F&B)', 'Peringatan low-stock otomatis'],
    visualMetric: { label: 'Akurasi Stok', value: '100%' },
  },
  {
    id: 'reports',
    title: 'Laporan Keuangan & Laba Rugi Lengkap',
    badge: 'Otomatis Siap Cetak',
    description: 'Pantau omset harian, laba kotor, laba bersih, metode pembayaran terpopuler, hingga rekap shift kasir tanpa perlu rekap manual di buku.',
    icon: <BarChart3 size={22} className="feature-icon-cyan" />,
    highlights: ['Laporan laba kotor & bersih', 'Audit selisih uang kas kasir', 'Ekspor ke Excel, PDF, & CSV'],
    visualMetric: { label: 'Waktu Rekap', value: '0 Detik' },
  },
  {
    id: 'ai-assistant',
    title: 'Asisten Bisnis AI Lokal (On-Device SLM)',
    badge: 'Bebas Biaya Token',
    description: 'Asisten cerdas yang menganalisis pola penjualan Anda secara lokal di perangkat. Memberikan prediksi restock dan rekomendasi harga optimal.',
    icon: <Bot size={22} className="feature-icon-lime" />,
    highlights: ['Analisa barang paling menguntungkan', 'Prediksi stok habis harian', 'Data privasi 100% aman di perangkat'],
    visualMetric: { label: 'Biaya Cloud API', value: 'Rp 0' },
  },
  {
    id: 'multistore',
    title: 'Manajemen Multi-Cabang & Karyawan',
    badge: 'Hak Akses Bertingkat',
    description: 'Kelola kasir di banyak cabang toko dalam satu sistem. Atur otorisasi hak akses staf (Owner, Manajer, Kasir) untuk mencegah kecurangan.',
    icon: <Users size={22} className="feature-icon-blue" />,
    highlights: ['PIN kasir & audit log mutasi', 'Otorisasi pembatalan (Void/Diskon)', 'Sinkronisasi multi-device aman'],
    visualMetric: { label: 'Maksimal Cabang', value: 'Tak Terbatas' },
  },
  {
    id: 'hardware',
    title: 'Integrasi Hardware Kasir Siap Pakai',
    badge: 'Universal Driver',
    description: 'Kompatibel langsung dengan berbagai printer thermal (Epson, Panda, Iware, Xprinter), barcode scanner Bluetooth/USB, dan laci kasir elektronik RJ11.',
    icon: <Printer size={22} className="feature-icon-cyan" />,
    highlights: ['Printer Bluetooth & USB ESC/POS', 'Barcode scanner HID auto-detect', 'Auto-open cash drawer saat bayar'],
    visualMetric: { label: 'Kompatibilitas', value: 'Semua Merk' },
  },
];

export const FeaturesSection: React.FC = () => {
  return (
    <section className="features-section" id="features">
      <div className="container features-container">
        <div className="section-head-center">
          <Badge variant="lime" size="sm" dot>Ekosistem Fitur Terintegrasi</Badge>
          <h2 className="section-main-title">
            Fitur Lengkap yang Mengoptimalkan Seluruh Operasional Bisnis Anda
          </h2>
          <p className="section-main-subtitle">
            Dirancang dari kebutuhan nyata puluhan ribu pedagang ritel dan kuliner di Indonesia dengan standar stabilitas offline tertinggi.
          </p>
        </div>

        <div className="features-grid">
          {FEATURES.map((f) => (
            <div key={f.id} className="feature-carbon-card">
              <div className="card-top-row">
                <div className="feature-icon-box">{f.icon}</div>
                <div className="feature-metric-pill">
                  <span className="metric-label">{f.visualMetric.label}:</span>
                  <span className="metric-val tabular-nums">{f.visualMetric.value}</span>
                </div>
              </div>

              <div className="card-title-row">
                <h3 className="feature-card-title">{f.title}</h3>
                <span className="feature-tag">{f.badge}</span>
              </div>

              <p className="feature-card-desc">{f.description}</p>

              <ul className="feature-checklist">
                {f.highlights.map((h, i) => (
                  <li key={i} className="checklist-item">
                    <Check size={14} className="check-bullet" />
                    <span>{h}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
