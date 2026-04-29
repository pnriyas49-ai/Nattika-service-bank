import { getSingleton } from '@/lib/data-reader';
import GalleryHubClient from '@/components/GalleryHubClient';

export default async function GalleryHubPage() {
  const settings = getSingleton('settings');
  return <GalleryHubClient heroImage={settings?.heroImage_gallery} />;
}
