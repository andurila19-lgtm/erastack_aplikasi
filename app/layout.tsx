import type { Metadata, Viewport } from 'next';
import { AppWrapper } from '../src/components/layout/AppWrapper';
import '../src/styles/tokens.css';
import '../src/styles/global.css';

export const metadata: Metadata = {
  metadataBase: new URL('https://erastack.cloud'),
  title: {
    default: 'ERASTACK POS • Aplikasi Kasir Pintar Offline & Asisten Toko Cerdas',
    template: '%s | ERASTACK',
  },
  description: 'Aplikasi kasir cerdas 100% offline-first untuk toko, warung, kafe, dan UMKM di Indonesia. Ringan, cepat, gratis selamanya tanpa biaya sewa langganan.',
  keywords: [
    'aplikasi kasir',
    'pos offline',
    'aplikasi toko',
    'kasir gratis',
    'erastack pos',
    'software kasir indonesia',
    'erastack cloud',
  ],
  authors: [{ name: 'ERASTACK Core Team', url: 'https://erastack.cloud' }],
  creator: 'ERASTACK',
  publisher: 'ERASTACK Cloud Ecosystem',
  alternates: {
    canonical: 'https://erastack.cloud',
  },
  openGraph: {
    type: 'website',
    locale: 'id_ID',
    url: 'https://erastack.cloud',
    title: 'ERASTACK POS • Solusi Kasir Pintar untuk Memajukan Toko & Usaha Anda',
    description: 'Aplikasi kasir cerdas 100% offline-first untuk toko, warung, kafe, dan UMKM di Indonesia. Ringan, cepat, gratis selamanya.',
    siteName: 'ERASTACK POS',
    images: [
      {
        url: '/brand/erastack-icon.png',
        width: 512,
        height: 512,
        alt: 'ERASTACK POS Logo',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ERASTACK POS • Aplikasi Kasir Pintar Offline & Asisten Toko Cerdas',
    description: 'Aplikasi kasir cerdas 100% offline-first untuk toko & UMKM. Gratis selamanya tanpa biaya langganan.',
    images: ['/brand/erastack-icon.png'],
  },
  manifest: '/manifest.json',
  icons: {
    icon: '/brand/erastack-icon.png',
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
