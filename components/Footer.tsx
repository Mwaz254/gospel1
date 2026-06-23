'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Mail, Heart } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-midnight-700 text-ivory-100">
      {/* Scripture banner */}
      <div className="border-b border-midnight-600">
        <div className="max-w-4xl mx-auto px-6 py-10 text-center">
          <p className="font-cormorant text-2xl md:text-3xl text-gold-200 italic leading-relaxed">
            &ldquo;The Word became flesh and made His dwelling among us.&rdquo;
          </p>
          <p className="mt-3 text-gold-400 text-sm font-medium tracking-widest uppercase">
            John 1:14
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link href="/" className="inline-flex items-center gap-4 mb-6 group">
              <div className="relative w-20 h-20 flex-shrink-0 drop-shadow-lg transition-transform duration-300 group-hover:scale-105">
                <Image
                  src="/images/ChatGPT_Image_Jun_12,_2026,_11_01_49_PM.png"
                  alt="In Him Daily Logo"
                  fill
                  className="object-contain"
                  sizes="80px"
                />
              </div>
              <div>
                <span className="font-playfair text-2xl font-bold block leading-tight">
                  In Him <span className="text-gold-400 italic">Daily</span>
                </span>
                <p className="text-xs text-ivory-300/80 tracking-widest uppercase mt-1">
                  Every Generation. One Jesus. Every Day.
                </p>
              </div>
            </Link>
            <p className="text-ivory-300 text-sm leading-relaxed max-w-sm">
              A devotional ministry written simultaneously for adults, teenagers, and children—helping every generation in your family encounter Jesus through the same scripture, every day.
            </p>
            <div className="mt-6 flex items-center gap-2 text-sm text-ivory-400">
              <Mail size={14} />
              <a href="mailto:hello@inhimdaily.org" className="hover:text-gold-300 transition-colors">
                hello@inhimdaily.org
              </a>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="font-playfair text-sm font-semibold text-gold-300 uppercase tracking-widest mb-5">
              Navigate
            </h4>
            <ul className="space-y-3">
              {[
                { href: '/', label: 'Home' },
                { href: '/about', label: 'About' },
                { href: '/devotionals', label: 'Devotionals' },
                { href: '/free-sample', label: 'Free Sample' },
                { href: '/prayer-partners', label: 'Prayer Partners' },
                { href: '/contact', label: 'Contact' },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-ivory-300 hover:text-gold-300 transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="font-playfair text-sm font-semibold text-gold-300 uppercase tracking-widest mb-5">
              Resources
            </h4>
            <ul className="space-y-3">
              {[
                { href: '/free-sample', label: 'Adult Edition' },
                { href: '/free-sample', label: 'Teen Edition' },
                { href: '/free-sample', label: "Children's Edition" },
                { href: '/prayer-partners', label: 'Prayer Guidelines' },
                { href: '/devotionals', label: 'Series Library' },
              ].map((link, i) => (
                <li key={i}>
                  <Link
                    href={link.href}
                    className="text-sm text-ivory-300 hover:text-gold-300 transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-16 pt-8 border-t border-midnight-600 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-ivory-400">
            &copy; {new Date().getFullYear()} In Him Daily. All rights reserved.
          </p>
          <p className="text-xs text-ivory-400 flex items-center gap-1.5">
            Made with <Heart size={11} className="text-gold-400 fill-gold-400" /> for families everywhere
          </p>
        </div>
      </div>
    </footer>
  );
}
