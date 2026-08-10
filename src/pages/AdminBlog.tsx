import { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { FileText, Plus, Pencil, Trash2, Eye, X, Loader2, AlertCircle, CheckCircle2, Calendar } from 'lucide-react';
import {
  fetchAllPosts, createPost, updatePost, deletePost, slugify, type BlogPost,
} from '@/lib/supabase';

type EditorState = {
  id: string | null;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  cover_image: string;
  author: string;
  category: string;
  status: string;
  published_at: string;
};

const EMPTY: EditorState = {
  id: null, title: '', slug: '', excerpt: '', content: '',
  cover_image: '', author: 'In Him Daily', category: 'General',
  status: 'draft', published_at: '',
};

function fmtDate(iso: string | null) {
  if (!iso) return '—';
  return new Date(iso).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
}

export default function AdminBlog() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [editor, setEditor] = useState<EditorState | null>(null);
  const [saving, setSaving] = useState(false);
  const [saveError, setSaveError] = useState('');
  const [saved, setSaved] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [deleting, setDeleting] = useState(false);

  const load = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const data = await fetchAllPosts();
      setPosts(data);
    } catch {
      setError('Could not load blog posts. Please try again.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { load(); }, [load]);

  function openNew() {
    setEditor({ ...EMPTY, published_at: new Date().toISOString().slice(0, 16) });
    setSaveError('');
    setSaved(false);
  }

  function openEdit(p: BlogPost) {
    setEditor({
      id: p.id,
      title: p.title,
      slug: p.slug,
      excerpt: p.excerpt ?? '',
      content: p.content ?? '',
      cover_image: p.cover_image ?? '',
      author: p.author ?? 'In Him Daily',
      category: p.category ?? 'General',
      status: p.status,
      published_at: p.published_at ? new Date(p.published_at).toISOString().slice(0, 16) : '',
    });
    setSaveError('');
    setSaved(false);
  }

  function closeEditor() {
    setEditor(null);
    setSaveError('');
    setSaved(false);
  }

  async function handleSave() {
    if (!editor) return;
    if (!editor.title.trim()) { setSaveError('Title is required.'); return; }
    if (!editor.slug.trim()) { setSaveError('Slug is required.'); return; }

    setSaving(true);
    setSaveError('');
    setSaved(false);

    const payload = {
      title: editor.title.trim(),
      slug: editor.slug.trim(),
      excerpt: editor.excerpt.trim() || undefined,
      content: editor.content || undefined,
      cover_image: editor.cover_image.trim() || undefined,
      author: editor.author.trim() || 'In Him Daily',
      category: editor.category.trim() || 'General',
      status: editor.status,
      published_at: editor.status === 'published'
        ? (editor.published_at ? new Date(editor.published_at).toISOString() : new Date().toISOString())
        : null,
    };

    try {
      if (editor.id) {
        await updatePost(editor.id, payload);
      } else {
        await createPost(payload);
      }
      setSaved(true);
      setEditor(null);
      await load();
    } catch (err) {
      setSaveError(err instanceof Error ? err.message : 'Could not save the article.');
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete() {
    if (!deleteId) return;
    setDeleting(true);
    try {
      await deletePost(deleteId);
      setDeleteId(null);
      await load();
    } catch {
      setError('Could not delete the article.');
    } finally {
      setDeleting(false);
    }
  }

  const sorted = [...posts].sort((a, b) => {
    if (a.status !== b.status) return a.status === 'published' ? -1 : 1;
    return new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime();
  });

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <FileText size={22} className="text-gold-300" aria-hidden="true" />
          <h2 className="font-playfair text-xl font-bold text-white">Blog Articles</h2>
          <span className="text-xs text-white/40">({posts.length})</span>
        </div>
        <button onClick={openNew}
          className="flex items-center gap-2 px-5 py-2.5 ih-btn-gold text-sm">
          <Plus size={16} aria-hidden="true" /> New Article
        </button>
      </div>

      {error && (
        <div className="mb-4 p-4 rounded-xl bg-amber-500/10 border border-amber-500/20 flex gap-3 items-start" role="alert">
          <AlertCircle size={18} className="text-amber-400 shrink-0 mt-0.5" aria-hidden="true" />
          <p className="text-sm text-amber-200">{error}</p>
        </div>
      )}

      {loading ? (
        <div className="flex items-center justify-center py-20 text-white/50">
          <Loader2 size={22} className="animate-spin mr-3" aria-hidden="true" />
          Loading articles…
        </div>
      ) : sorted.length === 0 ? (
        <div className="text-center py-20 ih-card">
          <FileText size={36} className="mx-auto text-white/20 mb-4" aria-hidden="true" />
          <p className="text-white/50 mb-4">No articles yet.</p>
          <button onClick={openNew} className="inline-flex items-center gap-2 px-5 py-2.5 ih-btn-gold text-sm">
            <Plus size={16} aria-hidden="true" /> Write Your First Article
          </button>
        </div>
      ) : (
        <div className="ih-card overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-white/5 text-white/50 text-[0.72rem] uppercase tracking-wider">
              <tr>
                {['Title', 'Category', 'Status', 'Date', 'Actions'].map((h) => (
                  <th key={h} className="px-5 py-3 text-left font-semibold">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-white/10">
              {sorted.map((p) => (
                <tr key={p.id} className="hover:bg-white/5 transition-colors">
                  <td className="px-5 py-3.5 font-medium text-white max-w-xs">
                    <span className="line-clamp-1">{p.title}</span>
                    <span className="text-white/30 text-xs font-normal">/{p.slug}</span>
                  </td>
                  <td className="px-5 py-3.5 text-white/60 text-[0.8rem]">{p.category ?? '—'}</td>
                  <td className="px-5 py-3.5">
                    <span className={`inline-block px-2.5 py-0.5 rounded-full text-[0.68rem] font-semibold border ${
                      p.status === 'published'
                        ? 'bg-green-500/15 text-green-300 border-green-500/30'
                        : 'bg-amber-500/15 text-amber-300 border-amber-500/30'
                    }`}>
                      {p.status}
                    </span>
                  </td>
                  <td className="px-5 py-3.5 text-white/60 text-[0.8rem] whitespace-nowrap">
                    <div className="flex items-center gap-1.5">
                      <Calendar size={11} aria-hidden="true" />
                      {fmtDate(p.published_at)}
                    </div>
                  </td>
                  <td className="px-5 py-3.5">
                    <div className="flex items-center gap-1">
                      {p.status === 'published' && (
                        <Link to={`/blog/${p.slug}`} target="_blank"
                          className="w-8 h-8 rounded-lg bg-white/5 hover:bg-white/10 flex items-center justify-center text-white/50 hover:text-gold-300 transition-all"
                          aria-label="View article">
                          <Eye size={14} aria-hidden="true" />
                        </Link>
                      )}
                      <button onClick={() => openEdit(p)}
                        className="w-8 h-8 rounded-lg bg-white/5 hover:bg-white/10 flex items-center justify-center text-white/50 hover:text-gold-300 transition-all"
                        aria-label="Edit article">
                        <Pencil size={14} aria-hidden="true" />
                      </button>
                      <button onClick={() => setDeleteId(p.id)}
                        className="w-8 h-8 rounded-lg bg-white/5 hover:bg-red-500/20 flex items-center justify-center text-white/50 hover:text-red-400 transition-all"
                        aria-label="Delete article">
                        <Trash2 size={14} aria-hidden="true" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* ─── Editor modal ─── */}
      {editor && (
        <div className="fixed inset-0 z-50 flex items-start justify-center p-4 overflow-y-auto" role="dialog" aria-modal="true">
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm" onClick={closeEditor} aria-hidden="true" />
          <div className="relative z-10 w-full max-w-2xl my-8 ih-card rounded-2xl">
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 sticky top-0 bg-[#0B1322] rounded-t-2xl z-20">
              <h3 className="font-playfair text-lg font-bold text-white">
                {editor.id ? 'Edit Article' : 'New Article'}
              </h3>
              <button onClick={closeEditor} className="w-8 h-8 rounded-lg bg-white/5 hover:bg-white/10 flex items-center justify-center text-white/50" aria-label="Close">
                <X size={16} aria-hidden="true" />
              </button>
            </div>

            {/* Body */}
            <div className="p-6 space-y-5 max-h-[60vh] overflow-y-auto">
              {saveError && (
                <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/20 flex gap-2 items-start" role="alert">
                  <AlertCircle size={16} className="text-red-400 shrink-0 mt-0.5" aria-hidden="true" />
                  <p className="text-sm text-red-200">{saveError}</p>
                </div>
              )}

              {/* Title */}
              <div>
                <label className="block text-[0.72rem] font-semibold text-white/50 uppercase tracking-wider mb-1.5">Title</label>
                <input
                  type="text"
                  value={editor.title}
                  onChange={(e) => {
                    const title = e.target.value;
                    setEditor((prev) => prev ? { ...prev, title, slug: prev.id ? prev.slug : slugify(title) } : prev);
                  }}
                  className="w-full px-4 py-3 ih-input text-white text-sm"
                  placeholder="Article title"
                />
              </div>

              {/* Slug */}
              <div>
                <label className="block text-[0.72rem] font-semibold text-white/50 uppercase tracking-wider mb-1.5">URL Slug</label>
                <div className="flex items-center gap-2">
                  <span className="text-white/30 text-sm whitespace-nowrap">/blog/</span>
                  <input
                    type="text"
                    value={editor.slug}
                    onChange={(e) => setEditor((prev) => prev ? { ...prev, slug: slugify(e.target.value) } : prev)}
                    className="flex-1 px-4 py-3 ih-input text-white text-sm"
                    placeholder="article-url-slug"
                  />
                </div>
              </div>

              {/* Category + Author */}
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[0.72rem] font-semibold text-white/50 uppercase tracking-wider mb-1.5">Category</label>
                  <input
                    type="text"
                    value={editor.category}
                    onChange={(e) => setEditor((prev) => prev ? { ...prev, category: e.target.value } : prev)}
                    className="w-full px-4 py-3 ih-input text-white text-sm"
                    placeholder="e.g. Devotionals, Family, Prayer"
                  />
                </div>
                <div>
                  <label className="block text-[0.72rem] font-semibold text-white/50 uppercase tracking-wider mb-1.5">Author</label>
                  <input
                    type="text"
                    value={editor.author}
                    onChange={(e) => setEditor((prev) => prev ? { ...prev, author: e.target.value } : prev)}
                    className="w-full px-4 py-3 ih-input text-white text-sm"
                    placeholder="Author name"
                  />
                </div>
              </div>

              {/* Cover image */}
              <div>
                <label className="block text-[0.72rem] font-semibold text-white/50 uppercase tracking-wider mb-1.5">Cover Image URL (optional)</label>
                <input
                  type="text"
                  value={editor.cover_image}
                  onChange={(e) => setEditor((prev) => prev ? { ...prev, cover_image: e.target.value } : prev)}
                  className="w-full px-4 py-3 ih-input text-white text-sm"
                  placeholder="https://…"
                />
                {editor.cover_image && (
                  <img src={editor.cover_image} alt="Cover preview" className="mt-3 w-full h-32 object-cover rounded-lg border border-white/10" />
                )}
              </div>

              {/* Excerpt */}
              <div>
                <label className="block text-[0.72rem] font-semibold text-white/50 uppercase tracking-wider mb-1.5">Excerpt (short summary)</label>
                <textarea
                  value={editor.excerpt}
                  onChange={(e) => setEditor((prev) => prev ? { ...prev, excerpt: e.target.value } : prev)}
                  rows={2}
                  className="w-full px-4 py-3 ih-input text-white text-sm resize-y"
                  placeholder="A brief summary shown on the blog listing page"
                />
              </div>

              {/* Content */}
              <div>
                <label className="block text-[0.72rem] font-semibold text-white/50 uppercase tracking-wider mb-1.5">Article Content</label>
                <p className="text-xs text-white/35 mb-2">
                  Write your article below. Use blank lines to separate paragraphs. Lines starting with <code className="text-gold-300"># </code> become headings, and lines starting with <code className="text-gold-300">- </code> become bullet points.
                </p>
                <textarea
                  value={editor.content}
                  onChange={(e) => setEditor((prev) => prev ? { ...prev, content: e.target.value } : prev)}
                  rows={12}
                  className="w-full px-4 py-3 ih-input text-white text-sm resize-y font-mono leading-relaxed"
                  placeholder="Write your article here…"
                />
              </div>

              {/* Status + Date */}
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[0.72rem] font-semibold text-white/50 uppercase tracking-wider mb-1.5">Status</label>
                  <select
                    value={editor.status}
                    onChange={(e) => setEditor((prev) => prev ? { ...prev, status: e.target.value } : prev)}
                    className="w-full px-4 py-3 ih-input text-white text-sm"
                  >
                    <option value="draft" className="bg-[#0B1322]">Draft</option>
                    <option value="published" className="bg-[#0B1322]">Published</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[0.72rem] font-semibold text-white/50 uppercase tracking-wider mb-1.5">Publish Date</label>
                  <input
                    type="datetime-local"
                    value={editor.published_at}
                    onChange={(e) => setEditor((prev) => prev ? { ...prev, published_at: e.target.value } : prev)}
                    disabled={editor.status !== 'published'}
                    className="w-full px-4 py-3 ih-input text-white text-sm disabled:opacity-40"
                  />
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between gap-3 px-6 py-4 border-t border-white/10 sticky bottom-0 bg-[#0B1322] rounded-b-2xl">
              <button onClick={closeEditor} className="px-5 py-2.5 ih-btn-ghost text-sm">
                Cancel
              </button>
              <button onClick={handleSave} disabled={saving}
                className="flex items-center gap-2 px-6 py-2.5 ih-btn-gold text-sm disabled:opacity-50">
                {saving ? <Loader2 size={15} className="animate-spin" aria-hidden="true" /> : <CheckCircle2 size={15} aria-hidden="true" />}
                {saving ? 'Saving…' : editor.id ? 'Update Article' : 'Create Article'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ─── Delete confirm ─── */}
      {deleteId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" role="dialog" aria-modal="true">
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setDeleteId(null)} aria-hidden="true" />
          <div className="relative z-10 w-full max-w-sm ih-card rounded-2xl p-6 text-center">
            <div className="w-12 h-12 rounded-full bg-red-500/15 flex items-center justify-center mx-auto mb-4">
              <Trash2 size={22} className="text-red-400" aria-hidden="true" />
            </div>
            <h3 className="font-playfair text-lg font-bold text-white mb-2">Delete this article?</h3>
            <p className="text-white/50 text-sm mb-6">This cannot be undone. The article will be permanently removed.</p>
            <div className="flex gap-3 justify-center">
              <button onClick={() => setDeleteId(null)} className="px-5 py-2.5 ih-btn-ghost text-sm">
                Cancel
              </button>
              <button onClick={handleDelete} disabled={deleting}
                className="flex items-center gap-2 px-5 py-2.5 bg-red-500/20 hover:bg-red-500/30 border border-red-500/30 text-red-300 rounded-full text-sm font-semibold transition-all disabled:opacity-50">
                {deleting ? <Loader2 size={15} className="animate-spin" aria-hidden="true" /> : <Trash2 size={15} aria-hidden="true" />}
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {saved && (
        <div className="fixed bottom-6 right-6 z-50 px-5 py-3 bg-green-500/15 border border-green-500/30 rounded-xl flex items-center gap-2 text-green-300 text-sm shadow-lg animate-in fade-in slide-in-from-bottom-2">
          <CheckCircle2 size={16} aria-hidden="true" /> Article saved successfully.
        </div>
      )}
    </div>
  );
}
