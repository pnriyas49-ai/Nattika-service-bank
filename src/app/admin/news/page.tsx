import { getCollection } from '@/lib/data-reader';
import GenericForm from '@/components/admin/GenericForm';
import DeleteButton from '@/components/admin/DeleteButton';

export default async function NewsAdmin() {
  const items = getCollection('news');
  
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">News & Announcements</h1>
      
      <div className="mb-8">
        <h2 className="text-xl font-bold mb-4">Add New Announcement</h2>
        <GenericForm
          model="news"
          type="collection"
          fields={[
            { name: 'title', label: 'Title', type: 'text' },
            { name: 'date', label: 'Date (YYYY-MM-DD)', type: 'text' },
            { name: 'image', label: 'Image', type: 'image' },
            { name: 'content', label: 'Content', type: 'textarea' },
          ]}
        />
      </div>

      <div>
        <h2 className="text-xl font-bold mb-4">Existing Announcements</h2>
        <div className="space-y-4">
          {items.map(item => (
            <div key={item.slug} className="bg-white p-4 rounded shadow-sm flex justify-between items-center">
              <div>
                <h3 className="font-bold">{item.entry.title}</h3>
                <p className="text-sm text-gray-500">{item.entry.date}</p>
              </div>
              <DeleteButton model="news" slug={item.slug} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
