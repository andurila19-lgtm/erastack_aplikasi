'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { usePathname } from 'next/navigation';
import { Navbar } from './Navbar';
import { MobileNav } from './MobileNav';
import { Footer } from './Footer';
import { CommandPalette } from './CommandPalette';
import { ToastProvider } from '../../context/ToastContext';

export const AppWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const pathname = usePathname();
  const [isCommandOpen, setIsCommandOpen] = useState(false);
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  const [isNativeApp, setIsNativeApp] = useState(false);

  useEffect(() => {
    try {
      if (typeof window !== 'undefined') {
        const isCapacitor = Boolean(
          (window as unknown as { Capacitor?: { isNativePlatform?: () => boolean } }).Capacitor?.isNativePlatform?.()
        );
        const isTauri = Boolean(
          (window as unknown as { __TAURI_INTERNALS__?: unknown; __TAURI__?: unknown }).__TAURI_INTERNALS__ ||
          (window as unknown as { __TAURI_INTERNALS__?: unknown; __TAURI__?: unknown }).__TAURI__
        );
        if (isCapacitor || isTauri) {
          setIsNativeApp(true);
        }
      }
    } catch {}
  }, []);

  const isPosRoute = Boolean(pathname && pathname.startsWith('/pos'));
  const isCleanLayout = isPosRoute || isNativeApp;

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

  if (isCleanLayout) {
    return (
      <ToastProvider>
        <div className="pos-standalone-root">
          {children}
        </div>
      </ToastProvider>
    );
  }

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
