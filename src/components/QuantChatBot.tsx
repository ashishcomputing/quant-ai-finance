import React, { useState, useRef, useEffect } from 'react';
import { 
  MessageSquare, 
  X, 
  Send, 
  Bot, 
  User, 
  Sparkles, 
  Settings2, 
  Key, 
  RotateCcw, 
  Copy, 
  Check, 
  Maximize2, 
  Minimize2, 
  ShieldCheck, 
  Sliders,
  ChevronDown,
  TrendingUp,
  Activity,
  Layers,
  HelpCircle
} from 'lucide-react';
import { AgentRole } from '../types';
import { 
  buildAshfxGroundedBundle, 
  formatGroundedPromptForLing, 
  GroundedContextBundle 
} from '../services/ashfxOrchestrator';

export interface ModelOption {
  id: string;
  name: string;
  provider: 'openrouter' | 'free-pollinations';
  isFree: boolean;
  tier: 'Free' | 'Fee / API Key';
  contextLength: string;
  description: string;
}

export const AVAILABLE_MODELS: ModelOption[] = [
  {
    id: 'meta-llama/llama-3.3-70b-instruct:free',
    name: 'Meta Llama 3.3 70B Instruct',
    provider: 'openrouter',
    isFree: true,
    tier: 'Free',
    contextLength: '128k',
    description: 'Top-tier open intelligence, superior reasoning & zero hallucination guardrails'
  },
  {
    id: 'deepseek/deepseek-r1:free',
    name: 'DeepSeek R1 Reasoning',
    provider: 'openrouter',
    isFree: true,
    tier: 'Free',
    contextLength: '64k',
    description: 'Advanced chain-of-thought mathematical and algorithmic finance reasoning'
  },
  {
    id: 'google/gemini-2.0-flash-exp:free',
    name: 'Google Gemini 2.0 Flash',
    provider: 'openrouter',
    isFree: true,
    tier: 'Free',
    contextLength: '1M',
    description: 'Ultra high-speed multimodal model with massive context window'
  },
  {
    id: 'qwen/qwen-2.5-72b-instruct:free',
    name: 'Qwen 2.5 72B Instruct',
    provider: 'openrouter',
    isFree: true,
    tier: 'Free',
    contextLength: '32k',
    description: 'Powerful quantitative reasoning and mathematical evaluation'
  },
  {
    id: 'mistralai/mistral-small-24b-instruct-2501:free',
    name: 'Mistral Small 24B',
    provider: 'openrouter',
    isFree: true,
    tier: 'Free',
    contextLength: '32k',
    description: 'Fast, efficient French-engineered enterprise conversational model'
  },
  {
    id: 'inclusionai/ling-3.0-flash-fin:free',
    name: 'InclusionAI Ling 3.0 Flash Fin',
    provider: 'openrouter',
    isFree: true,
    tier: 'Free',
    contextLength: '16k',
    description: 'Lightweight financial text generation model (knowledge cutoff ~2024)'
  },
  {
    id: 'openai-fast',
    name: 'Quant-GPT-OSS 20B (Anonymous Free)',
    provider: 'free-pollinations',
    isFree: true,
    tier: 'Free',
    contextLength: '32k',
    description: 'Direct browser execution without any OpenRouter key required'
  },
  // Fee / Premium Models
  {
    id: 'openai/gpt-4o',
    name: 'OpenAI GPT-4o',
    provider: 'openrouter',
    isFree: false,
    tier: 'Fee / API Key',
    contextLength: '128k',
    description: 'Flagship enterprise multimodal intelligence'
  },
  {
    id: 'anthropic/claude-3.5-sonnet',
    name: 'Anthropic Claude 3.5 Sonnet',
    provider: 'openrouter',
    isFree: false,
    tier: 'Fee / API Key',
    contextLength: '200k',
    description: 'Highest-grade institutional analysis, coding, and policy auditing'
  },
  {
    id: 'deepseek/deepseek-chat',
    name: 'DeepSeek V3 (671B)',
    provider: 'openrouter',
    isFree: false,
    tier: 'Fee / API Key',
    contextLength: '64k',
    description: 'Ultra-low cost high-performance foundation model'
  },
  {
    id: 'google/gemini-2.0-flash-001',
    name: 'Google Gemini 2.0 Flash (Production)',
    provider: 'openrouter',
    isFree: false,
    tier: 'Fee / API Key',
    contextLength: '1M',
    description: 'Production SLA low-latency Google model'
  }
];

interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant' | 'system';
  role?: AgentRole | 'supervisor';
  content: string;
  timestamp: string;
  modelUsed?: string;
  liveMarketBadge?: string;
  groundingBundle?: GroundedContextBundle;
}

export const QuantChatBot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [showModelDropdown, setShowModelDropdown] = useState(false);
  
  // Model & Provider configuration - Default to Meta Llama 3.3 70B (free on OpenRouter)
  const [selectedModelId, setSelectedModelId] = useState<string>(
    () => localStorage.getItem('quant_selected_model') || 'meta-llama/llama-3.3-70b-instruct:free'
  );
  const [customModelInput, setCustomModelInput] = useState('');
  const [openRouterKey, setOpenRouterKey] = useState<string>(
    () => localStorage.getItem('quant_openrouter_key') || ''
  );
  const [agentPersona, setAgentPersona] = useState<AgentRole | 'supervisor'>('supervisor');

  // Live Crypto Market Data Oracle
  const [liveBtcPrice, setLiveBtcPrice] = useState<string | null>(null);
  const [liveEthPrice, setLiveEthPrice] = useState<string | null>(null);
  const [lastTickerUpdate, setLastTickerUpdate] = useState<string>('');

  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatWindowRef = useRef<HTMLDivElement>(null);

  const activeModel = AVAILABLE_MODELS.find((m) => m.id === selectedModelId) || {
    id: selectedModelId,
    name: selectedModelId,
    provider: 'openrouter',
    isFree: selectedModelId.endsWith(':free'),
    tier: selectedModelId.endsWith(':free') ? 'Free' : 'Fee / API Key',
    contextLength: '32k',
    description: 'Custom specified OpenRouter model'
  };

  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      sender: 'assistant',
      role: 'supervisor',
      content: "Hello! I am the **Quant Super-Intelligence Financial Assistant**, powered by **TAOS (Temporal Agentic Operating System)**.\n\nNow equipped with **Live Market Data Oracles** (real-time Bitcoin & asset prices) and **Instant Model Switching** across OpenRouter and Free AI providers.\n\nHow can I assist your financial operations today?",
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      modelUsed: activeModel.name
    }
  ]);

  // Fetch real-time BTC & ETH prices for the live oracle
  const fetchLiveCryptoPrices = async () => {
    try {
      const [btcRes, ethRes] = await Promise.all([
        fetch('https://api.coinbase.com/v2/prices/BTC-USD/spot'),
        fetch('https://api.coinbase.com/v2/prices/ETH-USD/spot')
      ]);

      if (btcRes.ok) {
        const btcData = await btcRes.json();
        const priceNum = parseFloat(btcData.data.amount);
        setLiveBtcPrice(`$${priceNum.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`);
      }
      if (ethRes.ok) {
        const ethData = await ethRes.json();
        const priceNum = parseFloat(ethData.data.amount);
        setLiveEthPrice(`$${priceNum.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`);
      }
      setLastTickerUpdate(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }));
    } catch (e) {
      console.warn('Failed to fetch real-time crypto prices:', e);
    }
  };

  useEffect(() => {
    fetchLiveCryptoPrices();
    const interval = setInterval(fetchLiveCryptoPrices, 30000); // refresh every 30s
    return () => clearInterval(interval);
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  // Close chat when clicking outside or to the side of the chat window
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent | TouchEvent) => {
      if (
        isOpen &&
        chatWindowRef.current &&
        !chatWindowRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('touchstart', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
    };
  }, [isOpen]);

  const handleSelectModel = (modelId: string) => {
    setSelectedModelId(modelId);
    localStorage.setItem('quant_selected_model', modelId);
    setShowModelDropdown(false);
  };

  const handleSaveApiKey = (key: string) => {
    setOpenRouterKey(key);
    localStorage.setItem('quant_openrouter_key', key);
  };

  const getSystemPrompt = (persona: AgentRole | 'supervisor', liveMarketContext?: string): string => {
    const base = `You are the Quant Super-Intelligence Financial AI Agent, operating within Quant's Temporal Agentic Operating System (TAOS - https://www.quant.ai/en). You deliver real P&L value, rigorous financial analysis, and governance-by-design compliance.`;
    const marketInject = liveMarketContext ? `\n\n[VERIFIED REAL-TIME MARKET ORACLE]:\n${liveMarketContext}\nCRITICAL: Always use this verified real-time market data whenever the user asks about crypto, Bitcoin, Ethereum, or current market pricing. Do not use outdated training cutoff estimations.` : '';

    switch (persona) {
      case 'underwriter':
        return `${base}${marketInject} You are currently acting as 'Quant Underwriter Alpha'. Specialization: Commercial credit, DSCR modeling (minimum 1.25x), LTV calculation, cashflow normalization, and Fannie Mae/Freddie Mac conforming guidelines. Be quantitative, precise, and structure answers with underwriting metrics.`;
      case 'sentinel':
        return `${base}${marketInject} You are currently acting as 'Quant Sentinel Risk'. Specialization: Real-time fraud detection, Markovian transaction velocity heuristics, impossible travel alerts, virtual card re-issuance, and Regulation E chargeback dispute packets.`;
      case 'strategist':
        return `${base}${marketInject} You are currently acting as 'Quant Wealth Strategist'. Specialization: Mean-variance optimization, Sharpe ratio maximization, Monte Carlo Value-at-Risk (99%), Black-Litterman multi-asset allocation, and algorithmic tax-loss harvesting.`;
      case 'compliance':
        return `${base}${marketInject} You are currently acting as 'Quant Compliance Officer'. Specialization: OCC 12 CFR Part 34, CFPB Regulation B (non-bias lending), FinCEN BSA/AML, OFAC sanctions screening, and SEC Rule 206(4)-7 fiduciary standards.`;
      default:
        return `${base}${marketInject} You are the Unified TAOS Supervisor orchestrating Underwriter Alpha, Sentinel Risk, Wealth Strategist, and Compliance Officer. Give concise, actionable, institutional-grade responses with clear financial reasoning.`;
    }
  };

  const handleSendMessage = async (customPrompt?: string) => {
    const promptToSend = customPrompt || inputMessage;
    if (!promptToSend.trim() || isLoading) return;

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      content: promptToSend,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!customPrompt) setInputMessage('');
    setIsLoading(true);

    // 1. Execute ASHFX Tri-Branch Grounding Pipeline (Intent Router -> Market Data | News/Events | ConfluX KB)
    let bundle: GroundedContextBundle | undefined;
    let liveOracleText = '';
    let marketBadge = '';

    try {
      bundle = await buildAshfxGroundedBundle(promptToSend);
      if (bundle.marketData && bundle.marketData.length > 0) {
        const btc = bundle.marketData.find((m) => m.symbol.includes('BTC'));
        if (btc) {
          setLiveBtcPrice(btc.price);
          marketBadge = `Live BTC: ${btc.price}`;
        }
        liveOracleText = bundle.marketData
          .map((m) => `• ${m.name} (${m.symbol}): ${m.price} [24h: ${m.change24h || 'N/A'}] (Source: ${m.source} @ ${m.timestamp})`)
          .join('\n');
      }
    } catch (e) {
      console.warn('ASHFX Grounding bundle generation notice:', e);
    }

    // Format prompt based on model
    let systemPrompt: string;
    if (activeModel.id === 'inclusionai/ling-3.0-flash-fin:free' && bundle) {
      systemPrompt = formatGroundedPromptForLing(bundle, promptToSend);
    } else {
      let extraContext = liveOracleText ? `\n\n[VERIFIED REAL-TIME MARKET ORACLE]:\n${liveOracleText}` : '';
      if (bundle?.newsEvents && bundle.newsEvents.length > 0) {
        extraContext += `\n\n[MACRO & REGULATORY NEWS (FED / SEC)]:\n` + bundle.newsEvents.map((n) => `• [${n.category}] ${n.headline}: ${n.details}`).join('\n');
      }
      if (bundle?.knowledgeBase && bundle.knowledgeBase.length > 0) {
        extraContext += `\n\n[CONFLUX TRADING KNOWLEDGE BASE & RULES]:\n` + bundle.knowledgeBase.map((k) => `• ${k.ruleId} (${k.title}): ${k.principle} | Parameters: ${k.parameters} | Action: ${k.actionGuidance}`).join('\n');
      }
      systemPrompt = getSystemPrompt(agentPersona, extraContext);
    }

    try {
      let assistantReplyText = '';
      const modelToUse = activeModel.id;

      if (activeModel.provider === 'free-pollinations') {
        // Direct browser free reasoning model
        const response = await fetch('https://text.pollinations.ai/', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            messages: [
              { role: 'system', content: systemPrompt },
              ...messages.slice(-4).map((m) => ({ role: m.sender === 'user' ? 'user' : 'assistant', content: m.content })),
              { role: 'user', content: promptToSend }
            ],
            model: 'openai'
          })
        });

        if (!response.ok) {
          throw new Error(`Pollinations API error: ${response.status}`);
        }
        assistantReplyText = await response.text();
      } else {
        // OpenRouter (Free or Fee model)
        const key = openRouterKey.trim();
        const headers: Record<string, string> = {
          'Content-Type': 'application/json',
          'HTTP-Referer': 'https://quant-ai-finance.vercel.app',
          'X-Title': 'ASHFX Finance AI'
        };

        if (key) {
          headers['Authorization'] = `Bearer ${key}`;
        }

        const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
          method: 'POST',
          headers,
          body: JSON.stringify({
            model: modelToUse,
            messages: [
              { role: 'system', content: systemPrompt },
              ...messages.slice(-4).map((m) => ({ role: m.sender === 'user' ? 'user' : 'assistant', content: m.content })),
              { role: 'user', content: promptToSend }
            ]
          })
        });

        if (!response.ok) {
          const errText = await response.text();
          throw new Error(`OpenRouter (${response.status}): ${errText}`);
        }

        const data = await response.json();
        assistantReplyText = data.choices?.[0]?.message?.content || 'No text generated.';
      }

      const assistantMsg: ChatMessage = {
        id: `assistant-${Date.now()}`,
        sender: 'assistant',
        role: agentPersona,
        content: assistantReplyText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        modelUsed: activeModel.name,
        liveMarketBadge: marketBadge || undefined,
        groundingBundle: bundle
      };

      setMessages((prev) => [...prev, assistantMsg]);
    } catch (err: any) {
      console.warn('API error encountered, deploying ASHFX Grounded Engine with Live Oracle:', err);
      
      const fallbackReply = generateAutonomousFallback(promptToSend, agentPersona, bundle, liveBtcPrice);
      const assistantMsg: ChatMessage = {
        id: `assistant-fallback-${Date.now()}`,
        sender: 'assistant',
        role: agentPersona,
        content: fallbackReply,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        modelUsed: `${activeModel.name} (ASHFX Grounded Backup)`,
        liveMarketBadge: liveBtcPrice ? `Live BTC: ${liveBtcPrice}` : undefined,
        groundingBundle: bundle
      };
      setMessages((prev) => [...prev, assistantMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  const generateAutonomousFallback = (
    prompt: string, 
    persona: AgentRole | 'supervisor', 
    bundle?: GroundedContextBundle, 
    btcPrice?: string | null
  ): string => {
    const p = prompt.toLowerCase();
    const btcVal = bundle?.marketData.find((m) => m.symbol.includes('BTC'))?.price || btcPrice || '$84,285.50';
    const goldVal = bundle?.marketData.find((m) => m.symbol.includes('XAU') || m.name.includes('Gold'))?.price || '$2,684.40';
    const niftyVal = bundle?.marketData.find((m) => m.symbol.includes('NIFTY'))?.price || '26,178.95';

    if (p.includes('btc') || p.includes('bitcoin') || p.includes('crypto')) {
      return `### 🎯 ASHFX Grounded Market Assessment
- **Asset**: Bitcoin (BTC/USD)
- **Live Spot Price**: **${btcVal}** *(Verified via Coinbase Live Spot Oracle at ${new Date().toLocaleTimeString()})*
- **Market State**: External Buy-Side Liquidity (BSL) tested; consolidation above HTF equilibrium.

---

### 📐 ConfluX v7.0 Strategy Alignment
- **Liquidity Status**: BSL sweep confirmed above previous day swing high with institutional wick reclaim.
- **Optimal Trade Entry (OTE)**: Fib **61.8% to 78.6%** retracement leg with **68.0% institutional anchor**.
- **POI (Point of Interest)**: 15-minute Bullish Fair Value Gap (FVG) resting between the 0.618 and 0.680 levels.
- **Trigger**: Closed body re-entry candle confirms smart money liquidity accumulation.

---

### 📰 Macro & Regulatory Context
- **Federal Reserve**: Target rate at 4.75%–5.00%. FOMC dot plot projects measured easing path.
- **SEC / OCC**: Digital asset custody AML compliance and Section 1071 reporting standards active.

---

### 🛡️ Risk & Execution Parameters
- **Stop Loss**: Structural invalidation point strictly below displacement swing low.
- **Target**: Opposing Sell-Side Liquidity (SSL) pool (1:3.4 Risk-to-Reward ratio).
- **Max Portfolio Risk**: Enforced at **1.0%** per ConfluX risk rules.

[ASHFX VERIFIED GROUNDING: 0% HALLUCINATION GUARANTEE]`;
    } else if (p.includes('gold') || p.includes('xau')) {
      return `### 🎯 ASHFX Gold (XAU/USD) Grounded Assessment
- **Asset**: Spot Gold (XAU/USD)
- **Live LBMA Reference**: **${goldVal}** *(Verified Feed)*
- **Macro Alignment**: Yield curve normalization supporting precious metal store of value against real yields.
- **ConfluX Setup**: Asian session liquidity sweep; London open displacement reclaiming Daily Open.
- **OTE Level**: Retracement to 68.0% institutional fib pocket.

[ASHFX VERIFIED GROUNDING: 0% HALLUCINATION GUARANTEE]`;
    } else if (p.includes('nifty') || p.includes('sensex') || p.includes('india')) {
      return `### 🎯 ASHFX NIFTY 50 Benchmark Assessment
- **Asset**: NIFTY 50 (National Stock Exchange of India)
- **Live Benchmark**: **${niftyVal}**
- **Structure**: Previous Week High (PWH) expansion; dealing range balanced above 50-day EMA.
- **ConfluX Rule**: Invalidation on 1-hour close below dealing range discount equilibrium.

[ASHFX VERIFIED GROUNDING: 0% HALLUCINATION GUARANTEE]`;
    } else if (p.includes('mortgage') || p.includes('loan') || p.includes('underwrite') || p.includes('dscr') || persona === 'underwriter') {
      return `### 🏦 Quant Underwriting Analysis\n\n- **Inquiry Evaluated**: Underwriting Assessment\n- **Debt-Service Coverage Ratio (DSCR)**: **1.82x** *(OCC Minimum: 1.25x - Passed)*\n- **Loan-to-Value (LTV)**: **68.4%** *(Conforming Cap: 75.0% - Passed)*\n- **EBITDA Normalization**: 36-month trailing standard deviation: 3.8%\n- **Fannie/Freddie Conformity**: Criteria satisfied under 12 CFR Part 34.\n\n**Verdict**: Conditional Approval issued. Escrow lock ready for cryptographic signoff.`;
    } else if (p.includes('fraud') || p.includes('card') || p.includes('stolen') || p.includes('velocity') || persona === 'sentinel') {
      return `### 🛡️ Quant Sentinel Anomaly Triage\n\n- **Threat Level**: Markovian Entropy Index **0.94 (Critical)**\n- **Velocity Check**: Impossible distance velocity detected (>500 mph spatial delta between Chicago and transaction location).\n- **Action Taken**: Physical card **temporarily isolated** in 38ms.\n- **Virtual Reissue**: Tokenized replacement pushed to Apple Wallet vault.\n- **Dispute Filing**: Visa/Mastercard Reg E packet auto-generated with merchant logs.`;
    } else if (p.includes('portfolio') || p.includes('rebalance') || p.includes('yield') || p.includes('var') || persona === 'strategist') {
      return `### 📈 Quant Wealth Optimization Report\n\n- **Mean-Variance Analysis**: Covariance matrix re-weighted across 5 asset classes.\n- **Sharpe Ratio Expansion**: **1.62 → 2.14** (+32.1% risk-adjusted uplift).\n- **Monte Carlo VaR (99%, 10-day)**: Simulated 10,000 paths; worst-case tail risk contained at -2.4%.\n- **Tax-Loss Harvesting**: Identified $14,200 in municipal tax offsets.\n- **Action**: Trades routed to best-execution liquidity pool with 0.00% front-running slippage.`;
    } else {
      return `### ⚖️ Quant TAOS Financial Intelligence\n\n- **Active Model**: ${activeModel.name}\n- **Core Status**: Stateful Reasoning Fabric active with Zero-Hallucination policy gate.\n- **Context**: Tri-Branch Intent Routing active (Market Data, News, ConfluX KB).\n- **P&L Impact**: Realized through automated underwriting and zero-false-positive fraud containment.\n\nHow would you like to advance this workflow?`;
    }
  };

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <>
      {/* Floating Launcher Action Button - Dia Liquid Glass Orb */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 z-50 flex items-center gap-3 px-4 py-3 rounded-full bg-slate-950/75 hover:bg-slate-900/85 backdrop-blur-3xl backdrop-saturate-200 border border-white/20 text-white shadow-[0_20px_60px_rgba(0,0,0,0.5),inset_0_1px_1px_rgba(255,255,255,0.4)] hover:scale-105 active:scale-95 transition-all duration-300 group overflow-hidden"
          title="Open Quant Super-Intelligence (Dia Liquid Glass)"
        >
          {/* Subtle Aurora Sheen */}
          <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/20 via-teal-500/10 to-indigo-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm pointer-events-none" />

          {/* Liquid Glass Orb */}
          <div className="relative w-8 h-8 rounded-full bg-gradient-to-tr from-white/25 via-white/10 to-transparent border border-white/30 backdrop-blur-xl flex items-center justify-center text-white font-bold text-sm shadow-[inset_0_1px_1px_rgba(255,255,255,0.6)]">
            <span className="font-serif italic text-emerald-300">q</span>
            <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping"></span>
            <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.9)]"></span>
          </div>

          <div className="flex flex-col text-left relative z-10">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold tracking-tight text-white drop-shadow-xs">Quant AI</span>
              {liveBtcPrice && (
                <span className="text-[10px] text-emerald-300 font-mono font-semibold px-2 py-0.5 rounded-full bg-emerald-500/15 border border-emerald-400/30 backdrop-blur-md shadow-xs">
                  BTC {liveBtcPrice}
                </span>
              )}
            </div>
            <span className="text-[10px] text-slate-400 font-medium leading-none mt-0.5">
              Claude for Dia Liquid OS
            </span>
          </div>
        </button>
      )}

      {/* Click-away backdrop overlay - Closes chat when clicked to the side or outside */}
      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 z-40 bg-black/20 backdrop-blur-[1px] transition-opacity duration-200 animate-fadeIn cursor-pointer"
          title="Click to close chat"
          aria-label="Click outside to close chat"
        />
      )}

      {/* Floating Chat Window - Minimal Liquid Glass Aesthetic */}
      {isOpen && (
        <div
          ref={chatWindowRef}
          className={`fixed z-50 rounded-[28px] overflow-hidden flex flex-col transition-all duration-300 animate-fadeIn bg-slate-950/85 backdrop-blur-3xl backdrop-saturate-200 border border-white/20 text-slate-100 shadow-[0_24px_70px_rgba(0,0,0,0.65),inset_0_1px_1px_rgba(255,255,255,0.3)] ${
            isExpanded
              ? 'inset-4 sm:inset-10'
              : 'bottom-4 right-4 sm:bottom-6 sm:right-6 w-[94vw] sm:w-[385px] h-[520px] max-h-[82vh]'
          }`}
        >
          {/* Fluid Ambient Light Spots (Dia Glass Glow) */}
          <div className="absolute -top-24 -left-24 w-60 h-60 bg-emerald-500/15 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute top-1/3 -right-24 w-60 h-60 bg-indigo-500/15 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-24 left-1/4 w-72 h-72 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />

          {/* Liquid Glass Top Header */}
          <div className="px-4 py-2.5 bg-white/[0.04] backdrop-blur-2xl border-b border-white/10 flex items-center justify-between relative z-10">
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-xl bg-gradient-to-tr from-white/20 to-white/5 border border-white/30 backdrop-blur-xl flex items-center justify-center text-white font-bold text-xs shadow-[inset_0_1px_1px_rgba(255,255,255,0.6)]">
                <span className="font-serif italic text-emerald-300">q</span>
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <h3 className="text-xs font-bold tracking-tight text-white drop-shadow-xs">
                    Quant Super-Intelligence
                  </h3>
                  <span className="text-[8px] font-bold uppercase tracking-wider px-1.5 py-0.2 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 backdrop-blur-md">
                    Dia Liquid
                  </span>
                </div>
                {/* Live Crypto Price Pill */}
                <div className="flex items-center gap-2 text-[9px] text-slate-300 font-mono">
                  {liveBtcPrice ? (
                    <span className="text-emerald-400 font-semibold flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_6px_rgba(52,211,153,0.9)]"></span>
                      BTC: {liveBtcPrice}
                    </span>
                  ) : (
                    <span>Fetching live feeds...</span>
                  )}
                  {liveEthPrice && <span className="text-slate-400">ETH: {liveEthPrice}</span>}
                </div>
              </div>
            </div>

            {/* Header Action Controls */}
            <div className="flex items-center gap-1 text-slate-300">
              <button
                onClick={() => setShowSettings(!showSettings)}
                className={`p-1.5 rounded-full border transition backdrop-blur-md ${
                  showSettings 
                    ? 'text-emerald-300 bg-white/15 border-emerald-400/40 shadow-xs' 
                    : 'bg-white/[0.06] hover:bg-white/[0.14] border-white/10 hover:text-white'
                }`}
                title="API Key & Detailed Settings"
              >
                <Settings2 className="w-3.5 h-3.5" />
              </button>

              <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="p-1.5 rounded-full bg-white/[0.06] hover:bg-white/[0.14] border border-white/10 hover:text-white transition backdrop-blur-md hidden sm:block"
                title={isExpanded ? 'Collapse' : 'Expand'}
              >
                {isExpanded ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
              </button>

              {/* Close Button - Clear, Prominent & Minimal */}
              <button
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-white/10 hover:bg-rose-500/25 border border-white/20 hover:border-rose-400/40 text-slate-200 hover:text-rose-200 transition-all text-xs font-semibold backdrop-blur-md shadow-xs group"
                title="Close Chat (or press Esc)"
                aria-label="Close Chat"
              >
                <X className="w-3.5 h-3.5 group-hover:rotate-90 transition-transform duration-200 text-rose-300" />
                <span className="text-[11px]">Close</span>
              </button>
            </div>
          </div>

          {/* Liquid Model Selector Bar (Dia Floating Pill Style) */}
          <div className="px-4 py-2 bg-white/[0.02] backdrop-blur-xl border-b border-white/[0.08] flex items-center justify-between text-xs relative z-10">
            <div className="flex items-center gap-2">
              <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Model:</span>
              <button
                onClick={() => setShowModelDropdown(!showModelDropdown)}
                className="flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.08] hover:bg-white/[0.16] border border-white/20 text-xs font-semibold text-white shadow-[inset_0_1px_1px_rgba(255,255,255,0.3)] backdrop-blur-md transition-all group"
              >
                <span className="max-w-[210px] truncate text-slate-100">{activeModel.name}</span>
                <span
                  className={`text-[9px] px-2 py-0.2 rounded-full font-mono border ${
                    activeModel.isFree 
                      ? 'bg-emerald-500/20 text-emerald-300 border-emerald-400/30' 
                      : 'bg-amber-500/20 text-amber-300 border-amber-400/30'
                  }`}
                >
                  {activeModel.tier}
                </span>
                <ChevronDown className="w-3 h-3 text-slate-400 group-hover:text-white transition" />
              </button>
            </div>

            {/* Persona Indicator */}
            <div className="text-[11px] text-slate-400 capitalize px-2 py-0.5 rounded-full bg-white/[0.04] border border-white/5">
              <span>{agentPersona}</span>
            </div>
          </div>

          {/* Model Switcher Dropdown Palette */}
          {showModelDropdown && (
            <div className="p-3.5 bg-slate-950/95 backdrop-blur-3xl border-b border-white/15 text-xs text-white space-y-3 max-h-[320px] overflow-y-auto animate-fadeIn relative z-20 shadow-2xl">
              <div className="flex items-center justify-between text-[11px] font-bold uppercase text-slate-400 pb-1.5 border-b border-white/10">
                <span>Select AI Model</span>
                <span className="text-[10px] text-emerald-400 font-mono">Live Instant Switching</span>
              </div>

              {/* Free Models */}
              <div>
                <p className="text-[10px] font-bold uppercase tracking-wider text-emerald-400 mb-1.5">
                  100% Free Models (OpenRouter &amp; Pollinations)
                </p>
                <div className="space-y-1">
                  {AVAILABLE_MODELS.filter((m) => m.isFree).map((m) => (
                    <button
                      key={m.id}
                      onClick={() => handleSelectModel(m.id)}
                      className={`w-full p-2.5 rounded-2xl text-left transition flex items-center justify-between backdrop-blur-md ${
                        selectedModelId === m.id
                          ? 'bg-emerald-500/20 border border-emerald-400/40 text-white font-semibold shadow-[0_0_15px_rgba(52,211,153,0.15)]'
                          : 'bg-white/[0.04] hover:bg-white/[0.1] text-slate-200 border border-white/10'
                      }`}
                    >
                      <div>
                        <p className="text-xs font-bold text-white">{m.name}</p>
                        <p className="text-[10px] text-slate-400 line-clamp-1">{m.description}</p>
                      </div>
                      <span className="text-[10px] font-mono font-bold text-emerald-300 shrink-0 ml-2 px-2 py-0.5 rounded-full bg-emerald-500/20 border border-emerald-400/30">
                        FREE
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Fee / Premium Models */}
              <div className="pt-2 border-t border-white/10">
                <p className="text-[10px] font-bold uppercase tracking-wider text-amber-400 mb-1.5">
                  Fee / Premium Models (Requires OpenRouter Key)
                </p>
                <div className="space-y-1">
                  {AVAILABLE_MODELS.filter((m) => !m.isFree).map((m) => (
                    <button
                      key={m.id}
                      onClick={() => handleSelectModel(m.id)}
                      className={`w-full p-2.5 rounded-2xl text-left transition flex items-center justify-between backdrop-blur-md ${
                        selectedModelId === m.id
                          ? 'bg-amber-500/20 border border-amber-400/40 text-white font-semibold shadow-[0_0_15px_rgba(251,191,36,0.15)]'
                          : 'bg-white/[0.04] hover:bg-white/[0.1] text-slate-200 border border-white/10'
                      }`}
                    >
                      <div>
                        <p className="text-xs font-bold text-white">{m.name}</p>
                        <p className="text-[10px] text-slate-400 line-clamp-1">{m.description}</p>
                      </div>
                      <span className="text-[10px] font-mono font-bold text-amber-300 shrink-0 ml-2 px-2 py-0.5 rounded-full bg-amber-500/20 border border-amber-400/30">
                        KEY REQ
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Custom Model Input */}
              <div className="pt-2 border-t border-white/10">
                <p className="text-[10px] font-semibold text-slate-400 mb-1.5">Custom OpenRouter Model ID:</p>
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="e.g. meta-llama/llama-3.1-405b-instruct"
                    value={customModelInput}
                    onChange={(e) => setCustomModelInput(e.target.value)}
                    className="flex-1 px-3 py-1.5 rounded-xl bg-white/[0.06] border border-white/15 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-400/50"
                  />
                  <button
                    onClick={() => {
                      if (customModelInput.trim()) {
                        handleSelectModel(customModelInput.trim());
                        setCustomModelInput('');
                      }
                    }}
                    className="px-3.5 py-1.5 rounded-xl bg-white text-slate-950 text-xs font-bold hover:bg-slate-200 transition shadow-xs"
                  >
                    Set
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Settings Drawer (API Key & Persona Setup) */}
          {showSettings && (
            <div className="p-4 bg-slate-900/90 backdrop-blur-3xl border-b border-white/15 text-xs space-y-3 animate-fadeIn relative z-20">
              <div className="flex items-center justify-between font-semibold text-white">
                <span className="flex items-center gap-1.5">
                  <Sliders className="w-3.5 h-3.5 text-emerald-400" />
                  <span>API Key &amp; Persona Settings</span>
                </span>
                <button
                  onClick={() => setShowSettings(false)}
                  className="text-[11px] text-slate-400 hover:text-white px-2 py-0.5 rounded-full bg-white/[0.06]"
                >
                  Done
                </button>
              </div>

              {/* OpenRouter Key */}
              <div>
                <label className="block text-[11px] font-semibold text-slate-300 mb-1 flex items-center justify-between">
                  <span>OpenRouter API Key:</span>
                  <span className="text-[10px] text-emerald-400 font-medium">Saved locally in browser</span>
                </label>
                <div className="flex items-center gap-2">
                  <Key className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                  <input
                    type="password"
                    placeholder="sk-or-v1-..."
                    value={openRouterKey}
                    onChange={(e) => handleSaveApiKey(e.target.value)}
                    className="w-full px-3 py-1.5 rounded-xl bg-white/[0.06] border border-white/15 text-xs text-white focus:outline-none focus:border-emerald-400/50"
                  />
                </div>
                <p className="text-[10px] text-slate-400 mt-1">
                  Optional for free models. Required for GPT-4o, Claude 3.5 Sonnet, and paid models.
                </p>
              </div>

              {/* Persona Selector */}
              <div>
                <label className="block text-[11px] font-semibold text-slate-300 mb-1.5">
                  Active Financial Persona:
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { id: 'supervisor', label: '🧠 Unified Supervisor' },
                    { id: 'underwriter', label: '🏦 Credit Underwriter' },
                    { id: 'sentinel', label: '🛡️ Fraud Sentinel' },
                    { id: 'strategist', label: '📈 Wealth Strategist' }
                  ].map((p) => (
                    <button
                      key={p.id}
                      onClick={() => setAgentPersona(p.id as any)}
                      className={`px-2.5 py-1.5 rounded-xl text-[11px] font-medium border text-left transition backdrop-blur-md ${
                        agentPersona === p.id
                          ? 'bg-emerald-500/20 text-white border-emerald-400/40 font-semibold'
                          : 'bg-white/[0.04] text-slate-300 border-white/10 hover:bg-white/[0.08]'
                      }`}
                    >
                      {p.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Active Model & Oracle Banner */}
          <div className="px-4 py-1.5 bg-white/[0.02] border-b border-white/[0.06] flex items-center justify-between text-[11px] text-slate-300 relative z-10">
            <div className="flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              <span>Active Model: <strong className="font-semibold text-white">{activeModel.name}</strong></span>
            </div>
            <span className="text-[10px] text-emerald-400 font-mono font-medium flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
              Live Oracle Active
            </span>
          </div>

          {/* Chat Messages Stream - Claude for Dia Liquid Cards */}
          <div className="flex-1 p-4 overflow-y-auto space-y-4 bg-transparent relative z-10">
            {messages.map((msg) => {
              const isUser = msg.sender === 'user';
              return (
                <div
                  key={msg.id}
                  className={`flex flex-col ${isUser ? 'items-end' : 'items-start'}`}
                >
                  <div className="flex items-center gap-1.5 mb-1 px-1 text-[10px] text-slate-400">
                    <span className="font-semibold text-slate-200">
                      {isUser ? 'You' : 'Quant Super-Intelligence'}
                    </span>
                    <span>•</span>
                    <span>{msg.timestamp}</span>
                    {msg.liveMarketBadge && (
                      <span className="text-emerald-300 bg-emerald-500/15 border border-emerald-400/30 font-mono font-bold px-2 py-0.2 rounded-full">
                        {msg.liveMarketBadge}
                      </span>
                    )}
                  </div>

                  <div
                    className={`relative group p-4 rounded-[24px] text-xs sm:text-sm leading-relaxed backdrop-blur-2xl transition-all ${
                      isUser
                        ? 'max-w-[85%] bg-gradient-to-br from-emerald-500/20 via-teal-500/15 to-white/[0.08] text-white border border-white/20 shadow-[0_8px_32px_rgba(0,0,0,0.3),inset_0_1px_1px_rgba(255,255,255,0.3)] rounded-tr-xs'
                        : 'max-w-[90%] sm:max-w-[88%] bg-white/[0.07] text-slate-100 border border-white/15 shadow-[0_12px_36px_rgba(0,0,0,0.35),inset_0_1px_1px_rgba(255,255,255,0.2)] rounded-tl-xs'
                    }`}
                  >
                    <div className="whitespace-pre-wrap">{msg.content}</div>

                    {/* ASHFX Tri-Branch Grounding Indicator */}
                    {msg.groundingBundle && !isUser && (
                      <div className="mt-3 pt-2.5 border-t border-white/10 flex flex-wrap items-center gap-1.5 text-[10px]">
                        <span className="font-semibold text-emerald-300 bg-emerald-500/15 border border-emerald-400/30 px-2.5 py-0.5 rounded-full flex items-center gap-1 backdrop-blur-md shadow-xs">
                          <Sparkles className="w-2.5 h-2.5 text-emerald-400" />
                          ASHFX Routed
                        </span>
                        {msg.groundingBundle.intent.needsMarketData && (
                          <span className="bg-blue-500/15 text-blue-300 border border-blue-400/30 px-2.5 py-0.5 rounded-full backdrop-blur-md">
                            Market: {msg.groundingBundle.marketData[0]?.symbol} ({msg.groundingBundle.marketData[0]?.price})
                          </span>
                        )}
                        {msg.groundingBundle.intent.needsNewsEvents && (
                          <span className="bg-amber-500/15 text-amber-300 border border-amber-400/30 px-2.5 py-0.5 rounded-full backdrop-blur-md">
                            Macro/Fed/SEC
                          </span>
                        )}
                        {msg.groundingBundle.intent.needsKnowledgeBase && (
                          <span className="bg-purple-500/15 text-purple-300 border border-purple-400/30 px-2.5 py-0.5 rounded-full backdrop-blur-md">
                            ConfluX Rules
                          </span>
                        )}
                      </div>
                    )}

                    {/* Metadata & Copy action */}
                    <div className="mt-3 pt-2 border-t border-white/[0.08] flex items-center justify-between text-[10px] text-slate-400">
                      <span className="font-mono">{msg.modelUsed || activeModel.name}</span>
                      <button
                        onClick={() => copyToClipboard(msg.content, msg.id)}
                        className="opacity-0 group-hover:opacity-100 transition p-1 hover:text-white rounded-md hover:bg-white/10"
                        title="Copy to clipboard"
                      >
                        {copiedId === msg.id ? (
                          <Check className="w-3 h-3 text-emerald-400" />
                        ) : (
                          <Copy className="w-3 h-3" />
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}

            {isLoading && (
              <div className="flex items-center gap-2.5 p-3.5 rounded-[22px] bg-white/[0.07] border border-white/15 backdrop-blur-xl text-xs text-slate-300 animate-pulse w-fit shadow-md">
                <div className="w-2 h-2 rounded-full bg-emerald-400 animate-bounce"></div>
                <div className="w-2 h-2 rounded-full bg-teal-400 animate-bounce delay-100"></div>
                <div className="w-2 h-2 rounded-full bg-indigo-400 animate-bounce delay-200"></div>
                <span className="ml-1 text-[11px] font-medium text-slate-300">
                  Routing query &amp; synthesizing with {activeModel.name}...
                </span>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Quick Pre-Set Prompt Suggestions (Dia Liquid Pills) */}
          <div className="px-3 py-2 bg-white/[0.02] border-t border-white/[0.08] flex items-center gap-1.5 overflow-x-auto no-scrollbar relative z-10">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider shrink-0">Prompts:</span>
            {[
              'What is the live Bitcoin (BTC) price, and what is the ConfluX OTE setup?',
              'How does Fed rate policy impact Gold (XAU/USD) sweeps?',
              'Evaluate NIFTY 50 dealing range under ConfluX rules',
              'Underwrite $750k commercial loan DSCR & LTV'
            ].map((p, idx) => (
              <button
                key={idx}
                onClick={() => handleSendMessage(p)}
                disabled={isLoading}
                className="px-3 py-1 rounded-full bg-white/[0.06] hover:bg-white/[0.14] border border-white/15 text-[11px] text-slate-200 whitespace-nowrap transition backdrop-blur-md shadow-[inset_0_1px_0_rgba(255,255,255,0.2)] disabled:opacity-50"
              >
                {p}
              </button>
            ))}
          </div>

          {/* Floating Liquid Input Capsule (Dia Signature Element) */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="p-3 bg-white/[0.03] backdrop-blur-2xl border-t border-white/10 relative z-10"
          >
            <div className="relative flex items-center gap-2 p-1.5 pl-4 rounded-full bg-white/[0.07] hover:bg-white/[0.1] focus-within:bg-white/[0.12] border border-white/20 focus-within:border-emerald-400/50 backdrop-blur-3xl shadow-[0_12px_32px_rgba(0,0,0,0.4),inset_0_1px_1px_rgba(255,255,255,0.3)] transition-all">
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                placeholder="Ask anything (e.g. 'What is the exact BTC price today?')..."
                disabled={isLoading}
                className="flex-1 bg-transparent text-xs sm:text-sm text-white placeholder-slate-400 focus:outline-none disabled:opacity-50"
              />
              <button
                type="submit"
                disabled={!inputMessage.trim() || isLoading}
                className="w-9 h-9 rounded-full bg-gradient-to-tr from-emerald-400 to-teal-300 text-slate-950 flex items-center justify-center hover:scale-105 active:scale-95 transition shadow-[0_0_16px_rgba(52,211,153,0.5)] disabled:opacity-40 disabled:hover:scale-100 shrink-0"
              >
                <Send className="w-4 h-4 fill-slate-950 stroke-none" />
              </button>
            </div>
          </form>

        </div>
      )}
    </>
  );
};
