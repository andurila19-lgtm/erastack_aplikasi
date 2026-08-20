'use client';

import React, { useState, useMemo } from 'react';
import { 
  Search, BookOpen, Play, Receipt, 
  Box, Printer, BarChart3, HelpCircle, 
  ChevronRight, CheckCircle2, Clock, ThumbsUp, 
  MessageSquare, ArrowRight, ArrowLeft, 
  Menu, X, Lightbulb
} from 'lucide-react';
import { SEOHead } from '../components/common/SEOHead';
import { DOCS_DATA, type DocArticle } from '../data/docsData';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import './DocsPage.css';

export const DocsPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeArticleId, setActiveArticleId] = useState<string>('install-windows');
  const [isMobileDrawerOpen, setIsMobileDrawerOpen] = useState(false);
  const [feedbackSent, setFeedbackSent] = useState<boolean>(false);

  const allArticles = useMemo(() => {
    return DOCS_DATA.flatMap(category => category.articles);
  }, []);

  const currentArticle = useMemo(() => {
    return allArticles.find(a => a.id === activeArticleId) || allArticles[0];
  }, [allArticles, activeArticleId]);

  const currentIndex = useMemo(() => {
    return allArticles.findIndex(a => a.id === activeArticleId);
  }, [allArticles, activeArticleId]);

  const prevArticle = currentIndex > 0 ? allArticles[currentIndex - 1] : null;
  const nextArticle = currentIndex < allArticles.length - 1 ? allArticles[currentIndex + 1] : null;

  const filteredCategories = useMemo(() => {
    if (!searchQuery.trim()) {
      return DOCS_DATA;
    }
    const q = searchQuery.toLowerCase();
    return DOCS_DATA.map(category => {
      const matchedArticles = category.articles.filter(
        a => a.title.toLowerCase().includes(q) || 
             a.summary.toLowerCase().includes(q) ||
             a.steps.some(s => s.title.toLowerCase().includes(q) || s.description.toLowerCase().includes(q))
      );
      return {
        ...category,
        articles: matchedArticles,
      };
    }).filter(category => category.articles.length > 0);
  }, [searchQuery]);

  const handleSelectArticle = (id: string) => {
    setActiveArticleId(id);
    setFeedbackSent(false);
    setIsMobileDrawerOpen(false);
    window.scrollTo({ top: 350, behavior: 'smooth' });
  };

  const renderCategoryIcon = (iconName: string) => {
    switch (iconName) {
      case 'play': return <Play size={16} />;
      case 'receipt': return <Receipt size={16} />;
      case 'box': return <Box size={16} />;
      case 'printer': return <Printer size={16} />;
      case 'chart': return <BarChart3 size={16} />;
      default: return <HelpCircle size={16} />;
    }
  };

  return (
    <div className="docs-page-root">
      <SEOHead
        title="Pusat Panduan & Bantuan Kasir Toko • ERASTACK POS"
        description="Buku panduan lengkap penggunaan aplikasi kasir ERASTACK POS: Cara pasang di Windows & Android, cara transaksi kasir, manajemen stok barang, dan setting printer thermal."
      />

      <section className="docs-hero-section">
        <div className="container">
          <div className="docs-hero-content">
            <Badge variant="lime" size="sm" dot>Buku Panduan Kasir Toko</Badge>
            
            <h1 className="docs-hero-title">
              Pusat Panduan & Bantuan <span className="highlight-text">ERASTACK POS</span>
            </h1>

            <p className="docs-hero-desc">
              Pelajari langkah mudah mengoperasikan aplikasi kasir, menghubungkan printer thermal & scanner barcode, hingga mengelola stok dan laporan laba toko Anda.
            </p>

            <div className="docs-search-bar-wrap">
              <div className="search-input-box">
                <Search size={18} className="search-icon" />
                <input
                  type="text"
                  className="docs-search-field"
                  placeholder="Cari topik panduan (contoh: printer, diskon, stok masuk, backup)..."
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                />
                {searchQuery && (
                  <button 
                    type="button" 
                    className="clear-search-btn"
                    onClick={() => setSearchQuery('')}
                  >
                    Hapus
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="docs-main-layout-section">
        <div className="container">
          <div className="mobile-topics-trigger-bar">
            <button
              type="button"
              className="btn-open-mobile-drawer"
              onClick={() => setIsMobileDrawerOpen(true)}
            >
              <Menu size={18} />
              <span>Daftar Topik Panduan ({allArticles.length} Artikel)</span>
            </button>
            <span className="current-topic-label">{currentArticle.title}</span>
          </div>

          <div className="docs-layout-grid">
            <aside className={`docs-sidebar-column ${isMobileDrawerOpen ? 'is-drawer-open' : ''}`}>
              <div className="sidebar-sticky-inner">
                <div className="sidebar-mobile-header">
                  <span className="drawer-title">Daftar Topik Panduan</span>
                  <button
                    type="button"
                    className="drawer-close-btn"
                    onClick={() => setIsMobileDrawerOpen(false)}
                    aria-label="Tutup daftar topik"
                  >
                    <X size={20} />
                  </button>
                </div>

                <nav className="docs-nav-tree">
                  {filteredCategories.length === 0 ? (
                    <div className="no-docs-matched">
                      <p>Tidak ditemukan artikel dengan kata kunci "<strong>{searchQuery}</strong>".</p>
                      <button 
                        type="button" 
                        className="reset-search-link"
                        onClick={() => setSearchQuery('')}
                      >
                        Tampilkan Semua Topik
                      </button>
                    </div>
                  ) : (
                    filteredCategories.map(category => (
                      <div key={category.id} className="category-group">
                        <div className="category-header">
                          <span className="cat-icon-wrap">{renderCategoryIcon(category.iconName)}</span>
                          <h3 className="category-title">{category.title}</h3>
                        </div>

                        <ul className="articles-sub-list">
                          {category.articles.map(article => (
                            <li key={article.id}>
                              <button
                                type="button"
                                className={`article-nav-btn ${activeArticleId === article.id ? 'is-active' : ''}`}
                                onClick={() => handleSelectArticle(article.id)}
                              >
                                <span className="nav-bullet" />
                                <span className="nav-title">{article.title}</span>
                              </button>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))
                  )}
                </nav>

                <div className="sidebar-help-widget">
                  <MessageSquare size={20} className="widget-icon" />
                  <div className="widget-content">
                    <strong>Butuh Panduan Langsung?</strong>
                    <p>Tim teknis kami siap memandu toko Anda via WhatsApp.</p>
                  </div>
                  <a
                    href="https://wa.me/6281234567890"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="widget-btn-link"
                  >
                    Hubungi Bantuan
                  </a>
                </div>
              </div>
            </aside>

            {isMobileDrawerOpen && (
              <div 
                className="drawer-overlay-backdrop"
                onClick={() => setIsMobileDrawerOpen(false)}
              />
            )}

            <main className="docs-content-column">
              <article className="article-sheet-card">
                <header className="article-header">
                  <div className="breadcrumb-nav">
                    <span>Buku Panduan</span>
                    <ChevronRight size={14} className="bc-sep" />
                    <span>{currentArticle.category}</span>
                  </div>

                  <h1 className="article-main-title">{currentArticle.title}</h1>

                  <div className="article-meta-row">
                    <span className="meta-read-time">
                      <Clock size={13} />
                      <span>Estimasi Baca: {currentArticle.readTime}</span>
                    </span>
                    <Badge variant="cyan" size="sm">Panduan Terverifikasi</Badge>
                  </div>

                  <div className="article-summary-box">
                    <BookOpen size={18} className="summary-icon" />
                    <p className="summary-text">{currentArticle.summary}</p>
                  </div>
                </header>

                <div className="article-body-steps">
                  <h2 className="steps-section-heading">Langkah-Langkah Praktis:</h2>

                  <div className="steps-timeline">
                    {currentArticle.steps.map((step, idx) => (
                      <div key={idx} className="step-card-item">
                        <div className="step-number-bubble">
                          <span>{idx + 1}</span>
                        </div>

                        <div className="step-content-group">
                          <h3 className="step-title">{step.title}</h3>
                          <p className="step-desc">{step.description}</p>

                          {step.tips && (
                            <div className="step-tip-box">
                              <Lightbulb size={16} className="tip-icon" />
                              <div className="tip-content">
                                <strong>Tips Praktis:</strong>
                                <p>{step.tips}</p>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="article-feedback-bar">
                  <div className="feedback-question">
                    <ThumbsUp size={18} className="feedback-icon" />
                    <span>Apakah panduan ini membantu operasional toko Anda?</span>
                  </div>

                  {feedbackSent ? (
                    <span className="feedback-success-badge">
                      <CheckCircle2 size={14} />
                      Terima kasih atas tanggapan Anda!
                    </span>
                  ) : (
                    <div className="feedback-action-btns">
                      <button
                        type="button"
                        className="btn-feedback-yes"
                        onClick={() => setFeedbackSent(true)}
                      >
                        Sangat Membantu
                      </button>
                      <a
                        href="https://wa.me/6281234567890"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-feedback-cs"
                      >
                        Tanya Tim Bantuan
                      </a>
                    </div>
                  )}
                </div>

                <nav className="article-pagination-nav">
                  {prevArticle ? (
                    <button
                      type="button"
                      className="pagination-btn prev-btn"
                      onClick={() => handleSelectArticle(prevArticle.id)}
                    >
                      <ArrowLeft size={16} className="pag-icon" />
                      <div className="pag-text-group">
                        <span className="pag-dir">Topik Sebelumnya</span>
                        <span className="pag-name">{prevArticle.title}</span>
                      </div>
                    </button>
                  ) : <div />}

                  {nextArticle && (
                    <button
                      type="button"
                      className="pagination-btn next-btn"
                      onClick={() => handleSelectArticle(nextArticle.id)}
                    >
                      <div className="pag-text-group text-right">
                        <span className="pag-dir">Topik Selanjutnya</span>
                        <span className="pag-name">{nextArticle.title}</span>
                      </div>
                      <ArrowRight size={16} className="pag-icon" />
                    </button>
                  )}
                </nav>
              </article>
            </main>
          </div>
        </div>
      </section>
    </div>
  );
};
