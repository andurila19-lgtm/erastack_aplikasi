'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  Bot, TrendingUp, AlertTriangle, Clock, 
  CheckCircle2, HardDrive, ShieldCheck, 
  Send, RefreshCw, Download, ArrowRight, 
  Store, ShoppingCart, DollarSign, Users, Award
} from 'lucide-react';
import { SEOHead } from '../components/common/SEOHead';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import './AiLabPage.css';

interface PresetPrompt {
  id: string;
  icon: React.ReactNode;
  label: string;
  query: string;
  response: {
    title: string;
    summary: string;
    metrics: { label: string; val: string; sub?: string }[];
    actionAdvice: string;
  };
}

const PRESET_PROMPTS: PresetPrompt[] = [
  {
    id: 'omset-laba',
    icon: <DollarSign size={16} />,
    label: 'Hitung Laba Hari Ini',
    query: 'Berapa total omset dan laba bersih toko saya hari ini?',
    response: {
      title: 'Laporan Omset & Estimasi Laba Bersih (Hari Ini)',
      summary: 'Hari ini toko mencatat 142 transaksi penjualan dengan total omset kotor Rp 4.850.000. Setelah dipotong harga pokok modal (HPP Rp 3.395.000), estimasi laba bersih toko Anda mencapai Rp 1.455.000 (Margin 30.0%).',
      metrics: [
        { label: 'Total Transaksi', val: '142 Nota', sub: '+18% vs kemarin' },
        { label: 'Total Omset Kotor', val: 'Rp 4.850.000', sub: 'Rata-rata Rp 34.150/nota' },
        { label: 'Estimasi Laba Bersih', val: 'Rp 1.455.000', sub: 'Margin sehat 30%' },
        { label: 'Produk Terlaris', val: 'Kopi Susu Aren (48 Cup)', sub: 'Sumbang 35% omset' },
      ],
      actionAdvice: 'Penjualan minuman kopi susu aren meningkat pesat. Pastikan persediaan cup 16oz dan susu segar tetap aman untuk esok hari.',
    },
  },
  {
    id: 'stok-kritis',
    icon: <AlertTriangle size={16} />,
    label: 'Cek Stok Menipis',
    query: 'Barang atau bahan apa saja yang stoknya hampir habis dan harus dibeli?',
    response: {
      title: 'Peringatan Stok Barang Menipis (Perlu Restock)',
      summary: 'Ditemukan 3 produk dengan sisa stok di bawah batas aman toko. Jika laju penjualan normal, stok produk berikut diperkirakan akan habis dalam 24 - 36 jam ke depan.',
      metrics: [
        { label: 'Gula Aren Cair 1L', val: 'Sisa 2 Botol', sub: 'Perkiraan habis besok sore' },
        { label: 'Cup Plastik 16oz', val: 'Sisa 18 Pcs', sub: 'Cukup untuk 3-4 jam' },
        { label: 'Biji Kopi Arabica 250g', val: 'Sisa 3 Bungkus', sub: 'Batas minimal 5 bungkus' },
        { label: 'Status Stok Lain', val: 'Aman (185 Item)', sub: 'Tidak ada kendala' },
      ],
      actionAdvice: 'Disarankan segera membuat pesanan pembelian (PO) ke pemasok gula aren dan cup plastik hari ini agar tidak kehabisan saat jam sibuk besok.',
    },
  },
  {
    id: 'jam-ramai',
    icon: <Clock size={16} />,
    label: 'Kapan Jam Paling Ramai?',
    query: 'Kapan jam pembeli paling ramai dan toko butuh kasir tambahan?',
    response: {
      title: 'Analisis Waktu Pembeli Paling Ramai (7 Hari Terakhir)',
      summary: 'Berdasarkan data 1.120 transaksi kasir seminggu terakhir, toko Anda memiliki 2 gelombang jam puncak pelanggan yang sangat padat.',
      metrics: [
        { label: 'Puncak 1 (Makan Siang)', val: '12:00 - 13:30 WIB', sub: 'Rata-rata 36 nota/jam' },
        { label: 'Puncak 2 (Pulang Kantor)', val: '18:30 - 20:30 WIB', sub: 'Rata-rata 42 nota/jam' },
        { label: 'Waktu Paling Santai', val: '09:00 - 11:00 WIB', sub: 'Rata-rata 8 nota/jam' },
        { label: 'Rekomendasi Staf', val: '+1 Kasir di Jam 18:30', sub: 'Pangkas antrean 50%' },
      ],
      actionAdvice: 'Buka 2 meja kasir atau gunakan HP kasir tambahan pada pukul 18:30 untuk mempercepat pembayaran dan mencegah antrean panjang.',
    },
  },
  {
    id: 'staf-kasir',
    icon: <Users size={16} />,
    label: 'Performa Kasir & Staf',
    query: 'Siapa staf kasir yang melayani transaksi paling banyak minggu ini?',
    response: {
      title: 'Rekapitulasi Kinerja & Komisi Kasir Minggu Ini',
      summary: 'Seluruh transaksi kasir tercatat rapi tanpa selisih uang. Kasir Rina melayani jumlah transaksi tertinggi dengan kecepatan rata-rata 32 detik per pelanggan.',
      metrics: [
        { label: 'Kasir Rina (Shift Siang)', val: '468 Nota (Rp 15.8jt)', sub: 'Kecepatan 32 detik/nota' },
        { label: 'Kasir Dimas (Shift Malam)', val: '412 Nota (Rp 14.2jt)', sub: 'Kecepatan 35 detik/nota' },
        { label: 'Kasir Maya (Part-Time)', val: '240 Nota (Rp 8.1jt)', sub: 'Kecepatan 38 detik/nota' },
        { label: 'Selisih Kas Laci', val: 'Rp 0 (Sempurna)', sub: 'Uang fisik vs sistem cocok' },
      ],
      actionAdvice: 'Kinerja kasir sangat akurat tanpa selisih uang. Anda dapat membagikan bonus insentif kasir terbaik langsung dari laporan ini.',
    },
  },
  {
    id: 'ide-promo',
    icon: <Award size={16} />,
    label: 'Rekomendasi Paket Hemat',
    query: 'Buatkan ide promo paket hemat untuk meningkatkan penjualan akhir pekan',
    response: {
      title: 'Saran Promo Bundling Produk Berdasarkan Riwayat Belanja',
      summary: 'Data kasir menunjukkan 64% pembeli Kopi Susu juga memesan Roti Bakar atau Croissant. Menggabungkan kedua menu ini dalam 1 paket promo akan menaikkan nilai belanja rata-rata pembeli.',
      metrics: [
        { label: 'Paket Usulan', val: 'Kopi + Roti Bakar', sub: 'Harga promo Rp 35.000' },
        { label: 'Harga Normal Terpisah', val: 'Rp 42.000', sub: 'Hemat Rp 7.000 bagi pembeli' },
        { label: 'Margin Keuntungan Toko', val: 'Tetap Sehat (28.5%)', sub: 'HPP modal Rp 25.000' },
        { label: 'Target Kenaikan Omset', val: '+25% di Akhir Pekan', sub: 'Mendorong belanja dobel' },
      ],
      actionAdvice: 'Aktifkan paket promo ini di menu Kasir ERASTACK POS pada hari Jumat - Minggu untuk mendongkrak penjualan makanan pendamping.',
    },
  },
];

export const AiLabPage: React.FC = () => {
  const [selectedPrompt, setSelectedPrompt] = useState<PresetPrompt>(PRESET_PROMPTS[0]);
  const [customInput, setCustomInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const handleSelectPreset = (preset: PresetPrompt) => {
    setIsTyping(true);
    setSelectedPrompt(preset);
    setCustomInput(preset.query);
    setTimeout(() => {
      setIsTyping(false);
    }, 250);
  };

  const handleCustomSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customInput.trim()) return;

    setIsTyping(true);
    const queryLower = customInput.toLowerCase();
    
    let matched = PRESET_PROMPTS[0];
    if (queryLower.includes('stok') || queryLower.includes('habis') || queryLower.includes('beli')) {
      matched = PRESET_PROMPTS[1];
    } else if (queryLower.includes('jam') || queryLower.includes('ramai') || queryLower.includes('sibuk')) {
      matched = PRESET_PROMPTS[2];
    } else if (queryLower.includes('kasir') || queryLower.includes('staf') || queryLower.includes('karyawan')) {
      matched = PRESET_PROMPTS[3];
    } else if (queryLower.includes('promo') || queryLower.includes('paket') || queryLower.includes('diskon')) {
      matched = PRESET_PROMPTS[4];
    }

    setTimeout(() => {
      setSelectedPrompt({
        ...matched,
        query: customInput,
      });
      setIsTyping(false);
    }, 300);
  };

  return (
    <div className="ailab-page-root">
      <SEOHead
        title="AI Asisten Toko Pintar • Tanya Penjualan & Stok Tanpa Kuota"
        description="AI Asisten pintar untuk pemilik toko dan bisnis di Indonesia. Tanya omset harian, cek stok menipis, dan dapatkan saran jam paling ramai tanpa butuh internet."
      />

      <section className="ailab-hero-section">
        <div className="container">
          <div className="ailab-hero-content">
            <Badge variant="lime" size="sm" dot>AI Asisten Bisnis Toko • 100% Bebas Kuota</Badge>
            
            <h1 className="ailab-hero-title">
              Asisten Pintar Pribadi untuk <span className="highlight-text">Toko & Usaha Anda</span>
            </h1>

            <p className="ailab-hero-desc">
              Tanyakan apa saja tentang omset penjualan, barang yang mau habis, hingga jam paling ramai di toko Anda seperti mengobrol dengan manajer toko berpengalaman. Bekerja langsung di komputer & HP kasir Anda tanpa menghabiskan kuota internet.
            </p>

            <div className="ailab-benefit-pills">
              <div className="benefit-pill">
                <HardDrive size={16} className="text-brand" />
                <span>100% Berjalan Tanpa Kuota Internet</span>
              </div>
              <div className="benefit-pill">
                <ShieldCheck size={16} className="text-emerald" />
                <span>Data Penjualan Toko 100% Rahasia & Privat</span>
              </div>
              <div className="benefit-pill">
                <CheckCircle2 size={16} className="text-purple" />
                <span>Hasil Analisis Instan dalam Hitungan Detik</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="interactive-assistant-section">
        <div className="container">
          <div className="section-head-center">
            <Badge variant="cyan" size="sm">Coba Langsung di Sini</Badge>
            <h2 className="section-main-title">Simulasi Tanya Jawab AI Asisten Toko</h2>
            <p className="section-main-subtitle">
              Pilih salah satu pertanyaan di bawah ini untuk melihat bagaimana AI menganalisis data kasir toko Anda.
            </p>
          </div>

          <div className="assistant-workbench-grid">
            <div className="assistant-input-column">
              <div className="preset-card-box">
                <span className="preset-label">Pilih Pertanyaan Contoh:</span>
                <div className="preset-buttons-list">
                  {PRESET_PROMPTS.map(preset => (
                    <button
                      key={preset.id}
                      type="button"
                      className={`preset-btn ${selectedPrompt.id === preset.id ? 'is-active' : ''}`}
                      onClick={() => handleSelectPreset(preset)}
                    >
                      <span className="preset-icon">{preset.icon}</span>
                      <span className="preset-text">{preset.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              <form onSubmit={handleCustomSubmit} className="chat-input-form">
                <label htmlFor="custom-query-input" className="chat-label">
                  Ketik Pertanyaan Toko Anda Sendiri:
                </label>
                <div className="chat-input-box">
                  <input
                    id="custom-query-input"
                    type="text"
                    className="chat-field"
                    placeholder="Contoh: Berapa laba bersih toko saya hari ini?..."
                    value={customInput}
                    onChange={e => setCustomInput(e.target.value)}
                  />
                  <button type="submit" className="chat-send-btn" aria-label="Kirim pertanyaan">
                    <Send size={16} />
                  </button>
                </div>
              </form>

              <div className="local-privacy-notice">
                <ShieldCheck size={18} className="text-emerald" />
                <div>
                  <strong>Privasi Usaha 100% Terjamin</strong>
                  <p>AI memproses data di dalam memori komputer kasir toko Anda sendiri. Data transaksi tidak pernah dikirim ke internet atau pihak lain.</p>
                </div>
              </div>
            </div>

            <div className="assistant-output-column">
              <div className="ai-chat-screen-card">
                <div className="screen-header-bar">
                  <div className="ai-agent-identity">
                    <div className="agent-avatar">
                      <Bot size={20} className="agent-icon" />
                      <span className="online-beacon" />
                    </div>
                    <div className="agent-info">
                      <strong className="agent-name">Asisten Toko ERASTACK</strong>
                      <span className="agent-status">Aktif di Perangkat Kasir (Offline)</span>
                    </div>
                  </div>
                  <span className="response-time-chip">0.04 Detik</span>
                </div>

                <div className="screen-chat-area">
                  <div className="chat-bubble user-bubble">
                    <span className="bubble-sender">Pertanyaan Pemilik Toko:</span>
                    <p className="bubble-text">"{selectedPrompt.query}"</p>
                  </div>

                  {isTyping ? (
                    <div className="ai-loading-box">
                      <RefreshCw size={18} className="typing-spin" />
                      <span>Asisten sedang membaca rekap data transaksi toko Anda...</span>
                    </div>
                  ) : (
                    <div className="chat-bubble ai-bubble">
                      <div className="ai-bubble-head">
                        <Bot size={18} className="ai-bubble-icon" />
                        <strong className="ai-answer-title">{selectedPrompt.response.title}</strong>
                      </div>

                      <p className="ai-summary-text">
                        {selectedPrompt.response.summary}
                      </p>

                      <div className="ai-metrics-cards-grid">
                        {selectedPrompt.response.metrics.map((m, idx) => (
                          <div key={idx} className="metric-box">
                            <span className="metric-lbl">{m.label}</span>
                            <strong className="metric-main-val">{m.val}</strong>
                            {m.sub && <span className="metric-sub-lbl">{m.sub}</span>}
                          </div>
                        ))}
                      </div>

                      <div className="ai-action-advice-box">
                        <div className="advice-head">
                          <TrendingUp size={15} className="advice-icon" />
                          <span>Saran & Langkah Tindakan untuk Toko:</span>
                        </div>
                        <p className="advice-text">{selectedPrompt.response.actionAdvice}</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="superpowers-section">
        <div className="container">
          <div className="section-head-center">
            <Badge variant="lime" size="sm">Manfaat Nyata Toko</Badge>
            <h2 className="section-main-title">4 Kemampuan Utama AI untuk Mengembangkan Usaha Anda</h2>
            <p className="section-main-subtitle">
              Tidak perlu repot mencatat manual atau menghitung rumus matematika, asisten pintar membantu operasional toko sehari-hari.
            </p>
          </div>

          <div className="superpowers-grid">
            <div className="power-card">
              <div className="power-icon-box blue">
                <DollarSign size={24} />
              </div>
              <h3 className="power-title">Hitung Laba Bersih Otomatis</h3>
              <p className="power-desc">
                Ketahui keuntungan bersih toko secara otomatis setiap hari setelah dikurangi harga modal produk, diskon, dan biaya operasional.
              </p>
              <ul className="power-checks">
                <li><CheckCircle2 size={14} className="text-emerald" /> Laporan laba per produk dan per kategori</li>
                <li><CheckCircle2 size={14} className="text-emerald" /> Pantau margin keuntungan tetap sehat</li>
              </ul>
            </div>

            <div className="power-card">
              <div className="power-icon-box orange">
                <AlertTriangle size={24} />
              </div>
              <h3 className="power-title">Peringatan Stok Menipis</h3>
              <p className="power-desc">
                Cegah kehilangan pembeli akibat kehabisan stok. AI memprediksi sisa stok akan habis dalam berapa hari dan memberi peringatan dini.
              </p>
              <ul className="power-checks">
                <li><CheckCircle2 size={14} className="text-emerald" /> Pengingat otomatis sebelum barang kosong</li>
                <li><CheckCircle2 size={14} className="text-emerald" /> Buat daftar belanja restock dengan 1 klik</li>
              </ul>
            </div>

            <div className="power-card">
              <div className="power-icon-box purple">
                <Clock size={24} />
              </div>
              <h3 className="power-title">Deteksi Jam Ramai Pelanggan</h3>
              <p className="power-desc">
                Ketahui pola jam sibuk toko di siang dan malam hari agar Anda bisa mengatur jadwal jaga staf kasir tanpa membuat antrean membludak.
              </p>
              <ul className="power-checks">
                <li><CheckCircle2 size={14} className="text-emerald" /> Rekomendasi penambahan kasir di jam sibuk</li>
                <li><CheckCircle2 size={14} className="text-emerald" /> Pangkas waktu antre kasir hingga 50%</li>
              </ul>
            </div>

            <div className="power-card">
              <div className="power-icon-box green">
                <ShieldCheck size={24} />
              </div>
              <h3 className="power-title">Cegah Selisih Uang Kasir</h3>
              <p className="power-desc">
                AI mencocokkan seluruh struk nota dengan uang fisik di laci kasir setiap tutup shift, mendeteksi selisih atau transaksi janggal secara transparan.
              </p>
              <ul className="power-checks">
                <li><CheckCircle2 size={14} className="text-emerald" /> Rekonsiliasi kasir otomatis tutup toko</li>
                <li><CheckCircle2 size={14} className="text-emerald" /> Deteksi pembatalan nota mencurigakan</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="comparison-ai-section">
        <div className="container">
          <div className="section-head-center">
            <Badge variant="cyan" size="sm">Kenapa Berbeda?</Badge>
            <h2 className="section-main-title">Perbandingan AI Asisten Toko ERASTACK vs Chatbot Biasa</h2>
            <p className="section-main-subtitle">
              Dibangun khusus untuk kasir & database toko, bukan sekadar chatbot obrolan umum di internet.
            </p>
          </div>

          <div className="ai-compare-table-wrap">
            <table className="ai-compare-table">
              <thead>
                <tr>
                  <th className="col-feat">Fitur & Kemampuan</th>
                  <th className="col-erastack">
                    <div className="erastack-header-cell">
                      <span>AI Asisten ERASTACK POS</span>
                      <Badge variant="lime" size="sm">Bawaan di Aplikasi</Badge>
                    </div>
                  </th>
                  <th className="col-other">Chatbot Internet Biasa</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="td-feat">Terhubung Langsung ke Data Kasir & Stok Toko</td>
                  <td className="td-erastack"><CheckCircle2 size={16} className="text-emerald" /> <strong>Ya, membaca data toko secara otomatis</strong></td>
                  <td className="td-other">✕ Tidak, harus ketik data manual</td>
                </tr>
                <tr>
                  <td className="td-feat">Bisa Dipakai Saat Internet / WiFi Padam</td>
                  <td className="td-erastack"><CheckCircle2 size={16} className="text-emerald" /> <strong>100% Bisa (Offline di perangkat)</strong></td>
                  <td className="td-other">✕ Tidak bisa jika internet mati</td>
                </tr>
                <tr>
                  <td className="td-feat">Biaya Langganan / Kuota API</td>
                  <td className="td-erastack"><CheckCircle2 size={16} className="text-emerald" /> <strong>Gratis Rp 0 Selamanya</strong></td>
                  <td className="td-other">✕ Bayar sewa bulanan mahal</td>
                </tr>
                <tr>
                  <td className="td-feat">Kerahasiaan Data Usaha & Keuangan Toko</td>
                  <td className="td-erastack"><CheckCircle2 size={16} className="text-emerald" /> <strong>100% Privat di Komputer/HP Sendiri</strong></td>
                  <td className="td-other">✕ Data dikirim ke server luar negeri</td>
                </tr>
                <tr>
                  <td className="td-feat">Kecepatan Menjawab Analisis</td>
                  <td className="td-erastack"><CheckCircle2 size={16} className="text-emerald" /> <strong>Instan &lt; 0.1 Detik</strong></td>
                  <td className="td-other">✕ Butuh loading 3 - 10 detik</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="ailab-cta-section">
        <div className="container">
          <div className="ailab-cta-card">
            <div className="cta-head-group">
              <Store size={40} className="cta-store-icon" />
              <h2 className="cta-card-title">
                AI Asisten Toko Sudah Terpasang Otomatis di ERASTACK POS
              </h2>
              <p className="cta-card-desc">
                Anda tidak perlu menginstal plugin tambahan atau membayar langganan. Cukup unduh aplikasi kasir ERASTACK POS untuk komputer atau smartphone Android Anda.
              </p>
            </div>

            <div className="cta-btn-row">
              <Link href="/downloads">
                <Button size="lg" variant="primary" leftIcon={<Download size={18} />}>
                  Unduh ERASTACK POS Sekarang (Gratis)
                </Button>
              </Link>
              <Link href="/products/pos">
                <Button size="lg" variant="secondary" rightIcon={<ArrowRight size={16} />}>
                  Lihat Semua Fitur Kasir
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
