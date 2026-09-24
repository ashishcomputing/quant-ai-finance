import React, { useState } from 'react';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { MarkovStateVisualizer } from './components/MarkovStateVisualizer';
import { TemporalWorkflowEngine } from './components/TemporalWorkflowEngine';
import { AgentSwarmConsole } from './components/AgentSwarmConsole';
import { StatefulMemoryInspector } from './components/StatefulMemoryInspector';
import { RoiImpactSection } from './components/RoiImpactSection';
import { LiveInteractiveSandbox } from './components/LiveInteractiveSandbox';
import { AshfxPipelineVisualizer } from './components/AshfxPipelineVisualizer';
import { QuantChatBot } from './components/QuantChatBot';
import { Footer } from './components/Footer';
import { Layers, Activity, Database, TrendingUp, Users, Terminal, X, Cpu } from 'lucide-react';

export function App() {
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedWorkflowId, setSelectedWorkflowId] = useState('wf-mortgage');
  const [isTerminalModalOpen, setIsTerminalModalOpen] = useState(false);

  const handleSelectWorkflowFromHero = (wfId: string) => {
    setSelectedWorkflowId(wfId);
    setActiveTab('workflows');
    window.scrollTo({ top: 400, behavior: 'smooth' });
  };

  const handleExploreMarkov = () => {
    setActiveTab('markov');
    window.scrollTo({ top: 400, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#f5f5f7] text-gray-950 font-sans selection:bg-gray-950 selection:text-white">
      
      {/* Quant Top Navigation */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenTerminal={() => setIsTerminalModalOpen(true)}
      />

      {/* Main Content Area */}
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-8">
        
        {/* If Overview Tab: Full Showcase */}
        {activeTab === 'overview' && (
          <div className="space-y-10">
            <HeroSection
              onSelectWorkflow={handleSelectWorkflowFromHero}
              onExploreMarkov={handleExploreMarkov}
            />

            {/* Quick Interactive Sandbox */}
            <LiveInteractiveSandbox />

            {/* ASHFX Finance AI: Tri-Branch Intent Routing & Zero-Hallucination Pipeline */}
            <AshfxPipelineVisualizer />

            {/* Core Feature 1: Markov State Visualizer */}
            <MarkovStateVisualizer />

            {/* Core Feature 2: Temporal Financial Workflows */}
            <TemporalWorkflowEngine selectedWorkflowId={selectedWorkflowId} />

            {/* Core Feature 3: Digital Employees / Agent Swarm */}
            <AgentSwarmConsole />

            {/* Core Feature 4: Memory Fabric & Governance */}
            <StatefulMemoryInspector />

            {/* Core Feature 5: ROI Impact */}
            <RoiImpactSection />
          </div>
        )}

        {/* Dedicated ASHFX AI Pipeline Tab */}
        {activeTab === 'ashfx-pipeline' && (
          <div className="space-y-6 pt-4">
            <div className="flex items-center gap-2 text-xs font-semibold text-gray-500 uppercase tracking-wider">
              <Cpu className="w-4 h-4 text-emerald-600" />
              <span>ASHFX Tri-Branch Intent Routing &amp; Grounding Architecture</span>
            </div>
            <AshfxPipelineVisualizer />
          </div>
        )}

        {/* Individual Pillar Drill-Downs */}
        {activeTab === 'markov' && (
          <div className="space-y-6 pt-4">
            <div className="flex items-center gap-2 text-xs font-semibold text-gray-500 uppercase tracking-wider">
              <Layers className="w-4 h-4 text-gray-800" />
              <span>Deep Dive: Probabilistic State Transitions</span>
            </div>
            <MarkovStateVisualizer />
          </div>
        )}

        {activeTab === 'workflows' && (
          <div className="space-y-6 pt-4">
            <div className="flex items-center gap-2 text-xs font-semibold text-gray-500 uppercase tracking-wider">
              <Activity className="w-4 h-4 text-gray-800" />
              <span>Deep Dive: Durable Temporal Execution</span>
            </div>
            <TemporalWorkflowEngine selectedWorkflowId={selectedWorkflowId} />
          </div>
        )}

        {activeTab === 'agents' && (
          <div className="space-y-6 pt-4">
            <div className="flex items-center gap-2 text-xs font-semibold text-gray-500 uppercase tracking-wider">
              <Users className="w-4 h-4 text-gray-800" />
              <span>Deep Dive: Autonomous Digital Employees</span>
            </div>
            <AgentSwarmConsole />
          </div>
        )}

        {activeTab === 'memory' && (
          <div className="space-y-6 pt-4">
            <div className="flex items-center gap-2 text-xs font-semibold text-gray-500 uppercase tracking-wider">
              <Database className="w-4 h-4 text-gray-800" />
              <span>Deep Dive: Stateful Reasoning Fabric</span>
            </div>
            <StatefulMemoryInspector />
          </div>
        )}

        {activeTab === 'roi' && (
          <div className="space-y-6 pt-4">
            <div className="flex items-center gap-2 text-xs font-semibold text-gray-500 uppercase tracking-wider">
              <TrendingUp className="w-4 h-4 text-gray-800" />
              <span>Deep Dive: Compounding Balance Sheet Value</span>
            </div>
            <RoiImpactSection />
          </div>
        )}

      </main>

      {/* Terminal / Command Console Modal */}
      {isTerminalModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
          <div className="relative w-full max-w-4xl bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-200">
            <div className="p-4 bg-gray-100 border-b border-gray-200 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Terminal className="w-4 h-4 text-gray-900" />
                <span className="text-xs font-bold uppercase tracking-wider text-gray-900">
                  Quant Command Shell
                </span>
              </div>
              <button
                onClick={() => setIsTerminalModalOpen(false)}
                className="p-1.5 rounded-full hover:bg-gray-200 text-gray-600 hover:text-gray-950 transition"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="p-4">
              <LiveInteractiveSandbox />
            </div>
          </div>
        </div>
      )}

      {/* Embedded & Floating Quant AI Chatbot with Free/Fee Models */}
      <QuantChatBot />

      {/* Quant Footer */}
      <Footer />

    </div>
  );
}

export default App;
