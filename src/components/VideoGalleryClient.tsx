'use client';
import { motion } from 'framer-motion';
import { useLanguage } from '@/lib/LanguageContext';
import { Film, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import PageBackground from './ui/PageBackground';
import Navbar from './Navbar';
import Footer from './Footer';

const fadeUp = { hidden: { opacity: 0, y: 28 }, show: { opacity: 1, y: 0, transition: { type: 'spring' as const, damping: 30, stiffness: 200 } } };
const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.09 } } };

export default function VideoGalleryClient({ videos, heroImage }: { videos: any[], heroImage?: string }) {
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
              {t('Video Gallery', 'വീഡിയോ ഗാലറി')}
            </motion.h1>
            <motion.p variants={fadeUp} style={{ fontSize: 'var(--text-lg)', color: 'rgba(255,255,255,0.85)', marginTop: '1rem' }}>
              {t('Watch events and updates', 'പരിപാടികളും അറിയിപ്പുകളും കാണുക')}
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* ═══ CONTENT ═══ */}
      <section className="section">
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(min(400px, 100%), 1fr))', gap: '2rem' }}>
            {videos.length > 0 ? (
              videos.map((video, i) => {
                let embedUrl = video.entry.videoUrl;
                if (embedUrl?.includes('youtube.com/watch?v=')) {
                    embedUrl = embedUrl.replace('watch?v=', 'embed/');
                } else if (embedUrl?.includes('youtu.be/')) {
                    embedUrl = embedUrl.replace('youtu.be/', 'youtube.com/embed/');
                }

                return (
                  <motion.div key={video.slug} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                    className="bento-card" style={{ padding: 0, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
                    <div style={{ height: 'clamp(240px, 40vh, 320px)', background: '#000', position: 'relative' }}>
                      {embedUrl?.endsWith('.mp4') ? (
                          <video controls style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'contain' }}>
                             <source src={embedUrl} type="video/mp4" />
                          </video>
                      ) : (
                          <iframe 
                             src={embedUrl}
                             style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', border: 0 }}
                             allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                             allowFullScreen
                          ></iframe>
                      )}
                    </div>
                    <div style={{ padding: '1.5rem' }}>
                      <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 'var(--text-xl)', color: 'var(--text)' }}>
                        {video.entry.title}
                      </h3>
                    </div>
                  </motion.div>
                )
              })
            ) : (
                <div style={{ gridColumn: '1 / -1', padding: '4rem 2rem', textAlign: 'center', background: 'var(--surface)', borderRadius: 'var(--r-xl)', border: '1px dashed var(--border)' }}>
                  <Film size={48} color="var(--text-faint)" style={{ margin: '0 auto 1rem' }} />
                  <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: 'var(--text-lg)', color: 'var(--text)' }}>
                    {t('No videos published yet', 'വീഡിയോകളൊന്നും പ്രസിദ്ധീകരിച്ചിട്ടില്ല')}
                  </h3>
                  <p style={{ color: 'var(--text-muted)', marginTop: '0.5rem' }}>
                    {t('Check back later for video content.', 'വീഡിയോകൾക്കായി പിന്നീട് പരിശോധിക്കുക.')}
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
