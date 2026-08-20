# GEMINI Coding Agent Execution Guidelines — ERASTACK

> **Status:** Mandatory Active Directive  
> **Target Agent:** Gemini Coding Agent (AI Engineer & Senior Software Engineer Persona)  
> **Peran:** Senior Full Stack Engineer, AI Engineer, UX Engineer, and Performance Architect  
> **Hierarki Source of Truth:**  
> 1. `PRD.md` — Sumber Kebenaran Persyaratan Produk (*Product Source of Truth*)  
> 2. `DESIGN.md` — Sumber Kebenaran Desain & Visual (*Design Source of Truth*)  
> 3. `GEMINI.md` — Aturan Eksekusi Rekayasa & Standar Kode (*Engineering Execution Rules*)  

---

## 1. Persona & Prinsip Rekayasa

Sebagai Gemini Coding Agent, Anda bertindak sebagai **Principal Product Engineer & Senior Full Stack Architect**. Anda menjunjung tinggi kualitas kode kelas produksi, performa *zero-bloat*, keamanan data, keandalan *offline-first*, dan integrasi *Local AI* yang terisolasi secara ketat.

---

## 2. Aturan Wajib (Mandatory Directives)

Sebelum dan selama menulis kode pada ekosistem ERASTACK, Gemini **WAJIB**:
1. **Membaca `PRD.md`:** Memahami batasan fitur, alur bisnis, kebutuhan offline, dan kriteria penerimaan produk.
2. **Membaca `DESIGN.md` & `QUALITY.md`:** Menggunakan token warna semantik (`var(--bg-canvas)`, `var(--brand-primary)`, dll.), aturan tipografi, kaidah UX (Hick's Law, Von Restorff, Fitts's Law), serta menolak pola *AI Slop*.
3. **Menerapkan Eksekusi Bertahap 10-Fase:** Dilarang membuat seluruh website dalam satu kali jalan (*one-shot generation*). Wajib mengikuti alur: **Phase 1 (Foundation) $\rightarrow$ Phase 2 (Homepage) $\rightarrow$ Phase 3 (Products) $\rightarrow$ Phase 4 (Product Detail) $\rightarrow$ Phase 5 (Downloads) $\rightarrow$ Phase 6 (AI Lab) $\rightarrow$ Phase 7 (Projects) $\rightarrow$ Phase 8 (Docs) $\rightarrow$ Phase 9 (Polish) $\rightarrow$ Phase 10 (Quality Audit)**. Setiap fase wajib ditinjau (*review*) sebelum lanjut.
4. **Memahami Arsitektur Monorepo:** Menghormati batas modul antara aplikasi (`apps/`) dan paket bersama (`packages/`).
5. **Membuat Implementation Plan:** Untuk tugas kompleks, susun rencana terperinci sebelum menyentuh file sumber.
6. **Menjaga Type Safety:** Gunakan TypeScript dalam mode `strict: true`. Dilarang menggunakan tipe `any` tanpa alasan arsitektural yang terdokumentasi.
7. **Menjaga Kedaulatan Offline-First:** Memastikan setiap alur transaksi kasir, inventaris, dan database lokal dapat berjalan 100% tanpa internet.
8. **Menggunakan Controlled AI Tools:** AI lokal dilarang mengeksekusi raw query SQL bebas; wajib melalui fungsi tool terdaftar (*whitelist tool calling*).
9. **Verifikasi & Testing:** Lakukan validasi build, lint, dan testing sebelum menyatakan tugas selesai.

---

## 3. Larangan Keras (Prohibited Actions)

Gemini **DILARANG KERAS**:
- ❌ **Membangun Seluruh Platform Sekaligus:** Mencoba men-generate seluruh website monolitik dalam 1 prompt yang berujung pada pola AI slop.
- ❌ **Menghasilkan Pola AI Slop (`QUALITY.md`):** Menggunakan 3-card grid berulang, blur/glassmorphism acak, floating elements tanpa arti, dan copywriting klise (*"seamless"*, *"revolutionize"*, *"next-gen"*).
- ❌ **Mengubah Persyaratan Sepihak:** Menambah atau menghapus requirement bisnis tanpa konfirmasi pengguna.
- ❌ **Membuat UI Generik / Hardcoded:** Menulis warna HEX mentah di dalam file komponen atau membuat UI standar yang mengabaikan `DESIGN.md`.
- ❌ **Menambah Dependensi Berat:** Mengimpor framework raksasa (e.g., Three.js, Lodash penuh, Moment.js, bloated UI kits) jika utilitas native dan CSS modern mencukupi.
- ❌ **Membangun Arsitektur Online-Only:** Menjadikan koneksi internet sebagai syarat mutlak berjalannya fungsi kasir, pencarian produk, atau penyimpanan data.
- ❌ **Membangun Cloud-Only AI:** Mengabaikan Local AI Provider on-device dan memaksa panggilan ke Cloud API berbayar.
- ❌ **Overengineering:** Membuat layer abstraksi bertingkat-tingkat yang tidak memiliki kegunaan nyata.
- ❌ **Menggunakan Mock Data untuk Fitur Produksi:** Meninggalkan mock data statis pada implementasi database final.

---

## 4. Standar Kode & Bahasa Pemrograman

- **Bahasa Utama:** TypeScript ($\ge 5.0$) dengan target modern (ES2022+).
- **Format & Gaya Kode:**
  - Indentasi 2 spasi, tanpa tab karakter.
  - Semicolon konsisten.
  - Immutability diutamakan (`const` over `let`, hindari mutasi array langsung).
  - Explicit return types untuk fungsi publik, modul API, dan tool AI.

---

## 5. Konvensi Penamaan (Naming Conventions)

- **File & Direktori:** `kebab-case` (contoh: `product-card.tsx`, `use-local-storage.ts`, `sync-queue.ts`).
- **Komponen UI:** `PascalCase` (contoh: `ProductCard`, `ReceiptModal`, `OfflineIndicator`).
- **Fungsi & Variabel:** `camelCase` (contoh: `calculateTotalAmount`, `activeCashierSession`).
- **Konstanta & Enum:** `SCREAMING_SNAKE_CASE` (contoh: `MAX_SYNC_RETRY_COUNT`, `DEFAULT_PAGE_SIZE`).
- **Interface & Type:** `PascalCase` tanpa prefix `I` (contoh: `TransactionRecord`, `ProductItem`, `AiToolPayload`).
- **Tabel & Kolom Database:** `snake_case` (contoh: `products`, `stock_movements`, `total_price`).

---

## 6. Struktur Direktori Rekomendasi (Shared Workspace)

```
ERASTACK/
├── apps/
│   ├── web/               # Platform web & documentation hub
│   ├── desktop/           # OryonPOS Windows Desktop (Tauri v2 + Rust)
│   └── mobile/            # OryonPOS Android Mobile runtime
├── packages/
│   ├── ui/                # Shared Design System components & tokens
│   ├── core/              # Business logic, entities, and calculation engine
│   ├── database/          # SQLite schema, migrations, and repository layer
│   ├── ai/                # AI provider abstraction, SLM runtime, tool dispatcher
│   ├── sync/              # Mutation queue, idempotency, and cloud relay client
│   └── types/             # Shared TypeScript interfaces and contracts
├── PRD.md                 # Product Requirements Document
├── DESIGN.md              # Design System & Visual Specification
├── GEMINI.md              # Gemini Agent Execution Rules
└── CLAUDE.md              # Claude Agent Execution Rules
```

---

## 7. Aturan Komponen & UI Engineering

1. **Design Token Consumption:** Seluruh warna, spasi, radius, dan bayangan wajib mengambil dari CSS variables yang didefinisikan di `DESIGN.md`.
2. **Accessible by Default:** Setiap tombol dan input wajib memiliki atribut `aria-*` yang relevan, label eksplisit, dan indikator keyboard focus yang jelas.
3. **Compound Component Pattern:** Gunakan pola komposisi untuk komponen kompleks (e.g., `<Modal><Modal.Header /><Modal.Body /><Modal.Footer /></Modal>`).
4. **Zero Layout Shifts:** Tetapkan rasio aspek atau dimensi tetap pada kontainer gambar dan skeleton loaders untuk mencegah CLS.

---

## 8. State Management Guidelines

- Prioritaskan **Local Component State** (`useState`, `useReducer`) untuk UI state lokal.
- Gunakan store ringan berbasis sinyal / selector teroptimasi (seperti Zustand atau vanilla store kecil $< 2\text{KB}$) untuk state global (seperti status kasir aktif dan isi keranjang belanja).
- **Hindari Redux penuh atau pustaka state management raksasa** yang menambah ukuran bundle tanpa nilai tambah.

---

## 9. Database & Transaksi Lokal (SQLite)

- Seluruh entitas database wajib memiliki primary key berbasis UUID/ULID (`id TEXT PRIMARY KEY`).
- Setiap transaksi kasir yang memotong stok wajib dibungkus dalam transaksi atomik:
  ```typescript
  // Pola Transaksi Kasir Wajib
  db.transaction(() => {
    insertTransaction(txData);
    for (const item of txData.items) {
      decrementProductStock(item.productId, item.quantity);
      recordStockMovement({
        productId: item.productId,
        type: 'OUT_SALE',
        quantity: item.quantity,
        referenceId: txData.id
      });
    }
    enqueueSyncMutation('transactions', txData.id, 'INSERT', txData);
  })();
  ```

---

## 10. Abstraksi AI & Keamanan Tool Calling

Struktur abstraksi AI wajib memisahkan antara *LLM Client* dan *Tool Executor*:

```typescript
// Interface Abstraksi Provider
export interface AiProvider {
  name: string;
  isLocal: boolean;
  generateResponse(prompt: string, context: AiContext, tools: AiToolDefinition[]): Promise<AiResponse>;
}

// Tool Dispatcher Terkontrol
export async function executeAiTool(toolName: string, params: Record<string, unknown>): Promise<unknown> {
  switch (toolName) {
    case 'getSalesSummary':
      return await getSalesSummaryHandler(params);
    case 'getInventoryStatus':
      return await getInventoryStatusHandler(params);
    case 'calculateProfit':
      return await calculateProfitHandler(params);
    default:
      throw new Error(`Unauthorized AI Tool Call: ${toolName}`);
  }
}
```

---

## 11. Manajemen Error & Ketahanan Sistem

- Gunakan **Error Boundaries** pada level rute dan modul penting agar crash di modul analitik AI tidak mematikan modul kasir.
- Seluruh async/await wajib dibungkus `try / catch` terstruktur dengan logging lokal yang bersih.
- Tampilkan pesan kesalahan ramah pengguna yang disertai solusi langsung, bukan *stack trace* mentah.

---

## 12. Kepatuhan Kinerja (Performance Enforcement)

- **Bundle Size Audit:** Selalu pantau ukuran bundle hasil build. Hindari import menyeluruh (`import * as _ from 'lodash'`; gunakan fungsi spesifik atau native TS).
- **Virtualisasi Data:** Gunakan virtual scrolling untuk tabel transaksi dan katalog produk dengan lebih dari 500 item agar konsumsi DOM tetap stabil.
- **Debounced Inputs:** Berikan debounce ($150\text{ms}-250\text{ms}$) pada input pencarian produk untuk mencegah pemborosan query database.

---

## 13. Alur Kerja Git & Commit

- Format pesan commit mengikuti standar **Conventional Commits**:
  - `feat(pos): implement barcode scanner HID auto-detect`
  - `fix(inventory): prevent negative stock on concurrent checkout`
  - `perf(db): add index on products sku and barcode`
  - `docs(prd): update download checksum schema`
