'use client';

import { useLanguage } from '@/lib/LanguageContext';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { MapPin, Phone, Mail, Clock, Send } from 'lucide-react';
import { motion } from 'framer-motion';

export default function ContactPage() {
  const { t } = useLanguage();

  return (
    <>
      <Navbar />
      <main className="flex-1 pt-32 pb-24 bg-[#F8FAFC] min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center mb-16">
            <h1 className="text-4xl lg:text-5xl font-extrabold text-[#0A3D91] tracking-tight mb-4">{t('Contact & Branches', 'ബന്ധപ്പെടുക')}</h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              {t('We are always here to help you. Reach out to our main branch or our extended counters for any financial assistance.', 'ഏത് സാമ്പത്തിക സഹായത്തിനും ഞങ്ങളെ സമീപിക്കുക.')}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            <div className="lg:col-span-1 space-y-6">
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100"
              >
                <div className="w-12 h-12 bg-blue-50 text-[#0A3D91] rounded-2xl flex items-center justify-center mb-6">
                  <MapPin className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">Main Branch</h3>
                <p className="text-gray-600 mb-4 h-12">Nattika Serv Co-Op Bank Ltd No R 308, P.O Nattika, Thriprayar, Thrissur - 680566</p>
                <div className="space-y-3 pt-4 border-t border-gray-100">
                  <div className="flex items-center text-sm font-medium text-gray-700">
                    <Phone className="w-4 h-4 mr-2 text-[#047038]" /> 0487 2395310, 2391452
                  </div>
                  <div className="flex items-center text-sm font-medium text-gray-700">
                    <Mail className="w-4 h-4 mr-2 text-[#047038]" /> nattikascb@gmail.com
                  </div>
                </div>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 }}
                className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100"
              >
                <h3 className="text-xl font-bold text-gray-800 mb-2">Other Branches</h3>
                
                <div className="mt-6 space-y-6">
                  <div>
                    <h4 className="font-semibold text-gray-800 flex items-center">
                      <MapPin className="w-4 h-4 mr-1 text-[#047038]"/> Nattika Beach
                    </h4>
                    <p className="text-sm text-gray-500 ml-5 mt-1">Nattika Beach, Thriprayar</p>
                    <p className="text-sm text-gray-600 ml-5 font-medium mt-1">📞 0487 2393343</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800 flex items-center">
                      <MapPin className="w-4 h-4 mr-1 text-[#047038]"/> Cherkkara
                    </h4>
                    <p className="text-sm text-gray-500 ml-5 mt-1">Cherkkara, Nattika, Thriprayar</p>
                    <p className="text-sm text-gray-600 ml-5 font-medium mt-1">📞 0487 2396226</p>
                  </div>
                </div>
              </motion.div>
            </div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="lg:col-span-2 bg-white rounded-3xl p-8 lg:p-12 shadow-md shadow-blue-900/5 group"
            >
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-gray-800 tracking-tight">{t('Send us a Message', 'ഒരു സന്ദേശം അയക്കുക')}</h2>
                <p className="text-gray-500 mt-2">{t('Fill out the form below and our team will get back to you shortly.', 'താഴെ കാണുന്ന ഫോം പൂരിപ്പിക്കുക.')}</p>
              </div>

              <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-gray-700">{t('Full Name', 'മുഴുവൻ പേര്')}</label>
                    <input type="text" className="w-full h-12 px-4 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-[#047038] focus:border-transparent transition-all outline-none" placeholder="John Doe" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-gray-700">{t('Phone Number', 'ഫോൺ നമ്പർ')}</label>
                    <input type="tel" className="w-full h-12 px-4 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-[#047038] focus:border-transparent transition-all outline-none" placeholder="+91 90000 00000" />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700">{t('Email Address', 'ഇമെയിൽ വിലാസം')}</label>
                  <input type="email" className="w-full h-12 px-4 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-[#047038] focus:border-transparent transition-all outline-none" placeholder="john@example.com" />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700">{t('Your Message or Comments', 'നിങ്ങളുടെ സന്ദേശം')}</label>
                  <textarea rows={5} className="w-full p-4 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-[#047038] focus:border-transparent transition-all outline-none resize-none" placeholder="How can we help you?"></textarea>
                </div>

                <button className="w-full h-14 bg-[#0A3D91] hover:bg-[#083073] text-white rounded-xl font-bold flex items-center justify-center space-x-2 transition-colors shadow-lg shadow-blue-900/20">
                  <span>{t('Submit Request', 'സമർപ്പിക്കുക')}</span>
                  <Send className="w-5 h-5" />
                </button>
              </form>
            </motion.div>

          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
