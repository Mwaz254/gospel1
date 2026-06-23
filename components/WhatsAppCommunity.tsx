'use client';

import { useState } from 'react';
import { ExternalLink, MessageCircle, Users, BookOpen, Star, Heart, Check } from 'lucide-react';

const communities = [
  {
    id: 'adults',
    label: 'Adults',
    tagline: 'Depth. Reflection. Encounter.',
    icon: BookOpen,
    accent: 'midnight',
    gradientFrom: '#17324D',
    gradientTo: '#2D638F',
    glowColor: 'rgba(23, 50, 77, 0.35)',
    description:
      'Deep daily discussions, reflection questions, prayer encouragement, and meaningful conversations around each devotional encounter.',
    features: ['Daily reflection threads', 'Prayer requests & support', 'Weekly scripture deep-dives', 'Group accountability'],
    link: 'https://chat.whatsapp.com/HbRO4Dv6nkcAsH08k18c62?s=ms&p=a&ilr=2',
    buttonLabel: 'Join Adults Community',
    members: '500+',
  },
  {
    id: 'teens',
    label: 'Teens',
    tagline: 'Real. Honest. Alive.',
    icon: MessageCircle,
    accent: 'gold',
    gradientFrom: '#D6A64A',
    gradientTo: '#C4913A',
    glowColor: 'rgba(214, 166, 74, 0.35)',
    description:
      'A place for honest questions, authentic conversations, scripture reflections, and growing deeper with Jesus alongside other teens.',
    features: ['Honest Q&A threads', 'Peer encouragement', 'Scripture challenges', 'Teen prayer circle'],
    link: 'https://chat.whatsapp.com/Cbu2FCIbNiKGbs3n5a0Tgl?s=ms&p=a&ilr=2',
    buttonLabel: 'Join Teens Community',
    members: '300+',
  },
  {
    id: 'kids',
    label: 'Kids',
    tagline: 'Fun. Safe. Growing.',
    icon: Star,
    accent: 'lavender',
    gradientFrom: '#8C74CD',
    gradientTo: '#A390D7',
    glowColor: 'rgba(140, 116, 205, 0.35)',
    description:
      "A parent-guided community where children can stay connected to the devotional journey through fun engagement, prayer, and family discussions.",
    features: ['Parent-guided space', 'Fun family activities', 'Children\'s prayer wall', 'Weekly family challenges'],
    link: 'https://chat.whatsapp.com/BeW94WGjs9oFFyNpVfJhIQ?s=ms&p=a&ilr=2',
    buttonLabel: 'Join Kids Community',
    members: '250+',
  },
];

const whyJoin = [
  { icon: Heart, text: 'Daily Encouragement' },
  { icon: BookOpen, text: 'Scripture Discussions' },
  { icon: MessageCircle, text: 'Prayer Support' },
  { icon: Users, text: 'Family Connection' },
  { icon: Star, text: 'Community Accountability' },
];

function WhatsAppIcon({ size = 20, className = '' }: { size?: number; className?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

export default function WhatsAppCommunity() {
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

  return (
    <section className="py-28 bg-ivory-200 relative overflow-hidden" id="community">
      {/* Subtle background texture */}
      <div className="absolute inset-0 opacity-30" style={{
        backgroundImage: 'radial-gradient(circle at 20% 50%, rgba(214, 166, 74, 0.08) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(23, 50, 77, 0.06) 0%, transparent 50%)'
      }} />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#25D366]/10 border border-[#25D366]/25 mb-6">
            <WhatsAppIcon size={15} className="text-[#25D366]" />
            <span className="text-[#128C7E] text-xs font-bold tracking-widest uppercase">WhatsApp Communities</span>
          </div>
          <h2 className="font-playfair text-4xl md:text-5xl font-bold text-midnight-700 mb-4 leading-tight">
            Continue the Journey Together
          </h2>
          <p className="text-[#1E1E1E]/60 text-lg max-w-2xl mx-auto leading-relaxed">
            The encounter doesn't end when today's reading is finished.{' '}
            <span className="text-midnight-700 font-medium">Join believers from your generation</span> as we read, pray, reflect, and grow together every day.
          </p>
        </div>

        {/* Community cards */}
        <div className="grid md:grid-cols-3 gap-6 lg:gap-8 mb-14">
          {communities.map((community) => {
            const isHovered = hoveredCard === community.id;
            const Icon = community.icon;

            return (
              <div
                key={community.id}
                className="relative rounded-3xl overflow-hidden cursor-default transition-all duration-500"
                style={{
                  transform: isHovered ? 'translateY(-10px)' : 'translateY(0)',
                  boxShadow: isHovered
                    ? `0 32px 64px ${community.glowColor}, 0 0 0 1px rgba(214, 166, 74, 0.15)`
                    : '0 4px 24px rgba(23, 50, 77, 0.08)',
                }}
                onMouseEnter={() => setHoveredCard(community.id)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                {/* Card background with glassmorphism */}
                <div
                  className="absolute inset-0 transition-opacity duration-500"
                  style={{
                    background: `linear-gradient(145deg, rgba(250,248,243,0.97) 0%, rgba(250,248,243,0.92) 100%)`,
                    backdropFilter: 'blur(12px)',
                    WebkitBackdropFilter: 'blur(12px)',
                  }}
                />
                <div
                  className="absolute inset-0 border-2 rounded-3xl transition-all duration-500"
                  style={{
                    borderColor: isHovered ? community.gradientFrom : 'rgba(214, 166, 74, 0.15)',
                  }}
                />

                {/* Light rays on hover */}
                {isHovered && (
                  <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-1/2 pointer-events-none overflow-hidden opacity-20">
                    {[...Array(5)].map((_, i) => (
                      <div
                        key={i}
                        className="absolute bottom-0 left-1/2 origin-bottom"
                        style={{
                          width: '1px',
                          height: '100%',
                          background: `linear-gradient(to top, ${community.gradientFrom}, transparent)`,
                          transform: `translateX(-50%) rotate(${(i - 2) * 15}deg)`,
                          transition: 'all 0.3s ease',
                        }}
                      />
                    ))}
                  </div>
                )}

                {/* Content */}
                <div className="relative z-10 p-8">
                  {/* Top accent bar */}
                  <div
                    className="w-full h-1 rounded-full mb-6 transition-all duration-500"
                    style={{
                      background: `linear-gradient(90deg, ${community.gradientFrom}, ${community.gradientTo})`,
                      opacity: isHovered ? 1 : 0.5,
                    }}
                  />

                  {/* Icon + label */}
                  <div className="flex items-center gap-3 mb-4">
                    <div
                      className="w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-300"
                      style={{
                        background: `linear-gradient(135deg, ${community.gradientFrom}20, ${community.gradientTo}30)`,
                        border: `1px solid ${community.gradientFrom}30`,
                      }}
                    >
                      <Icon size={22} style={{ color: community.gradientFrom }} />
                    </div>
                    <div>
                      <p className="font-playfair text-xl font-bold text-midnight-700">{community.label}</p>
                      <p className="text-xs font-medium tracking-wider" style={{ color: community.gradientFrom }}>
                        {community.tagline}
                      </p>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-[#1E1E1E]/65 text-sm leading-relaxed mb-5">
                    {community.description}
                  </p>

                  {/* Features */}
                  <ul className="space-y-2 mb-7">
                    {community.features.map((f, i) => (
                      <li key={i} className="flex items-center gap-2.5 text-xs text-midnight-700/70">
                        <div
                          className="w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0"
                          style={{ background: `${community.gradientFrom}18` }}
                        >
                          <Check size={10} style={{ color: community.gradientFrom }} />
                        </div>
                        {f}
                      </li>
                    ))}
                  </ul>

                  {/* Members badge */}
                  <div className="flex items-center gap-2 mb-5">
                    <Users size={13} className="text-midnight-400" />
                    <span className="text-xs text-midnight-400 font-medium">{community.members} members growing daily</span>
                  </div>

                  {/* CTA Button */}
                  <a
                    href={community.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${community.buttonLabel} on WhatsApp - opens in new tab`}
                    className="group flex items-center justify-center gap-2.5 w-full py-3.5 rounded-2xl text-sm font-bold transition-all duration-300 relative overflow-hidden"
                    style={{
                      background: isHovered
                        ? `linear-gradient(135deg, ${community.gradientFrom}, ${community.gradientTo})`
                        : `linear-gradient(135deg, ${community.gradientFrom}15, ${community.gradientTo}20)`,
                      color: isHovered ? '#FAF8F3' : community.gradientFrom,
                      border: `1.5px solid ${isHovered ? 'transparent' : community.gradientFrom + '40'}`,
                    }}
                  >
                    <WhatsAppIcon size={17} />
                    {community.buttonLabel}
                    <ExternalLink size={13} className="opacity-70" />
                  </a>
                </div>
              </div>
            );
          })}
        </div>

        {/* Why Join stats bar */}
        <div className="flex flex-wrap justify-center gap-x-8 gap-y-4 py-8 px-6 rounded-2xl bg-white border border-ivory-400 shadow-sm mb-16">
          <p className="w-full text-center text-xs font-bold text-midnight-500 uppercase tracking-widest mb-1">Why Join?</p>
          {whyJoin.map((item, i) => {
            const Icon = item.icon;
            return (
              <div key={i} className="flex items-center gap-2 text-sm text-midnight-700 font-medium">
                <div className="w-6 h-6 rounded-full bg-gold-50 border border-gold-200 flex items-center justify-center">
                  <Icon size={12} className="text-gold-500" />
                </div>
                {item.text}
              </div>
            );
          })}
        </div>

        {/* CTA block */}
        <div className="max-w-2xl mx-auto text-center">
          <div className="p-10 rounded-3xl bg-midnight-700 border border-midnight-600 relative overflow-hidden">
            <div className="absolute inset-0" style={{
              background: 'radial-gradient(ellipse 60% 50% at 50% 100%, rgba(214, 166, 74, 0.1) 0%, transparent 70%)'
            }} />
            <div className="relative z-10">
              <h3 className="font-playfair text-3xl md:text-4xl font-bold text-ivory-100 mb-3">
                You Were Never Meant to Walk Alone
              </h3>
              <p className="font-cormorant text-xl text-gold-200 italic mb-2">
                &ldquo;Come and see.&rdquo;
              </p>
              <p className="text-gold-400 text-sm font-semibold tracking-wider mb-5">John 1:39</p>
              <p className="text-ivory-300/70 text-sm leading-relaxed mb-8 max-w-md mx-auto">
                Every encounter with Jesus becomes richer when shared with others. Find your generation. Join the conversation. Grow together.
              </p>
              <a
                href="#community"
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById('community')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="inline-flex items-center gap-2 px-8 py-4 bg-gold-400 hover:bg-gold-300 text-midnight-700 font-bold rounded-full transition-all duration-300 shadow-gold hover:shadow-gold-lg hover:-translate-y-0.5"
                aria-label="Scroll up to join your WhatsApp community"
              >
                <WhatsAppIcon size={18} />
                Join Your Community Today
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
