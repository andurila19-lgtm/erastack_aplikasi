'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  ShoppingBag, Package, Cpu, FileText, Download, 
  BookOpen, Search, ArrowRight, Sparkles, ChevronRight
} from 'lucide-react';
import { BrandLogo } from '../common/BrandLogo';
import './MobileNav.css';

export interface MobileNavProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenCommand: () => void;
}

const PRIMARY_NAV_ITEMS = [
  { 
    label: 'Katalog Produk', 
    desc: 'POS Offline & Modul Toko',
    path: '/products', 
    icon: <Package size={18} /> 
  },
  { 
    label: 'Asisten AI Lab', 
    desc: 'Simulasi Tanya Laba & Stok',
    path: '/ai-lab', 
    icon: <Cpu size={18} /> 
  },
  { 
    label: 'Kisah Sukses Usaha', 
    desc: 'Implementasi Bisnis Riil',
    path: '/projects', 
    icon: <FileText size={18} /> 
  },
  { 
    label: 'Buku Panduan & Docs', 
    desc: 'Instruksi Operasional Kasir',
    path: '/docs', 
    icon: <BookOpen size={18} /> 
  },
];

export const MobileNav: React.FC<MobileNavProps> = ({ isOpen, onClose, onOpenCommand }) => {
  const pathname = usePathname();

  if (!isOpen) return null;

  return (
    <div className="mobile-nav-backdrop" onClick={onClose} role="presentation">
      <div
        className="mobile-nav-sheet"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-label="Menu Navigasi Mobile"
      >
        {/* Quick Search Action */}
        <button
          type="button"
          className="mobile-nav-search-bar"
          onClick={() => {
            onClose();
            onOpenCommand();
          }}
          aria-label="Cari Cepat"
        >
          <Search size={15} className="mobile-search-icon" />
          <span className="mobile-search-text">Cari menu, kasir, panduan...</span>
          <kbd className="mobile-search-kbd">⌘K</kbd>
        </button>

        {/* Highlight POS & Download Banner */}
        <div className="mobile-nav-cta-card">
          <div className="cta-card-info">
            <div className="cta-live-badge">
              <span className="live-pulse" />
              <span>Offline-First POS</span>
            </div>
            <strong className="cta-title">Aplikasi Kasir Langsung</strong>
          </div>
          <Link href="/pos" className="mobile-pos-action-btn" onClick={onClose}>
            <span>Buka Kasir</span>
            <ArrowRight size={15} />
          </Link>
        </div>

        {/* Main Contextual Nav Items */}
        <nav className="mobile-nav-menu" aria-label="Navigasi Utama">
          <span className="menu-group-label">Menu Utama</span>
          <div className="menu-items-list">
            {PRIMARY_NAV_ITEMS.map((item) => {
              const isActive = pathname === item.path || (item.path !== '/' && pathname.startsWith(item.path));
              return (
                <Link
                  key={item.path}
                  href={item.path}
                  className={`mobile-menu-link ${isActive ? 'is-active' : ''}`}
                  onClick={onClose}
                >
                  <div className="mobile-link-icon-box">{item.icon}</div>
                  <div className="mobile-link-text">
                    <span className="mobile-link-title">{item.label}</span>
                    <span className="mobile-link-desc">{item.desc}</span>
                  </div>
                  <ChevronRight size={16} className="mobile-link-arrow" />
                </Link>
              );
            })}
          </div>
        </nav>

        {/* Secondary Context Footer */}
        <div className="mobile-nav-footer-links">
          <Link href="/downloads" className="footer-sub-link" onClick={onClose}>
            <Download size={14} />
            <span>Pusat Unduhan</span>
          </Link>
          <span className="footer-divider">•</span>
          <Link href="/releases" className="footer-sub-link" onClick={onClose}>
            <span>Changelog</span>
          </Link>
          <span className="footer-divider">•</span>
          <Link href="/about" className="footer-sub-link" onClick={onClose}>
            <span>Tentang</span>
          </Link>
        </div>
      </div>
    </div>
  );
};
