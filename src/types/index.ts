export type AgentRole = 'underwriter' | 'sentinel' | 'strategist' | 'compliance';

export interface QuantAgent {
  id: string;
  name: string;
  role: AgentRole;
  title: string;
  avatar: string;
  status: 'active' | 'processing' | 'idle' | 'awaiting_approval';
  specialization: string;
  activeTask?: string;
  confidenceScore: number;
  completedTasks: number;
}

export type MarkovStateType = 
  | 'INGESTION'
  | 'IDENTITY_KYC'
  | 'RISK_SCORING'
  | 'POLICY_GATE'
  | 'EXECUTION'
  | 'HUMAN_ACTION'
  | 'POST_SETTLEMENT';

export interface MarkovStateNode {
  id: MarkovStateType;
  label: string;
  description: string;
  subtext: string;
  transitions: { target: MarkovStateType; probability: number; label: string }[];
  status: 'idle' | 'active' | 'completed' | 'failed' | 'bypassed';
  metrics?: {
    latencyMs: number;
    entropy: number;
    validationStatus: 'passed' | 'warn' | 'blocked';
  };
}

export interface TemporalStep {
  id: string;
  name: string;
  description: string;
  assignedAgent: AgentRole;
  status: 'pending' | 'running' | 'completed' | 'failed' | 'needs_action';
  output?: string;
  durationMs?: number;
  policyCheck?: {
    rule: string;
    passed: boolean;
    auditHash: string;
  };
}

export interface FinancialWorkflow {
  id: string;
  category: 'Underwriting' | 'Fraud' | 'Wealth' | 'Settlement';
  title: string;
  description: string;
  valueAtRisk: string;
  currentState: MarkovStateType;
  steps: TemporalStep[];
  memoryContext: {
    customerName: string;
    accountNumber: string;
    creditScore?: number;
    dtiRatio?: string;
    assetValue?: string;
    anomalyScore?: number;
    riskTier: 'Low' | 'Moderate' | 'High' | 'Critical';
  };
}

export interface AuditLogEntry {
  id: string;
  timestamp: string;
  actor: string;
  action: string;
  details: string;
  status: 'verified' | 'flagged' | 'escalated';
  cryptographicHash: string;
}

export interface PortfolioAsset {
  symbol: string;
  name: string;
  allocationPercent: number;
  targetPercent: number;
  currentValue: number;
  change24h: number;
  sharpeContribution: number;
}
