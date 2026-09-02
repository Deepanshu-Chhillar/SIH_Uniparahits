'use client';
import React, { useEffect, useRef } from 'react';

const rankData = [
  { rank: 'S+', color: '#f59e0b', req: 'Top 1% Leaderboard', perks: 'Direct interview invites from partner startups', level: 1 },
  { rank: 'S',  color: '#e0e7ff', req: 'Top 5% Leaderboard', perks: 'Hall of Fame listing. Platinum badge.', level: 2 },
  { rank: 'A',  color: '#a855f7', req: '3+ successful Guild projects', perks: 'Featured profile. Top-tier bounty access.', level: 3 },
  { rank: 'B',  color: '#8b5cf6', req: 'Lead Guilds. ₹25,000+ total earned', perks: 'Priority search. Reduced platform commission.', level: 4 },
  { rank: 'C',  color: '#3b82f6', req: '₹5,000 earned + 3× 5-star ratings', perks: '⚡ Guild Creation unlocked', level: 5, highlight: true },
  { rank: 'D',  color: '#6b7280', req: '15 tasks. 4.2 Trust Score', perks: 'Mid-tier bounties. Search visibility.', level: 6 },
  { rank: 'E',  color: '#64748b', req: '5 Peer Tasks. 4.0 Trust Score', perks: 'Low-tier paid corporate bounties.', level: 7 },
  { rank: 'F',  color: '#475569', req: 'Verify .edu email. Complete profile', perks: 'Basic peer-to-peer (free) tasks.', level: 8 },
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
    <section className="py-16 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto">
        <div ref={ref} className="animate-on-scroll">
          <h2 className="section-title text-foreground mb-2 text-center">Complete Rank Reference</h2>
          <p className="text-muted-foreground text-center mb-10">All 8 ranks, their requirements, and what they unlock.</p>

          <div className="glass-card rounded-2xl overflow-hidden">
            {/* Table header */}
            <div className="grid grid-cols-12 gap-4 px-6 py-3 border-b border-border text-xs font-bold uppercase tracking-widest text-muted-foreground">
              <div className="col-span-1">Rank</div>
              <div className="col-span-1 hidden sm:block">Lvl</div>
              <div className="col-span-5 sm:col-span-4">Requirement</div>
              <div className="col-span-6 sm:col-span-6">Unlocks</div>
            </div>

            {rankData?.map((r, i) => (
              <div
                key={r?.rank}
                className={`grid grid-cols-12 gap-4 px-6 py-4 border-b border-border last:border-0 items-center transition-colors hover:bg-white/5 ${r?.highlight ? 'bg-blue-500/5' : ''}`}
              >
                <div className="col-span-1">
                  <span
                    className="rank-mono text-base font-bold"
                    style={{ color: r?.color, textShadow: r?.rank === 'S+' ? `0 0 10px ${r?.color}` : undefined }}
                  >
                    {r?.rank}
                  </span>
                </div>
                <div className="col-span-1 hidden sm:block">
                  <span className="rank-mono text-xs text-muted-foreground">{r?.level}</span>
                </div>
                <div className="col-span-5 sm:col-span-4">
                  <span className="text-xs text-muted-foreground">{r?.req}</span>
                </div>
                <div className="col-span-6 sm:col-span-6">
                  <span className="text-xs" style={{ color: r?.highlight ? r?.color : undefined }}>{r?.perks}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}