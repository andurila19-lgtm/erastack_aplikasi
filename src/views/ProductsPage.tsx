'use client';

import React, { useState, useMemo } from 'react';
import { 
  Search, Filter, SlidersHorizontal, RefreshCw, 
  ShieldCheck, Cpu, HardDrive, Zap, CheckCircle2
} from 'lucide-react';
import { SEOHead } from '../components/common/SEOHead';
import { PRODUCTS_CATALOG } from '../data/productsData';
import { ProductCard } from '../components/products/ProductCard';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import './ProductsPage.css';

const CATEGORIES = [
  'Semua Kategori',
  'Business & POS',
  'AI & Intelligence',
  'Data & Storage',
  'Hardware & Drivers',
  'Utilities & Tools',
] as const;

const PLATFORMS = [
  { id: 'all', label: 'Semua Platform' },
  { id: 'windows', label: 'Windows EXE' },
  { id: 'android', label: 'Android APK' },
  { id: 'web', label: 'Web / Cloud Bridge' },
] as const;

export const ProductsPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('Semua Kategori');
  const [selectedPlatform, setSelectedPlatform] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'popular' | 'rating' | 'name'>('popular');

  const filteredProducts = useMemo(() => {
    return PRODUCTS_CATALOG.filter(product => {
      const matchesSearch = 
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.tagline.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.features.some(f => f.toLowerCase().includes(searchQuery.toLowerCase()));

      const matchesCategory = 
        selectedCategory === 'Semua Kategori' || product.category === selectedCategory;

      const matchesPlatform = 
        selectedPlatform === 'all' || product.platforms.includes(selectedPlatform as any);

      return matchesSearch && matchesCategory && matchesPlatform;
    }).sort((a, b) => {
      if (sortBy === 'rating') {
        return b.rating - a.rating;
      }
      if (sortBy === 'name') {
        return a.name.localeCompare(b.name);
      }
      return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
    });
  }, [searchQuery, selectedCategory, selectedPlatform, sortBy]);

  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedCategory('Semua Kategori');
    setSelectedPlatform('all');
    setSortBy('popular');
  };

  return (
    <div className="products-page-root">
      <SEOHead
        title="Katalog Produk & Software Resmi"
        description="Jelajahi ekosistem perangkat lunak ERASTACK: POS offline-first, engine AI lokal on-device, dan utilitas hardware bisnis."
      />

      <section className="products-hero-section">
        <div className="container">
          <div className="products-hero-content">
            <Badge variant="lime" size="sm" dot>Katalog Software Resmi ERASTACK</Badge>
            
            <h1 className="products-hero-title">
              Software Bisnis, AI Lokal & Utilitas <span className="highlight-text">Siap Produksi</span>
            </h1>
            
            <p className="products-hero-desc">
              Temukan seluruh aplikasi resmi ekosistem ERASTACK. Dirancang khusus untuk beroperasi offline, aman dari ketergantungan cloud, dan sangat hemat sumber daya.
            </p>

            <div className="products-stats-row">
              <div className="stat-pill-card">
                <span className="stat-pill-icon"><Zap size={16} /></span>
                <div className="stat-pill-text">
                  <span className="stat-pill-num">6 Aplikasi</span>
                  <span className="stat-pill-label">Tersedia Siap Pakai</span>
                </div>
              </div>
              <div className="stat-pill-card">
                <span className="stat-pill-icon"><HardDrive size={16} /></span>
                <div className="stat-pill-text">
                  <span className="stat-pill-num">100% Offline</span>
                  <span className="stat-pill-label">Database SQLite Lokal</span>
                </div>
              </div>
              <div className="stat-pill-card">
                <span className="stat-pill-icon"><Cpu size={16} /></span>
                <div className="stat-pill-text">
                  <span className="stat-pill-num">Rp 0 Biaya</span>
                  <span className="stat-pill-label">AI On-Device Tanpa API</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="products-directory-section">
        <div className="container">
          <div className="catalog-toolbar-wrap">
            <div className="search-input-box">
              <Search size={17} className="search-icon" />
              <input
                type="text"
                className="catalog-search-field"
                placeholder="Cari software, fitur kasir, SLM engine, barcode..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                aria-label="Cari produk software"
              />
              {searchQuery && (
                <button 
                  type="button" 
                  className="search-clear-btn"
                  onClick={() => setSearchQuery('')}
                >
                  ✕
                </button>
              )}
            </div>

            <div className="toolbar-controls-row">
              <div className="category-scroll-nav">
                {CATEGORIES.map(cat => (
                  <button
                    key={cat}
                    type="button"
                    className={`category-pill-btn ${selectedCategory === cat ? 'is-active' : ''}`}
                    onClick={() => setSelectedCategory(cat)}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              <div className="secondary-filters-row">
                <div className="platform-filter-group">
                  <span className="filter-group-label">Platform:</span>
                  <div className="platform-chips-list">
                    {PLATFORMS.map(plt => (
                      <button
                        key={plt.id}
                        type="button"
                        className={`platform-chip-btn ${selectedPlatform === plt.id ? 'is-active' : ''}`}
                        onClick={() => setSelectedPlatform(plt.id)}
                      >
                        {plt.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="sort-selector-wrap">
                  <SlidersHorizontal size={14} className="sort-icon" />
                  <select
                    className="sort-dropdown"
                    value={sortBy}
                    onChange={e => setSortBy(e.target.value as any)}
                    aria-label="Urutkan produk"
                  >
                    <option value="popular">Paling Populer</option>
                    <option value="rating">Rating Tertinggi</option>
                    <option value="name">Nama (A - Z)</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          <div className="catalog-results-header">
            <span className="results-count-text">
              Menampilkan <strong>{filteredProducts.length}</strong> dari {PRODUCTS_CATALOG.length} Software
            </span>
            {(searchQuery || selectedCategory !== 'Semua Kategori' || selectedPlatform !== 'all') && (
              <button 
                type="button" 
                className="reset-filters-btn"
                onClick={handleResetFilters}
              >
                <RefreshCw size={12} />
                <span>Reset Filter</span>
              </button>
            )}
          </div>

          {filteredProducts.length > 0 ? (
            <div className="products-grid">
              {filteredProducts.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="no-results-card">
              <Filter size={32} className="no-results-icon" />
              <h3 className="no-results-title">Tidak Ada Software yang Cocok</h3>
              <p className="no-results-desc">
                Pencarian "{searchQuery}" tidak menemukan software dengan filter yang aktif saat ini.
              </p>
              <Button variant="primary" size="md" onClick={handleResetFilters}>
                Tampilkan Semua Software
              </Button>
            </div>
          )}
        </div>
      </section>

      <section className="products-guarantee-section">
        <div className="container">
          <div className="guarantee-carbon-card">
            <div className="guarantee-head">
              <ShieldCheck size={28} className="guarantee-shield-icon" />
              <h3 className="guarantee-title">Standar Mutu & Keamanan Software ERASTACK</h3>
            </div>

            <div className="guarantee-grid">
              <div className="guarantee-point">
                <CheckCircle2 size={18} className="point-check" />
                <div className="point-text">
                  <strong>Kedaulatan Data Lokal Penuh</strong>
                  <span>Database tidak terkunci di server cloud. Anda memiliki kendali 100% atas file SQLite bisnis Anda.</span>
                </div>
              </div>
              <div className="guarantee-point">
                <CheckCircle2 size={18} className="point-check" />
                <div className="point-text">
                  <strong>Biner Terverifikasi ED25519 & SHA-256</strong>
                  <span>Setiap installer Windows EXE dan APK Android diverifikasi dengan tanda tangan kriptografi digital resmi.</span>
                </div>
              </div>
              <div className="guarantee-point">
                <CheckCircle2 size={18} className="point-check" />
                <div className="point-text">
                  <strong>Zero-Bloat Performance</strong>
                  <span>Waktu startup aplikasi &lt; 500ms dan konsumsi RAM idle &lt; 70MB untuk menjamin kelancaran kasir selamanya.</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
