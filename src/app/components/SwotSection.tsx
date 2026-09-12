'use client';
import React, { useEffect, useRef } from 'react';
import Link from 'next/link';
import { ShieldCheck, Lock, AlertTriangle, UserCheck, Terminal, ArrowRight } from 'lucide-react';

const defensePillars = [
  {
    id: 'vault',
    label: 'Payment Security',
    title: 'Smart Escrow Protection',
    icon: <Lock className="w-6 h-6 text-blue-400" />,
    color: '#3b82f6',
    desc: 'Clients deposit 100% of project funds in 🪙 ZENI Credits (backed 1:1 by liquid INR) into escrow before work begins. Guarantees zero payment ghosting.',
    safeguards: [
      '100% upfront client funds deposited in ZENI (1:1 INR)',
      'Automatic 85% guild payout in ZENI & MANA upon approval',
      'Fair dispute resolution timer if client delays approval',
    ],
  },
  {
    id: 'consensus',
    label: 'Quality Assurance',
    title: 'Senior Peer Mentoring & Review',
    icon: <ShieldCheck className="w-6 h-6 text-purple-400" />,
    color: '#8b5cf6',
    desc: 'Junior students demonstrate practical skills to senior C-Rank mentors for ⚡ MANA Credits before unlocking commercial 🪙 ZENI client gigs.',
    safeguards: [
      'Senior student review of practical submissions',
      'Earn ⚡ MANA Credits through peer reviews & study notes',
      'Constructive feedback to help learners rank up to Rank D',
    ],
  },
  {
    id: 'demotion',
    label: 'Fair Play Policy',
    title: 'Strict Anti-Cheat & Quality Rules',
    icon: <AlertTriangle className="w-6 h-6 text-red-400" />,
    color: '#ef4444',
    desc: 'Zero tolerance for plagiarism, fake submissions, or ghosting. Missed deadlines lower Trust Score; severe violations result in a permanent account suspension.',
    safeguards: [
      'Trust Score penalty for unexcused missed deadlines',
      'Automatic rank review if project ratings drop',
      'Permanent account suspension for plagiarism or cheating',
    ],
  },
  {
    id: 'sybil',
    label: 'Verified Identity',
    title: 'Real College Student Verification',
    icon: <UserCheck className="w-6 h-6 text-emerald-400" />,
    color: '#22c55e',
    desc: 'Every student is verified through College ID cards, Admission Slips, Fee Receipts, or campus emails. Zero bots or fake profiles.',
    safeguards: [
      '1st-Year Friendly: Instant verification via Fee Receipt & Admission Slip',
      'One student, one verified account policy',
      'Authentic college credentials and campus community',
    ],
  },
];

export default function SwotSection() {
  const refs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add('is-visible')),
      { threshold: 0.08 }
    );
    refs.current.forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <section id="swot" className="py-20 px-4 sm:px-6 relative">
      <div
        className="absolute bottom-0 left-0 right-0 h-48 pointer-events-none"
        style={{ background: 'linear-gradient(to top, rgba(7,7,26,0.9), transparent)' }}
      />
      <div className="max-w-6xl mx-auto relative z-10">
        <div ref={(el) => { refs.current[0] = el; }} className="animate-on-scroll mb-4 text-center">
          <span className="inline-block px-4 py-1 rounded-full glass-card border border-border text-xs font-mono font-bold uppercase tracking-widest text-muted-foreground">
            08 / Trust & Safety
          </span>
        </div>
        <div ref={(el) => { refs.current[1] = el; }} className="animate-on-scroll mb-14 text-center">
          <h2 className="section-title text-foreground mb-4">
            How We Protect{' '}
            <span className="text-primary">Students & Clients</span>
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto text-base leading-relaxed">
            Four programmatic layers of safety designed to guarantee students get paid on time and clients receive quality work.
          </p>
        </div>

        {/* 4 Defense Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {defensePillars.map((p, i) => (
            <div
              key={p.id}
              ref={(el) => { refs.current[i + 2] = el; }}
              className="animate-on-scroll glass-card rounded-3xl p-8 group glass-hover relative overflow-hidden border border-white/10"
              style={{ transitionDelay: `${i * 100}ms` }}
            >
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity"
                style={{ background: `radial-gradient(ellipse at top left, ${p.color}10 0%, transparent 60%)` }}
              />
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-5">
                  <div
                    className="w-12 h-12 rounded-2xl flex items-center justify-center border"
                    style={{ background: `${p.color}15`, borderColor: `${p.color}35` }}
                  >
                    {p.icon}
                  </div>
                  <span
                    className="text-[10px] rank-mono font-semibold px-2.5 py-1 rounded-full border uppercase tracking-wider"
                    style={{ background: `${p.color}15`, color: p.color, borderColor: `${p.color}35` }}
                  >
                    {p.label}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-foreground mb-2">{p.title}</h3>
                <p className="text-xs text-muted-foreground leading-relaxed mb-6">{p.desc}</p>

                <div className="space-y-2 pt-4 border-t border-white/10">
                  <p className="text-[10px] rank-mono text-muted-foreground uppercase tracking-wider">
                    Safety Rules:
                  </p>
                  {p.safeguards.map((item) => (
                    <div key={item} className="flex items-center gap-2 text-xs text-slate-300">
                      <div className="w-1.5 h-1.5 rounded-full" style={{ background: p.color }} />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Conversion CTA Banner */}
        <div
          ref={(el) => { refs.current[defensePillars.length + 2] = el; }}
          className="animate-on-scroll mt-16 text-center"
        >
          <div className="glass-card rounded-3xl p-10 sm:p-14 relative overflow-hidden border border-white/15 bg-gradient-to-b from-slate-900/60 to-slate-950/90 shadow-2xl">
            <div
              className="absolute inset-0 opacity-20 pointer-events-none"
              style={{ background: 'radial-gradient(ellipse at center, #7c3aed 0%, transparent 60%)' }}
            />
            <div className="relative z-10">
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/20 border border-accent/40 text-accent text-xs font-mono mb-4">
                CAMPUS FREELANCING PLATFORM
              </span>

              <h3 className="text-2xl sm:text-4xl font-extrabold text-foreground mb-4 tracking-tight">
                Ready to Build Your{' '}
                <span className="text-accent glow-text-wine">⚡ MANA & 🪙 ZENI Income?</span>
              </h3>
              <p className="text-muted-foreground mb-8 max-w-lg mx-auto text-sm leading-relaxed">
                Join students across Delhi/NCR colleges delivering real projects, leveling up ranks, and earning while studying.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Link
                  href="/auth"
                  className="shimmer-btn text-white font-bold px-8 py-3.5 rounded-full text-sm transition-transform hover:scale-105 flex items-center justify-center gap-2 w-full sm:w-auto"
                  style={{ boxShadow: '0 0 30px rgba(124,58,237,0.35)' }}
                >
                  <span>Join as Student</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>

                <Link
                  href="/dashboard"
                  className="w-full sm:w-auto px-7 py-3.5 rounded-full text-sm font-mono font-bold tracking-wide text-foreground border border-accent/60 bg-accent/20 hover:bg-accent/30 hover:border-accent shadow-[0_0_25px_rgba(184,29,66,0.35)] transition-all flex items-center justify-center gap-2 hover:scale-105"
                >
                  <span className="w-2 h-2 rounded-full bg-accent animate-ping" />
                  <Terminal className="w-4 h-4 text-accent" />
                  <span>⚡ Launch Command Center (Demo)</span>
                </Link>

                <Link
                  href="/auth"
                  className="glass-card border border-border text-foreground font-semibold px-8 py-3.5 rounded-full text-sm hover:border-primary/50 transition-colors flex items-center justify-center w-full sm:w-auto"
                >
                  Hire a Student Team
                </Link>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}