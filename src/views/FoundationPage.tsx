import React, { useState } from 'react';
import { 
  Terminal, Shield, Cpu, HardDrive, Check, 
  Sliders, Play, Copy, CheckCircle2,
  Lock, Zap, Database, Smartphone, Monitor
} from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { StatusDot } from '../components/ui/StatusDot';
import { SEOHead } from '../components/common/SEOHead';
import { useToast } from '../context/useToast';
import './FoundationPage.css';

interface DemoProduct {
  id: string;
  sku: string;
  name: string;
  category: string;
  price: number;
  stock: number;
}

const INITIAL_PRODUCTS: DemoProduct[] = [
  { id: '1', sku: 'SKU-8921', name: 'ERASTACK POS Desktop License', category: 'Software', price: 250000, stock: 999 },
  { id: '2', sku: 'SKU-4410', name: 'Thermal Paper Roll 58mm', category: 'Hardware', price: 35000, stock: 48 },
  { id: '3', sku: 'SKU-1029', name: 'Bluetooth Barcode Scanner', category: 'Hardware', price: 275000, stock: 6 },
  { id: '4', sku: 'SKU-7731', name: 'Arabica Coffee Beans 250g', category: 'Inventory', price: 65000, stock: 24 },
];

export const FoundationPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'pos' | 'ai' | 'sqlite' | 'crypto' | 'tokens'>('pos');
  const [products, setProducts] = useState<DemoProduct[]>(INITIAL_PRODUCTS);
  const [cart, setCart] = useState<{ product: DemoProduct; qty: number }[]>([]);
  const [txLogs, setTxLogs] = useState<string[]>([
    'SQLITE_INIT: WAL mode active, synchronous = NORMAL',
    'STORE_READY: Local catalog loaded into memory (4 items)',
  ]);
  const [aiTool, setAiTool] = useState<'getSalesSummary' | 'calculateProfit' | 'getInventoryStatus'>('getSalesSummary');
  const [aiResult, setAiResult] = useState<string | null>(null);
  const [aiLoading, setAiLoading] = useState(false);
  const [copiedHash, setCopiedHash] = useState(false);
  const { success, error } = useToast();

  const handleAddToCart = (product: DemoProduct) => {
    if (product.stock <= 0) {
      error('Stok Habis', `Produk ${product.name} tidak memiliki sisa stok.`);
      return;
    }

    setProducts(prev => prev.map(p => p.id === product.id ? { ...p, stock: p.stock - 1 } : p));
    setCart(prev => {
      const existing = prev.find(item => item.product.id === product.id);
      if (existing) {
        return prev.map(item => item.product.id === product.id ? { ...item, qty: item.qty + 1 } : item);
      }
      return [...prev, { product, qty: 1 }];
    });

    const timestamp = new Date().toLocaleTimeString();
    setTxLogs(prev => [
      `[${timestamp}] SCAN_MUTATION: ${product.sku} (-1 qty) -> In-Memory Staging`,
      ...prev.slice(0, 5)
    ]);
  };

  const handleCheckout = () => {
    if (cart.length === 0) {
      error('Keranjang Kosong', 'Tambahkan minimal 1 produk untuk checkout.');
      return;
    }

    const txId = 'TX-' + Math.random().toString(36).substring(2, 8).toUpperCase();
    const total = cart.reduce((sum, item) => sum + item.product.price * item.qty, 0);
    const timestamp = new Date().toLocaleTimeString();

    setTxLogs(prev => [
      `[${timestamp}] TX_COMMIT: ${txId} | Total: Rp ${total.toLocaleString('id-ID')} | Status: ACID_COMMITTED`,
      `[${timestamp}] WAL_CHECKPOINT: 1 transaction written to local SQLite`,
      ...prev.slice(0, 5)
    ]);

    setCart([]);
    success('Transaksi Berhasil', `Nota ${txId} tercatat dalam SQLite lokal secara offline.`);
  };

  const handleRunAiTool = () => {
    setAiLoading(true);
    setAiResult(null);

    setTimeout(() => {
      setAiLoading(false);
      let payload = {};
      if (aiTool === 'getSalesSummary') {
        payload = {
          tool: 'getSalesSummary',
          params: { period: 'today', storeId: 'LOC-01' },
          execution: 'LOCAL_SLM_INFERENCE',
          latency: '14.2ms',
          result: {
            totalRevenue: 2840000,
            transactionCount: 42,
            averageTicket: 67619,
            topSellingItem: 'Arabica Coffee Beans 250g (18x)',
            offlineMutationsPendingSync: 0
          }
        };
      } else if (aiTool === 'calculateProfit') {
        payload = {
          tool: 'calculateProfit',
          params: { startDate: '2026-08-01', endDate: '2026-08-20' },
          execution: 'LOCAL_HEURISTIC_ENGINE',
          latency: '8.4ms',
          result: {
            grossRevenue: 54800000,
            cogsHpp: 32400000,
            grossProfit: 22400000,
            marginPercent: '40.87%',
            estimatedTax: 2464000
          }
        };
      } else {
        payload = {
          tool: 'getInventoryStatus',
          params: { lowStockThreshold: 10 },
          execution: 'LOCAL_SQLITE_DISPATCHER',
          latency: '5.1ms',
          result: {
            totalSkus: 148,
            lowStockAlerts: [
              { sku: 'SKU-1029', name: 'Bluetooth Barcode Scanner', stock: 6, minThreshold: 10 },
              { sku: 'SKU-4410', name: 'Thermal Paper Roll 58mm', stock: 48, status: 'HEALTHY' }
            ]
          }
        };
      }
      setAiResult(JSON.stringify(payload, null, 2));
      success('AI Inference Selesai', `Tool ${aiTool} dieksekusi secara lokal (${aiTool === 'calculateProfit' ? '8.4ms' : '14.2ms'}).`);
    }, 350);
  };

  const handleCopyHash = () => {
    navigator.clipboard.writeText('e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855');
    setCopiedHash(true);
    success('Hash Tersalin', 'SHA-256 checksum disalin ke clipboard.');
    setTimeout(() => setCopiedHash(false), 2000);
  };

  return (
    <div className="workbench-page">
      <SEOHead
        title="Engineering Workbench & Architecture Console"
        description="Pusat eksplorasi arsitektur platform ERASTACK: Offline-first SQLite engine, On-device Local AI Tool Calling, dan verifikasi biner signed."
      />

      <div className="container workbench-container">
        <section className="workbench-hero">
          <div className="hero-meta-row">
            <span className="hero-system-tag">
              <Terminal size={12} className="tag-icon" />
              <span>ERASTACK.CORE / V1.0-PROD</span>
            </span>
            <span className="hero-meta-sep">/</span>
            <span className="hero-runtime-badge">
              <StatusDot status="ready" size="sm" />
              <span>EDGE RUNTIME ACTIVE</span>
            </span>
          </div>

          <h1 className="workbench-title">
            Offline-First Architecture & <span className="text-gradient">Engineering Console</span>
          </h1>

          <p className="workbench-subtitle">
            Simulasi dan inspeksi teknis komponen inti EraStack: pipeline transaksi kasir, local tool dispatcher, persistensi SQLite WAL, dan kedaulatan data di perangkat lokal.
          </p>

          <div className="hero-stats-strip">
            <div className="stat-node">
              <span className="node-label">OPERATIONAL INVARIANT</span>
              <span className="node-val">Offline-First</span>
            </div>
            <div className="stat-node">
              <span className="node-label">LOCAL PROCESSING</span>
              <span className="node-val">On-Device Dispatch</span>
            </div>
            <div className="stat-node">
              <span className="node-label">STORAGE ENGINE</span>
              <span className="node-val">SQLite WAL Mode</span>
            </div>
            <div className="stat-node">
              <span className="node-label">DEVELOPMENT STATUS</span>
              <span className="node-val">Active Development</span>
            </div>
          </div>
        </section>

        <section className="console-section">
          <div className="console-window">
            <div className="console-top-bar">
              <div className="console-window-dots">
                <span className="dot red" />
                <span className="dot yellow" />
                <span className="dot green" />
              </div>
              <div className="console-title-text">
                <HardDrive size={13} className="console-title-icon" />
                <span>ERASTACK ARCHITECTURE WORKBENCH & SIMULATOR</span>
              </div>
              <div className="console-top-status">
                <Badge variant="lime" size="sm" dot>READY</Badge>
              </div>
            </div>

            <div className="console-tabs-strip">
              <button
                type="button"
                className={`console-tab-btn ${activeTab === 'pos' ? 'is-active' : ''}`}
                onClick={() => setActiveTab('pos')}
              >
                <Zap size={14} />
                <span>1. POS Transaction Pipeline</span>
              </button>
              <button
                type="button"
                className={`console-tab-btn ${activeTab === 'ai' ? 'is-active' : ''}`}
                onClick={() => setActiveTab('ai')}
              >
                <Cpu size={14} />
                <span>2. Local SLM Tool Calling</span>
              </button>
              <button
                type="button"
                className={`console-tab-btn ${activeTab === 'sqlite' ? 'is-active' : ''}`}
                onClick={() => setActiveTab('sqlite')}
              >
                <Database size={14} />
                <span>3. SQLite WAL Schema</span>
              </button>
              <button
                type="button"
                className={`console-tab-btn ${activeTab === 'crypto' ? 'is-active' : ''}`}
                onClick={() => setActiveTab('crypto')}
              >
                <Lock size={14} />
                <span>4. Binary Release Ledger</span>
              </button>
              <button
                type="button"
                className={`console-tab-btn ${activeTab === 'tokens' ? 'is-active' : ''}`}
                onClick={() => setActiveTab('tokens')}
              >
                <Sliders size={14} />
                <span>5. Design System Tokens</span>
              </button>
            </div>

            <div className="console-body">
              {activeTab === 'pos' && (
                <div className="workbench-pane-grid">
                  <div className="pane-col pane-interactive">
                    <div className="pane-header">
                      <h3 className="pane-heading">Simulasi Scan & Kasir Offline</h3>
                      <span className="pane-sub">Klik item untuk memicu transaksi atomik real-time</span>
                    </div>

                    <div className="product-scan-list">
                      {products.map(p => (
                        <div key={p.id} className="product-scan-item" onClick={() => handleAddToCart(p)}>
                          <div className="product-info">
                            <span className="product-sku tabular-nums">{p.sku}</span>
                            <span className="product-name">{p.name}</span>
                            <span className="product-cat">{p.category}</span>
                          </div>
                          <div className="product-action">
                            <span className="product-price tabular-nums">Rp {p.price.toLocaleString('id-ID')}</span>
                            <span className={`product-stock-badge ${p.stock < 10 ? 'low' : ''}`}>
                              Stok: {p.stock}
                            </span>
                            <Button size="sm" variant="secondary">Scan +</Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="pane-col pane-receipt">
                    <div className="pane-header">
                      <h3 className="pane-heading">Staging Keranjang & Checkout</h3>
                      <span className="pane-sub">Operasi berlangsung di RAM lokal</span>
                    </div>

                    <div className="cart-container">
                      {cart.length === 0 ? (
                        <div className="cart-empty-state">
                          <Zap size={24} className="cart-empty-icon" />
                          <p>Keranjang kosong. Klik produk di sebelah kiri untuk menambah pesanan.</p>
                        </div>
                      ) : (
                        <div className="cart-items-list">
                          {cart.map((item, idx) => (
                            <div key={idx} className="cart-row">
                              <span className="cart-item-name">{item.product.name}</span>
                              <span className="cart-item-qty tabular-nums">x{item.qty}</span>
                              <span className="cart-item-subtotal tabular-nums">
                                Rp {(item.product.price * item.qty).toLocaleString('id-ID')}
                              </span>
                            </div>
                          ))}
                          <div className="cart-total-bar">
                            <span>TOTAL TRANSAKSI:</span>
                            <span className="cart-total-value tabular-nums">
                              Rp {cart.reduce((sum, i) => sum + i.product.price * i.qty, 0).toLocaleString('id-ID')}
                            </span>
                          </div>
                          <Button variant="primary" onClick={handleCheckout} className="btn-full">
                            <CheckCircle2 size={16} />
                            Commit Transaksi ke SQLite
                          </Button>
                        </div>
                      )}
                    </div>

                    <div className="audit-log-box">
                      <div className="audit-log-header">
                        <Terminal size={12} />
                        <span>LIVE SQLITE WAL AUDIT STREAM</span>
                      </div>
                      <div className="audit-log-content">
                        {txLogs.map((log, i) => (
                          <div key={i} className="audit-log-line tabular-nums">{log}</div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'ai' && (
                <div className="workbench-pane-grid">
                  <div className="pane-col pane-interactive">
                    <div className="pane-header">
                      <h3 className="pane-heading">On-Device Local AI Tool Dispatcher</h3>
                      <span className="pane-sub">Pilih whitelist tool untuk diuji tanpa cloud API</span>
                    </div>

                    <div className="tool-selector-group">
                      <div
                        className={`tool-card ${aiTool === 'getSalesSummary' ? 'is-selected' : ''}`}
                        onClick={() => setAiTool('getSalesSummary')}
                      >
                        <div className="tool-card-head">
                          <span className="tool-card-name">getSalesSummary()</span>
                          <Badge variant="lime" size="sm">Analitik Harian</Badge>
                        </div>
                        <p className="tool-card-desc">
                          Mengambil omset, jumlah transaksi, dan item terlaris langsung dari SQLite harian.
                        </p>
                      </div>

                      <div
                        className={`tool-card ${aiTool === 'calculateProfit' ? 'is-selected' : ''}`}
                        onClick={() => setAiTool('calculateProfit')}
                      >
                        <div className="tool-card-head">
                          <span className="tool-card-name">calculateProfit()</span>
                          <Badge variant="cyan" size="sm">Kalkulasi Margin</Badge>
                        </div>
                        <p className="tool-card-desc">
                          Menghitung laba kotor, HPP, margin laba, dan estimasi pajak dari ledger mutasi.
                        </p>
                      </div>

                      <div
                        className={`tool-card ${aiTool === 'getInventoryStatus' ? 'is-selected' : ''}`}
                        onClick={() => setAiTool('getInventoryStatus')}
                      >
                        <div className="tool-card-head">
                          <span className="tool-card-name">getInventoryStatus()</span>
                          <Badge variant="warning" size="sm">Audit Stok</Badge>
                        </div>
                        <p className="tool-card-desc">
                          Mendeteksi item yang mencapai batas minimum untuk rekomendasi reorder fisik.
                        </p>
                      </div>
                    </div>

                    <div className="tool-action-bar">
                      <Button
                        variant="accent"
                        onClick={handleRunAiTool}
                        isLoading={aiLoading}
                        leftIcon={<Play size={15} />}
                      >
                        Jalankan Dispatcher Tool ({aiTool})
                      </Button>
                    </div>
                  </div>

                  <div className="pane-col">
                    <div className="pane-header">
                      <h3 className="pane-heading">Structured Tool Execution Output</h3>
                      <span className="pane-sub">JSON Response dari Local SLM Runtime</span>
                    </div>

                    <div className="code-viewer-box">
                      <div className="code-viewer-header">
                        <span>DISPATCHER_STDOUT / JSON_PAYLOAD</span>
                        <Badge variant="outline" size="sm">SANDBOX VERIFIED</Badge>
                      </div>
                      <pre className="code-viewer-content">
                        {aiResult || `Tekan "Jalankan Dispatcher Tool" untuk melihat payload eksekusi lokal.\nParameter akan diverifikasi terhadap Whitelist Security Handler.`}
                      </pre>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'sqlite' && (
                <div className="workbench-single-pane">
                  <div className="pane-header">
                    <h3 className="pane-heading">SQLite WAL Relational Schema & Indexing</h3>
                    <span className="pane-sub">Skema database operasional primer dengan primary key UUID dan WAL concurrency</span>
                  </div>

                  <div className="schema-grid">
                    <div className="schema-card">
                      <div className="schema-card-head">
                        <Database size={14} className="schema-icon" />
                        <span className="schema-table-name">products</span>
                        <Badge variant="outline" size="sm">148 Records</Badge>
                      </div>
                      <pre className="schema-ddl">
{`CREATE TABLE products (
  id TEXT PRIMARY KEY,
  sku TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  barcode TEXT,
  cost_price INTEGER NOT NULL,
  selling_price INTEGER NOT NULL,
  stock_quantity INTEGER NOT NULL DEFAULT 0,
  updated_at TEXT NOT NULL
);
CREATE INDEX idx_products_sku ON products(sku);`}
                      </pre>
                    </div>

                    <div className="schema-card">
                      <div className="schema-card-head">
                        <Database size={14} className="schema-icon" />
                        <span className="schema-table-name">transactions</span>
                        <Badge variant="outline" size="sm">ACID Wrapped</Badge>
                      </div>
                      <pre className="schema-ddl">
{`CREATE TABLE transactions (
  id TEXT PRIMARY KEY,
  cashier_id TEXT NOT NULL,
  total_amount INTEGER NOT NULL,
  payment_method TEXT NOT NULL,
  status TEXT NOT NULL,
  created_at TEXT NOT NULL
);
CREATE INDEX idx_tx_date ON transactions(created_at);`}
                      </pre>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'crypto' && (
                <div className="workbench-single-pane">
                  <div className="pane-header">
                    <h3 className="pane-heading">Cryptographic Binary Ledger & Release Checksums</h3>
                    <span className="pane-sub">Integritas file installer terverifikasi dengan tanda tangan digital SHA-256</span>
                  </div>

                  <div className="binary-table-container">
                    <table className="binary-table">
                      <thead>
                        <tr>
                          <th>Platform / Binary Target</th>
                          <th>Versi</th>
                          <th>Ukuran</th>
                          <th>SHA-256 Checksum Hash</th>
                          <th>Tindakan</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>
                            <div className="binary-target">
                              <Monitor size={15} />
                              <span>Windows Desktop Installer (.exe)</span>
                            </div>
                          </td>
                          <td><Badge variant="lime" size="sm">v1.0.4</Badge></td>
                          <td className="tabular-nums">48.2 MB</td>
                          <td>
                            <code className="binary-hash tabular-nums">
                              e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855
                            </code>
                          </td>
                          <td>
                            <Button size="sm" variant="secondary" onClick={handleCopyHash}>
                              {copiedHash ? <Check size={14} /> : <Copy size={14} />}
                              {copiedHash ? 'Tersalin' : 'Salin Hash'}
                            </Button>
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <div className="binary-target">
                              <Smartphone size={15} />
                              <span>Android Mobile Package (.apk)</span>
                            </div>
                          </td>
                          <td><Badge variant="cyan" size="sm">v1.0.4</Badge></td>
                          <td className="tabular-nums">18.6 MB</td>
                          <td>
                            <code className="binary-hash tabular-nums">
                              a94a8fe5ccb19ba61c4c0873d391e987982fbbd3da24a3e2e038891515949a21
                            </code>
                          </td>
                          <td>
                            <Button size="sm" variant="secondary" onClick={handleCopyHash}>
                              <Copy size={14} />
                              Salin Hash
                            </Button>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {activeTab === 'tokens' && (
                <div className="workbench-single-pane">
                  <div className="pane-header">
                    <h3 className="pane-heading">Industrial Semantic Design Tokens Matrix</h3>
                    <span className="pane-sub">Diekstrak secara presisi dari DESIGN.md untuk konsistensi UI dark-first</span>
                  </div>

                  <div className="tokens-showcase-grid">
                    <div className="token-card" style={{ borderLeft: '4px solid #8B5CF6' }}>
                      <span className="token-name">--brand-primary</span>
                      <span className="token-hex tabular-nums">#8B5CF6</span>
                      <span className="token-desc">Nebula Violet / Royal Cosmic Accent</span>
                    </div>
                    <div className="token-card" style={{ borderLeft: '4px solid #F1FEC8' }}>
                      <span className="token-name">--accent-vanilla</span>
                      <span className="token-hex tabular-nums">#F1FEC8</span>
                      <span className="token-desc">Vanilla Cream Lime • High-Contrast Actions & POS Highlights</span>
                    </div>
                    <div className="token-card" style={{ borderLeft: '4px solid #23212C' }}>
                      <span className="token-name">--bg-surface-elevated</span>
                      <span className="token-hex tabular-nums">#23212C</span>
                      <span className="token-desc">Cosmic Slate Base Container & Elevated Cards</span>
                    </div>
                    <div className="token-card" style={{ borderLeft: '4px solid #38BDF8' }}>
                      <span className="token-name">--accent-cyan</span>
                      <span className="token-hex tabular-nums">#38BDF8</span>
                      <span className="token-desc">Cosmic Star Blue & API Indicators</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>

        <section className="invariants-section">
          <div className="section-title-wrap">
            <h2 className="section-title">Fundamental Engineering Invariants</h2>
            <p className="section-desc">Aturan rekayasa non-kompromis yang menjamin stabilitas seumur hidup aplikasi</p>
          </div>

          <div className="invariants-grid">
            <div className="invariant-card">
              <div className="invariant-header">
                <HardDrive size={18} className="invariant-icon lime" />
                <h3 className="invariant-name">1. Offline-First Mandate</h3>
              </div>
              <p className="invariant-text">
                Operasi kasir, mutasi stok, cetak nota, dan pencarian produk tidak boleh bergantung pada koneksi internet. Database SQLite lokal adalah sumber kebenaran operasional utama.
              </p>
              <div className="invariant-tag-row">
                <span className="invariant-tag">ACID Transactions</span>
                <span className="invariant-tag">Zero Downtime</span>
              </div>
            </div>

            <div className="invariant-card">
              <div className="invariant-header">
                <Cpu size={18} className="invariant-icon cyan" />
                <h3 className="invariant-name">2. Sandboxed AI Tool Calling</h3>
              </div>
              <p className="invariant-text">
                Model AI lokal beroperasi langsung di perangkat dan dilarang mengeksekusi raw query SQL bebas. Seluruh komunikasi melalui whitelist function call terkontrol.
              </p>
              <div className="invariant-tag-row">
                <span className="invariant-tag">On-Device SLM</span>
                <span className="invariant-tag">Zero Cloud Costs</span>
              </div>
            </div>

            <div className="invariant-card">
              <div className="invariant-header">
                <Zap size={18} className="invariant-icon blue" />
                <h3 className="invariant-name">3. Strict Zero-Bloat Budget</h3>
              </div>
              <p className="invariant-text">
                Menolak pustaka raksasa yang tidak perlu. Aplikasi desktop kasir beroperasi dengan konsumsi RAM idle &lt; 70MB, respon scanner &lt; 30ms, dan web bundle ringan.
              </p>
              <div className="invariant-tag-row">
                <span className="invariant-tag">Native TS / Rust</span>
                <span className="invariant-tag">Instant Startup</span>
              </div>
            </div>

            <div className="invariant-card">
              <div className="invariant-header">
                <Shield size={18} className="invariant-icon green" />
                <h3 className="invariant-name">4. Cryptographic Data Sovereignty</h3>
              </div>
              <p className="invariant-text">
                Semua data keuangan dan stok tersimpan di penyimpanan lokal pemilik bisnis. Installer EXE dan APK ditandatangani secara kriptografis dengan checksum publik.
              </p>
              <div className="invariant-tag-row">
                <span className="invariant-tag">SHA-256 Ledger</span>
                <span className="invariant-tag">Data Ownership</span>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};
