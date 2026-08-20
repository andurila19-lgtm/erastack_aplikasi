'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  Bot, TrendingUp, AlertTriangle, Clock, 
  CheckCircle2, HardDrive, ShieldCheck, 
  Send, RefreshCw, Play, ArrowRight, 
  DollarSign, Users, Award, Database, Cpu
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
    label: 'Ringkasan Laba Hari Ini',
    query: 'Berapa total omset dan estimasi laba kotor hari ini berdasarkan HPP?',
    response: {
      title: 'Ringkasan Omset & Estimasi Laba Kotor (Simulasi Hari Ini)',
      summary: 'Tercatat 142 transaksi penjualan dengan akumulasi omset Rp 4.850.000. Berdasarkan harga pokok modal (HPP Rp 3.395.000), estimasi laba kotor tercatat sebesar Rp 1.455.000 (Margin 30.0%).',
      metrics: [
        { label: 'Total Transaksi', val: '142 Nota', sub: 'Shift berjalan' },
        { label: 'Total Omset Kotor', val: 'Rp 4.850.000', sub: 'Rata-rata Rp 34.150/nota' },
        { label: 'Estimasi Laba Kotor', val: 'Rp 1.455.000', sub: 'Margin 30.0%' },
        { label: 'Produk Terlaris', val: 'Beras Premium 5kg (48x)', sub: 'Sumbang 35% omset' },
      ],
      actionAdvice: 'Penjualan produk kategori sembako meningkat. Pastikan ketersediaan stok fisik mencukupi untuk shift berikutnya.',
    },
  },
  {
    id: 'stok-kritis',
    icon: <AlertTriangle size={16} />,
    label: 'Pengecekan Stok Kritis',
    query: 'Produk apa saja yang kuantitasnya berada di bawah batas minimum?',
    response: {
      title: 'Audit Kuantitas Stok di Bawah Ambang Batas Minimum',
      summary: 'Ditemukan 3 item SKU dengan stok di bawah threshold minimum yang telah dikonfigurasi pada sistem inventaris.',
      metrics: [
        { label: 'Minyak Goreng 2L', val: 'Sisa 2 Pcs', sub: 'Batas minimal 5 pcs' },
        { label: 'Gula Pasir 1kg', val: 'Sisa 4 Pcs', sub: 'Batas minimal 10 pcs' },
        { label: 'Kertas Thermal 58mm', val: 'Sisa 3 Roll', sub: 'Batas minimal 5 roll' },
        { label: 'Status SKU Lain', val: 'Normal (145 SKU)', sub: 'Di atas batas aman' },
      ],
      actionAdvice: 'Lakukan pemesanan restock ke supplier untuk item yang mendekati batas kritis.',
    },
  },
  {
    id: 'jam-ramai',
    icon: <Clock size={16} />,
    label: 'Distribusi Waktu Transaksi',
    query: 'Bagaimana distribusi kepadatan transaksi berdasarkan jam buka toko?',
    response: {
      title: 'Distribusi Volume Transaksi Berdasarkan Jam Operasional',
      summary: 'Berdasarkan agregasi riwayat nota 7 hari terakhir, konsentrasi transaksi tertinggi terjadi pada dua rentang waktu.',
      metrics: [
        { label: 'Periode Siang', val: '12:00 - 13:30', sub: 'Volume transaksi padat' },
        { label: 'Periode Sore', val: '18:30 - 20:30', sub: 'Volume transaksi tertinggi' },
        { label: 'Periode Pagi', val: '09:00 - 11:00', sub: 'Volume stabil' },
        { label: 'Rekomendasi', val: 'Kesiapan Kasir', sub: 'Pastikan laci kas & printer siap' },
      ],
      actionAdvice: 'Pastikan ketersediaan uang kembalian dan kertas thermal sebelum memasuki jam transaksi padat.',
    },
  },
  {
    id: 'staf-kasir',
    icon: <Users size={16} />,
    label: 'Rekapitulasi Shift Kasir',
    query: 'Bagaimana ringkasan transaksi per shift kasir pada hari ini?',
    response: {
      title: 'Rekapitulasi Transaksi per Akun Kasir',
      summary: 'Seluruh transaksi kasir tercatat dalam log audit lokal. Pembagian transaksi per shift tercatat sebagai berikut:',
      metrics: [
        { label: 'Kasir Shift Pagi', val: '78 Nota (Rp 2.650.000)', sub: 'Selesai & rekonsiliasi cocok' },
        { label: 'Kasir Shift Sore', val: '64 Nota (Rp 2.200.000)', sub: 'Sedang berjalan' },
        { label: 'Total Gabungan', val: '142 Nota (Rp 4.850.000)', sub: 'Log konsisten' },
        { label: 'Status Selisih Kas', val: 'Rp 0 (Cocok)', sub: 'Audit fisik sesuai sistem' },
      ],
      actionAdvice: 'Lakukan penutupan shift dan cetak ringkasan kas laci saat pergantian petugas kasir.',
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
    }, 200);
  };

  const handleCustomSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customInput.trim()) return;

    setIsTyping(true);
    const queryLower = customInput.toLowerCase();
    
    let matched = PRESET_PROMPTS[0];
    if (queryLower.includes('stok') || queryLower.includes('habis') || queryLower.includes('beli') || queryLower.includes('kritis')) {
      matched = PRESET_PROMPTS[1];
    } else if (queryLower.includes('jam') || queryLower.includes('ramai') || queryLower.includes('waktu')) {
      matched = PRESET_PROMPTS[2];
    } else if (queryLower.includes('kasir') || queryLower.includes('shift') || queryLower.includes('staf')) {
      matched = PRESET_PROMPTS[3];
    }

    setTimeout(() => {
      setSelectedPrompt({
        ...matched,
        query: customInput,
      });
      setIsTyping(false);
    }, 250);
  };

  return (
    <div className="ailab-page-root">
      <SEOHead
        title="Local AI Assistant • Analisis Data & Audit Kasir Lokal"
        description="Pelajari implementasi Local AI Assistant pada ERASTACK POS untuk analisis laporan penjualan dan monitoring stok tanpa pengiriman data ke server cloud."
      />

      <section className="ailab-hero-section">
        <div className="container">
          <div className="ailab-hero-content">
            <Badge variant="cyan" size="sm" dot>Local AI Dispatcher • On-Device</Badge>
            
            <h1 className="ailab-hero-title">
              Local AI Assistant untuk <span className="highlight-text">Analisis Data Bisnis</span>
            </h1>

            <p className="ailab-hero-desc">
              Modul asisten lokal yang bertindak sebagai antarmuka analitik cerdas di atas database SQLite. Dirancang untuk membantu merangkum data penjualan, audit stok, dan evaluasi operasional tanpa mengirimkan data rahasia bisnis ke cloud pihak ketiga.
            </p>

            <div className="ailab-benefit-pills">
              <div className="benefit-pill">
                <HardDrive size={16} className="text-brand" />
                <span>Pemrosesan Lokal di Perangkat</span>
              </div>
              <div className="benefit-pill">
                <ShieldCheck size={16} className="text-emerald" />
                <span>Privasi Data Transaksi Terjaga</span>
              </div>
              <div className="benefit-pill">
                <Cpu size={16} className="text-purple" />
                <span>Whitelist Tool Calling Terkontrol</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="interactive-assistant-section">
        <div className="container">
          <div className="section-head-center">
            <Badge variant="lime" size="sm">Simulasi Interaktif</Badge>
            <h2 className="section-main-title">Simulasi Local Tool Calling</h2>
            <p className="section-main-subtitle">
              Pilih pertanyaan di bawah untuk melihat bagaimana AI lokal memanggil fungsi alat terdaftar (tool dispatching) terhadap data toko.
            </p>
          </div>

          <div className="assistant-workbench-grid">
            <div className="assistant-input-column">
              <div className="preset-card-box">
                <span className="preset-label">Pilih Contoh Pertanyaan Operasional:</span>
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
                  Ketik Pertanyaan Simulasi:
                </label>
                <div className="chat-input-box">
                  <input
                    id="custom-query-input"
                    type="text"
                    className="chat-field"
                    placeholder="Contoh: Bagaimana ringkasan laba kotor hari ini?..."
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
                  <strong>Arsitektur Tool Whitelist</strong>
                  <p>Model AI dibatasi hanya dapat mengeksekusi fungsi analitik terdaftar dan dilarang menjalankan raw query SQL bebas.</p>
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
                      <strong className="agent-name">Local AI Assistant Runtime</strong>
                      <span className="agent-status">On-Device Dispatcher • Sandboxed</span>
                    </div>
                  </div>
                  <span className="response-time-chip">Simulasi Lokal</span>
                </div>

                <div className="screen-chat-area">
                  <div className="chat-bubble user-bubble">
                    <span className="bubble-sender">Query Pengguna:</span>
                    <p className="bubble-text">"{selectedPrompt.query}"</p>
                  </div>

                  {isTyping ? (
                    <div className="ai-loading-box">
                      <RefreshCw size={18} className="typing-spin" />
                      <span>Mengeksekusi tool dispatcher terhadap database lokal...</span>
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
                          <span>Rekomendasi Operasional:</span>
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
            <Badge variant="cyan" size="sm">Fungsi Analitik</Badge>
            <h2 className="section-main-title">Use Case Utama Local AI Assistant</h2>
            <p className="section-main-subtitle">
              Membantu pemilik bisnis mengekstrak wawasan dari database operasional tanpa kerumitan rumus spreadsheet.
            </p>
          </div>

          <div className="superpowers-grid">
            <div className="power-card">
              <div className="power-icon-box blue">
                <DollarSign size={24} />
              </div>
              <h3 className="power-title">Estimasi Laba & Margin</h3>
              <p className="power-desc">
                Menghitung laba kotor harian secara otomatis berdasarkan HPP modal barang yang terdata pada katalog produk.
              </p>
              <ul className="power-checks">
                <li><CheckCircle2 size={14} className="text-emerald" /> Laporan margin laba per item</li>
                <li><CheckCircle2 size={14} className="text-emerald" /> Pemantauan profitabilitas kategori</li>
              </ul>
            </div>

            <div className="power-card">
              <div className="power-icon-box orange">
                <AlertTriangle size={24} />
              </div>
              <h3 className="power-title">Audit Stok Kritis</h3>
              <p className="power-desc">
                Memindai seluruh tabel stok untuk mengidentifikasi produk yang kuantitasnya mendekati batas minimum pemesanan.
              </p>
              <ul className="power-checks">
                <li><CheckCircle2 size={14} className="text-emerald" /> Peringatan dini sebelum stok habis</li>
                <li><CheckCircle2 size={14} className="text-emerald" /> Rekomendasi restock barang prioritas</li>
              </ul>
            </div>

            <div className="power-card">
              <div className="power-icon-box purple">
                <Clock size={24} />
              </div>
              <h3 className="power-title">Analisis Pola Waktu</h3>
              <p className="power-desc">
                Membaca timestamp nota transaksi untuk mengidentifikasi pola kepadatan belanja pada periode tertentu.
              </p>
              <ul className="power-checks">
                <li><CheckCircle2 size={14} className="text-emerald" /> Pemetaan jam puncak operasional</li>
                <li><CheckCircle2 size={14} className="text-emerald" /> Evaluasi kesiapan kasir & hardware</li>
              </ul>
            </div>

            <div className="power-card">
              <div className="power-icon-box green">
                <ShieldCheck size={24} />
              </div>
              <h3 className="power-title">Rekonsiliasi Shift Kasir</h3>
              <p className="power-desc">
                Membantu mencocokkan total nota kasir dengan saldo uang tunai fisik di laci kas saat proses tutup shift.
              </p>
              <ul className="power-checks">
                <li><CheckCircle2 size={14} className="text-emerald" /> Audit selisih kas transparan</li>
                <li><CheckCircle2 size={14} className="text-emerald" /> Log mutasi tercatat ke database</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="ailab-cta-section">
        <div className="container">
          <div className="ailab-cta-card">
            <div className="cta-head-group">
              <h2 className="cta-card-title">
                Coba Modul Kasir & Database EraStack
              </h2>
              <p className="cta-card-desc">
                Eksplorasi terminal kasir interaktif untuk mencoba alur input transaksi dan pemotongan stok secara langsung.
              </p>
            </div>

            <div className="cta-btn-row">
              <Link href="/pos">
                <Button size="lg" variant="primary" leftIcon={<Play size={18} />}>
                  Coba Demo Kasir Web
                </Button>
              </Link>
              <Link href="/docs">
                <Button size="lg" variant="secondary" rightIcon={<ArrowRight size={16} />}>
                  Dokumentasi Teknis
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
