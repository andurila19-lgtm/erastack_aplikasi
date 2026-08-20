import React from 'react';
import { HardDrive, Monitor, Smartphone, Database, Cpu, Wifi } from 'lucide-react';
import './TechStackStrip.css';

const TECH_ITEMS = [
  { label: 'Windows Desktop', icon: <Monitor size={16} /> },
  { label: 'Android Mobile', icon: <Smartphone size={16} /> },
  { label: 'SQLite Database', icon: <Database size={16} /> },
  { label: 'Offline-First', icon: <HardDrive size={16} /> },
  { label: 'Local AI', icon: <Cpu size={16} /> },
  { label: 'No Internet Required', icon: <Wifi size={16} /> },
];

export const TechStackStrip: React.FC = () => {
  return (
    <section className="tech-strip-section">
      <div className="container tech-strip-container">
        <p className="tech-strip-label">Platform & Technology</p>
        <div className="tech-strip-grid">
          {TECH_ITEMS.map((item, idx) => (
            <div key={idx} className="tech-strip-item">
              <span className="tech-strip-icon">{item.icon}</span>
              <span className="tech-strip-text">{item.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
