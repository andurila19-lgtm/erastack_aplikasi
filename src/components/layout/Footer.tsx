import React from 'react';
import Link from 'next/link';
import { StatusDot } from '../ui/StatusDot';
import { BrandLogo } from '../common/BrandLogo';
import './Footer.css';

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer-root">
      <div className="container footer-container">
        <div className="footer-grid">
          <div className="footer-col footer-col-brand">
            <div className="footer-brand">
              <BrandLogo variant="full" size="md" />
            </div>
            <p className="footer-manifesto">
              Aplikasi kasir pintar mandiri untuk memajukan toko, warung, kafe, dan UMKM di seluruh Indonesia. Gratis digunakan selamanya tanpa biaya sewa bulanan.
            </p>
            <div className="footer-status-pill">
              <StatusDot status="ready" label="Aplikasi Kasir Aktif • Bebas Kuota" size="sm" />
            </div>
          </div>

          <div className="footer-col">
            <h4 className="footer-col-title">Produk Kasir</h4>
            <ul className="footer-links">
              <li><Link href="/products/pos">ERASTACK POS (PC & HP)</Link></li>
              <li><Link href="/products">Katalog Aplikasi Toko</Link></li>
              <li><Link href="/downloads">Unduh Installer Windows</Link></li>
              <li><Link href="/downloads">Unduh APK Android</Link></li>
              <li><Link href="/downloads">Cetak Barcode & Label</Link></li>
            </ul>
          </div>

          <div className="footer-col">
            <h4 className="footer-col-title">Fitur & Panduan</h4>
            <ul className="footer-links">
              <li><Link href="/ai-lab">Asisten AI Toko</Link></li>
              <li><Link href="/projects">Kisah Sukses Pengusaha</Link></li>
              <li><Link href="/docs">Buku Panduan Kasir</Link></li>
              <li><Link href="/releases">Catatan Pembaruan Sistem</Link></li>
            </ul>
          </div>

          <div className="footer-col">
            <h4 className="footer-col-title">Tentang ERASTACK</h4>
            <ul className="footer-links">
              <li><Link href="/about">Visi & Komitmen Kami</Link></li>
              <li><Link href="/about">100% Bebas Biaya Sewa</Link></li>
              <li><Link href="/about">Kedaulatan Data Usaha</Link></li>
              <li><a href="https://wa.me/6281234567890" target="_blank" rel="noopener noreferrer">Konsultasi via WhatsApp</a></li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <div className="footer-bottom-left">
            <span className="footer-copy">
              © {currentYear} ERASTACK POS. Memajukan Usaha & UMKM di Seluruh Indonesia.
            </span>
          </div>

          <div className="footer-bottom-right">
            <span className="footer-tech-tag">100% Offline • Bebas Kuota • Aman</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
