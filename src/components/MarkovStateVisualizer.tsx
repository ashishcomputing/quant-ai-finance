import React, { useState } from 'react';
import { MarkovStateNode, MarkovStateType } from '../types';
import { INITIAL_MARKOV_NODES } from '../data/mockFinancialData';
import { Play, AlertTriangle, CheckCircle, Shield, Cpu, RefreshCw, Sparkles, ArrowRight, Info } from 'lucide-react';

export const MarkovStateVisualizer: React.FC = () => {
  const [nodes, setNodes] = useState<MarkovStateNode[]>(INITIAL_MARKOV_NODES);
  const [selectedNodeId, setSelectedNodeId] = useState<MarkovStateType>('RISK_SCORING');
  const [isSimulating, setIsSimulating] = useState(false);
  const [simulationLog, setSimulationLog] = useState<string[]>([]);
  const [showMatrix, setShowMatrix] = useState(false);

  const selectedNode = nodes.find((n) => n.id === selectedNodeId) || nodes[0];

  // Run a live Markovian state progression simulation
  const runSimulation = (forceAnomaly: boolean = false) => {
    setIsSimulating(true);
    setSimulationLog([]);

    const stateSequence: MarkovStateType[] = forceAnomaly
      ? ['INGESTION', 'IDENTITY_KYC', 'RISK_SCORING', 'HUMAN_ACTION', 'POLICY_GATE', 'EXECUTION', 'POST_SETTLEMENT']
      : ['INGESTION', 'IDENTITY_KYC', 'RISK_SCORING', 'POLICY_GATE', 'EXECUTION', 'POST_SETTLEMENT'];

    stateSequence.forEach((stateId, index) => {
      setTimeout(() => {
        setNodes((prev) =>
          prev.map((n) => ({
            ...n,
            status: n.id === stateId ? 'active' : stateSequence.indexOf(n.id) < index ? 'completed' : 'idle'
          }))
        );
        setSelectedNodeId(stateId);

        const logMsg = forceAnomaly && stateId === 'HUMAN_ACTION'
          ? `[MARKOV DIVERGENCE] Anomaly detected: Stress threshold exceeded. Probabilistic failover to HUMAN_ACTION.`
          : `[STATE TRANSITION] P(S_${index} → S_${index + 1}) evaluated with 0.00% entropy drop. State: ${stateId}`;

        setSimulationLog((l) => [logMsg, ...l.slice(0, 6)]);

        if (index === stateSequence.length - 1) {
          setIsSimulating(false);
        }
      }, index * 900);
    });
  };

  const resetStates = () => {
    setNodes(INITIAL_MARKOV_NODES);
    setSelectedNodeId('RISK_SCORING');
    setSimulationLog([]);
  };

  return (
    <div className="bg-white rounded-3xl border border-gray-200/80 p-6 sm:p-8 shadow-sm">
      
      {/* Title & Description */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-gray-100">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold tracking-wider uppercase bg-gray-100 text-gray-800">
              Quant TAOS Core
            </span>
            <span className="text-xs text-gray-400">•</span>
            <span className="text-xs text-gray-500 font-medium">Fault-Tolerant Discrete Transition Graph</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-gray-950">
            Markovian State Engine
          </h2>
          <p className="text-sm text-gray-600 mt-1 max-w-2xl">
            Unlike rigid automated scripts that crash when an external API stalls, Quant TAOS models financial workflows as continuous Markov states with self-healing failover paths.
          </p>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2 flex-wrap">
          <button
            onClick={() => runSimulation(false)}
            disabled={isSimulating}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-semibold text-white bg-gray-950 hover:bg-gray-800 disabled:opacity-50 transition shadow-xs"
          >
            <Play className="w-3.5 h-3.5" />
            <span>Simulate Pipeline</span>
          </button>

          <button
            onClick={() => runSimulation(true)}
            disabled={isSimulating}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-semibold text-amber-900 bg-amber-100 hover:bg-amber-200 border border-amber-300 disabled:opacity-50 transition shadow-xs"
          >
            <AlertTriangle className="w-3.5 h-3.5" />
            <span>Simulate Anomaly Handoff</span>
          </button>

          <button
            onClick={() => setShowMatrix(!showMatrix)}
            className="px-3.5 py-2 rounded-full text-xs font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 border border-gray-200 transition"
          >
            {showMatrix ? 'Hide P(ij) Matrix' : 'View P(ij) Matrix'}
          </button>

          <button
            onClick={resetStates}
            className="p-2 rounded-full text-gray-500 hover:text-gray-900 hover:bg-gray-100 transition"
            title="Reset Graph"
          >
            <RefreshCw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Visual Pipeline Graph */}
      <div className="my-8">
        <p className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-3">
          Interactive State Nodes (Click any node to inspect memory &amp; governance constraints)
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {nodes.map((node, idx) => {
            const isSelected = selectedNodeId === node.id;
            const isActive = node.status === 'active';
            const isCompleted = node.status === 'completed';

            return (
              <div
                key={node.id}
                onClick={() => setSelectedNodeId(node.id)}
                className={`relative p-4 rounded-2xl border transition-all duration-200 cursor-pointer ${
                  isSelected
                    ? 'border-gray-950 bg-gray-950 text-white shadow-md scale-[1.02]'
                    : isActive
                    ? 'border-blue-500 bg-blue-50/50 shadow-sm ring-2 ring-blue-500/20'
                    : isCompleted
                    ? 'border-emerald-200 bg-emerald-50/30 hover:border-gray-300'
                    : 'border-gray-200/80 bg-white hover:border-gray-300'
                }`}
              >
                {/* Node Step Badge */}
                <div className="flex items-center justify-between mb-2">
                  <span
                    className={`text-[10px] font-mono px-2 py-0.5 rounded-full ${
                      isSelected
                        ? 'bg-gray-800 text-gray-300'
                        : isCompleted
                        ? 'bg-emerald-100 text-emerald-800'
                        : isActive
                        ? 'bg-blue-100 text-blue-800 animate-pulse'
                        : 'bg-gray-100 text-gray-600'
                    }`}
                  >
                    State S_{idx}
                  </span>

                  {isActive ? (
                    <span className="flex items-center gap-1 text-[11px] font-semibold text-blue-600">
                      <span className="w-2 h-2 rounded-full bg-blue-500 animate-ping"></span>
                      Evaluating
                    </span>
                  ) : isCompleted ? (
                    <CheckCircle className={`w-3.5 h-3.5 ${isSelected ? 'text-emerald-400' : 'text-emerald-600'}`} />
                  ) : null}
                </div>

                <h4 className={`text-sm font-bold tracking-tight mb-1 ${isSelected ? 'text-white' : 'text-gray-950'}`}>
                  {node.label}
                </h4>

                <p className={`text-xs line-clamp-2 leading-relaxed ${isSelected ? 'text-gray-300' : 'text-gray-600'}`}>
                  {node.description}
                </p>

                {/* Subtext info */}
                <div className="mt-3 pt-2 border-t border-gray-100/20 flex items-center justify-between text-[11px]">
                  <span className={isSelected ? 'text-gray-400' : 'text-gray-500'}>
                    Latency: {node.metrics?.latencyMs}ms
                  </span>
                  <span className={`font-mono ${isSelected ? 'text-emerald-400' : 'text-emerald-600'}`}>
                    Entropy: {node.metrics?.entropy}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Selected State Inspection Panel */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 pt-4 border-t border-gray-100">
        
        {/* State Detail Column */}
        <div className="lg:col-span-2 space-y-4">
          <div className="p-5 rounded-2xl bg-[#f5f5f7] border border-gray-200/80">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Cpu className="w-4 h-4 text-gray-700" />
                <h3 className="text-base font-bold text-gray-950">
                  Inspecting State: {selectedNode.label}
                </h3>
              </div>
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-white border border-gray-200 text-gray-700 font-mono">
                ID: {selectedNode.id}
              </span>
            </div>

            <p className="text-sm text-gray-700 leading-relaxed mb-4">
              {selectedNode.description}
            </p>

            {/* Outgoing Probabilistic Transitions */}
            <div>
              <h4 className="text-xs font-semibold uppercase tracking-wider text-gray-500 mb-2">
                Stochastic Outgoing Transitions (P_ij Vector)
              </h4>
              <div className="space-y-2">
                {selectedNode.transitions.length > 0 ? (
                  selectedNode.transitions.map((t, i) => (
                    <div
                      key={i}
                      className="p-3 rounded-xl bg-white border border-gray-200/80 flex items-center justify-between gap-3 text-xs"
                    >
                      <div className="flex items-center gap-2">
                        <ArrowRight className="w-3.5 h-3.5 text-gray-400 shrink-0" />
                        <span className="font-semibold text-gray-900">{t.target}</span>
                        <span className="text-gray-500">({t.label})</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-24 h-2 bg-gray-100 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-gray-950 rounded-full"
                            style={{ width: `${t.probability * 100}%` }}
                          />
                        </div>
                        <span className="font-mono font-bold text-gray-950 text-xs w-10 text-right">
                          {(t.probability * 100).toFixed(0)}%
                        </span>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-xs text-gray-500 italic bg-white p-3 rounded-xl border border-gray-200">
                    Terminal absorbing state. Workflows conclude with immutable cryptographic audit logging.
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Mathematical formulation block */}
          <div className="p-4 rounded-2xl bg-gray-900 text-white font-mono text-xs">
            <div className="flex items-center justify-between mb-2 text-gray-400">
              <span>Markovian State Invariant</span>
              <span className="text-emerald-400">∑ P(S_t+1 | S_t) = 1.000</span>
            </div>
            <p className="text-gray-300">
              P(S_t+1 = {selectedNode.id} | S_t, S_t-1, ..., S_0) = P(S_t+1 = {selectedNode.id} | S_t, MemoryFabric)
            </p>
            <p className="text-gray-500 text-[11px] mt-1">
              Guarantees temporal durability: State is checkpointed continuously so workflows resume seamlessly after any hardware interruption.
            </p>
          </div>
        </div>

        {/* Live Simulation Log & Telemetry */}
        <div className="space-y-4">
          <div className="p-5 rounded-2xl bg-[#f5f5f7] border border-gray-200/80 h-full flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-bold uppercase tracking-wider text-gray-900">
                  Live Event Log
                </span>
                <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
              </div>

              <div className="space-y-2 text-xs">
                {simulationLog.length === 0 ? (
                  <p className="text-gray-400 italic text-center py-8">
                    Click "Simulate Pipeline" or "Simulate Anomaly Handoff" to watch real-time Markovian transitions.
                  </p>
                ) : (
                  simulationLog.map((log, i) => (
                    <div
                      key={i}
                      className="p-2.5 rounded-lg bg-white border border-gray-200/70 text-gray-800 leading-snug animate-fadeIn"
                    >
                      {log}
                    </div>
                  ))
                )}
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-gray-200 text-[11px] text-gray-500 flex items-center justify-between">
              <span>Zero-Break Guarantee</span>
              <span className="font-semibold text-emerald-600">Active</span>
            </div>
          </div>
        </div>

      </div>

      {/* Stochastic Transition Matrix Table (Expandable) */}
      {showMatrix && (
        <div className="mt-6 p-5 rounded-2xl bg-gray-50 border border-gray-200 animate-fadeIn">
          <h4 className="text-xs font-bold uppercase tracking-wider text-gray-800 mb-3">
            Full Stochastic Transition Probability Matrix [P_ij]
          </h4>
          <div className="overflow-x-auto">
            <table className="w-full text-xs font-mono text-left border-collapse">
              <thead>
                <tr className="border-b border-gray-300 text-gray-500">
                  <th className="py-2 px-3">From \ To</th>
                  <th className="py-2 px-3">INGESTION</th>
                  <th className="py-2 px-3">KYC</th>
                  <th className="py-2 px-3">RISK</th>
                  <th className="py-2 px-3">POLICY</th>
                  <th className="py-2 px-3">HUMAN</th>
                  <th className="py-2 px-3">EXECUTION</th>
                  <th className="py-2 px-3">SETTLEMENT</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 text-gray-700">
                <tr>
                  <td className="py-2 px-3 font-semibold text-gray-900">INGESTION</td>
                  <td className="py-2 px-3 text-gray-400">0.00</td>
                  <td className="py-2 px-3 font-bold text-gray-950">0.94</td>
                  <td className="py-2 px-3 text-gray-400">0.00</td>
                  <td className="py-2 px-3 font-semibold text-gray-600">0.06</td>
                  <td className="py-2 px-3 text-gray-400">0.00</td>
                  <td className="py-2 px-3 text-gray-400">0.00</td>
                  <td className="py-2 px-3 text-gray-400">0.00</td>
                </tr>
                <tr>
                  <td className="py-2 px-3 font-semibold text-gray-900">KYC</td>
                  <td className="py-2 px-3 text-gray-400">0.00</td>
                  <td className="py-2 px-3 text-gray-400">0.00</td>
                  <td className="py-2 px-3 font-bold text-gray-950">0.91</td>
                  <td className="py-2 px-3 text-gray-400">0.00</td>
                  <td className="py-2 px-3 font-semibold text-amber-600">0.09</td>
                  <td className="py-2 px-3 text-gray-400">0.00</td>
                  <td className="py-2 px-3 text-gray-400">0.00</td>
                </tr>
                <tr>
                  <td className="py-2 px-3 font-semibold text-gray-900">RISK</td>
                  <td className="py-2 px-3 text-gray-400">0.00</td>
                  <td className="py-2 px-3 text-gray-400">0.00</td>
                  <td className="py-2 px-3 text-gray-400">0.00</td>
                  <td className="py-2 px-3 font-bold text-gray-950">0.88</td>
                  <td className="py-2 px-3 font-semibold text-amber-600">0.12</td>
                  <td className="py-2 px-3 text-gray-400">0.00</td>
                  <td className="py-2 px-3 text-gray-400">0.00</td>
                </tr>
                <tr>
                  <td className="py-2 px-3 font-semibold text-gray-900">POLICY</td>
                  <td className="py-2 px-3 text-gray-400">0.00</td>
                  <td className="py-2 px-3 text-gray-400">0.00</td>
                  <td className="py-2 px-3 text-gray-400">0.00</td>
                  <td className="py-2 px-3 text-gray-400">0.00</td>
                  <td className="py-2 px-3 font-semibold text-amber-600">0.05</td>
                  <td className="py-2 px-3 font-bold text-gray-950">0.95</td>
                  <td className="py-2 px-3 text-gray-400">0.00</td>
                </tr>
                <tr>
                  <td className="py-2 px-3 font-semibold text-gray-900">HUMAN</td>
                  <td className="py-2 px-3 text-gray-400">0.00</td>
                  <td className="py-2 px-3 text-gray-400">0.00</td>
                  <td className="py-2 px-3 text-gray-400">0.00</td>
                  <td className="py-2 px-3 text-gray-400">0.00</td>
                  <td className="py-2 px-3 text-gray-400">0.00</td>
                  <td className="py-2 px-3 font-bold text-gray-950">0.82</td>
                  <td className="py-2 px-3 font-semibold text-red-600">0.18</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}

    </div>
  );
};
