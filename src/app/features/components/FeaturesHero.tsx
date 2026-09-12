'use client';
import React, { useEffect, useRef } from 'react';

export default function FeaturesHero() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const t = setTimeout(() => ref?.current?.classList?.add('is-visible'), 100);
    return () => clearTimeout(t);
  }, []);

  return (
    <section className="relative pt-32 pb-16 px-4 sm:px-6 text-center overflow-hidden">
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[400px] opacity-15 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse, #8b5cf6 0%, transparent 70%)', filter: 'blur(90px)' }}
      />
      <div className="noise-overlay absolute inset-0 opacity-[0.03] pointer-events-none" />

      <div ref={ref} className="animate-on-scroll relative z-10 max-w-3xl mx-auto">
        <span className="inline-block px-4 py-1 rounded-full glass-card border border-border text-xs font-bold uppercase tracking-widest text-muted-foreground mb-6">
          Platform Features
        </span>
        <h1 className="hero-title text-foreground mb-6">
          Engineered for Meritocracy.{' '}
          <span className="text-accent glow-text-wine">Powered by Code.</span>
        </h1>
        <p className="text-muted-foreground text-base sm:text-lg leading-relaxed max-w-2xl mx-auto">
          UniParahits gives college students a safe, transparent platform to build real projects, earn guaranteed payouts through escrow, and level up their skills — with zero freelance friction.
        </p>
      </div>
    </section>
  );
}