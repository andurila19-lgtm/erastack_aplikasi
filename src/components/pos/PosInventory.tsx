'use client';

import React, { useState } from 'react';
import { 
  Package, Plus, Search, Edit2, Trash2, 
  AlertTriangle, CheckCircle2, X, Tag
} from 'lucide-react';
import { usePos } from '../../context/PosStoreContext';
import { PosProduct } from '../../data/posInitialData';
import './PosInventory.css';

export const PosInventory: React.FC = () => {
  const { products, addProduct, updateProduct, deleteProduct } = usePos();
  const [searchQuery, setSearchQuery] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<PosProduct | null>(null);

  const [formData, setFormData] = useState({
    sku: '',
    barcode: '',
    name: '',
    category: 'Sembako' as PosProduct['category'],
    buyPrice: 0,
    sellPrice: 0,
    stock: 10,
    minStock: 5,
    unit: 'pcs',
  });

  const filteredProducts = products.filter((prod) =>
    prod.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    prod.sku.toLowerCase().includes(searchQuery.toLowerCase()) ||
    prod.barcode.includes(searchQuery)
  );

  const handleOpenAdd = () => {
    setEditingProduct(null);
    setFormData({
      sku: `PRD-${String(Date.now()).slice(-4)}`,
      barcode: `899${Math.floor(1000000000 + Math.random() * 9000000000)}`,
      name: '',
      category: 'Sembako',
      buyPrice: 0,
      sellPrice: 0,
      stock: 10,
      minStock: 5,
      unit: 'pcs',
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (prod: PosProduct) => {
    setEditingProduct(prod);
    setFormData({
      sku: prod.sku,
      barcode: prod.barcode,
      name: prod.name,
      category: prod.category,
      buyPrice: prod.buyPrice,
      sellPrice: prod.sellPrice,
      stock: prod.stock,
      minStock: prod.minStock,
      unit: prod.unit,
    });
    setIsModalOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name) return;

    if (editingProduct) {
      updateProduct(editingProduct.id, formData);
    } else {
      addProduct(formData);
    }
    setIsModalOpen(false);
  };

  const formatRupiah = (val: number) => {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(val);
  };

  return (
    <div className="pos-inv-root">
      <div className="inv-top-bar">
        <div className="inv-title-group">
          <Package size={22} className="text-brand" />
          <div>
            <h2 className="inv-main-title">Kelola Stok & Inventaris Toko</h2>
            <span className="inv-sub-title">Total {products.length} Jenis Produk Terdaftar</span>
          </div>
        </div>

        <button type="button" className="btn-add-product" onClick={handleOpenAdd}>
          <Plus size={16} />
          <span>Tambah Barang Baru</span>
        </button>
      </div>

      <div className="inv-search-strip">
        <div className="inv-search-box">
          <Search size={16} className="text-muted" />
          <input
            type="text"
            className="inv-search-input"
            placeholder="Cari berdasarkan nama produk, SKU, atau barcode..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <div className="inv-table-wrapper">
        <table className="inv-table">
          <thead>
            <tr>
              <th>Kode / Barcode</th>
              <th>Nama Produk</th>
              <th>Kategori</th>
              <th>Harga Beli</th>
              <th>Harga Jual</th>
              <th>Estimasi Margin</th>
              <th>Sisa Stok</th>
              <th>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {filteredProducts.map((prod) => {
              const isLowStock = prod.stock <= prod.minStock;
              const margin = prod.sellPrice - prod.buyPrice;
              const marginPct = prod.buyPrice > 0 ? Math.round((margin / prod.buyPrice) * 100) : 0;

              return (
                <tr key={prod.id}>
                  <td>
                    <div className="sku-cell">
                      <strong>{prod.sku}</strong>
                      <span className="barcode-small">{prod.barcode}</span>
                    </div>
                  </td>
                  <td>
                    <strong className="prod-name-text">{prod.name}</strong>
                  </td>
                  <td>
                    <span className="cat-pill">{prod.category}</span>
                  </td>
                  <td>{formatRupiah(prod.buyPrice)}</td>
                  <td>
                    <strong className="text-brand">{formatRupiah(prod.sellPrice)}</strong>
                  </td>
                  <td>
                    <span className="margin-text">
                      +{formatRupiah(margin)} ({marginPct}%)
                    </span>
                  </td>
                  <td>
                    <span className={`stock-cell-pill ${isLowStock ? 'low' : 'safe'}`}>
                      {prod.stock} {prod.unit}
                      {isLowStock && <AlertTriangle size={12} className="ml-1" />}
                    </span>
                  </td>
                  <td>
                    <div className="action-btns-row">
                      <button
                        type="button"
                        className="btn-tbl-edit"
                        onClick={() => handleOpenEdit(prod)}
                        title="Edit Produk"
                      >
                        <Edit2 size={14} />
                      </button>
                      <button
                        type="button"
                        className="btn-tbl-del"
                        onClick={() => {
                          if (confirm(`Yakin ingin menghapus ${prod.name}?`)) {
                            deleteProduct(prod.id);
                          }
                        }}
                        title="Hapus Produk"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {isModalOpen && (
        <div className="pos-modal-overlay">
          <div className="inv-edit-modal">
            <div className="edit-modal-head">
              <strong>{editingProduct ? 'Edit Data Barang' : 'Tambah Barang Baru'}</strong>
              <button type="button" className="btn-close-modal" onClick={() => setIsModalOpen(false)}>
                <X size={16} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="edit-modal-form">
              <div className="form-grid-2">
                <div className="form-group">
                  <label className="form-label">Kode SKU:</label>
                  <input
                    type="text"
                    required
                    className="form-input"
                    value={formData.sku}
                    onChange={(e) => setFormData({ ...formData, sku: e.target.value })}
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Barcode Barang:</label>
                  <input
                    type="text"
                    required
                    className="form-input"
                    value={formData.barcode}
                    onChange={(e) => setFormData({ ...formData, barcode: e.target.value })}
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Nama Produk:</label>
                <input
                  type="text"
                  required
                  placeholder="Contoh: Beras Rojolele 5kg"
                  className="form-input"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </div>

              <div className="form-grid-2">
                <div className="form-group">
                  <label className="form-label">Kategori:</label>
                  <select
                    className="form-select"
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value as PosProduct['category'] })}
                  >
                    <option value="Sembako">Sembako</option>
                    <option value="Minuman">Minuman</option>
                    <option value="Makanan & Snack">Makanan & Snack</option>
                    <option value="Kebutuhan Rumah">Kebutuhan Rumah</option>
                    <option value="Bumbu & Dapur">Bumbu & Dapur</option>
                  </select>
                </div>
                <div className="form-group">
                  <label className="form-label">Satuan (Unit):</label>
                  <input
                    type="text"
                    required
                    placeholder="pcs / kg / botol / bungkus"
                    className="form-input"
                    value={formData.unit}
                    onChange={(e) => setFormData({ ...formData, unit: e.target.value })}
                  />
                </div>
              </div>

              <div className="form-grid-2">
                <div className="form-group">
                  <label className="form-label">Harga Modal / Beli (Rp):</label>
                  <input
                    type="number"
                    min="0"
                    className="form-input"
                    value={formData.buyPrice}
                    onChange={(e) => setFormData({ ...formData, buyPrice: Number(e.target.value) || 0 })}
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Harga Jual Kasir (Rp):</label>
                  <input
                    type="number"
                    min="0"
                    required
                    className="form-input text-brand"
                    value={formData.sellPrice}
                    onChange={(e) => setFormData({ ...formData, sellPrice: Number(e.target.value) || 0 })}
                  />
                </div>
              </div>

              <div className="form-grid-2">
                <div className="form-group">
                  <label className="form-label">Jumlah Stok Saat Ini:</label>
                  <input
                    type="number"
                    min="0"
                    className="form-input"
                    value={formData.stock}
                    onChange={(e) => setFormData({ ...formData, stock: Number(e.target.value) || 0 })}
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Peringatan Stok Minimum:</label>
                  <input
                    type="number"
                    min="1"
                    className="form-input"
                    value={formData.minStock}
                    onChange={(e) => setFormData({ ...formData, minStock: Number(e.target.value) || 0 })}
                  />
                </div>
              </div>

              <div className="edit-modal-actions">
                <button type="button" className="btn-cancel" onClick={() => setIsModalOpen(false)}>
                  Batal
                </button>
                <button type="submit" className="btn-save">
                  Simpan Data Barang
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
