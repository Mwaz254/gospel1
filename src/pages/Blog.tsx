import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, ArrowRight, BookOpen, Search } from 'lucide-react';
import { useSEO } from '@/hooks/useSEO';
import ScrollReveal from '@/components/ScrollReveal';
import { fetchPublishedPosts, type BlogPost } from '@/lib/supabase';

const PLACEHOLDER_IMG = 'https://images.pexels.com/photos/261763/pexels-photo-261763.jpeg?auto=compress&cs=tinysrgb&w=800';

export default function BlogPage() {
  useSEO({
    title: 'Blog | In Him Daily',
    description: 'Articles, reflections, and resources from In Him Daily — helping every generation encounter Jesus through Scripture, prayer, and family devotion.',
    canonicalPath: '/blog',
  });

  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [query, setQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');

  useEffect(() => {
    let mounted = true;
    fetchPublishedPosts()
      .then((data) => { if (mounted) { setPosts(data); setLoading(false); } })
      .catch(() => { if (mounted) { setError('Could not load articles. Please try again.'); setLoading(false); } });
    return () => { mounted = false; };
  }, []);

  const categories = ['All', ...Array.from(new Set(posts.map((p) => p.category).filter(Boolean))) as string[]];

  const filtered = posts.filter((p) => {
    const matchesQuery = !query ||
      p.title.toLowerCase().includes(query.toLowerCase()) ||
      (p.excerpt ?? '').toLowerCase().includes(query.toLowerCase());
    const matchesCategory = activeCategory === 'All' || p.category === activeCategory;
    return matchesQuery && matchesCategory;
  });

  function fmtDate(iso: string | null) {
    if (!iso) return '';
    return new Date(iso).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  }

  return (
    <div className="overflow-x-hidden">
      {/* Hero */}
      <section className="relative pt-32 pb-20 bg-navy-700 overflow-hidden" aria-label="Blog hero">
        <div className="absolute inset-0 bg-cover bg-center" aria-hidden="true"
          style={{ backgroundImage: "url('https://images.pexels.com/photos/1111319/pexels-photo-1111319.jpeg?auto=compress&cs=tinysrgb&w=1920')", opacity: 0.2 }} />
        <div className="absolute inset-0" aria-hidden="true"
          style={{ background: 'linear-gradient(180deg, rgba(14,32,53,0.78) 0%, rgba(14,32,53,0.92) 100%)' }} />
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true"
          style={{ background: 'radial-gradient(ellipse 55% 45% at 50% 75%, rgba(201,152,58,0.11) 0%, transparent 70%)' }} />
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gold-500/15 border border-gold-400/30 mb-6">
            <BookOpen size={14} className="text-gold-300" aria-hidden="true" />
            <span className="text-gold-200 text-[0.72rem] font-semibold tracking-[0.14em] uppercase">The Blog</span>
          </div>
          <h1 className="font-playfair text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
            Articles &amp; Reflections
          </h1>
          <p className="text-white/65 text-xl max-w-2xl mx-auto leading-relaxed">
            Devotional reflections, family resources, and ministry updates to help you grow closer to Christ every day.
          </p>
        </div>
      </section>

      {/* Search + filter */}
      <section className="py-10 ih-section border-b border-white/5" aria-label="Blog filters">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="relative w-full md:max-w-sm">
              <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/35" aria-hidden="true" />
              <input
                type="text"
                placeholder="Search articles…"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="w-full pl-12 pr-5 py-3 ih-input text-white placeholder-white/35 text-sm"
                aria-label="Search articles"
              />
            </div>
            <div className="flex flex-wrap gap-2 justify-center">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-4 py-2 rounded-full text-xs font-semibold transition-all duration-200 ${
                    activeCategory === cat ? 'ih-btn-gold' : 'ih-btn-ghost'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Posts grid */}
      <section className="py-20 ih-section" aria-label="Blog articles">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {loading ? (
            <div className="flex items-center justify-center py-24 text-white/50">
              <div className="w-8 h-8 border-2 border-gold-400/30 border-t-gold-400 rounded-full animate-spin mr-3" />
              Loading articles…
            </div>
          ) : error ? (
            <div className="text-center py-20">
              <p className="text-white/50 mb-4">{error}</p>
              <button onClick={() => window.location.reload()} className="px-6 py-3 ih-btn-ghost text-sm">
                Try Again
              </button>
            </div>
          ) : filtered.length === 0 ? (
            <div className="text-center py-20">
              <BookOpen size={40} className="mx-auto text-white/20 mb-5" aria-hidden="true" />
              <h2 className="font-playfair text-2xl font-bold text-white mb-2">No Articles Found</h2>
              <p className="text-white/45 text-sm">Check back soon — new content is on the way.</p>
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-7">
              {filtered.map((post, i) => (
                <ScrollReveal key={post.id} delay={Math.min(i * 70, 280)}>
                  <article className="premium-card rounded-2xl overflow-hidden ih-card h-full flex flex-col group">
                    <Link to={`/blog/${post.slug}`} className="block" aria-label={post.title}>
                      <div className="relative h-48 overflow-hidden">
                        <img
                          src={post.cover_image || PLACEHOLDER_IMG}
                          alt={post.title}
                          loading="lazy"
                          decoding="async"
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#05070D]/70 to-transparent" aria-hidden="true" />
                        {post.category && (
                          <span className="absolute top-4 left-4 px-3 py-1 rounded-full text-[0.68rem] font-bold bg-gold-500/90 text-[#05070D]">
                            {post.category}
                          </span>
                        )}
                      </div>
                    </Link>
                    <div className="p-6 flex flex-col flex-1">
                      <div className="flex items-center gap-2 text-[0.68rem] text-white/40 mb-3">
                        <Calendar size={12} aria-hidden="true" />
                        <span>{fmtDate(post.published_at)}</span>
                        {post.author && <><span aria-hidden="true">·</span><span>{post.author}</span></>}
                      </div>
                      <h2 className="font-playfair text-lg font-bold text-white mb-2 leading-snug">
                        <Link to={`/blog/${post.slug}`} className="hover:text-gold-300 transition-colors">
                          {post.title}
                        </Link>
                      </h2>
                      <p className="text-white/55 text-sm leading-relaxed flex-1 mb-4 line-clamp-3">
                        {post.excerpt || 'Read this article from In Him Daily.'}
                      </p>
                      <Link
                        to={`/blog/${post.slug}`}
                        className="inline-flex items-center gap-1.5 text-sm font-semibold text-gold-300 hover:text-gold-200 transition-colors"
                      >
                        Read More <ArrowRight size={14} aria-hidden="true" />
                      </Link>
                    </div>
                  </article>
                </ScrollReveal>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Closing scripture */}
      <section className="py-16 ih-section text-center" aria-label="Closing scripture">
        <div className="max-w-xl mx-auto px-4">
          <ScrollReveal>
            <div className="gold-divider mx-auto mb-7" aria-hidden="true" />
            <p className="font-cormorant text-3xl text-white italic leading-relaxed">
              &ldquo;Your word is a lamp to my feet and a light to my path.&rdquo;
            </p>
            <p className="text-gold-400 text-[0.72rem] font-semibold mt-3 tracking-[0.18em] uppercase">Psalm 119:105</p>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}
