'use client';

import { useState } from 'react';
import { Heart, Globe, Shield, Users, BookOpen, Sunrise, Check } from 'lucide-react';
import ScrollReveal from '@/components/ScrollReveal';
import { insertPrayerPartner } from '@/lib/supabase';

const focusAreas = [
  { icon: BookOpen, title: 'The Word Going Forth',          desc: "Pray that the devotionals would not merely be read, but experienced as living encounters with Jesus. That every page would carry the weight of the Holy Spirit.", refs: ['Isaiah 55:11','Hebrews 4:12'] },
  { icon: Users,    title: 'Families Encountering Together', desc: "Intercede for families using the devotionals—that parents and children would grow closer to each other and to Jesus through shared scripture.", refs: ['Deuteronomy 6:6-7','Psalm 78:4'] },
  { icon: Globe,    title: 'Global Reach',                  desc: "Pray for In Him Daily to reach families across every nation, tribe, and tongue—that the message of Jesus would cross every barrier.", refs: ['Matthew 28:19-20','Revelation 7:9'] },
  { icon: Shield,   title: 'Protection for the Ministry',   desc: "Cover the ministry in prayer against every spiritual opposition. Pray for wisdom, discernment, and the grace to steward this calling faithfully.", refs: ['Psalm 91:1-4','Ephesians 6:10-12'] },
  { icon: Heart,    title: 'Writers and Creators',          desc: "Pray for the writers behind every devotional—that they would write from genuine encounter with Jesus and deep wells of His presence.", refs: ['Psalm 45:1','2 Timothy 2:15'] },
  { icon: Sunrise,  title: 'Next Generation Encounter',     desc: "Intercede specifically for children and teenagers—that this generation would encounter Jesus early and carry that encounter throughout their lives.", refs: ['Proverbs 22:6','Psalm 22:31'] },
];

const monthly = [
  { week:'Week 1', focus:'The Word and Its Power',  prayer:'Pray for the scriptures in each devotional to produce genuine transformation in readers.' },
  { week:'Week 2', focus:'Families',                prayer:'Intercede for specific families—known and unknown—who are using In Him Daily together.' },
  { week:'Week 3', focus:'Expansion',               prayer:'Pray for the gospel of Jesus to reach new families through the devotionals.' },
  { week:'Week 4', focus:'The Ministry',            prayer:'Cover the team, resources, and future direction of In Him Daily in prayer.' },
];

export default function PrayerPartnersClient() {
  const [submitted, setSubmitted] = useState(false);
  const [name, setName]           = useState('');
  const [email, setEmail]         = useState('');
  const [formError, setFormError] = useState('');

  return (
    <div className="overflow-x-hidden">

      {/* Hero */}
      <section className="relative pt-32 pb-24 bg-navy-700 overflow-hidden" aria-label="Prayer partners hero">
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true"
          style={{ background: 'radial-gradient(ellipse 55% 45% at 50% 75%, rgba(201,152,58,0.11) 0%, transparent 70%)' }} />
        <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-gold-400 text-[0.72rem] font-semibold tracking-[0.16em] uppercase mb-4">Intercession</p>
          <h1 className="font-playfair text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-8 leading-tight">Prayer Partners</h1>
          <p className="font-cormorant text-2xl text-gold-200 italic leading-relaxed mb-3">
            &ldquo;The effective, fervent prayer of a righteous man avails much.&rdquo;
          </p>
          <p className="text-gold-500 text-[0.72rem] tracking-[0.18em] uppercase">James 5:16</p>
        </div>
      </section>

      {/* Why prayer */}
      <section className="py-24 bg-[#FAF8F3]" aria-labelledby="why-prayer-heading">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-14 items-center">
            <ScrollReveal>
              <div>
                <p className="text-gold-600 text-[0.72rem] font-semibold tracking-[0.16em] uppercase mb-4">Why Prayer Matters</p>
                <h2 id="why-prayer-heading" className="font-playfair text-3xl md:text-4xl font-bold text-navy-700 mb-6 leading-snug">
                  Every Movement Needs Intercessors
                </h2>
                <div className="space-y-4 text-[#6B6B6B] leading-relaxed text-[0.95rem]">
                  <p>In Him Daily is more than a devotional ministry. It is a spiritual movement—one that seeks to restore generational unity in encountering Jesus. And every movement needs people who pray.</p>
                  <p>Prayer partners are the hidden engine behind what In Him Daily does. They stand in the gap for families we have never met. They intercede for children who are encountering Jesus for the first time.</p>
                  <p>If you feel called to pray—this is your place. We believe the prayers of the intercessors carry as much weight as the words on the page.</p>
                </div>
              </div>
            </ScrollReveal>
            <ScrollReveal delay={140}>
              <div className="relative">
                <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-card-hover">
                  <img src="https://images.pexels.com/photos/3991842/pexels-photo-3991842.jpeg?auto=compress&cs=tinysrgb&w=700"
                    alt="Hands open in prayer over scripture" loading="lazy" decoding="async" className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy-800/35 to-transparent" aria-hidden="true" />
                </div>
                <div className="absolute -bottom-5 -left-5 p-5 bg-navy-700 rounded-2xl shadow-navy hidden md:block max-w-[190px]">
                  <p className="font-cormorant text-gold-200 italic text-lg leading-snug">&ldquo;Your prayers shape what families receive.&rdquo;</p>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Focus areas */}
      <section className="py-24 bg-ivory-200" aria-labelledby="focus-heading">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal className="text-center mb-14">
            <p className="text-gold-600 text-[0.72rem] font-semibold tracking-[0.16em] uppercase mb-3">Intercession Guide</p>
            <h2 id="focus-heading" className="font-playfair text-3xl md:text-4xl lg:text-5xl font-bold text-navy-700 mb-4">Prayer Focus Areas</h2>
            <p className="text-[#6B6B6B] text-lg max-w-xl mx-auto">Specific areas where your intercession makes a direct impact.</p>
          </ScrollReveal>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {focusAreas.map((a,i)=>(
              <ScrollReveal key={i} delay={i*70}>
                <div className="premium-card p-7 bg-white rounded-2xl border border-ivory-300 shadow-sm h-full">
                  <div className="w-12 h-12 rounded-xl bg-gold-50 border border-gold-200 flex items-center justify-center mb-5">
                    <a.icon size={21} className="text-gold-600" aria-hidden="true" />
                  </div>
                  <h3 className="font-playfair text-lg font-bold text-navy-700 mb-3">{a.title}</h3>
                  <p className="text-[#6B6B6B] text-sm leading-relaxed mb-4">{a.desc}</p>
                  <div className="flex gap-2 flex-wrap">
                    {a.refs.map((r,j)=>(
                      <span key={j} className="text-[0.68rem] bg-gold-50 text-gold-700 border border-gold-200 px-2.5 py-1 rounded-full font-medium">{r}</span>
                    ))}
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Monthly rhythm */}
      <section className="py-24 bg-navy-700" aria-labelledby="monthly-heading">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal className="text-center mb-14">
            <p className="text-gold-400 text-[0.72rem] font-semibold tracking-[0.16em] uppercase mb-3">Monthly Rhythm</p>
            <h2 id="monthly-heading" className="font-playfair text-3xl md:text-4xl lg:text-5xl font-bold text-white">Monthly Prayer Focus</h2>
          </ScrollReveal>
          <div className="grid sm:grid-cols-2 gap-5 mb-12">
            {monthly.map((m,i)=>(
              <ScrollReveal key={i} delay={i*80}>
                <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-8 h-8 rounded-lg bg-gold-400/20 flex items-center justify-center">
                      <span className="text-gold-300 text-[0.72rem] font-bold">{String(i+1).padStart(2,'0')}</span>
                    </div>
                    <span className="text-gold-300 text-sm font-semibold">{m.week}</span>
                  </div>
                  <h3 className="font-playfair text-lg font-bold text-white mb-2">{m.focus}</h3>
                  <p className="text-white/55 text-sm leading-relaxed">{m.prayer}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
          <ScrollReveal>
            <div className="p-8 rounded-2xl bg-gold-400/10 border border-gold-400/20 text-center">
              <p className="font-cormorant text-2xl text-gold-200 italic leading-relaxed mb-3">
                &ldquo;If my people, who are called by my name, will humble themselves and pray and seek my face… then I will hear from heaven.&rdquo;
              </p>
              <span className="text-gold-500 text-[0.72rem] font-semibold tracking-wider">2 Chronicles 7:14</span>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Join form */}
      <section className="py-24 bg-[#FAF8F3]" aria-labelledby="join-heading">
        <div className="max-w-xl mx-auto px-4 sm:px-6 text-center">
          <ScrollReveal>
            <p className="text-gold-600 text-[0.72rem] font-semibold tracking-[0.16em] uppercase mb-4">Get Involved</p>
            <h2 id="join-heading" className="font-playfair text-4xl font-bold text-navy-700 mb-4">Join the Prayer Team</h2>
            <p className="text-[#6B6B6B] text-lg mb-10">Receive monthly prayer guides and specific intercession requests delivered to your inbox.</p>

            {submitted ? (
              <div className="p-8 rounded-2xl bg-gold-50 border border-gold-200 animate-fade-in">
                <div className="w-11 h-11 rounded-full bg-gold-100 flex items-center justify-center mx-auto mb-4">
                  <Check size={22} className="text-gold-600" aria-hidden="true" />
                </div>
                <h3 className="font-playfair text-2xl font-bold text-navy-700 mb-2">Welcome to the Team!</h3>
                <p className="text-[#6B6B6B]">Thank you, {name}. Your prayers are powerful and we are grateful to have you interceding with us.</p>
              </div>
            ) : (
              <form onSubmit={async (e)=>{ e.preventDefault(); if(!name||!email) return; try { await insertPrayerPartner({name,email}); setSubmitted(true); } catch { setFormError('Something went wrong. Please try again.'); } }} className="space-y-3.5 text-left" noValidate>
                <input type="text" placeholder="Your Name" value={name} onChange={e=>setName(e.target.value)} required aria-label="Your name"
                  className="w-full px-5 py-3.5 rounded-full bg-white border border-ivory-300 text-navy-700 placeholder-navy-300 focus:outline-none focus:border-gold-400 transition-colors text-sm" />
                <input type="email" placeholder="Email Address" value={email} onChange={e=>setEmail(e.target.value)} required aria-label="Email address"
                  className="w-full px-5 py-3.5 rounded-full bg-white border border-ivory-300 text-navy-700 placeholder-navy-300 focus:outline-none focus:border-gold-400 transition-colors text-sm" />
                <button type="submit" className="w-full py-4 bg-navy-700 hover:bg-navy-600 text-white font-bold rounded-full transition-all duration-300 hover:-translate-y-0.5">
                  Join the Prayer Team
                </button>
                {formError && <p className="text-red-500 text-xs text-center">{formError}</p>}
                <p className="text-center text-[#6B6B6B]/50 text-xs">Monthly updates. Unsubscribe anytime.</p>
              </form>
            )}
          </ScrollReveal>
        </div>
      </section>

      <section className="py-14 bg-[#FAF8F3] text-center" aria-label="Closing scripture">
        <div className="max-w-xl mx-auto px-4">
          <ScrollReveal>
            <div className="gold-divider mx-auto mb-7" aria-hidden="true" />
            <p className="font-cormorant text-3xl text-navy-700 italic leading-relaxed">
              &ldquo;Devote yourselves to prayer, being watchful and thankful.&rdquo;
            </p>
            <p className="text-gold-600 text-[0.72rem] font-semibold mt-3 tracking-[0.18em] uppercase">Colossians 4:2</p>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}
