import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const links = [
  { label: 'Home', href: '#hero' },
  { label: 'Services', href: '#services' },
  { label: 'Portfolio', href: '#portfolio' },
  { label: 'Process', href: '#process' },
  { label: 'About', href: '#about' },
  { label: 'Contact', href: '#contact' },
];

export default function Nav() {
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: 'body',
        start: 'top -10%',
        toggleActions: 'play none none reverse',
      },
    });

    tl.to(navRef.current, {
      background: 'rgba(10, 9, 8, 0.85)',
      backdropFilter: 'blur(12px)',
      ease: 'power2.out',
      duration: 0.3,
    });
  }, []);

  return (
    <nav
      ref={navRef}
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-5 md:px-10"
    >
      <a href="#hero" className="font-display text-xl tracking-[0.15em] text-ivory uppercase no-underline">
        Velora
      </a>
      <div className="hidden md:flex items-center gap-8">
        {links.map((link) => (
          <a
            key={link.href}
            href={link.href}
            className="font-body text-xs tracking-[0.2em] text-ivory/70 uppercase transition-colors hover:text-warm-gold"
          >
            {link.label}
          </a>
        ))}
      </div>
    </nav>
  );
}
