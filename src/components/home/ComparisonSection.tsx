import React from 'react';
import { Badge } from '../ui/Badge';
import './ComparisonSection.css';

interface ComparisonRow {
  parameter: string;
  offlineFirst: string;
  cloudBased: string;
  traditionalManual: string;
}

const COMPARISON_DATA: ComparisonRow[] = [
  {
    parameter: 'Ketergantungan Jaringan',
    offlineFirst: 'Mandiri (seluruh data & logika transaksi di SQLite lokal)',
    cloudBased: 'Tergantung koneksi internet untuk autentikasi dan pencatatan',
    traditionalManual: 'Tidak membutuhkan jaringan internet',
  },
  {
    parameter: 'Penyimpanan Data',
    offlineFirst: 'Tersimpan di perangkat lokal pengguna (kendali penuh)',
    cloudBased: 'Tersimpan di server penyedia cloud pihak ketiga',
    traditionalManual: 'Buku catatan fisik atau mesin kasir konvensional',
  },
  {
    parameter: 'Latensi Operasi Kasir',
    offlineFirst: 'Eksekusi memori lokal tanpa delay request HTTP',
    cloudBased: 'Dipengaruhi kecepatan dan stabilitas koneksi internet',
    traditionalManual: 'Pencatatan manual dengan potensi kelalaian hitung',
  },
  {
    parameter: 'Pencadangan Data',
    offlineFirst: 'Ekspor berkas .sqlite mandiri ke media eksternal',
    cloudBased: 'Pencadangan otomatis di server cloud penyedia',
    traditionalManual: 'Tidak ada backup otomatis',
  },
  {
    parameter: 'Integrasi Hardware',
    offlineFirst: 'Koneksi langsung USB HID scanner & printer ESC/POS',
    cloudBased: 'Memerlukan bridge driver atau perantara browser web',
    traditionalManual: 'Peralatan terpisah tanpa integrasi sistematis',
  },
];

export const ComparisonSection: React.FC = () => {
  return (
    <section className="comparison-section">
      <div className="container comparison-container">
        <div className="section-head-center">
          <Badge variant="cyan" size="sm">Perbandingan Pendekatan</Badge>
          <h2 className="section-main-title">
            Perbandingan Arsitektur: Offline-First vs Cloud POS
          </h2>
          <p className="section-main-subtitle">
            Tinjauan objektif perbedaan teknis antara sistem kasir lokal mandiri dan sistem berbasis cloud murni.
          </p>
        </div>

        <div className="comparison-table-wrap">
          <table className="comparison-table">
            <thead>
              <tr>
                <th className="col-aspect">Parameter Arsitektur</th>
                <th className="col-erastack">
                  <div className="table-header-erastack">
                    <span className="erastack-brand-tag">EraStack (Offline-First)</span>
                  </div>
                </th>
                <th className="col-other">Sistem Cloud POS Murni</th>
                <th className="col-manual">Pencatatan Manual / Standalone</th>
              </tr>
            </thead>
            <tbody>
              {COMPARISON_DATA.map((row, idx) => (
                <tr key={idx}>
                  <td className="cell-aspect">
                    <strong>{row.parameter}</strong>
                  </td>
                  <td className="cell-erastack">
                    <span className="cell-text-erastack">{row.offlineFirst}</span>
                  </td>
                  <td className="cell-cloud">
                    <span className="cell-text-other">{row.cloudBased}</span>
                  </td>
                  <td className="cell-manual">
                    <span className="cell-text-other">{row.traditionalManual}</span>
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
