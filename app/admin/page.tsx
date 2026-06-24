'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { Users, Mail, Heart, MessageSquare, BookOpen, RefreshCw, Rocket, ExternalLink, CheckCircle2, AlertCircle } from 'lucide-react';

/* ─── types ─────────────────────────────────────────────────── */
type FreeSampleLead = { id: string; first_name: string; email: string; source: string; status: string; created_at: string; };
type NewsletterSub  = { id: string; name: string; email: string; status: string; created_at: string; };
type PrayerPartner  = { id: string; name: string; email: string; status: string; created_at: string; };
type PrayerRequest  = { id: string; name: string; email: string | null; request: string; status: string; created_at: string; };
type ContactMessage = { id: string; name: string; email: string; subject: string; message: string; status: string; created_at: string; };

type Tab = 'leads' | 'newsletter' | 'partners' | 'prayers' | 'messages';

const TABS: { id: Tab; label: string; icon: React.ElementType; color: string }[] = [
  { id: 'leads',     label: 'Free Sample Leads',    icon: BookOpen,      color: 'text-navy-600' },
  { id: 'newsletter',label: 'Newsletter',           icon: Mail,          color: 'text-gold-600' },
  { id: 'partners',  label: 'Prayer Partners',      icon: Users,         color: 'text-purple-600' },
  { id: 'prayers',   label: 'Prayer Requests',      icon: Heart,         color: 'text-rose-600' },
  { id: 'messages',  label: 'Contact Messages',     icon: MessageSquare, color: 'text-teal-600' },
];

const STATUS_COLORS: Record<string, string> = {
  new:          'bg-blue-50 text-blue-700 border-blue-200',
  sent:         'bg-green-50 text-green-700 border-green-200',
  subscribed:   'bg-green-50 text-green-700 border-green-200',
  active:       'bg-green-50 text-green-700 border-green-200',
  received:     'bg-amber-50 text-amber-700 border-amber-200',
  read:         'bg-blue-50 text-blue-700 border-blue-200',
  replied:      'bg-green-50 text-green-700 border-green-200',
  prayed_over:  'bg-purple-50 text-purple-700 border-purple-200',
  closed:       'bg-gray-50 text-gray-500 border-gray-200',
  unsubscribed: 'bg-gray-50 text-gray-500 border-gray-200',
  inactive:     'bg-gray-50 text-gray-500 border-gray-200',
};

function fmt(iso: string) {
  return new Date(iso).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
}

function StatusBadge({ status }: { status: string }) {
  return (
    <span className={`inline-block px-2.5 py-0.5 rounded-full text-[0.68rem] font-semibold border ${STATUS_COLORS[status] ?? 'bg-gray-50 text-gray-600 border-gray-200'}`}>
      {status.replace('_', ' ')}
    </span>
  );
}

export default function AdminPage() {
  const [tab,      setTab]      = useState<Tab>('leads');
  const [loading,  setLoading]  = useState(true);
  const [counts,   setCounts]   = useState<Record<Tab, number>>({ leads:0, newsletter:0, partners:0, prayers:0, messages:0 });

  const [leads,    setLeads]    = useState<FreeSampleLead[]>([]);
  const [subs,     setSubs]     = useState<NewsletterSub[]>([]);
  const [partners, setPartners] = useState<PrayerPartner[]>([]);
  const [prayers,  setPrayers]  = useState<PrayerRequest[]>([]);
  const [messages, setMessages] = useState<ContactMessage[]>([]);

  async function loadAll() {
    setLoading(true);
    const [l, n, pp, pr, m] = await Promise.all([
      supabase.from('free_sample_leads').select('*').order('created_at', { ascending: false }),
      supabase.from('newsletter_subscribers').select('*').order('created_at', { ascending: false }),
      supabase.from('prayer_partners').select('*').order('created_at', { ascending: false }),
      supabase.from('prayer_requests').select('*').order('created_at', { ascending: false }),
      supabase.from('contact_messages').select('*').order('created_at', { ascending: false }),
    ]);
    setLeads(l.data ?? []);
    setSubs(n.data ?? []);
    setPartners(pp.data ?? []);
    setPrayers(pr.data ?? []);
    setMessages(m.data ?? []);
    setCounts({
      leads:      l.data?.length    ?? 0,
      newsletter: n.data?.length    ?? 0,
      partners:   pp.data?.length   ?? 0,
      prayers:    pr.data?.length   ?? 0,
      messages:   m.data?.length    ?? 0,
    });
    setLoading(false);
  }

  useEffect(() => { loadAll(); }, []);

  return (
    <div className="min-h-screen bg-[#FAF8F3] pt-20">
      {/* Header */}
      <div className="bg-navy-700 text-white px-4 sm:px-6 lg:px-8 py-10">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div>
            <p className="text-gold-400 text-[0.72rem] font-semibold tracking-[0.16em] uppercase mb-1">Ministry Dashboard</p>
            <h1 className="font-playfair text-3xl font-bold">In Him Daily — Submissions</h1>
          </div>
          <button onClick={loadAll} disabled={loading}
            className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 rounded-full text-sm font-medium transition-colors disabled:opacity-50"
            aria-label="Refresh data">
            <RefreshCw size={15} className={loading ? 'animate-spin' : ''} aria-hidden="true" />
            Refresh
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

        {/* Summary cards */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 mb-8">
          {TABS.map((t) => (
            <button key={t.id} onClick={() => setTab(t.id)}
              className={`p-5 rounded-2xl border text-left transition-all duration-200 ${
                tab === t.id ? 'bg-navy-700 border-navy-600 text-white' : 'bg-white border-ivory-300 hover:border-gold-300'
              }`}>
              <t.icon size={20} className={tab === t.id ? 'text-gold-300 mb-3' : `${t.color} mb-3`} aria-hidden="true" />
              <p className={`text-2xl font-bold font-playfair ${tab === t.id ? 'text-white' : 'text-navy-700'}`}>
                {loading ? '—' : counts[t.id]}
              </p>
              <p className={`text-xs mt-0.5 ${tab === t.id ? 'text-white/60' : 'text-[#6B6B6B]'}`}>{t.label}</p>
            </button>
          ))}
        </div>

        {/* Table panel */}
        <div className="bg-white rounded-2xl border border-ivory-300 shadow-sm overflow-hidden">
          {loading ? (
            <div className="flex items-center justify-center py-24 text-navy-400">
              <RefreshCw size={22} className="animate-spin mr-3" aria-hidden="true" />
              Loading submissions…
            </div>
          ) : (
            <>
              {/* ── Free Sample Leads ── */}
              {tab === 'leads' && (
                <table className="w-full text-sm">
                  <thead className="bg-ivory-200 text-navy-500 text-[0.72rem] uppercase tracking-wider">
                    <tr>
                      {['Name','Email','Source','Status','Date'].map(h => (
                        <th key={h} className="px-5 py-3 text-left font-semibold">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-ivory-200">
                    {leads.length === 0 ? (
                      <tr><td colSpan={5} className="px-5 py-10 text-center text-[#6B6B6B]">No leads yet.</td></tr>
                    ) : leads.map(r => (
                      <tr key={r.id} className="hover:bg-ivory-100 transition-colors">
                        <td className="px-5 py-3.5 font-medium text-navy-700">{r.first_name}</td>
                        <td className="px-5 py-3.5 text-[#6B6B6B]">{r.email}</td>
                        <td className="px-5 py-3.5 text-[#6B6B6B] text-[0.8rem]">{r.source.replace('_', ' ')}</td>
                        <td className="px-5 py-3.5"><StatusBadge status={r.status} /></td>
                        <td className="px-5 py-3.5 text-[#6B6B6B] text-[0.8rem]">{fmt(r.created_at)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}

              {/* ── Newsletter ── */}
              {tab === 'newsletter' && (
                <table className="w-full text-sm">
                  <thead className="bg-ivory-200 text-navy-500 text-[0.72rem] uppercase tracking-wider">
                    <tr>
                      {['Name','Email','Status','Subscribed'].map(h => (
                        <th key={h} className="px-5 py-3 text-left font-semibold">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-ivory-200">
                    {subs.length === 0 ? (
                      <tr><td colSpan={4} className="px-5 py-10 text-center text-[#6B6B6B]">No subscribers yet.</td></tr>
                    ) : subs.map(r => (
                      <tr key={r.id} className="hover:bg-ivory-100 transition-colors">
                        <td className="px-5 py-3.5 font-medium text-navy-700">{r.name}</td>
                        <td className="px-5 py-3.5 text-[#6B6B6B]">{r.email}</td>
                        <td className="px-5 py-3.5"><StatusBadge status={r.status} /></td>
                        <td className="px-5 py-3.5 text-[#6B6B6B] text-[0.8rem]">{fmt(r.created_at)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}

              {/* ── Prayer Partners ── */}
              {tab === 'partners' && (
                <table className="w-full text-sm">
                  <thead className="bg-ivory-200 text-navy-500 text-[0.72rem] uppercase tracking-wider">
                    <tr>
                      {['Name','Email','Status','Joined'].map(h => (
                        <th key={h} className="px-5 py-3 text-left font-semibold">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-ivory-200">
                    {partners.length === 0 ? (
                      <tr><td colSpan={4} className="px-5 py-10 text-center text-[#6B6B6B]">No prayer partners yet.</td></tr>
                    ) : partners.map(r => (
                      <tr key={r.id} className="hover:bg-ivory-100 transition-colors">
                        <td className="px-5 py-3.5 font-medium text-navy-700">{r.name}</td>
                        <td className="px-5 py-3.5 text-[#6B6B6B]">{r.email}</td>
                        <td className="px-5 py-3.5"><StatusBadge status={r.status} /></td>
                        <td className="px-5 py-3.5 text-[#6B6B6B] text-[0.8rem]">{fmt(r.created_at)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}

              {/* ── Prayer Requests ── */}
              {tab === 'prayers' && (
                <table className="w-full text-sm">
                  <thead className="bg-ivory-200 text-navy-500 text-[0.72rem] uppercase tracking-wider">
                    <tr>
                      {['Name','Email','Request','Status','Date'].map(h => (
                        <th key={h} className="px-5 py-3 text-left font-semibold">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-ivory-200">
                    {prayers.length === 0 ? (
                      <tr><td colSpan={5} className="px-5 py-10 text-center text-[#6B6B6B]">No prayer requests yet.</td></tr>
                    ) : prayers.map(r => (
                      <tr key={r.id} className="hover:bg-ivory-100 transition-colors">
                        <td className="px-5 py-3.5 font-medium text-navy-700 whitespace-nowrap">{r.name}</td>
                        <td className="px-5 py-3.5 text-[#6B6B6B]">{r.email ?? <span className="text-navy-300 italic text-xs">anonymous</span>}</td>
                        <td className="px-5 py-3.5 text-[#6B6B6B] max-w-xs">
                          <span className="line-clamp-2">{r.request}</span>
                        </td>
                        <td className="px-5 py-3.5 whitespace-nowrap"><StatusBadge status={r.status} /></td>
                        <td className="px-5 py-3.5 text-[#6B6B6B] text-[0.8rem] whitespace-nowrap">{fmt(r.created_at)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}

              {/* ── Contact Messages ── */}
              {tab === 'messages' && (
                <table className="w-full text-sm">
                  <thead className="bg-ivory-200 text-navy-500 text-[0.72rem] uppercase tracking-wider">
                    <tr>
                      {['Name','Email','Subject','Message','Status','Date'].map(h => (
                        <th key={h} className="px-5 py-3 text-left font-semibold">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-ivory-200">
                    {messages.length === 0 ? (
                      <tr><td colSpan={6} className="px-5 py-10 text-center text-[#6B6B6B]">No messages yet.</td></tr>
                    ) : messages.map(r => (
                      <tr key={r.id} className="hover:bg-ivory-100 transition-colors">
                        <td className="px-5 py-3.5 font-medium text-navy-700 whitespace-nowrap">{r.name}</td>
                        <td className="px-5 py-3.5 text-[#6B6B6B]">{r.email}</td>
                        <td className="px-5 py-3.5 text-navy-700 font-medium">{r.subject}</td>
                        <td className="px-5 py-3.5 text-[#6B6B6B] max-w-xs">
                          <span className="line-clamp-2">{r.message}</span>
                        </td>
                        <td className="px-5 py-3.5 whitespace-nowrap"><StatusBadge status={r.status} /></td>
                        <td className="px-5 py-3.5 text-[#6B6B6B] text-[0.8rem] whitespace-nowrap">{fmt(r.created_at)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </>
          )}
        </div>

        <p className="text-center text-[#6B6B6B]/50 text-xs mt-6">
          In Him Daily Admin · Data secured with Supabase Row Level Security
        </p>

        {/* ── Netlify Deployment ── */}
        <div className="mt-12 bg-white rounded-2xl border border-ivory-300 shadow-sm overflow-hidden">
          <div className="bg-navy-700 px-6 py-5 flex items-center gap-3">
            <Rocket size={20} className="text-gold-300" aria-hidden="true" />
            <h2 className="font-playfair text-lg font-bold text-white">Netlify Deployment</h2>
          </div>
          <div className="p-6 space-y-5">
            <div className="grid sm:grid-cols-3 gap-4">
              <div className="p-4 rounded-xl bg-ivory-100 border border-ivory-300">
                <p className="text-[0.68rem] font-semibold text-navy-400 uppercase tracking-wider mb-1">Build Command</p>
                <p className="text-sm text-navy-700 font-mono">npx next build</p>
              </div>
              <div className="p-4 rounded-xl bg-ivory-100 border border-ivory-300">
                <p className="text-[0.68rem] font-semibold text-navy-400 uppercase tracking-wider mb-1">Publish Directory</p>
                <p className="text-sm text-navy-700 font-mono">.next</p>
              </div>
              <div className="p-4 rounded-xl bg-ivory-100 border border-ivory-300">
                <p className="text-[0.68rem] font-semibold text-navy-400 uppercase tracking-wider mb-1">Plugin</p>
                <p className="text-sm text-navy-700 font-mono">@netlify/plugin-nextjs</p>
              </div>
            </div>

            <div className="space-y-3">
              <h3 className="font-playfair text-base font-bold text-navy-700">Deploy in 3 Steps</h3>
              <ol className="space-y-3">
                <li className="flex gap-3 items-start">
                  <span className="w-6 h-6 rounded-full bg-navy-700 text-white text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">1</span>
                  <div>
                    <p className="text-sm font-medium text-navy-700">Connect your repository</p>
                    <p className="text-xs text-[#6B6B6B] mt-0.5">Push this project to GitHub, then log in to Netlify and select &ldquo;Add new site &rarr; Import an existing project&rdquo;.</p>
                  </div>
                </li>
                <li className="flex gap-3 items-start">
                  <span className="w-6 h-6 rounded-full bg-navy-700 text-white text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">2</span>
                  <div>
                    <p className="text-sm font-medium text-navy-700">Configure build settings</p>
                    <p className="text-xs text-[#6B6B6B] mt-0.5">Netlify will auto-detect Next.js from <code className="text-gold-700 bg-gold-50 px-1 rounded">netlify.toml</code>. Confirm the build command and publish directory shown above.</p>
                  </div>
                </li>
                <li className="flex gap-3 items-start">
                  <span className="w-6 h-6 rounded-full bg-navy-700 text-white text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">3</span>
                  <div>
                    <p className="text-sm font-medium text-navy-700">Set environment variables</p>
                    <p className="text-xs text-[#6B6B6B] mt-0.5">In Netlify &rarr; Site settings &rarr; Environment variables, add <code className="text-gold-700 bg-gold-50 px-1 rounded">NEXT_PUBLIC_SUPABASE_URL</code> and <code className="text-gold-700 bg-gold-50 px-1 rounded">NEXT_PUBLIC_SUPABASE_ANON_KEY</code> from your Supabase project.</p>
                  </div>
                </li>
              </ol>
            </div>

            <div className="p-4 rounded-xl bg-green-50 border border-green-200 flex gap-3 items-start">
              <CheckCircle2 size={18} className="text-green-600 shrink-0 mt-0.5" aria-hidden="true" />
              <div>
                <p className="text-sm font-medium text-green-800">netlify.toml is already configured</p>
                <p className="text-xs text-green-700 mt-0.5">The build command, publish directory, and Next.js plugin are all set up. Just connect your repo and deploy.</p>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 flex gap-3 items-start">
              <AlertCircle size={18} className="text-amber-600 shrink-0 mt-0.5" aria-hidden="true" />
              <div>
                <p className="text-sm font-medium text-amber-800">Environment variables required</p>
                <p className="text-xs text-amber-700 mt-0.5">The Supabase URL and anon key must be set in Netlify&apos;s environment variables for the forms and admin dashboard to work in production.</p>
              </div>
            </div>

            <a href="https://app.netlify.com/start" target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 bg-navy-700 hover:bg-navy-600 text-white text-sm font-semibold rounded-full transition-all duration-300 hover:-translate-y-0.5">
              <ExternalLink size={16} aria-hidden="true" />
              Go to Netlify
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
