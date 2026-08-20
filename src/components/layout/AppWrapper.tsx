'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { Navbar } from './Navbar';
import { MobileNav } from './MobileNav';
import { Footer } from './Footer';
import { CommandPalette } from './CommandPalette';
import { ToastProvider } from '../../context/ToastContext';

export const AppWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isCommandOpen, setIsCommandOpen] = useState(false);
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);

  const handleOpenCommand = useCallback(() => setIsCommandOpen(true), []);
  const handleCloseCommand = useCallback(() => setIsCommandOpen(false), []);
  const handleToggleMobileNav = useCallback(() => setIsMobileNavOpen(prev => !prev), []);
  const handleCloseMobileNav = useCallback(() => setIsMobileNavOpen(false), []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsCommandOpen(prev => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <ToastProvider>
      <div className="app-root">
        <Navbar
          onOpenCommand={handleOpenCommand}
          onToggleMobileNav={handleToggleMobileNav}
          isMobileNavOpen={isMobileNavOpen}
        />
        <MobileNav
          isOpen={isMobileNavOpen}
          onClose={handleCloseMobileNav}
          onOpenCommand={handleOpenCommand}
        />
        <main id="main-content" className="app-main" tabIndex={-1}>
          {children}
        </main>
        <Footer />
        <CommandPalette
          isOpen={isCommandOpen}
          onClose={handleCloseCommand}
        />
      </div>
    </ToastProvider>
  );
};
