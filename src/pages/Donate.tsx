import { useState } from 'react';
import { Heart, HandHeart } from 'lucide-react';
import { useSEO } from '@/hooks/useSEO';
import ScrollReveal from '@/components/ScrollReveal';
import LocationFields, { type LocationData } from '@/components/LocationFields';
import { insertDonation } from '@/lib/supabase';

const PRESET_AMOUNTS = [5, 10, 25, 50, 100];

export default function DonatePage() {
  useSEO({
    title: 'Donate | In Him Daily',
    description: 'Partner with In Him Daily through your generosity. Your donation helps share Jesus with families across generations around the world.',
    canonicalPath: '/donate',
  });

  const [name, setName]           = useState('');
  const [email, setEmail]         = useState('');
  const [location, setLocation]   = useState<LocationData>({ country: '', city_region: '' });
  const [amount, setAmount]       = useState<number | ''>('');
  const [customAmount, setCustom] = useState('');
  const [prayerRequest, setPrayer] = useState('');
  const [message, setMessage]     = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [formError, setFormError] = useState('');

  const inputCls = "w-full px-5 py-3.5 rounded-xl ih-input text-white placeholder-white/35 transition-colors text-sm";

  function handlePreset(val: number) {
    setAmount(val);
    setCustom('');
  }

  function handleCustom(val: string) {
    setCustom(val);
    setAmount(val ? parseFloat(val) : '');
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setFormError('');
    if (!name || !email || !location.country) {
      setFormError('Please fill in your name, email, and country.');
      return;
    }
    try {
      await insertDonation({
        name,
        email,
        country: location.country,
        city_region: location.city_region,
        amount: amount || undefined,
        prayer_request: prayerRequest || undefined,
        message: message || undefined,
      });
      setSubmitted(true);
    } catch {
      setFormError('Something went wrong. Please try again.');
    }
  }

  return (
    <div className="overflow-x-hidden">
      <section className="relative pt-32 pb-24 bg-navy-700 overflow-hidden" aria-label="Donate hero">
        <div className="absolute inset-0 bg-cover bg-center" aria-hidden="true" style={{ backgroundImage: "url('https://images.pexels.com/photos/261763/pexels-photo-261763.jpeg?auto=compress&cs=tinysrgb&w=1920')", opacity: 0.2 }} />
        <div className="absolute inset-0" aria-hidden="true" style={{ background: 'linear-gradient(180deg, rgba(14,32,53,0.78) 0%, rgba(14,32,53,0.92) 100%)' }} />
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true"
          style={{ background: 'radial-gradient(ellipse 55% 45% at 50% 75%, rgba(201,152,58,0.11) 0%, transparent 70%)' }} />
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="w-14 h-14 mx-auto mb-6 rounded-full bg-gold-400/15 border border-gold-400/30 flex items-center justify-center">
            <HandHeart size={26} className="text-gold-300" aria-hidden="true" />
          </div>
          <p className="text-gold-400 text-[0.72rem] font-semibold tracking-[0.16em] uppercase mb-4">Partner With Us</p>
          <h1 className="font-playfair text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
            Support the Mission
          </h1>
          <p className="text-white/65 text-xl max-w-2xl mx-auto leading-relaxed">
            Your generosity helps share Jesus with families across generations around the world.
          </p>
        </div>
      </section>

      <section className="py-24 ih-section" aria-label="Donation form">
        <div className="max-w-xl mx-auto px-4 sm:px-6">
          <ScrollReveal>
            {submitted ? (
              <div className="p-8 rounded-2xl ih-card border-gold-400/30 animate-fade-in text-center">
                <div className="w-14 h-14 rounded-full bg-gold-400/15 border border-gold-400/30 flex items-center justify-center mx-auto mb-5">
                  <Heart size={24} className="text-gold-300 fill-gold-400/30" aria-hidden="true" />
                </div>
                <h2 className="font-playfair text-2xl font-bold text-white mb-3">Thank You for Partnering With Us</h2>
                <p className="text-white/55 leading-relaxed">
                  Thank you for partnering with In Him Daily. Your generosity helps share Jesus with families across generations around the world.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="ih-card p-8 space-y-5" noValidate>
                <h2 className="font-playfair text-2xl font-bold text-white mb-1">Make a Donation</h2>
                <p className="text-white/55 text-sm mb-2">Every gift helps families encounter Jesus daily.</p>

                {/* Amount selection */}
                <div>
                  <label className="block text-[0.72rem] font-semibold text-white/50 mb-2 tracking-wider uppercase">Donation Amount</label>
                  <div className="flex flex-wrap gap-2.5 mb-3">
                    {PRESET_AMOUNTS.map(val => (
                      <button
                        key={val}
                        type="button"
                        onClick={() => handlePreset(val)}
                        className={`px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-250 ${
                          amount === val ? 'ih-btn-gold' : 'ih-btn-ghost'
                        }`}
                      >
                        ${val}
                      </button>
                    ))}
                  </div>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40 text-sm">$</span>
                    <input
                      type="number"
                      placeholder="Custom amount"
                      value={customAmount}
                      onChange={e => handleCustom(e.target.value)}
                      min={1}
                      className={inputCls + ' pl-7'}
                      aria-label="Custom donation amount"
                    />
                  </div>
                </div>

                {/* Name & Email */}
                <div className="grid sm:grid-cols-2 gap-3.5">
                  <input type="text" placeholder="Full Name *" value={name} onChange={e=>setName(e.target.value)} required aria-label="Full name" className={inputCls} />
                  <input type="email" placeholder="Email Address *" value={email} onChange={e=>setEmail(e.target.value)} required aria-label="Email address" className={inputCls} />
                </div>

                {/* Location */}
                <LocationFields value={location} onChange={setLocation} />

                {/* Prayer Request (optional) */}
                <div>
                  <label className="block text-[0.72rem] font-semibold text-white/50 mb-1.5 tracking-wider uppercase">Prayer Request <span className="text-white/30 normal-case">(optional)</span></label>
                  <textarea
                    placeholder="Share a prayer request with us…"
                    value={prayerRequest}
                    onChange={e=>setPrayer(e.target.value)}
                    rows={3}
                    aria-label="Prayer request (optional)"
                    className={inputCls + ' resize-none'}
                  />
                </div>

                {/* Message (optional) */}
                <div>
                  <label className="block text-[0.72rem] font-semibold text-white/50 mb-1.5 tracking-wider uppercase">Message <span className="text-white/30 normal-case">(optional)</span></label>
                  <textarea
                    placeholder="A note for the team…"
                    value={message}
                    onChange={e=>setMessage(e.target.value)}
                    rows={3}
                    aria-label="Message (optional)"
                    className={inputCls + ' resize-none'}
                  />
                </div>

                <button type="submit" className="w-full py-4 ih-btn-gold text-[0.9rem]">
                  <span className="inline-flex items-center gap-2 justify-center">
                    <Heart size={16} aria-hidden="true" />
                    Donate {amount ? `$${amount}` : ''}
                  </span>
                </button>
                {formError && <p className="text-red-400 text-xs text-center">{formError}</p>}
                <p className="text-white/30 text-xs text-center">Your donation supports the ministry of In Him Daily.</p>
              </form>
            )}
          </ScrollReveal>
        </div>
      </section>

      <section className="py-14 ih-section text-center" aria-label="Closing scripture">
        <div className="max-w-xl mx-auto px-4">
          <ScrollReveal>
            <div className="gold-divider mx-auto mb-7" aria-hidden="true" />
            <p className="font-cormorant text-3xl text-white italic leading-relaxed">
              &ldquo;Each of you should give what you have decided in your heart to give, not reluctantly or under compulsion, for God loves a cheerful giver.&rdquo;
            </p>
            <p className="text-gold-400 text-[0.72rem] font-semibold mt-3 tracking-[0.18em] uppercase">2 Corinthians 9:7</p>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}
