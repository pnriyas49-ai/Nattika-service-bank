import { getCollection, getSingleton } from '@/lib/data-reader';
import HomePageClient from '@/components/HomePageClient';

export default async function HomePage() {
  const homepage = getSingleton('homepage');
  const loans = getCollection('loanRates');
  const deposits = getCollection('depositRates');
  const settings = getSingleton('settings');
  
  return (
    <HomePageClient 
      homepageData={homepage} 
      loansData={loans} 
      depositsData={deposits}
      settingsData={settings} 
    />
  );
}
