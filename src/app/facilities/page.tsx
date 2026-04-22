import { getSingleton } from '@/lib/data-reader';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import FacilitiesClient from '@/components/FacilitiesClient';

export default async function FacilitiesPage() {
  const data = getSingleton('facilities');

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-[#F8FAFC]">
        <FacilitiesClient data={data} />
      </main>
      <Footer />
    </>
  );
}
