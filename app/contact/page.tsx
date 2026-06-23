'use client';

import { useState } from 'react';
import { Mail, MessageSquare, Heart, Check, ArrowRight } from 'lucide-react';
import ScrollReveal from '@/components/ScrollReveal';

type FormType = 'contact' | 'prayer' | 'newsletter';

export default function ContactPage() {
  const [activeForm, setActiveForm] = useState<FormType>('contact');
  const [submitted, setSubmitted] = useState<FormType | null>(null);

  const [contactData, setContactData] = useState({ name: '', email: '', subject: '', message: '' });
  const [prayerData, setPrayerData] = useState({ name: '', email: '', request: '' });
  const [newsletterData, setNewsletterData] = useState({ name: '', email: '' });

  const handleContact = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted('contact');
  };
  const handlePrayer = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted('prayer');
  };
  const handleNewsletter = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted('newsletter');
  };

  const inputClass = "w-full px-5 py-3.5 rounded-xl bg-white border border-ivory-400 text-midnight-700 placeholder-midnight-400/40 focus:outline-none focus:border-gold-400 transition-colors text-sm";
  const textareaClass = `${inputClass} resize-none`;

  return (
    <div className="overflow-hidden">
      {/* Hero */}
      <section className="relative pt-32 pb-24 bg-midnight-700 overflow-hidden">
        <div className="absolute inset-0" style={{
          background: 'radial-gradient(ellipse 60% 50% at 50% 70%, rgba(214, 166, 74, 0.1) 0%, transparent 70%)'
        }} />
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-gold-400 text-sm font-semibold tracking-widest uppercase mb-4">Reach Out</p>
          <h1 className="font-playfair text-5xl md:text-6xl font-bold text-ivory-100 mb-6 leading-tight">
            Get in Touch
          </h1>
          <p className="text-ivory-300/80 text-xl max-w-xl mx-auto leading-relaxed">
            We'd love to hear from you—whether it's a question, a prayer request, or just a hello.
          </p>
        </div>
      </section>

      {/* Contact section */}
      <section className="py-24 bg-ivory">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-10">
            {/* Sidebar */}
            <div className="lg:col-span-1 space-y-4">
              <ScrollReveal>
                <h2 className="font-playfair text-2xl font-bold text-midnight-700 mb-6">How Can We Help?</h2>
              </ScrollReveal>

              {[
                { id: 'contact' as FormType, icon: Mail, label: 'General Contact', desc: 'Questions, feedback, partnerships' },
                { id: 'prayer' as FormType, icon: Heart, label: 'Prayer Request', desc: 'Share your prayer needs with us' },
                { id: 'newsletter' as FormType, icon: MessageSquare, label: 'Newsletter Signup', desc: 'Stay updated on new content' },
              ].map((item) => (
                <ScrollReveal key={item.id}>
                  <button
                    onClick={() => { setActiveForm(item.id); setSubmitted(null); }}
                    className={`w-full text-left p-5 rounded-2xl border transition-all duration-200 ${
                      activeForm === item.id
                        ? 'bg-midnight-700 border-midnight-600 text-ivory-100'
                        : 'bg-white border-ivory-400 text-midnight-700 hover:border-gold-300'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                        activeForm === item.id ? 'bg-gold-400/20' : 'bg-gold-50'
                      }`}>
                        <item.icon size={18} className={activeForm === item.id ? 'text-gold-300' : 'text-gold-500'} />
                      </div>
                      <div>
                        <p className="font-semibold text-sm">{item.label}</p>
                        <p className={`text-xs mt-0.5 ${activeForm === item.id ? 'text-ivory-300/70' : 'text-midnight-400'}`}>
                          {item.desc}
                        </p>
                      </div>
                    </div>
                  </button>
                </ScrollReveal>
              ))}

              {/* Contact info */}
              <ScrollReveal delay={150}>
                <div className="mt-8 p-5 bg-white rounded-2xl border border-ivory-400">
                  <h3 className="font-playfair font-bold text-midnight-700 mb-3">Contact Information</h3>
                  <div className="space-y-2 text-sm text-midnight-600">
                    <p className="flex items-center gap-2">
                      <Mail size={13} className="text-gold-500" />
                      hello@inhimdaily.org
                    </p>
                  </div>
                </div>
              </ScrollReveal>
            </div>

            {/* Forms */}
            <div className="lg:col-span-2">
              <ScrollReveal>
                <div className="bg-white rounded-2xl border border-ivory-400 shadow-sm p-8">
                  {/* Contact Form */}
                  {activeForm === 'contact' && (
                    submitted === 'contact' ? (
                      <div className="text-center py-12">
                        <div className="w-14 h-14 rounded-full bg-gold-50 border border-gold-200 flex items-center justify-center mx-auto mb-5">
                          <Check size={24} className="text-gold-500" />
                        </div>
                        <h3 className="font-playfair text-2xl font-bold text-midnight-700 mb-2">Message Received!</h3>
                        <p className="text-[#1E1E1E]/60">Thank you, {contactData.name}. We'll get back to you within 24-48 hours.</p>
                      </div>
                    ) : (
                      <form onSubmit={handleContact} className="space-y-5">
                        <div>
                          <h2 className="font-playfair text-2xl font-bold text-midnight-700 mb-1">Send a Message</h2>
                          <p className="text-[#1E1E1E]/50 text-sm">We read every message and respond personally.</p>
                        </div>
                        <div className="grid sm:grid-cols-2 gap-4">
                          <input
                            type="text"
                            placeholder="Your Name"
                            value={contactData.name}
                            onChange={(e) => setContactData({ ...contactData, name: e.target.value })}
                            required
                            className={inputClass}
                          />
                          <input
                            type="email"
                            placeholder="Email Address"
                            value={contactData.email}
                            onChange={(e) => setContactData({ ...contactData, email: e.target.value })}
                            required
                            className={inputClass}
                          />
                        </div>
                        <input
                          type="text"
                          placeholder="Subject"
                          value={contactData.subject}
                          onChange={(e) => setContactData({ ...contactData, subject: e.target.value })}
                          required
                          className={inputClass}
                        />
                        <textarea
                          placeholder="Your message..."
                          value={contactData.message}
                          onChange={(e) => setContactData({ ...contactData, message: e.target.value })}
                          required
                          rows={5}
                          className={textareaClass}
                        />
                        <button
                          type="submit"
                          className="inline-flex items-center gap-2 px-7 py-3.5 bg-midnight-700 text-ivory-100 font-bold rounded-full hover:bg-midnight-600 transition-all duration-300 hover:-translate-y-0.5"
                        >
                          Send Message <ArrowRight size={16} />
                        </button>
                      </form>
                    )
                  )}

                  {/* Prayer Request Form */}
                  {activeForm === 'prayer' && (
                    submitted === 'prayer' ? (
                      <div className="text-center py-12">
                        <div className="w-14 h-14 rounded-full bg-gold-50 border border-gold-200 flex items-center justify-center mx-auto mb-5">
                          <Heart size={24} className="text-gold-500 fill-gold-200" />
                        </div>
                        <h3 className="font-playfair text-2xl font-bold text-midnight-700 mb-2">We'll Pray For You</h3>
                        <p className="text-[#1E1E1E]/60">Thank you, {prayerData.name}. Your request is in safe hands. We will lift you before the Lord.</p>
                      </div>
                    ) : (
                      <form onSubmit={handlePrayer} className="space-y-5">
                        <div>
                          <h2 className="font-playfair text-2xl font-bold text-midnight-700 mb-1">Submit a Prayer Request</h2>
                          <p className="text-[#1E1E1E]/50 text-sm">Your request will be held in confidence and prayed over faithfully.</p>
                        </div>
                        <div className="p-4 rounded-xl bg-gold-50 border border-gold-200">
                          <p className="font-cormorant text-lg text-midnight-700 italic">
                            &ldquo;Do not be anxious about anything, but in every situation, by prayer and petition, with thanksgiving, present your requests to God.&rdquo;
                          </p>
                          <p className="text-gold-500 text-xs font-semibold mt-2">Philippians 4:6</p>
                        </div>
                        <input
                          type="text"
                          placeholder="Your Name"
                          value={prayerData.name}
                          onChange={(e) => setPrayerData({ ...prayerData, name: e.target.value })}
                          required
                          className={inputClass}
                        />
                        <input
                          type="email"
                          placeholder="Email Address (optional)"
                          value={prayerData.email}
                          onChange={(e) => setPrayerData({ ...prayerData, email: e.target.value })}
                          className={inputClass}
                        />
                        <textarea
                          placeholder="Share your prayer request..."
                          value={prayerData.request}
                          onChange={(e) => setPrayerData({ ...prayerData, request: e.target.value })}
                          required
                          rows={5}
                          className={textareaClass}
                        />
                        <button
                          type="submit"
                          className="inline-flex items-center gap-2 px-7 py-3.5 bg-midnight-700 text-ivory-100 font-bold rounded-full hover:bg-midnight-600 transition-all duration-300 hover:-translate-y-0.5"
                        >
                          Submit Prayer Request <Heart size={16} />
                        </button>
                      </form>
                    )
                  )}

                  {/* Newsletter Form */}
                  {activeForm === 'newsletter' && (
                    submitted === 'newsletter' ? (
                      <div className="text-center py-12">
                        <div className="w-14 h-14 rounded-full bg-gold-50 border border-gold-200 flex items-center justify-center mx-auto mb-5">
                          <Check size={24} className="text-gold-500" />
                        </div>
                        <h3 className="font-playfair text-2xl font-bold text-midnight-700 mb-2">You're Subscribed!</h3>
                        <p className="text-[#1E1E1E]/60">Welcome, {newsletterData.name}! Look out for updates, new content, and resources from In Him Daily.</p>
                      </div>
                    ) : (
                      <form onSubmit={handleNewsletter} className="space-y-5">
                        <div>
                          <h2 className="font-playfair text-2xl font-bold text-midnight-700 mb-1">Subscribe to Our Newsletter</h2>
                          <p className="text-[#1E1E1E]/50 text-sm">New devotional content, family resources, and ministry updates—delivered to your inbox.</p>
                        </div>
                        <div className="space-y-3">
                          {['New devotional series announcements', 'Free bonus content', 'Prayer partner updates', 'Ministry news and stories'].map((item, i) => (
                            <div key={i} className="flex items-center gap-2 text-sm text-midnight-700">
                              <Check size={14} className="text-gold-500" /> {item}
                            </div>
                          ))}
                        </div>
                        <input
                          type="text"
                          placeholder="Your First Name"
                          value={newsletterData.name}
                          onChange={(e) => setNewsletterData({ ...newsletterData, name: e.target.value })}
                          required
                          className={inputClass}
                        />
                        <input
                          type="email"
                          placeholder="Email Address"
                          value={newsletterData.email}
                          onChange={(e) => setNewsletterData({ ...newsletterData, email: e.target.value })}
                          required
                          className={inputClass}
                        />
                        <button
                          type="submit"
                          className="inline-flex items-center gap-2 px-7 py-3.5 bg-midnight-700 text-ivory-100 font-bold rounded-full hover:bg-midnight-600 transition-all duration-300 hover:-translate-y-0.5"
                        >
                          Subscribe <ArrowRight size={16} />
                        </button>
                        <p className="text-[#1E1E1E]/40 text-xs">No spam. Unsubscribe anytime.</p>
                      </form>
                    )
                  )}
                </div>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>

      {/* Closing */}
      <section className="py-16 bg-ivory text-center">
        <div className="max-w-2xl mx-auto px-4">
          <ScrollReveal>
            <div className="gold-divider mx-auto mb-8" />
            <p className="font-cormorant text-3xl text-midnight-700 italic leading-relaxed">
              &ldquo;Ask and it will be given to you; seek and you will find.&rdquo;
            </p>
            <p className="text-gold-500 text-sm font-semibold mt-3 tracking-widest uppercase">Matthew 7:7</p>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}
