'use client';

import React, { useState, useMemo, useRef, useEffect } from 'react';
import { 
  Search, Plus, Minus, Trash2, ShoppingBag, 
  CreditCard, Tag, RotateCcw, 
  CheckCircle2, AlertTriangle, ArrowRight, Zap
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
      <div className="pos-catalog-pane">
        <div className="catalog-toolbar">
          <div className="catalog-search-box">
            <Search size={18} className="search-icon" />
            <input
              ref={searchInputRef}
              type="text"
              className="catalog-search-input"
              placeholder="Cari nama barang atau scan barcode (Tekan F2)..."
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

        <div className="catalog-grid">
          {filteredProducts.length === 0 ? (
            <div className="catalog-empty-state">
              <ShoppingBag size={40} className="empty-icon" />
              <h4>Barang Tidak Ditemukan</h4>
              <p>Tidak ada produk yang cocok dengan pencarian "<strong>{searchQuery}</strong>".</p>
            </div>
          ) : (
            filteredProducts.map((prod) => {
              const inCart = cart.find((ci) => ci.product.id === prod.id);
              const isLowStock = prod.stock <= prod.minStock;
              const isOutOfStock = prod.stock <= 0;

              return (
                <button
                  key={prod.id}
                  type="button"
                  className={`product-touch-card ${isOutOfStock ? 'is-out-of-stock' : ''}`}
                  onClick={() => !isOutOfStock && addToCart(prod)}
                  disabled={isOutOfStock}
                >
                  <div className="card-top-info">
                    <span className="product-category-tag">{prod.category}</span>
                    <span className={`stock-badge ${isOutOfStock ? 'red' : isLowStock ? 'orange' : 'green'}`}>
                      {isOutOfStock ? 'Habis' : `Stok: ${prod.stock} ${prod.unit}`}
                    </span>
                  </div>

                  <strong className="product-card-title">{prod.name}</strong>

                  <div className="card-bottom-row">
                    <span className="price-tag">{formatRupiah(prod.sellPrice)}</span>
                    <div className="add-action-btn">
                      <Plus size={16} />
                      {inCart && <span className="in-cart-count">{inCart.qty}</span>}
                    </div>
                  </div>
                </button>
              );
            })
          )}
        </div>
      </div>

      <div className="pos-cart-pane">
        <div className="cart-pane-header">
          <div className="cart-title-row">
            <ShoppingBag size={18} className="text-brand" />
            <strong className="cart-title">Keranjang Kasir</strong>
            <span className="cart-count-pill">{cart.length} Item</span>
          </div>

          {cart.length > 0 && (
            <button 
              type="button" 
              className="btn-clear-cart"
              onClick={clearCart}
              title="Kosongkan Keranjang"
            >
              <RotateCcw size={14} />
              <span>Reset</span>
            </button>
          )}
        </div>

        <div className="cart-items-scroll">
          {cart.length === 0 ? (
            <div className="cart-empty-box">
              <ShoppingBag size={36} className="cart-empty-icon" />
              <p className="empty-text">Keranjang Masih Kosong</p>
              <span className="empty-sub">Pilih produk di sebelah kiri atau scan barcode barang untuk memulai transaksi.</span>
            </div>
          ) : (
            <div className="cart-items-list">
              {cart.map((item) => (
                <div key={item.product.id} className="cart-item-row">
                  <div className="cart-item-info">
                    <strong className="cart-item-name">{item.product.name}</strong>
                    <span className="cart-item-unit-price">
                      {formatRupiah(item.product.sellPrice)} / {item.product.unit}
                    </span>
                  </div>

                  <div className="cart-item-actions">
                    <div className="qty-control-group">
                      <button
                        type="button"
                        className="qty-btn minus"
                        onClick={() => updateCartQty(item.product.id, item.qty - 1)}
                        aria-label="Kurang qty"
                      >
                        <Minus size={13} />
                      </button>
                      <span className="qty-val">{item.qty}</span>
                      <button
                        type="button"
                        className="qty-btn plus"
                        onClick={() => updateCartQty(item.product.id, item.qty + 1)}
                        disabled={item.qty >= item.product.stock}
                        aria-label="Tambah qty"
                      >
                        <Plus size={13} />
                      </button>
                    </div>

                    <strong className="cart-item-subtotal">
                      {formatRupiah(item.product.sellPrice * item.qty)}
                    </strong>

                    <button
                      type="button"
                      className="btn-remove-item"
                      onClick={() => removeFromCart(item.product.id)}
                      aria-label="Hapus item"
                    >
                      <Trash2 size={15} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="cart-checkout-footer">
          <div className="checkout-summary-rows">
            <div className="summary-line">
              <span>Subtotal Belanja:</span>
              <strong className="subtotal-val">{formatRupiah(subtotal)}</strong>
            </div>

            <div className="summary-line discount">
              <span>Potongan Diskon:</span>
              <div className="discount-input-wrap">
                <span className="rp-prefix">Rp</span>
                <input
                  type="number"
                  className="discount-field"
                  placeholder="0"
                  min="0"
                  value={discountInput || ''}
                  onChange={(e) => setDiscountInput(Number(e.target.value) || 0)}
                />
              </div>
            </div>

            <div className="summary-line total-highlight">
              <span>Total Tagihan:</span>
              <strong className="total-big-num">{formatRupiah(totalPayable)}</strong>
            </div>
          </div>

          <button
            type="button"
            className="btn-pay-action"
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
