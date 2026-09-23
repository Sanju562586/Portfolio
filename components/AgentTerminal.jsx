'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Terminal, Play, RotateCcw, Sparkles, CheckCircle2, ChevronRight, Cpu, Command } from 'lucide-react';

const SCENARIOS = [
  {
    title: 'Google MCP Agent: Schedule & Dispatch',
    category: 'Google MCP (LLaMA 3.3-70B)',
    query: 'Audit unread client emails, summarize urgent deliverables, and schedule follow-up calendar invites for tomorrow 10:00 AM IST.',
    chips: ['Assist', 'Run MCP Tools', 'Check Conflicts', 'Draft Reply'],
    steps: [
      { type: 'thought', text: 'Analyzing user intent via Groq LLaMA 3.3-70B... Intent: multi-service orchestration (Gmail + Calendar).' },
      { type: 'tool', name: 'gmail.list_messages', args: { query: 'is:unread category:primary', max_results: 5 } },
      { type: 'result', text: 'Retrieved 3 critical client messages regarding Q3 model delivery.' },
      { type: 'tool', name: 'gmail.get_thread_context', args: { thread_id: 'th_0891a' } },
      { type: 'thought', text: 'Client requested architecture sync on Wednesday. Checking calendar availability at 10:00 AM IST...' },
      { type: 'tool', name: 'calendar.check_availability', args: { time_min: '2026-09-24T10:00:00+05:30', time_max: '2026-09-24T11:00:00+05:30' } },
      { type: 'result', text: 'Slot is open. Zero scheduling conflicts detected.' },
      { type: 'tool', name: 'calendar.create_event', args: { summary: 'Sanjay Kumar x Architecture Sync', start: '10:00 AM IST', attendees: ['team@client.com'] } },
      { type: 'tool', name: 'gmail.send_draft_reply', args: { thread_id: 'th_0891a', message: 'Confirmed calendar invite for tomorrow 10:00 AM IST.' } },
      { type: 'success', text: 'Execution complete: 4 live MCP tools invoked across 2 Google services via OAuth 2.0 stdio channel (Total latency: 342ms).' },
    ],
  },
  {
    title: 'Data Analyst Agent: Autonomous CSV Reasoning',
    category: 'Agentic Data AI (Gemini Flash)',
    query: 'Load the customer transactions dataset, identify top 5 revenue drivers, and generate a retention correlation chart.',
    chips: ['Assist', 'Inspect Schema', 'Group Cohorts', 'Generate Chart'],
    steps: [
      { type: 'thought', text: 'Inspecting schema of dataset transactions_2026.csv (14,200 rows)...' },
      { type: 'tool', name: 'pandas.inspect_schema', args: { file: 'transactions_2026.csv' } },
      { type: 'thought', text: 'Filtering invalid transaction states and grouping by user cohort...' },
      { type: 'tool', name: 'pandas.aggregate_groupby', args: { group_by: 'cohort_id', metrics: ['sum(amount)', 'count(orders)'] } },
      { type: 'result', text: 'Identified top cohorts: Enterprise-A ($142k), MidMarket-Tier1 ($98k).' },
      { type: 'tool', name: 'seaborn.generate_heatmap', args: { matrix: 'retention_matrix', palette: 'viridis' } },
      { type: 'success', text: 'Completed in 2 reasoning loops: chart synthesized and statistical summary rendered with 0 hallucination.' },
    ],
  },
  {
    title: 'Identity Document Intelligence: Forgery Inspection',
    category: 'Vision-Language (PaliGemma-3B + ELA)',
    query: 'Verify authenticity of scanned government identity card and detect potential digital tampering or font splicing.',
    chips: ['Assist', 'Run VLM OCR', 'Noise Map (ELA)', 'Check Tampering'],
    steps: [
      { type: 'thought', text: 'Preprocessing image scan: applying Error Level Analysis (ELA) and perspective de-skewing...' },
      { type: 'tool', name: 'vlm.paligemma_extract_fields', args: { target_fields: ['name', 'dob', 'id_number'] } },
      { type: 'result', text: 'Extracted fields with 99.4% confidence score; OCR aligns with reference standard.' },
      { type: 'tool', name: 'dual_stream.forgery_detector', args: { noise_map: 'ela_stream', vision_features: 'vit_layers' } },
      { type: 'result', text: 'AUROC: 0.982. Grad-CAM confirms uniform pixel compression across ID number bounding box.' },
      { type: 'success', text: 'Document verified authentic: Zero splicing or localized tamper signatures detected.' },
    ],
  },
];

export default function AgentTerminal() {
  const [selectedScenarioIndex, setSelectedScenarioIndex] = useState(0);
  const [visibleStepCount, setVisibleStepCount] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  const activeScenario = SCENARIOS[selectedScenarioIndex];

  // Run simulation
  const startSimulation = () => {
    setVisibleStepCount(0);
    setIsRunning(true);
  };

  useEffect(() => {
    startSimulation();
  }, [selectedScenarioIndex]);

  useEffect(() => {
    if (!isRunning) return;

    if (visibleStepCount < activeScenario.steps.length) {
      const timer = setTimeout(() => {
        setVisibleStepCount((prev) => prev + 1);
      }, 420);
      return () => clearTimeout(timer);
    } else {
      setIsRunning(false);
    }
  }, [visibleStepCount, isRunning, activeScenario]);

  return (
    <div className="glossy-glass-card w-full rounded-[30px] p-6 sm:p-8 text-white shadow-2xl overflow-hidden font-mono">
      {/* Top Header Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-white/10">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-rose-500/80 inline-block shadow-[0_0_8px_#f43f5e]" />
            <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block shadow-[0_0_8px_#f59e0b]" />
            <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block shadow-[0_0_8px_#10b981]" />
          </div>
          <span className="text-xs text-slate-300 font-medium flex items-center gap-2">
            <Terminal size={14} className="text-blue-400" />
            <span>AGENT_RUNTIME_ENVIRONMENT :: v2.6.4</span>
          </span>
        </div>

        {/* Top-Right Glossy Blue Replay Button */}
        <button
          onClick={startSimulation}
          disabled={isRunning}
          className="glossy-pill-blue px-4 py-1.5 rounded-full text-xs flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
        >
          <RotateCcw size={12} className={isRunning ? 'animate-spin' : ''} />
          <span>Replay Loop</span>
        </button>
      </div>

      {/* Scenario Selector Chips */}
      <div className="flex flex-wrap gap-2.5 my-6">
        {SCENARIOS.map((sc, idx) => (
          <button
            key={idx}
            onClick={() => setSelectedScenarioIndex(idx)}
            className={`px-4 py-1.5 rounded-full text-xs transition-all cursor-pointer flex items-center gap-1.5 ${
              selectedScenarioIndex === idx
                ? 'glossy-pill-blue'
                : 'glossy-chip'
            }`}
          >
            <Sparkles size={12} className={selectedScenarioIndex === idx ? 'text-white' : 'text-blue-400'} />
            <span>{sc.category}</span>
          </button>
        ))}
      </div>

      {/* Query Quotation Box (Matches reference image style) */}
      <div className="my-5 p-5 rounded-2xl bg-white/5 border border-white/10">
        <p className="text-lg sm:text-xl font-sans text-white font-medium leading-relaxed">
          “{activeScenario.query}”
        </p>
      </div>

      {/* Action Chips Row (Exactly as in reference image) */}
      <div className="flex flex-wrap items-center gap-2 mb-6 text-xs text-slate-300">
        {activeScenario.chips.map((chip, idx) => (
          <span key={idx} className="glossy-chip px-3 py-1 rounded-full flex items-center gap-1.5">
            <Sparkles size={11} className="text-blue-400" />
            <span>{chip}</span>
          </span>
        ))}
      </div>

      {/* Step-by-Step Autonomous Trace */}
      <div className="space-y-3 font-mono text-xs max-h-[380px] overflow-y-auto pr-2 my-4">
        {activeScenario.steps.slice(0, visibleStepCount).map((step, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.25 }}
            className="flex items-start gap-2.5"
          >
            {step.type === 'thought' && (
              <div className="text-slate-300 flex items-start gap-2 pl-3 border-l-2 border-blue-500/70">
                <span className="text-blue-400 font-bold">THOUGHT ➔</span>
                <span>{step.text}</span>
              </div>
            )}

            {step.type === 'tool' && (
              <div className="w-full p-3 rounded-xl bg-blue-950/40 border border-blue-500/30 text-blue-200 flex flex-col gap-1.5 shadow-sm">
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 rounded bg-blue-500/20 text-blue-300 text-[10px] font-bold border border-blue-400/30">
                    CALL_TOOL
                  </span>
                  <span className="font-semibold text-white">{step.name}()</span>
                </div>
                <pre className="text-[10px] text-slate-300 pl-4 overflow-x-auto bg-black/30 p-2 rounded-lg">
                  {JSON.stringify(step.args, null, 2)}
                </pre>
              </div>
            )}

            {step.type === 'result' && (
              <div className="text-emerald-300 flex items-start gap-2 pl-3 border-l-2 border-emerald-500/70">
                <span className="text-emerald-400 font-bold">RESULT ➔</span>
                <span>{step.text}</span>
              </div>
            )}

            {step.type === 'success' && (
              <div className="w-full p-3.5 rounded-xl bg-emerald-950/50 border border-emerald-500/40 text-emerald-200 flex items-center gap-2.5 font-sans text-xs shadow-md">
                <CheckCircle2 size={16} className="text-emerald-400 shrink-0" />
                <span className="font-medium">{step.text}</span>
              </div>
            )}
          </motion.div>
        ))}

        {isRunning && (
          <div className="flex items-center gap-2 text-blue-400 pl-3">
            <span className="w-2 h-2 rounded-full bg-blue-400 animate-ping inline-block" />
            <span className="animate-pulse">Synthesizing tool response across MCP channel...</span>
          </div>
        )}
      </div>

      {/* Bottom Command Bar (Exact replica of the bottom search/assist bar in user's image) */}
      <div className="glossy-inner-bar rounded-2xl p-3 flex items-center justify-between gap-4 mt-6">
        <div className="flex items-center gap-2.5 text-xs text-slate-400 font-sans">
          <span>Ask about autonomous agents, or press</span>
          <div className="flex items-center gap-1 font-mono">
            <kbd className="px-1.5 py-0.5 rounded bg-white/10 border border-white/20 text-[10px] text-slate-200">
              ⌘
            </kbd>
            <kbd className="px-1.5 py-0.5 rounded bg-white/10 border border-white/20 text-[10px] text-slate-200">
              ↵
            </kbd>
          </div>
          <span>for Assist</span>
        </div>

        <button
          onClick={startSimulation}
          className="glossy-circle-btn w-9 h-9 rounded-full flex items-center justify-center text-white cursor-pointer shadow-lg"
          aria-label="Run Agent Simulation"
        >
          <Play size={13} className="ml-0.5 fill-white" />
        </button>
      </div>
    </div>
  );
}
