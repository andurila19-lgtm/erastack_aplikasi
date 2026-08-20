'use client';

import React, { useState, useMemo, useRef, useEffect } from 'react';
import { 
  Search, Plus, Minus, Trash2, ShoppingBag, 
  CreditCard, Tag, RotateCcw, 
  CheckCircle2, AlertTriangle, ArrowRight, Zap, ShoppingCart, List
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
  const { products, cart, addToCart, removeFromCart, updateCartQty, clearCart } = usePos();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('Semua');
  const [discountInput, setDiscountInput] = useState<number>(0);
  const [mobileTab, setMobileTab] = useState<'catalog' | 'cart'>('catalog');
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
  const totalPayable = Math.max(0, subtotal - discountInput);

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

  return (
    <div className="pos-register-root">
      <div className="mobile-pos-segmented-bar">
        <button
          type="button"
          className={`mobile-seg-btn ${mobileTab === 'catalog' ? 'is-active' : ''}`}
          onClick={() => setMobileTab('catalog')}
        >
          <List size={16} />
          <span>Katalog Barang ({filteredProducts.length})</span>
        </button>
        <button
          type="button"
          className={`mobile-seg-btn ${mobileTab === 'cart' ? 'is-active' : ''}`}
          onClick={() => setMobileTab('cart')}
        >
          <ShoppingCart size={16} />
          <span>Keranjang ({totalItemCount})</span>
          {totalItemCount > 0 && (
            <span className="mobile-seg-price">{formatRupiah(totalPayable)}</span>
          )}
        </button>
      </div>

      <div className={`pos-catalog-pane ${mobileTab === 'cart' ? 'hide-on-mobile' : ''}`}>
        <div className="catalog-toolbar">
          <div className="catalog-search-box">
            <Search size={18} className="search-icon" />
            <input
              ref={searchInputRef}
              type="text"
              className="catalog-search-input"
              placeholder="Cari nama barang atau barcode (F2)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            {searchQuery && (
              <button 
                type="button" 
                className="clear-search-btn"
                onClick={() => setSearchQuery('')}
              >
                ✕
              </button>
            )}
          </div>

          <div className="catalog-cat-chips">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                type="button"
                className={`cat-chip-btn ${selectedCategory === cat ? 'is-active' : ''}`}
                onClick={() => setSelectedCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="catalog-product-grid">
          {filteredProducts.length === 0 ? (
            <div className="empty-catalog-box">
              <ShoppingBag size={48} className="empty-catalog-icon" />
              <p className="empty-catalog-title">Barang tidak ditemukan</p>
              <span className="empty-catalog-sub">Coba ubah kata kunci pencarian atau kategori barang.</span>
            </div>
          ) : (
            filteredProducts.map((prod) => {
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
                      <span className="card-price-label">Harga Jual</span>
                      <strong className="card-price-val">{formatRupiah(prod.sellPrice)}</strong>
                    </div>

                    {inCartItem ? (
                      <div className="card-cart-pill" onClick={(e) => e.stopPropagation()}>
                        <button
                          type="button"
                          className="mini-qty-btn"
                          onClick={() => updateCartQty(prod.id, inCartItem.qty - 1)}
                        >
                          <Minus size={12} />
                        </button>
                        <span className="mini-qty-val">{inCartItem.qty}</span>
                        <button
                          type="button"
                          className="mini-qty-btn"
                          disabled={inCartItem.qty >= prod.stock}
                          onClick={() => updateCartQty(prod.id, inCartItem.qty + 1)}
                        >
                          <Plus size={12} />
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
                      >
                        <Plus size={16} />
                      </button>
                    )}
                  </div>
                </div>
              );
            })
          )}
        </div>

        {totalItemCount > 0 && (
          <div className="mobile-floating-cart-bar">
            <div className="floating-cart-info" onClick={() => setMobileTab('cart')}>
              <span className="floating-cart-count">{totalItemCount} Item</span>
              <strong className="floating-cart-total">{formatRupiah(totalPayable)}</strong>
            </div>
            <button
              type="button"
              className="floating-pay-btn"
              onClick={onOpenPayment}
            >
              <span>Bayar</span>
              <ArrowRight size={16} />
            </button>
          </div>
        )}
      </div>

      <div className={`pos-cart-pane ${mobileTab === 'catalog' ? 'hide-on-mobile' : ''}`}>
        <div className="cart-header">
          <div className="cart-title-row">
            <ShoppingCart size={18} className="text-primary" />
            <strong className="cart-title">Nota Belanja</strong>
            <span className="cart-count-pill">{totalItemCount} Item</span>
          </div>

          {cart.length > 0 && (
            <button
              type="button"
              className="cart-clear-btn"
              onClick={clearCart}
              title="Kosongkan Keranjang"
            >
              <RotateCcw size={13} />
              <span>Reset</span>
            </button>
          )}
        </div>

        <div className="cart-items-container">
          {cart.length === 0 ? (
            <div className="empty-cart-box">
              <ShoppingBag size={48} className="empty-cart-icon" />
              <p className="empty-cart-title">Keranjang Masih Kosong</p>
              <span className="empty-cart-sub">Pilih barang dari daftar di samping atau scan barcode.</span>
            </div>
          ) : (
            cart.map((item) => (
              <div key={item.product.id} className="cart-item-row">
                <div className="cart-item-info">
                  <strong className="cart-item-name">{item.product.name}</strong>
                  <div className="cart-item-price-meta">
                    <span>{formatRupiah(item.product.sellPrice)}</span>
                    <span className="meta-divider">•</span>
                    <span className="meta-subtotal">{formatRupiah(item.product.sellPrice * item.qty)}</span>
                  </div>
                </div>

                <div className="cart-item-qty-controls">
                  <button
                    type="button"
                    className="qty-btn minus"
                    onClick={() => updateCartQty(item.product.id, item.qty - 1)}
                  >
                    <Minus size={14} />
                  </button>
                  <span className="qty-val">{item.qty}</span>
                  <button
                    type="button"
                    className="qty-btn plus"
                    disabled={item.qty >= item.product.stock}
                    onClick={() => updateCartQty(item.product.id, item.qty + 1)}
                  >
                    <Plus size={14} />
                  </button>
                  <button
                    type="button"
                    className="qty-btn delete"
                    onClick={() => removeFromCart(item.product.id)}
                    title="Hapus Barang"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        <div className="cart-footer-summary">
          <div className="summary-discount-row">
            <div className="discount-label-group">
              <Tag size={14} className="text-muted" />
              <span>Potongan Diskon (Rp):</span>
            </div>
            <input
              type="number"
              className="discount-input"
              placeholder="0"
              value={discountInput === 0 ? '' : discountInput}
              onChange={(e) => setDiscountInput(Math.max(0, Number(e.target.value) || 0))}
            />
          </div>

          <div className="summary-calc-box">
            <div className="calc-row">
              <span>Subtotal Belanja</span>
              <strong>{formatRupiah(subtotal)}</strong>
            </div>
            {discountInput > 0 && (
              <div className="calc-row discount-row">
                <span>Diskon Nota</span>
                <strong className="text-danger">- {formatRupiah(discountInput)}</strong>
              </div>
            )}
            <div className="calc-row total-row">
              <span className="total-label">Total Tagihan</span>
              <strong className="total-val">{formatRupiah(totalPayable)}</strong>
            </div>
          </div>

          <button
            type="button"
            className="checkout-btn"
            disabled={cart.length === 0}
            onClick={onOpenPayment}
          >
            <CreditCard size={20} />
            <span>Bayar Transaksi (F9)</span>
            <ArrowRight size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};
