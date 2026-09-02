'use client';
import React, { useEffect, useRef } from 'react';
import Link from 'next/link';

const TIERS = [
  { rank: 'S+', label: 'Guild Master', color: '#f59e0b', glow: 'rgba(245,158,11,0.6)', width: '18%' },
  { rank: 'S',  label: 'Hall of Fame', color: '#e0e7ff', glow: 'rgba(224,231,255,0.4)', width: '30%' },
  { rank: 'A',  label: 'Senior Lead',  color: '#a855f7', glow: 'rgba(168,85,247,0.4)',  width: '42%' },
  { rank: 'B',  label: 'Guild Senior', color: '#8b5cf6', glow: 'rgba(139,92,246,0.35)', width: '54%' },
  { rank: 'C',  label: 'Guild Builder',color: '#3b82f6', glow: 'rgba(59,130,246,0.3)',  width: '66%' },
  { rank: 'D',  label: 'Core Worker',  color: '#6b7280', glow: 'rgba(107,114,128,0.25)',width: '78%' },
  { rank: 'E',  label: 'Apprentice',   color: '#64748b', glow: 'rgba(100,116,139,0.2)', width: '90%' },
  { rank: 'F',  label: 'Recruit',      color: '#475569', glow: 'rgba(71,85,105,0.15)',  width: '100%' },
];

export default function HeroSection() {
  const tiersRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const timers: ReturnType<typeof setTimeout>[] = [];
    TIERS.forEach((_, i) => {
      const t = setTimeout(() => {
        const el = tiersRef.current[i];
        if (el) el.classList.add('lit');
      }, 300 + i * 120);
      timers.push(t);
    });
    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden pt-20">
      {/* Atmospheric background blobs */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div
          className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full opacity-20 blob-anim"
          style={{ background: 'radial-gradient(circle, #7c3aed 0%, transparent 70%)', filter: 'blur(60px)' }}
        />
        <div
          className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full opacity-15 blob-anim-delay"
          style={{ background: 'radial-gradient(circle, #f59e0b 0%, transparent 70%)', filter: 'blur(80px)' }}
        />
        <div
          className="absolute top-1/2 right-1/3 w-64 h-64 rounded-full opacity-10 blob-anim"
          style={{ background: 'radial-gradient(circle, #a855f7 0%, transparent 70%)', filter: 'blur(50px)', animationDelay: '3s' }}
        />
      </div>

      {/* Noise texture */}
      <div className="absolute inset-0 z-0 opacity-[0.04] pointer-events-none noise-overlay" />

      {/* Grid pattern */}
      <div
        className="absolute inset-0 z-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />

      <div className="relative z-10 w-full max-w-5xl mx-auto px-4 sm:px-6 flex flex-col items-center text-center gap-8">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-card border border-primary/30 text-xs font-semibold uppercase tracking-widest text-secondary-foreground">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
          </span>
          Smart India Hackathon 2026
        </div>

        {/* Headline */}
        <h1 className="hero-title text-foreground max-w-3xl">
          Rank Up.{' '}
          <span className="text-primary">Get Hired.</span>
          <br />
          <span className="glow-text-amber text-accent">The Elite Student</span>
          <br />
          Task Force.
        </h1>

        <p className="text-muted-foreground text-base sm:text-lg font-light max-w-xl leading-relaxed">
          A hyper-local, gamified digital workforce platform built exclusively for college students. Earn XP, climb ranks, form guilds — get paid.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
          <Link
            href="/"
            className="shimmer-btn text-white font-bold px-8 py-3.5 rounded-full text-sm transition-transform hover:scale-105 shadow-lg"
            style={{ boxShadow: '0 0 30px rgba(124,58,237,0.4)' }}
          >
            Join as Student
          </Link>
          <Link
            href="/"
            className="glass-card border border-border text-foreground font-semibold px-8 py-3.5 rounded-full text-sm hover:border-primary/50 hover:bg-primary/10 transition-all"
          >
            Hire a Guild
          </Link>
        </div>

        {/* Guild Pyramid */}
        <div className="w-full max-w-2xl mt-6 float-anim">
          <div className="relative flex flex-col items-center gap-1 px-4">
            {TIERS.map((tier, i) => (
              <div
                key={tier.rank}
                ref={(el) => { tiersRef.current[i] = el; }}
                className="pyramid-tier relative flex items-center justify-between px-4 sm:px-6 rounded-lg cursor-default"
                style={{
                  width: tier.width,
                  height: '44px',
                  background: `linear-gradient(90deg, rgba(255,255,255,0.04) 0%, ${tier.color}22 50%, rgba(255,255,255,0.04) 100%)`,
                  border: `1px solid ${tier.color}44`,
                  color: tier.color,
                  transition: 'filter 0.4s ease, transform 0.4s ease, box-shadow 0.4s ease',
                }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget;
                  el.style.boxShadow = `0 0 20px ${tier.glow}`;
                  el.style.filter = 'brightness(1.4)';
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget;
                  el.style.boxShadow = '';
                  el.style.filter = '';
                }}
              >
                <span className="rank-mono text-xs sm:text-sm font-bold" style={{ color: tier.color }}>
                  {tier.rank}
                </span>
                <span className="text-xs font-medium opacity-80 hidden sm:block" style={{ color: tier.color }}>
                  {tier.label}
                </span>
                <span className="rank-mono text-xs opacity-50" style={{ color: tier.color }}>
                  {tier.rank}
                </span>
              </div>
            ))}
            {/* Pyramid bottom label */}
            <p className="text-xs text-muted-foreground mt-3 uppercase tracking-widest">
              Guild Hierarchy — F to S+
            </p>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 opacity-40">
        <span className="text-xs text-muted-foreground uppercase tracking-widest">Scroll</span>
        <div className="w-px h-8 bg-gradient-to-b from-muted-foreground to-transparent" />
      </div>
    </section>
  );
}