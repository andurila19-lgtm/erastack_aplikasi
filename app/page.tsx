'use client';

import React, { useState, useEffect } from 'react';
import { HomePage } from '../src/views/HomePage';
import PosPage from './pos/page';

export default function Page() {
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

  if (isNativeApp) {
    return <PosPage />;
  }

  return <HomePage />;
}
