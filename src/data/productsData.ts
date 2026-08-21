export interface ProductItem {
  id: string;
  name: string;
  tagline: string;
  category: 'Business & POS' | 'AI & Intelligence' | 'Data & Storage' | 'Hardware & Drivers' | 'Utilities & Tools';
  platforms: Array<'windows' | 'android' | 'web' | 'linux'>;
  version: string;
  releaseDate: string;
  size: string;
  license: string;
  architecture: string;
  description: string;
  features: string[];
  detailActionText: string;
  detailUrl: string;
  primaryActionText: string;
  primaryActionUrl: string;
  badgeText?: string;
  featured?: boolean;
}

export const PRODUCTS_CATALOG: ProductItem[] = [
  {
    id: 'erastack-pos',
    name: 'ERASTACK POS',
    tagline: 'Sistem Kasir Offline-First & Manajemen Inventaris',
    category: 'Business & POS',
    platforms: ['windows', 'android'],
    version: 'v1.0.4',
    releaseDate: 'Agustus 2026',
    size: '48.2 MB',
    license: 'Lisensi Mandiri',
    architecture: 'SQLite WAL Local Engine',
    description: 'Sistem kasir offline-first untuk input pesanan cepat, manajemen stok otomatis, cetak nota thermal ESC/POS, dan pelaporan harian.',
    features: [
      'Operasi Mandiri Offline (Database SQLite WAL)',
      'Asisten AI Lokal On-Device (Sandboxed Tool Dispatcher)',
      'Kompatibel Printer Kasir Thermal 58/80mm ESC/POS',
      'Manajemen SKU & Audit Mutasi Stok Real-Time',
    ],
    detailActionText: 'Coba Kasir Web',
    detailUrl: '/pos',
    primaryActionText: 'Unduh Installer',
    primaryActionUrl: '/downloads',
    badgeText: 'Core POS',
    featured: true,
  },
  {
    id: 'ai-slm-engine',
    name: 'ERASTACK Local AI Engine',
    tagline: 'Runtime SLM On-Device & Dispatcher Tool Terkontrol',
    category: 'AI & Intelligence',
    platforms: ['windows', 'linux', 'android'],
    version: 'v2.1.0',
    releaseDate: 'Juli 2026',
    size: '142 MB',
    license: 'Protokol Terbuka',
    architecture: 'Local Heuristic & SLM Dispatcher',
    description: 'Mesin kecerdasan buatan lokal berbobot ringan untuk analisis penjualan dan audit stok tanpa pengiriman data ke server cloud eksternal.',
    features: [
      'Pemrosesan On-Device Tanpa Cloud API',
      'Whitelisted Tool Calling Dispatcher Aman',
      'Peringatan Kuantitas Stok di Bawah Batas Minimum',
      'Kerahasiaan Data Transaksi Terjaga di Perangkat',
    ],
    detailActionText: 'Buku Panduan',
    detailUrl: '/docs',
    primaryActionText: 'Coba di AI Lab',
    primaryActionUrl: '/ai-lab',
    badgeText: 'AI Engine',
    featured: true,
  },
  {
    id: 'sqlite-sync-relay',
    name: 'ERASTACK SQLite Sync Relay',
    tagline: 'Jembatan Sinkronisasi Multi-Node & Antrean Mutasi Data',
    category: 'Data & Storage',
    platforms: ['windows', 'android'],
    version: 'v1.2.1',
    releaseDate: 'Agustus 2026',
    size: '18.4 MB',
    license: 'Lisensi Mandiri',
    architecture: 'Idempotent Mutation Queue',
    description: 'Modul relay data asinkron yang menangani antrean mutasi offline dan sinkronisasi saat perangkat terhubung ke jaringan lokal atau relay pusat.',
    features: [
      'Antrean Mutasi Idempoten & ACID Compliant',
      'Resolusi Konflik Data Berbasis Timestamp & Versi',
      'Pencadangan Mandiri Berkas Basis Data .sqlite',
      'Konsumsi Memori RAM Teroptimasi (< 50MB)',
    ],
    detailActionText: 'Buku Panduan',
    detailUrl: '/docs',
    primaryActionText: 'Unduh POS & Relay',
    primaryActionUrl: '/downloads',
    badgeText: 'Data Sync',
  },
  {
    id: 'printer-peripheral-hub',
    name: 'ERASTACK Hardware Hub',
    tagline: 'Spooler Printer Thermal ESC/POS & Barcode Scanner',
    category: 'Hardware & Drivers',
    platforms: ['windows', 'android'],
    version: 'v1.1.2',
    releaseDate: 'Juni 2026',
    size: '12.8 MB',
    license: 'Utilitas Bawaan',
    architecture: 'Direct ESC/POS & USB HID Protocol',
    description: 'Utilitas komunikasi perangkat keras untuk menghubungkan printer thermal standar (58mm/80mm) dan pemindai barcode USB/Bluetooth.',
    features: [
      'Protokol RAW Spooler ESC/POS',
      'Trigger Pulsa Pembuka Cash Drawer RJ11',
      'Dukungan USB HID Keyboard Emulation & Bluetooth',
      'Penanganan Pemutusan Koneksi Kabel (Auto-Reconnect)',
    ],
    detailActionText: 'Uji di POS Kasir',
    detailUrl: '/pos',
    primaryActionText: 'Unduh Driver & POS',
    primaryActionUrl: '/downloads',
    badgeText: 'Hardware Ready',
  },
  {
    id: 'branch-telemetry-dash',
    name: 'ERASTACK Operational Reports',
    tagline: 'Dashboard Agregasi Omset & Manajemen Shift Kasir',
    category: 'Business & POS',
    platforms: ['web', 'windows'],
    version: 'v1.0.2',
    releaseDate: 'Agustus 2026',
    size: '22.0 MB',
    license: 'Modul Pelaporan',
    architecture: 'Local Aggregation Engine',
    description: 'Pusat pantauan omset harian, rekapitulasi shift kasir, dan analisis margin keuntungan berdasarkan data SQLite lokal.',
    features: [
      'Rekapitulasi Omset & Laba Kotor Harian',
      'Audit Selisih Kas & Rekonsiliasi Kas Laci',
      'Pelacakan Item Produk Paling Banyak Terjual',
      'Ekspor Laporan Transaksi ke CSV & Print Out',
    ],
    detailActionText: 'Buka Laporan POS',
    detailUrl: '/pos',
    primaryActionText: 'Unduh Aplikasi',
    primaryActionUrl: '/downloads',
    badgeText: 'Analytics',
  },
  {
    id: 'barcode-qr-master',
    name: 'ERASTACK Label & SKU Master',
    tagline: 'Generator Barcode Produk & Format Stiker Label',
    category: 'Utilities & Tools',
    platforms: ['windows', 'android'],
    version: 'v1.3.0',
    releaseDate: 'Mei 2026',
    size: '14.5 MB',
    license: 'Utilitas Bawaan',
    architecture: 'Standard 1D/2D Barcode Generator',
    description: 'Utilitas pencetak label barcode (EAN-13, Code-128) untuk ditempel pada rak etalase maupun kemasan produk barang dagangan.',
    features: [
      'Format Standar EAN-13, Code-128, dan QR Code',
      'Tata Letak Label Harga & Barcode Siap Cetak',
      'Dukungan Kertas Stiker Thermal & Kertas Roll Standar',
      'Integrasi Langsung dengan Katalog Produk EraStack',
    ],
    detailActionText: 'Buku Panduan',
    detailUrl: '/docs',
    primaryActionText: 'Unduh Label Master',
    primaryActionUrl: '/downloads/ERASTACK_Label_Master.exe',
    badgeText: 'Tools',
  },
];
