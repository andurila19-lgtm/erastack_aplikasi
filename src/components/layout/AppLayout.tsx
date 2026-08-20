'use client';

import React, { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { Navbar } from './Navbar';
import { MobileNav } from './MobileNav';
import { CommandPalette } from './CommandPalette';
import { Footer } from './Footer';
import { ErrorBoundary } from '../common/ErrorBoundary';
import './AppLayout.css';

export const AppLayout: React.FC<{ children?: React.ReactNode }> = ({ children }) => {
  const [isCommandOpen, setIsCommandOpen] = useState(false);
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsCommandOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div className="app-shell">
      <Navbar
        onOpenCommand={() => setIsCommandOpen(true)}
        onToggleMobileNav={() => setIsMobileNavOpen((prev) => !prev)}
        isMobileNavOpen={isMobileNavOpen}
      />

      <MobileNav
        isOpen={isMobileNavOpen}
        onClose={() => setIsMobileNavOpen(false)}
        onOpenCommand={() => setIsCommandOpen(true)}
      />

      <CommandPalette
        isOpen={isCommandOpen}
        onClose={() => setIsCommandOpen(false)}
      />

      <main id="main-content" className="app-main-content">
        <ErrorBoundary>
          {children}
        </ErrorBoundary>
      </main>

      <Footer />
    </div>
  );
};
