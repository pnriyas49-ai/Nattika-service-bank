import { getCollection } from '@/lib/data-reader';
import VideoGalleryClient from '@/components/VideoGalleryClient';

export default async function VideoGalleryPage() {
  const videos = getCollection('videoGallery');
  return <VideoGalleryClient videos={videos} />;
}
