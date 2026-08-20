'use client';

import React from 'react';
import { SEOHead } from '../components/common/SEOHead';
import { HeroSection } from '../components/home/HeroSection';
import { TechStackStrip } from '../components/home/TechStackStrip';
import { FeaturesSection } from '../components/home/FeaturesSection';
import { WorkflowSection } from '../components/home/WorkflowSection';
import { BusinessSolutionsSection } from '../components/home/BusinessSolutionsSection';
import { HardwareSection } from '../components/home/HardwareSection';
import { ComparisonSection } from '../components/home/ComparisonSection';
import { ArchitectureSection } from '../components/home/ArchitectureSection';
import { FaqSection } from '../components/home/FaqSection';
import { CtaBannerSection } from '../components/home/CtaBannerSection';
import './HomePage.css';

export const HomePage: React.FC = () => {
  return (
    <div className="homepage-root">
      <SEOHead
        title="Offline-First Point of Sale & Business Management Platform"
        description="ERASTACK adalah platform POS offline-first untuk mengelola transaksi, produk, inventaris, dan laporan bisnis. Berjalan di Windows dan Android tanpa memerlukan koneksi internet."
      />

      <HeroSection />

      <TechStackStrip />

      <FeaturesSection />

      <WorkflowSection />

      <BusinessSolutionsSection />

      <HardwareSection />

      <ComparisonSection />

      <ArchitectureSection />

      <FaqSection />

      <CtaBannerSection />
    </div>
  );
};
