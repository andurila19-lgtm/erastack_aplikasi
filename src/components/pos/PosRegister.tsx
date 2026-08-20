'use client';

import React, { useState, useMemo, useRef, useEffect } from 'react';
import { 
  Search, Plus, Minus, Trash2, ShoppingBag, 
  CreditCard, Tag, RotateCcw, 
  ArrowRight, ShoppingCart, List, X, Sparkles
} from 'lucide-react';
import { usePos } from '../../context/PosStoreContext';
import { PosProduct } from '../../data/posInitialData';
import { Button } from '../ui/Button';
import './PosRegister.css';

export interface PosRegisterProps {
  onOpenPayment: () => void;
}

const CATEGORIES = ['Semua', 'Sembako', 'Minuman', 'Makanan & Snack', 'Kebutuhan Rumah', 'Bumbu & Dapur'] as const;

export const PosRegister: React.FC<PosRegisterProps> = ({ onOpenPayment }) => {
  const { products, cart, cartDiscount, addToCart, removeFromCart, updateCartQty, clearCart, setCartDiscount } = usePos();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('Semua');
  const [isMobileCartOpen, setIsMobileCartOpen] = useState(false);
  const searchInputRef = useRef<HTMLInputElement>(null);

  const filteredProducts = useMemo(() => {
    return products.filter((prod) => {
      const matchCat = selectedCategory === 'Semua' || prod.category === selectedCategory;
      const matchSearch = 
        prod.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        prod.sku.toLowerCase().includes(searchQuery.toLowerCase()) ||
        prod.barcode.includes(searchQuery);
      return matchCat && matchSearch;
    });
  }, [products, selectedCategory, searchQuery]);

  const subtotal = cart.reduce((acc, item) => acc + (item.product.sellPrice * item.qty), 0);
  const totalItemCount = cart.reduce((acc, item) => acc + item.qty, 0);
  const totalPayable = Math.max(0, subtotal - cartDiscount);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'F9' || (e.ctrlKey && e.key === 'Enter')) {
        e.preventDefault();
        if (cart.length > 0) {
          onOpenPayment();
        }
      }
      if (e.key === 'F2') {
        e.preventDefault();
        searchInputRef.current?.focus();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [cart.length, onOpenPayment]);

  const formatRupiah = (val: number) => {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(val);
  };

  const handleOpenMobileCart = () => {
    setIsMobileCartOpen(true);
  };

  const handleCloseMobileCart = () => {
    setIsMobileCartOpen(false);
  };

  const handleMobileCheckout = () => {
    setIsMobileCartOpen(false);
    onOpenPayment();
  };

  return (
    <div className="pos-register-root">
      {/* LEFT / MAIN: Product Catalog */}
      <section className="pos-catalog-section" aria-label="Katalog Produk">
        {/* Search & Category Filter Header */}
        <div className="catalog-toolbar-card">
          <div className="catalog-search-row">
            <div className="catalog-search-box">
              <Search size={18} className="search-icon" />
              <input
                ref={searchInputRef}
                type="text"
                className="catalog-search-input"
                placeholder="Cari nama barang, SKU, atau scan barcode (F2)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                aria-label="Pencarian produk"
              />
              {searchQuery && (
                <button 
                  type="button" 
                  className="clear-search-btn"
                  onClick={() => setSearchQuery('')}
                  aria-label="Hapus pencarian"
                >
                  <X size={14} />
                </button>
              )}
            </div>

            <div className="catalog-keyboard-hint">
              <kbd>F2</kbd> Cari • <kbd>F9</kbd> Bayar
            </div>
          </div>

          <div className="catalog-cat-scroll" role="tablist" aria-label="Filter Kategori">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                type="button"
                className={`cat-chip-btn ${selectedCategory === cat ? 'is-active' : ''}`}
                onClick={() => setSelectedCategory(cat)}
                role="tab"
                aria-selected={selectedCategory === cat}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Product Grid / List */}
        <div className="catalog-grid-wrapper">
          {filteredProducts.length === 0 ? (
            <div className="empty-catalog-box">
              <ShoppingBag size={48} className="empty-catalog-icon" />
              <p className="empty-catalog-title">Barang tidak ditemukan</p>
              <span className="empty-catalog-sub">Coba ubah kata kunci pencarian atau ganti kategori.</span>
            </div>
          ) : (
            <div className="catalog-product-grid">
              {filteredProducts.map((prod) => {
                const inCartItem = cart.find((ci) => ci.product.id === prod.id);
                const isOutOfStock = prod.stock <= 0;
                const isLowStock = prod.stock > 0 && prod.stock <= prod.minStock;

                return (
                  <div
                    key={prod.id}
                    className={`pos-product-card ${isOutOfStock ? 'is-out-of-stock' : ''} ${inCartItem ? 'is-in-cart' : ''}`}
                    onClick={() => {
                      if (!isOutOfStock) {
                        addToCart(prod, 1);
                      }
                    }}
                    role="button"
                    tabIndex={0}
                    aria-disabled={isOutOfStock}
                  >
                    <div className="card-top-row">
                      <span className="card-category-tag">{prod.category}</span>
                      {isOutOfStock ? (
                        <span className="stock-tag danger">Habis</span>
                      ) : isLowStock ? (
                        <span className="stock-tag warning">Sisa {prod.stock}</span>
                      ) : (
                        <span className="stock-tag normal">{prod.stock} {prod.unit}</span>
                      )}
                    </div>

                    <strong className="card-product-name">{prod.name}</strong>

                    <div className="card-bottom-row">
                      <div className="card-price-group">
                        <span className="card-price-label">Harga</span>
                        <strong className="card-price-val">{formatRupiah(prod.sellPrice)}</strong>
                      </div>

                      {inCartItem ? (
                        <div className="card-cart-pill" onClick={(e) => e.stopPropagation()}>
                          <button
                            type="button"
                            className="mini-qty-btn"
                            onClick={() => updateCartQty(prod.id, inCartItem.qty - 1)}
                            aria-label="Kurangi kuantitas"
                          >
                            <Minus size={14} />
                          </button>
                          <span className="mini-qty-val tabular-nums">{inCartItem.qty}</span>
                          <button
                            type="button"
                            className="mini-qty-btn"
                            disabled={inCartItem.qty >= prod.stock}
                            onClick={() => updateCartQty(prod.id, inCartItem.qty + 1)}
                            aria-label="Tambah kuantitas"
                          >
                            <Plus size={14} />
                          </button>
                        </div>
                      ) : (
                        <button
                          type="button"
                          className="card-add-btn"
                          disabled={isOutOfStock}
                          onClick={(e) => {
                            e.stopPropagation();
                            addToCart(prod, 1);
                          }}
                          aria-label={`Tambah ${prod.name} ke nota`}
                        >
                          <Plus size={18} />
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* MOBILE STICKY FLOATING CART BAR */}
        {totalItemCount > 0 && (
          <div className="mobile-floating-cart-bar">
            <div className="floating-cart-info" onClick={handleOpenMobileCart} role="button" tabIndex={0}>
              <div className="floating-cart-left">
                <span className="floating-cart-count-badge">{totalItemCount}</span>
                <div className="floating-cart-text-wrap">
                  <span className="floating-cart-sub">{totalItemCount} Item Belanja</span>
                  <strong className="floating-cart-total">{formatRupiah(totalPayable)}</strong>
                </div>
              </div>
            </div>

            <button
              type="button"
              className="floating-pay-btn"
              onClick={onOpenPayment}
              aria-label="Lanjut ke pembayaran kasir"
            >
              <span>Bayar</span>
              <ArrowRight size={16} />
            </button>
          </div>
        )}
      </section>

      {/* RIGHT: Cart Panel (Persistent on Desktop & Tablet, Drawer/Sheet on Mobile) */}
      <aside 
        className={`pos-cart-panel ${isMobileCartOpen ? 'is-mobile-open' : ''}`}
        aria-label="Nota Belanja Aktif"
      >
        {/* Mobile Backdrop */}
        {isMobileCartOpen && (
          <div className="mobile-cart-backdrop" onClick={handleCloseMobileCart} />
        )}

        <div className="cart-panel-inner">
          {/* Header */}
          <div className="cart-panel-header">
            <div className="cart-title-row">
              <ShoppingCart size={20} className="cart-title-icon" />
              <strong className="cart-title">Nota Belanja</strong>
              <span className="cart-count-pill">{totalItemCount} Item</span>
            </div>

            <div className="cart-actions-row">
              {cart.length > 0 && (
                <button
                  type="button"
                  className="cart-clear-btn"
                  onClick={clearCart}
                  title="Kosongkan Keranjang"
                  aria-label="Reset keranjang"
                >
                  <RotateCcw size={13} />
                  <span>Reset</span>
                </button>
              )}

              {/* Close Button on Mobile Drawer */}
              <button
                type="button"
                className="mobile-close-cart-btn"
                onClick={handleCloseMobileCart}
                aria-label="Tutup nota"
              >
                <X size={18} />
              </button>
            </div>
          </div>

          {/* Cart Item List */}
          <div className="cart-items-container">
            {cart.length === 0 ? (
              <div className="empty-cart-box">
                <ShoppingBag size={44} className="empty-cart-icon" />
                <p className="empty-cart-title">Nota Belanja Kosong</p>
                <span className="empty-cart-sub">Pilih produk dari katalog atau pindai barcode dengan scanner.</span>
              </div>
            ) : (
              cart.map((item) => (
                <div key={item.product.id} className="cart-item-row">
                  <div className="cart-item-info">
                    <strong className="cart-item-name">{item.product.name}</strong>
                    <div className="cart-item-price-meta">
                      <span className="unit-price">{formatRupiah(item.product.sellPrice)}</span>
                      <span className="meta-sep">•</span>
                      <span className="meta-subtotal">{formatRupiah(item.product.sellPrice * item.qty)}</span>
                    </div>
                  </div>

                  <div className="cart-item-qty-controls">
                    <button
                      type="button"
                      className="qty-btn minus"
                      onClick={() => updateCartQty(item.product.id, item.qty - 1)}
                      aria-label="Kurangi kuantitas"
                    >
                      <Minus size={14} />
                    </button>
                    <span className="qty-val tabular-nums">{item.qty}</span>
                    <button
                      type="button"
                      className="qty-btn plus"
                      disabled={item.qty >= item.product.stock}
                      onClick={() => updateCartQty(item.product.id, item.qty + 1)}
                      aria-label="Tambah kuantitas"
                    >
                      <Plus size={14} />
                    </button>
                    <button
                      type="button"
                      className="qty-btn delete"
                      onClick={() => removeFromCart(item.product.id)}
                      title="Hapus Barang dari Nota"
                      aria-label={`Hapus ${item.product.name}`}
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Cart Footer Summary */}
          <div className="cart-footer-summary">
            <div className="summary-discount-row">
              <div className="discount-label-group">
                <Tag size={14} className="text-muted" />
                <span>Diskon Nota (Rp):</span>
              </div>
              <input
                type="number"
                className="discount-input"
                placeholder="0"
                value={cartDiscount === 0 ? '' : cartDiscount}
                onChange={(e) => setCartDiscount(Math.max(0, Number(e.target.value) || 0))}
                aria-label="Potongan diskon nominal rupiah"
              />
            </div>

            <div className="summary-calc-box">
              <div className="calc-row">
                <span>Subtotal Belanja</span>
                <strong className="tabular-nums">{formatRupiah(subtotal)}</strong>
              </div>
              {cartDiscount > 0 && (
                <div className="calc-row discount-row">
                  <span>Potongan Diskon</span>
                  <strong className="text-danger tabular-nums">- {formatRupiah(cartDiscount)}</strong>
                </div>
              )}
              <div className="calc-row total-row">
                <span className="total-label">Total Tagihan</span>
                <strong className="total-val tabular-nums">{formatRupiah(totalPayable)}</strong>
              </div>
            </div>

            <button
              type="button"
              className="checkout-btn"
              disabled={cart.length === 0}
              onClick={isMobileCartOpen ? handleMobileCheckout : onOpenPayment}
              aria-label="Buka popup pembayaran"
            >
              <CreditCard size={20} />
              <span>Bayar Transaksi (F9)</span>
              <ArrowRight size={18} />
            </button>
          </div>
        </div>
      </aside>
    </div>
  );
};
