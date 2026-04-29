'use client';

import { useLanguage } from '@/lib/LanguageContext';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import PageBackground from '@/components/ui/PageBackground';
import Link from 'next/link';
import { Camera, Film, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';

const fadeUp = { hidden: { opacity: 0, y: 28 }, show: { opacity: 1, y: 0, transition: { type: 'spring' as const, damping: 30, stiffness: 200 } } };
const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.09 } } };

export default function GalleryHubClient({ heroImage }: { heroImage?: string }) {
  const { t } = useLanguage();

  return (
    <div style={{ background: 'var(--bg)', color: 'var(--text)', fontFamily: 'var(--font-body)' }}>
      <Navbar />

      {/* ═══ HERO ═══ */}
      <section style={{ minHeight: '45vh', display: 'flex', alignItems: 'center', paddingTop: '72px', position: 'relative', overflow: 'hidden' }}>
        <PageBackground imageUrl={heroImage || "/images/about/heroImage.webp"} overlayOpacity={0.75} blurAmount="3px" />
        <div className="container section" style={{ position: 'relative', zIndex: 1 }}>
          <motion.div initial="hidden" animate="show" variants={stagger} className="hero-text-shadow" style={{ textAlign: 'center', color: 'white', maxWidth: '700px', margin: '0 auto' }}>
            <motion.p variants={fadeUp} style={{ fontSize: 'var(--text-xs)', fontWeight: 700, color: 'var(--green)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '0.75rem' }}>
              🖼️ {t('Media Hub', 'മീഡിയ ഹബ്')}
            </motion.p>
            <motion.h1 variants={fadeUp} style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 'clamp(2.5rem, 5vw + 1rem, 4.5rem)', lineHeight: 1.1 }}>
              {t('Our Gallery', 'ഞങ്ങളുടെ ഗാലറി')}
            </motion.h1>
            <motion.p variants={fadeUp} style={{ fontSize: 'var(--text-lg)', color: 'rgba(255,255,255,0.85)', marginTop: '1rem' }}>
              {t("Explore the moments that define our community and the bank's active participation in local growth.", "ഞങ്ങളുടെ കമ്മ്യൂണിറ്റിയുടെ നിമിഷങ്ങൾ ഇവിടെ കാണാം.")}
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* ═══ CONTENT ═══ */}
      <section className="section">
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(350px, 100%), 1fr))', gap: '2rem', maxWidth: '900px', margin: '0 auto' }}>
            
            {/* Photo Gallery Card */}
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
               className="bento-card" style={{ padding: 0, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
              <div style={{ height: '200px', background: 'var(--surface-2)', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', overflow: 'hidden' }}>
                 <div style={{ position: 'absolute', right: '-10%', bottom: '-10%', opacity: 0.05, transform: 'rotate(-15deg)' }}>
                    <Camera size={200} color="var(--trust-blue)" />
                 </div>
                 <div style={{ width: 80, height: 80, borderRadius: 'var(--r-full)', background: 'var(--bg)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1, boxShadow: 'var(--shadow-sm)' }}>
                    <Camera size={32} color="var(--trust-blue)" />
                 </div>
              </div>
              <div style={{ padding: '2rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
                <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 'var(--text-xl)', color: 'var(--text)', marginBottom: '0.5rem' }}>
                  {t('Photo Gallery', 'ഫോട്ടോ ഗാലറി')}
                </h2>
                <p style={{ color: 'var(--text-muted)', marginBottom: '2rem', flex: 1 }}>
                  {t('View photos from recent branch events, inaugurations, and community programs.', 'സമീപകാല പരിപാടികളുടെയും മറ്റും ഫോട്ടോകൾ കാണുക.')}
                </p>
                <Link href="/gallery/photos" className="btn-primary" style={{ width: '100%', justifyContent: 'center', padding: '1rem', background: 'var(--trust-blue)' }}>
                  {t('View Photos', 'ഫോട്ടോകൾ കാണുക')} <ChevronRight size={18} />
                </Link>
              </div>
            </motion.div>

            {/* Video Gallery Card */}
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}
               className="bento-card" style={{ padding: 0, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
              <div style={{ height: '200px', background: 'var(--surface-2)', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', overflow: 'hidden' }}>
                 <div style={{ position: 'absolute', left: '-10%', top: '-10%', opacity: 0.05, transform: 'rotate(15deg)' }}>
                    <Film size={200} color="var(--green)" />
                 </div>
                 <div style={{ width: 80, height: 80, borderRadius: 'var(--r-full)', background: 'var(--bg)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1, boxShadow: 'var(--shadow-sm)' }}>
                    <Film size={32} color="var(--green)" />
                 </div>
              </div>
              <div style={{ padding: '2rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
                <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 'var(--text-xl)', color: 'var(--text)', marginBottom: '0.5rem' }}>
                  {t('Video Gallery', 'വീഡിയോ ഗാലറി')}
                </h2>
                <p style={{ color: 'var(--text-muted)', marginBottom: '2rem', flex: 1 }}>
                  {t('Watch highlights of our services, financial awareness videos, and branch videos.', 'ഞങ്ങളുടെ സേവനങ്ങളുടെയും മറ്റും വീഡിയോകൾ കാണുക.')}
                </p>
                <Link href="/gallery/videos" className="btn-primary" style={{ width: '100%', justifyContent: 'center', padding: '1rem', background: 'var(--green)', color: 'white' }}>
                  {t('Watch Videos', 'വീഡിയോകൾ കാണുക')} <ChevronRight size={18} />
                </Link>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
