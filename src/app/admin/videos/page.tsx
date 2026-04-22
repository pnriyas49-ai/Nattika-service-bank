import { getCollection } from '@/lib/data-reader';
import GenericForm from '@/components/admin/GenericForm';
import DeleteButton from '@/components/admin/DeleteButton';

export default async function VideosAdmin() {
  const items = getCollection('videoGallery');
  
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Video Gallery</h1>
      
      <div className="mb-8">
        <h2 className="text-xl font-bold mb-4">Add New Video</h2>
        <GenericForm
          model="videoGallery"
          type="collection"
          fields={[
            { name: 'title', label: 'Video Title', type: 'text' },
            { name: 'videoUrl', label: 'YouTube Embed Link or MP4 URL', type: 'text' },
          ]}
        />
      </div>

      <div>
        <h2 className="text-xl font-bold mb-4">Existing Videos</h2>
        <div className="space-y-4">
          {items.map(item => (
            <div key={item.slug} className="bg-white p-4 rounded shadow-sm flex justify-between items-center">
              <div>
                <h3 className="font-bold">{item.entry.title}</h3>
                <p className="text-sm text-blue-500">{item.entry.videoUrl}</p>
              </div>
              <DeleteButton model="videoGallery" slug={item.slug} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
