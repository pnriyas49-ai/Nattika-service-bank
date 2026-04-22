import { createReader } from '@keystatic/core/reader';
import config from '../../../keystatic.config';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import AboutClient from '@/components/AboutClient';

export default async function AboutPage() {
  const reader = createReader(process.cwd(), config);
  const aboutData = await reader.singletons.about.read();
  
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
