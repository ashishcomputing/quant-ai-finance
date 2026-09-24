import React, { useState } from 'react';
import { Terminal, Send, Play, Sparkles, CheckCircle2, ShieldAlert, Cpu, ArrowRight } from 'lucide-react';
import confetti from 'canvas-confetti';

interface LiveInteractiveSandboxProps {
  onWorkflowSelect?: (wfId: string) => void;
}

export const LiveInteractiveSandbox: React.FC<LiveInteractiveSandboxProps> = ({ onWorkflowSelect }) => {
  const [prompt, setPrompt] = useState('');
  const [isExecuting, setIsExecuting] = useState(false);
  const [outputStream, setOutputStream] = useState<string[]>([]);
  const [activeStep, setActiveStep] = useState<string | null>(null);

  const presets = [
    {
      title: 'Underwrite $450k Mortgage',
      query: 'Underwrite commercial property loan of $450,000 for Apex Dynamics LLC with OCC debt coverage ratio verification.'
    },
    {
      title: 'Mitigate Card Fraud $4,850',
      query: 'Flag impossible travel transaction for Marcus Vance ($4,850 in Singapore) and auto-reissue instant Apple Pay card.'
    },
    {
      title: 'Sharpe Portfolio Rebalance',
      query: 'Optimize $1.45M private banking portfolio to maximize Sharpe ratio and execute $14,200 in tax-loss harvesting.'
    },
    {
      title: 'Cross-Border FX €850k',
      query: 'Route €850,000 EUR to USD wire settlement through lowest slippage liquidity pool with OFAC sanctions check.'
    }
  ];

  const handleExecute = (customPrompt?: string) => {
    const textToRun = customPrompt || prompt;
    if (!textToRun.trim() || isExecuting) return;

    setIsExecuting(true);
    setOutputStream([`[INGESTION] Received query: "${textToRun}"`]);
    setActiveStep('Intent & Entity Parsing');

    setTimeout(() => {
      setOutputStream((prev) => [
        ...prev,
        `[STATE S_0] Bound session context to customer historical graph. Memory recall: 99.8%.`
      ]);
      setActiveStep('Biometric & KYC Gate');
    }, 600);

    setTimeout(() => {
      setOutputStream((prev) => [
        ...prev,
        `[STATE S_1] Zero-knowledge KYC verified. FinCEN/OFAC watchlist clearance: 0 matches.`
      ]);
      setActiveStep('Markovian Risk & Stochastic Simulation');
    }, 1300);

    setTimeout(() => {
      setOutputStream((prev) => [
        ...prev,
        `[STATE S_2] Stochastic evaluation complete. Default Probability: 0.38%. Value-at-Risk(99%): within threshold.`
      ]);
      setActiveStep('Governance & Policy Check');
    }, 2000);

    setTimeout(() => {
      setOutputStream((prev) => [
        ...prev,
        `[STATE S_3] Regulatory policy invariants passed (OCC 12 CFR Part 34 & CFPB Reg B).`
      ]);
      setActiveStep('Autonomous Execution');
    }, 2700);

    setTimeout(() => {
      setOutputStream((prev) => [
        ...prev,
        `[STATE S_4] Transaction committed to core banking ledger. Cryptographic audit hash: 0x9e12...b441.`,
        `[COMPLETE] Quant TAOS successfully delivered autonomous result with compounding P&L capture.`
      ]);
      setActiveStep('Settlement Completed');
      setIsExecuting(false);
      try {
        confetti({ particleCount: 50, spread: 60, origin: { y: 0.7 } });
      } catch {}
    }, 3400);
  };

  return (
    <div className="bg-white rounded-3xl border border-gray-200/80 p-6 sm:p-8 shadow-sm">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-gray-100">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold tracking-wider uppercase bg-gray-100 text-gray-800">
              Interactive Execution
            </span>
            <span className="text-xs text-gray-400">•</span>
            <span className="text-xs text-gray-500 font-medium">Real-Time TAOS Financial Sandbox</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-gray-950">
            Live Quant Agent Command Console
          </h2>
          <p className="text-sm text-gray-600 mt-1 max-w-2xl">
            Test any banking operation, credit underwriting task, or algorithmic portfolio query to witness the Stateful Reasoning Fabric in action.
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs text-emerald-700 bg-emerald-50 px-3 py-1.5 rounded-full border border-emerald-200">
          <Sparkles className="w-3.5 h-3.5" />
          <span className="font-semibold">Zero Hallucination Policy Gate Active</span>
        </div>
      </div>

      {/* Preset Action Buttons */}
      <div className="my-6">
        <p className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-3">
          Select an Enterprise Financial Scenario:
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {presets.map((preset, i) => (
            <button
              key={i}
              onClick={() => {
                setPrompt(preset.query);
                handleExecute(preset.query);
              }}
              disabled={isExecuting}
              className="p-3.5 rounded-2xl border border-gray-200 bg-[#f5f5f7] hover:border-gray-950 hover:bg-white text-left transition-all duration-200 shadow-xs group"
            >
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs font-bold text-gray-900 group-hover:text-gray-950">
                  {preset.title}
                </span>
                <ArrowRight className="w-3.5 h-3.5 text-gray-400 group-hover:translate-x-0.5 transition-transform" />
              </div>
              <p className="text-[11px] text-gray-500 line-clamp-2 leading-relaxed">
                {preset.query}
              </p>
            </button>
          ))}
        </div>
      </div>

      {/* Execution Terminal */}
      <div className="rounded-2xl border border-gray-900 bg-gray-950 text-white p-5 shadow-xl font-mono">
        <div className="flex items-center justify-between pb-3 border-b border-gray-800 text-xs text-gray-400">
          <div className="flex items-center gap-2">
            <Terminal className="w-4 h-4 text-emerald-400" />
            <span className="text-white font-semibold">Quant TAOS Runtime Environment v2.4</span>
          </div>
          {activeStep && (
            <span className="text-emerald-400 text-[11px] font-semibold flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
              {activeStep}
            </span>
          )}
        </div>

        {/* Live log stream */}
        <div className="py-4 space-y-2 text-xs min-h-[160px] max-h-[260px] overflow-y-auto text-gray-300">
          {outputStream.length === 0 ? (
            <div className="text-gray-500 italic py-8 text-center">
              Enter a custom prompt below or select a financial preset to trigger temporal execution.
            </div>
          ) : (
            outputStream.map((line, idx) => (
              <div key={idx} className="flex items-start gap-2 leading-relaxed animate-fadeIn">
                <span className="text-gray-600 select-none">&gt;</span>
                <span className={line.includes('[COMPLETE]') ? 'text-emerald-400 font-bold' : ''}>
                  {line}
                </span>
              </div>
            ))
          )}
        </div>

        {/* Custom Input Form */}
        <div className="pt-3 border-t border-gray-800 flex items-center gap-2">
          <span className="text-emerald-400 text-sm">&gt;</span>
          <input
            type="text"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleExecute()}
            placeholder="Type any financial command (e.g. 'Issue $75k virtual line of credit with KYC check')..."
            className="flex-1 bg-transparent text-xs sm:text-sm text-white placeholder-gray-500 focus:outline-none"
          />
          <button
            onClick={() => handleExecute()}
            disabled={!prompt.trim() || isExecuting}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-semibold text-gray-950 bg-white hover:bg-gray-200 disabled:opacity-40 transition"
          >
            <Play className="w-3.5 h-3.5 fill-current" />
            <span>Execute</span>
          </button>
        </div>
      </div>

    </div>
  );
};
