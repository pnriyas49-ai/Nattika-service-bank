import { getSingleton } from '@/lib/data-reader';
import FacilitiesEditor from '@/components/admin/FacilitiesEditor';

export default async function FacilitiesAdmin() {
  const data = getSingleton('facilities') || {
    heroImage: '',
    sections: [],
    subsidiaries: [],
  };

  return <FacilitiesEditor initialData={data} />;
}
