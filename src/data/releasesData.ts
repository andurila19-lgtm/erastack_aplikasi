export interface ReleaseChangeItem {
  type: 'feature' | 'improvement' | 'fix';
  title: string;
  description: string;
}

export interface PlatformRelease {
  version: string;
  releaseDate: string;
  channel: 'Rilis Stabil Utama' | 'Pembaruan Bulanan' | 'Peluncuran Perdana';
  tagline: string;
  isLatest?: boolean;
  windowsFileSize: string;
  androidFileSize: string;
  changes: ReleaseChangeItem[];
  practicalBenefit: string;
}

export const RELEASES_DATA: PlatformRelease[] = [
  {
    version: 'v1.0.4',
    releaseDate: '18 Agustus 2026',
    channel: 'Rilis Stabil Utama',
    tagline: 'Integrasi AI Asisten Bisnis Toko & Peningkatan Kecepatan Scan Barcode',
    isLatest: true,
    windowsFileSize: '48.2 MB',
    androidFileSize: '28.5 MB',
    practicalBenefit: 'Toko kini bisa bertanya rekap laba dan jam ramai ke AI lokal tanpa kuota internet, serta scan barcode ribuan barang jauh lebih responsif.',
    changes: [
      {
        type: 'feature',
        title: 'AI Asisten Bisnis Toko Terintegrasi',
        description: 'Tanya omset harian, cek stok kritis yang mau habis, dan analisis jam ramai toko langsung di dalam kasir tanpa perlu internet.',
      },
      {
        type: 'feature',
        title: 'Dukungan Auto-Spooler Printer Thermal 80mm & 58mm',
        description: 'Cetak struk nota langsung jalan tanpa instal driver CD rumit pada Windows dan printer Bluetooth Android.',
      },
      {
        type: 'improvement',
        title: 'Kecepatan Scan Barcode Multi-Item Meningkat (< 2ms)',
        description: 'Pembacaan kode barcode produk kini instan tanpa jeda, mempercepat proses antrean kasir hingga 40%.',
      },
      {
        type: 'improvement',
        title: 'Tampilan Kasir Tablet Android Lebih Lega',
        description: 'Penataan tombol produk dan keranjang belanja lebih luas dan nyaman disentuh di tablet kasir 8 hingga 10 inci.',
      },
      {
        type: 'fix',
        title: 'Pencegahan Selisih Kas saat Mati Lampu Mendadak',
        description: 'Memperkuat penyimpanan database lokal agar transaksi yang sedang berlangsung tetap tersimpan aman saat listrik padam.',
      },
      {
        type: 'fix',
        title: 'Koneksi Ulang Otomatis Printer Bluetooth',
        description: 'Printer Bluetooth yang sempat mati atau kehabisan baterai kini otomatis tersambung kembali saat dinyalakan.',
      },
    ],
  },
  {
    version: 'v1.0.3',
    releaseDate: '15 Juli 2026',
    channel: 'Pembaruan Bulanan',
    tagline: 'Dukungan Laci Uang Otomatis & Layar Pelanggan (Customer Display)',
    windowsFileSize: '47.8 MB',
    androidFileSize: '28.1 MB',
    practicalBenefit: 'Laci kasir otomatis terbuka saat pembayaran selesai dan pembeli bisa melihat rincian belanja di layar kedua.',
    changes: [
      {
        type: 'feature',
        title: 'Buka Laci Kasir Otomatis (Auto Kick Cash Drawer)',
        description: 'Laci uang kasir RJ-11 otomatis terbuka saat kasir menekan tombol selesai transaksi tunai.',
      },
      {
        type: 'feature',
        title: 'Mode Layar Pelanggan (Customer Display)',
        description: 'Dukungan monitor kedua yang menghadap ke pembeli untuk menampilkan daftar belanjaan dan total tagihan.',
      },
      {
        type: 'improvement',
        title: 'Tutup Shift Kasir Harian di Bawah 5 Detik',
        description: 'Proses audit rekonsiliasi uang fisik dan pencetakan struk rekap harian kini jauh lebih cepat.',
      },
      {
        type: 'improvement',
        title: 'Pilihan Format Struk Ringkas & Detail',
        description: 'Pemilik toko dapat memilih format struk hemat kertas atau struk lengkap dengan logo dan pesan promosi toko.',
      },
      {
        type: 'fix',
        title: 'Sinkronisasi Harga Varian Produk',
        description: 'Memperbaiki penyesuaian harga khusus pada varian rasa makanan dan ukuran pakaian saat diskon promo aktif.',
      },
    ],
  },
  {
    version: 'v1.0.2',
    releaseDate: '10 Juni 2026',
    channel: 'Pembaruan Bulanan',
    tagline: 'Modul Diskon Member & Pencatatan Hutang Piutang Pelanggan',
    windowsFileSize: '46.5 MB',
    androidFileSize: '27.4 MB',
    practicalBenefit: 'Pemilik toko dapat mencatat pelanggan langganan, memberi diskon khusus member, dan mencatat bon hutang warung dengan rapi.',
    changes: [
      {
        type: 'feature',
        title: 'Manajemen Member & Diskon Pelanggan Setia',
        description: 'Daftarkan nomor HP pembeli untuk memberikan harga langganan atau diskon otomatis saat berbelanja.',
      },
      {
        type: 'feature',
        title: 'Pencatatan Hutang / Kasbon Pelanggan Warung',
        description: 'Catat transaksi belum lunas dengan batas jatuh tempo dan cetak bukti nota tagihan hutang pelanggan.',
      },
      {
        type: 'improvement',
        title: 'Export Laporan Penjualan ke File Excel',
        description: 'Unduh laporan riwayat transaksi harian, mingguan, dan bulanan ke format Excel (.xlsx) dengan 1 klik.',
      },
      {
        type: 'improvement',
        title: 'Pencarian Cepat Produk dengan Kata Kunci Parsial',
        description: 'Ketik sebagian nama barang (contoh: "kop aren") dan sistem langsung menampilkan produk yang cocok.',
      },
      {
        type: 'fix',
        title: 'Perbaikan Pembulatan Nominal Uang Kembalian',
        description: 'Menyesuaikan pembulatan pecahan uang rupiah (Rp 100 / Rp 500) pada total pembayaran tunai kasir.',
      },
    ],
  },
  {
    version: 'v1.0.1',
    releaseDate: '12 Mei 2026',
    channel: 'Pembaruan Bulanan',
    tagline: 'Manajemen Multi-Kasir, Hak Akses Staf & Efisiensi Memori Komputer',
    windowsFileSize: '45.2 MB',
    androidFileSize: '26.8 MB',
    practicalBenefit: 'Pemilik toko bisa membuat akun kasir terpisah untuk staf tanpa khawatir data keuntungan rahasia toko dilihat orang lain.',
    changes: [
      {
        type: 'feature',
        title: 'Hak Akses Staf Kasir vs Akun Pemilik (Owner)',
        description: 'Batasi staf kasir hanya untuk melayani transaksi pembayaran tanpa bisa mengubah harga modal atau menghapus produk.',
      },
      {
        type: 'feature',
        title: 'Rekapitulasi Pergantian Shift Staf Kasir',
        description: 'Catat jam masuk dan jam pulang kasir lengkap dengan total uang masuk per kasir yang bertugas.',
      },
      {
        type: 'improvement',
        title: 'Hemat Memori RAM Komputer (< 60 MB)',
        description: 'Aplikasi kasir berjalan sangat ringan sehingga komputer PC lama toko tetap lancar tanpa lemot.',
      },
      {
        type: 'fix',
        title: 'Perbaikan Font Struk Thermal Android',
        description: 'Memperbaiki kejelasan teks huruf nota struk kasir pada printer thermal berukuran 58mm.',
      },
    ],
  },
  {
    version: 'v1.0.0',
    releaseDate: '15 April 2026',
    channel: 'Peluncuran Perdana',
    tagline: 'Peluncuran Perdana Aplikasi Kasir Pintar Offline-First ERASTACK POS',
    windowsFileSize: '44.0 MB',
    androidFileSize: '25.9 MB',
    practicalBenefit: 'Rilis resmi aplikasi kasir gratis selamanya berbasis penyimpanan lokal aman tanpa ketergantungan internet.',
    changes: [
      {
        type: 'feature',
        title: 'Aplikasi Kasir 100% Offline Tanpa Kuota',
        description: 'Seluruh transaksi kasir, pencatatan stok, dan cetak struk nota berjalan mandiri tanpa butuh internet.',
      },
      {
        type: 'feature',
        title: 'Penerimaan Pembayaran Tunai & QRIS',
        description: 'Mendukung transaksi kasir tunai dengan hitung kembalian instan dan pembayaran non-tunai via kode QRIS.',
      },
      {
        type: 'feature',
        title: 'Katalog Produk & Pengingat Stok Minimum',
        description: 'Kelola ribuan barang belanjaan toko dengan kategori, harga modal, harga jual, dan batas sisa stok aman.',
      },
      {
        type: 'improvement',
        title: 'Gratis Digunakan Selamanya Tanpa Biaya Sewa',
        description: 'Tidak ada biaya langganan bulanan atau potongan persentase transaksi kasir toko Anda.',
      },
    ],
  },
];
