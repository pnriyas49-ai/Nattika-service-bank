'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '@/lib/LanguageContext';
import { Building2, ChevronRight, Store } from 'lucide-react';

interface FacilitySection {
  title: string;
  titleMl: string;
  columns: string[];
  rows: string[][];
}

interface Subsidiary {
  title: string;
  titleMl: string;
  description: string;
  image: string;
}

interface FacilitiesData {
  heroImage: string;
  sections: FacilitySection[];
  subsidiaries: Subsidiary[];
}

export default function FacilitiesClient({ data }: { data: FacilitiesData }) {
  const { t } = useLanguage();

  if (!data) return null;

  return (
    <div className="pb-24 pt-20">
      {/* ── HERO ──────────────────────────────────────────────────── */}
      <section className="relative w-full min-h-[40vh] flex items-center justify-center overflow-hidden">
        {data.heroImage ? (
          <img
            src={data.heroImage}
            alt="Facilities"
            className="absolute inset-0 w-full h-full object-cover z-0"
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-[#0A3D91] to-[#047038] z-0" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A3D91]/90 via-[#0A3D91]/50 to-transparent mix-blend-multiply z-10" />
        <div className="absolute inset-0 bg-black/25 z-10" />

        <div className="relative z-20 text-center px-4 max-w-4xl mx-auto py-20">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-green-400 font-bold uppercase tracking-[0.2em] text-sm mb-3"
          >
            {t('Nattika Service Cooperative Bank', 'നാട്ടിക സർവീസ് സഹകരണ ബാങ്ക്')}
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 }}
            className="text-4xl md:text-6xl font-extrabold text-white mb-4 drop-shadow-lg"
          >
            {t('Facilities', 'സൗകര്യങ്ങൾ')}
          </motion.h1>
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: '80px' }}
            className="h-1.5 bg-green-500 mx-auto rounded-full"
          />
        </div>
      </section>

      {/* ── QUICK NAV PILLS ───────────────────────────────────────── */}
      <div className="bg-white border-b border-gray-100 sticky top-[68px] z-30 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex flex-wrap gap-2">
          {data.sections?.map((section, idx) => (
            <a
              key={idx}
              href={`#section-${idx}`}
              className="px-4 py-2 text-sm font-semibold rounded-full bg-gray-100 hover:bg-[#0A3D91] hover:text-white text-gray-700 transition-all"
            >
              {t(section.title, section.titleMl)}
            </a>
          ))}
          {data.subsidiaries?.length > 0 && (
            <a
              href="#subsidiaries"
              className="px-4 py-2 text-sm font-semibold rounded-full bg-gray-100 hover:bg-[#047038] hover:text-white text-gray-700 transition-all"
            >
              {t('Subsidiary Firms', 'അനുബന്ധ സ്ഥാപനങ്ങൾ')}
            </a>
          )}
        </div>
      </div>

      {/* ── TABLE SECTIONS ─────────────────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {data.sections?.map((section, sIdx) => (
          <motion.section
            key={sIdx}
            id={`section-${sIdx}`}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-16 scroll-mt-36"
          >
            {/* Section heading */}
            <div className="flex items-center mb-6">
              <div className="w-1.5 h-8 bg-[#047038] rounded-full mr-3" />
              <h2 className="text-2xl md:text-3xl font-extrabold text-[#0A3D91] uppercase tracking-wide">
                {t(section.title, section.titleMl)}
              </h2>
            </div>

            {/* Table */}
            <div className="overflow-x-auto rounded-2xl border border-gray-200 shadow-sm bg-white">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-[#0A3D91]">
                    {section.columns.map((col, cIdx) => (
                      <th
                        key={cIdx}
                        className="px-6 py-4 text-sm font-bold text-white uppercase tracking-wider whitespace-nowrap"
                      >
                        {col}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {section.rows.map((row, rIdx) => (
                    <tr
                      key={rIdx}
                      className={`border-b border-gray-100 transition-colors hover:bg-blue-50/40 ${
                        rIdx % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'
                      }`}
                    >
                      {row.map((cell, cellIdx) => (
                        <td
                          key={cellIdx}
                          className={`px-6 py-4 text-sm ${
                            cellIdx === 0
                              ? 'font-semibold text-gray-800'
                              : 'font-bold text-gray-700'
                          }`}
                        >
                          {cell}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.section>
        ))}

        {/* ── SUBSIDIARY FIRMS ───────────────────────────────────────── */}
        {data.subsidiaries?.length > 0 && (
          <motion.section
            id="subsidiaries"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-20 scroll-mt-36"
          >
            <div className="flex items-center mb-8">
              <div className="w-1.5 h-8 bg-[#047038] rounded-full mr-3" />
              <h2 className="text-2xl md:text-3xl font-extrabold text-[#047038] uppercase tracking-wide">
                {t('Subsidiary Firms', 'അനുബന്ധ സ്ഥാപനങ്ങൾ')}
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {data.subsidiaries.map((sub, idx) => (
                <motion.div
                  key={idx}
                  whileHover={{ y: -6 }}
                  className="bg-white rounded-3xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl transition-all group"
                >
                  {/* Image / placeholder */}
                  <div className="relative h-56 bg-gradient-to-br from-blue-50 to-green-50 overflow-hidden">
                    {sub.image ? (
                      <img
                        src={sub.image}
                        alt={sub.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <Store className="w-16 h-16 text-gray-200" />
                      </div>
                    )}
                  </div>

                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-800 mb-2">
                      {t(sub.title, sub.titleMl)}
                    </h3>
                    <p className="text-gray-500 text-sm leading-relaxed">
                      {sub.description}
                    </p>
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
