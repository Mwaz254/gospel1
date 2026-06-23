import Link from 'next/link';
import Image from 'next/image';
import { Mail, Heart } from 'lucide-react';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/devotionals', label: 'Devotionals' },
  { href: '/free-sample', label: 'Free Sample' },
  { href: '/prayer-partners', label: 'Prayer Partners' },
  { href: '/contact', label: 'Contact' },
];

const resourceLinks = [
  { href: '/free-sample', label: 'Adult Edition' },
  { href: '/free-sample', label: 'Teen Edition' },
  { href: '/free-sample', label: "Children's Edition" },
  { href: '/prayer-partners', label: 'Prayer Guidelines' },
  { href: '/devotionals', label: 'Series Library' },
];

export default function Footer() {
  return (
    <footer className="bg-navy-700 text-white" aria-label="Site footer">
      {/* Scripture banner */}
      <div className="border-b border-white/10">
        <div className="max-w-3xl mx-auto px-6 py-10 text-center">
          <p className="font-cormorant text-2xl md:text-[1.75rem] text-gold-200 italic leading-relaxed">
            &ldquo;The Word became flesh and made His dwelling among us.&rdquo;
          </p>
          <p className="mt-3 text-gold-500 text-xs font-semibold tracking-[0.18em] uppercase">
            John 1:14
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12">

          {/* Brand */}
          <div className="sm:col-span-2">
            <Link href="/" className="inline-flex items-center gap-4 mb-6 group" aria-label="In Him Daily home">
              <div className="relative w-16 h-16 flex-shrink-0 drop-shadow-lg transition-transform duration-300 group-hover:scale-105">
                <Image
                  src="/images/ChatGPT_Image_Jun_12,_2026,_11_01_49_PM.png"
                  alt="In Him Daily logo"
                  fill
                  className="object-contain"
                  sizes="64px"
                />
              </div>
              <div>
                <p className="font-playfair text-xl font-bold leading-none">
                  In Him <em className="not-italic text-gold-400">Daily</em>
                </p>
                <p className="text-[0.65rem] text-white/50 tracking-[0.15em] uppercase mt-1">
                  Every Generation. One Jesus. Every Day.
                </p>
              </div>
            </Link>
            <p className="text-white/60 text-sm leading-relaxed max-w-[340px]">
              A devotional ministry helping every generation in your family encounter Jesus through the same scripture, every day.
            </p>
            <a
              href="mailto:hello@inhimdaily.org"
              className="inline-flex items-center gap-2 mt-5 text-sm text-white/50 hover:text-gold-300 transition-colors"
            >
              <Mail size={13} aria-hidden="true" />
              hello@inhimdaily.org
            </a>
          </div>

          {/* Navigate */}
          <div>
            <h3 className="font-playfair text-xs font-semibold text-gold-400 tracking-[0.14em] uppercase mb-5">
              Navigate
            </h3>
            <ul className="space-y-2.5" role="list">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-white/55 hover:text-gold-300 transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="font-playfair text-xs font-semibold text-gold-400 tracking-[0.14em] uppercase mb-5">
              Resources
            </h3>
            <ul className="space-y-2.5" role="list">
              {resourceLinks.map((link, i) => (
                <li key={i}>
                  <Link href={link.href} className="text-sm text-white/55 hover:text-gold-300 transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-7 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-white/35">
            &copy; {new Date().getFullYear()} In Him Daily. All rights reserved.
          </p>
          <p className="text-xs text-white/35 flex items-center gap-1.5">
            Made with <Heart size={11} className="text-gold-500 fill-gold-500" aria-hidden="true" /> for families everywhere
          </p>
        </div>
      </div>
    </footer>
  );
}
