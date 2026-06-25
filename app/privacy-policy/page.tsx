import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'How In Him Daily collects, uses, and protects your personal information.',
};

import PrivacyPolicyClient from './PrivacyPolicyClient';

export default function PrivacyPolicyPage() {
  return <PrivacyPolicyClient />;
}
