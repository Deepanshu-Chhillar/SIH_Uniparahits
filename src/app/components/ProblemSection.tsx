'use client';
import React, { useEffect, useRef } from 'react';

const problems = [
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        <path d="M9 12l2 2 4-4" />
      </svg>
    ),
    badge: 'VERIFIED SKILLS',
    title: 'Practical Proof of Work vs. Fake Resumes',
    desc: 'Static resumes and unverified claims make it impossible for talented students to get noticed, while recruiters waste hours on unproven applicants. UniParahits replaces PDF resumes with real project proof verified by senior student mentors.',
    accent: '#b81d42',
    stat: '100%',
    statLabel: 'Verified practical projects over static resumes',
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
        <path d="M7 11V7a5 5 0 0 1 10 0v4" />
      </svg>
    ),
    badge: 'SECURE ESCROW',
    title: 'Guaranteed Payment vs. Payment Ghosting',
    desc: 'Too many students do freelance work on chat and get ghosted without receiving a single rupee. UniParahits locks client project payments in smart escrow before work begins, guaranteeing you get paid when you deliver.',
    accent: '#7c3aed',
    stat: '0%',
    statLabel: 'Payment default risk with smart escrow vaults',
  },
];

export default function ProblemSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
          }
        });
      },
      { threshold: 0.15 }
    );
    cardRefs.current.forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <section id="problem" className="py-20 px-4 sm:px-6 relative">
      <div className="max-w-6xl mx-auto">
        {/* Section label */}
        <div
          ref={(el) => { cardRefs.current[0] = el; }}
          className="animate-on-scroll mb-4 text-center"
        >
          <span className="inline-block px-4 py-1 rounded-full glass-card border border-border text-xs font-mono font-bold uppercase tracking-widest text-muted-foreground">
            01 / The Real Problem
          </span>
        </div>

        <div
          ref={(el) => { cardRefs.current[1] = el; }}
          className="animate-on-scroll mb-14 text-center"
        >
          <h2 className="section-title text-foreground mb-4">
            Traditional Freelance Platforms Are{' '}
            <span className="text-primary">Failing Students</span>
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto text-base leading-relaxed">
            Global bidding sites force college students into price wars, while unverified client deals expose them to unpaid work and scams.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {problems.map((p, i) => (
            <div
              key={p.title}
              ref={(el) => { cardRefs.current[i + 2] = el; }}
              className="animate-on-scroll glass-card glass-hover rounded-3xl p-8 relative overflow-hidden group border border-white/10"
              style={{ transitionDelay: `${i * 120}ms` }}
            >
              {/* Scan line */}
              <div className="scan-line opacity-0 group-hover:opacity-100 transition-opacity" />

              {/* Accent glow */}
              <div
                className="absolute top-0 right-0 w-48 h-48 rounded-full opacity-10 group-hover:opacity-20 transition-opacity"
                style={{ background: `radial-gradient(circle, ${p.accent} 0%, transparent 70%)`, filter: 'blur(30px)', transform: 'translate(30%, -30%)' }}
              />

              <div className="relative z-10">
                <div className="flex items-center justify-between mb-6">
                  <div
                    className="w-12 h-12 rounded-2xl flex items-center justify-center"
                    style={{ background: `${p.accent}20`, color: p.accent, border: `1px solid ${p.accent}40` }}
                  >
                    {p.icon}
                  </div>
                  <span
                    className="text-[10px] rank-mono px-2.5 py-1 rounded-full border uppercase tracking-wider font-semibold"
                    style={{ background: `${p.accent}15`, color: p.accent, borderColor: `${p.accent}30` }}
                  >
                    {p.badge}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-foreground mb-3">{p.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed mb-8">{p.desc}</p>

                <div className="flex items-end gap-3 pt-5 border-t border-white/10">
                  <span
                    className="rank-mono text-4xl font-bold"
                    style={{ color: p.accent }}
                  >
                    {p.stat}
                  </span>
                  <span className="text-xs text-muted-foreground leading-tight mb-1 max-w-[200px]">
                    {p.statLabel}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}