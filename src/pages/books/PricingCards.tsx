import { Link } from 'react-router-dom';
import { Check, Star, Users, Gift, Sparkles } from 'lucide-react';
import ScrollReveal from '@/components/ScrollReveal';
import { pdfPricing, bulkPricing, freeEntryPoints } from './assets';

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
            Every volume is available as a digital PDF, priced for families and ministries across
            the world. Pick the edition that fits your household.
          </p>
        </ScrollReveal>

        {/* PDF pricing cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {pdfPricing.map((tier, i) => (
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

                <h3 className="font-cinzel text-2xl font-semibold text-white mb-1">
                  {tier.name}
                </h3>
                <p className="text-white/50 text-sm mb-6">{tier.tagline}</p>

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

                <ul className="space-y-2 mb-8 flex-1">
                  {tier.prices.map((p) => (
                    <li
                      key={p.currency}
                      className={`flex items-baseline justify-between text-sm ${
                        p.currency === 'USD' ? 'text-gold-200 font-semibold' : 'text-white/65'
                      }`}
                    >
                      <span className="tracking-wider">{p.currency}</span>
                      <span>{p.amount}</span>
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

        {/* Church & ministry bulk pricing */}
        <ScrollReveal delay={200}>
          <div className="mt-16 rounded-2xl bk-glass p-8 sm:p-10">
            <div className="flex items-center gap-3 mb-6">
              <span className="w-10 h-10 rounded-full flex items-center justify-center bg-gold-400/10 border border-gold-400/30">
                <Users className="text-gold-300" size={20} />
              </span>
              <h3 className="font-cinzel text-2xl font-semibold text-white">
                Church &amp; Ministry Bulk Pricing
              </h3>
            </div>

            <div className="grid sm:grid-cols-3 gap-6">
              {bulkPricing.map((tier) => (
                <div
                  key={tier.id}
                  className="rounded-xl border border-white/10 bg-white/[0.02] p-6 text-center"
                >
                  <p className="text-white/80 text-sm mb-2">{tier.quantity}</p>
                  <p className="font-cinzel text-2xl font-bold text-gold-300 mb-2">
                    {tier.discount}
                  </p>
                  {tier.note && (
                    <p className="text-white/45 text-xs mt-2">{tier.note}</p>
                  )}
                </div>
              ))}
            </div>

            <p className="mt-6 text-center text-white/50 text-sm">
              Bible study groups of 10+: contact us for group licence pricing.
            </p>
          </div>
        </ScrollReveal>

        {/* Free entry points */}
        <ScrollReveal delay={250}>
          <div className="mt-12 text-center">
            <div className="flex items-center justify-center gap-2 mb-8">
              <Gift className="text-gold-300" size={20} />
              <h3 className="font-cinzel text-xl font-semibold text-white tracking-wide">
                Free Entry Points
              </h3>
              <Sparkles className="text-gold-300" size={16} />
            </div>
            <p className="text-white/50 text-sm mb-8 max-w-xl mx-auto">
              Always available at zero cost — start your journey with no commitment.
            </p>

            <div className="grid sm:grid-cols-3 gap-6 text-left">
              {freeEntryPoints.map((f) => (
                <div
                  key={f.id}
                  className="rounded-xl border border-white/10 bg-white/[0.02] p-6"
                >
                  <div className="flex items-center gap-2 mb-3">
                    <Check size={16} className="text-gold-300 shrink-0" />
                    <h4 className="font-cinzel text-base font-semibold text-white">
                      {f.title}
                    </h4>
                  </div>
                  <p className="text-white/55 text-sm leading-relaxed">{f.description}</p>
                </div>
              ))}
            </div>
          </div>
        </ScrollReveal>

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
