'use client';

import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Link from 'next/link';
import { Camera, Film, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';

export default function GalleryHubPage() {
  return (
    <>
      <Navbar />
      <main className="flex-1 pt-32 pb-12 bg-[#F8FAFC] min-h-screen border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-extrabold text-[#0A3D91] mb-4">Our Gallery</h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Explore the moments that define our community and the bank's active participation in local growth.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* Photo Gallery Card */}
            <motion.div 
               whileHover={{ y: -10 }}
               className="group relative bg-white rounded-3xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-xl transition-all"
            >
              <div className="h-64 bg-gradient-to-br from-blue-100 to-[#0A3D91]/20 flex items-center justify-center relative overflow-hidden">
                <Camera className="w-24 h-24 text-[#0A3D91] opacity-20 absolute rotate-12 -right-4 -bottom-4 group-hover:scale-110 transition-transform" />
                <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-lg relative z-10 group-hover:scale-110 transition-transform">
                   <Camera className="w-10 h-10 text-[#0A3D91]" />
                </div>
              </div>
              <div className="p-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-2">Photo Gallery</h2>
                <p className="text-gray-500 mb-8">View photos from recent branch events, inaugurations, and community programs.</p>
                <Link href="/gallery/photos" className="inline-flex items-center justify-center w-full bg-[#0A3D91] hover:bg-blue-800 text-white font-semibold py-3 px-6 rounded-full transition-colors">
                  View Photos <ChevronRight className="ml-2 w-5 h-5" />
                </Link>
              </div>
            </motion.div>

            {/* Video Gallery Card */}
            <motion.div 
               whileHover={{ y: -10 }}
               className="group relative bg-white rounded-3xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-xl transition-all"
            >
              <div className="h-64 bg-gradient-to-br from-green-100 to-[#047038]/20 flex items-center justify-center relative overflow-hidden">
                <Film className="w-24 h-24 text-[#047038] opacity-20 absolute -rotate-12 -left-4 -top-4 group-hover:scale-110 transition-transform" />
                <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-lg relative z-10 group-hover:scale-110 transition-transform">
                   <Film className="w-10 h-10 text-[#047038]" />
                </div>
              </div>
              <div className="p-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-2">Video Gallery</h2>
                <p className="text-gray-500 mb-8">Watch highlights of our services, financial awareness videos, and branch videos.</p>
                <Link href="/gallery/videos" className="inline-flex items-center justify-center w-full bg-[#047038] hover:bg-green-800 text-white font-semibold py-3 px-6 rounded-full transition-colors">
                  Watch Videos <ChevronRight className="ml-2 w-5 h-5" />
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
