'use client';
import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import AppLogo from '@/components/ui/AppLogo';
import { useOperatorRole, OperatorRole, OPERATOR_PROFILES } from '@/context/RoleContext';
import { Terminal, Shield, ChevronDown, Check, UserCircle } from 'lucide-react';

const navLinks = [
  { label: 'Home', href: '/' },
  { label: 'Features', href: '/features' },
  { label: 'About Us', href: '/about' },
  { label: 'Command Lobby', href: '/dashboard' },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [roleDropdownOpen, setRoleDropdownOpen] = useState(false);
  const { role, profile, setRole } = useOperatorRole();
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setRoleDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    if (menuOpen) {
      const close = () => setMenuOpen(false);
      window.addEventListener('scroll', close, { once: true });
      return () => window.removeEventListener('scroll', close);
    }
  }, [menuOpen]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? 'glass-nav py-3' : 'py-5 bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <AppLogo size={32} />
          <div className="flex flex-col">
            <span className="font-bold text-lg tracking-tight text-foreground group-hover:text-accent transition-colors flex items-center gap-1.5">
              UniParahits
              <span className="text-[9px] rank-mono px-1.5 py-0.5 rounded bg-primary/20 text-primary border border-primary/30 uppercase">
                Student Network
              </span>
            </span>
          </div>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-7">
          {navLinks?.map((link) => {
            const isLobby = link?.href === '/dashboard';
            return (
              <Link
                key={link?.href}
                href={link?.href}
                className={`relative text-xs font-semibold uppercase tracking-wider transition-colors group py-1 flex items-center gap-1.5 ${
                  isLobby
                    ? 'text-accent font-bold hover:text-accent-foreground hover:bg-accent/10 px-2 py-0.5 rounded-lg border border-accent/30'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                {isLobby && <span className="w-1.5 h-1.5 rounded-full bg-accent animate-ping" />}
                <span>{link?.label}</span>
                {isLobby && (
                  <span className="text-[9px] rank-mono px-1 py-0.2 rounded bg-accent/20 text-accent border border-accent/30">
                    DEMO
                  </span>
                )}
                {!isLobby && (
                  <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-primary group-hover:w-full transition-all duration-300" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Right Section: Simulation HUD & Join Button */}
        <div className="hidden md:flex items-center gap-3">
          
          {/* Active Operator Simulation HUD */}
          <div className="relative flex items-center" ref={dropdownRef}>
            {/* Clickable pill linking directly to /dashboard */}
            <Link
              href="/dashboard"
              className="flex items-center gap-2 pl-3 pr-2 py-1.5 rounded-l-full glass-card border border-r-0 border-white/10 hover:border-accent/50 hover:bg-accent/10 transition-all text-xs group"
              style={{ boxShadow: `0 0 14px ${profile.glow}` }}
              title="Click to Open Command Lobby (/dashboard)"
            >
              <span className="relative flex h-2 w-2">
                <span
                  className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75"
                  style={{ background: profile.color }}
                />
                <span
                  className="relative inline-flex rounded-full h-2 w-2"
                  style={{ background: profile.color }}
                />
              </span>

              <span className="rank-mono font-bold text-[10px]" style={{ color: profile.color }}>
                {profile.rankId}
              </span>

              <span className="text-slate-300 text-[11px] font-medium hidden lg:inline max-w-[100px] truncate group-hover:text-white">
                {profile.callsign}
              </span>

              <span className="text-[8px] font-mono px-1 py-0.5 rounded bg-white/10 text-muted-foreground group-hover:text-accent border border-white/10">
                LOBBY ↗
              </span>
            </Link>

            {/* Role dropdown trigger */}
            <button
              type="button"
              onClick={() => setRoleDropdownOpen(!roleDropdownOpen)}
              className="px-2 py-1.5 rounded-r-full glass-card border border-white/10 hover:border-primary/40 text-muted-foreground hover:text-white transition-all text-xs border-l border-l-white/10"
              title="Switch Operator Role"
              aria-label="Switch Role"
            >
              <ChevronDown className="w-3 h-3" />
            </button>

            {/* Role Switch Dropdown */}
            {roleDropdownOpen && (
              <div className="absolute right-0 top-full mt-2 w-64 rounded-2xl glass-card border border-white/15 bg-slate-950/95 shadow-2xl p-2 z-50 backdrop-blur-2xl">
                <div className="px-3 py-2 border-b border-white/10">
                  <p className="text-[10px] rank-mono text-muted-foreground uppercase tracking-wider flex items-center gap-1">
                    <Shield className="w-3 h-3 text-primary" />
                    Student Role Simulator
                  </p>
                  <p className="text-[11px] text-slate-300 mt-0.5 leading-snug">
                    Switch between Student Learner, Senior Mentor, or Guest.
                  </p>
                </div>

                <div className="py-1 space-y-1">
                  {(Object.keys(OPERATOR_PROFILES) as OperatorRole[]).map((rKey) => {
                    const p = OPERATOR_PROFILES[rKey];
                    const isSelected = role === rKey;
                    return (
                      <button
                        key={rKey}
                        type="button"
                        onClick={() => {
                          setRole(rKey);
                          setRoleDropdownOpen(false);
                        }}
                        className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-left transition-all ${
                          isSelected ? 'bg-white/10 border border-white/15 shadow-sm' : 'hover:bg-white/5'
                        }`}
                      >
                        <div className="flex items-center gap-2.5">
                          <span
                            className="rank-mono text-xs font-bold px-1.5 py-0.5 rounded border"
                            style={{
                              color: p.color,
                              borderColor: `${p.color}40`,
                              background: `${p.color}15`,
                            }}
                          >
                            {p.rankId}
                          </span>
                          <div>
                            <p className="text-xs font-semibold text-foreground">{p.callsign}</p>
                            <p className="text-[10px] text-muted-foreground">{p.rankLabel}</p>
                          </div>
                        </div>
                        {isSelected && <Check className="w-3.5 h-3.5 text-primary flex-shrink-0" />}
                      </button>
                    );
                  })}
                </div>

                {/* Direct link into Command Lobby inside Dropdown */}
                <div className="pt-2 mt-1 border-t border-white/10">
                  <Link
                    href="/dashboard"
                    onClick={() => setRoleDropdownOpen(false)}
                    className="w-full py-2 px-3 rounded-xl bg-accent/20 hover:bg-accent/30 border border-accent/40 text-accent text-xs font-mono font-bold flex items-center justify-center gap-1.5 transition-all"
                  >
                    <span>⚡ Enter Tactical Lobby</span>
                    <Terminal className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            )}
          </div>

          {/* Access CTA */}
          <Link
            href="/auth"
            className="shimmer-btn text-white text-xs font-bold px-4 py-2 rounded-full flex items-center gap-1.5 shadow-md hover:scale-105 transition-all"
            style={{ boxShadow: '0 0 20px rgba(124,58,237,0.3)' }}
          >
            <span>Get Started</span>
          </Link>
        </div>

        {/* Mobile Hamburger */}
        <button
          className="md:hidden flex flex-col gap-1.5 p-2"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <span className={`block w-6 h-0.5 bg-foreground transition-transform duration-300 ${menuOpen ? 'rotate-45 translate-y-2' : ''}`} />
          <span className={`block w-6 h-0.5 bg-foreground transition-opacity duration-300 ${menuOpen ? 'opacity-0' : ''}`} />
          <span className={`block w-6 h-0.5 bg-foreground transition-transform duration-300 ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden glass-nav border-t border-border mt-1 p-5 space-y-4">
          <nav className="flex flex-col gap-3">
            {navLinks?.map((link) => (
              <Link
                key={link?.href}
                href={link?.href}
                onClick={() => setMenuOpen(false)}
                className="text-sm font-semibold uppercase tracking-wider text-muted-foreground hover:text-foreground transition-colors py-1.5"
              >
                {link?.label}
              </Link>
            ))}
          </nav>

          {/* Mobile Role Switcher */}
          <div className="p-3 rounded-xl bg-white/5 border border-white/10">
            <p className="text-[10px] rank-mono text-muted-foreground uppercase mb-2">
              Active Role: <span style={{ color: profile.color }}>{profile.rankId} ({profile.callsign})</span>
            </p>
            <div className="grid grid-cols-3 gap-1.5">
              {(Object.keys(OPERATOR_PROFILES) as OperatorRole[]).map((rKey) => (
                <button
                  key={rKey}
                  type="button"
                  onClick={() => setRole(rKey)}
                  className={`px-2 py-1.5 rounded-lg text-[10px] font-mono text-center border transition-all ${
                    role === rKey
                      ? 'bg-primary/20 border-primary text-white font-bold'
                      : 'bg-white/5 border-white/10 text-muted-foreground'
                  }`}
                >
                  {OPERATOR_PROFILES[rKey].rankId}
                </button>
              ))}
            </div>
          </div>

          <Link
            href="/dashboard"
            onClick={() => setMenuOpen(false)}
            className="w-full py-2.5 px-4 rounded-xl border border-accent/50 bg-accent/20 text-foreground font-mono text-xs font-bold text-center flex items-center justify-center gap-2"
          >
            <span className="w-2 h-2 rounded-full bg-accent animate-ping" />
            <Terminal className="w-4 h-4 text-accent" />
            <span>⚡ Launch Command Center (Demo)</span>
          </Link>

          <Link
            href="/auth"
            onClick={() => setMenuOpen(false)}
            className="w-full shimmer-btn text-white text-xs font-bold py-2.5 rounded-xl text-center flex items-center justify-center gap-2"
          >
            <span>Get Started / Sign In</span>
          </Link>
        </div>
      )}
    </header>
  );
}