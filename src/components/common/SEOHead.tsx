'use client';

import React, { useEffect } from 'react';

export interface SEOHeadProps {
  title?: string;
  description?: string;
  canonical?: string;
  type?: string;
}

export const SEOHead: React.FC<SEOHeadProps> = ({
  title = 'Software • AI • Engineering Platform',
  description = 'ERASTACK adalah platform ekosistem teknologi untuk software offline-first, on-device AI engineering, aplikasi bisnis tangguh (ERASTACK POS), dan pusat rilis resmi.',
  canonical,
  type = 'website',
}) => {
  useEffect(() => {
    const fullTitle = `${title} | ERASTACK`;
    document.title = fullTitle;

    const updateMeta = (name: string, content: string, isProperty = false) => {
      const selector = isProperty ? `meta[property="${name}"]` : `meta[name="${name}"]`;
      let element = document.querySelector(selector) as HTMLMetaElement | null;
      if (!element) {
        element = document.createElement('meta');
        if (isProperty) {
          element.setAttribute('property', name);
        } else {
          element.setAttribute('name', name);
        }
        document.head.appendChild(element);
      }
      element.setAttribute('content', content);
    };

    updateMeta('description', description);
    updateMeta('og:title', fullTitle, true);
    updateMeta('og:description', description, true);
    updateMeta('og:type', type, true);
    updateMeta('og:site_name', 'ERASTACK', true);
    updateMeta('twitter:card', 'summary_large_image');
    updateMeta('twitter:title', fullTitle);
    updateMeta('twitter:description', description);

    if (canonical) {
      let linkCanonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
      if (!linkCanonical) {
        linkCanonical = document.createElement('link');
        linkCanonical.setAttribute('rel', 'canonical');
        document.head.appendChild(linkCanonical);
      }
      linkCanonical.setAttribute('href', canonical);
    }
  }, [title, description, canonical, type]);

  return null;
};
