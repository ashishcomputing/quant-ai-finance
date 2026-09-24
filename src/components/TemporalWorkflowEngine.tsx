import React, { useState } from 'react';
import { FinancialWorkflow, TemporalStep } from '../types';
import { PRESET_WORKFLOWS } from '../data/mockFinancialData';
import { 
  Play, 
  RotateCw, 
  ShieldCheck, 
  CheckCircle2, 
  Clock, 
  AlertCircle, 
  UserCheck, 
  Zap, 
  FileText, 
  Lock, 
  DollarSign, 
  ArrowUpRight 
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface TemporalWorkflowEngineProps {
  selectedWorkflowId?: string;
}

export const TemporalWorkflowEngine: React.FC<TemporalWorkflowEngineProps> = ({ 
  selectedWorkflowId = 'wf-mortgage' 
}) => {
  const [workflows, setWorkflows] = useState<FinancialWorkflow[]>(PRESET_WORKFLOWS);
  const [activeWfId, setActiveWfId] = useState<string>(selectedWorkflowId);
  const [isRunning, setIsRunning] = useState(false);
  const [recoveryNotice, setRecoveryNotice] = useState<string | null>(null);

  const currentWorkflow = workflows.find((w) => w.id === activeWfId) || workflows[0];

  // Advance single step or full durable workflow
  const advanceStep = () => {
    setWorkflows((prev) =>
      prev.map((wf) => {
        if (wf.id !== activeWfId) return wf;

        const nextSteps = [...wf.steps];
        const runningIdx = nextSteps.findIndex((s) => s.status === 'running');
        const pendingIdx = nextSteps.findIndex((s) => s.status === 'pending');

        if (runningIdx !== -1) {
          nextSteps[runningIdx] = {
            ...nextSteps[runningIdx],
            status: 'completed',
            durationMs: Math.floor(Math.random() * 120 + 80),
            output: nextSteps[runningIdx].output || 'Verified & durable checkpoint recorded to temporal state log.'
          };

          if (pendingIdx !== -1) {
            nextSteps[pendingIdx] = {
              ...nextSteps[pendingIdx],
              status: 'running'
            };
          } else {
            // All steps complete!
            triggerApprovalConfetti();
          }
        } else if (pendingIdx !== -1) {
          nextSteps[pendingIdx] = {
            ...nextSteps[pendingIdx],
            status: 'running'
          };
        }

        return {
          ...wf,
          steps: nextSteps
        };
      })
    );
  };

  const runAllSteps = () => {
    setIsRunning(true);
    setRecoveryNotice(null);

    let stepCount = 0;
    const interval = setInterval(() => {
      advanceStep();
      stepCount++;
      if (stepCount >= currentWorkflow.steps.length + 1) {
        clearInterval(interval);
        setIsRunning(false);
        triggerApprovalConfetti();
      }
    }, 900);
  };

  // Simulate a network failure & demonstrate Temporal's durable recovery
  const simulateCrashAndRecover = () => {
    setRecoveryNotice('Simulating sudden network drop & cluster failover...');
    setTimeout(() => {
      setRecoveryNotice('Temporal State Engine recovered execution state from checkpoint 0x8a91. Resuming with zero lost context.');
      setTimeout(() => setRecoveryNotice(null), 6000);
    }, 1400);
  };

  const triggerApprovalConfetti = () => {
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch {
      // fallback safe
    }
  };

  const resetWorkflow = () => {
    const original = PRESET_WORKFLOWS.find((w) => w.id === activeWfId);
    if (!original) return;
    setWorkflows((prev) => prev.map((w) => (w.id === activeWfId ? JSON.parse(JSON.stringify(original)) : w)));
  };

  return (
    <div className="bg-white rounded-3xl border border-gray-200/80 p-6 sm:p-8 shadow-sm">
      
      {/* Workflow Category Selector Tabs */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-gray-100">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold tracking-wider uppercase bg-gray-100 text-gray-800">
              Durable Execution
            </span>
            <span className="text-xs text-gray-400">•</span>
            <span className="text-xs text-gray-500 font-medium">Temporal Financial Pipelines</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-gray-950">
            Autonomous Financial Workflows
          </h2>
          <p className="text-sm text-gray-600 mt-1 max-w-2xl">
            Stateful financial processes that execute across days or milliseconds with continuous validation, deterministic replay, and zero dropped customer context.
          </p>
        </div>

        {/* Workflow Switcher Pills */}
        <div className="flex items-center gap-1.5 p-1 bg-gray-100 rounded-full overflow-x-auto no-scrollbar">
          {workflows.map((wf) => (
            <button
              key={wf.id}
              onClick={() => {
                setActiveWfId(wf.id);
                setRecoveryNotice(null);
              }}
              className={`px-3 py-1.5 rounded-full text-xs font-semibold transition whitespace-nowrap ${
                activeWfId === wf.id
                  ? 'bg-white text-gray-950 shadow-xs'
                  : 'text-gray-600 hover:text-gray-950'
              }`}
            >
              {wf.category}
            </button>
          ))}
        </div>
      </div>

      {/* Recovery Banner */}
      {recoveryNotice && (
        <div className="my-4 p-3.5 rounded-xl bg-blue-50 border border-blue-200 text-blue-900 text-xs font-medium flex items-center gap-2.5 animate-fadeIn">
          <RotateCw className="w-4 h-4 text-blue-600 animate-spin" />
          <span>{recoveryNotice}</span>
        </div>
      )}

      {/* Current Workflow Overview Banner */}
      <div className="my-6 p-5 rounded-2xl bg-[#f5f5f7] border border-gray-200/80">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">
                Active Execution
              </span>
              <span className="text-xs text-gray-300">•</span>
              <span className="text-xs font-semibold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full">
                Risk Tier: {currentWorkflow.memoryContext.riskTier}
              </span>
            </div>
            <h3 className="text-lg sm:text-xl font-bold text-gray-950">
              {currentWorkflow.title}
            </h3>
            <p className="text-xs sm:text-sm text-gray-600 max-w-3xl">
              {currentWorkflow.description}
            </p>
          </div>

          {/* Quick Context Summary */}
          <div className="flex flex-wrap items-center gap-3 sm:gap-6 bg-white p-3.5 rounded-xl border border-gray-200/80 shrink-0">
            <div>
              <p className="text-[10px] text-gray-400 uppercase font-semibold">Entity / Customer</p>
              <p className="text-xs font-bold text-gray-950">{currentWorkflow.memoryContext.customerName}</p>
            </div>
            <div>
              <p className="text-[10px] text-gray-400 uppercase font-semibold">Account Ref</p>
              <p className="text-xs font-mono font-semibold text-gray-700">{currentWorkflow.memoryContext.accountNumber}</p>
            </div>
            <div>
              <p className="text-[10px] text-gray-400 uppercase font-semibold">Transaction Value</p>
              <p className="text-xs font-bold text-gray-950">{currentWorkflow.valueAtRisk}</p>
            </div>
          </div>
        </div>

        {/* Action Toolbar */}
        <div className="mt-4 pt-4 border-t border-gray-200 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <button
              onClick={runAllSteps}
              disabled={isRunning}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-semibold text-white bg-gray-950 hover:bg-gray-800 disabled:opacity-50 transition shadow-xs"
            >
              <Play className="w-3.5 h-3.5" />
              <span>Execute Full Workflow</span>
            </button>

            <button
              onClick={advanceStep}
              disabled={isRunning}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full text-xs font-medium text-gray-800 bg-white hover:bg-gray-100 border border-gray-200 transition"
            >
              <span>Advance Single Step</span>
            </button>

            <button
              onClick={simulateCrashAndRecover}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full text-xs font-medium text-purple-900 bg-purple-50 hover:bg-purple-100 border border-purple-200 transition"
              title="Test Temporal fault-tolerance: simulate power/network loss and instant resume"
            >
              <RotateCw className="w-3.5 h-3.5 text-purple-700" />
              <span>Simulate Crash &amp; Recover</span>
            </button>
          </div>

          <button
            onClick={resetWorkflow}
            className="text-xs text-gray-500 hover:text-gray-900 transition underline underline-offset-2"
          >
            Reset Workflow
          </button>
        </div>
      </div>

      {/* Step by Step Temporal Graph */}
      <div className="space-y-3">
        <p className="text-xs font-bold uppercase tracking-wider text-gray-400">
          Temporal Execution Steps (Durable State Conveyor)
        </p>

        {currentWorkflow.steps.map((step, idx) => {
          const isCompleted = step.status === 'completed';
          const isRunningStep = step.status === 'running';

          return (
            <div
              key={step.id}
              className={`p-4 sm:p-5 rounded-2xl border transition-all duration-200 ${
                isRunningStep
                  ? 'border-blue-500 bg-blue-50/30 ring-2 ring-blue-500/20'
                  : isCompleted
                  ? 'border-gray-200 bg-white hover:border-gray-300'
                  : 'border-gray-100 bg-gray-50/60 opacity-70'
              }`}
            >
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                <div className="flex items-start gap-3">
                  {/* Status Circle */}
                  <div
                    className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 mt-0.5 text-xs font-bold ${
                      isCompleted
                        ? 'bg-emerald-100 text-emerald-700'
                        : isRunningStep
                        ? 'bg-blue-600 text-white animate-pulse'
                        : 'bg-gray-200 text-gray-500'
                    }`}
                  >
                    {isCompleted ? <CheckCircle2 className="w-4 h-4" /> : idx + 1}
                  </div>

                  {/* Step info */}
                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <h4 className="text-sm font-bold text-gray-950">
                        {step.name}
                      </h4>
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-gray-100 text-gray-700 font-mono">
                        Agent: {step.assignedAgent}
                      </span>
                    </div>

                    <p className="text-xs text-gray-600 mt-1 leading-relaxed">
                      {step.description}
                    </p>

                    {/* Step Output If Available */}
                    {step.output && (
                      <div className="mt-2.5 p-2.5 rounded-xl bg-[#f5f5f7] border border-gray-200/80 text-xs text-gray-800 font-mono">
                        <span className="text-emerald-700 font-bold mr-1.5">✓</span>
                        {step.output}
                      </div>
                    )}

                    {/* Policy Gate Check */}
                    {step.policyCheck && (
                      <div className="mt-2 flex items-center gap-2 text-[11px] text-gray-500">
                        <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span>Policy Check: <strong className="text-gray-800">{step.policyCheck.rule}</strong></span>
                        <span className="font-mono text-gray-400">({step.policyCheck.auditHash})</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Status Indicator & Latency */}
                <div className="flex items-center gap-2 self-end sm:self-auto text-xs shrink-0">
                  {isRunningStep ? (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-100 text-blue-800 font-semibold">
                      <span className="w-2 h-2 rounded-full bg-blue-600 animate-ping"></span>
                      Executing...
                    </span>
                  ) : isCompleted ? (
                    <div className="text-right">
                      <span className="inline-flex items-center gap-1 text-emerald-700 font-semibold">
                        Completed
                      </span>
                      {step.durationMs && (
                        <p className="text-[10px] text-gray-400 font-mono">{step.durationMs}ms latency</p>
                      )}
                    </div>
                  ) : (
                    <span className="text-gray-400 font-medium">Pending Invariant</span>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
};
