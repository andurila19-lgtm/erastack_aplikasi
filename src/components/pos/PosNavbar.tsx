'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  Store, ShoppingCart, Package, BarChart3, 
  Settings, Clock, UserCheck, HardDrive, ArrowLeft
} from 'lucide-react';
import { usePos } from '../../context/PosStoreContext';
import './PosNavbar.css';

export interface PosNavbarProps {
  activeView: 'register' | 'inventory' | 'reports' | 'settings';
  setActiveView: (view: 'register' | 'inventory' | 'reports' | 'settings') => void;
}

export const PosNavbar: React.FC<PosNavbarProps> = ({ activeView, setActiveView }) => {
  const { storeProfile, activeCashier, cart } = usePos();
  const [timeStr, setTimeStr] = useState('');

  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      setTimeStr(now.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit', second: '2-digit' }));
    };
    updateClock();
    const interval = setInterval(updateClock, 1000);
    return () => clearInterval(interval);
  }, []);

  const totalCartCount = cart.reduce((acc, item) => acc + item.qty, 0);

  return (
    <header className="pos-nav-root">
      <div className="pos-nav-main">
        <div className="pos-nav-brand-group">
          <Link href="/" className="pos-back-link" title="Kembali ke Beranda">
            <ArrowLeft size={18} />
          </Link>

          <div className="pos-store-meta">
            <div className="pos-store-name-row">
              <Store size={18} className="pos-brand-icon" />
              <strong className="pos-store-title">{storeProfile.storeName}</strong>
            </div>
            <span className="pos-offline-pill">● 100% Offline Lokal</span>
          </div>
        </div>

        <nav className="pos-view-tabs" aria-label="Menu Kasir">
          <button
            type="button"
            className={`pos-tab-btn ${activeView === 'register' ? 'is-active' : ''}`}
            onClick={() => setActiveView('register')}
          >
            <ShoppingCart size={16} />
            <span>Kasir Transaksi</span>
            {totalCartCount > 0 && <span className="pos-cart-badge">{totalCartCount}</span>}
          </button>

          <button
            type="button"
            className={`pos-tab-btn ${activeView === 'inventory' ? 'is-active' : ''}`}
            onClick={() => setActiveView('inventory')}
          >
            <Package size={16} />
            <span>Kelola Barang</span>
          </button>

          <button
            type="button"
            className={`pos-tab-btn ${activeView === 'reports' ? 'is-active' : ''}`}
            onClick={() => setActiveView('reports')}
          >
            <BarChart3 size={16} />
            <span>Laporan & Shift</span>
          </button>

          <button
            type="button"
            className={`pos-tab-btn ${activeView === 'settings' ? 'is-active' : ''}`}
            onClick={() => setActiveView('settings')}
          >
            <Settings size={16} />
            <span>Pengaturan Toko</span>
          </button>
        </nav>

        <div className="pos-nav-info-group">
          <div className="pos-clock-box">
            <Clock size={14} className="text-muted" />
            <span className="pos-clock-text">{timeStr}</span>
          </div>

          <div className="pos-cashier-pill">
            <UserCheck size={14} className="text-emerald" />
            <span>{activeCashier}</span>
          </div>
        </div>
      </div>
    </header>
  );
};
