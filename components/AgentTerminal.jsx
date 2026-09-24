'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  RotateCcw,
  Sparkles,
  CheckCircle2,
  Calendar,
  Mail,
  FileSpreadsheet,
  BarChart3,
  ShieldCheck,
  Search,
  Clock,
  Layers,
  Code2,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';

const SCENARIOS = [
  {
    title: 'Google AI Personal Assistant',
    category: 'Google MCP (LLaMA 3.3-70B)',
    query: 'Audit unread client emails, summarize urgent deliverables, and schedule follow-up calendar invites for tomorrow 10:00 AM IST.',
    chips: ['Gmail API', 'Google Calendar', 'Conflict Audit', 'Auto-Reply'],
    metrics: { time: '342ms', tools: '4 Live MCP Tools', model: 'Groq LLaMA 3.3', status: 'All Actions Verified' },
    steps: [
      {
        icon: Mail,
        action: 'Scan Inbox & Priority Messages',
        service: 'Gmail API',
        summary: 'Retrieved 3 unread priority client messages regarding Q3 model architecture delivery.',
        latency: '85ms',
        status: 'Completed',
        payload: { query: 'is:unread category:primary', max_results: 5 },
      },
      {
        icon: Calendar,
        action: 'Audit Calendar Availability',
        service: 'Google Calendar',
        summary: 'Inspected tomorrow 10:00 AM – 11:00 AM IST. Slot is completely free with zero scheduling conflicts.',
        latency: '92ms',
        status: 'Slot Free',
        payload: { time_slot: '10:00 AM - 11:00 AM IST', conflicts_found: 0 },
      },
      {
        icon: Calendar,
        action: 'Create Calendar Invitation',
        service: 'Google Calendar',
        summary: 'Generated "Architecture Sync" event with meeting links and dispatched invites to client attendees.',
        latency: '110ms',
        status: 'Event Created',
        payload: { event: 'Architecture Sync', attendees: ['team@client.com'] },
      },
      {
        icon: Mail,
        action: 'Send Context-Aware Confirmation',
        service: 'Gmail API',
        summary: 'Drafted and sent professional confirmation email referencing the scheduled meeting time.',
        latency: '55ms',
        status: 'Dispatched',
        payload: { thread_id: 'th_0891a', status: 'sent' },
      },
    ],
    finalNote: 'Orchestrated 4 live Google MCP tools over OAuth 2.0 stdio channel with zero manual intervention.',
  },
  {
    title: 'Agentic Natural Language Data Analysis Assistant',
    category: 'Agentic Data AI (Gemini Flash)',
    query: 'Load the customer transactions dataset, identify top 5 revenue drivers, and generate a retention correlation chart.',
    chips: ['CSV Inspection', 'Cohort Aggregation', 'Seaborn Heatmap', 'Sandboxed Exec'],
    metrics: { time: '280ms', tools: '6 Tool Functions', model: 'Gemini 1.5 Flash', status: 'Zero Hallucination' },
    steps: [
      {
        icon: FileSpreadsheet,
        action: 'Load & Validate CSV Schema',
        service: 'Pandas Engine',
        summary: 'Parsed transactions_2026.csv (14,200 rows). Cleaned null values and validated numeric data types.',
        latency: '62ms',
        status: 'Verified',
        payload: { rows: 14200, missing_values: 0, memory: '4.2MB' },
      },
      {
        icon: Layers,
        action: 'Calculate Cohort Revenue Drivers',
        service: 'Pandas Aggregator',
        summary: 'Identified top revenue drivers: Enterprise Cohort-A ($142k) and MidMarket-1 ($98k).',
        latency: '78ms',
        status: 'Computed',
        payload: { top_cohorts: ['Enterprise-A', 'MidMarket-1'], total: '$240k' },
      },
      {
        icon: BarChart3,
        action: 'Synthesize Retention Heatmap',
        service: 'Seaborn Engine',
        summary: 'Dynamically generated correlation matrix chart and formatted executive analytical insights.',
        latency: '140ms',
        status: 'Rendered',
        payload: { chart: 'retention_correlation_heatmap.png', palette: 'viridis' },
      },
    ],
    finalNote: 'Completed multi-step reasoning loop with sandboxed code execution and zero hallucination.',
  },
  {
    title: 'Identity Document Intelligence System',
    category: 'Vision-Language (PaliGemma-3B + ELA)',
    query: 'Verify authenticity of scanned government identity card and detect potential digital tampering or font splicing.',
    chips: ['VLM OCR', 'Noise Map (ELA)', 'AUROC: 0.982', 'Grad-CAM Tamper Check'],
    metrics: { time: '385ms', tools: 'Dual-Stream Head', model: 'PaliGemma-3B SFT', status: 'Authentic ID' },
    steps: [
      {
        icon: Search,
        action: 'Extract Structured ID Fields',
        service: 'PaliGemma-3B VLM',
        summary: 'Extracted Full Name, Date of Birth, and ID Number with 99.4% confidence against standard template.',
        latency: '180ms',
        status: '99.4% Match',
        payload: { name: 'MATCH', dob: 'MATCH', id_number: 'MATCH' },
      },
      {
        icon: Layers,
        action: 'Generate Error Level Analysis Noise Map',
        service: 'OpenCV Preprocessor',
        summary: 'Computed pixel compression differentials across document boundary to highlight digital manipulation.',
        latency: '95ms',
        status: 'Processed',
        payload: { degradation_tests: 'Passed', noise_variance: 'Normal' },
      },
      {
        icon: ShieldCheck,
        action: 'Verify Splicing & Tamper Signatures',
        service: 'Grad-CAM Dual-Stream',
        summary: 'Confirmed uniform compression across ID bounding boxes. AUROC 0.982 with zero localized tamper traces.',
        latency: '110ms',
        status: 'Verified Authentic',
        payload: { auroc: 0.982, forgery_detected: false },
      },
    ],
    finalNote: 'Document verified authentic with zero digital splicing or localized tampering detected.',
  },
];

export default function AgentTerminal() {
  const [selectedScenarioIndex, setSelectedScenarioIndex] = useState(0);
  const [visibleStepCount, setVisibleStepCount] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [expandedPayloadIndex, setExpandedPayloadIndex] = useState(null);

  const activeScenario = SCENARIOS[selectedScenarioIndex];

  // Run simulation
  const startSimulation = () => {
    setVisibleStepCount(0);
    setIsRunning(true);
    setExpandedPayloadIndex(null);
  };

  useEffect(() => {
    startSimulation();
  }, [selectedScenarioIndex]);

  useEffect(() => {
    if (!isRunning) return;

    if (visibleStepCount < activeScenario.steps.length) {
      const timer = setTimeout(() => {
        setVisibleStepCount((prev) => prev + 1);
      }, 480);
      return () => clearTimeout(timer);
    } else {
      setIsRunning(false);
    }
  }, [visibleStepCount, isRunning, activeScenario]);

  return (
    <div className="glossy-glass-card w-full rounded-[24px] sm:rounded-[30px] p-4 sm:p-7 lg:p-8 text-white shadow-2xl overflow-hidden font-sans border border-white/15">
      {/* Top Header Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 sm:gap-4 pb-4 sm:pb-6 border-b border-white/10">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block shadow-[0_0_8px_#10b981]" />
            <span className="w-2.5 h-2.5 rounded-full bg-blue-500 inline-block shadow-[0_0_8px_#3b82f6]" />
            <span className="w-2.5 h-2.5 rounded-full bg-violet-500 inline-block shadow-[0_0_8px_#8b5cf6]" />
          </div>
          <div>
            <span className="text-[10px] sm:text-xs font-mono font-bold text-blue-400 tracking-wider uppercase block">
              AUTONOMOUS WORKFLOW TRACE
            </span>
            <span className="text-[11px] sm:text-xs text-slate-300 font-medium">
              Live Model Context Protocol Execution Viewer
            </span>
          </div>
        </div>

        {/* Top-Right Replay Button */}
        <button
          onClick={startSimulation}
          disabled={isRunning}
          className="glossy-pill-blue px-3.5 sm:px-4 py-1.5 rounded-full text-[11px] sm:text-xs font-mono font-semibold flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
        >
          <RotateCcw size={12} className={isRunning ? 'animate-spin' : ''} />
          <span>{isRunning ? 'Executing...' : 'Replay'}</span>
        </button>
      </div>

      {/* Scenario Selector Chips */}
      <div className="flex flex-wrap gap-2 sm:gap-2.5 my-4 sm:my-6">
        {SCENARIOS.map((sc, idx) => (
          <button
            key={idx}
            onClick={() => setSelectedScenarioIndex(idx)}
            className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-[11px] sm:text-xs font-mono font-bold transition-all cursor-pointer flex items-center gap-2 ${
              selectedScenarioIndex === idx
                ? 'glossy-pill-blue'
                : 'glossy-chip text-slate-300 hover:text-white'
            }`}
          >
            <Sparkles size={12} className={selectedScenarioIndex === idx ? 'text-white' : 'text-blue-400'} />
            <span className="truncate">{sc.title}</span>
          </button>
        ))}
      </div>

      {/* User Natural Language Intent Box (Clean & Readable) */}
      <div className="my-4 sm:my-5 p-4 sm:p-6 rounded-2xl bg-white/5 border border-white/10">
        <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-blue-300 block mb-2">
          USER INTENT PROMPT
        </span>
        <p className="text-base sm:text-lg lg:text-xl font-serif text-white font-medium leading-relaxed">
          “{activeScenario.query}”
        </p>
      </div>

      {/* Quick Status Bar */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3 my-4 sm:my-5">
        <div className="glossy-chip p-2.5 sm:p-3 rounded-xl sm:rounded-2xl text-center">
          <span className="block text-[9px] sm:text-[10px] font-mono text-slate-400 uppercase">Latency</span>
          <span className="text-xs sm:text-sm font-mono font-bold text-emerald-400">{activeScenario.metrics.time}</span>
        </div>
        <div className="glossy-chip p-2.5 sm:p-3 rounded-xl sm:rounded-2xl text-center">
          <span className="block text-[9px] sm:text-[10px] font-mono text-slate-400 uppercase">Orchestration</span>
          <span className="text-xs sm:text-sm font-mono font-bold text-blue-400">{activeScenario.metrics.tools}</span>
        </div>
        <div className="glossy-chip p-2.5 sm:p-3 rounded-xl sm:rounded-2xl text-center">
          <span className="block text-[9px] sm:text-[10px] font-mono text-slate-400 uppercase">Reasoning Brain</span>
          <span className="text-xs sm:text-sm font-mono font-bold text-violet-300">{activeScenario.metrics.model}</span>
        </div>
        <div className="glossy-chip p-2.5 sm:p-3 rounded-xl sm:rounded-2xl text-center">
          <span className="block text-[9px] sm:text-[10px] font-mono text-slate-400 uppercase">Reliability</span>
          <span className="text-xs sm:text-sm font-mono font-bold text-teal-300">{activeScenario.metrics.status}</span>
        </div>
      </div>

      {/* Step-by-Step Clean Execution Pipeline (Readable & Beautiful) */}
      <div className="space-y-3 sm:space-y-3.5 my-5 sm:my-6">
        {activeScenario.steps.slice(0, visibleStepCount).map((step, idx) => {
          const StepIcon = step.icon;
          const isExpanded = expandedPayloadIndex === idx;

          return (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="glossy-inner-bar rounded-2xl p-3.5 sm:p-5 flex flex-col gap-2.5 sm:gap-3 transition-colors hover:border-white/20"
            >
              <div className="flex flex-col xs:flex-row xs:items-center justify-between gap-2.5">
                {/* Left: Step Index & Title */}
                <div className="flex items-center gap-2.5 sm:gap-3">
                  <div className="w-8 sm:w-9 h-8 sm:h-9 rounded-xl bg-blue-500/20 border border-blue-500/30 flex items-center justify-center text-blue-400 shrink-0">
                    <StepIcon size={16} />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-[9px] sm:text-[10px] font-bold text-slate-400">
                        STEP 0{idx + 1}
                      </span>
                      <span className="text-[9px] sm:text-[10px] font-mono px-2 py-0.5 rounded-full bg-blue-500/15 text-blue-300 border border-blue-500/25">
                        {step.service}
                      </span>
                    </div>
                    <h4 className="text-xs sm:text-base font-semibold text-white mt-0.5">
                      {step.action}
                    </h4>
                  </div>
                </div>

                {/* Right: Latency & Status Badge */}
                <div className="flex items-center gap-2 pl-10 xs:pl-0">
                  <span className="text-[11px] sm:text-xs font-mono text-slate-400 flex items-center gap-1">
                    <Clock size={11} />
                    {step.latency}
                  </span>
                  <span className="glossy-chip px-2.5 sm:px-3 py-1 rounded-full text-[11px] sm:text-xs font-mono text-emerald-300 font-semibold flex items-center gap-1.5 border border-emerald-500/30">
                    <CheckCircle2 size={11} className="text-emerald-400" />
                    <span>{step.status}</span>
                  </span>
                </div>
              </div>

              {/* Natural Language Outcome Summary */}
              <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-sans pl-0 sm:pl-12">
                {step.summary}
              </p>

              {/* Optional Expandable Technical Parameters */}
              <div className="pl-0 sm:pl-12 pt-1">
                <button
                  onClick={() => setExpandedPayloadIndex(isExpanded ? null : idx)}
                  className="text-[10px] sm:text-[11px] font-mono text-slate-400 hover:text-blue-300 flex items-center gap-1 cursor-pointer transition-colors"
                >
                  <Code2 size={12} />
                  <span>{isExpanded ? 'Hide technical parameters' : 'View technical parameters'}</span>
                  {isExpanded ? <ChevronUp size={12} /> : <ChevronDown size={12} />}
                </button>

                {isExpanded && (
                  <motion.pre
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="mt-2 p-2.5 sm:p-3 rounded-xl bg-black/40 border border-white/10 text-[9px] sm:text-[10px] font-mono text-blue-300 overflow-x-auto max-w-full"
                  >
                    {JSON.stringify(step.payload, null, 2)}
                  </motion.pre>
                )}
              </div>
            </motion.div>
          );
        })}

        {isRunning && (
          <div className="p-3.5 sm:p-4 rounded-2xl bg-blue-500/10 border border-blue-500/25 flex items-center gap-3 text-blue-300 text-xs font-mono">
            <span className="w-2.5 h-2.5 rounded-full bg-blue-400 animate-ping inline-block" />
            <span className="animate-pulse">Agent reasoning loop executing next action...</span>
          </div>
        )}
      </div>

      {/* Completion Banner */}
      {!isRunning && visibleStepCount === activeScenario.steps.length && (
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          className="p-3.5 sm:p-5 rounded-2xl bg-emerald-500/15 border border-emerald-500/35 text-emerald-200 flex items-center gap-3 font-sans text-xs sm:text-sm shadow-lg"
        >
          <CheckCircle2 size={18} className="text-emerald-400 shrink-0" />
          <span className="font-medium">{activeScenario.finalNote}</span>
        </motion.div>
      )}
    </div>
  );
}
