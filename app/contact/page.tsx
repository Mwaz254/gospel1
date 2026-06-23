import type { Metadata } from 'next';
import ContactClient from './ContactClient';

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Get in touch with In Him Daily — send a message, submit a prayer request, or sign up for our newsletter.',
  alternates: { canonical: 'https://inhimdaily.org/contact' },
  openGraph: { url: 'https://inhimdaily.org/contact', title: 'Contact | In Him Daily', description: 'Reach out with questions, prayer requests, or to join our newsletter.' },
};

export default function ContactPage() {
  return <ContactClient />;
}
