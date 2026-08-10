import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Calendar, ArrowLeft, ArrowRight, BookOpen, Check, Copy } from 'lucide-react';
import { useSEO } from '@/hooks/useSEO';
import ScrollReveal from '@/components/ScrollReveal';
import { fetchPostBySlug, fetchPublishedPosts, type BlogPost } from '@/lib/supabase';

const PLACEHOLDER_IMG = 'https://images.pexels.com/photos/261763/pexels-photo-261763.jpeg?auto=compress&cs=tinysrgb&w=1200';

export default function BlogArticlePage() {
  const { slug } = useParams<{ slug: string }>();

  const [post, setPost] = useState<BlogPost | null>(null);
  const [related, setRelated] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [copied, setCopied] = useState(false);

  useSEO({
    title: post ? `${post.title} | In Him Daily Blog` : 'Article | In Him Daily Blog',
    description: post?.excerpt ?? 'An article from In Him Daily.',
    canonicalPath: `/blog/${slug}`,
    ogImage: post?.cover_image ?? undefined,
    ogType: 'article',
  });

  useEffect(() => {
    if (!slug) return;
    let mounted = true;
    setLoading(true);
    setNotFound(false);
    fetchPostBySlug(slug)
      .then((data) => {
        if (!mounted) return;
        if (!data) { setNotFound(true); setLoading(false); return; }
        setPost(data);
        fetchPublishedPosts()
          .then((all) => {
            if (!mounted) return;
            const rel = all
              .filter((p) => p.id !== data.id && (p.category === data.category || !data.category))
              .slice(0, 3);
            setRelated(rel);
          })
          .catch(() => { if (mounted) setRelated([]); });
        setLoading(false);
      })
      .catch(() => { if (mounted) { setNotFound(true); setLoading(false); } });
    return () => { mounted = false; };
  }, [slug]);

  useEffect(() => {
    if (post) window.scrollTo({ top: 0 });
  }, [post]);

  function fmtDate(iso: string | null) {
    if (!iso) return '';
    return new Date(iso).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
  }

  function copyLink() {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-20">
        <div className="w-10 h-10 border-2 border-gold-400/30 border-t-gold-400 rounded-full animate-spin" aria-label="Loading" />
      </div>
    );
  }

  if (notFound || !post) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4 pt-20">
        <div className="text-center max-w-md">
          <BookOpen size={48} className="mx-auto text-white/20 mb-5" aria-hidden="true" />
          <h1 className="font-playfair text-3xl font-bold text-white mb-3">Article Not Found</h1>
          <p className="text-white/50 mb-8">This article may have been moved or is no longer available.</p>
          <Link to="/blog" className="inline-flex items-center gap-2 px-7 py-3.5 ih-btn-gold">
            <ArrowLeft size={16} aria-hidden="true" /> Back to Blog
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="overflow-x-hidden">
      {/* Hero */}
      <section className="relative pt-32 pb-16 bg-navy-700 overflow-hidden" aria-label="Article hero">
        {post.cover_image && (
          <div className="absolute inset-0 bg-cover bg-center" aria-hidden="true"
            style={{ backgroundImage: `url(${post.cover_image})`, opacity: 0.25 }} />
        )}
        <div className="absolute inset-0" aria-hidden="true"
          style={{ background: 'linear-gradient(180deg, rgba(14,32,53,0.78) 0%, rgba(14,32,53,0.94) 100%)' }} />
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true"
          style={{ background: 'radial-gradient(ellipse 55% 45% at 50% 75%, rgba(201,152,58,0.11) 0%, transparent 70%)' }} />
        <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link to="/blog" className="inline-flex items-center gap-1.5 text-gold-300 hover:text-gold-200 text-sm font-medium mb-6 transition-colors">
            <ArrowLeft size={15} aria-hidden="true" /> All Articles
          </Link>
          {post.category && (
            <span className="inline-block px-3 py-1 rounded-full text-[0.68rem] font-bold bg-gold-500/90 text-[#05070D] mb-4">
              {post.category}
            </span>
          )}
          <h1 className="font-playfair text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-5 leading-tight">
            {post.title}
          </h1>
          <div className="flex items-center gap-3 text-sm text-white/50">
            <Calendar size={14} aria-hidden="true" />
            <span>{fmtDate(post.published_at)}</span>
            {post.author && <><span aria-hidden="true">·</span><span>{post.author}</span></>}
          </div>
        </div>
      </section>

      {/* Article body */}
      <article className="py-16 ih-section" aria-label="Article content">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            {post.excerpt && (
              <p className="font-cormorant text-xl md:text-2xl text-gold-200 italic leading-relaxed mb-10 border-l-2 border-gold-400 pl-5">
                {post.excerpt}
              </p>
            )}
            <div className="prose-content text-white/75 text-[0.95rem] leading-[1.8] space-y-5">
              {post.content
                ? post.content.split('\n').map((line, i) => {
                    const trimmed = line.trim();
                    if (!trimmed) return null;
                    if (trimmed.startsWith('## ')) {
                      return <h2 key={i} className="font-playfair text-2xl font-bold text-white mt-8 mb-3">{trimmed.slice(3)}</h2>;
                    }
                    if (trimmed.startsWith('# ')) {
                      return <h2 key={i} className="font-playfair text-2xl font-bold text-white mt-8 mb-3">{trimmed.slice(2)}</h2>;
                    }
                    if (trimmed.startsWith('- ') || trimmed.startsWith('* ')) {
                      return <li key={i} className="flex gap-2 text-white/70"><span className="text-gold-400 mt-0.5">•</span><span>{trimmed.slice(2)}</span></li>;
                    }
                    return <p key={i}>{trimmed}</p>;
                  })
                : <p className="text-white/50">This article has no content yet.</p>
              }
            </div>
          </ScrollReveal>

          {/* Share bar */}
          <div className="mt-12 pt-6 border-t border-white/10 flex items-center justify-between flex-wrap gap-4">
            <Link to="/blog" className="inline-flex items-center gap-1.5 text-gold-300 hover:text-gold-200 text-sm font-medium transition-colors">
              <ArrowLeft size={15} aria-hidden="true" /> Back to Blog
            </Link>
            <div className="flex items-center gap-2">
              <span className="text-xs text-white/40 mr-1">Share:</span>
              <button onClick={copyLink} aria-label={copied ? 'Link copied' : 'Copy link'}
                className="w-9 h-9 rounded-full bg-white/8 hover:bg-white/15 border border-white/15 flex items-center justify-center text-white/60 hover:text-gold-300 transition-all">
                {copied ? <Check size={13} className="text-green-400" aria-hidden="true" /> : <Copy size={13} aria-hidden="true" />}
              </button>
              <button onClick={() => window.open(`https://wa.me/?text=${encodeURIComponent(post.title + ' — ' + window.location.href)}`, '_blank')} aria-label="Share on WhatsApp"
                className="w-9 h-9 rounded-full bg-[#25D366]/10 hover:bg-[#25D366]/20 border border-white/15 flex items-center justify-center text-[#128C7E] transition-all">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
              </button>
              <button onClick={() => window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`, '_blank')} aria-label="Share on Facebook"
                className="w-9 h-9 rounded-full bg-[#1877F2]/15 hover:bg-[#1877F2]/25 border border-white/15 flex items-center justify-center text-[#1877F2] transition-all">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
              </button>
              <button onClick={() => window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title + ' — ' + window.location.href)}`, '_blank')} aria-label="Share on X"
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/15 border border-white/15 flex items-center justify-center text-white/70 transition-all">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
              </button>
            </div>
          </div>
        </div>
      </article>

      {/* Related posts */}
      {related.length > 0 && (
        <section className="py-20 ih-section border-t border-white/10" aria-labelledby="related-heading">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 id="related-heading" className="font-playfair text-2xl md:text-3xl font-bold text-white mb-10 text-center">
              More Articles
            </h2>
            <div className="grid sm:grid-cols-3 gap-6">
              {related.map((r) => (
                <ScrollReveal key={r.id}>
                  <Link to={`/blog/${r.slug}`} className="premium-card block rounded-2xl overflow-hidden ih-card group">
                    <div className="relative h-40 overflow-hidden">
                      <img src={r.cover_image || PLACEHOLDER_IMG} alt={r.title} loading="lazy"
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#05070D]/70 to-transparent" aria-hidden="true" />
                    </div>
                    <div className="p-5">
                      <div className="flex items-center gap-2 text-[0.68rem] text-white/40 mb-2">
                        <Calendar size={11} aria-hidden="true" />
                        <span>{fmtDate(r.published_at)}</span>
                      </div>
                      <h3 className="font-playfair text-base font-bold text-white leading-snug group-hover:text-gold-300 transition-colors">{r.title}</h3>
                      <p className="text-white/45 text-xs mt-2 line-clamp-2">{r.excerpt}</p>
                    </div>
                  </Link>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="py-20 ih-section text-center" aria-label="Call to action">
        <div className="max-w-xl mx-auto px-4">
          <ScrollReveal>
            <h2 className="font-playfair text-3xl font-bold text-white mb-4">Start Your Faith Journey</h2>
            <p className="text-white/55 mb-8">Get a free 7-day devotional sample for the whole family.</p>
            <Link to="/free-sample" className="inline-flex items-center gap-2 px-8 py-4 ih-btn-gold">
              Get Free Sample <ArrowRight size={17} aria-hidden="true" />
            </Link>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}
