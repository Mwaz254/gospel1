'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowRight, Check, BookOpen, ChevronLeft, ChevronRight as ChevronRightIcon, Star } from 'lucide-react';
import ScrollReveal from '@/components/ScrollReveal';

type EditionType = 'adult' | 'teen' | 'children';

const sampleContent: Record<EditionType, {
  label: string;
  color: string;
  headerColor: string;
  headerText: string;
  day: string;
  name: string;
  scripture: { reference: string; text: string };
  title: string;
  content: string[];
  reflection: string;
  prayer: string;
  confession: string;
}> = {
  adult: {
    label: 'Adult Edition',
    color: 'bg-white',
    headerColor: 'bg-midnight-700',
    headerText: 'text-ivory-100',
    day: 'Day 1',
    name: 'The Word',
    scripture: {
      reference: 'John 1:1',
      text: '"In the beginning was the Word, and the Word was with God, and the Word was God."',
    },
    title: 'Before All Things',
    content: [
      'The opening words of John\'s Gospel are among the most profound in all of Scripture. Before time began, before creation burst into existence, before the first syllable of human language was ever spoken—the Word already was.',
      'The Greek word John uses is Logos—a term that carried enormous weight in both Jewish and Greek thought. For the Jewish reader, the Word evoked the creative voice of God that called all things into being. For the Greek philosopher, Logos represented the rational principle behind all reality.',
      'John takes both meanings and transcends them: the Word is not a concept or a principle. The Word is a Person. And that Person became flesh and dwelt among us.',
      'This is your invitation today: to encounter Jesus not merely as a historical figure or a moral teacher, but as the One who was before all things, through whom all things were made, and in whom all things hold together.',
    ],
    reflection: 'What does it mean to you personally that Jesus existed before all things? How does that change the way you approach Him in prayer and devotion today?',
    prayer: 'Lord Jesus, You are the Word made flesh. Before the foundations of the earth were laid, You were. Help me to encounter You today not as a concept but as the living Person You are. Let my life be a reflection of Your eternal nature.',
    confession: 'I declare that Jesus is the Word of God, eternal and unchanging. He was before all things, and through Him all things were made. He is the same yesterday, today, and forever, and I put my trust in Him.',
  },
  teen: {
    label: 'Teen Edition',
    color: 'bg-white',
    headerColor: 'bg-gold-400',
    headerText: 'text-midnight-700',
    day: 'Day 1',
    name: 'The Word',
    scripture: {
      reference: 'John 1:1',
      text: '"In the beginning was the Word, and the Word was with God, and the Word was God."',
    },
    title: 'He Was Already There',
    content: [
      'Before Netflix. Before TikTok. Before your school, your city, your country, this planet, the solar system, the galaxy, the universe itself—Jesus was already there.',
      'That\'s what John is saying in one sentence: "In the beginning was the Word." Before anything began, He was already present. Already existing. Already God.',
      'This might feel abstract at first. But here\'s why it matters for your life right now: the Jesus you\'re encountering today isn\'t someone who just showed up 2,000 years ago. He\'s eternal. He has always existed. And He has always known about you.',
      'That means when you feel like no one really sees you—He does. When you feel like your story doesn\'t matter—it does, to Him, and He\'s been aware of it before you were born.',
    ],
    reflection: 'Does it feel weird or comforting to think about Jesus knowing about you before you were born? Why do you think that is? How does it change the way you think about prayer?',
    prayer: 'Jesus, it\'s kind of mind-blowing that You were there before everything. Thank You for being eternal and for knowing me before I even knew myself. Help me to trust that You\'ve always had a plan for my life.',
    confession: 'Jesus existed before everything, and He knows me completely. I am not an accident or an afterthought—I am known and loved by an eternal God.',
  },
  children: {
    label: "Children's Edition",
    color: 'bg-white',
    headerColor: 'bg-lavender-100',
    headerText: 'text-midnight-700',
    day: 'Day 1',
    name: 'The Word',
    scripture: {
      reference: 'John 1:1',
      text: '"In the beginning was the Word, and the Word was with God, and the Word was God."',
    },
    title: 'Jesus Was There First!',
    content: [
      'Do you know what was there before everything? Before the stars and the sun and the moon? Before the animals and the oceans and the mountains?',
      'Jesus was!',
      'The Bible says that Jesus is called "the Word." That\'s a special name that means He is how God speaks to us and loves us. Before anything in the whole wide world was made, Jesus was already there with God.',
      'That means Jesus is the most amazing, powerful, and wonderful Person ever. He didn\'t just appear—He has always been! And the coolest part? This amazing, always-was, always-will-be Jesus loves YOU and wants to be your friend every single day.',
    ],
    reflection: 'If Jesus has always been there—even before the stars were made—what do you think that means about how powerful He is? Draw a picture of Jesus in the beginning before anything was made!',
    prayer: 'Dear Jesus, thank You for always being there. Even before the whole world was made, You were already there. I\'m so glad You\'re my friend. Amen!',
    confession: 'Jesus has always been there, and He is always with me. He is bigger than anything I could ever face!',
  },
};

export default function FreeSamplePage() {
  const [activeTab, setActiveTab] = useState<EditionType>('adult');
  const [emailSubmitted, setEmailSubmitted] = useState(false);
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');

  const content = sampleContent[activeTab];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email && firstName) setEmailSubmitted(true);
  };

  return (
    <div className="overflow-hidden">
      {/* Hero */}
      <section className="relative pt-32 pb-16 bg-midnight-700 overflow-hidden">
        <div className="absolute inset-0" style={{
          background: 'radial-gradient(ellipse 60% 50% at 50% 70%, rgba(214, 166, 74, 0.1) 0%, transparent 70%)'
        }} />
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-gold-400 text-sm font-semibold tracking-widest uppercase mb-4">Free 7-Day Sample</p>
          <h1 className="font-playfair text-5xl md:text-6xl font-bold text-ivory-100 mb-6 leading-tight">
            Experience In Him Daily
            <br />
            <span className="text-gold-gradient">For Free</span>
          </h1>
          <p className="text-ivory-300/80 text-lg max-w-2xl mx-auto leading-relaxed mb-10">
            Read actual pages from all three editions. See how the same scripture speaks uniquely to adults, teens, and children—then get your free 7-day sample delivered to your inbox.
          </p>
          <div className="flex items-center justify-center gap-6 text-sm text-ivory-300/60">
            {['Adult Edition', 'Teen Edition', "Children's Edition"].map((e, i) => (
              <div key={i} className="flex items-center gap-2">
                <Check size={14} className="text-gold-400" /> {e}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Sample Reader */}
      <section className="py-20 bg-ivory">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal className="mb-10">
            <div className="flex justify-center gap-2">
              {(['adult', 'teen', 'children'] as EditionType[]).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 ${
                    activeTab === tab
                      ? 'bg-midnight-700 text-ivory-100 shadow-md'
                      : 'bg-white text-midnight-600 border border-ivory-400 hover:border-gold-300'
                  }`}
                >
                  {tab === 'adult' ? 'Adult' : tab === 'teen' ? 'Teen' : "Children's"}
                </button>
              ))}
            </div>
          </ScrollReveal>

          {/* Book-style reader */}
          <ScrollReveal>
            <div className="max-w-2xl mx-auto">
              <div className="rounded-2xl overflow-hidden shadow-card-hover border border-ivory-400 transition-all duration-500">
                {/* Book header */}
                <div className={`${content.headerColor} px-8 py-5 flex items-center justify-between`}>
                  <div>
                    <p className={`text-xs font-bold tracking-widest uppercase ${content.headerText} opacity-70`}>
                      In Him Daily · {content.label}
                    </p>
                    <p className={`font-playfair text-xl font-bold ${content.headerText} mt-1`}>
                      {content.day} · {content.name}
                    </p>
                  </div>
                  <BookOpen size={24} className={`${content.headerText} opacity-50`} />
                </div>

                {/* Scripture */}
                <div className="px-8 py-6 bg-ivory-200 border-b border-ivory-400">
                  <p className="font-cormorant text-xl italic text-midnight-700 leading-relaxed">
                    {content.scripture.text}
                  </p>
                  <p className="text-gold-500 text-sm font-semibold mt-2">{content.scripture.reference}</p>
                </div>

                {/* Content */}
                <div className="px-8 py-8 bg-white">
                  <h2 className="font-playfair text-2xl font-bold text-midnight-700 mb-6">{content.title}</h2>

                  <div className="space-y-4 mb-8">
                    {content.content.map((para, i) => (
                      <p key={i} className="text-[#1E1E1E]/70 text-sm leading-relaxed">{para}</p>
                    ))}
                  </div>

                  {/* Reflection */}
                  <div className="p-5 rounded-xl bg-ivory-200 border-l-4 border-gold-400 mb-4">
                    <p className="text-xs font-bold text-gold-600 uppercase tracking-wider mb-2">Reflection</p>
                    <p className="text-sm text-midnight-700 italic">{content.reflection}</p>
                  </div>

                  {/* Prayer */}
                  <div className="p-5 rounded-xl bg-midnight-700/5 border-l-4 border-midnight-500 mb-4">
                    <p className="text-xs font-bold text-midnight-500 uppercase tracking-wider mb-2">Daily Prayer</p>
                    <p className="text-sm text-midnight-700 italic">{content.prayer}</p>
                  </div>

                  {/* Confession */}
                  <div className="p-5 rounded-xl bg-gold-50 border border-gold-200">
                    <p className="text-xs font-bold text-gold-600 uppercase tracking-wider mb-2">Daily Confession</p>
                    <p className="text-sm text-midnight-700 font-medium">{content.confession}</p>
                  </div>
                </div>

                {/* Footer */}
                <div className="px-8 py-4 bg-ivory-200 border-t border-ivory-400 flex items-center justify-between">
                  <span className="text-xs text-midnight-400">Day 1 of 120</span>
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={12} className="text-gold-400 fill-gold-400" />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Email capture */}
      <section className="py-24 bg-midnight-700 relative overflow-hidden">
        <div className="absolute inset-0" style={{
          background: 'radial-gradient(ellipse 60% 50% at 50% 50%, rgba(214, 166, 74, 0.08) 0%, transparent 70%)'
        }} />
        <div className="relative z-10 max-w-xl mx-auto px-4 sm:px-6 text-center">
          <ScrollReveal>
            <p className="text-gold-400 text-sm font-semibold tracking-widest uppercase mb-4">Get the Full Sample</p>
            <h2 className="font-playfair text-4xl md:text-5xl font-bold text-ivory-100 mb-4">
              Your Free 7-Day Journey Awaits
            </h2>
            <p className="text-ivory-300/70 mb-10 text-lg">
              Receive 7 complete days—all three editions—delivered to your inbox. Free, no strings attached.
            </p>

            {emailSubmitted ? (
              <div className="p-8 rounded-2xl bg-gold-400/15 border border-gold-400/30 animate-fade-in">
                <div className="w-12 h-12 rounded-full bg-gold-400/30 flex items-center justify-center mx-auto mb-4">
                  <Check size={24} className="text-gold-300" />
                </div>
                <h3 className="font-playfair text-2xl font-bold text-ivory-100 mb-2">It's On Its Way!</h3>
                <p className="text-ivory-300/70">
                  Welcome, {firstName}! Check your inbox for your free 7-day sample from In Him Daily.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <input
                  type="text"
                  placeholder="First Name"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  required
                  className="w-full px-5 py-4 rounded-full bg-midnight-600 border border-midnight-500 text-ivory-100 placeholder-ivory-400/50 focus:outline-none focus:border-gold-400 transition-colors text-sm"
                />
                <input
                  type="email"
                  placeholder="Email Address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full px-5 py-4 rounded-full bg-midnight-600 border border-midnight-500 text-ivory-100 placeholder-ivory-400/50 focus:outline-none focus:border-gold-400 transition-colors text-sm"
                />
                <button
                  type="submit"
                  className="w-full py-4 bg-gold-400 hover:bg-gold-300 text-midnight-700 font-bold rounded-full transition-all duration-300 shadow-gold hover:-translate-y-0.5"
                >
                  Send Me The Free Sample
                </button>
                <p className="text-ivory-400/50 text-xs">No spam. Just scripture. Unsubscribe anytime.</p>
              </form>
            )}
          </ScrollReveal>
        </div>
      </section>

      {/* Closing scripture */}
      <section className="py-16 bg-ivory text-center">
        <div className="max-w-2xl mx-auto px-4">
          <ScrollReveal>
            <div className="gold-divider mx-auto mb-8" />
            <p className="font-cormorant text-3xl text-midnight-700 italic leading-relaxed">
              &ldquo;Your word is a lamp to my feet and a light to my path.&rdquo;
            </p>
            <p className="text-gold-500 text-sm font-semibold mt-3 tracking-widest uppercase">Psalm 119:105</p>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}
