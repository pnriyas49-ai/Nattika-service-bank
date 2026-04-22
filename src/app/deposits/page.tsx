import { createReader } from '@keystatic/core/reader';
import config from '../../../keystatic.config';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { PiggyBank, Briefcase, Calculator } from 'lucide-react';

export default async function DepositsPage() {
  const reader = createReader(process.cwd(), config);
  const depositRates = await reader.collections.depositRates.all();

  return (
    <>
      <Navbar />
      <main className="flex-1 pt-32 pb-12 bg-[#F8FAFC] min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-[#0A3D91] mb-4">Deposit Schemes</h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Secure your future with our highly rewarding deposit schemes. We provide the best interest rates with complete capital security.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {depositRates.length > 0 ? (
              depositRates.map((deposit) => (
                <div key={deposit.slug} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                  <div className="w-14 h-14 bg-green-50 rounded-2xl flex items-center justify-center mb-4">
                     <PiggyBank className="w-8 h-8 text-[#047038]" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-800">{deposit.entry.title}</h3>
                  <p className="text-gray-500 text-sm mt-2 mb-4">Duration: {deposit.entry.duration}</p>
                  
                  <div className="bg-green-50/50 rounded-xl p-4 flex items-center justify-between">
                    <span className="text-sm font-medium text-green-900">Interest Rate</span>
                    <span className="text-2xl font-black text-[#047038]">{deposit.entry.rate}</span>
                  </div>
                </div>
              ))
            ) : (
                <div className="col-span-1 md:col-span-2 lg:col-span-3 text-center py-20 bg-white rounded-3xl border border-dashed border-gray-200">
                  <Calculator className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-700">No deposit rates have been added yet</h3>
                  <p className="text-gray-500">The administrator can add deposit rates through the admin panel.</p>
                </div>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
