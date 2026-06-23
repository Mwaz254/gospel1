'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';
import Image from 'next/image';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/devotionals', label: 'Devotionals' },
  { href: '/free-sample', label: 'Free Sample' },
  { href: '/prayer-partners', label: 'Prayer Partners' },
  { href: '/contact', label: 'Contact' },
];

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? 'glass-nav shadow-glass py-1' : 'bg-transparent py-3'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div
              className={`relative flex-shrink-0 transition-all duration-500 ${
                scrolled ? 'w-12 h-12' : 'w-16 h-16'
              } drop-shadow-md group-hover:drop-shadow-lg`}
            >
              <Image
                src="/images/ChatGPT_Image_Jun_12,_2026,_11_01_49_PM.png"
                alt="In Him Daily Logo"
                fill
                className="object-contain transition-transform duration-300 group-hover:scale-105"
                sizes="64px"
                priority
              />
            </div>
            <div className="hidden sm:block">
              <span
                className={`font-playfair font-bold leading-none block transition-all duration-500 ${
                  scrolled ? 'text-midnight-700 text-lg' : 'text-ivory-100 text-xl'
                }`}
              >
                In Him{' '}
                <span className="text-gold-400 italic">Daily</span>
              </span>
              <span
                className={`text-xs tracking-widest uppercase transition-all duration-500 ${
                  scrolled ? 'text-midnight-500' : 'text-ivory-300/70'
                }`}
              >
                Every Generation. One Jesus.
              </span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
                  pathname === link.href
                    ? scrolled
                      ? 'text-midnight-700 bg-gold-50/80'
                      : 'text-gold-300 bg-white/10'
                    : scrolled
                    ? 'text-midnight-700/70 hover:text-midnight-700 hover:bg-ivory-200/60'
                    : 'text-ivory-200/80 hover:text-ivory-100 hover:bg-white/10'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* CTA Button */}
          <div className="hidden lg:flex items-center">
            <Link
              href="/free-sample"
              className={`px-5 py-2.5 text-sm font-semibold rounded-full transition-all duration-300 hover:shadow-gold hover:-translate-y-0.5 ${
                scrolled
                  ? 'bg-midnight-700 text-ivory-100 hover:bg-midnight-600'
                  : 'bg-gold-400 text-midnight-700 hover:bg-gold-300'
              }`}
            >
              Get Free Sample
            </Link>
          </div>

          {/* Mobile Toggle */}
          <button
            className={`lg:hidden p-2 rounded-lg transition-colors ${
              scrolled ? 'text-midnight-700 hover:bg-ivory-300' : 'text-ivory-100 hover:bg-white/10'
            }`}
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`lg:hidden transition-all duration-300 overflow-hidden ${
          mobileOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="glass-nav border-t border-gold-100/30 px-4 py-4 space-y-1">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`block px-4 py-3 text-sm font-medium rounded-lg transition-colors ${
                pathname === link.href
                  ? 'text-midnight-700 bg-gold-50/80'
                  : 'text-midnight-700/70 hover:text-midnight-700 hover:bg-ivory-200/60'
              }`}
            >
              {link.label}
            </Link>
          ))}
          <div className="pt-2">
            <Link
              href="/free-sample"
              className="block text-center px-5 py-3 bg-midnight-700 text-ivory-100 text-sm font-semibold rounded-full hover:bg-midnight-600 transition-colors"
            >
              Get Free Sample
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
