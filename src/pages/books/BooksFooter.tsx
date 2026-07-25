import { Link } from 'react-router-dom';
import { Youtube, MessageCircle, Mail, Instagram, Facebook } from 'lucide-react';

const columns = [
  {
    title: 'Collections',
    links: [
      { label: 'Volume One', href: '/books#collections' },
      { label: 'Torah', href: '/books#collections' },
      { label: 'Psalms', href: '/books#collections' },
      { label: 'New Testament', href: '/books#collections' },
      { label: 'Deuteronomy', href: '/books#collections' },
    ],
  },
  {
    title: 'Resources',
    links: [
      { label: 'Blog', href: '/communities' },
      { label: 'YouTube', href: 'https://www.youtube.com', external: true },
      { label: 'WhatsApp Groups', href: '/communities' },
      { label: 'FAQ', href: '/contact' },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'About', href: '/about' },
      { label: 'Contact', href: '/contact' },
      { label: 'Privacy Policy', href: '/privacy-policy' },
      { label: 'Terms', href: '/privacy-policy' },
    ],
  },
];

const socials = [
  { Icon: Youtube, href: 'https://www.youtube.com', label: 'YouTube' },
  { Icon: MessageCircle, href: '/communities', label: 'WhatsApp' },
  { Icon: Instagram, href: 'https://www.instagram.com', label: 'Instagram' },
  { Icon: Facebook, href: 'https://www.facebook.com', label: 'Facebook' },
  { Icon: Mail, href: '/contact', label: 'Email' },
];

export default function BooksFooter() {
  return (
    <footer className="relative bk-bg-800 border-t border-gold-400/15 pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-5 gap-12 mb-16">
          {/* Brand + newsletter */}
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center gap-3 mb-6">
              <img
                src="/images/733127106_122096833941384062_9064072413288732878_n.jpg"
                alt="In Him Daily"
                className="w-10 h-10 rounded-full object-cover border border-gold-400/40"
              />
              <span className="font-cinzel text-lg font-semibold tracking-[0.2em] text-white">
                IN HIM DAILY
              </span>
            </Link>
            <p className="text-white/60 text-sm leading-relaxed max-w-sm mb-6">
              One Story. One Saviour. Every Generation. Discover Jesus on every page of Scripture.
            </p>

            <form
              className="flex gap-2 max-w-sm"
              onSubmit={(e) => e.preventDefault()}
            >
              <input
                type="email"
                placeholder="Your email"
                className="flex-1 px-4 py-3 rounded-full bg-white/5 border border-white/15 text-white text-sm placeholder:text-white/40 focus:outline-none focus:border-gold-400/60"
              />
              <button
                type="submit"
                className="px-5 py-3 rounded-full text-[#05070D] text-sm font-bold bk-shimmer shrink-0"
              >
                Subscribe
              </button>
            </form>
          </div>

          {/* Link columns */}
          {columns.map((col) => (
            <div key={col.title}>
              <h4 className="font-cinzel text-white font-semibold mb-5 tracking-wide">
                {col.title}
              </h4>
              <ul className="space-y-3">
                {col.links.map((l) =>
                  l.external ? (
                    <li key={l.label}>
                      <a
                        href={l.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-white/55 text-sm hover:text-gold-300 transition-colors"
                      >
                        {l.label}
                      </a>
                    </li>
                  ) : (
                    <li key={l.label}>
                      <Link
                        to={l.href}
                        className="text-white/55 text-sm hover:text-gold-300 transition-colors"
                      >
                        {l.label}
                      </Link>
                    </li>
                  )
                )}
              </ul>
            </div>
          ))}
        </div>

        {/* Socials */}
        <div className="flex items-center justify-between flex-wrap gap-6 pt-8 border-t border-white/10">
          <p className="text-white/40 text-sm">© IN HIM DAILY</p>
          <div className="flex items-center gap-4">
            {socials.map(({ Icon, href, label }) => (
              <a
                key={label}
                href={href}
                target={href.startsWith('http') ? '_blank' : undefined}
                rel="noopener noreferrer"
                aria-label={label}
                className="w-10 h-10 rounded-full flex items-center justify-center border border-white/15 text-white/60 hover:text-gold-300 hover:border-gold-400/50 transition-all"
              >
                <Icon size={18} />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
