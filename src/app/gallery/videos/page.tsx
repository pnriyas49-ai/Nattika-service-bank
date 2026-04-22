import { createReader } from '@keystatic/core/reader';
import config from '../../../../keystatic.config';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Film } from 'lucide-react';
import Link from 'next/link';

export default async function VideoGalleryPage() {
  const reader = createReader(process.cwd(), config);
  const videos = await reader.collections.videoGallery.all();

  return (
    <>
      <Navbar />
      <main className="flex-1 pt-32 pb-12 bg-[#F8FAFC] min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
            <div>
              <Link href="/gallery" className="text-[#047038] hover:underline font-semibold mb-2 inline-block">&larr; Back to Gallery Menu</Link>
              <h1 className="text-4xl md:text-5xl font-extrabold text-[#047038]">Video Gallery</h1>
            </div>
            <p className="text-gray-500 mt-4 md:mt-0 font-medium">Watch events and updates</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {videos.length > 0 ? (
              videos.map((video) => {
                // Try to handle youtube links by transforming them to embed links if necessary
                let embedUrl = video.entry.videoUrl;
                if (embedUrl.includes('youtube.com/watch?v=')) {
                    embedUrl = embedUrl.replace('watch?v=', 'embed/');
                } else if (embedUrl.includes('youtu.be/')) {
                    embedUrl = embedUrl.replace('youtu.be/', 'youtube.com/embed/');
                }

                return (
                  <div key={video.slug} className="bg-white rounded-3xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-lg transition-all">
                    <div className="h-64 sm:h-80 relative bg-black">
                      {embedUrl.endsWith('.mp4') ? (
                          <video controls className="absolute inset-0 w-full h-full object-contain">
                             <source src={embedUrl} type="video/mp4" />
                          </video>
                      ) : (
                          <iframe 
                             src={embedUrl}
                             className="absolute inset-0 w-full h-full border-0"
                             allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                             allowFullScreen
                          ></iframe>
                      )}
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl font-bold text-gray-800">{video.entry.title}</h3>
                    </div>
                  </div>
                )
              })
            ) : (
                <div className="col-span-1 md:col-span-2 text-center py-20 bg-white rounded-3xl border border-dashed border-gray-200">
                  <Film className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-700">No videos published yet</h3>
                  <p className="text-gray-500">Check back later for video content.</p>
                </div>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
