import React from 'react';
import { Star, TrendingUp } from 'lucide-react';
import { Badge } from '../ui/Badge';
import './TestimonialsSection.css';

interface Testimonial {
  name: string;
  role: string;
  business: string;
  location: string;
  quote: string;
  impactMetric: string;
}

const TESTIMONIALS: Testimonial[] = [
  {
    name: 'Budi Santoso',
    role: 'Owner',
    business: 'Kopi Kenangan Senja (3 Cabang)',
    location: 'Bandung',
    quote: 'Dulu sering panik kalau WiFi kafe mati, kasir langsung macet dan antrean mengular. Sejak pakai ERASTACK POS, transaksi jalan terus 100% lancar walau internet padam seharian.',
    impactMetric: 'Waktu antrean kasir terpangkas 60%',
  },
  {
    name: 'Hj. Siti Rahma',
    role: 'Pengelola',
    business: 'Minimarket Barokah Grosir',
    location: 'Surabaya',
    quote: 'Kami punya lebih dari 12.000 SKU barang. Barcode scanner langsung deteksi tanpa jeda sedetik pun. Laporan laba kotor harian langsung siap cetak saat toko tutup.',
    impactMetric: 'Akurasi stok barang mencapai 99.8%',
  },
  {
    name: 'Kevin Wijaya',
    role: 'Founder',
    business: 'Urban Cuts Barbershop & Grooming',
    location: 'Jakarta Selatan',
    quote: 'Fitur komisi kapster otomatis sangat membantu. Staf bisa cek bagi hasil harian dengan transparan, dan kami tidak perlu lagi bayar langganan software bulanan yang mahal.',
    impactMetric: 'Hemat biaya software kasir hingga 80%',
  },
];

export const TestimonialsSection: React.FC = () => {
  return (
    <section className="testimonials-section">
      <div className="container testimonials-container">
        <div className="section-head-center">
          <Badge variant="lime" size="sm" dot>Kisah Sukses Pengusaha</Badge>
          <h2 className="section-main-title">
            Dipercaya Pengusaha Nyata di Seluruh Penjuru Nusantara
          </h2>
          <p className="section-main-subtitle">
            Lihat bagaimana ERASTACK POS membantu bisnis tumbuh lebih cepat dengan operasional kasir yang kokoh.
          </p>
        </div>

        <div className="testimonials-grid">
          {TESTIMONIALS.map((t, idx) => (
            <div key={idx} className="testimonial-carbon-card">
              <div className="testi-stars-row">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={14} fill="#F59E0B" color="#F59E0B" />
                ))}
              </div>

              <p className="testi-quote-text">"{t.quote}"</p>

              <div className="testi-impact-badge">
                <TrendingUp size={14} className="impact-icon" />
                <span>{t.impactMetric}</span>
              </div>

              <div className="testi-author-row">
                <div className="author-avatar">{t.name.charAt(0)}</div>
                <div className="author-info">
                  <span className="author-name">{t.name}</span>
                  <span className="author-role">{t.role} • {t.business}</span>
                  <span className="author-loc">{t.location}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
