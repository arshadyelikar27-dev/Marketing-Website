import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const phrases = [
  'We shoot weddings.',
  'We stage events.',
  'We build brands.',
];

export default function Manifesto() {
  const sectionRef = useRef<HTMLElement>(null);
  const linesRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const lines = linesRef.current;
    const ctx = gsap.context(() => {
      lines.forEach((line, i) => {
        gsap.fromTo(
          line,
          { opacity: 0, y: 60, rotateX: 15 },
          {
            opacity: 1,
            y: 0,
            rotateX: 0,
            duration: 1.2,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: line,
              start: 'top 85%',
              end: 'top 40%',
              scrub: 1.5,
            },
          }
        );
      });
    }, sectionRef.current ?? undefined);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex items-center justify-center section-pad"
    >
      <div className="max-w-5xl mx-auto text-center">
        {phrases.map((phrase, i) => (
          <div key={i} className="overflow-hidden mb-4 md:mb-6">
            <div
              ref={(el) => {
                if (el) linesRef.current[i] = el;
              }}
              className="font-display text-4xl sm:text-5xl md:text-7xl lg:text-8xl leading-tight font-light text-ivory"
            >
              {i === 1 ? (
                <>
                  We <span className="italic text-warm-gold">stage</span> events.
                </>
              ) : (
                phrase
              )}
            </div>
          </div>
        ))}
        <div className="gold-divider mt-12 max-w-xs mx-auto" />
      </div>
    </section>
  );
}
