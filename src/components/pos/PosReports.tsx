'use client';

import React, { useState, useMemo } from 'react';
import { 
  BarChart3, DollarSign, TrendingUp, Receipt, 
  Download, Printer, Eye, Calendar, Clock, Search, X
} from 'lucide-react';
import { usePos } from '../../context/PosStoreContext';
import { TransactionRecord } from '../../data/posInitialData';
import './PosReports.css';

export interface PosReportsProps {
  onReprint: (tx: TransactionRecord) => void;
}

export const PosReports: React.FC<PosReportsProps> = ({ onReprint }) => {
  const { transactions } = usePos();
  const [searchQuery, setSearchQuery] = useState('');

  const filteredTransactions = useMemo(() => {
    return transactions.filter(t => 
      t.invoiceNo.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.cashierName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.paymentMethod.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [transactions, searchQuery]);

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
      alert('Belum ada transaksi untuk diekspor.');
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
    link.setAttribute('download', `Laporan_Penjualan_EraStack_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="pos-rep-root">
      {/* Top Header */}
      <div className="rep-top-bar">
        <div className="rep-title-group">
          <div className="rep-icon-pill">
            <BarChart3 size={22} className="text-brand" />
          </div>
          <div>
            <h1 className="rep-main-title">Laporan Penjualan & Rekapitulasi Kasir</h1>
            <span className="rep-sub-title">100% Tersimpan di database SQLite lokal</span>
          </div>
        </div>

        <button type="button" className="btn-export-csv" onClick={exportCSV} aria-label="Export Data ke CSV">
          <Download size={15} />
          <span>Export CSV / Excel</span>
        </button>
      </div>

      {/* KPI GRID (4 Desktop, 2x2 Tablet, 2 Mobile) */}
      <div className="rep-kpi-grid">
        <div className="rep-kpi-card">
          <div className="kpi-icon-wrap blue">
            <DollarSign size={20} />
          </div>
          <div className="kpi-content">
            <span className="kpi-label">Total Omset Penjualan</span>
            <strong className="kpi-val tabular-nums">{formatRupiah(totalOmset)}</strong>
          </div>
        </div>

        <div className="rep-kpi-card">
          <div className="kpi-icon-wrap green">
            <TrendingUp size={20} />
          </div>
          <div className="kpi-content">
            <span className="kpi-label">Estimasi Laba Kotor</span>
            <strong className="kpi-val text-emerald tabular-nums">{formatRupiah(totalProfit)}</strong>
          </div>
        </div>

        <div className="rep-kpi-card">
          <div className="kpi-icon-wrap orange">
            <Receipt size={20} />
          </div>
          <div className="kpi-content">
            <span className="kpi-label">Jumlah Transaksi</span>
            <strong className="kpi-val tabular-nums">{totalTxCount} Nota</strong>
          </div>
        </div>

        <div className="rep-kpi-card">
          <div className="kpi-icon-wrap purple">
            <BarChart3 size={20} />
          </div>
          <div className="kpi-content">
            <span className="kpi-label">Rata-rata per Nota</span>
            <strong className="kpi-val tabular-nums">{formatRupiah(avgBasketSize)}</strong>
          </div>
        </div>
      </div>

      {/* Search Bar */}
      <div className="rep-search-box">
        <Search size={16} className="text-muted" />
        <input
          type="text"
          className="rep-search-input"
          placeholder="Cari nomor invoice nota atau nama kasir..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          aria-label="Cari transaksi"
        />
        {searchQuery && (
          <button type="button" className="clear-search-btn" onClick={() => setSearchQuery('')}>
            <X size={14} />
          </button>
        )}
      </div>

      {/* DESKTOP & TABLET: Table View */}
      <div className="rep-table-wrapper">
        <div className="rep-table-head-row">
          <strong className="table-title">Riwayat Transaksi Penjualan</strong>
          <span className="table-count">{filteredTransactions.length} Transaksi Tercatat</span>
        </div>

        {filteredTransactions.length === 0 ? (
          <div className="rep-empty-state">
            <Receipt size={36} className="text-muted" />
            <p>Belum ada transaksi penjualan yang tercatat.</p>
          </div>
        ) : (
          <table className="rep-table">
            <thead>
              <tr>
                <th>No. Invoice</th>
                <th>Waktu Transaksi</th>
                <th>Kasir</th>
                <th>Metode Bayar</th>
                <th>Rincian Item</th>
                <th>Total Belanja</th>
                <th>Aksi</th>
              </tr>
            </thead>
            <tbody>
              {filteredTransactions.map((tx) => (
                <tr key={tx.id}>
                  <td>
                    <strong className="invoice-tag">{tx.invoiceNo}</strong>
                  </td>
                  <td className="tabular-nums">{formatDate(tx.timestamp)}</td>
                  <td>{tx.cashierName}</td>
                  <td>
                    <span className="method-pill">{tx.paymentMethod}</span>
                  </td>
                  <td>
                    <span className="items-summary-text">
                      {tx.items.length} jenis ({tx.items.reduce((s, i) => s + i.qty, 0)} pcs)
                    </span>
                  </td>
                  <td className="tabular-nums">
                    <strong className="total-amount-text">{formatRupiah(tx.finalAmount)}</strong>
                  </td>
                  <td>
                    <button
                      type="button"
                      className="btn-reprint"
                      onClick={() => onReprint(tx)}
                      title="Cetak Ulang Struk"
                      aria-label={`Cetak ulang nota ${tx.invoiceNo}`}
                    >
                      <Printer size={14} />
                      <span>Cetak</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* MOBILE: Transaction Card List */}
      <div className="rep-mobile-card-list">
        {filteredTransactions.length === 0 ? (
          <div className="rep-empty-state">
            <Receipt size={36} className="text-muted" />
            <p>Belum ada transaksi yang tercatat.</p>
          </div>
        ) : (
          filteredTransactions.map((tx) => (
            <div key={tx.id} className="rep-mobile-card">
              <div className="rm-card-head">
                <div>
                  <strong className="rm-invoice">{tx.invoiceNo}</strong>
                  <span className="rm-date tabular-nums">{formatDate(tx.timestamp)} • {tx.cashierName}</span>
                </div>
                <span className="method-pill">{tx.paymentMethod}</span>
              </div>

              <div className="rm-items-list">
                {tx.items.map((it, i) => (
                  <div key={i} className="rm-item-row">
                    <span>{it.qty}x {it.productName}</span>
                    <span className="tabular-nums">{formatRupiah(it.subtotal)}</span>
                  </div>
                ))}
              </div>

              <div className="rm-card-foot">
                <div className="rm-total-group">
                  <span className="rm-total-lbl">Total Tagihan:</span>
                  <strong className="rm-total-val tabular-nums">{formatRupiah(tx.finalAmount)}</strong>
                </div>

                <button
                  type="button"
                  className="btn-reprint"
                  onClick={() => onReprint(tx)}
                  aria-label={`Cetak struk ${tx.invoiceNo}`}
                >
                  <Printer size={14} />
                  <span>Struk</span>
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
