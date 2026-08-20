import React from 'react';
import Link from 'next/link';
import { Download, ArrowRight, ShieldCheck, CheckCircle2, Zap, HardDrive } from 'lucide-react';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import './HeroSection.css';

export const HeroSection: React.FC = () => {
  return (
    <section className="hero-root">
      <div className="container hero-container">
        <div className="hero-content">
          <div className="hero-badge-wrap">
            <Badge variant="lime" size="sm" dot>
              Aplikasi Kasir Toko Bebas Biaya Langganan
            </Badge>
          </div>

          <h1 className="hero-headline">
            Solusi Kasir Pintar untuk <span className="hero-headline-highlight">Memajukan Toko & Usaha Anda</span>
          </h1>

          <p className="hero-subheadline">
            Kelola penjualan, stok barang, dan cetak struk nota dengan mudah dalam satu aplikasi kasir yang ringan. Berjalan 100% lancar walau tanpa internet, aman, dan gratis selamanya tanpa biaya sewa bulanan.
          </p>

          <div className="hero-cta-group">
            <Link href="/downloads" className="btn-full-wrap">
              <Button size="lg" variant="primary" leftIcon={<Download size={18} />}>
                Unduh Aplikasi Kasir Gratis
              </Button>
            </Link>

            <Link href="/products/pos" className="btn-full-wrap">
              <Button size="lg" variant="secondary" rightIcon={<ArrowRight size={16} />}>
                Lihat Keunggulan Toko
              </Button>
            </Link>
          </div>

          <div className="hero-trust-indicators">
            <div className="trust-indicator">
              <CheckCircle2 size={16} className="trust-icon" />
              <span>Bisa Dipakai Tanpa Internet</span>
            </div>
            <div className="trust-indicator">
              <CheckCircle2 size={16} className="trust-icon" />
              <span>Gratis Selamanya Tanpa Biaya Sewa</span>
            </div>
            <div className="trust-indicator">
              <CheckCircle2 size={16} className="trust-icon" />
              <span>Langsung Colok Printer & Scanner</span>
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
                    <strong className="store-name">Toko Sembako Barokah</strong>
                    <span className="store-status">Kasir Siap Melayani (100% Offline)</span>
                  </div>
                </div>
                <span className="live-badge">✓ Aktif</span>
              </div>

              <div className="cashier-mock-cart">
                <div className="cart-item-preview">
                  <div className="item-left">
                    <span className="item-name">Beras Rojolele 5kg</span>
                    <span className="item-qty">1x @ Rp 68.000</span>
                  </div>
                  <strong className="item-price">Rp 68.000</strong>
                </div>

                <div className="cart-item-preview">
                  <div className="item-left">
                    <span className="item-name">Minyak Goreng 2L</span>
                    <span className="item-qty">2x @ Rp 34.000</span>
                  </div>
                  <strong className="item-price">Rp 68.000</strong>
                </div>

                <div className="cart-item-preview">
                  <div className="item-left">
                    <span className="item-name">Gula Pasir 1kg</span>
                    <span className="item-qty">3x @ Rp 16.500</span>
                  </div>
                  <strong className="item-price">Rp 49.500</strong>
                </div>
              </div>

              <div className="cart-summary-box">
                <div className="summary-row">
                  <span>Total Belanjaan:</span>
                  <strong className="total-val">Rp 185.500</strong>
                </div>
                <div className="summary-row sub">
                  <span>Uang Diterima:</span>
                  <span>Rp 200.000</span>
                </div>
                <div className="summary-row change">
                  <span>Kembalian Uang:</span>
                  <strong className="change-val">Rp 14.500</strong>
                </div>
              </div>

              <div className="card-action-footer">
                <div className="footer-print-status">
                  <CheckCircle2 size={16} className="text-emerald" />
                  <span>Struk nota otomatis tercetak • Stok terpotong rapi</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
