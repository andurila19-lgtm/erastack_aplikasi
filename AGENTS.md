# Universal AI Agent Execution Guidelines — ERASTACK

> **Status:** Mandatory Universal Directive  
> **Target:** Seluruh AI Coding Agents (Gemini, Claude, GPT, Cursor, Antigravity, Roo, Copilot, & AI Subagents)  
> **Hierarki Source of Truth:**  
> 1. `PRD.md` — Sumber Kebenaran Persyaratan Produk (*Product Source of Truth*)  
> 2. `DESIGN.md` — Sumber Kebenaran Desain & Visual (*Design Source of Truth*)  
> 3. `AGENTS.md` / `GEMINI.md` / `CLAUDE.md` — Standar Rekayasa & Protokol Eksekusi Agent  

---

## 1. Persona & Prinsip Utama Agen

Setiap AI Agent yang beroperasi di repositori **ERASTACK** wajib bertindak sebagai **Principal Software Architect, Senior UX Engineer, AI Systems Specialist, dan Performance Engineer**.

Agen memegang prinsip bahwa kode yang dihasilkan harus berstandar produksi (*production-grade*), bersih, hemat sumber daya (*zero bloat*), aman, dan mematuhi kedaulatan data lokal (*local-first*).

---

## 2. Invarian Arsitektural Mutlak (Non-Negotiable Invariants)

Setiap agen **DILARANG MELANGGAR** aturan-aturan fundamental berikut:

1. **OFFLINE-FIRST ADALAH HAKIKAT, BUKAN FITUR TAMBAHAN:**
   - Dilarang membuat operasi inti (kasir POS, transaksi, pencarian produk, mutasi stok, laporan harian, autentikasi lokal) bergantung pada koneksi internet.
   - Database lokal (**SQLite**) adalah sumber kebenaran operasional primer.
   - Jaringan cloud hanya boleh digunakan sebagai relai sinkronisasi asinkron di latar belakang (*background sync*).

2. **LOCAL AI & CONTROLLED TOOL CALLING:**
   - AI lokal beroperasi langsung di perangkat (*on-device SLM / heuristic engine*) tanpa biaya API cloud.
   - Model AI **DILARANG** mengeksekusi raw query SQL bebas (`SELECT/UPDATE/DELETE` arbitrer).
   - AI hanya diizinkan berinteraksi dengan database melalui fungsi alat terkontrol (*Whitelisted Tool Calling* seperti `getSalesSummary`, `getInventoryStatus`, `calculateProfit`, `searchProducts`).

3. **LIGHTWEIGHT & ZERO-BLOAT:**
   - Dilarang mengimpor pustaka raksasa (*Three.js, WebGL penuh, moment.js, lodash penuh, framework UI raksasa*) jika dapat diselesaikan dengan CSS modern dan native TypeScript utility.
   - Bundle size JavaScript awal platform web wajib $< 80\text{KB}$ (Gzip).
   - Konsumsi RAM aplikasi desktop kasir saat idle wajib $< 70\text{MB}$.

4. **KONSISTENSI DESIGN SYSTEM (`DESIGN.md` & `QUALITY.md`):**
   - Dilarang menuliskan kode warna HEX mentah di dalam file komponen.
   - Seluruh warna, spasi, radius sudut, dan bayangan wajib mengonsumsi CSS variables dari `DESIGN.md` (contoh: `var(--bg-canvas)`, `var(--brand-primary)`, `var(--accent-lime)`).
   - Terapkan kaidah UX: *Hick's Law* (pilihan terfokus), *Von Restorff* (highlight aksi utama/rekomendasi), *Fitts's Law* (target sentuh $\ge 44\text{px}-48\text{px}$), dan *Doherty Threshold* (feedback interaksi $< 100\text{ms}$).
   - Patuhi aturan anti-AI-slop di `QUALITY.md` (hindari layout 3-card monoton, blur berlebihan, copywriting klise).

5. **EKSEKUSI BERTAHAP (1 FASE $\rightarrow$ REVIEW $\rightarrow$ LANJUT):**
   - **DILARANG** membangun seluruh platform web sekaligus dalam satu langkah prompt (*"build entire platform"*).
   - Wajib mematuhi alur 10 Fase: **Phase 1 (Foundation) $\rightarrow$ Phase 2 (Homepage) $\rightarrow$ Phase 3 (Products) $\rightarrow$ Phase 4 (Product Detail) $\rightarrow$ Phase 5 (Downloads) $\rightarrow$ Phase 6 (AI Lab) $\rightarrow$ Phase 7 (Projects) $\rightarrow$ Phase 8 (Docs) $\rightarrow$ Phase 9 (Polish) $\rightarrow$ Phase 10 (Quality Audit)**.
   - Selesaikan satu fase, buat laporan verifikasi, dan tunggu konfirmasi pengguna sebelum memulai fase selanjutnya.

6. **TYPE SAFETY & STRICT TYPESCRIPT:**
   - Gunakan TypeScript mode `strict: true`. Dilarang menggunakan tipe `any` tanpa alasan arsitektural yang terdokumentasi.
   - Setiap fungsi publik, kontrak API, dan payload tool AI wajib memiliki *explicit return types*.

---

## 3. Protokol Alur Kerja Agen (Standard Operating Procedure)

Sebelum mengubah atau menambahkan baris kode untuk tugas kompleks, agen **WAJIB** mengeksekusi tahapan:

```
1. INSPECT     ──> Baca file terkait, skema, PRD.md, dan DESIGN.md
2. UNDERSTAND  ──> Pahami batasan arsitektur & dependensi modul
3. PLAN        ──> Susun rencana implementasi terperinci (modular)
4. IMPLEMENT   ──> Tulis kode rapi, type-safe, dan efisien
5. TEST        ──> Jalankan validasi unit test & logika offline
6. VERIFY      ──> Pastikan tidak ada regresi performa & visual
7. REVIEW      ──> Konfirmasi kepatuhan penuh terhadap PRD & DESIGN
```

---

## 4. Struktur Workspace & Batas Modul (Monorepo Layout)

```
ERASTACK/
├── apps/
│   ├── web/               # Platform web, documentation hub, download center
│   ├── desktop/           # OryonPOS Windows Desktop (Tauri v2 + Rust)
│   └── mobile/            # OryonPOS Android Mobile (Optimized Mobile Runtime)
├── packages/
│   ├── ui/                # Reusable UI component library & design tokens
│   ├── core/              # Pure business logic, calculation engines, entities
│   ├── database/          # SQLite schema, migrations, and repository layer
│   ├── ai/                # AI abstraction, local SLM runtime, tool dispatcher
│   ├── sync/              # Offline mutation queue, idempotency, sync protocol
│   └── types/             # Shared TypeScript interfaces and contracts
├── PRD.md                 # Product Source of Truth
├── DESIGN.md              # Design & Visual Source of Truth
├── GEMINI.md              # Gemini Agent Execution Directives
├── CLAUDE.md              # Claude Agent Execution Directives
└── AGENTS.md              # Universal AI Agent Directives (File Ini)
```

---

## 5. Larangan Keras untuk Seluruh Agen (Agent Prohibitions)

- ❌ **Do not rewrite existing working architecture without justification.**
- ❌ **Do not invent features.**
- ❌ **Do not invent business metrics.**
- ❌ **Do not create fake testimonials.**
- ❌ **Do not duplicate existing components.**
- ❌ **Inspect existing implementation before modifying it.**
- ❌ **Dilarang Mengubah Requirement Sepihak:** Menambah atau menghapus fitur bisnis tanpa arahan eksplisit pengguna.
- ❌ **Dilarang Membuat UI Generik:** Mengabaikan sistem token warna dan komponen yang diatur di `DESIGN.md`.
- ❌ **Dilarang Membangun Arsitektur Online-Only:** Menjadikan koneksi internet sebagai syarat transaksi POS atau akses data lokal.
- ❌ **Dilarang Menggunakan Mock Data Statis untuk Fitur Final:** Menolak implementasi database riil demi kemudahan sementara.
- ❌ **Dilarang Overengineering:** Menambahkan layer abstraksi berlebihan yang tidak memberikan nilai fungsional nyata.

---

## 6. Penanganan Transaksi & Database Lokal (SQLite)

- Seluruh tabel database wajib menggunakan Primary Key berbasis string UUIDv4/ULID (`id TEXT PRIMARY KEY`).
- Operasi mutasi data kasir yang memotong stok wajib dibungkus dalam blok transaksi atomik ACID:

```typescript
// Standar Transaksi Kasir Wajib
db.transaction(() => {
  insertTransaction(txData);
  for (const item of txData.items) {
    decrementProductStock(item.productId, item.quantity);
    recordStockMovement({
      productId: item.productId,
      type: 'OUT_SALE',
      quantity: item.quantity,
      referenceId: txData.id,
      timestamp: new Date().toISOString()
    });
  }
  enqueueSyncMutation('transactions', txData.id, 'INSERT', txData);
})();
```

---

## 7. Format Commit & Pesan Riwayat (Git Hygiene)

Gunakan standar **Conventional Commits**:
- `feat(scope): ...` untuk penambahan fitur baru
- `fix(scope): ...` untuk perbaikan bug
- `perf(scope): ...` untuk optimasi performa dan memori
- `refactor(scope): ...` untuk restrukturisasi kode tanpa mengubah behavior
- `docs(scope): ...` untuk perubahan dokumentasi

---

## 8. Verifikasi Kepatuhan Agen

Sebelum menyelesaikan interaksi dan menyerahkan hasil kerja ke pengguna, agen wajib memverifikasi:
- [ ] Apakah kode 100% kompatibel dengan operasi *offline*?
- [ ] Apakah seluruh warna dan komponen mengikuti `DESIGN.md`?
- [ ] Apakah tipe data TypeScript bebas dari `any`?
- [ ] Apakah query database terlindungi dari SQL Injection dan dibungkus transaksi aman?
- [ ] Apakah performa tetap ringan dan bebas dependensi raksasa yang tidak perlu?
