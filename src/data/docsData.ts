export interface DocArticle {
  id: string;
  title: string;
  category: string;
  readTime: string;
  summary: string;
  steps: {
    title: string;
    description: string;
    tips?: string;
  }[];
  relatedTopicIds?: string[];
}

export interface DocCategory {
  id: string;
  title: string;
  description: string;
  iconName: 'play' | 'receipt' | 'box' | 'printer' | 'chart' | 'help';
  articles: DocArticle[];
}

export const DOCS_DATA: DocCategory[] = [
  {
    id: 'quickstart',
    title: 'Panduan Memulai Cepat',
    description: 'Langkah awal memasang aplikasi kasir dan mengatur nama toko Anda.',
    iconName: 'play',
    articles: [
      {
        id: 'install-windows',
        title: 'Cara Pasang di Komputer / Laptop Kasir (Windows)',
        category: 'Panduan Memulai Cepat',
        readTime: '2 Menit',
        summary: 'Panduan instalasi installer resmi ERASTACK POS pada komputer PC, laptop toko, atau mesin POS layar sentuh Windows 10 & 11.',
        steps: [
          {
            title: 'Unduh File Installer Resmi',
            description: 'Buka menu Downloads di situs ERASTACK POS dan klik tombol "Unduh untuk Komputer Kasir (Windows)". File Setup berukuran 48 MB akan terunduh ke komputer Anda.',
            tips: 'Pastikan komputer Anda menggunakan Windows 10 atau 11 (64-bit).',
          },
          {
            title: 'Buka File Setup',
            description: 'Klik dua kali file ERASTACK_POS_Windows_Setup.exe pada folder Downloads komputer Anda untuk memulai proses pemasangan.',
          },
          {
            title: 'Ikuti Panduan Pemasangan',
            description: 'Klik tombol "Lanjut / Next" pada jendela pemasangan. Proses instalasi hanya memakan waktu kurang dari 30 detik.',
          },
          {
            title: 'Buka Aplikasi & Masukkan Nama Toko',
            description: 'Klik ikon ERASTACK POS di layar desktop Anda. Masukkan nama toko, alamat, dan nomor telepon yang akan dicetak di struk nota kasir.',
            tips: 'Nama toko dan alamat bisa diubah kapan saja melalui menu Pengaturan Toko.',
          },
        ],
      },
      {
        id: 'install-android',
        title: 'Cara Pasang di HP & Tablet Kasir (Android)',
        category: 'Panduan Memulai Cepat',
        readTime: '2 Menit',
        summary: 'Langkah mudah memasang aplikasi kasir ERASTACK POS di smartphone atau tablet Android untuk jualan portabel.',
        steps: [
          {
            title: 'Unduh File APK Android',
            description: 'Buka halaman Downloads langsung dari browser HP Anda dan klik tombol "Unduh untuk HP & Tablet (Android)".',
          },
          {
            title: 'Buka Notifikasi Unduhan',
            description: 'Setelah proses unduh selesai, tarik bar notifikasi HP Anda dan ketuk file ERASTACK_POS_Android.apk.',
          },
          {
            title: 'Berikan Izin Pemasangan',
            description: 'Jika HP Anda memunculkan peringatan keamanan, centang "Izinkan dari sumber ini" lalu tekan tombol "Pasang / Install".',
            tips: 'Aplikasi resmi ERASTACK 100% aman dan bebas dari virus atau iklan tersembunyi.',
          },
          {
            title: 'Mulai Transaksi Kasir',
            description: 'Buka aplikasi kasir dan Anda langsung siap mencatat penjualan pertama Anda.',
          },
        ],
      },
      {
        id: 'input-first-product',
        title: 'Cara Memasukkan Data Produk Pertama',
        category: 'Panduan Memulai Cepat',
        readTime: '3 Menit',
        summary: 'Petunjuk mengisi katalog barang, harga jual, modal pokok, dan stok awal toko Anda.',
        steps: [
          {
            title: 'Buka Menu Produk & Stok',
            description: 'Pada menu navigasi utama kasir, klik menu "Produk" lalu tekan tombol "+ Tambah Produk Baru".',
          },
          {
            title: 'Scan Barcode atau Ketik Nama Produk',
            description: 'Arahkan barcode scanner ke kemasan produk atau ketik nama produk secara manual jika barang tidak memiliki barcode.',
          },
          {
            title: 'Isi Harga Jual & Harga Modal (HPP)',
            description: 'Ketik harga jual produk ke pembeli serta harga modal dari suplier agar sistem kasir dapat menghitung laba bersih otomatis.',
            tips: 'Mengisi harga modal sangat penting agar laporan laba kotor harian Anda akurat 100%.',
          },
          {
            title: 'Tentukan Jumlah Stok Awal',
            description: 'Masukkan jumlah barang yang tersedia di rak toko saat ini, lalu klik tombol "Simpan Produk".',
          },
        ],
      },
    ],
  },
  {
    id: 'cashier-ops',
    title: 'Operasional Kasir Harian',
    description: 'Panduan melayani transaksi pembayaran tunai, QRIS, diskon, dan cetak struk nota.',
    iconName: 'receipt',
    articles: [
      {
        id: 'cash-payment',
        title: 'Melayani Pembayaran Tunai & Hitung Kembalian',
        category: 'Operasional Kasir Harian',
        readTime: '2 Menit',
        summary: 'Cara cepat melayani pembayaran uang tunai tanpa risiko salah hitung kembalian pembeli.',
        steps: [
          {
            title: 'Scan atau Pilih Produk Belanjaan',
            description: 'Scan barcode produk pembeli atau ketuk nama produk pada layar kasir. Total belanjaan akan terkalkulasi otomatis.',
          },
          {
            title: 'Tekan Tombol Bayar (F12 atau Enter)',
            description: 'Klik tombol "Bayar Tunai" atau tekan tombol pintas F12 pada keyboard komputer kasir Anda.',
          },
          {
            title: 'Pilih / Ketik Nominal Uang Pembeli',
            description: 'Pilih pecahan uang cepat (Rp 50.000, Rp 100.000) atau ketik uang yang diberikan pembeli. Jumlah uang kembalian akan langsung muncul dengan angka besar dan jelas.',
          },
          {
            title: 'Cetak Struk Nota & Buka Laci Kasir',
            description: 'Tekan tombol "Selesai", printer struk akan otomatis mencetak nota dan laci uang kasir akan terbuka secara otomatis.',
          },
        ],
      },
      {
        id: 'qris-payment',
        title: 'Menerima Pembayaran QRIS & Non-Tunai',
        category: 'Operasional Kasir Harian',
        readTime: '2 Menit',
        summary: 'Petunjuk menerima pembayaran dompet digital (GoPay, OVO, Dana, ShopeePay, BCA, Mandiri) via QRIS.',
        steps: [
          {
            title: 'Pilih Metode Bayar QRIS',
            description: 'Pada jendela pembayaran kasir, pilih opsi metode pembayaran "QRIS / Non-Tunai".',
          },
          {
            title: 'Tunjukkan Kode QR Toko',
            description: 'Arahkan pembeli untuk memindai stiker QRIS toko Anda atau QRIS yang tampil pada layar display kasir.',
          },
          {
            title: 'Konfirmasi Notifikasi Masuk',
            description: 'Setelah saldo masuk di rekening toko Anda, klik tombol "Konfirmasi Sukses" di aplikasi kasir untuk menyelesaikan nota.',
          },
        ],
      },
      {
        id: 'apply-discount',
        title: 'Memberikan Diskon Promo & Potongan Member',
        category: 'Operasional Kasir Harian',
        readTime: '2 Menit',
        summary: 'Cara memberikan diskon persentase (%), potongan rupiah (Rp), atau harga khusus pelanggan langganan.',
        steps: [
          {
            title: 'Buka Menu Diskon Transaksi',
            description: 'Klik tombol "% Diskon" pada keranjang belanja kasir.',
          },
          {
            title: 'Pilih Jenis Diskon',
            description: 'Pilih diskon persentase (misal 10%) atau ketik nominal potongan langsung (misal Rp 5.000).',
          },
          {
            title: 'Cek Rincian Tagihan',
            description: 'Sistem akan otomatis menghitung ulang total belanja setelah diskon dan menampilkan potongan harga di struk belanja pembeli.',
          },
        ],
      },
    ],
  },
  {
    id: 'inventory-management',
    title: 'Manajemen Produk & Stok',
    description: 'Cara mengatur stok masuk dari suplier, varian produk, dan cetak stiker barcode.',
    iconName: 'box',
    articles: [
      {
        id: 'stock-in-supplier',
        title: 'Mencatat Stok Masuk (Restock dari Suplier)',
        category: 'Manajemen Produk & Stok',
        readTime: '3 Menit',
        summary: 'Cara menambah jumlah stok barang ketika kiriman suplier datang agar catatan pembukuan rapi.',
        steps: [
          {
            title: 'Buka Menu Mutasi Stok',
            description: 'Masuk ke menu "Stok Barang" lalu pilih tombol "Catat Stok Masuk / Restock".',
          },
          {
            title: 'Pilih Produk yang Masuk',
            description: 'Scan barcode produk yang datang dari faktur pengiriman suplier.',
          },
          {
            title: 'Masukkan Jumlah Barang Masuk',
            description: 'Ketik jumlah unit yang diterima (misal 24 pcs atau 2 dus). Masukkan harga beli modal jika ada perubahan harga dari suplier.',
          },
          {
            title: 'Simpan Mutasi Stok',
            description: 'Klik "Simpan". Stok barang di toko Anda akan otomatis bertambah dan riwayat pembelian suplier tersimpan.',
          },
        ],
      },
      {
        id: 'product-variants',
        title: 'Membuat Produk dengan Varian (Warna / Ukuran)',
        category: 'Manajemen Produk & Stok',
        readTime: '3 Menit',
        summary: 'Petunjuk mengatur produk yang memiliki beberapa pilihan seperti rasa makanan, warna pakaian, atau ukuran baju.',
        steps: [
          {
            title: 'Aktifkan Opsi Varian',
            description: 'Saat menambah atau mengedit produk, centang opsi "Produk Ini Memiliki Varian".',
          },
          {
            title: 'Tentukan Nama Varian & Pilihan',
            description: 'Ketik jenis varian (contoh: Ukuran) dan isi pilihannya (contoh: S, M, L, XL) atau varian Rasa (contoh: Manis, Pedas, Original).',
          },
          {
            title: 'Atur Stok & Harga Masing-Masing Varian',
            description: 'Anda dapat menentukan harga dan stok terpisah untuk masing-masing varian secara fleksibel.',
          },
        ],
      },
      {
        id: 'print-barcode-labels',
        title: 'Mencetak Label Barcode & Harga Rak Etalase',
        category: 'Manajemen Produk & Stok',
        readTime: '2 Menit',
        summary: 'Cara mencetak stiker harga barcode untuk ditempel pada produk kemasan dan rak display toko.',
        steps: [
          {
            title: 'Buka Aplikasi Cetak Barcode ERASTACK',
            description: 'Buka menu "Cetak Label" atau buka aplikasi ERASTACK Label Master.',
          },
          {
            title: 'Pilih Daftar Produk yang Ingin Dicetak',
            description: 'Centang produk yang ingin dicetak label harganya dan tentukan jumlah lembar stiker.',
          },
          {
            title: 'Cetak ke Printer Stiker',
            description: 'Klik "Cetak". Label stiker barcode rapi langsung keluar dan siap ditempel di rak etalase toko.',
          },
        ],
      },
    ],
  },
  {
    id: 'hardware-setup',
    title: 'Pengaturan Printer & Alat Kasir',
    description: 'Cara menghubungkan printer thermal struk kasir, barcode scanner, dan laci uang.',
    iconName: 'printer',
    articles: [
      {
        id: 'setup-usb-printer',
        title: 'Menghubungkan Printer Struk Thermal USB',
        category: 'Pengaturan Printer & Alat Kasir',
        readTime: '2 Menit',
        summary: 'Panduan menghubungkan printer thermal kasir kabel USB (ukuran kertas 58mm atau 80mm).',
        steps: [
          {
            title: 'Colokkan Kabel USB Printer ke Komputer Kasir',
            description: 'Hubungkan kabel USB printer struk ke port USB komputer atau laptop kasir Anda, lalu nyalakan tombol power printer.',
          },
          {
            title: 'Buka Menu Pengaturan Hardware di Kasir',
            description: 'Masuk ke menu "Pengaturan" > "Printer Struk" di dalam aplikasi ERASTACK POS.',
          },
          {
            title: 'Pilih Printer & Uji Cetak',
            description: 'Pilih nama printer Anda pada daftar pilihan, tentukan ukuran kertas (58mm / 80mm), lalu klik tombol "Uji Cetak Struk".',
            tips: 'ERASTACK POS menggunakan teknologi Direct Spooler sehingga printer langsung bisa mencetak tanpa perlu CD driver rumit.',
          },
        ],
      },
      {
        id: 'setup-bluetooth-printer',
        title: 'Menghubungkan Printer Bluetooth di HP/Tablet Android',
        category: 'Pengaturan Printer & Alat Kasir',
        readTime: '2 Menit',
        summary: 'Cara menghubungkan printer thermal mini nirkabel (Bluetooth) ke HP kasir.',
        steps: [
          {
            title: 'Nyalakan Bluetooth Printer & HP Anda',
            description: 'Pastikan printer Bluetooth dalam kondisi menyala dan fitur Bluetooth di HP kasir aktif.',
          },
          {
            title: 'Sambungkan (Pairing) Printer',
            description: 'Buka menu Bluetooth HP, pilih nama printer thermal Anda, dan masukkan kode PIN pairing (biasanya 0000 atau 1234).',
          },
          {
            title: 'Pilih Printer di Aplikasi Kasir',
            description: 'Buka aplikasi ERASTACK POS, masuk ke menu Pengaturan Printer, dan pilih printer Bluetooth Anda untuk mulai mencetak nota nirkabel.',
          },
        ],
      },
      {
        id: 'setup-scanner',
        title: 'Menggunakan Barcode Scanner USB / Wireless',
        category: 'Pengaturan Printer & Alat Kasir',
        readTime: '1 Menit',
        summary: 'Petunjuk menyambungkan barcode scanner agar siap membaca kode barang toko secara instan.',
        steps: [
          {
            title: 'Colok Dongle / Kabel Scanner ke Komputer',
            description: 'Colokkan barcode scanner USB ke komputer kasir Anda. Scanner akan berbunyi "bip" tanda siap digunakan.',
          },
          {
            title: 'Langsung Scan Tanpa Pengaturan Tambahan',
            description: 'Buka layar kasir transaksi dan arahkan sinar laser scanner ke barcode produk. Barang belanjaan akan langsung masuk ke keranjang dalam sekejap.',
          },
        ],
      },
    ],
  },
  {
    id: 'closing-reports',
    title: 'Tutup Toko & Laporan Keuangan',
    description: 'Cara merekonsiliasi uang kasir tutup shift, cek laba harian, dan backup data toko.',
    iconName: 'chart',
    articles: [
      {
        id: 'close-shift-audit',
        title: 'Rekonsiliasi Tutup Shift Kasir (Audit Laci Kas)',
        category: 'Tutup Toko & Laporan Keuangan',
        readTime: '2 Menit',
        summary: 'Langkah aman mencocokkan total uang fisik di laci kasir dengan riwayat transaksi sistem saat pergantian shift.',
        steps: [
          {
            title: 'Buka Menu Tutup Shift Kasir',
            description: 'Klik tombol "Tutup Shift / Tutup Kasir" pada pojok kanan atas aplikasi kasir saat toko selesai beroperasi.',
          },
          {
            title: 'Hitung Uang Fisik di Laci Kasir',
            description: 'Hitung seluruh uang tunai yang ada di dalam laci kasir, lalu ketik jumlah uang fisik ke dalam kolom verifikasi.',
          },
          {
            title: 'Cek Selisih Kas Otomatis',
            description: 'Sistem akan otomatis mencocokkan uang fisik dengan total nota penjualan. Jika ada selisih, sistem akan menampilkannya secara transparan.',
          },
          {
            title: 'Cetak Laporan Rekap Shift',
            description: 'Klik "Cetak Struk Rekap", printer akan mencetak ringkasan total omset, pembayaran tunai, QRIS, dan laba hari ini untuk arsip pemilik toko.',
          },
        ],
      },
      {
        id: 'daily-profit-report',
        title: 'Mengecek Laporan Laba Bersih & Omset Harian',
        category: 'Tutup Toko & Laporan Keuangan',
        readTime: '2 Menit',
        summary: 'Cara melihat ringkasan omset penjualan, harga pokok modal (HPP), dan margin keuntungan bersih toko.',
        steps: [
          {
            title: 'Buka Menu Laporan Penjualan',
            description: 'Masuk ke menu "Laporan" pada dashboard kasir.',
          },
          {
            title: 'Pilih Rentang Tanggal',
            description: 'Pilih laporan Hari Ini, 7 Hari Terakhir, Bulan Ini, atau tentukan rentang tanggal kustom sesuai keinginan Anda.',
          },
          {
            title: 'Lihat Rincian Laba & Produk Terlaris',
            description: 'Anda dapat melihat grafik omset, rincian margin laba bersih, serta daftar 10 produk paling laku di toko Anda.',
          },
        ],
      },
      {
        id: 'backup-database',
        title: 'Mencadangkan (Backup) Data Toko ke Flashdisk / Google Drive',
        category: 'Tutup Toko & Laporan Keuangan',
        readTime: '2 Menit',
        summary: 'Langkah mudah mengamankan seluruh riwayat transaksi dan data barang toko agar tidak hilang jika komputer rusak.',
        steps: [
          {
            title: 'Buka Menu Pengaturan Backup',
            description: 'Masuk ke menu "Pengaturan" > "Cadangan Data / Backup".',
          },
          {
            title: 'Klik Tombol Buat Cadangan Data',
            description: 'Klik tombol "Backup Data Sekarang". Sistem akan membuat 1 file arsip database toko Anda.',
          },
          {
            title: 'Simpan File Cadangan ke Flashdisk atau Cloud',
            description: 'Salin file backup tersebut ke flashdisk atau Google Drive Anda. Jika Anda berganti komputer kasir baru, data toko bisa dipulihkan kembali hanya dengan 1 klik.',
            tips: 'Disarankan melakukan backup data toko secara berkala seminggu sekali.',
          },
        ],
      },
    ],
  },
  {
    id: 'troubleshooting',
    title: 'Tanya Jawab & Solusi Kendala',
    description: 'Jawaban atas pertanyaan umum dan solusi cepat jika menemui kendala di toko.',
    iconName: 'help',
    articles: [
      {
        id: 'printer-not-printing',
        title: 'Apa yang Harus Dilakukan Jika Printer Tidak Mencetak?',
        category: 'Tanya Jawab & Solusi Kendala',
        readTime: '2 Menit',
        summary: 'Langkah praktis memperbaiki kendala printer thermal yang tidak mengeluarkan kertas struk.',
        steps: [
          {
            title: 'Periksa Kabel Power & Lampu Indikator',
            description: 'Pastikan lampu power printer menyala (berwarna biru/hijau). Jika lampu berwarna merah berkedip, periksa apakah kertas struk habis atau penutup printer belum tertutup rapat.',
          },
          {
            title: 'Cek Pemasangan Gulungan Kertas Thermal',
            description: 'Pastikan kertas thermal tidak terpasang terbalik. Sisi kertas yang licin/sensitif panas harus menghadap ke arah kepala pemanas printer.',
          },
          {
            title: 'Lakukan Uji Cetak di Aplikasi',
            description: 'Buka menu Pengaturan Printer di ERASTACK POS dan klik tombol "Uji Cetak Struk". Jika masih terkendala, hubungi tim bantuan teknis kami via WhatsApp.',
          },
        ],
      },
      {
        id: 'power-outage-safe',
        title: 'Apakah Data Transaksi Aman Jika Komputer Tiba-Tiba Mati Lampu?',
        category: 'Tanya Jawab & Solusi Kendala',
        readTime: '1 Menit',
        summary: 'Penjelasan perlindungan data transaksi toko dari bahaya mati listrik mendadak.',
        steps: [
          {
            title: 'Sistem Proteksi Otomatis',
            description: 'ERASTACK POS dilengkapi teknologi pencatatan aman SQLite WAL. Setiap transaksi yang selesai langsung tersimpan secara permanen di media penyimpanan komputer dalam hitungan milidetik.',
          },
          {
            title: 'Nyalakan Kembali Komputer Kasir',
            description: 'Saat listrik kembali menyala, Anda cukup membuka kembali aplikasi kasir. Seluruh data transaksi, stok barang, dan saldo kasir akan kembali utuh tanpa ada yang rusak atau hilang.',
          },
        ],
      },
      {
        id: 'change-device',
        title: 'Bagaimana Cara Memindahkan Data Toko ke Laptop / Komputer Baru?',
        category: 'Tanya Jawab & Solusi Kendala',
        readTime: '2 Menit',
        summary: 'Panduan migrasi data saat toko mengupgrade komputer kasir baru.',
        steps: [
          {
            title: 'Lakukan Backup di Komputer Lama',
            description: 'Di komputer lama, buka menu Pengaturan > Cadangan Data, lalu klik "Backup Data" dan simpan file backup ke flashdisk.',
          },
          {
            title: 'Pasang ERASTACK POS di Komputer Baru',
            description: 'Unduh dan pasang aplikasi ERASTACK POS di komputer kasir baru Anda.',
          },
          {
            title: 'Pilih Pulihkan Data (Restore)',
            description: 'Di komputer baru, buka menu Pengaturan > Pulihkan Data, lalu pilih file backup dari flashdisk Anda. Seluruh katalog produk, stok, dan riwayat penjualan akan langsung berpindah secara sempurna.',
          },
        ],
      },
    ],
  },
];
