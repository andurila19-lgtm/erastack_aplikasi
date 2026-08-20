'use client';

import React, { useState, useEffect } from 'react';
import { 
  X, Banknote, QrCode, Building2, CheckCircle2, 
  AlertCircle, Printer, ArrowRight
} from 'lucide-react';
import { usePos } from '../../context/PosStoreContext';
import { Button } from '../ui/Button';
import './PosPaymentModal.css';

export interface PosPaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export const PosPaymentModal: React.FC<PosPaymentModalProps> = ({ isOpen, onClose, onSuccess }) => {
  const { cart, completeTransaction } = usePos();
  const [paymentMethod, setPaymentMethod] = useState<'TUNAI' | 'QRIS' | 'TRANSFER'>('TUNAI');
  const [paidInput, setPaidInput] = useState<string>('');
  const [notes, setNotes] = useState<string>('');

  const subtotal = cart.reduce((acc, item) => acc + (item.product.sellPrice * item.qty), 0);
  const totalPayable = subtotal;

  const numPaid = Number(paidInput) || 0;
  const change = Math.max(0, numPaid - totalPayable);
  const isUnderpaid = paymentMethod === 'TUNAI' && numPaid > 0 && numPaid < totalPayable;
  const isExactOrOver = paymentMethod !== 'TUNAI' || numPaid >= totalPayable;

  useEffect(() => {
    if (isOpen) {
      setPaidInput('');
      setNotes('');
      setPaymentMethod('TUNAI');
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;
      if (e.key === 'Escape') {
        onClose();
      }
      if (e.key === 'Enter' && isExactOrOver) {
        handleComplete();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, isExactOrOver]);

  if (!isOpen) return null;

  const handleComplete = () => {
    const finalPaid = paymentMethod === 'TUNAI' ? (numPaid || totalPayable) : totalPayable;
    const tx = completeTransaction(finalPaid, paymentMethod, 0, notes);
    if (tx) {
      onSuccess();
    }
  };

  const handleQuickCash = (amount: number) => {
    setPaidInput(String(amount));
  };

  const formatRupiah = (val: number) => {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(val);
  };

  return (
    <div className="pos-modal-overlay">
      <div className="pos-payment-modal">
        <div className="payment-modal-head">
          <div>
            <strong className="payment-modal-title">Pembayaran Kasir</strong>
            <span className="payment-modal-sub">{cart.length} Item Barang Belanjaan</span>
          </div>
          <button type="button" className="btn-close-modal" onClick={onClose} aria-label="Tutup">
            <X size={18} />
          </button>
        </div>

        <div className="payment-modal-body">
          <div className="payment-total-banner">
            <span className="total-label">Total yang Harus Dibayar:</span>
            <strong className="total-figure">{formatRupiah(totalPayable)}</strong>
          </div>

          <div className="method-selector-wrap">
            <span className="section-field-label">Metode Pembayaran:</span>
            <div className="method-grid">
              <button
                type="button"
                className={`method-card ${paymentMethod === 'TUNAI' ? 'is-selected' : ''}`}
                onClick={() => setPaymentMethod('TUNAI')}
              >
                <Banknote size={20} />
                <span>Uang Tunai (Cash)</span>
              </button>

              <button
                type="button"
                className={`method-card ${paymentMethod === 'QRIS' ? 'is-selected' : ''}`}
                onClick={() => setPaymentMethod('QRIS')}
              >
                <QrCode size={20} />
                <span>QRIS Dinamis</span>
              </button>

              <button
                type="button"
                className={`method-card ${paymentMethod === 'TRANSFER' ? 'is-selected' : ''}`}
                onClick={() => setPaymentMethod('TRANSFER')}
              >
                <Building2 size={20} />
                <span>Transfer Bank</span>
              </button>
            </div>
          </div>

          {paymentMethod === 'TUNAI' && (
            <div className="cash-input-section">
              <div className="cash-field-wrap">
                <span className="section-field-label">Uang Diterima dari Pelanggan:</span>
                <div className="cash-input-box">
                  <span className="rp-badge">Rp</span>
                  <input
                    type="number"
                    autoFocus
                    className="cash-input"
                    placeholder={String(totalPayable)}
                    value={paidInput}
                    onChange={(e) => setPaidInput(e.target.value)}
                  />
                </div>
              </div>

              <div className="quick-cash-row">
                <button
                  type="button"
                  className="quick-cash-btn"
                  onClick={() => handleQuickCash(totalPayable)}
                >
                  Uang Pas ({formatRupiah(totalPayable)})
                </button>
                <button
                  type="button"
                  className="quick-cash-btn"
                  onClick={() => handleQuickCash(20000)}
                >
                  Rp 20.000
                </button>
                <button
                  type="button"
                  className="quick-cash-btn"
                  onClick={() => handleQuickCash(50000)}
                >
                  Rp 50.000
                </button>
                <button
                  type="button"
                  className="quick-cash-btn"
                  onClick={() => handleQuickCash(100000)}
                >
                  Rp 100.000
                </button>
                <button
                  type="button"
                  className="quick-cash-btn"
                  onClick={() => handleQuickCash(200000)}
                >
                  Rp 200.000
                </button>
              </div>

              <div className={`change-display-box ${isUnderpaid ? 'underpaid' : 'change-ok'}`}>
                {isUnderpaid ? (
                  <>
                    <AlertCircle size={18} className="text-red" />
                    <span>Uang Kurang: <strong>{formatRupiah(totalPayable - numPaid)}</strong></span>
                  </>
                ) : (
                  <>
                    <CheckCircle2 size={18} className="text-emerald" />
                    <span>Kembalian: <strong>{formatRupiah(change)}</strong></span>
                  </>
                )}
              </div>
            </div>
          )}

          {paymentMethod === 'QRIS' && (
            <div className="qris-preview-box">
              <div className="qris-frame">
                <QrCode size={140} className="qris-qr-icon" />
                <span className="qris-hint">Scan QRIS melalui GoPay, OVO, Dana, BCA, Mandiri, BRI, dll.</span>
              </div>
              <div className="qris-status-pill">
                <CheckCircle2 size={15} />
                <span>Total Pas: {formatRupiah(totalPayable)}</span>
              </div>
            </div>
          )}

          {paymentMethod === 'TRANSFER' && (
            <div className="transfer-preview-box">
              <div className="bank-account-card">
                <strong>BCA - Toko Sembako Barokah</strong>
                <span className="acc-number">No. Rekening: 123-456-7890</span>
                <span className="acc-name">a/n H. Barokah Sejahtera</span>
              </div>
            </div>
          )}

          <div className="notes-field-wrap">
            <span className="section-field-label">Catatan Tambahan (Opsional):</span>
            <input
              type="text"
              className="notes-input"
              placeholder="Contoh: Meja 4 / Bungkus plastik / Langganan"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
            />
          </div>
        </div>

        <div className="payment-modal-foot">
          <button type="button" className="btn-cancel-modal" onClick={onClose}>
            Batal (Esc)
          </button>

          <button
            type="button"
            className="btn-submit-payment"
            disabled={!isExactOrOver}
            onClick={handleComplete}
          >
            <Printer size={18} />
            <span>Selesaikan & Cetak Struk</span>
            <ArrowRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};
