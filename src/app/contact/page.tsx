import { getSingleton } from '@/lib/data-reader';
import ContactClient from '@/components/ContactClient';

export default async function ContactPage() {
  const contactData = getSingleton('contact') || {};

  return <ContactClient contactData={contactData} />;
}
