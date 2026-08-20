import React from 'react';
import { 
  ShoppingCart, Receipt, Package, ArrowLeftRight, 
  BarChart3, LayoutDashboard, Users, HardDrive, 
  Database, Cpu, Printer, Shield, Check, Clock
} from 'lucide-react';
import { Badge } from '../ui/Badge';
import './FeaturesSection.css';

interface FeatureItem {
  name: string;
  desc: string;
  status?: 'ready' | 'coming-soon';
}

interface FeatureCategory {
  category: string;
  badge: string;
  icon: React.ReactNode;
  items: FeatureItem[];
}

const FEATURE_GROUPS: FeatureCategory[] = [
  {
    category: 'CORE POS',
    badge: 'Transaksi Kasir',
    icon: <ShoppingCart size={20} className="feature-group-icon text-brand" />,
    items: [
      { name: 'Point of Sale Interface', desc: 'Antarmuka kasir cepat untuk input pesanan, scan barcode, dan kalkulasi subtotal otomatis.' },
      { name: 'Transaction Management', desc: 'Pencatatan riwayat nota, detail item belanja, metode pembayaran tunai/non-tunai, dan pembatalan transaksi.' },
      { name: 'Receipt & Struk Kasir', desc: 'Format cetak nota thermal 58mm/80mm standar dengan info toko, rincian barang, dan footer kustom.' },
    ],
  },
  {
    category: 'INVENTORY',
    badge: 'Katalog & Stok',
    icon: <Package size={20} className="feature-group-icon text-emerald" />,
    items: [
      { name: 'Product Management', desc: 'Katalog SKU, nama produk, kategori, barcode, harga modal (HPP), dan harga jual.' },
      { name: 'Stock Management', desc: 'Pemantauan kuantitas stok barang di gudang/toko dengan batas minimum peringatan low-stock.' },
      { name: 'Stock Movement Audit', desc: 'Pencatatan mutasi masuk (restock), mutasi keluar (penjualan kasir), dan penyesuaian opname fisik.' },
    ],
  },
  {
    category: 'BUSINESS',
    badge: 'Laporan & Analitik',
    icon: <BarChart3 size={20} className="feature-group-icon text-purple" />,
    items: [
      { name: 'Sales Reports', desc: 'Rekapitulasi penjualan harian, mingguan, dan bulanan terperinci berdasarkan periode tanggal.' },
      { name: 'Analytics & Profit Estimation', desc: 'Kalkulasi omset kotor, estimasi laba kotor berdasarkan HPP, dan tren produk terlaris.' },
      { name: 'Operational Dashboard', desc: 'Ringkasan ringkas performa toko: total transaksi hari ini, omset berjalan, dan status stok kritis.' },
    ],
  },
  {
    category: 'OPERATIONS',
    badge: 'Akses & Sistem',
    icon: <Users size={20} className="feature-group-icon text-brand" />,
    items: [
      { name: 'Role-Based Access Control', desc: 'Pemisahan hak akses staf: Kasir (hanya transaksi), Manager (stok & laporan), Owner (akses penuh).' },
      { name: 'Database Backup & Restore', desc: 'Ekspor database SQLite untuk pencadangan rutin ke penyimpanan lokal atau flashdisk.' },
      { name: 'Multi-Branch Sync Relay', desc: 'Sinkronisasi data antar cabang secara asinkron saat terhubung ke jaringan.', status: 'coming-soon' },
    ],
  },
  {
    category: 'TECHNOLOGY',
    badge: 'Arsitektur Sistem',
    icon: <Database size={20} className="feature-group-icon text-emerald" />,
    items: [
      { name: 'Offline-First Engine', desc: 'Seluruh logika bisnis dieksekusi secara lokal tanpa bergantung pada koneksi internet eksternal.' },
      { name: 'Local SQLite Storage', desc: 'Penyimpanan terstruktur dengan mode WAL untuk persistensi data transaksi yang aman dan cepat.' },
      { name: 'Hardware ESC/POS & Scanner', desc: 'Dukungan driver printer thermal USB/Bluetooth dan barcode scanner USB HID standar.' },
      { name: 'Local AI Assistant', desc: 'Asisten pemrosesan lokal untuk ringkasan laporan dan audit stok tanpa pengiriman data ke cloud.' },
    ],
  },
];

export const FeaturesSection: React.FC = () => {
  return (
    <section className="features-section" id="features">
      <div className="container features-container">
        <div className="section-head-center">
          <Badge variant="cyan" size="sm">Kemampuan Sistem</Badge>
          <h2 className="section-main-title">
            Fitur Terstruktur untuk Operasional Bisnis Nyata
          </h2>
          <p className="section-main-subtitle">
            Dikelompokkan berdasarkan kebutuhan operasional sehari-hari mulai dari kasir, inventaris, hingga pelaporan berkala.
          </p>
        </div>

        <div className="features-grouped-grid">
          {FEATURE_GROUPS.map((group, idx) => (
            <div key={idx} className="feature-group-card">
              <div className="group-header">
                <div className="group-title-row">
                  {group.icon}
                  <div>
                    <h3 className="group-title">{group.category}</h3>
                    <span className="group-badge-tag">{group.badge}</span>
                  </div>
                </div>
              </div>

              <div className="group-items-list">
                {group.items.map((item, itemIdx) => (
                  <div key={itemIdx} className="feature-subitem">
                    <div className="item-name-row">
                      <Check size={14} className="item-check-icon" />
                      <strong className="item-name">{item.name}</strong>
                      {item.status === 'coming-soon' && (
                        <span className="coming-soon-pill">
                          <Clock size={10} />
                          Coming Soon
                        </span>
                      )}
                    </div>
                    <p className="item-desc">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
