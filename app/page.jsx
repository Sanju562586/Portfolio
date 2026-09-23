'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence, useScroll, useSpring } from 'framer-motion';
import confetti from 'canvas-confetti';
import {
  ArrowUpRight,
  Sparkles,
  Terminal,
  Layers,
  Database,
  Globe,
  Cpu,
  Mail,
  Github,
  Linkedin,
  Award,
  Check,
  Copy,
} from 'lucide-react';

import Hero3DVisualizer from '../components/Hero3DVisualizer';
import AgentTerminal from '../components/AgentTerminal';
import ProjectCard3D from '../components/ProjectCard3D';
import ProjectDetailModal from '../components/ProjectDetailModal';
import Skills3DSphere from '../components/Skills3DSphere';
import StatCard3D from '../components/StatCard3D';
import Magnetic3DButton from '../components/Magnetic3DButton';
import { PROJECTS_DATA } from '../data/projectsData';

export default function HomePage() {
  const [activeTab, setActiveTab] = useState('All');
  const [selectedProject, setSelectedProject] = useState(null);
  const [copiedEmail, setCopiedEmail] = useState(false);

  // Scroll Progress Bar with spring physics
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001,
  });

  const handleConfetti = () => {
    confetti({
      particleCount: 90,
      spread: 75,
      origin: { y: 0.8 },
      colors: ['#3b82f6', '#0d9488', '#8b5cf6', '#06b6d4', '#ec4899'],
    });
  };

  const copyEmailToClipboard = () => {
    navigator.clipboard.writeText('sanjaykumardupati6@gmail.com');
    setCopiedEmail(true);
    handleConfetti();
    setTimeout(() => setCopiedEmail(false), 3000);
  };

  const filteredProjects =
    activeTab === 'All'
      ? PROJECTS_DATA
      : PROJECTS_DATA.filter((p) => p.category === activeTab);

  return (
    <div className="relative w-full">
      {/* Top Specular Glow Scroll Progress Line */}
      <motion.div
        style={{ scaleX }}
        className="fixed top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-blue-500 via-teal-400 to-indigo-500 z-[1000] origin-left shadow-[0_0_15px_rgba(59,130,246,0.8)]"
      />

      <main className="w-[min(1280px,92%)] mx-auto">
        {/* =========================================
            1. HERO SECTION WITH 3D CANVAS
           ========================================= */}
        <section id="hero" className="min-h-[calc(100vh-120px)] pt-12 pb-16 grid grid-cols-1 lg:grid-cols-[1.15fr_0.85fr] items-center gap-12">
          {/* Hero Copy */}
          <div className="relative z-10 max-w-2xl">
            {/* Eyebrow & Status Chips */}
            <div className="flex flex-wrap items-center gap-3 mb-6">
              <span className="glossy-chip text-blue-300 font-mono text-xs tracking-wider uppercase font-bold flex items-center gap-2 px-4 py-1.5 rounded-full">
                <span className="w-2 h-2 rounded-full bg-blue-500 inline-block shadow-[0_0_8px_#3b82f6] animate-pulse" />
                AI & Systems Engineer · Hyderabad, IN
              </span>
              <span className="glossy-chip font-mono text-[11px] text-teal-300 tracking-wider uppercase font-semibold px-3.5 py-1.5 rounded-full flex items-center gap-1.5">
                <i className="w-2 h-2 rounded-full bg-teal-400 shadow-[0_0_8px_#14b8a6]" />
                Available for high-impact roles
              </span>
            </div>

            {/* Display Heading */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="text-6xl sm:text-7xl lg:text-8xl font-serif leading-[0.92] tracking-tight text-white font-normal"
            >
              Systems for<br />
              the <em className="italic text-blue-400 font-serif">intelligent</em><br />
              future.
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="mt-8 text-base sm:text-lg text-slate-300 max-w-lg font-sans leading-relaxed"
            >
              I architect autonomous agent loops, fine-tune multimodal vision-language models (PaliGemma, LLaVA), and build dependable distributed systems with glossy, glassmorphic interfaces.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.35 }}
              className="mt-10 flex flex-wrap items-center gap-4"
            >
              <Link
                href="/projects"
                className="glossy-pill-blue px-7 py-3.5 rounded-full font-mono text-xs tracking-widest uppercase flex items-center gap-2 shadow-xl hover:scale-105 transition-transform"
              >
                <span>Explore All Projects ({PROJECTS_DATA.length})</span>
                <ArrowUpRight size={15} />
              </Link>

              <a
                href="#agent-terminal"
                className="glossy-chip px-6 py-3.5 rounded-full font-mono text-xs tracking-widest uppercase text-slate-200 hover:text-white flex items-center gap-2"
              >
                <span>Live MCP Terminal</span>
                <Sparkles size={14} className="text-blue-400" />
              </a>
            </motion.div>
          </div>

          {/* 3D Visualizer Canvas */}
          <div className="relative">
            <Hero3DVisualizer />
          </div>
        </section>

        {/* =========================================
            2. INFINITE MARQUEE TICKER (Glossy Bar)
           ========================================= */}
        <section className="w-full overflow-hidden border-y border-white/10 my-16 py-4 bg-white/[0.02] backdrop-blur-md">
          <motion.div
            animate={{ x: ['0%', '-50%'] }}
            transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
            className="flex whitespace-nowrap font-mono text-xs tracking-widest uppercase text-slate-400 font-medium gap-8"
          >
            {[...Array(2)].map((_, i) => (
              <span key={i} className="flex items-center gap-8">
                <span className="text-slate-200">Model Context Protocol (MCP)</span>
                <b className="text-blue-400">✦</b>
                <span className="text-slate-200">Agentic Reasoning Loops</span>
                <b className="text-teal-400">✦</b>
                <span className="text-slate-200">PaliGemma-3B & LLaVA-1.5 VLM</span>
                <b className="text-indigo-400">✦</b>
                <span className="text-slate-200">Apache Spark & Kafka Streaming</span>
                <b className="text-blue-400">✦</b>
                <span className="text-slate-200">Zero-Race PostgreSQL Transactions</span>
                <b className="text-teal-400">✦</b>
                <span className="text-slate-200">Dark Glossy Glassmorphism</span>
                <b className="text-indigo-400">✦</b>
              </span>
            ))}
          </motion.div>
        </section>

        {/* =========================================
            3. INTERACTIVE AGENTIC AI TERMINAL
           ========================================= */}
        <section id="agent-terminal" className="py-20 border-b border-white/10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
            <div>
              <p className="text-blue-400 font-mono text-xs tracking-widest uppercase font-bold flex items-center gap-2 mb-2">
                <Terminal size={15} /> Autonomous Agent Runtime Simulation
              </p>
              <h2 className="text-4xl sm:text-5xl font-serif text-white tracking-tight">
                Live <em className="italic text-blue-400 font-serif">Model Context Protocol</em> Execution
              </h2>
            </div>
            <p className="text-sm font-sans text-slate-400 max-w-md">
              Interact with the runtime below to observe how my agents decompose natural language queries into live tool calls across Google services and sandboxed data pipelines.
            </p>
          </div>

          <AgentTerminal />
        </section>

        {/* =========================================
            4. MANIFESTO & PHILOSOPHY
           ========================================= */}
        <section className="py-24 grid grid-cols-1 lg:grid-cols-[0.85fr_1.15fr] gap-14 items-center border-b border-white/10">
          <div>
            <p className="text-blue-400 font-mono text-xs tracking-widest uppercase font-bold mb-4">
              Engineering Manifesto
            </p>
            <h2 className="text-4xl sm:text-5xl font-serif text-white leading-tight tracking-tight">
              Good software makes the <em className="italic text-blue-400 font-serif">complicated</em> feel inevitable.
            </h2>
          </div>
          <div className="space-y-6 text-slate-300 text-base leading-relaxed font-sans">
            <p>
              My work lives at the intersection of rigorous systems programming, vision-language deep learning, and practical agentic workflows. I care deeply about the invisible architectural decisions: deterministic state transitions, race-condition safety, and sub-second reasoning latency.
            </p>
            <p>
              Whether fine-tuning a multimodal VLM to detect document fraud or orchestrating 20+ live Google tools via MCP over OAuth 2.0, I design software that remains reliable and transparent under real-world operational pressure.
            </p>
          </div>
        </section>

        {/* =========================================
            5. PERFORMANCE STATS (GLOSSY 3D CARDS)
           ========================================= */}
        <section className="py-20">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <StatCard3D
              index="01 / PROBLEM SOLVING"
              number="500+"
              description="Algorithmic and competitive programming challenges solved with optimal time-space bounds."
              delay={0}
            />
            <StatCard3D
              index="02 / HACKATHON RECORD"
              number="32nd"
              description="National finalist placement among 1,500+ teams building real-time autonomous systems."
              delay={0.15}
            />
            <StatCard3D
              index="03 / STATE RANK"
              number="59th"
              description="Statewide rank achieved in TGECET-2024 among tens of thousands of engineering peers."
              delay={0.3}
            />
          </div>
        </section>

        {/* =========================================
            6. FEATURED PROJECTS SHOWCASE (GLOSSY FINISH)
           ========================================= */}
        <section id="work" className="py-24">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div>
              <p className="text-teal-400 font-mono text-xs tracking-widest uppercase font-bold mb-2">
                Selected Work / 2024 — 2026
              </p>
              <h2 className="text-5xl sm:text-6xl font-serif text-white tracking-tight">
                Built for <em className="italic text-blue-400 font-serif">use,</em> not just display.
              </h2>
            </div>

            {/* Category Filter Chips */}
            <div className="flex flex-wrap gap-2 font-mono text-xs">
              {['All', 'AI', 'Deep Learning', 'Machine Learning', 'Web Development'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-4 py-2 rounded-full font-bold transition-all cursor-pointer ${
                    activeTab === tab
                      ? 'glossy-pill-blue'
                      : 'glossy-chip'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <AnimatePresence mode="popLayout">
              {filteredProjects.slice(0, 4).map((project, idx) => (
                <ProjectCard3D
                  key={project.id}
                  project={project}
                  onOpenDetails={(p) => setSelectedProject(p)}
                  delay={idx * 0.15}
                />
              ))}
            </AnimatePresence>
          </div>

          {/* Explore All CTA */}
          <div className="mt-14 text-center">
            <Link
              href="/projects"
              className="glossy-pill-blue inline-flex items-center gap-3 px-8 py-4 rounded-full font-mono text-xs uppercase tracking-widest font-bold shadow-2xl hover:scale-105 transition-transform"
            >
              <span>Explore Full Projects Archive ({PROJECTS_DATA.length} Projects)</span>
              <ArrowUpRight size={16} />
            </Link>
          </div>
        </section>

        {/* =========================================
            7. 3D SKILL CLOUD & CAPABILITIES
           ========================================= */}
        <section id="capabilities" className="py-24 border-t border-white/10">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <p className="text-rose-400 font-mono text-xs tracking-widest uppercase font-bold mb-2">
              Interactive 3D Skill Cloud
            </p>
            <h2 className="text-5xl font-serif text-white tracking-tight">
              Capabilities & Technical Stack
            </h2>
            <p className="text-slate-400 text-sm mt-3 font-sans">
              Interact with the celestial 3D sphere below or explore the domain-specific technical stacks.
            </p>
          </div>

          {/* 3D Celestial Tag Cloud */}
          <Skills3DSphere />

          {/* Structured Capabilities List (Glossy Cards) */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
            <div className="glossy-glass-card p-6 rounded-3xl">
              <span className="font-mono text-xs font-bold text-blue-400 uppercase tracking-widest block mb-2">
                01 / APPLIED AI & LLMS
              </span>
              <h3 className="font-serif text-xl font-bold text-white mb-2">
                Agentic Loops & RAG
              </h3>
              <p className="text-xs font-sans text-slate-300 leading-relaxed">
                Model Context Protocol (MCP), Groq LLaMA 3.3, LangChain, FAISS semantic vector search, prompt routing, and tool schemas.
              </p>
            </div>

            <div className="glossy-glass-card p-6 rounded-3xl">
              <span className="font-mono text-xs font-bold text-teal-400 uppercase tracking-widest block mb-2">
                02 / DEEP LEARNING & VLM
              </span>
              <h3 className="font-serif text-xl font-bold text-white mb-2">
                Multimodal Vision
              </h3>
              <p className="text-xs font-sans text-slate-300 leading-relaxed">
                PyTorch, PaliGemma-3B, LLaVA-1.5, QLoRA, SFT, DPO preference alignment, ViT features, OpenCV, and ELA forgery detection.
              </p>
            </div>

            <div className="glossy-glass-card p-6 rounded-3xl">
              <span className="font-mono text-xs font-bold text-amber-400 uppercase tracking-widest block mb-2">
                03 / DATA INFRASTRUCTURE
              </span>
              <h3 className="font-serif text-xl font-bold text-white mb-2">
                Streaming & Big Data
              </h3>
              <p className="text-xs font-sans text-slate-300 leading-relaxed">
                Apache Spark Structured Streaming, Kafka message brokers, Pandas data munging, Scikit-learn models, and high-throughput pipelines.
              </p>
            </div>

            <div className="glossy-glass-card p-6 rounded-3xl">
              <span className="font-mono text-xs font-bold text-rose-400 uppercase tracking-widest block mb-2">
                04 / BACKEND & SYSTEMS
              </span>
              <h3 className="font-serif text-xl font-bold text-white mb-2">
                Concurrency & APIs
              </h3>
              <p className="text-xs font-sans text-slate-300 leading-relaxed">
                FastAPI, PostgreSQL row-level locks, Redis caching layers, WebSockets (Socket.io), Next.js, and Docker microservices.
              </p>
            </div>
          </div>
        </section>

        {/* =========================================
            8. PROFILE, EDUCATION & ACCOLADES
           ========================================= */}
        <section id="profile" className="py-24 border-t border-white/10">
          <p className="text-blue-400 font-mono text-xs tracking-widest uppercase font-bold mb-4">
            Education & Recognition
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
            {/* Degree 1 */}
            <div className="glossy-glass-card p-8 rounded-3xl">
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-mono font-bold text-blue-300 glossy-chip px-3 py-1 rounded-full">
                  2024 — PRESENT · HYDERABAD
                </span>
                <span className="text-2xl font-serif font-bold text-white">
                  CGPA 8.83
                </span>
              </div>
              <h3 className="text-2xl font-serif font-semibold text-white">
                Chaitanya Bharathi Institute of Technology (CBIT)
              </h3>
              <p className="text-sm font-sans text-slate-300 mt-2">
                Bachelor of Engineering in Computer Science and Engineering. Deep coursework in Distributed Operating Systems, Machine Learning, and Computer Networks.
              </p>
            </div>

            {/* Degree 2 */}
            <div className="glossy-glass-card p-8 rounded-3xl">
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-mono font-bold text-teal-300 glossy-chip px-3 py-1 rounded-full">
                  2021 — 2023 · NALGONDA
                </span>
                <span className="text-2xl font-serif font-bold text-white">
                  CGPA 9.64
                </span>
              </div>
              <h3 className="text-2xl font-serif font-semibold text-white">
                Government Polytechnic College
              </h3>
              <p className="text-sm font-sans text-slate-300 mt-2">
                Diploma in Computer Science. Rigorous foundations in Data Structures, Object-Oriented Programming, and Relational Databases.
              </p>
            </div>
          </div>

          {/* Honours Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="glossy-glass-card p-6 rounded-3xl">
              <b className="font-serif text-xl font-bold text-blue-300 block mb-2">
                Top 32 National Finalist
              </b>
              <p className="text-xs font-sans text-slate-300 leading-relaxed">
                National hackathon finalist out of 1,500+ competing engineering teams nationwide.
              </p>
            </div>

            <div className="glossy-glass-card p-6 rounded-3xl">
              <b className="font-serif text-xl font-bold text-teal-300 block mb-2">
                Special Mention Hackathon
              </b>
              <p className="text-xs font-sans text-slate-300 leading-relaxed">
                Awarded special recognition in a 24-hour virtual hackathon with 1,200+ participating teams.
              </p>
            </div>

            <div className="glossy-glass-card p-6 rounded-3xl">
              <b className="font-serif text-xl font-bold text-rose-300 block mb-2">
                59th Statewide Rank
              </b>
              <p className="text-xs font-sans text-slate-300 leading-relaxed">
                Achieved 59th state rank in TGECET-2024 among tens of thousands of test takers.
              </p>
            </div>
          </div>
        </section>

        {/* =========================================
            9. CONTACT LOUNGE
           ========================================= */}
        <section id="contact" className="py-28 border-t border-white/10">
          <p className="text-blue-400 font-mono text-xs tracking-widest uppercase font-bold mb-4">
            Begin a conversation
          </p>
          <h2 className="text-5xl sm:text-7xl lg:text-8xl font-serif text-white tracking-tight leading-none max-w-4xl">
            Let’s make<br />
            something <em className="italic text-blue-400 font-serif">matter.</em>
          </h2>

          <div className="mt-12 flex flex-wrap items-center gap-5">
            <a
              onClick={handleConfetti}
              href="mailto:sanjaykumardupati6@gmail.com"
              className="glossy-pill-blue px-8 py-4 rounded-full font-mono text-xs uppercase tracking-widest font-bold shadow-xl hover:scale-105 transition-transform flex items-center gap-2 cursor-pointer"
            >
              <Mail size={16} />
              <span>Send an Email ↗</span>
            </a>

            <button
              onClick={copyEmailToClipboard}
              className="glossy-chip px-7 py-4 rounded-full font-mono text-xs uppercase tracking-widest font-bold text-slate-200 hover:text-white flex items-center gap-2 cursor-pointer"
            >
              {copiedEmail ? <Check size={16} className="text-emerald-400" /> : <Copy size={16} />}
              <span>{copiedEmail ? 'Email Copied!' : 'Copy Email Address'}</span>
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-12 mt-16 border-t border-white/10 text-xs font-mono text-slate-400">
            <div>
              <span className="text-slate-500 block mb-1">DIRECT INBOX</span>
              <a href="mailto:sanjaykumardupati6@gmail.com" className="text-slate-200 font-bold hover:text-blue-400">
                sanjaykumardupati6@gmail.com
              </a>
            </div>
            <div>
              <span className="text-slate-500 block mb-1">DIRECT PHONE</span>
              <a href="tel:+919014680891" className="text-slate-200 font-bold hover:text-blue-400">
                +91 90146 80891
              </a>
            </div>
            <div>
              <span className="text-slate-500 block mb-1">LOCATION & BASE</span>
              <p className="text-slate-200 font-bold">Hyderabad, Telangana, India</p>
            </div>
          </div>
        </section>
      </main>

      {/* Project Detail Deep Dive Modal */}
      <ProjectDetailModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </div>
  );
}
