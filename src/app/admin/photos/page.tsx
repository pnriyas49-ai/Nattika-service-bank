import { getCollection } from '@/lib/data-reader';
import GenericForm from '@/components/admin/GenericForm';
import DeleteButton from '@/components/admin/DeleteButton';

export default async function PhotosAdmin() {
  const items = getCollection('photoGallery');
  
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Photo Gallery</h1>
      
      <div className="mb-8">
        <h2 className="text-xl font-bold mb-4">Add New Photo</h2>
        <GenericForm
          model="photoGallery"
          type="collection"
          fields={[
            { name: 'title', label: 'Album/Photo Title', type: 'text' },
            { name: 'date', label: 'Date (YYYY-MM-DD)', type: 'text' },
            { name: 'image', label: 'Image', type: 'image' },
          ]}
        />
      </div>

      <div>
        <h2 className="text-xl font-bold mb-4">Existing Photos</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {items.map(item => (
            <div key={item.slug} className="bg-white p-4 rounded shadow-sm flex flex-col">
              {item.entry.image && (
                <img src={item.entry.image} alt={item.entry.title} className="w-full h-32 object-cover rounded mb-2" />
              )}
              <h3 className="font-bold">{item.entry.title}</h3>
              <div className="flex justify-between items-center mt-auto pt-2">
                <p className="text-sm text-gray-500">{item.entry.date}</p>
                <DeleteButton model="photoGallery" slug={item.slug} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
