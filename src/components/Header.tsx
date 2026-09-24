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
    <header className="sticky top-0 z-50 w-full bg-white/70 backdrop-blur-2xl backdrop-saturate-200 border-b border-white/60 shadow-[0_4px_30px_rgba(0,0,0,0.03),inset_0_1px_1px_rgba(255,255,255,0.8)] transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          
          {/* Quant Brand Logo - Liquid Glass Pill */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2.5 cursor-pointer group" onClick={() => setActiveTab('overview')}>
              <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-gray-950 via-gray-900 to-gray-800 flex items-center justify-center text-white font-bold text-lg shadow-[0_4px_12px_rgba(0,0,0,0.15),inset_0_1px_1px_rgba(255,255,255,0.3)] group-hover:scale-105 transition">
                <span className="font-serif italic tracking-tighter text-emerald-300">q</span>
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-1.5">
                  <span className="text-xl font-bold tracking-tight text-gray-950 font-sans">Quant</span>
                  <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-white/80 text-gray-800 border border-white/60 shadow-xs backdrop-blur-md">
                    Finance OS
                  </span>
                </div>
                <span className="text-[11px] text-gray-500 font-medium hidden sm:inline">
                  Temporal Agentic Operating System (TAOS)
                </span>
              </div>
            </div>
          </div>

          {/* Navigation Bar - Floating Liquid Pill Dock */}
          <nav className="hidden md:flex items-center gap-1 bg-white/40 backdrop-blur-xl p-1 rounded-full border border-white/60 shadow-[inset_0_1px_1px_rgba(255,255,255,0.7),0_2px_12px_rgba(0,0,0,0.03)]">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all duration-200 whitespace-nowrap ${
                  activeTab === item.id
                    ? 'bg-white text-gray-950 shadow-[0_2px_8px_rgba(0,0,0,0.06),inset_0_1px_1px_rgba(255,255,255,0.9)] font-semibold'
                    : 'text-gray-600 hover:text-gray-950 hover:bg-white/60'
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* Real-time Status Badges & Quick Action */}
          <div className="flex items-center gap-2.5">
            <div className="hidden lg:flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-400/30 text-emerald-900 text-xs font-medium backdrop-blur-md shadow-xs">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span>TAOS Core: 99.98% Survival</span>
            </div>

            <button
              onClick={onOpenTerminal}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold text-white bg-gray-950 hover:bg-gray-800 transition shadow-[0_4px_12px_rgba(0,0,0,0.12),inset_0_1px_1px_rgba(255,255,255,0.2)]"
              title="Launch Quant Agent Command Terminal"
            >
              <Terminal className="w-3.5 h-3.5" />
              <span>Agent Console</span>
            </button>
          </div>

        </div>

        {/* Mobile Navigation Row */}
        <div className="md:hidden flex items-center gap-1 py-2 overflow-x-auto no-scrollbar border-t border-white/40">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap backdrop-blur-md transition ${
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
    </header>
  );
};
