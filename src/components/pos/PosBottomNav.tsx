'use client';

import React from 'react';
import { 
  LayoutDashboard, ShoppingCart, 
  Package, BarChart3, Settings 
} from 'lucide-react';
import { usePos } from '../../context/PosStoreContext';
import './PosBottomNav.css';

export interface PosBottomNavProps {
  activeView: 'dashboard' | 'register' | 'inventory' | 'reports' | 'settings';
  setActiveView: (view: 'dashboard' | 'register' | 'inventory' | 'reports' | 'settings') => void;
}

export const PosBottomNav: React.FC<PosBottomNavProps> = ({ activeView, setActiveView }) => {
  const { cart, hasPermission } = usePos();
  const totalCartCount = cart.reduce((sum, item) => sum + item.qty, 0);

  const ALL_ITEMS = [
    { id: 'register' as const, label: 'Kasir', icon: ShoppingCart, badge: totalCartCount, perm: 'canAccessPOS' as const },
    { id: 'dashboard' as const, label: 'Dashboard', icon: LayoutDashboard, perm: 'canAccessDashboard' as const },
    { id: 'inventory' as const, label: 'Stok', icon: Package, perm: 'canManageInventory' as const },
    { id: 'reports' as const, label: 'Laporan', icon: BarChart3, perm: 'canAccessReports' as const },
    { id: 'settings' as const, label: 'Toko', icon: Settings, perm: 'canManageSettings' as const },
  ];

  const allowedItems = ALL_ITEMS.filter((item) => hasPermission(item.perm));

  return (
    <nav className="pos-bottom-nav-root" aria-label="Navigasi Menu Kasir Mobile">
      <div className="pos-bottom-nav-bar">
        {allowedItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeView === item.id;
          return (
            <button
              key={item.id}
              type="button"
              className={`bottom-nav-item ${isActive ? 'is-active' : ''}`}
              onClick={() => setActiveView(item.id)}
              aria-label={`Menu ${item.label}`}
            >
              <div className="bottom-nav-icon-box">
                <Icon size={20} />
                {item.badge ? (
                  <span className="bottom-nav-badge">{item.badge}</span>
                ) : null}
              </div>
              <span className="bottom-nav-label">{item.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
