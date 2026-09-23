'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Sparkles, ArrowLeft, Filter, X } from 'lucide-react';
import ProjectCard3D from '../../components/ProjectCard3D';
import ProjectDetailModal from '../../components/ProjectDetailModal';
import { PROJECTS_DATA } from '../../data/projectsData';

export default function ProjectsArchivePage() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProject, setSelectedProject] = useState(null);

  const categories = ['All', 'AI', 'Deep Learning', 'Machine Learning', 'Web Development'];

  const filteredProjects = useMemo(() => {
    return PROJECTS_DATA.filter((project) => {
      const matchesCategory =
        selectedCategory === 'All' || project.category === selectedCategory;

      const query = searchQuery.toLowerCase().trim();
      const matchesQuery =
        !query ||
        project.title.toLowerCase().includes(query) ||
        (project.subtitle && project.subtitle.toLowerCase().includes(query)) ||
        project.description.toLowerCase().includes(query) ||
        project.tag.toLowerCase().includes(query) ||
        project.stack.some((tech) => tech.toLowerCase().includes(query)) ||
        project.highlights.some((h) => h.toLowerCase().includes(query));

      return matchesCategory && matchesQuery;
    });
  }, [selectedCategory, searchQuery]);

  return (
    <div className="min-h-screen py-10 px-4 sm:px-8 w-[min(1280px,92%)] mx-auto">
      {/* Back Button */}
      <Link
        href="/"
        className="glossy-chip inline-flex items-center gap-2 px-4 py-2 mb-8 rounded-full text-slate-200 font-mono text-xs font-semibold hover:text-white shadow-sm transition-all group cursor-pointer"
      >
        <ArrowLeft size={14} className="transition-transform group-hover:-translate-x-1 text-blue-400" />
        <span>Back to Home</span>
      </Link>

      {/* Page Header */}
      <div className="mb-14">
        <p className="text-blue-400 font-mono text-xs tracking-widest uppercase mb-3 font-bold flex items-center gap-2">
          <Sparkles size={14} /> Full Engineering Projects Archive
        </p>
        <h1 className="text-5xl sm:text-7xl font-serif text-white tracking-tight leading-none">
          All <em className="italic text-blue-400 font-serif">Engineering</em> Projects
        </h1>
        <p className="text-slate-300 text-base sm:text-lg mt-4 max-w-2xl font-sans leading-relaxed">
          Explore complete systems across <strong>Agentic AI</strong>, <strong>Multimodal VLMs</strong>, <strong>Machine Learning</strong>, and <strong>High-Throughput Web Platforms</strong>.
        </p>
      </div>

      {/* Control Bar: Categories & Search */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 mb-12 pb-8 border-b border-white/10">
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
                className={`px-4 py-2 rounded-full text-xs font-mono font-bold transition-all cursor-pointer flex items-center gap-2 ${
                  selectedCategory === cat
                    ? 'glossy-pill-blue'
                    : 'glossy-chip'
                }`}
              >
                <span>{cat}</span>
                <span
                  className={`px-2 py-0.5 rounded-full text-[10px] ${
                    selectedCategory === cat
                      ? 'bg-white/20 text-white'
                      : 'bg-white/10 text-slate-300'
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Search Bar (Glossy Inner Bar) */}
        <div className="relative max-w-md w-full">
          <Search
            size={16}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
          />
          <input
            type="text"
            placeholder="Search by tech, title, or system keyword..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-11 pr-10 py-3 rounded-2xl glossy-inner-bar font-mono text-xs text-white placeholder:text-slate-400 focus:outline-none focus:border-blue-400 transition-all shadow-md"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white cursor-pointer"
            >
              <X size={14} />
            </button>
          )}
        </div>
      </div>

      {/* Projects Grid */}
      {filteredProjects.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, idx) => (
              <ProjectCard3D
                key={project.id}
                project={project}
                onOpenDetails={(p) => setSelectedProject(p)}
                delay={idx * 0.08}
              />
            ))}
          </AnimatePresence>
        </div>
      ) : (
        <div className="py-24 text-center glossy-glass-card rounded-[32px]">
          <p className="font-serif text-3xl text-white mb-2">No matching projects found</p>
          <p className="font-mono text-xs text-slate-400 mb-6">
            Try adjusting your search query or reset category filter.
          </p>
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedCategory('All');
            }}
            className="glossy-pill-blue px-6 py-2.5 rounded-full font-mono text-xs uppercase tracking-wider font-bold shadow-lg cursor-pointer"
          >
            Reset Filters
          </button>
        </div>
      )}

      {/* Project Detail Deep Dive Modal */}
      <ProjectDetailModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </div>
  );
}
