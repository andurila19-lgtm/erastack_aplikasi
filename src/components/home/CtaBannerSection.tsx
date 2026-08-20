import React from 'react';
import Link from 'next/link';
import { Download, MessageSquare, ShieldCheck, CheckCircle2, Store } from 'lucide-react';
import { Button } from '../ui/Button';
import './CtaBannerSection.css';

export const CtaBannerSection: React.FC = () => {
  return (
    <section className="cta-banner-root">
      <div className="container">
        <div className="cta-banner-card">
          <div className="cta-banner-content">
            <div className="cta-icon-wrap">
              <Store size={44} className="cta-store-icon" />
            </div>

            <h2 className="cta-banner-title">
              Siap Memajukan Toko Anda dengan ERASTACK POS?
            </h2>

            <p className="cta-banner-desc">
              Tinggalkan cara manual dan hilangkan kekhawatiran kasir macet saat internet mati. Unduh sekarang dan mulai kelola usaha Anda dengan lebih rapi, cepat, dan menguntungkan.
            </p>

            <div className="cta-banner-actions">
              <Link href="/downloads" className="btn-full-wrap">
                <Button size="lg" variant="primary" leftIcon={<Download size={18} />}>
                  Unduh Aplikasi Kasir Gratis
                </Button>
              </Link>

              <a 
                href="https://wa.me/6281234567890" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="btn-full-wrap"
              >
                <Button size="lg" variant="secondary" leftIcon={<MessageSquare size={18} />}>
                  Konsultasi Toko via WhatsApp
                </Button>
              </a>
            </div>

            <div className="cta-banner-guarantees">
              <span className="guarantee-item">
                <CheckCircle2 size={15} className="guarantee-icon" />
                <span>100% Gratis Selamanya</span>
              </span>
              <span className="guarantee-item">
                <CheckCircle2 size={15} className="guarantee-icon" />
                <span>Bisa Dipakai Tanpa Internet</span>
              </span>
              <span className="guarantee-item">
                <CheckCircle2 size={15} className="guarantee-icon" />
                <span>Pemasangan Cepat 1 Menit</span>
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
