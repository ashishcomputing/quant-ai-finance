import React, { useState } from 'react';
import { TrendingUp, Check, X, ArrowRight, DollarSign, Calculator, Percent, Sparkles } from 'lucide-react';

export const RoiImpactSection: React.FC = () => {
  // Interactive ROI Calculator State
  const [monthlyLoans, setMonthlyLoans] = useState(1200);
  const [fraudVolumeMillions, setFraudVolumeMillions] = useState(45);
  const [aumMillions, setAumMillions] = useState(250);

  // Compute calculated P&L uplift
  const underwritingSavings = monthlyLoans * 650 * 12; // $650 saved per automated file
  const fraudPrevented = fraudVolumeMillions * 1000000 * 0.0042; // 42 bps fraud mitigation
  const yieldOptimizationFeeUplift = aumMillions * 1000000 * 0.0018; // 18 bps yield boost
  const totalAnnualValue = underwritingSavings + fraudPrevented + yieldOptimizationFeeUplift;

  return (
    <div className="bg-white rounded-3xl border border-gray-200/80 p-6 sm:p-8 shadow-sm">
      
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold uppercase tracking-wider mb-2">
          From AI Pilots to P&amp;L Impact
        </div>
        <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-gray-950 mb-3">
          Solving "AI Without ROI" in Financial Services
        </h2>
        <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
          Over $30 Billion has been spent on isolated banking AI pilots, yet 95% fail to produce measurable profit. Quant TAOS turns disconnected pilots into compounding balance-sheet value.
        </p>
      </div>

      {/* Side-by-Side Comparison: Traditional Pilots vs Quant TAOS */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
        
        {/* Left: Traditional Disconnected AI Pilots */}
        <div className="p-6 rounded-3xl bg-gray-50 border border-gray-200 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-bold uppercase tracking-wider text-red-600 bg-red-100/80 px-2.5 py-1 rounded-full">
                Traditional Approach
              </span>
              <span className="text-xs text-gray-400 font-mono">95% Failure Rate</span>
            </div>

            <h3 className="text-xl font-bold text-gray-950 mb-2">
              Brittle Automations &amp; Siloed Bots
            </h3>

            <p className="text-xs sm:text-sm text-gray-600 mb-6 leading-relaxed">
              Disparate chatbots, disconnected RPA scripts, and point solutions that lack connective tissue across systems and time.
            </p>

            <ul className="space-y-3.5 text-xs sm:text-sm text-gray-700">
              <li className="flex items-start gap-2.5">
                <div className="w-5 h-5 rounded-full bg-red-100 text-red-600 flex items-center justify-center shrink-0 mt-0.5">
                  <X className="w-3.5 h-3.5" />
                </div>
                <span><strong>Structural Fragility:</strong> One API timeout collapses the entire transaction chain.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <div className="w-5 h-5 rounded-full bg-red-100 text-red-600 flex items-center justify-center shrink-0 mt-0.5">
                  <X className="w-3.5 h-3.5" />
                </div>
                <span><strong>Context Evaporation:</strong> Customers repeat basic financial details at every handoff.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <div className="w-5 h-5 rounded-full bg-red-100 text-red-600 flex items-center justify-center shrink-0 mt-0.5">
                  <X className="w-3.5 h-3.5" />
                </div>
                <span><strong>Human Exclusion:</strong> Bankers and compliance teams sit outside the operating loop.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <div className="w-5 h-5 rounded-full bg-red-100 text-red-600 flex items-center justify-center shrink-0 mt-0.5">
                  <X className="w-3.5 h-3.5" />
                </div>
                <span><strong>Zero Balance Sheet Impact:</strong> Expensive innovation lab demo with no bottom-line lift.</span>
              </li>
            </ul>
          </div>

          <div className="mt-6 pt-4 border-t border-gray-200 text-center">
            <span className="text-xs text-red-600 font-semibold">
              Result: Stalled Pilots &amp; Write-Downs
            </span>
          </div>
        </div>

        {/* Right: Quant TAOS Financial OS */}
        <div className="p-6 rounded-3xl bg-gray-950 text-white border border-gray-800 shadow-xl flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-400 bg-emerald-950/80 px-2.5 py-1 rounded-full border border-emerald-800">
                Quant TAOS Architecture
              </span>
              <span className="text-xs text-emerald-400 font-mono">99.98% Survival Rate</span>
            </div>

            <h3 className="text-xl font-bold text-white mb-2">
              Temporal Agentic Operating System
            </h3>

            <p className="text-xs sm:text-sm text-gray-300 mb-6 leading-relaxed">
              A durable, stateful operating conveyor of reasoning that natively binds agents, bankers, and customers into one governed continuum.
            </p>

            <ul className="space-y-3.5 text-xs sm:text-sm text-gray-200">
              <li className="flex items-start gap-2.5">
                <div className="w-5 h-5 rounded-full bg-emerald-900 text-emerald-300 flex items-center justify-center shrink-0 mt-0.5">
                  <Check className="w-3.5 h-3.5" />
                </div>
                <span><strong>Markovian Fault Tolerance:</strong> Probabilistic auto-recovery whenever edge cases occur.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <div className="w-5 h-5 rounded-full bg-emerald-900 text-emerald-300 flex items-center justify-center shrink-0 mt-0.5">
                  <Check className="w-3.5 h-3.5" />
                </div>
                <span><strong>Stateful Reasoning Fabric:</strong> Multi-turn session context and intent preserved across months.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <div className="w-5 h-5 rounded-full bg-emerald-900 text-emerald-300 flex items-center justify-center shrink-0 mt-0.5">
                  <Check className="w-3.5 h-3.5" />
                </div>
                <span><strong>Human-in-the-Loop Action:</strong> Seamless supervisory escalation with instant approval gates.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <div className="w-5 h-5 rounded-full bg-emerald-900 text-emerald-300 flex items-center justify-center shrink-0 mt-0.5">
                  <Check className="w-3.5 h-3.5" />
                </div>
                <span><strong>Compounding P&amp;L Realization:</strong> Compounding 34% reduction in operational cost.</span>
              </li>
            </ul>
          </div>

          <div className="mt-6 pt-4 border-t border-gray-800 text-center">
            <span className="text-xs text-emerald-400 font-semibold">
              Result: Compounding Enterprise Intelligence
            </span>
          </div>
        </div>

      </div>

      {/* Interactive Institution P&L Uplift Calculator */}
      <div className="rounded-3xl bg-[#f5f5f7] border border-gray-200/80 p-6 sm:p-8">
        <div className="flex items-center gap-2 mb-6">
          <Calculator className="w-5 h-5 text-gray-800" />
          <h3 className="text-lg font-bold text-gray-950">
            Interactive Institutional P&amp;L Calculator
          </h3>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          
          {/* Slider 1: Loan applications */}
          <div className="p-4 rounded-2xl bg-white border border-gray-200">
            <div className="flex justify-between items-center text-xs mb-2">
              <span className="font-semibold text-gray-700">Monthly Loan Inquiries</span>
              <span className="font-mono font-bold text-gray-950 text-sm">{monthlyLoans.toLocaleString()}</span>
            </div>
            <input
              type="range"
              min={100}
              max={10000}
              step={100}
              value={monthlyLoans}
              onChange={(e) => setMonthlyLoans(Number(e.target.value))}
              className="w-full accent-gray-950 cursor-pointer"
            />
            <p className="text-[11px] text-gray-500 mt-2">
              Estimated manual processing cost saved: $650/file
            </p>
          </div>

          {/* Slider 2: Fraud Transaction Volume */}
          <div className="p-4 rounded-2xl bg-white border border-gray-200">
            <div className="flex justify-between items-center text-xs mb-2">
              <span className="font-semibold text-gray-700">Monthly Card Volume ($M)</span>
              <span className="font-mono font-bold text-gray-950 text-sm">${fraudVolumeMillions}M</span>
            </div>
            <input
              type="range"
              min={5}
              max={500}
              step={5}
              value={fraudVolumeMillions}
              onChange={(e) => setFraudVolumeMillions(Number(e.target.value))}
              className="w-full accent-gray-950 cursor-pointer"
            />
            <p className="text-[11px] text-gray-500 mt-2">
              Sub-second containment avoids 42 bps in chargebacks
            </p>
          </div>

          {/* Slider 3: Private Wealth AUM */}
          <div className="p-4 rounded-2xl bg-white border border-gray-200">
            <div className="flex justify-between items-center text-xs mb-2">
              <span className="font-semibold text-gray-700">Wealth AUM Managed ($M)</span>
              <span className="font-mono font-bold text-gray-950 text-sm">${aumMillions}M</span>
            </div>
            <input
              type="range"
              min={20}
              max={2000}
              step={20}
              value={aumMillions}
              onChange={(e) => setAumMillions(Number(e.target.value))}
              className="w-full accent-gray-950 cursor-pointer"
            />
            <p className="text-[11px] text-gray-500 mt-2">
              Tax-loss harvesting and Sharpe optimization upside
            </p>
          </div>

        </div>

        {/* Total Projected Uplift Banner */}
        <div className="p-6 rounded-2xl bg-gray-950 text-white flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-wider text-emerald-400 font-bold mb-1">
              Projected Compounding Annual P&amp;L Realization
            </p>
            <p className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
              ${(totalAnnualValue / 1000000).toFixed(2)}M / year
            </p>
            <p className="text-xs text-gray-400 mt-1">
              Combines underwriting overhead reduction, eliminated chargebacks, and fee retention.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="text-right hidden sm:block">
              <p className="text-xs text-gray-400">Payback Period</p>
              <p className="text-lg font-bold text-emerald-400">&lt; 45 Days</p>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
};
