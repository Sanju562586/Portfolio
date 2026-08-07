import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Sparkles, Brain, Cpu, Database, ArrowLeft, Filter, Github, Globe } from 'lucide-react';
import ProjectCard3D from '../components/ProjectCard3D.jsx';
import { PROJECTS_DATA } from '../data/projectsData.js';

export default function ProjectsPage({ onBackToIndex }) {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = ['All', 'AI', 'Deep Learning', 'Machine Learning', 'Web Development'];

  const filteredProjects = useMemo(() => {
    return PROJECTS_DATA.filter((project) => {
      const matchesCategory =
        selectedCategory === 'All' || project.category === selectedCategory;

      const query = searchQuery.toLowerCase().trim();
      const matchesQuery =
        !query ||
        project.title.toLowerCase().includes(query) ||
        project.description.toLowerCase().includes(query) ||
        project.tag.toLowerCase().includes(query) ||
        project.stack.some((tech) => tech.toLowerCase().includes(query)) ||
        project.highlights.some((h) => h.toLowerCase().includes(query));

      return matchesCategory && matchesQuery;
    });
  }, [selectedCategory, searchQuery]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className="min-h-screen pt-20 pb-28 px-4 sm:px-8 w-[min(1240px,90%)] mx-auto"
    >
      {/* Back Button */}
      <button
        onClick={onBackToIndex}
        className="inline-flex items-center gap-2 px-4 py-2 mb-8 rounded-xl border border-slate-300 bg-white/90 text-slate-800 font-mono text-xs font-semibold hover:border-violet-500 hover:text-violet-600 shadow-sm transition-all group cursor-pointer"
      >
        <ArrowLeft size={14} className="transition-transform group-hover:-translate-x-1" /> Back to Home
      </button>

      {/* Page Header */}
      <div className="mb-14">
        <p className="text-violet-600 font-mono text-xs tracking-widest uppercase mb-3 font-semibold flex items-center gap-2">
          <Sparkles size={14} /> Projects Archive / High-Level Classification
        </p>
        <h1 className="text-5xl sm:text-7xl font-serif text-slate-900 tracking-tight leading-none">
          All <em className="italic text-violet-600 font-serif">Engineering</em> Projects
        </h1>
        <p className="text-slate-600 text-base sm:text-lg mt-4 max-w-2xl font-sans leading-relaxed">
          Explore complete systems across <strong>AI</strong>, <strong>Deep Learning</strong>, <strong>Machine Learning</strong>, and <strong>Web Development</strong>.
        </p>
      </div>

      {/* Control Bar: Categories & Search */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 mb-14 pb-8 border-b border-slate-200">
        {/* Category Classification Tabs */}
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-slate-400 font-mono text-[10px] uppercase font-bold tracking-widest mr-2 flex items-center gap-1">
            <Filter size={12} /> CATEGORY:
          </span>
          {categories.map((cat) => {
            const count =
              cat === 'All'
                ? PROJECTS_DATA.length
                : PROJECTS_DATA.filter((p) => p.category === cat).length;

            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-xl text-xs font-mono font-semibold transition-all cursor-pointer flex items-center gap-2 ${
                  selectedCategory === cat
                    ? 'bg-violet-600 text-white shadow-md scale-105'
                    : 'bg-white border border-slate-300 text-slate-700 hover:border-violet-400 hover:text-violet-600'
                }`}
              >
                {cat}
                <span
                  className={`px-2 py-0.5 rounded-full text-[10px] ${
                    selectedCategory === cat
                      ? 'bg-white/20 text-white'
                      : 'bg-slate-100 text-slate-600'
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Search Bar */}
        <div className="relative max-w-md w-full">
          <Search
            size={16}
            className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
          />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search projects by model, stack, or keywords (e.g. Next.js, PaliGemma, MCP)..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-300 bg-white text-slate-900 text-xs font-mono placeholder:text-slate-400 focus:outline-none focus:border-violet-600 focus:ring-2 focus:ring-violet-600/20 shadow-sm transition-all"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-mono text-slate-400 hover:text-slate-800"
            >
              CLEAR
            </button>
          )}
        </div>
      </div>

      {/* Projects Grid */}
      {filteredProjects.length === 0 ? (
        <div className="text-center py-20 bg-white/60 rounded-3xl border border-slate-200">
          <p className="text-lg font-serif text-slate-800">No projects found matching your search query.</p>
          <button
            onClick={() => {
              setSelectedCategory('All');
              setSearchQuery('');
            }}
            className="mt-4 px-4 py-2 bg-violet-600 text-white font-mono text-xs font-semibold rounded-xl hover:bg-violet-700 transition-colors"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, idx) => (
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
                delay={idx * 0.1}
              />
            ))}
          </AnimatePresence>
        </div>
      )}
    </motion.div>
  );
}
