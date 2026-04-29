'use client';
import { motion } from 'framer-motion';
import { useLanguage } from '@/lib/LanguageContext';
import { Camera, Calendar, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import PageBackground from './ui/PageBackground';
import Navbar from './Navbar';
import Footer from './Footer';

const fadeUp = { hidden: { opacity: 0, y: 28 }, show: { opacity: 1, y: 0, transition: { type: 'spring' as const, damping: 30, stiffness: 200 } } };
const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.09 } } };

export default function PhotoGalleryClient({ photos, heroImage }: { photos: any[], heroImage?: string }) {
  const { t } = useLanguage();

  return (
    <div style={{ background: 'var(--bg)', color: 'var(--text)', fontFamily: 'var(--font-body)' }}>
      <Navbar />

      {/* ═══ HERO ═══ */}
      <section style={{ minHeight: '40vh', display: 'flex', alignItems: 'center', paddingTop: '72px', position: 'relative', overflow: 'hidden' }}>
        <PageBackground imageUrl={heroImage || "/images/about/heroImage.webp"} overlayOpacity={0.8} blurAmount="4px" />
        <div className="container section" style={{ position: 'relative', zIndex: 1 }}>
          <motion.div initial="hidden" animate="show" variants={stagger} className="hero-text-shadow" style={{ textAlign: 'center', color: 'white', maxWidth: '700px', margin: '0 auto' }}>
            <motion.div variants={fadeUp} style={{ marginBottom: '1rem' }}>
              <Link href="/gallery" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', fontSize: 'var(--text-sm)', fontWeight: 600, color: 'var(--green)', background: 'rgba(255,255,255,0.1)', padding: '0.5rem 1rem', borderRadius: 'var(--r-full)', backdropFilter: 'blur(10px)', textDecoration: 'none' }}>
                <ArrowLeft size={16} /> {t('Back to Gallery', 'ഗാലറിയിലേക്ക് മടങ്ങുക')}
              </Link>
            </motion.div>
            <motion.h1 variants={fadeUp} style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 'clamp(2.5rem, 5vw + 1rem, 4.5rem)', lineHeight: 1.1 }}>
              {t('Photo Gallery', 'ഫോട്ടോ ഗാലറി')}
            </motion.h1>
            <motion.p variants={fadeUp} style={{ fontSize: 'var(--text-lg)', color: 'rgba(255,255,255,0.85)', marginTop: '1rem' }}>
              {t('Capturing the life of Nattika Bank', 'നാട്ടിക ബാങ്കിൻ്റെ നിമിഷങ്ങൾ')}
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* ═══ CONTENT ═══ */}
      <section className="section">
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(min(300px, 100%), 1fr))', gap: '1.5rem' }}>
            {photos.length > 0 ? (
              photos.map((photo, i) => (
                <motion.div key={photo.slug} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }}
                  className="bento-card" style={{ padding: 0, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
                  <div style={{ height: '240px', background: 'var(--surface-2)', position: 'relative', overflow: 'hidden' }}>
                    {photo.entry.image ? (
                        <img src={photo.entry.image} alt={photo.entry.title} style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s' }} className="hover:scale-105" />
                    ) : (
                        <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                           <Camera size={48} color="var(--text-faint)" />
                        </div>
                    )}
                  </div>
                  <div style={{ padding: '1.5rem' }}>
                    <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 'var(--text-lg)', color: 'var(--text)', marginBottom: '0.5rem' }}>
                      {photo.entry.title}
                    </h3>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--green)', fontSize: 'var(--text-sm)', fontWeight: 600 }}>
                      <Calendar size={14} />
                      {photo.entry.date}
                    </div>
                  </div>
                </motion.div>
              ))
            ) : (
                <div style={{ gridColumn: '1 / -1', padding: '4rem 2rem', textAlign: 'center', background: 'var(--surface)', borderRadius: 'var(--r-xl)', border: '1px dashed var(--border)' }}>
                  <Camera size={48} color="var(--text-faint)" style={{ margin: '0 auto 1rem' }} />
                  <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: 'var(--text-lg)', color: 'var(--text)' }}>
                    {t('No photos published yet', 'ഫോട്ടോകളൊന്നും പ്രസിദ്ധീകരിച്ചിട്ടില്ല')}
                  </h3>
                  <p style={{ color: 'var(--text-muted)', marginTop: '0.5rem' }}>
                    {t('Check back later for event highlights.', 'പരിപാടികളുടെ വിവരങ്ങൾക്കായി പിന്നീട് പരിശോധിക്കുക.')}
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
