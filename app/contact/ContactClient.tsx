'use client';

import { useState } from 'react';
import { Mail, MessageSquare, Heart, Check, ArrowRight } from 'lucide-react';
import ScrollReveal from '@/components/ScrollReveal';
import { insertContactMessage, insertPrayerRequest, insertNewsletterSubscriber } from '@/lib/supabase';

type FormType = 'contact' | 'prayer' | 'newsletter';

export default function ContactClient() {
  const [active, setActive]         = useState<FormType>('contact');
  const [submitted, setSubmitted]   = useState<FormType | null>(null);
  const [formError, setFormError]   = useState('');

  const [cData, setCData]   = useState({ name:'', email:'', subject:'', message:'' });
  const [pData, setPData]   = useState({ name:'', email:'', request:'' });
  const [nData, setNData]   = useState({ name:'', email:'' });

  const inputCls  = "w-full px-5 py-3.5 rounded-xl bg-white border border-ivory-300 text-navy-700 placeholder-navy-300 focus:outline-none focus:border-gold-400 transition-colors text-sm";
  const taCls     = `${inputCls} resize-none`;

  const sideItems = [
    { id:'contact' as FormType,    icon:Mail,          label:'General Contact',   desc:'Questions, feedback, partnerships' },
    { id:'prayer' as FormType,     icon:Heart,         label:'Prayer Request',    desc:'Share your prayer needs with us' },
    { id:'newsletter' as FormType, icon:MessageSquare, label:'Newsletter Signup', desc:'Stay updated on new content' },
  ];

  return (
    <div className="overflow-x-hidden">

      {/* Hero */}
      <section className="relative pt-32 pb-24 bg-navy-700 overflow-hidden" aria-label="Contact hero">
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true"
          style={{ background: 'radial-gradient(ellipse 55% 45% at 50% 75%, rgba(201,152,58,0.11) 0%, transparent 70%)' }} />
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-gold-400 text-[0.72rem] font-semibold tracking-[0.16em] uppercase mb-4">Reach Out</p>
          <h1 className="font-playfair text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">Get in Touch</h1>
          <p className="text-white/65 text-xl max-w-xl mx-auto leading-relaxed">
            We'd love to hear from you—whether it's a question, a prayer request, or just a hello.
          </p>
        </div>
      </section>

      {/* Main */}
      <section className="py-24 bg-[#FAF8F3]" aria-label="Contact forms">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-8 items-start">

            {/* Sidebar */}
            <div className="space-y-3">
              <ScrollReveal>
                <h2 className="font-playfair text-2xl font-bold text-navy-700 mb-5">How Can We Help?</h2>
              </ScrollReveal>
              {sideItems.map((item)=>(
                <ScrollReveal key={item.id}>
                  <button onClick={()=>{ setActive(item.id); setSubmitted(null); }}
                    className={`w-full text-left p-4 rounded-2xl border transition-all duration-200 ${
                      active===item.id ? 'bg-navy-700 border-navy-600' : 'bg-white border-ivory-300 hover:border-gold-300'
                    }`}
                    aria-pressed={active===item.id}>
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${active===item.id ? 'bg-gold-400/20' : 'bg-gold-50'}`}>
                        <item.icon size={17} className={active===item.id ? 'text-gold-300' : 'text-gold-600'} aria-hidden="true" />
                      </div>
                      <div>
                        <p className={`font-semibold text-sm ${active===item.id ? 'text-white' : 'text-navy-700'}`}>{item.label}</p>
                        <p className={`text-xs mt-0.5 ${active===item.id ? 'text-white/55' : 'text-navy-400'}`}>{item.desc}</p>
                      </div>
                    </div>
                  </button>
                </ScrollReveal>
              ))}
              <ScrollReveal delay={180}>
                <div className="mt-6 p-5 bg-white rounded-2xl border border-ivory-300">
                  <h3 className="font-playfair font-bold text-navy-700 mb-3 text-base">Contact</h3>
                  <a href="mailto:hello@inhimdaily.org" className="flex items-center gap-2 text-sm text-navy-500 hover:text-gold-600 transition-colors">
                    <Mail size={13} aria-hidden="true" /> hello@inhimdaily.org
                  </a>
                </div>
              </ScrollReveal>
            </div>

            {/* Form panel */}
            <div className="lg:col-span-2">
              <ScrollReveal>
                <div className="bg-white rounded-2xl border border-ivory-300 shadow-sm p-8">

                  {/* ── Contact ── */}
                  {active === 'contact' && (
                    submitted === 'contact' ? (
                      <div className="text-center py-12">
                        <div className="w-14 h-14 rounded-full bg-gold-50 border border-gold-200 flex items-center justify-center mx-auto mb-5">
                          <Check size={22} className="text-gold-600" aria-hidden="true" />
                        </div>
                        <h3 className="font-playfair text-2xl font-bold text-navy-700 mb-2">Message Received!</h3>
                        <p className="text-[#6B6B6B]">Thank you, {cData.name}. We'll reply within 24–48 hours.</p>
                      </div>
                    ) : (
                      <form onSubmit={async (e)=>{ e.preventDefault(); setFormError(''); try { await insertContactMessage(cData); setSubmitted('contact'); } catch { setFormError('Something went wrong. Please try again.'); } }} className="space-y-4" noValidate>
                        <div>
                          <h2 className="font-playfair text-2xl font-bold text-navy-700 mb-1">Send a Message</h2>
                          <p className="text-[#6B6B6B] text-sm">We read every message and respond personally.</p>
                        </div>
                        <div className="grid sm:grid-cols-2 gap-3.5">
                          <input type="text" placeholder="Your Name" value={cData.name} onChange={e=>setCData({...cData,name:e.target.value})} required aria-label="Your name" className={inputCls} />
                          <input type="email" placeholder="Email Address" value={cData.email} onChange={e=>setCData({...cData,email:e.target.value})} required aria-label="Email address" className={inputCls} />
                        </div>
                        <input type="text" placeholder="Subject" value={cData.subject} onChange={e=>setCData({...cData,subject:e.target.value})} required aria-label="Subject" className={inputCls} />
                        <textarea placeholder="Your message…" value={cData.message} onChange={e=>setCData({...cData,message:e.target.value})} required rows={5} aria-label="Message" className={taCls} />
                        <button type="submit" className="inline-flex items-center gap-2 px-7 py-3.5 bg-navy-700 text-white font-bold rounded-full hover:bg-navy-600 transition-all duration-300 hover:-translate-y-px">
                          Send Message <ArrowRight size={15} aria-hidden="true" />
                        </button>
                        {formError && <p className="text-red-500 text-xs">{formError}</p>}
                      </form>
                    )
                  )}

                  {/* ── Prayer ── */}
                  {active === 'prayer' && (
                    submitted === 'prayer' ? (
                      <div className="text-center py-12">
                        <div className="w-14 h-14 rounded-full bg-gold-50 border border-gold-200 flex items-center justify-center mx-auto mb-5">
                          <Heart size={22} className="text-gold-600 fill-gold-100" aria-hidden="true" />
                        </div>
                        <h3 className="font-playfair text-2xl font-bold text-navy-700 mb-2">We'll Pray For You</h3>
                        <p className="text-[#6B6B6B]">Thank you, {pData.name}. Your request is in safe hands.</p>
                      </div>
                    ) : (
                      <form onSubmit={async (e)=>{ e.preventDefault(); setFormError(''); try { await insertPrayerRequest({name:pData.name, email:pData.email||undefined, request:pData.request}); setSubmitted('prayer'); } catch { setFormError('Something went wrong. Please try again.'); } }} className="space-y-4" noValidate>
                        <div>
                          <h2 className="font-playfair text-2xl font-bold text-navy-700 mb-1">Submit a Prayer Request</h2>
                          <p className="text-[#6B6B6B] text-sm">Your request will be held in confidence and prayed over faithfully.</p>
                        </div>
                        <div className="p-4 rounded-xl bg-gold-50 border border-gold-200">
                          <p className="font-cormorant text-lg text-navy-700 italic">&ldquo;Do not be anxious about anything, but in every situation, by prayer and petition, present your requests to God.&rdquo;</p>
                          <p className="text-gold-600 text-[0.72rem] font-semibold mt-2">Philippians 4:6</p>
                        </div>
                        <input type="text" placeholder="Your Name" value={pData.name} onChange={e=>setPData({...pData,name:e.target.value})} required aria-label="Your name" className={inputCls} />
                        <input type="email" placeholder="Email (optional)" value={pData.email} onChange={e=>setPData({...pData,email:e.target.value})} aria-label="Email address (optional)" className={inputCls} />
                        <textarea placeholder="Share your prayer request…" value={pData.request} onChange={e=>setPData({...pData,request:e.target.value})} required rows={5} aria-label="Prayer request" className={taCls} />
                        <button type="submit" className="inline-flex items-center gap-2 px-7 py-3.5 bg-navy-700 text-white font-bold rounded-full hover:bg-navy-600 transition-all duration-300 hover:-translate-y-px">
                          Submit Request <Heart size={15} aria-hidden="true" />
                        </button>
                        {formError && <p className="text-red-500 text-xs">{formError}</p>}
                      </form>
                    )
                  )}

                  {/* ── Newsletter ── */}
                  {active === 'newsletter' && (
                    submitted === 'newsletter' ? (
                      <div className="text-center py-12">
                        <div className="w-14 h-14 rounded-full bg-gold-50 border border-gold-200 flex items-center justify-center mx-auto mb-5">
                          <Check size={22} className="text-gold-600" aria-hidden="true" />
                        </div>
                        <h3 className="font-playfair text-2xl font-bold text-navy-700 mb-2">You're Subscribed!</h3>
                        <p className="text-[#6B6B6B]">Welcome, {nData.name}! Look out for updates from In Him Daily.</p>
                      </div>
                    ) : (
                      <form onSubmit={async (e)=>{ e.preventDefault(); setFormError(''); try { await insertNewsletterSubscriber({name:nData.name,email:nData.email}); setSubmitted('newsletter'); } catch { setFormError('Something went wrong. Please try again.'); } }} className="space-y-4" noValidate>
                        <div>
                          <h2 className="font-playfair text-2xl font-bold text-navy-700 mb-1">Subscribe to Our Newsletter</h2>
                          <p className="text-[#6B6B6B] text-sm">New content, family resources, and ministry updates.</p>
                        </div>
                        <ul className="space-y-2" role="list">
                          {['New devotional series announcements','Free bonus content','Prayer partner updates','Ministry news and stories'].map((item,i)=>(
                            <li key={i} className="flex items-center gap-2 text-sm text-navy-700">
                              <Check size={13} className="text-gold-500" aria-hidden="true" /> {item}
                            </li>
                          ))}
                        </ul>
                        <input type="text" placeholder="Your First Name" value={nData.name} onChange={e=>setNData({...nData,name:e.target.value})} required aria-label="First name" className={inputCls} />
                        <input type="email" placeholder="Email Address" value={nData.email} onChange={e=>setNData({...nData,email:e.target.value})} required aria-label="Email address" className={inputCls} />
                        <button type="submit" className="inline-flex items-center gap-2 px-7 py-3.5 bg-navy-700 text-white font-bold rounded-full hover:bg-navy-600 transition-all duration-300 hover:-translate-y-px">
                          Subscribe <ArrowRight size={15} aria-hidden="true" />
                        </button>
                        {formError && <p className="text-red-500 text-xs">{formError}</p>}
                        <p className="text-[#6B6B6B]/45 text-xs">No spam. Unsubscribe anytime.</p>
                      </form>
                    )
                  )}
                </div>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>

      <section className="py-14 bg-[#FAF8F3] text-center" aria-label="Closing scripture">
        <div className="max-w-xl mx-auto px-4">
          <ScrollReveal>
            <div className="gold-divider mx-auto mb-7" aria-hidden="true" />
            <p className="font-cormorant text-3xl text-navy-700 italic leading-relaxed">&ldquo;Ask and it will be given to you; seek and you will find.&rdquo;</p>
            <p className="text-gold-600 text-[0.72rem] font-semibold mt-3 tracking-[0.18em] uppercase">Matthew 7:7</p>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}
