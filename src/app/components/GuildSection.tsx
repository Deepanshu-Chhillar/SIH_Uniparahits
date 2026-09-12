'use client';
import React, { useEffect, useRef } from 'react';

const GUILD_TIERS = [
  { ranks: 'RNK-A', label: 'Guild Masters', sub: 'Apex Tier — Project Leads', color: '#b81d42', width: '32%', members: '~100' },
  { ranks: 'RNK-B', label: 'Senior Leads', sub: 'Project Leads & Architects', color: '#a855f7', width: '50%', members: '~400' },
  { ranks: 'RNK-C', label: 'Senior Mentors', sub: 'Guild Builders & Evaluators', color: '#3b82f6', width: '68%', members: '~1,200' },
  { ranks: 'RNK-D', label: 'Active Contributors', sub: 'Devs, Designers, Writers, Editors', color: '#8b5cf6', width: '84%', members: '~2,500' },
  { ranks: 'RNK-E', label: 'Student Learners', sub: 'Learning Mode — Shadowing Teams', color: '#64748b', width: '100%', members: '~5,000+' },
];

const howItWorks = [
  { step: '01', title: 'Reach Rank C Mentor', desc: 'Complete 15+ tasks and maintain 4.2+ Trust Score to unlock Guild Creation privileges.', color: '#3b82f6' },
  { step: '02', title: 'Assemble Your Squad', desc: 'Team up with coders, UI/UX designers, video editors, and content writers from your college.', color: '#a855f7' },
  { step: '03', title: 'Accept Paid Projects', desc: 'A startup funds a 60,000 ZENI sprint (₹60,000 INR) in smart escrow. Your guild takes on the project as a cohesive team.', color: '#b81d42' },
  { step: '04', title: 'Automated Payout Split', desc: 'Smart contract distributes 85% project payment in 🪙 ZENI Credits and ⚡ MANA Credits automatically based on contribution weight.', color: '#b81d42' },
];

export default function GuildSection() {
  const refs = useRef<(HTMLDivElement | null)[]>([]);
  const tierRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add('is-visible')),
      { threshold: 0.08 }
    );
    refs.current.forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const pyramidObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            GUILD_TIERS.forEach((_, i) => {
              setTimeout(() => {
                const el = tierRefs.current[i];
                if (el) el.classList.add('lit');
              }, i * 200);
            });
          }
        });
      },
      { threshold: 0.3 }
    );
    const container = tierRefs.current[0]?.parentElement;
    if (container) pyramidObserver.observe(container);
    return () => pyramidObserver.disconnect();
  }, []);

  return (
    <section id="guilds" className="py-20 px-4 sm:px-6 relative">
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] opacity-5 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse, #a855f7 0%, transparent 70%)', filter: 'blur(100px)' }}
      />

      <div className="max-w-6xl mx-auto relative z-10">
        <div ref={(el) => { refs.current[0] = el; }} className="animate-on-scroll mb-4 text-center">
          <span className="inline-block px-4 py-1 rounded-full glass-card border border-border text-xs font-mono font-bold uppercase tracking-widest text-muted-foreground">
            06 / Student Guilds
          </span>
        </div>
        <div ref={(el) => { refs.current[1] = el; }} className="animate-on-scroll mb-4 text-center">
          <h2 className="section-title text-foreground mb-4">
            Multi-Skill{' '}
            <span className="text-primary">Student Teams</span>
          </h2>
        </div>
        <div ref={(el) => { refs.current[2] = el; }} className="animate-on-scroll mb-14 text-center">
          <p className="text-muted-foreground max-w-xl mx-auto">
            Businesses need complete deliverables, not isolated work. Student Guilds bring together developers, designers, video editors, and writers to deliver projects together.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center mb-16">
          {/* Pyramid */}
          <div
            ref={(el) => { refs.current[3] = el; }}
            className="animate-on-scroll flex flex-col items-center gap-2"
          >
            <p className="text-xs text-muted-foreground uppercase tracking-widest mb-4">Guild Hierarchy</p>
            {GUILD_TIERS.map((tier, i) => (
              <div
                key={tier.ranks}
                ref={(el) => { tierRefs.current[i] = el; }}
                className="pyramid-tier relative flex items-center justify-between px-5 py-3 rounded-xl cursor-default"
                style={{
                  width: tier.width,
                  background: `linear-gradient(90deg, rgba(255,255,255,0.03) 0%, ${tier.color}20 50%, rgba(255,255,255,0.03) 100%)`,
                  border: `1px solid ${tier.color}35`,
                  color: tier.color,
                  transition: 'filter 0.5s ease, box-shadow 0.5s ease, transform 0.5s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.boxShadow = `0 0 24px ${tier.color}50`;
                  e.currentTarget.style.filter = 'brightness(1.3)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.boxShadow = '';
                  e.currentTarget.style.filter = '';
                }}
              >
                <span className="rank-mono text-sm font-bold" style={{ color: tier.color }}>{tier.ranks}</span>
                <div className="text-center hidden sm:block">
                  <p className="text-xs font-semibold" style={{ color: tier.color }}>{tier.label}</p>
                  <p className="text-xs opacity-60" style={{ color: tier.color }}>{tier.sub}</p>
                </div>
                <span className="rank-mono text-xs opacity-60" style={{ color: tier.color }}>{tier.members}</span>
              </div>
            ))}
            <p className="text-xs text-muted-foreground mt-4 italic">Hover to illuminate each tier</p>
          </div>

          {/* How it works */}
          <div
            ref={(el) => { refs.current[4] = el; }}
            className="animate-on-scroll space-y-4"
            style={{ transitionDelay: '150ms' }}
          >
            {howItWorks.map((step, i) => (
              <div
                key={step.step}
                className="glass-card rounded-xl p-5 flex gap-4 items-start group glass-hover"
                style={{ transitionDelay: `${i * 80}ms` }}
              >
                <div
                  className="flex-shrink-0 w-10 h-10 rounded-lg flex items-center justify-center rank-mono text-sm font-bold"
                  style={{ background: `${step.color}18`, color: step.color, border: `1px solid ${step.color}35` }}
                >
                  {step.step}
                </div>
                <div>
                  <h4 className="text-sm font-bold text-foreground mb-1">{step.title}</h4>
                  <p className="text-xs text-muted-foreground leading-relaxed">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Key benefits */}
        <div
          ref={(el) => { refs.current[5] = el; }}
          className="animate-on-scroll grid grid-cols-1 sm:grid-cols-3 gap-5"
        >
          {[
            { icon: '🏢', title: 'Agency Model', desc: 'Introduces the agency model to the college ecosystem — full-stack project delivery.' },
            { icon: '🎓', title: 'Built-in Mentorship', desc: 'A/B-rank leads and C-rank builders mentor D/E-rank students. Organic knowledge transfer.' },
            { icon: '⚡', title: 'One-Click Hiring', desc: 'Companies hire an entire guild for complex projects — massive convenience.' },
          ].map((b) => (
            <div key={b.title} className="glass-card rounded-xl p-6 text-center group glass-hover">
              <div className="text-3xl mb-3">{b.icon}</div>
              <h4 className="text-sm font-bold text-foreground mb-2">{b.title}</h4>
              <p className="text-xs text-muted-foreground leading-relaxed">{b.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}