export interface UseCaseItem {
  id: string;
  title: string;
  category: 'Kafe & Kuliner' | 'Minimarket & Retail' | 'Restoran & Meja' | 'Jasa & Barbershop' | 'Fashion & Butik' | 'Bengkel & Servis';
  targetProfile: string;
  badgeText: string;
  operationalChallenges: string[];
  systemSolutions: string[];
  relevantFeatures: string[];
  hardwareSetup: string;
}

export const USE_CASES: UseCaseItem[] = [
  {
    id: 'retail-grocery',
    title: 'Minimarket & Toko Kelontong',
    category: 'Minimarket & Retail',
    targetProfile: 'Toko sembako, minimarket mandiri, toko plastik, dan toko bahan pokok.',
    badgeText: 'Katalog SKU Besar',
    operationalChallenges: [
      'Jumlah SKU barang bervariasi dari ratusan hingga ribuan item.',
      'Antrean panjang saat jam sibuk dan ketergantungan pada koneksi internet yang sering tidak stabil.',
      'Kesulitan rekonsiliasi selisih kas kasir saat pergantian shift kerja.',
    ],
    systemSolutions: [
      'Pencarian barcode scanner instan membaca SKU langsung dari SQLite lokal.',
      'Sistem kasir tetap beroperasi penuh tanpa koneksi internet.',
      'Rekonsiliasi shift kasir terstruktur dengan audit log transaksi.',
    ],
    relevantFeatures: [
      'Scan Barcode USB HID',
      'Manajemen Kategori & SKU',
      'Pencatatan Riwayat Shift Kasir',
      'Laporan Omset & Laba Kotor',
    ],
    hardwareSetup: 'PC Windows / Android Tablet + USB/Wireless Barcode Scanner + Thermal Printer 58mm/80mm + Cash Drawer RJ11',
  },
  {
    id: 'fnb-coffee',
    title: 'Kedai Kopi & Kafe',
    category: 'Kafe & Kuliner',
    targetProfile: 'Kedai kopi, coffee shop, booth minuman kekinian, dan food stall.',
    badgeText: 'Kasir Cepat & Struk',
    operationalChallenges: [
      'Kebutuhan pencatatan pesanan kilat pada saat jam makan siang dan akhir pekan.',
      'Perlunya mencetak tiket pesanan untuk barista dan struk pembayaran untuk pelanggan.',
      'Pencatatan bahan baku minuman yang sering tidak terdata rapi.',
    ],
    systemSolutions: [
      'Antarmuka kasir layar sentuh dengan navigasi kategori produk visual.',
      'Pencetakan nota instan via printer thermal Bluetooth atau USB.',
      'Pencatatan mutasi inventaris dan peringatan stok bahan baku menipis.',
    ],
    relevantFeatures: [
      'Touch Point of Sale Interface',
      'Cetak Struk Thermal ESC/POS',
      'Peringatan Low-Stock Bahan Baku',
      'Laporan Penjualan Harian',
    ],
    hardwareSetup: 'Tablet Android / Laptop + Bluetooth Thermal Printer 58mm + Cash Drawer',
  },
  {
    id: 'fashion-boutique',
    title: 'Fashion, Distro & Butik',
    category: 'Fashion & Butik',
    targetProfile: 'Toko pakaian, butik hijab, toko sepatu, dan distro aksesoris.',
    badgeText: 'Manajemen Varian',
    operationalChallenges: [
      'Satu produk memiliki banyak variasi warna dan ukuran (S/M/L/XL).',
      'Kebutuhan pelabelan barcode mandiri pada gantungan baju.',
      'Penetapan diskon promo musiman atau potongan harga tertentu.',
    ],
    systemSolutions: [
      'Struktur katalog SKU unik per varian ukuran dan warna barang.',
      'Dukungan cetak kode barcode untuk ditempel pada label hangtag pakaian.',
      'Penerapan diskon nominal atau persentase saat transaksi kasir.',
    ],
    relevantFeatures: [
      'Katalog Varian Produk',
      'Diskon Transaksi & Item',
      'Pencarian SKU & Barcode',
      'Laporan Produk Terlaris',
    ],
    hardwareSetup: 'PC Windows / Tablet + Barcode Scanner 1D/2D + Printer Thermal',
  },
  {
    id: 'service-barbershop',
    title: 'Barbershop & Salon',
    category: 'Jasa & Barbershop',
    targetProfile: 'Pangkas rambut pria, salon kecantikan, dan studio grooming.',
    badgeText: 'Jasa & Produk',
    operationalChallenges: [
      'Penggabungan item layanan jasa potong rambut dengan produk pomade/shampoo.',
      'Kebutuhan rekap data transaksi per hari tanpa biaya software bulanan yang memberatkan.',
    ],
    systemSolutions: [
      'Katalog gabungan antara tipe layanan jasa dan barang inventaris fisik.',
      'Lisensi mandiri tanpa beban biaya sewa perangkat lunak bulanan.',
    ],
    relevantFeatures: [
      'Katalog Jasa & Produk',
      'Pembayaran Tunai & Non-Tunai',
      'Rekap Transaksi Harian',
      'Database Lokal Privat',
    ],
    hardwareSetup: 'Smartphone Android / Tablet + Mini Thermal Printer Bluetooth 58mm',
  },
  {
    id: 'workshop-parts',
    title: 'Bengkel & Toko Sparepart',
    category: 'Bengkel & Servis',
    targetProfile: 'Bengkel motor, toko onderdil mobil, dan service center peralatan.',
    badgeText: 'Nota Jasa & Part',
    operationalChallenges: [
      'Penggabungan biaya jasa mekanik dengan ratusan tipe suku cadang dalam satu nota.',
      'Pencatatan stok onderdil yang perputarannya cepat agar tidak kehabisan stok.',
    ],
    systemSolutions: [
      'Struk transaksi fleksibel yang memuat rincian jasa kerja dan suku cadang terkait.',
      'Audit mutasi stok masuk dan keluar secara langsung di SQLite lokal.',
    ],
    relevantFeatures: [
      'Nota Gabungan Jasa & Part',
      'Audit Mutasi Stok Masuk/Keluar',
      'Pencarian Cepat Kode Part',
      'Ekspor Laporan Penjualan',
    ],
    hardwareSetup: 'PC Desktop Windows + Barcode Scanner USB + Printer Kasir USB ESC/POS',
  },
];
