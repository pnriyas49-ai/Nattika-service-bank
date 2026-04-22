'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useLanguage } from '@/lib/LanguageContext';
import { Menu, X, Globe, Lock, Phone } from 'lucide-react';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { language, setLanguage, t } = useLanguage();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { href: '/loans', labelEn: 'Loans', labelMl: 'ലോണുകൾ' },
    { href: '/deposits', labelEn: 'Deposits', labelMl: 'നിക്ഷേപങ്ങൾ' },
    { href: '/services', labelEn: 'Services', labelMl: 'സേവനങ്ങൾ' },
    { href: '/news', labelEn: 'News & Notices', labelMl: 'വാർത്തകൾ' },
    { href: '/contact', labelEn: 'Contact Us', labelMl: 'ബന്ധപ്പെടുക' },
  ];

  return (
    <header
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/80 backdrop-blur-md shadow-sm border-b border-gray-100 py-3'
          : 'bg-white py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          
          {/* Logo Section */}
          <Link href="/" className="flex flex-col max-w-[70%]">
            <span className="text-base md:text-2xl font-bold text-[#0A3D91] tracking-tight leading-tight">
              Nattika Service Cooperative Bank
            </span>
            <span className="text-xs text-gray-500 hidden md:block">
              {t('Ltd No R 308 | Thriprayar, Thrissur', 'ലിമിറ്റഡ് നമ്പർ R 308 | തൃപ്രയാർ, തൃശ്ശൂർ')}
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center space-x-6 lg:space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-semibold text-gray-700 hover:text-[#0A3D91] transition-colors"
              >
                {t(link.labelEn, link.labelMl)}
              </Link>
            ))}
            
            {/* Bilingual Toggle */}
            <button
              onClick={() => setLanguage(language === 'en' ? 'ml' : 'en')}
              className="flex items-center space-x-1 px-3 py-1.5 rounded-full border border-gray-200 bg-gray-50 hover:bg-gray-100 text-sm font-medium transition-colors"
            >
              <Globe className="w-4 h-4 text-gray-500" />
              <span>{language === 'en' ? 'മലയാളം' : 'English'}</span>
            </button>

            {/* Trust Signal / Login button */}
            <Link
              href="/login"
              className="group flex items-center space-x-2 bg-[#047038] hover:bg-[#03592c] text-white px-5 py-2.5 rounded-full font-medium transition-all shadow-md shadow-green-900/10"
            >
              <Lock className="w-4 h-4 group-hover:scale-110 transition-transform" />
              <span>{t('Customer Login', 'ലോഗിൻ')}</span>
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2 text-gray-600"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="lg:hidden absolute top-full left-0 w-full bg-white border-b border-gray-100 shadow-xl"
        >
          <div className="flex flex-col p-4 space-y-4">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-base font-semibold text-gray-800 p-2 rounded-md hover:bg-gray-50"
                onClick={() => setMobileMenuOpen(false)}
              >
                {t(link.labelEn, link.labelMl)}
              </Link>
            ))}
            <div className="pt-4 border-t border-gray-100 flex flex-col space-y-4">
              <button
                onClick={() => setLanguage(language === 'en' ? 'ml' : 'en')}
                className="flex items-center justify-center space-x-2 p-2 border border-gray-200 rounded-md"
              >
                <Globe className="w-4 h-4" />
                <span>{language === 'en' ? 'Switch to മലയാളം' : 'Switch to English'}</span>
              </button>
              <Link
                href="/login"
                className="flex items-center justify-center space-x-2 bg-[#047038] text-white p-3 rounded-md font-medium"
                onClick={() => setMobileMenuOpen(false)}
              >
                <Lock className="w-4 h-4" />
                <span>{t('Secure Customer Login', 'ലോഗിൻ')}</span>
              </Link>
            </div>
          </div>
        </motion.div>
      )}
    </header>
  );
}
