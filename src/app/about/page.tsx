import { getSingleton } from '@/lib/data-reader';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import AboutClient from '@/components/AboutClient';

export default async function AboutPage() {
  const aboutData = getSingleton('about');
  
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-[#F8FAFC]">
        <AboutClient aboutData={aboutData} />
      </main>
      <Footer />
    </>
  );
}
