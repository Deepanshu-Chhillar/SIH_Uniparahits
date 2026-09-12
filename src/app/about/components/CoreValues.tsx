'use client';
import React, { useEffect, useRef } from 'react';
import { Swords, Lock, Zap, Users, Globe, ShieldAlert } from 'lucide-react';

const values = [
  {
    icon: Swords,
    title: 'Meritocracy First',
    desc: 'Non-purchasable 5-Tier ranks (RNK-E to RNK-A). Promotion is achieved strictly through verified proof-of-work and peer reviews.',
    color: '#b81d42',
    tag: 'E-to-A Consensus',
  },
  {
    icon: Lock,
    title: 'Trust by Design',
    desc: 'Upfront Smart Escrow vaults lock 100% of project funds prior to task kickoff, with automated 85% squad / 15% platform payouts.',
    color: '#3b82f6',
    tag: 'Guaranteed Escrow',
  },
  {
    icon: Zap,
    title: 'Dual-Economy Protocol',
    desc: '⚡ MANA Credits for academic peer barter & notes + 🪙 ZENI Credits (1 ZENI = ₹1 INR) backed 1:1 by liquid cash for commercial client contracts.',
    color: '#a855f7',
    tag: 'MANA & ZENI Engine',
  },
  {
    icon: Users,
    title: 'Guild Synergy',
    desc: 'Multi-disciplinary student squads uniting developers, UI/UX designers, video editors, and QA specialists to deliver complete enterprise projects.',
    color: '#22c55e',
    tag: 'Cross-Functional',
  },
  {
    icon: Globe,
    title: 'Hyper-Local Genesis',
    desc: 'Anchored at DSEU Dwarka Campus as genesis node, purpose-built to scale seamlessly across Delhi/NCR university clusters.',
    color: '#8b5cf6',
    tag: 'DSEU Dwarka Genesis',
  },
  {
    icon: ShieldAlert,
    title: 'Zero-Tolerance Integrity',
    desc: 'Algorithmic Court Martial enforcement against plagiarism, ghosting, and review collusion to protect honest student reputations.',
    color: '#ef4444',
    tag: 'Anti-Cheat Enforcement',
  },
];

export default function CoreValues() {
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
    <section className="py-20 px-4 sm:px-6 relative">
      <div className="max-w-6xl mx-auto">
        <div ref={(el) => { refs.current[0] = el; }} className="animate-on-scroll text-center mb-14">
          <span className="inline-block px-4 py-1 rounded-full glass-card border border-border text-xs font-mono font-bold uppercase tracking-widest text-muted-foreground mb-4">
            05 // Core Values
          </span>
          <h2 className="section-title text-foreground mb-4">
            Architected on{' '}
            <span className="text-primary glow-text-wine">Uncompromising Principles</span>
          </h2>
          <p className="text-muted-foreground max-w-lg mx-auto text-sm sm:text-base leading-relaxed">
            Six architectural pillars governing platform game theory, payments, and campus community governance.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {values.map((v, i) => {
            const Icon = v.icon;
            return (
              <div
                key={v.title}
                ref={(el) => { refs.current[i + 1] = el; }}
                className="animate-on-scroll glass-card rounded-3xl p-7 group glass-hover relative overflow-hidden border border-white/10 flex flex-col justify-between"
                style={{ transitionDelay: `${i * 80}ms` }}
              >
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{ background: `radial-gradient(circle at 30% 30%, ${v.color}15 0%, transparent 65%)` }}
                />
                <div className="relative z-10 space-y-4">
                  <div className="flex items-center justify-between">
                    <div
                      className="w-12 h-12 rounded-2xl flex items-center justify-center text-xl"
                      style={{ background: `${v.color}15`, border: `1px solid ${v.color}30`, color: v.color }}
                    >
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-white/5 border border-white/10 text-slate-300">
                      {v.tag}
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-foreground">{v.title}</h3>
                  <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">{v.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}