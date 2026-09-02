'use client';
import React, { useEffect, useRef } from 'react';

const ranks = [
  {
    rank: 'F', level: 8, color: '#475569',
    req: 'Verify College .edu email. Complete profile.',
    perks: 'Accept basic peer-to-peer (free) tasks.',
  },
  {
    rank: 'E', level: 7, color: '#64748b',
    req: 'Complete 5 Peer Tasks. Maintain 4.0 Trust Score.',
    perks: 'Apply for low-tier paid corporate bounties.',
  },
  {
    rank: 'D', level: 6, color: '#6b7280',
    req: 'Complete 15 tasks. Maintain 4.2 Trust Score.',
    perks: 'Unlock mid-tier bounties. Visible in search.',
  },
  {
    rank: 'C', level: 5, color: '#3b82f6',
    req: 'Earn ₹5,000 via gigs & get three 5-Star ratings.',
    perks: '⚡ Unlocks Guild Creation — build your team.',
    highlight: true,
  },
  {
    rank: 'B', level: 4, color: '#8b5cf6',
    req: 'Lead Guilds. Earn ₹25,000+ total.',
    perks: 'Priority search visibility. Reduced commission.',
  },
  {
    rank: 'A', level: 3, color: '#a855f7',
    req: 'Successfully complete 3+ Guild projects.',
    perks: 'Featured profile. Top-tier bounty access.',
  },
  {
    rank: 'S', level: 2, color: '#e0e7ff',
    req: 'Top 5% of the Leaderboard.',
    perks: 'Hall of Fame listing. Platinum badge.',
  },
  {
    rank: 'S+', level: 1, color: '#f59e0b',
    req: 'Top 1% of the Leaderboard.',
    perks: 'Direct interview invites from partner startups.',
    isApex: true,
  },
];

export default function RankingSection() {
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
    <section id="rankings" className="py-20 px-4 sm:px-6 relative">
      <div className="max-w-6xl mx-auto">
        <div ref={(el) => { refs.current[0] = el; }} className="animate-on-scroll mb-4 text-center">
          <span className="inline-block px-4 py-1 rounded-full glass-card border border-border text-xs font-bold uppercase tracking-widest text-muted-foreground">
            05 / Ranking System
          </span>
        </div>
        <div ref={(el) => { refs.current[1] = el; }} className="animate-on-scroll mb-4 text-center">
          <h2 className="section-title text-foreground mb-4">
            Earn Your{' '}
            <span className="text-primary">Rank.</span>{' '}
            Never Buy It.
          </h2>
        </div>
        <div ref={(el) => { refs.current[2] = el; }} className="animate-on-scroll mb-14 text-center">
          <p className="text-muted-foreground max-w-lg mx-auto">
            Every rank represents real work, real ratings, real earnings. The system is meritocratic by design — no shortcuts.
          </p>
        </div>

        {/* Rank cards - reversed to show S+ at top */}
        <div className="flex flex-col gap-3">
          {[...ranks].reverse().map((r, i) => (
            <div
              key={r.rank}
              ref={(el) => { refs.current[i + 3] = el; }}
              className={`animate-on-scroll glass-card rounded-xl p-4 sm:p-5 relative overflow-hidden group cursor-default ${r.highlight ? 'border-blue-500/30' : ''} ${r.isApex ? 'border-accent/40' : ''}`}
              style={{
                transitionDelay: `${i * 60}ms`,
                border: r.isApex ? `1px solid ${r.color}50` : r.highlight ? `1px solid ${r.color}40` : undefined,
              }}
            >
              {r.isApex && (
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity"
                  style={{ background: `radial-gradient(ellipse at left, ${r.color}12 0%, transparent 60%)` }}
                />
              )}
              <div className="relative z-10 flex flex-col sm:flex-row sm:items-center gap-4">
                {/* Rank badge */}
                <div
                  className="flex-shrink-0 w-14 h-14 rounded-xl flex items-center justify-center"
                  style={{ background: `${r.color}18`, border: `1px solid ${r.color}40` }}
                >
                  <span
                    className="rank-mono text-xl font-bold"
                    style={{ color: r.color, textShadow: r.isApex ? `0 0 12px ${r.color}` : undefined }}
                  >
                    {r.rank}
                  </span>
                </div>

                {/* Level */}
                <div className="flex-shrink-0 hidden sm:block">
                  <span className="text-xs text-muted-foreground uppercase tracking-widest">Level</span>
                  <p className="rank-mono text-sm font-bold text-foreground">{r.level}</p>
                </div>

                {/* Requirement */}
                <div className="flex-1 min-w-0">
                  <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">To Achieve</p>
                  <p className="text-sm text-foreground">{r.req}</p>
                </div>

                {/* Perks */}
                <div className="flex-1 min-w-0">
                  <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Unlocks</p>
                  <p className="text-sm" style={{ color: r.highlight || r.isApex ? r.color : undefined }}>
                    {r.perks}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div
          ref={(el) => { refs.current[ranks.length + 3] = el; }}
          className="animate-on-scroll mt-8 text-center"
        >
          <p className="text-xs text-muted-foreground italic">
            ⚠️ Key Rule: Ranks cannot be purchased with money — they must be earned through verified task completion.
          </p>
        </div>
      </div>
    </section>
  );
}