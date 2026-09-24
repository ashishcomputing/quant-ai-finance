import React from 'react';
import { ArrowRight, ShieldCheck, Zap, Layers, RefreshCw, Sparkles, CheckCircle2 } from 'lucide-react';

interface HeroSectionProps {
  onSelectWorkflow: (id: string) => void;
  onExploreMarkov: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onSelectWorkflow, onExploreMarkov }) => {
  return (
    <section className="relative overflow-hidden pt-8 pb-12 sm:pt-14 sm:pb-16 bg-[#f5f5f7]">
      {/* Subtle background radial blur effect similar to Quant.ai homepage */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-gradient-to-b from-white/70 via-transparent to-transparent pointer-events-none -z-10" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        
        {/* Top Tagline Pill */}
        <div className="flex justify-center mb-5">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white border border-gray-200/80 shadow-xs">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span className="text-xs font-semibold text-gray-900 tracking-wide uppercase">
              Quant TAOS 2.0 • Financial Intelligence Engine
            </span>
          </div>
        </div>

        {/* Hero Headline */}
        <div className="text-center max-w-4xl mx-auto mb-8">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-gray-950 leading-[1.08] mb-5">
            Hire Super-intelligence for Finance
          </h1>
          <p className="text-lg sm:text-xl text-gray-600 leading-relaxed max-w-3xl mx-auto">
            Transform banking, underwriting, fraud security, and institutional asset management with Quant Agents.
            Powered by the <span className="font-semibold text-gray-900">Temporal Agentic Operating System (TAOS)</span> to turn siloed AI pilots into compounding P&amp;L impact.
          </p>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 mb-14">
          <button
            onClick={() => onSelectWorkflow('wf-mortgage')}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-semibold text-white bg-gray-950 hover:bg-gray-800 transition duration-200 shadow-md group"
          >
            <span>Run Autonomous Underwriting</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </button>

          <button
            onClick={onExploreMarkov}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-semibold text-gray-800 bg-white hover:bg-gray-50 border border-gray-200 transition duration-200 shadow-xs"
          >
            <Layers className="w-4 h-4 text-gray-500" />
            <span>Inspect Markovian State Engine</span>
          </button>
        </div>

        {/* The Problem & The Leap Cards (Directly matching Quant.ai) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-12">
          
          <div className="p-6 rounded-2xl bg-white border border-gray-200/80 shadow-xs hover:border-gray-300 transition-all duration-300">
            <div className="w-10 h-10 rounded-xl bg-red-50 text-red-600 flex items-center justify-center mb-4 font-bold text-sm">
              95%
            </div>
            <h3 className="text-base font-bold text-gray-950 mb-1.5">
              The AI Without ROI Crisis
            </h3>
            <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
              $30B+ invested enterprise-wide, yet 95% of banking AI pilots stall. Brittle linear chains snap whenever edge-case compliance or core legacy handoffs fail.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-gray-200/80 shadow-xs hover:border-gray-300 transition-all duration-300">
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mb-4">
              <RefreshCw className="w-5 h-5 animate-spin" style={{ animationDuration: '8s' }} />
            </div>
            <h3 className="text-base font-bold text-gray-950 mb-1.5">
              Markovian State Engine
            </h3>
            <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
              Continuous probabilistic state routing. If an API times out or documentation is incomplete, TAOS dynamically switches execution paths without dropping customer context.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-gray-200/80 shadow-xs hover:border-gray-300 transition-all duration-300">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-4">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-gray-950 mb-1.5">
              Governance by Design
            </h3>
            <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
              Policy, AML/KYC checks, OCC lending constraints, and human-in-the-loop action activities are woven directly into execution—never bolted on as an afterthought.
            </p>
          </div>

        </div>

        {/* Live TAOS Telemetry Bar */}
        <div className="rounded-2xl bg-gray-950 text-white p-5 sm:p-6 shadow-xl border border-gray-800">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pb-4 border-b border-gray-800 text-xs sm:text-sm">
            <div className="flex items-center gap-2">
              <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping"></div>
              <span className="font-semibold text-gray-200">TAOS Core Live Telemetry</span>
              <span className="text-gray-500">•</span>
              <span className="text-gray-400">Institutional Financial Cluster 01</span>
            </div>
            <div className="flex items-center gap-4 text-xs text-gray-400">
              <span>Avg Latency: <strong className="text-white">18.4ms</strong></span>
              <span>Memory Recall: <strong className="text-emerald-400">99.8%</strong></span>
              <span>Failover Rate: <strong className="text-emerald-400">0.00%</strong></span>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4 text-center sm:text-left">
            <div>
              <p className="text-[11px] uppercase tracking-wider text-gray-400 mb-1">Autonomous Capital Managed</p>
              <p className="text-2xl sm:text-3xl font-bold tracking-tight text-white">$4.82B</p>
              <p className="text-[11px] text-emerald-400 mt-0.5">Across retail &amp; commercial credit</p>
            </div>
            <div>
              <p className="text-[11px] uppercase tracking-wider text-gray-400 mb-1">Underwriting Cycle Time</p>
              <p className="text-2xl sm:text-3xl font-bold tracking-tight text-white">4.2 min</p>
              <p className="text-[11px] text-emerald-400 mt-0.5">Down from 18 days traditional</p>
            </div>
            <div>
              <p className="text-[11px] uppercase tracking-wider text-gray-400 mb-1">Fraud Detection Precision</p>
              <p className="text-2xl sm:text-3xl font-bold tracking-tight text-white">99.4%</p>
              <p className="text-[11px] text-emerald-400 mt-0.5">&lt;0.05% false decline rate</p>
            </div>
            <div>
              <p className="text-[11px] uppercase tracking-wider text-gray-400 mb-1">Direct P&amp;L Savings</p>
              <p className="text-2xl sm:text-3xl font-bold tracking-tight text-white">$14.2M</p>
              <p className="text-[11px] text-emerald-400 mt-0.5">Realized across 4 quarters</p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
