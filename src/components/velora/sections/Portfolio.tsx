import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const projects = [
  {
    id: 1,
    title: 'Amore Eterno',
    category: 'Wedding',
    img: '/assets/portfolio-1.jpg',
  },
  {
    id: 2,
    title: 'Summit Gala',
    category: 'Event',
    img: '/assets/portfolio-2.jpg',
  },
  {
    id: 3,
    title: 'Nova Launch',
    category: 'Brand',
    img: '/assets/portfolio-3.jpg',
  },
  {
    id: 4,
    title: 'Horizon Campaign',
    category: 'Marketing',
    img: '/assets/portfolio-4.jpg',
  },
];

export default function Portfolio() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement[]>([]);

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

      cardsRef.current.forEach((card, i) => {
        gsap.fromTo(
          card,
          { opacity: 0, y: 60 + i * 10 },
          {
            opacity: 1,
            y: 0,
            duration: 1.2,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 85%',
              end: 'top 50%',
              scrub: 1.2,
            },
          }
        );
      });
    }, sectionRef.current ?? undefined);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="portfolio"
      ref={sectionRef}
      className="section-pad relative"
    >
      <div className="max-w-6xl mx-auto">
        <div ref={headingRef}>
          <p className="font-body text-xs tracking-[0.3em] text-warm-gold uppercase mb-2">
            Our work
          </p>
          <h2 className="font-display text-4xl md:text-6xl font-light text-ivory mb-16">
            Portfolio
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-6 md:gap-8">
          {projects.map((project, i) => (
            <div
              key={project.id}
              ref={(el) => {
                if (el) cardsRef.current[i] = el;
              }}
              className="group relative aspect-[4/3] rounded-lg overflow-hidden border border-white/5 cursor-pointer"
            >
              <img
                src={project.img}
                alt={project.title}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-near-black/80 via-near-black/10 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <span className="font-body text-xs tracking-[0.2em] text-warm-gold uppercase block mb-1">
                  {project.category}
                </span>
                <h3 className="font-display text-2xl md:text-3xl text-ivory">
                  {project.title}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
