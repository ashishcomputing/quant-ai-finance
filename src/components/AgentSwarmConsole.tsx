import React, { useState } from 'react';
import { QuantAgent, AgentRole } from '../types';
import { INITIAL_AGENTS } from '../data/mockFinancialData';
import { Send, CheckCircle2, Shield, AlertTriangle, Sparkles, MessageSquare, Terminal, RefreshCw, Cpu } from 'lucide-react';

interface SwarmMessage {
  id: string;
  sender: string;
  role: AgentRole | 'user' | 'system';
  content: string;
  timestamp: string;
  metadata?: string;
}

export const AgentSwarmConsole: React.FC = () => {
  const [agents, setAgents] = useState<QuantAgent[]>(INITIAL_AGENTS);
  const [selectedAgent, setSelectedAgent] = useState<AgentRole>('underwriter');
  const [inputPrompt, setInputPrompt] = useState('');
  const [messages, setMessages] = useState<SwarmMessage[]>([
    {
      id: 'm-1',
      sender: 'Quant Underwriter Alpha',
      role: 'underwriter',
      content: 'Initiated cashflow audit for Commercial Borrower #9021. P&L normalization completed across 36 trailing months. EBITDA volatility: 4.2% (well within OCC parameters).',
      timestamp: '10:42 AM',
      metadata: 'Model: TAOS-Financial-Reasoning-v2'
    },
    {
      id: 'm-2',
      sender: 'Quant Compliance Officer',
      role: 'compliance',
      content: 'Verified HMDA and Disparate Impact non-bias criteria for underwriter approval gate. Zero demographic deviation detected. Cryptographic governance hash anchored.',
      timestamp: '10:43 AM',
      metadata: 'Validation Rule: CFPB Reg B'
    },
    {
      id: 'm-3',
      sender: 'Quant Sentinel Risk',
      role: 'sentinel',
      content: 'Simultaneously isolated anomalous card authorization sequence in Singapore clearing rail. Virtual replacement card generated and injected into Apple Pay vault in 42ms.',
      timestamp: '10:44 AM',
      metadata: 'Markov Entropy: 0.94 → 0.02'
    },
    {
      id: 'm-4',
      sender: 'Quant Wealth Strategist',
      role: 'strategist',
      content: 'Calculated 10,000-path Monte Carlo VaR (99%) for institutional custodial accounts. Tax-loss harvesting opportunities harvested $14,200 with zero tracking error drift.',
      timestamp: '10:45 AM',
      metadata: 'Sharpe Optimized: 1.62 → 2.14'
    }
  ]);

  const [isProcessing, setIsProcessing] = useState(false);

  const handleSendMessage = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!inputPrompt.trim() || isProcessing) return;

    const userMsg: SwarmMessage = {
      id: `user-${Date.now()}`,
      sender: 'Executive Operator',
      role: 'user',
      content: inputPrompt,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMsg]);
    const promptText = inputPrompt;
    setInputPrompt('');
    setIsProcessing(true);

    // Simulate multi-agent coordinated reasoning
    setTimeout(() => {
      const activeAgent = agents.find((a) => a.role === selectedAgent) || agents[0];
      
      let responseContent = '';
      if (selectedAgent === 'underwriter') {
        responseContent = `Evaluating request: "${promptText}". Ingesting core banking ledger and IRS tax filings. Debt-Service Coverage Ratio (DSCR) modelled at 1.84x. Conforms with secondary market purchase guidelines. Ready to emit conditional term sheet.`;
      } else if (selectedAgent === 'sentinel') {
        responseContent = `Scanning real-time payment telemetry for "${promptText}". Zero authorization anomalies flagged. Velocity trajectory conforms to baseline historical behavioral graph (99.8% confidence).`;
      } else if (selectedAgent === 'strategist') {
        responseContent = `Synthesizing market regime for "${promptText}". Yield curve flattening scenario stress-tested across 10,000 Monte Carlo paths. Rebalancing equity/fixed-income weights with target Sharpe ratio 2.18.`;
      } else {
        responseContent = `Regulatory compliance filter executed for "${promptText}". Satisfies FinCEN, OCC 12 CFR Part 34, and Dodd-Frank Section 1071. Immutable audit receipt logged to TAOS distributed ledger.`;
      }

      const agentReply: SwarmMessage = {
        id: `agent-${Date.now()}`,
        sender: activeAgent.name,
        role: activeAgent.role,
        content: responseContent,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        metadata: `Stateful Memory Checkpoint • Confidence: ${activeAgent.confidenceScore}%`
      };

      setMessages((prev) => [...prev, agentReply]);
      setIsProcessing(false);

      // Increment completed task count
      setAgents((prev) =>
        prev.map((a) => (a.role === selectedAgent ? { ...a, completedTasks: a.completedTasks + 1 } : a))
      );
    }, 1100);
  };

  const triggerPreset = (prompt: string, targetRole: AgentRole) => {
    setSelectedAgent(targetRole);
    setInputPrompt(prompt);
  };

  return (
    <div className="bg-white rounded-3xl border border-gray-200/80 p-6 sm:p-8 shadow-sm">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-gray-100">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold tracking-wider uppercase bg-gray-100 text-gray-800">
              Autonomous Swarm
            </span>
            <span className="text-xs text-gray-400">•</span>
            <span className="text-xs text-gray-500 font-medium">Quant Digital Employees</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-gray-950">
            Intelligent Digital Employees
          </h2>
          <p className="text-sm text-gray-600 mt-1 max-w-2xl">
            Specialized financial agents working concurrently inside the Stateful Reasoning Fabric. They reason, cross-validate decisions, and escalate edge cases automatically.
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs text-gray-500">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
          <span>4 Agents Operating in Parallel</span>
        </div>
      </div>

      {/* Agents Roster Cards */}
      <div className="my-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {agents.map((agent) => {
          const isSelected = selectedAgent === agent.role;
          return (
            <div
              key={agent.id}
              onClick={() => setSelectedAgent(agent.role)}
              className={`p-4 rounded-2xl border transition-all duration-200 cursor-pointer ${
                isSelected
                  ? 'border-gray-950 bg-gray-950 text-white shadow-md'
                  : 'border-gray-200/80 bg-white hover:border-gray-300'
              }`}
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-2xl">{agent.avatar}</span>
                <span
                  className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${
                    isSelected
                      ? 'bg-gray-800 text-emerald-400'
                      : 'bg-emerald-50 text-emerald-700'
                  }`}
                >
                  {agent.confidenceScore}% Acc
                </span>
              </div>

              <h4 className={`text-sm font-bold tracking-tight ${isSelected ? 'text-white' : 'text-gray-950'}`}>
                {agent.name}
              </h4>

              <p className={`text-[11px] font-medium mb-2 ${isSelected ? 'text-gray-300' : 'text-gray-500'}`}>
                {agent.title}
              </p>

              <p className={`text-xs line-clamp-2 leading-relaxed mb-3 ${isSelected ? 'text-gray-400' : 'text-gray-600'}`}>
                {agent.specialization}
              </p>

              <div className="pt-2 border-t border-gray-100/20 flex items-center justify-between text-[11px]">
                <span className={isSelected ? 'text-gray-400' : 'text-gray-400'}>
                  Resolved: <strong>{agent.completedTasks.toLocaleString()}</strong>
                </span>
                <span className={`font-semibold ${isSelected ? 'text-emerald-400' : 'text-emerald-600'}`}>
                  Online
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Collaborative Swarm Dialogue Console */}
      <div className="rounded-2xl border border-gray-200/80 bg-[#f5f5f7] overflow-hidden">
        
        {/* Terminal Header */}
        <div className="bg-white px-5 py-3 border-b border-gray-200/80 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Terminal className="w-4 h-4 text-gray-700" />
            <span className="text-xs font-bold uppercase tracking-wider text-gray-900">
              Stateful Multi-Agent Conversation Fabric
            </span>
          </div>
          <span className="text-xs text-gray-500 font-mono">
            Addressing: <strong className="text-gray-950">{agents.find((a) => a.role === selectedAgent)?.name}</strong>
          </span>
        </div>

        {/* Messages Stream */}
        <div className="p-4 sm:p-6 space-y-3.5 max-h-[380px] overflow-y-auto">
          {messages.map((msg) => {
            const isUser = msg.role === 'user';
            return (
              <div
                key={msg.id}
                className={`flex flex-col ${isUser ? 'items-end' : 'items-start'}`}
              >
                <div className="flex items-center gap-2 mb-1 px-1">
                  <span className="text-xs font-bold text-gray-900">{msg.sender}</span>
                  <span className="text-[10px] text-gray-400">{msg.timestamp}</span>
                </div>

                <div
                  className={`max-w-[85%] sm:max-w-[75%] p-3.5 rounded-2xl text-xs sm:text-sm leading-relaxed shadow-xs ${
                    isUser
                      ? 'bg-gray-950 text-white rounded-tr-xs'
                      : 'bg-white text-gray-800 border border-gray-200/80 rounded-tl-xs'
                  }`}
                >
                  <p>{msg.content}</p>

                  {msg.metadata && (
                    <div className="mt-2 pt-2 border-t border-gray-100 text-[10px] text-gray-400 font-mono flex items-center gap-1.5">
                      <Sparkles className="w-3 h-3 text-emerald-500" />
                      <span>{msg.metadata}</span>
                    </div>
                  )}
                </div>
              </div>
            );
          })}

          {isProcessing && (
            <div className="flex items-center gap-2 p-3 rounded-xl bg-white border border-gray-200/70 text-xs text-gray-600 animate-pulse w-fit">
              <RefreshCw className="w-3.5 h-3.5 animate-spin text-gray-600" />
              <span>Multi-agent consensus check running in Stateful Reasoning Fabric...</span>
            </div>
          )}
        </div>

        {/* Quick Pre-Set Prompt Buttons */}
        <div className="px-4 py-2 bg-white/60 border-t border-gray-200/60 flex items-center gap-2 overflow-x-auto no-scrollbar">
          <span className="text-[10px] font-semibold uppercase text-gray-400 shrink-0">Quick Prompts:</span>
          <button
            onClick={() => triggerPreset('Audit cashflows for $1.2M commercial credit line application', 'underwriter')}
            className="px-2.5 py-1 rounded-full bg-white border border-gray-200 text-[11px] text-gray-700 hover:text-gray-950 hover:border-gray-400 transition whitespace-nowrap"
          >
            📊 Underwrite $1.2M Line of Credit
          </button>
          <button
            onClick={() => triggerPreset('Flag velocity anomaly: 3 cards swiped in 4 countries simultaneously', 'sentinel')}
            className="px-2.5 py-1 rounded-full bg-white border border-gray-200 text-[11px] text-gray-700 hover:text-gray-950 hover:border-gray-400 transition whitespace-nowrap"
          >
            🛡️ High Velocity Fraud Alert
          </button>
          <button
            onClick={() => triggerPreset('Run Monte Carlo 10k simulations to stress test portfolio against rate hike', 'strategist')}
            className="px-2.5 py-1 rounded-full bg-white border border-gray-200 text-[11px] text-gray-700 hover:text-gray-950 hover:border-gray-400 transition whitespace-nowrap"
          >
            📈 Stress Test Rate Hike VaR
          </button>
          <button
            onClick={() => triggerPreset('Verify SAR filing compliance under FinCEN BSA Rule 1020', 'compliance')}
            className="px-2.5 py-1 rounded-full bg-white border border-gray-200 text-[11px] text-gray-700 hover:text-gray-950 hover:border-gray-400 transition whitespace-nowrap"
          >
            ⚖️ FinCEN SAR Audit
          </button>
        </div>

        {/* Input Bar */}
        <form onSubmit={handleSendMessage} className="p-3 bg-white border-t border-gray-200/80 flex items-center gap-2">
          <input
            type="text"
            value={inputPrompt}
            onChange={(e) => setInputPrompt(e.target.value)}
            placeholder={`Instruct ${agents.find((a) => a.role === selectedAgent)?.name}...`}
            className="flex-1 px-4 py-2.5 rounded-full bg-gray-100 border border-gray-200 text-xs sm:text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-950 transition"
          />
          <button
            type="submit"
            disabled={!inputPrompt.trim() || isProcessing}
            className="p-2.5 rounded-full bg-gray-950 text-white hover:bg-gray-800 disabled:opacity-40 transition shadow-xs"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>

      </div>

    </div>
  );
};
