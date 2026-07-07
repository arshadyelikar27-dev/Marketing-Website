import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const steps = [
  { num: '01', title: 'Discover', desc: 'We learn your story, your vision, your audience.' },
  { num: '02', title: 'Direct', desc: 'We craft a shot-by-shot narrative tailored to your message.' },
  { num: '03', title: 'Capture', desc: 'Production day — cinema-grade cameras, lighting, sound.' },
  { num: '04', title: 'Deliver', desc: 'Color-graded, sound-designed, delivered in your format.' },
];

export default function Process() {
  const sectionRef = useRef<HTMLElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const stepsRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      if (lineRef.current) {
        gsap.fromTo(
          lineRef.current,
          { scaleY: 0, transformOrigin: 'top center' },
          {
            scaleY: 1,
            duration: 1.5,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 70%',
              end: 'bottom 40%',
              scrub: 1,
            },
          }
        );
      }

      stepsRef.current.forEach((step, i) => {
        gsap.fromTo(
          step,
          { opacity: 0, x: i % 2 === 0 ? -40 : 40 },
          {
            opacity: 1,
            x: 0,
            duration: 1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: step,
              start: 'top 80%',
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
      id="process"
      ref={sectionRef}
      className="section-pad relative"
    >
      <div className="max-w-6xl mx-auto">
        <p className="font-body text-xs tracking-[0.3em] text-warm-gold uppercase mb-2">
          How we work
        </p>
        <h2 className="font-display text-4xl md:text-6xl font-light text-ivory mb-16">
          Process
        </h2>

        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-px bg-warm-gold/20">
            <div
              ref={lineRef}
              className="w-full h-full bg-warm-gold origin-top"
            />
          </div>

          <div className="space-y-20 md:space-y-28">
            {steps.map((step, i) => (
              <div
                key={step.num}
                ref={(el) => {
                  if (el) stepsRef.current[i] = el;
                }}
                className={`relative flex flex-col ${
                  i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                } items-start md:items-center gap-6 md:gap-12`}
              >
                {/* Dot */}
                <div className="absolute left-6 md:left-1/2 w-3 h-3 rounded-full bg-warm-gold -translate-x-1/2 top-1 md:top-auto z-10" />

                {/* Content */}
                <div
                  className={`ml-16 md:ml-0 md:w-[42%] ${
                    i % 2 === 0 ? 'md:text-right' : 'md:text-left'
                  }`}
                >
                  <span className="font-display text-3xl md:text-5xl text-warm-gold/30 italic">
                    {step.num}
                  </span>
                  <h3 className="font-display text-2xl md:text-4xl text-ivory mt-1">
                    {step.title}
                  </h3>
                  <p className="font-body text-sm md:text-base text-ivory/60 mt-3 leading-relaxed">
                    {step.desc}
                  </p>
                </div>

                {/* Spacer for alternating layout */}
                <div className="hidden md:block md:w-[42%]" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
