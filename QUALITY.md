# ERASTACK Quality Assurance & Anti-AI-Slop Specification

> **Status:** Mandatory Quality Directive  
> **Target:** Desainer UI/UX, Software Engineers, & Seluruh AI Coding Agents  
> **Tujuan:** Menolak pola desain/kode generik (*AI Slop*) dan menegakkan standar rekayasa berstandar manusia (*Human-Designed Craftsmanship*).  

---

## 1. Filosofi & Latar Belakang

AI modern sering kali menghasilkan antarmuka dan teks yang tampak "ramai dan berkilau di permukaan", namun rapuh, monoton, membingungkan, dan tidak memiliki nilai guna nyata. Fenomena ini disebut sebagai **AI Slop**.

Pada ekosistem **ERASTACK**, setiap piksel, komponen, dan kalimat harus memiliki alasan keberadaan yang logis (*intentional design*). Desain harus terasa seperti dirancang oleh **Principal Product Designer dan Senior Systems Engineer berpengalaman**, bukan template instan hasil prompt dangkal.

---

## 2. Matriks Komparasi: AI Slop vs. Human-Designed

```
┌───────────────────────────────────────────────────────────────────────────┐
│                          PERBEDAAN FUNDAMENTAL                            │
├─────────────────────────────────────┬─────────────────────────────────────┤
│ ❌ AI SLOP (DITOLAK KERAS)          │ ✅ HUMAN-DESIGNED (STANDAR ERASTACK)│
├─────────────────────────────────────┼─────────────────────────────────────┤
│ • Gaya kosmetik berlebihan          │ • Fungsional, presisi, & ergonomis  │
│ • Semua section berbentuk 3-card    │ • Layout dinamis mengikuti konten   │
│ • Buzzword kosong (seamless, magic) │ • Bahasa teknis jelas, faktual, jujur│
│ • Efek blur & glassmorphism acak    │ • Elevasi warna semantik terstruktur │
│ • Mobile hanya desktop diperkecil   │ • Pengalaman mobile dirancang khusus│
│ • Semua elemen berebut perhatian    │ • Hierarki visual tegas & terfokus  │
└─────────────────────────────────────┴─────────────────────────────────────┘
```

---

## 3. Katalog Pola Dilarang (❌ AI Slop Taxonomy)

### 3.1. Kebiasaan Visual & Layout Buruk
- ❌ **Terlalu Banyak Gradient & Glow Berlebihan:** Menggunakan gradasi pelangi acak atau mesh blur raksasa di latar belakang yang mengaburkan teks dan membebani GPU rendering.
- ❌ **Glassmorphism di Mana-Mana:** Menempelkan `backdrop-filter: blur()` dengan border putih tebal `rgba(255,255,255,0.2)` pada setiap kartu tanpa alasan kedalaman visual yang jelas.
- ❌ **Rounded Radius Ekstrem:** Membulatkan seluruh kontainer secara berlebihan (`rounded-3xl` pada tabel dan modal data intensif) yang membuang area kerja berharga.
- ❌ **Monotoni 3-Card Grid:** Mengulang template baris 3 kartu identik di setiap section halaman dari atas sampai bawah.
- ❌ **Card Nesting Parah:** Memasukkan kartu di dalam kartu, lalu di dalam kartu lagi (*card inside card inside card*), menciptakan lapisan visual yang tidak perlu.
- ❌ **Floating Elements & Particle Random:** Elemen-elemen mengambang acak, bintang berkilau 3D (claymorphism blobs), atau ornamen dekoratif yang tidak memiliki fungsi navigasi.
- ❌ **Shadow Berwarna Tebal & Kasar:** Bayangan drop-shadow neon berukuran 40px yang membuat antarmuka tampak kotor dan tidak profesional.

### 3.2. Kebiasaan Komponen & Navigasi Buruk
- ❌ **Navbar Raksasa yang Memakan Layar:** Header navigasi desktop setinggi 100px+ yang menghabiskan ruang vertikal produktif.
- ❌ **Icon Spam Tanpa Semantik:** Memasang ikon acak di samping setiap baris teks hanya untuk mengisi ruang kosong.
- ❌ **Dashboard Template Admin Generik:** Meniru dashboard tiruan murahan dengan 4 kartu metrik palsu dan grafik garis bergelombang tanpa label sumbu data yang jelas.
- ❌ **Mobile Hanya Versi Desktop yang Di-Scale Down:** Memaksa tabel multi-kolom desktop tampil mengecil di smartphone tanpa adaptasi layout card/list atau horizontal scrolling terkontrol.
- ❌ **Tombol CTA Berulang-Ulang:** Menaruh 4 hingga 6 tombol *"Get Started / Download Now"* pada satu viewport layar yang sama.
- ❌ **Komponen Pengisi Ruang (*Filler Components*):** Menambahkan section FAQ palsu, logo cloud fiktif, atau testimonial karangan hanya untuk memperpanjang scrollbar.

### 3.3. Kebiasaan Copywriting & Bahasa Buruk
- ❌ **Buzzword Hampa Tanpa Substansi:** Menggunakan klaim bombastis seperti *"Revolutionize your workflow"*, *"Seamless AI-powered experience"*, *"Next-generation bleeding edge platform"*, *"Unleash the ultimate power"* tanpa menjelaskan apa yang sebenarnya dilakukan oleh software tersebut.
- ❌ **Headline & Deskripsi Generik:** Kalimat pembuka klise yang dapat ditempelkan pada produk apa saja tanpa identitas unik.

---

## 4. Standar Rekayasa Manusia (✅ Human-Designed Standard)

### 4.1. Hierarki Visual Tegas & Kontras Terukur
1. **Focal Point Tunggal:** Setiap tampilan layar memiliki satu tujuan aksi utama yang langsung dikenali dalam 3 detik pertama (*Primary Action*).
2. **Tidak Semua Elemen Harus "Special":** Elemen sekunder dan tersier harus sengaja dibuat tenang (*muted*) agar elemen interaktif utama menonjol (*Von Restorff Effect*).
3. **Whitespace sebagai Struktur:** Gunakan jarak ruang kosong (*negative space*) yang konsisten untuk mengelompokkan informasi secara logis (*Law of Proximity*), bukan menambah garis border tebal di mana-mana.

### 4.2. Tipografi Berkarakter & Fungsional
- **Skala Modular Jelas:** Rasio kontras ukuran font antar judul dan teks isi minimal $1.5\times$ agar struktur konten terbaca sekilas (*scannable*).
- **Tabular Monospace Figures:** Seluruh nilai mata uang, kuantitas stok, nomor SKU, hash SHA-256, dan catatan waktu menggunakan font monospace (`font-variant-numeric: tabular-nums`).

### 4.3. Layout Dinamis Mengikuti Karakter Konten (*Content-First Layout*)
- **Layout Berirama (*Visual Rhythm*):** Mengombinasikan split-screen interaktif, daftar terstruktur, panel terminal/kode, tabel data kompak, dan kartu sorotan untuk menciptakan ritme visual yang dinamis.
- **Karakter Industrial Teknis:** Tampilkan metadata nyata (ukuran biner dalam MB, format arsitektur x86/ARM, status build, tanggal rilis ISO) daripada klaim pemasaran abstrak.

### 4.4. Desain Mobile Adaptif & Ergonomis
- **Zona Jangkauan Ibu Jari (*Thumb Zone Ergonomics*):** Tombol aksi kasir kritis, checkout, dan navigasi utama diletakkan di bagian sepertiga bawah layar smartphone.
- **Pola Bottom Sheet & Drawer:** Modal pada layar sentuh mobile otomatis berubah menjadi *Bottom Sheet* yang dapat digeser (*swipeable*).
- **Target Sentuh Minimum:** $\ge 44\times 44\text{px}$ hingga $48\times 48\text{px}$ dengan padding aman antar elemen interaktif (*Fitts's Law*).

### 4.5. Animasi Fungsional & Ringan (*Lightweight Meaningful Motion*)
- **Hanya Animasi State Feedback:** Transisi digunakan untuk mengonfirmasi aksi pengguna (klik tombol, pembukaan dropdown, dialog muncul), bukan gerakan melayang terus-menerus yang mengalihkan perhatian.
- **Durasi Singkat:** Durasi animasi mikro antara $100\text{ms} - 200\text{ms}$.
- **Hemat Sumber Daya:** Animasi murni menggunakan properti `transform` dan `opacity` yang diakselerasi GPU.
- **Aksesibilitas:** Menghormati pengaturan sistem `prefers-reduced-motion: reduce`.

### 4.6. Copywriting Teknis, Padat, & Jujur
- **Jelaskan Fakta Teknis Langsung:** 
  - *Buruk (AI Slop):* "Rasakan pengalaman kasir masa depan yang revolusioner dan seamless dengan kekuatan AI mutakhir."
  - *Baik (ERASTACK Standard):* "Aplikasi kasir offline-first berbasis SQLite lokal. Berjalan tanpa internet, mencetak struk dalam <500ms, dan hemat RAM (<70MB)."
- **Transparansi Keterbatasan:** Jika suatu fitur membutuhkan fase lanjutan (seperti Cloud Sync), sebutkan secara transparan sebagai *Phase 6 Roadmap*, bukan menjanjikan hal yang belum ada.

---

## 5. Checklist Validasi Kualitas Sebelum Rilis (Quality Gate)

Sebelum menandai suatu fitur atau halaman selesai, seluruh agen dan engineer wajib memverifikasi daftar periksa berikut:

```markdown
- [ ] Apakah halaman bebas dari 3-card grid berulang yang monoton?
- [ ] Apakah tidak ada teks klise seperti "revolutionize", "seamless", atau "next-gen"?
- [ ] Apakah seluruh kartu dan tombol memiliki alasan fungsi yang jelas?
- [ ] Apakah warna latar belakang dan kartu mengambil token semantik dari DESIGN.md?
- [ ] Apakah layout mobile dirancang khusus dengan target sentuh >= 44px?
- [ ] Apakah angka finansial dan kode teknis menggunakan font monospace tabular?
- [ ] Apakah animasi berdurasi singkat (<200ms) dan tidak memicu layout reflow?
- [ ] Apakah informasi teknis (file size, version, checksum) ditampilkan secara akurat?
## 6. Protokol Eksekusi 10-Fase Bertahap (Incremental Delivery)

Untuk mencegah AI membangun website monolitik yang penuh pola *AI Slop*, pengembangan platform web ERASTACK **DILARANG KERAS** dilakukan secara borongan (*"build everything at once"*).

Pengembangan **WAJIB** mengikuti alur 10 fase terisolasi:

```
PHASE 1: Foundation (Tokens, Reset, CSS, Grid Layout)
    │
    ▼ (Review & Approval)
PHASE 2: Homepage (Manifesto, Core Pillars, Live Metrics)
    │
    ▼ (Review & Approval)
PHASE 3: Products (Catalog Grid, Category Filter, Platform Badges)
    │
    ▼ (Review & Approval)
PHASE 4: Product Detail (OryonPOS Deep Dive, Interactive Preview)
    │
    ▼ (Review & Approval)
PHASE 5: Downloads (Official Binaries Hub, SHA-256 Verifier)
    │
    ▼ (Review & Approval)
PHASE 6: AI Lab (SLM Benchmarks, Controlled Tool Playground)
    │
    ▼ (Review & Approval)
PHASE 7: Projects (Engineering Showcases & Architecture Cases)
    │
    ▼ (Review & Approval)
PHASE 8: Documentation (Search, Sidebar Navigation, Docs Engine)
    │
    ▼ (Review & Approval)
PHASE 9: Polish (Micro-interactions, Cmd+K Palette, a11y)
    │
    ▼ (Review & Approval)
PHASE 10: Quality Audit (Lighthouse 95+, Bundle <80KB, Zero-Slop Signoff)
```

> **Hukum Eksekusi Fase:** Setiap fase harus diselesaikan secara modular $\rightarrow$ ditinjau dan divalidasi kualitasnya $\rightarrow$ baru pengguna/agent melangkah ke fase berikutnya. Dilarang melompati fase!

