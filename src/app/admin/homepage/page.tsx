import { getSingleton } from '@/lib/data-reader';
import GenericForm from '@/components/admin/GenericForm';

export default async function HomepageAdmin() {
  const data = getSingleton('homepage') || {};
  
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Edit Homepage</h1>
      <GenericForm
        model="homepage"
        type="singleton"
        initialData={data}
        fields={[
          { name: 'heroImages', label: 'Hero Background Images (Carousel)', type: 'imageArray' },
          { name: 'heroVideoUrl', label: 'Alternative Hero Video URL (Optional MP4 link)', type: 'text' },
        ]}
      />
    </div>
  );
}
