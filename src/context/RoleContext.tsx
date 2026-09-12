'use client';
import React, { createContext, useContext, useState, useEffect } from 'react';

export type OperatorRole = 'guest' | 'cadet_e' | 'evaluator_c';

export interface OperatorProfile {
  id: OperatorRole;
  callsign: string;
  rankId: string;
  rankLabel: string;
  color: string;
  glow: string;
  permissions: string[];
  statusMessage: string;
}

export const OPERATOR_PROFILES: Record<OperatorRole, OperatorProfile> = {
  guest: {
    id: 'guest',
    callsign: 'Unverified Guest',
    rankId: 'UNLINKED',
    rankLabel: 'Observer Node',
    color: '#94a3b8',
    glow: 'rgba(148, 163, 184, 0.3)',
    permissions: ['Read Public Protocols', 'Inspect Bounty Board (Read-only)'],
    statusMessage: 'Terminal unauthenticated. Initialize profile to access dispatch network.',
  },
  cadet_e: {
    id: 'cadet_e',
    callsign: 'Cadet-7049',
    rankId: 'RNK-E',
    rankLabel: 'Learner Apprentice',
    color: '#64748b',
    glow: 'rgba(100, 116, 139, 0.4)',
    permissions: [
      'Access Knowledge Base',
      'Observe Guild Workflows',
      'Submit Proof to C-Rank Consensus Gate',
    ],
    statusMessage: 'Learning Mode Active. Payout channels locked until RNK-C consensus validation.',
  },
  evaluator_c: {
    id: 'evaluator_c',
    callsign: 'Architect-Vance',
    rankId: 'RNK-C',
    rankLabel: 'Guild Builder & Evaluator',
    color: '#8b5cf6',
    glow: 'rgba(139, 92, 246, 0.5)',
    permissions: [
      'Form & Lead Guild Syndicates',
      'Validate & Promote RNK-E Cadets',
      'Accept ₹50k+ Corporate Bounties',
      'Escrow Release Multi-Sig',
    ],
    statusMessage: 'Consensus Validator Clearance. Authorized to audit tasks and commission teams.',
  },
};

interface RoleContextType {
  role: OperatorRole;
  profile: OperatorProfile;
  setRole: (role: OperatorRole) => void;
}

const RoleContext = createContext<RoleContextType | undefined>(undefined);

export function RoleProvider({ children }: { children: React.ReactNode }) {
  const [role, setRoleState] = useState<OperatorRole>('guest');

  useEffect(() => {
    const saved = localStorage.getItem('uniparahits_operator_role') as OperatorRole | null;
    if (saved && OPERATOR_PROFILES[saved]) {
      setRoleState(saved);
    }
  }, []);

  const setRole = (newRole: OperatorRole) => {
    setRoleState(newRole);
    if (typeof window !== 'undefined') {
      localStorage.setItem('uniparahits_operator_role', newRole);
    }
  };

  return (
    <RoleContext.Provider value={{ role, profile: OPERATOR_PROFILES[role], setRole }}>
      {children}
    </RoleContext.Provider>
  );
}

export function useOperatorRole() {
  const context = useContext(RoleContext);
  if (!context) {
    throw new Error('useOperatorRole must be used within a RoleProvider');
  }
  return context;
}
