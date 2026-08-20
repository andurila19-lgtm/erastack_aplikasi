'use client';

import React, { useState } from 'react';
import { PosProvider, usePos } from '../../src/context/PosStoreContext';
import { PosNavbar } from '../../src/components/pos/PosNavbar';
import { PosRegister } from '../../src/components/pos/PosRegister';
import { PosInventory } from '../../src/components/pos/PosInventory';
import { PosReports } from '../../src/components/pos/PosReports';
import { PosSettings } from '../../src/components/pos/PosSettings';
import { PosPaymentModal } from '../../src/components/pos/PosPaymentModal';
import { PosReceiptModal } from '../../src/components/pos/PosReceiptModal';
import { TransactionRecord } from '../../src/data/posInitialData';

const PosMainApp: React.FC = () => {
  const [activeView, setActiveView] = useState<'register' | 'inventory' | 'reports' | 'settings'>('register');
  const [isPaymentOpen, setIsPaymentOpen] = useState(false);
  const [isReceiptOpen, setIsReceiptOpen] = useState(false);
  const [receiptTx, setReceiptTx] = useState<TransactionRecord | null>(null);

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
    <div className="pos-app-wrapper" style={{ minHeight: '100vh', backgroundColor: '#F8FAFC' }}>
      <PosNavbar activeView={activeView} setActiveView={setActiveView} />

      <main className="pos-app-content">
        {activeView === 'register' && (
          <PosRegister onOpenPayment={() => setIsPaymentOpen(true)} />
        )}
        {activeView === 'inventory' && <PosInventory />}
        {activeView === 'reports' && <PosReports onReprint={handleReprint} />}
        {activeView === 'settings' && <PosSettings />}
      </main>

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
