'use client';
import React, { useEffect, useRef } from 'react';
import { ShieldAlert, Lightbulb, Compass, Users } from 'lucide-react';

export default function OriginStory() {
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
    <section className="py-16 px-4 sm:px-6 relative">
      <div className="max-w-6xl mx-auto">
        <div
          ref={(el) => { refs.current[0] = el; }}
          className="animate-on-scroll glass-card rounded-3xl p-8 sm:p-12 border border-white/10 relative overflow-hidden bg-slate-950/60 backdrop-blur-2xl shadow-2xl"
        >
          {/* Cyber ambient glow */}
          <div
            className="absolute top-0 right-0 w-[500px] h-[500px] opacity-15 pointer-events-none rounded-full"
            style={{ background: 'radial-gradient(circle, #b81d42 0%, #8b5cf6 50%, transparent 70%)', filter: 'blur(90px)' }}
          />
          <div className="noise-overlay absolute inset-0 opacity-[0.02] pointer-events-none" />

          <div className="relative z-10 max-w-4xl">
            {/* Tag */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-primary/10 border border-primary/25 text-primary text-xs font-mono font-bold uppercase tracking-wider mb-6">
              <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
              03 // The Origin Story • September 2026
            </div>

            <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-6">
              Born from Late-Night Hostel Chats &{' '}
              <span className="text-accent glow-text-wine">Unpaid Gigs</span>
            </h2>

            <div className="space-y-6 text-sm sm:text-base text-muted-foreground leading-relaxed">
              <p>
                In 2026, across Indian college hostels, freelancing looked chaotic: assignments traded on unverified WhatsApp groups, freelance deals negotiated over informal DMs, and <strong className="text-slate-200">over 60% of student freelancers experiencing payment ghosting</strong> with zero legal recourse. Simultaneously, recruiters faced a hiring nightmare where <strong className="text-slate-200">73% of candidate resumes contained inflated, self-declared claims</strong> impossible to verify before technical interview rounds.
              </p>

              {/* Problem Stats Callout */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-6">
                <div className="p-4 rounded-2xl bg-red-500/10 border border-red-500/20 flex items-start gap-3">
                  <ShieldAlert className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-xs font-mono font-bold uppercase text-red-300">The Payment Crisis</p>
                    <p className="text-xs text-slate-300 mt-1">60%+ students get ghosted on informal chat gigs after delivering production-ready code or UI designs.</p>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-start gap-3">
                  <Compass className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-xs font-mono font-bold uppercase text-amber-300">The Credential Crisis</p>
                    <p className="text-xs text-slate-300 mt-1">73% of campus resumes lack auditable code or verified client sign-offs, creating extreme employer skepticism.</p>
                  </div>
                </div>
              </div>

              {/* The Core Insight */}
              <div className="p-5 sm:p-6 rounded-2xl bg-white/[0.03] border border-accent/30 relative">
                <div className="flex items-center gap-2 mb-2 text-accent text-xs font-mono font-bold uppercase">
                  <Lightbulb className="w-4 h-4" />
                  The Core Architectural Insight
                </div>
                <blockquote className="text-foreground text-sm sm:text-base font-medium italic border-l-2 border-accent pl-4">
                  &ldquo;Campus freelancing needed what competitive gaming already perfected — a meritocratic rank gate and automated escrow vaults.&rdquo;
                </blockquote>
              </div>

              {/* The Name Philosophy */}
              <div className="pt-4 border-t border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <h4 className="text-xs font-mono uppercase tracking-widest text-slate-400 font-bold mb-1">
                    The Name Philosophy
                  </h4>
                  <p className="text-xs sm:text-sm text-muted-foreground">
                    <strong className="text-accent font-semibold">Uni</strong> (University ground zero & academic roots) + <strong className="text-primary font-semibold">Parahits</strong> (Collaborative elite task force serving peers through verified skill delivery).
                  </p>
                </div>
                <span className="px-3 py-1 rounded-lg bg-white/5 border border-white/10 text-[11px] font-mono text-slate-300 flex-shrink-0">
                  DSEU Dwarka Node
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
