'use client';
import { motion } from 'framer-motion';
import { useLanguage } from '@/lib/LanguageContext';
import { ShieldCheck, Target, TrendingUp, Users, PiggyBank, HandCoins, UserCircle, Phone } from 'lucide-react';
import PageBackground from './ui/PageBackground';

const fadeUp = { hidden: { opacity: 0, y: 28 }, show: { opacity: 1, y: 0, transition: { type: 'spring' as const, damping: 30, stiffness: 200 } } };
const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.09 } } };

export default function AboutClient({ aboutData }: { aboutData: any }) {
  const { t, language } = useLanguage();
  if (!aboutData) return null;

  const stats = [
    { label: t('Total Deposits', 'ആകെ നിക്ഷേപം'), value: aboutData.stats.deposits, icon: PiggyBank, color: '#047038', bg: 'rgba(4,112,56,0.1)' },
    { label: t('Total Loans', 'ആകെ വായ്പകൾ'), value: aboutData.stats.loans, icon: HandCoins, color: '#1E88E5', bg: 'rgba(30,136,229,0.1)' },
    { label: t('Working Capital', 'പ്രവർത്തന മൂലധനം'), value: aboutData.stats.capital, icon: TrendingUp, color: '#8E24AA', bg: 'rgba(142,36,170,0.1)' },
    { label: t('Total Members', 'ആകെ അംഗങ്ങൾ'), value: aboutData.stats.members, icon: Users, color: '#D4AF37', bg: 'rgba(212,175,55,0.1)' },
  ];

  return (
    <div style={{ background: 'var(--bg)', color: 'var(--text)', fontFamily: 'var(--font-body)' }}>
      {/* ═══ HERO ═══ */}
      <section style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', paddingTop: '72px', position: 'relative', overflow: 'hidden' }}>
        <PageBackground imageUrl={aboutData.heroImage} overlayOpacity={0.7} blurAmount="3px" />
        <div className="container section" style={{ position: 'relative', zIndex: 1 }}>
          <motion.div initial="hidden" animate="show" variants={stagger} className="hero-text-shadow" style={{ textAlign: 'center', color: 'white', maxWidth: '700px', margin: '0 auto' }}>

            <motion.h1 variants={fadeUp} style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 'clamp(2.5rem, 5vw + 1rem, 4.5rem)', lineHeight: 1.1 }}>
              {t(aboutData.heroTitle, 'ഞങ്ങളുടെ ചരിത്രം')}
            </motion.h1>
            <motion.p variants={fadeUp} style={{ fontSize: 'var(--text-lg)', color: 'rgba(255,255,255,0.85)', marginTop: '1rem' }}>
              {t(aboutData.heroSubtitle, 'നാട്ടിക സർവീസ് സഹകരണ ബാങ്ക്')}
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* ═══ STORY ═══ */}
      <section style={{ background: 'var(--surface)' }} className="section">
        <div className="container">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(400px, 100%), 1fr))', gap: '3rem', alignItems: 'center' }}>
            <div style={{ position: 'relative' }}>
              <div style={{ position: 'absolute', top: '-8px', left: '-8px', width: '4rem', height: '4rem', background: 'var(--accent-bg)', borderRadius: 'var(--r-lg)', zIndex: 0 }} />
              <img src={aboutData.heroImage || 'https://images.unsplash.com/photo-1541339907198-e08756ebafe3?w=800'} alt="Bank" style={{ borderRadius: 'var(--r-xl)', width: '100%', height: 'auto', objectFit: 'cover', position: 'relative', zIndex: 1, boxShadow: 'var(--shadow-lg)' }} />
            </div>
            <div>
              <p style={{ fontSize: 'var(--text-xs)', fontWeight: 700, color: 'var(--green)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '0.5rem' }}>{t('The Heritage', 'പാരമ്പര്യം')}</p>
              <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 'var(--text-2xl)', color: 'var(--text)', marginBottom: '1rem' }}>
                {t('Growing Since 1933', '1933 മുതൽ വളർച്ചയുടെ പാതയിൽ')}
              </h2>
              <p style={{ fontSize: 'var(--text-base)', color: 'var(--text-muted)', lineHeight: 1.7, marginBottom: '1.5rem', whiteSpace: 'pre-line' as const }}>
                {t(aboutData.history, aboutData.history)}
              </p>
              <div style={{ display: 'flex', gap: '2rem' }}>
                <div><div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 'var(--text-2xl)', color: 'var(--trust-blue)' }}>90+</div><div style={{ fontSize: 'var(--text-xs)', color: 'var(--text-faint)', fontWeight: 600, textTransform: 'uppercase' }}>{t('Years', 'വർഷങ്ങൾ')}</div></div>
                <div style={{ width: '1px', background: 'var(--border)' }} />
                <div><div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 'var(--text-2xl)', color: 'var(--trust-blue)' }}>4+</div><div style={{ fontSize: 'var(--text-xs)', color: 'var(--text-faint)', fontWeight: 600, textTransform: 'uppercase' }}>{t('Branches', 'ശാഖകൾ')}</div></div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ═══ STATS ═══ */}
      <section className="section">
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: 'clamp(2rem,4vw,3.5rem)' }}>
            <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 'var(--text-2xl)', color: 'var(--text)' }}>{t('Financial Strength', 'സാമ്പത്തിക കരുത്ത്')}</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(min(240px, 100%), 1fr))', gap: '1rem' }}>
            {stats.map((s, i) => {
              const Icon = s.icon;
              return (
                <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                  className="bento-card" style={{ padding: '1.5rem', textAlign: 'center' }}>
                  <div style={{ width: 48, height: 48, borderRadius: 'var(--r-md)', background: s.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1rem' }}>
                    <Icon size={24} color={s.color} />
                  </div>
                  <div style={{ fontSize: 'var(--text-xs)', color: 'var(--text-faint)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.25rem' }}>{s.label}</div>
                  <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 'var(--text-2xl)', color: 'var(--trust-blue)' }}>{s.value}</div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ═══ MISSION & VISION ═══ */}
      <section style={{ background: 'var(--surface)' }} className="section">
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(400px, 100%), 1fr))', gap: '1.5rem' }}>
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              className="bento-card" style={{ padding: 'clamp(1.5rem,3vw,2.5rem)', background: 'var(--trust-blue)', color: 'white', borderColor: 'transparent' }}>
              <Target size={32} color="#10B981" style={{ marginBottom: '1rem' }} />
              <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 'var(--text-xl)', marginBottom: '1rem' }}>{t('Our Mission', 'ഞങ്ങളുടെ ലക്ഷ്യം')}</h3>
              <p style={{ fontSize: 'var(--text-sm)', color: 'rgba(255,255,255,0.8)', lineHeight: 1.7 }}>{t(aboutData.mission, aboutData.mission)}</p>
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}
              className="bento-card" style={{ padding: 'clamp(1.5rem,3vw,2.5rem)' }}>
              <ShieldCheck size={32} color="#047038" style={{ marginBottom: '1rem' }} />
              <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 'var(--text-xl)', marginBottom: '1rem', color: 'var(--trust-blue)' }}>{t('Our Vision', 'ഞങ്ങളുടെ കാഴ്ചപ്പാട്')}</h3>
              <p style={{ fontSize: 'var(--text-sm)', color: 'var(--text-muted)', lineHeight: 1.7 }}>{t(aboutData.vision, aboutData.vision)}</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ═══ TEAM ═══ */}
      {aboutData.team?.length > 0 && (
        <section className="section" style={{ background: 'var(--surface)' }}>
          <div className="container">
            <div style={{ textAlign: 'center', marginBottom: 'clamp(2rem,4vw,3.5rem)' }}>
              <p style={{ fontSize: 'var(--text-xs)', fontWeight: 700, color: 'var(--green)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '0.5rem' }}>{t('Our People', 'ഞങ്ങളുടെ ടീം')}</p>
              <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 'var(--text-2xl)', color: 'var(--text)' }}>{t('Meet Our Team', 'ഞങ്ങളുടെ ടീമിനെ പരിചയപ്പെടുക')}</h2>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1.5rem' }}>
              {aboutData.team.map((m: any, i: number) => (
                <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }}
                  className="bento-card" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
                  <div style={{ width: 100, height: 100, borderRadius: 'var(--r-full)', overflow: 'hidden', margin: '0 auto 1.25rem', border: '4px solid var(--surface-2)', background: 'var(--bg)' }}>
                    {m.image ? (
                      <img src={m.image} alt={m.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    ) : (
                      <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><UserCircle size={50} color="var(--text-faint)" /></div>
                    )}
                  </div>
                  <h4 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 'var(--text-lg)', color: 'var(--text)', marginBottom: '0.25rem' }}>{m.name}</h4>
                  <p style={{ fontSize: 'var(--text-xs)', color: 'var(--green)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: m.number ? '1rem' : '0' }}>{m.post}</p>
                  
                  {m.number && (
                    <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.5rem 1rem', background: 'var(--surface-2)', borderRadius: 'var(--r-full)', color: 'var(--text-muted)', fontSize: 'var(--text-sm)', marginTop: 'auto' }}>
                      <Phone size={14} color="var(--trust-blue)" />
                      <a href={`tel:${m.number.replace(/\s/g, '')}`} style={{ color: 'inherit', fontWeight: 600 }}>{m.number}</a>
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

    </div>
  );
}
