import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Calendar, User, ArrowLeft, Tag, PenLine } from 'lucide-react';
import { getSupabaseClient } from '@/lib/supabase';
import { useSEO } from '@/hooks/useSEO';
import ScrollReveal from '@/components/ScrollReveal';

type BlogPost = {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  content: string;
  cover_image_url: string | null;
  author: string | null;
  category: string | null;
  tags: string[] | null;
  published_at: string | null;
};

export default function BlogPostPage() {
  const { slug } = useParams<{ slug: string }>();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useSEO({
    title: post ? `${post.title} | In Him Daily Blog` : 'Article | In Him Daily',
    description: post?.excerpt ?? 'In Him Daily Blog',
    canonicalPath: `/blog/${slug}`,
  });

  useEffect(() => {
    async function load() {
      if (!slug) return;
      setLoading(true);
      setError('');
      try {
        const supabase = getSupabaseClient();
        const { data, error: err } = await supabase
          .from('blog_posts')
          .select('*')
          .eq('slug', slug)
          .eq('status', 'published')
          .maybeSingle();
        if (err) throw err;
        if (!data) {
          setError('Article not found.');
          setPost(null);
        } else {
          setPost(data as BlogPost);
        }
      } catch {
        setError('Article could not be loaded. Please try again later.');
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [slug]);

  function fmtDate(iso: string | null) {
    if (!iso) return '';
    return new Date(iso).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });
  }

  if (loading) {
    return (
      <div className="min-h-screen pt-32 flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-gold-400/30 border-t-gold-400 rounded-full animate-spin" />
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="min-h-screen pt-32 flex items-center justify-center px-4">
        <div className="text-center max-w-md">
          <PenLine size={40} className="text-white/20 mx-auto mb-4" aria-hidden="true" />
          <h1 className="font-playfair text-2xl font-bold text-white mb-3">
            {error || 'Article not found'}
          </h1>
          <Link to="/blog" className="inline-flex items-center gap-2 text-gold-300 hover:text-gold-200 transition-colors text-sm font-semibold">
            <ArrowLeft size={15} aria-hidden="true" /> Back to blog
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="overflow-x-hidden">
      {/* Hero */}
      <section className="relative pt-28 pb-16 overflow-hidden" aria-label="Article hero">
        <div className="absolute inset-0" aria-hidden="true"
          style={{ background: 'radial-gradient(ellipse 60% 50% at 50% 30%, rgba(201,152,58,0.10) 0%, transparent 70%)' }} />
        <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link to="/blog" className="inline-flex items-center gap-2 text-white/50 hover:text-gold-300 transition-colors text-sm mb-6">
            <ArrowLeft size={15} aria-hidden="true" /> Back to blog
          </Link>
          {post.category && (
            <p className="text-gold-400 text-[0.72rem] font-semibold tracking-[0.16em] uppercase mb-3">{post.category}</p>
          )}
          <h1 className="font-playfair text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-5 leading-tight">
            {post.title}
          </h1>
          {post.excerpt && (
            <p className="text-white/60 text-lg leading-relaxed mb-5">{post.excerpt}</p>
          )}
          <div className="flex flex-wrap items-center gap-5 text-sm text-white/45">
            {post.author && (
              <span className="flex items-center gap-1.5">
                <User size={14} aria-hidden="true" /> {post.author}
              </span>
            )}
            {post.published_at && (
              <span className="flex items-center gap-1.5">
                <Calendar size={14} aria-hidden="true" /> {fmtDate(post.published_at)}
              </span>
            )}
          </div>
        </div>
      </section>

      {/* Cover image */}
      {post.cover_image_url && (
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
          <div className="aspect-[16/9] rounded-2xl overflow-hidden">
            <img
              src={post.cover_image_url}
              alt={post.title}
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      )}

      {/* Article body */}
      <section className="pb-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <article
              className="blog-content text-white/75 leading-relaxed text-[1.05rem]"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />
          </ScrollReveal>

          {/* Tags */}
          {post.tags && post.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-10 pt-8 border-t border-white/10">
              {post.tags.map((tag) => (
                <span key={tag} className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs text-white/50">
                  <Tag size={11} aria-hidden="true" /> {tag}
                </span>
              ))}
            </div>
          )}

          {/* Back link */}
          <div className="mt-12 text-center">
            <Link to="/blog" className="inline-flex items-center gap-2 px-6 py-3 ih-btn-ghost text-sm">
              <ArrowLeft size={15} aria-hidden="true" /> All articles
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
