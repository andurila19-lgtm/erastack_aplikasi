'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { PosProvider } from '../../src/context/PosStoreContext';
import { PosNavbar } from '../../src/components/pos/PosNavbar';
import { PosBottomNav } from '../../src/components/pos/PosBottomNav';
import { PosDashboard } from '../../src/components/pos/PosDashboard';
import { PosRegister } from '../../src/components/pos/PosRegister';
import { PosInventory } from '../../src/components/pos/PosInventory';
import { PosReports } from '../../src/components/pos/PosReports';
import { PosSettings } from '../../src/components/pos/PosSettings';
import { PosPaymentModal } from '../../src/components/pos/PosPaymentModal';
import { PosReceiptModal } from '../../src/components/pos/PosReceiptModal';
import { TransactionRecord } from '../../src/data/posInitialData';
import './pos-app.css';

type PosView = 'dashboard' | 'register' | 'inventory' | 'reports' | 'settings';

const VALID_VIEWS: PosView[] = ['dashboard', 'register', 'inventory', 'reports', 'settings'];

const PosMainApp: React.FC = () => {
  const [activeView, setActiveViewState] = useState<PosView>(() => {
    if (typeof window !== 'undefined') {
      const urlParams = new URLSearchParams(window.location.search);
      const tabParam = urlParams.get('tab') as PosView;
      if (tabParam && VALID_VIEWS.includes(tabParam)) {
        return tabParam;
      }
      const saved = localStorage.getItem('erastack_pos_active_view') as PosView;
      if (saved && VALID_VIEWS.includes(saved)) {
        return saved;
      }
    }
    return 'register';
  });

  const [isPaymentOpen, setIsPaymentOpen] = useState(false);
  const [isReceiptOpen, setIsReceiptOpen] = useState(false);
  const [receiptTx, setReceiptTx] = useState<TransactionRecord | null>(null);

  const setActiveView = useCallback((view: PosView) => {
    setActiveViewState(view);
    if (typeof window !== 'undefined') {
      localStorage.setItem('erastack_pos_active_view', view);
      const url = new URL(window.location.href);
      url.searchParams.set('tab', view);
      window.history.replaceState(null, '', url.toString());
    }
  }, []);

  useEffect(() => {
    const handlePopState = () => {
      const urlParams = new URLSearchParams(window.location.search);
      const tabParam = urlParams.get('tab') as PosView;
      if (tabParam && VALID_VIEWS.includes(tabParam)) {
        setActiveViewState(tabParam);
      }
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const handlePaymentSuccess = () => {
    setIsPaymentOpen(false);
    setReceiptTx(null);
    setIsReceiptOpen(true);
  };

  const handleReprint = (tx: TransactionRecord) => {
    setReceiptTx(tx);
    setIsReceiptOpen(true);
  };

  return (
    <div className="pos-app-wrapper">
      <PosNavbar activeView={activeView} setActiveView={setActiveView} />

      <main className="pos-app-content">
        {activeView === 'dashboard' && (
          <PosDashboard onNavigate={(view) => setActiveView(view)} />
        )}
        {activeView === 'register' && (
          <PosRegister onOpenPayment={() => setIsPaymentOpen(true)} />
        )}
        {activeView === 'inventory' && <PosInventory />}
        {activeView === 'reports' && <PosReports onReprint={handleReprint} />}
        {activeView === 'settings' && <PosSettings />}
      </main>

      <PosBottomNav activeView={activeView} setActiveView={setActiveView} />

      <PosPaymentModal
        isOpen={isPaymentOpen}
        onClose={() => setIsPaymentOpen(false)}
        onSuccess={handlePaymentSuccess}
      />

      <PosReceiptModal
        isOpen={isReceiptOpen}
        onClose={() => setIsReceiptOpen(false)}
        transaction={receiptTx}
      />
    </div>
  );
};

export default function PosPage() {
  return (
    <PosProvider>
      <PosMainApp />
    </PosProvider>
  );
}
