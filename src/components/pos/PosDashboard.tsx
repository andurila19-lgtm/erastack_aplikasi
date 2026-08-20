'use client';

import React, { useMemo } from 'react';
import { 
  TrendingUp, DollarSign, ShoppingBag, 
  AlertTriangle, ArrowUpRight, ArrowDownRight,
  Package, Plus, Calendar, Clock, CheckCircle2, ChevronRight,
  Sparkles, Zap, Award
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

  const totalStockCount = useMemo(() => {
    return products.reduce((sum, p) => sum + p.stock, 0);
  }, [products]);

  const recentTxs = useMemo(() => {
    return transactions.slice(0, 5);
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

  return (
    <div className="pos-dashboard-root">
      <div className="pos-dash-header">
        <div className="dash-greeting-box">
          <div className="dash-store-badge">
            <span className="dash-live-dot" />
            <span>Toko Siap Melayani (100% Offline)</span>
          </div>
          <h1 className="dash-title">{storeProfile.storeName}</h1>
          <p className="dash-subtitle">Selamat bertugas, <strong>{activeCashier}</strong>. Berikut rangkuman performa usaha hari ini.</p>
        </div>

        <div className="dash-quick-actions">
          <button 
            type="button" 
            className="dash-action-btn primary"
            onClick={() => onNavigate('register')}
          >
            <ShoppingBag size={18} />
            <span>Buka Kasir (F9)</span>
          </button>
          <button 
            type="button" 
            className="dash-action-btn secondary"
            onClick={() => onNavigate('inventory')}
          >
            <Plus size={18} />
            <span>Tambah Barang</span>
          </button>
        </div>
      </div>

      <div className="dash-kpi-grid">
        <div className="kpi-card revenue">
          <div className="kpi-header">
            <span className="kpi-label">Omset Penjualan Hari Ini</span>
            <div className="kpi-icon-box blue">
              <TrendingUp size={20} />
            </div>
          </div>
          <div className="kpi-value-row">
            <h2 className="kpi-value">{formatRupiah(metrics.revenue)}</h2>
          </div>
          <div className="kpi-footer">
            <span className="kpi-badge positive">
              <ArrowUpRight size={14} /> {metrics.txCount} Transaksi
            </span>
            <span className="kpi-subtext">Perhitungan lokal real-time</span>
          </div>
        </div>

        <div className="kpi-card profit">
          <div className="kpi-header">
            <span className="kpi-label">Estimasi Laba Bersih</span>
            <div className="kpi-icon-box green">
              <DollarSign size={20} />
            </div>
          </div>
          <div className="kpi-value-row">
            <h2 className="kpi-value text-emerald">{formatRupiah(metrics.profit)}</h2>
          </div>
          <div className="kpi-footer">
            <span className="kpi-badge neutral">
              Margin {metrics.revenue > 0 ? Math.round((metrics.profit / metrics.revenue) * 100) : 0}%
            </span>
            <span className="kpi-subtext">Omset dikurangi modal pokok</span>
          </div>
        </div>

        <div className="kpi-card basket">
          <div className="kpi-header">
            <span className="kpi-label">Rata-Rata per Nota</span>
            <div className="kpi-icon-box purple">
              <ShoppingBag size={20} />
            </div>
          </div>
          <div className="kpi-value-row">
            <h2 className="kpi-value">{formatRupiah(metrics.avgBasket)}</h2>
          </div>
          <div className="kpi-footer">
            <span className="kpi-badge neutral">
              {metrics.txCount} Pembeli
            </span>
            <span className="kpi-subtext">Nilai belanja rata-rata</span>
          </div>
        </div>

        <div className="kpi-card inventory">
          <div className="kpi-header">
            <span className="kpi-label">Status Inventaris Barang</span>
            <div className="kpi-icon-box amber">
              <Package size={20} />
            </div>
          </div>
          <div className="kpi-value-row">
            <h2 className="kpi-value">{products.length} SKU</h2>
          </div>
          <div className="kpi-footer">
            {lowStockProducts.length > 0 ? (
              <span className="kpi-badge warning">
                <AlertTriangle size={14} /> {lowStockProducts.length} Stok Menipis
              </span>
            ) : (
              <span className="kpi-badge positive">
                <CheckCircle2 size={14} /> Stok Aman ({totalStockCount} Unit)
              </span>
            )}
            <button 
              type="button" 
              className="kpi-link-btn"
              onClick={() => onNavigate('inventory')}
            >
              Lihat Stok →
            </button>
          </div>
        </div>
      </div>

      <div className="dash-content-grid">
        <div className="dash-card chart-card">
          <div className="dash-card-header">
            <div className="card-title-group">
              <h3 className="card-title">Tren Penjualan 7 Hari Terakhir</h3>
              <p className="card-desc">Grafik akumulasi omset harian kasir</p>
            </div>
            <button 
              type="button" 
              className="card-action-link"
              onClick={() => onNavigate('reports')}
            >
              Laporan Lengkap →
            </button>
          </div>

          <div className="weekly-bar-chart">
            {weeklySalesData.map((item, idx) => {
              const heightPct = Math.max(8, Math.round((item.amount / maxWeeklyAmount) * 100));
              const isToday = idx === weeklySalesData.length - 1;
              return (
                <div key={item.dateStr} className={`chart-col ${isToday ? 'is-today' : ''}`}>
                  <div className="chart-bar-wrap">
                    <div 
                      className="chart-bar" 
                      style={{ height: `${heightPct}%` }}
                      title={`${item.label}: ${formatRupiah(item.amount)}`}
                    >
                      {item.amount > 0 && (
                        <span className="bar-val-tooltip">{formatShortRupiah(item.amount)}</span>
                      )}
                    </div>
                  </div>
                  <span className="chart-col-label">{item.label}</span>
                </div>
              );
            })}
          </div>
        </div>

        <div className="dash-card top-products-card">
          <div className="dash-card-header">
            <div className="card-title-group">
              <h3 className="card-title">Produk Paling Laris</h3>
              <p className="card-desc">Barang paling sering dibeli pelanggan</p>
            </div>
            <Award size={18} className="text-amber" />
          </div>

          <div className="top-products-list">
            {topSellingProducts.length === 0 ? (
              <div className="empty-dash-box">
                <Package size={28} className="text-muted" />
                <p>Belum ada transaksi penjualan.</p>
                <button 
                  type="button" 
                  className="btn-start-tx"
                  onClick={() => onNavigate('register')}
                >
                  Mulai Transaksi Kasir
                </button>
              </div>
            ) : (
              topSellingProducts.map((p, idx) => (
                <div key={p.name} className="top-product-row">
                  <span className={`rank-badge rank-${idx + 1}`}>{idx + 1}</span>
                  <div className="product-info-col">
                    <strong className="p-name">{p.name}</strong>
                    <span className="p-cat">{p.category}</span>
                  </div>
                  <div className="product-sales-col">
                    <strong className="p-qty">{p.qty} terjual</strong>
                    <span className="p-revenue">{formatRupiah(p.revenue)}</span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      <div className="dash-bottom-grid">
        <div className="dash-card low-stock-card">
          <div className="dash-card-header">
            <div className="card-title-group">
              <h3 className="card-title">Peringatan Stok Menipis</h3>
              <p className="card-desc">Barang yang harus segera di-restock</p>
            </div>
            <span className="alert-count-pill">{lowStockProducts.length} Barang</span>
          </div>

          <div className="low-stock-list">
            {lowStockProducts.length === 0 ? (
              <div className="stock-safe-banner">
                <CheckCircle2 size={24} className="text-emerald" />
                <div>
                  <strong>Semua Stok Aman!</strong>
                  <p>Tidak ada barang yang berada di bawah batas minimum.</p>
                </div>
              </div>
            ) : (
              lowStockProducts.slice(0, 4).map(prod => (
                <div key={prod.id} className="low-stock-item">
                  <div className="stock-info">
                    <strong className="stock-prod-name">{prod.name}</strong>
                    <span className="stock-sku">{prod.sku} • {prod.category}</span>
                  </div>
                  <div className="stock-badge-group">
                    <span className="stock-pill warning">
                      Sisa: {prod.stock} {prod.unit}
                    </span>
                    <button 
                      type="button" 
                      className="btn-quick-edit"
                      onClick={() => onNavigate('inventory')}
                    >
                      Tambah
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        <div className="dash-card recent-tx-card">
          <div className="dash-card-header">
            <div className="card-title-group">
              <h3 className="card-title">Transaksi Kasir Terbaru</h3>
              <p className="card-desc">5 struk nota penjualan terakhir</p>
            </div>
            <button 
              type="button" 
              className="card-action-link"
              onClick={() => onNavigate('reports')}
            >
              Semua Riwayat →
            </button>
          </div>

          <div className="recent-tx-list">
            {recentTxs.length === 0 ? (
              <div className="empty-dash-box">
                <Clock size={28} className="text-muted" />
                <p>Belum ada nota transaksi yang dicatat.</p>
              </div>
            ) : (
              recentTxs.map(tx => {
                const txTime = new Date(tx.timestamp).toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' });
                return (
                  <div key={tx.id} className="recent-tx-row">
                    <div className="tx-meta-col">
                      <strong className="tx-inv">{tx.invoiceNo}</strong>
                      <span className="tx-time">{txTime} • Kasir: {tx.cashierName}</span>
                    </div>
                    <div className="tx-amount-col">
                      <strong className="tx-total">{formatRupiah(tx.finalAmount)}</strong>
                      <span className={`tx-method-pill ${tx.paymentMethod.toLowerCase()}`}>
                        {tx.paymentMethod}
                      </span>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
