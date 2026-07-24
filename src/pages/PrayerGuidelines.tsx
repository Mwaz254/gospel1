import { Link } from 'react-router-dom';
import { Heart, BookOpen, Users, Globe, Shield, Clock, Hand, Eye, Ear, Check, ArrowRight } from 'lucide-react';
import ScrollReveal from '@/components/ScrollReveal';

const foundations = [
  { icon: Ear,    title: 'Listen First',         desc: 'Begin by listening. Intercession is not informing God of what He does not know — it is agreeing with what He already wants to do. Spend time in His presence before you speak.', refs: ['Habakkuk 2:1', 'John 10:27'] },
  { icon: BookOpen, title: 'Pray the Word',      desc: 'Anchor every prayer in Scripture. When you pray the Word of God, you pray the will of God. Use the daily scriptures from In Him Daily as your starting point.', refs: ['Isaiah 55:11', 'Hebrews 4:12'] },
  { icon: Heart, title: 'Pray with Faith',      desc: 'Believe that your prayers are heard and that they matter. Faith is not the absence of doubt — it is the decision to trust that God is working even when you cannot see it.', refs: ['Mark 11:24', 'Hebrews 11:6'] },
  { icon: Shield, title: 'Pray with Authority',  desc: 'You pray from a position of victory, not defeat. Christ has already won. Intercession is the enforcement of His finished work in the lives of families and readers.', refs: ['Ephesians 1:19-21', 'Luke 10:19'] },
  { icon: Hand,  title: 'Pray with Persistence', desc: 'Do not grow weary. Some breakthroughs come quickly; others require years of faithful intercession. The answer is not delayed — it is being prepared.', refs: ['Luke 18:1', 'Galatians 6:9'] },
  { icon: Eye,   title: 'Pray with Vision',      desc: 'See the families you are praying for. Picture the grandparent, the parent, the teenager, and the child reading the same scripture and encountering the same Jesus.', refs: ['Habakkuk 2:2-3', 'Ephesians 1:18'] },
];

const dailyRhythm = [
  { time: 'Morning',   focus: 'Begin the Day in His Presence', desc: 'Before the day begins, dedicate the devotionals that will be read to the Lord. Ask the Holy Spirit to anoint every word and every reader.', duration: '10-15 minutes' },
  { time: 'Midday',    focus: 'Intercede for Families',         desc: 'At midday, lift up families who are reading together. Pray for unity, for open hearts, and for the scripture to take root in each generation.', duration: '10 minutes' },
  { time: 'Evening',   focus: 'Cover the Ministry',            desc: 'As the day closes, pray for the writers, the team, and the future direction of In Him Daily. Ask God for wisdom, protection, and provision.', duration: '10-15 minutes' },
];

const prayerPoints = [
  { icon: BookOpen, title: 'For the Devotionals', points: [
    'Pray that every devotional would be written from genuine encounter with Jesus, not merely from study.',
    'Pray that the Holy Spirit would anoint each word to produce transformation, not just information.',
    'Pray for protection over the writing process — against distraction, burnout, and spiritual opposition.',
    'Pray that the three versions (adult, teen, child) would each carry the full depth of the encounter.',
  ]},
  { icon: Users, title: 'For the Families', points: [
    'Pray for families who are reading In Him Daily together — that it would spark genuine conversations about Jesus.',
    'Pray for parents who are struggling to lead their children spiritually — for courage, wisdom, and patience.',
    'Pray for teenagers who feel disconnected — that the devotional would meet them where they are.',
    'Pray for children — that their wonder and faith would be protected and nurtured.',
  ]},
  { icon: Globe, title: 'For the Nations', points: [
    'Pray for In Him Daily to reach families across every nation, tribe, and tongue.',
    'Pray for translation and cultural adaptation — that the message would remain true and resonate deeply.',
    'Pray for open doors in countries where Christian resources are scarce or restricted.',
    'Pray for partnerships with churches, schools, and ministries worldwide.',
  ]},
  { icon: Shield, title: 'For Protection', points: [
    'Pray for spiritual protection over the ministry, the team, and every reader.',
    'Pray against discouragement, burnout, and any attack on the families using the devotionals.',
    'Pray for integrity — that the ministry would remain pure in motive and faithful in stewardship.',
    'Pray for wisdom in every decision — from content to technology to partnerships.',
  ]},
];

const weeklyGuide = [
  { day: 'Monday',    focus: 'The Word',          prayer: 'Dedicate the week\'s devotionals to the Lord. Pray that the scripture would be living and active in every reader\'s life.' },
  { day: 'Tuesday',   focus: 'The Writers',       prayer: 'Intercede for the writers and creators behind In Him Daily. Pray for fresh encounter, clarity, and spiritual vitality.' },
  { day: 'Wednesday', focus: 'The Families',      prayer: 'Lift up families reading together. Pray for unity, open hearts, and generational conversations about Jesus.' },
  { day: 'Thursday',  focus: 'The Youth',         prayer: 'Intercede specifically for teenagers and children — that this generation would encounter Jesus early and deeply.' },
  { day: 'Friday',    focus: 'The Nations',       prayer: 'Pray for global reach — that the devotionals would cross every barrier of language, culture, and geography.' },
  { day: 'Saturday',  focus: 'The Team',          prayer: 'Cover the ministry team in prayer. Ask for wisdom, protection, provision, and fresh vision.' },
  { day: 'Sunday',    focus: 'Rest and Worship',  prayer: 'Rest in the finished work of Christ. Worship. Listen. Let the Holy Spirit refresh you for the week ahead.' },
];

const commitments = [
  'I will pray for In Him Daily and the families it serves.',
  'I will pray the Word of God, not my own opinions.',
  'I will listen before I speak, and trust before I understand.',
  'I will persist in prayer, even when I do not see immediate results.',
  'I will cover the ministry, the writers, and every reader in prayer.',
  'I will believe that my prayers are heard and that they matter.',
];

export default function PrayerGuidelinesPage() {
  return (
    <div className="overflow-x-hidden">
      <section className="relative pt-32 pb-24 bg-navy-700 overflow-hidden" aria-label="Prayer guidelines hero">
        <div className="absolute inset-0 bg-cover bg-center" aria-hidden="true" style={{ backgroundImage: "url('https://images.pexels.com/photos/3775534/pexels-photo-3775534.jpeg?auto=compress&cs=tinysrgb&w=1920')", opacity: 0.2 }} />
        <div className="absolute inset-0" aria-hidden="true" style={{ background: 'linear-gradient(180deg, rgba(14,32,53,0.78) 0%, rgba(14,32,53,0.92) 100%)' }} />
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true"
          style={{ background: 'radial-gradient(ellipse 55% 45% at 50% 75%, rgba(201,152,58,0.11) 0%, transparent 70%)' }} />
        <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-gold-400 text-[0.72rem] font-semibold tracking-[0.16em] uppercase mb-4">Intercessory Prayer</p>
          <h1 className="font-playfair text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-8 leading-tight">Prayer Guidelines</h1>
          <p className="font-cormorant text-2xl text-gold-200 italic leading-relaxed mb-3">
            &ldquo;The effective, fervent prayer of a righteous man avails much.&rdquo;
          </p>
          <p className="text-gold-500 text-[0.72rem] tracking-[0.18em] uppercase">James 5:16</p>
        </div>
      </section>

      <section className="py-24 bg-[#FAF8F3]" aria-labelledby="intro-heading">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <div className="text-center mb-12">
              <p className="text-gold-600 text-[0.72rem] font-semibold tracking-[0.16em] uppercase mb-3">A Guide for Intercessors</p>
              <h2 id="intro-heading" className="font-playfair text-3xl md:text-4xl font-bold text-navy-700 mb-6 leading-snug">
                How to Pray for In Him Daily
              </h2>
            </div>
            <div className="space-y-5 text-[#6B6B6B] leading-relaxed text-[0.95rem]">
              <p>Intercession is not a duty — it is a calling. When you pray for In Him Daily, you are not merely asking God to bless a project. You are standing in the gap for families you may never meet, asking the Holy Spirit to turn words on a page into a living encounter with Jesus Christ.</p>
              <p>These guidelines are designed to help you pray with purpose, with power, and with persistence. Whether you have five minutes or an hour, whether you pray alone or with others, these guidelines will help you focus your intercession and deepen your partnership with what God is doing through this ministry.</p>
              <p className="font-cormorant text-xl text-navy-700 italic leading-relaxed border-l-2 border-gold-400 pl-5">
                &ldquo;You do not have because you do not ask God. When you ask, you do not receive, because you ask with wrong motives.&rdquo; — James 4:2-3
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <section className="py-24 bg-ivory-200" aria-labelledby="foundations-heading">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal className="text-center mb-14">
            <p className="text-gold-600 text-[0.72rem] font-semibold tracking-[0.16em] uppercase mb-3">The Six Foundations</p>
            <h2 id="foundations-heading" className="font-playfair text-3xl md:text-4xl lg:text-5xl font-bold text-navy-700 mb-4">Principles of Effective Intercession</h2>
            <p className="text-[#6B6B6B] text-lg max-w-xl mx-auto">Six foundational principles that shape how we pray for the ministry and the families it serves.</p>
          </ScrollReveal>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {foundations.map((f, i) => (
              <ScrollReveal key={i} delay={i * 70}>
                <div className="premium-card p-7 bg-white rounded-2xl border border-ivory-300 shadow-sm h-full">
                  <div className="w-12 h-12 rounded-xl bg-gold-50 border border-gold-200 flex items-center justify-center mb-5">
                    <f.icon size={21} className="text-gold-600" aria-hidden="true" />
                  </div>
                  <h3 className="font-playfair text-lg font-bold text-navy-700 mb-3">{f.title}</h3>
                  <p className="text-[#6B6B6B] text-sm leading-relaxed mb-4">{f.desc}</p>
                  <div className="flex gap-2 flex-wrap">
                    {f.refs.map((r, j) => (
                      <span key={j} className="text-[0.68rem] bg-gold-50 text-gold-700 border border-gold-200 px-2.5 py-1 rounded-full font-medium">{r}</span>
                    ))}
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 bg-navy-700" aria-labelledby="rhythm-heading">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal className="text-center mb-14">
            <p className="text-gold-400 text-[0.72rem] font-semibold tracking-[0.16em] uppercase mb-3">Daily Rhythm</p>
            <h2 id="rhythm-heading" className="font-playfair text-3xl md:text-4xl lg:text-5xl font-bold text-white">A Daily Prayer Pattern</h2>
            <p className="text-white/55 text-lg max-w-xl mx-auto mt-4">A simple three-part rhythm to guide your daily intercession.</p>
          </ScrollReveal>
          <div className="space-y-5">
            {dailyRhythm.map((r, i) => (
              <ScrollReveal key={i} delay={i * 100}>
                <div className="p-6 rounded-2xl bg-white/5 border border-white/10 flex flex-col sm:flex-row gap-5 items-start">
                  <div className="flex items-center gap-3 sm:w-48 shrink-0">
                    <div className="w-10 h-10 rounded-lg bg-gold-400/20 flex items-center justify-center">
                      <Clock size={18} className="text-gold-300" aria-hidden="true" />
                    </div>
                    <div>
                      <p className="text-gold-300 text-sm font-semibold">{r.time}</p>
                      <p className="text-white/40 text-xs">{r.duration}</p>
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-playfair text-lg font-bold text-white mb-2">{r.focus}</h3>
                    <p className="text-white/55 text-sm leading-relaxed">{r.desc}</p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 bg-[#FAF8F3]" aria-labelledby="points-heading">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal className="text-center mb-14">
            <p className="text-gold-600 text-[0.72rem] font-semibold tracking-[0.16em] uppercase mb-3">Specific Intercession</p>
            <h2 id="points-heading" className="font-playfair text-3xl md:text-4xl lg:text-5xl font-bold text-navy-700 mb-4">Prayer Points</h2>
            <p className="text-[#6B6B6B] text-lg max-w-xl mx-auto">Four areas of focused intercession for the ministry.</p>
          </ScrollReveal>
          <div className="grid md:grid-cols-2 gap-6">
            {prayerPoints.map((pp, i) => (
              <ScrollReveal key={i} delay={i * 80}>
                <div className="p-7 bg-white rounded-2xl border border-ivory-300 shadow-sm h-full">
                  <div className="flex items-center gap-3 mb-5">
                    <div className="w-11 h-11 rounded-xl bg-navy-50 border border-navy-100 flex items-center justify-center">
                      <pp.icon size={20} className="text-navy-600" aria-hidden="true" />
                    </div>
                    <h3 className="font-playfair text-xl font-bold text-navy-700">{pp.title}</h3>
                  </div>
                  <ul className="space-y-3">
                    {pp.points.map((pt, j) => (
                      <li key={j} className="flex gap-3 text-sm text-[#6B6B6B] leading-relaxed">
                        <span className="text-gold-500 mt-0.5 shrink-0" aria-hidden="true">
                          <Check size={15} strokeWidth={2.5} />
                        </span>
                        <span>{pt}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 bg-ivory-200" aria-labelledby="weekly-heading">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal className="text-center mb-14">
            <p className="text-gold-600 text-[0.72rem] font-semibold tracking-[0.16em] uppercase mb-3">Weekly Guide</p>
            <h2 id="weekly-heading" className="font-playfair text-3xl md:text-4xl lg:text-5xl font-bold text-navy-700 mb-4">A Week of Prayer</h2>
            <p className="text-[#6B6B6B] text-lg max-w-xl mx-auto">A daily focus for each day of the week.</p>
          </ScrollReveal>
          <div className="space-y-3">
            {weeklyGuide.map((d, i) => (
              <ScrollReveal key={i} delay={i * 50}>
                <div className="p-5 bg-white rounded-2xl border border-ivory-300 shadow-sm flex flex-col sm:flex-row gap-4 items-start hover:border-gold-300 transition-colors">
                  <div className="sm:w-32 shrink-0">
                    <span className="inline-block px-3 py-1 bg-navy-700 text-white text-xs font-semibold rounded-full">{d.day}</span>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-playfair text-base font-bold text-navy-700 mb-1">{d.focus}</h3>
                    <p className="text-[#6B6B6B] text-sm leading-relaxed">{d.prayer}</p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 bg-navy-700" aria-labelledby="commitment-heading">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal className="text-center mb-12">
            <p className="text-gold-400 text-[0.72rem] font-semibold tracking-[0.16em] uppercase mb-3">The Intercessor&apos;s Commitment</p>
            <h2 id="commitment-heading" className="font-playfair text-3xl md:text-4xl lg:text-5xl font-bold text-white">Six Promises of a Prayer Partner</h2>
          </ScrollReveal>
          <div className="space-y-4">
            {commitments.map((c, i) => (
              <ScrollReveal key={i} delay={i * 60}>
                <div className="flex items-start gap-4 p-5 rounded-2xl bg-white/5 border border-white/10">
                  <div className="w-8 h-8 rounded-full bg-gold-400/20 flex items-center justify-center shrink-0">
                    <span className="text-gold-300 text-xs font-bold">{String(i + 1).padStart(2, '0')}</span>
                  </div>
                  <p className="text-white/80 text-sm leading-relaxed font-cormorant text-lg italic">{c}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 bg-[#FAF8F3] text-center" aria-labelledby="cta-heading">
        <div className="max-w-xl mx-auto px-4 sm:px-6">
          <ScrollReveal>
            <div className="gold-divider mx-auto mb-7" aria-hidden="true" />
            <h2 id="cta-heading" className="font-playfair text-3xl md:text-4xl font-bold text-navy-700 mb-5">Ready to Pray?</h2>
            <p className="text-[#6B6B6B] text-lg mb-8 leading-relaxed">
              Join the prayer team and receive monthly prayer guides and specific intercession requests delivered to your inbox.
            </p>
            <Link to="/prayer-partners"
              className="inline-flex items-center gap-2 px-8 py-4 bg-navy-700 hover:bg-navy-600 text-white font-bold rounded-full transition-all duration-300 hover:-translate-y-0.5">
              Join the Prayer Team
              <ArrowRight size={18} aria-hidden="true" />
            </Link>
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
