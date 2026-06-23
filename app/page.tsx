'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ChevronRight, BookOpen, Users, Star, ArrowRight, Check, X, Sparkles } from 'lucide-react';
import ScrollReveal from '@/components/ScrollReveal';
import WhatsAppCommunity from '@/components/WhatsAppCommunity';

const familyEncounterData = {
  scripture: {
    reference: 'John 8:12',
    text: '"I am the light of the world. Whoever follows me will never walk in darkness, but will have the light of life."',
  },
  adult: {
    label: 'Adult Edition',
    color: 'midnight',
    title: 'Walking in the Light of His Presence',
    content:
      'Jesus doesn\'t merely illuminate your path—He IS the light. In a world filled with moral ambiguity and spiritual confusion, this declaration is both radical and deeply personal. To follow Jesus is not just to adopt a belief system; it is to walk in an entirely different quality of life.',
    reflection: 'Where in your life have you been walking in darkness, unwilling to let His light fully illuminate?',
    prayer: 'Lord Jesus, I choose to walk in Your light today. Expose every area of darkness in my life and fill it with Your presence.',
  },
  teen: {
    label: 'Teen Edition',
    color: 'gold',
    title: 'You Don\'t Have to Figure It Out Alone',
    content:
      'Imagine walking into a completely dark room, fumbling around, bumping into everything. That\'s life without Jesus. But when you follow Him, it\'s like someone turned on the most powerful light you\'ve ever seen—everything becomes clear.',
    reflection: 'What\'s one thing in your life right now that feels really confusing or dark? How could following Jesus bring light to that situation?',
    prayer: 'Jesus, sometimes my life feels so confusing. Thank You for being a light I can actually follow. Help me trust You with the things I don\'t understand.',
  },
  child: {
    label: 'Children\'s Edition',
    color: 'lavender',
    title: 'Jesus Is Like a Super Light!',
    content:
      'Have you ever been somewhere really dark and felt a little scared? Maybe your bedroom at night, or a room with the lights off. When someone turns on the light—everything changes! Jesus says He is the light of the whole world. That means when Jesus is with you, you never have to be afraid of the dark!',
    reflection: 'Draw a picture of you walking with Jesus as your light! What does it look like?',
    prayer: 'Thank You Jesus for being my light! Help me follow You everywhere I go so I never have to be scared of the dark. Amen!',
  },
};

const comparisonData = [
  { feature: 'Same scripture across all ages', traditional: false, ihd: true },
  { feature: 'Three generational voices', traditional: false, ihd: true },
  { feature: 'Families grow together', traditional: false, ihd: true },
  { feature: 'Age-appropriate language', traditional: 'One age only', ihd: true },
  { feature: 'Shared family discussion', traditional: false, ihd: true },
  { feature: 'Daily scripture focus', traditional: true, ihd: true },
  { feature: 'Reflection questions', traditional: true, ihd: true },
  { feature: 'Daily prayer', traditional: true, ihd: true },
];

const testimonials = [
  {
    quote: "For the first time in years, our whole family is talking about the same thing at dinner. Our kids actually ask us what we thought of the devotional. I never thought that was possible.",
    author: "Jennifer M.",
    role: "Mother of three",
    age: "42",
  },
  {
    quote: "I'm a teenager and I've tried devotionals before but they always felt like homework. In Him Daily actually connects with where I am. And now I know my parents are reading the same thing.",
    author: "Marcus T.",
    role: "High school student",
    age: "16",
  },
  {
    quote: "As a grandfather, I've prayed for years that my family would grow together in faith. In Him Daily is the answer to that prayer. We're all encountering Jesus together.",
    author: "Robert K.",
    role: "Grandfather",
    age: "68",
  },
];

export default function HomePage() {
  const [activeGeneration, setActiveGeneration] = useState<'adult' | 'teen' | 'child'>('adult');
  const [emailSubmitted, setEmailSubmitted] = useState(false);
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email && firstName) {
      setEmailSubmitted(true);
    }
  };

  const activeData = familyEncounterData[activeGeneration];

  return (
    <div className="overflow-hidden">
      {/* ========== HERO SECTION ========== */}
      <section className="relative min-h-screen flex items-center justify-center bg-midnight-700 overflow-hidden">
        {/* Background layers */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNEOEE2NEEiIGZpbGwtb3BhY2l0eT0iMC4wMyI+PHBhdGggZD0iTTM2IDM0djJoLTJ2LTJoMnptMC00aDJ2Mmgtdi0yem0tMiA0djJoLTJ2LTJoMnptMC00aDJ2MmgtMnYtMnoiLz48L2c+PC9nPjwvc3ZnPg==')] opacity-40" />

        {/* Radial glow from center */}
        <div className="absolute inset-0 bg-radial-gradient" style={{
          background: 'radial-gradient(ellipse 70% 60% at 50% 60%, rgba(214, 166, 74, 0.12) 0%, transparent 70%)'
        }} />

        {/* Light rays SVG */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-3/4 opacity-20">
          {[...Array(7)].map((_, i) => (
            <div
              key={i}
              className="absolute bottom-0 left-1/2 origin-bottom"
              style={{
                width: '2px',
                height: `${40 + i * 8}%`,
                background: 'linear-gradient(to top, rgba(247, 232, 181, 0.9), transparent)',
                transform: `translateX(-50%) rotate(${(i - 3) * 12}deg)`,
                animation: `ray-appear ${1 + i * 0.15}s ease-out forwards`,
              }}
            />
          ))}
        </div>

        {/* Floating particles */}
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 rounded-full bg-gold-300/40 particle"
            style={{
              left: `${10 + i * 11}%`,
              top: `${20 + (i % 3) * 20}%`,
              animationDelay: `${i * 0.5}s`,
              animationDuration: `${3 + i * 0.7}s`,
            }}
          />
        ))}

        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center py-32 pt-40">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gold-400/15 border border-gold-400/30 mb-8 animate-fade-in">
            <Sparkles size={14} className="text-gold-300" />
            <span className="text-gold-200 text-xs font-medium tracking-widest uppercase">
              A New Way for Families to Encounter Jesus
            </span>
          </div>

          {/* Main headline */}
          <h1 className="font-playfair text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-ivory-100 leading-tight mb-6">
            Every Generation.{' '}
            <span className="text-gold-gradient">One Jesus.</span>{' '}
            Every Day.
          </h1>

          <p className="text-ivory-300/80 text-lg sm:text-xl md:text-2xl max-w-3xl mx-auto leading-relaxed mb-10">
            In Him Daily is a devotional ministry written simultaneously for adults, teenagers, and children—so every generation in your family encounters Jesus through the{' '}
            <em className="text-gold-200 not-italic">same scripture on the same day</em>.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link
              href="/free-sample"
              className="group inline-flex items-center gap-2 px-8 py-4 bg-gold-400 hover:bg-gold-300 text-midnight-700 font-bold text-base rounded-full transition-all duration-300 shadow-gold hover:shadow-gold-lg hover:-translate-y-0.5"
            >
              Get Your Free 7-Day Sample
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              href="/devotionals"
              className="inline-flex items-center gap-2 px-8 py-4 border border-ivory-100/20 text-ivory-200 hover:text-ivory-100 hover:border-ivory-100/40 font-medium text-base rounded-full transition-all duration-200"
            >
              Explore the Devotionals
            </Link>
          </div>

          {/* Three pathways visual */}
          <div className="mt-20 flex items-end justify-center gap-4">
            {[
              { label: 'Adults', delay: '0s', height: 'h-16' },
              { label: 'Teens', delay: '0.2s', height: 'h-12' },
              { label: 'Children', delay: '0.4s', height: 'h-8' },
            ].map((item, i) => (
              <div key={i} className="flex flex-col items-center gap-2 opacity-0 animate-fade-up" style={{ animationDelay: item.delay, animationFillMode: 'forwards' }}>
                <div className={`w-0.5 ${item.height} bg-gradient-to-t from-gold-400 to-transparent`} />
                <div className="w-2 h-2 rounded-full bg-gold-400" />
                <span className="text-ivory-400 text-xs tracking-widest uppercase">{item.label}</span>
              </div>
            ))}
            <div className="flex flex-col items-center gap-2 ml-2 opacity-0 animate-fade-up" style={{ animationDelay: '0.6s', animationFillMode: 'forwards' }}>
              <div className="h-20 w-0.5 bg-gradient-to-t from-gold-300 to-transparent" />
              <div className="w-3 h-3 rounded-full bg-gold-300 shadow-gold animate-glow-pulse" />
              <span className="text-gold-200 text-xs font-semibold tracking-widest uppercase">One Jesus</span>
            </div>
          </div>
        </div>
      </section>

      {/* ========== PROBLEM SECTION ========== */}
      <section className="py-24 bg-ivory">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal className="text-center mb-16">
            <p className="text-gold-500 text-sm font-semibold tracking-widest uppercase mb-4">The Challenge</p>
            <h2 className="font-playfair text-4xl md:text-5xl font-bold text-midnight-700 max-w-3xl mx-auto leading-tight">
              Does your family read the Bible together—but experience it separately?
            </h2>
          </ScrollReveal>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Before */}
            <ScrollReveal delay={100}>
              <div className="p-8 rounded-2xl bg-white border border-ivory-400 shadow-sm">
                <div className="w-10 h-10 rounded-full bg-red-50 flex items-center justify-center mb-5">
                  <X size={18} className="text-red-400" />
                </div>
                <h3 className="font-playfair text-xl font-bold text-midnight-700 mb-4">Before In Him Daily</h3>
                <ul className="space-y-3">
                  {[
                    "Dad reads an adult commentary",
                    "Mom finishes a women's devotional",
                    "Teen scrolls through a youth app",
                    "Child looks at a picture Bible",
                    "Nobody has the same conversation",
                    "Family grows in faith... separately",
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm text-[#1E1E1E]/60">
                      <div className="w-1.5 h-1.5 rounded-full bg-red-300 mt-2 flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </ScrollReveal>

            {/* After */}
            <ScrollReveal delay={200}>
              <div className="p-8 rounded-2xl bg-midnight-700 text-ivory-100">
                <div className="w-10 h-10 rounded-full bg-gold-400/20 flex items-center justify-center mb-5">
                  <Check size={18} className="text-gold-300" />
                </div>
                <h3 className="font-playfair text-xl font-bold text-gold-200 mb-4">With In Him Daily</h3>
                <ul className="space-y-3">
                  {[
                    "Every generation reads the same scripture",
                    "Three voices speak to three ages",
                    "Dinner conversations about the Word",
                    "Kids teach parents what they discovered",
                    "One shared encounter with Jesus",
                    "Family grows in faith... together",
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm text-ivory-300">
                      <Check size={14} className="text-gold-400 mt-0.5 flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ========== SOLUTION SECTION ========== */}
      <section className="py-24 bg-ivory-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal className="text-center mb-16">
            <p className="text-gold-500 text-sm font-semibold tracking-widest uppercase mb-4">The Solution</p>
            <h2 className="font-playfair text-4xl md:text-5xl font-bold text-midnight-700 mb-4">
              One Encounter. Three Generations.
            </h2>
            <p className="text-[#1E1E1E]/60 text-lg max-w-2xl mx-auto">
              The same scripture, illuminated with unique depth, language, and application for each generation.
            </p>
          </ScrollReveal>

          {/* Central scripture */}
          <ScrollReveal className="max-w-2xl mx-auto text-center mb-16">
            <div className="p-8 rounded-2xl bg-midnight-700 border border-gold-400/20 shadow-gold relative overflow-hidden">
              <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse at 50% 100%, rgba(214, 166, 74, 0.1) 0%, transparent 70%)' }} />
              <div className="relative">
                <p className="font-cormorant text-xl md:text-2xl text-ivory-100 italic leading-relaxed mb-4">
                  &ldquo;I am the light of the world. Whoever follows me will never walk in darkness, but will have the light of life.&rdquo;
                </p>
                <span className="text-gold-400 text-sm font-semibold tracking-wide">John 8:12</span>
              </div>
            </div>
          </ScrollReveal>

          {/* Three versions */}
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                label: 'Adult Edition',
                age: 'Adults',
                color: 'bg-midnight-700',
                textColor: 'text-ivory-100',
                accent: 'text-gold-300',
                border: 'border-midnight-600',
                title: 'Walking in the Light of His Presence',
                excerpt: 'Jesus doesn\'t merely illuminate your path—He IS the light. This declaration calls us to walk in an entirely different quality of life, moving from performance to presence.',
                features: ['Deep theological reflection', 'Life application', 'Intercession prayer'],
                delay: 0,
              },
              {
                label: 'Teen Edition',
                age: 'Teenagers',
                color: 'bg-gold-400',
                textColor: 'text-midnight-700',
                accent: 'text-midnight-700',
                border: 'border-gold-300',
                title: 'You Don\'t Have to Figure It Out Alone',
                excerpt: 'Life feels dark and confusing sometimes. But Jesus says following Him is like having the most powerful flashlight ever—suddenly everything makes sense.',
                features: ['Real-life scenarios', 'Honest questions', 'Personal application'],
                delay: 100,
              },
              {
                label: "Children's Edition",
                age: 'Children',
                color: 'bg-lavender-100',
                textColor: 'text-midnight-700',
                accent: 'text-midnight-600',
                border: 'border-lavender-200',
                title: 'Jesus Is Like a Super Light!',
                excerpt: 'When someone turns on a light in a dark room—everything changes! Jesus says He is the light of the whole world. That means with Jesus, you never have to be afraid!',
                features: ['Simple language', 'Fun activities', 'Bedtime prayers'],
                delay: 200,
              },
            ].map((edition, i) => (
              <ScrollReveal key={i} delay={edition.delay}>
                <div className={`premium-card p-7 rounded-2xl ${edition.color} border ${edition.border} h-full flex flex-col`}>
                  <div className="mb-4">
                    <span className={`text-xs font-semibold tracking-widest uppercase ${edition.accent} opacity-70`}>
                      {edition.label}
                    </span>
                  </div>
                  <h3 className={`font-playfair text-xl font-bold ${edition.textColor} mb-3 leading-snug`}>
                    {edition.title}
                  </h3>
                  <p className={`text-sm leading-relaxed mb-5 ${edition.textColor} opacity-75 flex-1`}>
                    {edition.excerpt}
                  </p>
                  <ul className="space-y-2">
                    {edition.features.map((f, j) => (
                      <li key={j} className={`flex items-center gap-2 text-xs ${edition.textColor} opacity-70`}>
                        <Check size={12} className={edition.accent} />
                        {f}
                      </li>
                    ))}
                  </ul>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ========== FAMILY ENCOUNTER (SIGNATURE FEATURE) ========== */}
      <section className="py-24 bg-ivory" id="family-encounter">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal className="text-center mb-12">
            <p className="text-gold-500 text-sm font-semibold tracking-widest uppercase mb-4">Interactive Experience</p>
            <h2 className="font-playfair text-4xl md:text-5xl font-bold text-midnight-700 mb-4">
              The Family Encounter
            </h2>
            <p className="text-[#1E1E1E]/60 text-lg max-w-2xl mx-auto">
              See how the same scripture speaks uniquely to every generation. Select your role to experience it.
            </p>
          </ScrollReveal>

          {/* Scripture */}
          <ScrollReveal className="max-w-xl mx-auto text-center mb-10">
            <div className="inline-block px-6 py-4 rounded-xl bg-gold-50 border border-gold-200">
              <p className="font-cormorant text-lg text-midnight-700 italic">
                &ldquo;{familyEncounterData.scripture.text}&rdquo;
              </p>
              <span className="text-gold-500 text-sm font-semibold mt-2 block">{familyEncounterData.scripture.reference}</span>
            </div>
          </ScrollReveal>

          {/* Generation selector */}
          <div className="flex justify-center gap-3 mb-10">
            {(['adult', 'teen', 'child'] as const).map((gen) => (
              <button
                key={gen}
                onClick={() => setActiveGeneration(gen)}
                className={`px-6 py-3 rounded-full text-sm font-semibold transition-all duration-300 ${
                  activeGeneration === gen
                    ? 'bg-midnight-700 text-ivory-100 shadow-lg'
                    : 'bg-white text-midnight-600 border border-ivory-400 hover:border-gold-300'
                }`}
              >
                {gen === 'adult' ? 'Adult' : gen === 'teen' ? 'Teen' : 'Child'}
              </button>
            ))}
          </div>

          {/* Content card */}
          <div className="max-w-2xl mx-auto">
            <div className="bg-white rounded-2xl shadow-card-hover border border-ivory-400 overflow-hidden transition-all duration-500">
              <div className={`px-8 py-4 ${
                activeGeneration === 'adult' ? 'bg-midnight-700' :
                activeGeneration === 'teen' ? 'bg-gold-400' : 'bg-lavender-100'
              }`}>
                <span className={`text-xs font-bold tracking-widest uppercase ${
                  activeGeneration === 'adult' ? 'text-gold-300' :
                  activeGeneration === 'teen' ? 'text-midnight-700' : 'text-midnight-600'
                }`}>
                  {activeData.label}
                </span>
              </div>
              <div className="p-8">
                <h3 className="font-playfair text-2xl font-bold text-midnight-700 mb-4">
                  {activeData.title}
                </h3>
                <p className="text-[#1E1E1E]/70 leading-relaxed mb-6">
                  {activeData.content}
                </p>

                <div className="space-y-4">
                  <div className="p-4 rounded-xl bg-ivory-200 border-l-4 border-gold-400">
                    <p className="text-xs font-semibold text-gold-600 uppercase tracking-wider mb-1">Reflection</p>
                    <p className="text-sm text-midnight-700 italic">{activeData.reflection}</p>
                  </div>
                  <div className="p-4 rounded-xl bg-midnight-700/5 border-l-4 border-midnight-400">
                    <p className="text-xs font-semibold text-midnight-500 uppercase tracking-wider mb-1">Prayer</p>
                    <p className="text-sm text-midnight-700 italic">{activeData.prayer}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========== WHATSAPP COMMUNITY ========== */}
      <WhatsAppCommunity />

      {/* ========== WHY DIFFERENT (COMPARISON) ========== */}
      <section className="py-24 bg-midnight-700">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal className="text-center mb-16">
            <p className="text-gold-400 text-sm font-semibold tracking-widest uppercase mb-4">The Difference</p>
            <h2 className="font-playfair text-4xl md:text-5xl font-bold text-ivory-100 mb-4">
              Why In Him Daily Is Different
            </h2>
            <p className="text-ivory-300/70 text-lg max-w-2xl mx-auto">
              Traditional devotionals were built for individuals. In Him Daily was built for families—all of them, at once.
            </p>
          </ScrollReveal>

          <ScrollReveal>
            <div className="rounded-2xl overflow-hidden border border-midnight-600">
              <div className="grid grid-cols-3 bg-midnight-600">
                <div className="p-4 col-span-1" />
                <div className="p-4 text-center border-l border-midnight-500">
                  <span className="text-ivory-400 text-xs font-medium tracking-wider uppercase">Traditional</span>
                </div>
                <div className="p-4 text-center border-l border-midnight-500 bg-gold-400/10">
                  <span className="text-gold-300 text-xs font-bold tracking-wider uppercase">In Him Daily</span>
                </div>
              </div>
              {comparisonData.map((row, i) => (
                <div
                  key={i}
                  className={`grid grid-cols-3 border-t border-midnight-600 ${i % 2 === 0 ? 'bg-midnight-700' : 'bg-midnight-700/70'}`}
                >
                  <div className="p-4 col-span-1">
                    <span className="text-ivory-200 text-sm">{row.feature}</span>
                  </div>
                  <div className="p-4 flex items-center justify-center border-l border-midnight-600">
                    {row.traditional === false ? (
                      <X size={16} className="text-red-400" />
                    ) : row.traditional === true ? (
                      <Check size={16} className="text-ivory-400" />
                    ) : (
                      <span className="text-ivory-400 text-xs text-center">{row.traditional}</span>
                    )}
                  </div>
                  <div className="p-4 flex items-center justify-center border-l border-midnight-600 bg-gold-400/5">
                    {row.ihd === true && <Check size={16} className="text-gold-400" />}
                  </div>
                </div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ========== DEVOTIONAL LIBRARY ========== */}
      <section className="py-24 bg-ivory-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal className="text-center mb-16">
            <p className="text-gold-500 text-sm font-semibold tracking-widest uppercase mb-4">The Library</p>
            <h2 className="font-playfair text-4xl md:text-5xl font-bold text-midnight-700 mb-4">
              The Devotional Library
            </h2>
            <p className="text-[#1E1E1E]/60 text-lg max-w-2xl mx-auto">
              Premium series crafted to take your family deep into the character and presence of Jesus.
            </p>
          </ScrollReveal>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {[
              {
                series: 'Series One',
                title: 'I AM',
                subtitle: '120 Names of Jesus',
                days: '120 Days',
                image: 'https://images.pexels.com/photos/1111319/pexels-photo-1111319.jpeg?auto=compress&cs=tinysrgb&w=600',
                description: 'A transformational journey through 120 names and titles of Jesus Christ. Each day reveals a new dimension of His character—from the beginning of creation to the fulfillment of all things.',
                badge: 'Available Now',
                badgeColor: 'bg-gold-400 text-midnight-700',
                delay: 0,
              },
              {
                series: 'Series Two',
                title: 'Full of Grace and Truth',
                subtitle: '120 Gospel Encounters',
                days: '120 Days',
                image: 'https://images.pexels.com/photos/415571/pexels-photo-415571.jpeg?auto=compress&cs=tinysrgb&w=600',
                description: 'Walk through the four Gospels in 120 powerful encounters with Jesus. See Him heal, teach, confront, and redeem—through the eyes of every generation.',
                badge: 'Coming Soon',
                badgeColor: 'bg-midnight-600 text-ivory-100',
                delay: 150,
              },
            ].map((series, i) => (
              <ScrollReveal key={i} delay={series.delay}>
                <div className="premium-card rounded-2xl overflow-hidden bg-white border border-ivory-400 shadow-sm">
                  <div className="relative h-52 overflow-hidden">
                    <img
                      src={series.image}
                      alt={series.title}
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-midnight-700/60 to-transparent" />
                    <div className="absolute bottom-4 left-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-bold ${series.badgeColor}`}>
                        {series.badge}
                      </span>
                    </div>
                  </div>
                  <div className="p-7">
                    <p className="text-gold-500 text-xs font-semibold tracking-widest uppercase mb-2">{series.series}</p>
                    <h3 className="font-playfair text-2xl font-bold text-midnight-700 leading-tight">{series.title}</h3>
                    <p className="text-gold-400 font-medium text-sm mb-4">{series.subtitle}</p>
                    <p className="text-[#1E1E1E]/60 text-sm leading-relaxed mb-5">{series.description}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-midnight-500 bg-ivory-200 px-3 py-1.5 rounded-full">
                        {series.days}
                      </span>
                      <Link
                        href="/devotionals"
                        className="text-sm font-semibold text-midnight-700 hover:text-gold-500 transition-colors flex items-center gap-1"
                      >
                        Learn more <ChevronRight size={14} />
                      </Link>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>

          <ScrollReveal className="text-center mt-12">
            <Link
              href="/devotionals"
              className="inline-flex items-center gap-2 px-8 py-4 bg-midnight-700 text-ivory-100 font-semibold rounded-full hover:bg-midnight-600 transition-colors"
            >
              View Full Library <ArrowRight size={18} />
            </Link>
          </ScrollReveal>
        </div>
      </section>

      {/* ========== TESTIMONIALS ========== */}
      <section className="py-24 bg-ivory">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal className="text-center mb-16">
            <p className="text-gold-500 text-sm font-semibold tracking-widest uppercase mb-4">Testimonials</p>
            <h2 className="font-playfair text-4xl font-bold text-midnight-700">
              Families Are Encountering Jesus Together
            </h2>
          </ScrollReveal>

          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <ScrollReveal key={i} delay={i * 100}>
                <div className="premium-card p-7 rounded-2xl bg-white border border-ivory-400 shadow-sm flex flex-col">
                  <div className="flex gap-1 mb-5">
                    {[...Array(5)].map((_, j) => (
                      <Star key={j} size={14} className="text-gold-400 fill-gold-400" />
                    ))}
                  </div>
                  <p className="font-cormorant text-lg text-midnight-700 italic leading-relaxed flex-1 mb-6">
                    &ldquo;{t.quote}&rdquo;
                  </p>
                  <div className="flex items-center gap-3 pt-4 border-t border-ivory-400">
                    <div className="w-9 h-9 rounded-full bg-midnight-700 flex items-center justify-center text-ivory-100 text-sm font-bold">
                      {t.author[0]}
                    </div>
                    <div>
                      <p className="font-semibold text-midnight-700 text-sm">{t.author}</p>
                      <p className="text-[#1E1E1E]/50 text-xs">{t.role}, {t.age}</p>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ========== EMAIL CAPTURE ========== */}
      <section className="py-24 bg-midnight-700 relative overflow-hidden">
        <div className="absolute inset-0" style={{
          background: 'radial-gradient(ellipse 60% 50% at 50% 50%, rgba(214, 166, 74, 0.08) 0%, transparent 70%)'
        }} />

        <div className="relative z-10 max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <ScrollReveal>
            <div className="w-16 h-16 mx-auto mb-8 relative">
              <div className="w-full h-full rounded-full bg-gold-400/20 flex items-center justify-center">
                <BookOpen size={28} className="text-gold-300" />
              </div>
              <div className="absolute inset-0 rounded-full bg-gold-400/10 animate-glow-pulse" />
            </div>

            <h2 className="font-playfair text-4xl md:text-5xl font-bold text-ivory-100 mb-4">
              Start Your Family's Encounter Today
            </h2>
            <p className="text-ivory-300/70 text-lg mb-10">
              Receive a free 7-day sample—three editions, one scripture. See how In Him Daily transforms family devotion.
            </p>

            {emailSubmitted ? (
              <div className="p-8 rounded-2xl bg-gold-400/15 border border-gold-400/30 animate-fade-in">
                <div className="w-12 h-12 rounded-full bg-gold-400/30 flex items-center justify-center mx-auto mb-4">
                  <Check size={24} className="text-gold-300" />
                </div>
                <h3 className="font-playfair text-2xl font-bold text-ivory-100 mb-2">Your Sample Is On Its Way!</h3>
                <p className="text-ivory-300/70">
                  Check your inbox, {firstName}. Your free 7-day devotional sample for all three generations is waiting for you.
                </p>
              </div>
            ) : (
              <form onSubmit={handleEmailSubmit} className="space-y-4">
                <div className="flex flex-col sm:flex-row gap-4">
                  <input
                    type="text"
                    placeholder="First Name"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    required
                    className="flex-1 px-5 py-4 rounded-full bg-midnight-600 border border-midnight-500 text-ivory-100 placeholder-ivory-400/50 focus:outline-none focus:border-gold-400 transition-colors text-sm"
                  />
                  <input
                    type="email"
                    placeholder="Email Address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="flex-1 px-5 py-4 rounded-full bg-midnight-600 border border-midnight-500 text-ivory-100 placeholder-ivory-400/50 focus:outline-none focus:border-gold-400 transition-colors text-sm"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-4 bg-gold-400 hover:bg-gold-300 text-midnight-700 font-bold rounded-full transition-all duration-300 shadow-gold hover:shadow-gold-lg hover:-translate-y-0.5"
                >
                  Send Me The Free Sample
                </button>
                <p className="text-ivory-400/50 text-xs">
                  No spam. Just scripture. Unsubscribe anytime.
                </p>
              </form>
            )}
          </ScrollReveal>
        </div>
      </section>

      {/* ========== CLOSING SCRIPTURE ========== */}
      <section className="py-24 bg-ivory text-center">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <ScrollReveal>
            <div className="gold-divider mx-auto mb-10" />
            <p className="font-cormorant text-4xl md:text-5xl lg:text-6xl text-midnight-700 italic leading-tight scripture-glow">
              &ldquo;The Word became flesh and made His dwelling among us.&rdquo;
            </p>
            <p className="mt-6 text-gold-500 text-sm font-semibold tracking-widest uppercase">
              John 1:14
            </p>
            <div className="gold-divider mx-auto mt-10" />
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}
