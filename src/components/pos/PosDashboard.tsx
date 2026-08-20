'use client';

import React, { useMemo } from 'react';
import { 
  TrendingUp, DollarSign, ShoppingBag, 
  AlertTriangle, ArrowUpRight, ArrowDownRight,
  Package, Plus, Calendar, Clock, CheckCircle2, ChevronRight,
  Sparkles, Zap, Award, BarChart3, Receipt
} from 'lucide-react';
import { usePos } from '../../context/PosStoreContext';
import { Button } from '../ui/Button';
import './PosDashboard.css';

export interface PosDashboardProps {
  onNavigate: (view: 'register' | 'inventory' | 'reports' | 'settings') => void;
}

export const PosDashboard: React.FC<PosDashboardProps> = ({ onNavigate }) => {
  const { products, transactions, storeProfile, activeCashier } = usePos();

  const todayStr = useMemo(() => {
    const d = new Date();
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
  }, []);

  const todayTxs = useMemo(() => {
    return transactions.filter(t => t.timestamp.startsWith(todayStr));
  }, [transactions, todayStr]);

  const metrics = useMemo(() => {
    const revenue = todayTxs.reduce((sum, t) => sum + t.finalAmount, 0);
    const cost = todayTxs.reduce((sum, t) => {
      return sum + t.items.reduce((iSum, i) => iSum + (i.buyPrice * i.qty), 0);
    }, 0);
    const profit = revenue - cost;
    const txCount = todayTxs.length;
    const avgBasket = txCount > 0 ? Math.round(revenue / txCount) : 0;

    return { revenue, cost, profit, txCount, avgBasket };
  }, [todayTxs]);

  const lowStockProducts = useMemo(() => {
    return products.filter(p => p.stock <= p.minStock);
  }, [products]);

  const recentTxs = useMemo(() => {
    return transactions.slice(0, 6);
  }, [transactions]);

  const weeklySalesData = useMemo(() => {
    const days: { label: string; dateStr: string; amount: number }[] = [];
    const dayNames = ['Min', 'Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab'];
    
    for (let i = 6; i >= 0; i--) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      const dateStr = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
      const dayName = dayNames[d.getDay()];
      
      const dayTotal = transactions
        .filter(t => t.timestamp.startsWith(dateStr))
        .reduce((sum, t) => sum + t.finalAmount, 0);
        
      days.push({
        label: i === 0 ? 'Hari Ini' : dayName,
        dateStr,
        amount: dayTotal,
      });
    }
    return days;
  }, [transactions]);

  const maxWeeklyAmount = useMemo(() => {
    const max = Math.max(...weeklySalesData.map(d => d.amount));
    return max > 0 ? max : 100000;
  }, [weeklySalesData]);

  const topSellingProducts = useMemo(() => {
    const map = new Map<string, { name: string; qty: number; revenue: number; category: string }>();
    transactions.forEach(tx => {
      tx.items.forEach(item => {
        const existing = map.get(item.productId);
        if (existing) {
          existing.qty += item.qty;
          existing.revenue += item.subtotal;
        } else {
          const p = products.find(prod => prod.id === item.productId);
          map.set(item.productId, {
            name: item.productName,
            qty: item.qty,
            revenue: item.subtotal,
            category: p ? p.category : 'Umum',
          });
        }
      });
    });

    return Array.from(map.values())
      .sort((a, b) => b.qty - a.qty)
      .slice(0, 4);
  }, [transactions, products]);

  const formatRupiah = (val: number) => {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(val);
  };

  const formatShortRupiah = (val: number) => {
    if (val >= 1000000) {
      return `Rp ${(val / 1000000).toFixed(1)}jt`;
    }
    if (val >= 1000) {
      return `Rp ${(val / 1000).toFixed(0)}rb`;
    }
    return `Rp ${val}`;
  };

  const formatTime = (isoString: string) => {
    const d = new Date(isoString);
    return d.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="pos-dashboard-root">
      {/* Header Banner */}
      <div className="pos-dash-header">
        <div className="dash-greeting-box">
          <div className="dash-store-badge">
            <span className="dash-live-dot" />
            <span>Terminal Siap • SQLite Lokal</span>
          </div>
          <h1 className="dash-title">{storeProfile.storeName}</h1>
          <p className="dash-subtitle">Selamat bertugas, <strong>{activeCashier}</strong>. Ringkasan operasional toko hari ini.</p>
        </div>

        <div className="dash-quick-actions">
          <button 
            type="button" 
            className="dash-action-btn primary"
            onClick={() => onNavigate('register')}
            aria-label="Buka Kasir"
          >
            <ShoppingBag size={18} />
            <span>Buka Kasir (F9)</span>
          </button>
          <button 
            type="button" 
            className="dash-action-btn secondary"
            onClick={() => onNavigate('inventory')}
            aria-label="Tambah Produk"
          >
            <Plus size={18} />
            <span>Tambah Barang</span>
          </button>
        </div>
      </div>

      {/* KPI METRICS (Adaptive 4 Desktop, 2x2 Tablet, 2 Mobile) */}
      <section className="dash-kpi-section" aria-label="Ringkasan Kinerja Hari Ini">
        {/* KPI 1: Omset Penjualan */}
        <div className="dash-kpi-card kpi-primary">
          <div className="kpi-top-row">
            <span className="kpi-title">Omset Penjualan Hari Ini</span>
            <div className="kpi-icon-pill blue">
              <DollarSign size={18} />
            </div>
          </div>
          <strong className="kpi-value-text tabular-nums">{formatRupiah(metrics.revenue)}</strong>
          <span className="kpi-hint">Shift berjalan • {metrics.txCount} transaksi</span>
        </div>

        {/* KPI 2: Estimasi Laba Kotor */}
        <div className="dash-kpi-card kpi-secondary">
          <div className="kpi-top-row">
            <span className="kpi-title">Estimasi Laba Kotor</span>
            <div className="kpi-icon-pill green">
              <TrendingUp size={18} />
            </div>
          </div>
          <strong className="kpi-value-text text-emerald tabular-nums">{formatRupiah(metrics.profit)}</strong>
          <span className="kpi-hint">Berdasarkan HPP modal barang</span>
        </div>

        {/* KPI 3: Jumlah Nota Transaksi */}
        <div className="dash-kpi-card kpi-tertiary">
          <div className="kpi-top-row">
            <span className="kpi-title">Total Transaksi</span>
            <div className="kpi-icon-pill orange">
              <Receipt size={18} />
            </div>
          </div>
          <strong className="kpi-value-text tabular-nums">{metrics.txCount} Nota</strong>
          <span className="kpi-hint">Tercatat ke database lokal</span>
        </div>

        {/* KPI 4: Rata-rata Keranjang */}
        <div className="dash-kpi-card kpi-quaternary">
          <div className="kpi-top-row">
            <span className="kpi-title">Rata-rata Nilai Nota</span>
            <div className="kpi-icon-pill purple">
              <BarChart3 size={18} />
            </div>
          </div>
          <strong className="kpi-value-text tabular-nums">{formatRupiah(metrics.avgBasket)}</strong>
          <span className="kpi-hint">Rata-rata per pelanggan</span>
        </div>
      </section>

      {/* LOW STOCK WARNING (If any) */}
      {lowStockProducts.length > 0 && (
        <div className="dash-alert-banner">
          <div className="alert-banner-left">
            <AlertTriangle size={20} className="alert-banner-icon" />
            <div>
              <strong>Peringatan {lowStockProducts.length} Produk Mendekati Batas Stok Kritis</strong>
              <p>Segera lakukan pemesanan restock barang ke supplier.</p>
            </div>
          </div>
          <button 
            type="button" 
            className="alert-banner-btn"
            onClick={() => onNavigate('inventory')}
          >
            <span>Cek Stok</span>
            <ChevronRight size={16} />
          </button>
        </div>
      )}

      {/* 2-COLUMN ANALYTICS GRID (Chart + Top Selling & Recent Transactions) */}
      <div className="dash-analytics-grid">
        {/* Weekly Sales Chart Card */}
        <div className="dash-chart-card">
          <div className="chart-card-header">
            <div className="chart-header-left">
              <strong className="chart-card-title">Tren Penjualan 7 Hari Terakhir</strong>
              <span className="chart-card-sub">Akumulasi omset harian tercatat</span>
            </div>
            <button 
              type="button" 
              className="chart-header-link"
              onClick={() => onNavigate('reports')}
            >
              <span>Laporan Penuh</span>
              <ChevronRight size={14} />
            </button>
          </div>

          <div className="weekly-bars-container">
            {weeklySalesData.map((day, idx) => {
              const heightPct = Math.max(8, Math.round((day.amount / maxWeeklyAmount) * 100));
              const isToday = idx === weeklySalesData.length - 1;

              return (
                <div key={idx} className={`weekly-bar-col ${isToday ? 'is-today' : ''}`}>
                  <div className="bar-track">
                    <div 
                      className="bar-fill" 
                      style={{ height: `${heightPct}%` }}
                      title={`${day.label}: ${formatRupiah(day.amount)}`}
                    >
                      {day.amount > 0 && (
                        <span className="bar-tooltip tabular-nums">{formatShortRupiah(day.amount)}</span>
                      )}
                    </div>
                  </div>
                  <span className="bar-day-label">{day.label}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Top Selling Products */}
        <div className="dash-topsellers-card">
          <div className="chart-card-header">
            <strong className="chart-card-title">Produk Terlaris</strong>
            <span className="chart-card-sub">Berdasarkan kuantitas terjual</span>
          </div>

          <div className="topsellers-list">
            {topSellingProducts.length === 0 ? (
              <div className="empty-topsellers">
                <Package size={28} className="text-muted" />
                <span>Belum ada data penjualan tercatat.</span>
              </div>
            ) : (
              topSellingProducts.map((p, i) => (
                <div key={i} className="topseller-item">
                  <div className="topseller-rank">{i + 1}</div>
                  <div className="topseller-info">
                    <strong className="topseller-name">{p.name}</strong>
                    <span className="topseller-cat">{p.category}</span>
                  </div>
                  <div className="topseller-metrics">
                    <strong className="topseller-qty tabular-nums">{p.qty} Terjual</strong>
                    <span className="topseller-rev tabular-nums">{formatRupiah(p.revenue)}</span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* RECENT TRANSACTIONS (Responsive Table on Desktop/Tablet, Cards on Mobile) */}
      <section className="dash-recent-section" aria-label="Transaksi Penjualan Terakhir">
        <div className="recent-header-row">
          <div>
            <strong className="recent-title">Transaksi Penjualan Terbaru</strong>
            <span className="recent-sub">Log transaksi tersimpan di perangkat lokal</span>
          </div>
          <button 
            type="button" 
            className="chart-header-link"
            onClick={() => onNavigate('reports')}
          >
            <span>Lihat Semua ({transactions.length})</span>
            <ChevronRight size={14} />
          </button>
        </div>

        {recentTxs.length === 0 ? (
          <div className="empty-recent-box">
            <Receipt size={36} className="text-muted" />
            <p>Belum ada transaksi yang dicatat.</p>
          </div>
        ) : (
          <>
            {/* Desktop & Tablet Table */}
            <div className="recent-table-wrap">
              <table className="recent-table">
                <thead>
                  <tr>
                    <th>Waktu</th>
                    <th>No. Nota Invoice</th>
                    <th>Kasir</th>
                    <th>Metode</th>
                    <th>Total Belanja</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {recentTxs.map((tx) => (
                    <tr key={tx.id}>
                      <td className="tabular-nums">{formatTime(tx.timestamp)}</td>
                      <td>
                        <strong>{tx.invoiceNo}</strong>
                      </td>
                      <td>{tx.cashierName}</td>
                      <td>
                        <span className="method-tag">{tx.paymentMethod}</span>
                      </td>
                      <td className="tabular-nums">
                        <strong>{formatRupiah(tx.finalAmount)}</strong>
                      </td>
                      <td>
                        <span className="status-pill-success">✓ Selesai</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile Card List */}
            <div className="recent-mobile-list">
              {recentTxs.map((tx) => (
                <div key={tx.id} className="recent-mobile-card">
                  <div className="rm-card-top">
                    <div>
                      <strong className="rm-invoice">{tx.invoiceNo}</strong>
                      <span className="rm-time tabular-nums">{formatTime(tx.timestamp)} • {tx.cashierName}</span>
                    </div>
                    <span className="status-pill-success">✓ Selesai</span>
                  </div>
                  <div className="rm-card-bottom">
                    <span className="method-tag">{tx.paymentMethod}</span>
                    <strong className="rm-amount tabular-nums">{formatRupiah(tx.finalAmount)}</strong>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </section>
    </div>
  );
};
