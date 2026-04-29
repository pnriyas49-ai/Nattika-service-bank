'use client';
import { motion } from 'framer-motion';
import { useLanguage } from '@/lib/LanguageContext';
import { Store, ChevronRight } from 'lucide-react';
import PageBackground from './ui/PageBackground';

const fadeUp = { hidden: { opacity: 0, y: 28 }, show: { opacity: 1, y: 0, transition: { type: 'spring' as const, damping: 30, stiffness: 200 } } };
const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.09 } } };

interface FacilitySection { title: string; titleMl: string; columns: string[]; rows: string[][]; }
interface Subsidiary { title: string; titleMl: string; description: string; image: string; }
interface FacilitiesData { heroImage: string; sections: FacilitySection[]; subsidiaries: Subsidiary[]; }

export default function FacilitiesClient({ data }: { data: FacilitiesData }) {
  const { t, language } = useLanguage();
  if (!data) return null;

  return (
    <div style={{ background: 'var(--bg)', color: 'var(--text)', fontFamily: 'var(--font-body)' }}>
      {/* ═══ HERO ═══ */}
      <section style={{ minHeight: '50vh', display: 'flex', alignItems: 'center', paddingTop: '72px', position: 'relative', overflow: 'hidden' }}>
        <PageBackground imageUrl={data.heroImage} overlayOpacity={0.7} blurAmount="3px" />
        <div className="container section" style={{ position: 'relative', zIndex: 1 }}>
          <motion.div initial="hidden" animate="show" variants={stagger} className="hero-text-shadow" style={{ textAlign: 'center', color: 'white', maxWidth: '700px', margin: '0 auto' }}>
            <motion.p variants={fadeUp} style={{ fontSize: 'var(--text-xs)', fontWeight: 700, color: '#10B981', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '0.75rem' }}>
              🏢 {t('Bank Services', 'ബാങ്ക് സേവനങ്ങൾ')}
            </motion.p>
            <motion.h1 variants={fadeUp} style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 'clamp(2.5rem, 5vw + 1rem, 4.5rem)', lineHeight: 1.1 }}>
              {t('Our Facilities', 'സൗകര്യങ്ങൾ')}
            </motion.h1>
          </motion.div>
        </div>
      </section>

      {/* ═══ QUICK NAV ═══ */}
      <div style={{ background: 'var(--surface)', borderBottom: '1px solid var(--border)', position: 'sticky', top: '72px', zIndex: 50 }}>
        <div className="container" style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', padding: '0.75rem clamp(1rem,4vw,2rem)' }}>
          {data.sections?.map((s, i) => (
            <a key={i} href={`#section-${i}`} style={{ padding: '0.5rem 1rem', borderRadius: 'var(--r-full)', fontSize: 'var(--text-xs)', fontWeight: 600, background: 'var(--surface-2)', color: 'var(--text-muted)', border: '1px solid var(--border)', transition: 'all 0.2s', textDecoration: 'none' }}>
              {t(s.title, s.titleMl)}
            </a>
          ))}
          {data.subsidiaries?.length > 0 && (
            <a href="#subsidiaries" style={{ padding: '0.5rem 1rem', borderRadius: 'var(--r-full)', fontSize: 'var(--text-xs)', fontWeight: 600, background: 'rgba(4,112,56,0.08)', color: 'var(--green)', border: '1px solid rgba(4,112,56,0.2)', transition: 'all 0.2s', textDecoration: 'none' }}>
              {t('Subsidiary Firms', 'അനുബന്ധ സ്ഥാപനങ്ങൾ')}
            </a>
          )}
        </div>
      </div>

      {/* ═══ TABLES ═══ */}
      <div className="container" style={{ paddingTop: '2rem', paddingBottom: '4rem' }}>
        {data.sections?.map((section, sIdx) => (
          <motion.section key={sIdx} id={`section-${sIdx}`} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            style={{ marginBottom: '3rem', scrollMarginTop: '140px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
              <div style={{ width: '4px', height: '2rem', background: 'var(--green)', borderRadius: '4px' }} />
              <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 'var(--text-xl)', color: 'var(--trust-blue)' }}>
                {t(section.title, section.titleMl)}
              </h2>
            </div>

            <div className="bento-card" style={{ overflow: 'hidden' }}>
              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                  <thead>
                    <tr style={{ background: 'var(--trust-blue)' }}>
                      {section.columns.map((col, cIdx) => (
                        <th key={cIdx} style={{ padding: '1rem 1.5rem', fontSize: 'var(--text-xs)', fontWeight: 700, color: 'white', textTransform: 'uppercase', letterSpacing: '0.06em', whiteSpace: 'nowrap' }}>
                          {col}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {section.rows.map((row, rIdx) => (
                      <tr key={rIdx} style={{ borderBottom: '1px solid var(--border)', background: rIdx % 2 === 0 ? 'var(--surface)' : 'var(--surface-2)', transition: 'background 0.2s' }}>
                        {row.map((cell, cellIdx) => (
                          <td key={cellIdx} style={{ padding: '1rem 1.5rem', fontSize: 'var(--text-sm)', fontWeight: cellIdx === 0 ? 600 : 500, color: cellIdx === 0 ? 'var(--text)' : 'var(--text-muted)' }}>
                            {cell}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </motion.section>
        ))}

        {/* ═══ SUBSIDIARIES ═══ */}
        {data.subsidiaries?.length > 0 && (
          <motion.section id="subsidiaries" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            style={{ marginTop: '4rem', scrollMarginTop: '140px' }}>
            <div style={{ textAlign: 'center', marginBottom: 'clamp(2rem,4vw,3rem)' }}>
              <p style={{ fontSize: 'var(--text-xs)', fontWeight: 700, color: 'var(--green)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '0.5rem' }}>{t('Community Services', 'സാമൂഹിക സേവനങ്ങൾ')}</p>
              <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 'var(--text-2xl)', color: 'var(--text)' }}>{t('Subsidiary Firms', 'അനുബന്ധ സ്ഥാപനങ്ങൾ')}</h2>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(min(300px, 100%), 1fr))', gap: '1.25rem' }}>
              {data.subsidiaries.map((sub, idx) => (
                <motion.div key={idx} variants={fadeUp} className="bento-card" style={{ overflow: 'hidden' }}>
                  <div style={{ height: '200px', background: 'var(--surface-2)', overflow: 'hidden' }}>
                    {sub.image ? (
                      <img src={sub.image} alt={sub.title} style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s' }} />
                    ) : (
                      <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <Store size={48} color="var(--text-faint)" />
                      </div>
                    )}
                  </div>
                  <div style={{ padding: '1.5rem' }}>
                    <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: 'var(--text-lg)', color: 'var(--text)', marginBottom: '0.5rem' }}>
                      {t(sub.title, sub.titleMl)}
                    </h3>
                    <p style={{ fontSize: 'var(--text-sm)', color: 'var(--text-muted)', lineHeight: 1.7 }}>{sub.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.section>
        )}
      </div>

    </div>
  );
}
