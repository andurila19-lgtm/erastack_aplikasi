'use client';

import React from 'react';
import Link from 'next/link';
import { AlertCircle, ArrowLeft } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '../components/ui/Card';
import { SEOHead } from '../components/common/SEOHead';

export const NotFoundPage: React.FC = () => {
  return (
    <div className="placeholder-page">
      <SEOHead title="404 — Halaman Tidak Ditemukan" description="Halaman yang Anda cari tidak tersedia pada sistem rute ERASTACK." />
      <div className="container placeholder-container">
        <Card variant="default" className="placeholder-card">
          <CardHeader>
            <div className="placeholder-badge-row">
              <span className="tabular-nums" style={{ color: 'var(--status-error)', fontWeight: 700 }}>404</span>
            </div>
            <CardTitle>Halaman Tidak Ditemukan</CardTitle>
            <CardDescription>
              Rute URL yang Anda tuju tidak terdaftar di direktori platform ERASTACK.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="placeholder-info-box">
              <AlertCircle size={18} style={{ color: 'var(--status-error)' }} />
              <p className="placeholder-info-text">
                Periksa kembali URL yang Anda masukkan atau gunakan Command Palette (<code>Cmd+K</code>) untuk navigasi cepat.
              </p>
            </div>
          </CardContent>
          <CardFooter>
            <Link href="/">
              <Button variant="primary" leftIcon={<ArrowLeft size={16} />}>
                Kembali ke Beranda
              </Button>
            </Link>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};
