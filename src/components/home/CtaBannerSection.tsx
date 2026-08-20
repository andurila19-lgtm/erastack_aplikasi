import React from 'react';
import Link from 'next/link';
import { Play, ArrowRight, CheckCircle2, HardDrive, ShieldCheck, Database } from 'lucide-react';
import { Button } from '../ui/Button';
import './CtaBannerSection.css';

export const CtaBannerSection: React.FC = () => {
  return (
    <section className="cta-banner-root">
      <div className="container">
        <div className="cta-banner-card">
          <div className="cta-banner-content">
            <h2 className="cta-banner-title">
              Coba Terminal POS EraStack Sekarang
            </h2>

            <p className="cta-banner-desc">
              Eksplorasi fungsionalitas kasir, katalog produk, dan pencatatan transaksi langsung melalui demo interaktif di browser Anda.
            </p>

            <div className="cta-banner-actions">
              <Link href="/pos" className="btn-full-wrap">
                <Button size="lg" variant="primary" leftIcon={<Play size={18} />}>
                  Buka Demo Kasir Web
                </Button>
              </Link>

              <Link href="/docs" className="btn-full-wrap">
                <Button size="lg" variant="secondary" rightIcon={<ArrowRight size={18} />}>
                  Baca Dokumentasi Teknis
                </Button>
              </Link>
            </div>

            <div className="cta-banner-guarantees">
              <span className="guarantee-item">
                <HardDrive size={15} className="guarantee-icon" />
                <span>Operasi Mandiri Offline</span>
              </span>
              <span className="guarantee-item">
                <Database size={15} className="guarantee-icon" />
                <span>Penyimpanan Lokal SQLite</span>
              </span>
              <span className="guarantee-item">
                <ShieldCheck size={15} className="guarantee-icon" />
                <span>Tanpa Penguncian Vendor Cloud</span>
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
