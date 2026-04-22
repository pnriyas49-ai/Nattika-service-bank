'use client';

import Link from 'next/link';
import { useLanguage } from '@/lib/LanguageContext';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';

export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="bg-[#0A3D91] text-white border-t border-[#083073] mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          
          <div className="space-y-4">
            <h3 className="text-xl font-bold tracking-tight">Nattika Service Cooperative Bank</h3>
            <p className="text-sm text-blue-200">
              {t('Serving the community with trust and excellence since inception. Ltd No R 308.', 
                 'സ്ഥാപിതമായ കാലം മുതൽ വിശ്വാസത്തോടെയും മികച്ച സേവനത്തോടെയും സമൂഹത്തെ സേവിക്കുന്നു. ലിമിറ്റഡ് നമ്പർ R 308.')}
            </p>
          </div>

          <div className="space-y-4">
            <h4 className="text-lg font-semibold">{t('Contact Us', 'ബന്ധപ്പെടുക')}</h4>
            <ul className="space-y-3 text-sm text-blue-200">
              <li className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 flex-shrink-0 text-green-400" />
                <span>P.O Nattika, Thriprayar, Thrissur, Kerala - 680566</span>
              </li>
              <li className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-green-400" />
                <div className="flex flex-col">
                  <span>0487 2395310, 2391452</span>
                  <span>Mob: +91 9387054840</span>
                </div>
              </li>
              <li className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-green-400" />
                <span>nattikascb@gmail.com</span>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h4 className="text-lg font-semibold">{t('Quick Links', 'പ്രധാന ലിങ്കുകൾ')}</h4>
            <ul className="space-y-2 text-sm text-blue-200">
              <li><Link href="/facilities" className="hover:text-white transition-colors">{t('Facilities', 'സൗകര്യങ്ങൾ')}</Link></li>
              <li><Link href="/about" className="hover:text-white transition-colors">{t('About Us', 'ഞങ്ങളെ കുറിച്ച്')}</Link></li>
              <li><Link href="/news" className="hover:text-white transition-colors">{t('News', 'വാർത്തകൾ')}</Link></li>
              <li><Link href="/gallery/photos" className="hover:text-white transition-colors">{t('Gallery', 'ഗാലറി')}</Link></li>
            </ul>
          </div>

          <div className="space-y-4">
            <h4 className="text-lg font-semibold">{t('Working Hours', 'പ്രവർത്തന സമയം')}</h4>
            <div className="flex items-start space-x-3 text-sm text-blue-200">
              <Clock className="w-5 h-5 text-green-400" />
              <span>{t('9:30 AM to 5:00 PM', 'രാവിലെ 9:30 മുതൽ വൈകുന്നേരം 5:00 വരെ')}</span>
            </div>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-[#0D4EBA] flex flex-col md:flex-row justify-between items-center text-xs text-blue-300">
          <p>© {new Date().getFullYear()} Nattika Service Cooperative Bank. All rights reserved.</p>
          <p className="mt-2 md:mt-0">Designed elegantly</p>
        </div>
      </div>
    </footer>
  );
}
