'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, BookOpen, Star, Check, X, Sparkles, Users, ChevronRight } from 'lucide-react';
import ScrollReveal from '@/components/ScrollReveal';
import WhatsAppCommunity from '@/components/WhatsAppCommunity';

/* ─── static data ───────────────────────────────────────────────── */
const familyEncounterData = {
  scripture: { reference: 'John 8:12', text: '"I am the light of the world. Whoever follows me will never walk in darkness, but will have the light of life."' },
  adult: {
    label: 'Adult Edition',
    title: 'Walking in the Light of His Presence',
    content: "Jesus doesn't merely illuminate your path—He IS the light. In a world filled with moral ambiguity and spiritual confusion, this declaration is both radical and deeply personal. To follow Jesus is not just to adopt a belief system; it is to walk in an entirely different quality of life.",
    reflection: 'Where in your life have you been walking in darkness, unwilling to let His light fully illuminate?',
    prayer: 'Lord Jesus, I choose to walk in Your light today. Expose every area of darkness in my life and fill it with Your presence.',
  },
  teen: {
    label: 'Teen Edition',
    title: "You Don't Have to Figure It Out Alone",
    content: "Imagine walking into a completely dark room, fumbling around, bumping into everything. That's life without Jesus. But when you follow Him, it's like someone turned on the most powerful light you've ever seen—everything becomes clear.",
    reflection: "What's one thing in your life right now that feels really confusing or dark? How could following Jesus bring light to that situation?",
    prayer: "Jesus, sometimes my life feels so confusing. Thank You for being a light I can actually follow. Help me trust You with the things I don't understand.",
  },
  child: {
    label: "Children's Edition",
    title: 'Jesus Is Like a Super Light!',
    content: "Have you ever been somewhere really dark and felt a little scared? Maybe your bedroom at night. When someone turns on the light—everything changes! Jesus says He is the light of the whole world. That means when Jesus is with you, you never have to be afraid of the dark!",
    reflection: 'Draw a picture of you walking with Jesus as your light! What does it look like?',
    prayer: 'Thank You Jesus for being my light! Help me follow You everywhere I go so I never have to be scared of the dark. Amen!',
  },
};

const comparisonRows = [
  { feature: 'Same scripture across all ages',  traditional: false,          ihd: true },
  { feature: 'Three generational voices',       traditional: false,          ihd: true },
  { feature: 'Families grow together',          traditional: false,          ihd: true },
  { feature: 'Age-appropriate language',        traditional: 'Single age',   ihd: true },
  { feature: 'Shared family discussion',        traditional: false,          ihd: true },
  { feature: 'Daily scripture focus',           traditional: true,           ihd: true },
  { feature: 'Reflection questions',            traditional: true,           ihd: true },
  { feature: 'Daily prayer',                    traditional: true,           ihd: true },
];

const testimonials = [
  { quote: "For the first time in years, our whole family is talking about the same thing at dinner. Our kids actually ask us what we thought of the devotional.", author: "Jennifer M.", role: "Mother of three" },
  { quote: "I've tried devotionals before but they always felt like homework. In Him Daily actually connects with where I am—and my parents are reading the same thing.", author: "Marcus T.", role: "High school student" },
  { quote: "As a grandfather, I've prayed for years that my family would grow together in faith. In Him Daily is the answer to that prayer.", author: "Robert K.", role: "Grandfather" },
];

const editions = [
  { label: 'Adult Edition', bg: 'bg-navy-700', text: 'text-white', sub: 'text-gold-300', title: 'Walking in the Light of His Presence', excerpt: "Jesus doesn't merely illuminate your path—He IS the light. This declaration calls us to walk in an entirely different quality of life.", features: ['Theological depth', 'Life application', 'Intercession prayer'] },
  { label: 'Teen Edition',  bg: 'bg-gold-500', text: 'text-navy-800', sub: 'text-navy-700', title: "You Don't Have to Figure It Out Alone", excerpt: "Life feels dark and confusing sometimes. But Jesus says following Him is like having the most powerful flashlight ever.", features: ['Real-life scenarios', 'Honest questions', 'Personal application'] },
  { label: "Children's",   bg: 'bg-lavender-200', text: 'text-navy-700', sub: 'text-navy-500', title: 'Jesus Is Like a Super Light!', excerpt: "When someone turns on a light in a dark room—everything changes! Jesus says He is the light of the whole world.", features: ['Simple language', 'Fun activities', 'Bedtime prayers'] },
];

export default function HomePage() {
  const [active, setActive]         = useState<'adult'|'teen'|'child'>('adult');
  const [submitted, setSubmitted]   = useState(false);
  const [email, setEmail]           = useState('');
  const [firstName, setFirstName]   = useState('');

  const data = familyEncounterData[active];

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (email && firstName) setSubmitted(true);
  }

  return (
    <div className="overflow-x-hidden">

      {/* ══════════════════════════════════════════════
          HERO
      ══════════════════════════════════════════════ */}
      <section className="relative min-h-screen flex items-center justify-center bg-navy-700 overflow-hidden" aria-label="Hero">
        {/* radial glow */}
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true" style={{ background: 'radial-gradient(ellipse 70% 55% at 50% 65%, rgba(201,152,58,0.13) 0%, transparent 70%)' }} />

        {/* subtle dot grid */}
        <div className="absolute inset-0 opacity-[0.04] pointer-events-none" aria-hidden="true"
          style={{ backgroundImage: 'radial-gradient(circle, #E4B86A 1px, transparent 1px)', backgroundSize: '36px 36px' }} />

        {/* light rays */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full max-w-2xl h-3/4 pointer-events-none" aria-hidden="true">
          {[-36,-22,-10,0,10,22,36].map((deg, i) => (
            <div key={i} className="absolute bottom-0 left-1/2 origin-bottom"
              style={{ width: '1.5px', height: `${42 + i * 5}%`, background: 'linear-gradient(to top, rgba(228,184,106,0.55), transparent)', transform: `translateX(-50%) rotate(${deg}deg)`, animation: `ray-appear ${0.9 + i * 0.12}s ease-out forwards` }} />
          ))}
        </div>

        {/* floating particles */}
        {[14,25,38,52,63,75,86,92].map((left, i) => (
          <div key={i} className="particle absolute w-1 h-1 rounded-full bg-gold-300/40 pointer-events-none" aria-hidden="true"
            style={{ left: `${left}%`, top: `${22 + (i % 3) * 18}%`, animationDelay: `${i * 0.55}s`, animationDuration: `${3.5 + i * 0.6}s` }} />
        ))}

        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center py-32 pt-40">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gold-500/15 border border-gold-400/30 mb-8 animate-fade-in">
            <Sparkles size={13} className="text-gold-300" aria-hidden="true" />
            <span className="text-gold-200 text-[0.72rem] font-semibold tracking-[0.14em] uppercase">A New Way for Families to Encounter Jesus</span>
          </div>

          <h1 className="font-playfair text-5xl sm:text-6xl md:text-7xl lg:text-[5rem] font-bold text-white leading-[1.08] mb-6">
            Every Generation.<br />
            <span className="text-gold-gradient">One Jesus.</span><br />
            Every Day.
          </h1>

          <p className="text-white/70 text-lg sm:text-xl max-w-2xl mx-auto leading-relaxed mb-10">
            In Him Daily is a devotional ministry written simultaneously for adults, teenagers, and children—so every generation in your family encounters Jesus through the{' '}
            <em className="not-italic text-gold-300">same scripture on the same day</em>.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/free-sample" className="group inline-flex items-center justify-center gap-2 px-8 py-4 bg-gold-500 hover:bg-gold-400 text-navy-800 font-bold text-[0.9rem] rounded-full transition-all duration-300 shadow-gold hover:-translate-y-0.5">
              Get Your Free 7-Day Sample
              <ArrowRight size={17} className="group-hover:translate-x-0.5 transition-transform" aria-hidden="true" />
            </Link>
            <Link href="/devotionals" className="inline-flex items-center justify-center gap-2 px-8 py-4 border border-white/25 text-white/80 hover:text-white hover:border-white/40 font-medium text-[0.9rem] rounded-full transition-all duration-200">
              Explore the Devotionals
            </Link>
          </div>

          {/* pathway visual */}
          <div className="mt-20 flex items-end justify-center gap-5" aria-hidden="true">
            {[{l:'Adults',h:56},{l:'Teens',h:40},{l:'Children',h:28}].map((p,i)=>(
              <div key={i} className="flex flex-col items-center gap-2 animate-fade-up opacity-0" style={{animationDelay:`${i*0.18}s`,animationFillMode:'forwards'}}>
                <div className="w-px bg-gradient-to-t from-gold-400 to-transparent" style={{height:p.h}} />
                <div className="w-2 h-2 rounded-full bg-gold-400" />
                <span className="text-white/40 text-[0.65rem] tracking-[0.12em] uppercase">{p.l}</span>
              </div>
            ))}
            <div className="flex flex-col items-center gap-2 ml-1 animate-fade-up opacity-0" style={{animationDelay:'0.58s',animationFillMode:'forwards'}}>
              <div className="w-px h-16 bg-gradient-to-t from-gold-300 to-transparent" />
              <div className="w-3 h-3 rounded-full bg-gold-300 shadow-gold animate-glow-pulse" />
              <span className="text-gold-200 text-[0.65rem] font-semibold tracking-[0.12em] uppercase">One Jesus</span>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          PROBLEM
      ══════════════════════════════════════════════ */}
      <section className="py-24 bg-[#FAF8F3]" aria-labelledby="problem-heading">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal className="text-center mb-14">
            <p className="text-gold-600 text-[0.72rem] font-semibold tracking-[0.16em] uppercase mb-3">The Challenge</p>
            <h2 id="problem-heading" className="font-playfair text-3xl md:text-4xl lg:text-5xl font-bold text-navy-700 max-w-3xl mx-auto leading-tight">
              Does your family read the Bible together—but experience it separately?
            </h2>
          </ScrollReveal>

          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            <ScrollReveal delay={80}>
              <div className="p-8 rounded-2xl bg-white border border-ivory-300 shadow-sm h-full">
                <div className="w-9 h-9 rounded-full bg-red-50 flex items-center justify-center mb-5">
                  <X size={16} className="text-red-400" aria-hidden="true" />
                </div>
                <h3 className="font-playfair text-lg font-bold text-navy-700 mb-4">Before In Him Daily</h3>
                <ul className="space-y-2.5" role="list">
                  {["Dad reads an adult commentary","Mom finishes a women's devotional","Teen scrolls through a youth app","Child looks at a picture Bible","Nobody has the same conversation","Family grows in faith… separately"].map((item,i)=>(
                    <li key={i} className="flex items-start gap-2.5 text-sm text-[#6B6B6B]">
                      <div className="w-1.5 h-1.5 rounded-full bg-red-300 mt-2 shrink-0" aria-hidden="true" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={180}>
              <div className="p-8 rounded-2xl bg-navy-700 h-full">
                <div className="w-9 h-9 rounded-full bg-gold-400/20 flex items-center justify-center mb-5">
                  <Check size={16} className="text-gold-300" aria-hidden="true" />
                </div>
                <h3 className="font-playfair text-lg font-bold text-gold-200 mb-4">With In Him Daily</h3>
                <ul className="space-y-2.5" role="list">
                  {["Every generation reads the same scripture","Three voices speak to three ages","Dinner conversations about the Word","Kids teach parents what they discovered","One shared encounter with Jesus","Family grows in faith… together"].map((item,i)=>(
                    <li key={i} className="flex items-start gap-2.5 text-sm text-white/70">
                      <Check size={13} className="text-gold-400 mt-0.5 shrink-0" aria-hidden="true" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          SOLUTION — THREE EDITIONS
      ══════════════════════════════════════════════ */}
      <section className="py-24 bg-ivory-200" aria-labelledby="solution-heading">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal className="text-center mb-14">
            <p className="text-gold-600 text-[0.72rem] font-semibold tracking-[0.16em] uppercase mb-3">The Solution</p>
            <h2 id="solution-heading" className="font-playfair text-3xl md:text-4xl lg:text-5xl font-bold text-navy-700 mb-4">One Encounter. Three Generations.</h2>
            <p className="text-[#6B6B6B] text-lg max-w-xl mx-auto">The same scripture, in three unique voices—each crafted to meet its reader exactly where they are.</p>
          </ScrollReveal>

          {/* shared scripture */}
          <ScrollReveal className="max-w-2xl mx-auto text-center mb-14">
            <div className="relative p-8 rounded-2xl bg-navy-700 border border-gold-500/20 overflow-hidden">
              <div className="absolute inset-0 pointer-events-none" style={{background:'radial-gradient(ellipse at 50% 110%, rgba(201,152,58,0.12) 0%, transparent 65%)'}} aria-hidden="true" />
              <div className="relative">
                <p className="font-cormorant text-xl md:text-2xl text-white/90 italic leading-relaxed mb-3">
                  &ldquo;I am the light of the world. Whoever follows me will never walk in darkness, but will have the light of life.&rdquo;
                </p>
                <span className="text-gold-400 text-sm font-semibold tracking-wider">John 8:12</span>
              </div>
            </div>
          </ScrollReveal>

          <div className="grid md:grid-cols-3 gap-6">
            {editions.map((ed, i) => (
              <ScrollReveal key={i} delay={i * 90}>
                <div className={`premium-card p-7 rounded-2xl ${ed.bg} h-full flex flex-col`}>
                  <p className={`text-[0.68rem] font-bold tracking-[0.15em] uppercase ${ed.sub} mb-4`}>{ed.label}</p>
                  <h3 className={`font-playfair text-xl font-bold ${ed.text} mb-3 leading-snug`}>{ed.title}</h3>
                  <p className={`text-sm leading-relaxed mb-5 ${ed.text} opacity-70 flex-1`}>{ed.excerpt}</p>
                  <ul className="space-y-1.5" role="list">
                    {ed.features.map((f,j)=>(
                      <li key={j} className={`flex items-center gap-2 text-xs ${ed.text} opacity-65`}>
                        <Check size={11} className={ed.sub} aria-hidden="true" /> {f}
                      </li>
                    ))}
                  </ul>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          FAMILY ENCOUNTER (interactive)
      ══════════════════════════════════════════════ */}
      <section className="py-24 bg-[#FAF8F3]" id="family-encounter" aria-labelledby="encounter-heading">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal className="text-center mb-12">
            <p className="text-gold-600 text-[0.72rem] font-semibold tracking-[0.16em] uppercase mb-3">Interactive Preview</p>
            <h2 id="encounter-heading" className="font-playfair text-3xl md:text-4xl lg:text-5xl font-bold text-navy-700 mb-4">The Family Encounter</h2>
            <p className="text-[#6B6B6B] text-lg max-w-xl mx-auto">Select your generation to see how the same scripture speaks uniquely to you.</p>
          </ScrollReveal>

          {/* scripture */}
          <ScrollReveal className="max-w-xl mx-auto text-center mb-10">
            <div className="inline-block px-6 py-4 rounded-xl bg-gold-50 border border-gold-200">
              <p className="font-cormorant text-lg text-navy-700 italic leading-snug">
                &ldquo;{familyEncounterData.scripture.text}&rdquo;
              </p>
              <span className="text-gold-600 text-sm font-semibold mt-2 block">{familyEncounterData.scripture.reference}</span>
            </div>
          </ScrollReveal>

          {/* tabs */}
          <div className="flex justify-center gap-2.5 mb-10" role="tablist" aria-label="Choose generation">
            {(['adult','teen','child'] as const).map((gen) => (
              <button key={gen} role="tab" aria-selected={active === gen} aria-controls={`panel-${gen}`}
                onClick={() => setActive(gen)}
                className={`px-6 py-2.5 rounded-full text-sm font-semibold transition-all duration-250 ${
                  active === gen ? 'bg-navy-700 text-white shadow-navy' : 'bg-white text-navy-500 border border-ivory-300 hover:border-gold-300'
                }`}>
                {gen === 'adult' ? 'Adult' : gen === 'teen' ? 'Teen' : 'Child'}
              </button>
            ))}
          </div>

          {/* content panel */}
          <div className="max-w-2xl mx-auto" id={`panel-${active}`} role="tabpanel">
            <div className="bg-white rounded-2xl shadow-card-hover border border-ivory-300 overflow-hidden">
              <div className={`px-8 py-4 ${active==='adult' ? 'bg-navy-700' : active==='teen' ? 'bg-gold-500' : 'bg-lavender-200'}`}>
                <span className={`text-[0.7rem] font-bold tracking-[0.15em] uppercase ${active==='adult' ? 'text-gold-300' : 'text-navy-700'}`}>
                  {data.label}
                </span>
              </div>
              <div className="p-8">
                <h3 className="font-playfair text-2xl font-bold text-navy-700 mb-4">{data.title}</h3>
                <p className="text-[#6B6B6B] leading-relaxed mb-6 text-sm">{data.content}</p>
                <div className="space-y-3.5">
                  <div className="p-4 rounded-xl bg-ivory-200 border-l-4 border-gold-400">
                    <p className="text-[0.68rem] font-bold text-gold-600 uppercase tracking-[0.12em] mb-1">Reflection</p>
                    <p className="text-sm text-navy-700 italic">{data.reflection}</p>
                  </div>
                  <div className="p-4 rounded-xl bg-navy-50/60 border-l-4 border-navy-400">
                    <p className="text-[0.68rem] font-bold text-navy-500 uppercase tracking-[0.12em] mb-1">Prayer</p>
                    <p className="text-sm text-navy-700 italic">{data.prayer}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          WHATSAPP COMMUNITY
      ══════════════════════════════════════════════ */}
      <WhatsAppCommunity />

      {/* ══════════════════════════════════════════════
          COMPARISON TABLE
      ══════════════════════════════════════════════ */}
      <section className="py-24 bg-navy-700" aria-labelledby="comparison-heading">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal className="text-center mb-14">
            <p className="text-gold-400 text-[0.72rem] font-semibold tracking-[0.16em] uppercase mb-3">The Difference</p>
            <h2 id="comparison-heading" className="font-playfair text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">Why In Him Daily Is Different</h2>
            <p className="text-white/55 text-lg max-w-xl mx-auto">Traditional devotionals were built for individuals. In Him Daily was built for families—all of them, at once.</p>
          </ScrollReveal>

          <ScrollReveal>
            <div className="rounded-2xl overflow-hidden border border-white/10">
              <div className="grid grid-cols-3 bg-white/5">
                <div className="p-4" />
                <div className="p-4 text-center border-l border-white/10">
                  <span className="text-white/45 text-[0.68rem] font-medium tracking-wider uppercase">Traditional</span>
                </div>
                <div className="p-4 text-center border-l border-white/10 bg-gold-500/10">
                  <span className="text-gold-300 text-[0.68rem] font-bold tracking-wider uppercase">In Him Daily</span>
                </div>
              </div>
              {comparisonRows.map((row, i) => (
                <div key={i} className={`grid grid-cols-3 border-t border-white/10 ${i%2===0 ? 'bg-transparent' : 'bg-white/[0.02]'}`}>
                  <div className="p-4"><span className="text-white/75 text-sm">{row.feature}</span></div>
                  <div className="p-4 flex items-center justify-center border-l border-white/10">
                    {row.traditional === false ? <X size={15} className="text-red-400" aria-label="No" /> : row.traditional === true ? <Check size={15} className="text-white/40" aria-label="Yes" /> : <span className="text-white/40 text-xs text-center leading-tight">{row.traditional}</span>}
                  </div>
                  <div className="p-4 flex items-center justify-center border-l border-white/10 bg-gold-500/5">
                    {row.ihd && <Check size={15} className="text-gold-400" aria-label="Yes" />}
                  </div>
                </div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          DEVOTIONAL LIBRARY
      ══════════════════════════════════════════════ */}
      <section className="py-24 bg-ivory-200" aria-labelledby="library-heading">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal className="text-center mb-14">
            <p className="text-gold-600 text-[0.72rem] font-semibold tracking-[0.16em] uppercase mb-3">The Library</p>
            <h2 id="library-heading" className="font-playfair text-3xl md:text-4xl lg:text-5xl font-bold text-navy-700 mb-4">The Devotional Library</h2>
            <p className="text-[#6B6B6B] text-lg max-w-xl mx-auto">Premium series crafted to take your family deeper into Jesus—one scripture at a time.</p>
          </ScrollReveal>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {[
              { series:'Series One', title:'I AM', sub:'120 Names of Jesus', available:true, img:'https://images.pexels.com/photos/1111319/pexels-photo-1111319.jpeg?auto=compress&cs=tinysrgb&w=600', desc:"A transformational journey through 120 names and titles of Jesus Christ—from Alpha to Omega, Bread of Life to King of Kings." },
              { series:'Series Two', title:'Full of Grace and Truth', sub:'120 Gospel Encounters', available:false, img:'https://images.pexels.com/photos/415571/pexels-photo-415571.jpeg?auto=compress&cs=tinysrgb&w=600', desc:"Walk through the four Gospels in 120 powerful encounters with Jesus—see Him heal, teach, confront, and rise victorious." },
            ].map((s,i)=>(
              <ScrollReveal key={i} delay={i*120}>
                <div className="premium-card rounded-2xl overflow-hidden bg-white border border-ivory-300 shadow-sm">
                  <div className="relative h-48 overflow-hidden">
                    <img src={s.img} alt={s.title} loading="lazy" decoding="async" className="w-full h-full object-cover transition-transform duration-500 hover:scale-105" />
                    <div className="absolute inset-0 bg-gradient-to-t from-navy-800/60 to-transparent" aria-hidden="true" />
                    <div className="absolute bottom-4 left-4">
                      <span className={`px-3 py-1 rounded-full text-[0.72rem] font-bold ${s.available ? 'bg-gold-500 text-navy-800' : 'bg-navy-700 text-white'}`}>
                        {s.available ? 'Available Now' : 'Coming Soon'}
                      </span>
                    </div>
                  </div>
                  <div className="p-7">
                    <p className="text-gold-600 text-[0.68rem] font-bold tracking-[0.14em] uppercase mb-2">{s.series}</p>
                    <h3 className="font-playfair text-2xl font-bold text-navy-700 leading-tight">{s.title}</h3>
                    <p className="text-gold-500 font-medium text-sm mb-3">{s.sub}</p>
                    <p className="text-[#6B6B6B] text-sm leading-relaxed mb-5">{s.desc}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-[0.72rem] text-navy-500 bg-ivory-200 px-3 py-1.5 rounded-full">120 Days</span>
                      <Link href="/devotionals" className="text-sm font-semibold text-navy-700 hover:text-gold-600 transition-colors flex items-center gap-1">
                        Learn more <ChevronRight size={14} aria-hidden="true" />
                      </Link>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>

          <ScrollReveal className="text-center mt-10">
            <Link href="/devotionals" className="inline-flex items-center gap-2 px-8 py-4 bg-navy-700 text-white font-semibold rounded-full hover:bg-navy-600 transition-colors">
              View Full Library <ArrowRight size={17} aria-hidden="true" />
            </Link>
          </ScrollReveal>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          TESTIMONIALS
      ══════════════════════════════════════════════ */}
      <section className="py-24 bg-[#FAF8F3]" aria-labelledby="testimonials-heading">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal className="text-center mb-14">
            <p className="text-gold-600 text-[0.72rem] font-semibold tracking-[0.16em] uppercase mb-3">Testimonials</p>
            <h2 id="testimonials-heading" className="font-playfair text-3xl md:text-4xl font-bold text-navy-700">
              Families Are Encountering Jesus Together
            </h2>
          </ScrollReveal>
          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((t,i)=>(
              <ScrollReveal key={i} delay={i*90}>
                <div className="premium-card p-7 rounded-2xl bg-white border border-ivory-300 shadow-sm h-full flex flex-col">
                  <div className="flex gap-1 mb-5" aria-label="5 stars">
                    {[...Array(5)].map((_,j)=><Star key={j} size={13} className="text-gold-500 fill-gold-500" aria-hidden="true" />)}
                  </div>
                  <p className="font-cormorant text-lg text-navy-700 italic leading-relaxed flex-1 mb-5">&ldquo;{t.quote}&rdquo;</p>
                  <div className="flex items-center gap-3 pt-4 border-t border-ivory-300">
                    <div className="w-9 h-9 rounded-full bg-navy-700 flex items-center justify-center text-white text-sm font-bold shrink-0" aria-hidden="true">{t.author[0]}</div>
                    <div>
                      <p className="font-semibold text-navy-700 text-sm">{t.author}</p>
                      <p className="text-[#6B6B6B] text-xs">{t.role}</p>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          EMAIL CAPTURE
      ══════════════════════════════════════════════ */}
      <section className="py-24 bg-navy-700 relative overflow-hidden" aria-labelledby="cta-heading">
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true" style={{background:'radial-gradient(ellipse 55% 45% at 50% 50%, rgba(201,152,58,0.10) 0%, transparent 70%)'}} />
        <div className="relative z-10 max-w-xl mx-auto px-4 sm:px-6 text-center">
          <ScrollReveal>
            <div className="w-14 h-14 mx-auto mb-8 relative">
              <div className="w-full h-full rounded-full bg-gold-400/20 flex items-center justify-center">
                <BookOpen size={26} className="text-gold-300" aria-hidden="true" />
              </div>
              <div className="absolute inset-0 rounded-full bg-gold-400/10 animate-glow-pulse" aria-hidden="true" />
            </div>
            <h2 id="cta-heading" className="font-playfair text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
              Start Your Family's Encounter Today
            </h2>
            <p className="text-white/60 text-lg mb-10">
              Receive a free 7-day sample—all three editions, one scripture. See how In Him Daily transforms family devotion.
            </p>

            {submitted ? (
              <div className="p-8 rounded-2xl bg-gold-400/15 border border-gold-400/25 animate-fade-in">
                <div className="w-11 h-11 rounded-full bg-gold-400/25 flex items-center justify-center mx-auto mb-4">
                  <Check size={22} className="text-gold-300" aria-hidden="true" />
                </div>
                <h3 className="font-playfair text-2xl font-bold text-white mb-2">Your Sample Is On Its Way!</h3>
                <p className="text-white/60">Check your inbox, {firstName}. Your free 7-day devotional for all three generations is waiting.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-3.5" noValidate>
                <div className="flex flex-col sm:flex-row gap-3.5">
                  <input type="text" placeholder="First Name" value={firstName} onChange={e=>setFirstName(e.target.value)} required aria-label="First name"
                    className="flex-1 px-5 py-3.5 rounded-full bg-white/10 border border-white/20 text-white placeholder-white/35 focus:outline-none focus:border-gold-400 transition-colors text-sm" />
                  <input type="email" placeholder="Email Address" value={email} onChange={e=>setEmail(e.target.value)} required aria-label="Email address"
                    className="flex-1 px-5 py-3.5 rounded-full bg-white/10 border border-white/20 text-white placeholder-white/35 focus:outline-none focus:border-gold-400 transition-colors text-sm" />
                </div>
                <button type="submit" className="w-full py-4 bg-gold-500 hover:bg-gold-400 text-navy-800 font-bold rounded-full transition-all duration-300 shadow-gold hover:-translate-y-0.5 text-[0.9rem]">
                  Send Me The Free Sample
                </button>
                <p className="text-white/30 text-xs">No spam. Just scripture. Unsubscribe anytime.</p>
              </form>
            )}
          </ScrollReveal>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          CLOSING SCRIPTURE
      ══════════════════════════════════════════════ */}
      <section className="py-24 bg-[#FAF8F3] text-center" aria-label="Closing scripture">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <ScrollReveal>
            <div className="gold-divider mx-auto mb-10" aria-hidden="true" />
            <p className="font-cormorant text-4xl md:text-5xl lg:text-6xl text-navy-700 italic leading-tight scripture-glow">
              &ldquo;The Word became flesh and made His dwelling among us.&rdquo;
            </p>
            <p className="mt-5 text-gold-600 text-[0.72rem] font-semibold tracking-[0.18em] uppercase">John 1:14</p>
            <div className="gold-divider mx-auto mt-10" aria-hidden="true" />
          </ScrollReveal>
        </div>
      </section>

    </div>
  );
}
