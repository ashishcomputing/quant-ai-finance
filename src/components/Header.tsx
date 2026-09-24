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
    { id: 'markov', label: 'Markov State Engine' },
    { id: 'workflows', label: 'Financial Workflows' },
    { id: 'agents', label: 'Digital Employees' },
    { id: 'memory', label: 'Memory Fabric' },
    { id: 'roi', label: 'P&L Impact & ROI' }
  ];

  return (
    <header className="sticky top-0 z-50 w-full bg-white/90 backdrop-blur-md border-b border-gray-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          
          {/* Quant Brand Logo */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 cursor-pointer" onClick={() => setActiveTab('overview')}>
              <div className="w-8 h-8 rounded-lg bg-gray-950 flex items-center justify-center text-white font-bold text-lg shadow-sm">
                <span className="font-serif italic tracking-tighter">q</span>
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-1.5">
                  <span className="text-xl font-bold tracking-tight text-gray-950 font-sans">Quant</span>
                  <span className="text-[10px] uppercase font-semibold tracking-wider px-1.5 py-0.5 rounded bg-gray-100 text-gray-700 border border-gray-200">
                    Finance OS
                  </span>
                </div>
                <span className="text-[11px] text-gray-500 font-medium hidden sm:inline">
                  Temporal Agentic Operating System (TAOS)
                </span>
              </div>
            </div>
          </div>

          {/* Navigation Bar */}
          <nav className="hidden md:flex items-center gap-1 bg-gray-100/80 p-1 rounded-full border border-gray-200/60">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all duration-200 whitespace-nowrap ${
                  activeTab === item.id
                    ? 'bg-white text-gray-950 shadow-sm font-semibold'
                    : 'text-gray-600 hover:text-gray-950 hover:bg-white/50'
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* Real-time Status Badges & Quick Action */}
          <div className="flex items-center gap-2.5">
            <div className="hidden lg:flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200/60 text-emerald-800 text-xs font-medium">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span>TAOS Core: 99.98% Survival</span>
            </div>

            <button
              onClick={onOpenTerminal}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-medium text-white bg-gray-950 hover:bg-gray-800 transition shadow-sm"
              title="Launch Quant Agent Command Terminal"
            >
              <Terminal className="w-3.5 h-3.5" />
              <span>Agent Console</span>
            </button>
          </div>

        </div>

        {/* Mobile Navigation Row */}
        <div className="md:hidden flex items-center gap-1 py-2 overflow-x-auto no-scrollbar border-t border-gray-100">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap ${
                activeTab === item.id
                  ? 'bg-gray-950 text-white font-semibold'
                  : 'bg-gray-100 text-gray-700'
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
