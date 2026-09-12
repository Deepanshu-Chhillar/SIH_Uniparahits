'use client';
import React, { useEffect, useRef } from 'react';

// BENTO GRID AUDIT:
// Array has 6 cards: [RankingCard, DualEconomy, GuildSystem, EscrowCard, TrustScore, Demotion]
// Grid: 3 cols
// Row 1: [col-1: RankingCard cs-1 rs-2] [col-2: DualEconomy cs-2 rs-1]
// Row 2: [col-1: FILLED-RankingCard]    [col-2: GuildSystem cs-1]        [col-3: EscrowCard cs-1]
// Row 3: [col-1: TrustScore cs-2]                                         [col-3: Demotion cs-1]
// Placed 6/6 cards ✓

export default function FeaturesBento() {
  const refs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add('is-visible')),
      { threshold: 0.06 }
    );
    refs.current.forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <section className="py-16 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto">
        {/* Desktop bento grid */}
        <div className="hidden md:grid grid-cols-3 grid-rows-3 gap-5 auto-rows-fr" style={{ gridTemplateRows: 'repeat(3, minmax(200px, auto))' }}>

          {/* [col-1 rs-2]: RankingCard */}
          <div
            ref={(el) => { refs.current[0] = el; }}
            className="animate-on-scroll col-span-1 row-span-2 glass-card rounded-2xl p-7 relative overflow-hidden group glass-hover flex flex-col"
          >
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity" style={{ background: 'radial-gradient(circle at top, rgba(184,29,66,0.15) 0%, transparent 60%)' }} />
            <div className="relative z-10 flex flex-col h-full">
              <div className="w-11 h-11 rounded-xl flex items-center justify-center mb-4" style={{ background: 'rgba(184,29,66,0.15)', border: '1px solid rgba(184,29,66,0.3)', color: '#b81d42' }}>
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                </svg>
              </div>
              <span className="text-[10px] font-mono text-accent uppercase tracking-widest font-bold mb-1">Layer 01</span>
              <h3 className="text-base sm:text-lg font-bold text-foreground mb-2">5-Tier Skill & Rank System</h3>
              <p className="text-xs text-muted-foreground leading-relaxed mb-4">
                A clear, step-by-step roadmap from college beginner to senior project lead:
              </p>
              <div className="flex flex-col gap-2.5 mt-auto text-[11px] font-mono">
                {[
                  { id: 'RNK-E', title: 'Cadet (Learner)', desc: 'Sign up with college ID or admission slip, access learning materials, and practice with real tasks.', color: '#64748b' },
                  { id: 'RNK-D', title: 'Contributor', desc: 'First earning level: Help peers for MANA credits and pick up paid startup tasks in ZENI.', color: '#3b82f6' },
                  { id: 'RNK-C', title: 'Mentor & Squad Lead', desc: 'Review junior submissions, guide peers, and form multi-skill project teams.', color: '#8b5cf6' },
                  { id: 'RNK-B', title: 'Senior Project Lead', desc: 'Take on high-value client projects, get priority invites, and enjoy lower platform fees.', color: '#a855f7' },
                  { id: 'RNK-A', title: 'Top 5% Guild Master', desc: 'Apex rank with direct technical interview pipelines to partner startups.', color: '#b81d42' },
                ].map((r) => (
                  <div key={r.id} className="p-2 rounded-xl bg-white/[0.03] border border-white/5 space-y-0.5">
                    <div className="flex items-center gap-2">
                      <span className="font-bold px-1.5 py-0.2 rounded text-[10px]" style={{ color: r.color, background: `${r.color}15`, border: `1px solid ${r.color}35` }}>
                        {r.id}
                      </span>
                      <span className="text-slate-200 font-semibold text-xs">{r.title}</span>
                    </div>
                    <p className="text-[10px] text-muted-foreground leading-tight pl-0.5">{r.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* [col-2 cs-2]: DualEconomy */}
          <div
            ref={(el) => { refs.current[1] = el; }}
            className="animate-on-scroll col-span-2 row-span-1 glass-card rounded-2xl p-7 relative overflow-hidden group glass-hover"
            style={{ transitionDelay: '80ms' }}
          >
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity" style={{ background: 'linear-gradient(135deg, rgba(139,92,246,0.1) 0%, rgba(184,29,66,0.12) 100%)' }} />
            <div className="relative z-10 flex flex-col sm:flex-row gap-6 h-full items-center">
              <div className="flex-1 space-y-2">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-mono text-primary uppercase tracking-widest font-bold">Layer 02</span>
                  <span className="text-muted-foreground text-xs">•</span>
                  <span className="text-xs font-mono font-bold text-accent">⚡ MANA + 🪙 ZENI</span>
                </div>
                <h3 className="text-lg font-bold text-foreground">Dual Rewards: ⚡ MANA & 🪙 ZENI</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  A simple two-reward system separating peer learning from real cash earnings:
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1 text-xs">
                  <div className="p-3 rounded-xl bg-primary/10 border border-primary/20 space-y-1">
                    <p className="font-bold text-primary flex items-center gap-1.5">
                      <span>⚡ MANA Credits</span>
                      <span className="text-[10px] font-mono font-normal opacity-80">(Skill Barter)</span>
                    </p>
                    <p className="text-[11px] text-slate-300 leading-snug">
                      Non-cash peer credits earned by reviewing code, helping classmates, and sharing notes. Can&apos;t be bought with money; builds your reputation score.
                    </p>
                  </div>

                  <div className="p-3 rounded-xl bg-accent/10 border border-accent/25 space-y-1">
                    <p className="font-bold text-accent flex items-center gap-1.5">
                      <span>🪙 ZENI Credits</span>
                      <span className="text-[10px] font-mono font-normal opacity-80">(1 ZENI = ₹1)</span>
                    </p>
                    <p className="text-[11px] text-slate-300 leading-snug">
                      Real cash earnings! Clients deposit project funds into safe escrow upfront so you&apos;re guaranteed to get paid on time.
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex-shrink-0 flex gap-2.5 items-end h-24 sm:h-32">
                {[45, 65, 55, 85, 75, 95, 90].map((h, i) => (
                  <div key={i} className="w-5 sm:w-6 rounded-sm" style={{ height: `${h}%`, background: `linear-gradient(to top, #8b5cf6, #b81d42)`, opacity: 0.5 + i * 0.07 }} />
                ))}
              </div>
            </div>
          </div>

          {/* [col-2]: GuildSystem */}
          <div
            ref={(el) => { refs.current[2] = el; }}
            className="animate-on-scroll col-span-1 row-span-1 glass-card rounded-2xl p-6 relative overflow-hidden group glass-hover"
            style={{ transitionDelay: '160ms' }}
          >
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity" style={{ background: 'radial-gradient(circle at top right, rgba(168,85,247,0.1) 0%, transparent 60%)' }} />
            <div className="relative z-10 space-y-2">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-3" style={{ background: 'rgba(168,85,247,0.15)', border: '1px solid rgba(168,85,247,0.3)', color: '#a855f7' }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                  <circle cx="9" cy="7" r="4" />
                  <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                  <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                </svg>
              </div>
              <span className="text-[10px] font-mono text-purple-400 uppercase tracking-widest font-bold">Layer 03</span>
              <h3 className="text-sm font-bold text-foreground">Multi-Skill Student Squads</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                <strong className="text-slate-200">Cross-Functional Teams:</strong> Rank C+ leads bring together coders, UI/UX designers, video editors, and writers to deliver complete projects.
              </p>
              <p className="text-xs text-muted-foreground leading-relaxed">
                <strong className="text-slate-200">Automated Fair Split:</strong> When work is approved, earnings are automatically shared among team members based on their role and contribution.
              </p>
            </div>
          </div>

          {/* [col-3]: EscrowCard */}
          <div
            ref={(el) => { refs.current[3] = el; }}
            className="animate-on-scroll col-span-1 row-span-1 glass-card rounded-2xl p-6 relative overflow-hidden group glass-hover"
            style={{ transitionDelay: '240ms' }}
          >
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity" style={{ background: 'radial-gradient(circle at top right, rgba(59,130,246,0.1) 0%, transparent 60%)' }} />
            <div className="relative z-10 space-y-2">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-3" style={{ background: 'rgba(59,130,246,0.15)', border: '1px solid rgba(59,130,246,0.3)', color: '#3b82f6' }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                  <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                </svg>
              </div>
              <span className="text-[10px] font-mono text-blue-400 uppercase tracking-widest font-bold">Layer 04</span>
              <h3 className="text-sm font-bold text-foreground">100% Safe Escrow Payments</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                <strong className="text-slate-200">Zero Payment Risk:</strong> 100% of client project funds are locked in secure escrow before students start working.
              </p>
              <p className="text-xs text-muted-foreground leading-relaxed">
                <strong className="text-slate-200">Guaranteed 85% Payout:</strong> 85% goes directly to the student squad upon delivery, protected by platform dispute support.
              </p>
            </div>
          </div>

          {/* [col-1 cs-2]: TrustScore */}
          <div
            ref={(el) => { refs.current[4] = el; }}
            className="animate-on-scroll col-span-2 row-span-1 glass-card rounded-2xl p-7 relative overflow-hidden group glass-hover"
            style={{ transitionDelay: '120ms' }}
          >
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity" style={{ background: 'linear-gradient(90deg, rgba(34,197,94,0.06) 0%, transparent 60%)' }} />
            <div className="relative z-10 flex flex-col sm:flex-row gap-6 items-start">
              <div className="flex-1 space-y-2">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-mono text-green-400 uppercase tracking-widest font-bold">Layer 05</span>
                  <span className="text-muted-foreground text-xs">•</span>
                  <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                  <span className="text-[11px] text-green-400 font-semibold uppercase font-mono">Real-Time Skill Tracking</span>
                </div>
                <h3 className="text-base sm:text-lg font-bold text-foreground">Smart Quality & Trust Score</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Transparent rating based on on-time delivery, code quality, and client feedback. Maintain a 4.0+ score to level up and unlock higher bounties.
                </p>
              </div>
              <div className="flex-shrink-0 flex flex-col gap-2 w-full sm:w-48">
                {[
                  { label: 'Delivery Speed', val: 92 },
                  { label: 'Client Rating', val: 88 },
                  { label: 'Task Completion', val: 96 }
                ].map((m) => (
                  <div key={m.label}>
                    <div className="flex justify-between mb-1">
                      <span className="text-[11px] text-muted-foreground font-mono">{m.label}</span>
                      <span className="rank-mono text-xs text-foreground font-bold">{m.val}%</span>
                    </div>
                    <div className="h-1.5 w-full rounded-full bg-white/5 overflow-hidden">
                      <div className="h-full rounded-full bg-emerald-500/80" style={{ width: `${m.val}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* [col-3]: Demotion */}
          <div
            ref={(el) => { refs.current[5] = el; }}
            className="animate-on-scroll col-span-1 row-span-1 glass-card rounded-2xl p-6 relative overflow-hidden group glass-hover"
            style={{ transitionDelay: '200ms', border: '1px solid rgba(239,68,68,0.25)' }}
          >
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity" style={{ background: 'radial-gradient(circle at bottom right, rgba(239,68,68,0.08) 0%, transparent 60%)' }} />
            <div className="relative z-10 space-y-2">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-3" style={{ background: 'rgba(239,68,68,0.12)', border: '1px solid rgba(239,68,68,0.25)', color: '#ef4444' }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
                  <line x1="12" y1="9" x2="12" y2="13" />
                  <line x1="12" y1="17" x2="12.01" y2="17" />
                </svg>
              </div>
              <span className="text-[10px] font-mono text-red-400 uppercase tracking-widest font-bold">Layer 06</span>
              <h3 className="text-sm font-bold text-foreground">Fair Play & Anti-Cheat Rules</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Zero tolerance for plagiarism, fake submissions, or ghosting. Quality breaches reduce Trust Score to keep the community honest.
              </p>
            </div>
          </div>
        </div>

        {/* Mobile: single column */}
        <div className="md:hidden flex flex-col gap-4">
          {[
            {
              title: '1. 5-Tier Skill & Rank System',
              color: '#b81d42',
              desc: 'Clear roadmap from beginner student (RNK-E) to senior project lead (RNK-A) with direct startup hiring pipelines.'
            },
            {
              title: '2. Dual Rewards (⚡ MANA & 🪙 ZENI)',
              color: '#7c3aed',
              desc: '⚡ MANA Credits (Skill Barter XP) for peer help & code reviews + 🪙 ZENI Credits (1:1 pegged to INR) backed by Safe Escrow for paid client bounties.'
            },
            {
              title: '3. Multi-Skill Student Squads',
              color: '#a855f7',
              desc: 'Rank C+ leads assemble cross-functional units (Coders, Designers, Editors, Writers). Earnings are automatically shared on project completion.'
            },
            {
              title: '4. 100% Safe Escrow Payments',
              color: '#3b82f6',
              desc: 'Zero payment ghosting: 100% client funds locked upfront. Automated 85% squad payout upon approval with fair dispute support.'
            },
            {
              title: '5. Smart Quality & Trust Score',
              color: '#22c55e',
              desc: 'Real-time tracking of Delivery Speed (92%), Client Rating (88%), and Task Completion (96%). Maintain 4.0+ to rank up.'
            },
            {
              title: '6. Fair Play & Anti-Cheat Rules',
              color: '#ef4444',
              desc: 'Zero tolerance for plagiarism, fake submissions, or scams. Violations result in Trust Score penalties and account suspension.'
            },
          ].map((f, i) => (
            <div
              key={f.title}
              ref={(el) => { refs.current[i + 6] = el; }}
              className="animate-on-scroll glass-card rounded-xl p-6 glass-hover space-y-1.5"
              style={{ transitionDelay: `${i * 80}ms` }}
            >
              <h3 className="text-sm font-bold" style={{ color: f.color }}>{f.title}</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}