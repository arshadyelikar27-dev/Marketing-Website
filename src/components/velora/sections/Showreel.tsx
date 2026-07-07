import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const tiles = [
  { id: 1, label: 'Wedding', img: '/assets/wedding.jpg' },
  { id: 2, label: 'Event', img: '/assets/event.jpg' },
  { id: 3, label: 'Brand', img: '/assets/brand.jpg' },
  { id: 4, label: 'Business', img: '/assets/business.jpg' },
  { id: 5, label: 'Film', img: '/assets/cinematic.jpg' },
  { id: 6, label: 'Marketing', img: '/assets/marketing.jpg' },
];

export default function Showreel() {
  const sectionRef = useRef<HTMLElement>(null);
  const row1Ref = useRef<HTMLDivElement>(null);
  const row2Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      if (row1Ref.current) {
        gsap.to(row1Ref.current, {
          x: '-25%',
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1,
          },
        });
      }

      if (row2Ref.current) {
        gsap.to(row2Ref.current, {
          x: '25%',
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1,
          },
        });
      }
    }, sectionRef.current ?? undefined);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative py-24 overflow-hidden">
      <div className="mb-6 section-pad pb-0">
        <p className="font-body text-xs tracking-[0.3em] text-warm-gold uppercase mb-2">
          Our work
        </p>
        <h2 className="font-display text-4xl md:text-6xl font-light text-ivory">
          Showreel
        </h2>
      </div>

      <div className="space-y-6 mt-12">
        <div ref={row1Ref} className="marquee-track">
          {[...tiles, ...tiles].map((tile, i) => (
            <div
              key={`r1-${i}`}
              className="flex-shrink-0 w-64 h-44 md:w-80 md:h-56 rounded-lg overflow-hidden relative border border-white/5 group"
            >
              <img
                src={tile.img}
                alt={tile.label}
                className="absolute inset-0 w-full h-full object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-near-black/70 via-transparent to-transparent" />
              <span className="absolute bottom-4 left-5 font-display text-lg text-ivory/90">
                {tile.label}
              </span>
            </div>
          ))}
        </div>

        <div ref={row2Ref} className="marquee-track">
          {[...tiles, ...tiles].reverse().map((tile, i) => (
            <div
              key={`r2-${i}`}
              className="flex-shrink-0 w-64 h-44 md:w-80 md:h-56 rounded-lg overflow-hidden relative border border-white/5 group"
            >
              <img
                src={tile.img}
                alt={tile.label}
                className="absolute inset-0 w-full h-full object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-near-black/70 via-transparent to-transparent" />
              <span className="absolute bottom-4 left-5 font-display text-lg text-ivory/90">
                {tile.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
