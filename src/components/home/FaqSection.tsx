'use client';

import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { Badge } from '../ui/Badge';
import './FaqSection.css';

interface FaqItem {
  question: string;
  answer: string;
}

const FAQS: FaqItem[] = [
  {
    question: 'Apakah aplikasi kasir ERASTACK POS bisa beroperasi 100% tanpa internet?',
    answer: 'Ya, mutlak 100%. Seluruh proses kasir, scan barcode, pemotongan stok barang, cetak struk nota, dan laporan keuangan disimpan secara lokal di database SQLite perangkat Anda. Anda tidak perlu khawatir jika sinyal internet putus atau mati lampu.',
  },
  {
    question: 'Printer thermal dan barcode scanner merk apa saja yang didukung?',
    answer: 'ERASTACK POS mendukung semua printer kasir thermal standar (58mm dan 80mm) yang menggunakan protokol ESC/POS via USB, Bluetooth, maupun LAN (Epson, Panda, Iware, Xprinter, VSC, MiniPOS, dll.) serta semua barcode scanner 1D/2D dengan koneksi USB HID atau wireless.',
  },
  {
    question: 'Apakah ada biaya langganan bulanan yang wajib dibayar?',
    answer: 'Tidak ada biaya langganan paksa. ERASTACK mengedepankan lisensi mandiri dan software sovereignty. Aplikasi dapat digunakan selamanya dengan kepemilikan data lokal seutuhnya.',
  },
  {
    question: 'Bagaimana cara memindahkan atau mencadangkan (backup) data transaksi toko?',
    answer: 'Database lokal berbasis SQLite WAL yang sangat ringkas. Anda dapat mengekspor file database (.sqlite) kapan saja ke flashdisk atau folder cloud backup Anda dengan sekali klik.',
  },
  {
    question: 'Bagaimana asisten AI lokal bekerja tanpa menghabiskan kuota internet?',
    answer: 'ERASTACK POS menyematkan Small Language Model (SLM) on-device teroptimasi yang berjalan langsung di CPU/RAM perangkat Anda. AI menganalisis riwayat transaksi secara privat di PC/HP tanpa mengirimkan data transaksi Anda ke server eksternal.',
  },
];

export const FaqSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFaq = (index: number) => {
    setOpenIndex(prev => prev === index ? null : index);
  };

  return (
    <section className="faq-section" id="faq">
      <div className="container faq-container">
        <div className="section-head-center">
          <Badge variant="cyan" size="sm">Tanya Jawab</Badge>
          <h2 className="section-main-title">
            Pertanyaan yang Sering Diajukan (FAQ)
          </h2>
          <p className="section-main-subtitle">
            Pelajari lebih lanjut tentang kapabilitas sistem, hardware pendukung, dan kedaulatan data Anda.
          </p>
        </div>

        <div className="faq-accordion-list">
          {FAQS.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div key={idx} className={`faq-card ${isOpen ? 'is-open' : ''}`}>
                <button
                  type="button"
                  className="faq-question-btn"
                  onClick={() => toggleFaq(idx)}
                  aria-expanded={isOpen}
                >
                  <span className="faq-q-text">{faq.question}</span>
                  <ChevronDown size={18} className={`faq-chevron ${isOpen ? 'rotate' : ''}`} />
                </button>
                {isOpen && (
                  <div className="faq-answer-body">
                    <p>{faq.answer}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
