'use client';
import React, { useEffect, useRef } from 'react';
import { Target, Compass, Sparkles } from 'lucide-react';

export default function MissionVision() {
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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Mission Card */}
          <div
            ref={(el) => { refs.current[0] = el; }}
            className="animate-on-scroll glass-card rounded-3xl p-8 sm:p-9 relative overflow-hidden group glass-hover border border-white/10 flex flex-col justify-between"
          >
            <div
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
              style={{ background: 'radial-gradient(circle at top left, rgba(184,29,66,0.15) 0%, transparent 60%)' }}
            />
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-6">
                <div className="w-12 h-12 rounded-2xl flex items-center justify-center text-primary" style={{ background: 'rgba(184,29,66,0.15)', border: '1px solid rgba(184,29,66,0.3)' }}>
                  <Target className="w-6 h-6 text-accent" />
                </div>
                <span className="text-[10px] font-mono text-accent uppercase tracking-widest font-bold px-3 py-1 rounded-full bg-accent/10 border border-accent/25">
                  The Mandate
                </span>
              </div>
              <h3 className="text-xl font-bold text-foreground mb-4">Our Mission</h3>
              <p className="text-muted-foreground text-sm sm:text-base leading-relaxed mb-6">
                To construct India&apos;s most resilient, fraud-proof student talent network — enabling students to validate technical competency via peer review, earn through escrow-backed bounties, and build verified proof-of-work identities employers trust.
              </p>
            </div>
            <div className="relative z-10 pt-4 border-t border-white/5 flex items-center gap-2 text-xs font-mono text-slate-300">
              <span className="w-2 h-2 rounded-full bg-accent" />
              <span>Peer-Reviewed Proof-of-Work Verification</span>
            </div>
          </div>

          {/* Vision Card */}
          <div
            ref={(el) => { refs.current[1] = el; }}
            className="animate-on-scroll glass-card rounded-3xl p-8 sm:p-9 relative overflow-hidden group glass-hover border border-white/10 flex flex-col justify-between"
            style={{ transitionDelay: '120ms' }}
          >
            <div
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
              style={{ background: 'radial-gradient(circle at top right, rgba(124,58,237,0.15) 0%, transparent 60%)' }}
            />
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-6">
                <div className="w-12 h-12 rounded-2xl flex items-center justify-center text-primary" style={{ background: 'rgba(124,58,237,0.15)', border: '1px solid rgba(124,58,237,0.3)' }}>
                  <Compass className="w-6 h-6 text-purple-400" />
                </div>
                <span className="text-[10px] font-mono text-purple-400 uppercase tracking-widest font-bold px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/25">
                  The Destination
                </span>
              </div>
              <h3 className="text-xl font-bold text-foreground mb-4">Our Vision</h3>
              <p className="text-muted-foreground text-sm sm:text-base leading-relaxed mb-6">
                Where your <strong className="text-foreground">Rank is your Resume</strong>, your <strong className="text-foreground">Guild is your Agency</strong>, and your code speaks louder than self-declared CV claims.
              </p>
            </div>
            <div className="relative z-10 pt-4 border-t border-white/5 flex items-center gap-2 text-xs font-mono text-slate-300">
              <span className="w-2 h-2 rounded-full bg-purple-400" />
              <span>Deterministic Meritocracy • Zero Self-Declared CV Fluff</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}