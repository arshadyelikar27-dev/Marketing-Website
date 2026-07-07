import { useRef, useState } from 'react';

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null);
  const labelRef = useRef<HTMLParagraphElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const linksRef = useRef<HTMLDivElement>(null);
  
  const [calendlyUrl, setCalendlyUrl] = useState<string | null>(null);

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="section-pad relative min-h-screen flex flex-col items-center justify-center text-center overflow-hidden"
    >
      <p
        ref={labelRef}
        className="font-body text-xs tracking-[0.3em] text-warm-gold uppercase mb-6"
      >
        Get in touch
      </p>

      <h2
        ref={headingRef}
        className="font-display text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-light text-ivory leading-tight max-w-4xl mx-auto transition-all duration-700"
        style={{
           transform: calendlyUrl ? 'scale(0.85) translateY(-20px)' : 'none',
           opacity: calendlyUrl ? 0.5 : 1
        }}
      >
        Let's create something
        <br />
        <span className="italic text-warm-gold">worth remembering.</span>
      </h2>

      <div className="mt-12 w-full max-w-5xl mx-auto relative min-h-[100px] flex flex-col items-center justify-center">
        {!calendlyUrl ? (
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 w-full transition-all duration-500">
            <button
              onClick={() => setCalendlyUrl('https://calendly.com/arshadyelikar5/30min')}
              className="inline-flex items-center gap-3 px-10 py-5 bg-warm-gold/90 text-near-black font-body text-sm tracking-[0.2em] uppercase transition-all hover:bg-warm-gold cursor-pointer font-bold rounded-sm"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="3" y="4" width="18" height="18" rx="2" />
                <path d="M16 2v4M8 2v4M3 10h18" />
              </svg>
              Schedule Meeting
            </button>
            <button
              onClick={() => setCalendlyUrl('https://calendly.com/arshadyelikar5/client-call')}
              className="inline-flex items-center gap-3 px-10 py-5 border border-warm-gold/40 text-ivory font-body text-sm tracking-[0.2em] uppercase transition-all hover:bg-warm-gold/10 hover:border-warm-gold rounded-sm cursor-pointer"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
              </svg>
              Request Call
            </button>
          </div>
        ) : (
          <div className="w-full bg-near-black/50 border border-warm-gold/30 rounded-xl overflow-hidden shadow-2xl relative transition-all duration-700 opacity-100 translate-y-0 mt-8">
            <div className="absolute top-0 left-0 w-full h-14 bg-near-black border-b border-white/5 flex items-center justify-between px-6 z-10">
              <span className="font-body text-xs tracking-[0.2em] text-ivory/60 uppercase">
                Book a Session
              </span>
              <button
                onClick={() => setCalendlyUrl(null)}
                className="text-ivory/40 hover:text-ivory transition-colors focus:outline-none"
                title="Close Calendar"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M18 6L6 18M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            {/* 
              CALENDLY IFRAME 
              Connected to user's real Calendly account
            */}
            <iframe
              src={calendlyUrl}
              width="100%"
              height="750"
              frameBorder="0"
              className="w-full mt-14 bg-white"
              title="Schedule Meeting"
              style={{ minWidth: '320px' }}
            ></iframe>
          </div>
        )}
      </div>

      {!calendlyUrl && (
        <div
          ref={linksRef}
          className="mt-16 flex flex-col sm:flex-row items-center justify-center gap-6 w-full opacity-60 hover:opacity-100 transition-opacity"
        >
          <a
            href="mailto:hello@velora.studio"
            className="font-body text-xs tracking-[0.2em] uppercase hover:text-warm-gold transition-colors"
          >
            hello@velora.studio
          </a>
          <span className="hidden sm:inline text-white/20">•</span>
          <a
            href="https://wa.me/1234567890"
            target="_blank"
            rel="noopener noreferrer"
            className="font-body text-xs tracking-[0.2em] uppercase hover:text-warm-gold transition-colors"
          >
            WhatsApp
          </a>
        </div>
      )}
    </section>
  );
}
