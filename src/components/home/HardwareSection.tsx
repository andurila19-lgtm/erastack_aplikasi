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
    name: 'Printer Thermal 58mm & 80mm',
    category: 'Pencetak Struk Kasir',
    specs: ['Protokol standar ESC/POS', 'Mendukung format teks monospaced', 'Pencetakan nota tanpa tinta (thermal)'],
    connection: 'Bluetooth / USB ESC/POS',
    icon: <Printer size={22} className="hw-icon-blue" />,
  },
  {
    id: 'scanner',
    name: 'Barcode Scanner 1D & 2D',
    category: 'Pemindai Barcode',
    specs: ['Protokol keyboard emulation (HID)', 'Membaca format EAN-13, UPC, Code128, QR', 'Mode auto-sensing atau trigger'],
    connection: 'USB HID / Wireless 2.4G',
    icon: <Scan size={22} className="hw-icon-lime" />,
  },
  {
    id: 'drawer',
    name: 'Cash Drawer (Laci Kasir)',
    category: 'Laci Uang Kasir',
    specs: ['Koneksi pin solenoid RJ11 standar', 'Terpicu otomatis saat perintah cetak struk', 'Kompartemen uang kertas & koin'],
    connection: 'Kabel RJ11 ke Printer Thermal',
    icon: <Archive size={22} className="hw-icon-cyan" />,
  },
  {
    id: 'terminal',
    name: 'Terminal Perangkat Kasir',
    category: 'Perangkat Utama',
    specs: ['Kompatibel dengan OS Windows 10/11 & Android', 'Konsumsi RAM efisien', 'Dukungan layar sentuh & keyboard-mouse'],
    connection: 'Windows Desktop / Android Mobile',
    icon: <Layers size={22} className="hw-icon-lime" />,
  },
];

export const HardwareSection: React.FC = () => {
  return (
    <section className="hardware-section" id="hardware">
      <div className="container hardware-container">
        <div className="section-head-center">
          <Badge variant="cyan" size="sm">Integrasi Hardware</Badge>
          <h2 className="section-main-title">
            Dukungan Protokol Hardware Standar Industri
          </h2>
          <p className="section-main-subtitle">
            EraStack dirancang untuk berkomunikasi dengan periferal kasir standar menggunakan protokol universal tanpa ketergantungan pada vendor perangkat keras tunggal.
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
