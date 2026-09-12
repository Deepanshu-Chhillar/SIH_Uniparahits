'use client';
import React, { useEffect, useRef } from 'react';

const pillars = [
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
      </svg>
    ),
    title: 'Rank E to Rank A Growth',
    desc: 'Students start at Rank E in learning mode. Complete tasks and get evaluated by a C-Rank senior mentor to unlock paid gigs.',
    color: '#b81d42',
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <path d="M12 6v6l4 2" />
      </svg>
    ),
    title: '⚡ MANA & 🪙 ZENI Dual Economy',
    desc: 'Earn ⚡ MANA Credits for peer help, notes & code reviews (non-purchasable). Earn 🪙 ZENI Credits (1 ZENI = ₹1 INR) for verified client deliverables backed by Smart Escrow.',
    color: '#8b5cf6',
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
    title: 'Multi-Skill Student Guilds',
    desc: 'Developers, designers, video editors, and content writers team up into student guilds to deliver complete client projects together.',
    color: '#a855f7',
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
        <path d="M7 11V7a5 5 0 0 1 10 0v4" />
      </svg>
    ),
    title: 'Smart Escrow Protection',
    desc: 'Clients deposit funds upfront into secure escrow. Automatic 85% guild payout upon delivery approval — zero payment ghosting.',
    color: '#3b82f6',
  },
];

export default function SolutionSection() {
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
    <section id="solution" className="py-20 px-4 sm:px-6 relative">
      {/* Background accent */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] opacity-15 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse, #8b5cf6 0%, transparent 70%)', filter: 'blur(90px)' }}
      />

      <div className="max-w-6xl mx-auto relative z-10">
        <div ref={(el) => { refs.current[0] = el; }} className="animate-on-scroll mb-4 text-center">
          <span className="inline-block px-4 py-1 rounded-full glass-card border border-border text-xs font-mono font-bold uppercase tracking-widest text-muted-foreground">
            02 / How It Works
          </span>
        </div>

        <div ref={(el) => { refs.current[1] = el; }} className="animate-on-scroll mb-14 text-center">
          <h2 className="section-title text-foreground mb-4">
            Learn First. Work Together.{' '}
            <span className="text-accent">Earn Fairly.</span>
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto text-base leading-relaxed">
            UniParahits combines practical skill learning, peer mentoring, and real paid freelance projects into one transparent student network.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {pillars.map((p, i) => (
            <div
              key={p.title}
              ref={(el) => { refs.current[i + 2] = el; }}
              className="animate-on-scroll glass-card glass-hover rounded-2xl p-6 relative overflow-hidden group"
              style={{ transitionDelay: `${i * 100}ms` }}
            >
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{ background: `radial-gradient(circle at 50% 0%, ${p.color}15 0%, transparent 60%)` }}
              />
              <div
                className="w-11 h-11 rounded-xl flex items-center justify-center mb-5 relative z-10"
                style={{ background: `${p.color}18`, color: p.color, border: `1px solid ${p.color}35` }}
              >
                {p.icon}
              </div>
              <h3 className="text-base font-bold text-foreground mb-2 relative z-10">{p.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed relative z-10">{p.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}