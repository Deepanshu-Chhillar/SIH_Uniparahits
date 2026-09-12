'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useOperatorRole, OperatorRole } from '@/context/RoleContext';
import AppLogo from '@/components/ui/AppLogo';
import { 
  ShieldCheck, 
  Cpu, 
  Sparkles, 
  ArrowRight, 
  Lock, 
  Mail, 
  User, 
  Building2, 
  CheckCircle2, 
  AlertCircle,
  FileText,
  Eye,
  EyeOff,
  HelpCircle,
  ChevronRight,
  GraduationCap
} from 'lucide-react';

const VALID_CAMPUS_PATTERNS = ['.edu', '.ac.in', 'dseu.ac.in', 'dtu.ac.in', 'nsut.ac.in', 'iitd.ac.in', 'iiitd.ac.in'];

const DEMO_LOG_EVENTS = [
  '[NEW_MEMBER] Aryan (1st Year, DSEU) verified via Admission Fee Receipt.',
  '[BOUNTY_POSTED] Startup "FinFlow" posted ₹25,000 UI/UX & Content Project.',
  '[ESCROW_LOCKED] ₹25,000 safely held in Escrow Vault.',
  '[TEAM_FORMED] "CodeCraft Guild" assembled: 2 Devs, 1 Designer, 1 Content Writer.',
  '[XP_REWARD] Sneha earned 150 XP for reviewing junior student design draft.',
  '[PLATFORM] 4,800+ active students across Delhi/NCR colleges.',
  '[COURT_MARTIAL] Zero tolerance: 1 account banned for plagiarized submission.',
];

const COLLEGES = [
  'DSEU Dwarka Campus (Delhi Skill & Entrepreneurship University)',
  'Delhi Technological University (DTU)',
  'Netaji Subhas University of Technology (NSUT)',
  'Indraprastha Institute of Information Technology (IIIT Delhi)',
  'Indian Institute of Technology Delhi (IIT Delhi)',
  'Guru Gobind Singh Indraprastha University (GGSIPU)',
  'Delhi University (DU - Hansraj, Hindu, SRCC, etc.)',
  'Jamia Millia Islamia (JMI)',
  'Other College / University',
];

const VERIFICATION_DOC_TYPES = [
  { id: 'fee_receipt', label: 'College Fee Receipt (Best for 1st Year)', tip: 'Recommended if your college has not issued your physical ID card yet.' },
  { id: 'admission_slip', label: 'Admission Slip / Allotment Letter', tip: 'Valid for new 1st year students in their first 5–8 months.' },
  { id: 'id_card', label: 'College Student ID Card', tip: 'Front photo of your official college student identity card.' },
  { id: 'portal_screenshot', label: 'College ERP / Student Portal Screenshot', tip: 'Shows your student name, roll number, and enrolled branch.' },
  { id: 'senior_referral', label: 'Peer Referral by C-Rank Senior', tip: 'Get verified by a verified 2nd/3rd year student from your college.' },
];

const SPECIALIZATIONS = [
  { id: 'dev', label: 'Web & App Dev', icon: '💻' },
  { id: 'design', label: 'UI/UX & Graphics', icon: '🎨' },
  { id: 'content', label: 'Content & Writing', icon: '✍️' },
  { id: 'video', label: 'Video & Animation', icon: '🎬' },
  { id: 'marketing', label: 'Marketing & SEO', icon: '📈' },
  { id: 'data', label: 'Data & AI Tools', icon: '📊' },
  { id: 'events', label: 'Events & Operations', icon: '👥' },
  { id: 'hardware', label: 'IoT & Hardware', icon: '🛠️' },
  { id: 'other', label: 'Other Skill...', icon: '✨' },
];

const BUDGET_TIERS = [
  '₹10,000 – ₹30,000 (Small Sprint / Fast Gig)',
  '₹30,000 – ₹80,000 (Full Student Team Project)',
  '₹80,000+ (Custom Enterprise Sprint)',
];

export default function AuthPage() {
  const router = useRouter();
  const { setRole } = useOperatorRole();
  const [authMode, setAuthMode] = useState<'signin' | 'signup'>('signup');
  const [accountType, setAccountType] = useState<'student' | 'client'>('student');

  // Form State
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Student details
  const [fullName, setFullName] = useState('');
  const [studentId, setStudentId] = useState('');
  const [selectedCollege, setSelectedCollege] = useState(COLLEGES[0]);
  const [customCollege, setCustomCollege] = useState('');
  const [specialization, setSpecialization] = useState(SPECIALIZATIONS[0].id);
  const [customSkill, setCustomSkill] = useState('');
  const [hasCollegeEmail, setHasCollegeEmail] = useState(false);
  const [docType, setDocType] = useState(VERIFICATION_DOC_TYPES[0].id);
  const [docReference, setDocReference] = useState('');

  // Client details
  const [companyName, setCompanyName] = useState('');
  const [budgetTier, setBudgetTier] = useState(BUDGET_TIERS[0]);

  // UI state
  const [logs, setLogs] = useState<string[]>(DEMO_LOG_EVENTS.slice(0, 4));
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Check if email has valid campus domain
  const isCampusEmail = VALID_CAMPUS_PATTERNS.some((pattern) =>
    email.toLowerCase().includes(pattern)
  );

  // Auto detect campus email
  useEffect(() => {
    if (isCampusEmail) {
      setHasCollegeEmail(true);
    }
  }, [isCampusEmail]);

  // Simulated live log terminal feed
  useEffect(() => {
    const interval = setInterval(() => {
      setLogs((prev) => {
        const nextIndex = Math.floor(Math.random() * DEMO_LOG_EVENTS.length);
        const newLog = `[${new Date().toLocaleTimeString()}] ${DEMO_LOG_EVENTS[nextIndex]}`;
        return [...prev.slice(-4), newLog];
      });
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    // Password match check on signup
    if (authMode === 'signup') {
      if (password !== confirmPassword) {
        setErrorMessage('Passwords do not match. Please re-enter.');
        return;
      }
      if (password.length < 6) {
        setErrorMessage('Password must be at least 6 characters long.');
        return;
      }
      if (accountType === 'student' && selectedCollege === 'Other College / University' && !customCollege.trim()) {
        setErrorMessage('Please enter your college / university name in the input box.');
        return;
      }
      if (accountType === 'student' && specialization === 'other' && !customSkill.trim()) {
        setErrorMessage('Please specify your custom skill in the input box.');
        return;
      }
    }

    setIsSubmitting(true);
    setStatusMessage('Verifying credentials and setting up your workspace...');

    setTimeout(() => {
      setIsSubmitting(false);
      if (accountType === 'student') {
        setRole('cadet_e');
      } else {
        setRole('evaluator_c');
      }
      setStatusMessage('Account verified! Setting up your interactive workspace tour...');
      setTimeout(() => {
        router.push('/dashboard?tour=true');
      }, 800);
    }, 1100);
  };

  const handleQuickDemo = (roleChoice: OperatorRole) => {
    setRole(roleChoice);
    if (roleChoice === 'cadet_e') {
      setEmail('aryan.student@dseu.ac.in');
      setAccountType('student');
      setFullName('Aryan Sharma (1st Year)');
      setStudentId('DSEU/2026/CS-104');
      setSpecialization('dev');
      setPassword('demo1234');
      setConfirmPassword('demo1234');
      setHasCollegeEmail(true);
    } else if (roleChoice === 'evaluator_c') {
      setEmail('vance.mentor@gmail.com');
      setAccountType('student');
      setFullName('Vance (3rd Year Lead)');
      setStudentId('DTU-2024-IT-58');
      setSpecialization('design');
      setPassword('demo1234');
      setConfirmPassword('demo1234');
      setHasCollegeEmail(false);
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col relative overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div
          className="absolute top-1/4 left-1/3 w-[600px] h-[600px] rounded-full opacity-15"
          style={{ background: 'radial-gradient(circle, #7c3aed 0%, transparent 70%)', filter: 'blur(90px)' }}
        />
        <div
          className="absolute bottom-10 right-10 w-[450px] h-[450px] rounded-full opacity-10"
          style={{ background: 'radial-gradient(circle, #b81d42 0%, transparent 70%)', filter: 'blur(80px)' }}
        />
      </div>

      {/* Top Bar */}
      <header className="relative z-20 px-6 py-4 border-b border-border/40 backdrop-blur-md flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group">
          <AppLogo size={30} />
          <span className="font-bold text-lg tracking-tight text-foreground group-hover:text-accent transition-colors">
            UniParahits
          </span>
          <span className="text-[10px] rank-mono px-2 py-0.5 rounded bg-primary/20 text-primary border border-primary/40 ml-2">
            Campus Network
          </span>
        </Link>

        <div className="flex items-center gap-4 text-xs text-muted-foreground">
          <span className="hidden sm:inline-flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            <span className="text-emerald-400 font-medium">Network Active</span>
          </span>
          <Link
            href="/"
            className="glass-card px-4 py-1.5 rounded-full border border-border text-foreground hover:border-primary/50 transition-colors"
          >
            ← Back to Home
          </Link>
        </div>
      </header>

      {/* Main Split Grid */}
      <main className="relative z-10 flex-1 flex items-center justify-center p-4 sm:p-6 lg:p-10">
        <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-12 glass-card rounded-3xl border border-white/10 overflow-hidden shadow-2xl backdrop-blur-2xl">
          
          {/* Left Column: Visual Showcase & Real-world Help */}
          <div className="lg:col-span-5 p-7 sm:p-9 bg-gradient-to-b from-primary/10 via-background/80 to-background/95 border-b lg:border-b-0 lg:border-r border-white/10 flex flex-col justify-between relative overflow-hidden">
            <div className="relative z-10">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/20 border border-primary/40 text-secondary-foreground text-xs font-mono mb-5">
                <GraduationCap className="w-3.5 h-3.5 text-primary" />
                STUDENT FREELANCING & SKILL NETWORK
              </div>

              <h2 className="text-2xl sm:text-3xl font-extrabold text-foreground tracking-tight leading-tight mb-3">
                Learn Skills.{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-purple-300 to-accent">
                  Work in Teams.
                </span><br />
                Earn Real Money.
              </h2>

              <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed mb-6">
                Whether you write code, design graphics, edit videos, or write content — UniParahits lets you collaborate in student guilds and take on real paid projects from startups with 100% smart escrow payment protection.
              </p>

              {/* Student Friendly Features */}
              <div className="space-y-3.5 mb-6">
                <div className="flex items-start gap-3">
                  <div className="w-7 h-7 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center flex-shrink-0 text-emerald-400">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-foreground">No College Email? No Problem!</h4>
                    <p className="text-[11px] text-muted-foreground">Use your regular Gmail + verify via College Fee Receipt, Admission Slip, or Student Portal.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-7 h-7 rounded-lg bg-primary/10 border border-primary/30 flex items-center justify-center flex-shrink-0 text-primary">
                    <GraduationCap className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-foreground">1st-Year Friendly Verification</h4>
                    <p className="text-[11px] text-muted-foreground">Haven’t received your college ID card yet? Your Admission Slip or Fee Receipt gets you verified right away.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-7 h-7 rounded-lg bg-accent/10 border border-accent/30 flex items-center justify-center flex-shrink-0 text-accent">
                    <ShieldCheck className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-foreground">Safe Escrow & Fair Play Policy</h4>
                    <p className="text-[11px] text-muted-foreground">Clients lock 100% of project funds in secure escrow upfront. Strict anti-cheat policies permanently remove scammers.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Live Activity Feed */}
            <div className="relative z-10 mt-4 pt-4 border-t border-white/10">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] rank-mono text-muted-foreground flex items-center gap-1.5 uppercase tracking-wider">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  Live Platform Activity
                </span>
                <span className="text-[10px] text-muted-foreground">Delhi/NCR Colleges</span>
              </div>

              <div className="rounded-xl bg-black/60 border border-white/10 p-3 font-mono text-[10px] space-y-1.5 shadow-inner">
                {logs.map((log, index) => (
                  <div key={index} className="text-slate-400 truncate flex items-center gap-1.5">
                    <ChevronRight className="w-3 h-3 text-primary flex-shrink-0" />
                    <span>{log}</span>
                  </div>
                ))}
              </div>

              {/* Dev Quick Fill Switcher */}
              <div className="mt-3 pt-2 flex items-center justify-between text-[11px]">
                <span className="text-muted-foreground">Test Accounts:</span>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => handleQuickDemo('cadet_e')}
                    className="px-2.5 py-1 rounded-md bg-white/5 border border-white/10 hover:border-primary/50 text-slate-300 hover:text-white transition-all text-[10px] font-mono"
                  >
                    1st-Yr Student Demo
                  </button>
                  <button
                    type="button"
                    onClick={() => handleQuickDemo('evaluator_c')}
                    className="px-2.5 py-1 rounded-md bg-white/5 border border-white/10 hover:border-accent/50 text-slate-300 hover:text-white transition-all text-[10px] font-mono"
                  >
                    Senior Mentor Demo
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Form Panel */}
          <div className="lg:col-span-7 p-7 sm:p-9 bg-slate-950/60 flex flex-col justify-center">
            
            {/* Header / Mode Switcher */}
            <div className="flex items-center justify-between pb-5 mb-5 border-b border-white/10">
              <div>
                <h3 className="text-lg sm:text-xl font-bold text-foreground">
                  {authMode === 'signup' ? 'Create Your Account' : 'Welcome Back'}
                </h3>
                <p className="text-xs text-muted-foreground mt-0.5">
                  {authMode === 'signup' 
                    ? 'Join as a college student or hire a verified student team.' 
                    : 'Sign in to access your projects, earnings, and guild.'}
                </p>
              </div>

              <div className="flex rounded-xl bg-white/5 p-1 border border-white/10">
                <button
                  type="button"
                  onClick={() => { setAuthMode('signin'); setErrorMessage(null); }}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all ${
                    authMode === 'signin'
                      ? 'bg-primary text-white shadow-md'
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  Sign In
                </button>
                <button
                  type="button"
                  onClick={() => { setAuthMode('signup'); setErrorMessage(null); }}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all ${
                    authMode === 'signup'
                      ? 'bg-primary text-white shadow-md'
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  Sign Up
                </button>
              </div>
            </div>

            {/* Account Type Selector (Only in Signup) */}
            {authMode === 'signup' && (
              <div className="grid grid-cols-2 gap-3 mb-5">
                <button
                  type="button"
                  onClick={() => setAccountType('student')}
                  className={`p-3 rounded-2xl border text-left transition-all ${
                    accountType === 'student'
                      ? 'border-primary bg-primary/10 shadow-lg'
                      : 'border-white/10 bg-white/5 hover:bg-white/10'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-bold text-foreground flex items-center gap-1.5">
                      <GraduationCap className="w-3.5 h-3.5 text-primary" />
                      Student Member
                    </span>
                    <span className="text-[9px] rank-mono px-1.5 py-0.5 rounded bg-primary/20 text-primary">
                      Learn & Earn
                    </span>
                  </div>
                  <p className="text-[11px] text-muted-foreground">
                    Build your rank, join student guilds & earn money.
                  </p>
                </button>

                <button
                  type="button"
                  onClick={() => setAccountType('client')}
                  className={`p-3 rounded-2xl border text-left transition-all ${
                    accountType === 'client'
                      ? 'border-accent bg-accent/10 shadow-lg'
                      : 'border-white/10 bg-white/5 hover:bg-white/10'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-bold text-foreground flex items-center gap-1.5">
                      <Building2 className="w-3.5 h-3.5 text-accent" />
                      Startup / Client
                    </span>
                    <span className="text-[9px] rank-mono px-1.5 py-0.5 rounded bg-accent/20 text-accent">
                      Hire Teams
                    </span>
                  </div>
                  <p className="text-[11px] text-muted-foreground">
                    Hire verified student squads with smart escrow.
                  </p>
                </button>
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-3.5">
              
              {/* Full Name / Company Name */}
              {authMode === 'signup' && (
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">
                    {accountType === 'student' ? 'Your Full Name' : 'Company or Startup Name'}
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-muted-foreground">
                      {accountType === 'student' ? <User className="w-4 h-4" /> : <Building2 className="w-4 h-4" />}
                    </div>
                    <input
                      type="text"
                      required
                      value={accountType === 'student' ? fullName : companyName}
                      onChange={(e) =>
                        accountType === 'student' ? setFullName(e.target.value) : setCompanyName(e.target.value)
                      }
                      placeholder={accountType === 'student' ? 'e.g. Aryan Sharma' : 'e.g. InnovateTech Labs Pvt Ltd'}
                      className="w-full pl-10 pr-4 py-2 rounded-xl bg-white/5 border border-white/15 text-xs sm:text-sm text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:border-primary transition-all"
                    />
                  </div>
                </div>
              )}

              {/* Email Input */}
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="text-xs font-medium text-slate-300">
                    {accountType === 'student' ? 'Email Address' : 'Work Corporate Email'}
                  </label>
                  {accountType === 'student' && isCampusEmail && (
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-500/20 border border-emerald-500/50 text-[10px] text-emerald-400 font-mono">
                      <CheckCircle2 className="w-3 h-3" />
                      College Domain Detected
                    </span>
                  )}
                </div>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-muted-foreground">
                    <Mail className="w-4 h-4" />
                  </div>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder={
                      accountType === 'student' 
                        ? (hasCollegeEmail ? 'e.g. aryan@dseu.ac.in or student@dtu.ac.in' : 'e.g. aryan.sharma@gmail.com') 
                        : 'contact@company.com'
                    }
                    className="w-full pl-10 pr-4 py-2 rounded-xl bg-white/5 border border-white/15 text-xs sm:text-sm text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:border-primary transition-all"
                  />
                </div>

                {/* College Email Toggle for Students */}
                {accountType === 'student' && authMode === 'signup' && (
                  <div className="mt-1.5 flex items-center justify-between text-[11px]">
                    <label className="flex items-center gap-1.5 cursor-pointer text-muted-foreground hover:text-slate-200">
                      <input
                        type="checkbox"
                        checked={!hasCollegeEmail}
                        onChange={(e) => setHasCollegeEmail(!e.target.checked)}
                        className="rounded border-white/20 bg-white/5 text-primary focus:ring-primary w-3.5 h-3.5"
                      />
                      <span>I don&apos;t have a college email ID (Use personal Gmail / Outlook)</span>
                    </label>
                  </div>
                )}
              </div>

              {/* Student Details (Only in Student Signup) */}
              {authMode === 'signup' && accountType === 'student' && (
                <>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-medium text-slate-300 mb-1">
                        College / University
                      </label>
                      <select
                        value={selectedCollege}
                        onChange={(e) => setSelectedCollege(e.target.value)}
                        className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-white/15 text-xs text-foreground focus:outline-none focus:border-primary transition-all"
                      >
                        {COLLEGES.map((c) => (
                          <option key={c} value={c} className="bg-slate-900 text-white">
                            {c}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-slate-300 mb-1">
                        Roll No. / Enrollment / Application No.
                      </label>
                      <input
                        type="text"
                        required
                        value={studentId}
                        onChange={(e) => setStudentId(e.target.value)}
                        placeholder="e.g. 2026/CS/049 or App# 88921"
                        className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/15 text-xs sm:text-sm text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:border-primary transition-all"
                      />
                    </div>

                    {/* Blank Space for Other College / University */}
                    {selectedCollege === 'Other College / University' && (
                      <div className="sm:col-span-2 p-3 rounded-xl bg-primary/10 border border-primary/25 space-y-1.5 animate-fadeIn">
                        <label className="block text-xs font-semibold text-purple-300 flex items-center gap-1.5">
                          <Building2 className="w-3.5 h-3.5 text-primary" />
                          Apne College / University Ka Naam Likhein *
                        </label>
                        <input
                          type="text"
                          required
                          value={customCollege}
                          onChange={(e) => setCustomCollege(e.target.value)}
                          placeholder="e.g. SRM University, Amity, Manipal, Chandigarh University, AKTU, Pune Univ, etc."
                          className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-white/20 text-xs sm:text-sm text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:border-primary transition-all"
                        />
                        <p className="text-[10px] text-muted-foreground leading-relaxed">
                          Pan-India sabhi state universities, private colleges, aur polytechnic institutes ke students eligible hain.
                        </p>
                      </div>
                    )}
                  </div>

                  {/* 1st Year / No College Email Alternative Verification Method */}
                  {!hasCollegeEmail && (
                    <div className="p-3 rounded-xl bg-primary/10 border border-primary/20 space-y-2">
                      <div className="flex items-center justify-between">
                        <label className="text-xs font-semibold text-purple-300 flex items-center gap-1.5">
                          <FileText className="w-3.5 h-3.5 text-primary" />
                          Student Verification Proof (No ID Card Required for 1st Year)
                        </label>
                        <span className="text-[10px] text-muted-foreground">1st-Yr Friendly</span>
                      </div>
                      <select
                        value={docType}
                        onChange={(e) => setDocType(e.target.value)}
                        className="w-full px-3 py-1.5 rounded-lg bg-slate-900 border border-white/20 text-xs text-slate-200 focus:outline-none"
                      >
                        {VERIFICATION_DOC_TYPES.map((d) => (
                          <option key={d.id} value={d.id} className="bg-slate-900 text-white">
                            {d.label}
                          </option>
                        ))}
                      </select>
                      <p className="text-[10px] text-muted-foreground leading-relaxed">
                        {VERIFICATION_DOC_TYPES.find(d => d.id === docType)?.tip}
                      </p>
                    </div>
                  )}

                  {/* Broad Skill Specialization selector */}
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <label className="text-xs font-medium text-slate-300">
                        Primary Skill / Area of Interest
                      </label>
                      <span className="text-[10px] text-muted-foreground">All skills welcome</span>
                    </div>
                    <div className="grid grid-cols-3 gap-1.5">
                      {SPECIALIZATIONS.map((spec) => (
                        <button
                          key={spec.id}
                          type="button"
                          onClick={() => setSpecialization(spec.id)}
                          className={`p-2 rounded-xl border text-center transition-all ${
                            specialization === spec.id
                              ? 'border-primary bg-primary/25 text-white font-semibold shadow'
                              : 'border-white/10 bg-white/5 text-muted-foreground hover:text-foreground'
                          }`}
                        >
                          <span className="block text-sm mb-0.5">{spec.icon}</span>
                          <span className="block text-[10px] truncate">{spec.label}</span>
                        </button>
                      ))}
                    </div>

                    {/* Custom Skill Blank Space / Input Box */}
                    {specialization === 'other' && (
                      <div className="mt-2.5 p-3 rounded-xl bg-primary/10 border border-primary/25 space-y-1.5 animate-fadeIn">
                        <label className="block text-xs font-semibold text-purple-300">
                          Apni Skill Likhein / Specify Your Custom Skill *
                        </label>
                        <input
                          type="text"
                          required
                          value={customSkill}
                          onChange={(e) => setCustomSkill(e.target.value)}
                          placeholder="e.g. 3D Animation, Game Dev, Voiceover, Translation, Finance, Public Speaking, etc."
                          className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-white/20 text-xs sm:text-sm text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:border-primary transition-all"
                        />
                        <p className="text-[10px] text-muted-foreground leading-relaxed">
                          Har skill valuable hai! Chahe aap 3D modeling karte ho, translation, music production, ya finance research.
                        </p>
                      </div>
                    )}
                  </div>
                </>
              )}

              {/* Client Budget Tier (Only in Client Signup) */}
              {authMode === 'signup' && accountType === 'client' && (
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">
                    Estimated Project Budget
                  </label>
                  <select
                    value={budgetTier}
                    onChange={(e) => setBudgetTier(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-white/15 text-xs text-foreground focus:outline-none focus:border-accent transition-all"
                  >
                    {BUDGET_TIERS.map((tier) => (
                      <option key={tier} value={tier} className="bg-slate-900 text-white">
                        {tier}
                      </option>
                    ))}
                  </select>
                </div>
              )}

              {/* Password with Show/Hide Toggle */}
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-muted-foreground">
                    <Lock className="w-4 h-4" />
                  </div>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter password (min. 6 characters)"
                    className="w-full pl-10 pr-10 py-2 rounded-xl bg-white/5 border border-white/15 text-xs sm:text-sm text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:border-primary transition-all"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-muted-foreground hover:text-foreground"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Confirm Password with Show/Hide Toggle (Only in Signup) */}
              {authMode === 'signup' && (
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">
                    Confirm Password
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-muted-foreground">
                      <Lock className="w-4 h-4" />
                    </div>
                    <input
                      type={showConfirmPassword ? 'text' : 'password'}
                      required
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="Re-enter your password"
                      className="w-full pl-10 pr-10 py-2 rounded-xl bg-white/5 border border-white/15 text-xs sm:text-sm text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:border-primary transition-all"
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-muted-foreground hover:text-foreground"
                    >
                      {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>
              )}

              {/* Error Message */}
              {errorMessage && (
                <div className="p-2.5 rounded-xl bg-red-900/30 border border-red-500/40 text-xs text-red-300 flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 text-red-400 flex-shrink-0" />
                  <span>{errorMessage}</span>
                </div>
              )}

              {/* Status Message */}
              {statusMessage && (
                <div className="p-2.5 rounded-xl bg-primary/20 border border-primary/40 text-xs text-purple-200 flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-accent animate-spin" />
                  {statusMessage}
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full shimmer-btn py-2.5 rounded-xl text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg transition-all hover:scale-[1.01] active:scale-[0.99] disabled:opacity-50 mt-2"
                style={{ boxShadow: '0 0 25px rgba(124,58,237,0.35)' }}
              >
                {isSubmitting ? (
                  <>
                    <span className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    <span>Setting Up Account...</span>
                  </>
                ) : (
                  <>
                    <span>{authMode === 'signup' ? 'Complete Registration' : 'Sign In to UniParahits'}</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>

            {/* Toggle Mode */}
            <div className="mt-5 text-center">
              <p className="text-xs text-muted-foreground">
                {authMode === 'signup' ? (
                  <>
                    Already have an account?{' '}
                    <button
                      type="button"
                      onClick={() => { setAuthMode('signin'); setErrorMessage(null); }}
                      className="text-primary hover:underline font-semibold"
                    >
                      Sign In here
                    </button>
                  </>
                ) : (
                  <>
                    New student or business?{' '}
                    <button
                      type="button"
                      onClick={() => { setAuthMode('signup'); setErrorMessage(null); }}
                      className="text-primary hover:underline font-semibold"
                    >
                      Create an account
                    </button>
                  </>
                )}
              </p>
            </div>

          </div>
        </div>
      </main>
    </div>
  );
}
