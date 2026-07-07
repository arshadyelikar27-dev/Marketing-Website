import { createFileRoute } from '@tanstack/react-router';
import { Suspense, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import Nav from '../components/velora/sections/Nav';
import Manifesto from '../components/velora/sections/Manifesto';
import Services from '../components/velora/sections/Services';
import Showreel from '../components/velora/sections/Showreel';
import Portfolio from '../components/velora/sections/Portfolio';
import Process from '../components/velora/sections/Process';
import About from '../components/velora/sections/About';
import Contact from '../components/velora/sections/Contact';
import Footer from '../components/velora/sections/Footer';
import Hero3D from '../components/velora/Hero3D';

export const Route = createFileRoute('/')({
  component: Home,
  head: () => ({
    meta: [
      { title: 'Velora — Cinema for moments that matter' },
      {
        name: 'description',
        content:
          'Velora is a cinematic production studio specializing in weddings, events, business, and brand promotion.',
      },
      { property: 'og:title', content: 'Velora — Cinema for moments that matter' },
      {
        property: 'og:description',
        content:
          'Cinematic production for weddings, events, business & brand promotion.',
      },
      { property: 'og:url', content: '/' },
      { name: 'twitter:title', content: 'Velora — Cinema for moments that matter' },
      {
        name: 'twitter:description',
        content:
          'Cinematic production for weddings, events, business & brand promotion.',
      },
    ],
  }),
});

function HeroContent() {
  const textRef = useRef<HTMLDivElement>(null);
  const scrollWrapperRef = useRef<HTMLDivElement>(null);
  const cueRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // Entrance animation: Slide up and fade in smoothly
      if (textRef.current) {
        gsap.fromTo(
          textRef.current,
          { opacity: 0, y: 60, scale: 0.98 },
          { opacity: 1, y: 0, scale: 1, duration: 2, ease: 'power3.out', delay: 0.2 }
        );
      }

      // Scroll exit animation using a separate wrapper to prevent conflicts
      if (scrollWrapperRef.current) {
        gsap.to(scrollWrapperRef.current, {
          opacity: 0,
          y: -40,
          scale: 0.95,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: scrollWrapperRef.current,
            start: 'top 30%',
            end: 'top -20%',
            scrub: 1.5,
          },
        });
      }

      if (cueRef.current) {
        // Entrance animation: Fade in slowly after the main title
        gsap.fromTo(
          cueRef.current,
          { opacity: 0 },
          { opacity: 1, duration: 2, ease: 'power3.out', delay: 1.5 }
        );

        // Scroll exit animation
        gsap.to(cueRef.current, {
          opacity: 0,
          duration: 0.5,
          scrollTrigger: {
            trigger: cueRef.current,
            start: 'top 60%',
            end: 'top 30%',
            scrub: 1,
          },
        });
      }
    });

    return () => ctx.revert();
  }, []);

  return (
    <div className="absolute inset-0 z-10 flex flex-col items-center justify-center pointer-events-none">
      <div ref={scrollWrapperRef}>
        <div ref={textRef} className="text-center">
          <h1 className="font-display text-6xl sm:text-8xl md:text-9xl lg:text-[10rem] font-light text-ivory tracking-tight leading-none">
            Velora
          </h1>
          <p className="font-body text-xs md:text-sm tracking-[0.35em] text-ivory/60 uppercase mt-4 md:mt-6">
            Cinema for moments that matter
          </p>
        </div>
      </div>
      <div
        ref={cueRef}
        className="absolute bottom-10 flex flex-col items-center gap-2"
      >
        <span className="font-body text-[10px] tracking-[0.3em] text-ivory/40 uppercase">
          Scroll
        </span>
        <svg
          width="16"
          height="24"
          viewBox="0 0 16 24"
          fill="none"
          className="animate-float text-ivory/40"
        >
          <rect
            x="1"
            y="1"
            width="14"
            height="22"
            rx="7"
            stroke="currentColor"
            strokeWidth="1.5"
          />
          <circle cx="8" cy="8" r="2" fill="currentColor" />
        </svg>
      </div>
    </div>
  );
}

function Home() {
  const heroRef = useRef<HTMLElement>(null);

  return (
    <main>
      {/* Hero */}
      <section
        id="hero"
        ref={heroRef}
        className="relative h-dvh w-full overflow-hidden"
      >
        {/* Atmospheric background always visible - no jarring empty state */}
        <div className="absolute inset-0" style={{
          background: 'radial-gradient(ellipse 80% 60% at 50% 50%, rgba(201,162,76,0.07) 0%, transparent 70%), #0a0908'
        }} />
        <Suspense fallback={null}>
          <Hero3D />
        </Suspense>
        <HeroContent />
        <Nav />
      </section>

      {/* Sections */}
      <Manifesto />
      <Services />
      <Showreel />
      <Portfolio />
      <Process />
      <About />
      <Contact />
      <Footer />
    </main>
  );
}
