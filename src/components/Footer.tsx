import React from 'react';
import { ArrowUpRight, ShieldCheck, Heart } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="w-full bg-[#f5f5f7] pt-12 pb-16 border-t border-gray-200/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          
          {/* Brand Info */}
          <div className="md:col-span-2 space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-gray-950 flex items-center justify-center text-white font-bold text-base shadow-sm">
                <span className="font-serif italic">q</span>
              </div>
              <span className="text-xl font-bold tracking-tight text-gray-950">Quant</span>
              <span className="text-[10px] font-semibold uppercase tracking-wider px-1.5 py-0.5 rounded bg-gray-200 text-gray-800">
                Finance
              </span>
            </div>
            <p className="text-xs sm:text-sm text-gray-600 max-w-sm leading-relaxed">
              Quant empowers global financial institutions to build intelligent agents that understand context, learn from interactions, and deliver compounding balance sheet results.
            </p>
            <div className="flex items-center gap-2 text-xs text-gray-500 pt-2">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>SOC2 Type II • ISO 27001 • FinCEN Registered Infrastructure</span>
            </div>
          </div>

          {/* TAOS Architecture Column */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-3">
              TAOS Core Architecture
            </h4>
            <ul className="space-y-2 text-xs text-gray-600">
              <li><span className="hover:text-gray-950 transition cursor-pointer">Stateful Reasoning Fabric</span></li>
              <li><span className="hover:text-gray-950 transition cursor-pointer">Markovian State Engine</span></li>
              <li><span className="hover:text-gray-950 transition cursor-pointer">Temporal Durable Workflows</span></li>
              <li><span className="hover:text-gray-950 transition cursor-pointer">Adaptive Connective Tissue</span></li>
              <li><span className="hover:text-gray-950 transition cursor-pointer">Governance by Design</span></li>
            </ul>
          </div>

          {/* Financial Verticals Column */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-3">
              Financial Verticals
            </h4>
            <ul className="space-y-2 text-xs text-gray-600">
              <li><span className="hover:text-gray-950 transition cursor-pointer">Commercial &amp; Mortgage Lending</span></li>
              <li><span className="hover:text-gray-950 transition cursor-pointer">High-Velocity Fraud Mitigation</span></li>
              <li><span className="hover:text-gray-950 transition cursor-pointer">Algorithmic Wealth Advisory</span></li>
              <li><span className="hover:text-gray-950 transition cursor-pointer">Institutional FX &amp; Treasury</span></li>
              <li><span className="hover:text-gray-950 transition cursor-pointer">Compliance &amp; SAR Automation</span></li>
            </ul>
          </div>

        </div>

        {/* Bottom Sub-footer */}
        <div className="pt-8 border-t border-gray-200/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-500">
          <p>© 2026 Quant Inc. All rights reserved. Temporal Agentic Operating System (TAOS).</p>
          <div className="flex items-center gap-6">
            <span className="hover:text-gray-900 transition cursor-pointer">Privacy Policy</span>
            <span className="hover:text-gray-900 transition cursor-pointer">Terms of Service</span>
            <span className="hover:text-gray-900 transition cursor-pointer">Regulatory Disclosures</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
