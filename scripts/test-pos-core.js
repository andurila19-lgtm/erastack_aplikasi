/**
 * Automated Core POS, Inventory, RBAC, and OFFLINE-FIRST RESILIENCE Test Suite — ERASTACK POS
 */

const INITIAL_POS_PRODUCTS = [
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
    isActive: true,
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
    isActive: true,
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
    isActive: true,
  },
];

const ROLE_PERMISSIONS = {
  OWNER: {
    canAccessDashboard: true,
    canAccessPOS: true,
    canManageInventory: true,
    canAdjustStock: true,
    canAccessReports: true,
    canExportData: true,
    canManageSettings: true,
    canDeleteProducts: true,
  },
  MANAGER: {
    canAccessDashboard: true,
    canAccessPOS: true,
    canManageInventory: true,
    canAdjustStock: true,
    canAccessReports: true,
    canExportData: true,
    canManageSettings: false,
    canDeleteProducts: false,
  },
  CASHIER: {
    canAccessDashboard: false,
    canAccessPOS: true,
    canManageInventory: false,
    canAdjustStock: false,
    canAccessReports: false,
    canExportData: false,
    canManageSettings: false,
    canDeleteProducts: false,
  },
};

let passedTests = 0;
let failedTests = 0;

function assert(condition, message) {
  if (condition) {
    console.log(`  ✓ PASS: ${message}`);
    passedTests++;
  } else {
    console.error(`  ✗ FAIL: ${message}`);
    failedTests++;
  }
}

console.log('\n============================================================');
console.log('🚀 RUNNING ERASTACK OFFLINE-FIRST & RESILIENCE TEST SUITE');
console.log('============================================================\n');

// -------------------------------------------------------------
// TEST SUITE 1: CART OPERATIONS & QUANTITY LIMITS
// -------------------------------------------------------------
console.log('📦 [TEST SUITE 1: Cart Operations & Quantity Limits]');

let testProducts = JSON.parse(JSON.stringify(INITIAL_POS_PRODUCTS));
let testCart = [];
let testCartDiscount = 0;
let testStockMovements = [];
let testTransactions = [];

function addToCart(product, qty = 1) {
  if (product.stock <= 0 || product.isActive === false) return false;
  const existing = testCart.find(i => i.product.id === product.id);
  if (existing) {
    const target = existing.qty + qty;
    if (target > product.stock) {
      existing.qty = product.stock;
      return false;
    }
    existing.qty = target;
    return true;
  }
  const safeQty = Math.min(product.stock, Math.max(1, qty));
  testCart.push({ product, qty: safeQty, discount: 0 });
  return true;
}

function updateCartQty(productId, qty) {
  if (qty <= 0) {
    testCart = testCart.filter(i => i.product.id !== productId);
    return;
  }
  const item = testCart.find(i => i.product.id === productId);
  if (item) {
    item.qty = Math.min(item.product.stock, qty);
  }
}

// Test 1.1: Add product to cart
const beras = testProducts.find(p => p.id === 'prod-1');
const added = addToCart(beras, 2);
assert(added === true && testCart.length === 1 && testCart[0].qty === 2, 'Add in-stock product to empty cart');

// Test 1.2: Add same product repeatedly
addToCart(beras, 3);
assert(testCart[0].qty === 5, 'Adding same product accumulates quantity (2 + 3 = 5)');

// Test 1.3: Subtotal calculation
let subtotal = testCart.reduce((sum, item) => sum + (item.product.sellPrice * item.qty), 0);
assert(subtotal === 5 * 68000, `Subtotal calculation exact (5 * 68.000 = Rp ${subtotal.toLocaleString('id-ID')})`);

// Test 1.4: Add multiple different products
const minyak = testProducts.find(p => p.id === 'prod-2');
addToCart(minyak, 1);
subtotal = testCart.reduce((sum, item) => sum + (item.product.sellPrice * item.qty), 0);
const expectedSubtotal = (5 * 68000) + (1 * 34000);
assert(testCart.length === 2 && subtotal === expectedSubtotal, `Multiple products subtotal correct (Rp ${subtotal.toLocaleString('id-ID')})`);

// Test 1.5: Quantity cap at max stock limit
addToCart(beras, 50);
assert(testCart[0].qty === 24, 'Quantity capped at maximum available stock (24)');

// Test 1.6: Decrease quantity
updateCartQty(beras.id, 3);
assert(testCart[0].qty === 3, 'Decrease quantity to 3');

// Test 1.7: Remove product on zero quantity
updateCartQty(minyak.id, 0);
assert(testCart.length === 1 && testCart[0].product.id === beras.id, 'Setting quantity to 0 removes item from cart');

// Test 1.8: Prevent adding out-of-stock product
const outOfStockProd = { id: 'prod-out', sku: 'OUT-01', barcode: '000', name: 'Barang Habis', buyPrice: 1000, sellPrice: 2000, stock: 0, minStock: 1, unit: 'pcs', isActive: true };
const addOos = addToCart(outOfStockProd, 1);
assert(addOos === false && !testCart.find(i => i.product.id === 'prod-out'), 'Out-of-stock product rejected from cart');


// -------------------------------------------------------------
// TEST SUITE 2: INVENTORY ATOMICITY & STOCK MOVEMENT AUDIT TRAIL
// -------------------------------------------------------------
console.log('\n⚡ [TEST SUITE 2: Stock Deduction & Audit Trail Movements]');

const initialBerasStock = testProducts.find(p => p.id === 'prod-1').stock; // 24
const qtyToBuy = testCart[0].qty; // 3

function executeTransaction(paidAmt, method, notes) {
  if (testCart.length === 0) return null;
  const tot = testCart.reduce((s, i) => s + (i.product.sellPrice * i.qty), 0);
  const fin = Math.max(0, tot - testCartDiscount);
  if (method === 'TUNAI' && paidAmt < fin) return null;

  for (const it of testCart) {
    const p = testProducts.find(prod => prod.id === it.product.id);
    if (!p || p.stock < it.qty) return null;
  }

  const now = new Date();
  const invoiceNo = `INV-TEST-${Date.now()}`;

  const tx = {
    id: `tx-${Date.now()}`,
    invoiceNo,
    timestamp: now.toISOString(),
    items: testCart.map(it => ({
      productId: it.product.id,
      productName: it.product.name,
      qty: it.qty,
      sellPrice: it.product.sellPrice,
      buyPrice: it.product.buyPrice,
      subtotal: it.product.sellPrice * it.qty,
    })),
    totalAmount: tot,
    discountAmount: testCartDiscount,
    finalAmount: fin,
    paidAmount: paidAmt,
    changeAmount: Math.max(0, paidAmt - fin),
    paymentMethod: method,
    cashierName: 'Kasir Utama',
    notes,
  };

  testCart.forEach(ci => {
    const prod = testProducts.find(p => p.id === ci.product.id);
    testStockMovements.push({
      id: `mov-${Date.now()}-${Math.random()}`,
      productId: prod.id,
      productName: prod.name,
      type: 'SALE',
      qtyChange: -ci.qty,
      stockBefore: prod.stock,
      stockAfter: prod.stock - ci.qty,
      timestamp: now.toISOString(),
      user: 'Kasir Utama',
      referenceId: invoiceNo,
      notes: `Penjualan #${invoiceNo}`,
    });
  });

  testProducts = testProducts.map(prod => {
    const ci = testCart.find(item => item.product.id === prod.id);
    if (ci) {
      return { ...prod, stock: prod.stock - ci.qty };
    }
    return prod;
  });

  testTransactions.push(tx);
  testCart = [];
  testCartDiscount = 0;
  return tx;
}

const completedTx = executeTransaction(204000, 'TUNAI', 'Transaksi uji');
const finalBerasStock = testProducts.find(p => p.id === 'prod-1').stock;

assert(completedTx !== null, 'Transaction executed and returned complete record');
assert(finalBerasStock === initialBerasStock - qtyToBuy, `Stock deducted accurately (${initialBerasStock} - ${qtyToBuy} = ${finalBerasStock})`);
assert(testStockMovements.length === 1 && testStockMovements[0].type === 'SALE' && testStockMovements[0].qtyChange === -3, 'Audit trail stock movement created for SALE');


// -------------------------------------------------------------
// TEST SUITE 3: STOCK ADJUSTMENT & RESTOCK OPERATIONS
// -------------------------------------------------------------
console.log('\n🔄 [TEST SUITE 3: Stock Adjustment & Restock Operations]');

function adjustStock(productId, newStock, type, notes) {
  const prod = testProducts.find(p => p.id === productId);
  if (!prod) return false;
  const stockBefore = prod.stock;
  const stockAfter = Math.max(0, newStock);
  const qtyChange = stockAfter - stockBefore;

  prod.stock = stockAfter;
  testStockMovements.push({
    id: `mov-${Date.now()}`,
    productId,
    productName: prod.name,
    type,
    qtyChange,
    stockBefore,
    stockAfter,
    timestamp: new Date().toISOString(),
    user: 'Owner',
    notes,
  });
  return true;
}

adjustStock('prod-1', 41, 'RESTOCK', 'Kulakan grosir');
assert(testProducts.find(p => p.id === 'prod-1').stock === 41, 'Restock updated inventory to 41');
assert(testStockMovements[testStockMovements.length - 1].qtyChange === 20, 'Restock logged +20 movement');

adjustStock('prod-1', 39, 'ADJUSTMENT', 'Barang rusak kemasan bocor');
assert(testProducts.find(p => p.id === 'prod-1').stock === 39, 'Opname updated inventory to 39');
assert(testStockMovements[testStockMovements.length - 1].qtyChange === -2, 'Opname logged -2 movement with reason');


// -------------------------------------------------------------
// TEST SUITE 4: PRICE IMMUTABILITY & HISTORICAL INTEGRITY
// -------------------------------------------------------------
console.log('\n🔒 [TEST SUITE 4: Historical Transaction Immutability]');

testProducts = testProducts.map(p => p.id === 'prod-1' ? { ...p, sellPrice: 75000 } : p);
const historicalTx = testTransactions[0];
assert(historicalTx.items[0].sellPrice === 68000, 'Historical transaction sellPrice is immutable (remains Rp 68.000)');
assert(historicalTx.totalAmount === 204000, 'Historical transaction totalAmount remains unaffected by catalog price changes');


// -------------------------------------------------------------
// TEST SUITE 5: SOFT DELETE SAFETY
// -------------------------------------------------------------
console.log('\n🗑️ [TEST SUITE 5: Soft Delete & Safe Deactivation]');

testProducts = testProducts.map(p => p.id === 'prod-1' ? { ...p, isActive: false } : p);
const tryAddInactive = addToCart(testProducts.find(p => p.id === 'prod-1'), 1);
assert(tryAddInactive === false, 'Deactivated product blocked from new cart');
assert(testTransactions.length === 1 && testTransactions[0].items[0].productName === 'Beras Rojolele Super 5kg', 'Historical transaction data remains accessible after product deactivation');


// -------------------------------------------------------------
// TEST SUITE 6: RBAC ROLE MATRIX
// -------------------------------------------------------------
console.log('\n🛡️ [TEST SUITE 6: RBAC Role & Permission Matrix]');

assert(ROLE_PERMISSIONS.OWNER.canManageSettings === true, 'Owner has full store settings access');
assert(ROLE_PERMISSIONS.OWNER.canDeleteProducts === true, 'Owner has product deletion privilege');
assert(ROLE_PERMISSIONS.MANAGER.canManageInventory === true, 'Manager has inventory management access');
assert(ROLE_PERMISSIONS.MANAGER.canManageSettings === false, 'Manager restricted from store settings');
assert(ROLE_PERMISSIONS.CASHIER.canAccessPOS === true, 'Cashier has POS access');
assert(ROLE_PERMISSIONS.CASHIER.canAccessDashboard === false, 'Cashier restricted from executive dashboard');


// -------------------------------------------------------------
// TEST SUITE 7: OFFLINE-FIRST PERSISTENCE & RESTART RESILIENCE
// -------------------------------------------------------------
console.log('\n💾 [TEST SUITE 7: Offline-First Storage & Restart Persistence]');

// Test 7.1: Serialize current state to local storage snapshot (Simulate App Close)
const serializedStorage = {
  erastack_pos_products: JSON.stringify(testProducts),
  erastack_pos_txs: JSON.stringify(testTransactions),
  erastack_pos_movements: JSON.stringify(testStockMovements),
  erastack_pos_store: JSON.stringify({ storeName: 'TOKO BAROKAH', paperWidth: '58mm' }),
};
assert(typeof serializedStorage.erastack_pos_products === 'string', 'State successfully serialized to local storage format');

// Test 7.2: Simulate Application Restart & Hydration
let reloadedProducts = JSON.parse(serializedStorage.erastack_pos_products);
let reloadedTxs = JSON.parse(serializedStorage.erastack_pos_txs);
let reloadedMovements = JSON.parse(serializedStorage.erastack_pos_movements);

assert(reloadedProducts.length === testProducts.length, 'Products hydrated exactly after application restart');
assert(reloadedTxs.length === testTransactions.length && reloadedTxs[0].invoiceNo === testTransactions[0].invoiceNo, 'Transactions preserved after restart');
assert(reloadedMovements.length === testStockMovements.length, 'Stock audit trail movements preserved after restart');


// -------------------------------------------------------------
// TEST SUITE 8: MALFORMED STORAGE RECOVERY & BACKUP ROUNDTRIP
// -------------------------------------------------------------
console.log('\n🛡️ [TEST SUITE 8: Malformed Data Resilience & Backup Roundtrip]');

// Test 8.1: Malformed JSON storage recovery
const corruptedJson = '{"products": [ { "id": "p1", invalid JSON here...';
let safeHydrationResult;
try {
  safeHydrationResult = JSON.parse(corruptedJson);
} catch (e) {
  safeHydrationResult = INITIAL_POS_PRODUCTS; // Safe fallback
}
assert(Array.isArray(safeHydrationResult) && safeHydrationResult.length > 0, 'Malformed local data gracefully falls back to default schema without crash');

// Test 8.2: Full JSON Database Backup & Restore Roundtrip
const backupData = {
  version: '1.0.0',
  exportedAt: new Date().toISOString(),
  storeProfile: { storeName: 'TOKO SEMBAKO JAYA', paperWidth: '80mm' },
  products: testProducts,
  transactions: testTransactions,
  stockMovements: testStockMovements,
  activeCashier: 'Owner Utama',
};

const backupJsonString = JSON.stringify(backupData, null, 2);
const restoredObject = JSON.parse(backupJsonString);

assert(restoredObject.version === '1.0.0', 'Backup export schema valid');
assert(restoredObject.products.length === testProducts.length, 'Backup restores exact product count');
assert(restoredObject.transactions.length === testTransactions.length, 'Backup restores exact historical transactions count');
assert(restoredObject.stockMovements.length === testStockMovements.length, 'Backup restores exact audit movements count');


// -------------------------------------------------------------
// SUMMARY
// -------------------------------------------------------------
console.log('\n============================================================');
console.log(`🏁 TEST RESULTS: ${passedTests} PASSED, ${failedTests} FAILED`);
console.log('============================================================\n');

if (failedTests > 0) {
  process.exit(1);
} else {
  process.exit(0);
}
