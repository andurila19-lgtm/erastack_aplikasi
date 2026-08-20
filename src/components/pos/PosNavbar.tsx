'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  Store, ShoppingCart, Package, BarChart3, 
  Settings, Clock, UserCheck, ArrowLeft, LayoutDashboard, Shield
} from 'lucide-react';
import { usePos } from '../../context/PosStoreContext';
import { UserRole } from '../../data/posInitialData';
import './PosNavbar.css';

export interface PosNavbarProps {
  activeView: 'dashboard' | 'register' | 'inventory' | 'reports' | 'settings';
  setActiveView: (view: 'dashboard' | 'register' | 'inventory' | 'reports' | 'settings') => void;
}

export const PosNavbar: React.FC<PosNavbarProps> = ({ activeView, setActiveView }) => {
  const { storeProfile, activeCashier, currentRole, setCurrentRole, hasPermission, cart } = usePos();
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

  const handleRoleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newRole = e.target.value as UserRole;
    setCurrentRole(newRole);
    if (newRole === 'CASHIER' && activeView !== 'register') {
      setActiveView('register');
    }
  };

  return (
    <header className="pos-nav-root">
      <div className="pos-nav-main">
        {/* Brand & Store Identity */}
        <div className="pos-nav-brand-group">
          <Link href="/" className="pos-back-link" title="Kembali ke Beranda EraStack">
            <ArrowLeft size={18} />
          </Link>

          <div className="pos-store-meta">
            <div className="pos-store-name-row">
              <Store size={18} className="pos-brand-icon" />
              <strong className="pos-store-title">{storeProfile.storeName}</strong>
            </div>
            <span className="pos-offline-pill">● Offline SQLite</span>
          </div>
        </div>

        {/* View Tabs (Desktop & Tablet) */}
        <nav className="pos-view-tabs" aria-label="Menu Navigasi POS">
          {hasPermission('canAccessPOS') && (
            <button
              type="button"
              className={`pos-tab-btn ${activeView === 'register' ? 'is-active' : ''}`}
              onClick={() => setActiveView('register')}
              aria-label="Menu Kasir Terminal"
            >
              <ShoppingCart size={16} />
              <span>Kasir</span>
              {totalCartCount > 0 && <span className="pos-cart-badge">{totalCartCount}</span>}
            </button>
          )}

          {hasPermission('canAccessDashboard') && (
            <button
              type="button"
              className={`pos-tab-btn ${activeView === 'dashboard' ? 'is-active' : ''}`}
              onClick={() => setActiveView('dashboard')}
              aria-label="Menu Dashboard & Ringkasan"
            >
              <LayoutDashboard size={16} />
              <span>Dashboard</span>
            </button>
          )}

          {hasPermission('canManageInventory') && (
            <button
              type="button"
              className={`pos-tab-btn ${activeView === 'inventory' ? 'is-active' : ''}`}
              onClick={() => setActiveView('inventory')}
              aria-label="Menu Stok & Inventaris"
            >
              <Package size={16} />
              <span>Stok Barang</span>
            </button>
          )}

          {hasPermission('canAccessReports') && (
            <button
              type="button"
              className={`pos-tab-btn ${activeView === 'reports' ? 'is-active' : ''}`}
              onClick={() => setActiveView('reports')}
              aria-label="Menu Laporan Penjualan"
            >
              <BarChart3 size={16} />
              <span>Laporan</span>
            </button>
          )}

          {hasPermission('canManageSettings') && (
            <button
              type="button"
              className={`pos-tab-btn ${activeView === 'settings' ? 'is-active' : ''}`}
              onClick={() => setActiveView('settings')}
              aria-label="Menu Pengaturan Toko"
            >
              <Settings size={16} />
              <span>Pengaturan</span>
            </button>
          )}
        </nav>

        {/* Info Group (Clock + Active Cashier Profile + Role Switcher) */}
        <div className="pos-nav-info-group">
          <div className="pos-clock-box">
            <Clock size={14} className="pos-clock-icon" />
            <span className="pos-clock-text tabular-nums">{timeStr}</span>
          </div>

          <div className="pos-cashier-pill" title="Role Aktif Pengguna">
            <Shield size={14} className="text-brand" />
            <select
              className="role-selector-inline"
              value={currentRole}
              onChange={handleRoleChange}
              aria-label="Pilih Role Pengguna"
            >
              <option value="OWNER">Owner (Pemilik)</option>
              <option value="MANAGER">Manager</option>
              <option value="CASHIER">Kasir</option>
            </select>
          </div>
        </div>
      </div>
    </header>
  );
};
