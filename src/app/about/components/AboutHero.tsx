'use client';
import React, { useEffect, useRef } from 'react';
import Link from 'next/link';
import { Terminal, ArrowRight, ShieldCheck } from 'lucide-react';

export default function AboutHero() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const t = setTimeout(() => ref?.current?.classList?.add('is-visible'), 100);
    return () => clearTimeout(t);
  }, []);

  return (
    <section className="relative pt-32 pb-16 px-4 sm:px-6 text-center overflow-hidden">
      {/* Tactical Glow Blobs */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[720px] h-[520px] opacity-15 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse, #b81d42 0%, #8b5cf6 45%, transparent 70%)', filter: 'blur(100px)' }}
      />
      <div className="noise-overlay absolute inset-0 opacity-[0.03] pointer-events-none" />

      {/* Cyber Grid background */}
      <div
        className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
      />

      <div ref={ref} className="animate-on-scroll relative z-10 max-w-4xl mx-auto flex flex-col items-center">
        {/* Hackathon Tactical Node Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-card border border-primary/30 text-[11px] font-mono uppercase tracking-widest text-primary mb-6 shadow-sm">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
          </span>
          SMART INDIA HACKATHON 2026 // DSEU DWARKA NODE
        </div>

        {/* Title */}
        <h1 className="hero-title text-foreground mb-6 max-w-3xl">
          Built by a Student Squad, for{' '}
          <span className="text-accent glow-text-wine">India&apos;s 40M+ Undergraduates</span>
        </h1>

        {/* Subtitle */}
        <p className="text-muted-foreground text-sm sm:text-base md:text-lg leading-relaxed max-w-2xl mx-auto mb-8">
          Architected by a 6-member engineering team at DSEU Dwarka to eradicate campus freelance payment ghosting, resume information asymmetry, and informal platform chaos.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto items-center justify-center">
          <Link
            href="/dashboard"
            className="w-full sm:w-auto px-7 py-3 rounded-full text-xs sm:text-sm font-mono font-bold tracking-wide text-foreground border border-accent/60 bg-accent/20 hover:bg-accent/30 hover:border-accent shadow-[0_0_25px_rgba(184,29,66,0.35)] transition-all flex items-center justify-center gap-2 hover:scale-105"
          >
            <Terminal className="w-4 h-4 text-accent" />
            Launch Command Lobby
          </Link>

          <Link
            href="/features"
            className="w-full sm:w-auto shimmer-btn text-white font-bold px-7 py-3 rounded-full text-xs sm:text-sm transition-transform hover:scale-105 shadow-lg flex items-center justify-center gap-2"
          >
            View Live Bounties
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Genesis Footnote Chip */}
        <div className="mt-8 inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/[0.03] border border-white/10 text-[11px] font-mono text-muted-foreground">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
          Genesis Release: September 2026 • 5-Tier Consensus System (RNK-E to RNK-A)
        </div>
      </div>
    </section>
  );
}