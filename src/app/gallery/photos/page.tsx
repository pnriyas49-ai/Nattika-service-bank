import { getCollection } from '@/lib/data-reader';
import PhotoGalleryClient from '@/components/PhotoGalleryClient';

export default async function PhotoGalleryPage() {
  const photos = getCollection('photoGallery');
  return <PhotoGalleryClient photos={photos} />;
}
