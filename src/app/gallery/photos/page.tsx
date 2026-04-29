import { getCollection, getSingleton } from '@/lib/data-reader';
import PhotoGalleryClient from '@/components/PhotoGalleryClient';

export default async function PhotoGalleryPage() {
  const photos = getCollection('photoGallery');
  const settings = getSingleton('settings');
  return <PhotoGalleryClient photos={photos} heroImage={settings?.heroImage_gallery} />;
}
