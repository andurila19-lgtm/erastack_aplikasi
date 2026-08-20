'use client';

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { 
  PosProduct, CartItem, TransactionRecord, StoreProfile, 
  INITIAL_POS_PRODUCTS, DEFAULT_STORE_PROFILE 
} from '../data/posInitialData';

interface PosContextType {
  products: PosProduct[];
  cart: CartItem[];
  transactions: TransactionRecord[];
  storeProfile: StoreProfile;
  activeCashier: string;
  lastTransaction: TransactionRecord | null;
  addToCart: (product: PosProduct, qty?: number) => void;
  removeFromCart: (productId: string) => void;
  updateCartQty: (productId: string, qty: number) => void;
  clearCart: () => void;
  completeTransaction: (
    paidAmount: number, 
    paymentMethod: 'TUNAI' | 'QRIS' | 'TRANSFER', 
    discountTotal?: number,
    notes?: string
  ) => TransactionRecord | null;
  addProduct: (product: Omit<PosProduct, 'id'>) => void;
  updateProduct: (id: string, updates: Partial<PosProduct>) => void;
  deleteProduct: (id: string) => void;
  updateStoreProfile: (updates: Partial<StoreProfile>) => void;
  setActiveCashier: (name: string) => void;
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
  const [transactions, setTransactions] = useState<TransactionRecord[]>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('erastack_pos_txs');
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
      localStorage.setItem('erastack_pos_store', JSON.stringify(storeProfile));
    }
  }, [storeProfile]);

  const setActiveCashier = (name: string) => {
    setActiveCashierState(name);
    if (typeof window !== 'undefined') {
      localStorage.setItem('erastack_pos_cashier', name);
    }
  };

  const addToCart = useCallback((product: PosProduct, qty = 1) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, qty: item.qty + qty }
            : item
        );
      }
      return [...prev, { product, qty, discount: 0 }];
    });
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
      prev.map((item) =>
        item.product.id === productId ? { ...item, qty } : item
      )
    );
  }, [removeFromCart]);

  const clearCart = useCallback(() => {
    setCart([]);
  }, []);

  const completeTransaction = useCallback((
    paidAmount: number,
    paymentMethod: 'TUNAI' | 'QRIS' | 'TRANSFER',
    discountTotal = 0,
    notes?: string
  ): TransactionRecord | null => {
    if (cart.length === 0) return null;

    const totalAmount = cart.reduce((acc, item) => acc + (item.product.sellPrice * item.qty), 0);
    const finalAmount = Math.max(0, totalAmount - discountTotal);
    const changeAmount = Math.max(0, paidAmount - finalAmount);

    const now = new Date();
    const invoiceNo = `INV-${now.getFullYear()}${String(now.getMonth() + 1).padStart(2, '0')}${String(now.getDate()).padStart(2, '0')}-${String(Math.floor(1000 + Math.random() * 9000))}`;

    const txRecord: TransactionRecord = {
      id: `tx-${Date.now()}`,
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
      discountAmount: discountTotal,
      finalAmount,
      paidAmount,
      changeAmount,
      paymentMethod,
      cashierName: activeCashier,
      notes,
    };

    setProducts((prev) =>
      prev.map((prod) => {
        const cartItem = cart.find((ci) => ci.product.id === prod.id);
        if (cartItem) {
          return { ...prod, stock: Math.max(0, prod.stock - cartItem.qty) };
        }
        return prod;
      })
    );

    setTransactions((prev) => [txRecord, ...prev]);
    setLastTransaction(txRecord);
    setCart([]);

    return txRecord;
  }, [cart, activeCashier]);

  const addProduct = useCallback((productData: Omit<PosProduct, 'id'>) => {
    const newProduct: PosProduct = {
      ...productData,
      id: `prod-${Date.now()}`,
    };
    setProducts((prev) => [newProduct, ...prev]);
  }, []);

  const updateProduct = useCallback((id: string, updates: Partial<PosProduct>) => {
    setProducts((prev) =>
      prev.map((prod) => (prod.id === id ? { ...prod, ...updates } : prod))
    );
  }, []);

  const deleteProduct = useCallback((id: string) => {
    setProducts((prev) => prev.filter((prod) => prod.id !== id));
  }, []);

  const updateStoreProfile = useCallback((updates: Partial<StoreProfile>) => {
    setStoreProfile((prev) => ({ ...prev, ...updates }));
  }, []);

  const resetToDefaultData = useCallback(() => {
    setProducts(INITIAL_POS_PRODUCTS);
    setStoreProfile(DEFAULT_STORE_PROFILE);
    setCart([]);
  }, []);

  return (
    <PosContext.Provider
      value={{
        products,
        cart,
        transactions,
        storeProfile,
        activeCashier,
        lastTransaction,
        addToCart,
        removeFromCart,
        updateCartQty,
        clearCart,
        completeTransaction,
        addProduct,
        updateProduct,
        deleteProduct,
        updateStoreProfile,
        setActiveCashier,
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
