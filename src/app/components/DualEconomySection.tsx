'use client';
import React, { useEffect, useRef } from 'react';

export default function DualEconomySection() {
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
    <section id="economy" className="py-20 px-4 sm:px-6 relative">
      <div
        className="absolute inset-0 opacity-10 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at center, #8b5cf6 0%, transparent 70%)' }}
      />

      <div className="max-w-6xl mx-auto relative z-10">
        <div ref={(el) => { refs.current[0] = el; }} className="animate-on-scroll mb-4 text-center">
          <span className="inline-block px-4 py-1 rounded-full glass-card border border-border text-xs font-mono font-bold uppercase tracking-widest text-muted-foreground">
            04 / Dual-Currency Economic Engine
          </span>
        </div>
        <div ref={(el) => { refs.current[1] = el; }} className="animate-on-scroll mb-14 text-center">
          <h2 className="section-title text-foreground mb-4">
            ⚡ MANA Credits &{' '}
            <span className="text-accent">🪙 ZENI Bounties</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Two distinct currencies: Earn <strong className="text-foreground">⚡ MANA Credits</strong> through peer reviews & skill barter (non-purchasable with fiat); Earn <strong className="text-accent">🪙 ZENI Credits (1 ZENI = ₹1 INR)</strong> backed 1:1 by liquid INR in Smart Escrow.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* MANA Side */}
          <div
            ref={(el) => { refs.current[2] = el; }}
            className="animate-on-scroll glass-card rounded-3xl p-8 relative overflow-hidden group glass-hover border border-white/10"
          >
            <div
              className="absolute top-0 right-0 w-56 h-56 opacity-15 group-hover:opacity-25 transition-opacity"
              style={{ background: 'radial-gradient(circle, #8b5cf6 0%, transparent 70%)', filter: 'blur(50px)', transform: 'translate(30%, -30%)' }}
            />
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-2xl bg-primary/20 border border-primary/30 flex items-center justify-center text-xl">
                  <span className="rank-mono font-bold text-primary">⚡</span>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-foreground">⚡ MANA Credits (Skill Barter)</h3>
                  <p className="text-xs text-muted-foreground font-mono">Peer Help, Study Notes & Code Audits</p>
                </div>
              </div>

              <p className="text-sm text-muted-foreground leading-relaxed mb-6">
                Earned purely by helping classmates, sharing course notes, reviewing pull requests, and providing design critiques. MANA is strictly earned and non-purchasable with fiat currency — maintaining authentic academic meritocracy.
              </p>

              <div className="space-y-3">
                {[
                  'Verified Peer Skill Barter & Note Exchange',
                  'Required for C-Rank Consensus Gate elevation',
                  'Non-purchasable with real money (Zero Pay-to-Win)',
                  'Builds platform Trust Score & unlocks senior rank',
                ].map((item) => (
                  <div key={item} className="flex items-center gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" />
                    <span className="text-sm text-muted-foreground">{item}</span>
                  </div>
                ))}
              </div>

              {/* Mini bar chart */}
              <div className="mt-6 flex items-end gap-2 h-16">
                {[30, 50, 40, 70, 60, 90, 80].map((h, i) => (
                  <div
                    key={i}
                    className="flex-1 rounded-sm group-hover:brightness-125 transition-all duration-300"
                    style={{
                      height: `${h}%`,
                      background: `rgba(139, 92, 246, ${0.3 + i * 0.08})`,
                      transitionDelay: `${i * 50}ms`,
                    }}
                  />
                ))}
              </div>
              <p className="text-[11px] rank-mono text-muted-foreground mt-2 text-center">⚡ MANA Credits earned through verified academic peer sprints</p>
            </div>
          </div>

          {/* ZENI Side */}
          <div
            ref={(el) => { refs.current[3] = el; }}
            className="animate-on-scroll glass-card rounded-3xl p-8 relative overflow-hidden group glass-hover border border-white/10"
            style={{ transitionDelay: '120ms' }}
          >
            <div
              className="absolute top-0 right-0 w-56 h-56 opacity-10 group-hover:opacity-20 transition-opacity"
              style={{ background: 'radial-gradient(circle, #b81d42 0%, transparent 70%)', filter: 'blur(40px)', transform: 'translate(30%, -30%)' }}
            />
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-2xl bg-accent/20 border border-accent/30 flex items-center justify-center text-xl">
                  <span className="rank-mono font-bold text-accent">🪙</span>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-foreground">🪙 ZENI Credits (1 ZENI = ₹1 INR)</h3>
                  <p className="text-xs text-muted-foreground font-mono">Startup Gigs & Corporate Bounties</p>
                </div>
              </div>

              <p className="text-sm text-muted-foreground leading-relaxed mb-6">
                Corporate bounties funded directly in ZENI, backed 1:1 by liquid INR in Smart Escrow. Multi-skill student teams deliver full production sprints worth 25,000 to 1,00,000+ ZENI with 100% guaranteed on-time payouts.
              </p>

              <div className="space-y-3">
                {[
                  'Funded directly in ZENI (1 ZENI = ₹1 INR guaranteed)',
                  'Backed 1:1 by liquid INR locked in Smart Escrow upfront',
                  'Automated 85% guild payout split based on contribution',
                  'Apex Guild Masters earn direct startup hiring contracts',
                ].map((item) => (
                  <div key={item} className="flex items-center gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-accent flex-shrink-0" />
                    <span className="text-sm text-muted-foreground">{item}</span>
                  </div>
                ))}
              </div>

              {/* Earnings display */}
              <div className="mt-6 grid grid-cols-3 gap-3">
                {[
                  { label: 'Avg Bounty', val: '12K ZENI' },
                  { label: 'Team Project', val: '60K+ ZENI' },
                  { label: 'Escrow Backed', val: '1:1 INR' },
                ].map((s) => (
                  <div key={s.label} className="text-center p-3 rounded-2xl" style={{ background: 'rgba(184,29,66,0.08)', border: '1px solid rgba(184,29,66,0.25)' }}>
                    <p className="rank-mono text-base sm:text-lg font-bold text-accent">{s.val}</p>
                    <p className="text-[11px] text-muted-foreground mt-0.5">{s.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}