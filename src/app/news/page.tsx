import { createReader } from '@keystatic/core/reader';
import config from '../../../keystatic.config';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Newspaper, Calendar } from 'lucide-react';

export default async function NewsPage() {
  const reader = createReader(process.cwd(), config);
  const newsItems = await reader.collections.news.all();

  return (
    <>
      <Navbar />
      <main className="flex-1 pt-32 pb-12 bg-[#F8FAFC] min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-4xl font-bold text-[#0A3D91]">News & Announcements</h1>
          </div>

          <div className="space-y-6">
            {newsItems.length > 0 ? (
              newsItems.map((news) => (
                <div key={news.slug} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex flex-col md:flex-row md:items-start gap-4 hover:shadow-md transition-shadow">
                  <div className="hidden md:flex w-16 h-16 bg-blue-50 rounded-xl items-center justify-center flex-shrink-0">
                    <Newspaper className="w-8 h-8 text-[#0A3D91]" />
                  </div>
                  <div className="flex-1">
                    <h2 className="text-2xl font-bold text-gray-800 mb-2">{news.slug}</h2>
                    <div className="flex items-center text-sm font-medium text-[#047038] mb-4">
                       <Calendar className="w-4 h-4 mr-2" />
                       {news.entry.date}
                    </div>
                    {news.entry.image && (
                      <div className="w-full h-64 md:h-80 mb-6 rounded-2xl overflow-hidden relative">
                        <img src={news.entry.image} alt={news.slug} className="absolute inset-0 w-full h-full object-cover" />
                      </div>
                    )}
                    <p className="text-gray-600 leading-relaxed whitespace-pre-line">{news.entry.content}</p>
                  </div>
                </div>
              ))
            ) : (
                <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-gray-200">
                  <Newspaper className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-700">No recent announcements</h3>
                  <p className="text-gray-500">Check back later for news and updates from the bank.</p>
                </div>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
