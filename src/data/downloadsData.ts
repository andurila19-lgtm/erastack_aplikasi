export interface DownloadRelease {
  id: string;
  name: string;
  version: string;
  platform: 'windows' | 'android' | 'utilities';
  fileSize: string;
  fileName: string;
  releaseDate: string;
  downloadUrl: string;
  recommendedFor: string;
  badge?: string;
  features: string[];
}

export const DOWNLOAD_RELEASES: DownloadRelease[] = [
  {
    id: 'erastack-pos-win',
    name: 'ERASTACK POS untuk Komputer / Laptop Kasir (Windows)',
    version: 'v1.0.4',
    platform: 'windows',
    fileSize: '48.2 MB',
    fileName: 'ERASTACK_POS_Windows_Setup.exe',
    releaseDate: 'Agustus 2026',
    downloadUrl: '/downloads/ERASTACK_POS_Windows_Setup.exe',
    recommendedFor: 'Komputer Kasir Toko, Laptop Windows 10 & 11, Mesin POS Layar Sentuh',
    badge: 'Paling Banyak Digunakan',
    features: [
      'Bisa dipakai 100% tanpa internet (offline lancar)',
      'Langsung colok printer struk thermal & barcode scanner',
      'Ringan & hemat memori, komputer lama tetap lancar',
      'Gratis digunakan selamanya tanpa biaya langganan bulanan',
    ],
  },
  {
    id: 'erastack-pos-android',
    name: 'ERASTACK POS untuk HP & Tablet Kasir (Android)',
    version: 'v1.0.4',
    platform: 'android',
    fileSize: '28.5 MB',
    fileName: 'ERASTACK_POS_Android.apk',
    releaseDate: 'Agustus 2026',
    downloadUrl: '/downloads/ERASTACK_POS_Android.apk',
    recommendedFor: 'Smartphone Android, Tablet Kasir Kafe/Resto, Mesin POS Portabel (Sunmi, iMin)',
    badge: 'Praktis di HP',
    features: [
      'Gunakan kamera HP untuk scan barcode barang langsung',
      'Cetak struk nota via Bluetooth printer mini tanpa kabel',
      'Hemat baterai & hemat kuota data internet',
      'Data transaksi tersimpan aman di memori HP Anda',
    ],
  },
  {
    id: 'erastack-label-master',
    name: 'ERASTACK Cetak Barcode & Label Harga Toko',
    version: 'v1.3.0',
    platform: 'utilities',
    fileSize: '14.5 MB',
    fileName: 'ERASTACK_Label_Master.exe',
    releaseDate: 'Agustus 2026',
    downloadUrl: '/downloads/ERASTACK_Label_Master.exe',
    recommendedFor: 'Pemilik Toko & Minimarket yang ingin cetak stiker barcode produk sendiri',
    badge: 'Utilitas Toko',
    features: [
      'Cetak stiker barcode untuk produk kemasan & rak etalase',
      'Bisa cetak barcode massal dari daftar produk Excel',
      'Mendukung kertas stiker thermal & kertas HVS/A4 biasa',
      'Mudah dipakai tanpa perlu keahlian desain grafis',
    ],
  },
];
