import { getCollection } from '@/lib/data-reader';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Camera, Calendar } from 'lucide-react';
import Link from 'next/link';

export default async function PhotoGalleryPage() {
  const photos = getCollection('photoGallery');

  return (
    <>
      <Navbar />
      <main className="flex-1 pt-32 pb-12 bg-[#F8FAFC] min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
            <div>
              <Link href="/gallery" className="text-[#0A3D91] hover:underline font-semibold mb-2 inline-block">&larr; Back to Gallery Menu</Link>
              <h1 className="text-4xl md:text-5xl font-extrabold text-[#0A3D91]">Photo Gallery</h1>
            </div>
            <p className="text-gray-500 mt-4 md:mt-0 font-medium">Capturing the life of Nattika Bank</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {photos.length > 0 ? (
              photos.map((photo) => (
                <div key={photo.slug} className="bg-white rounded-3xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-lg transition-all group">
                  <div className="h-64 relative bg-gray-100 overflow-hidden">
                    {photo.entry.image ? (
                        <img src={photo.entry.image} alt={photo.entry.title} className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    ) : (
                        <div className="absolute flex items-center justify-center inset-0 w-full h-full">
                           <Camera className="w-12 h-12 text-gray-300" />
                        </div>
                    )}
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-800 mb-2">{photo.entry.title}</h3>
                    <div className="flex items-center text-sm font-medium text-[#047038]">
                      <Calendar className="w-4 h-4 mr-2" />
                      {photo.entry.date}
                    </div>
                  </div>
                </div>
              ))
            ) : (
                <div className="col-span-1 sm:col-span-2 lg:col-span-3 text-center py-20 bg-white rounded-3xl border border-dashed border-gray-200">
                  <Camera className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-700">No photos published yet</h3>
                  <p className="text-gray-500">Check back later for event highlights.</p>
                </div>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
