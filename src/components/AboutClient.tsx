'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '@/lib/LanguageContext';
import { ShieldCheck, Target, TrendingUp, Users, PiggyBank, HandCoins, Building2, UserCircle } from 'lucide-react';

export default function AboutClient({ aboutData }: { aboutData: any }) {
  const { t } = useLanguage();

  if (!aboutData) return null;

  const statIcons = [
    <PiggyBank className="w-8 h-8 text-[#047038]" />,
    <HandCoins className="w-8 h-8 text-blue-600" />,
    <TrendingUp className="w-8 h-8 text-indigo-500" />,
    <Users className="w-8 h-8 text-orange-500" />
  ];

  const stats = [
    { label: t('Total Deposits', 'ആകെ നിക്ഷേപം'), value: aboutData.stats.deposits, icon: statIcons[0], color: 'bg-green-50' },
    { label: t('Total Loans', 'ആകെ വായ്പകൾ'), value: aboutData.stats.loans, icon: statIcons[1], color: 'bg-blue-50' },
    { label: t('Working Capital', 'പ്രവർത്തന മൂലധനം'), value: aboutData.stats.capital, icon: statIcons[2], color: 'bg-indigo-50' },
    { label: t('Total Members', 'ആകെ അംഗങ്ങൾ'), value: aboutData.stats.members, icon: statIcons[3], color: 'bg-orange-50' }
  ];

  return (
    <div className="pb-24 pt-20">
      {/* CINEMATIC HERO SECTION */}
      <section className="relative w-full min-h-[50vh] flex items-center justify-center overflow-hidden">
        {aboutData.heroImage ? (
          <img 
            src={aboutData.heroImage} 
            alt="About Nattika Bank" 
            className="absolute inset-0 w-full h-full object-cover z-0"
          />
        ) : (
          <div className="absolute inset-0 bg-[#0A3D91] z-0" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A3D91] via-[#0A3D91]/60 to-transparent mix-blend-multiply z-10" />
        <div className="absolute inset-0 bg-black/20 z-10" />

        <div className="relative z-20 text-center px-4 max-w-4xl mx-auto py-20">
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-extrabold text-white mb-4 drop-shadow-lg"
          >
            {t(aboutData.heroTitle, 'ഞങ്ങളുടെ പാരമ്പര്യം')}
          </motion.h1>
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: '80px' }}
            className="h-1.5 bg-green-500 mx-auto mb-6 rounded-full"
          />
          <motion.p 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-blue-50 text-xl md:text-2xl font-medium tracking-wide drop-shadow-md"
          >
            {t(aboutData.heroSubtitle, 'നാട്ടിക സർവീസ് സഹകരണ ബാങ്ക്')}
          </motion.p>
        </div>
      </section>

      {/* OUR STORY SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="w-full lg:w-1/2"
          >
            <div className="relative">
              <div className="absolute -top-4 -left-4 w-24 h-24 bg-green-50 rounded-2xl -z-10" />
              <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-blue-50 rounded-2xl -z-10" />
              <img 
                src={aboutData.heroImage || "https://images.unsplash.com/photo-1541339907198-e08756ebafe3?q=80&w=2670&auto=format&fit=crop"} 
                alt="Bank History" 
                className="rounded-3xl shadow-2xl shadow-blue-900/10 w-full object-cover h-[400px]"
              />
            </div>
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="w-full lg:w-1/2"
          >
            <h2 className="text-sm font-bold text-[#047038] uppercase tracking-[0.2em] mb-3">{t('The Story', 'ചരിത്രം')}</h2>
            <h3 className="text-3xl md:text-4xl font-extrabold text-[#0A3D91] mb-6 leading-tight">
              {t('Growing Since 1933', '1933 മുതൽ നിങ്ങളോടൊപ്പം')}
            </h3>
            <p className="text-gray-600 text-lg leading-relaxed mb-6 whitespace-pre-line">
              {t(aboutData.history, aboutData.history)}
            </p>
            <div className="flex items-center space-x-6 text-[#0A3D91]">
               <div className="flex flex-col">
                 <span className="text-3xl font-bold">90+</span>
                 <span className="text-sm text-gray-500 uppercase font-bold tracking-wider">{t('Years of Trust', 'വർഷത്തെ വിശ്വാസം')}</span>
               </div>
               <div className="w-px h-12 bg-gray-200" />
               <div className="flex flex-col">
                 <span className="text-3xl font-bold">4+</span>
                 <span className="text-sm text-gray-500 uppercase font-bold tracking-wider">{t('Branches', 'ശാഖകൾ')}</span>
               </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* STATS BENTO SECTION */}
      <section className="bg-white py-24 border-y border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">{t('Financial Strength', 'സാമ്പത്തിക കരുത്ത്')}</h2>
            <p className="text-gray-500 max-w-2xl mx-auto">{t('Our numbers tell the story of a stable and growing community institution dedicated to prosperity.', 'ഞങ്ങളുടെ സാമ്പത്തിക വളർച്ചയും നേട്ടങ്ങളും.')}</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-white p-8 rounded-[2rem] border border-gray-100 shadow-sm hover:shadow-xl transition-all group"
              >
                <div className={`w-16 h-16 ${stat.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  {stat.icon}
                </div>
                <h4 className="text-gray-500 font-medium mb-1">{stat.label}</h4>
                <div className="text-3xl font-extrabold text-[#0A3D91]">{stat.value}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* MISSION & VISION SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-[#0A3D91] p-10 rounded-[2.5rem] text-white relative overflow-hidden group shadow-2xl shadow-blue-900/20"
          >
            <div className="relative z-10">
              <Target className="w-12 h-12 text-green-400 mb-6" />
              <h3 className="text-3xl font-bold mb-4">{t('Our Mission', 'ഞങ്ങളുടെ ലക്ഷ്യം')}</h3>
              <p className="text-blue-100 text-lg leading-relaxed opacity-90">
                {t(aboutData.mission, aboutData.mission)}
              </p>
            </div>
            <Target className="absolute -bottom-10 -right-10 w-48 h-48 text-white/5 group-hover:scale-110 transition-transform duration-700" />
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="bg-white p-10 rounded-[2.5rem] border border-gray-100 relative overflow-hidden group shadow-xl shadow-blue-900/5"
          >
            <div className="relative z-10">
              <ShieldCheck className="w-12 h-12 text-[#047038] mb-6" />
              <h3 className="text-3xl font-extrabold text-[#0A3D91] mb-4">{t('Our Vision', 'ഞങ്ങളുടെ കാഴ്ചപ്പാട്')}</h3>
              <p className="text-gray-600 text-lg leading-relaxed">
                 {t(aboutData.vision, aboutData.vision)}
              </p>
            </div>
            <ShieldCheck className="absolute -bottom-10 -right-10 w-48 h-48 text-gray-50 group-hover:scale-110 transition-transform duration-700" />
          </motion.div>
        </div>
      </section>

      {/* LEADERSHIP SECTION (Board of Directors) */}
      <section className="bg-gray-50 py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-extrabold text-[#0A3D91] mb-4">{t('Board of Directors', 'ഭരണസമിതി അംഗങ്ങൾ')}</h2>
            <div className="h-1 w-20 bg-green-500 mx-auto rounded-full" />
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {aboutData.board?.length > 0 ? aboutData.board.map((member: any, i: number) => (
              <motion.div 
                key={i}
                whileHover={{ y: -8 }}
                className="bg-white p-6 rounded-3xl text-center shadow-sm hover:shadow-xl transition-all border border-gray-100 group"
              >
                <div className="w-32 h-32 mx-auto mb-6 rounded-full overflow-hidden border-4 border-gray-50 group-hover:border-green-100 transition-colors">
                  {member.image ? (
                    <img src={member.image} alt={member.name} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full bg-gray-100 flex items-center justify-center text-gray-300">
                      <UserCircle className="w-16 h-16" />
                    </div>
                  )}
                </div>
                <h4 className="text-xl font-bold text-gray-800 mb-1">{member.name}</h4>
                <p className="text-[#047038] font-bold text-sm uppercase tracking-wider">{t(member.designation, member.designation)}</p>
              </motion.div>
            )) : (
              <div className="col-span-full py-12 text-center text-gray-400 bg-white rounded-3xl border border-dashed border-gray-200 uppercase tracking-widest text-sm font-bold">
                 {t('Board Members to be added from CMS', 'ഭരണസമിതി അംഗങ്ങളെ ചേർക്കുക')}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* BANK STAFF SECTION */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-extrabold text-[#0A3D91] mb-4">{t('Our Dedicated Staff', 'ഞങ്ങളുടെ ജീവനക്കാർ')}</h2>
            <p className="text-gray-500">{t('The professional team driving excellence in every transaction.', 'ഞങ്ങളുടെ സേവന മികവിന് നേതൃത്വം നൽകുന്ന പ്രൊഫഷണൽ ടീം.')}</p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {aboutData.staff?.length > 0 ? aboutData.staff.map((member: any, i: number) => (
              <div key={i} className="flex items-center p-4 bg-white rounded-2xl shadow-sm border border-gray-50 hover:shadow-md transition-shadow">
                <div className="w-14 h-14 rounded-full overflow-hidden mr-4">
                  {member.image ? (
                    <img src={member.image} alt={member.name} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full bg-blue-50 flex items-center justify-center text-blue-200">
                      <UserCircle className="w-8 h-8" />
                    </div>
                  )}
                </div>
                <div>
                  <h5 className="font-bold text-gray-800">{member.name}</h5>
                  <p className="text-xs text-gray-500 font-medium uppercase tracking-tight">{t(member.designation, member.designation)}</p>
                </div>
              </div>
            )) : (
              <div className="col-span-full py-12 text-center text-gray-400 border border-dashed border-gray-200 rounded-3xl uppercase tracking-widest text-sm font-bold">
                 {t('Staff Members to be added from CMS', 'ജീവനക്കാരെ ചേർക്കുക')}
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
