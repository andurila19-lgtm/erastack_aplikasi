import React from 'react';
import Link from 'next/link';
import { ArrowRight, CheckCircle2, Play, Database, HardDrive, Printer } from 'lucide-react';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import './HeroSection.css';

export const HeroSection: React.FC = () => {
  return (
    <section className="hero-root">
      <div className="container hero-container">
        <div className="hero-content">
          <div className="hero-badge-wrap">
            <Badge variant="cyan" size="sm" dot>
              Offline-First POS Platform • Active Development
            </Badge>
          </div>

          <h1 className="hero-headline">
            ERASTACK <span className="hero-headline-highlight">Offline-First Point of Sale</span> & Business Management Platform
          </h1>

          <p className="hero-subheadline">
            Platform POS modern untuk mengelola transaksi, produk, inventory, laporan, dan operasional bisnis dengan pendekatan offline-first.
          </p>

          <div className="hero-cta-group">
            <Link href="/pos" className="btn-full-wrap">
              <Button size="lg" variant="primary" leftIcon={<Play size={18} />}>
                Try Demo
              </Button>
            </Link>

            <a href="#features" className="btn-full-wrap">
              <Button size="lg" variant="secondary" rightIcon={<ArrowRight size={16} />}>
                Explore Features
              </Button>
            </a>
          </div>

          <div className="hero-trust-indicators">
            <div className="trust-indicator">
              <HardDrive size={16} className="trust-icon" />
              <span>Operasi Mandiri Tanpa Internet</span>
            </div>
            <div className="trust-indicator">
              <Database size={16} className="trust-icon" />
              <span>Penyimpanan SQLite Lokal</span>
            </div>
            <div className="trust-indicator">
              <Printer size={16} className="trust-icon" />
              <span>Dukungan Printer ESC/POS & Scanner</span>
            </div>
          </div>
        </div>

        <div className="hero-visual-col">
          <div className="hero-preview-wrapper">
            <div className="hero-cashier-card">
              <div className="card-top-bar">
                <div className="store-identity">
                  <div className="store-icon-dot" />
                  <div>
                    <strong className="store-name">EraStack POS Terminal</strong>
                    <span className="store-status">Database SQLite Lokal • Mode Kasir Aktif</span>
                  </div>
                </div>
                <span className="live-badge">Siap Transaksi</span>
              </div>

              <div className="cashier-mock-cart">
                <div className="cart-item-preview">
                  <div className="item-left">
                    <span className="item-name">Beras Premium 5kg</span>
                    <span className="item-qty">1x @ Rp 68.000 (SKU-1021)</span>
                  </div>
                  <strong className="item-price">Rp 68.000</strong>
                </div>

                <div className="cart-item-preview">
                  <div className="item-left">
                    <span className="item-name">Minyak Goreng 2L</span>
                    <span className="item-qty">2x @ Rp 34.000 (SKU-2044)</span>
                  </div>
                  <strong className="item-price">Rp 68.000</strong>
                </div>

                <div className="cart-item-preview">
                  <div className="item-left">
                    <span className="item-name">Gula Pasir 1kg</span>
                    <span className="item-qty">3x @ Rp 16.500 (SKU-3091)</span>
                  </div>
                  <strong className="item-price">Rp 49.500</strong>
                </div>
              </div>

              <div className="cart-summary-box">
                <div className="summary-row">
                  <span>Subtotal Transaksi:</span>
                  <strong className="total-val">Rp 185.500</strong>
                </div>
                <div className="summary-row sub">
                  <span>Pembayaran Tunai:</span>
                  <span>Rp 200.000</span>
                </div>
                <div className="summary-row change">
                  <span>Kembalian:</span>
                  <strong className="change-val">Rp 14.500</strong>
                </div>
              </div>

              <div className="card-action-footer">
                <div className="footer-print-status">
                  <CheckCircle2 size={16} className="text-emerald" />
                  <span>Transaksi atomic commit • Mutasi stok tercatat ke database lokal</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
