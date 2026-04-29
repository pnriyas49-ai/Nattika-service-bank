'use client';
import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Globe, User } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useLanguage } from '@/lib/LanguageContext';

const NAV_LINKS = [
  { href: '/', en: 'Home', ml: 'ഹോം' },
  { href: '/about', en: 'About Us', ml: 'ഞങ്ങളെക്കുറിച്ച്' },
  { href: '/facilities', en: 'Facilities', ml: 'സൗകര്യങ്ങൾ' },
  { href: '/news', en: 'News', ml: 'വാർത്തകൾ' },
  { href: '/gallery/photos', en: 'Gallery', ml: 'ഗാലറി' },
  { href: '/contact', en: 'Contact', ml: 'ബന്ധപ്പെടുക' },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { language, setLanguage, t } = useLanguage();
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const onResize = () => { if (window.innerWidth >= 768) setMenuOpen(false); };
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  useEffect(() => { setMenuOpen(false); }, [pathname]);

  const toggleLang = useCallback(() => {
    setLanguage(language === 'en' ? 'ml' : 'en');
  }, [language, setLanguage]);

  return (
    <header
      style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
        transition: 'all 0.3s ease',
        background: scrolled ? 'rgba(255,255,255,0.92)' : 'transparent',
        backdropFilter: scrolled ? 'blur(20px)' : 'none',
        WebkitBackdropFilter: scrolled ? 'blur(20px)' : 'none',
        borderBottom: scrolled ? '1px solid var(--border)' : '1px solid transparent',
        boxShadow: scrolled ? 'var(--shadow-sm)' : 'none',
      }}
    >
      <div className="container" style={{ height: '72px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '1rem' }}>
        {/* Logo */}
        <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '0.625rem', textDecoration: 'none', flexShrink: 0 }}>
          <div style={{
            width: 44, height: 44, borderRadius: 'var(--r-md)',
            background: 'var(--trust-blue)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: 'var(--shadow-md)',
          }}>
            <span style={{ color: 'white', fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1rem' }}>NSB</span>
          </div>
          <div style={{ lineHeight: 1.2 }}>
            <div style={{
              fontFamily: 'var(--font-display)', fontWeight: 600,
              fontSize: 'var(--text-sm)',
              color: scrolled ? 'var(--trust-blue)' : 'white',
              transition: 'color 0.3s ease',
            }}>
              Nattika Service
            </div>
            <div style={{
              fontSize: '0.6rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em',
              color: scrolled ? 'var(--text-muted)' : 'rgba(255,255,255,0.8)',
              transition: 'color 0.3s ease',
            }}>
              Cooperative Bank
            </div>
          </div>
        </Link>

        {/* Desktop nav */}
        <nav className="hide-mobile" style={{ alignItems: 'center', gap: '0.25rem' }}>
          {NAV_LINKS.map(l => {
            const isActive = pathname === l.href || (l.href !== '/' && pathname.startsWith(l.href));
            return (
              <Link key={l.href} href={l.href}
                style={{
                  padding: '0.5rem 1rem', borderRadius: 'var(--r-full)', fontSize: 'var(--text-sm)',
                  fontWeight: isActive ? 700 : 500,
                  color: isActive
                    ? (scrolled ? 'var(--accent)' : 'white')
                    : (scrolled ? 'var(--text-muted)' : 'rgba(255,255,255,0.85)'),
                  background: isActive
                    ? (scrolled ? 'var(--accent-bg)' : 'rgba(255,255,255,0.15)')
                    : 'transparent',
                  textDecoration: 'none', transition: 'all 0.2s ease',
                }}
              >{language === 'en' ? l.en : l.ml}</Link>
            );
          })}
        </nav>

        {/* Right actions */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexShrink: 0 }}>
          {/* Language toggle */}
          <button
            onClick={toggleLang}
            aria-label="Toggle language"
            style={{
              display: 'flex', alignItems: 'center', gap: '0.375rem',
              padding: '0.375rem 0.875rem', borderRadius: 'var(--r-full)',
              background: scrolled ? 'var(--surface-2)' : 'rgba(255,255,255,0.12)',
              border: `1px solid ${scrolled ? 'var(--border)' : 'rgba(255,255,255,0.2)'}`,
              color: scrolled ? 'var(--text-muted)' : 'white',
              fontSize: 'var(--text-xs)', fontWeight: 700, cursor: 'pointer', transition: 'all 0.2s ease',
            }}
          >
            <Globe size={14} />
            {language === 'en' ? 'മലയാളം' : 'English'}
          </button>

          {/* Customer Login CTA */}
          <Link href="/contact" className="btn-primary hide-mobile" style={{ padding: '0.5rem 1.25rem', fontSize: '0.8125rem' }}>
            <User size={14} />
            {t('Customer Login', 'ലോഗിൻ')}
          </Link>

          {/* Mobile menu toggle */}
          <button
            className="show-mobile"
            onClick={() => setMenuOpen(o => !o)}
            aria-label="Toggle menu"
            style={{
              width: 40, height: 40, borderRadius: 'var(--r-full)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              background: scrolled ? 'var(--surface-2)' : 'rgba(255,255,255,0.12)',
              border: `1px solid ${scrolled ? 'var(--border)' : 'rgba(255,255,255,0.2)'}`,
              color: scrolled ? 'var(--text)' : 'white', cursor: 'pointer',
            }}
          >
            {menuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            style={{
              overflow: 'hidden',
              background: 'rgba(255,255,255,0.97)',
              backdropFilter: 'blur(20px)',
              borderTop: '1px solid var(--border)',
            }}
          >
            <div style={{ padding: '1rem', display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
              {NAV_LINKS.map(l => {
                const isActive = pathname === l.href;
                return (
                  <Link key={l.href} href={l.href}
                    style={{
                      padding: '0.875rem 1rem', borderRadius: 'var(--r-md)',
                      fontSize: 'var(--text-base)', fontWeight: isActive ? 700 : 500,
                      color: isActive ? 'var(--accent)' : 'var(--text)',
                      background: isActive ? 'var(--accent-bg)' : 'var(--surface-2)',
                      textDecoration: 'none',
                    }}
                  >{language === 'en' ? l.en : l.ml}</Link>
                );
              })}
              <Link href="/contact" className="btn-rainbow" style={{ marginTop: '0.5rem', justifyContent: 'center' }}>
                <User size={16} /> {t('Customer Login', 'കസ്റ്റമർ ലോഗിൻ')}
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
