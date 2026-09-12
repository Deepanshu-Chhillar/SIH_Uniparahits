'use client';
import React, { useEffect, useRef } from 'react';
import Link from 'next/link';
import { ShieldCheck, ArrowRight, Terminal } from 'lucide-react';

const TIERS = [
  { rank: 'RNK-A', label: 'Guild Master', color: '#b81d42', width: '22%' },
  { rank: 'RNK-B', label: 'Senior Lead', color: '#a855f7', width: '38%' },
  { rank: 'RNK-C', label: 'Mentor & Evaluator', color: '#8b5cf6', width: '54%' },
  { rank: 'RNK-D', label: 'Active Contributor', color: '#3b82f6', width: '70%' },
  { rank: 'RNK-E', label: 'Cadet (Learner Node)', color: '#64748b', width: '86%' },
];

export default function AboutCTA() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add('is-visible')),
      { threshold: 0.2 }
    );
    if (ref?.current) observer?.observe(ref?.current);
    return () => observer?.disconnect();
  }, []);

  return (
    <section className="py-20 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto">
        <div
          ref={ref}
          className="animate-on-scroll glass-card rounded-3xl p-8 sm:p-14 text-center relative overflow-hidden border border-white/10 shadow-2xl bg-slate-950/80"
        >
          {/* Tactical background glow */}
          <div
            className="absolute inset-0 opacity-15 pointer-events-none"
            style={{ background: 'radial-gradient(ellipse at center, #b81d42 0%, #8b5cf6 50%, transparent 70%)' }}
          />
          <div className="noise-overlay absolute inset-0 opacity-[0.03] pointer-events-none" />

          <div className="relative z-10">
            {/* 5-Tier Pyramid Visual */}
            <div className="flex flex-col items-center gap-1.5 mb-8">
              {TIERS.map((tier) => (
                <div
                  key={tier.rank}
                  className="flex items-center justify-between px-3 rounded-lg"
                  style={{
                    width: tier.width,
                    height: '26px',
                    background: `linear-gradient(90deg, transparent, ${tier.color}25, transparent)`,
                    border: `1px solid ${tier.color}40`,
                  }}
                >
                  <span className="rank-mono text-[10px] font-bold" style={{ color: tier.color }}>{tier.rank}</span>
                  <span className="text-[9px] font-mono text-slate-300 hidden sm:inline">{tier.label}</span>
                </div>
              ))}
            </div>

            {/* Header */}
            <h2 className="text-2xl sm:text-4xl font-bold text-foreground mb-4">
              Ready to Deploy as{' '}
              <span className="text-accent glow-text-wine">RNK-E?</span>
            </h2>

            {/* Subtext */}
            <p className="text-muted-foreground mb-8 max-w-lg mx-auto text-sm sm:text-base leading-relaxed">
              Verify with your College ID or Admission Slip. Build your proof-of-work, pass peer evaluation, and unlock corporate bounties.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link
                href="/auth"
                className="w-full sm:w-auto shimmer-btn text-white font-bold px-8 py-3.5 rounded-full text-xs sm:text-sm transition-transform hover:scale-105 shadow-lg flex items-center justify-center gap-2"
                style={{ boxShadow: '0 0 30px rgba(184,29,66,0.35)' }}
              >
                <Terminal className="w-4 h-4" />
                Initialize Cadet Onboarding
              </Link>
              <Link
                href="/features"
                className="w-full sm:w-auto glass-card border border-white/15 text-foreground font-semibold px-8 py-3.5 rounded-full text-xs sm:text-sm hover:border-primary/50 transition-colors flex items-center justify-center gap-2"
              >
                Explore Platform Features
                <ArrowRight className="w-4 h-4 text-muted-foreground" />
              </Link>
            </div>

            {/* Footnote */}
            <p className="mt-8 text-xs text-muted-foreground font-mono flex items-center justify-center gap-2">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>Smart India Hackathon 2026 // DSEU Dwarka Node • Launching September 2026</span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}