import { Shield, Mail, Eye, Lock, FileText, Users } from 'lucide-react';
import { useSEO } from '@/hooks/useSEO';
import ScrollReveal from '@/components/ScrollReveal';

const sections = [
  {
    icon: Eye,
    title: 'Information We Collect',
    content: [
      'When you sign up for the free sample, newsletter, or prayer partners, we collect your name and email address.',
      'When you submit a contact form or prayer request, we collect the information you provide — including your name, email, subject, and message.',
      'We do not collect sensitive personal data such as payment information. No credit card is ever required for any free resource.',
    ],
  },
  {
    icon: Mail,
    title: 'How We Use Your Information',
    content: [
      'To deliver the free 7-day devotional sample and daily devotionals to your inbox.',
      'To send occasional ministry updates, prayer requests, and resources.',
      'To respond to your questions, prayer requests, and ministry partnership inquiries.',
      'To improve our content and better understand how families are using In Him Daily.',
    ],
  },
  {
    icon: Lock,
    title: 'How We Protect Your Data',
    content: [
      'Your data is stored securely using Supabase with Row Level Security (RLS) enabled on all tables.',
      'We never share, sell, or rent your personal information to third parties.',
      'Access to your data is restricted to authorized ministry personnel only.',
      'All data transmission is encrypted using industry-standard TLS/SSL protocols.',
    ],
  },
  {
    icon: Users,
    title: 'WhatsApp Communities',
    content: [
      'Our WhatsApp community groups are optional and hosted on WhatsApp\'s platform.',
      'Joining a WhatsApp group is subject to WhatsApp\'s own privacy policy and terms of service.',
      'We do not collect or store any data from your participation in WhatsApp groups beyond what WhatsApp itself provides.',
    ],
  },
  {
    icon: FileText,
    title: 'Your Rights',
    content: [
      'You can unsubscribe from our email list at any time by clicking the unsubscribe link in any email.',
      'You can request access to, correction of, or deletion of your personal data by contacting us.',
      'You can leave any WhatsApp community group at any time.',
      'We will retain your data only for as long as necessary to provide our services and respond to your requests.',
    ],
  },
  {
    icon: Shield,
    title: 'Children\'s Privacy',
    content: [
      'In Him Daily is designed for families, including children. However, we do not knowingly collect personal information directly from children.',
      'All sign-ups and form submissions must be completed by a parent or guardian.',
      'Children\'s participation in WhatsApp groups must be supervised by a parent or guardian.',
      'If you believe a child has provided us with personal information, please contact us so we can promptly delete it.',
    ],
  },
];

export default function PrivacyPolicyPage() {
  useSEO({
    title: 'Privacy Policy | In Him Daily',
    description: 'Read the In Him Daily privacy policy — how we collect, use, and protect your personal data when you sign up for devotionals, newsletters, or prayer partners.',
    canonicalPath: '/privacy-policy',
  });

  return (
    <div className="overflow-x-hidden">
      <section className="relative pt-32 pb-20 bg-navy-700 overflow-hidden" aria-label="Privacy policy hero">
        <div className="absolute inset-0 bg-cover bg-center" aria-hidden="true" style={{ backgroundImage: "url('https://images.pexels.com/photos/2383053/pexels-photo-2383053.jpeg?auto=compress&cs=tinysrgb&w=1920')", opacity: 0.2 }} />
        <div className="absolute inset-0" aria-hidden="true" style={{ background: 'linear-gradient(180deg, rgba(14,32,53,0.78) 0%, rgba(14,32,53,0.92) 100%)' }} />
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true"
          style={{ background: 'radial-gradient(ellipse 55% 45% at 50% 75%, rgba(201,152,58,0.11) 0%, transparent 70%)' }} />
        <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="w-14 h-14 mx-auto mb-6 rounded-xl bg-gold-400/20 flex items-center justify-center">
            <Shield size={26} className="text-gold-300" aria-hidden="true" />
          </div>
          <p className="text-gold-400 text-[0.72rem] font-semibold tracking-[0.16em] uppercase mb-4">Your Privacy Matters</p>
          <h1 className="font-playfair text-4xl md:text-5xl font-bold text-white mb-4">Privacy Policy</h1>
          <p className="text-white/55 text-sm">Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
        </div>
      </section>

      <section className="py-16 ih-section" aria-labelledby="intro-heading">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <div className="p-6 rounded-2xl ih-card">
              <h2 id="intro-heading" className="font-playfair text-xl font-bold text-white mb-3">Our Commitment to You</h2>
              <p className="text-white/60 text-sm leading-relaxed">
                At In Him Daily, we take your privacy seriously. This policy explains what information we collect, how we use it, and the choices you have. We are committed to being transparent and protecting the trust you place in us when you share your details.
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <section className="pb-24 ih-section" aria-label="Privacy policy sections">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-5">
          {sections.map((s, i) => (
            <ScrollReveal key={i} delay={i * 50}>
              <div className="p-7 rounded-2xl ih-card">
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-10 h-10 rounded-xl bg-gold-400/10 border border-gold-400/30 flex items-center justify-center shrink-0">
                    <s.icon size={18} className="text-gold-300" aria-hidden="true" />
                  </div>
                  <h2 className="font-playfair text-lg font-bold text-white">{s.title}</h2>
                </div>
                <ul className="space-y-3">
                  {s.content.map((item, j) => (
                    <li key={j} className="flex gap-3 text-sm text-white/60 leading-relaxed">
                      <span className="w-1.5 h-1.5 rounded-full bg-gold-400 mt-2 shrink-0" aria-hidden="true" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </ScrollReveal>
          ))}

          <ScrollReveal>
            <div className="p-7 rounded-2xl ih-card text-center">
              <h2 className="font-playfair text-xl font-bold text-white mb-3">Questions About Your Privacy?</h2>
              <p className="text-white/55 text-sm mb-5">We are happy to help with any questions or requests regarding your personal data.</p>
              <a href="mailto:hello@inhimdaily.org"
                className="inline-flex items-center gap-2 px-6 py-3 ih-btn-gold text-sm">
                <Mail size={15} aria-hidden="true" />
                Contact Us
              </a>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}
