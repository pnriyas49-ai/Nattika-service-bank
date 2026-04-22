import { createReader } from '@keystatic/core/reader';
import config from '../../keystatic.config';
import HomePageClient from '@/components/HomePageClient';

export default async function HomePage() {
  const reader = createReader(process.cwd(), config);
  const homepage = await reader.singletons.homepage.read();
  const loans = await reader.collections.loanRates.all();
  const deposits = await reader.collections.depositRates.all();
  const settings = await reader.singletons.settings.read();
  
  return (
    <HomePageClient 
      homepageData={homepage} 
      loansData={loans} 
      depositsData={deposits}
      settingsData={settings} 
    />
  );
}
