import { Link } from 'react-router-dom';
import { ArrowRight, Heart, Globe, BookOpen, Users, Cross, Church, Crown } from 'lucide-react';
import ScrollReveal from '@/components/ScrollReveal';

const beliefs = [
  { icon: BookOpen, title: 'Scripture Is Alive', text: "We believe the Word of God is living and active, able to speak to a grandmother and her granddaughter in the same moment through the same verse." },
  { icon: Users,    title: 'Family Is Sacred',   text: "The family unit is God's primary vehicle for discipleship. When families encounter Jesus together, generations are transformed." },
  { icon: Heart,    title: 'Every Voice Matters', text: "A child's faith is not lesser than an adult's. Each generation brings something unique and beautiful to the encounter with Jesus." },
  { icon: Globe,    title: 'One Body, One Word',  text: "The Church is one family across all ages. When we read the same scripture, we stand as one body before one Lord." },
];

export default function AboutPage() {
  return (
    <div className="overflow-x-hidden">

      {/* Hero */}
      <section className="relative pt-32 pb-24 bg-navy-700 overflow-hidden" aria-label="About hero">
        <div className="absolute inset-0 bg-cover bg-center" aria-hidden="true" style={{ backgroundImage: "url('https://images.pexels.com/photos/1111319/pexels-photo-1111319.jpeg?auto=compress&cs=tinysrgb&w=1920')", opacity: 0.2 }} />
        <div className="absolute inset-0" aria-hidden="true" style={{ background: 'linear-gradient(180deg, rgba(14,32,53,0.78) 0%, rgba(14,32,53,0.92) 100%)' }} />
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true"
          style={{ background: 'radial-gradient(ellipse 55% 45% at 50% 75%, rgba(201,152,58,0.11) 0%, transparent 70%)' }} />
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-gold-400 text-[0.72rem] font-semibold tracking-[0.16em] uppercase mb-4">Our Story</p>
          <h1 className="font-playfair text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
            How In Him Daily Began
          </h1>
          <p className="text-white/65 text-xl max-w-2xl mx-auto leading-relaxed">
            A vision born from a simple, powerful question: What if every generation in a family could encounter Jesus together—on the same day, through the same scripture?
          </p>
          <p className="font-cormorant text-lg text-gold-200 italic mt-4 max-w-xl mx-auto">
            &ldquo;For you died, and your life is now hidden with Christ in God.&rdquo;
          </p>
          <p className="text-gold-400 text-[0.72rem] font-semibold tracking-[0.16em] uppercase mt-1">Colossians 3:3</p>
        </div>
      </section>

      {/* Origin Story */}
      <section className="py-24 ih-section" aria-labelledby="origin-heading">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-14 items-center">
            <ScrollReveal>
              <div className="relative">
                <div className="aspect-square rounded-2xl overflow-hidden shadow-card-hover">
                  <img src="https://images.pexels.com/photos/1166473/pexels-photo-1166473.jpeg?auto=compress&cs=tinysrgb&w=700"
                    alt="Family reading the Bible together" loading="lazy" decoding="async"
                    className="w-full h-full object-cover" />
                </div>
                <div className="absolute -bottom-5 -right-5 p-5 ih-card hidden md:block">
                  <p className="font-cormorant text-xl text-gold-200 italic">&ldquo;Three generations.<br />One Jesus.&rdquo;</p>
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={140}>
              <div>
                <div className="gold-divider mb-8" aria-hidden="true" />
                <h2 id="origin-heading" className="font-playfair text-3xl md:text-4xl font-bold text-white mb-6 leading-snug">
                  The Need for a Three-Generation Devotional
                </h2>
                <div className="space-y-4 text-white/65 leading-relaxed text-[0.95rem]">
                  <p>For years, Christian families have faithfully pursued personal devotion. Yet a quiet fragmentation has occurred—adults reading commentary, teenagers scrolling youth apps, children looking at picture Bibles. The same family. The same faith. But entirely separate encounters with Jesus.</p>
                  <p>In Him Daily was created to bridge this gap. Not by simplifying scripture to the lowest common denominator, but by presenting the same truth in three different voices—each deeply crafted to meet its reader exactly where they are.</p>
                  <p>The result is remarkable: families who sit at dinner and discover they were all reading about the same thing. Children who ask parents about the reflection question. Grandparents who call their grandchildren to talk about the devotional they read.</p>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* What We Believe */}
      <section className="py-24 ih-section" aria-labelledby="beliefs-heading">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal className="text-center mb-14">
            <p className="ih-eyebrow mb-3">Our Foundation</p>
            <h2 id="beliefs-heading" className="font-playfair text-3xl md:text-4xl lg:text-5xl font-bold text-white">What We Believe</h2>
          </ScrollReveal>
          <div className="grid sm:grid-cols-2 gap-6">
            {beliefs.map((b, i) => (
              <ScrollReveal key={i} delay={i * 90}>
                <div className="premium-card p-7 rounded-2xl ih-card h-full">
                  <div className="w-12 h-12 rounded-xl bg-gold-400/10 border border-gold-400/30 flex items-center justify-center mb-5">
                    <b.icon size={21} className="text-gold-300" aria-hidden="true" />
                  </div>
                  <h3 className="font-playfair text-lg font-bold text-white mb-3">{b.title}</h3>
                  <p className="text-white/60 text-sm leading-relaxed">{b.text}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* The Vision */}
      <section className="py-24 bg-navy-700 relative overflow-hidden" aria-labelledby="vision-heading">
        <div className="absolute inset-0 bg-cover bg-center" aria-hidden="true" style={{ backgroundImage: "url('https://images.pexels.com/photos/415571/pexels-photo-415571.jpeg?auto=compress&cs=tinysrgb&w=1920')", opacity: 0.15 }} />
        <div className="absolute inset-0" aria-hidden="true" style={{ background: 'linear-gradient(180deg, rgba(14,32,53,0.82) 0%, rgba(14,32,53,0.92) 100%)' }} />
        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal className="text-center mb-14">
            <p className="text-gold-400 text-[0.72rem] font-semibold tracking-[0.16em] uppercase mb-3">The Vision</p>
            <h2 id="vision-heading" className="font-playfair text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">A Movement, Not Just a Ministry</h2>
          </ScrollReveal>
          <div className="grid md:grid-cols-3 gap-5 mb-14">
            {[
              { number:'240+', label:'Days of Content', sub:'Across two complete series' },
              { number:'3',    label:'Generational Voices', sub:'Adult, Teen, Children' },
              { number:'1',    label:'Shared Encounter', sub:'One Jesus, every family' },
            ].map((s,i)=>(
              <ScrollReveal key={i} delay={i*90}>
                <div className="text-center p-8 rounded-2xl bg-white/5 border border-white/10">
                  <p className="font-playfair text-5xl font-bold text-gold-300 mb-2">{s.number}</p>
                  <p className="text-white font-semibold text-lg mb-1">{s.label}</p>
                  <p className="text-white/45 text-sm">{s.sub}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
          <ScrollReveal className="max-w-2xl mx-auto text-center">
            <p className="font-cormorant text-2xl text-white/85 italic leading-relaxed mb-8">
              &ldquo;We believe a generation that encounters Jesus together will stand together. We are building devotional tools to make that encounter possible—for every family, in every season.&rdquo;
            </p>
            <div className="gold-divider mx-auto" aria-hidden="true" />
          </ScrollReveal>
        </div>
      </section>

      {/* Statement of Faith */}
      <section className="py-24 ih-section" aria-labelledby="faith-heading">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal className="text-center mb-14">
            <div className="w-12 h-12 mx-auto mb-5 rounded-xl bg-gold-400/10 border border-gold-400/30 flex items-center justify-center">
              <Cross size={22} className="text-gold-300" aria-hidden="true" />
            </div>
            <p className="ih-eyebrow mb-3">Our Statement of Faith</p>
            <h2 id="faith-heading" className="font-playfair text-3xl md:text-4xl font-bold text-white">What We Believe</h2>
          </ScrollReveal>
          <div className="grid sm:grid-cols-2 gap-5">
            {[
              { title: 'The Scriptures', desc: 'We believe the Bible is the inspired, infallible, and authoritative Word of God — living, active, and sufficient for every dimension of life and faith.' },
              { title: 'The Trinity', desc: 'We believe in one God eternally existing in three persons: Father, Son, and Holy Spirit — equal in power, glory, and majesty.' },
              { title: 'Jesus Christ', desc: 'We believe Jesus is the Son of God — fully God and fully man, born of a virgin, crucified for our sins, risen on the third day, and coming again in glory.' },
              { title: 'Salvation', desc: 'We believe salvation is by grace alone, through faith alone, in Christ alone. No one is too far, too broken, or too ordinary for His grace.' },
              { title: 'The Holy Spirit', desc: 'We believe the Holy Spirit indwells, transforms, empowers, and guides every believer into a daily, living encounter with Jesus.' },
              { title: 'The Family', desc: 'We believe the family is the first and most powerful place of discipleship — and that every generation deserves to encounter Jesus at full depth.' },
            ].map((item, i) => (
              <ScrollReveal key={i} delay={i * 60}>
                <div className="p-6 rounded-2xl ih-card-solid h-full">
                  <h3 className="font-playfair text-lg font-bold text-white mb-2">{item.title}</h3>
                  <p className="text-white/60 text-sm leading-relaxed">{item.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Leadership */}
      <section className="py-24 ih-section" aria-labelledby="leadership-heading">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal className="text-center mb-14">
            <div className="w-12 h-12 mx-auto mb-5 rounded-xl bg-gold-400/10 border border-gold-400/30 flex items-center justify-center">
              <Crown size={22} className="text-gold-300" aria-hidden="true" />
            </div>
            <p className="ih-eyebrow mb-3">Our Leadership</p>
            <h2 id="leadership-heading" className="font-playfair text-3xl md:text-4xl font-bold text-white">The Team Behind In Him Daily</h2>
          </ScrollReveal>
          <div className="grid sm:grid-cols-3 gap-6">
            {[
              { name: 'Founder & Lead Writer', role: 'Vision & Theological Direction', desc: 'A pastor with over 15 years of ministry experience, called to help families encounter Jesus through His Word daily.' },
              { name: 'Teen Edition Writer', role: 'Youth Content', desc: 'A youth minister passionate about making scripture real, honest, and accessible for teenagers without talking down to them.' },
              { name: "Children's Edition Writer", role: 'Kids Content', desc: 'An educator and parent who crafts wonder-filled, story-rich devotionals that help children meet Jesus naturally.' },
            ].map((person, i) => (
              <ScrollReveal key={i} delay={i * 80}>
                <div className="p-6 rounded-2xl ih-card-solid text-center h-full">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gold-400/10 border border-gold-400/30 flex items-center justify-center">
                    <Church size={24} className="text-gold-300" aria-hidden="true" />
                  </div>
                  <h3 className="font-playfair text-base font-bold text-white mb-1">{person.name}</h3>
                  <p className="text-gold-300 text-xs font-semibold mb-3">{person.role}</p>
                  <p className="text-white/55 text-sm leading-relaxed">{person.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
          <ScrollReveal className="text-center mt-10">
            <p className="text-white/55 text-sm">
              Have a question about our ministry?{' '}
              <Link to="/contact" className="text-gold-300 font-semibold hover:text-gold-200 transition-colors">
                Contact us
              </Link>
              {' '}— we&apos;d love to hear from you.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 ih-section text-center" aria-label="Call to action">
        <div className="max-w-xl mx-auto px-4">
          <ScrollReveal>
            <h2 className="font-playfair text-3xl font-bold text-white mb-4">Join the Movement</h2>
            <p className="text-white/55 mb-8">Begin your family's journey with a free 7-day sample devotional.</p>
            <Link to="/free-sample" className="inline-flex items-center gap-2 px-8 py-4 ih-btn-gold">
              Get Free Sample <ArrowRight size={17} aria-hidden="true" />
            </Link>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}
