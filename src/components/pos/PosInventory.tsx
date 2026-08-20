'use client';

import React, { useState, useRef } from 'react';
import { 
  Package, Plus, Search, Edit2, Trash2, 
  AlertTriangle, CheckCircle2, X, Tag, ShoppingBag,
  Upload, Download, FileSpreadsheet, AlertCircle, History,
  ArrowDownRight, ArrowUpRight, SlidersHorizontal
} from 'lucide-react';
import { usePos } from '../../context/PosStoreContext';
import { PosProduct } from '../../data/posInitialData';
import './PosInventory.css';

export const PosInventory: React.FC = () => {
  const { 
    products, stockMovements, addProduct, importProducts, 
    updateProduct, adjustStock, deleteProduct, hasPermission 
  } = usePos();

  const [activeSubTab, setActiveSubTab] = useState<'catalog' | 'movements'>('catalog');
  const [searchQuery, setSearchQuery] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAdjustModalOpen, setIsAdjustModalOpen] = useState(false);
  const [selectedProdForAdjust, setSelectedProdForAdjust] = useState<PosProduct | null>(null);
  const [adjustTargetStock, setAdjustTargetStock] = useState<number>(0);
  const [adjustType, setAdjustType] = useState<'RESTOCK' | 'ADJUSTMENT'>('RESTOCK');
  const [adjustNotes, setAdjustNotes] = useState<string>('');

  const [editingProduct, setEditingProduct] = useState<PosProduct | null>(null);
  const [importNotice, setImportNotice] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

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

  const activeProducts = products.filter((p) => p.isActive !== false);

  const filteredProducts = activeProducts.filter((prod) =>
    prod.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    prod.sku.toLowerCase().includes(searchQuery.toLowerCase()) ||
    prod.barcode.includes(searchQuery)
  );

  const filteredMovements = stockMovements.filter((mov) =>
    mov.productName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (mov.referenceId && mov.referenceId.toLowerCase().includes(searchQuery.toLowerCase())) ||
    (mov.notes && mov.notes.toLowerCase().includes(searchQuery.toLowerCase()))
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

  const handleOpenAdjust = (prod: PosProduct) => {
    setSelectedProdForAdjust(prod);
    setAdjustTargetStock(prod.stock);
    setAdjustType('RESTOCK');
    setAdjustNotes('');
    setIsAdjustModalOpen(true);
  };

  const handleSaveAdjust = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedProdForAdjust) return;

    adjustStock(selectedProdForAdjust.id, adjustTargetStock, adjustType, adjustNotes);
    setIsAdjustModalOpen(false);
    setImportNotice({
      type: 'success',
      message: `Stok produk "${selectedProdForAdjust.name}" berhasil disesuaikan menjadi ${adjustTargetStock} ${selectedProdForAdjust.unit}.`,
    });
    setTimeout(() => setImportNotice(null), 4000);
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

  const formatDate = (isoString: string) => {
    const d = new Date(isoString);
    return d.toLocaleString('id-ID', {
      day: '2-digit',
      month: 'short',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  // --- CSV / EXCEL IMPORT HANDLER ---
  const handleTriggerImport = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const text = event.target?.result as string;
        if (!text) {
          setImportNotice({ type: 'error', message: 'File CSV/Excel kosong.' });
          return;
        }

        const lines = text.split(/\r\n|\n/).map((l) => l.trim()).filter((l) => l.length > 0);
        if (lines.length <= 1) {
          setImportNotice({ type: 'error', message: 'File tidak memiliki baris data produk.' });
          return;
        }

        const headerLine = lines[0];
        const delimiter = headerLine.includes(';') ? ';' : headerLine.includes('\t') ? '\t' : ',';

        const splitCsvRow = (row: string): string[] => {
          const result: string[] = [];
          let current = '';
          let inQuotes = false;
          for (let k = 0; k < row.length; k++) {
            const char = row[k];
            if (char === '"') {
              inQuotes = !inQuotes;
            } else if (char === delimiter && !inQuotes) {
              result.push(current.replace(/^["']|["']$/g, '').trim());
              current = '';
            } else {
              current += char;
            }
          }
          result.push(current.replace(/^["']|["']$/g, '').trim());
          return result;
        };

        const headers = splitCsvRow(headerLine).map((h) => h.toLowerCase());
        const parsedProducts: Omit<PosProduct, 'id'>[] = [];

        for (let i = 1; i < lines.length; i++) {
          const rawRow = lines[i];
          const cols = splitCsvRow(rawRow);

          if (cols.length < 3) continue;

          const getVal = (keywords: string[]): string => {
            const idx = headers.findIndex((h) => keywords.some((k) => h.includes(k)));
            return idx >= 0 && cols[idx] !== undefined ? cols[idx] : '';
          };

          const name = getVal(['nama', 'name', 'produk', 'item']) || cols[2] || cols[0];
          if (!name) continue;

          const sku = getVal(['sku', 'kode']) || `SKU-${Date.now().toString().slice(-4)}${i}`;
          const barcode = getVal(['barcode', 'ean', 'upc']) || `899${Math.floor(1000000000 + Math.random() * 9000000000)}`;
          const rawCat = getVal(['kategori', 'category']) || 'Sembako';
          
          let category: PosProduct['category'] = 'Sembako';
          if (/minum/i.test(rawCat)) category = 'Minuman';
          else if (/makan|snack/i.test(rawCat)) category = 'Makanan & Snack';
          else if (/rumah|kebutuhan/i.test(rawCat)) category = 'Kebutuhan Rumah';
          else if (/bumbu|dapur/i.test(rawCat)) category = 'Bumbu & Dapur';

          const buyPrice = Math.max(0, Number(getVal(['beli', 'modal', 'hpp', 'buy']).replace(/[^0-9]/g, '')) || 0);
          const sellPrice = Math.max(buyPrice, Number(getVal(['jual', 'sell', 'harga', 'price']).replace(/[^0-9]/g, '')) || buyPrice || 1000);
          const stock = Math.max(0, Number(getVal(['stok', 'stock', 'qty', 'jumlah']).replace(/[^0-9]/g, '')) || 10);
          const minStock = Math.max(1, Number(getVal(['min', 'minimum']).replace(/[^0-9]/g, '')) || 5);
          const unit = getVal(['satuan', 'unit']) || 'pcs';

          parsedProducts.push({
            sku,
            barcode,
            name,
            category,
            buyPrice,
            sellPrice,
            stock,
            minStock,
            unit,
            isActive: true,
          });
        }

        if (parsedProducts.length === 0) {
          setImportNotice({ type: 'error', message: 'Gagal memproses file. Pastikan format kolom sesuai template.' });
          return;
        }

        const count = importProducts(parsedProducts);
        setImportNotice({
          type: 'success',
          message: `Berhasil mengimpor & memperbarui ${count} produk ke database SQLite lokal toko!`,
        });

        setTimeout(() => setImportNotice(null), 5000);
      } catch (err) {
        setImportNotice({ type: 'error', message: 'Terjadi kesalahan saat membaca file CSV/Excel.' });
      } finally {
        if (fileInputRef.current) fileInputRef.current.value = '';
      }
    };
    reader.readAsText(file);
  };

  // --- DOWNLOAD TEMPLATE CSV ---
  const handleDownloadTemplate = () => {
    const headers = ['Kode SKU', 'Barcode', 'Nama Produk', 'Kategori', 'Harga Modal (HPP)', 'Harga Jual', 'Sisa Stok', 'Stok Minimum', 'Satuan'];
    const sampleRows = [
      ['SBK-101', '8992753109911', 'Beras Ramos Super 5kg', 'Sembako', '62000', '70000', '30', '5', 'karung'],
      ['MNM-102', '8998866209922', 'Kopi Good Day Cappuccino 1 Renteng', 'Minuman', '18000', '22000', '25', '5', 'renteng'],
      ['MKN-103', '8998866109933', 'Biskuit Roma Kelapa 300g', 'Makanan & Snack', '9500', '12000', '40', '10', 'bungkus'],
      ['KBR-104', '8999999052999', 'Sabun Mandi Lifebuoy 450ml', 'Kebutuhan Rumah', '18000', '22500', '20', '4', 'pouch'],
      ['BMB-105', '8992745300999', 'Garam Dapur Beryodium 250g', 'Bumbu & Dapur', '2500', '3500', '50', '10', 'bungkus'],
    ];

    const csvLines = [
      headers.join(';'),
      ...sampleRows.map((r) => r.map(c => `"${c.replace(/"/g, '""')}"`).join(';')),
    ].join('\r\n');

    const blob = new Blob(['\uFEFF' + csvLines], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'Template_Import_Barang_EraStack.csv';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  // --- EXPORT CATALOG CSV ---
  const handleExportCatalog = () => {
    if (activeProducts.length === 0) {
      alert('Katalog produk masih kosong.');
      return;
    }

    const headers = ['Kode SKU', 'Barcode', 'Nama Produk', 'Kategori', 'Harga Modal (HPP)', 'Harga Jual', 'Sisa Stok', 'Stok Minimum', 'Satuan'];
    const rows = activeProducts.map((p) => [
      p.sku,
      p.barcode,
      p.name,
      p.category,
      p.buyPrice,
      p.sellPrice,
      p.stock,
      p.minStock,
      p.unit,
    ]);

    const csvLines = [
      headers.join(';'),
      ...rows.map((r) => r.map(c => `"${String(c).replace(/"/g, '""')}"`).join(';')),
    ].join('\r\n');

    const blob = new Blob(['\uFEFF' + csvLines], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `Katalog_Produk_EraStack_${Date.now()}.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="pos-inv-root">
      {/* Hidden File Input for CSV Import */}
      <input
        ref={fileInputRef}
        type="file"
        accept=".csv, .txt"
        style={{ display: 'none' }}
        onChange={handleFileChange}
      />

      {/* Top Header */}
      <div className="inv-top-bar">
        <div className="inv-title-group">
          <div className="inv-icon-pill">
            <Package size={22} className="text-brand" />
          </div>
          <div>
            <h1 className="inv-main-title">Katalog & Stok Barang</h1>
            <span className="inv-sub-title">
              {activeSubTab === 'catalog' 
                ? `Total ${activeProducts.length} SKU aktif di database SQLite lokal` 
                : `Total ${stockMovements.length} riwayat mutasi stok tercatat`}
            </span>
          </div>
        </div>

        <div className="inv-actions-toolbar">
          {/* Sub-tab Switcher */}
          <div className="inv-subtab-pill-group">
            <button
              type="button"
              className={`inv-subtab-pill ${activeSubTab === 'catalog' ? 'is-active' : ''}`}
              onClick={() => setActiveSubTab('catalog')}
            >
              <Package size={14} />
              <span>Daftar Barang</span>
            </button>
            <button
              type="button"
              className={`inv-subtab-pill ${activeSubTab === 'movements' ? 'is-active' : ''}`}
              onClick={() => setActiveSubTab('movements')}
            >
              <History size={14} />
              <span>Riwayat Mutasi ({stockMovements.length})</span>
            </button>
          </div>

          {activeSubTab === 'catalog' && (
            <>
              <button 
                type="button" 
                className="btn-toolbar-sec" 
                onClick={handleDownloadTemplate}
                title="Unduh format template file Excel/CSV contoh"
              >
                <FileSpreadsheet size={15} />
                <span>Template CSV</span>
              </button>

              <button 
                type="button" 
                className="btn-toolbar-sec" 
                onClick={handleTriggerImport}
                title="Upload dan import data produk dari file Excel/CSV"
              >
                <Upload size={15} />
                <span>Import CSV</span>
              </button>

              <button 
                type="button" 
                className="btn-toolbar-sec" 
                onClick={handleExportCatalog}
                title="Export seluruh katalog barang ke file CSV"
              >
                <Download size={15} />
                <span>Export CSV</span>
              </button>

              {hasPermission('canManageInventory') && (
                <button 
                  type="button" 
                  className="btn-add-product" 
                  onClick={handleOpenAdd} 
                  aria-label="Tambah Produk Baru"
                >
                  <Plus size={16} />
                  <span>Tambah Barang</span>
                </button>
              )}
            </>
          )}
        </div>
      </div>

      {/* Import / Action Notification Banner */}
      {importNotice && (
        <div className={`inv-notice-banner ${importNotice.type}`}>
          {importNotice.type === 'success' ? (
            <CheckCircle2 size={18} />
          ) : (
            <AlertCircle size={18} />
          )}
          <span>{importNotice.message}</span>
          <button 
            type="button" 
            className="btn-close-notice" 
            onClick={() => setImportNotice(null)}
          >
            <X size={14} />
          </button>
        </div>
      )}

      {/* Search & Filter Strip */}
      <div className="inv-search-strip">
        <div className="inv-search-box">
          <Search size={16} className="text-muted" />
          <input
            type="text"
            className="inv-search-input"
            placeholder={activeSubTab === 'catalog' 
              ? "Cari berdasarkan nama barang, SKU, atau barcode..." 
              : "Cari riwayat mutasi berdasarkan nama barang, no invoice, atau alasan..."}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            aria-label="Cari barang atau mutasi"
          />
          {searchQuery && (
            <button type="button" className="clear-search-btn" onClick={() => setSearchQuery('')}>
              <X size={14} />
            </button>
          )}
        </div>
      </div>

      {/* VIEW 1: CATALOG TABLE */}
      {activeSubTab === 'catalog' && (
        <>
          {/* DESKTOP & TABLET: Full Table View */}
          <div className="inv-table-wrapper">
            {filteredProducts.length === 0 ? (
              <div className="inv-empty-state">
                <ShoppingBag size={40} className="text-muted" />
                <p>Tidak ada produk yang cocok dengan pencarian.</p>
              </div>
            ) : (
              <table className="inv-table">
                <thead>
                  <tr>
                    <th>Kode / SKU</th>
                    <th>Nama Produk</th>
                    <th>Kategori</th>
                    <th>Harga Modal (HPP)</th>
                    <th>Harga Jual</th>
                    <th>Estimasi Margin</th>
                    <th>Sisa Stok</th>
                    <th>Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredProducts.map((prod) => {
                    const isLowStock = prod.stock > 0 && prod.stock <= prod.minStock;
                    const isOutOfStock = prod.stock <= 0;
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
                          <strong className="prod-name-table">{prod.name}</strong>
                        </td>
                        <td>
                          <span className="cat-badge-table">{prod.category}</span>
                        </td>
                        <td className="tabular-nums">{formatRupiah(prod.buyPrice)}</td>
                        <td className="tabular-nums">
                          <strong>{formatRupiah(prod.sellPrice)}</strong>
                        </td>
                        <td className="tabular-nums">
                          <span className="margin-tag">+{formatRupiah(margin)} ({marginPct}%)</span>
                        </td>
                        <td>
                          {isOutOfStock ? (
                            <span className="inv-stock-pill danger">Habis (0)</span>
                          ) : isLowStock ? (
                            <span className="inv-stock-pill warning">Sisa {prod.stock} {prod.unit}</span>
                          ) : (
                            <span className="inv-stock-pill normal">{prod.stock} {prod.unit}</span>
                          )}
                        </td>
                        <td>
                          <div className="table-actions-cell">
                            {hasPermission('canAdjustStock') && (
                              <button
                                type="button"
                                className="btn-action-icon adjust"
                                onClick={() => handleOpenAdjust(prod)}
                                title="Sesuaikan Stok / Restock"
                                aria-label={`Sesuaikan stok ${prod.name}`}
                              >
                                <SlidersHorizontal size={14} />
                              </button>
                            )}
                            {hasPermission('canManageInventory') && (
                              <button
                                type="button"
                                className="btn-action-icon edit"
                                onClick={() => handleOpenEdit(prod)}
                                title="Edit Produk"
                                aria-label={`Edit ${prod.name}`}
                              >
                                <Edit2 size={14} />
                              </button>
                            )}
                            {hasPermission('canDeleteProducts') && (
                              <button
                                type="button"
                                className="btn-action-icon delete"
                                onClick={() => {
                                  if (confirm(`Hapus barang "${prod.name}" dari katalog aktif? Data riwayat transaksi lama akan tetap aman.`)) {
                                    deleteProduct(prod.id);
                                  }
                                }}
                                title="Hapus Produk (Soft Delete)"
                                aria-label={`Hapus ${prod.name}`}
                              >
                                <Trash2 size={14} />
                              </button>
                            )}
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            )}
          </div>

          {/* MOBILE: Product Cards List */}
          <div className="inv-mobile-card-list">
            {filteredProducts.length === 0 ? (
              <div className="inv-empty-state">
                <ShoppingBag size={40} className="text-muted" />
                <p>Tidak ada produk yang ditemukan.</p>
              </div>
            ) : (
              filteredProducts.map((prod) => {
                const isLowStock = prod.stock > 0 && prod.stock <= prod.minStock;
                const isOutOfStock = prod.stock <= 0;
                const margin = prod.sellPrice - prod.buyPrice;

                return (
                  <div key={prod.id} className="inv-mobile-card">
                    <div className="inv-mcard-head">
                      <div className="inv-mcard-meta">
                        <span className="cat-badge-table">{prod.category}</span>
                        <strong className="inv-mcard-title">{prod.name}</strong>
                        <span className="barcode-small">{prod.sku} • {prod.barcode}</span>
                      </div>

                      {isOutOfStock ? (
                        <span className="inv-stock-pill danger">Habis</span>
                      ) : isLowStock ? (
                        <span className="inv-stock-pill warning">Sisa {prod.stock}</span>
                      ) : (
                        <span className="inv-stock-pill normal">{prod.stock} {prod.unit}</span>
                      )}
                    </div>

                    <div className="inv-mcard-body">
                      <div className="mcard-price-col">
                        <span className="mcard-lbl">Harga Jual:</span>
                        <strong className="mcard-sell-price tabular-nums">{formatRupiah(prod.sellPrice)}</strong>
                      </div>
                      <div className="mcard-price-col">
                        <span className="mcard-lbl">Harga Beli:</span>
                        <span className="mcard-buy-price tabular-nums">{formatRupiah(prod.buyPrice)}</span>
                      </div>
                    </div>

                    <div className="inv-mcard-footer">
                      <span className="margin-tag">Margin: +{formatRupiah(margin)}</span>
                      <div className="table-actions-cell">
                        {hasPermission('canAdjustStock') && (
                          <button
                            type="button"
                            className="btn-action-icon adjust"
                            onClick={() => handleOpenAdjust(prod)}
                            aria-label={`Sesuaikan stok ${prod.name}`}
                          >
                            <SlidersHorizontal size={14} />
                            <span>Stok</span>
                          </button>
                        )}
                        {hasPermission('canManageInventory') && (
                          <button
                            type="button"
                            className="btn-action-icon edit"
                            onClick={() => handleOpenEdit(prod)}
                            aria-label={`Edit ${prod.name}`}
                          >
                            <Edit2 size={14} />
                            <span>Edit</span>
                          </button>
                        )}
                        {hasPermission('canDeleteProducts') && (
                          <button
                            type="button"
                            className="btn-action-icon delete"
                            onClick={() => {
                              if (confirm(`Hapus barang "${prod.name}"?`)) {
                                deleteProduct(prod.id);
                              }
                            }}
                            aria-label={`Hapus ${prod.name}`}
                          >
                            <Trash2 size={14} />
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </>
      )}

      {/* VIEW 2: STOCK MOVEMENTS AUDIT TRAIL TABLE */}
      {activeSubTab === 'movements' && (
        <div className="inv-table-wrapper">
          {filteredMovements.length === 0 ? (
            <div className="inv-empty-state">
              <History size={40} className="text-muted" />
              <p>Belum ada riwayat mutasi stok yang tercatat.</p>
            </div>
          ) : (
            <table className="inv-table">
              <thead>
                <tr>
                  <th>Waktu</th>
                  <th>Produk</th>
                  <th>Tipe Mutasi</th>
                  <th>Perubahan Qty</th>
                  <th>Stok (Awal &rarr; Akhir)</th>
                  <th>Petugas</th>
                  <th>Keterangan / Referensi</th>
                </tr>
              </thead>
              <tbody>
                {filteredMovements.map((mov) => {
                  const isSale = mov.type === 'SALE';
                  const isRestock = mov.type === 'RESTOCK';

                  return (
                    <tr key={mov.id}>
                      <td className="tabular-nums" style={{ whiteSpace: 'nowrap' }}>
                        {formatDate(mov.timestamp)}
                      </td>
                      <td>
                        <strong className="prod-name-table">{mov.productName}</strong>
                      </td>
                      <td>
                        <span className={`mov-badge ${isSale ? 'mov-sale' : isRestock ? 'mov-restock' : 'mov-adjust'}`}>
                          {isSale ? 'Penjualan' : isRestock ? 'Restock / Masuk' : 'Penyesuaian Opname'}
                        </span>
                      </td>
                      <td>
                        <strong className={`tabular-nums ${mov.qtyChange < 0 ? 'text-danger' : 'text-emerald'}`}>
                          {mov.qtyChange > 0 ? `+${mov.qtyChange}` : mov.qtyChange}
                        </strong>
                      </td>
                      <td className="tabular-nums">
                        {mov.stockBefore} &rarr; <strong>{mov.stockAfter}</strong>
                      </td>
                      <td>
                        <span className="text-muted">{mov.user || 'Sistem'}</span>
                      </td>
                      <td>
                        <span className="mov-notes-text">{mov.notes || mov.referenceId || '-'}</span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
      )}

      {/* Add / Edit Product Modal */}
      {isModalOpen && (
        <div className="pos-modal-overlay">
          <div className="inv-form-modal">
            <div className="modal-header">
              <strong className="modal-title">
                {editingProduct ? 'Edit Informasi Produk' : 'Tambah Produk Baru'}
              </strong>
              <button
                type="button"
                className="btn-close-modal"
                onClick={() => setIsModalOpen(false)}
                aria-label="Tutup popup"
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="inv-form">
              <div className="form-grid">
                <div className="form-group">
                  <label htmlFor="prod-name-input">Nama Produk / Barang *</label>
                  <input
                    id="prod-name-input"
                    type="text"
                    required
                    className="form-input"
                    placeholder="Contoh: Kopi Susu Gula Aren 250ml"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="prod-cat-select">Kategori Produk</label>
                  <select
                    id="prod-cat-select"
                    className="form-input"
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value as any })}
                  >
                    <option value="Sembako">Sembako</option>
                    <option value="Minuman">Minuman</option>
                    <option value="Makanan & Snack">Makanan & Snack</option>
                    <option value="Kebutuhan Rumah">Kebutuhan Rumah</option>
                    <option value="Bumbu & Dapur">Bumbu & Dapur</option>
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="prod-sku-input">Kode SKU</label>
                  <input
                    id="prod-sku-input"
                    type="text"
                    className="form-input"
                    value={formData.sku}
                    onChange={(e) => setFormData({ ...formData, sku: e.target.value })}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="prod-barcode-input">Kode Barcode (EAN-13)</label>
                  <input
                    id="prod-barcode-input"
                    type="text"
                    className="form-input"
                    value={formData.barcode}
                    onChange={(e) => setFormData({ ...formData, barcode: e.target.value })}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="prod-buy-price">Harga Modal / Beli (HPP) (Rp)</label>
                  <input
                    id="prod-buy-price"
                    type="number"
                    min={0}
                    className="form-input"
                    value={formData.buyPrice}
                    onChange={(e) => setFormData({ ...formData, buyPrice: Number(e.target.value) || 0 })}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="prod-sell-price">Harga Jual Kasir (Rp) *</label>
                  <input
                    id="prod-sell-price"
                    type="number"
                    min={0}
                    required
                    className="form-input"
                    value={formData.sellPrice}
                    onChange={(e) => setFormData({ ...formData, sellPrice: Number(e.target.value) || 0 })}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="prod-stock-input">Jumlah Stok Awal</label>
                  <input
                    id="prod-stock-input"
                    type="number"
                    min={0}
                    className="form-input"
                    value={formData.stock}
                    onChange={(e) => setFormData({ ...formData, stock: Number(e.target.value) || 0 })}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="prod-minstock-input">Batas Stok Minimum</label>
                  <input
                    id="prod-minstock-input"
                    type="number"
                    min={1}
                    className="form-input"
                    value={formData.minStock}
                    onChange={(e) => setFormData({ ...formData, minStock: Number(e.target.value) || 0 })}
                  />
                </div>
              </div>

              <div className="form-actions">
                <button
                  type="button"
                  className="btn-cancel"
                  onClick={() => setIsModalOpen(false)}
                >
                  Batal
                </button>
                <button type="submit" className="btn-submit">
                  {editingProduct ? 'Simpan Perubahan' : 'Tambah Produk'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Stock Adjustment / Restock Modal */}
      {isAdjustModalOpen && selectedProdForAdjust && (
        <div className="pos-modal-overlay">
          <div className="inv-form-modal">
            <div className="modal-header">
              <strong className="modal-title">Penyesuaian Stok Barang</strong>
              <button
                type="button"
                className="btn-close-modal"
                onClick={() => setIsAdjustModalOpen(false)}
                aria-label="Tutup"
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleSaveAdjust} className="inv-form">
              <div className="adjust-product-banner">
                <strong>{selectedProdForAdjust.name}</strong>
                <span className="text-muted">SKU: {selectedProdForAdjust.sku} • Stok Saat Ini: {selectedProdForAdjust.stock} {selectedProdForAdjust.unit}</span>
              </div>

              <div className="form-grid">
                <div className="form-group">
                  <label htmlFor="adjust-type-select">Tipe Operasi Mutasi</label>
                  <select
                    id="adjust-type-select"
                    className="form-input"
                    value={adjustType}
                    onChange={(e) => setAdjustType(e.target.value as any)}
                  >
                    <option value="RESTOCK">Restock / Penambahan Barang Masuk</option>
                    <option value="ADJUSTMENT">Penyesuaian Stok Opname / Koreksi Fisik</option>
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="adjust-qty-input">Total Stok Baru (Setelah Mutasi) *</label>
                  <input
                    id="adjust-qty-input"
                    type="number"
                    min={0}
                    required
                    className="form-input"
                    value={adjustTargetStock}
                    onChange={(e) => setAdjustTargetStock(Math.max(0, Number(e.target.value) || 0))}
                  />
                </div>

                <div className="form-group" style={{ gridColumn: '1 / -1' }}>
                  <label htmlFor="adjust-notes-input">Alasan / Catatan Penyesuaian</label>
                  <input
                    id="adjust-notes-input"
                    type="text"
                    className="form-input"
                    placeholder="Contoh: Kulakan dari Agen Grosir / Barang pecah / Selisih fisik"
                    value={adjustNotes}
                    onChange={(e) => setAdjustNotes(e.target.value)}
                  />
                </div>
              </div>

              <div className="form-actions">
                <button
                  type="button"
                  className="btn-cancel"
                  onClick={() => setIsAdjustModalOpen(false)}
                >
                  Batal
                </button>
                <button type="submit" className="btn-submit">
                  Simpan & Catat Mutasi
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
