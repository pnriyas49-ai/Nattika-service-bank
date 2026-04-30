'use client';

import { useLanguage } from '@/lib/LanguageContext';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import PageBackground from '@/components/ui/PageBackground';
import { MapPin, Phone, Mail, Clock, Send } from 'lucide-react';
import { motion } from 'framer-motion';

const fadeUp = { hidden: { opacity: 0, y: 28 }, show: { opacity: 1, y: 0, transition: { type: 'spring' as const, damping: 30, stiffness: 200 } } };
const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.09 } } };

const BRANCH_COLORS = ['#0A3D91', '#047038', '#D4AF37', '#8E24AA'];

const inputStyle: React.CSSProperties = {
  width: '100%', height: '48px', padding: '0 1rem',
  borderRadius: 'var(--r-md)', border: '1px solid var(--border)',
  background: 'var(--surface-2)', fontSize: 'var(--text-sm)',
  fontFamily: 'var(--font-body)', color: 'var(--text)',
  outline: 'none', transition: 'all 0.2s ease',
};

const DEFAULT_BRANCHES = [
  { name: 'Main Branch', nameMl: 'പ്രധാന ശാഖ', address: 'P.O Nattika, Thriprayar, Thrissur - 680566', phone: '0487 2395310, 2391452', mobile: '+91 9387054840', email: 'nattikascb@gmail.com' },
  { name: 'Nattika Beach', nameMl: 'നാട്ടിക ബീച്ച്', address: 'Nattika Beach, Thriprayar', phone: '0487 2393343' },
  { name: 'Cherkkara', nameMl: 'ചെർക്കര', address: 'Cherkkara, Nattika, Thriprayar', phone: '0487 2396226' },
];

export default function ContactClient({ contactData }: { contactData: any }) {
  const { t, language } = useLanguage();

  const branches = contactData?.branches || DEFAULT_BRANCHES;
  const heroImage = contactData?.heroImage || '/images/about/heroImage.webp';
  const workingHours = contactData?.workingHours || '9:30 AM to 5:00 PM (Mon-Sat)';

  return (
    <div style={{ background: 'var(--bg)', color: 'var(--text)', fontFamily: 'var(--font-body)' }}>
      <Navbar />

      {/* ═══ HERO ═══ */}
      <section style={{ minHeight: '45vh', display: 'flex', alignItems: 'center', paddingTop: '72px', position: 'relative', overflow: 'hidden' }}>
        <PageBackground imageUrl={heroImage} overlayOpacity={0.75} blurAmount="3px" />
        <div className="container section" style={{ position: 'relative', zIndex: 1 }}>
          <motion.div initial="hidden" animate="show" variants={stagger} className="hero-text-shadow" style={{ textAlign: 'center', color: 'white', maxWidth: '700px', margin: '0 auto' }}>

            <motion.h1 variants={fadeUp} style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 'clamp(2.5rem, 5vw + 1rem, 4.5rem)', lineHeight: 1.1 }}>
              {t('Contact & Branches', 'ബന്ധപ്പെടുക & ശാഖകൾ')}
            </motion.h1>
            <motion.p variants={fadeUp} style={{ fontSize: 'var(--text-lg)', color: 'rgba(255,255,255,0.85)', marginTop: '1rem' }}>
              {t('We are always here to help you with your banking needs.', 'നിങ്ങളുടെ ബാങ്കിംഗ് ആവശ്യങ്ങൾക്ക് ഞങ്ങൾ എപ്പോഴും ഇവിടെയുണ്ട്.')}
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* ═══ BRANCHES ═══ */}
      <section style={{ background: 'var(--surface)' }} className="section">
        <div className="container">
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={stagger}
            style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(min(320px, 100%), 1fr))', gap: '1.25rem' }}>
            {branches.map((b: any, i: number) => {
              const color = BRANCH_COLORS[i % BRANCH_COLORS.length];
              return (
                <motion.div key={i} variants={fadeUp} className="bento-card" style={{ padding: '1.75rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.25rem' }}>
                    <div style={{ width: 40, height: 40, borderRadius: 'var(--r-md)', background: `${color}15`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <MapPin size={20} color={color} />
                    </div>
                    <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: 'var(--text-lg)', color: 'var(--text)' }}>
                      {language === 'en' ? b.name : (b.nameMl || b.name)}
                    </h3>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.625rem', paddingTop: '1rem', borderTop: '1px solid var(--border)' }}>
                    <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem', fontSize: 'var(--text-sm)', color: 'var(--text-muted)' }}>
                      <MapPin size={14} style={{ flexShrink: 0, marginTop: '3px', color }} />
                      <span>{b.address}</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: 'var(--text-sm)', color: 'var(--text-muted)' }}>
                      <Phone size={14} style={{ flexShrink: 0, color }} />
                      <a href={`tel:${b.phone?.replace(/\s/g, '')}`} style={{ color: 'var(--text-muted)' }}>{b.phone}</a>
                    </div>
                    {b.mobile && (
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: 'var(--text-sm)', color: 'var(--text-muted)' }}>
                        <Phone size={14} style={{ flexShrink: 0, color }} />
                        <a href={`tel:${b.mobile.replace(/\s/g, '')}`} style={{ color: 'var(--text-muted)' }}>Mob: {b.mobile}</a>
                      </div>
                    )}
                    {b.email && (
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: 'var(--text-sm)', color: 'var(--text-muted)' }}>
                        <Mail size={14} style={{ flexShrink: 0, color }} />
                        <a href={`mailto:${b.email}`} style={{ color: 'var(--text-muted)' }}>{b.email}</a>
                      </div>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </motion.div>

          {/* Working Hours */}
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            style={{ marginTop: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '1.25rem 1.5rem', background: 'var(--accent-bg)', borderRadius: 'var(--r-lg)', border: '1px solid var(--accent-ring)' }}>
            <Clock size={20} color="var(--accent)" />
            <div>
              <span style={{ fontSize: 'var(--text-sm)', fontWeight: 600, color: 'var(--accent)' }}>{t('Working Hours', 'പ്രവർത്തന സമയം')}: </span>
              <span style={{ fontSize: 'var(--text-sm)', color: 'var(--text-muted)' }}>{workingHours}</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ═══ CONTACT FORM ═══ */}
      <section className="section">
        <div className="container" style={{ maxWidth: '720px' }}>
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
              <p style={{ fontSize: 'var(--text-xs)', fontWeight: 700, color: 'var(--green)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '0.5rem' }}>
                {t('Send a Message', 'സന്ദേശം അയക്കുക')}
              </p>
              <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 'var(--text-2xl)', color: 'var(--text)' }}>
                {t('How Can We Help?', 'എങ്ങനെ സഹായിക്കാം?')}
              </h2>
            </div>

            <div className="bento-card" style={{ padding: 'clamp(1.5rem,3vw,2.5rem)' }}>
              <form onSubmit={(e) => e.preventDefault()} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: 'var(--text-xs)', fontWeight: 600, color: 'var(--text)', marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{t('Full Name', 'മുഴുവൻ പേര്')}</label>
                    <input type="text" placeholder="John Doe" style={inputStyle} />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: 'var(--text-xs)', fontWeight: 600, color: 'var(--text)', marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{t('Phone', 'ഫോൺ')}</label>
                    <input type="tel" placeholder="+91 90000 00000" style={inputStyle} />
                  </div>
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: 'var(--text-xs)', fontWeight: 600, color: 'var(--text)', marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{t('Email', 'ഇമെയിൽ')}</label>
                  <input type="email" placeholder="john@example.com" style={inputStyle} />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: 'var(--text-xs)', fontWeight: 600, color: 'var(--text)', marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{t('Message', 'സന്ദേശം')}</label>
                  <textarea rows={5} placeholder={t('How can we help you?', 'എങ്ങനെ സഹായിക്കാം?')} style={{ ...inputStyle, height: 'auto', padding: '1rem', resize: 'vertical' as const }} />
                </div>
                <button type="submit" className="btn-rainbow" style={{ width: '100%', justifyContent: 'center', padding: '1rem', fontSize: 'var(--text-base)' }}>
                  {t('Submit Request', 'സമർപ്പിക്കുക')} <Send size={16} />
                </button>
              </form>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
