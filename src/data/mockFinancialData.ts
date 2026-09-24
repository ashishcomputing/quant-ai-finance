import { QuantAgent, MarkovStateNode, FinancialWorkflow, AuditLogEntry, PortfolioAsset } from '../types';

export const INITIAL_AGENTS: QuantAgent[] = [
  {
    id: 'agent-underwriter',
    name: 'Quant Underwriter Alpha',
    role: 'underwriter',
    title: 'Autonomous Credit & Debt Underwriter',
    avatar: '🏦',
    status: 'active',
    specialization: 'Commercial Cashflow Analysis, DSCR Modeling & Fannie/Freddie Conformity',
    activeTask: 'Evaluating $450k Mortgage intake with 3-year P&L cashflow synthesis',
    confidenceScore: 98.4,
    completedTasks: 1420
  },
  {
    id: 'agent-sentinel',
    name: 'Quant Sentinel Risk',
    role: 'sentinel',
    title: 'Markovian Fraud & Anomaly Guard',
    avatar: '🛡️',
    status: 'active',
    specialization: 'High-frequency Transaction Heuristics, Velocity Profiling & Dispute Triage',
    activeTask: 'Scanning 8,400 debit/credit authorization streams across global clearing rails',
    confidenceScore: 99.1,
    completedTasks: 8934
  },
  {
    id: 'agent-strategist',
    name: 'Quant Wealth Strategist',
    role: 'strategist',
    title: 'Algorithmic Portfolio & Yield Architect',
    avatar: '📈',
    status: 'idle',
    specialization: 'Mean-Variance Optimization, Monte Carlo VaR (99%), Automated Tax-Loss Harvesting',
    activeTask: 'Calibrating multi-asset risk parity matrix for $2.4M private banking account',
    confidenceScore: 97.6,
    completedTasks: 3120
  },
  {
    id: 'agent-compliance',
    name: 'Quant Compliance Officer',
    role: 'compliance',
    title: 'Stateful Regulatory & AML Auditor',
    avatar: '⚖️',
    status: 'active',
    specialization: 'FinCEN/OFAC Sanctions Filtering, BSA/AML SAR Automation, SEC Rule 206(4)-7',
    activeTask: 'Maintaining cryptographic audit ledger and policy validation gates',
    confidenceScore: 99.9,
    completedTasks: 14502
  }
];

export const INITIAL_MARKOV_NODES: MarkovStateNode[] = [
  {
    id: 'INGESTION',
    label: 'Intent & Context Ingestion',
    description: 'Binds cross-channel multi-turn requests with customer financial historical graph',
    subtext: 'Session Memory Recall: 99.4%',
    status: 'completed',
    metrics: { latencyMs: 24, entropy: 0.12, validationStatus: 'passed' },
    transitions: [
      { target: 'IDENTITY_KYC', probability: 0.94, label: 'Identity Verification Required' },
      { target: 'POLICY_GATE', probability: 0.06, label: 'Fast-track Cached Identity' }
    ]
  },
  {
    id: 'IDENTITY_KYC',
    label: 'Biometric & KYC Authentication',
    description: 'Multi-factor cryptographic identity check and sanctions screening',
    subtext: 'Zero-knowledge verification gate',
    status: 'completed',
    metrics: { latencyMs: 42, entropy: 0.04, validationStatus: 'passed' },
    transitions: [
      { target: 'RISK_SCORING', probability: 0.91, label: 'Valid KYC Passed' },
      { target: 'HUMAN_ACTION', probability: 0.09, label: 'Suspicious Device / Flagged ID' }
    ]
  },
  {
    id: 'RISK_SCORING',
    label: 'Markovian Risk & Volatility Engine',
    description: 'Calculates stochastic default probability, cashflow volatility & anomaly index',
    subtext: 'Stochastic matrix evaluation',
    status: 'active',
    metrics: { latencyMs: 85, entropy: 0.18, validationStatus: 'passed' },
    transitions: [
      { target: 'POLICY_GATE', probability: 0.88, label: 'Risk within Acceptable Tolerances' },
      { target: 'HUMAN_ACTION', probability: 0.12, label: 'Variance Outlier / High VaR' }
    ]
  },
  {
    id: 'POLICY_GATE',
    label: 'Governance & Constraint Guard',
    description: 'OCC, SEC, and Dodd-Frank real-time constraint enforcement & memory locks',
    subtext: 'Pre-execution validation barrier',
    status: 'idle',
    metrics: { latencyMs: 18, entropy: 0.02, validationStatus: 'passed' },
    transitions: [
      { target: 'EXECUTION', probability: 0.95, label: 'All Policy Invariants Satisfied' },
      { target: 'HUMAN_ACTION', probability: 0.05, label: 'Regulatory Ambiguity / Dual Signature' }
    ]
  },
  {
    id: 'HUMAN_ACTION',
    label: 'Action Activity (Human-in-the-Loop)',
    description: 'Supervised escalation window for executive override and threshold review',
    subtext: 'Collaborative agentic loop',
    status: 'idle',
    metrics: { latencyMs: 310, entropy: 0.28, validationStatus: 'warn' },
    transitions: [
      { target: 'EXECUTION', probability: 0.82, label: 'Approved by Financial Controller' },
      { target: 'POST_SETTLEMENT', probability: 0.18, label: 'Rejection Logged with Audit Reason' }
    ]
  },
  {
    id: 'EXECUTION',
    label: 'Durable Autonomous Execution',
    description: 'Core banking settlement, smart contract execution, ACH/FedNow disbursement',
    subtext: 'Idempotent transaction layer',
    status: 'idle',
    metrics: { latencyMs: 140, entropy: 0.01, validationStatus: 'passed' },
    transitions: [
      { target: 'POST_SETTLEMENT', probability: 1.0, label: 'Settlement Confirmed & Reconciled' }
    ]
  },
  {
    id: 'POST_SETTLEMENT',
    label: 'Cryptographic Audit & P&L Attribution',
    description: 'Immutable ledger commit, compounding ROI logging, customer telemetry update',
    subtext: 'End of temporal workflow lifecycle',
    status: 'idle',
    metrics: { latencyMs: 12, entropy: 0.0, validationStatus: 'passed' },
    transitions: []
  }
];

export const PRESET_WORKFLOWS: FinancialWorkflow[] = [
  {
    id: 'wf-mortgage',
    category: 'Underwriting',
    title: 'Commercial Digital Mortgage & Cashflow Underwriting',
    description: 'End-to-end autonomous underwriting analyzing W-2s, 1099s, debt obligations, and property appraisal with OCC compliance checks.',
    valueAtRisk: '$580,000 USD',
    currentState: 'RISK_SCORING',
    memoryContext: {
      customerName: 'Elena Rostova (Apex Dynamics LLC)',
      accountNumber: 'ACT-9021-COMM',
      creditScore: 782,
      dtiRatio: '28.4% (Max Allowable: 43%)',
      assetValue: '$1,850,000 Liquid Collateral',
      anomalyScore: 0.03,
      riskTier: 'Low'
    },
    steps: [
      {
        id: 'step-1',
        name: 'Borrower Intake & IRS 4506-C Income Verification',
        description: 'Auto-ingested 36 months of bank statements and tax return filings via core banking connector.',
        assignedAgent: 'underwriter',
        status: 'completed',
        durationMs: 180,
        output: 'Income verified: $320,000/yr normalized EBITDA. DSCR verified at 1.84x.',
        policyCheck: {
          rule: 'OCC Lending Policy 12 CFR Part 34 - Debt Coverage Ratio > 1.25x',
          passed: true,
          auditHash: '0x8f2c...49a1'
        }
      },
      {
        id: 'step-2',
        name: 'Automated Title & Geolocation Property Valuation',
        description: 'Algorithmic valuation cross-referenced with municipal records and comparable sales.',
        assignedAgent: 'underwriter',
        status: 'completed',
        durationMs: 240,
        output: 'Property appraised value: $820,000. Loan-to-Value (LTV) calculated at 70.7%.',
        policyCheck: {
          rule: 'Fannie Mae LTV Ceiling Requirement <= 75.0%',
          passed: true,
          auditHash: '0x3e1d...91c0'
        }
      },
      {
        id: 'step-3',
        name: 'Markovian Credit Default & Stress Simulation',
        description: 'Stochastic Monte Carlo simulation testing macroeconomic interest rate spikes (+300 bps).',
        assignedAgent: 'underwriter',
        status: 'running',
        durationMs: 95,
        output: 'Calculated default probability P(d) = 0.42% across 5-year rolling horizon.'
      },
      {
        id: 'step-4',
        name: 'Regulatory Compliance & Fair Lending Audit Gate',
        description: 'Verifies HMDA / Equal Credit Opportunity Act algorithmic non-bias criteria.',
        assignedAgent: 'compliance',
        status: 'pending',
        policyCheck: {
          rule: 'CFPB Regulation B (12 CFR Part 1002) Disparate Impact Non-Bias Filter',
          passed: true,
          auditHash: '0xpending'
        }
      },
      {
        id: 'step-5',
        name: 'Smart Term Sheet Issuance & Escrow Commitment',
        description: 'Autonomous generation of formal commitment letter with instant digital signature escrow lock.',
        assignedAgent: 'underwriter',
        status: 'pending'
      }
    ]
  },
  {
    id: 'wf-fraud',
    category: 'Fraud',
    title: 'High-Velocity Card Anomaly & Instant Virtual Reissue',
    description: 'Suspicious card authorization trigger ($4,850 in Singapore while customer phone is in Chicago). Immediate automated containment and triage.',
    valueAtRisk: '$4,850 USD',
    currentState: 'POLICY_GATE',
    memoryContext: {
      customerName: 'Marcus Vance',
      accountNumber: 'ACT-4112-PREMIER',
      assetValue: '$94,200 Checking / Savings',
      anomalyScore: 0.94,
      riskTier: 'Critical'
    },
    steps: [
      {
        id: 'fraud-1',
        name: 'Authorization Ingestion & Velocity Outlier Flag',
        description: 'Received ISO 8583 authorization request from merchant LUXURY_TIME_SG for $4,850.00.',
        assignedAgent: 'sentinel',
        status: 'completed',
        durationMs: 32,
        output: 'Geolocation mismatch: IP & Terminal in Singapore, Customer verified active in Chicago 18 mins ago.',
        policyCheck: {
          rule: 'Card Velocity Heuristic: Distance Velocity > 500 mph impossible travel',
          passed: false,
          auditHash: '0xf4a9...881b'
        }
      },
      {
        id: 'fraud-2',
        name: 'Autonomous Containment & Card Security Lock',
        description: 'Zero-friction temporary authorization freeze to prevent secondary clearing attempts.',
        assignedAgent: 'sentinel',
        status: 'completed',
        durationMs: 45,
        output: 'Plastic Card ending *8821 locked. Customer alerted via push notification and SMS.',
        policyCheck: {
          rule: 'Customer Protection Protocol: Instant Fraud Halt under Regulation E',
          passed: true,
          auditHash: '0x1b2c...55d2'
        }
      },
      {
        id: 'fraud-3',
        name: 'Proactive Virtual Card Reissue & Wallet Tokenization',
        description: 'Generates instant dynamic CVV virtual replacement card pushed directly to Apple/Google Pay.',
        assignedAgent: 'sentinel',
        status: 'running',
        durationMs: 60,
        output: 'New Virtual Card generated: **** **** **** 9043. Provisioned into Apple Pay token vault.'
      },
      {
        id: 'fraud-4',
        name: 'Chargeback & Merchant Dispute Arbitration Filing',
        description: 'Auto-populates Visa/Mastercard dispute package with impossible travel evidence bundle.',
        assignedAgent: 'compliance',
        status: 'pending'
      }
    ]
  },
  {
    id: 'wf-wealth',
    category: 'Wealth',
    title: 'Quantitative Yield Optimization & Algorithmic Rebalance',
    description: 'Private wealth portfolio rebalancing under dynamic Black-Litterman model to maximize Sharpe ratio and harvest $14,200 in tax offsets.',
    valueAtRisk: '$1,450,000 USD',
    currentState: 'INGESTION',
    memoryContext: {
      customerName: 'Dr. Aris Thorne',
      accountNumber: 'ACT-7740-WEALTH',
      assetValue: '$1,450,000 Custodial AUM',
      riskTier: 'Moderate'
    },
    steps: [
      {
        id: 'wealth-1',
        name: 'Asset Allocation Drift & Covariance Matrix Check',
        description: 'Quant engine identified equity drift of +7.2% beyond target benchmark tolerance.',
        assignedAgent: 'strategist',
        status: 'completed',
        durationMs: 110,
        output: 'Current Sharpe: 1.62. Projected Sharpe after optimization: 2.14 (+32% risk-adjusted return).',
        policyCheck: {
          rule: 'Investment Policy Statement (IPS): Equity band 55% - 65%',
          passed: true,
          auditHash: '0x66ab...310f'
        }
      },
      {
        id: 'wealth-2',
        name: 'Monte Carlo 10,000-Path VaR & Tail Risk Simulation',
        description: 'Simulating geopolitical shock scenarios and liquidity drawdowns.',
        assignedAgent: 'strategist',
        status: 'pending'
      },
      {
        id: 'wealth-3',
        name: 'Algorithmic Tax-Loss Harvesting Execution',
        description: 'Replaces correlated underperforming municipal tranches to lock in $14,200 tax shield.',
        assignedAgent: 'strategist',
        status: 'pending'
      },
      {
        id: 'wealth-4',
        name: 'Compliance Audit & Client Transparency Record',
        description: 'Logs fiduciary best-interest execution under SEC Investment Advisers Act.',
        assignedAgent: 'compliance',
        status: 'pending'
      }
    ]
  },
  {
    id: 'wf-fx',
    category: 'Settlement',
    title: 'Institutional Cross-Border FX & Smart Liquidity Routing',
    description: 'Autonomous transfer of €850,000 EUR to USD with microsecond liquidity aggregation across 4 global liquidity providers.',
    valueAtRisk: '$925,000 USD Equivalent',
    currentState: 'INGESTION',
    memoryContext: {
      customerName: 'Helios Logistics International',
      accountNumber: 'ACT-5039-CORP',
      assetValue: '$12,400,000 Corporate Treasury',
      riskTier: 'Low'
    },
    steps: [
      {
        id: 'fx-1',
        name: 'Liquidity Depth Analysis & Multi-venue Price Routing',
        description: 'Scans tier-1 FX liquidity pools to eliminate spread markups and front-running.',
        assignedAgent: 'strategist',
        status: 'completed',
        durationMs: 14,
        output: 'Execution Rate: 1.0884 EUR/USD. Calculated slippage saved: $3,420 vs standard wire rate.',
        policyCheck: {
          rule: 'Treasury Best Execution Mandate: Max Slippage < 0.015%',
          passed: true,
          auditHash: '0xaa12...778e'
        }
      },
      {
        id: 'fx-2',
        name: 'Real-time OFAC & EU Sanctions Screening',
        description: 'High-speed fuzzy string matching against FinCEN, OFAC SDN, and Interpol lists.',
        assignedAgent: 'compliance',
        status: 'pending'
      },
      {
        id: 'fx-3',
        name: 'FedNow / TARGET2 Instant Cross-Border Clearing',
        description: 'Atomic dual-leg settlement through central bank rails.',
        assignedAgent: 'compliance',
        status: 'pending'
      }
    ]
  }
];

export const INITIAL_AUDIT_LOGS: AuditLogEntry[] = [
  {
    id: 'log-101',
    timestamp: 'Just now',
    actor: 'Quant Underwriter Alpha',
    action: 'POLICY_CONSTRAINT_VERIFIED',
    details: 'Verified Fannie Mae Debt-to-Income constraint (28.4% < 43.0% threshold) for Elena Rostova',
    status: 'verified',
    cryptographicHash: '0x8f2c694a91b2c4e9'
  },
  {
    id: 'log-102',
    timestamp: '1 min ago',
    actor: 'Quant Sentinel Risk',
    action: 'MARKOVIAN_ANOMALY_TRIGGERED',
    details: 'Detected impossible distance velocity (Singapore / Chicago in 18 min) for Marcus Vance card *8821',
    status: 'escalated',
    cryptographicHash: '0xf4a9881ba012ef84'
  },
  {
    id: 'log-103',
    timestamp: '3 mins ago',
    actor: 'Quant Compliance Officer',
    action: 'SANCTIONS_SCREENING_CLEARED',
    details: 'Zero hit on OFAC SDN & FinCEN watchlists for Helios Logistics International (€850k transfer)',
    status: 'verified',
    cryptographicHash: '0xaa12778e3488cf10'
  },
  {
    id: 'log-104',
    timestamp: '7 mins ago',
    actor: 'Quant Wealth Strategist',
    action: 'SHARPE_OPTIMIZATION_CALIBRATED',
    details: 'Rebalanced 14 equity weights in Private Wealth Custodial Account. VaR(99%) trimmed by 180 bps',
    status: 'verified',
    cryptographicHash: '0x66ab310f5e921d7b'
  }
];

export const PORTFOLIO_ASSETS: PortfolioAsset[] = [
  { symbol: 'US-TBILL-3M', name: 'US Treasury 3-Month Bills (4.85% APY)', allocationPercent: 30, targetPercent: 25, currentValue: 435000, change24h: 0.02, sharpeContribution: 0.85 },
  { symbol: 'SPY', name: 'SPDR S&P 500 Trust (Core Large Cap)', allocationPercent: 35, targetPercent: 35, currentValue: 507500, change24h: 1.15, sharpeContribution: 1.12 },
  { symbol: 'QQQ', name: 'Invesco QQQ Trust (Tech / AI Sector)', allocationPercent: 20, targetPercent: 18, currentValue: 290000, change24h: 1.84, sharpeContribution: 0.94 },
  { symbol: 'BNDX', name: 'Vanguard Total Intl Bond Index', allocationPercent: 10, targetPercent: 12, currentValue: 145000, change24h: -0.15, sharpeContribution: 0.32 },
  { symbol: 'GLD', name: 'SPDR Gold Shares (Inflation Hedge)', allocationPercent: 5, targetPercent: 10, currentValue: 72500, change24h: 0.65, sharpeContribution: 0.44 }
];
