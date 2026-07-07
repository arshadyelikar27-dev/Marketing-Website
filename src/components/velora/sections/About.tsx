import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const stats = [
  { value: 200, suffix: '+', label: 'Projects' },
  { value: 85, suffix: '+', label: 'Weddings' },
  { value: 120, suffix: '+', label: 'Brands' },
];

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement[]>([]);
  const numbersRef = useRef<HTMLSpanElement[]>([]);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      if (imageRef.current) {
        gsap.fromTo(
          imageRef.current,
          { opacity: 0, x: -60, scale: 0.95 },
          {
            opacity: 1,
            x: 0,
            scale: 1,
            duration: 1.2,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: imageRef.current,
              start: 'top 85%',
              end: 'top 45%',
              scrub: 1,
            },
          }
        );
      }

      if (textRef.current) {
        gsap.fromTo(
          textRef.current,
          { opacity: 0, x: 60 },
          {
            opacity: 1,
            x: 0,
            duration: 1.2,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: textRef.current,
              start: 'top 85%',
              end: 'top 45%',
              scrub: 1,
            },
          }
        );
      }

      statsRef.current.forEach((stat, i) => {
        gsap.fromTo(
          stat,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: stat,
              start: 'top 90%',
              end: 'top 60%',
              scrub: 1,
            },
          }
        );
      });

      numbersRef.current.forEach((el) => {
        const target = el.dataset.value ? parseInt(el.dataset.value) : 0;
        const suffix = el.dataset.suffix || '';
        gsap.fromTo(
          el,
          { textContent: '0' },
          {
            textContent: target,
            duration: 2,
            ease: 'power3.out',
            snap: { textContent: 1 },
            scrollTrigger: {
              trigger: el,
              start: 'top 85%',
              end: 'top 40%',
              scrub: 1,
            },
            onUpdate: function () {
              el.textContent = Math.round(parseFloat(el.textContent || '0')) + suffix;
            },
          }
        );
      });
    }, sectionRef.current ?? undefined);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="section-pad relative"
    >
      <div className="max-w-6xl mx-auto">
        <p className="font-body text-xs tracking-[0.3em] text-warm-gold uppercase mb-2">
          Who we are
        </p>
        <h2 className="font-display text-4xl md:text-6xl font-light text-ivory mb-16">
          About Velora
        </h2>

        <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-center">
          {/* Image */}
          <div
            ref={imageRef}
            className="aspect-[3/4] rounded-lg overflow-hidden relative border border-white/5"
          >
            <img
              src="/assets/velora_logo.png"
              alt="Velora Logo"
              className="absolute inset-0 w-full h-full object-cover"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-near-black/30 to-transparent" />
          </div>

          {/* Text */}
          <div ref={textRef}>
            <p className="font-display text-2xl md:text-3xl leading-relaxed text-ivory">
              We are a team of<em className="text-warm-gold not-italic"> storytellers </em>
              who believe every frame should feel like cinema.
            </p>
            <div className="gold-divider my-8" />
            <p className="font-body text-sm md:text-base text-ivory/60 leading-relaxed">
              Founded in 2020, Velora has grown from a two-person operation into a full-service
              cinematic studio. From intimate weddings to global brand campaigns, we bring the same
              obsessive craft to every project. Our work has been featured in Vogue, Forbes, and
              Communication Arts.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 mt-12">
              {stats.map((stat, i) => (
                <div
                  key={stat.label}
                  ref={(el) => {
                    if (el) statsRef.current[i] = el;
                  }}
                >
                  <span
                    ref={(el) => {
                      if (el) numbersRef.current[i] = el;
                    }}
                    data-value={stat.value}
                    data-suffix={stat.suffix}
                    className="font-display text-3xl md:text-4xl text-warm-gold block"
                  >
                    0{stat.suffix}
                  </span>
                  <span className="font-body text-xs tracking-[0.15em] text-ivory/50 uppercase mt-1 block">
                    {stat.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
