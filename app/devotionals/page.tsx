import type { Metadata } from 'next';
import DevotionalsClient from './DevotionalsClient';

export const metadata: Metadata = {
  title: 'Devotionals',
  description: 'Browse the In Him Daily devotional library — premium series crafted for every generation. Series One: I AM — 120 Names of Jesus.',
  alternates: { canonical: 'https://inhimdaily.org/devotionals' },
  openGraph: { url: 'https://inhimdaily.org/devotionals', title: 'Devotionals | In Him Daily', description: '240+ days of family devotionals across every generation.' },
};

export default function DevotionalsPage() {
  return <DevotionalsClient />;
}
