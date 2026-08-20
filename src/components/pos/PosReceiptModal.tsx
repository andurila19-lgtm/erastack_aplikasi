'use client';

import React, { useRef } from 'react';
import { Printer, CheckCircle2, RotateCcw, X, Download } from 'lucide-react';
import { usePos } from '../../context/PosStoreContext';
import { TransactionRecord } from '../../data/posInitialData';
import './PosReceiptModal.css';

export interface PosReceiptModalProps {
  isOpen: boolean;
  onClose: () => void;
  transaction?: TransactionRecord | null;
}

export const PosReceiptModal: React.FC<PosReceiptModalProps> = ({ isOpen, onClose, transaction }) => {
  const { storeProfile, lastTransaction } = usePos();
  const receiptRef = useRef<HTMLDivElement>(null);

  const tx = transaction || lastTransaction;

  if (!isOpen || !tx) return null;

  const handlePrint = () => {
    window.print();
  };

  const formatRupiah = (val: number) => {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(val);
  };

  const formatDate = (isoString: string) => {
    const d = new Date(isoString);
    return d.toLocaleString('id-ID', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className="pos-modal-overlay">
      <div className="pos-receipt-modal">
        <div className="receipt-modal-header no-print">
          <div className="modal-title-wrap">
            <CheckCircle2 size={20} className="text-emerald" />
            <div>
              <strong className="modal-title">Transaksi Berhasil Disimpan!</strong>
              <span className="modal-sub">Invoice #{tx.invoiceNo}</span>
            </div>
          </div>
          <button type="button" className="btn-close-modal" onClick={onClose} aria-label="Tutup">
            <X size={18} />
          </button>
        </div>

        <div className="receipt-paper-wrapper">
          <div ref={receiptRef} className={`receipt-paper ${storeProfile.paperWidth === '80mm' ? 'width-80mm' : 'width-58mm'}`}>
            <div className="receipt-header-center">
              <strong className="receipt-store-title">{storeProfile.storeName}</strong>
              <span className="receipt-store-tagline">{storeProfile.tagline}</span>
              <span className="receipt-store-addr">{storeProfile.address}</span>
              <span className="receipt-store-phone">Telp: {storeProfile.phone}</span>
            </div>

            <div className="receipt-dashed-line" />

            <div className="receipt-meta-grid">
              <div className="meta-line">
                <span>No. Nota:</span>
                <strong>{tx.invoiceNo}</strong>
              </div>
              <div className="meta-line">
                <span>Waktu:</span>
                <span>{formatDate(tx.timestamp)}</span>
              </div>
              <div className="meta-line">
                <span>Kasir:</span>
                <span>{tx.cashierName}</span>
              </div>
              <div className="meta-line">
                <span>Pembayaran:</span>
                <strong>{tx.paymentMethod}</strong>
              </div>
            </div>

            <div className="receipt-dashed-line" />

            <div className="receipt-items-table">
              {tx.items.map((it, idx) => (
                <div key={idx} className="receipt-item-row">
                  <span className="it-name">{it.productName}</span>
                  <div className="it-calc-row">
                    <span className="it-calc">{it.qty} x {formatRupiah(it.sellPrice)}</span>
                    <strong className="it-subtotal">{formatRupiah(it.subtotal)}</strong>
                  </div>
                </div>
              ))}
            </div>

            <div className="receipt-dashed-line" />

            <div className="receipt-totals-box">
              <div className="tot-line">
                <span>Total Belanja:</span>
                <span>{formatRupiah(tx.totalAmount)}</span>
              </div>
              {tx.discountAmount > 0 && (
                <div className="tot-line discount">
                  <span>Diskon:</span>
                  <span>- {formatRupiah(tx.discountAmount)}</span>
                </div>
              )}
              <div className="tot-line grand-total">
                <span>TOTAL:</span>
                <strong>{formatRupiah(tx.finalAmount)}</strong>
              </div>
              <div className="tot-line">
                <span>Bayar ({tx.paymentMethod}):</span>
                <span>{formatRupiah(tx.paidAmount)}</span>
              </div>
              <div className="tot-line">
                <span>Kembalian:</span>
                <strong>{formatRupiah(tx.changeAmount)}</strong>
              </div>
            </div>

            <div className="receipt-dashed-line" />

            <div className="receipt-footer-center">
              <p className="receipt-footer-msg">{storeProfile.receiptFooter}</p>
              <span className="receipt-powered">Aplikasi Kasir Toko ERASTACK POS (100% Offline)</span>
            </div>
          </div>
        </div>

        <div className="receipt-modal-actions no-print">
          <button type="button" className="btn-print-action" onClick={handlePrint}>
            <Printer size={18} />
            <span>Cetak Struk Nota (Print)</span>
          </button>

          <button type="button" className="btn-new-order" onClick={onClose}>
            <RotateCcw size={16} />
            <span>Transaksi Baru (Kasir Siap)</span>
          </button>
        </div>
      </div>
    </div>
  );
};
