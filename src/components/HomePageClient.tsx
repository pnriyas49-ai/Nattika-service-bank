'use client';

import { motion } from 'framer-motion';
import { useLanguage } from '@/lib/LanguageContext';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Link from 'next/link';
import { ChevronRight, Percent, Briefcase, Home, Truck, Coins, ShieldCheck, HeartHandshake, History } from 'lucide-react';
import HeroCarousel from './HeroCarousel';

export default function HomePageClient({ 
  homepageData, 
  loansData, 
  depositsData, 
  settingsData 
}: { 
  homepageData: any; 
  loansData?: any[]; 
  depositsData?: any[];
  settingsData?: any 
}) {
  const { t } = useLanguage();

  // Find the highest interest rate for the Top Deposit Rate block
  const topDeposit = depositsData && depositsData.length > 0 
    ? [...depositsData].sort((a, b) => parseFloat(b.entry.rate) - parseFloat(a.entry.rate))[0]
    : null;

  const marqueeText = settingsData?.marqueeText || t('Welcome to Nattika Service Cooperative Bank! | New: Interest-less loans available for Paddy Cultivation! | Avail lowest interest rates for Gold Loans today.', 'നാട്ടിക സർവീസ് സഹകരണ ബാങ്കിലേക്ക് സ്വാഗതം! | നെൽകൃഷിക്കായി പലിശരഹിത വായ്പകൾ ലഭ്യമാണ്!');

  // Helper map to restore dynamic icons if you prefer
  const iconMap: { [key: string]: React.ReactNode } = {
    'Coins': <Coins className="w-8 h-8 text-yellow-500" />,
    'Home': <Home className="w-8 h-8 text-[#047038]" />,
    'Briefcase': <Briefcase className="w-8 h-8 text-[#0A3D91]" />,
    'Tractor': <Truck className="w-8 h-8 text-blue-600" />,
    'BadgePercent': <Percent className="w-8 h-8 text-indigo-500" />
  };

  return (
    <>
      <Navbar />
      <main className="flex-1 overflow-hidden bg-[#F8FAFC]">
        {/* FULL-WIDTH IMMERSIVE HERO */}
        <div className="relative w-full min-h-[85vh] flex items-center justify-center overflow-hidden">
          {homepageData?.heroVideoUrl && (
            <video autoPlay loop muted playsInline className="absolute inset-0 w-full h-full object-cover z-0">
               <source src={homepageData.heroVideoUrl} type="video/mp4" />
            </video>
          )}
          {(!homepageData?.heroVideoUrl && homepageData?.heroImages?.length > 0) && (
            <div className="absolute inset-0 w-full h-full z-0">
               <HeroCarousel images={homepageData.heroImages} />
            </div>
          )}
          
          {/* Layered Gradient Overlay for text readability (matches 1st School styling) */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0A3D91]/90 via-[#0A3D91]/50 to-transparent mix-blend-multiply z-10"></div>
          <div className="absolute inset-0 bg-black/30 z-10"></div>

          <div className="relative z-20 text-center px-4 max-w-4xl mx-auto pt-24">
            <motion.h1 
               initial={{ opacity: 0, y: 30 }}
               animate={{ opacity: 1, y: 0 }}
               className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6 text-white leading-tight"
            >
              {t('Empowering Your', 'നിങ്ങളുടെ സാമ്പത്തിക')} <br/>
              <span className="text-green-400">{t('Financial Future', 'വളർച്ചയ്ക്കായി')}</span>
            </motion.h1>
            
            <motion.p 
               initial={{ opacity: 0, y: 30 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ delay: 0.1 }}
               className="text-blue-50 text-xl md:text-2xl mb-10 max-w-2xl mx-auto font-medium leading-relaxed drop-shadow-md"
            >
              {t('A trusted cooperative bank serving the people of Nattika with comprehensive financial solutions.', 
                 'നാട്ടികയിലെ ജനങ്ങളുടെ വിശ്വസ്ത സഹകരണ ബാങ്ക്.')}
            </motion.p>
            
            <motion.div 
               initial={{ opacity: 0, scale: 0.9 }}
               animate={{ opacity: 1, scale: 1 }}
               transition={{ delay: 0.2 }}
               className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-6 justify-center"
            >
              <Link href="/facilities" className="bg-[#047038] hover:bg-green-700 text-white px-8 py-4 rounded-full text-lg font-bold transition-all shadow-xl flex items-center justify-center">
                {t('Our Facilities', 'സൗകര്യങ്ങൾ')} <ChevronRight className="ml-2 w-5 h-5" />
              </Link>
              <Link href="/contact" className="bg-white hover:bg-gray-50 text-[#0A3D91] px-8 py-4 rounded-full text-lg font-bold transition-all shadow-xl flex items-center justify-center">
                {t('Contact Us', 'ബന്ധപ്പെടുക')}
              </Link>
            </motion.div>
          </div>
        </div>

        {/* Live Ticker Area (Moved below Hero) */}
        <div className="bg-[#0A3D91] text-white py-3 border-t border-blue-800 overflow-hidden whitespace-nowrap relative flex shadow-md z-30">
          <motion.div 
            animate={{ x: [0, -1000] }} 
            transition={{ repeat: Infinity, duration: 40, ease: "linear" }}
            className="flex items-center space-x-12 text-sm md:text-base font-medium px-4"
          >
            <span className="flex-shrink-0">{marqueeText}</span>
            <span className="flex-shrink-0">{marqueeText}</span>
          </motion.div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          
          {/* Feature Row / Fast Access Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative z-40">

            {/* LIVE RATES BENTO */}
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="bg-white rounded-3xl p-8 shadow-xl shadow-blue-900/5 border border-gray-100 flex flex-col relative group"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-gray-800 text-lg">{t('Top Interest Rate', 'മികച്ച പലിശ നിരക്ക്')}</h3>
                <div className="w-12 h-12 bg-green-50 rounded-full flex items-center justify-center">
                  <Percent className="w-6 h-6 text-[#047038]" />
                </div>
              </div>
              <div className="mt-8">
                <span className="text-5xl font-extrabold text-[#0A3D91]">{topDeposit ? topDeposit.entry.rate : '8.5%'}</span>
                <span className="text-gray-500 ml-2 font-bold text-xl">p.a.</span>
                <p className="text-gray-500 mt-4 font-medium leading-tight">
                  {topDeposit 
                   ? t(topDeposit.entry.title + ' (' + topDeposit.entry.duration + ')', topDeposit.entry.title) 
                   : t('For Senior Citizens (1 Year Fixed Deposit)', 'മുതിർന്ന പൗരന്മാർക്ക്')}
                </p>
              </div>
            </motion.div>

            {/* QUICK LINK: NEETHI SCHEMES */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="bg-gradient-to-br from-[#047038] to-[#03592c] rounded-3xl p-8 text-white relative shadow-xl shadow-green-900/10 min-h-[300px] flex flex-col group overflow-hidden"
            >
               <div className="relative z-10">
                 <h3 className="font-bold text-2xl mb-4">{t('Neethi Services', 'നീതി സേവനങ്ങൾ')}</h3>
                 <p className="text-green-50 text-base mb-8 leading-relaxed opacity-90">
                   {t('Medical store, Clinic, and Lab facilities available for the community.', 'മെഡിക്കൽ സ്റ്റോർ, ക്ലിനിക്, ലാബ് സൗകര്യങ്ങൾ ലഭ്യമാണ്.')}
                 </p>
               </div>
               
               <ShieldCheck className="w-32 h-32 text-white/10 absolute -bottom-8 -right-8 group-hover:scale-110 transition-transform duration-700" />
               
               <Link href="/facilities#subsidiaries" className="mt-auto inline-flex items-center font-bold text-white group/btn">
                 <span className="mr-2 border-b-2 border-green-400 group-hover/btn:border-white transition-colors">{t('Learn More', 'കൂടുതൽ അറിയാൻ')}</span>
                 <ChevronRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
               </Link>
            </motion.div>

            {/* GOLD LOAN BENTO */}
            <motion.div 
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ delay: 0.3 }}
             className="bg-white rounded-3xl p-6 shadow-xl shadow-blue-900/5 border border-gray-100 flex flex-col justify-between group hover:-translate-y-1 transition-all"
            >
              <div>
                <div className="bg-yellow-50 text-yellow-700 text-xs font-bold px-3 py-1 rounded-full mb-3 inline-block uppercase tracking-wider">
                  {t('Most Popular', 'ജനപ്രിയം')}
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">{t('Instant Gold Loan', 'തൽക്ഷണ സ്വർണ്ണ വായ്പ')}</h3>
                <p className="text-gray-500 text-sm">{t('Get cash instantly against your gold jewelry with minimal documentation.', 'കുറഞ്ഞ രേഖകൾ നൽകി പെട്ടെന്ന് വായ്പ നേടുക.')}</p>
              </div>
              <div className="mt-4 flex justify-end">
                <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <Coins className="w-6 h-6 text-yellow-600" />
                </div>
              </div>
            </motion.div>
          </div>

          {/* About Us (EFSC Style Side-by-Side) */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-20 bg-white rounded-3xl border border-gray-100 overflow-hidden shadow-sm hover:shadow-lg transition-all duration-500"
          >
            <div className="flex flex-col md:flex-row">
               <div className="w-full md:w-5/12 bg-gray-200 relative min-h-[300px]">
                 {homepageData?.heroImages && homepageData.heroImages.length > 0 ? (
                    <img src={homepageData.heroImages[0]} alt="Bank Branch" className="absolute inset-0 w-full h-full object-cover" />
                 ) : (
                    <div className="absolute inset-0 flex items-center justify-center bg-blue-50 text-blue-200">
                      <History className="w-24 h-24" />
                    </div>
                 )}
               </div>
               <div className="w-full md:w-7/12 p-8 md:p-12 flex flex-col justify-center">
                 <h2 className="text-sm font-bold text-[#047038] uppercase tracking-wider mb-2">{t('Welcome to', 'സ്വാഗതം')}</h2>
                 <h3 className="text-3xl font-extrabold text-[#0A3D91] mb-4">Nattika Service Cooperative Bank</h3>
                 <p className="text-gray-600 mb-6 leading-relaxed">
                   {t('Since our inception, we have been dedicated to meeting the growing financial needs of our community by introducing innovative policies, schemes, and loan plans aimed particularly at helping the common man and fostering local development.', 'ഞങ്ങളുടെ ആരംഭം മുതൽ, നാടിന്റെയും നാട്ടുകാരുടെയും സാമ്പത്തിക വളർച്ചയ്ക്കും ഉന്നമനത്തിനുമായി ഞങ്ങൾ പ്രവർത്തിക്കുന്നു.')}
                 </p>
                 <Link href="/about" className="inline-flex items-center font-bold text-[#0A3D91] hover:text-[#047038] transition-colors w-max">
                   {t('Read Our Story', 'കൂടുതൽ അറിയുക')} <ChevronRight className="ml-1 w-4 h-4" />
                 </Link>
               </div>
            </div>
          </motion.div>

          {/* Core Services Grid */}
          <div className="mt-16">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-800">{t('Our Premium Services', 'ഞങ്ങളുടെ സേവനങ്ങൾ')}</h2>
              <Link href="/facilities" className="hidden sm:flex text-[#0A3D91] font-semibold items-center hover:underline">
                {t('View All', 'എല്ലാം കാണുക')} <ChevronRight className="w-4 h-4 ml-1" />
              </Link>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {loansData && loansData.slice(0, 4).map((loan: any, idx: number) => {
                const IconComponent = loan.entry.icon && iconMap[loan.entry.icon] ? iconMap[loan.entry.icon] : <Percent className="w-8 h-8 text-gray-500" />;
                const hasBgImage = !!loan.entry.backgroundImage;

                return (
                  <motion.div
                    key={loan.slug}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.1 }}
                    whileHover={{ y: -5 }}
                    className={`relative p-6 rounded-3xl shadow-sm border border-gray-100 hover:shadow-lg transition-all group overflow-hidden ${hasBgImage ? 'text-white min-h-[220px] flex flex-col justify-end' : 'bg-white'}`}
                  >
                    {hasBgImage && (
                      <>
                        <img src={loan.entry.backgroundImage} alt={loan.entry.title} className="absolute inset-0 w-full h-full object-cover z-0 group-hover:scale-105 transition-transform duration-500" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/10 z-0"></div>
                      </>
                    )}
                    
                    <div className="relative z-10">
                      {!hasBgImage && (
                        <div className="w-14 h-14 bg-gray-50 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-blue-50 transition-colors">
                          {IconComponent}
                        </div>
                      )}
                      <h3 className={`text-xl font-bold mb-2 ${hasBgImage ? 'text-white' : 'text-gray-800'}`}>
                        {t(loan.entry.title, loan.entry.title)}
                      </h3>
                      <p className={`text-sm ${hasBgImage ? 'text-gray-200' : 'text-gray-500'}`}>
                        {t(loan.entry.description, loan.entry.description)}
                      </p>
                      
                      <div className="mt-4 flex items-center justify-between">
                         <span className={`text-sm font-bold ${hasBgImage ? 'text-yellow-400' : 'text-[#047038]'}`}>
                           {loan.entry.rate} {t('Interest', 'പലിശ')}
                         </span>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
          
        </div>
      </main>
      <Footer />
    </>
  );
}
