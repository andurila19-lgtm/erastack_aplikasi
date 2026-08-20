import React from 'react';
import { Check, X } from 'lucide-react';
import { Badge } from '../ui/Badge';
import './ComparisonSection.css';

interface ComparisonRow {
  aspect: string;
  erastack: string;
  isEraGood: boolean;
  cloudPos: string;
  isCloudGood: boolean;
  manualPos: string;
}

const COMPARISON_DATA: ComparisonRow[] = [
  {
    aspect: 'Keandalan Offline (Tanpa Internet)',
    erastack: '100% Beroperasi Normal di SQLite Lokal',
    isEraGood: true,
    cloudPos: 'Macet, error, & tidak bisa cetak nota',
    isCloudGood: false,
    manualPos: 'Bisa, tapi lambat & rawan salah hitung',
  },
  {
    aspect: 'Model Pembayaran & Lisensi',
    erastack: 'Lisensi Mandiri / Sekali Beli (Hemat 80%)',
    isEraGood: true,
    cloudPos: 'Langganan bulanan terus-menerus',
    isCloudGood: false,
    manualPos: 'Beli buku kas terus menerus',
  },
  {
    aspect: 'Keamanan & Kedaulatan Data Usaha',
    erastack: 'Data 100% tersimpan aman di PC/HP lokal Anda',
    isEraGood: true,
    cloudPos: 'Tersimpan di server pihak ketiga',
    isCloudGood: false,
    manualPos: 'Buku nota rentan hilang/rusak/terbakar',
  },
  {
    aspect: 'Kecerdasan Buatan (AI Business Assistant)',
    erastack: 'Local SLM On-Device Gratis (Zero Token Cost)',
    isEraGood: true,
    cloudPos: 'Bayar token API mahal / Tidak tersedia',
    isCloudGood: false,
    manualPos: 'Tidak ada analisa data otomatis',
  },
  {
    aspect: 'Kecepatan Scan Barcode & Checkout',
    erastack: 'Ultra Cepat (< 15ms per barang)',
    isEraGood: true,
    cloudPos: '1000ms - 3000ms (tergantung sinyal)',
    isCloudGood: false,
    manualPos: 'Sangat lambat (menulis manual)',
  },
];

export const ComparisonSection: React.FC = () => {
  return (
    <section className="comparison-section">
      <div className="container comparison-container">
        <div className="section-head-center">
          <Badge variant="cyan" size="sm">Komparasi Solusi</Badge>
          <h2 className="section-main-title">
            Mengapa Pengusaha Memilih ERASTACK POS Dibandingkan Aplikasi Kasir Lain?
          </h2>
          <p className="section-main-subtitle">
            Bandingkan langsung keunggulan arsitektur kami untuk menjamin kelancaran kasir Anda seumur hidup.
          </p>
        </div>

        <div className="comparison-table-wrap">
          <table className="comparison-table">
            <thead>
              <tr>
                <th className="col-aspect">Parameter Keunggulan</th>
                <th className="col-erastack">
                  <div className="table-header-erastack">
                    <span className="erastack-brand-tag">ERASTACK POS</span>
                    <Badge variant="lime" size="sm">Rekomendasi Utama</Badge>
                  </div>
                </th>
                <th className="col-other">Aplikasi Kasir Cloud Biasa</th>
                <th className="col-manual">Mesin Kasir / Buku Manual</th>
              </tr>
            </thead>
            <tbody>
              {COMPARISON_DATA.map((row, idx) => (
                <tr key={idx}>
                  <td className="cell-aspect">{row.aspect}</td>
                  <td className="cell-erastack">
                    <div className="cell-content-good">
                      <Check size={16} className="icon-check" />
                      <span>{row.erastack}</span>
                    </div>
                  </td>
                  <td className="cell-cloud">
                    <div className="cell-content-bad">
                      <X size={16} className="icon-cross" />
                      <span>{row.cloudPos}</span>
                    </div>
                  </td>
                  <td className="cell-manual">
                    <span>{row.manualPos}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};
