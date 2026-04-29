import { getCollection } from '@/lib/data-reader';
import NewsClient from '@/components/NewsClient';

export default async function NewsPage() {
  const newsItems = getCollection('news');

  return <NewsClient newsItems={newsItems} />;
}
