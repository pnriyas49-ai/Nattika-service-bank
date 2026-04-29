'use client';
import Link from 'next/link';
import { useLanguage } from '@/lib/LanguageContext';
import { MapPin, Phone, Mail, Clock, Heart } from 'lucide-react';

const LINKS = [
  { href: '/', en: 'Home', ml: 'ഹോം' },
  { href: '/about', en: 'About Us', ml: 'ഞങ്ങളെക്കുറിച്ച്' },
  { href: '/facilities', en: 'Facilities', ml: 'സൗകര്യങ്ങൾ' },
  { href: '/news', en: 'News', ml: 'വാർത്തകൾ' },
  { href: '/gallery/photos', en: 'Gallery', ml: 'ഗാലറി' },
  { href: '/contact', en: 'Contact', ml: 'ബന്ധപ്പെടുക' },
];

export default function Footer() {
  const { t, language } = useLanguage();

  return (
    <footer style={{ background: 'var(--surface)', borderTop: '1px solid var(--border)' }}>
      {/* Gradient accent line */}
      <div style={{ height: '3px', background: 'var(--rainbow)' }} />

      <div className="container" style={{ padding: 'clamp(2.5rem, 6vw, 4rem) clamp(1rem, 4vw, 2rem)' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '2.5rem' }}>

          {/* Brand */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.625rem', marginBottom: '1rem' }}>
              <div style={{ width: 40, height: 40, borderRadius: 'var(--r-md)', background: 'var(--trust-blue)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <span style={{ color: 'white', fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '0.875rem' }}>NSB</span>
              </div>
              <div>
                <div style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: 'var(--text-sm)', color: 'var(--text)' }}>Nattika Service</div>
                <div style={{ fontSize: '0.6rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--text-faint)' }}>Cooperative Bank</div>
              </div>
            </div>
            <p style={{ fontSize: 'var(--text-sm)', color: 'var(--text-muted)', lineHeight: 1.7, marginBottom: '1rem' }}>
              {t('Empowering our community through trusted financial solutions since 1933. Ltd No R 308.',
                '1933 മുതൽ വിശ്വസ്ത സാമ്പത്തിക സേവനങ്ങൾ. ലിമിറ്റഡ് നമ്പർ R 308.')}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: 'var(--text-sm)', color: 'var(--text)', marginBottom: '1rem', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
              {t('Quick Links', 'പ്രധാന ലിങ്കുകൾ')}
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.625rem' }}>
              {LINKS.map(l => (
                <Link key={l.href} href={l.href} style={{ fontSize: 'var(--text-sm)', color: 'var(--text-muted)', transition: 'color 0.2s' }}>
                  {language === 'en' ? l.en : l.ml}
                </Link>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div>
            <h4 style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: 'var(--text-sm)', color: 'var(--text)', marginBottom: '1rem', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
              {t('Contact Us', 'ബന്ധപ്പെടുക')}
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem', fontSize: 'var(--text-sm)', color: 'var(--text-muted)' }}>
                <MapPin size={15} style={{ flexShrink: 0, color: 'var(--green)', marginTop: '2px' }} />
                <span>P.O Nattika, Thriprayar, Thrissur, Kerala - 680566</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: 'var(--text-sm)', color: 'var(--text-muted)' }}>
                <Phone size={15} style={{ flexShrink: 0, color: 'var(--trust-blue)' }} />
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  <a href="tel:04872395310" style={{ color: 'var(--text-muted)' }}>0487 2395310, 2391452</a>
                  <a href="tel:+919387054840" style={{ color: 'var(--text-muted)' }}>Mob: +91 9387054840</a>
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: 'var(--text-sm)', color: 'var(--text-muted)' }}>
                <Mail size={15} style={{ flexShrink: 0, color: 'var(--green)' }} />
                <a href="mailto:nattikascb@gmail.com" style={{ color: 'var(--text-muted)' }}>nattikascb@gmail.com</a>
              </div>
            </div>
          </div>

          {/* Working Hours */}
          <div>
            <h4 style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: 'var(--text-sm)', color: 'var(--text)', marginBottom: '1rem', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
              {t('Working Hours', 'പ്രവർത്തന സമയം')}
            </h4>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: 'var(--text-sm)', color: 'var(--text-muted)' }}>
              <Clock size={15} style={{ flexShrink: 0, color: 'var(--trust-blue)' }} />
              <span>{t('9:30 AM to 5:00 PM', 'രാവിലെ 9:30 മുതൽ 5:00 വരെ')}</span>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div style={{ marginTop: '2.5rem', paddingTop: '1.5rem', borderTop: '1px solid var(--border)', display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: '0.75rem' }}>
          <p style={{ fontSize: 'var(--text-xs)', color: 'var(--text-faint)' }}>
            © {new Date().getFullYear()} Nattika Service Cooperative Bank. {t('All rights reserved.', 'എല്ലാ അവകാശങ്ങളും നിക്ഷിപ്തം.')}
          </p>
          <p style={{ fontSize: 'var(--text-xs)', color: 'var(--text-faint)', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
            Made with <Heart size={12} style={{ color: '#E53935' }} fill="#E53935" /> by Sharp Intell
          </p>
        </div>
      </div>
    </footer>
  );
}
