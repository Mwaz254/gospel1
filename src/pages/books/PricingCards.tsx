import { Link } from 'react-router-dom';
import { Check, Star } from 'lucide-react';
import ScrollReveal from '@/components/ScrollReveal';
import { pricing } from './assets';

export default function PricingCards() {
  return (
    <section id="pricing" className="relative py-24 sm:py-32 scroll-mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal className="text-center mb-16">
          <p className="font-cinzel text-gold-300 tracking-[0.25em] text-sm mb-3">SECTION 07</p>
          <h2 className="font-cinzel text-3xl sm:text-5xl font-bold text-white">
            Choose Your Journey
          </h2>
          <p className="mt-4 text-white/60 max-w-2xl mx-auto">
            Available in PDF, Print, and Kindle — on Amazon, Barnes &amp; Noble, and InHimDaily.org.
          </p>
        </ScrollReveal>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {pricing.map((tier, i) => (
            <ScrollReveal key={tier.id} delay={i * 100}>
              <div
                className={`relative rounded-2xl p-8 h-full flex flex-col transition-all duration-500 hover:-translate-y-2 ${
                  tier.highlight
                    ? 'bk-glass border-gold-400/60 shadow-[0_0_48px_rgba(212,175,55,0.25)]'
                    : 'bk-glass hover:border-gold-400/40'
                }`}
              >
                {tier.highlight && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full text-[#05070D] text-xs font-bold bk-shimmer whitespace-nowrap">
                    BEST VALUE
                  </span>
                )}

                <h3 className="font-cinzel text-2xl font-semibold text-white mb-2">
                  {tier.name}
                </h3>
                <p className="text-gold-300 font-semibold text-lg mb-6">{tier.price}</p>

                <div className="flex flex-wrap gap-2 mb-6">
                  {tier.formats.map((f) => (
                    <span
                      key={f}
                      className="px-3 py-1 rounded-full text-xs font-medium text-white/70 border border-white/15"
                    >
                      {f}
                    </span>
                  ))}
                </div>

                <ul className="space-y-3 mb-8 flex-1">
                  {tier.stores.map((s) => (
                    <li key={s.label} className="flex items-center gap-2 text-white/70 text-sm">
                      <Check size={15} className="text-gold-300 shrink-0" />
                      {s.label}
                    </li>
                  ))}
                </ul>

                <Link
                  to="/devotionals"
                  className={`inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full font-bold transition-all ${
                    tier.highlight
                      ? 'text-[#05070D] bk-shimmer shadow-[0_0_28px_rgba(212,175,55,0.4)] hover:shadow-[0_0_44px_rgba(212,175,55,0.6)]'
                      : 'border border-gold-400/40 text-gold-200 hover:bg-gold-400/10 hover:border-gold-400/70'
                  }`}
                >
                  Get Started
                </Link>
              </div>
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal className="flex items-center justify-center gap-2 mt-12 text-white/50 text-sm">
          <Star size={14} className="text-gold-300 fill-gold-300" />
          <Star size={14} className="text-gold-300 fill-gold-300" />
          <Star size={14} className="text-gold-300 fill-gold-300" />
          <Star size={14} className="text-gold-300 fill-gold-300" />
          <Star size={14} className="text-gold-300 fill-gold-300" />
          <span className="ml-2">Loved by families, churches, and small groups worldwide.</span>
        </ScrollReveal>
      </div>
    </section>
  );
}
