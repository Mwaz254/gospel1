import type { Metadata } from 'next';
import AboutClient from './AboutClient';

export const metadata: Metadata = {
  title: 'About',
  description: 'Learn how In Him Daily began, what we believe, and our vision for bringing every generation of families into the same encounter with Jesus.',
  alternates: { canonical: 'https://inhimdaily.org/about' },
  openGraph: { url: 'https://inhimdaily.org/about', title: 'About | In Him Daily', description: 'The story, beliefs, and vision behind the In Him Daily devotional ministry.' },
};

export default function AboutPage() {
  return <AboutClient />;
}
