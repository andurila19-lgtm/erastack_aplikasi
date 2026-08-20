import React from 'react';
import { Printer, Scan, Archive, Layers, Check } from 'lucide-react';
import { Badge } from '../ui/Badge';
import './HardwareSection.css';

interface HardwareItem {
  id: string;
  name: string;
  category: string;
  specs: string[];
  connection: string;
  icon: React.ReactNode;
}

const HARDWARE_ITEMS: HardwareItem[] = [
  {
    id: 'printer',
    name: 'Thermal Printer 58mm & 80mm',
    category: 'Pencetak Struk Kasir',
    specs: ['Auto-cutter kecepatan 160mm/s', 'Mendukung logo toko & QRIS', 'Tanpa tinta (hemat operasional)'],
    connection: 'Bluetooth + USB ESC/POS',
    icon: <Printer size={24} className="hw-icon-blue" />,
  },
  {
    id: 'scanner',
    name: 'Wireless 1D & 2D Barcode Scanner',
    category: 'Pemindai Barcode',
    specs: ['Membaca barcode layar HP & fisik', 'Jarak transmisi hingga 15 meter', 'Auto-sensing sensor cepat'],
    connection: 'Wireless 2.4G + USB HID',
    icon: <Scan size={24} className="hw-icon-lime" />,
  },
  {
    id: 'drawer',
    name: 'Heavy Duty Cash Drawer (RJ11)',
    category: 'Laci Uang Kasir',
    specs: ['Baja tahan banting 4 bill / 8 coin', 'Kunci manual 3-posisi', 'Terbuka otomatis saat cetak struk'],
    connection: 'Kabel RJ11 ke Printer',
    icon: <Archive size={24} className="hw-icon-cyan" />,
  },
  {
    id: 'bundle',
    name: 'Paket Hardware POS Komplit',
    category: 'Paket Usaha Siap Jualan',
    specs: ['Termasuk Printer + Scanner + Drawer', 'Kertas thermal roll 10x', 'Siap pakai langsung tanpa setting rumit'],
    connection: 'All-in-One Plug & Play',
    icon: <Layers size={24} className="hw-icon-lime" />,
  },
];

export const HardwareSection: React.FC = () => {
  return (
    <section className="hardware-section" id="hardware">
      <div className="container hardware-container">
        <div className="section-head-center">
          <Badge variant="lime" size="sm" dot>Ekosistem Hardware Mesin Kasir</Badge>
          <h2 className="section-main-title">
            Perangkat Hardware Kasir Terbaik untuk Kelancaran Transaksi
          </h2>
          <p className="section-main-subtitle">
            Seluruh hardware teruji 100% kompatibel dengan ERASTACK POS (Windows & Android) secara instan tanpa perlu instalasi driver yang rumit.
          </p>
        </div>

        <div className="hardware-grid">
          {HARDWARE_ITEMS.map((hw) => (
            <div key={hw.id} className="hardware-carbon-card">
              <div className="hw-top-bar">
                <div className="hw-icon-box">{hw.icon}</div>
                <span className="hw-conn-tag">{hw.connection}</span>
              </div>

              <div className="hw-title-group">
                <h3 className="hw-name">{hw.name}</h3>
                <span className="hw-category">{hw.category}</span>
              </div>

              <ul className="hw-specs-list">
                {hw.specs.map((spec, i) => (
                  <li key={i} className="hw-spec-item">
                    <Check size={14} className="hw-check" />
                    <span>{spec}</span>
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
