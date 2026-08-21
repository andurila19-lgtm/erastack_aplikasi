'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { Search, Package, Store, Cpu, Download, BookOpen, Clock, FileText, Info, ArrowRight, Zap } from 'lucide-react';
import './CommandPalette.css';

interface CommandItem {
  id: string;
  title: string;
  category: 'Produk' | 'Navigasi' | 'Panduan' | 'Fitur' | 'Unduhan' | 'Pembaruan' | 'Cerita Toko';
  icon: React.ReactNode;
  path: string;
}

export interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
}

const COMMANDS: CommandItem[] = [
  { id: 'home', title: 'Beranda / Halaman Utama Toko', category: 'Navigasi', icon: <Store size={16} />, path: '/' },
  { id: 'products', title: 'Katalog Aplikasi Kasir Toko', category: 'Produk', icon: <Package size={16} />, path: '/products' },
  { id: 'erastack-pos', title: 'ERASTACK POS (Aplikasi Kasir Offline)', category: 'Produk', icon: <Zap size={16} />, path: '/products/pos' },
  { id: 'downloads', title: 'Pusat Unduhan (Windows & Android)', category: 'Unduhan', icon: <Download size={16} />, path: '/downloads' },
  { id: 'ai-lab', title: 'Asisten AI Toko (Tanya Laba & Stok)', category: 'Fitur', icon: <Cpu size={16} />, path: '/ai-lab' },
  { id: 'projects', title: 'Kisah Sukses Toko & Bisnis Nusantara', category: 'Cerita Toko', icon: <FileText size={16} />, path: '/projects' },
  { id: 'docs', title: 'Buku Panduan Operasional Kasir', category: 'Panduan', icon: <BookOpen size={16} />, path: '/docs' },
  { id: 'releases', title: 'Catatan Pembaruan Sistem (Changelog)', category: 'Pembaruan', icon: <Clock size={16} />, path: '/releases' },
  { id: 'about', title: 'Tentang ERASTACK & Komitmen Toko', category: 'Navigasi', icon: <Info size={16} />, path: '/about' },
];

export const CommandPalette: React.FC<CommandPaletteProps> = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);

  const handleClose = useCallback(() => {
    setQuery('');
    setSelectedIndex(0);
    onClose();
  }, [onClose]);

  const filteredCommands = COMMANDS.filter((cmd) =>
    cmd.title.toLowerCase().includes(query.toLowerCase()) ||
    cmd.category.toLowerCase().includes(query.toLowerCase())
  );

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      const timer = setTimeout(() => inputRef.current?.focus(), 50);
      return () => {
        clearTimeout(timer);
        document.body.style.overflow = '';
      };
    }
  }, [isOpen]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      handleClose();
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev + 1) % (filteredCommands.length || 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev - 1 + (filteredCommands.length || 1)) % (filteredCommands.length || 1));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (filteredCommands[selectedIndex]) {
        router.push(filteredCommands[selectedIndex].path);
        handleClose();
      }
    }
  };

  if (!isOpen) return null;

  return (
    <div className="cmd-backdrop" onClick={handleClose} role="presentation">
      <div
        className="cmd-dialog"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-label="Pencarian Cepat Menu & Panduan"
      >
        <div className="cmd-header">
          <Search size={20} className="cmd-search-icon" />
          <input
            ref={inputRef}
            type="text"
            className="cmd-input"
            placeholder="Cari menu, kasir, atau panduan toko..."
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setSelectedIndex(0);
            }}
            onKeyDown={handleKeyDown}
            aria-autocomplete="list"
          />
          <button type="button" className="cmd-esc-btn" onClick={handleClose} aria-label="Tutup pencarian">
            ESC
          </button>
        </div>

        <div className="cmd-results" role="listbox">
          {filteredCommands.length === 0 ? (
            <div className="cmd-empty">
              <p>Tidak ada menu untuk "<strong>{query}</strong>"</p>
              <span>Coba kata kunci lain seperti kasir, stok, unduhan, atau panduan.</span>
            </div>
          ) : (
            filteredCommands.map((cmd, idx) => (
              <button
                key={cmd.id}
                type="button"
                className={`cmd-item ${idx === selectedIndex ? 'is-selected' : ''}`}
                onClick={() => {
                  router.push(cmd.path);
                  handleClose();
                }}
                onMouseEnter={() => setSelectedIndex(idx)}
                role="option"
                aria-selected={idx === selectedIndex}
              >
                <div className="cmd-item-icon-wrap">{cmd.icon}</div>
                <div className="cmd-item-body">
                  <span className="cmd-item-title">{cmd.title}</span>
                  <span className="cmd-item-cat-badge">{cmd.category}</span>
                </div>
                <ArrowRight size={16} className="cmd-item-arrow" />
              </button>
            ))
          )}
        </div>

        <div className="cmd-footer">
          <div className="cmd-footer-hints">
            <span><kbd>↑</kbd><kbd>↓</kbd> Pilih</span>
            <span><kbd>↵</kbd> Buka</span>
            <span><kbd>ESC</kbd> Tutup</span>
          </div>
          <span className="cmd-footer-brand">ERASTACK POS</span>
        </div>
      </div>
    </div>
  );
};
