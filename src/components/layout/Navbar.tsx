'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Search, Menu, X, ArrowUpRight, ShoppingCart } from 'lucide-react';
import { BrandLogo } from '../common/BrandLogo';
import './Navbar.css';

export interface NavbarProps {
  onOpenCommand: () => void;
  onToggleMobileNav: () => void;
  isMobileNavOpen: boolean;
}

const NAV_LINKS = [
  { label: 'Produk', path: '/products' },
  { label: 'Asisten AI', path: '/ai-lab' },
  { label: 'Kisah Sukses', path: '/projects' },
  { label: 'Unduhan', path: '/downloads' },
  { label: 'Panduan', path: '/docs' },
  { label: 'Tentang', path: '/about' },
];

export const Navbar: React.FC<NavbarProps> = ({
  onOpenCommand,
  onToggleMobileNav,
  isMobileNavOpen,
}) => {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`navbar-root ${scrolled ? 'is-scrolled' : ''}`}>
      <div className="navbar-main">
        <div className="container navbar-container">
          <Link href="/" className="navbar-brand" aria-label="ERASTACK Beranda">
            <BrandLogo variant="full" size="sm" />
            <span className="brand-version-tag">v1.0</span>
          </Link>

          <nav className="navbar-desktop-nav" aria-label="Navigasi Utama">
            {NAV_LINKS.map((link) => {
              const isActive = Boolean(pathname && (pathname === link.path || (link.path !== '/' && pathname.startsWith(link.path))));
              return (
                <Link
                  key={link.path}
                  href={link.path}
                  className={`navbar-link ${isActive ? 'is-active' : ''}`}
                  aria-current={isActive ? 'page' : undefined}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          <div className="navbar-actions">
            <button
              type="button"
              className="navbar-search-btn"
              onClick={onOpenCommand}
              aria-label="Cari Panduan & Fitur Toko"
            >
              <Search size={13} />
              <span className="search-btn-text">Cari...</span>
              <kbd className="search-btn-kbd">⌘K</kbd>
            </button>

            <Link href="/pos" className="navbar-pos-btn" title="Buka Aplikasi Kasir Langsung">
              <span className="pos-live-dot" />
              <span>Buka Kasir Web</span>
            </Link>

            <Link href="/downloads" className="navbar-cta-btn">
              <span>Unduh Gratis</span>
              <ArrowUpRight size={14} />
            </Link>

            <button
              type="button"
              className="navbar-mobile-toggle"
              onClick={onToggleMobileNav}
              aria-label={isMobileNavOpen ? 'Tutup Menu' : 'Buka Menu'}
              aria-expanded={isMobileNavOpen}
            >
              {isMobileNavOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
