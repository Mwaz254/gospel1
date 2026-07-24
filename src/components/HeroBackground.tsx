/**
 * Themed background photo layer for hero/section headers.
 * Renders a Pexels faith-themed image with a navy gradient overlay
 * so white text stays readable. Sits behind content (z-0).
 */
export default function HeroBackground({
  image,
  overlay = 'rgba(14,32,53,0.82)',
  position = 'center',
}: {
  image: string;
  overlay?: string;
  position?: string;
}) {
  return (
    <>
      <div
        className="absolute inset-0 bg-cover bg-no-repeat"
        style={{ backgroundImage: `url(${image})`, backgroundPosition: position }}
        aria-hidden="true"
      />
      <div
        className="absolute inset-0"
        style={{
          background: `linear-gradient(180deg, ${overlay} 0%, rgba(14,32,53,0.92) 100%)`,
        }}
        aria-hidden="true"
      />
    </>
  );
}
