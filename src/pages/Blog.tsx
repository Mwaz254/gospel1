import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, User, ArrowRight, PenLine, Search } from 'lucide-react';
import { getSupabaseClient } from '@/lib/supabase';
import { useSEO } from '@/hooks/useSEO';
import ScrollReveal from '@/components/ScrollReveal';

export type BlogPostSummary = {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  cover_image_url: string | null;
  author: string | null;
  category: string | null;
  published_at: string | null;
};

export default function BlogPage() {
  useSEO({
    title: 'Blog | In Him Daily',
    description: 'Articles, devotionals, and reflections from the In Him Daily ministry — helping every generation encounter Jesus together.',
    canonicalPath: '/blog',
  });

  const [posts, setPosts] = useState<BlogPostSummary[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [query, setQuery] = useState('');
  const [activeCat, setActiveCat] = useState<string | null>(null);

  useEffect(() => {
    async function load() {
      try {
        const supabase = getSupabaseClient();
        const { data, error: err } = await supabase
          .from('blog_posts')
          .select('id, title, slug, excerpt, cover_image_url, author, category, published_at')
          .eq('status', 'published')
          .order('published_at', { ascending: false });
        if (err) throw err;
        setPosts((data ?? []) as BlogPostSummary[]);
      } catch {
        setError('Articles could not be loaded. Please try again later.');
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  const categories = Array.from(new Set(posts.map((p) => p.category).filter(Boolean))) as string[];

  const filtered = posts.filter((p) => {
    const matchesCat = !activeCat || p.category === activeCat;
    const q = query.trim().toLowerCase();
    const matchesQuery =
      !q ||
      p.title.toLowerCase().includes(q) ||
      (p.excerpt ?? '').toLowerCase().includes(q);
    return matchesCat && matchesQuery;
  });

  const featured = filtered[0];
  const rest = filtered.slice(1);

  function fmtDate(iso: string | null) {
    if (!iso) return '';
    return new Date(iso).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });
  }

  return (
    <div className="overflow-x-hidden">
      {/* Hero */}
      <section className="relative pt-32 pb-20 overflow-hidden" aria-label="Blog hero">
        <div className="absolute inset-0" aria-hidden="true"
          style={{ background: 'radial-gradient(ellipse 60% 50% at 50% 40%, rgba(201,152,58,0.10) 0%, transparent 70%)' }} />
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-gold-400 text-[0.72rem] font-semibold tracking-[0.16em] uppercase mb-4">In Him Daily</p>
          <h1 className="font-playfair text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
            The Blog
          </h1>
          <p className="text-white/65 text-lg max-w-2xl mx-auto leading-relaxed">
            Reflections, devotionals, and stories to help every generation in your family encounter Jesus together.
          </p>
          <div className="gold-divider mx-auto mt-8" aria-hidden="true" />
        </div>
      </section>

      {/* Search + Filters */}
      <section className="py-6">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="relative w-full md:max-w-sm">
              <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40" aria-hidden="true" />
              <input
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search articles..."
                className="ih-input w-full pl-11 pr-4 py-2.5 text-sm"
                aria-label="Search articles"
              />
            </div>
            {categories.length > 0 && (
              <div className="flex flex-wrap gap-2 justify-center">
                <button
                  onClick={() => setActiveCat(null)}
                  className={`px-4 py-1.5 rounded-full text-xs font-medium transition-colors ${
                    !activeCat ? 'bg-gold-400/20 text-gold-300 border border-gold-400/40' : 'bg-white/5 text-white/60 border border-white/10 hover:text-white'
                  }`}
                >
                  All
                </button>
                {categories.map((c) => (
                  <button
                    key={c}
                    onClick={() => setActiveCat(c === activeCat ? null : c)}
                    className={`px-4 py-1.5 rounded-full text-xs font-medium transition-colors ${
                      activeCat === c ? 'bg-gold-400/20 text-gold-300 border border-gold-400/40' : 'bg-white/5 text-white/60 border border-white/10 hover:text-white'
                    }`}
                  >
                    {c}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Articles */}
      <section className="pb-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {loading ? (
            <div className="flex items-center justify-center py-24 text-white/50">
              <div className="w-8 h-8 border-2 border-gold-400/30 border-t-gold-400 rounded-full animate-spin mr-3" />
              Loading articles...
            </div>
          ) : error ? (
            <div className="text-center py-20">
              <p className="text-white/50">{error}</p>
            </div>
          ) : filtered.length === 0 ? (
            <div className="text-center py-20">
              <PenLine size={40} className="text-white/20 mx-auto mb-4" aria-hidden="true" />
              <p className="text-white/50 text-lg">No articles found.</p>
              <p className="text-white/30 text-sm mt-1">Check back soon for new content.</p>
            </div>
          ) : (
            <>
              {/* Featured article */}
              {featured && (
                <ScrollReveal className="mb-12">
                  <Link to={`/blog/${featured.slug}`} className="block group">
                    <article className="premium-card rounded-2xl overflow-hidden ih-card grid md:grid-cols-2">
                      <div className="aspect-[16/10] md:aspect-auto md:min-h-[280px] overflow-hidden bg-white/5">
                        {featured.cover_image_url ? (
                          <img
                            src={featured.cover_image_url}
                            alt={featured.title}
                            loading="lazy"
                            decoding="async"
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center">
                            <PenLine size={32} className="text-white/20" aria-hidden="true" />
                          </div>
                        )}
                      </div>
                      <div className="p-7 md:p-8 flex flex-col justify-center">
                        {featured.category && (
                          <span className="text-gold-400 text-[0.68rem] font-semibold tracking-[0.14em] uppercase mb-3">
                            {featured.category}
                          </span>
                        )}
                        <h2 className="font-playfair text-2xl md:text-3xl font-bold text-white mb-3 leading-snug group-hover:text-gold-200 transition-colors">
                          {featured.title}
                        </h2>
                        {featured.excerpt && (
                          <p className="text-white/55 text-sm leading-relaxed mb-4 line-clamp-3">
                            {featured.excerpt}
                          </p>
                        )}
                        <div className="flex items-center gap-4 text-xs text-white/40">
                          {featured.author && (
                            <span className="flex items-center gap-1.5">
                              <User size={13} aria-hidden="true" /> {featured.author}
                            </span>
                          )}
                          {featured.published_at && (
                            <span className="flex items-center gap-1.5">
                              <Calendar size={13} aria-hidden="true" /> {fmtDate(featured.published_at)}
                            </span>
                          )}
                        </div>
                        <span className="inline-flex items-center gap-1.5 text-gold-300 text-sm font-semibold mt-5 group-hover:gap-3 transition-all">
                          Read article <ArrowRight size={15} aria-hidden="true" />
                        </span>
                      </div>
                    </article>
                  </Link>
                </ScrollReveal>
              )}

              {/* Grid of remaining articles */}
              {rest.length > 0 && (
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {rest.map((post, i) => (
                    <ScrollReveal key={post.id} delay={i * 70}>
                      <Link to={`/blog/${post.slug}`} className="block group h-full">
                        <article className="premium-card rounded-2xl overflow-hidden ih-card h-full flex flex-col">
                          <div className="aspect-[16/10] overflow-hidden bg-white/5">
                            {post.cover_image_url ? (
                              <img
                                src={post.cover_image_url}
                                alt={post.title}
                                loading="lazy"
                                decoding="async"
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                              />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center">
                                <PenLine size={28} className="text-white/20" aria-hidden="true" />
                              </div>
                            )}
                          </div>
                          <div className="p-6 flex flex-col flex-1">
                            {post.category && (
                              <span className="text-gold-400 text-[0.68rem] font-semibold tracking-[0.14em] uppercase mb-2">
                                {post.category}
                              </span>
                            )}
                            <h3 className="font-playfair text-lg font-bold text-white mb-2 leading-snug group-hover:text-gold-200 transition-colors">
                              {post.title}
                            </h3>
                            {post.excerpt && (
                              <p className="text-white/50 text-sm leading-relaxed mb-4 line-clamp-2 flex-1">
                                {post.excerpt}
                              </p>
                            )}
                            <div className="flex items-center gap-3 text-xs text-white/40 mt-auto">
                              {post.author && (
                                <span className="flex items-center gap-1.5">
                                  <User size={12} aria-hidden="true" /> {post.author}
                                </span>
                              )}
                              {post.published_at && (
                                <span className="flex items-center gap-1.5">
                                  <Calendar size={12} aria-hidden="true" /> {fmtDate(post.published_at)}
                                </span>
                              )}
                            </div>
                          </div>
                        </article>
                      </Link>
                    </ScrollReveal>
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </section>
    </div>
  );
}
