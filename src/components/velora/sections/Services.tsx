import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const services = [
  {
    num: '01',
    title: 'Wedding Shooting',
    pitch: 'Forever framed in light.',
    deliverables: ['Full-day coverage', 'Drone cinematography', 'Highlight reel', 'Photo album'],
  },
  {
    num: '02',
    title: 'Event Shooting',
    pitch: 'Moments that move.',
    deliverables: ['Multi-camera setup', 'Live editing', 'Aftermovie', 'Press kit'],
  },
  {
    num: '03',
    title: 'Business Promotion',
    pitch: 'Your brand in motion.',
    deliverables: ['Corporate film', 'Product showcase', 'Testimonial series', 'Aerial footage'],
  },
  {
    num: '04',
    title: 'Brand Promotion',
    pitch: 'Identity through imagery.',
    deliverables: ['Brand film', 'Social cutdowns', 'Mood films', 'Behind-the-scenes'],
  },
  {
    num: '05',
    title: 'Marketing',
    pitch: 'Content that converts.',
    deliverables: ['Ad creatives', 'Campaign strategy', 'Analytics reporting', 'Multi-platform assets'],
  },
];

export default function Services() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      if (headingRef.current) {
        gsap.fromTo(
          headingRef.current,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: headingRef.current,
              start: 'top 80%',
              end: 'top 50%',
              scrub: 1,
            },
          }
        );
      }

      if (trackRef.current) {
        gsap.to(trackRef.current, {
          x: () => -(trackRef.current!.scrollWidth - window.innerWidth),
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top top',
            end: () => `+=${trackRef.current!.scrollWidth - window.innerWidth}`,
            pin: true,
            anticipatePin: 1,
            scrub: 1,
            invalidateOnRefresh: true,
          },
        });
      }
    }, sectionRef.current ?? undefined);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="services"
      ref={sectionRef}
      className="relative overflow-hidden"
    >
      <div className="section-pad pb-0">
        <p className="font-body text-xs tracking-[0.3em] text-warm-gold uppercase mb-2">
          What we do
        </p>
        <h2
          ref={headingRef}
          className="font-display text-4xl md:text-6xl font-light text-ivory"
        >
          Services
        </h2>
      </div>

      <div ref={trackRef} className="horizontal-scroll px-6 md:px-10 pb-24 pt-12">
        {services.map((s) => (
          <div
            key={s.num}
            className="flex-shrink-0 w-[85vw] md:w-[65vw] lg:w-[50vw] mr-8 last:mr-0"
          >
            <div className="border-t border-warm-gold/30 pt-6">
              <span className="font-display text-5xl md:text-7xl text-warm-gold/40 italic">
                {s.num}
              </span>
              <h3 className="font-display text-3xl md:text-5xl text-ivory mt-2">
                {s.title}
              </h3>
              <p className="font-body text-sm md:text-base text-warm-gold mt-3 italic">
                {s.pitch}
              </p>
              <ul className="mt-6 space-y-2">
                {s.deliverables.map((d) => (
                  <li
                    key={d}
                    className="font-body text-sm text-ivory/60 flex items-center gap-3"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-warm-gold/50" />
                    {d}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
