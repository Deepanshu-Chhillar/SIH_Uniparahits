'use client';
import React, { useEffect, useRef } from 'react';

const markets = [
  {
    label: 'GLOBAL DEMAND',
    full: 'Freelance & Digital Gig Economy',
    value: '$455B',
    desc: 'Worldwide business budget moving towards agile student freelancers and creative project teams.',
    size: 100,
    color: '#8b5cf6',
  },
  {
    label: 'STUDENT TALENT',
    full: 'College Students Pan-India',
    value: '40M+ Students',
    desc: 'Talented students across technical, creative, and commerce streams eager to build portfolios and earn.',
    size: 75,
    color: '#a855f7',
  },
  {
    label: 'DELHI/NCR CLUSTER',
    full: 'Genesis Campus Network',
    value: '120+ Colleges',
    desc: 'Active launch network integrating DSEU, DTU, NSUT, DU, IPU, and IIT-Delhi into local project opportunities.',
    size: 45,
    color: '#b81d42',
  },
];

export default function MarketSizeSection() {
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
    <section id="market" className="py-20 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto">
        <div ref={(el) => { refs.current[0] = el; }} className="animate-on-scroll mb-4 text-center">
          <span className="inline-block px-4 py-1 rounded-full glass-card border border-border text-xs font-mono font-bold uppercase tracking-widest text-muted-foreground">
            03 / The Opportunity
          </span>
        </div>
        <div ref={(el) => { refs.current[1] = el; }} className="animate-on-scroll mb-14 text-center">
          <h2 className="section-title text-foreground mb-4">
            Empowering India&apos;s{' '}<span className="text-primary">College Talent</span>
          </h2>
          <p className="text-muted-foreground max-w-lg mx-auto">
            Connecting passionate college students with startups and businesses seeking quality work.
          </p>
        </div>

        <div className="flex flex-col gap-6">
          {markets.map((m, i) => (
            <div
              key={m.label}
              ref={(el) => { refs.current[i + 2] = el; }}
              className="animate-on-scroll glass-card rounded-2xl p-6 sm:p-8 relative overflow-hidden group glass-hover"
              style={{ transitionDelay: `${i * 120}ms` }}
            >
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity"
                style={{ background: `linear-gradient(90deg, ${m.color}10 0%, transparent 60%)` }}
              />
              <div className="relative z-10 flex flex-col sm:flex-row sm:items-center gap-6">
                <div className="flex-shrink-0">
                  <span
                    className="rank-mono text-xs font-bold px-3 py-1 rounded-full"
                    style={{ background: `${m.color}20`, color: m.color, border: `1px solid ${m.color}40` }}
                  >
                    {m.label}
                  </span>
                </div>
                <div className="flex-1">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-3">
                    <div>
                      <p className="text-xs text-muted-foreground uppercase tracking-wider mb-0.5">{m.full}</p>
                      <p className="text-sm text-muted-foreground">{m.desc}</p>
                    </div>
                    <span
                      className="rank-mono text-2xl sm:text-3xl font-bold flex-shrink-0"
                      style={{ color: m.color }}
                    >
                      {m.value}
                    </span>
                  </div>
                  {/* Bar */}
                  <div className="h-2 w-full rounded-full bg-white/5 overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-1000"
                      style={{ width: `${m.size}%`, background: `linear-gradient(90deg, ${m.color}80, ${m.color})` }}
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}