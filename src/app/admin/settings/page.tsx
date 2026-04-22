import { getSingleton } from '@/lib/data-reader';
import GenericForm from '@/components/admin/GenericForm';

export default async function SettingsAdmin() {
  const data = getSingleton('settings') || {};
  
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Edit Bank Settings</h1>
      <GenericForm
        model="settings"
        type="singleton"
        initialData={data}
        fields={[
          { name: 'marqueeText', label: 'Live Ticker / Marquee Text', type: 'text' },
          { name: 'workingHours', label: 'Working Hours', type: 'text' },
          { name: 'phoneNumber', label: 'Primary Phone Number', type: 'text' },
        ]}
      />
    </div>
  );
}
