export default function Footer() {
  return (
    <footer className="section-pad pt-0 pb-8 text-center">
      <div className="gold-divider max-w-2xl mx-auto mb-8" />
      <div className="flex items-center justify-center gap-6 mb-6">
        {['Instagram', 'YouTube', 'Vimeo', 'LinkedIn'].map((social) => (
          <a
            key={social}
            href="#"
            className="font-body text-xs tracking-[0.2em] text-ivory/40 uppercase transition-colors hover:text-warm-gold"
          >
            {social}
          </a>
        ))}
      </div>
      <p className="font-body text-xs text-ivory/30">
        &copy; {new Date().getFullYear()} Velora Studio. All rights reserved.
      </p>
    </footer>
  );
}
