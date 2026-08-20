'use client';

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { 
  PosProduct, CartItem, TransactionRecord, StoreProfile, 
  StockMovement, StockMovementType, UserRole, RolePermissionConfig, ROLE_PERMISSIONS,
  INITIAL_POS_PRODUCTS, DEFAULT_STORE_PROFILE 
} from '../data/posInitialData';

interface PosContextType {
  products: PosProduct[];
  cart: CartItem[];
  cartDiscount: number;
  transactions: TransactionRecord[];
  stockMovements: StockMovement[];
  storeProfile: StoreProfile;
  activeCashier: string;
  currentRole: UserRole;
  lastTransaction: TransactionRecord | null;
  hasPermission: (perm: keyof RolePermissionConfig) => boolean;
  setCurrentRole: (role: UserRole) => void;
  addToCart: (product: PosProduct, qty?: number) => boolean;
  removeFromCart: (productId: string) => void;
  updateCartQty: (productId: string, qty: number) => void;
  setCartDiscount: (discount: number) => void;
  clearCart: () => void;
  completeTransaction: (
    paidAmount: number, 
    paymentMethod: 'TUNAI' | 'QRIS' | 'TRANSFER', 
    notes?: string
  ) => TransactionRecord | null;
  addProduct: (product: Omit<PosProduct, 'id'>) => boolean;
  importProducts: (products: Omit<PosProduct, 'id'>[]) => number;
  updateProduct: (id: string, updates: Partial<PosProduct>) => boolean;
  adjustStock: (productId: string, newStock: number, type: 'RESTOCK' | 'ADJUSTMENT', notes?: string) => boolean;
  deleteProduct: (id: string) => boolean;
  updateStoreProfile: (updates: Partial<StoreProfile>) => boolean;
  setActiveCashier: (name: string) => void;
  exportBackupData: () => any;
  restoreBackupData: (backupJson: string) => { success: boolean; message: string };
  resetToDefaultData: () => void;
}

const PosContext = createContext<PosContextType | null>(null);

export const PosProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [products, setProducts] = useState<PosProduct[]>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('erastack_pos_products');
      if (saved) {
        try { return JSON.parse(saved); } catch {}
      }
    }
    return INITIAL_POS_PRODUCTS;
  });

  const [cart, setCart] = useState<CartItem[]>([]);
  const [cartDiscount, setCartDiscountState] = useState<number>(0);
  
  const [transactions, setTransactions] = useState<TransactionRecord[]>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('erastack_pos_txs');
      if (saved) {
        try { return JSON.parse(saved); } catch {}
      }
    }
    return [];
  });

  const [stockMovements, setStockMovements] = useState<StockMovement[]>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('erastack_pos_movements');
      if (saved) {
        try { return JSON.parse(saved); } catch {}
      }
    }
    return [];
  });

  const [storeProfile, setStoreProfile] = useState<StoreProfile>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('erastack_pos_store');
      if (saved) {
        try { return JSON.parse(saved); } catch {}
      }
    }
    return DEFAULT_STORE_PROFILE;
  });

  const [activeCashier, setActiveCashierState] = useState<string>(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('erastack_pos_cashier') || 'Kasir Utama';
    }
    return 'Kasir Utama';
  });

  const [currentRole, setCurrentRoleState] = useState<UserRole>(() => {
    if (typeof window !== 'undefined') {
      return (localStorage.getItem('erastack_pos_role') as UserRole) || 'OWNER';
    }
    return 'OWNER';
  });

  const [lastTransaction, setLastTransaction] = useState<TransactionRecord | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('erastack_pos_products', JSON.stringify(products));
    }
  }, [products]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('erastack_pos_txs', JSON.stringify(transactions));
    }
  }, [transactions]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('erastack_pos_movements', JSON.stringify(stockMovements));
    }
  }, [stockMovements]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('erastack_pos_store', JSON.stringify(storeProfile));
    }
  }, [storeProfile]);

  const setActiveCashier = (name: string) => {
    setActiveCashierState(name);
    if (typeof window !== 'undefined') {
      localStorage.setItem('erastack_pos_cashier', name);
    }
  };

  const setCurrentRole = (role: UserRole) => {
    setCurrentRoleState(role);
    if (typeof window !== 'undefined') {
      localStorage.setItem('erastack_pos_role', role);
    }
  };

  const hasPermission = useCallback((perm: keyof RolePermissionConfig): boolean => {
    return !!ROLE_PERMISSIONS[currentRole]?.[perm];
  }, [currentRole]);

  const setCartDiscount = useCallback((discount: number) => {
    setCartDiscountState(Math.max(0, discount || 0));
  }, []);

  const addToCart = useCallback((product: PosProduct, qty = 1): boolean => {
    if (product.stock <= 0 || product.isActive === false) {
      return false;
    }

    let success = true;
    setCart((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        const targetQty = existing.qty + qty;
        if (targetQty > product.stock) {
          success = false;
          return prev.map((item) =>
            item.product.id === product.id
              ? { ...item, qty: product.stock }
              : item
          );
        }
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, qty: targetQty }
            : item
        );
      }

      const initialQty = Math.min(product.stock, Math.max(1, qty));
      return [...prev, { product, qty: initialQty, discount: 0 }];
    });

    return success;
  }, []);

  const removeFromCart = useCallback((productId: string) => {
    setCart((prev) => prev.filter((item) => item.product.id !== productId));
  }, []);

  const updateCartQty = useCallback((productId: string, qty: number) => {
    if (qty <= 0) {
      removeFromCart(productId);
      return;
    }

    setCart((prev) =>
      prev.map((item) => {
        if (item.product.id === productId) {
          const maxStock = item.product.stock;
          const safeQty = Math.min(maxStock, qty);
          return { ...item, qty: safeQty };
        }
        return item;
      })
    );
  }, [removeFromCart]);

  const clearCart = useCallback(() => {
    setCart([]);
    setCartDiscountState(0);
  }, []);

  const completeTransaction = useCallback((
    paidAmount: number,
    paymentMethod: 'TUNAI' | 'QRIS' | 'TRANSFER',
    notes?: string
  ): TransactionRecord | null => {
    if (cart.length === 0) return null;

    // 1. Calculate totals
    const totalAmount = cart.reduce((acc, item) => acc + (item.product.sellPrice * item.qty), 0);
    const validDiscount = Math.min(totalAmount, Math.max(0, cartDiscount));
    const finalAmount = Math.max(0, totalAmount - validDiscount);

    // 2. Validate Payment Amount
    if (paymentMethod === 'TUNAI' && paidAmount < finalAmount) {
      return null;
    }

    const actualPaid = paymentMethod === 'TUNAI' ? paidAmount : finalAmount;
    const changeAmount = paymentMethod === 'TUNAI' ? Math.max(0, actualPaid - finalAmount) : 0;

    // 3. Atomicity & Negative Stock Guard: Ensure every item has sufficient stock
    for (const item of cart) {
      const currentProd = products.find((p) => p.id === item.product.id);
      if (!currentProd || currentProd.stock < item.qty) {
        return null; // Block transaction if any stock is insufficient
      }
    }

    // 4. Generate unique atomic invoice & transaction ID
    const now = new Date();
    const invoiceNo = `INV-${now.getFullYear()}${String(now.getMonth() + 1).padStart(2, '0')}${String(now.getDate()).padStart(2, '0')}-${String(Math.floor(1000 + Math.random() * 9000))}`;
    const txId = `tx-${Date.now()}-${Math.floor(Math.random() * 1000)}`;

    // Store immutable snapshot of transaction items
    const txRecord: TransactionRecord = {
      id: txId,
      invoiceNo,
      timestamp: now.toISOString(),
      items: cart.map((item) => ({
        productId: item.product.id,
        productName: item.product.name,
        qty: item.qty,
        sellPrice: item.product.sellPrice,
        buyPrice: item.product.buyPrice,
        subtotal: item.product.sellPrice * item.qty,
      })),
      totalAmount,
      discountAmount: validDiscount,
      finalAmount,
      paidAmount: actualPaid,
      changeAmount,
      paymentMethod,
      cashierName: activeCashier,
      notes,
    };

    // 5. Create Stock Movement Audit Trail Entries
    const newMovements: StockMovement[] = cart.map((ci) => {
      const prod = products.find((p) => p.id === ci.product.id)!;
      return {
        id: `mov-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
        productId: prod.id,
        productName: prod.name,
        type: 'SALE',
        qtyChange: -ci.qty,
        stockBefore: prod.stock,
        stockAfter: prod.stock - ci.qty,
        timestamp: now.toISOString(),
        user: activeCashier,
        referenceId: invoiceNo,
        notes: `Penjualan Kasir #${invoiceNo}`,
      };
    });

    // 6. Atomic Stock Deduction
    setProducts((prev) =>
      prev.map((prod) => {
        const cartItem = cart.find((ci) => ci.product.id === prod.id);
        if (cartItem) {
          return { ...prod, stock: Math.max(0, prod.stock - cartItem.qty) };
        }
        return prod;
      })
    );

    // 7. Append History, Movements, & Reset Cart
    setTransactions((prev) => [txRecord, ...prev]);
    setStockMovements((prev) => [...newMovements, ...prev]);
    setLastTransaction(txRecord);
    setCart([]);
    setCartDiscountState(0);

    return txRecord;
  }, [cart, cartDiscount, products, activeCashier]);

  const addProduct = useCallback((productData: Omit<PosProduct, 'id'>): boolean => {
    if (!hasPermission('canManageInventory')) {
      return false;
    }

    const newId = `prod-${Date.now()}`;
    const newProduct: PosProduct = {
      ...productData,
      id: newId,
      isActive: true,
    };

    setProducts((prev) => [newProduct, ...prev]);

    if (newProduct.stock > 0) {
      const movement: StockMovement = {
        id: `mov-${Date.now()}`,
        productId: newId,
        productName: newProduct.name,
        type: 'RESTOCK',
        qtyChange: newProduct.stock,
        stockBefore: 0,
        stockAfter: newProduct.stock,
        timestamp: new Date().toISOString(),
        user: activeCashier,
        notes: 'Stok Awal Produk Baru',
      };
      setStockMovements((prev) => [movement, ...prev]);
    }

    return true;
  }, [hasPermission, activeCashier]);

  const importProducts = useCallback((importedList: Omit<PosProduct, 'id'>[]): number => {
    if (!hasPermission('canManageInventory') || !importedList || importedList.length === 0) return 0;
    
    let count = 0;
    const nowIso = new Date().toISOString();
    const newMovements: StockMovement[] = [];

    setProducts((prev) => {
      const updated = [...prev];
      importedList.forEach((item, idx) => {
        const existingIdx = updated.findIndex(
          (p) => (item.sku && p.sku === item.sku) || (item.barcode && p.barcode === item.barcode)
        );
        
        if (existingIdx >= 0) {
          const oldStock = updated[existingIdx].stock;
          updated[existingIdx] = {
            ...updated[existingIdx],
            ...item,
            isActive: true,
          };
          if (item.stock !== oldStock) {
            newMovements.push({
              id: `mov-${Date.now()}-${idx}`,
              productId: updated[existingIdx].id,
              productName: item.name,
              type: 'RESTOCK',
              qtyChange: item.stock - oldStock,
              stockBefore: oldStock,
              stockAfter: item.stock,
              timestamp: nowIso,
              user: activeCashier,
              notes: 'Import / Penyesuaian CSV',
            });
          }
          count++;
        } else {
          const newId = `prod-${Date.now()}-${idx}-${Math.floor(Math.random() * 1000)}`;
          const newProd: PosProduct = {
            ...item,
            id: newId,
            isActive: true,
          };
          updated.unshift(newProd);
          if (newProd.stock > 0) {
            newMovements.push({
              id: `mov-${Date.now()}-${idx}`,
              productId: newId,
              productName: newProd.name,
              type: 'RESTOCK',
              qtyChange: newProd.stock,
              stockBefore: 0,
              stockAfter: newProd.stock,
              timestamp: nowIso,
              user: activeCashier,
              notes: 'Import CSV Produk Baru',
            });
          }
          count++;
        }
      });
      return updated;
    });

    if (newMovements.length > 0) {
      setStockMovements((prev) => [...newMovements, ...prev]);
    }

    return count;
  }, [hasPermission, activeCashier]);

  const updateProduct = useCallback((id: string, updates: Partial<PosProduct>): boolean => {
    if (!hasPermission('canManageInventory')) {
      return false;
    }

    setProducts((prev) =>
      prev.map((prod) => (prod.id === id ? { ...prod, ...updates } : prod))
    );
    return true;
  }, [hasPermission]);

  const adjustStock = useCallback((
    productId: string, 
    newStock: number, 
    type: 'RESTOCK' | 'ADJUSTMENT', 
    notes?: string
  ): boolean => {
    if (!hasPermission('canAdjustStock')) {
      return false;
    }

    const prod = products.find((p) => p.id === productId);
    if (!prod) return false;

    const stockBefore = prod.stock;
    const stockAfter = Math.max(0, newStock);
    const qtyChange = stockAfter - stockBefore;

    setProducts((prev) =>
      prev.map((p) => (p.id === productId ? { ...p, stock: stockAfter } : p))
    );

    const movement: StockMovement = {
      id: `mov-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
      productId,
      productName: prod.name,
      type,
      qtyChange,
      stockBefore,
      stockAfter,
      timestamp: new Date().toISOString(),
      user: activeCashier,
      notes: notes || (type === 'RESTOCK' ? 'Penambahan Stok Manual' : 'Penyesuaian Fisik / Opname'),
    };

    setStockMovements((prev) => [movement, ...prev]);
    return true;
  }, [hasPermission, products, activeCashier]);

  const deleteProduct = useCallback((id: string): boolean => {
    if (!hasPermission('canDeleteProducts')) {
      return false;
    }

    // Soft delete: keep historical reference intact
    setProducts((prev) =>
      prev.map((prod) => (prod.id === id ? { ...prod, isActive: false } : prod))
    );
    return true;
  }, [hasPermission]);

  const updateStoreProfile = useCallback((updates: Partial<StoreProfile>): boolean => {
    if (!hasPermission('canManageSettings')) {
      return false;
    }

    setStoreProfile((prev) => ({ ...prev, ...updates }));
    return true;
  }, [hasPermission]);

  const exportBackupData = useCallback(() => {
    return {
      version: '1.0.0',
      exportedAt: new Date().toISOString(),
      storeProfile,
      products,
      transactions,
      stockMovements,
      activeCashier,
    };
  }, [storeProfile, products, transactions, stockMovements, activeCashier]);

  const restoreBackupData = useCallback((backupJson: string): { success: boolean; message: string } => {
    if (!hasPermission('canManageSettings')) {
      return { success: false, message: 'Izin ditolak: Hanya Owner yang dapat memulihkan database.' };
    }

    try {
      const data = JSON.parse(backupJson);
      if (!data || typeof data !== 'object') {
        return { success: false, message: 'Format file cadangan tidak valid (bukan JSON objek).' };
      }

      if (Array.isArray(data.products)) {
        setProducts(data.products);
      }
      if (Array.isArray(data.transactions)) {
        setTransactions(data.transactions);
      }
      if (Array.isArray(data.stockMovements)) {
        setStockMovements(data.stockMovements);
      }
      if (data.storeProfile && typeof data.storeProfile === 'object') {
        setStoreProfile(data.storeProfile);
      }
      if (data.activeCashier) {
        setActiveCashier(data.activeCashier);
      }

      setCart([]);
      setCartDiscountState(0);
      return { 
        success: true, 
        message: `Database berhasil dipulihkan: ${data.products?.length || 0} produk, ${data.transactions?.length || 0} riwayat transaksi.` 
      };
    } catch (e: any) {
      return { success: false, message: `Gagal memproses file: ${e.message || 'Format JSON rusak.'}` };
    }
  }, [hasPermission]);

  const resetToDefaultData = useCallback(() => {
    if (!hasPermission('canManageSettings')) {
      return;
    }

    setProducts(INITIAL_POS_PRODUCTS);
    setStoreProfile(DEFAULT_STORE_PROFILE);
    setCart([]);
    setCartDiscountState(0);
    setTransactions([]);
    setStockMovements([]);
    if (typeof window !== 'undefined') {
      localStorage.removeItem('erastack_pos_products');
      localStorage.removeItem('erastack_pos_txs');
      localStorage.removeItem('erastack_pos_movements');
      localStorage.removeItem('erastack_pos_store');
    }
  }, [hasPermission]);

  return (
    <PosContext.Provider
      value={{
        products,
        cart,
        cartDiscount,
        transactions,
        stockMovements,
        storeProfile,
        activeCashier,
        currentRole,
        lastTransaction,
        hasPermission,
        setCurrentRole,
        addToCart,
        removeFromCart,
        updateCartQty,
        setCartDiscount,
        clearCart,
        completeTransaction,
        addProduct,
        importProducts,
        updateProduct,
        adjustStock,
        deleteProduct,
        updateStoreProfile,
        setActiveCashier,
        exportBackupData,
        restoreBackupData,
        resetToDefaultData,
      }}
    >
      {children}
    </PosContext.Provider>
  );
};

export const usePos = () => {
  const ctx = useContext(PosContext);
  if (!ctx) {
    throw new Error('usePos must be used within PosProvider');
  }
  return ctx;
};
