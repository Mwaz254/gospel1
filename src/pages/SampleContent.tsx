import { useState } from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Star, ArrowRight, Check } from 'lucide-react';
import { useSEO } from '@/hooks/useSEO';
import ScrollReveal from '@/components/ScrollReveal';
import { dailyDevotionals } from '@/data/devotionals';

type Edition = 'adult' | 'teen' | 'children';

const editionContent: Record<Edition, {
  label: string;
  headerBg: string;
  headerText: string;
  scripture: { ref: string; text: string };
  title: string;
  paragraphs: string[];
  reflection: string;
  prayer: string;
  confession: string;
}> = {
  adult: {
    label: 'Adult Edition',
    headerBg: 'bg-white/5',
    headerText: 'text-gold-300',
    scripture: { ref: 'John 1:1', text: '"In the beginning was the Word, and the Word was with God, and the Word was God."' },
    title: 'Before All Things',
    paragraphs: [
      "The opening words of John's Gospel are among the most profound in all of Scripture. Before time began, before creation burst into existence, before the first syllable of human language was ever spoken—the Word already was.",
      "The Greek word John uses is Logos—a term that carried enormous weight in both Jewish and Greek thought. For the Jewish reader, the Word evoked the creative voice of God that called all things into being. For the Greek philosopher, Logos represented the rational principle behind all reality.",
      "John takes both meanings and transcends them: the Word is not a concept or a principle. The Word is a Person. And that Person became flesh and dwelt among us.",
    ],
    reflection: 'What does it mean to you personally that Jesus existed before all things? How does that change the way you approach Him in prayer and devotion today?',
    prayer: 'Lord Jesus, You are the Word made flesh. Before the foundations of the earth were laid, You were. Help me to encounter You today not as a concept but as the living Person You are.',
    confession: 'I declare that Jesus is the Word of God, eternal and unchanging. He was before all things, and through Him all things were made. He is the same yesterday, today, and forever.',
  },
  teen: {
    label: 'Teen Edition',
    headerBg: 'bg-gold-400/10',
    headerText: 'text-gold-300',
    scripture: { ref: 'John 1:1', text: '"In the beginning was the Word, and the Word was with God, and the Word was God."' },
    title: 'He Was Already There',
    paragraphs: [
      "Before Netflix. Before social media. Before your school, your city, your country, this planet, the solar system, the galaxy, the universe itself—Jesus was already there.",
      "That's what John is saying in one sentence: 'In the beginning was the Word.' Before anything began, He was already present. Already existing. Already God.",
      "This might feel abstract at first. But here's why it matters for your life right now: the Jesus you're encountering today has always known about you. When you feel like no one really sees you—He does.",
    ],
    reflection: 'Does it feel weird or comforting to think about Jesus knowing about you before you were born? How does it change the way you think about prayer?',
    prayer: "Jesus, it's kind of mind-blowing that You were there before everything. Thank You for being eternal and for knowing me before I even knew myself. Help me to trust that You've always had a plan for my life.",
    confession: 'Jesus existed before everything, and He knows me completely. I am not an accident or an afterthought—I am known and loved by an eternal God.',
  },
  children: {
    label: "Children's Edition",
    headerBg: 'bg-lavender-400/10',
    headerText: 'text-lavender-300',
    scripture: { ref: 'John 1:1', text: '"In the beginning was the Word, and the Word was with God, and the Word was God."' },
    title: 'Jesus Was There First!',
    paragraphs: [
      "Do you know what was there before everything? Before the stars and the sun and the moon? Before the animals and the oceans and the mountains?",
      "Jesus was! The Bible says that Jesus is called 'the Word.' That's a special name that means He is how God speaks to us and loves us.",
      "That means Jesus is the most amazing, powerful, and wonderful Person ever. He didn't just appear—He has always been! And the coolest part? This amazing, always-was, always-will-be Jesus loves YOU!",
    ],
    reflection: "If Jesus has always been there—even before the stars were made—what do you think that means about how powerful He is? Draw a picture!",
    prayer: "Dear Jesus, thank You for always being there. Even before the whole world was made, You were already there. I'm so glad You're my friend. Amen!",
    confession: 'Jesus has always been there, and He is always with me. He is bigger than anything I could ever face!',
  },
};

export default function SampleContentPage() {
  useSEO({
    title: 'Your Free 7-Day Sample | In Him Daily',
    description: 'Read your free 7-day sample of In Him Daily — seven complete devotionals with Scripture, reflection, and prayer for each day.',
    canonicalPath: '/sample-content',
  });

  const [edition, setEdition] = useState<Edition>('adult');
  const ec = editionContent[edition];

  return (
    <div className="overflow-x-hidden">
      <section className="relative pt-32 pb-12 bg-navy-700 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true"
          style={{ background: 'radial-gradient(ellipse 55% 45% at 50% 75%, rgba(201,152,58,0.11) 0%, transparent 70%)' }} />
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-gold-400 text-[0.72rem] font-semibold tracking-[0.16em] uppercase mb-4">Your Free 7-Day Sample</p>
          <h1 className="font-playfair text-4xl md:text-5xl font-bold text-white mb-4 leading-tight">
            Seven Days with Jesus
          </h1>
          <p className="text-white/65 text-lg max-w-2xl mx-auto leading-relaxed">
            Below is your complete 7-day sample. Read through each day's devotional, and when you're ready, explore the full 120-day journey.
          </p>
        </div>
      </section>

      <section className="py-16 ih-section" aria-label="Edition preview">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal className="flex justify-center gap-2.5 mb-10">
            {(['adult', 'teen', 'children'] as Edition[]).map((e) => (
              <button key={e} onClick={() => setEdition(e)} role="tab" aria-selected={edition === e}
                className={`px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-250 ${
                  edition === e ? 'ih-btn-gold' : 'ih-btn-ghost'
                }`}>
                {e === 'adult' ? 'Adult' : e === 'teen' ? 'Teen' : "Children's"}
              </button>
            ))}
          </ScrollReveal>

          <ScrollReveal>
            <div className="rounded-2xl overflow-hidden ih-card mb-4">
              <div className={`${ec.headerBg} px-8 py-5 flex items-center justify-between`}>
                <div>
                  <p className={`text-[0.68rem] font-bold tracking-[0.15em] uppercase ${ec.headerText} opacity-70`}>
                    In Him Daily · {ec.label}
                  </p>
                  <p className={`font-playfair text-xl font-bold ${ec.headerText} mt-0.5`}>Day 1 · The Word</p>
                </div>
                <BookOpen size={22} className={`${ec.headerText} opacity-40`} aria-hidden="true" />
              </div>
              <div className="px-8 py-6 bg-white/[0.03] border-b border-white/10">
                <p className="font-cormorant text-xl italic text-white/90 leading-relaxed">{ec.scripture.text}</p>
                <p className="text-gold-300 text-sm font-semibold mt-2">{ec.scripture.ref}</p>
              </div>
              <div className="px-8 py-8 bg-white/[0.02]">
                <h2 className="font-playfair text-2xl font-bold text-white mb-5">{ec.title}</h2>
                <div className="space-y-3.5 mb-7">
                  {ec.paragraphs.map((p, i) => (
                    <p key={i} className="text-white/65 text-sm leading-relaxed">{p}</p>
                  ))}
                </div>
                <div className="space-y-3">
                  <div className="p-4 rounded-xl bg-white/5 border-l-4 border-gold-400">
                    <p className="text-[0.65rem] font-bold text-gold-300 uppercase tracking-[0.12em] mb-1">Reflection</p>
                    <p className="text-sm text-white/80 italic">{ec.reflection}</p>
                  </div>
                  <div className="p-4 rounded-xl bg-white/5 border-l-4 border-navy-400">
                    <p className="text-[0.65rem] font-bold text-navy-300 uppercase tracking-[0.12em] mb-1">Daily Prayer</p>
                    <p className="text-sm text-white/80 italic">{ec.prayer}</p>
                  </div>
                  <div className="p-4 rounded-xl bg-gold-400/10 border border-gold-400/20">
                    <p className="text-[0.65rem] font-bold text-gold-300 uppercase tracking-[0.12em] mb-1">Daily Confession</p>
                    <p className="text-sm text-white/80 font-medium">{ec.confession}</p>
                  </div>
                </div>
              </div>
              <div className="px-8 py-3.5 bg-white/[0.03] border-t border-white/10 flex items-center justify-between">
                <span className="text-xs text-white/45">Day 1 of 120</span>
                <div className="flex gap-0.5" aria-label="5 out of 5 stars">
                  {[...Array(5)].map((_, i) => <Star key={i} size={11} className="text-gold-400 fill-gold-400" aria-hidden="true" />)}
                </div>
              </div>
            </div>
          </ScrollReveal>
          <p className="text-center text-white/40 text-sm">
            This is a preview of Day 1. Below are all 7 days of your free sample.
          </p>
        </div>
      </section>

      <section className="py-12 ih-section" aria-label="Seven day devotional sample">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          {dailyDevotionals.map((d, i) => (
            <ScrollReveal key={d.day} delay={Math.min(i * 60, 300)}>
              <article className="rounded-2xl overflow-hidden ih-card">
                <div className="px-8 py-5 bg-white/5 flex items-center justify-between border-b border-white/10">
                  <div>
                    <p className="text-[0.68rem] font-bold tracking-[0.15em] uppercase text-gold-300 opacity-70">
                      Day {i + 1} · {d.dayLabel}
                    </p>
                    <p className="font-playfair text-xl font-bold text-white mt-0.5">{d.title}</p>
                  </div>
                  <BookOpen size={22} className="text-gold-300 opacity-40" aria-hidden="true" />
                </div>
                <div className="px-8 py-6 bg-white/[0.03] border-b border-white/10">
                  <p className="font-cormorant text-xl italic text-white/90 leading-relaxed">{d.scripture}</p>
                  <p className="text-gold-300 text-sm font-semibold mt-2">{d.reference}</p>
                </div>
                <div className="px-8 py-8 bg-white/[0.02]">
                  <p className="text-white/65 text-sm leading-relaxed mb-6">{d.text}</p>
                  <div className="space-y-3">
                    <div className="p-4 rounded-xl bg-white/5 border-l-4 border-gold-400">
                      <p className="text-[0.65rem] font-bold text-gold-300 uppercase tracking-[0.12em] mb-1">Reflection</p>
                      <p className="text-sm text-white/80 italic">{d.reflect}</p>
                    </div>
                    <div className="p-4 rounded-xl bg-white/5 border-l-4 border-navy-400">
                      <p className="text-[0.65rem] font-bold text-navy-300 uppercase tracking-[0.12em] mb-1">Daily Prayer</p>
                      <p className="text-sm text-white/80 italic">{d.prayer}</p>
                    </div>
                  </div>
                </div>
              </article>
            </ScrollReveal>
          ))}
        </div>
      </section>

      <section className="py-24 bg-navy-700 relative overflow-hidden" aria-labelledby="sample-cta-heading">
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true"
          style={{ background: 'radial-gradient(ellipse 55% 45% at 50% 50%, rgba(201,152,58,0.09) 0%, transparent 70%)' }} />
        <div className="relative z-10 max-w-xl mx-auto px-4 sm:px-6 text-center">
          <ScrollReveal>
            <p className="text-gold-400 text-[0.72rem] font-semibold tracking-[0.16em] uppercase mb-4">Ready for More?</p>
            <h2 id="sample-cta-heading" className="font-playfair text-3xl md:text-4xl font-bold text-white mb-4">
              Continue the Full 120-Day Journey
            </h2>
            <p className="text-white/55 mb-10 text-lg">
              These 7 days are just the beginning. The complete In Him Daily series offers 120 days of devotionals across all three editions.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/books" className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-gold-500 hover:bg-gold-400 text-navy-800 font-bold text-[0.9rem] rounded-full transition-all duration-300 shadow-gold hover:-translate-y-0.5">
                Explore the Books
                <ArrowRight size={17} aria-hidden="true" />
              </Link>
              <Link to="/communities" className="inline-flex items-center justify-center gap-2 px-8 py-4 border border-white/25 text-white/80 hover:text-white hover:border-white/40 font-medium text-[0.9rem] rounded-full transition-all duration-200">
                Join Our Community
              </Link>
            </div>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-5 text-sm text-white/55">
              {['Adult Edition', 'Teen Edition', "Children's Edition"].map((e, i) => (
                <div key={i} className="flex items-center gap-1.5">
                  <Check size={13} className="text-gold-400" aria-hidden="true" /> {e}
                </div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}
