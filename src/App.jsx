import React, { useState } from 'react';
import { motion, AnimatePresence, useScroll, useSpring } from 'framer-motion';
import confetti from 'canvas-confetti';
import {
  ArrowUpRight,
  Code2,
  Cpu,
  Database,
  Globe,
  Layers,
  Sparkles,
  Terminal,
  Mail,
  Github,
  Linkedin,
  Award,
  BookOpen,
} from 'lucide-react';

import Interactive3DCursor from './components/Interactive3DCursor.jsx';
import Magnetic3DButton from './components/Magnetic3DButton.jsx';
import ProjectCard3D from './components/ProjectCard3D.jsx';
import Hero3DVisualizer from './components/Hero3DVisualizer.jsx';
import Skills3DSphere from './components/Skills3DSphere.jsx';
import StatCard3D from './components/StatCard3D.jsx';
import ProjectsPage from './pages/ProjectsPage.jsx';
import { PROJECTS_DATA } from './data/projectsData.js';

export default function App() {
  const [viewMode, setViewMode] = useState('home'); // 'home' | 'projects'
  const [activeTab, setActiveTab] = useState('All');
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('index');

  // Scroll Progress Bar spring physics
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  const handleConfetti = (e) => {
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.8 },
      colors: ['#7c3aed', '#0d9488', '#e11d48', '#d97706', '#0284c7'],
    });
  };

  const filteredFeaturedProjects =
    activeTab === 'All'
      ? PROJECTS_DATA
      : PROJECTS_DATA.filter((p) => p.category === activeTab);

  return (
    <div className="min-h-screen bg-bg text-text font-sans relative selection:bg-violet-600 selection:text-white">
      {/* 3D Spatial Follow Cursor */}
      <Interactive3DCursor />

      {/* Top Colorful 3D Scroll Progress Line */}
      <motion.div
        style={{ scaleX }}
        className="fixed top-0 left-0 right-0 h-[4px] bg-gradient-to-r from-violet-600 via-teal-500 to-rose-500 z-[1000] origin-left shadow-[0_0_15px_rgba(124,58,237,0.5)]"
      />

      {/* Sticky Header */}
      <header className="sticky top-3.5 z-50 w-[min(1360px,92%)] mx-auto h-[66px] px-6 flex items-center justify-between border border-slate-200/80 rounded-2xl bg-white/80 backdrop-blur-xl shadow-lg">
        <button
          onClick={() => {
            setViewMode('home');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="wordmark flex items-center gap-2.5 font-serif text-2xl tracking-wide text-slate-900 font-semibold cursor-pointer border-0 bg-transparent"
        >
          Sanjay Kumar <i className="w-2.5 h-2.5 rounded-full bg-violet-600 shadow-[0_0_12px_rgba(124,58,237,0.6)]" />
        </button>

        {/* Desktop Primary Nav */}
        <nav className="hidden md:flex items-center gap-1">
          <button
            onClick={() => {
              setViewMode('home');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className={`px-3.5 py-2 rounded-lg font-mono text-[11px] tracking-wider uppercase transition-all duration-300 cursor-pointer ${
              viewMode === 'home'
                ? 'text-violet-700 bg-violet-50 font-semibold border border-violet-200'
                : 'text-slate-600 hover:text-violet-600 hover:bg-slate-100'
            }`}
          >
            Index
          </button>

          <button
            onClick={() => {
              setViewMode('projects');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className={`px-3.5 py-2 rounded-lg font-mono text-[11px] tracking-wider uppercase transition-all duration-300 cursor-pointer ${
              viewMode === 'projects'
                ? 'text-violet-700 bg-violet-50 font-semibold border border-violet-200'
                : 'text-slate-600 hover:text-violet-600 hover:bg-slate-100'
            }`}
          >
            Projects ({PROJECTS_DATA.length})
          </button>

          {['capabilities', 'profile', 'contact'].map((sectionId) => (
            <a
              key={sectionId}
              href={`#${sectionId}`}
              onClick={() => {
                if (viewMode !== 'home') setViewMode('home');
                setActiveSection(sectionId);
              }}
              className="px-3.5 py-2 rounded-lg font-mono text-[11px] tracking-wider uppercase transition-all duration-300 text-slate-600 hover:text-violet-600 hover:bg-slate-100"
            >
              {sectionId}
            </a>
          ))}
        </nav>

        {/* Header 3D Magnetic CTA */}
        <div className="hidden md:block">
          <Magnetic3DButton
            href="#contact"
            onClick={() => {
              if (viewMode !== 'home') setViewMode('home');
            }}
            className="px-4 py-2 bg-gradient-to-r from-violet-600 to-indigo-600 text-white font-mono text-[11px] tracking-wider uppercase rounded-lg shadow-md hover:shadow-xl hover:brightness-110 transition-all"
          >
            Start a conversation <span className="inline-block ml-1">↗</span>
          </Magnetic3DButton>
        </div>

        {/* Mobile Hamburger Toggle */}
        <button
          onClick={() => setMobileNavOpen(!mobileNavOpen)}
          className="md:hidden text-slate-900 font-mono text-[11px] tracking-widest uppercase font-semibold"
        >
          {mobileNavOpen ? 'CLOSE -' : 'MENU +'}
        </button>
      </header>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {mobileNavOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-20 left-4 right-4 z-40 p-6 rounded-2xl bg-white border border-slate-200 backdrop-blur-2xl flex flex-col gap-4 md:hidden shadow-2xl"
          >
            <button
              onClick={() => {
                setViewMode('home');
                setMobileNavOpen(false);
              }}
              className="font-mono text-xs uppercase tracking-widest text-slate-700 hover:text-violet-600 font-semibold text-left"
            >
              Index / Home
            </button>
            <button
              onClick={() => {
                setViewMode('projects');
                setMobileNavOpen(false);
              }}
              className="font-mono text-xs uppercase tracking-widest text-violet-700 font-semibold text-left"
            >
              Projects Page ({PROJECTS_DATA.length})
            </button>
            {['capabilities', 'profile', 'contact'].map((link) => (
              <a
                key={link}
                href={`#${link}`}
                onClick={() => {
                  if (viewMode !== 'home') setViewMode('home');
                  setMobileNavOpen(false);
                }}
                className="font-mono text-xs uppercase tracking-widest text-slate-700 hover:text-violet-600 font-semibold"
              >
                {link}
              </a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* DEDICATED PROJECTS PAGE ROUTE */}
      <AnimatePresence mode="wait">
        {viewMode === 'projects' ? (
          <ProjectsPage key="projects-page" onBackToIndex={() => setViewMode('home')} />
        ) : (
          <motion.main
            key="home-page"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="w-[min(1240px,84%)] mx-auto"
          >
            {/* HERO SECTION WITH 3D CANVAS */}
            <section id="index" className="min-h-[calc(100vh-94px)] pt-24 pb-16 grid grid-cols-1 lg:grid-cols-[1.15fr_0.85fr] items-end gap-10">
              <div className="hero-topline col-span-full flex items-center justify-between mb-6">
                <p className="eyebrow text-violet-600 font-mono text-[11px] tracking-widest uppercase flex items-center gap-2 font-semibold">
                  <span className="w-7 h-[2px] bg-violet-600 inline-block" /> Independent engineer · Hyderabad, IN
                </p>
                <p className="availability font-mono text-[10px] text-teal-700 tracking-widest uppercase flex items-center gap-2 font-semibold bg-teal-50 px-3 py-1 rounded-full border border-teal-200">
                  <i className="w-2 h-2 rounded-full bg-teal-500 shadow-[0_0_10px_#0d9488] animate-pulse" /> Available for select collaborations
                </p>
              </div>

              <div className="hero-copy relative z-10 max-w-2xl">
                <motion.h1
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                  className="text-6xl sm:text-7xl lg:text-8xl font-serif leading-[0.88] tracking-tight text-slate-900 font-normal"
                >
                  Systems for<br />
                  the <em className="italic text-violet-600 font-serif">intelligent</em><br />
                  future.
                </motion.h1>

                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  className="mt-8 text-base sm:text-lg text-slate-600 max-w-md font-sans leading-relaxed font-normal"
                >
                  I design the algorithms, vision-language models, and 3D interfaces that turn complex reasoning problems into useful, dependable products.
                </motion.p>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.35 }}
                  className="mt-10 flex flex-wrap items-center gap-6"
                >
                  <Magnetic3DButton
                    onClick={() => setViewMode('projects')}
                    className="px-6 py-3.5 bg-gradient-to-r from-violet-600 via-indigo-600 to-teal-600 text-white font-mono text-xs tracking-widest uppercase rounded-xl shadow-lg hover:shadow-2xl hover:scale-105 transition-all"
                  >
                    View All Projects ({PROJECTS_DATA.length}) <b className="font-normal text-base ml-2">↗</b>
                  </Magnetic3DButton>

                  <span className="font-mono text-[11px] text-slate-500 leading-tight tracking-wider">
                    Computer Science<br />Engineering · 2026
                  </span>
                </motion.div>
              </div>

              {/* Interactive 3D Neural Sphere Visualizer Component */}
              <Hero3DVisualizer />
            </section>

            {/* MARQUEE TICKER SECTION */}
            <section className="w-full overflow-hidden border-y border-slate-200/80 my-16 py-4 bg-gradient-to-r from-violet-50/50 via-white to-teal-50/50">
              <motion.div
                animate={{ x: ['0%', '-50%'] }}
                transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
                className="flex whitespace-nowrap font-mono text-xs tracking-widest uppercase text-slate-600 font-medium gap-6"
              >
                {[...Array(2)].map((_, i) => (
                  <span key={i} className="flex items-center gap-6">
                    Agentic systems <b className="text-violet-600">✦</b> vision-language models <b className="text-teal-600">✦</b> deep learning <b className="text-rose-500">✦</b> human-centred engineering <b className="text-amber-500">✦</b> 3D spatial interfaces <b className="text-cyan-600">✦</b>
                  </span>
                ))}
              </motion.div>
            </section>

            {/* MANIFESTO SECTION */}
            <section className="py-24 grid grid-cols-1 lg:grid-cols-[0.8fr_1.2fr] gap-12 items-center border-b border-slate-200">
              <div>
                <p className="text-violet-600 font-mono text-[11px] tracking-widest uppercase mb-4 font-semibold">
                  A point of view
                </p>
                <h2 className="text-4xl sm:text-5xl lg:text-6xl font-serif text-slate-900 leading-tight tracking-tight">
                  Good software makes the <em className="italic text-amber-600">complicated</em> feel inevitable.
                </h2>
              </div>
              <aside className="space-y-6 text-slate-600 text-base leading-relaxed max-w-lg font-sans">
                <p>
                  My work lives between rigorous computer science, vision-language deep learning, and practical AI. I care about the invisible machinery as much as the moment someone finds it intuitive to use.
                </p>
                <p>
                  From fine-tuned multimodal LLMs (PaliGemma-3B, LLaVA) to autonomous reasoning loops, I build systems that remain resilient, performant, and transparent under pressure.
                </p>
              </aside>
            </section>

            {/* STATS SECTION WITH 3D PERSPECTIVE CARDS */}
            <section className="py-20">
              <div className="grid grid-cols-1 md:grid-cols-3 border border-slate-200 bg-slate-200/50 shadow-md rounded-2xl overflow-hidden">
                <StatCard3D
                  index="01 / PROBLEM SOLVING"
                  number="500+"
                  description="competitive programming problems solved across platforms."
                  delay={0}
                />
                <StatCard3D
                  index="02 / BUILDING IN PUBLIC"
                  number="32"
                  description="finalist placement out of 1,500+ hackathon teams."
                  delay={0.15}
                />
                <StatCard3D
                  index="03 / PERFORMANCE"
                  number="59th"
                  description="state rank achieved in TGECET-2024."
                  delay={0.3}
                />
              </div>
            </section>

            {/* FEATURED WORK SECTION */}
            <section id="work" className="py-24">
              <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
                <div>
                  <p className="text-teal-600 font-mono text-[11px] tracking-widest uppercase mb-2 font-semibold">
                    Categorized Work Archive / 2024 — 2026
                  </p>
                  <h2 className="text-5xl sm:text-6xl font-serif text-slate-900 tracking-tight">
                    Built for <em className="italic text-violet-600">use,</em> not just display.
                  </h2>
                </div>

                {/* Classification Filter Tabs */}
                <div className="flex flex-wrap gap-2 mt-6 md:mt-0 font-mono text-[11px] uppercase">
                  {['All', 'AI', 'Deep Learning', 'Machine Learning', 'Web Development'].map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className={`px-3.5 py-1.5 rounded-lg border font-semibold transition-all cursor-pointer ${
                        activeTab === tab
                          ? 'border-violet-600 bg-violet-600 text-white shadow-md'
                          : 'border-slate-300 text-slate-600 bg-white hover:border-violet-400 hover:text-violet-600'
                      }`}
                    >
                      {tab}
                    </button>
                  ))}

                  <button
                    onClick={() => setViewMode('projects')}
                    className="px-3.5 py-1.5 rounded-lg border border-violet-200 bg-violet-50 text-violet-700 font-semibold hover:bg-violet-100 transition-all cursor-pointer"
                  >
                    All Projects Page ↗
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <AnimatePresence mode="popLayout">
                  {filteredFeaturedProjects.slice(0, 4).map((project, idx) => (
                    <ProjectCard3D
                      key={project.id}
                      number={`${project.id} / 0${PROJECTS_DATA.length}`}
                      tag={project.tag}
                      title={project.title}
                      description={project.description}
                      stack={project.stack}
                      githubUrl={project.githubUrl}
                      highlights={project.highlights}
                      cardStyle={project.cardStyle}
                      delay={idx * 0.15}
                    />
                  ))}
                </AnimatePresence>
              </div>

              <div className="mt-12 text-center">
                <button
                  onClick={() => {
                    setViewMode('projects');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="inline-flex items-center gap-3 px-8 py-4 bg-slate-900 text-white font-mono text-xs uppercase tracking-widest rounded-xl hover:bg-violet-700 shadow-xl transition-all cursor-pointer"
                >
                  Explore Dedicated Projects Page ({PROJECTS_DATA.length} Projects) <ArrowUpRight size={16} />
                </button>
              </div>
            </section>

            {/* 3D SKILL MATRIX / CAPABILITIES */}
            <section id="capabilities" className="py-24 border-t border-slate-200">
              <div className="text-center max-w-2xl mx-auto mb-12">
                <p className="text-rose-600 font-mono text-[11px] tracking-widest uppercase mb-2 font-semibold">
                  Interactive 3D Skill Cloud
                </p>
                <h2 className="text-5xl font-serif text-slate-900 tracking-tight">
                  Capabilities & Technical Stack
                </h2>
                <p className="text-slate-600 text-sm mt-3 font-sans">
                  Interact with the 3D matrix below to explore core domain expertise, language proficiency, and architecture tools.
                </p>
              </div>

              {/* Interactive 3D Drag Sphere */}
              <Skills3DSphere />
            </section>

            {/* PROFILE & HONOURS */}
            <section id="profile" className="py-24 border-t border-slate-200">
              <p className="text-violet-600 font-mono text-[11px] tracking-widest uppercase mb-4 font-semibold">
                Recognitions & Profile
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 border border-slate-200 bg-slate-200/60 rounded-2xl overflow-hidden gap-[1px] shadow-md">
                <article className="p-8 bg-white hover:bg-violet-50/50 transition-colors">
                  <b className="block text-3xl font-serif text-violet-700 mb-3">State Rank 59<sup>th</sup></b>
                  <p className="text-slate-600 text-sm leading-relaxed">
                    Ranked 59th statewide in TGECET-2024 among tens of thousands of engineering candidates.
                  </p>
                </article>

                <article className="p-8 bg-white hover:bg-teal-50/50 transition-colors">
                  <b className="block text-3xl font-serif text-teal-700 mb-3">Hackathon Finalist</b>
                  <p className="text-slate-600 text-sm leading-relaxed">
                    Ranked 32nd out of 1,500+ teams in national hackathon competition, engineering intelligent autonomous workflows under timed constraints.
                  </p>
                </article>

                <article className="p-8 bg-white hover:bg-rose-50/50 transition-colors">
                  <b className="block text-3xl font-serif text-rose-700 mb-3">500+ Algorithmic Solutions</b>
                  <p className="text-slate-600 text-sm leading-relaxed">
                    Demonstrated mastery in data structures, graph theory, dynamic programming, and space-time optimization.
                  </p>
                </article>
              </div>
            </section>

            {/* CONTACT SECTION */}
            <section id="contact" className="py-28 min-h-[70vh] flex flex-col justify-between border-t border-slate-200">
              <div>
                <p className="text-violet-600 font-mono text-[11px] tracking-widest uppercase mb-6 font-semibold">
                  Let's connect
                </p>
                <h2 className="text-5xl sm:text-7xl lg:text-8xl font-serif text-slate-900 tracking-tight leading-none max-w-4xl">
                  Building something ambitious?
                </h2>

                <div className="mt-12">
                  <Magnetic3DButton
                    onClick={handleConfetti}
                    href="mailto:sanjaykumardupati6@gmail.com"
                    className="inline-block text-violet-700 hover:text-rose-600 text-3xl sm:text-5xl font-serif tracking-tight border-b-2 border-violet-400 pb-2 transition-colors"
                  >
                    sanjaykumardupati6@gmail.com <span className="inline-block transition-transform duration-300 group-hover:translate-x-3 group-hover:-translate-y-2">↗</span>
                  </Magnetic3DButton>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-8 mt-16 border-t border-slate-200 text-xs font-mono text-slate-600">
                <div>
                  <span className="text-slate-400 block mb-1">LOCATION & AVAILABILITY</span>
                  <p className="text-slate-800 font-semibold">Hyderabad, Telangana, India · Remote Worldwide</p>
                </div>
                <div>
                  <span className="text-slate-400 block mb-1">SOCIAL & CODE ARCHIVES</span>
                  <div className="flex gap-4 text-violet-700 font-semibold">
                    <a href="https://github.com/Sanju562586" target="_blank" rel="noopener noreferrer" className="hover:underline flex items-center gap-1">
                      <Github size={12} /> GitHub ↗
                    </a>
                    <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:underline flex items-center gap-1">
                      <Linkedin size={12} /> LinkedIn ↗
                    </a>
                  </div>
                </div>
              </div>
            </section>
          </motion.main>
        )}
      </AnimatePresence>

      {/* FOOTER */}
      <footer className="w-[min(1240px,84%)] mx-auto py-8 border-t border-slate-200 flex flex-col sm:flex-row justify-between gap-4 font-mono text-[10px] text-slate-500 tracking-wider">
        <span>© 2026 SANJAY KUMAR DUPATI</span>
        <span>ENGINEERED WITH REACT, THREE.JS & FRAMER MOTION 3D</span>
        <button
          onClick={() => {
            setViewMode('home');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="text-violet-600 font-semibold hover:underline cursor-pointer border-0 bg-transparent"
        >
          BACK TO TOP ↑
        </button>
      </footer>
    </div>
  );
}
