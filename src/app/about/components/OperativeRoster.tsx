'use client';
import React, { useEffect, useRef } from 'react';
import { Terminal, Shield, Code, Cpu, Sparkles, Database, Layers, CheckCircle2 } from 'lucide-react';

const OPERATIVES = [
  {
    callsign: 'OP-01 // ARCHITECT',
    role: 'Team Lead & Systems Architect',
    name: 'Squad Lead',
    desc: 'Orchestrated the high-level system architecture, SIH-26 pitch strategy, and mathematical E-to-A consensus progression logic.',
    deliverables: ['Product Vision & SIH Strategy', 'E-to-A Rank Consensus Logic', 'Platform Tokenomics & Game Theory'],
    color: '#b81d42',
    icon: Terminal,
    node: 'Core Strategy',
  },
  {
    callsign: 'OP-02 // PROTOCOL',
    role: 'Full-Stack & Escrow Engineer',
    name: 'Akshit Bhatt',
    desc: 'Architected automated smart escrow contract structures, backend REST microservices, and hybrid Next.js / Spring Boot pipelines.',
    deliverables: ['Smart Escrow Vault Pipelines', 'Next.js 15 & Spring Boot APIs', 'Dual-Currency Settlement Logic'],
    color: '#8b5cf6',
    icon: Code,
    node: 'Protocol Engine',
  },
  {
    callsign: 'OP-03 // HUD-DEV',
    role: 'Frontend & HUD Designer',
    name: 'HUD Engineer',
    desc: 'Built the high-performance tactical command center and real-time interactive user telemetry with React 19 and Tailwind CSS.',
    deliverables: ['Tactical Command Center HUD', 'React 19 & Tailwind System', 'Real-time WebSocket Activity Feed'],
    color: '#3b82f6',
    icon: Cpu,
    node: 'Command UI',
  },
  {
    callsign: 'OP-04 // SECURITY',
    role: 'Security & Anti-Cheat Specialist',
    name: 'Security Lead',
    desc: 'Engineered dynamic Trust Score algorithms, anti-collusion peer review audits, and automated Court Martial penalty enforcement.',
    deliverables: ['Dynamic Trust Score Algorithms', 'Anti-Collusion Verification Gates', 'Court Martial & Demotion Engine'],
    color: '#ef4444',
    icon: Shield,
    node: 'Integrity Defense',
  },
  {
    callsign: 'OP-05 // UX-LEAD',
    role: 'UI/UX & Design Systems Lead',
    name: 'Design Systems Lead',
    desc: 'Directed comprehensive user research, inclusive student accessibility workflows, and streamlined 1st-year admission slip onboarding.',
    deliverables: ['Student-Centric Design System', '1st-Year Instant Verification Flow', 'Mobile-Responsive UX Ergonomics'],
    color: '#ec4899',
    icon: Layers,
    node: 'Human Experience',
  },
  {
    callsign: 'OP-06 // DATA-QA',
    role: 'Database & QA Architect',
    name: 'Data Architect',
    desc: 'Structured high-throughput PostgreSQL relational schemas, student identity verification logic, and automated continuous delivery testing.',
    deliverables: ['Relational PostgreSQL Schemas', 'ID & Document Parsing Logic', 'Automated SLA & Stress Testing'],
    color: '#10b981',
    icon: Database,
    node: 'Data Vault',
  },
];

export default function OperativeRoster() {
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
    <section className="py-20 px-4 sm:px-6 relative">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div ref={(el) => { refs.current[0] = el; }} className="animate-on-scroll text-center mb-14">
          <span className="inline-block px-4 py-1 rounded-full glass-card border border-border text-xs font-mono font-bold uppercase tracking-widest text-muted-foreground mb-4">
            04 // Core Operatives
          </span>
          <h2 className="section-title text-foreground mb-4">
            The 6-Member{' '}
            <span className="text-accent glow-text-wine">Engineering Squad</span>
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto text-sm sm:text-base leading-relaxed">
            Architected by an integrated engineering squadron from DSEU Dwarka Campus for Smart India Hackathon 2026 (SIH-26 Genesis Node).
          </p>
        </div>

        {/* 6-Card Roster Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {OPERATIVES.map((op, i) => {
            const Icon = op.icon;
            return (
              <div
                key={op.callsign}
                ref={(el) => { refs.current[i + 1] = el; }}
                className="animate-on-scroll glass-card rounded-3xl p-6 relative overflow-hidden group glass-hover border border-white/10 flex flex-col justify-between"
                style={{ transitionDelay: `${i * 90}ms` }}
              >
                {/* Radial Hover Glow */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{ background: `radial-gradient(circle at top right, ${op.color}15 0%, transparent 65%)` }}
                />

                <div className="relative z-10 space-y-4">
                  {/* Top Bar: Callsign & Node Pill */}
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono font-bold uppercase tracking-widest px-2.5 py-1 rounded-lg bg-white/5 border border-white/10 text-slate-300">
                      {op.callsign}
                    </span>
                    <span
                      className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded-full border"
                      style={{ color: op.color, borderColor: `${op.color}40`, background: `${op.color}15` }}
                    >
                      {op.node}
                    </span>
                  </div>

                  {/* Icon & Role Title */}
                  <div className="flex items-start gap-3.5 pt-1">
                    <div
                      className="w-11 h-11 rounded-2xl flex items-center justify-center flex-shrink-0"
                      style={{ background: `${op.color}15`, border: `1px solid ${op.color}35`, color: op.color }}
                    >
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-foreground leading-snug">{op.role}</h3>
                      <p className="text-xs font-mono font-semibold mt-0.5" style={{ color: op.color }}>{op.name}</p>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    {op.desc}
                  </p>

                  {/* Deliverables Checklist */}
                  <div className="pt-3 border-t border-white/5 space-y-1.5 text-[11px] font-mono">
                    <p className="text-[10px] uppercase tracking-wider text-slate-400 font-bold">Key Architectural Scope:</p>
                    {op.deliverables.map((d) => (
                      <div key={d} className="flex items-center gap-2 text-slate-300">
                        <CheckCircle2 className="w-3 h-3 flex-shrink-0" style={{ color: op.color }} />
                        <span className="truncate">{d}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Footer Tag */}
                <div className="relative z-10 pt-4 mt-4 border-t border-white/5 flex items-center justify-between text-[10px] font-mono text-muted-foreground">
                  <span>DSEU Dwarka Campus</span>
                  <span className="text-emerald-400 font-bold">ACTIVE NODE</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
