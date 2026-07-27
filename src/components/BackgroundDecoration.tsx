import { useMemo } from 'react';

/**
 * Global cinematic background for the entire site.
 * Deep gradient wash + star field + floating dust + warm lantern glow.
 * Fixed behind all content (pointer-events: none, z -10).
 */
export default function BackgroundDecoration() {
  const stars = useMemo(
    () =>
      Array.from({ length: 50 }, () => ({
        top: Math.random() * 100,
        left: Math.random() * 100,
        size: Math.random() * 2 + 1,
        dur: Math.random() * 4 + 3,
        delay: Math.random() * 5,
      })),
    [],
  );

  const dust = useMemo(
    () =>
      Array.from({ length: 14 }, (_, i) => ({
        left: (i * 37) % 100,
        dx: (Math.random() - 0.5) * 60,
        dur: Math.random() * 12 + 14,
        delay: (i * 0.9) % 12,
      })),
    [],
  );

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden bk-bg-900 pointer-events-none" aria-hidden="true">
      {/* deep gradient wash */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 80% 60% at 50% 0%, #101828 0%, #0B1220 45%, #05070D 100%)',
        }}
      />

      {/* star field */}
      {stars.map((s, i) => (
        <span
          key={`s-${i}`}
          className="bk-star"
          style={{
            top: `${s.top}%`,
            left: `${s.left}%`,
            width: `${s.size}px`,
            height: `${s.size}px`,
            ['--dur' as string]: `${s.dur}s`,
            ['--delay' as string]: `${s.delay}s`,
          }}
        />
      ))}

      {/* floating dust */}
      {dust.map((d, i) => (
        <span
          key={`d-${i}`}
          className="bk-dust"
          style={{
            left: `${d.left}%`,
            ['--dx' as string]: `${d.dx}px`,
            ['--dur' as string]: `${d.dur}s`,
            ['--delay' as string]: `${d.delay}s`,
          }}
        />
      ))}

      {/* lantern glow */}
      <div
        className="absolute left-1/2 top-1/3 -translate-x-1/2 -translate-y-1/2 bk-lantern"
        style={{
          width: '60vw',
          height: '60vh',
          background:
            'radial-gradient(circle, rgba(245,158,11,0.16) 0%, rgba(212,175,55,0.07) 35%, transparent 70%)',
        }}
      />

      {/* subtle bottom vignette */}
      <div
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse 100% 80% at 50% 100%, rgba(5,7,13,0.6) 0%, transparent 50%)',
        }}
      />
    </div>
  );
}
