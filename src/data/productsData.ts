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
  rating: number;
  downloadsCount: string;
  description: string;
  features: string[];
  primaryActionText: string;
  primaryActionUrl: string;
  detailUrl: string;
  badgeText?: string;
  featured?: boolean;
}

export const PRODUCTS_CATALOG: ProductItem[] = [
  {
    id: 'erastack-pos',
    name: 'ERASTACK POS',
    tagline: 'Aplikasi Kasir Digital & Manajemen Inventaris Toko',
    category: 'Business & POS',
    platforms: ['windows', 'android'],
    version: 'v1.0.4',
    releaseDate: 'Agustus 2026',
    size: '48.2 MB',
    license: 'Lisensi Permanen',
    rating: 4.9,
    downloadsCount: '25.000+',
    description: 'Sistem kasir cerdas offline-first dengan latensi scan barcode instan, manajemen stok berkurang otomatis, cetak nota thermal USB/Bluetooth, dan laporan laba harian.',
    features: [
      '100% Beroperasi Offline (Database SQLite WAL)',
      'Asisten AI Lokal On-Device (Tanpa Kuota)',
      'Kompatibel Semua Printer Kasir Thermal 58/80mm',
      'Manajemen Multi-Cabang & Otorisasi Karyawan',
    ],
    primaryActionText: 'Unduh Aplikasi',
    primaryActionUrl: '/downloads',
    detailUrl: '/products/pos',
    badgeText: 'Flagship POS',
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
    rating: 4.8,
    downloadsCount: '8.400+',
    description: 'Mesin kecerdasan buatan lokal berbobot ringan untuk analisis penjualan dan prediksi stok. Beroperasi langsung di CPU/RAM perangkat tanpa biaya API cloud.',
    features: [
      'Zero Cloud API Cost (Eksekusi 100% On-Device)',
      'Whitelisted Tool Calling Dispatcher Aman',
      'Prediksi Kebutuhan Restock Bahan Baku',
      'Privasi Data Usaha Terjamin Sepenuhnya',
    ],
    primaryActionText: 'Eksplorasi AI Lab',
    primaryActionUrl: '/ai-lab',
    detailUrl: '/ai-lab',
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
    license: 'Lisensi Permanen',
    rating: 4.9,
    downloadsCount: '12.100+',
    description: 'Modul relay data asinkron yang menghubungkan kasir cabang dengan dashboard pusat. Menangani rekonsiliasi data otomatis saat internet kembali tersambung.',
    features: [
      'Antrean Mutasi Idempoten & ACID Compliant',
      'Resolusi Konflik Data Berbasis Vector Clock',
      'Backup Otomatis Terenkripsi AES-256',
      'Konsumsi Memori RAM Super Hemat (< 45MB)',
    ],
    primaryActionText: 'Lihat Dokumentasi',
    primaryActionUrl: '/docs',
    detailUrl: '/docs',
    badgeText: 'Data Core',
  },
  {
    id: 'printer-peripheral-hub',
    name: 'ERASTACK Hardware Hub',
    tagline: 'Driverless Spooler Printer Thermal & Barcode Scanner',
    category: 'Hardware & Drivers',
    platforms: ['windows', 'android'],
    version: 'v1.1.2',
    releaseDate: 'Juni 2026',
    size: '12.8 MB',
    license: 'Utilitas Gratis',
    rating: 4.9,
    downloadsCount: '19.500+',
    description: 'Utilitas universal untuk menghubungkan berbagai merk printer thermal (Epson, Panda, Xprinter, Iware) dan barcode scanner tanpa perlu instalasi driver manual.',
    features: [
      'Protokol RAW Spooler ESC/POS & TSPL',
      'Trigger Pulsa Buka Cash Drawer Otomatis',
      'Dukungan USB HID, Bluetooth LE, dan Ethernet LAN',
      'Auto-Reconnect jika Kabel Printer Terlepas',
    ],
    primaryActionText: 'Unduh Utilitas',
    primaryActionUrl: '/downloads',
    detailUrl: '/downloads',
    badgeText: 'Hardware Ready',
  },
  {
    id: 'branch-telemetry-dash',
    name: 'ERASTACK Multi-Branch Hub',
    tagline: 'Dashboard Agregasi Omset & Manajemen Multi-Toko',
    category: 'Business & POS',
    platforms: ['web', 'windows'],
    version: 'v1.0.2',
    releaseDate: 'Agustus 2026',
    size: '22.0 MB',
    license: 'Edisi Bisnis',
    rating: 4.7,
    downloadsCount: '6.200+',
    description: 'Pusat pantauan omset bisnis dari puluhan cabang secara real-time. Dilengkapi analisis komisi staf kasir dan peta pergerakan stok antar-gudang.',
    features: [
      'Rekapitulasi Omset Gabungan Seluruh Cabang',
      'Perhitungan Otomatis Komisi & Bagi Hasil Staf',
      'Audit Selisih Kas & Rekonsiliasi Tutup Shift',
      'Ekspor Laporan Keuangan ke Format Excel/PDF',
    ],
    primaryActionText: 'Pelajari Fitur',
    primaryActionUrl: '/products/pos',
    detailUrl: '/products/pos',
    badgeText: 'Multi-Store',
  },
  {
    id: 'barcode-qr-master',
    name: 'ERASTACK Label Master',
    tagline: 'Generator Barcode Produk & Label QRIS Dinamis',
    category: 'Utilities & Tools',
    platforms: ['windows', 'android'],
    version: 'v1.3.0',
    releaseDate: 'Mei 2026',
    size: '14.5 MB',
    license: 'Utilitas Gratis',
    rating: 4.8,
    downloadsCount: '15.300+',
    description: 'Aplikasi pencetak label barcode (EAN-13, Code-128) dan QRIS dinamis untuk ditempel pada rak etalase toko maupun kemasan produk UMKM.',
    features: [
      'Format Standar EAN-13, Code-128, dan QR Code',
      'Desain Label Harga & Barcode Siap Cetak',
      'Generate QRIS Dinamis dengan Nominal Akurat',
      'Dukungan Kertas Stiker Thermal & Kertas Label A4',
    ],
    primaryActionText: 'Unduh Utilitas',
    primaryActionUrl: '/downloads',
    detailUrl: '/downloads',
    badgeText: 'Tools',
  },
];
