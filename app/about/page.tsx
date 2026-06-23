'use client';

import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Heart, Globe, BookOpen, Users } from 'lucide-react';
import ScrollReveal from '@/components/ScrollReveal';

const beliefs = [
  {
    icon: BookOpen,
    title: 'Scripture Is Alive',
    text: 'We believe the Word of God is living and active, able to speak to a grandmother and her granddaughter in the same moment through the same verse.',
  },
  {
    icon: Users,
    title: 'Family Is Sacred',
    text: 'The family unit is God\'s primary vehicle for discipleship. When families encounter Jesus together, generations are transformed.',
  },
  {
    icon: Heart,
    title: 'Every Voice Matters',
    text: 'A child\'s faith is not lesser than an adult\'s. Each generation brings something unique and beautiful to the encounter with Jesus.',
  },
  {
    icon: Globe,
    title: 'One Body, One Word',
    text: 'The Church is one family across all ages. When we read the same scripture, we stand as one body before one Lord.',
  },
];

export default function AboutPage() {
  return (
    <div className="overflow-hidden">
      {/* Hero */}
      <section className="relative pt-32 pb-24 bg-midnight-700 overflow-hidden">
        <div className="absolute inset-0" style={{
          background: 'radial-gradient(ellipse 60% 50% at 50% 70%, rgba(214, 166, 74, 0.1) 0%, transparent 70%)'
        }} />
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-gold-400 text-sm font-semibold tracking-widest uppercase mb-4">Our Story</p>
          <h1 className="font-playfair text-5xl md:text-6xl font-bold text-ivory-100 mb-6 leading-tight">
            How In Him Daily Began
          </h1>
          <p className="text-ivory-300/80 text-xl max-w-2xl mx-auto leading-relaxed">
            A vision born from a simple, powerful question: What if every generation in a family could encounter Jesus together—on the same day, through the same scripture?
          </p>
        </div>
      </section>

      {/* Origin Story */}
      <section className="py-24 bg-ivory">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <ScrollReveal>
              <div className="relative">
                <div className="aspect-square rounded-2xl overflow-hidden shadow-card-hover">
                  <img
                    src="https://images.pexels.com/photos/1166473/pexels-photo-1166473.jpeg?auto=compress&cs=tinysrgb&w=700"
                    alt="Family reading together"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="absolute -bottom-6 -right-6 p-5 bg-midnight-700 rounded-2xl shadow-xl hidden md:block">
                  <p className="font-cormorant text-xl text-gold-200 italic">&ldquo;Three generations.<br />One Jesus.&rdquo;</p>
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={150}>
              <div>
                <div className="gold-divider mb-8" />
                <h2 className="font-playfair text-3xl md:text-4xl font-bold text-midnight-700 mb-6 leading-snug">
                  The Need for a Three-Generation Devotional
                </h2>
                <div className="space-y-5 text-[#1E1E1E]/70 leading-relaxed">
                  <p>
                    For years, Christian families have faithfully pursued personal devotion. Yet a quiet fragmentation has occurred—adults reading commentary, teenagers scrolling youth apps, children looking at picture Bibles. The same family. The same faith. But entirely separate encounters with Jesus.
                  </p>
                  <p>
                    In Him Daily was created to bridge this gap. Not by simplifying scripture down to the lowest common denominator, but by presenting the same truth in three different voices—each deeply crafted to meet its reader exactly where they are.
                  </p>
                  <p>
                    The result is something remarkable: families who sit at dinner and discover they were all reading about the same thing. Children who ask parents about the reflection question. Grandparents who call their grandchildren to talk about the devotional they read.
                  </p>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* What We Believe */}
      <section className="py-24 bg-ivory-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal className="text-center mb-16">
            <p className="text-gold-500 text-sm font-semibold tracking-widest uppercase mb-4">Our Foundation</p>
            <h2 className="font-playfair text-4xl md:text-5xl font-bold text-midnight-700">
              What We Believe
            </h2>
          </ScrollReveal>

          <div className="grid sm:grid-cols-2 gap-6">
            {beliefs.map((belief, i) => (
              <ScrollReveal key={i} delay={i * 100}>
                <div className="premium-card p-7 bg-white rounded-2xl border border-ivory-400 shadow-sm">
                  <div className="w-12 h-12 rounded-xl bg-gold-50 border border-gold-200 flex items-center justify-center mb-5">
                    <belief.icon size={22} className="text-gold-500" />
                  </div>
                  <h3 className="font-playfair text-xl font-bold text-midnight-700 mb-3">{belief.title}</h3>
                  <p className="text-[#1E1E1E]/60 text-sm leading-relaxed">{belief.text}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* The Vision */}
      <section className="py-24 bg-midnight-700 relative overflow-hidden">
        <div className="absolute inset-0" style={{
          background: 'radial-gradient(ellipse 50% 40% at 50% 50%, rgba(214, 166, 74, 0.08) 0%, transparent 70%)'
        }} />
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal className="text-center mb-16">
            <p className="text-gold-400 text-sm font-semibold tracking-widest uppercase mb-4">The Vision</p>
            <h2 className="font-playfair text-4xl md:text-5xl font-bold text-ivory-100 mb-6">
              A Movement, Not Just a Ministry
            </h2>
          </ScrollReveal>

          <div className="grid md:grid-cols-3 gap-6 mb-16">
            {[
              { number: '240+', label: 'Days of Content', sub: 'Across two complete series' },
              { number: '3', label: 'Generational Voices', sub: 'Adult, Teen, Children' },
              { number: '1', label: 'Shared Encounter', sub: 'One Jesus, every family' },
            ].map((stat, i) => (
              <ScrollReveal key={i} delay={i * 100}>
                <div className="text-center p-8 rounded-2xl bg-midnight-600/50 border border-midnight-500">
                  <p className="font-playfair text-5xl font-bold text-gold-300 mb-2">{stat.number}</p>
                  <p className="text-ivory-100 font-semibold text-lg mb-1">{stat.label}</p>
                  <p className="text-ivory-400/70 text-sm">{stat.sub}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>

          <ScrollReveal>
            <div className="max-w-2xl mx-auto text-center">
              <p className="font-cormorant text-2xl text-ivory-200 italic leading-relaxed mb-8">
                &ldquo;We believe a generation that encounters Jesus together will stand together. We are building devotional tools to make that encounter possible—for every family, in every season.&rdquo;
              </p>
              <div className="gold-divider mx-auto" />
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-ivory text-center">
        <div className="max-w-xl mx-auto px-4">
          <ScrollReveal>
            <h2 className="font-playfair text-3xl font-bold text-midnight-700 mb-4">
              Join the Movement
            </h2>
            <p className="text-[#1E1E1E]/60 mb-8">
              Begin your family's journey with a free 7-day sample devotional.
            </p>
            <Link
              href="/free-sample"
              className="inline-flex items-center gap-2 px-8 py-4 bg-midnight-700 text-ivory-100 font-bold rounded-full hover:bg-midnight-600 transition-colors shadow-gold"
            >
              Get Free Sample <ArrowRight size={18} />
            </Link>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}
