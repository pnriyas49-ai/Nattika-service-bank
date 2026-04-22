import { getCollection } from '@/lib/data-reader';
import GenericForm from '@/components/admin/GenericForm';
import DeleteButton from '@/components/admin/DeleteButton';

export default async function DepositsAdmin() {
  const items = getCollection('depositRates');
  
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Deposit Rates</h1>
      
      <div className="mb-8">
        <h2 className="text-xl font-bold mb-4">Add New Deposit Scheme</h2>
        <GenericForm
          model="depositRates"
          type="collection"
          fields={[
            { name: 'title', label: 'Deposit Type (e.g., Fixed Deposit)', type: 'text' },
            { name: 'rate', label: 'Interest Rate', type: 'text' },
            { name: 'duration', label: 'Duration/Lock-in period', type: 'text' },
            { name: 'backgroundImage', label: 'Background Image (Optional)', type: 'image' },
          ]}
        />
      </div>

      <div>
        <h2 className="text-xl font-bold mb-4">Existing Deposit Schemes</h2>
        <div className="space-y-4">
          {items.map(item => (
            <div key={item.slug} className="bg-white p-4 rounded shadow-sm flex justify-between items-center">
              <div>
                <h3 className="font-bold">{item.entry.title}</h3>
                <p className="text-sm text-gray-500">Rate: {item.entry.rate} | Duration: {item.entry.duration}</p>
              </div>
              <DeleteButton model="depositRates" slug={item.slug} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
