'use client';

import React from 'react';
import Link from 'next/link';
import { 
  Heart, ShieldCheck, HardDrive, DollarSign, 
  Store, Users, CheckCircle2, Download, 
  MessageSquare, ArrowRight, Award, Zap
} from 'lucide-react';
import { SEOHead } from '../components/common/SEOHead';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import './AboutPage.css';

export const AboutPage: React.FC = () => {
  return (
    <div className="about-page-root">
      <SEOHead
        title="Tentang ERASTACK POS • Misi Memajukan Bisnis & UMKM Indonesia"
        description="Pelajari visi dan komitmen ERASTACK POS dalam menghadirkan aplikasi kasir pintar 100% offline-first yang gratis digunakan selamanya tanpa biaya sewa langganan."
      />

      <section className="about-hero-section">
        <div className="container">
          <div className="about-hero-content">
            <Badge variant="lime" size="sm" dot>Tentang ERASTACK POS</Badge>
            
            <h1 className="about-hero-title">
              Membangun Teknologi Kasir yang <span className="highlight-text">Memerdekakan Usaha Anda</span>
            </h1>

            <p className="about-hero-desc">
              Kami percaya bahwa setiap pemilik toko, warung, kafe, dan UMKM di Indonesia berhak memiliki aplikasi kasir modern yang cepat, aman, dan menjadi aset milik Anda seutuhnya tanpa beban biaya langganan bulanan.
            </p>

            <div className="about-stats-pills">
              <div className="about-stat-box">
                <strong className="stat-big-number">1.200+</strong>
                <span className="stat-sub-label">Toko & Bisnis Aktif</span>
              </div>
              <div className="about-stat-box">
                <strong className="stat-big-number">Rp 0</strong>
                <span className="stat-sub-label">Biaya Sewa Selamanya</span>
              </div>
              <div className="about-stat-box">
                <strong className="stat-big-number">100%</strong>
                <span className="stat-sub-label">Kedaulatan Data Toko</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="about-values-section">
        <div className="container">
          <div className="section-head-center">
            <Badge variant="cyan" size="sm">Prinsip Utama Kami</Badge>
            <h2 className="section-main-title">3 Komitmen Fundamental untuk Pengusaha Indonesia</h2>
            <p className="section-main-subtitle">
              Fondasi yang membedakan ERASTACK POS dari aplikasi kasir konvensional di pasaran.
            </p>
          </div>

          <div className="values-grid">
            <div className="value-card">
              <div className="value-icon-box blue">
                <DollarSign size={26} />
              </div>
              <h3 className="value-title">100% Bebas Biaya Langganan</h3>
              <p className="value-desc">
                Keuntungan hasil keringat toko Anda adalah milik Anda sepenuhnya. Kami tidak membebankan biaya sewa per bulan atau memotong persentase dari setiap transaksi penjualan Anda.
              </p>
              <ul className="value-check-list">
                <li><CheckCircle2 size={15} className="text-emerald" /> Gratis digunakan selamanya</li>
                <li><CheckCircle2 size={15} className="text-emerald" /> Tanpa biaya perpanjangan lisensi</li>
              </ul>
            </div>

            <div className="value-card">
              <div className="value-icon-box green">
                <ShieldCheck size={26} />
              </div>
              <h3 className="value-title">Data Toko 100% Milik Anda</h3>
              <p className="value-desc">
                Seluruh catatan penjualan, harga modal, dan daftar pelanggan tersimpan aman di dalam memori komputer atau HP Anda sendiri. Data rahasia bisnis Anda tidak pernah dikirim ke pihak luar.
              </p>
              <ul className="value-check-list">
                <li><CheckCircle2 size={15} className="text-emerald" /> Privasi keuangan toko terjamin</li>
                <li><CheckCircle2 size={15} className="text-emerald" /> Backup data mudah ke flashdisk</li>
              </ul>
            </div>

            <div className="value-card">
              <div className="value-icon-box purple">
                <HardDrive size={26} />
              </div>
              <h3 className="value-title">Bebas Ketergantungan Internet</h3>
              <p className="value-desc">
                Jangan biarkan WiFi mati atau jaringan seluler lemot menghentikan antrean pembeli. Kasir ERASTACK POS beroperasi mandiri dan lancar tanpa perlu kuota internet.
              </p>
              <ul className="value-check-list">
                <li><CheckCircle2 size={15} className="text-emerald" /> Tetap jalan saat mati lampu / offline</li>
                <li><CheckCircle2 size={15} className="text-emerald" /> Scan barcode instan tanpa buffering</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="about-story-section">
        <div className="container">
          <div className="story-content-card">
            <div className="story-left-col">
              <Badge variant="lime" size="sm">Mengapa ERASTACK Diciptakan?</Badge>
              <h2 className="story-heading">Keresahan yang Mengubah Cara Toko Beroperasi</h2>
              <p className="story-paragraph">
                Kami melihat langsung bagaimana para pemilik warung kelontong, kedai kopi, butik pakaian, dan rumah makan sering kali kesulitan saat menggunakan aplikasi kasir berbasis cloud: saat internet mati kasir langsung macet, biaya langganan bulanan terus naik setiap tahun, dan data toko terkunci jika telat bayar sewa.
              </p>
              <p className="story-paragraph">
                <strong>ERASTACK POS lahir sebagai solusi tandingan:</strong> sebuah aplikasi kasir kelas profesional yang ringan, bisa berjalan di komputer lama, langsung bisa colok printer thermal apa saja, dan dilengkapi asisten AI pintar yang bekerja langsung di perangkat tanpa kuota internet.
              </p>
            </div>

            <div className="story-right-col">
              <div className="story-highlight-box">
                <Award size={32} className="highlight-icon" />
                <h4 className="highlight-title">Didukung Komunitas UMKM Nusantara</h4>
                <p className="highlight-desc">
                  Dikembangkan secara terbuka bersama ribuan pemilik usaha di Indonesia untuk memastikan setiap fitur benar-benar menjawab kebutuhan operasional toko sehari-hari.
                </p>
                <div className="highlight-badge-row">
                  <span className="h-badge">✓ Tanpa Iklan</span>
                  <span className="h-badge">✓ Ringan & Cepat</span>
                  <span className="h-badge">✓ Panduan Lengkap</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="about-cta-section">
        <div className="container">
          <div className="about-cta-card">
            <div className="cta-content-group">
              <Store size={44} className="cta-white-icon" />
              <h2 className="cta-big-title">Mulai Gunakan ERASTACK POS di Toko Anda Hari Ini</h2>
              <p className="cta-sub-title">
                Pemasangan hanya butuh waktu 1 menit. Langsung siap digunakan untuk mencatat transaksi jualan pertama Anda.
              </p>
            </div>

            <div className="cta-buttons-row">
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
                  Konsultasi via WhatsApp
                </Button>
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
