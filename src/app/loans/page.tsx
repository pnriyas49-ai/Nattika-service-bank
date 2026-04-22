import { getCollection } from '@/lib/data-reader';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { BadgePercent, Briefcase, Coins, GraduationCap, Home, Tractor } from 'lucide-react';

const icons = {
  Coins: <Coins className="w-8 h-8 text-yellow-600" />,
  Home: <Home className="w-8 h-8 text-[#047038]" />,
  Briefcase: <Briefcase className="w-8 h-8 text-[#0A3D91]" />,
  Tractor: <Tractor className="w-8 h-8 text-green-600" />,
  GraduationCap: <GraduationCap className="w-8 h-8 text-blue-500" />,
  BadgePercent: <BadgePercent className="w-8 h-8 text-gray-500" />
};

export default async function LoansPage() {
  const loanRates = getCollection('loanRates');

  return (
    <>
      <Navbar />
      <main className="flex-1 pt-32 pb-12 bg-[#F8FAFC] min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-[#0A3D91] mb-4">Loan Schemes</h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              We offer a wide variety of loans tailored to meet your personal, agricultural, and business needs with the best interest rates in Thrissur.
            </p>
          </div>

          {loanRates.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {loanRates.map((loan) => (
                <div key={loan.slug} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                  <div className="w-14 h-14 bg-gray-50 rounded-2xl flex items-center justify-center mb-4">
                    {icons[loan.entry.icon as keyof typeof icons] || icons.BadgePercent}
                  </div>
                  <h3 className="text-xl font-bold text-gray-800">{loan.entry.title}</h3>
                  <p className="text-gray-500 text-sm mt-2 mb-4 h-10 line-clamp-2">{loan.entry.description}</p>
                  
                  <div className="bg-blue-50/50 rounded-xl p-4 flex items-center justify-between">
                    <span className="text-sm font-medium text-blue-900">Interest Rate</span>
                    <span className="text-2xl font-black text-[#0A3D91]">{loan.entry.rate}</span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-gray-200">
              <BadgePercent className="w-12 h-12 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-700">No loan rates have been added yet</h3>
              <p className="text-gray-500">The administrator can add loan rates through the admin panel.</p>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
