'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowRight, Heart, Globe, Shield, Users, BookOpen, Sunrise, Check } from 'lucide-react';
import ScrollReveal from '@/components/ScrollReveal';

const prayerFocusAreas = [
  {
    icon: BookOpen,
    title: 'The Word Going Forth',
    description: 'Pray that the devotionals would not merely be read, but experienced as living encounters with Jesus. That every page would carry the weight of the Holy Spirit.',
    scriptures: ['Isaiah 55:11', 'Hebrews 4:12'],
  },
  {
    icon: Users,
    title: 'Families Encountering Jesus Together',
    description: 'Intercede for families who are using the devotionals—that parents and children would grow closer to each other and to Jesus through shared scripture.',
    scriptures: ['Deuteronomy 6:6-7', 'Psalm 78:4'],
  },
  {
    icon: Globe,
    title: 'Global Reach',
    description: 'Pray for In Him Daily to reach families across every nation, tribe, and tongue—that the message of Jesus would cross every generational and cultural barrier.',
    scriptures: ['Matthew 28:19-20', 'Revelation 7:9'],
  },
  {
    icon: Shield,
    title: 'Protection for the Ministry',
    description: 'Cover the ministry in prayer against every spiritual opposition. Pray for wisdom, discernment, and the grace to steward this calling faithfully.',
    scriptures: ['Psalm 91:1-4', 'Ephesians 6:10-12'],
  },
  {
    icon: Heart,
    title: 'Writers and Creators',
    description: 'Pray for the writers and creators behind every devotional—that they would write from genuine encounter with Jesus and deep wells of His presence.',
    scriptures: ['Psalm 45:1', '2 Timothy 2:15'],
  },
  {
    icon: Sunrise,
    title: 'Next Generation Encounter',
    description: 'Intercede specifically for children and teenagers—that this generation would encounter Jesus early and carry that encounter throughout their lives.',
    scriptures: ['Proverbs 22:6', 'Psalm 22:31'],
  },
];

const monthlyGuidelines = [
  { week: 'Week 1', focus: 'The Word and Its Power', prayer: 'Pray for the scriptures in each devotional to produce genuine transformation in readers.' },
  { week: 'Week 2', focus: 'Families', prayer: 'Intercede for specific families—known and unknown—who are using In Him Daily together.' },
  { week: 'Week 3', focus: 'Expansion', prayer: 'Pray for the gospel of Jesus to reach new families through the devotionals.' },
  { week: 'Week 4', focus: 'The Ministry', prayer: 'Cover the team, resources, and future direction of In Him Daily in prayer.' },
];

export default function PrayerPartnersPage() {
  const [joinSubmitted, setJoinSubmitted] = useState(false);
  const [joinEmail, setJoinEmail] = useState('');
  const [joinName, setJoinName] = useState('');

  const handleJoin = (e: React.FormEvent) => {
    e.preventDefault();
    if (joinEmail && joinName) setJoinSubmitted(true);
  };

  return (
    <div className="overflow-hidden">
      {/* Hero */}
      <section className="relative pt-32 pb-24 bg-midnight-700 overflow-hidden">
        <div className="absolute inset-0" style={{
          background: 'radial-gradient(ellipse 60% 50% at 50% 70%, rgba(214, 166, 74, 0.1) 0%, transparent 70%)'
        }} />
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-gold-400 text-sm font-semibold tracking-widest uppercase mb-4">Intercession</p>
          <h1 className="font-playfair text-5xl md:text-6xl font-bold text-ivory-100 mb-6 leading-tight">
            Prayer Partners
          </h1>
          <div className="max-w-2xl mx-auto">
            <p className="font-cormorant text-2xl text-gold-200 italic leading-relaxed mb-4">
              &ldquo;The effective, fervent prayer of a righteous man avails much.&rdquo;
            </p>
            <p className="text-gold-400 text-sm tracking-widest uppercase">James 5:16</p>
          </div>
        </div>
      </section>

      {/* The Mission */}
      <section className="py-24 bg-ivory">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <ScrollReveal>
              <div>
                <p className="text-gold-500 text-sm font-semibold tracking-widest uppercase mb-4">Why Prayer Matters</p>
                <h2 className="font-playfair text-4xl font-bold text-midnight-700 mb-6 leading-tight">
                  Every Movement Needs Intercessors
                </h2>
                <div className="space-y-4 text-[#1E1E1E]/70 leading-relaxed">
                  <p>
                    In Him Daily is more than a devotional ministry. It is a spiritual movement—one that seeks to restore generational unity in encountering Jesus. And every movement needs people who pray.
                  </p>
                  <p>
                    Prayer partners are the hidden engine behind what In Him Daily does. They stand in the gap for families we have never met. They intercede for children who are encountering Jesus for the first time. They cover the writers when they sit down to create content.
                  </p>
                  <p>
                    If you feel called to pray—this is your place. We believe that the prayers of the intercessors carry as much weight as the words on the page.
                  </p>
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={150}>
              <div className="relative">
                <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-card-hover">
                  <img
                    src="https://images.pexels.com/photos/3991842/pexels-photo-3991842.jpeg?auto=compress&cs=tinysrgb&w=700"
                    alt="Prayer and scripture"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-midnight-700/40 to-transparent" />
                </div>
                <div className="absolute -bottom-5 -left-5 p-5 bg-midnight-700 rounded-2xl shadow-xl hidden md:block max-w-[200px]">
                  <p className="font-cormorant text-gold-200 italic text-lg leading-snug">
                    &ldquo;Your prayers shape what families receive.&rdquo;
                  </p>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Prayer Focus Areas */}
      <section className="py-24 bg-ivory-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal className="text-center mb-16">
            <p className="text-gold-500 text-sm font-semibold tracking-widest uppercase mb-4">Intercession Guide</p>
            <h2 className="font-playfair text-4xl font-bold text-midnight-700 mb-4">
              Prayer Focus Areas
            </h2>
            <p className="text-[#1E1E1E]/60 text-lg max-w-2xl mx-auto">
              Specific areas where your intercession makes a direct impact on the ministry and the families it serves.
            </p>
          </ScrollReveal>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {prayerFocusAreas.map((area, i) => (
              <ScrollReveal key={i} delay={i * 80}>
                <div className="premium-card p-7 bg-white rounded-2xl border border-ivory-400 shadow-sm h-full">
                  <div className="w-12 h-12 rounded-xl bg-gold-50 border border-gold-200 flex items-center justify-center mb-5">
                    <area.icon size={22} className="text-gold-500" />
                  </div>
                  <h3 className="font-playfair text-lg font-bold text-midnight-700 mb-3">{area.title}</h3>
                  <p className="text-[#1E1E1E]/60 text-sm leading-relaxed mb-4">{area.description}</p>
                  <div className="flex gap-2 flex-wrap">
                    {area.scriptures.map((s, j) => (
                      <span key={j} className="text-xs bg-gold-50 text-gold-600 border border-gold-200 px-2.5 py-1 rounded-full font-medium">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Monthly Prayer Guide */}
      <section className="py-24 bg-midnight-700">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal className="text-center mb-16">
            <p className="text-gold-400 text-sm font-semibold tracking-widest uppercase mb-4">Monthly Rhythm</p>
            <h2 className="font-playfair text-4xl font-bold text-ivory-100">
              Monthly Prayer Focus
            </h2>
          </ScrollReveal>

          <div className="grid sm:grid-cols-2 gap-5">
            {monthlyGuidelines.map((item, i) => (
              <ScrollReveal key={i} delay={i * 100}>
                <div className="p-6 rounded-2xl bg-midnight-600 border border-midnight-500">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-8 h-8 rounded-lg bg-gold-400/20 flex items-center justify-center">
                      <span className="text-gold-300 text-xs font-bold">{String(i + 1).padStart(2, '0')}</span>
                    </div>
                    <span className="text-gold-300 text-sm font-semibold">{item.week}</span>
                  </div>
                  <h3 className="font-playfair text-lg font-bold text-ivory-100 mb-2">{item.focus}</h3>
                  <p className="text-ivory-300/70 text-sm leading-relaxed">{item.prayer}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>

          {/* Scripture callout */}
          <ScrollReveal>
            <div className="mt-12 p-8 rounded-2xl bg-gold-400/10 border border-gold-400/20 text-center">
              <p className="font-cormorant text-2xl text-gold-200 italic leading-relaxed mb-3">
                &ldquo;If my people, who are called by my name, will humble themselves and pray and seek my face and turn from their wicked ways, then I will hear from heaven.&rdquo;
              </p>
              <span className="text-gold-400 text-sm font-semibold tracking-wide">2 Chronicles 7:14</span>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Join the Prayer Team */}
      <section className="py-24 bg-ivory">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 text-center">
          <ScrollReveal>
            <p className="text-gold-500 text-sm font-semibold tracking-widest uppercase mb-4">Get Involved</p>
            <h2 className="font-playfair text-4xl font-bold text-midnight-700 mb-4">
              Join the Prayer Team
            </h2>
            <p className="text-[#1E1E1E]/60 text-lg mb-10">
              Receive monthly prayer updates, specific intercession requests, and scripture-anchored prayer guides delivered directly to your inbox.
            </p>

            {joinSubmitted ? (
              <div className="p-8 rounded-2xl bg-gold-50 border border-gold-200 animate-fade-in">
                <div className="w-12 h-12 rounded-full bg-gold-400/20 flex items-center justify-center mx-auto mb-4">
                  <Check size={24} className="text-gold-500" />
                </div>
                <h3 className="font-playfair text-2xl font-bold text-midnight-700 mb-2">Welcome to the Team!</h3>
                <p className="text-[#1E1E1E]/60">
                  Thank you, {joinName}. Your prayers are powerful and we are grateful to have you interceding with us.
                </p>
              </div>
            ) : (
              <form onSubmit={handleJoin} className="space-y-4 text-left">
                <input
                  type="text"
                  placeholder="Your Name"
                  value={joinName}
                  onChange={(e) => setJoinName(e.target.value)}
                  required
                  className="w-full px-5 py-4 rounded-full bg-white border border-ivory-400 text-midnight-700 placeholder-midnight-400/50 focus:outline-none focus:border-gold-400 transition-colors text-sm"
                />
                <input
                  type="email"
                  placeholder="Email Address"
                  value={joinEmail}
                  onChange={(e) => setJoinEmail(e.target.value)}
                  required
                  className="w-full px-5 py-4 rounded-full bg-white border border-ivory-400 text-midnight-700 placeholder-midnight-400/50 focus:outline-none focus:border-gold-400 transition-colors text-sm"
                />
                <button
                  type="submit"
                  className="w-full py-4 bg-midnight-700 hover:bg-midnight-600 text-ivory-100 font-bold rounded-full transition-all duration-300 hover:-translate-y-0.5"
                >
                  Join the Prayer Team
                </button>
                <p className="text-center text-[#1E1E1E]/40 text-xs">
                  Monthly prayer updates. Unsubscribe anytime.
                </p>
              </form>
            )}
          </ScrollReveal>
        </div>
      </section>

      {/* Closing */}
      <section className="py-16 bg-ivory text-center">
        <div className="max-w-2xl mx-auto px-4">
          <ScrollReveal>
            <div className="gold-divider mx-auto mb-8" />
            <p className="font-cormorant text-3xl text-midnight-700 italic leading-relaxed">
              &ldquo;Devote yourselves to prayer, being watchful and thankful.&rdquo;
            </p>
            <p className="text-gold-500 text-sm font-semibold mt-3 tracking-widest uppercase">Colossians 4:2</p>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}
