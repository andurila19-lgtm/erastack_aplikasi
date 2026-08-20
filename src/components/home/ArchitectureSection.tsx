import React from 'react';
import { HardDrive, Database, Shield, Cpu, Printer, RefreshCw } from 'lucide-react';
import { Badge } from '../ui/Badge';
import './ArchitectureSection.css';

interface ArchItem {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const ARCHITECTURE_ITEMS: ArchItem[] = [
  {
    icon: <HardDrive size={20} />,
    title: 'Offline-First Architecture',
    description: 'Seluruh operasi kasir, pencarian produk, dan mutasi stok berjalan di perangkat lokal. Tidak memerlukan koneksi internet untuk fungsi inti.',
  },
  {
    icon: <Database size={20} />,
    title: 'Local SQLite Database',
    description: 'Data transaksi dan inventaris tersimpan dalam database SQLite di perangkat pengguna. Data tetap milik pemilik bisnis sepenuhnya.',
  },
  {
    icon: <Shield size={20} />,
    title: 'Role-Based Access Control',
    description: 'Pengaturan hak akses bertingkat: Owner, Manager, dan Kasir. Setiap level memiliki batasan operasi yang berbeda.',
  },
  {
    icon: <Cpu size={20} />,
    title: 'Local AI Assistant',
    description: 'Asisten AI berjalan langsung di perangkat tanpa mengirim data ke server eksternal. Membantu analisis penjualan dan monitoring stok.',
  },
  {
    icon: <Printer size={20} />,
    title: 'Hardware Integration',
    description: 'Mendukung printer thermal ESC/POS (USB & Bluetooth), barcode scanner, dan cash drawer melalui protokol standar industri.',
  },
  {
    icon: <RefreshCw size={20} />,
    title: 'Backup & Restore',
    description: 'Database SQLite dapat diekspor dan diimpor kapan saja. Mendukung backup manual ke media penyimpanan eksternal.',
  },
];

export const ArchitectureSection: React.FC = () => {
  return (
    <section className="architecture-section" id="architecture">
      <div className="container architecture-container">
        <div className="section-head-center">
          <Badge variant="cyan" size="sm">Engineering</Badge>
          <h2 className="section-main-title">
            Built for Real-World Business Operations
          </h2>
          <p className="section-main-subtitle">
            Arsitektur yang dirancang untuk keandalan operasional bisnis sehari-hari,
            bukan sekadar demo atau prototype.
          </p>
        </div>

        <div className="architecture-grid">
          {ARCHITECTURE_ITEMS.map((item, idx) => (
            <div key={idx} className="arch-card">
              <div className="arch-card-icon">{item.icon}</div>
              <h3 className="arch-card-title">{item.title}</h3>
              <p className="arch-card-desc">{item.description}</p>
            </div>
          ))}
        </div>

        <div className="architecture-status-bar">
          <span className="status-bar-label">Development Status</span>
          <span className="status-bar-value">Active Development — Core POS features operational</span>
        </div>
      </div>
    </section>
  );
};
