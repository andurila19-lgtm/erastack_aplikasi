'use client';

import React, { useState } from 'react';
import { 
  Settings, Store, Printer, User, ShieldCheck, 
  RotateCcw, Save, CheckCircle2 
} from 'lucide-react';
import { usePos } from '../../context/PosStoreContext';
import './PosSettings.css';

export const PosSettings: React.FC = () => {
  const { 
    storeProfile, updateStoreProfile, activeCashier, 
    setActiveCashier, resetToDefaultData 
  } = usePos();

  const [storeName, setStoreName] = useState(storeProfile.storeName);
  const [tagline, setTagline] = useState(storeProfile.tagline);
  const [address, setAddress] = useState(storeProfile.address);
  const [phone, setPhone] = useState(storeProfile.phone);
  const [receiptFooter, setReceiptFooter] = useState(storeProfile.receiptFooter);
  const [paperWidth, setPaperWidth] = useState(storeProfile.paperWidth);
  const [cashierNameInput, setCashierNameInput] = useState(activeCashier);
  const [isSaved, setIsSaved] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateStoreProfile({
      storeName,
      tagline,
      address,
      phone,
      receiptFooter,
      paperWidth,
    });
    setActiveCashier(cashierNameInput);
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
  };

  const handleReset = () => {
    if (confirm('Apakah Anda yakin ingin me-reset seluruh data kembali ke data contoh toko? Transaksi saat ini akan dihapus.')) {
      resetToDefaultData();
      alert('Data kasir berhasil direset ke pengaturan awal.');
    }
  };

  return (
    <div className="pos-set-root">
      <div className="set-top-bar">
        <div className="set-title-group">
          <Settings size={22} className="text-brand" />
          <div>
            <h2 className="set-main-title">Pengaturan Profil Toko & Kasir</h2>
            <span className="set-sub-title">Sesuaikan Identitas Toko untuk Header Struk Nota</span>
          </div>
        </div>
      </div>

      {isSaved && (
        <div className="save-alert-banner">
          <CheckCircle2 size={18} />
          <span>Pengaturan profil toko & kasir berhasil disimpan secara lokal!</span>
        </div>
      )}

      <form onSubmit={handleSave} className="settings-cards-grid">
        <div className="settings-card">
          <div className="card-head">
            <Store size={18} className="text-brand" />
            <strong>Identitas Toko & Usaha</strong>
          </div>
          <div className="card-body">
            <div className="form-group">
              <label className="form-label">Nama Toko:</label>
              <input
                type="text"
                required
                className="form-input"
                value={storeName}
                onChange={(e) => setStoreName(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label className="form-label">Slogan / Tagline Toko:</label>
              <input
                type="text"
                className="form-input"
                value={tagline}
                onChange={(e) => setTagline(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label className="form-label">Alamat Lengkap Toko:</label>
              <textarea
                className="form-textarea"
                rows={2}
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label className="form-label">Nomor Telepon / WhatsApp:</label>
              <input
                type="text"
                className="form-input"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>
          </div>
        </div>

        <div className="settings-card">
          <div className="card-head">
            <Printer size={18} className="text-brand" />
            <strong>Format Cetak Struk Nota</strong>
          </div>
          <div className="card-body">
            <div className="form-group">
              <label className="form-label">Ukuran Kertas Thermal Struk:</label>
              <div className="paper-radio-group">
                <label className={`radio-pill ${paperWidth === '58mm' ? 'selected' : ''}`}>
                  <input
                    type="radio"
                    name="paperWidth"
                    value="58mm"
                    checked={paperWidth === '58mm'}
                    onChange={() => setPaperWidth('58mm')}
                  />
                  <span>58 mm (Printer Mini / Bluetooth Portable)</span>
                </label>
                <label className={`radio-pill ${paperWidth === '80mm' ? 'selected' : ''}`}>
                  <input
                    type="radio"
                    name="paperWidth"
                    value="80mm"
                    checked={paperWidth === '80mm'}
                    onChange={() => setPaperWidth('80mm')}
                  />
                  <span>80 mm (Printer Meja Kasir Standard USB/LAN)</span>
                </label>
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Pesan Penutup Struk (Footer):</label>
              <textarea
                className="form-textarea"
                rows={3}
                value={receiptFooter}
                onChange={(e) => setReceiptFooter(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label className="form-label">Nama Kasir yang Sedang Bertugas:</label>
              <input
                type="text"
                required
                className="form-input"
                value={cashierNameInput}
                onChange={(e) => setCashierNameInput(e.target.value)}
              />
            </div>
          </div>
        </div>

        <div className="settings-card full-width">
          <div className="settings-action-bar">
            <button
              type="button"
              className="btn-reset-data"
              onClick={handleReset}
            >
              <RotateCcw size={16} />
              <span>Reset ke Contoh Data Awal</span>
            </button>

            <button
              type="submit"
              className="btn-save-settings"
            >
              <Save size={16} />
              <span>Simpan Perubahan Pengaturan</span>
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};
