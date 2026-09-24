import React from 'react';
import { Cpu, ShieldCheck, Activity, Terminal } from 'lucide-react';

interface HeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onOpenTerminal: () => void;
}

export const Header: React.FC<HeaderProps> = ({ activeTab, setActiveTab, onOpenTerminal }) => {
  const navItems = [
    { id: 'overview', label: 'Overview' },
    { id: 'ashfx-pipeline', label: '⚡ ASHFX AI Pipeline' },
    { id: 'markov', label: 'Markov State Engine' },
    { id: 'workflows', label: 'Financial Workflows' },
    { id: 'agents', label: 'Digital Employees' },
    { id: 'memory', label: 'Memory Fabric' },
    { id: 'roi', label: 'P&L Impact & ROI' }
  ];

  return (
    <header className="sticky top-0 z-50 w-full pt-3 px-3 sm:px-6 lg:px-8 transition-all">
      {/* Ambient Aurora Light Bars Behind the Floating Glass Header */}
      <div className="max-w-7xl mx-auto relative">
        <div className="absolute -top-6 left-12 w-80 h-20 bg-gradient-to-r from-emerald-400/30 to-teal-400/20 rounded-full blur-2xl pointer-events-none animate-pulse" />
        <div className="absolute -top-6 right-16 w-80 h-20 bg-gradient-to-r from-teal-400/20 via-indigo-400/25 to-purple-400/25 rounded-full blur-2xl pointer-events-none" />

        {/* Floating Liquid Glass Shell */}
        <div className="relative rounded-[26px] sm:rounded-full bg-white/70 backdrop-blur-3xl backdrop-saturate-200 border border-white/80 shadow-[0_16px_40px_rgba(0,0,0,0.06),inset_0_1.5px_1px_rgba(255,255,255,0.95)] px-4 sm:px-6 py-2.5 sm:py-3 transition-all duration-300">
          
          <div className="flex items-center justify-between">
            {/* Quant Brand Logo - Liquid Glass Pill */}
            <div className="flex items-center gap-3">
              <div 
                className="flex items-center gap-2.5 cursor-pointer group" 
                onClick={() => setActiveTab('overview')}
              >
                <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-gray-950 via-gray-900 to-gray-800 flex items-center justify-center text-white font-bold text-lg shadow-[0_4px_12px_rgba(0,0,0,0.18),inset_0_1px_1px_rgba(255,255,255,0.4)] group-hover:scale-105 transition-transform duration-200">
                  <span className="font-serif italic tracking-tighter text-emerald-300">q</span>
                </div>
                <div className="flex flex-col">
                  <div className="flex items-center gap-1.5">
                    <span className="text-lg sm:text-xl font-bold tracking-tight text-gray-950 font-sans">Quant</span>
                    <span className="text-[9px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-900 border border-emerald-400/30 shadow-xs backdrop-blur-md">
                      Finance OS
                    </span>
                  </div>
                  <span className="text-[10px] text-gray-500 font-medium hidden sm:inline leading-none">
                    Temporal Agentic Operating System
                  </span>
                </div>
              </div>
            </div>

            {/* Navigation Bar - Floating Liquid Segmented Dock */}
            <nav className="hidden md:flex items-center gap-1 bg-black/[0.04] backdrop-blur-2xl p-1 rounded-full border border-white/80 shadow-[inset_0_1px_2px_rgba(0,0,0,0.05),0_1px_1px_rgba(255,255,255,0.9)]">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all duration-200 whitespace-nowrap ${
                    activeTab === item.id
                      ? 'bg-gray-950 text-white shadow-[0_4px_12px_rgba(0,0,0,0.2),inset_0_1px_1px_rgba(255,255,255,0.3)] font-semibold scale-102'
                      : 'text-gray-600 hover:text-gray-950 hover:bg-white/70'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </nav>

            {/* Real-time Status Badges & Quick Action */}
            <div className="flex items-center gap-2.5">
              <div className="hidden xl:flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-400/30 text-emerald-900 text-xs font-semibold backdrop-blur-md shadow-[inset_0_1px_1px_rgba(255,255,255,0.8)]">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
                <span>TAOS Core: 99.98%</span>
              </div>

              <button
                onClick={onOpenTerminal}
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold text-white bg-gradient-to-tr from-gray-950 to-gray-800 hover:from-gray-900 hover:to-gray-700 border border-white/20 transition-all duration-200 shadow-[0_4px_14px_rgba(0,0,0,0.15),inset_0_1px_1px_rgba(255,255,255,0.3)] hover:scale-105 active:scale-95"
                title="Launch Quant Agent Command Terminal"
              >
                <Terminal className="w-3.5 h-3.5 text-emerald-300" />
                <span>Console</span>
              </button>
            </div>

          </div>

          {/* Mobile Navigation Row (Horizontal Scroll on Mobile) */}
          <div className="md:hidden flex items-center gap-1.5 pt-2 mt-2 overflow-x-auto no-scrollbar border-t border-black/[0.06]">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap transition backdrop-blur-md ${
                  activeTab === item.id
                    ? 'bg-gray-950 text-white font-semibold shadow-xs'
                    : 'bg-white/60 text-gray-700 hover:bg-white'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>

        </div>
      </div>
    </header>
  );
};
