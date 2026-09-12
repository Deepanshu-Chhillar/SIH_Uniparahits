'use client';
import React, { useEffect, useRef } from 'react';

const rankData = [
  {
    rankId: 'RNK-A',
    color: '#b81d42',
    req: 'Top 5% Squad Leaders; 5+ verified client deliverables in escrow',
    perks: 'Apex status; direct startup interview pipeline; uncapped bounty access',
    level: 1,
  },
  {
    rankId: 'RNK-B',
    color: '#a855f7',
    req: 'Lead active student squads; ₹25,000+ delivered with 4.5+ Trust Score',
    perks: 'Priority dispatch visibility; reduced escrow fee; lead complex client projects',
    level: 2,
  },
  {
    rankId: 'RNK-C',
    color: '#8b5cf6',
    req: '15+ tasks completed; ₹5,000 earned; 4.2+ Trust Score',
    perks: '⚡ Squad Creation Authority + Mentor & approve Rank E submissions',
    level: 3,
    highlight: true,
  },
  {
    rankId: 'RNK-D',
    color: '#3b82f6',
    req: 'Pass skill check via verified Rank C mentor evaluation',
    perks: '⚡ Earning Channels Live: Earn MANA barter credits & claim ZENI bounties',
    level: 4,
    highlight: true,
  },
  {
    rankId: 'RNK-E',
    color: '#64748b',
    req: 'Verify college enrollment (College ID, Admission Slip, or Fee Receipt)',
    perks: 'Learning-only access; shadow live student teams; practice sandbox',
    level: 5,
  },
];

export default function RankTable() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add('is-visible')),
      { threshold: 0.1 }
    );
    if (ref?.current) observer?.observe(ref?.current);
    return () => observer?.disconnect();
  }, []);

  return (
    <section className="py-20 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto">
        <div ref={ref} className="animate-on-scroll">
          <div className="text-center mb-10">
            <span className="inline-block px-4 py-1 rounded-full glass-card border border-border text-xs font-mono font-bold uppercase tracking-widest text-muted-foreground mb-3">
              Permissions & Perks
            </span>
            <h2 className="section-title text-foreground mb-2">Rank & Promotion Roadmap</h2>
            <p className="text-muted-foreground max-w-lg mx-auto text-sm">A clear 5-tier roadmap from first-year signup to top industry-ready squad leader.</p>
          </div>

          <div className="glass-card rounded-3xl overflow-hidden border border-white/10 shadow-2xl">
            {/* Table header */}
            <div className="grid grid-cols-12 gap-4 px-6 py-3.5 border-b border-white/10 text-xs font-mono font-bold uppercase tracking-widest text-muted-foreground bg-white/[0.02]">
              <div className="col-span-2">Rank ID</div>
              <div className="col-span-1 hidden sm:block">Level</div>
              <div className="col-span-5 sm:col-span-4">Promotion Requirement</div>
              <div className="col-span-5 sm:col-span-5">Unlocked Perks & Clearances</div>
            </div>

            {rankData?.map((r) => (
              <div
                key={r?.rankId}
                className={`grid grid-cols-12 gap-4 px-6 py-4 border-b border-white/5 last:border-0 items-center transition-colors hover:bg-white/5 ${r?.highlight ? 'bg-primary/5' : ''}`}
              >
                <div className="col-span-2">
                  <span
                    className="rank-mono text-xs sm:text-sm font-bold px-2.5 py-1 rounded-lg border"
                    style={{
                      color: r?.color,
                      borderColor: `${r?.color}40`,
                      background: `${r?.color}15`,
                      textShadow: r?.rankId === 'RNK-A' ? `0 0 10px ${r?.color}` : undefined,
                    }}
                  >
                    {r?.rankId}
                  </span>
                </div>
                <div className="col-span-1 hidden sm:block">
                  <span className="rank-mono text-xs text-muted-foreground font-semibold">LVL-{r?.level}</span>
                </div>
                <div className="col-span-5 sm:col-span-4">
                  <span className="text-xs text-slate-300">{r?.req}</span>
                </div>
                <div className="col-span-5 sm:col-span-5">
                  <span className="text-xs leading-relaxed" style={{ color: r?.highlight ? r?.color : undefined }}>
                    {r?.perks}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}