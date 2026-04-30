import { getSingleton } from '@/lib/data-reader';
import AboutEditor from '@/components/admin/AboutEditor';

export default async function AboutAdmin() {
  const data = getSingleton('about') || {};
  
  return <AboutEditor initialData={data} />;
}
