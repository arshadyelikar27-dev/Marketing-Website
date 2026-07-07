import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export function useGsapScrub() {
  const scopeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {}, scopeRef.current ?? undefined);

    return () => {
      ctx.revert();
    };
  }, []);

  return scopeRef;
}
