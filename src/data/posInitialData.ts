export interface PosProduct {
  id: string;
  sku: string;
  barcode: string;
  name: string;
  category: 'Sembako' | 'Minuman' | 'Makanan & Snack' | 'Kebutuhan Rumah' | 'Bumbu & Dapur';
  buyPrice: number;
  sellPrice: number;
  stock: number;
  minStock: number;
  unit: string;
}

export interface CartItem {
  product: PosProduct;
  qty: number;
  discount: number;
}

export interface TransactionRecord {
  id: string;
  invoiceNo: string;
  timestamp: string;
  items: {
    productId: string;
    productName: string;
    qty: number;
    sellPrice: number;
    buyPrice: number;
    subtotal: number;
  }[];
  totalAmount: number;
  discountAmount: number;
  finalAmount: number;
  paidAmount: number;
  changeAmount: number;
  paymentMethod: 'TUNAI' | 'QRIS' | 'TRANSFER';
  cashierName: string;
  notes?: string;
}

export interface StoreProfile {
  storeName: string;
  tagline: string;
  address: string;
  phone: string;
  receiptFooter: string;
  paperWidth: '58mm' | '80mm';
}

export const DEFAULT_STORE_PROFILE: StoreProfile = {
  storeName: 'TOKO SEMBAKO BAROKAH',
  tagline: 'Murah, Lengkap, dan Terpercaya',
  address: 'Jl. Raya Kopo No. 128, Bandung',
  phone: '0812-3456-7890',
  receiptFooter: 'Terima Kasih Atas Kunjungan Anda! Barang yang sudah dibeli tidak dapat ditukar.',
  paperWidth: '58mm',
};

export const INITIAL_POS_PRODUCTS: PosProduct[] = [
  {
    id: 'prod-1',
    sku: 'SBK-001',
    barcode: '8992753101011',
    name: 'Beras Rojolele Super 5kg',
    category: 'Sembako',
    buyPrice: 60000,
    sellPrice: 68000,
    stock: 24,
    minStock: 5,
    unit: 'karung',
  },
  {
    id: 'prod-2',
    sku: 'SBK-002',
    barcode: '8999999195311',
    name: 'Minyak Goreng Sania Pouch 2L',
    category: 'Sembako',
    buyPrice: 30000,
    sellPrice: 34000,
    stock: 36,
    minStock: 8,
    unit: 'pouch',
  },
  {
    id: 'prod-3',
    sku: 'SBK-003',
    barcode: '8993005120015',
    name: 'Gula Pasir Gulaku Putih 1kg',
    category: 'Sembako',
    buyPrice: 14500,
    sellPrice: 16500,
    stock: 45,
    minStock: 10,
    unit: 'bungkus',
  },
  {
    id: 'prod-4',
    sku: 'SBK-004',
    barcode: '8991001100123',
    name: 'Tepung Terigu Segitiga Biru 1kg',
    category: 'Sembako',
    buyPrice: 11000,
    sellPrice: 13000,
    stock: 28,
    minStock: 6,
    unit: 'bungkus',
  },
  {
    id: 'prod-5',
    sku: 'MNM-001',
    barcode: '8992775210012',
    name: 'Teh Botol Sosro Kotak 250ml',
    category: 'Minuman',
    buyPrice: 3000,
    sellPrice: 4000,
    stock: 72,
    minStock: 12,
    unit: 'kotak',
  },
  {
    id: 'prod-6',
    sku: 'MNM-002',
    barcode: '8998866200213',
    name: 'Kopi Kapal Api Spesial Mix 1 Renteng',
    category: 'Minuman',
    buyPrice: 12500,
    sellPrice: 15000,
    stock: 18,
    minStock: 4,
    unit: 'renteng',
  },
  {
    id: 'prod-7',
    sku: 'MNM-003',
    barcode: '8996001300145',
    name: 'Aqua Botol Sedang 600ml',
    category: 'Minuman',
    buyPrice: 2800,
    sellPrice: 4000,
    stock: 96,
    minStock: 20,
    unit: 'botol',
  },
  {
    id: 'prod-8',
    sku: 'MKN-001',
    barcode: '8998866103102',
    name: 'Indomie Goreng Original 85g',
    category: 'Makanan & Snack',
    buyPrice: 2700,
    sellPrice: 3200,
    stock: 120,
    minStock: 24,
    unit: 'bungkus',
  },
  {
    id: 'prod-9',
    sku: 'MKN-002',
    barcode: '8998866103126',
    name: 'Indomie Kuah Kari Ayam 72g',
    category: 'Makanan & Snack',
    buyPrice: 2700,
    sellPrice: 3200,
    stock: 80,
    minStock: 20,
    unit: 'bungkus',
  },
  {
    id: 'prod-10',
    sku: 'KBR-001',
    barcode: '8999999002143',
    name: 'Deterjen Rinso Molto Bubuk 770g',
    category: 'Kebutuhan Rumah',
    buyPrice: 18500,
    sellPrice: 22000,
    stock: 15,
    minStock: 3,
    unit: 'bungkus',
  },
  {
    id: 'prod-11',
    sku: 'KBR-002',
    barcode: '8999999052018',
    name: 'Sabun Cuci Piring Sunlight 700ml',
    category: 'Kebutuhan Rumah',
    buyPrice: 13000,
    sellPrice: 15500,
    stock: 22,
    minStock: 5,
    unit: 'pouch',
  },
  {
    id: 'prod-12',
    sku: 'BMB-001',
    barcode: '8992745300124',
    name: 'Kecap Manis Bango Pouch 520ml',
    category: 'Bumbu & Dapur',
    buyPrice: 19000,
    sellPrice: 23000,
    stock: 16,
    minStock: 4,
    unit: 'pouch',
  },
];
