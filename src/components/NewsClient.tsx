'use client';
import { motion } from 'framer-motion';
import { useLanguage } from '@/lib/LanguageContext';
import { Newspaper, Calendar } from 'lucide-react';
import PageBackground from './ui/PageBackground';
import Navbar from './Navbar';
import Footer from './Footer';

const fadeUp = { hidden: { opacity: 0, y: 28 }, show: { opacity: 1, y: 0, transition: { type: 'spring' as const, damping: 30, stiffness: 200 } } };
const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.09 } } };

export default function NewsClient({ newsItems, heroImage }: { newsItems: any[], heroImage?: string }) {
  const { t, language } = useLanguage();

  return (
    <div style={{ background: 'var(--bg)', color: 'var(--text)', fontFamily: 'var(--font-body)' }}>
      <Navbar />

      {/* ═══ HERO ═══ */}
      <section style={{ minHeight: '40vh', display: 'flex', alignItems: 'center', paddingTop: '72px', position: 'relative', overflow: 'hidden' }}>
        <PageBackground imageUrl={heroImage || "/images/about/heroImage.webp"} overlayOpacity={0.75} blurAmount="3px" />
        <div className="container section" style={{ position: 'relative', zIndex: 1 }}>
          <motion.div initial="hidden" animate="show" variants={stagger} className="hero-text-shadow" style={{ textAlign: 'center', color: 'white', maxWidth: '700px', margin: '0 auto' }}>

            <motion.h1 variants={fadeUp} style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 'clamp(2.5rem, 5vw + 1rem, 4.5rem)', lineHeight: 1.1 }}>
              {t('News & Announcements', 'വാർത്തകളും അറിയിപ്പുകളും')}
            </motion.h1>
          </motion.div>
        </div>
      </section>

      {/* ═══ CONTENT ═══ */}
      <section className="section">
        <div className="container" style={{ maxWidth: '900px' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            {newsItems.length > 0 ? (
              newsItems.map((news, i) => (
                <motion.div key={news.slug} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                  className="bento-card" style={{ padding: 'clamp(1.5rem, 3vw, 2.5rem)', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                  
                  {news.entry.image && (
                    <div style={{ width: '100%', height: 'clamp(200px, 40vh, 350px)', borderRadius: 'var(--r-lg)', overflow: 'hidden', position: 'relative' }}>
                      <img src={news.entry.image} alt={news.slug} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    </div>
                  )}

                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--green)', fontSize: 'var(--text-sm)', fontWeight: 600, marginBottom: '0.75rem' }}>
                       <Calendar size={16} />
                       {news.entry.date}
                    </div>
                    <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 'var(--text-2xl)', color: 'var(--text)', marginBottom: '1rem' }}>
                      {news.entry.title || news.slug}
                    </h2>
                    <p style={{ fontSize: 'var(--text-base)', color: 'var(--text-muted)', lineHeight: 1.8, whiteSpace: 'pre-line' as const }}>
                      {news.entry.content}
                    </p>
                  </div>
                </motion.div>
              ))
            ) : (
                <div className="bento-card" style={{ padding: '4rem 2rem', textAlign: 'center' }}>
                  <Newspaper size={48} color="var(--text-faint)" style={{ margin: '0 auto 1rem' }} />
                  <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: 'var(--text-lg)', color: 'var(--text)' }}>
                    {t('No recent announcements', 'സമീപകാല അറിയിപ്പുകൾ ഒന്നുമില്ല')}
                  </h3>
                  <p style={{ color: 'var(--text-muted)', marginTop: '0.5rem' }}>
                    {t('Check back later for news and updates from the bank.', 'ബാങ്കിൽ നിന്നുള്ള വാർത്തകൾക്കും അപ്‌ഡേറ്റുകൾക്കുമായി പിന്നീട് പരിശോധിക്കുക.')}
                  </p>
                </div>
            )}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
