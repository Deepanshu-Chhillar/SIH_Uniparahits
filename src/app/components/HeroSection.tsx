'use client';
import React, { useEffect, useRef } from 'react';
import Link from 'next/link';
import { ArrowRight, Terminal, ShieldCheck } from 'lucide-react';

const TIERS = [
  { rankId: 'RNK-A', label: 'Guild Master',          color: '#b81d42', glow: 'rgba(184,29,66,0.6)', width: '30%', clearance: 'Apex • Top Projects' },
  { rankId: 'RNK-B', label: 'Senior Lead',           color: '#a855f7', glow: 'rgba(168,85,247,0.4)',  width: '45%', clearance: 'Team Lead • High Bounties' },
  { rankId: 'RNK-C', label: 'Senior Mentor',         color: '#3b82f6', glow: 'rgba(59,130,246,0.35)', width: '60%', clearance: 'Guild Creator & Evaluator' },
  { rankId: 'RNK-D', label: 'Active Contributor',    color: '#8b5cf6', glow: 'rgba(139,92,246,0.25)', width: '75%', clearance: 'Paid Gigs Unlocked' },
  { rankId: 'RNK-E', label: 'Student Learner',       color: '#64748b', glow: 'rgba(100,116,139,0.2)', width: '90%', clearance: 'Learning Mode • Peer Review' },
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
    <section className="relative flex flex-col items-center justify-center overflow-hidden pt-28 pb-16">
      {/* Atmospheric background blobs */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div
          className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full opacity-20 blob-anim"
          style={{ background: 'radial-gradient(circle, #8b5cf6 0%, transparent 70%)', filter: 'blur(70px)' }}
        />
        <div
          className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full opacity-10 blob-anim-delay"
          style={{ background: 'radial-gradient(circle, #b81d42 0%, transparent 70%)', filter: 'blur(80px)' }}
        />
        <div
          className="absolute top-1/2 right-1/3 w-64 h-64 rounded-full opacity-10 blob-anim"
          style={{ background: 'radial-gradient(circle, #a855f7 0%, transparent 70%)', filter: 'blur(50px)', animationDelay: '3s' }}
        />
      </div>

      {/* Noise texture */}
      <div className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none noise-overlay" />

      {/* Grid pattern */}
      <div
        className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
          backgroundSize: '48px 48px',
        }}
      />

      <div className="relative z-10 w-full max-w-4xl mx-auto px-4 sm:px-6 flex flex-col items-center text-center gap-6">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full glass-card border border-primary/30 text-[11px] font-mono uppercase tracking-widest text-secondary-foreground">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
          </span>
          India&apos;s Verified Student Freelance & Project Network
        </div>

        {/* Headline */}
        <h1 className="hero-title text-foreground max-w-3xl">
          Learn Skills. Deliver Projects.{' '}
          <span className="glow-text-wine text-accent">Earn 🪙 ZENI Credits.</span>
        </h1>

        <p className="text-muted-foreground text-sm sm:text-base max-w-2xl leading-relaxed">
          The all-in-one platform for college students — developers, designers, video editors, writers. Earn <strong className="text-foreground">⚡ MANA Credits</strong> through peer reviews & skill barter (non-purchasable), and unlock paid corporate bounties in <strong className="text-accent font-semibold">🪙 ZENI Credits (1 ZENI = ₹1 INR)</strong> backed by Smart Escrow.
        </p>

        {/* 1st-Year Verification Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-[11px] font-mono shadow-sm">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
          <span>
            <strong className="text-emerald-400 font-bold uppercase tracking-wider">1st-Year Friendly:</strong> Verify instantly using Admission Slip / Fee Receipt (No physical ID required)
          </span>
        </div>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row gap-3.5 w-full sm:w-auto items-center justify-center pt-1">
          <Link
            href="/auth"
            className="shimmer-btn text-white font-bold px-7 py-3 rounded-full text-xs sm:text-sm transition-transform hover:scale-105 shadow-lg flex items-center justify-center gap-2 w-full sm:w-auto"
            style={{ boxShadow: '0 0 25px rgba(139,92,246,0.35)' }}
          >
            Join as Student
          </Link>

          {/* Tactical Demo Link for Presentation (Room 304) */}
          <Link
            href="/dashboard"
            className="w-full sm:w-auto px-7 py-3 rounded-full text-xs sm:text-sm font-mono font-bold tracking-wide text-foreground border border-accent/60 bg-accent/20 hover:bg-accent/30 hover:border-accent shadow-[0_0_25px_rgba(184,29,66,0.35)] transition-all flex items-center justify-center gap-2 hover:scale-105"
          >
            <span className="w-2 h-2 rounded-full bg-accent animate-ping" />
            <Terminal className="w-4 h-4 text-accent" />
            <span>⚡ Launch Command Center (Demo)</span>
            <ArrowRight className="w-4 h-4 text-accent" />
          </Link>

          <Link
            href="/auth"
            className="glass-card border border-border text-foreground font-semibold px-6 py-3 rounded-full text-xs sm:text-sm hover:border-primary/50 hover:bg-primary/10 transition-all w-full sm:w-auto"
          >
            Hire a Student Team
          </Link>
        </div>

        {/* Guild Pyramid */}
        <div className="w-full max-w-xl mt-2 float-anim">
          <div className="relative flex flex-col items-center gap-1 px-4">
            {TIERS.map((tier, i) => (
              <div
                key={tier.rankId}
                ref={(el) => { tiersRef.current[i] = el; }}
                className="pyramid-tier relative flex items-center justify-between px-3.5 sm:px-5 rounded-lg cursor-default"
                style={{
                  width: tier.width,
                  height: '38px',
                  background: `linear-gradient(90deg, rgba(255,255,255,0.03) 0%, ${tier.color}15 50%, rgba(255,255,255,0.03) 100%)`,
                  border: `1px solid ${tier.color}35`,
                  color: tier.color,
                  transition: 'filter 0.4s ease, transform 0.4s ease, box-shadow 0.4s ease',
                }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget;
                  el.style.boxShadow = `0 0 20px ${tier.glow}`;
                  el.style.filter = 'brightness(1.3)';
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget;
                  el.style.boxShadow = '';
                  el.style.filter = '';
                }}
              >
                <span className="rank-mono text-xs font-bold" style={{ color: tier.color }}>
                  {tier.rankId}
                </span>
                <span className="text-xs font-medium tracking-wide hidden sm:block" style={{ color: tier.color }}>
                  {tier.label}
                </span>
                <span className="rank-mono text-[10px] opacity-70 hidden md:block" style={{ color: tier.color }}>
                  {tier.clearance}
                </span>
              </div>
            ))}
            {/* Pyramid bottom label */}
            <p className="text-[10px] rank-mono text-muted-foreground mt-2.5 uppercase tracking-widest">
              Skill & Level Progression — Rank E to Rank A
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