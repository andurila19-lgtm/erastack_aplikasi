'use client';

import React, { useState } from 'react';
import { 
  BarChart3, DollarSign, TrendingUp, Receipt, 
  Download, Printer, Eye, Calendar, Clock
} from 'lucide-react';
import { usePos } from '../../context/PosStoreContext';
import { TransactionRecord } from '../../data/posInitialData';
import './PosReports.css';

export interface PosReportsProps {
  onReprint: (tx: TransactionRecord) => void;
}

export const PosReports: React.FC<PosReportsProps> = ({ onReprint }) => {
  const { transactions } = usePos();
  const [selectedTx, setSelectedTx] = useState<TransactionRecord | null>(null);

  const totalOmset = transactions.reduce((acc, tx) => acc + tx.finalAmount, 0);
  const totalProfit = transactions.reduce((acc, tx) => {
    const txCost = tx.items.reduce((cAcc, it) => cAcc + (it.buyPrice * it.qty), 0);
    return acc + (tx.finalAmount - txCost);
  }, 0);
  const totalTxCount = transactions.length;
  const avgBasketSize = totalTxCount > 0 ? Math.round(totalOmset / totalTxCount) : 0;

  const formatRupiah = (val: number) => {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(val);
  };

  const formatDate = (isoString: string) => {
    const d = new Date(isoString);
    return d.toLocaleString('id-ID', {
      day: '2-digit',
      month: 'short',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const exportCSV = () => {
    if (transactions.length === 0) {
      alert('Belum ada transaksi untuk diexport.');
      return;
    }
    const headers = ['No. Invoice', 'Waktu', 'Kasir', 'Metode Bayar', 'Total Item', 'Total Tagihan', 'Uang Diterima', 'Kembalian'];
    const rows = transactions.map((t) => [
      t.invoiceNo,
      t.timestamp,
      t.cashierName,
      t.paymentMethod,
      t.items.reduce((a, i) => a + i.qty, 0),
      t.finalAmount,
      t.paidAmount,
      t.changeAmount,
    ]);
    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `Laporan_Penjualan_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="pos-rep-root">
      <div className="rep-top-bar">
        <div className="rep-title-group">
          <BarChart3 size={22} className="text-brand" />
          <div>
            <h2 className="rep-main-title">Laporan Penjualan & Rekap Shift Kasir</h2>
            <span className="rep-sub-title">100% Tersimpan di Perangkat Lokal Anda</span>
          </div>
        </div>

        <button type="button" className="btn-export-csv" onClick={exportCSV}>
          <Download size={15} />
          <span>Export Excel / CSV</span>
        </button>
      </div>

      <div className="kpi-grid">
        <div className="kpi-card">
          <div className="kpi-icon-wrap blue">
            <DollarSign size={20} />
          </div>
          <div className="kpi-content">
            <span className="kpi-label">Total Omset Penjualan</span>
            <strong className="kpi-val">{formatRupiah(totalOmset)}</strong>
          </div>
        </div>

        <div className="kpi-card">
          <div className="kpi-icon-wrap green">
            <TrendingUp size={20} />
          </div>
          <div className="kpi-content">
            <span className="kpi-label">Estimasi Laba Kotor</span>
            <strong className="kpi-val text-emerald">{formatRupiah(totalProfit)}</strong>
          </div>
        </div>

        <div className="kpi-card">
          <div className="kpi-icon-wrap orange">
            <Receipt size={20} />
          </div>
          <div className="kpi-content">
            <span className="kpi-label">Jumlah Transaksi / Nota</span>
            <strong className="kpi-val">{totalTxCount} Nota</strong>
          </div>
        </div>

        <div className="kpi-card">
          <div className="kpi-icon-wrap purple">
            <BarChart3 size={20} />
          </div>
          <div className="kpi-content">
            <span className="kpi-label">Rata-rata Nilai per Nota</span>
            <strong className="kpi-val">{formatRupiah(avgBasketSize)}</strong>
          </div>
        </div>
      </div>

      <div className="rep-table-wrapper">
        <div className="rep-table-head-row">
          <strong className="table-title">Riwayat Transaksi Penjualan</strong>
          <span className="table-count">{transactions.length} Transaksi Tercatat</span>
        </div>

        {transactions.length === 0 ? (
          <div className="rep-empty-state">
            <Receipt size={36} className="text-muted" />
            <p>Belum ada transaksi penjualan yang tercatat.</p>
          </div>
        ) : (
          <table className="rep-table">
            <thead>
              <tr>
                <th>No. Invoice</th>
                <th>Waktu</th>
                <th>Kasir</th>
                <th>Rincian Barang</th>
                <th>Metode</th>
                <th>Total Belanja</th>
                <th>Aksi</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((tx) => (
                <tr key={tx.id}>
                  <td>
                    <strong className="inv-no-badge">{tx.invoiceNo}</strong>
                  </td>
                  <td>{formatDate(tx.timestamp)}</td>
                  <td>{tx.cashierName}</td>
                  <td>
                    <span className="items-summary-text">
                      {tx.items.map((it) => `${it.productName} (${it.qty}x)`).join(', ')}
                    </span>
                  </td>
                  <td>
                    <span className="method-pill">{tx.paymentMethod}</span>
                  </td>
                  <td>
                    <strong className="text-brand">{formatRupiah(tx.finalAmount)}</strong>
                  </td>
                  <td>
                    <button
                      type="button"
                      className="btn-reprint"
                      onClick={() => onReprint(tx)}
                      title="Cetak Ulang Struk Nota"
                    >
                      <Printer size={14} />
                      <span>Cetak Ulang</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};
