import { getSingleton } from '@/lib/data-reader';
import GenericForm from '@/components/admin/GenericForm';

export default async function ContactAdmin() {
  const data = getSingleton('contact') || {};
  
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Edit Contact Page</h1>
      <GenericForm
        model="contact"
        type="singleton"
        initialData={data}
        fields={[
          { name: 'heroImage', label: 'Hero Background Image', type: 'image' },
          { name: 'workingHours', label: 'Working Hours', type: 'text' },
        ]}
      />
    </div>
  );
}
