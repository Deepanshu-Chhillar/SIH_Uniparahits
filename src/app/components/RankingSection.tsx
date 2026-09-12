'use client';
import React, { useState, useEffect, useRef } from 'react';
import { Shield, CheckCircle2, ArrowRight, GitPullRequest, Terminal, Sparkles, RefreshCw, Lock, Unlock } from 'lucide-react';

const ranks = [
  {
    rankId: 'RNK-E',
    title: 'Student Learner',
    level: 5,
    color: '#64748b',
    glow: 'rgba(100,116,139,0.3)',
    req: '1st-Year Friendly: Verify college enrollment instantly via Admission Slip, Fee Receipt, or College ID.',
    perks: 'Learning mode. Access tutorials, shadow senior student guilds, and submit practice work. (Unlocks ⚡ MANA & 🪙 ZENI on elevation).',
    status: 'LEARNER MODE',
  },
  {
    rankId: 'RNK-D',
    title: 'Active Contributor',
    level: 4,
    color: '#3b82f6',
    glow: 'rgba(59,130,246,0.35)',
    req: 'Show practical skills (code repo, design, video, writing) & get approval from a C-Rank mentor.',
    perks: '⚡ Paid Earnings Unlocked! Earn ⚡ MANA Credits & claim corporate bounties in 🪙 ZENI Credits (1 ZENI = ₹1 INR).',
    highlight: true,
    status: 'ACTIVE EARNER',
  },
  {
    rankId: 'RNK-C',
    title: 'Senior Mentor & Guild Creator',
    level: 3,
    color: '#8b5cf6',
    glow: 'rgba(139,92,246,0.4)',
    req: 'Complete 15+ tasks, earn 5,000+ ZENI in bounties & maintain 4.2+ Trust Score.',
    perks: '⚡ Authority to evaluate & approve Rank E students + Form multi-skill student guilds for 50,000+ ZENI contracts.',
    highlight: true,
    status: 'SENIOR MENTOR',
  },
  {
    rankId: 'RNK-B',
    title: 'Senior Project Lead',
    level: 2,
    color: '#a855f7',
    glow: 'rgba(168,85,247,0.45)',
    req: 'Lead active student teams. Deliver 25,000+ ZENI in client projects with 4.5+ Trust Score.',
    perks: 'Priority client project recommendations. Reduced platform fees. Lead high-tier 🪙 ZENI sprint deliverables.',
    status: 'PROJECT LEAD',
  },
  {
    rankId: 'RNK-A',
    title: 'Guild Master (Apex)',
    level: 1,
    color: '#b81d42',
    glow: 'rgba(184,29,66,0.6)',
    req: 'Top 5% of student team leaders with 5+ major projects completed with 5-star client reviews.',
    perks: 'Apex status. Direct startup interview invites. Exclusive access to 50,000+ ZENI client projects.',
    isApex: true,
    status: 'GUILD MASTER',
  },
];

export default function RankingSection() {
  const refs = useRef<(HTMLDivElement | null)[]>([]);
  const [consensusStage, setConsensusStage] = useState<'idle' | 'evaluating' | 'verified'>('idle');

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add('is-visible')),
      { threshold: 0.08 }
    );
    refs.current.forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const simulateConsensus = () => {
    setConsensusStage('evaluating');
    setTimeout(() => {
      setConsensusStage('verified');
    }, 1500);
  };

  const resetConsensus = () => {
    setConsensusStage('idle');
  };

  return (
    <section id="rankings" className="py-20 px-4 sm:px-6 relative overflow-hidden">
      {/* Background Ambience */}
      <div
        className="absolute top-1/3 right-10 w-[500px] h-[500px] rounded-full opacity-10 pointer-events-none"
        style={{ background: 'radial-gradient(circle, #8b5cf6 0%, transparent 70%)', filter: 'blur(90px)' }}
      />

      <div className="max-w-6xl mx-auto relative z-10">
        <div ref={(el) => { refs.current[0] = el; }} className="animate-on-scroll mb-4 text-center">
          <span className="inline-block px-4 py-1 rounded-full glass-card border border-border text-xs font-mono font-bold uppercase tracking-widest text-muted-foreground">
            05 / Rank & Reputation System
          </span>
        </div>

        <div ref={(el) => { refs.current[1] = el; }} className="animate-on-scroll mb-4 text-center">
          <h2 className="section-title text-foreground mb-4">
            Earn Your{' '}
            <span className="text-primary font-mono">Rank.</span>{' '}
            Validated by Senior Mentors.
          </h2>
        </div>

        <div ref={(el) => { refs.current[2] = el; }} className="animate-on-scroll mb-14 text-center">
          <p className="text-muted-foreground max-w-xl mx-auto text-base leading-relaxed">
            Every rank represents real skills, verified by senior student mentors. Ranks cannot be bought with money — only earned through quality work.
          </p>
        </div>

        {/* 1. INTERACTIVE PEER REVIEW GATE DIAGRAM */}
        <div
          ref={(el) => { refs.current[3] = el; }}
          className="animate-on-scroll glass-card rounded-3xl p-6 sm:p-8 border border-white/15 bg-slate-950/80 mb-14 relative overflow-hidden backdrop-blur-2xl shadow-2xl"
        >
          {/* Background Accent Grid */}
          <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px]" />

          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-6 pb-4 border-b border-white/10">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/20 border border-primary/30 text-primary text-[11px] font-mono mb-2">
                <GitPullRequest className="w-3 h-3" />
                PEER REVIEW & APPROVAL GATE
              </div>
              <h3 className="text-lg font-bold text-foreground">
                How a <span className="font-mono text-slate-300">Rank E Student</span> Unlocks <span className="font-mono text-blue-400">Rank D</span> Earnings
              </h3>
            </div>

            {/* Trigger Button */}
            <div>
              {consensusStage === 'verified' ? (
                <button
                  type="button"
                  onClick={resetConsensus}
                  className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/15 border border-white/20 text-xs font-mono text-slate-300 flex items-center gap-2 transition-all"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  Reset Simulation
                </button>
              ) : (
                <button
                  type="button"
                  disabled={consensusStage === 'evaluating'}
                  onClick={simulateConsensus}
                  className="shimmer-btn px-5 py-2.5 rounded-xl text-white text-xs font-bold font-mono flex items-center gap-2 shadow-lg transition-all disabled:opacity-50"
                >
                  {consensusStage === 'evaluating' ? (
                    <>
                      <span className="w-3 h-3 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Reviewing Submission...
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-3.5 h-3.5" />
                      Simulate Peer Review
                    </>
                  )}
                </button>
              )}
            </div>
          </div>

          {/* Interactive Consensus Diagram */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 items-stretch relative">
            
            {/* Step 1: Student Submission */}
            <div className={`p-5 rounded-2xl border transition-all ${
              consensusStage === 'idle'
                ? 'bg-white/5 border-white/15'
                : 'bg-white/5 border-white/10 opacity-80'
            }`}>
              <div className="flex items-center justify-between mb-3">
                <span className="rank-mono text-xs font-bold px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">
                  RANK E LEARNER
                </span>
                <span className="text-[10px] font-mono text-muted-foreground">SUBMIT WORK</span>
              </div>
              <h4 className="text-sm font-bold text-foreground mb-1">Practical Proof of Skill</h4>
              <p className="text-xs text-muted-foreground leading-relaxed mb-4">
                Student submits a GitHub repo, Figma design, writing sample, or video project to the review queue.
              </p>
              <div className="p-2.5 rounded-xl bg-black/50 border border-white/10 font-mono text-[10px] text-slate-400 space-y-1">
                <p className="text-emerald-400">submission: Portfolio Project Sample</p>
                <p>quality_check: Ready for Senior Review</p>
                <p>college: DSEU Dwarka Campus</p>
              </div>
            </div>

            {/* Step 2: C-Rank Senior Review */}
            <div className={`p-5 rounded-2xl border transition-all relative overflow-hidden ${
              consensusStage === 'evaluating'
                ? 'bg-primary/20 border-primary shadow-xl ring-2 ring-primary/40'
                : 'bg-white/5 border-white/15'
            }`}>
              <div className="flex items-center justify-between mb-3">
                <span className="rank-mono text-xs font-bold px-2 py-0.5 rounded bg-purple-900/60 text-purple-300 border border-purple-500/40">
                  RANK C MENTOR
                </span>
                <span className="text-[10px] font-mono text-accent">PEER REVIEW</span>
              </div>
              <h4 className="text-sm font-bold text-foreground mb-1">Skill & Quality Review</h4>
              <p className="text-xs text-muted-foreground leading-relaxed mb-4">
                Assigned C-Rank senior student inspects the submission, tests practical competency, and approves.
              </p>
              <div className="p-2.5 rounded-xl bg-black/50 border border-white/10 font-mono text-[10px] text-slate-400 space-y-1">
                <p>reviewer: Vance (3rd Year Lead)</p>
                <p className={consensusStage === 'evaluating' ? 'text-accent animate-pulse font-bold' : 'text-slate-400'}>
                  status: {consensusStage === 'evaluating' ? 'REVIEWING PROJECT...' : 'READY FOR REVIEW'}
                </p>
                <p>criteria: Practical Skills & Originality</p>
              </div>
            </div>

            {/* Step 3: Verified & Unlocked */}
            <div className={`p-5 rounded-2xl border transition-all ${
              consensusStage === 'verified'
                ? 'bg-emerald-950/40 border-emerald-500/60 shadow-xl ring-2 ring-emerald-500/40'
                : 'bg-white/5 border-white/15'
            }`}>
              <div className="flex items-center justify-between mb-3">
                <span className="rank-mono text-xs font-bold px-2 py-0.5 rounded bg-blue-900/60 text-blue-300 border border-blue-500/40">
                  RANK D UNLOCKED
                </span>
                <span className="text-[10px] font-mono text-emerald-400 flex items-center gap-1">
                  <Unlock className="w-3 h-3" />
                  EARNINGS ACTIVE
                </span>
              </div>
              <h4 className="text-sm font-bold text-foreground mb-1">Paid Projects Activated</h4>
              <p className="text-xs text-muted-foreground leading-relaxed mb-4">
                Approval recorded! Student promoted to Rank D: now eligible for ⚡ MANA skill barter and 🪙 ZENI paid corporate bounties.
              </p>
              <div className="p-2.5 rounded-xl font-mono text-[10px] space-y-1.5 bg-emerald-900/30 border border-emerald-500/40 text-emerald-300">
                <p className="flex items-center gap-1.5 font-bold">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                  <span>⚡ MANA Earning: <span className="text-emerald-200 uppercase">ACTIVE</span></span>
                </p>
                <p className="flex items-center gap-1.5 font-bold">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                  <span>🪙 ZENI Paid Tasks: <span className="text-emerald-200 uppercase">UNLOCKED</span></span>
                </p>
              </div>
            </div>

          </div>
        </div>

        {/* 2. 5-TIER RANK CARDS */}
        <div className="flex flex-col gap-3">
          {[...ranks].reverse().map((r, i) => (
            <div
              key={r.rankId}
              ref={(el) => { refs.current[i + 4] = el; }}
              className={`animate-on-scroll glass-card rounded-2xl p-5 sm:p-6 relative overflow-hidden group cursor-default border transition-all ${
                r.isApex
                  ? 'border-accent/40 bg-accent/5'
                  : r.highlight
                  ? 'border-purple-500/30 bg-purple-950/10'
                  : 'border-white/10'
              }`}
              style={{
                transitionDelay: `${i * 60}ms`,
              }}
            >
              {/* Scanline on hover */}
              <div className="scan-line opacity-0 group-hover:opacity-100 transition-opacity" />

              {/* Apex Glow */}
              {r.isApex && (
                <div
                  className="absolute inset-0 opacity-10 group-hover:opacity-20 transition-opacity pointer-events-none"
                  style={{ background: `radial-gradient(ellipse at left, ${r.color} 0%, transparent 60%)` }}
                />
              )}

              <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-5">
                
                {/* Left: Holographic Rank Badge */}
                <div className="flex items-center gap-4">
                  <div
                    className="flex-shrink-0 w-16 h-16 rounded-2xl flex flex-col items-center justify-center border shadow-lg group-hover:scale-105 transition-transform"
                    style={{
                      background: `linear-gradient(135deg, ${r.color}25 0%, rgba(0,0,0,0.4) 100%)`,
                      borderColor: `${r.color}60`,
                      boxShadow: `0 0 20px ${r.glow}`,
                    }}
                  >
                    <span
                      className="rank-mono text-lg font-extrabold tracking-wider"
                      style={{ color: r.color, textShadow: r.isApex ? `0 0 12px ${r.color}` : undefined }}
                    >
                      {r.rankId}
                    </span>
                    <span className="text-[9px] font-mono uppercase tracking-widest text-muted-foreground">
                      LVL-{r.level}
                    </span>
                  </div>

                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="text-base font-bold text-foreground">{r.title}</h4>
                      <span
                        className="text-[9px] font-mono font-semibold px-2 py-0.5 rounded-full border uppercase tracking-wider"
                        style={{ background: `${r.color}15`, color: r.color, borderColor: `${r.color}35` }}
                      >
                        {r.status}
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground max-w-sm leading-relaxed">
                      {r.req}
                    </p>
                  </div>
                </div>

                {/* Right: Unlocks & Privileges */}
                <div className="sm:max-w-md w-full pt-3 sm:pt-0 sm:border-l border-white/10 sm:pl-6">
                  <p className="text-[10px] rank-mono text-muted-foreground uppercase tracking-wider mb-1">
                    Unlocked Operational Channels
                  </p>
                  <p className="text-xs leading-relaxed" style={{ color: r.highlight || r.isApex ? r.color : 'inherit' }}>
                    {r.perks}
                  </p>
                </div>

              </div>
            </div>
          ))}
        </div>

        {/* Footer Note */}
        <div
          ref={(el) => { refs.current[ranks.length + 4] = el; }}
          className="animate-on-scroll mt-10 text-center"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card border border-white/10 text-xs font-mono text-muted-foreground">
            <Shield className="w-3.5 h-3.5 text-primary" />
            Consensus Enforcement: Ranks are non-custodial and derived purely from verified git hashes and test audits.
          </div>
        </div>

      </div>
    </section>
  );
}