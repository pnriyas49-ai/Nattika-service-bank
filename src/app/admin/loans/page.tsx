import { getCollection } from '@/lib/data-reader';
import GenericForm from '@/components/admin/GenericForm';
import DeleteButton from '@/components/admin/DeleteButton';

export default async function LoansAdmin() {
  const items = getCollection('loanRates');
  
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Loan Rates</h1>
      
      <div className="mb-8">
        <h2 className="text-xl font-bold mb-4">Add New Loan Scheme</h2>
        <GenericForm
          model="loanRates"
          type="collection"
          fields={[
            { name: 'title', label: 'Loan Type (e.g., Gold Loan)', type: 'text' },
            { name: 'rate', label: 'Interest Rate', type: 'text' },
            { name: 'description', label: 'Short Description', type: 'textarea' },
            { name: 'backgroundImage', label: 'Background Image (Optional)', type: 'image' },
            { name: 'icon', label: 'Icon Name (e.g. Coins, Home, Briefcase, Tractor, GraduationCap, BadgePercent)', type: 'text' },
          ]}
        />
      </div>

      <div>
        <h2 className="text-xl font-bold mb-4">Existing Loan Schemes</h2>
        <div className="space-y-4">
          {items.map(item => (
            <div key={item.slug} className="bg-white p-4 rounded shadow-sm flex justify-between items-center">
              <div>
                <h3 className="font-bold">{item.entry.title}</h3>
                <p className="text-sm text-gray-500">Rate: {item.entry.rate}</p>
              </div>
              <DeleteButton model="loanRates" slug={item.slug} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
