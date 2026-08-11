import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock, Mail, ArrowRight, AlertCircle, Eye, EyeOff } from 'lucide-react';
import { getSupabaseClient } from '@/lib/supabase';
import { useSEO } from '@/hooks/useSEO';

export default function AdminLoginPage() {
  useSEO({
    title: 'Admin Login | In Him Daily',
    description: 'Sign in to access the In Him Daily admin dashboard.',
    canonicalPath: '/admin/login',
  });

  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    async function checkSession() {
      try {
        const supabase = getSupabaseClient();
        const { data: { session } } = await supabase.auth.getSession();
        if (session) navigate('/admin', { replace: true });
      } catch {
        /* stay on login */
      } finally {
        setChecking(false);
      }
    }
    checkSession();
  }, [navigate]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email.trim() || !password) {
      setError('Please enter your email and password.');
      return;
    }
    setLoading(true);
    setError('');
    try {
      const supabase = getSupabaseClient();
      const { error: err } = await supabase.auth.signInWithPassword({
        email: email.trim(),
        password,
      });
      if (err) throw err;
      navigate('/admin', { replace: true });
    } catch (err) {
      setError(
        err instanceof Error && err.message
          ? err.message
          : 'Invalid email or password.'
      );
    } finally {
      setLoading(false);
    }
  }

  if (checking) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-gold-400/30 border-t-gold-400 rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-20 overflow-hidden relative">
      {/* Background glow */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true"
        style={{ background: 'radial-gradient(ellipse 50% 40% at 50% 40%, rgba(201,152,58,0.10) 0%, transparent 70%)' }} />

      <div className="relative z-10 w-full max-w-md">
        {/* Logo / Title */}
        <div className="text-center mb-8">
          <div className="w-14 h-14 mx-auto mb-5 rounded-xl bg-gold-400/10 border border-gold-400/30 flex items-center justify-center">
            <Lock size={24} className="text-gold-300" aria-hidden="true" />
          </div>
          <p className="text-gold-400 text-[0.72rem] font-semibold tracking-[0.16em] uppercase mb-2">In Him Daily</p>
          <h1 className="font-playfair text-3xl font-bold text-white mb-2">Admin Login</h1>
          <p className="text-white/50 text-sm">Sign in to access the ministry dashboard</p>
        </div>

        {/* Form card */}
        <div className="ih-card rounded-2xl p-7 sm:p-8">
          {error && (
            <div className="mb-5 p-3.5 rounded-xl bg-red-500/10 border border-red-500/20 flex gap-2.5 items-start">
              <AlertCircle size={17} className="text-red-400 shrink-0 mt-0.5" aria-hidden="true" />
              <p className="text-sm text-red-300">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email */}
            <div>
              <label htmlFor="admin-email" className="block text-xs font-semibold text-white/50 uppercase tracking-wider mb-1.5">
                Email
              </label>
              <div className="relative">
                <Mail size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40" aria-hidden="true" />
                <input
                  id="admin-email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  autoComplete="email"
                  className="ih-input w-full pl-11 pr-4 py-3 text-sm"
                  placeholder="you@example.com"
                  disabled={loading}
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label htmlFor="admin-password" className="block text-xs font-semibold text-white/50 uppercase tracking-wider mb-1.5">
                Password
              </label>
              <div className="relative">
                <Lock size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40" aria-hidden="true" />
                <input
                  id="admin-password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  autoComplete="current-password"
                  className="ih-input w-full pl-11 pr-11 py-3 text-sm"
                  placeholder="Enter your password"
                  disabled={loading}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-1.5 rounded-lg text-white/40 hover:text-white/70 transition-colors"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                  tabIndex={-1}
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-gold-500 hover:bg-gold-400 text-[#05070D] text-sm font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <span className="flex items-center gap-2">
                  <span className="w-4 h-4 border-2 border-[#05070D]/30 border-t-[#05070D] rounded-full animate-spin" />
                  Signing in...
                </span>
              ) : (
                <>
                  Sign In <ArrowRight size={16} aria-hidden="true" />
                </>
              )}
            </button>
          </form>
        </div>

        <p className="text-center text-white/30 text-xs mt-6">
          Authorized personnel only. In Him Daily Ministry.
        </p>
      </div>
    </div>
  );
}
