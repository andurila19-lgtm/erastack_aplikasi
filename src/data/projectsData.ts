export interface CaseStudyItem {
  id: string;
  storeName: string;
  category: 'Kafe & Kuliner' | 'Minimarket & Retail' | 'Restoran & Meja' | 'Jasa & Barbershop' | 'Fashion & Butik' | 'Bengkel & Servis';
  location: string;
  branches: string;
  highlightMetric: string;
  heroImageDesc: string;
  challenge: string;
  solution: string;
  results: { label: string; val: string }[];
  featuresUsed: string[];
  ownerQuote: string;
  ownerName: string;
  ownerRole: string;
  badgeText?: string;
}

export const CASE_STUDIES: CaseStudyItem[] = [
  {
    id: 'kopi-kenangan-senja',
    storeName: 'Kopi Kenangan Senja',
    category: 'Kafe & Kuliner',
    location: 'Bandung, Jawa Barat',
    branches: '3 Cabang Kafe',
    highlightMetric: 'Waktu Antrean Terpangkas 60%',
    heroImageDesc: 'Operasional Kasir Kafe Cepat saat Jam Ramai',
    challenge: 'WiFi kafe sering padam saat hujan lebat. Kasir online lama langsung error, antrean pesanan mengular, dan resep bahan baku kopi sering boros tanpa terpantau.',
    solution: 'Menggunakan ERASTACK POS di PC dan tablet kasir. Transaksi berjalan 100% lancar tanpa internet, takaran resep otomatis memotong stok bahan baku, dan pesanan tercetak instan via printer Bluetooth.',
    results: [
      { label: 'Waktu Antre Kasir', val: 'Turun 60%' },
      { label: 'Kenaikan Omset', val: '+35% / Bulan' },
      { label: 'Transaksi Gagal', val: '0 (Nol Error)' },
    ],
    featuresUsed: [
      'Kasir 100% Offline Tanpa Internet',
      'Pencatatan Resep & Bahan Baku',
      'Cetak Tiket Pesanan Bluetooth',
      'AI Prediksi Stok Biji Kopi Menipis',
    ],
    ownerQuote: 'Dulu kalau internet WiFi mati, kami panik setengah mati karena kasir macet. Sejak pakai ERASTACK POS, transaksi kasir jalan terus tanpa hambatan walau internet padam seharian.',
    ownerName: 'Budi Santoso',
    ownerRole: 'Owner & Founder',
    badgeText: 'Kafe Terlaris',
  },
  {
    id: 'minimarket-barokah',
    storeName: 'Minimarket Barokah Grosir',
    category: 'Minimarket & Retail',
    location: 'Surabaya, Jawa Timur',
    branches: 'Toko Retail & Grosir',
    highlightMetric: 'Akurasi Stok Barang 99.8%',
    heroImageDesc: 'Scan Barcode Cepat 14.000 SKU Barang',
    challenge: 'Memiliki lebih dari 14.000 jenis barang sembako. Kasir manual sering salah ketik harga dan sering terjadi selisih stok barang saat tutup toko di malam hari.',
    solution: 'Menghubungkan barcode scanner USB dengan ERASTACK POS. Setiap scan barang otomatis mendeteksi harga dan memotong stok di sistem dalam waktu kurang dari 2 milidetik.',
    results: [
      { label: 'Akurasi Stok Barang', val: '99.8% Akurat' },
      { label: 'Kecepatan Kasir', val: '40 Nota / Jam' },
      { label: 'Waktu Tutup Buku', val: '< 5 Menit' },
    ],
    featuresUsed: [
      'Scan Barcode USB Kilat (< 2ms)',
      'Katalog 14.000+ SKU Produk',
      'Cetak Stiker Label Harga Etalase',
      'Laporan Laba Kotor Harian 1-Klik',
    ],
    ownerQuote: 'Barcode scanner langsung membaca tanpa jeda sedikit pun. Laporan laba kotor harian langsung siap cetak saat toko tutup, tidak perlu lagi hitung manual sampai tengah malam.',
    ownerName: 'Hj. Siti Rahma',
    ownerRole: 'Pengelola Toko',
    badgeText: 'Retail Grosir',
  },
  {
    id: 'resto-bahari-seafood',
    storeName: 'Resto Ikan Bakar Bahari',
    category: 'Restoran & Meja',
    location: 'Makassar, Sulawesi Selatan',
    branches: 'Restoran Keluarga (24 Meja)',
    highlightMetric: 'Kecepatan Saji Naik 45%',
    heroImageDesc: 'Manajemen Meja Restoran & Cetak Dapur',
    challenge: 'Pelayan sering salah mencatat nomor meja dan pesanan lambat sampai ke dapur koki. Nota tagihan pelanggan sering tertukar saat jam makan malam ramai.',
    solution: 'Memanfaatkan fitur visual denah meja (Table Layout) dan split print otomatis. Pesanan makanan langsung otomatis tercetak di printer dapur dan minuman di printer bar.',
    results: [
      { label: 'Kecepatan Saji Meja', val: 'Naik 45%' },
      { label: 'Salah Antar Pesanan', val: '0 Kasus' },
      { label: 'Perputaran Meja (Turnover)', val: '+30% Lebih Cepat' },
    ],
    featuresUsed: [
      'Visual Denah Meja & Gabung Meja',
      'Split Print Tiket Koki Dapur & Bar',
      'Pisah / Gabung Tagihan (Split Bill)',
      'Rekap Menu Terfavorit Harian',
    ],
    ownerQuote: 'Pelayan tinggal tap nomor meja di tablet, pesanan langsung keluar di printer koki dapur. Sangat tertib dan pelanggan tidak pernah mengeluh salah antar menu lagi.',
    ownerName: 'Daeng Rahman',
    ownerRole: 'Pemilik Restoran',
    badgeText: 'Resto Keluarga',
  },
  {
    id: 'urban-cuts-barber',
    storeName: 'Urban Cuts Barbershop',
    category: 'Jasa & Barbershop',
    location: 'Jakarta Selatan',
    branches: '2 Outlet Barbershop',
    highlightMetric: 'Hemat Biaya Software 80%',
    heroImageDesc: 'Perhitungan Komisi Kapster Otomatis',
    challenge: 'Pemilik kesulitan menghitung bagi hasil komisi untuk 6 staf kapster setiap malam. Biaya langganan software kasir lama sangat mahal dan memotong keuntungan usaha.',
    solution: 'Beralih ke ERASTACK POS dengan lisensi gratis selamanya. Sistem secara otomatis menghitung komisi kapster sesuai paket potong rambut yang dikerjakan secara transparan.',
    results: [
      { label: 'Hemat Biaya Software', val: '80% / Tahun' },
      { label: 'Waktu Rekap Komisi', val: 'Otomatis Real-Time' },
      { label: 'Kepuasan Staf Kapster', val: '100% Transparan' },
    ],
    featuresUsed: [
      'Hitung Komisi Staf & Kapster',
      'Bebas Biaya Langganan Bulanan',
      'Laporan Riwayat Servis Pelanggan',
      'Pilihan Pembayaran Tunai & QRIS',
    ],
    ownerQuote: 'Fitur komisi kapster otomatis sangat membantu. Staf bisa cek komisi harian mereka dengan transparan, dan kami tidak perlu lagi bayar langganan software kasir bulanan yang mahal.',
    ownerName: 'Kevin Wijaya',
    ownerRole: 'Founder',
    badgeText: 'Jasa & Grooming',
  },
  {
    id: 'butik-hijab-qiana',
    storeName: 'Butik Hijab & Fashion Qiana',
    category: 'Fashion & Butik',
    location: 'Surakarta (Solo), Jawa Tengah',
    branches: 'Toko Pakaian & Hijab',
    highlightMetric: 'Omset Melonjak +40%',
    heroImageDesc: 'Manajemen Varian Warna & Ukuran Baju',
    challenge: 'Memiliki ribuan variasi warna hijab dan ukuran baju (Size S/M/L/XL). Sering kehabisan stok warna favorit pembeli tanpa disadari pengelola toko.',
    solution: 'Menggunakan fitur varian produk bertingkat di ERASTACK POS dan pengingat stok menipis dari asisten AI lokal. Label harga barcode dicetak langsung dan ditempel pada gantungan baju.',
    results: [
      { label: 'Kenaikan Omset Toko', val: '+40% / Musim' },
      { label: 'Kehilangan Penjualan', val: 'Turun 85%' },
      { label: 'Waktu Labeling Baju', val: 'Cepat & Rapi' },
    ],
    featuresUsed: [
      'Manajemen Varian Warna & Ukuran',
      'Cetak Label Stiker Barcode Baju',
      'Peringatan AI Warna Terlaris Habis',
      'Riwayat Belanja Member Pelanggan',
    ],
    ownerQuote: 'Kami jadi tahu persis warna hijab mana yang paling cepat laku dan kapan harus restock sebelum barang kosong. Pembeli senang karena pilihan warna selalu lengkap.',
    ownerName: 'Qiana Larasati',
    ownerRole: 'Owner Butik',
    badgeText: 'Fashion & Butik',
  },
  {
    id: 'bengkel-jaya-abadi',
    storeName: 'Bengkel Motor Jaya Abadi',
    category: 'Bengkel & Servis',
    location: 'Semarang, Jawa Tengah',
    branches: 'Bengkel & Toko Sparepart',
    highlightMetric: 'Efisiensi Kasir Naik 50%',
    heroImageDesc: 'Kombinasi Jasa Servis & Sparepart Motor',
    challenge: 'Kasir kesulitan menggabungkan ongkos jasa montir dengan ribuan suku cadang oli dan sparepart motor dalam satu nota yang rapi dan transparan bagi pelanggan.',
    solution: 'ERASTACK POS menggabungkan item jasa perbaikan motor dan barang onderdil dalam 1 struk pembayaran, lengkap dengan nama montir yang menangani.',
    results: [
      { label: 'Efisiensi Transaksi', val: 'Naik 50%' },
      { label: 'Keluhan Nota Pelanggan', val: '0 Keluhan' },
      { label: 'Kontrol Stok Onderdil', val: '100% Terpantau' },
    ],
    featuresUsed: [
      'Nota Gabungan Jasa & Sparepart',
      'Catatan Riwayat Servis Kendaraan',
      'Pengingat Stok Oli & Sparepart',
      'Cetak Struk Rincian Biaya Bengkel',
    ],
    ownerQuote: 'Pelanggan bengkel kami sangat puas karena nota rincian biaya jasa dan harga onderdil motor tercetak jelas dan transparan tanpa ada kecurigaan.',
    ownerName: 'Agus Purnomo',
    ownerRole: 'Kepala Bengkel',
    badgeText: 'Bengkel & Servis',
  },
];
