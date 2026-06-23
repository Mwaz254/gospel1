'use client';

import Link from 'next/link';
import { ArrowRight, BookOpen, Users, Clock, Check, ChevronRight } from 'lucide-react';
import ScrollReveal from '@/components/ScrollReveal';

const series = [
  {
    id: 1,
    number: 'Series One',
    title: 'I AM',
    subtitle: '120 Names of Jesus',
    days: 120,
    status: 'available',
    statusLabel: 'Available Now',
    image: 'https://images.pexels.com/photos/1111319/pexels-photo-1111319.jpeg?auto=compress&cs=tinysrgb&w=800',
    description: 'A transformational journey through 120 names and titles of Jesus Christ. From Alpha to Omega, Bread of Life to King of Kings—each day reveals a new dimension of His character, drawing every generation deeper into the reality of who Jesus truly is.',
    highlights: [
      'Rooted in 120 distinct scriptural names',
      'Each name explored across 3 generations',
      'Daily scripture, reflection, prayer, and confession',
      'Perfect for individual or family devotion',
    ],
    audiences: ['Adults: Deep theological reflection', 'Teens: Real-life application', 'Children: Engaging stories'],
    color: 'bg-midnight-700',
    accent: 'text-gold-300',
  },
  {
    id: 2,
    number: 'Series Two',
    title: 'Full of Grace and Truth',
    subtitle: '120 Gospel Encounters',
    days: 120,
    status: 'coming',
    statusLabel: 'Coming Soon',
    image: 'https://images.pexels.com/photos/415571/pexels-photo-415571.jpeg?auto=compress&cs=tinysrgb&w=800',
    description: 'Walk through the four Gospels in 120 powerful encounters with Jesus. See Him heal the sick, teach the multitudes, confront religious pride, and rise victorious—through the eyes of every generation, with fresh perspective every single day.',
    highlights: [
      'Chronological Gospel journey',
      'Every encounter presented in three voices',
      'Character studies and life lessons',
      'Build a rich picture of the full Jesus',
    ],
    audiences: ['Adults: Historical context and depth', 'Teens: Personal encounter with Jesus', 'Children: Jesus as friend and hero'],
    color: 'bg-gold-400',
    accent: 'text-midnight-700',
  },
];

const timeline = [
  { day: 'Day 1', series: 'I AM', name: 'The Word', scripture: 'John 1:1' },
  { day: 'Day 7', series: 'I AM', name: 'Immanuel', scripture: 'Matthew 1:23' },
  { day: 'Day 30', series: 'I AM', name: 'The Bread of Life', scripture: 'John 6:35' },
  { day: 'Day 60', series: 'I AM', name: 'The Good Shepherd', scripture: 'John 10:11' },
  { day: 'Day 90', series: 'I AM', name: 'The Resurrection', scripture: 'John 11:25' },
  { day: 'Day 120', series: 'I AM', name: 'King of Kings', scripture: 'Revelation 19:16' },
  { day: 'Day 121', series: 'Series 2', name: 'Full of Grace and Truth', scripture: 'John 1:14' },
  { day: 'Day 240', series: 'Series 2', name: 'It Is Finished', scripture: 'John 19:30' },
];

export default function DevotionalsPage() {
  return (
    <div className="overflow-hidden">
      {/* Hero */}
      <section className="relative pt-32 pb-24 bg-midnight-700 overflow-hidden">
        <div className="absolute inset-0" style={{
          background: 'radial-gradient(ellipse 60% 50% at 50% 70%, rgba(214, 166, 74, 0.1) 0%, transparent 70%)'
        }} />
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-gold-400 text-sm font-semibold tracking-widest uppercase mb-4">The Library</p>
          <h1 className="font-playfair text-5xl md:text-6xl font-bold text-ivory-100 mb-6 leading-tight">
            The Devotional Library
          </h1>
          <p className="text-ivory-300/80 text-xl max-w-2xl mx-auto leading-relaxed">
            Premium series crafted to take your family deeper into the presence, character, and glory of Jesus—one scripture at a time.
          </p>
        </div>
      </section>

      {/* Timeline Banner */}
      <section className="py-14 bg-gold-400/10 border-y border-gold-300/20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <ScrollReveal className="text-center mb-8">
            <h2 className="font-playfair text-2xl md:text-3xl font-bold text-midnight-700">
              240 Days of Encountering Jesus
            </h2>
          </ScrollReveal>
          <div className="overflow-x-auto">
            <div className="flex items-center gap-2 min-w-max mx-auto px-4">
              {timeline.map((item, i) => (
                <div key={i} className="flex items-center gap-2">
                  <div className="text-center">
                    <div className={`w-2.5 h-2.5 rounded-full mx-auto mb-2 ${item.series === 'I AM' ? 'bg-midnight-700' : 'bg-gold-400'}`} />
                    <p className="text-xs font-bold text-midnight-700">{item.day}</p>
                    <p className="text-xs text-midnight-600 max-w-[80px]">{item.name}</p>
                    <p className="text-xs text-gold-500">{item.scripture}</p>
                  </div>
                  {i < timeline.length - 1 && (
                    <div className="w-12 h-0.5 bg-gradient-to-r from-midnight-300 to-midnight-200" />
                  )}
                </div>
              ))}
            </div>
          </div>
          <div className="flex justify-center gap-6 mt-6">
            <div className="flex items-center gap-2 text-xs text-midnight-600">
              <div className="w-2.5 h-2.5 rounded-full bg-midnight-700" /> Series One: I AM
            </div>
            <div className="flex items-center gap-2 text-xs text-midnight-600">
              <div className="w-2.5 h-2.5 rounded-full bg-gold-400" /> Series Two: Grace & Truth
            </div>
          </div>
        </div>
      </section>

      {/* Series Cards */}
      <section className="py-24 bg-ivory">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          {series.map((s, i) => (
            <ScrollReveal key={s.id} delay={i * 100}>
              <div className={`rounded-3xl overflow-hidden shadow-card-hover ${i % 2 === 0 ? '' : ''}`}>
                <div className={`grid lg:grid-cols-2 ${i % 2 !== 0 ? 'lg:grid-flow-dense' : ''}`}>
                  {/* Image */}
                  <div className={`relative h-72 lg:h-auto ${i % 2 !== 0 ? 'lg:col-start-2' : ''}`}>
                    <img
                      src={s.image}
                      alt={s.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-midnight-700/50 to-transparent" />
                    <div className="absolute top-6 left-6">
                      <span className={`px-4 py-1.5 rounded-full text-xs font-bold ${
                        s.status === 'available' ? 'bg-gold-400 text-midnight-700' : 'bg-midnight-700 text-ivory-100'
                      }`}>
                        {s.statusLabel}
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className={`p-10 lg:p-12 bg-white flex flex-col justify-center ${i % 2 !== 0 ? 'lg:col-start-1 lg:row-start-1' : ''}`}>
                    <p className="text-gold-500 text-xs font-bold tracking-widest uppercase mb-3">{s.number}</p>
                    <h2 className="font-playfair text-4xl font-bold text-midnight-700 leading-tight">{s.title}</h2>
                    <p className="text-gold-400 font-semibold text-lg mb-2">{s.subtitle}</p>

                    <div className="flex items-center gap-4 mb-6 text-sm text-midnight-500">
                      <span className="flex items-center gap-1.5"><Clock size={14} /> {s.days} Days</span>
                      <span className="flex items-center gap-1.5"><Users size={14} /> All Generations</span>
                      <span className="flex items-center gap-1.5"><BookOpen size={14} /> 3 Editions</span>
                    </div>

                    <p className="text-[#1E1E1E]/60 leading-relaxed mb-7 text-sm">{s.description}</p>

                    <div className="space-y-2 mb-7">
                      {s.highlights.map((h, j) => (
                        <div key={j} className="flex items-start gap-2 text-sm text-midnight-700">
                          <Check size={14} className="text-gold-500 mt-0.5 flex-shrink-0" />
                          {h}
                        </div>
                      ))}
                    </div>

                    <div className="p-4 rounded-xl bg-ivory-200 mb-6">
                      <p className="text-xs font-semibold text-midnight-600 uppercase tracking-wider mb-2">Editions Included</p>
                      {s.audiences.map((a, j) => (
                        <p key={j} className="text-xs text-midnight-600 py-1 border-b border-ivory-400 last:border-0">{a}</p>
                      ))}
                    </div>

                    <Link
                      href="/free-sample"
                      className={`inline-flex items-center gap-2 px-7 py-3.5 rounded-full font-bold text-sm transition-all duration-300 hover:-translate-y-0.5 ${
                        s.status === 'available'
                          ? 'bg-midnight-700 text-ivory-100 hover:bg-midnight-600'
                          : 'bg-midnight-100 text-midnight-500 cursor-not-allowed'
                      }`}
                    >
                      {s.status === 'available' ? 'Get Free Sample' : 'Join Waitlist'}
                      <ArrowRight size={16} />
                    </Link>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* What's Inside */}
      <section className="py-24 bg-ivory-200">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal className="text-center mb-16">
            <p className="text-gold-500 text-sm font-semibold tracking-widest uppercase mb-4">Every Day Includes</p>
            <h2 className="font-playfair text-4xl font-bold text-midnight-700">
              What's Inside Each Day
            </h2>
          </ScrollReveal>

          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
            {[
              { title: 'Key Scripture', desc: 'The foundational verse shared across all three editions for that day' },
              { title: 'Devotional Reading', desc: 'A unique, age-appropriate reflection on the scripture' },
              { title: 'Reflection Questions', desc: 'Thoughtful questions to personalize and deepen the encounter' },
              { title: 'Daily Prayer', desc: 'A guided prayer drawn directly from the scripture and theme' },
              { title: 'Daily Confession', desc: 'A declaration of faith rooted in the truth of that day\'s scripture' },
              { title: 'Family Connection', desc: 'Questions designed to spark conversation across generations' },
            ].map((item, i) => (
              <ScrollReveal key={i} delay={i * 80}>
                <div className="premium-card p-6 bg-white rounded-2xl border border-ivory-400 shadow-sm">
                  <div className="w-8 h-8 rounded-lg bg-gold-50 border border-gold-200 flex items-center justify-center mb-4">
                    <span className="text-gold-500 font-bold text-xs">{String(i + 1).padStart(2, '0')}</span>
                  </div>
                  <h3 className="font-playfair text-base font-bold text-midnight-700 mb-2">{item.title}</h3>
                  <p className="text-[#1E1E1E]/55 text-xs leading-relaxed">{item.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-midnight-700 text-center">
        <div className="max-w-xl mx-auto px-4">
          <ScrollReveal>
            <h2 className="font-playfair text-4xl font-bold text-ivory-100 mb-4">
              Ready to Begin?
            </h2>
            <p className="text-ivory-300/70 mb-8">
              Start your family's encounter with a free 7-day sample from Series One.
            </p>
            <Link
              href="/free-sample"
              className="inline-flex items-center gap-2 px-8 py-4 bg-gold-400 text-midnight-700 font-bold rounded-full hover:bg-gold-300 transition-all duration-300 shadow-gold hover:-translate-y-0.5"
            >
              Get Your Free Sample <ArrowRight size={18} />
            </Link>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}
