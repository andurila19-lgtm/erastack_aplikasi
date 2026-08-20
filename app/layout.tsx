import type { Metadata, Viewport } from 'next';
import { AppWrapper } from '../src/components/layout/AppWrapper';
import '../src/styles/tokens.css';
import '../src/styles/global.css';

export const metadata: Metadata = {
  metadataBase: new URL('https://erastack.cloud'),
  title: {
    default: 'ERASTACK — Offline-First Point of Sale & Business Management Platform',
    template: '%s | ERASTACK',
  },
  description: 'Platform POS modern untuk mengelola transaksi, produk, inventory, laporan, dan operasional bisnis dengan pendekatan offline-first.',
  keywords: [
    'aplikasi kasir',
    'pos offline-first',
    'point of sale',
    'erastack pos',
    'sqlite pos',
    'software kasir windows android',
    'local ai assistant pos',
  ],
  authors: [{ name: 'ERASTACK Core Team', url: 'https://erastack.cloud' }],
  creator: 'ERASTACK',
  publisher: 'ERASTACK Ecosystem',
  alternates: {
    canonical: 'https://erastack.cloud',
  },
  openGraph: {
    type: 'website',
    locale: 'id_ID',
    url: 'https://erastack.cloud',
    title: 'ERASTACK — Offline-First Point of Sale & Business Management Platform',
    description: 'Platform POS modern untuk mengelola transaksi, produk, inventory, laporan, dan operasional bisnis dengan pendekatan offline-first.',
    siteName: 'ERASTACK POS',
    images: [
      {
        url: '/brand/erastack-icon.png',
        width: 512,
        height: 512,
        alt: 'ERASTACK Logo',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ERASTACK — Offline-First Point of Sale & Business Platform',
    description: 'Platform POS modern untuk mengelola transaksi, produk, inventory, laporan, dan operasional bisnis dengan pendekatan offline-first.',
    images: ['/brand/erastack-icon.png'],
  },
  manifest: '/manifest.json',
  icons: {
    icon: [
      { url: '/favicon.svg', type: 'image/svg+xml' },
      { url: '/brand/erastack-icon.png', sizes: '192x192', type: 'image/png' },
    ],
    shortcut: '/favicon.svg',
    apple: '/brand/erastack-icon.png',
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'ERASTACK POS',
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: '#0066FF',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&family=JetBrains+Mono:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="ERASTACK POS" />
      </head>
      <body>
        <AppWrapper>{children}</AppWrapper>
      </body>
    </html>
  );
}
