import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, Clock, ZoomIn } from 'lucide-react';
import ScrollReveal from '@/components/ScrollReveal';
import { collections } from './assets';
import BookLightbox from './BookLightbox';

export default function CollectionCards() {
  const [lightbox, setLightbox] = useState<{ src: string; alt: string } | null>(null);

  return (
    <section id="collections" className="relative py-24 sm:py-32 scroll-mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal className="text-center mb-16">
          <p className="font-cinzel text-gold-300 tracking-[0.25em] text-sm mb-3">SECTION 02</p>
          <h2 className="font-cinzel text-3xl sm:text-5xl font-bold text-white">
            Explore Every Collection
          </h2>
          <p className="mt-4 text-white/60 max-w-2xl mx-auto">
            Six journeys through Scripture. Each one a doorway into the one story that changes
            everything.
          </p>
        </ScrollReveal>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {collections.map((c, i) => (
            <ScrollReveal key={c.id} delay={i * 100}>
              <div className="bk-glass rounded-2xl overflow-hidden h-full group transition-all duration-500 hover:-translate-y-1 hover:border-gold-400/50 hover:shadow-[0_24px_64px_rgba(212,175,55,0.2)]">
                {/* Book cover — fixed-height container with object-contain so the full image is visible */}
                <div className="relative w-full h-64 bg-white/[0.03] border-b border-white/5 overflow-hidden flex items-center justify-center">
                  <div
                    className="absolute inset-0"
                    style={{
                      background:
                        'linear-gradient(135deg, rgba(59,130,246,0.12) 0%, rgba(212,175,55,0.10) 100%)',
                    }}
                    aria-hidden="true"
                  />
                  <button
                    type="button"
                    onClick={() => setLightbox({ src: c.cover, alt: `${c.title} book cover` })}
                    className="relative z-10 block w-full h-full p-5 m-0 border-0 bg-transparent cursor-zoom-in flex items-center justify-center"
                    aria-label={`View ${c.title} cover enlarged`}
                  >
                    <img
                      src={c.cover}
                      alt={`${c.title} book cover`}
                      loading="lazy"
                      className="block w-full h-full object-contain transition-transform duration-500 group-hover:scale-[1.03]"
                    />
                    <span className="bk-sweep" />
                    <span className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                      <span className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                        <ZoomIn size={20} className="text-white" />
                      </span>
                    </span>
                  </button>
                </div>

                <div className="p-6">
                  <p className="font-cinzel text-xs tracking-[0.2em] text-gold-300 mb-2">
                    {c.volume}
                  </p>
                  <h3 className="font-cinzel text-xl font-semibold text-white mb-2">{c.title}</h3>
                  <p className="text-white/50 text-sm mb-3">{c.scripture}</p>

                  <div className="flex items-center gap-2 text-white/70 text-sm mb-4">
                    <Clock size={14} className="text-gold-300" />
                    <span>{c.days} Days</span>
                  </div>

                  <p className="text-white/60 text-sm leading-relaxed mb-6">{c.description}</p>

                  <Link
                    to="/devotionals"
                    className="inline-flex items-center gap-2 text-gold-300 font-semibold text-sm hover:text-gold-200 transition-colors group/btn"
                  >
                    Explore
                    <ArrowUpRight
                      size={16}
                      className="transition-transform group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5"
                    />
                  </Link>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>

      {lightbox && (
        <BookLightbox src={lightbox.src} alt={lightbox.alt} onClose={() => setLightbox(null)} />
      )}
    </section>
  );
}
