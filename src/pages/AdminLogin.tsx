import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { getSupabaseClient } from '@/lib/supabase';
import { Lock, Mail, Loader2, AlertCircle, ArrowLeft } from 'lucide-react';

export default function AdminLogin() {
  const navigate = useNavigate();
  const location = useLocation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    let mounted = true;
    try {
      const supabase = getSupabaseClient();
      supabase.auth.getSession()
        .then(({ data, error }) => {
          if (!mounted) return;
          if (error) { setChecking(false); return; }
          if (data.session) {
            navigate('/admin', { replace: true });
          } else {
            setChecking(false);
          }
        })
        .catch(() => { if (mounted) setChecking(false); });
    } catch {
      if (mounted) setChecking(false);
    }
    return () => { mounted = false; };
  }, [navigate]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const supabase = getSupabaseClient();
      const { error: signInError, data } = await supabase.auth.signInWithPassword({
        email: email.trim(),
        password,
      });
      if (signInError) throw signInError;
      if (!data.session) throw new Error('No session returned');
      const dest = location.state?.from?.pathname ?? '/admin';
      navigate(dest, { replace: true });
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : '';
      if (msg.includes('Invalid login credentials')) {
        setError('Invalid email or password. Please try again.');
      } else if (msg.includes('not configured')) {
        setError('Submission services are not configured for this deployment.');
      } else {
        setError('Sign-in failed. Please check your connection and try again.');
      }
    } finally {
      setLoading(false);
    }
  }

  if (checking) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-20">
        <Loader2 size={28} className="animate-spin text-gold-400" aria-hidden="true" />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 pt-20 pb-12">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gold-400/15 border border-gold-400/30 mb-4">
            <Lock size={28} className="text-gold-300" aria-hidden="true" />
          </div>
          <p className="text-gold-400 text-[0.72rem] font-semibold tracking-[0.16em] uppercase mb-1">Ministry Dashboard</p>
          <h1 className="font-playfair text-2xl font-bold text-white">Admin Sign In</h1>
          <p className="text-white/50 text-sm mt-2">Sign in to manage In Him Daily submissions.</p>
        </div>

        <form onSubmit={handleSubmit} className="ih-card p-7 space-y-5">
          {error && (
            <div className="p-3.5 rounded-xl bg-red-500/10 border border-red-500/20 flex gap-2.5 items-start" role="alert">
              <AlertCircle size={18} className="text-red-400 shrink-0 mt-0.5" aria-hidden="true" />
              <p className="text-sm text-red-200">{error}</p>
            </div>
          )}

          <div>
            <label htmlFor="email" className="block text-[0.72rem] font-semibold text-white/60 uppercase tracking-wider mb-1.5">
              Email Address
            </label>
            <div className="relative">
              <Mail size={17} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/30" aria-hidden="true" />
              <input
                id="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/30 text-sm focus:outline-none focus:border-gold-400/50 focus:bg-white/10 transition-colors"
                placeholder="you@inhimdaily.org"
              />
            </div>
          </div>

          <div>
            <label htmlFor="password" className="block text-[0.72rem] font-semibold text-white/60 uppercase tracking-wider mb-1.5">
              Password
            </label>
            <div className="relative">
              <Lock size={17} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/30" aria-hidden="true" />
              <input
                id="password"
                type="password"
                autoComplete="current-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/30 text-sm focus:outline-none focus:border-gold-400/50 focus:bg-white/10 transition-colors"
                placeholder="Enter your password"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full px-6 py-3 ih-btn-gold text-sm flex items-center justify-center gap-2 disabled:opacity-60"
          >
            {loading ? (
              <>
                <Loader2 size={16} className="animate-spin" aria-hidden="true" />
                Signing in…
              </>
            ) : 'Sign In'}
          </button>
        </form>

        <div className="text-center mt-6">
          <button
            onClick={() => navigate('/')}
            className="inline-flex items-center gap-1.5 text-white/40 hover:text-white/70 text-sm transition-colors"
          >
            <ArrowLeft size={15} aria-hidden="true" />
            Back to website
          </button>
        </div>
      </div>
    </div>
  );
}
