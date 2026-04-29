import { getCollection, getSingleton } from '@/lib/data-reader';
import NewsClient from '@/components/NewsClient';

export default async function NewsPage() {
  const newsItems = getCollection('news');
  const settings = getSingleton('settings');

  return <NewsClient newsItems={newsItems} heroImage={settings?.heroImage_news} />;
}
