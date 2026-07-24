import { useMemo } from 'react';

/**
 * Global decorative background for the site.
 * Fixed behind all content (pointer-events: none, z -10).
 * Subtle navy/gold radial glows, a faint dot grid, slow-floating gold motes,
 * and a soft light-ray motif near the top — all themed to In Him Daily.
 */
export default function BackgroundDecoration() {
  // Stable random positions for motes (avoid hydration mismatch / re-renders)
  const motes = useMemo(
    () =>
      Array.from({ length: 14 }, (_, i) => ({
        left: (i * 37) % 100,
        top: (i * 53) % 100,
        size: 2 + ((i * 7) % 3),
        delay: (i * 0.7) % 8,
        duration: 9 + ((i * 3) % 7),
      })),
    [],
  );

  return (
    <div className="fixed inset-0 -z-10 pointer-events-none overflow-hidden" aria-hidden="true">
      {/* Base wash */}
      <div className="absolute inset-0 bg-ivory" />

      {/* Soft radial glows */}
      <div
        className="absolute -top-32 -left-24 w-[42rem] h-[42rem] rounded-full opacity-60"
        style={{ background: 'radial-gradient(circle, rgba(201,152,58,0.10) 0%, transparent 65%)' }}
      />
      <div
        className="absolute top-1/3 -right-32 w-[40rem] h-[40rem] rounded-full opacity-50"
        style={{ background: 'radial-gradient(circle, rgba(23,50,77,0.08) 0%, transparent 65%)' }}
      />
      <div
        className="absolute bottom-0 left-1/4 w-[36rem] h-[36rem] rounded-full opacity-40"
        style={{ background: 'radial-gradient(circle, rgba(228,184,106,0.08) 0%, transparent 65%)' }}
      />

      {/* Faint dot grid */}
      <div
        className="absolute inset-0 opacity-[0.035]"
        style={{
          backgroundImage: 'radial-gradient(circle, #17324D 1px, transparent 1px)',
          backgroundSize: '34px 34px',
        }}
      />

      {/* Soft light rays from top center */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[60rem] h-[40rem] opacity-[0.06]">
        {[-28, -18, -9, 0, 9, 18, 28].map((deg, i) => (
          <div
            key={i}
            className="absolute top-0 left-1/2 origin-top"
            style={{
              width: '1.5px',
              height: '100%',
              background: 'linear-gradient(to bottom, rgba(228,184,106,0.7), transparent)',
              transform: `translateX(-50%) rotate(${deg}deg)`,
            }}
          />
        ))}
      </div>

      {/* Slow-floating gold motes */}
      {motes.map((m, i) => (
        <div
          key={i}
          className="absolute rounded-full bg-gold-300/30 bg-mote"
          style={{
            left: `${m.left}%`,
            top: `${m.top}%`,
            width: `${m.size}px`,
            height: `${m.size}px`,
            animation: `bg-mote-float ${m.duration}s ease-in-out ${m.delay}s infinite`,
          }}
        />
      ))}

      {/* Vignette for depth */}
      <div
        className="absolute inset-0"
        style={{ background: 'radial-gradient(ellipse 100% 80% at 50% 50%, transparent 60%, rgba(14,32,53,0.05) 100%)' }}
      />
    </div>
  );
}
