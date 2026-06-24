import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Intercessory Prayer Guidelines',
  description:
    'Guidelines for intercessory prayer partners of In Him Daily — how to pray, what to pray for, and how to grow in your calling as an intercessor for families encountering Jesus.',
};

import PrayerGuidelinesClient from './PrayerGuidelinesClient';

export default function PrayerGuidelinesPage() {
  return <PrayerGuidelinesClient />;
}
