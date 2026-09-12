'use client';
import React, { useEffect, useRef } from 'react';

const stats = [
  { value: '40M+', label: 'Higher-Ed Students in India', sub: 'Target Student Demographic', color: '#b81d42' },
  { value: '$455B', label: 'Global Gig Economy TAM', sub: 'Rapidly Growing Market', color: '#8b5cf6' },
  { value: '5', label: 'Deterministic Rank Tiers (RNK-E to RNK-A)', sub: 'Pure Skill Progression', color: '#a855f7' },
  { value: '85%', label: 'Direct Squad Payout', sub: 'Milestone Auto-Split', color: '#3b82f6' },
  { value: '15%', label: 'Platform Maintenance Fee', sub: 'Escrow & Infrastructure', color: '#ec4899' },
  { value: '0%', label: 'Payment Default Risk (Smart Escrow Vaults)', sub: '100% Locked Upfront', color: '#10b981' },
];

export default function PlatformStats() {
  const refs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add('is-visible')),
      { threshold: 0.1 }
    );
    refs.current.forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <section className="py-20 px-4 sm:px-6 relative">
      <div
        className="absolute inset-0 opacity-10 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at center, #8b5cf6 0%, transparent 60%)' }}
      />
      <div className="max-w-6xl mx-auto relative z-10">
        <div ref={(el) => { refs.current[0] = el; }} className="animate-on-scroll text-center mb-14">
          <span className="inline-block px-4 py-1 rounded-full glass-card border border-border text-xs font-mono font-bold uppercase tracking-widest text-muted-foreground mb-4">
            06 // By The Numbers
          </span>
          <h2 className="section-title text-foreground mb-4">
            The Metrics Behind{' '}
            <span className="text-accent glow-text-wine">UniParahits</span>
          </h2>
          <p className="text-muted-foreground max-w-lg mx-auto text-sm sm:text-base leading-relaxed">
            Engineered around verifiable market data, student equity, and ironclad escrow mathematics.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {stats.map((s, i) => (
            <div
              key={s.label}
              ref={(el) => { refs.current[i + 1] = el; }}
              className="animate-on-scroll glass-card rounded-3xl p-7 text-center group glass-hover relative overflow-hidden border border-white/10 flex flex-col justify-center"
              style={{ transitionDelay: `${i * 80}ms` }}
            >
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{ background: `radial-gradient(circle at center, ${s.color}12 0%, transparent 65%)` }}
              />
              <div className="relative z-10">
                <p
                  className="rank-mono text-4xl sm:text-5xl font-bold mb-2 tracking-tight"
                  style={{ color: s.color, textShadow: `0 0 25px ${s.color}40` }}
                >
                  {s.value}
                </p>
                <p className="text-sm font-bold text-foreground mb-1 leading-snug">{s.label}</p>
                <p className="text-[11px] font-mono text-muted-foreground">{s.sub}</p>
              </div>
            </div>
          ))}
        </div>

        {/* SIH context */}
        <div
          ref={(el) => { refs.current[stats.length + 1] = el; }}
          className="animate-on-scroll mt-8 glass-card rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row items-start sm:items-center gap-5"
          style={{ border: '1px solid rgba(245,158,11,0.2)' }}
        >
          <div
            className="flex-shrink-0 w-14 h-14 rounded-2xl flex items-center justify-center text-2xl"
            style={{ background: 'rgba(245,158,11,0.12)', border: '1px solid rgba(245,158,11,0.3)' }}
          >
            🏆
          </div>
          <div>
            <h4 className="text-base font-bold text-foreground mb-1">
              Smart India Hackathon 2026 — SIH Submission
            </h4>
            <p className="text-sm text-muted-foreground leading-relaxed">
              UniParahits was conceived and developed as a SIH 2026 project by <span className="text-foreground font-medium">Akshit Bhatt</span> in August 2026. The platform addresses the real, documented problem of unverifiable student talent and high-friction freelance transactions in India&apos;s college ecosystem.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}