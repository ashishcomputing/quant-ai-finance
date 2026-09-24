import React, { useState } from 'react';
import { INITIAL_AUDIT_LOGS } from '../data/mockFinancialData';
import { AuditLogEntry } from '../types';
import { Database, ShieldCheck, Link2, CheckCircle2, Lock, History, Search } from 'lucide-react';

export const StatefulMemoryInspector: React.FC = () => {
  const [auditLogs, setAuditLogs] = useState<AuditLogEntry[]>(INITIAL_AUDIT_LOGS);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredLogs = auditLogs.filter(
    (log) =>
      log.actor.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.action.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.details.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="bg-white rounded-3xl border border-gray-200/80 p-6 sm:p-8 shadow-sm">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-gray-100">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold tracking-wider uppercase bg-gray-100 text-gray-800">
              TAOS Core Pillar
            </span>
            <span className="text-xs text-gray-400">•</span>
            <span className="text-xs text-gray-500 font-medium">Stateful Reasoning Fabric</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-gray-950">
            Memory Layer &amp; Governance by Design
          </h2>
          <p className="text-sm text-gray-600 mt-1 max-w-2xl">
            A continuous layer of memory, context, and multi-turn decisioning across time. Binds agents, human executives, and customers into one coordinated flow without context fragmentation.
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs text-gray-500 font-mono">
          <Database className="w-4 h-4 text-emerald-600" />
          <span>Continuous Context Synchronization</span>
        </div>
      </div>

      {/* 4 Architectural Layers (Faithful to Quant.ai architecture) */}
      <div className="my-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* Card 1: Memory Layer */}
        <div className="p-5 rounded-2xl bg-gray-50 border border-gray-200/80 flex flex-col justify-between">
          <div>
            <p className="text-[11px] font-bold uppercase tracking-wider text-gray-400 mb-3">
              Memory Layer
            </p>
            <div className="space-y-2.5 mb-4">
              <div>
                <div className="flex justify-between text-[11px] text-gray-500 mb-1">
                  <span>Session Context</span>
                  <span className="font-semibold text-gray-900">85%</span>
                </div>
                <div className="h-1.5 w-full bg-gray-200 rounded-full overflow-hidden">
                  <div className="h-full bg-gray-900 rounded-full" style={{ width: '85%' }}></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between text-[11px] text-gray-500 mb-1">
                  <span>Customer Intent Graph</span>
                  <span className="font-semibold text-gray-900">92%</span>
                </div>
                <div className="h-1.5 w-full bg-gray-200 rounded-full overflow-hidden">
                  <div className="h-full bg-gray-900 rounded-full" style={{ width: '92%' }}></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between text-[11px] text-gray-500 mb-1">
                  <span>Policy Lock State</span>
                  <span className="font-semibold text-gray-900">100%</span>
                </div>
                <div className="h-1.5 w-full bg-gray-200 rounded-full overflow-hidden">
                  <div className="h-full bg-emerald-600 rounded-full" style={{ width: '100%' }}></div>
                </div>
              </div>
            </div>

            <div className="p-2.5 rounded-lg bg-white border border-gray-200 text-[11px] text-gray-600 leading-snug">
              Intent recalled from session #3 → mapped to commercial underwriting credit profile.
            </div>
          </div>

          <p className="text-[11px] font-bold text-gray-950 mt-4 pt-2 border-t border-gray-200">
            Zero Context Evaporation
          </p>
        </div>

        {/* Card 2: Operating Layer */}
        <div className="p-5 rounded-2xl bg-gray-50 border border-gray-200/80 flex flex-col justify-between">
          <div>
            <p className="text-[11px] font-bold uppercase tracking-wider text-gray-400 mb-3">
              Operating Layer
            </p>
            <div className="space-y-2 mb-3 text-center text-xs">
              <div className="p-2 rounded-lg bg-white border border-gray-200 font-medium text-gray-800 shadow-xs">
                Customers &amp; Digital Agents
              </div>
              <div className="text-[10px] text-gray-400">▼ Coordinated Flow</div>
              <div className="p-2 rounded-lg bg-gray-200 font-semibold text-gray-900">
                TAOS Temporal Orchestrator
              </div>
              <div className="text-[10px] text-gray-400">▼ Connective Glue</div>
              <div className="p-2 rounded-lg bg-gray-900 text-white font-medium">
                Core Banking &amp; Financial Rails
              </div>
            </div>
          </div>

          <p className="text-[11px] font-bold text-gray-950 mt-4 pt-2 border-t border-gray-200">
            Infrastructure, Not a Tool
          </p>
        </div>

        {/* Card 3: System Bridge (Adaptive Connective Tissue) */}
        <div className="p-5 rounded-2xl bg-gray-50 border border-gray-200/80 flex flex-col justify-between">
          <div>
            <p className="text-[11px] font-bold uppercase tracking-wider text-gray-400 mb-3">
              Adaptive Connective Tissue
            </p>
            
            <div className="flex items-center justify-between gap-1 text-center my-3">
              <div className="flex-1 p-2 rounded-lg bg-white border border-gray-200 text-[11px]">
                <p className="font-bold text-gray-900">Legacy Core</p>
                <p className="text-[10px] text-gray-500">FIS / Core GL</p>
              </div>

              <div className="px-1 text-[10px] font-mono font-bold text-emerald-700 bg-emerald-100 rounded px-1.5 py-0.5">
                TAOS
              </div>

              <div className="flex-1 p-2 rounded-lg bg-white border border-gray-200 text-[11px]">
                <p className="font-bold text-gray-900">Modern APIs</p>
                <p className="text-[10px] text-gray-500">FedNow / Plaid</p>
              </div>
            </div>

            <div className="p-2.5 rounded-lg bg-white border border-gray-200 text-[11px] text-gray-600 leading-snug">
              Bridges 40-year-old mainframe core banking ledgers to sub-second instant payment rails without disruption.
            </div>
          </div>

          <p className="text-[11px] font-bold text-gray-950 mt-4 pt-2 border-t border-gray-200">
            Resilient Decoupled Fabric
          </p>
        </div>

        {/* Card 4: Governance by Design */}
        <div className="p-5 rounded-2xl bg-gray-50 border border-gray-200/80 flex flex-col justify-between">
          <div>
            <p className="text-[11px] font-bold uppercase tracking-wider text-gray-400 mb-3">
              Governance by Design
            </p>

            <div className="space-y-1.5 text-xs">
              <div className="flex items-center justify-between py-1 border-b border-gray-200/60">
                <span className="text-gray-600">FinCEN / OFAC AML</span>
                <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold">Passed</span>
              </div>
              <div className="flex items-center justify-between py-1 border-b border-gray-200/60">
                <span className="text-gray-600">OCC LTV &amp; DSCR Rule</span>
                <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold">Passed</span>
              </div>
              <div className="flex items-center justify-between py-1 border-b border-gray-200/60">
                <span className="text-gray-600">SEC Fiduciary Constraint</span>
                <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold">Active</span>
              </div>
              <div className="flex items-center justify-between py-1">
                <span className="text-gray-600">Cryptographic Hash Gate</span>
                <span className="px-2 py-0.5 rounded-full bg-gray-200 text-gray-800 text-[10px] font-mono">Verified</span>
              </div>
            </div>
          </div>

          <p className="text-[11px] font-bold text-gray-950 mt-4 pt-2 border-t border-gray-200">
            Pre-Execution Invariants
          </p>
        </div>

      </div>

      {/* Live Cryptographic Audit Log Ledger */}
      <div className="rounded-2xl border border-gray-200/80 bg-[#f5f5f7] p-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
          <div className="flex items-center gap-2">
            <Lock className="w-4 h-4 text-gray-700" />
            <h3 className="text-sm font-bold uppercase tracking-wider text-gray-900">
              Immutable Cryptographic Audit Trail (OCC / SEC Verifiable)
            </h3>
          </div>

          {/* Search */}
          <div className="relative w-full sm:w-64">
            <Search className="w-3.5 h-3.5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search audit trail..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-8 pr-3 py-1.5 rounded-full bg-white border border-gray-200 text-xs text-gray-800 focus:outline-none focus:ring-1 focus:ring-gray-950"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left border-collapse">
            <thead>
              <tr className="border-b border-gray-200 text-gray-500 font-mono">
                <th className="py-2.5 px-3">Timestamp</th>
                <th className="py-2.5 px-3">Agent / Actor</th>
                <th className="py-2.5 px-3">Action Invariant</th>
                <th className="py-2.5 px-3">Verification Details</th>
                <th className="py-2.5 px-3">Status</th>
                <th className="py-2.5 px-3">Audit Hash</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200/80 text-gray-700">
              {filteredLogs.map((log) => (
                <tr key={log.id} className="bg-white hover:bg-gray-50/80 transition">
                  <td className="py-3 px-3 text-gray-500 whitespace-nowrap">{log.timestamp}</td>
                  <td className="py-3 px-3 font-semibold text-gray-900 whitespace-nowrap">{log.actor}</td>
                  <td className="py-3 px-3 font-mono font-medium text-blue-900">{log.action}</td>
                  <td className="py-3 px-3 max-w-xs">{log.details}</td>
                  <td className="py-3 px-3 whitespace-nowrap">
                    <span
                      className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                        log.status === 'verified'
                          ? 'bg-emerald-100 text-emerald-800'
                          : 'bg-amber-100 text-amber-800'
                      }`}
                    >
                      {log.status.toUpperCase()}
                    </span>
                  </td>
                  <td className="py-3 px-3 font-mono text-gray-400 whitespace-nowrap">{log.cryptographicHash}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};
