'use client';

import { useLanguage } from '@/lib/LanguageContext';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { motion } from 'framer-motion';
import { Pill, GraduationCap, Building2, ShieldCheck, CreditCard, Banknote } from 'lucide-react';

export default function ServicesPage() {
  const { t } = useLanguage();

  const otherServices = [
    { icon: <ShieldCheck className="w-8 h-8 text-green-600" />, titleEn: 'Neethi Medicals', titleMl: 'നീതി മെഡിക്കൽസ്' },
    { icon: <Pill className="w-8 h-8 text-red-500" />, titleEn: 'Neethi Clinic & Lab', titleMl: 'നീതി ക്ലിനിക് & ലാബ്' },
    { icon: <Building2 className="w-8 h-8 text-blue-600" />, titleEn: 'Locker Facility', titleMl: 'ലോക്കർ സൗകര്യം' },
    { icon: <CreditCard className="w-8 h-8 text-purple-600" />, titleEn: 'Online Payments', titleMl: 'ഓൺലൈൻ പേയ്‌മെന്റുകൾ' },
  ];

  return (
    <>
      <Navbar />
      <main className="flex-1 pt-32 pb-24 bg-[#F8FAFC]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center mb-16">
            <h1 className="text-4xl font-extrabold text-[#047038] mb-4">{t('Our Services', 'പ്രധാന സേവനങ്ങൾ')}</h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              {t('Beyond banking, we are committed to the community. Explore our specialized services designed for your everyday needs.', 'ബാങ്കിംഗിനപ്പുറം, സമൂഹത്തോടുള്ള ഞങ്ങളുടെ പ്രതിബദ്ധത.')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Neethi Services Card */}
            <motion.div 
               initial={{ opacity: 0, y: 20 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true }}
               className="bg-gradient-to-br from-[#0A3D91] to-[#0D4EBA] rounded-3xl p-8 text-white relative shadow-lg overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-2xl -mr-10 -mt-10"></div>
              <h2 className="text-3xl font-bold mb-4">{t('Neethi Institutions', 'നീതി സ്ഥാപനങ്ങൾ')}</h2>
              <p className="text-blue-100 mb-8 max-w-sm">
                Providing affordable healthcare and reliable medicines to the local community through our dedicated Neethi Medical stores, Clinic, and Laboratories.
              </p>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white/10 rounded-xl p-4 backdrop-blur-sm border border-white/10">
                  <Pill className="w-6 h-6 text-blue-200 mb-2" />
                  <div className="font-semibold">{t('Medicals', 'മെഡിക്കൽസ്')}</div>
                </div>
                <div className="bg-white/10 rounded-xl p-4 backdrop-blur-sm border border-white/10">
                  <ShieldCheck className="w-6 h-6 text-blue-200 mb-2" />
                  <div className="font-semibold">{t('Lab & Clinic', 'ക്ലിനിക് & ലാബ്')}</div>
                </div>
              </div>
            </motion.div>

             {/* Facilities Card */}
             <motion.div 
               initial={{ opacity: 0, y: 20 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true }}
               transition={{ delay: 0.1 }}
               className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm"
            >
              <h2 className="text-2xl font-bold text-gray-800 mb-6">{t('Other Facilities', 'മറ്റു സൗകര്യങ്ങൾ')}</h2>
              
              <div className="space-y-6">
                 {otherServices.map((service, idx) => (
                   <div key={idx} className="flex items-center p-4 rounded-2xl bg-gray-50 hover:bg-green-50 transition-colors group">
                     <div className="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center mr-4 group-hover:scale-105 transition-transform">
                       {service.icon}
                     </div>
                     <div>
                       <h4 className="font-bold text-gray-800 tracking-tight">{t(service.titleEn, service.titleMl)}</h4>
                     </div>
                   </div>
                 ))}
              </div>
            </motion.div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
