import { getCollection, getSingleton } from '@/lib/data-reader';
import VideoGalleryClient from '@/components/VideoGalleryClient';

export default async function VideoGalleryPage() {
  const videos = getCollection('videoGallery');
  const settings = getSingleton('settings');
  return <VideoGalleryClient videos={videos} heroImage={settings?.heroImage_gallery} />;
}
