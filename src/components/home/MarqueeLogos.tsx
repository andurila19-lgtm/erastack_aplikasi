import React from 'react';
import { Coffee, ShoppingBag, Scissors, Wrench, Store, UtensilsCrossed } from 'lucide-react';
import './MarqueeLogos.css';

const MERCHANTS = [
  { name: 'Kopi Kenangan Senja', sector: 'F&B Coffee Shop', icon: <Coffee size={16} /> },
  { name: 'Minimarket Barokah 24', sector: 'Retail & Grocery', icon: <Store size={16} /> },
  { name: 'Urban Barber Studio', sector: 'Service & Salon', icon: <Scissors size={16} /> },
  { name: 'Sinar Jaya Spareparts', sector: 'Automotive & Bengkel', icon: <Wrench size={16} /> },
  { name: 'Dapur Nusantara Resto', sector: 'Culinary Restaurant', icon: <UtensilsCrossed size={16} /> },
  { name: 'Elegance Boutique', sector: 'Fashion & Apparel', icon: <ShoppingBag size={16} /> },
];

export const MarqueeLogos: React.FC = () => {
  return (
    <section className="marquee-section">
      <div className="container marquee-container">
        <p className="marquee-title">
          DIGUNAKAN OLEH RIBUAN MERCHANTS DI SELURUH INDONESIA DARI BERBAGAI BIDANG USAHA
        </p>

        <div className="marquee-track-wrapper">
          <div className="marquee-grid">
            {MERCHANTS.map((m, idx) => (
              <div key={idx} className="merchant-logo-card">
                <span className="merchant-icon">{m.icon}</span>
                <div className="merchant-info">
                  <span className="merchant-name">{m.name}</span>
                  <span className="merchant-sector">{m.sector}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
