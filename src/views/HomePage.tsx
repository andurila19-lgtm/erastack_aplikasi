'use client';

import React from 'react';
import { SEOHead } from '../components/common/SEOHead';
import { HeroSection } from '../components/home/HeroSection';
import { MarqueeLogos } from '../components/home/MarqueeLogos';
import { FeaturesSection } from '../components/home/FeaturesSection';
import { BusinessSolutionsSection } from '../components/home/BusinessSolutionsSection';
import { HardwareSection } from '../components/home/HardwareSection';
import { ComparisonSection } from '../components/home/ComparisonSection';
import { TestimonialsSection } from '../components/home/TestimonialsSection';
import { FaqSection } from '../components/home/FaqSection';
import { CtaBannerSection } from '../components/home/CtaBannerSection';
import './HomePage.css';

export const HomePage: React.FC = () => {
  return (
    <div className="homepage-root">
      <SEOHead
        title="Aplikasi Kasir POS Digital & Manajemen Bisnis Offline-First"
        description="ERASTACK POS adalah aplikasi kasir pintar offline-first untuk Windows & Android. Scan barcode instan, kelola stok barang otomatis, dan nikmati asisten AI toko tanpa kuota internet."
      />

      <HeroSection />

      <MarqueeLogos />

      <FeaturesSection />

      <BusinessSolutionsSection />

      <HardwareSection />

      <ComparisonSection />

      <TestimonialsSection />

      <FaqSection />

      <CtaBannerSection />
    </div>
  );
};
