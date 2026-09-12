'use client';
import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import {
  ShieldCheck,
  Lock,
  Coins,
  Terminal,
  Zap,
  Crosshair,
  Users,
  Bell,
  Volume2,
  VolumeX,
  LogOut,
  ExternalLink,
  CheckCircle2,
  AlertTriangle,
  RefreshCw,
  Sparkles,
  Plus,
  ChevronRight,
  ChevronLeft,
  Send,
  Check,
  X,
  Code2,
  Palette,
  Video,
  PenTool,
  Search,
  Filter,
  HelpCircle,
  Info,
  LayoutGrid,
  List,
  Award,
  ArrowRight,
  ArrowLeft,
  TrendingUp,
  SlidersHorizontal,
  Flame,
  Target,
  Compass,
} from 'lucide-react';

// ==========================================
// TYPES & ENUMS
// ==========================================
type DashboardRole = 'RNK-E' | 'RNK-C' | 'CLIENT';
type TacticalView = 'command' | 'missions' | 'armory' | 'guild' | 'escrow' | 'court_martial';

interface CadetSubmission {
  id: string;
  name: string;
  college: string;
  category: string;
  title: string;
  link: string;
  timestamp: string;
  status: 'pending' | 'approved' | 'rejected';
  testsPassing: string;
}

interface MissionItem {
  id: string;
  title: string;
  client: string;
  category: string;
  reward: number;
  xpReward: number;
  minRank: string;
  deadline: string;
  status: 'open' | 'in_progress' | 'completed';
  escrowStatus: 'locked' | 'review' | 'released';
}

interface TickerMessage {
  id: string;
  text: string;
  type: 'escrow' | 'promotion' | 'bounty' | 'court_martial';
  time: string;
}

// Initial Mock Data
const INITIAL_CADET_QUEUE: CadetSubmission[] = [
  {
    id: 'cadet-1',
    name: 'Aryan Sharma',
    college: 'DSEU Dwarka Node // CS-104',
    category: 'Web & App Dev',
    title: 'Fullstack Next.js 15 E-Commerce with Stripe Webhooks',
    link: 'https://github.com/aryan-sh/next-store-proof',
    timestamp: '12m ago',
    status: 'pending',
    testsPassing: '24/24 Tests OK',
  },
  {
    id: 'cadet-2',
    name: 'Sneha Kapoor',
    college: 'DTU Delhi // Design-08',
    category: 'UI/UX & Graphics',
    title: 'FinTech Banking Mobile App Design System (Figma)',
    link: 'https://figma.com/@sneha/fintech-system',
    timestamp: '34m ago',
    status: 'pending',
    testsPassing: '12 Screens Validated',
  },
  {
    id: 'cadet-3',
    name: 'Rahul Verma',
    college: 'NSUT Delhi // ECE-212',
    category: 'Video & Animation',
    title: '3D Blender Tech Commercial Reel & Motion Graphics',
    link: 'https://drive.google.com/file/d/rahul-reel/view',
    timestamp: '1h ago',
    status: 'pending',
    testsPassing: 'Render 4K 60fps',
  },
];

const INITIAL_MISSIONS: MissionItem[] = [
  {
    id: 'MSN-901',
    title: 'High-Frequency Crypto Arbitrage Dashboard UI',
    client: 'FinFlow Protocol',
    category: 'Web & App Dev',
    reward: 35000,
    xpReward: 1200,
    minRank: 'RNK-C',
    deadline: '4 Days',
    status: 'open',
    escrowStatus: 'locked',
  },
  {
    id: 'MSN-902',
    title: 'Complete SaaS Design System & Interactive Prototype',
    client: 'NexaCloud AI',
    category: 'UI/UX & Graphics',
    reward: 22000,
    xpReward: 850,
    minRank: 'RNK-D',
    deadline: '6 Days',
    status: 'open',
    escrowStatus: 'locked',
  },
  {
    id: 'MSN-903',
    title: 'Technical Whitepaper & SEO Documentation Sprint',
    client: 'LayerZero Labs Partner',
    category: 'Content Writing',
    reward: 12500,
    xpReward: 500,
    minRank: 'RNK-D',
    deadline: '3 Days',
    status: 'open',
    escrowStatus: 'locked',
  },
  {
    id: 'MSN-904',
    title: 'Product Launch 3D Motion Teaser (30s 4K)',
    client: 'Aether Robotics',
    category: 'Video & Animation',
    reward: 18000,
    xpReward: 700,
    minRank: 'RNK-C',
    deadline: '5 Days',
    status: 'open',
    escrowStatus: 'locked',
  },
  {
    id: 'MSN-905',
    title: 'PyTorch Vision Model for Quality Defect Detection',
    client: 'Apex Industrial IoT',
    category: 'AI & Machine Learning',
    reward: 42000,
    xpReward: 1600,
    minRank: 'RNK-B',
    deadline: '8 Days',
    status: 'open',
    escrowStatus: 'locked',
  },
  {
    id: 'MSN-906',
    title: 'Mobile App Wireframes & Interactive User Flow',
    client: 'Zomato Campus Partner',
    category: 'UI/UX & Graphics',
    reward: 14000,
    xpReward: 600,
    minRank: 'RNK-E',
    deadline: '3 Days',
    status: 'open',
    escrowStatus: 'locked',
  },
];

const INITIAL_TICKER: TickerMessage[] = [
  { id: '1', text: 'Operative #402 just settled ₹1,500 bounty via Escrow Vault', type: 'escrow', time: 'Just now' },
  { id: '2', text: 'Guild Alpha promoted 2 Cadets to Rank D after senior mentor review', type: 'promotion', time: '2m ago' },
  { id: '3', text: 'FinFlow locked ₹35,000 in Escrow for Crypto Arbitrage Sprint', type: 'bounty', time: '5m ago' },
  { id: '4', text: 'Fair Play Check: Zero tolerance enforcement. 1 account flagged for copy-pasting', type: 'court_martial', time: '11m ago' },
];

// ==========================================
// INTERACTIVE SPEECH BUBBLE TOUR STEPS (REF: USER DRAWING)
// ==========================================
interface PointerTourStep {
  step: number;
  targetId: string;
  title: string;
  tag: string;
  requiredTab?: TacticalView;
  requiredRole?: DashboardRole;
  whatIsIt: string;
  whatToDo: string;
}

const POINTER_STEPS: PointerTourStep[] = [
  {
    step: 1,
    targetId: 'tour-target-hud-mana',
    title: '⚡ MANA Vault (Skill Barter XP)',
    tag: 'PEER MERIT CURRENCY (₹0)',
    requiredTab: 'command',
    whatIsIt: 'Campus merit currency (₹0 cash value) jo student collaboration ke liye bana hai.',
    whatToDo: 'Junior ka code review karo ya help karo to MANA milega. Isse tum dusre student se bina paise diye apne project ke liye UI design ya video banwa sakte ho!',
  },
  {
    step: 2,
    targetId: 'tour-target-hud-zeni',
    title: '🪙 ZENI Credits (Real ₹1 INR)',
    tag: 'REAL CASH (1 ZENI = ₹1)',
    requiredTab: 'command',
    whatIsIt: '100% Real Paisa! 1 ZENI = ₹1 Indian Rupee jo startups advance escrow me dete hain.',
    whatToDo: 'Client projects deliver karo aur mentors se approve karwao — ZENI direct tumhare bank account me direct INR ban ke transfer ho jayega!',
  },
  {
    step: 3,
    targetId: 'tour-target-roles',
    title: '🎖️ 5-Tier Merit Ranks & Simulator',
    tag: 'RANK HIERARCHY',
    requiredTab: 'command',
    whatIsIt: 'Sabhi recruits RNK-E (Cadet) se shuru karte hain. Proof of work se RNK-D aur RNK-C bante hain.',
    whatToDo: 'Tum abhi RNK-E Cadet ho. Upar buttons se tum RNK-C Mentor ya Client view switch karke platform ka perspective test kar sakte ho!',
  },
  {
    step: 4,
    targetId: 'tour-target-proof',
    title: '🛠️ Submit Practical Proof',
    tag: 'CADET INDUCTION',
    requiredTab: 'command',
    requiredRole: 'RNK-E',
    whatIsIt: 'Probation se bahar aakar paid client bounties unlock karne ka form.',
    whatToDo: 'Skill category choose karo, working GitHub repo ya Figma link daalo, aur "Transmit Proof" dabao. Senior mentors verify karke promote karenge!',
  },
  {
    step: 5,
    targetId: 'tour-target-missions',
    title: '🎯 Bounty Marketplace Feed',
    tag: 'REAL CLIENT PROJECTS',
    requiredTab: 'missions',
    whatIsIt: 'Verified companies ke live projects jahan ₹14,000 se ₹42,000 tak upfront locked hain.',
    whatToDo: 'Search bar me stack search karo (Next.js, Figma), category filter lagao, aur "Claim Task" daba kar project start karo!',
  },
  {
    step: 6,
    targetId: 'tour-target-escrow',
    title: '🛡️ Smart Escrow Vault (3 Stages)',
    tag: '0% SCAM GUARANTEE',
    requiredTab: 'escrow',
    whatIsIt: 'Automated 3-stage vault jo freelancers ko payment fraud se 100% protect karta hai.',
    whatToDo: 'Paisa pehle hi lock hota hai: (1) Funds Locked ➔ (2) In Review ➔ (3) Auto Release (85% squad ko). Niche button se test karke dekho!',
  },
  {
    step: 7,
    targetId: 'tour-target-squad',
    title: '👥 Multi-Skill Student Squad',
    tag: 'INTER-COLLEGE SQUAD',
    requiredTab: 'command',
    whatIsIt: 'DSEU, DTU, NSUT ke students ki active team aur realtime campus ticker.',
    whatToDo: 'Akele mat ladho! 1 Dev + 1 Designer + 1 Writer milkar squad banao aur bade client bounties split karo.',
  },
];

export default function DashboardPage() {
  // ==========================================
  // STATE MANAGEMENT
  // ==========================================
  const [role, setRole] = useState<DashboardRole>('RNK-E');
  const [activeTab, setActiveTab] = useState<TacticalView>('command');
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [alertsOpen, setAlertsOpen] = useState(false);
  const [cadetQueue, setCadetQueue] = useState<CadetSubmission[]>(INITIAL_CADET_QUEUE);
  const [missions, setMissions] = useState<MissionItem[]>(INITIAL_MISSIONS);
  const [tickerList, setTickerList] = useState<TickerMessage[]>(INITIAL_TICKER);

  // Escrow Vault interactive states
  const [escrowStep, setEscrowStep] = useState<number>(1); // 1: Locked, 2: Review, 3: Released
  const [isReleasingEscrow, setIsReleasingEscrow] = useState(false);

  // Currency Balances (Reactively change based on role)
  const [xpBalance, setXpBalance] = useState<number>(1250);
  const [cashBalance, setCashBalance] = useState<number>(0);
  const [escrowLockedBalance, setEscrowLockedBalance] = useState<number>(0);

  // Interactive Speech Bubble Tour State
  const [tourOpen, setTourOpen] = useState(false);
  const [currentTourStep, setCurrentTourStep] = useState(0);
  const [bubbleCoords, setBubbleCoords] = useState<{
    top: number;
    left: number;
    arrowPosition: 'top' | 'bottom';
    arrowLeft: number;
  }>({
    top: 120,
    left: 20,
    arrowPosition: 'top',
    arrowLeft: 60,
  });

  // Currency Deep Dive Modal
  const [currencyModalOpen, setCurrencyModalOpen] = useState(false);
  const [currencyModalTab, setCurrencyModalTab] = useState<'both' | 'mana' | 'zeni'>('both');

  // Search & Filter state for Bounties / Market
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedRankFilter, setSelectedRankFilter] = useState('All');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  // Proof submission form (for RNK-E)
  const [proofModalOpen, setProofModalOpen] = useState(false);
  const [proofType, setProofType] = useState('Web & App Dev');
  const [proofLink, setProofLink] = useState('');
  const [proofDesc, setProofDesc] = useState('');
  const [proofSubmitted, setProofSubmitted] = useState(false);

  // New Bounty Modal (for CLIENT)
  const [clientModalOpen, setClientModalOpen] = useState(false);
  const [newBountyTitle, setNewBountyTitle] = useState('');
  const [newBountyAmount, setNewBountyAmount] = useState('25000');
  const [newBountyTier, setNewBountyTier] = useState('RNK-D');

  // Success Notification Banner
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Audio Context for synthetic tactical sound effects
  const audioCtxRef = useRef<AudioContext | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  };

  // Synthetic Web Audio SFX Player
  const playTacticalSound = (type: 'click' | 'deploy' | 'alert' | 'promote' | 'escrow') => {
    if (!soundEnabled) return;
    try {
      if (!audioCtxRef.current) {
        const AudioContextClass =
          window.AudioContext ||
          (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
        audioCtxRef.current = new AudioContextClass();
      }
      const ctx = audioCtxRef.current;
      if (ctx.state === 'suspended') {
        ctx.resume();
      }

      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);

      if (type === 'click') {
        osc.type = 'sine';
        osc.frequency.setValueAtTime(1200, now);
        osc.frequency.exponentialRampToValueAtTime(600, now + 0.06);
        gain.gain.setValueAtTime(0.15, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.06);
        osc.start(now);
        osc.stop(now + 0.06);
      } else if (type === 'deploy') {
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(180, now);
        osc.frequency.exponentialRampToValueAtTime(450, now + 0.18);
        gain.gain.setValueAtTime(0.25, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.22);
        osc.start(now);
        osc.stop(now + 0.22);
      } else if (type === 'promote') {
        osc.type = 'sine';
        osc.frequency.setValueAtTime(523.25, now); // C5
        osc.frequency.setValueAtTime(659.25, now + 0.08); // E5
        osc.frequency.setValueAtTime(783.99, now + 0.16); // G5
        gain.gain.setValueAtTime(0.2, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.3);
        osc.start(now);
        osc.stop(now + 0.3);
      } else if (type === 'alert') {
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(800, now);
        osc.frequency.setValueAtTime(400, now + 0.08);
        gain.gain.setValueAtTime(0.15, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.15);
        osc.start(now);
        osc.stop(now + 0.15);
      } else if (type === 'escrow') {
        osc.type = 'sine';
        osc.frequency.setValueAtTime(300, now);
        osc.frequency.exponentialRampToValueAtTime(900, now + 0.25);
        gain.gain.setValueAtTime(0.2, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.25);
        osc.start(now);
        osc.stop(now + 0.25);
      }
    } catch {
      // Audio playback fails silently if browser policy blocks
    }
  };

  // Sync role defaults when role changes
  useEffect(() => {
    if (role === 'RNK-E') {
      setXpBalance(1250);
      setCashBalance(0);
      setEscrowLockedBalance(0);
    } else if (role === 'RNK-C') {
      setXpBalance(8450);
      setCashBalance(18500);
      setEscrowLockedBalance(25000);
    } else if (role === 'CLIENT') {
      setXpBalance(24000);
      setCashBalance(85000);
      setEscrowLockedBalance(60000);
    }
  }, [role]);

  // First time join check & URL param check for ?tour=true
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const hasSeenTour = localStorage.getItem('uniparahits_seen_speech_tour');
      if (params.get('tour') === 'true' || params.get('new_user') === 'true' || !hasSeenTour) {
        setCurrentTourStep(0);
        setTourOpen(true);
        localStorage.setItem('uniparahits_seen_speech_tour', 'true');
      }
    }
  }, []);

  // Update speech bubble position relative to active target element
  const updateBubblePosition = () => {
    const currentStep = POINTER_STEPS[currentTourStep];
    if (!currentStep) return;

    const targetEl = document.getElementById(currentStep.targetId);
    if (!targetEl) return;

    const rect = targetEl.getBoundingClientRect();
    const bubbleWidth = Math.min(320, window.innerWidth - 32);
    const estimatedHeight = 180;

    const targetCenter = rect.left + rect.width / 2;
    let left = targetCenter - bubbleWidth / 2;
    left = Math.max(16, Math.min(window.innerWidth - bubbleWidth - 16, left));
    const arrowLeft = Math.max(24, Math.min(bubbleWidth - 24, targetCenter - left));

    let top = 0;
    let arrowPosition: 'top' | 'bottom' = 'bottom';

    // If there is enough room ABOVE target, place it above with arrow pointing DOWN
    if (rect.top >= estimatedHeight + 20) {
      top = rect.top - estimatedHeight - 12;
      arrowPosition = 'bottom';
    } else {
      // Place below target with arrow pointing UP
      top = rect.bottom + 12;
      arrowPosition = 'top';
    }

    setBubbleCoords({
      top: Math.max(12, top),
      left,
      arrowPosition,
      arrowLeft,
    });
  };

  // Sync tab & role when tour step changes and recalculate bubble position
  useEffect(() => {
    if (tourOpen) {
      const stepData = POINTER_STEPS[currentTourStep];
      if (stepData) {
        if (stepData.requiredTab && activeTab !== stepData.requiredTab) {
          setActiveTab(stepData.requiredTab);
        }
        if (stepData.requiredRole && role !== stepData.requiredRole) {
          setRole(stepData.requiredRole);
        }

        // Smooth scroll to target element
        const timer = setTimeout(() => {
          const el = document.getElementById(stepData.targetId);
          if (el) {
            el.scrollIntoView({ behavior: 'smooth', block: 'center' });
          }
          updateBubblePosition();
        }, 150);

        const timer2 = setTimeout(() => {
          updateBubblePosition();
        }, 450);

        return () => {
          clearTimeout(timer);
          clearTimeout(timer2);
        };
      }
    }
  }, [tourOpen, currentTourStep]);

  // Window resize & scroll listeners to keep speech bubble anchored
  useEffect(() => {
    if (!tourOpen) return;
    const handleRecalc = () => updateBubblePosition();
    window.addEventListener('resize', handleRecalc);
    window.addEventListener('scroll', handleRecalc, { passive: true });
    return () => {
      window.removeEventListener('resize', handleRecalc);
      window.removeEventListener('scroll', handleRecalc);
    };
  }, [tourOpen, currentTourStep]);

  // Action: Cadet Proof Submission
  const handleProofSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!proofLink.trim()) return;

    playTacticalSound('deploy');
    const newSubmission: CadetSubmission = {
      id: `cadet-${Date.now()}`,
      name: 'Akshit Bhatt (Recruit)',
      college: 'DSEU Dwarka Node // CS-Cadet',
      category: proofType,
      title: proofDesc || 'Custom Practical Skill Submission',
      link: proofLink,
      timestamp: 'Just now',
      status: 'pending',
      testsPassing: 'Queued for Review',
    };

    setCadetQueue((prev) => [newSubmission, ...prev]);
    setProofSubmitted(true);
    setProofModalOpen(false);
    showToast('⚡ Proof submitted! Transmitted to C-Rank Peer Consensus Queue.');

    // Push into live ticker
    setTickerList((prev) => [
      {
        id: String(Date.now()),
        text: 'Akshit Bhatt (Cadet) submitted practical proof for C-Rank Consensus evaluation',
        type: 'bounty',
        time: 'Just now',
      },
      ...prev,
    ]);
  };

  // Action: Approve Cadet (for RNK-C)
  const handleApproveCadet = (id: string, name: string) => {
    playTacticalSound('promote');
    setCadetQueue((prev) =>
      prev.map((c) => (c.id === id ? { ...c, status: 'approved' } : c))
    );
    setXpBalance((prev) => prev + 150);
    showToast(`✅ ${name} promoted to RNK-D! Evaluator earned +150 MANA XP.`);

    // Ticker announcement
    setTickerList((prev) => [
      {
        id: String(Date.now()),
        text: `Consensus Verified: ${name} promoted to Rank-D by Mentor Vance // Payout Channels Active`,
        type: 'promotion',
        time: 'Just now',
      },
      ...prev,
    ]);
  };

  // Action: Reject/Flag Cadet
  const handleRejectCadet = (id: string, name: string) => {
    playTacticalSound('alert');
    setCadetQueue((prev) =>
      prev.map((c) => (c.id === id ? { ...c, status: 'rejected' } : c))
    );
    showToast(`⚠️ Review notes transmitted to ${name}. Changes requested.`);
  };

  // Action: Post New Bounty (for CLIENT)
  const handleDeployBounty = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newBountyTitle.trim()) return;

    playTacticalSound('deploy');
    const bountyAmount = parseInt(newBountyAmount) || 25000;
    const newMission: MissionItem = {
      id: `MSN-${Math.floor(100 + Math.random() * 900)}`,
      title: newBountyTitle,
      client: 'Startup Nexus (You)',
      category: 'Web & App Dev',
      reward: bountyAmount,
      xpReward: Math.floor(bountyAmount * 0.05),
      minRank: newBountyTier,
      deadline: '7 Days',
      status: 'open',
      escrowStatus: 'locked',
    };

    setMissions((prev) => [newMission, ...prev]);
    setCashBalance((prev) => prev - bountyAmount);
    setEscrowLockedBalance((prev) => prev + bountyAmount);
    setClientModalOpen(false);
    showToast(`🛡️ ₹${bountyAmount.toLocaleString()} safely deposited into Smart Escrow Vault!`);

    // Ticker announcement
    setTickerList((prev) => [
      {
        id: String(Date.now()),
        text: `New Bounty Deployed: ₹${bountyAmount.toLocaleString()} secured in Escrow for "${newBountyTitle}"`,
        type: 'escrow',
        time: 'Just now',
      },
      ...prev,
    ]);
  };

  // Action: Simulate Escrow Release
  const handleSimulateEscrowRelease = () => {
    setIsReleasingEscrow(true);
    playTacticalSound('escrow');
    setTimeout(() => {
      setEscrowStep((prev) => (prev >= 3 ? 1 : prev + 1));
      setIsReleasingEscrow(false);
      playTacticalSound('promote');
      if (escrowStep === 2) {
        showToast('🎉 ₹25,000 released from Escrow Vault! 85% credited to Guild, 15% platform cut.');
      } else {
        showToast('🔄 Escrow milestone state advanced to next verification gate.');
      }
    }, 800);
  };

  // Filtered Missions Logic
  const filteredMissions = missions.filter((m) => {
    const matchesSearch =
      m.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.client.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.category.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory =
      selectedCategory === 'All' || m.category.toLowerCase() === selectedCategory.toLowerCase();
    const matchesRank =
      selectedRankFilter === 'All' ||
      (selectedRankFilter === 'RNK-E' && m.minRank === 'RNK-E') ||
      (selectedRankFilter === 'RNK-D' && (m.minRank === 'RNK-D' || m.minRank === 'RNK-E')) ||
      (selectedRankFilter === 'RNK-C' && (m.minRank === 'RNK-C' || m.minRank === 'RNK-D' || m.minRank === 'RNK-E'));
    return matchesSearch && matchesCategory && matchesRank;
  });

  const activeStepData = POINTER_STEPS[currentTourStep];

  return (
    <div className="min-h-screen bg-[#040711] text-foreground font-sans selection:bg-primary/30 selection:text-white relative overflow-x-hidden flex flex-col">
      {/* Background Ambience & Cyber Grid */}
      <div className="fixed inset-0 pointer-events-none z-0">
        {/* Glow Spheres */}
        <div
          className="absolute top-0 left-1/4 w-[600px] h-[600px] rounded-full opacity-10"
          style={{ background: 'radial-gradient(circle, #8b5cf6 0%, transparent 70%)', filter: 'blur(100px)' }}
        />
        <div
          className="absolute bottom-0 right-1/4 w-[600px] h-[600px] rounded-full opacity-10"
          style={{ background: 'radial-gradient(circle, #b81d42 0%, transparent 70%)', filter: 'blur(100px)' }}
        />
        {/* Cyber Grid Lines */}
        <div
          className="absolute inset-0 opacity-[0.035]"
          style={{
            backgroundImage:
              'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
            backgroundSize: '36px 36px',
          }}
        />
        {/* Scanline Animation */}
        <div className="scan-line" />
      </div>

      {/* Dimmed Backdrop when Tour is Active */}
      {tourOpen && (
        <div
          onClick={() => {
            playTacticalSound('click');
            setTourOpen(false);
          }}
          className="fixed inset-0 z-30 bg-black/60 backdrop-blur-[1.5px] transition-all duration-300"
          title="Click backdrop to dismiss guide"
        />
      )}

      {/* ========================================================================= */}
      {/* 0. TOP HACKATHON DEMO SWITCHER TOOLBAR */}
      {/* ========================================================================= */}
      <div className="relative z-35 bg-slate-950/90 border-b border-white/10 px-4 py-2 flex flex-wrap items-center justify-between gap-2 text-xs font-mono backdrop-blur-md">
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-primary/20 text-purple-300 border border-primary/40 text-[11px] uppercase font-bold tracking-widest">
            <Terminal className="w-3.5 h-3.5 text-primary" />
            SIH-2026 Simulation Cockpit
          </span>
          <span className="text-muted-foreground hidden md:inline text-[11px]">
            Switch operative role to preview custom command views:
          </span>
        </div>

        <div className="flex items-center gap-2">
          {/* 3-State Role Switcher Tabs (Target for Tour Step 3) */}
          <div
            id="tour-target-roles"
            className={`flex items-center gap-1 bg-black/60 p-1 rounded-xl border transition-all duration-300 relative ${
              tourOpen && activeStepData?.targetId === 'tour-target-roles'
                ? 'border-primary ring-4 ring-primary shadow-[0_0_35px_rgba(139,92,246,0.85)] z-40 bg-slate-900 scale-[1.02]'
                : 'border-white/10'
            }`}
          >
            <button
              type="button"
              onClick={() => {
                playTacticalSound('click');
                setRole('RNK-E');
              }}
              className={`px-3 py-1 rounded-lg transition-all font-mono font-bold flex items-center gap-1.5 ${
                role === 'RNK-E'
                  ? 'bg-amber-500/20 text-amber-400 border border-amber-500/40 shadow-[0_0_12px_rgba(245,158,11,0.3)]'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
              RNK-E (Cadet)
            </button>

            <button
              type="button"
              onClick={() => {
                playTacticalSound('click');
                setRole('RNK-C');
              }}
              className={`px-3 py-1 rounded-lg transition-all font-mono font-bold flex items-center gap-1.5 ${
                role === 'RNK-C'
                  ? 'bg-purple-500/20 text-purple-300 border border-purple-500/40 shadow-[0_0_12px_rgba(139,92,246,0.3)]'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              <span className="w-2 h-2 rounded-full bg-purple-400 animate-pulse" />
              RNK-C (Mentor)
            </button>

            <button
              type="button"
              onClick={() => {
                playTacticalSound('click');
                setRole('CLIENT');
              }}
              className={`px-3 py-1 rounded-lg transition-all font-mono font-bold flex items-center gap-1.5 ${
                role === 'CLIENT'
                  ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 shadow-[0_0_12px_rgba(16,185,129,0.3)]'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              CLIENT (Recruiter)
            </button>
          </div>

          {/* Interactive Guider Button (Prominent & Glowing) */}
          <button
            type="button"
            onClick={() => {
              playTacticalSound('deploy');
              setCurrentTourStep(0);
              setTourOpen(true);
            }}
            className="px-3 py-1.5 rounded-xl bg-gradient-to-r from-primary/30 to-purple-800/40 hover:from-primary/50 hover:to-purple-800/60 border border-primary/50 text-white font-mono text-xs font-bold flex items-center gap-1.5 shadow-[0_0_15px_rgba(139,92,246,0.3)] transition-all hover:scale-105"
            title="Open Interactive Speech Bubble Guide"
          >
            <Sparkles className="w-3.5 h-3.5 text-accent animate-spin" style={{ animationDuration: '4s' }} />
            <span>Tour & Guide</span>
          </button>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 1. TOP HUD BAR (Contains M & ZE icons from user drawing) */}
      {/* ========================================================================= */}
      <header className="relative z-35 border-b border-white/10 bg-slate-950/70 backdrop-blur-xl px-4 sm:px-6 py-3">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3">
          
          {/* Left: Operative ID Plate */}
          <div className="flex items-center gap-3 w-full md:w-auto justify-between md:justify-start">
            <div className="relative">
              <div
                className={`w-11 h-11 rounded-2xl flex items-center justify-center font-mono font-extrabold text-sm border-2 shadow-lg transition-all ${
                  role === 'RNK-E'
                    ? 'border-amber-400 bg-amber-950/40 text-amber-300 shadow-amber-500/20'
                    : role === 'RNK-C'
                    ? 'border-purple-500 bg-purple-950/40 text-purple-300 shadow-purple-500/30'
                    : 'border-emerald-400 bg-emerald-950/40 text-emerald-300 shadow-emerald-500/20'
                }`}
              >
                {role === 'RNK-E' ? 'E-01' : role === 'RNK-C' ? 'C-09' : 'CLT'}
              </div>
              <span
                className={`absolute -bottom-1 -right-1 w-3.5 h-3.5 rounded-full border-2 border-slate-950 ${
                  role === 'RNK-E' ? 'bg-amber-400 animate-ping' : 'bg-emerald-400'
                }`}
              />
            </div>

            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-sm sm:text-base font-extrabold text-foreground tracking-tight">
                  {role === 'RNK-E' ? 'Akshit Bhatt' : role === 'RNK-C' ? 'Vance (Akshit)' : 'Nexus Labs Inc.'}
                </h2>
                <span
                  className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold tracking-wider uppercase border ${
                    role === 'RNK-E'
                      ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                      : role === 'RNK-C'
                      ? 'bg-purple-500/20 text-purple-300 border-purple-500/40'
                      : 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                  }`}
                >
                  {role === 'RNK-E' ? 'RNK-E CADET' : role === 'RNK-C' ? 'RNK-C EVALUATOR' : 'CLIENT APEX'}
                </span>
              </div>
              <p className="text-[11px] font-mono text-muted-foreground flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 inline-block" />
                {role === 'CLIENT' ? 'Enterprise Sponsor Node // Verified' : 'DSEU Dwarka Node // Verified'}
              </p>
            </div>
          </div>

          {/* Center/Right: Resource Currencies (Target for Step 1 MANA & Step 2 ZENI) */}
          <div className="flex items-center gap-2 sm:gap-3 overflow-x-auto w-full md:w-auto justify-center md:justify-end pb-1 md:pb-0">
            
            {/* Currency 1: MANA Vault (Top HUD) - Step 1 Target */}
            <div
              id="tour-target-hud-mana"
              onClick={() => {
                playTacticalSound('click');
                setCurrencyModalTab('mana');
                setCurrencyModalOpen(true);
              }}
              className={`glass-card px-3 py-1.5 rounded-xl transition-all duration-300 cursor-pointer flex items-center gap-2 group relative ${
                tourOpen && activeStepData?.targetId === 'tour-target-hud-mana'
                  ? 'border-2 border-amber-400 ring-4 ring-amber-400/90 shadow-[0_0_30px_rgba(245,158,11,0.9)] z-40 bg-slate-900 scale-105'
                  : 'border border-amber-500/30 hover:border-amber-500/60'
              }`}
              title="Click to inspect ⚡ MANA Credits"
            >
              <div className="w-7 h-7 rounded-lg bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400 text-xs">
                <Zap className="w-3.5 h-3.5 fill-amber-400" />
              </div>
              <div>
                <div className="flex items-center gap-1">
                  <p className="text-[9px] font-mono text-amber-300 uppercase leading-none font-bold">⚡ MANA XP</p>
                  <Info className="w-2.5 h-2.5 text-muted-foreground group-hover:text-amber-300" />
                </div>
                <p className="text-xs sm:text-sm font-mono font-bold text-amber-400 leading-tight">
                  {xpBalance.toLocaleString()} <span className="text-[9px] font-normal text-muted-foreground">Barter</span>
                </p>
              </div>
            </div>

            {/* Currency 2: ZENI Credits (Top HUD) - Step 2 Target */}
            <div
              id="tour-target-hud-zeni"
              onClick={() => {
                playTacticalSound('click');
                setCurrencyModalTab('zeni');
                setCurrencyModalOpen(true);
              }}
              className={`glass-card px-3 py-1.5 rounded-xl transition-all duration-300 cursor-pointer flex items-center gap-2 group relative ${
                tourOpen && activeStepData?.targetId === 'tour-target-hud-zeni'
                  ? 'border-2 border-emerald-400 ring-4 ring-emerald-400/90 shadow-[0_0_30px_rgba(16,185,129,0.9)] z-40 bg-slate-900 scale-105'
                  : 'border border-emerald-500/30 hover:border-emerald-500/60'
              }`}
              title="Click to inspect 🪙 ZENI Escrow (₹1 INR)"
            >
              <div className="w-7 h-7 rounded-lg bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400 text-xs">
                <Coins className="w-3.5 h-3.5" />
              </div>
              <div>
                <div className="flex items-center gap-1">
                  <p className="text-[9px] font-mono text-emerald-300 uppercase leading-none font-bold">
                    {role === 'CLIENT' ? '🪙 ZENI Locked' : '🪙 ZENI Cash'}
                  </p>
                  <Info className="w-2.5 h-2.5 text-muted-foreground group-hover:text-emerald-300" />
                </div>
                <p className="text-xs sm:text-sm font-mono font-bold text-emerald-400 leading-tight">
                  {role === 'CLIENT'
                    ? `₹${escrowLockedBalance.toLocaleString()}`
                    : `₹${cashBalance.toLocaleString()}`}
                  <span className="text-[9px] font-normal text-muted-foreground ml-1">1:1 INR</span>
                </p>
              </div>
            </div>

            {/* Currency 3: Trust Integrity Index */}
            <div className="glass-card px-3 py-1.5 rounded-xl border border-purple-500/30 flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-purple-500/20 border border-purple-500/40 flex items-center justify-center text-purple-400 text-xs">
                <ShieldCheck className="w-3.5 h-3.5" />
              </div>
              <div>
                <p className="text-[9px] font-mono text-purple-300 uppercase leading-none font-bold">Trust Score</p>
                <p className="text-xs sm:text-sm font-mono font-bold text-purple-300 leading-tight">
                  98.4% <span className="text-[9px] font-normal text-emerald-400">Clean</span>
                </p>
              </div>
            </div>

            {/* Actions: Audio, Alerts, Home */}
            <div className="flex items-center gap-1 pl-2 border-l border-white/10">
              {/* Sound Toggle */}
              <button
                type="button"
                onClick={() => {
                  setSoundEnabled(!soundEnabled);
                  if (!soundEnabled) playTacticalSound('click');
                }}
                className={`p-2 rounded-xl border transition-all ${
                  soundEnabled
                    ? 'bg-white/10 border-white/20 text-primary'
                    : 'bg-black/40 border-white/5 text-muted-foreground'
                }`}
                title={soundEnabled ? 'SFX Audio Enabled' : 'SFX Audio Muted'}
              >
                {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
              </button>

              {/* Alert Bell */}
              <div className="relative">
                <button
                  type="button"
                  onClick={() => {
                    playTacticalSound('click');
                    setAlertsOpen(!alertsOpen);
                  }}
                  className="p-2 rounded-xl bg-white/5 border border-white/10 hover:border-white/25 text-slate-300 transition-all relative"
                  title="Notifications"
                >
                  <Bell className="w-4 h-4" />
                  <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-red-500 animate-ping" />
                </button>

                {/* Notifications Dropdown */}
                {alertsOpen && (
                  <div className="absolute right-0 mt-2 w-72 sm:w-80 rounded-2xl glass-card border border-white/20 bg-slate-950/95 p-3 shadow-2xl z-50 animate-fadeIn font-mono">
                    <div className="flex items-center justify-between pb-2 mb-2 border-b border-white/10">
                      <span className="text-xs font-bold text-foreground flex items-center gap-1.5">
                        <Terminal className="w-3.5 h-3.5 text-primary" />
                        Tactical Alerts (3)
                      </span>
                      <button
                        type="button"
                        onClick={() => setAlertsOpen(false)}
                        className="text-muted-foreground hover:text-white"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    </div>
                    <div className="space-y-2 text-xs">
                      <div className="p-2 rounded-xl bg-purple-500/10 border border-purple-500/20 text-purple-200">
                        <p className="font-semibold text-[11px]">Peer Review Assigned</p>
                        <p className="text-[10px] text-muted-foreground mt-0.5">
                          Senior Mentor Vance ready to inspect your Next.js PR.
                        </p>
                      </div>
                      <div className="p-2 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-200">
                        <p className="font-semibold text-[11px]">Smart Escrow Funded</p>
                        <p className="text-[10px] text-muted-foreground mt-0.5">
                          ₹25,000 project locked in escrow for FinTech Dashboard.
                        </p>
                      </div>
                      <div className="p-2 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-200">
                        <p className="font-semibold text-[11px]">Fair Play Safety Scan</p>
                        <p className="text-[10px] text-muted-foreground mt-0.5">
                          100% clean check. Zero plagiarism strikes logged.
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Home / Exit Icon */}
              <Link
                href="/"
                onClick={() => playTacticalSound('click')}
                className="p-2 rounded-xl bg-white/5 border border-white/10 hover:border-white/25 text-slate-300 hover:text-red-400 transition-all"
                title="Return to Public Website"
              >
                <LogOut className="w-4 h-4" />
              </Link>
            </div>

          </div>

        </div>
      </header>

      {/* ========================================================================= */}
      {/* TOAST ALERT NOTIFICATION */}
      {/* ========================================================================= */}
      {toastMessage && (
        <div className="fixed top-20 right-6 z-50 animate-bounce">
          <div className="px-4 py-2.5 rounded-xl glass-card border border-primary/40 bg-slate-950/95 text-xs font-mono text-white shadow-2xl flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-accent" />
            <span>{toastMessage}</span>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TOP KPI METRICS STRIP */}
      {/* ========================================================================= */}
      <div className="max-w-7xl w-full mx-auto px-4 sm:px-6 pt-5 pb-1 relative z-10">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5">
          {/* KPI 1: MANA Credit Balance */}
          <div
            id="tour-target-kpi-mana"
            onClick={() => {
              playTacticalSound('click');
              setCurrencyModalTab('mana');
              setCurrencyModalOpen(true);
            }}
            className="glass-card rounded-2xl p-4 border border-amber-500/25 hover:border-amber-500/60 bg-gradient-to-br from-slate-950/80 to-amber-950/20 transition-all cursor-pointer group shadow-lg"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] font-mono uppercase tracking-widest text-amber-300/90 font-bold flex items-center gap-1.5">
                <Zap className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                ⚡ MANA Vault
              </span>
              <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30 group-hover:bg-amber-500/30">
                Skill Barter
              </span>
            </div>
            <div className="text-xl sm:text-2xl font-black font-mono text-white">
              {xpBalance.toLocaleString()}{' '}
              <span className="text-xs font-normal text-amber-400">XP</span>
            </div>
            <p className="text-[11px] font-mono text-muted-foreground mt-1 flex items-center justify-between">
              <span>Peer Skill Barter</span>
              <span className="text-amber-400 font-bold">+150 Today</span>
            </p>
          </div>

          {/* KPI 2: ZENI Escrow Cash */}
          <div
            id="tour-target-kpi-zeni"
            onClick={() => {
              playTacticalSound('click');
              setCurrencyModalTab('zeni');
              setCurrencyModalOpen(true);
            }}
            className="glass-card rounded-2xl p-4 border border-emerald-500/25 hover:border-emerald-500/60 bg-gradient-to-br from-slate-950/80 to-emerald-950/20 transition-all cursor-pointer group shadow-lg"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] font-mono uppercase tracking-widest text-emerald-300/90 font-bold flex items-center gap-1.5">
                <Coins className="w-3.5 h-3.5 text-emerald-400" />
                🪙 ZENI Credits
              </span>
              <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 group-hover:bg-emerald-500/30">
                1 ZENI = ₹1
              </span>
            </div>
            <div className="text-xl sm:text-2xl font-black font-mono text-emerald-400">
              {role === 'CLIENT' ? `₹${escrowLockedBalance.toLocaleString()}` : `₹${cashBalance.toLocaleString()}`}
            </div>
            <p className="text-[11px] font-mono text-muted-foreground mt-1 flex items-center justify-between">
              <span>100% Escrow Backed</span>
              <span className="text-emerald-400 font-bold">₹0 Risk</span>
            </p>
          </div>

          {/* KPI 3: Trust Integrity Index */}
          <div
            onClick={() => {
              playTacticalSound('click');
              setActiveTab('court_martial');
            }}
            className="glass-card rounded-2xl p-4 border border-purple-500/25 hover:border-purple-500/60 bg-gradient-to-br from-slate-950/80 to-purple-950/20 transition-all cursor-pointer group shadow-lg"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] font-mono uppercase tracking-widest text-purple-300/90 font-bold flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-purple-400" />
                Trust Integrity
              </span>
              <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-purple-500/20 text-purple-300 border border-purple-500/30">
                Fair Play
              </span>
            </div>
            <div className="text-xl sm:text-2xl font-black font-mono text-purple-200">
              98.4%
            </div>
            <p className="text-[11px] font-mono text-muted-foreground mt-1 flex items-center justify-between">
              <span>0 Strikes Logged</span>
              <span className="text-emerald-400 font-bold">Verified</span>
            </p>
          </div>

          {/* KPI 4: Active Syndicate Unit */}
          <div
            onClick={() => {
              playTacticalSound('click');
              setActiveTab('guild');
            }}
            className="glass-card rounded-2xl p-4 border border-blue-500/25 hover:border-blue-500/60 bg-gradient-to-br from-slate-950/80 to-blue-950/20 transition-all cursor-pointer group shadow-lg"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] font-mono uppercase tracking-widest text-blue-300/90 font-bold flex items-center gap-1.5">
                <Users className="w-3.5 h-3.5 text-blue-400" />
                Active Squad
              </span>
              <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-blue-500/20 text-blue-300 border border-blue-500/30">
                Dwarka Node
              </span>
            </div>
            <div className="text-xl sm:text-2xl font-black font-mono text-slate-100">
              {role === 'RNK-E' ? 'Cadet #4' : role === 'RNK-C' ? 'Lead Lead' : 'Apex Sponsor'}
            </div>
            <p className="text-[11px] font-mono text-muted-foreground mt-1 flex items-center justify-between">
              <span>Dwarka Strike Unit</span>
              <span className="text-primary font-bold">#4 in Delhi</span>
            </p>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* MAIN LOBBY GRID: LEFT RAIL + CENTER STAGE + RIGHT SQUAD */}
      {/* ========================================================================= */}
      <div className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 grid grid-cols-1 lg:grid-cols-12 gap-5 relative z-10">
        
        {/* ======================================================================= */}
        {/* 2. LEFT TACTICAL MENU (Vertical Rail - 3 Cols on lg) */}
        {/* ======================================================================= */}
        <div className="lg:col-span-3 flex flex-col gap-3">
          <div className="glass-card rounded-2xl p-3 border border-white/10 bg-slate-950/70 shadow-xl space-y-1.5">
            <div className="px-3 py-1 mb-1 text-[10px] font-mono text-muted-foreground tracking-widest uppercase flex items-center justify-between">
              <span>Tactical Rail</span>
              <span className="text-primary font-bold">READY</span>
            </div>

            {[
              { id: 'command', label: 'Command Lobby', icon: Terminal, badge: 'HOME' },
              { id: 'missions', label: 'Bounty Feed', icon: Crosshair, badge: '6 LIVE' },
              { id: 'armory', label: 'Proof Armory', icon: ShieldCheck, badge: '8 SKILLS' },
              { id: 'guild', label: 'Squad HQ', icon: Users, badge: 'ACTIVE' },
              { id: 'escrow', label: 'Escrow Vault', icon: Lock, badge: 'PROTECTED' },
              { id: 'court_martial', label: 'Fair Play Rules', icon: AlertTriangle, badge: '0 FLAGS' },
            ].map((tab) => {
              const Icon = tab.icon;
              const isSelected = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => {
                    playTacticalSound('click');
                    setActiveTab(tab.id as TacticalView);
                  }}
                  className={`w-full px-3 py-2.5 rounded-xl text-left transition-all flex items-center justify-between group relative overflow-hidden ${
                    isSelected
                      ? 'bg-gradient-to-r from-primary/30 to-purple-900/20 border border-primary text-white shadow-[0_0_15px_rgba(139,92,246,0.25)]'
                      : 'bg-white/5 border border-white/5 text-muted-foreground hover:bg-white/10 hover:text-foreground'
                  }`}
                >
                  <div className="flex items-center gap-2.5 relative z-10">
                    <Icon
                      className={`w-4 h-4 ${
                        isSelected ? 'text-primary' : 'group-hover:text-primary'
                      } transition-colors`}
                    />
                    <span className="text-xs font-mono font-bold tracking-wide">{tab.label}</span>
                  </div>
                  <span
                    className={`text-[9px] font-mono px-2 py-0.5 rounded uppercase tracking-wider relative z-10 ${
                      isSelected
                        ? 'bg-primary text-white font-bold'
                        : 'bg-white/10 text-muted-foreground'
                    }`}
                  >
                    {tab.badge}
                  </span>
                  {isSelected && (
                    <span className="absolute left-0 top-0 bottom-0 w-1 bg-accent" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Quick Explainer Trigger Card */}
          <div className="glass-card rounded-2xl p-4 border border-purple-500/20 bg-gradient-to-b from-slate-950/70 to-purple-950/30 text-xs font-mono space-y-2.5">
            <div className="flex items-center justify-between pb-1 border-b border-white/10">
              <span className="text-purple-300 font-bold uppercase text-[10px] tracking-wider flex items-center gap-1.5">
                <Compass className="w-3.5 h-3.5 text-accent" />
                Live Walkthrough Guider
              </span>
            </div>
            <p className="text-[11px] text-muted-foreground leading-relaxed">
              Step-by-step element-attached speech notes dekhne ke liye click karein.
            </p>
            <div className="flex gap-2 pt-1">
              <button
                type="button"
                onClick={() => {
                  playTacticalSound('deploy');
                  setCurrentTourStep(0);
                  setTourOpen(true);
                }}
                className="w-full py-1.5 rounded-lg bg-primary/20 hover:bg-primary/30 border border-primary/40 text-primary text-[11px] font-bold transition-all flex items-center justify-center gap-1"
              >
                <Sparkles className="w-3 h-3" />
                Start Tour
              </button>
              <button
                type="button"
                onClick={() => {
                  playTacticalSound('click');
                  setCurrencyModalTab('both');
                  setCurrencyModalOpen(true);
                }}
                className="w-full py-1.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-slate-300 text-[11px] transition-all flex items-center justify-center gap-1"
              >
                <Info className="w-3 h-3" />
                MANA vs ZENI
              </button>
            </div>
          </div>

          {/* Operative Quick Specs Card */}
          <div className="glass-card rounded-2xl p-4 border border-white/10 bg-slate-950/70 text-xs font-mono space-y-2.5">
            <div className="flex items-center justify-between pb-2 border-b border-white/10">
              <span className="text-slate-400 uppercase text-[10px] tracking-wider">Campus Hardware Node</span>
              <span className="text-emerald-400 font-bold text-[10px]">OPTIMAL</span>
            </div>
            <div className="space-y-1.5 text-[11px] text-muted-foreground">
              <div className="flex justify-between">
                <span>Campus Node:</span>
                <span className="text-slate-200">DSEU Dwarka #4</span>
              </div>
              <div className="flex justify-between">
                <span>Specialization:</span>
                <span className="text-purple-300">Full-Stack & UI</span>
              </div>
              <div className="flex justify-between">
                <span>Consensus Rating:</span>
                <span className="text-amber-400 font-bold">4.92 / 5.00 ★</span>
              </div>
              <div className="flex justify-between">
                <span>Latency to Escrow:</span>
                <span className="text-emerald-400">12ms (Multi-Sig)</span>
              </div>
            </div>
          </div>
        </div>

        {/* ======================================================================= */}
        {/* 3. CENTER STAGE (The Operative Showcase Area - 6 Cols on lg) */}
        {/* ======================================================================= */}
        <div className="lg:col-span-6 flex flex-col gap-4">
          
          {/* TAB 1: COMMAND LOBBY OVERVIEW */}
          {activeTab === 'command' && (
            <>
              {/* Dynamic Holo-Card Frame */}
              <div className="glass-card rounded-3xl p-6 sm:p-8 border border-white/15 bg-gradient-to-b from-slate-900/80 to-slate-950/95 relative overflow-hidden shadow-2xl backdrop-blur-2xl">
                {/* Tech Gyro & Corner brackets */}
                <div className="absolute top-3 left-3 w-4 h-4 border-t-2 border-l-2 border-primary" />
                <div className="absolute top-3 right-3 w-4 h-4 border-t-2 border-r-2 border-primary" />
                <div className="absolute bottom-3 left-3 w-4 h-4 border-b-2 border-l-2 border-primary" />
                <div className="absolute bottom-3 right-3 w-4 h-4 border-b-2 border-r-2 border-primary" />

                {/* Cyber Watermark */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[5rem] font-black text-white/[0.02] font-mono tracking-tighter pointer-events-none select-none">
                  {role}
                </div>

                {/* Holo Emblem Showcase */}
                <div className="flex flex-col items-center text-center relative z-10 mb-6">
                  {/* Glowing Animated Rank Ring */}
                  <div className="relative mb-4">
                    <div
                      className={`w-28 h-28 rounded-full flex items-center justify-center p-1 border-2 relative transition-all float-anim ${
                        role === 'RNK-E'
                          ? 'border-amber-400/80 shadow-[0_0_35px_rgba(245,158,11,0.4)]'
                          : role === 'RNK-C'
                          ? 'border-purple-500/80 shadow-[0_0_35px_rgba(139,92,246,0.4)]'
                          : 'border-emerald-400/80 shadow-[0_0_35px_rgba(16,185,129,0.4)]'
                      }`}
                    >
                      <div className="w-full h-full rounded-full bg-slate-950 flex flex-col items-center justify-center border border-white/15">
                        <span
                          className={`text-2xl font-black font-mono tracking-tight ${
                            role === 'RNK-E'
                              ? 'text-amber-400'
                              : role === 'RNK-C'
                              ? 'text-purple-300'
                              : 'text-emerald-400'
                          }`}
                        >
                          {role}
                        </span>
                        <span className="text-[9px] font-mono text-muted-foreground uppercase">
                          {role === 'RNK-E' ? 'Cadet Node' : role === 'RNK-C' ? 'Lead Node' : 'Client'}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Operative Header */}
                  <h3 className="text-xl sm:text-2xl font-black text-foreground tracking-tight">
                    {role === 'RNK-E' && 'OPERATIVE STATUS: CADET (LEARNING MODE)'}
                    {role === 'RNK-C' && 'OPERATIVE STATUS: SQUAD EVALUATOR'}
                    {role === 'CLIENT' && 'TERMINAL: ENTERPRISE CLIENT'}
                  </h3>
                  <p className="text-xs text-muted-foreground font-mono mt-1 max-w-md">
                    {role === 'RNK-E' &&
                      'Cadet Induction Protocol Active. Peer-validated proof required to unlock paid bounties.'}
                    {role === 'RNK-C' &&
                      'Authorized to evaluate Rank-E submissions, build multi-disciplinary squads, and release escrow.'}
                    {role === 'CLIENT' &&
                      'Pre-fund deliverables into smart escrow to deploy verified student engineering cells.'}
                  </p>
                </div>

                {/* ROLE-SPECIFIC INNER STAGE WIDGETS */}

                {/* 1. RNK-E VIEW: AMBER WARNING + PROOF SUBMISSION (Target for Tour Step 4) */}
                {role === 'RNK-E' && (
                  <div className="space-y-4 relative z-10">
                    {/* Flashing Alert Banner */}
                    <div className="p-4 rounded-2xl bg-amber-500/15 border border-amber-500/40 text-amber-300 flex items-start gap-3 shadow-lg">
                      <AlertTriangle className="w-5 h-5 flex-shrink-0 text-amber-400 mt-0.5 animate-bounce" />
                      <div>
                        <h4 className="text-xs font-mono font-bold tracking-wider uppercase">
                          OPERATIONAL EARNINGS LOCKED // CADET PROBATION
                        </h4>
                        <p className="text-[11px] text-amber-200/80 leading-relaxed mt-1">
                          Mandatory peer consensus required. Pass practical verification via a Rank-C Senior Mentor to unlock paid bounty channels and start earning real ₹ payouts.
                        </p>
                      </div>
                    </div>

                    {/* Proof Submission Widget (Target for Step 4) */}
                    <div
                      id="tour-target-proof"
                      className={`p-4 rounded-2xl transition-all duration-300 space-y-3 relative ${
                        tourOpen && activeStepData?.targetId === 'tour-target-proof'
                          ? 'border-2 border-primary ring-4 ring-primary shadow-[0_0_35px_rgba(139,92,246,0.85)] z-40 bg-slate-900 scale-[1.01]'
                          : 'bg-white/5 border border-white/10'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-mono font-bold text-foreground flex items-center gap-1.5">
                          <Code2 className="w-4 h-4 text-primary" />
                          Submit Proof of Work (GitHub / Figma / Drive)
                        </span>
                        <span className="text-[10px] font-mono text-muted-foreground">RNK-C Queue</span>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-mono">
                        <select
                          value={proofType}
                          onChange={(e) => setProofType(e.target.value)}
                          className="px-3 py-2 rounded-xl bg-slate-900 border border-white/15 text-slate-200 text-xs focus:outline-none"
                        >
                          <option>Web & App Dev</option>
                          <option>UI/UX & Graphics</option>
                          <option>Content Writing</option>
                          <option>Video & Animation</option>
                        </select>
                        <input
                          type="text"
                          value={proofLink}
                          onChange={(e) => setProofLink(e.target.value)}
                          placeholder="Link: https://github.com/... or Figma"
                          className="px-3 py-2 rounded-xl bg-slate-900 border border-white/15 text-slate-200 text-xs focus:outline-none placeholder:text-muted-foreground/60"
                        />
                      </div>

                      <button
                        type="button"
                        onClick={handleProofSubmit}
                        className="w-full py-2.5 rounded-xl shimmer-btn text-white text-xs font-mono font-bold flex items-center justify-center gap-2 shadow-lg"
                      >
                        <Send className="w-3.5 h-3.5" />
                        Transmit Proof to Consensus Queue
                      </button>

                      {proofSubmitted && (
                        <p className="text-[11px] font-mono text-emerald-400 text-center flex items-center justify-center gap-1">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          Proof Queued! Assigned Evaluator: Vance (3rd Year Lead).
                        </p>
                      )}
                    </div>
                  </div>
                )}

                {/* 2. RNK-C VIEW: RANK B PROGRESS + CADET EVALUATION DRAWER */}
                {role === 'RNK-C' && (
                  <div className="space-y-5 relative z-10">
                    {/* Rank B Progress Bar */}
                    <div className="p-4 rounded-2xl bg-purple-950/40 border border-purple-500/30 space-y-2">
                      <div className="flex justify-between text-xs font-mono">
                        <span className="text-purple-300 font-bold">Progression to RNK-B (Senior Architect)</span>
                        <span className="text-accent font-bold">80% COMPLETE</span>
                      </div>
                      <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
                        <div className="h-full bg-gradient-to-r from-purple-500 to-amber-400 rounded-full w-4/5 transition-all duration-500" />
                      </div>
                      <div className="flex justify-between text-[10px] font-mono text-muted-foreground">
                        <span>Bounties: 12/15 Complete</span>
                        <span>Capital Settled: ₹18,500 / ₹25,000</span>
                      </div>
                    </div>

                    {/* Pending Cadet Verifications Drawer */}
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <h4 className="text-xs font-mono font-bold text-foreground flex items-center gap-1.5">
                          <Users className="w-3.5 h-3.5 text-primary" />
                          Pending Cadet Verifications ({cadetQueue.filter((c) => c.status === 'pending').length})
                        </h4>
                        <span className="text-[10px] font-mono text-purple-400">+150 MANA per Evaluation</span>
                      </div>

                      <div className="space-y-2 max-h-56 overflow-y-auto pr-1">
                        {cadetQueue.map((cadet) => (
                          <div
                            key={cadet.id}
                            className={`p-3 rounded-2xl border transition-all text-xs font-mono space-y-1.5 ${
                              cadet.status === 'approved'
                                ? 'bg-emerald-950/20 border-emerald-500/40 opacity-75'
                                : cadet.status === 'rejected'
                                ? 'bg-red-950/20 border-red-500/30 opacity-75'
                                : 'bg-white/5 border-white/10 hover:border-purple-500/40'
                            }`}
                          >
                            <div className="flex items-center justify-between">
                              <span className="font-bold text-foreground">{cadet.name}</span>
                              <span className="text-[10px] text-muted-foreground">{cadet.category}</span>
                            </div>
                            <p className="text-[11px] text-slate-300 line-clamp-1">{cadet.title}</p>
                            
                            <div className="flex items-center justify-between pt-1">
                              <a
                                href={cadet.link}
                                target="_blank"
                                rel="noreferrer"
                                className="text-[10px] text-primary hover:underline flex items-center gap-1"
                              >
                                <ExternalLink className="w-3 h-3" />
                                Inspect Repository
                              </a>

                              {cadet.status === 'pending' ? (
                                <div className="flex items-center gap-1.5">
                                  <button
                                    type="button"
                                    onClick={() => handleApproveCadet(cadet.id, cadet.name)}
                                    className="px-2.5 py-1 rounded-lg bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 hover:bg-emerald-500/30 text-[10px] font-bold flex items-center gap-1 transition-all"
                                  >
                                    <Check className="w-3 h-3" />
                                    Approve RNK-D
                                  </button>
                                  <button
                                    type="button"
                                    onClick={() => handleRejectCadet(cadet.id, cadet.name)}
                                    className="px-2 py-1 rounded-lg bg-red-500/20 border border-red-500/30 text-red-300 hover:bg-red-500/30 text-[10px] transition-all"
                                  >
                                    Flag
                                  </button>
                                </div>
                              ) : (
                                <span
                                  className={`text-[10px] font-bold uppercase ${
                                    cadet.status === 'approved' ? 'text-emerald-400' : 'text-red-400'
                                  }`}
                                >
                                  {cadet.status === 'approved' ? '✓ Verified to RNK-D' : '✗ Flagged'}
                                </span>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* 3. CLIENT VIEW: ESCROW DEPOSIT FLOW */}
                {role === 'CLIENT' && (
                  <div className="space-y-4 relative z-10">
                    <div className="p-4 rounded-2xl bg-emerald-950/40 border border-emerald-500/40 text-emerald-200 flex items-start gap-3 shadow-lg">
                      <ShieldCheck className="w-5 h-5 flex-shrink-0 text-emerald-400 mt-0.5" />
                      <div>
                        <h4 className="text-xs font-mono font-bold tracking-wider uppercase">
                          ENTERPRISE ESCROW TERMINAL // CAPITAL PROTECTED
                        </h4>
                        <p className="text-[11px] text-emerald-200/80 leading-relaxed mt-1">
                          Deposit sprint bounties into multi-sig smart escrow. 0% counterparty risk: funds only release when you approve final project milestones.
                        </p>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3 text-center text-xs font-mono">
                      <div className="p-3 rounded-2xl bg-white/5 border border-white/10">
                        <p className="text-muted-foreground text-[10px]">Active Locked Escrow</p>
                        <p className="text-lg font-bold text-emerald-400 mt-0.5">₹60,000</p>
                      </div>
                      <div className="p-3 rounded-2xl bg-white/5 border border-white/10">
                        <p className="text-muted-foreground text-[10px]">Active Squads</p>
                        <p className="text-lg font-bold text-purple-300 mt-0.5">3 Units</p>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => {
                        playTacticalSound('deploy');
                        setClientModalOpen(true);
                      }}
                      className="w-full py-3 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-mono font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-[0_0_25px_rgba(16,185,129,0.3)] hover:scale-[1.01] transition-transform"
                    >
                      <Plus className="w-4 h-4" />
                      Deploy New Bounty Contract Into Escrow
                    </button>
                  </div>
                )}
              </div>
            </>
          )}

          {/* TAB 2: MISSIONS (BOUNTY MARKETPLACE FEED WITH SEARCH & FILTERS) (Target for Step 5) */}
          {activeTab === 'missions' && (
            <div
              id="tour-target-missions"
              className={`glass-card rounded-3xl p-6 transition-all duration-300 space-y-4 relative ${
                tourOpen && activeStepData?.targetId === 'tour-target-missions'
                  ? 'border-2 border-primary ring-4 ring-primary shadow-[0_0_35px_rgba(139,92,246,0.85)] z-40 bg-slate-900 scale-[1.01]'
                  : 'border border-white/10 bg-slate-950/80'
              }`}
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-white/10 gap-2">
                <div>
                  <h3 className="text-base font-mono font-bold text-foreground flex items-center gap-2">
                    <Crosshair className="w-4 h-4 text-accent" />
                    Marketplace Bounties Feed
                  </h3>
                  <p className="text-xs text-muted-foreground font-mono">Escrow-backed client deliverables</p>
                </div>
                
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-[10px] font-mono font-bold">
                    100% ESCROW LOCKED
                  </span>
                  
                  {/* View Mode Switcher (Grid vs List - Ref ERP Screenshot) */}
                  <div className="flex items-center bg-white/5 p-1 rounded-xl border border-white/10">
                    <button
                      type="button"
                      onClick={() => setViewMode('grid')}
                      className={`p-1.5 rounded-lg transition-all ${
                        viewMode === 'grid' ? 'bg-primary text-white' : 'text-muted-foreground hover:text-white'
                      }`}
                      title="Grid Card View"
                    >
                      <LayoutGrid className="w-3.5 h-3.5" />
                    </button>
                    <button
                      type="button"
                      onClick={() => setViewMode('list')}
                      className={`p-1.5 rounded-lg transition-all ${
                        viewMode === 'list' ? 'bg-primary text-white' : 'text-muted-foreground hover:text-white'
                      }`}
                      title="Table List View"
                    >
                      <List className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Search & Filter Bar (ERP / Mobile App Pattern) */}
              <div className="space-y-2.5 font-mono text-xs">
                {/* Search Bar */}
                <div className="relative">
                  <Search className="w-4 h-4 text-muted-foreground absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search bounties by name, client, or tech (Next.js, Figma)..."
                    className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-slate-900 border border-white/15 text-slate-200 text-xs focus:outline-none focus:border-primary/60 placeholder:text-muted-foreground/60"
                  />
                  {searchQuery && (
                    <button
                      type="button"
                      onClick={() => setSearchQuery('')}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-white"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>

                {/* Category Filter Pills */}
                <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-[11px]">
                  <span className="text-[10px] text-muted-foreground flex items-center gap-1 mr-1 flex-shrink-0">
                    <Filter className="w-3 h-3 text-primary" /> Filter:
                  </span>
                  {['All', 'Web & App Dev', 'UI/UX & Graphics', 'Video & Animation', 'Content Writing', 'AI & Machine Learning'].map((cat) => (
                    <button
                      key={cat}
                      type="button"
                      onClick={() => setSelectedCategory(cat)}
                      className={`px-2.5 py-1 rounded-lg border transition-all whitespace-nowrap flex-shrink-0 ${
                        selectedCategory === cat
                          ? 'bg-primary/25 border-primary text-white font-bold'
                          : 'bg-white/5 border-white/5 text-muted-foreground hover:bg-white/10 hover:text-slate-200'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              {/* Bounties Display (Grid or List) */}
              {filteredMissions.length === 0 ? (
                <div className="text-center py-10 font-mono text-xs text-muted-foreground">
                  <p>No active bounties match your search filter.</p>
                  <button
                    type="button"
                    onClick={() => {
                      setSearchQuery('');
                      setSelectedCategory('All');
                    }}
                    className="mt-2 text-primary hover:underline"
                  >
                    Reset Filters
                  </button>
                </div>
              ) : viewMode === 'grid' ? (
                /* GRID VIEW */
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {filteredMissions.map((m) => (
                    <div
                      key={m.id}
                      className="p-4 rounded-2xl bg-white/5 border border-white/10 hover:border-primary/50 transition-all font-mono text-xs space-y-3 flex flex-col justify-between group"
                    >
                      <div>
                        <div className="flex items-center justify-between mb-1.5">
                          <span className="text-[9px] px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700 uppercase">
                            {m.category}
                          </span>
                          <span className="text-emerald-400 font-bold text-sm">
                            ₹{m.reward.toLocaleString()}
                          </span>
                        </div>
                        <h4 className="text-foreground font-bold text-xs group-hover:text-primary transition-colors leading-snug">
                          {m.title}
                        </h4>
                      </div>

                      <div className="pt-2 border-t border-white/5 space-y-2">
                        <div className="flex items-center justify-between text-[10px] text-muted-foreground">
                          <span>Client: <strong className="text-slate-300">{m.client}</strong></span>
                          <span>Min: <strong className="text-purple-300">{m.minRank}</strong></span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] text-amber-400 font-bold flex items-center gap-1">
                            <Zap className="w-3 h-3 fill-amber-400" />
                            +{m.xpReward} MANA
                          </span>
                          <button
                            type="button"
                            onClick={() => {
                              playTacticalSound('deploy');
                              showToast(`🎯 Claim request for "${m.title}" sent to Escrow Vault!`);
                            }}
                            className="px-3 py-1 rounded-lg bg-primary/20 border border-primary/40 text-primary hover:bg-primary/30 font-bold transition-all text-[11px]"
                          >
                            Claim Task
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                /* LIST / TABLE VIEW (Ref: Shiksha Plus ERP Desktop) */
                <div className="border border-white/10 rounded-2xl overflow-hidden font-mono text-xs">
                  <div className="bg-slate-900/90 px-3 py-2 grid grid-cols-12 gap-2 text-[10px] uppercase font-bold text-muted-foreground border-b border-white/10">
                    <span className="col-span-2">ID</span>
                    <span className="col-span-4">Bounty Title</span>
                    <span className="col-span-2">Domain</span>
                    <span className="col-span-2">Payout (₹)</span>
                    <span className="col-span-2 text-right">Action</span>
                  </div>
                  <div className="divide-y divide-white/5">
                    {filteredMissions.map((m) => (
                      <div
                        key={m.id}
                        className="px-3 py-2.5 grid grid-cols-12 gap-2 items-center hover:bg-white/5 transition-colors"
                      >
                        <span className="col-span-2 text-[10px] text-slate-400">{m.id}</span>
                        <div className="col-span-4">
                          <p className="text-slate-200 font-bold text-xs truncate">{m.title}</p>
                          <p className="text-[10px] text-muted-foreground">{m.client}</p>
                        </div>
                        <span className="col-span-2 text-[10px] text-slate-300 truncate">{m.category}</span>
                        <div className="col-span-2">
                          <span className="text-emerald-400 font-bold">₹{m.reward.toLocaleString()}</span>
                          <p className="text-[9px] text-amber-400">+{m.xpReward} MANA</p>
                        </div>
                        <div className="col-span-2 text-right">
                          <button
                            type="button"
                            onClick={() => {
                              playTacticalSound('deploy');
                              showToast(`🎯 Claimed ${m.title}!`);
                            }}
                            className="px-2.5 py-1 rounded-lg bg-primary/20 hover:bg-primary/30 border border-primary/40 text-primary text-[10px] font-bold transition-all"
                          >
                            Claim
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* TAB 3: PROOF ARMORY */}
          {activeTab === 'armory' && (
            <div className="glass-card rounded-3xl p-6 border border-white/10 bg-slate-950/80 space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-white/10">
                <div>
                  <h3 className="text-base font-mono font-bold text-foreground flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-purple-400" />
                    Proof-of-Skill Armory
                  </h3>
                  <p className="text-xs text-muted-foreground font-mono">Verified badges & cryptographic signals</p>
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {[
                  { name: 'Next.js App Router', level: 'Level 4 // Expert', icon: Code2, color: '#3b82f6' },
                  { name: 'UI Systems & Figma', level: 'Level 3 // Advanced', icon: Palette, color: '#a855f7' },
                  { name: 'Video Reel Motion', level: 'Level 2 // Active', icon: Video, color: '#b81d42' },
                  { name: 'Technical Copywriting', level: 'Level 3 // Advanced', icon: PenTool, color: '#10b981' },
                  { name: 'Escrow Multi-Sig Audit', level: 'Level 4 // Expert', icon: Lock, color: '#8b5cf6' },
                  { name: 'Peer Mentoring Gate', level: 'Level 3 // Evaluator', icon: Users, color: '#ec4899' },
                ].map((skill) => {
                  const Icon = skill.icon;
                  return (
                    <div
                      key={skill.name}
                      className="p-3.5 rounded-2xl bg-white/5 border border-white/10 font-mono text-center space-y-1.5 hover:scale-[1.02] transition-transform"
                    >
                      <div
                        className="w-10 h-10 rounded-xl mx-auto flex items-center justify-center border"
                        style={{
                          background: `${skill.color}15`,
                          borderColor: `${skill.color}40`,
                          color: skill.color,
                        }}
                      >
                        <Icon className="w-5 h-5" />
                      </div>
                      <p className="text-xs font-bold text-foreground">{skill.name}</p>
                      <p className="text-[10px] text-muted-foreground">{skill.level}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* TAB 4: SQUAD HQ */}
          {activeTab === 'guild' && (
            <div className="glass-card rounded-3xl p-6 border border-white/10 bg-slate-950/80 space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-white/10">
                <div>
                  <h3 className="text-base font-mono font-bold text-foreground flex items-center gap-2">
                    <Users className="w-4 h-4 text-purple-400" />
                    Multi-Skill Student Guild HQ
                  </h3>
                  <p className="text-xs text-muted-foreground font-mono">Squad: Dwarka Rapid Strike Unit</p>
                </div>
                <span className="text-xs font-mono font-bold text-amber-400">#4 IN DELHI CLUSTER</span>
              </div>

              <div className="p-4 rounded-2xl bg-purple-950/30 border border-purple-500/30 font-mono text-xs space-y-2">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Guild Total Escrow Delivered:</span>
                  <span className="text-emerald-400 font-bold">₹1,42,000</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Sprint Success Rate:</span>
                  <span className="text-purple-300 font-bold">97.4% (38/39 Delivered)</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Attached Cadets Mentored:</span>
                  <span className="text-amber-400 font-bold">6 Cadets Promoted</span>
                </div>
              </div>

              <button
                type="button"
                onClick={() => {
                  playTacticalSound('promote');
                  showToast('🏆 Guild War roster refreshed! Synced with DTU & NSUT campus nodes.');
                }}
                className="w-full py-2.5 rounded-xl shimmer-btn text-white text-xs font-mono font-bold flex items-center justify-center gap-2 shadow-lg"
              >
                <Sparkles className="w-3.5 h-3.5" />
                Inspect Inter-College Guild Leaderboard
              </button>
            </div>
          )}

          {/* TAB 5: ESCROW VAULT VISUALIZER (Target for Step 6) */}
          {activeTab === 'escrow' && (
            <div
              id="tour-target-escrow"
              className={`glass-card rounded-3xl p-6 transition-all duration-300 space-y-5 relative ${
                tourOpen && activeStepData?.targetId === 'tour-target-escrow'
                  ? 'border-2 border-emerald-400 ring-4 ring-emerald-400 shadow-[0_0_35px_rgba(16,185,129,0.85)] z-40 bg-slate-900 scale-[1.01]'
                  : 'border border-white/10 bg-slate-950/80'
              }`}
            >
              <div className="flex items-center justify-between pb-3 border-b border-white/10">
                <div>
                  <h3 className="text-base font-mono font-bold text-foreground flex items-center gap-2">
                    <Lock className="w-4 h-4 text-emerald-400" />
                    Smart Escrow State Visualizer
                  </h3>
                  <p className="text-xs text-muted-foreground font-mono">100% Guaranteed Payout Architecture</p>
                </div>
              </div>

              {/* 3-Step Escrow Pipeline Visualizer */}
              <div className="grid grid-cols-3 gap-2 font-mono text-center">
                <div
                  className={`p-3 rounded-2xl border transition-all ${
                    escrowStep === 1
                      ? 'bg-amber-500/20 border-amber-500 text-amber-300 shadow-lg'
                      : 'bg-white/5 border-white/10 text-muted-foreground'
                  }`}
                >
                  <span className="text-lg font-bold block mb-1">1</span>
                  <span className="text-xs font-bold block">FUNDS LOCKED</span>
                  <span className="text-[10px] text-muted-foreground">₹25,000 Upfront</span>
                </div>

                <div
                  className={`p-3 rounded-2xl border transition-all ${
                    escrowStep === 2
                      ? 'bg-purple-500/20 border-purple-500 text-purple-300 shadow-lg'
                      : 'bg-white/5 border-white/10 text-muted-foreground'
                  }`}
                >
                  <span className="text-lg font-bold block mb-1">2</span>
                  <span className="text-xs font-bold block">IN REVIEW</span>
                  <span className="text-[10px] text-muted-foreground">Milestone Diff</span>
                </div>

                <div
                  className={`p-3 rounded-2xl border transition-all ${
                    escrowStep === 3
                      ? 'bg-emerald-500/20 border-emerald-500 text-emerald-300 shadow-lg'
                      : 'bg-white/5 border-white/10 text-muted-foreground'
                  }`}
                >
                  <span className="text-lg font-bold block mb-1">3</span>
                  <span className="text-xs font-bold block">RELEASED</span>
                  <span className="text-[10px] text-muted-foreground">85/15 Split</span>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-black/50 border border-white/10 font-mono text-xs space-y-1.5 text-slate-300">
                <div className="flex justify-between">
                  <span>Active Sprint:</span>
                  <strong className="text-white">FinFlow Arbitrage UI</strong>
                </div>
                <div className="flex justify-between">
                  <span>Vault Contract:</span>
                  <span className="text-primary">0x7c3a...8b5c</span>
                </div>
                <div className="flex justify-between">
                  <span>Current State:</span>
                  <span className={escrowStep === 3 ? 'text-emerald-400 font-bold' : 'text-amber-400 font-bold'}>
                    {escrowStep === 1 && 'Locked in Multi-Sig Escrow Vault'}
                    {escrowStep === 2 && 'Deliverable In Review by Client'}
                    {escrowStep === 3 && 'Payment Settled: 85% Guild / 15% Platform'}
                  </span>
                </div>
              </div>

              <button
                type="button"
                disabled={isReleasingEscrow}
                onClick={handleSimulateEscrowRelease}
                className="w-full py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-mono text-xs font-bold flex items-center justify-center gap-2 shadow-lg transition-all disabled:opacity-50"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${isReleasingEscrow ? 'animate-spin' : ''}`} />
                {isReleasingEscrow ? 'Triggering Smart Contract...' : 'Simulate Next Escrow Step'}
              </button>
            </div>
          )}

          {/* TAB 6: COURT MARTIAL */}
          {activeTab === 'court_martial' && (
            <div className="glass-card rounded-3xl p-6 border border-white/10 bg-slate-950/80 space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-white/10">
                <div>
                  <h3 className="text-base font-mono font-bold text-red-400 flex items-center gap-2">
                    <AlertTriangle className="w-4 h-4 text-red-400" />
                    Fair Play & Anti-Cheat System
                  </h3>
                  <p className="text-xs text-muted-foreground font-mono">Zero tolerance anti-fraud & plagiarism prevention</p>
                </div>
                <span className="px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-[10px] font-mono font-bold">
                  STATUS: 100% CLEAN
                </span>
              </div>

              <div className="p-4 rounded-2xl bg-red-950/20 border border-red-500/30 text-xs font-mono space-y-2">
                <h4 className="font-bold text-red-300 uppercase text-[11px]">Enforced Anti-Cheat Safeguards:</h4>
                <ul className="space-y-1.5 text-muted-foreground text-[11px] list-disc list-inside">
                  <li>Plagiarized code/design submissions trigger immediate permanent ban</li>
                  <li>Late deliveries result in algorithmic Trust Score degradation</li>
                  <li>3 low client reviews initiate automated rank demotion (e.g. RNK-B → RNK-C)</li>
                </ul>
              </div>

              <div className="p-3 rounded-2xl bg-white/5 border border-white/10 font-mono text-[11px] space-y-1">
                <p className="text-slate-400">
                  Your Trust Integrity Score: <span className="text-emerald-400 font-bold">98.4%</span>
                </p>
                <p className="text-slate-400">
                  Account Warning Strikes: <span className="text-emerald-400 font-bold">0 / 3</span>
                </p>
              </div>
            </div>
          )}

        </div>

        {/* ======================================================================= */}
        {/* 4. RIGHT SQUAD ROSTER PANEL (3 Cols on lg) (Target for Step 7) */}
        {/* ======================================================================= */}
        <div
          id="tour-target-squad"
          className={`lg:col-span-3 flex flex-col gap-3 transition-all duration-300 relative ${
            tourOpen && activeStepData?.targetId === 'tour-target-squad'
              ? 'border-2 border-primary ring-4 ring-primary shadow-[0_0_35px_rgba(139,92,246,0.85)] z-40 bg-slate-900 rounded-2xl p-1 scale-[1.01]'
              : ''
          }`}
        >
          {/* Active Guild Squad Card */}
          <div className="glass-card rounded-2xl p-4 border border-white/10 bg-slate-950/70 shadow-xl space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-white/10">
              <div>
                <p className="text-[10px] font-mono text-muted-foreground uppercase tracking-widest">Active Syndicate</p>
                <h4 className="text-xs font-mono font-extrabold text-foreground">Dwarka Rapid Strike</h4>
              </div>
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" title="Squad Online" />
            </div>

            {/* Squad Members */}
            <div className="space-y-2">
              {[
                { name: 'Rohan V.', rank: 'RNK-B', role: 'Squad Lead', status: 'Online 🟢', color: '#a855f7' },
                { name: 'Akshit B.', rank: 'RNK-C', role: 'Core Dev', status: 'In Lobby 🟢', color: '#8b5cf6' },
                { name: 'Priya M.', rank: 'RNK-D', role: 'UI/UX Lead', status: 'In Sprint 🟡', color: '#3b82f6' },
                { name: 'Aryan S.', rank: 'RNK-E', role: 'Cadet (Shadow)', status: 'Observing ⚪', color: '#64748b' },
              ].map((m) => (
                <div
                  key={m.name}
                  className="p-2.5 rounded-xl bg-white/5 border border-white/5 flex items-center justify-between text-xs font-mono"
                >
                  <div className="flex items-center gap-2">
                    <span
                      className="text-[9px] font-bold px-1.5 py-0.5 rounded border"
                      style={{ color: m.color, borderColor: `${m.color}50`, background: `${m.color}15` }}
                    >
                      {m.rank}
                    </span>
                    <div>
                      <p className="text-xs font-semibold text-slate-200">{m.name}</p>
                      <p className="text-[10px] text-muted-foreground">{m.role}</p>
                    </div>
                  </div>
                  <span className="text-[9px] text-muted-foreground">{m.status}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Live Campus Ticker Feed */}
          <div className="glass-card rounded-2xl p-4 border border-white/10 bg-slate-950/70 shadow-xl space-y-2">
            <div className="flex items-center justify-between pb-2 border-b border-white/10">
              <span className="text-[10px] font-mono text-muted-foreground uppercase tracking-widest flex items-center gap-1.5">
                <Terminal className="w-3 h-3 text-primary" />
                Live Campus Ticker
              </span>
              <span className="text-[9px] font-mono text-emerald-400">REALTIME</span>
            </div>

            <div className="space-y-2 max-h-52 overflow-y-auto pr-1">
              {tickerList.map((item) => (
                <div
                  key={item.id}
                  className="p-2 rounded-xl bg-white/5 border border-white/5 text-[10px] font-mono space-y-0.5 animate-fadeIn"
                >
                  <p className="text-slate-300 leading-snug">{item.text}</p>
                  <span className="text-[9px] text-muted-foreground">{item.time}</span>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>

      {/* ========================================================================= */}
      {/* 5. BOTTOM HUD DOCK & OVERSIZED DEPLOY BUTTON */}
      {/* ========================================================================= */}
      <div className="relative z-20 border-t border-white/10 bg-slate-950/90 backdrop-blur-xl px-4 sm:px-8 py-3.5 mt-auto">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          
          {/* Center: Quick Nav Pills */}
          <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto justify-center sm:justify-start">
            {[
              { label: 'Overview', tab: 'command' },
              { label: 'Bounty Feed', tab: 'missions' },
              { label: 'Squad HQ', tab: 'guild' },
              { label: 'Escrow Vault', tab: 'escrow' },
            ].map((p) => (
              <button
                key={p.tab}
                type="button"
                onClick={() => {
                  playTacticalSound('click');
                  setActiveTab(p.tab as TacticalView);
                }}
                className={`px-3 py-1.5 rounded-full text-xs font-mono transition-all ${
                  activeTab === p.tab
                    ? 'bg-primary/20 text-primary border border-primary/40 font-bold shadow'
                    : 'glass-card border border-white/10 text-muted-foreground hover:text-white'
                }`}
              >
                {p.label}
              </button>
            ))}
          </div>

          {/* Bottom Right: Oversized Free Fire-Style Glowing Deploy Button */}
          <div>
            {role === 'RNK-E' && (
              <button
                type="button"
                onClick={() => {
                  playTacticalSound('deploy');
                  setProofModalOpen(true);
                }}
                className="w-full sm:w-auto px-8 py-3.5 rounded-2xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-black font-mono text-sm tracking-widest uppercase flex items-center justify-center gap-2.5 shadow-[0_0_35px_rgba(245,158,11,0.5)] transition-transform hover:scale-105"
              >
                <Zap className="w-4 h-4 fill-slate-950" />
                <span>INITIALIZE PROOF VERIFICATION</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            )}

            {role === 'RNK-C' && (
              <button
                type="button"
                onClick={() => {
                  playTacticalSound('deploy');
                  setActiveTab('missions');
                }}
                className="w-full sm:w-auto px-8 py-3.5 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-black font-mono text-sm tracking-widest uppercase flex items-center justify-center gap-2.5 shadow-[0_0_35px_rgba(16,185,129,0.5)] transition-transform hover:scale-105"
              >
                <Crosshair className="w-4 h-4" />
                <span>DEPLOY TO BOUNTY ARENA</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            )}

            {role === 'CLIENT' && (
              <button
                type="button"
                onClick={() => {
                  playTacticalSound('deploy');
                  setClientModalOpen(true);
                }}
                className="w-full sm:w-auto px-8 py-3.5 rounded-2xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-black font-mono text-sm tracking-widest uppercase flex items-center justify-center gap-2.5 shadow-[0_0_35px_rgba(139,92,246,0.5)] transition-transform hover:scale-105"
              >
                <Lock className="w-4 h-4" />
                <span>LOCK CAPITAL & POST GIG</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            )}
          </div>

        </div>
      </div>

      {/* ========================================================================= */}
      {/* ATTACHED SPEECH BUBBLE TOOLTIP (REF: USER DRAWING WITH TRIANGLE TAIL) */}
      {/* ========================================================================= */}
      {tourOpen && (
        <div
          style={{
            position: 'fixed',
            top: `${bubbleCoords.top}px`,
            left: `${bubbleCoords.left}px`,
            width: 'min(320px, calc(100vw - 32px))',
            zIndex: 60,
          }}
          className="animate-fadeIn transition-all duration-300"
        >
          <div className="relative rounded-2xl p-4 bg-slate-950/98 border-2 border-primary shadow-[0_0_40px_rgba(139,92,246,0.7)] backdrop-blur-2xl text-foreground font-mono text-xs">
            
            {/* Triangle Speech Pointer Beak (Pointing directly at target icon) */}
            {bubbleCoords.arrowPosition === 'bottom' ? (
              <div
                className="absolute -bottom-2 w-4 h-4 bg-slate-950 border-b-2 border-r-2 border-primary rotate-45 -translate-x-1/2"
                style={{ left: `${bubbleCoords.arrowLeft}px` }}
              />
            ) : (
              <div
                className="absolute -top-2 w-4 h-4 bg-slate-950 border-t-2 border-l-2 border-primary rotate-45 -translate-x-1/2"
                style={{ left: `${bubbleCoords.arrowLeft}px` }}
              />
            )}

            {/* Bubble Header */}
            <div className="flex items-center justify-between pb-1.5 mb-1.5 border-b border-white/10">
              <span className="text-[10px] font-black px-2 py-0.5 rounded-md bg-primary/30 text-purple-200 border border-primary/40 uppercase">
                {POINTER_STEPS[currentTourStep].tag} ({currentTourStep + 1}/{POINTER_STEPS.length})
              </span>
              <button
                type="button"
                onClick={() => {
                  playTacticalSound('click');
                  setTourOpen(false);
                }}
                className="text-muted-foreground hover:text-white"
                title="Close Note"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Title */}
            <h4 className="text-sm font-bold text-white flex items-center gap-1.5 mb-1.5">
              {POINTER_STEPS[currentTourStep].title}
            </h4>

            {/* Compact Note Details */}
            <div className="space-y-1.5 text-[11px] text-slate-200 leading-snug">
              <p>
                <strong className="text-amber-400">📌 Ye kya hai:</strong> {POINTER_STEPS[currentTourStep].whatIsIt}
              </p>
              <p>
                <strong className="text-accent">🎯 Kya karna hai:</strong> {POINTER_STEPS[currentTourStep].whatToDo}
              </p>
            </div>

            {/* Action Buttons inside the Speech Bubble */}
            <div className="flex items-center justify-between pt-2.5 mt-2 border-t border-white/10 text-[11px]">
              <button
                type="button"
                onClick={() => {
                  playTacticalSound('click');
                  setTourOpen(false);
                }}
                className="text-muted-foreground hover:text-white"
              >
                Skip
              </button>

              <div className="flex items-center gap-1.5">
                {currentTourStep > 0 && (
                  <button
                    type="button"
                    onClick={() => {
                      playTacticalSound('click');
                      setCurrentTourStep((prev) => prev - 1);
                    }}
                    className="px-2 py-1 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-slate-200 font-bold flex items-center gap-0.5"
                  >
                    <ArrowLeft className="w-3 h-3" />
                    <span>Prev</span>
                  </button>
                )}

                {currentTourStep < POINTER_STEPS.length - 1 ? (
                  <button
                    type="button"
                    onClick={() => {
                      playTacticalSound('click');
                      setCurrentTourStep((prev) => prev + 1);
                    }}
                    className="px-3 py-1 rounded-lg bg-primary hover:bg-purple-600 text-white font-bold flex items-center gap-1 shadow-lg"
                  >
                    <span>Next</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={() => {
                      playTacticalSound('promote');
                      setTourOpen(false);
                      showToast('🚀 Samjh gaye! You are ready to explore!');
                    }}
                    className="px-3 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold flex items-center gap-1 shadow-lg"
                  >
                    <Check className="w-3 h-3" />
                    <span>Samajh Gaya!</span>
                  </button>
                )}
              </div>
            </div>

          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* DUAL CURRENCY EXPLAINER MODAL (MANA VS ZENI) */}
      {/* ========================================================================= */}
      {currencyModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-4 animate-fadeIn">
          <div className="w-full max-w-2xl glass-card rounded-3xl p-6 sm:p-7 border border-white/20 bg-slate-950/95 shadow-2xl space-y-4 font-mono text-xs">
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <div>
                <h3 className="text-base font-bold text-foreground flex items-center gap-2">
                  <Coins className="w-4 h-4 text-emerald-400" />
                  UniParahits Dual-Currency Architecture
                </h3>
                <p className="text-[11px] text-muted-foreground mt-0.5">
                  ⚡ MANA Credits (Skill Barter) vs 🪙 ZENI Credits (Real INR Escrow)
                </p>
              </div>
              <button
                type="button"
                onClick={() => setCurrencyModalOpen(false)}
                className="text-muted-foreground hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Currency Tabs */}
            <div className="flex items-center gap-2 border-b border-white/10 pb-2">
              <button
                type="button"
                onClick={() => setCurrencyModalTab('both')}
                className={`px-3 py-1 rounded-lg transition-all ${
                  currencyModalTab === 'both' ? 'bg-primary text-white font-bold' : 'text-muted-foreground'
                }`}
              >
                Side-by-Side Comparison
              </button>
              <button
                type="button"
                onClick={() => setCurrencyModalTab('mana')}
                className={`px-3 py-1 rounded-lg transition-all ${
                  currencyModalTab === 'mana' ? 'bg-amber-500/20 text-amber-400 font-bold border border-amber-500/40' : 'text-muted-foreground'
                }`}
              >
                ⚡ MANA Deep-Dive
              </button>
              <button
                type="button"
                onClick={() => setCurrencyModalTab('zeni')}
                className={`px-3 py-1 rounded-lg transition-all ${
                  currencyModalTab === 'zeni' ? 'bg-emerald-500/20 text-emerald-400 font-bold border border-emerald-500/40' : 'text-muted-foreground'
                }`}
              >
                🪙 ZENI Deep-Dive
              </button>
            </div>

            {/* Comparison Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Card 1: MANA */}
              <div className="p-4 rounded-2xl bg-amber-950/20 border border-amber-500/30 space-y-2.5">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-amber-400 flex items-center gap-1.5 text-sm">
                    <Zap className="w-4 h-4 fill-amber-400" />
                    ⚡ MANA Credits
                  </span>
                  <span className="text-[9px] px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/40 uppercase">
                    Skill Barter XP
                  </span>
                </div>
                <div className="text-[11px] text-slate-300 space-y-1.5">
                  <p><strong>Real Money Value:</strong> ₹0 INR (Pure merit)</p>
                  <p><strong>How to Earn:</strong> Reviewing peer PRs, mentoring juniors, passing tests, daily streaks.</p>
                  <p><strong>How to Spend:</strong> Request skills from campus peers (e.g. get a UI design for your backend code).</p>
                  <p><strong>Audience:</strong> 100% of students starting at RNK-E.</p>
                </div>
              </div>

              {/* Card 2: ZENI */}
              <div className="p-4 rounded-2xl bg-emerald-950/20 border border-emerald-500/30 space-y-2.5">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-emerald-400 flex items-center gap-1.5 text-sm">
                    <Coins className="w-4 h-4" />
                    🪙 ZENI Credits
                  </span>
                  <span className="text-[9px] px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 uppercase">
                    1 ZENI = ₹1 INR
                  </span>
                </div>
                <div className="text-[11px] text-slate-300 space-y-1.5">
                  <p><strong>Real Money Value:</strong> 1 ZENI = ₹1 INR Guaranteed</p>
                  <p><strong>How to Earn:</strong> Delivering verified client sprint bounties & milestones.</p>
                  <p><strong>How to Spend:</strong> Instant liquidation to student bank accounts via multi-sig escrow.</p>
                  <p><strong>Audience:</strong> Verified operatives at RNK-D and above.</p>
                </div>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-white/5 border border-white/10 text-[11px] text-muted-foreground flex items-center justify-between">
              <span>Why both? MANA protects low-income students from paying for skills; ZENI provides real corporate income.</span>
              <button
                type="button"
                onClick={() => setCurrencyModalOpen(false)}
                className="px-3 py-1 rounded-lg bg-primary text-white font-bold hover:bg-purple-600 transition-colors ml-3 flex-shrink-0"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL 1: PROOF SUBMISSION MODAL (FOR RNK-E) */}
      {/* ========================================================================= */}
      {proofModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4 animate-fadeIn">
          <div className="w-full max-w-md glass-card rounded-3xl p-6 border border-amber-500/40 bg-slate-950 shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <h3 className="text-sm font-mono font-bold text-amber-400 flex items-center gap-2">
                <Zap className="w-4 h-4" />
                Submit Practical Proof of Work
              </h3>
              <button
                type="button"
                onClick={() => setProofModalOpen(false)}
                className="text-muted-foreground hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleProofSubmit} className="space-y-3 font-mono text-xs">
              <div>
                <label className="block text-slate-300 mb-1">Primary Skill Domain</label>
                <select
                  value={proofType}
                  onChange={(e) => setProofType(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-white/15 text-slate-200"
                >
                  <option>Web & App Dev</option>
                  <option>UI/UX & Graphics</option>
                  <option>Content Writing</option>
                  <option>Video & Animation</option>
                  <option>AI & Machine Learning</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-300 mb-1">Portfolio / Repo Link *</label>
                <input
                  type="url"
                  required
                  value={proofLink}
                  onChange={(e) => setProofLink(e.target.value)}
                  placeholder="https://github.com/your-username/project or Figma"
                  className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-white/15 text-slate-200"
                />
              </div>

              <div>
                <label className="block text-slate-300 mb-1">Description / Notes for Reviewer</label>
                <textarea
                  rows={3}
                  value={proofDesc}
                  onChange={(e) => setProofDesc(e.target.value)}
                  placeholder="Describe your tech stack, what you built, and key features..."
                  className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-white/15 text-slate-200"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold uppercase tracking-wider transition-all mt-2"
              >
                Send to C-Rank Consensus Gate
              </button>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL 2: DEPOSIT BOUNTY INTO ESCROW (FOR CLIENT) */}
      {/* ========================================================================= */}
      {clientModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4 animate-fadeIn">
          <div className="w-full max-w-md glass-card rounded-3xl p-6 border border-emerald-500/40 bg-slate-950 shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <h3 className="text-sm font-mono font-bold text-emerald-400 flex items-center gap-2">
                <Lock className="w-4 h-4" />
                Deploy Bounty Contract (Escrow Protected)
              </h3>
              <button
                type="button"
                onClick={() => setClientModalOpen(false)}
                className="text-muted-foreground hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleDeployBounty} className="space-y-3 font-mono text-xs">
              <div>
                <label className="block text-slate-300 mb-1">Project Sprint Title *</label>
                <input
                  type="text"
                  required
                  value={newBountyTitle}
                  onChange={(e) => setNewBountyTitle(e.target.value)}
                  placeholder="e.g. Next.js Analytics Portal or 3D Video"
                  className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-white/15 text-slate-200"
                />
              </div>

              <div>
                <label className="block text-slate-300 mb-1">Escrow Deposit Amount (₹) *</label>
                <input
                  type="number"
                  required
                  min="5000"
                  step="1000"
                  value={newBountyAmount}
                  onChange={(e) => setNewBountyAmount(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-white/15 text-slate-200"
                />
                <p className="text-[10px] text-muted-foreground mt-1">
                  100% upfront locked in smart escrow. Released only upon your milestone approval.
                </p>
              </div>

              <div>
                <label className="block text-slate-300 mb-1">Required Minimum Rank Tier</label>
                <select
                  value={newBountyTier}
                  onChange={(e) => setNewBountyTier(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-white/15 text-slate-200"
                >
                  <option value="RNK-D">RNK-D (Active Contributors)</option>
                  <option value="RNK-C">RNK-C (Senior Mentors & Guild Builders)</option>
                  <option value="RNK-B">RNK-B (Senior Lead Architects)</option>
                  <option value="RNK-A">RNK-A (Apex Guild Masters)</option>
                </select>
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold uppercase tracking-wider transition-all mt-2"
              >
                Deposit Funds & Deploy Bounty
              </button>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
