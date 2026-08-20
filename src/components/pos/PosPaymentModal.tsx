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
  const { cart, cartDiscount, completeTransaction } = usePos();
  const [paymentMethod, setPaymentMethod] = useState<'TUNAI' | 'QRIS' | 'TRANSFER'>('TUNAI');
  const [paidInput, setPaidInput] = useState<string>('');
  const [notes, setNotes] = useState<string>('');
  const [isProcessing, setIsProcessing] = useState<boolean>(false);

  const subtotal = cart.reduce((acc, item) => acc + (item.product.sellPrice * item.qty), 0);
  const totalPayable = Math.max(0, subtotal - cartDiscount);

  const numPaid = Number(paidInput) || 0;
  const change = Math.max(0, numPaid - totalPayable);
  const isUnderpaid = paymentMethod === 'TUNAI' && numPaid > 0 && numPaid < totalPayable;
  const isExactOrOver = paymentMethod !== 'TUNAI' || numPaid >= totalPayable || (paidInput === '' && totalPayable === 0);

  useEffect(() => {
    if (isOpen) {
      setPaidInput('');
      setNotes('');
      setPaymentMethod('TUNAI');
      setIsProcessing(false);
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen || isProcessing) return;
      if (e.key === 'Escape') {
        onClose();
      }
      if (e.key === 'Enter' && isExactOrOver) {
        handleComplete();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, isExactOrOver, isProcessing]);

  if (!isOpen) return null;

  const handleComplete = () => {
    if (isProcessing) return; // Prevent duplicate submit
    if (paymentMethod === 'TUNAI' && numPaid < totalPayable && totalPayable > 0) {
      return; // Prevent underpaid completion
    }

    setIsProcessing(true);
    try {
      const finalPaid = paymentMethod === 'TUNAI' ? (numPaid || totalPayable) : totalPayable;
      const tx = completeTransaction(finalPaid, paymentMethod, notes);
      if (tx) {
        onSuccess();
      }
    } finally {
      setIsProcessing(false);
    }
  };

  const handleQuickCash = (amount: number) => {
    setPaidInput(String(amount));
  };

  const formatRupiah = (val: number) => {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(val);
  };

  // Generate dynamic round cash suggestions based on totalPayable
  const quickCashOptions = [
    totalPayable,
    Math.ceil(totalPayable / 10000) * 10000,
    Math.ceil(totalPayable / 50000) * 50000,
    Math.ceil(totalPayable / 100000) * 100000,
    100000,
    200000,
  ].filter((v, idx, arr) => v >= totalPayable && arr.indexOf(v) === idx && v > 0);

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
            <span className="total-label">Total Tagihan:</span>
            <strong className="total-figure tabular-nums">{formatRupiah(totalPayable)}</strong>
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
                {quickCashOptions.map((amt) => {
                  if (amt === totalPayable) return null;
                  return (
                    <button
                      key={amt}
                      type="button"
                      className="quick-cash-btn"
                      onClick={() => handleQuickCash(amt)}
                    >
                      {formatRupiah(amt)}
                    </button>
                  );
                })}
              </div>

              {numPaid > 0 && (
                <div className={`change-display-box ${isUnderpaid ? 'underpaid' : 'change-ok'}`}>
                  {isUnderpaid ? (
                    <>
                      <AlertCircle size={18} />
                      <span>Uang Kurang: <strong>{formatRupiah(totalPayable - numPaid)}</strong></span>
                    </>
                  ) : (
                    <>
                      <CheckCircle2 size={18} />
                      <span>Uang Kembalian: <strong className="tabular-nums">{formatRupiah(change)}</strong></span>
                    </>
                  )}
                </div>
              )}
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
              placeholder="Contoh: Meja 4 / Bungkus kardus / Pelanggan tetap"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
            />
          </div>
        </div>

        <div className="payment-modal-foot">
          <button type="button" className="btn-cancel-modal" onClick={onClose} disabled={isProcessing}>
            Batal (Esc)
          </button>

          <button
            type="button"
            className="btn-submit-payment"
            disabled={!isExactOrOver || isProcessing}
            onClick={handleComplete}
          >
            <Printer size={18} />
            <span>{isProcessing ? 'Memproses...' : 'Selesaikan & Cetak Struk'}</span>
            <ArrowRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};
