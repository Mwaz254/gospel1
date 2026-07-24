import { ExternalLink, Check, Users, Youtube, Facebook, Instagram } from 'lucide-react';
import ScrollReveal from '@/components/ScrollReveal';

function WhatsAppIcon({ size = 20, className = '' }: { size?: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

const whatsappGroups = [
  {
    id: 'adults',
    label: 'Adults',
    tag: 'Depth · Reflection · Encounter',
    gradA: '#17324D',
    gradB: '#1E4F72',
    glow: 'rgba(23,50,77,0.22)',
    description: 'Deep daily discussions, reflection questions, prayer encouragement, and meaningful conversations around each devotional encounter.',
    features: ['Daily reflection threads', 'Prayer requests & support', 'Weekly scripture deep-dives', 'Group accountability'],
    link: 'https://chat.whatsapp.com/HbRO4Dv6nkcAsH08k18c62?s=ms&p=a&ilr=2',
    qrImage: '/images/communities/IMG_20260714_211254.jpg',
    members: '500+',
  },
  {
    id: 'teens',
    label: 'Teens',
    tag: 'Real · Honest · Alive',
    gradA: '#C9983A',
    gradB: '#A87D2C',
    glow: 'rgba(201,152,58,0.22)',
    description: 'A place for honest questions, authentic conversations, scripture reflections, and growing deeper with Jesus alongside other teens.',
    features: ['Honest Q&A threads', 'Peer encouragement', 'Scripture challenges', 'Teen prayer circle'],
    link: 'https://chat.whatsapp.com/Cbu2FCIbNiKGbs3n5a0Tgl?s=ms&p=a&ilr=2',
    qrImage: '/images/communities/IMG_20260714_211131.jpg',
    members: '300+',
  },
  {
    id: 'kids',
    label: 'Kids',
    tag: 'Fun · Safe · Growing',
    gradA: '#6B5BA8',
    gradB: '#8470DC',
    glow: 'rgba(107,91,168,0.22)',
    description: 'A parent-guided community where children stay connected to the devotional journey through fun engagement, prayer, and family discussions.',
    features: ['Parent-guided space', 'Fun family activities', "Children's prayer wall", 'Weekly family challenges'],
    link: 'https://chat.whatsapp.com/BeW94WGjs9oFFyNpVfJhIQ?s=ms&p=a&ilr=2',
    qrImage: '/images/communities/IMG_20260714_211224.jpg',
    members: '250+',
  },
];

const socialLinks = [
  {
    id: 'youtube',
    label: 'YouTube',
    handle: '@InHimDaily',
    description: 'Watch devotional teachings, scripture reflections, and family faith content on our YouTube channel.',
    link: 'https://www.youtube.com/channel/UCXbhOCzUufGVQ6n5amOf3GQ',
    Icon: Youtube,
    color: '#FF0000',
    bg: 'rgba(255,0,0,0.08)',
    border: 'rgba(255,0,0,0.18)',
  },
  {
    id: 'facebook',
    label: 'Facebook',
    handle: 'Inhimdaily',
    description: 'Follow us on Facebook for daily devotional posts, community updates, and family faith encouragement.',
    link: 'https://www.facebook.com/people/Inhimdaily/61591293759943/',
    Icon: Facebook,
    color: '#1877F2',
    bg: 'rgba(24,119,242,0.08)',
    border: 'rgba(24,119,242,0.18)',
  },
  {
    id: 'instagram',
    label: 'Instagram',
    handle: '@inhimdailyministries',
    description: 'Daily scripture graphics, devotional highlights, and behind-the-scenes moments from In Him Daily.',
    link: 'https://www.instagram.com/inhimdailyministries/',
    Icon: Instagram,
    color: '#E1306C',
    bg: 'rgba(225,48,108,0.08)',
    border: 'rgba(225,48,108,0.18)',
  },
];

export default function CommunitiesPage() {
  return (
    <div className="overflow-x-hidden">

      {/* HERO */}
      <section className="relative pt-32 pb-20 bg-navy-700 overflow-hidden" aria-label="Communities hero">
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true"
          style={{ background: 'radial-gradient(ellipse 70% 55% at 50% 65%, rgba(201,152,58,0.13) 0%, transparent 70%)' }} />
        <div className="absolute inset-0 opacity-[0.04] pointer-events-none" aria-hidden="true"
          style={{ backgroundImage: 'radial-gradient(circle, #E4B86A 1px, transparent 1px)', backgroundSize: '36px 36px' }} />

        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#25D366]/15 border border-[#25D366]/25 mb-8">
            <WhatsAppIcon size={14} className="text-[#25D366]" />
            <span className="text-[#25D366] text-[0.68rem] font-bold tracking-[0.15em] uppercase">Our Communities</span>
          </div>
          <h1 className="font-playfair text-4xl sm:text-5xl md:text-6xl font-bold text-white leading-tight mb-6">
            You Were Never Meant<br />
            <span className="text-gold-gradient">to Walk Alone</span>
          </h1>
          <p className="text-white/65 text-lg sm:text-xl max-w-2xl mx-auto leading-relaxed">
            Join thousands of believers growing daily in Christ — across WhatsApp communities, YouTube, Facebook, and Instagram.
            Find your generation and continue the journey together.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
            <a href="#whatsapp" className="inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-[#25D366] hover:bg-[#1DB954] text-white font-bold text-sm rounded-full transition-all duration-300 shadow-lg hover:-translate-y-0.5">
              <WhatsAppIcon size={16} />
              Join WhatsApp Groups
            </a>
            <a href="#social" className="inline-flex items-center justify-center gap-2 px-7 py-3.5 border border-white/25 text-white/80 hover:text-white hover:border-white/45 font-medium text-sm rounded-full transition-all duration-200">
              Follow on Social Media
            </a>
          </div>
        </div>
      </section>

      {/* WHATSAPP SECTION */}
      <section id="whatsapp" className="py-24 bg-[#FAF8F3] relative overflow-hidden" aria-labelledby="whatsapp-heading">
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true"
          style={{ background: 'radial-gradient(circle at 10% 50%, rgba(37,211,102,0.05) 0%, transparent 55%), radial-gradient(circle at 90% 20%, rgba(23,50,77,0.04) 0%, transparent 55%)' }} />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#25D366]/10 border border-[#25D366]/22 mb-6">
              <WhatsAppIcon size={14} className="text-[#128C7E]" />
              <span className="text-[#128C7E] text-[0.68rem] font-bold tracking-[0.15em] uppercase">WhatsApp Communities</span>
            </div>
            <h2 id="whatsapp-heading" className="font-playfair text-3xl md:text-4xl lg:text-5xl font-bold text-navy-700 mb-4">
              Three Groups. One Family.
            </h2>
            <p className="text-[#6B6B6B] text-lg max-w-2xl mx-auto leading-relaxed">
              Scan the QR code or tap the link to join the community that matches your generation.
              Each group is tailored to support your unique devotional journey.
            </p>
          </ScrollReveal>

          <div className="grid md:grid-cols-3 gap-7 lg:gap-8">
            {whatsappGroups.map((group, i) => (
              <ScrollReveal key={group.id} delay={i * 100}>
                <div
                  className="rounded-3xl overflow-hidden bg-white border-2 flex flex-col transition-all duration-300 hover:-translate-y-2"
                  style={{
                    borderColor: `${group.gradA}22`,
                    boxShadow: `0 8px 32px ${group.glow}`,
                  }}
                >
                  {/* Top accent bar */}
                  <div className="h-1.5 w-full" style={{ background: `linear-gradient(90deg, ${group.gradA}, ${group.gradB})` }} aria-hidden="true" />

                  <div className="p-7 flex flex-col flex-1">
                    {/* Header */}
                    <div className="mb-5">
                      <p className="font-playfair text-2xl font-bold text-navy-700 leading-none mb-1">{group.label}</p>
                      <p className="text-[0.68rem] font-semibold tracking-wider" style={{ color: group.gradA }}>{group.tag}</p>
                    </div>

                    {/* QR Code */}
                    <div className="mb-6 relative">
                      <div className="relative rounded-2xl overflow-hidden border-2 bg-white p-3 mx-auto w-fit"
                        style={{ borderColor: `${group.gradA}20` }}>
                        <img
                          src={group.qrImage}
                          alt={`QR code to join the ${group.label} WhatsApp group`}
                          className="w-48 h-48 object-cover rounded-xl"
                          loading="lazy"
                          decoding="async"
                        />
                        <div className="absolute bottom-5 right-5 w-8 h-8 rounded-full bg-[#25D366] flex items-center justify-center shadow-lg">
                          <WhatsAppIcon size={16} className="text-white" />
                        </div>
                      </div>
                      <p className="text-center text-xs text-navy-400 mt-3 font-medium">Scan to join on WhatsApp</p>
                    </div>

                    <p className="text-[#6B6B6B] text-sm leading-relaxed mb-5">{group.description}</p>

                    <ul className="space-y-2 mb-5 flex-1" role="list">
                      {group.features.map((f, j) => (
                        <li key={j} className="flex items-center gap-2.5 text-xs text-navy-600">
                          <div className="w-4 h-4 rounded-full flex items-center justify-center shrink-0" style={{ background: `${group.gradA}15` }}>
                            <Check size={9} style={{ color: group.gradA }} aria-hidden="true" />
                          </div>
                          {f}
                        </li>
                      ))}
                    </ul>

                    <div className="flex items-center gap-1.5 mb-5">
                      <Users size={12} className="text-navy-300" aria-hidden="true" />
                      <span className="text-xs text-navy-400">{group.members} members growing daily</span>
                    </div>

                    <a
                      href={group.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`Join ${group.label} WhatsApp group — opens in new tab`}
                      className="flex items-center justify-center gap-2 w-full py-3.5 rounded-2xl text-sm font-bold transition-all duration-300 hover:opacity-90 hover:-translate-y-0.5"
                      style={{
                        background: `linear-gradient(130deg, ${group.gradA}, ${group.gradB})`,
                        color: '#FAF8F3',
                      }}
                    >
                      <WhatsAppIcon size={16} />
                      Join {group.label} Community
                      <ExternalLink size={12} className="opacity-70" aria-hidden="true" />
                    </a>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>

          {/* How to join note */}
          <ScrollReveal className="mt-12">
            <div className="max-w-2xl mx-auto p-6 rounded-2xl bg-[#25D366]/8 border border-[#25D366]/20 text-center">
              <p className="text-sm text-navy-600 leading-relaxed">
                <span className="font-semibold text-navy-700">How to join:</span> Tap the button to open WhatsApp directly, or open WhatsApp on your phone and scan the QR code above.
                No approval needed — you'll be connected instantly.
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* SOCIAL MEDIA SECTION */}
      <section id="social" className="py-24 bg-navy-700 relative overflow-hidden" aria-labelledby="social-heading">
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true"
          style={{ background: 'radial-gradient(ellipse 60% 50% at 50% 80%, rgba(201,152,58,0.09) 0%, transparent 70%)' }} />
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none" aria-hidden="true"
          style={{ backgroundImage: 'radial-gradient(circle, #E4B86A 1px, transparent 1px)', backgroundSize: '36px 36px' }} />

        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal className="text-center mb-16">
            <p className="text-gold-400 text-[0.72rem] font-semibold tracking-[0.16em] uppercase mb-3">Follow Us</p>
            <h2 id="social-heading" className="font-playfair text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
              Stay Connected Everywhere
            </h2>
            <p className="text-white/55 text-lg max-w-2xl mx-auto leading-relaxed">
              Follow In Him Daily across all platforms and never miss a devotional, teaching, or word of encouragement.
            </p>
          </ScrollReveal>

          <div className="grid sm:grid-cols-3 gap-6 lg:gap-7">
            {socialLinks.map((social, i) => (
              <ScrollReveal key={social.id} delay={i * 100}>
                <a
                  href={social.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Follow In Him Daily on ${social.label} — opens in new tab`}
                  className="group block rounded-3xl p-7 border-2 transition-all duration-300 hover:-translate-y-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-gold-400"
                  style={{
                    background: 'rgba(255,255,255,0.04)',
                    borderColor: 'rgba(255,255,255,0.10)',
                  }}
                >
                  {/* Icon */}
                  <div
                    className="w-14 h-14 rounded-2xl flex items-center justify-center mb-5 transition-transform duration-300 group-hover:scale-110"
                    style={{ background: social.bg, border: `1.5px solid ${social.border}` }}
                  >
                    <social.Icon size={26} style={{ color: social.color }} aria-hidden="true" />
                  </div>

                  <p className="font-playfair text-xl font-bold text-white mb-1">{social.label}</p>
                  <p className="text-[0.72rem] font-semibold tracking-wide mb-3" style={{ color: social.color }}>{social.handle}</p>
                  <p className="text-white/50 text-sm leading-relaxed mb-6">{social.description}</p>

                  <div
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-bold transition-all duration-300"
                    style={{ background: social.bg, color: social.color, border: `1.5px solid ${social.border}` }}
                  >
                    Follow on {social.label}
                    <ExternalLink size={13} aria-hidden="true" />
                  </div>
                </a>
              </ScrollReveal>
            ))}
          </div>

          {/* Scripture callout */}
          <ScrollReveal className="mt-16 max-w-2xl mx-auto text-center">
            <div className="gold-divider mx-auto mb-8" aria-hidden="true" />
            <p className="font-cormorant text-2xl md:text-3xl text-gold-200 italic leading-relaxed">
              &ldquo;And let us consider how we may spur one another on toward love and good deeds, not giving up meeting together.&rdquo;
            </p>
            <p className="mt-4 text-gold-500 text-[0.72rem] font-semibold tracking-[0.18em] uppercase">Hebrews 10:24–25</p>
            <div className="gold-divider mx-auto mt-8" aria-hidden="true" />
          </ScrollReveal>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="py-20 bg-[#FAF8F3] text-center" aria-label="Final community call to action">
        <div className="max-w-xl mx-auto px-4 sm:px-6">
          <ScrollReveal>
            <div className="w-14 h-14 mx-auto mb-7 rounded-full bg-[#25D366]/15 flex items-center justify-center">
              <WhatsAppIcon size={26} className="text-[#25D366]" />
            </div>
            <h2 className="font-playfair text-3xl md:text-4xl font-bold text-navy-700 mb-4">
              Find Your Community Today
            </h2>
            <p className="text-[#6B6B6B] text-lg mb-8 leading-relaxed">
              Every encounter with Jesus becomes richer when shared with others. Pick your group and join thousands already walking together in faith.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <a href="#whatsapp" onClick={e => { e.preventDefault(); document.getElementById('whatsapp')?.scrollIntoView({ behavior: 'smooth' }); }}
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-navy-700 hover:bg-navy-600 text-white font-bold rounded-full transition-all duration-300 hover:-translate-y-0.5">
                <WhatsAppIcon size={17} />
                Join a WhatsApp Group
              </a>
              <a href="#social" onClick={e => { e.preventDefault(); document.getElementById('social')?.scrollIntoView({ behavior: 'smooth' }); }}
                className="inline-flex items-center justify-center gap-2 px-8 py-4 border-2 border-navy-200 text-navy-700 hover:border-gold-400 hover:text-gold-600 font-bold rounded-full transition-all duration-300">
                Follow on Social
              </a>
            </div>
          </ScrollReveal>
        </div>
      </section>

    </div>
  );
}
