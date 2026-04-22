import { getSingleton } from '@/lib/data-reader';
import GenericForm from '@/components/admin/GenericForm';

export default async function AboutAdmin() {
  const data = getSingleton('about') || {};
  
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Edit About Page</h1>
      <GenericForm
        model="about"
        type="singleton"
        initialData={data}
        fields={[
          { name: 'heroTitle', label: 'Hero Title', type: 'text' },
          { name: 'heroSubtitle', label: 'Hero Subtitle', type: 'text' },
          { name: 'heroImage', label: 'Hero Image', type: 'image' },
          { name: 'history', label: 'History (Story)', type: 'textarea' },
          { name: 'mission', label: 'Mission', type: 'textarea' },
          { name: 'vision', label: 'Vision', type: 'textarea' },
        ]}
      />
    </div>
  );
}
