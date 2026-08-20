# ERASTACK Design System & Visual Specification

> **Status:** Active / Design Source of Truth  
> **Versi:** 1.0.0  
> **Tanggal Pembaruan:** 20 Agustus 2026  
> **Klasifikasi:** Design Token & Component Standard  
> **Referensi Utama:** `UIUX DAN REPO.zip` (104 Asset Visual, Color Palettes, UX Rules, AI Cards, Dashboard Patterns)  

---

## 1. Design Philosophy

**ERASTACK Design System** dibangun di atas filosofi **"Industrial Precision, Minimalist Weight, Maximum Humanity"**. 

Setiap elemen antarmuka dirancang bukan sekadar untuk terlihat modern, melainkan untuk memberikan efisiensi kognitif tertinggi, respons seketika, dan kenyamanan visual jangka panjang bagi para rekayasawan (*engineers*) maupun operator bisnis (*cashiers & retail operators*). Desain menghormati sumber daya perangkat pengguna dengan memprioritaskan render berbasis CSS murni, arsitektur warna semantik yang konsisten, dan interaksi yang ergonomis.

---

## 2. Visual Direction

Arah visual ERASTACK mengusung tema **"Dark-First Precision Engineering"**:
- **Palet Gelap yang Dalam & Lembut (*Onyx & Carbon Surfaces*):** Mengurangi kelelahan mata, memberikan kontras tinggi bagi data tabular dan metrik finansial, serta menghadirkan estetika premium ala developer tools modern.
- **Aksen Neon Cerdas (*Electric Blue & Vivid Lime Accents*):** Digunakan secara terukur untuk menonjolkan aksi utama (*Primary CTA*), status sistem, dan elemen analitik AI.
- **Batas Presisi (*Subtle Technical Borders*):** Menggunakan garis tepi halus 1px dengan opasitas rendah untuk memisahkan hierarki konten tanpa menambah beban visual.
- **Kedalaman Berjenjang (*Surface Elevation Layers*):** Membedakan latar belakang, kartu konten, modal popup, dan popover menggunakan elevasi warna permukaan bertingkat.

---

## 3. Design Principles

1. **Clarity Over Clutter (Hick's Law):** Kurangi pilihan yang tidak perlu. Tampilkan opsi paling relevan secara eksplisit dan gunakan *progressive disclosure* untuk fungsi lanjutan.
2. **Distinctive Focus (Von Restorff Effect):** Buat elemen terpenting (seperti tombol checkout, status kritis, atau paket rekomendasi) langsung menonjol melalui kontras warna dan border beraksen.
3. **Ergonomic Touch Targets (Fitts's Law):** Semua area klik dan sentuh pada mobile maupun desktop kasir memiliki ukuran target minimal $44\text{px}$ hingga $48\text{px}$ dengan padding memadai.
4. **Instant Perceptual Feedback (Doherty Threshold):** Respon interaksi pengguna harus terjadi dalam $< 100\text{ms}$ (hover, active, focus) dan feedback sistem tidak boleh melebihi $400\text{ms}$.
5. **Semantic Grouping (Law of Proximity):** Elemen yang saling berhubungan diletakkan dalam kontainer visual yang sama dengan spasi internal yang proporsional.
6. **Zero Cosmetic Bloat:** Hindari efek grafis berat yang mengorbankan framerate dan performa baterai.

---

## 4. Brand Personality

- **Teknis & Otoritatif:** Memancarkan keandalan rekayasa software tingkat lanjut.
- **Cepat & Tangkas:** Menghadirkan kesan ringan dan zero-latency pada setiap interaksi.
- **Modern & Berorientasi Masa Depan:** Mengintegrasikan pola interaksi AI yang bersih dan natural.
- **Jujur & Transparan:** Informasi teknis, ukuran file, status koneksi offline, dan hash checksum disajikan gamblang tanpa disembunyikan.

---

## 5. Color System

Sistem warna ERASTACK menggunakan **Semantic Design Tokens**. Penggunaan warna wajib merujuk pada token semantik, bukan kode HEX sembarangan di tingkat komponen.

### 5.1. Core Palette Tokens

```css
:root {
  /* Surface & Background */
  --bg-canvas: #090A0F;            /* Latar belakang utama (Deep Onyx) */
  --bg-surface: #12141C;           /* Permukaan kartu & kontainer level 1 */
  --bg-surface-elevated: #1B1E2B;  /* Permukaan modal, dropdown, header level 2 */
  --bg-surface-hover: #24283A;     /* State hover pada baris/kartu */
  --bg-surface-active: #2D3249;    /* State active / pressed */

  /* Text & Foreground */
  --text-primary: #F3F4F6;         /* Teks utama, judul, nilai penting */
  --text-secondary: #9CA3AF;       /* Teks deskripsi, label sekunder */
  --text-muted: #6B7280;           /* Teks placeholder, caption, disabled */
  --text-inverse: #090A0F;         /* Teks di atas latar belakang terang/aksen */

  /* Primary Brand & Actions */
  --brand-primary: #3B82F6;        /* Electric Blue (Aksi utama, tombol primer) */
  --brand-primary-hover: #2563EB;  /* State hover primer */
  --brand-primary-glow: rgba(59, 130, 246, 0.25);

  /* Accent & AI Highlight */
  --accent-lime: #C6FF34;          /* Vivid Lime (Highlight AI, indikator aktif, chip khusus) */
  --accent-lime-muted: rgba(198, 255, 52, 0.15);
  --accent-cyan: #38BDF8;          /* Candy Blue / Cyan untuk metrik dan link */

  /* Borders & Dividers */
  --border-subtle: rgba(255, 255, 255, 0.08); /* Garis tepi pemisah standar */
  --border-strong: rgba(255, 255, 255, 0.16); /* Garis tepi kartu aktif/input focus */
  --border-focus: #3B82F6;                     /* Focus outline border */

  /* Feedback & Status Colors */
  --status-success: #10B981;       /* Hijau transaksi sukses / koneksi normal */
  --status-success-bg: rgba(16, 185, 129, 0.12);
  --status-warning: #F59E0B;       /* Kuning low stock / peringatan offline */
  --status-warning-bg: rgba(245, 158, 11, 0.12);
  --status-error: #EF4444;         /* Merah error validasi / transaksi gagal */
  --status-error-bg: rgba(239, 68, 68, 0.12);
  --status-info: #0EA5E9;          /* Biru informasi */
  --status-info-bg: rgba(14, 165, 233, 0.12);
}
```

---

## 6. Typography System

Menggunakan font sistem modern berkarakter teknis (*Inter* untuk antarmuka UI umum, dan *JetBrains Mono / Fira Code* untuk angka tabular, SKU, kode program, dan checksum).

| Tingkat Tipografi | Ukuran (Size) | Bobot (Weight) | Line Height | Letter Spacing | Kegunaan |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Display 1** | $40\text{px}$ ($2.5\text{rem}$) | Bold (700) | $1.2$ | $-0.02\text{em}$ | Hero Headline Platform |
| **Heading 1 (H1)**| $32\text{px}$ ($2.0\text{rem}$) | Bold (700) | $1.25$ | $-0.015\text{em}$| Judul Halaman Utama |
| **Heading 2 (H2)**| $24\text{px}$ ($1.5\text{rem}$) | SemiBold (600) | $1.3$ | $-0.01\text{em}$| Judul Section & Modul |
| **Heading 3 (H3)**| $18\text{px}$ ($1.125\text{rem}$)| SemiBold (600)| $1.4$ | $0$ | Judul Kartu & Dialog |
| **Body Large** | $16\text{px}$ ($1.0\text{rem}$) | Regular / Medium | $1.5$ | $0$ | Paragraf Pengantar |
| **Body Regular** | $14\text{px}$ ($0.875\text{rem}$)| Regular (400) | $1.5$ | $0$ | Teks Utama, Form, Tabel |
| **Body Small** | $12\text{px}$ ($0.75\text{rem}$) | Regular / Medium | $1.4$ | $+0.01\text{em}$ | Caption, Tooltip, Badge |
| **Code / Tabular** | $13\text{px}$ ($0.8125\text{rem}$)| Mono (500) | $1.4$ | $0$ | Nilai Uang POS, SKU, Hash |

---

## 7. Spacing System

Sistem spasi berbasis kelipatan **4px / 8px Grid System**:

```css
--space-1: 4px;    /* Micro spacing, padding badge */
--space-2: 8px;    /* Gap antar ikon dan teks */
--space-3: 12px;   /* Padding elemen compact */
--space-4: 16px;   /* Padding standar kartu & input */
--space-5: 20px;   /* Gap form fields */
--space-6: 24px;   /* Padding kontainer modul */
--space-8: 32px;   /* Jarak antar section kecil */
--space-12: 48px;  /* Jarak antar modul utama */
--space-16: 64px;  /* Spasi section besar homepage */
```

---

## 8. Border Radius Tokens

```css
--radius-sm: 6px;   /* Badges, tags, small inputs */
--radius-md: 8px;   /* Buttons, standard inputs, list items */
--radius-lg: 12px;  /* Cards, dropdowns, table containers */
--radius-xl: 16px;  /* Dialogs, modals, featured panels */
--radius-full: 9999px; /* Pill badges, avatar, circular buttons */
```

---

## 9. Shadows & Elevation

Menghindari bayangan blur berlebihan yang berat saat di-render. Gunakan bayangan halus terarah yang dikombinasikan dengan border:

```css
--shadow-sm: 0 1px 2px 0 rgba(0, 0, 0, 0.4);
--shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.5), 0 2px 4px -2px rgba(0, 0, 0, 0.4);
--shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.6), 0 4px 6px -4px rgba(0, 0, 0, 0.5);
--shadow-glow-primary: 0 0 20px rgba(59, 130, 246, 0.2);
--shadow-glow-lime: 0 0 18px rgba(198, 255, 52, 0.25);
```

---

## 10. Borders & Dividers

- Default: `1px solid var(--border-subtle)`
- Active / Selected: `1px solid var(--brand-primary)`
- Highlight / Recommended: `1.5px solid var(--accent-lime)`
- Error State: `1px solid var(--status-error)`

---

## 11. Iconography Guidelines

- Gunakan pustaka ikon berbasis SVG garis bersih (*stroke-based outline icons* dengan bobot 1.5px hingga 2px).
- Ukuran standar:
  - Small / Inline: $16\times 16\text{px}$
  - Standard / Button: $20\times 20\text{px}$
  - Large / Feature Header: $24\times 24\text{px}$
  - Showcase / Hero Card: $32\times 32\text{px}$
- Ikon wajib memiliki `aria-hidden="true"` jika bersifat dekoratif atau label teks alternatif eksplisit jika bersifat interaktif.

---

## 12. Buttons Specification

### 12.1. Button Variants
1. **Primary Button:** Latar belakang `var(--brand-primary)`, teks putih pekat, sedikit efek glow saat hover. Digunakan untuk aksi tunggal utama (e.g., *Bayar Sekarang*, *Download EXE*).
2. **Secondary Button:** Latar belakang `var(--bg-surface-elevated)`, border `var(--border-subtle)`, teks `var(--text-primary)`. Digunakan untuk aksi pendukung.
3. **Accent / AI Button:** Latar belakang `var(--accent-lime)`, teks `var(--bg-canvas)` (tebal), efek glow lime. Digunakan untuk eksekusi AI dan rekomendasi pro.
4. **Danger Button:** Latar belakang `var(--status-error)`, teks putih. Digunakan untuk aksi destruktif (*Void Transaksi*, *Hapus Data*).
5. **Ghost / Icon Button:** Latar transparan, latar muncul saat hover.

### 12.2. Interactive States
- **Normal:** Opasitas 100%, kursor pointer.
- **Hover:** Brightness +10%, transformasi mikro `translateY(-1px)`.
- **Active / Pressed:** Transformasi `scale(0.98)`, glow menyusut.
- **Disabled:** Opasitas 40%, kursor `not-allowed`, event klik dimatikan.
- **Loading:** Teks disembunyikan, spinner SVG berputar halus di tengah.

---

## 13. Inputs & Form Controls

Berdasarkan analisis aturan UX dari koleksi referensi:

1. **Clear Hint Placeholders:** Placeholder bukan pengganti label. Placeholder wajib memberikan contoh format nyata yang membantu (contoh: input cari produk: `"Scan barcode atau ketik nama produk..."`, bukan hanya `"Cari"`).
2. **Direct Radio Selection:** Jika pilihan hanya berjumlah 2 hingga 3 nilai (misal: *Metode Pembayaran: Tunai / QRIS / Transfer*), gunakan tombol radio / segment kontrol visual langsung. **Jangan sembunyikan dalam dropdown menu kecil**.
3. **Discrete Verification / Code Inputs:** Untuk input PIN Kasir atau kode OTP, gunakan kotak input terpisah per karakter (4 atau 6 box terpisah) dengan auto-advance focus.
4. **Touch-Optimized Time & Quantity Pickers:** Pada layar tablet/mobile kasir, gunakan kontrol swipe/stepper sentuh (`+` dan `-` besar) daripada dropdown jam yang sulit ditekan.
5. **Granular Password / Validation Feedback:** Indikator checklist visual real-time (panjang karakter, huruf besar, angka, simbol) dengan ikon ceklis hijau / silang merah di bawah field.

---

## 14. Cards & Containers

- **Standard Card:** Latar `var(--bg-surface)`, border `var(--border-subtle)`, radius `var(--radius-lg)`, padding `var(--space-5)`.
- **Interactive / Clickable Card:** Menambahkan transisi `border-color` ke `var(--border-strong)` dan bayangan `var(--shadow-md)` saat hover.
- **Spotlight / Recommended Tier Card (Von Restorff):** Menggunakan border `var(--brand-primary)` atau `var(--accent-lime)` dengan badge *"Paling Direkomendasikan"* di pojok atas.

---

## 15. Badges & Chips

- **Format:** Tinggi $24\text{px}$, radius `var(--radius-full)`, padding horizontal $8\text{px}$, font-size $12\text{px}$, font-weight 600.
- **Tipe Semantik:**
  - `Platform Badge`: Latar semi-transparan dengan border tipis (e.g., `Windows`, `Android`).
  - `Stability Badge`: Hijau untuk `Stable`, Ungu untuk `Beta`, Abu-abu untuk `Archived`.
  - `Status Dot Badge`: Dot berkedip halus hijau untuk `Online / Ready` dan kuning untuk `Offline Mode Active`.

---

## 16. Dialogs & Modal Popups

- **Backdrop:** Latar semi-gelap `rgba(0, 0, 0, 0.75)` dengan filter CSS `backdrop-filter: blur(4px)`.
- **Modal Box:** Latar `var(--bg-surface-elevated)`, border `var(--border-strong)`, radius `var(--radius-xl)`, bayangan `var(--shadow-lg)`.
- **Keyboard Handling:** Tombol `Escape` wajib menutup dialog, fokus keyboard terkurung di dalam modal (*focus trap*).

---

## 17. Dropdowns & Popovers

- Animasi buka cepat (durasi 150ms dengan `opacity` dan `scale(0.95 -> 1)`).
- Penutupan otomatis saat klik di luar area (*click outside listener*).
- Z-index terkontrol secara global (`z-index: 50` untuk dropdown, `z-index: 100` untuk modal dialog).

---

## 18. Tabs & Segmented Controls

- Desain kapsul gelap terpadu (*segmented pills*).
- Tab aktif menggunakan latar `var(--bg-surface-elevated)` dengan teks putih tebal, tab tidak aktif menggunakan teks `var(--text-secondary)`.

---

## 19. Global Navigation Layout

Layout desktop mengusung struktur header presisi dengan ketinggian tetap $64\text{px}$, background ter-blur saat scroll (`backdrop-filter: blur(12px)`), logo brand dengan badge versi di sisi kiri, menu navigasi di tengah, serta tombol aksi cepat (Download & Command Palette) di sisi kanan.

---

## 20. Sidebar Navigation (Aplikasi Desktop & Dashboard)

- Ketinggian 100vh penuh, lebar tetap $240\text{px}$ (dapat di-collapse menjadi $64\text{px}$ icon-only).
- Menu terkelompok rapi: *Kasir, Inventaris, Transaksi, Laporan, AI Assistant, Pengaturan*.
- Indikator aktif berupa strip vertikal biru `3px` di sisi kiri menu item yang sedang dipilih.

---

## 21. Topbar Controls

- Menampilkan indikator status koneksi (*Offline / Online Sync Status*).
- Jam real-time dan identitas kasir yang bertugas.
- Tombol akses cepat ke laci kas (*Cash Drawer Trigger*) dan kalkulator darurat.

---

## 22. Tables (Data Tabular & Inventory)

- Header tabel (`<th>`) sticky dengan latar `var(--bg-surface-elevated)`, teks uppercase $11\text{px}$ semi-bold, warna `var(--text-muted)`.
- Baris tabel (`<tr>`) dengan pemisah garis tipis `var(--border-subtle)`, efek hover baris `var(--bg-surface-hover)`.
- Kolom angka (harga, stok, total) wajib rata kanan (*right-aligned*) menggunakan font monospace (`font-variant-numeric: tabular-nums`).

---

## 23. Dashboard Cards (KPI Metrics)

- Terdiri dari 4 elemen inti: Label Metrik, Nilai Utama (Font tebal besar), Badge Tren ($\pm\%$ dibanding periode lalu dengan warna hijau/merah), dan Ikon Penjelas mini.
- Menghindari grafik berukuran raksasa jika angka metrik dapat disajikan lebih ringkas.

---

## 24. Lightweight Charts

- Visualisasi grafik dibangun murni menggunakan elemen **SVG ringan atau CSS Bar Charts** (tanpa memuat runtime charting raksasa seperti Chart.js penuh jika hanya menampilkan grafik garis omset sederhana).
- Garis tren menggunakan kurva SVG bergradasi halus ke transparan di bawah garis.
- Tooltip interaktif instan saat cursor melintasi titik data (*datapoint hover*).

---

## 25. Empty States

- Menghindari halaman kosong tanpa petunjuk.
- Komposisi Empty State:
  1. Ikon ilustratif sederhana bernuansa muted.
  2. Judul ringkas penjelas keadaan (contoh: *"Belum Ada Transaksi Hari Ini"*).
  3. Deskripsi pendek (contoh: *"Buka modul kasir untuk mulai memindai barcode produk"*).
  4. Tombol aksi langsung (*Primary CTA*).

---

## 26. Loading States (Skeleton Loaders)

- Dilarang menggunakan spinner fullscreen berputar terus-menerus yang memicu kecemasan pengguna.
- Gunakan **Skeleton Shimmer Screens** berbasis CSS animasi pulsa halus yang merefleksikan layout akhir komponen (tabel, kartu, teks).

---

## 27. Error States & Form Validation

- Tampilkan pesan error secara presisi tepat di tempat terjadinya kesalahan (*in-context inline error*), bukan di alertbox terpisah yang jauh.
- Berikan instruksi solusi yang jelas (contoh: bukan hanya *"Format salah"*, melainkan *"Nomor barcode harus terdiri dari 8-13 digit angka"*).
- Border input berubah menjadi `var(--status-error)` dan teks pembantu berwarna merah terang muncul seketika.

---

## 28. Notifications & Toast System

- Toast muncul di pojok kanan bawah (desktop) atau tengah atas (mobile).
- Auto-dismiss dalam waktu 4 detik untuk notifikasi sukses, dan tetap bertahan sampai ditutup manual untuk notifikasi error fatal.
- Ikon status terintegrasi (Checklist, Warning Triangle, Info Circle).

---

## 29. Command Menu (Universal Palette)

- Terbuka via `Cmd+K` atau `Ctrl+K`.
- Input pencarian berukuran besar dengan ikon kaca pembesar dan tombol pintas `Esc`.
- Hasil terbagi dalam kategori: *Aplikasi, Dokumen, Download, Perintah Cepat*.
- Navigasi keyboard penuh menggunakan tombol panah atas/bawah dan `Enter`.

---

## 30. AI Interface & Conversational Elements

- **Card Chat Bubble:** Percakapan AI dibedakan secara tegas dengan pengguna (bubble pengguna: latar gelap dengan border subtle; respon AI: beraksen neon lime tipis di sisi kiri kartu).
- **Tool Execution Pill:** Menampilkan indikator saat AI memanggil tool analitik (contoh: `⚡ Menjalankan getSalesSummary()...`).
- **Structured Data Output:** Respon analitik AI diformat dalam kartu ringkasan terstruktur, tabel ringkas, atau poin rekomendasi bernomor, bukan sekadar dinding teks naratif panjang.

---

## 31. Mobile Design Guidelines

- Area navigasi bawah (*Bottom Navigation Bar*) untuk fungsi yang paling sering diakses ibu jari.
- Modal berupa *Bottom Sheet* yang dapat di-swipe ke bawah untuk menutup.
- Target sentuh tombol $\ge 48\text{px}$ dengan spasi antar tombol minimal $8\text{px}$ untuk mencegah salah pencet (*fat finger error*).

---

## 32. Desktop Design Guidelines

- Pemanfaatan ruang horizontal melalui multi-kolom split layout (e.g., Kolom Kiri: Katalog Produk & Filter; Kolom Kanan: Keranjang Belanja & Panel Checkout Kasir).
- Akses shortcut keyboard lengkap (contoh: `F1` Bantuan, `F2` Cari Produk, `F4` Bayar Tunai, `F9` Cetak Struk Ulang).

---

## 33. Responsive Breakpoints

```css
/* Mobile Small */
@media (min-width: 360px) { ... }

/* Mobile Large & Phablet */
@media (min-width: 480px) { ... }

/* Tablet Portrait */
@media (min-width: 768px) { ... }

/* Laptop & Desktop Small */
@media (min-width: 1024px) { ... }

/* Desktop Large / POS Station */
@media (min-width: 1280px) { ... }

/* Ultrawide Monitor */
@media (min-width: 1536px) { ... }
```

---

## 34. Accessibility (a11y) Standards

- Seluruh elemen interaktif memiliki outline fokus yang terlihat (`outline: 2px solid var(--brand-primary); outline-offset: 2px`).
- Pengujian kontras rasio warna selalu lolos kualifikasi WCAG AA ($\ge 4.5:1$ untuk teks normal).
- Mendukung preferensi sistem `prefers-reduced-motion: reduce` untuk mematikan seluruh animasi transisi bagi pengguna yang sensitif terhadap gerakan.

---

## 35. Motion & Micro-Animations (Lightweight Engine)

Animasi dirancang sangat hemat daya dan dieksekusi murni via GPU compositor:
- **Properti yang Diizinkan:** Hanya menggerakkan `transform` dan `opacity`. Hindari menganimasi `width`, `height`, `margin`, `padding`, atau `top/left` yang memicu layout recalculation / reflow.
- **Durasi Standar:**
  - Micro-interaction (Hover/Click): $100\text{ms} - 150\text{ms}$ (`ease-out`).
  - Dropdown & Popover: $150\text{ms} - 200\text{ms}$ (`cubic-bezier(0.16, 1, 0.3, 1)`).
  - Modal & Sheet Entrance: $250\text{ms} - 300\text{ms}$ (`cubic-bezier(0.16, 1, 0.3, 1)`).

---

## 36. Performance Design Rules

1. **Zero Unoptimized Heavy Assets:** Seluruh gambar hero dan ikon dikonversi ke format WebP / SVG terkompresi.
2. **Font Subsetting:** Hanya memuat glyph font karakter Latin yang benar-benar digunakan untuk menghemat puluhan kilobyte.
3. **No Heavy Animation Libs:** Dilarang mengimpor library animasi ratusan kilobyte jika cukup diselesaikan dengan 10 baris CSS transitions.

---

## 37. Component Composition Rules

Setiap komponen harus bersifat atomik, mandiri, dan dapat dikomposisikan secara bersarang (*nested composition*):
- `Card` tersusun dari `CardHeader`, `CardTitle`, `CardContent`, dan `CardFooter`.
- `Table` tersusun dari `TableContainer`, `TableHeader`, `TableBody`, `TableRow`, `TableCell`.
- Seluruh properti varian dikendalikan via props semantik terstandarisasi.

---

## 38. Comprehensive UX Do / Don't Guide

| Kategori UX | DO (Praktik Terbaik) | DON'T (Dilarang Keras) |
| :--- | :--- | :--- |
| **Search Placeholder** | Berikan contoh entri nyata: `"Cari SKU, Nama Barang, atau Barcode..."` | Menggunakan kata generik polos `"Search..."` tanpa konteks |
| **Pilihan 2-3 Nilai** | Tampilkan tombol segment/radio terlihat langsung | Menyembunyikan 2 opsi sederhana di dalam dropdown select |
| **Input Kode / OTP** | Gunakan kotak input karakter terpisah dengan auto-focus | Mengharuskan pengguna mengetik di satu text field biasa |
| **Pilihan Waktu Kasir**| Gunakan picker sentuh ergonomis / quick buttons | Memasang 3 dropdown kecil (Jam, Menit, AM/PM) bertumpuk |
| **Validasi Error** | Tunjukkan langsung di samping field bermasalah dengan solusi | Menampilkan alert error global yang tidak menyebutkan letak salah |
| **Tier Rekomendasi**| Berikan border aksen mencolok & badge pembeda (*Von Restorff*) | Menyamakan seluruh kartu harga sehingga membingungkan |
| **Feedback Tombol** | Berikan visual click depression & disabled state saat loading | Membiarkan tombol dapat diklik berkali-kali saat proses simpan |

---

## 39. Design Tokens Export Matrix

```css
/* ERASTACK Global CSS Variables Export */
:root {
  --font-sans: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  --font-mono: 'JetBrains Mono', 'Fira Code', monospace;

  /* Palette Mapping */
  --color-canvas: var(--bg-canvas);
  --color-surface: var(--bg-surface);
  --color-surface-elevated: var(--bg-surface-elevated);
  --color-primary: var(--brand-primary);
  --color-lime: var(--accent-lime);
  --color-border: var(--border-subtle);
  
  /* Radii */
  --r-sm: var(--radius-sm);
  --r-md: var(--radius-md);
  --r-lg: var(--radius-lg);
  --r-xl: var(--radius-xl);

  /* Transitions */
  --ease-spring: cubic-bezier(0.16, 1, 0.3, 1);
  --duration-fast: 150ms;
  --duration-normal: 250ms;
}
```

---

## 40. Visual Reference Mapping dari Repository `UIUX DAN REPO.zip`

Berikut adalah pemetaan langsung dari 104 file referensi visual yang dianalisis:

| Kategori Referensi | Sumber Analisis Visual | Terjemahan ke ERASTACK Design System |
| :--- | :--- | :--- |
| **1. Brand & Palette** | Dyslove design cards (`Onyx #020202`, `Carbon #171717`, `Candy Blue #B2D5E5`, `Lime #C6FF34`) | Diadopsi sebagai palet dasar semantik `--bg-canvas`, `--bg-surface`, `--accent-lime`, dan `--accent-cyan`. |
| **2. SaaS & Dev Tools** | `OmniRoute` provider switch dashboard, `Cal.com` dark calendar, `OpenSEO` dashboard | Diadopsi untuk layout status indicator, API provider switcher, tag badge pills, dan table density. |
| **3. AI Interfaces** | Kartu presentasi AI (`Gamma`, `Pitch`, `Ideogram`, `FLUX`, `Midjourney`) | Menginspirasi layout showcase produk di AI Lab, border glow halus, dan kartu fitur modular. |
| **4. UX Best Practices** | Serial Ebook Wadhah Aloui (20 UX Dos & Don'ts, Search Placeholders, OTP inputs, error validation) | Diformalkan sebagai aturan baku pada Bab 13 (Inputs) dan Bab 38 (Do / Don't Matrix). |
| **5. Cognitive Psychology**| Infografis Vamshi.work (Hick's Law, Von Restorff, Fitts's Law, Miller's Law, Doherty Threshold) | Menjadi acuan kuantitatif dalam penentuan target sentuh $\ge 44\text{px}$, latensi feedback $< 100\text{ms}$, dan pembatasan pilihan navigasi. |
| **6. Mobile Case Study** | Studi kasus BuildWithAngga & KAI Access auto seat selection flow | Menginspirasi alur kasir POS: pemilihan cepat otomatis, banner notifikasi ramah, dan ringkasan order sticky. |
| **7. Vector Geometry** | Izumi Graphic boolean exclude patterns & neon purple-black contrast | Digunakan sebagai aksen grafis latar belakang hero banner dan ikon vektor modular. |
