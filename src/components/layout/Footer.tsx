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
              Platform Point of Sale & manajemen bisnis modern dengan pendekatan offline-first untuk operasional kasir, inventaris, dan pelaporan yang mandiri.
            </p>
            <div className="footer-status-pill">
              <StatusDot status="ready" label="Status: Active Development" size="sm" />
            </div>
          </div>

          <div className="footer-col">
            <h4 className="footer-col-title">Aplikasi & Modul</h4>
            <ul className="footer-links">
              <li><Link href="/pos">Web POS Terminal</Link></li>
              <li><Link href="/products/pos">EraStack Desktop & Mobile</Link></li>
              <li><Link href="/products">Katalog Software</Link></li>
              <li><Link href="/downloads">Pusat Unduhan</Link></li>
            </ul>
          </div>

          <div className="footer-col">
            <h4 className="footer-col-title">Dokumentasi & Fitur</h4>
            <ul className="footer-links">
              <li><Link href="/projects">Solusi Industri</Link></li>
              <li><Link href="/ai-lab">Local AI Assistant</Link></li>
              <li><Link href="/docs">Dokumentasi Teknis</Link></li>
              <li><Link href="/releases">Catatan Rilis (Changelog)</Link></li>
            </ul>
          </div>

          <div className="footer-col">
            <h4 className="footer-col-title">Tentang EraStack</h4>
            <ul className="footer-links">
              <li><Link href="/about">Arsitektur & Prinsip</Link></li>
              <li><Link href="/about#principles">Kedaulatan Data Lokal</Link></li>
              <li><Link href="/docs#installation">Panduan Instalasi</Link></li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <div className="footer-bottom-left">
            <span className="footer-copy">
              © {currentYear} ERASTACK. Offline-First Point of Sale & Business Platform.
            </span>
          </div>

          <div className="footer-bottom-right">
            <span className="footer-tech-tag">Offline-First • SQLite Storage • Local AI</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
