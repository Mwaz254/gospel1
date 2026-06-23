import type { Metadata } from 'next';
import FreeSampleClient from './FreeSampleClient';

export const metadata: Metadata = {
  title: 'Free Sample',
  description: 'Get your free 7-day sample of In Him Daily — all three editions (Adult, Teen, Children) delivered to your inbox. Experience the devotional before you commit.',
  alternates: { canonical: 'https://inhimdaily.org/free-sample' },
  openGraph: { url: 'https://inhimdaily.org/free-sample', title: 'Free Sample | In Him Daily', description: 'Read actual pages from all three editions and get 7 days free.' },
};

export default function FreeSamplePage() {
  return <FreeSampleClient />;
}
