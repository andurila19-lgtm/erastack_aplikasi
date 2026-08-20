'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ShoppingCart, Package, Cpu, FileText, Download, BookOpen, Clock, Info, Search } from 'lucide-react';
import { StatusDot } from '../ui/StatusDot';
import './MobileNav.css';

export interface MobileNavProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenCommand: () => void;
}

const MOBILE_LINKS = [
  { label: 'Buka Kasir Web', path: '/pos', icon: <ShoppingCart size={18} /> },
  { label: 'Produk Kasir', path: '/products', icon: <Package size={18} /> },
  { label: 'Asisten AI Toko', path: '/ai-lab', icon: <Cpu size={18} /> },
  { label: 'Kisah Sukses Usaha', path: '/projects', icon: <FileText size={18} /> },
  { label: 'Pusat Unduhan', path: '/downloads', icon: <Download size={18} /> },
  { label: 'Buku Panduan', path: '/docs', icon: <BookOpen size={18} /> },
  { label: 'Catatan Pembaruan', path: '/releases', icon: <Clock size={18} /> },
  { label: 'Tentang ERASTACK', path: '/about', icon: <Info size={18} /> },
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
        <div className="mobile-nav-header">
          <div className="mobile-nav-status">
            <StatusDot status="ready" label="Aplikasi Kasir Siap Pakai" size="sm" />
          </div>
          <button
            type="button"
            className="mobile-nav-search-btn"
            onClick={() => {
              onClose();
              onOpenCommand();
            }}
          >
            <Search size={16} />
            <span>Cari Cepat...</span>
          </button>
        </div>

        <nav className="mobile-nav-list" aria-label="Mobile Navigation">
          {MOBILE_LINKS.map((link) => {
            const isActive = pathname === link.path;
            return (
              <Link
                key={link.path}
                href={link.path}
                className={`mobile-nav-link ${isActive ? 'is-active' : ''}`}
                onClick={onClose}
              >
                <span className="mobile-nav-icon">{link.icon}</span>
                <span className="mobile-nav-label">{link.label}</span>
              </Link>
            );
          })}
        </nav>
      </div>
    </div>
  );
};
