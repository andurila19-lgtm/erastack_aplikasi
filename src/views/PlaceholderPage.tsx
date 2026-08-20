import React from 'react';
import Link from 'next/link';
import { Clock, ArrowLeft } from 'lucide-react';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '../components/ui/Card';
import { SEOHead } from '../components/common/SEOHead';
import './PlaceholderPage.css';

export interface PlaceholderPageProps {
  title: string;
  description: string;
  targetPhase: string;
  category: string;
}

export const PlaceholderPage: React.FC<PlaceholderPageProps> = ({
  title,
  description,
  targetPhase,
  category,
}) => {
  return (
    <div className="placeholder-page">
      <SEOHead title={`${title} (Dijadwalkan di ${targetPhase})`} description={description} />
      <div className="container placeholder-container">
        <Card variant="spotlight" className="placeholder-card">
          <CardHeader>
            <div className="placeholder-badge-row">
              <Badge variant="lime" dot>{targetPhase}</Badge>
              <Badge variant="outline">{category}</Badge>
            </div>
            <CardTitle className="placeholder-title">{title}</CardTitle>
            <CardDescription className="placeholder-desc">{description}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="placeholder-info-box">
              <Clock size={18} className="placeholder-clock-icon" />
              <p className="placeholder-info-text">
                Sesuai aturan rekayasa <strong>Anti-AI-Slop (QUALITY.md)</strong>, halaman ini akan dibangun secara mendalam pada <strong>{targetPhase}</strong> setelah tahapan fondasi ditinjau.
              </p>
            </div>
          </CardContent>
          <CardFooter>
            <Link href="/">
              <Button variant="secondary" leftIcon={<ArrowLeft size={16} />}>
                Kembali ke Foundation Showcase
              </Button>
            </Link>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};
