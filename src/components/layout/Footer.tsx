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
              <BrandLogo variant="full" size="sm" />
            </div>
            <p className="footer-manifesto">
              Platform Point of Sale & manajemen bisnis offline-first mandiri dengan database SQLite.
            </p>
            <div className="footer-status-pill">
              <StatusDot status="ready" label="Sistem Stabil • v1.0.4" size="sm" />
            </div>
          </div>

          <div className="footer-links-wrapper">
            <div className="footer-col">
              <h4 className="footer-col-title">Aplikasi</h4>
              <ul className="footer-links">
                <li><Link href="/pos">Kasir Web</Link></li>
                <li><Link href="/products">Katalog Modul</Link></li>
                <li><Link href="/downloads">Pusat Unduhan</Link></li>
              </ul>
            </div>

            <div className="footer-col">
              <h4 className="footer-col-title">Eksplorasi</h4>
              <ul className="footer-links">
                <li><Link href="/ai-lab">AI Lab</Link></li>
                <li><Link href="/projects">Kisah Sukses</Link></li>
                <li><Link href="/docs">Buku Panduan</Link></li>
              </ul>
            </div>

            <div className="footer-col">
              <h4 className="footer-col-title">Info</h4>
              <ul className="footer-links">
                <li><Link href="/about">Arsitektur</Link></li>
                <li><Link href="/releases">Changelog</Link></li>
              </ul>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <div className="footer-bottom-left">
            <span className="footer-copy">
              © {currentYear} ERASTACK • Offline-First Point of Sale
            </span>
          </div>

          <div className="footer-bottom-right">
            <span className="footer-tech-tag">SQLite • Local AI • Zero-Cloud</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
