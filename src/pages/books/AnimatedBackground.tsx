import { useMemo } from 'react';

/**
 * Cinematic animated background: star field + floating dust particles
 * + warm lantern glow. Fixed behind the Books page.
 */
export default function AnimatedBackground() {
  const stars = useMemo(
    () =>
      Array.from({ length: 60 }, () => ({
        top: Math.random() * 100,
        left: Math.random() * 100,
        size: Math.random() * 2 + 1,
        dur: Math.random() * 4 + 3,
        delay: Math.random() * 5,
      })),
    []
  );

  const dust = useMemo(
    () =>
      Array.from({ length: 18 }, () => ({
        left: Math.random() * 100,
        dx: (Math.random() - 0.5) * 60,
        dur: Math.random() * 12 + 14,
        delay: Math.random() * 12,
      })),
    []
  );

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden bk-bg-900" aria-hidden="true">
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
        className="absolute left-1/2 top-1/3 -translate-x-1/2 -translate-y-1/2 bk-lantern pointer-events-none"
        style={{
          width: '60vw',
          height: '60vh',
          background:
            'radial-gradient(circle, rgba(245,158,11,0.18) 0%, rgba(212,175,55,0.08) 35%, transparent 70%)',
        }}
      />
    </div>
  );
}
