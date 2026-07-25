import { Link } from 'react-router-dom';
import { Menu, X, BookOpen, ShoppingBag } from 'lucide-react';
import { useEffect, useState } from 'react';

const links = [
  { href: '/', label: 'Home' },
  { href: '/books', label: 'Collections', active: true },
  { href: '/about', label: 'About' },
  { href: '/devotionals', label: 'Resources' },
  { href: '/communities', label: 'Blog' },
  { href: 'https://www.youtube.com', label: 'YouTube', external: true },
  { href: '/contact', label: 'Contact' },
];

export default function BooksNav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-[#05070D]/80 backdrop-blur-xl border-b border-gold-400/15'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <img
              src="/images/733127106_122096833941384062_9064072413288732878_n.jpg"
              alt="In Him Daily"
              className="w-9 h-9 rounded-full object-cover border border-gold-400/40 group-hover:border-gold-400/80 transition-colors"
            />
            <span className="font-cinzel text-base sm:text-lg font-semibold tracking-[0.2em] text-white">
              IN HIM DAILY
            </span>
          </Link>

          {/* Desktop links */}
          <div className="hidden lg:flex items-center gap-8">
            {links.map((l) =>
              l.external ? (
                <a
                  key={l.label}
                  href={l.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm font-medium tracking-wide text-white/70 hover:text-gold-300 transition-colors"
                >
                  {l.label}
                </a>
              ) : (
                <Link
                  key={l.label}
                  to={l.href}
                  className={`text-sm font-medium tracking-wide transition-colors ${
                    l.active ? 'text-gold-300' : 'text-white/70 hover:text-gold-300'
                  }`}
                >
                  {l.label}
                </Link>
              )
            )}
          </div>

          {/* Buttons */}
          <div className="hidden lg:flex items-center gap-3">
            <Link
              to="/books"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-gold-400/40 text-gold-200 text-sm font-semibold hover:bg-gold-400/10 hover:border-gold-400/70 transition-all"
            >
              <BookOpen size={15} /> Explore
            </Link>
            <Link
              to="/books#pricing"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-[#05070D] text-sm font-bold bk-shimmer shadow-[0_0_24px_rgba(212,175,55,0.35)] hover:shadow-[0_0_36px_rgba(212,175,55,0.55)] transition-all"
            >
              <ShoppingBag size={15} /> Shop Now
            </Link>
          </div>

          {/* Mobile toggle */}
          <button
            className="lg:hidden text-white p-2"
            onClick={() => setOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            {open ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="lg:hidden bg-[#05070D]/95 backdrop-blur-xl border-t border-gold-400/15">
          <div className="px-4 py-6 space-y-4">
            {links.map((l) =>
              l.external ? (
                <a
                  key={l.label}
                  href={l.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-white/80 hover:text-gold-300 font-medium"
                  onClick={() => setOpen(false)}
                >
                  {l.label}
                </a>
              ) : (
                <Link
                  key={l.label}
                  to={l.href}
                  className={`block font-medium ${l.active ? 'text-gold-300' : 'text-white/80 hover:text-gold-300'}`}
                  onClick={() => setOpen(false)}
                >
                  {l.label}
                </Link>
              )
            )}
            <Link
              to="/books#pricing"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-[#05070D] text-sm font-bold bk-shimmer"
              onClick={() => setOpen(false)}
            >
              <ShoppingBag size={15} /> Shop Now
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
