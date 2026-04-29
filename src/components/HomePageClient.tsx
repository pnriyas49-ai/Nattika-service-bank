'use client';
import { motion } from 'framer-motion';
import { useLanguage } from '@/lib/LanguageContext';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Link from 'next/link';
import { ChevronRight, Percent, Briefcase, Home, Truck, Coins, ShieldCheck, HeartHandshake, ArrowRight } from 'lucide-react';
import PageBackground from './ui/PageBackground';
import HeroCarousel from './HeroCarousel';

const fadeUp = { hidden: { opacity: 0, y: 28 }, show: { opacity: 1, y: 0, transition: { type: 'spring' as const, damping: 30, stiffness: 200 } } };
const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.09 } } };

const STATS = [
  { num: '90+', label: 'Years of Trust', labelMl: 'വർഷത്തെ വിശ്വാസം', color: '#D4AF37' },
  { num: '25K+', label: 'Members', labelMl: 'അംഗങ്ങൾ', color: '#10B981' },
  { num: '₹550Cr', label: 'Working Capital', labelMl: 'പ്രവർത്തന മൂലധനം', color: '#0EA5E9' },
];

const SERVICES = [
  { icon: Coins, title: 'Gold Loan', titleMl: 'സ്വർണ്ണ വായ്പ', desc: 'Instant cash against gold with best valuation rates.', descMl: 'ഏറ്റവും മികച്ച വിലയിരുത്തലോടെ സ്വർണ്ണത്തിന് തൽക്ഷണ വായ്പ.', color: '#D4AF37', bg: 'rgba(212,175,55,0.1)' },
  { icon: Home, title: 'Mortgage Loan', titleMl: 'ഭവന വായ്പ', desc: 'Affordable home and property loans up to ₹50 Lakhs.', descMl: '₹50 ലക്ഷം വരെ ഭവന, വസ്തു വായ്പകൾ.', color: '#047038', bg: 'rgba(4,112,56,0.1)' },
  { icon: Truck, title: 'Agriculture Loan', titleMl: 'കാർഷിക വായ്പ', desc: 'Lowest interest rates for agricultural development.', descMl: 'കാർഷിക വികസനത്തിന് ഏറ്റവും കുറഞ്ഞ പലിശ.', color: '#1E88E5', bg: 'rgba(30,136,229,0.1)' },
  { icon: Briefcase, title: 'Personal Loan', titleMl: 'വ്യക്തിഗത വായ്പ', desc: 'Quick personal loans with minimal documentation.', descMl: 'കുറഞ്ഞ രേഖകളോടെ വേഗത്തിൽ വ്യക്തിഗത വായ്പ.', color: '#8E24AA', bg: 'rgba(142,36,170,0.1)' },
  { icon: Percent, title: 'Fixed Deposits', titleMl: 'സ്ഥിര നിക്ഷേപം', desc: 'Up to 9.5% interest for senior citizens.', descMl: 'മുതിർന്ന പൗരന്മാർക്ക് 9.5% വരെ പലിശ.', color: '#E53935', bg: 'rgba(229,57,53,0.1)' },
  { icon: ShieldCheck, title: 'Neethi Services', titleMl: 'നീതി സേവനങ്ങൾ', desc: 'Medical store, clinic, and lab for the community.', descMl: 'മെഡിക്കൽ സ്റ്റോർ, ക്ലിനിക്, ലാബ് സൗകര്യങ്ങൾ.', color: '#047038', bg: 'rgba(4,112,56,0.1)' },
];

export default function HomePageClient({ homepageData, loansData, depositsData, settingsData }: { homepageData: any; loansData?: any[]; depositsData?: any[]; settingsData?: any }) {
  const { t, language } = useLanguage();

  const topDeposit = depositsData && depositsData.length > 0
    ? [...depositsData].sort((a, b) => parseFloat(b.entry.rate) - parseFloat(a.entry.rate))[0]
    : null;

  const marqueeText = settingsData?.marqueeText || t(
    'Welcome to Nattika Service Cooperative Bank! | Lowest interest Gold Loans available! | Fixed Deposits up to 9.5% for Senior Citizens!',
    'നാട്ടിക സർവീസ് സഹകരണ ബാങ്കിലേക്ക് സ്വാഗതം! | ഏറ്റവും കുറഞ്ഞ പലിശയിൽ സ്വർണ്ണ വായ്പ! | മുതിർന്ന പൗരന്മാർക്ക് 9.5% വരെ പലിശ!'
  );

  return (
    <div style={{ background: 'var(--bg)', color: 'var(--text)', fontFamily: 'var(--font-body)' }}>
      <Navbar />

      {/* ═══ HERO ═══ */}
      <section style={{ minHeight: '100dvh', display: 'flex', alignItems: 'center', paddingTop: '72px', position: 'relative', overflow: 'hidden' }}>
        <PageBackground
          imageUrl={homepageData?.heroImages?.[0]}
          videoUrl={homepageData?.heroVideoUrl}
          overlayOpacity={0.6}
          blurAmount="2px"
        />
        {/* Blob fallbacks */}
        <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 0 }}>
          <div style={{ position: 'absolute', top: '-15%', right: '-10%', width: 'clamp(300px,50vw,600px)', height: 'clamp(300px,50vw,600px)', background: 'radial-gradient(circle, rgba(10,61,145,0.12) 0%, transparent 65%)', borderRadius: '60% 40% 30% 70%', animation: 'blob 8s ease-in-out infinite' }} />
          <div style={{ position: 'absolute', bottom: '5%', left: '-8%', width: 'clamp(250px,40vw,500px)', height: 'clamp(250px,40vw,500px)', background: 'radial-gradient(circle, rgba(4,112,56,0.1) 0%, transparent 65%)', borderRadius: '30% 60% 70% 40%', animation: 'blob 10s ease-in-out infinite reverse' }} />
        </div>

        <div className="container section" style={{ position: 'relative', zIndex: 1, width: '100%' }}>
          <motion.div initial="hidden" animate="show" variants={stagger} className="hero-text-shadow" style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(1.25rem,2.5vw,1.75rem)', textAlign: 'center', maxWidth: '800px', margin: '0 auto', color: 'white' }}>
            {/* Badge */}
            <motion.div variants={fadeUp}>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.375rem 1rem', borderRadius: 'var(--r-full)', background: 'rgba(255,255,255,0.12)', border: '1px solid rgba(255,255,255,0.2)', fontSize: 'var(--text-xs)', fontWeight: 700, color: '#10B981', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                🏦 {t('Trusted Since 1933', '1933 മുതൽ വിശ്വസ്തം')}
              </span>
            </motion.div>

            {/* Headline */}
            <motion.h1 variants={fadeUp} style={{ fontFamily: 'var(--font-display)', fontWeight: 700, lineHeight: 1.1, fontSize: 'clamp(2.5rem, 5vw + 1rem, 5rem)', letterSpacing: '-0.01em' }}>
              {t('Empowering Your', 'നിങ്ങളുടെ സാമ്പത്തിക')}{' '}
              <span style={{ color: '#10B981' }}>{t('Financial', 'വളർച്ചയ്ക്കായി')}</span>{' '}
              <span style={{ color: '#D4AF37' }}>{t('Future', '')}</span>
            </motion.h1>

            <motion.p variants={fadeUp} style={{ fontSize: 'var(--text-lg)', color: 'rgba(255,255,255,0.9)', lineHeight: 1.7, maxWidth: '60ch', margin: '0 auto' }}>
              {t('A legacy of trust and excellence in cooperative banking, serving the heart of Thrissur with modern financial solutions.',
                'തൃശൂരിന്റെ ഹൃദയഭാഗത്ത് ആധുനിക സാമ്പത്തിക സേവനങ്ങളുമായി സഹകരണ ബാങ്കിംഗിലെ വിശ്വാസത്തിന്റെയും മികവിന്റെയും പാരമ്പര്യം.')}
            </motion.p>

            {/* CTAs */}
            <motion.div variants={fadeUp} style={{ display: 'flex', flexWrap: 'wrap', gap: '0.875rem', justifyContent: 'center' }}>
              <Link href="/facilities" className="btn-rainbow" style={{ fontSize: 'var(--text-sm)', padding: '0.875rem 2rem' }}>
                {t('Explore Facilities', 'സൗകര്യങ്ങൾ')} <ArrowRight size={16} />
              </Link>
              <Link href="/contact" className="btn-ghost" style={{ fontSize: 'var(--text-sm)', background: 'rgba(255,255,255,0.1)', color: 'white', border: '1px solid rgba(255,255,255,0.25)' }}>
                {t('Contact Branch', 'ബ്രാഞ്ച് ബന്ധപ്പെടുക')}
              </Link>
            </motion.div>

            {/* Stats */}
            <motion.div variants={fadeUp} style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: 'clamp(2rem,8vw,5rem)', paddingTop: '2rem', borderTop: '1px solid rgba(255,255,255,0.15)', marginTop: '0.75rem' }}>
              {STATS.map(s => (
                <div key={s.label} style={{ textAlign: 'center' }}>
                  <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 'clamp(1.75rem,4vw,2.75rem)', color: s.color, lineHeight: 1 }}>{s.num}</div>
                  <div style={{ fontSize: 'var(--text-xs)', color: 'rgba(255,255,255,0.85)', marginTop: '0.5rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>{language === 'en' ? s.label : s.labelMl}</div>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>

        {/* Floating emojis */}
        <motion.div animate={{ y: [0, -12, 0] }} transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }} style={{ position: 'absolute', top: '20%', left: '5%', fontSize: '2.5rem', opacity: 0.5 }}>🏦</motion.div>
        <motion.div animate={{ y: [0, -10, 0] }} transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 1 }} style={{ position: 'absolute', bottom: '25%', right: '8%', fontSize: '2.5rem', opacity: 0.5 }}>💰</motion.div>
      </section>

      {/* ═══ LIVE TICKER ═══ */}
      <div style={{ background: 'var(--trust-blue)', padding: '0.75rem 0', overflow: 'hidden', whiteSpace: 'nowrap' as const }}>
        <motion.div animate={{ x: [0, -1200] }} transition={{ repeat: Infinity, duration: 40, ease: 'linear' }} style={{ display: 'flex', gap: '4rem', fontSize: 'var(--text-sm)', color: 'rgba(255,255,255,0.9)', fontWeight: 500, paddingLeft: '1rem' }}>
          <span>{marqueeText}</span>
          <span>{marqueeText}</span>
          <span>{marqueeText}</span>
        </motion.div>
      </div>

      {/* ═══ SERVICES BENTO ═══ */}
      <section style={{ background: 'var(--surface)' }} className="section">
        <div className="container">
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true, margin: '-80px' }} variants={stagger} style={{ marginBottom: 'clamp(2rem,4vw,3.5rem)', textAlign: 'center' }}>
            <motion.p variants={fadeUp} style={{ fontSize: 'var(--text-xs)', fontWeight: 700, color: 'var(--green)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '0.5rem' }}>
              {t('Our Banking Solutions', 'ഞങ്ങളുടെ ബാങ്കിംഗ് സേവനങ്ങൾ')}
            </motion.p>
            <motion.h2 variants={fadeUp} style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 'var(--text-2xl)', color: 'var(--text)', marginBottom: '1rem' }}>
              {t('Financial Services for Everyone', 'എല്ലാവർക്കുമായി സാമ്പത്തിക സേവനങ്ങൾ')}
            </motion.h2>
          </motion.div>

          <motion.div initial="hidden" whileInView="show" viewport={{ once: true, margin: '-60px' }} variants={stagger}
            style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(min(300px, 100%), 1fr))', gap: '1rem' }}>
            {SERVICES.map(s => {
              const Icon = s.icon;
              return (
                <motion.div key={s.title} variants={fadeUp} className="bento-card" style={{ padding: '1.5rem' }}>
                  <div style={{ width: 48, height: 48, borderRadius: 'var(--r-md)', background: s.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1rem' }}>
                    <Icon size={24} color={s.color} strokeWidth={2} />
                  </div>
                  <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: 'var(--text-lg)', marginBottom: '0.5rem', color: 'var(--text)' }}>{language === 'en' ? s.title : s.titleMl}</h3>
                  <p style={{ fontSize: 'var(--text-sm)', lineHeight: 1.65, color: 'var(--text-muted)' }}>{language === 'en' ? s.desc : s.descMl}</p>
                </motion.div>
              );
            })}
          </motion.div>

          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.4 }} style={{ textAlign: 'center', marginTop: 'clamp(2rem,4vw,3rem)' }}>
            <Link href="/facilities" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.375rem', fontSize: 'var(--text-sm)', color: 'var(--accent)', fontWeight: 600 }}>
              {t('View All Facilities', 'എല്ലാ സൗകര്യങ്ങളും കാണുക')} <ChevronRight size={14} />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ═══ RATES HIGHLIGHT ═══ */}
      <section className="section">
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(320px, 100%), 1fr))', gap: '1.5rem' }}>
            {/* Top Rate Card */}
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="bento-card" style={{ padding: 'clamp(1.5rem,3vw,2.5rem)', background: 'var(--trust-blue)', color: 'white', borderColor: 'transparent' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem' }}>
                <Percent size={20} color="#10B981" />
                <span style={{ fontSize: 'var(--text-xs)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#10B981' }}>{t('Top Interest Rate', 'മികച്ച പലിശ നിരക്ക്')}</span>
              </div>
              <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 'clamp(3rem,6vw,4.5rem)', lineHeight: 1, marginBottom: '0.5rem' }}>
                {topDeposit ? topDeposit.entry.rate : '9.5%'}
              </div>
              <div style={{ fontSize: 'var(--text-sm)', color: 'rgba(255,255,255,0.7)', marginBottom: '1.5rem' }}>
                {topDeposit ? `${topDeposit.entry.title} (${topDeposit.entry.duration})` : t('Fixed Deposit — Senior Citizens', 'സ്ഥിര നിക്ഷേപം — മുതിർന്ന പൗരന്മാർ')}
              </div>
              <Link href="/facilities" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.375rem', fontSize: 'var(--text-sm)', color: '#10B981', fontWeight: 600 }}>
                {t('View All Rates', 'എല്ലാ നിരക്കുകളും')} <ChevronRight size={14} />
              </Link>
            </motion.div>

            {/* Neethi Card */}
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }} className="bento-card" style={{ padding: 'clamp(1.5rem,3vw,2.5rem)', background: 'var(--green)', color: 'white', borderColor: 'transparent' }}>
              <ShieldCheck size={32} color="rgba(255,255,255,0.3)" style={{ position: 'absolute', bottom: '1rem', right: '1rem' }} />
              <div style={{ position: 'relative', zIndex: 1 }}>
                <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 'var(--text-2xl)', marginBottom: '1rem' }}>{t('Neethi Services', 'നീതി സേവനങ്ങൾ')}</h3>
                <p style={{ fontSize: 'var(--text-sm)', color: 'rgba(255,255,255,0.8)', lineHeight: 1.7, marginBottom: '1.5rem' }}>
                  {t('Medical store, clinic, and lab facilities serving our community with affordable healthcare.', 'മെഡിക്കൽ സ്റ്റോർ, ക്ലിനിക്, ലാബ് — സാമൂഹിക ആരോഗ്യ സേവനം.')}
                </p>
                <Link href="/facilities#subsidiaries" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.375rem', fontSize: 'var(--text-sm)', color: 'white', fontWeight: 600, borderBottom: '2px solid rgba(255,255,255,0.4)' }}>
                  {t('Learn More', 'കൂടുതൽ അറിയുക')} <ChevronRight size={14} />
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ═══ ABOUT PREVIEW ═══ */}
      <section style={{ background: 'var(--surface)' }} className="section">
        <div className="container">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(400px, 100%), 1fr))', gap: '3rem', alignItems: 'center' }}>
            <div style={{ position: 'relative' }}>
              <div style={{ position: 'absolute', top: '-8px', left: '-8px', width: '4rem', height: '4rem', background: 'var(--accent-bg)', borderRadius: 'var(--r-lg)', zIndex: 0 }} />
              <img
                src={homepageData?.heroImages?.[0] || '/images/about/heroImage.webp'}
                alt="Nattika Bank"
                style={{ borderRadius: 'var(--r-xl)', width: '100%', height: 'auto', objectFit: 'cover', position: 'relative', zIndex: 1, boxShadow: 'var(--shadow-lg)' }}
              />
            </div>
            <div>
              <p style={{ fontSize: 'var(--text-xs)', fontWeight: 700, color: 'var(--green)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '0.5rem' }}>{t('Our Story', 'ഞങ്ങളുടെ കഥ')}</p>
              <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 'var(--text-2xl)', color: 'var(--text)', marginBottom: '1rem' }}>
                {t('Serving Nattika for 90+ Years', '90+ വർഷമായി നാട്ടികയെ സേവിക്കുന്നു')}
              </h2>
              <p style={{ fontSize: 'var(--text-base)', color: 'var(--text-muted)', lineHeight: 1.7, marginBottom: '1.5rem' }}>
                {t('Founded in 1933, we are more than a bank — we are a partner in our community\'s prosperity, offering modern financial services with a human touch.',
                  '1933-ൽ സ്ഥാപിതമായ ഞങ്ങൾ ഒരു ബാങ്കിനേക്കാൾ ഉപരിയാണ് — ഞങ്ങൾ സമൂഹത്തിന്റെ പുരോഗതിയിലെ പങ്കാളിയാണ്.')}
              </p>
              <Link href="/about" className="btn-primary" style={{ fontSize: 'var(--text-sm)' }}>
                {t('Read Our Story', 'കൂടുതൽ അറിയുക')} <ChevronRight size={14} />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ═══ CTA BANNER ═══ */}
      <section style={{ background: 'var(--rainbow)', padding: 'clamp(3rem,6vw,5rem) 0' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 'clamp(1.75rem,3.5vw,2.5rem)', color: 'white', marginBottom: '1rem' }}>
              {t('Start Your Banking Journey Today', 'ഇന്ന് തന്നെ നിങ്ങളുടെ ബാങ്കിംഗ് ആരംഭിക്കൂ')}
            </h2>
            <p style={{ fontSize: 'var(--text-base)', color: 'rgba(255,255,255,0.85)', marginBottom: '2rem', maxWidth: '50ch', margin: '0 auto 2rem' }}>
              {t('Visit your nearest branch or contact us to explore our competitive rates and community-first banking solutions.',
                'ഞങ്ങളുടെ മത്സരക്ഷമമായ നിരക്കുകളും സമൂഹ-കേന്ദ്രിത ബാങ്കിംഗ് പരിഹാരങ്ങളും അറിയാൻ ബ്രാഞ്ചിൽ സന്ദർശിക്കുക.')}
            </p>
            <Link href="/contact" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.875rem 2rem', background: 'white', color: '#0A3D91', borderRadius: 'var(--r-full)', fontWeight: 700, fontSize: 'var(--text-sm)', boxShadow: '0 4px 16px rgba(0,0,0,0.15)' }}>
              {t('Contact Us', 'ബന്ധപ്പെടുക')} <ArrowRight size={16} />
            </Link>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
