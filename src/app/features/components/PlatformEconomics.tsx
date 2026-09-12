'use client';
import React, { useEffect, useRef } from 'react';

export default function PlatformEconomics() {
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
    <section className="py-16 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto">
        <div ref={(el) => { refs.current[0] = el; }} className="animate-on-scroll text-center mb-12">
          <h2 className="section-title text-foreground mb-4">Fair & Transparent Economics</h2>
          <p className="text-muted-foreground max-w-lg mx-auto">
            No hidden charges. Clear cuts so student squads keep the lion&apos;s share of their hard work.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          {[
            {
              label: 'Student Squad Payout',
              val: '85%',
              desc: 'Directly distributed to student team members according to each person\'s work contribution.',
              color: '#b81d42',
              icon: '🏆',
            },
            {
              label: 'Platform Fee',
              val: '15%',
              desc: 'Covers secure escrow infrastructure, platform security, and dispute resolution.',
              color: '#8b5cf6',
              icon: '⚙️',
            },
            {
              label: 'Senior Rank Perk',
              val: 'Fee Discounts',
              desc: 'Rank B and Rank A leads unlock discounted platform fees on high-value client projects.',
              color: '#a855f7',
              icon: '📈',
            },
          ].map((s, i) => (
            <div
              key={s.label}
              ref={(el) => { refs.current[i + 1] = el; }}
              className="animate-on-scroll glass-card rounded-2xl p-8 text-center glass-hover relative overflow-hidden group"
              style={{ transitionDelay: `${i * 100}ms` }}
            >
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity" style={{ background: `radial-gradient(circle at center, ${s.color}08 0%, transparent 60%)` }} />
              <div className="relative z-10">
                <div className="text-3xl mb-4">{s.icon}</div>
                <p className="rank-mono text-4xl font-bold mb-2" style={{ color: s.color }}>{s.val}</p>
                <p className="text-sm font-semibold text-foreground mb-2">{s.label}</p>
                <p className="text-xs text-muted-foreground leading-relaxed">{s.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}