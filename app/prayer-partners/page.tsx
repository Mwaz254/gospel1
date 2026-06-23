import type { Metadata } from 'next';
import PrayerPartnersClient from './PrayerPartnersClient';

export const metadata: Metadata = {
  title: 'Prayer Partners',
  description: 'Join the In Him Daily intercessory prayer team. Pray for families encountering Jesus together, for the ministry, and for the Word to go forth with power.',
  alternates: { canonical: 'https://inhimdaily.org/prayer-partners' },
  openGraph: { url: 'https://inhimdaily.org/prayer-partners', title: 'Prayer Partners | In Him Daily', description: 'Join our prayer team and intercede for families worldwide.' },
};

export default function PrayerPartnersPage() {
  return <PrayerPartnersClient />;
}
