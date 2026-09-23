'use client';

import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Github, ExternalLink, Cpu, CheckCircle2, Workflow, ArrowRight } from 'lucide-react';

export default function ProjectDetailModal({ project, onClose }) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    if (project) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [project, onClose]);

  if (!project) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/75 backdrop-blur-2xl"
        />

        {/* Modal Window (Glossy Glass) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="glossy-glass-card relative z-10 w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-[32px] p-7 sm:p-10 my-auto text-white"
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            aria-label="Close Project Details"
            className="absolute top-6 right-6 p-2.5 rounded-full bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white transition-colors cursor-pointer border border-white/15"
          >
            <X size={18} />
          </button>

          {/* Header */}
          <div className="pr-12">
            <div className="flex flex-wrap items-center gap-2 mb-3">
              <span className="glossy-chip px-3 py-1 rounded-full text-[11px] font-mono font-bold uppercase tracking-wider text-blue-300">
                {project.category}
              </span>
              <span className="text-xs font-mono text-slate-400 font-medium">
                ARCHIVE REF #{project.id}
              </span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-serif text-white font-semibold tracking-tight">
              {project.title}
            </h2>

            {project.subtitle && (
              <p className="text-sm font-mono text-blue-400 mt-1.5 font-medium">
                {project.subtitle}
              </p>
            )}
          </div>

          {/* Description */}
          <div className="mt-6 text-slate-300 text-sm sm:text-base leading-relaxed font-sans border-b border-white/10 pb-6">
            “{project.description}”
          </div>

          {/* Architecture Pipeline Flow */}
          {project.architecture && (
            <div className="mt-6 p-5 rounded-2xl bg-white/5 border border-white/10">
              <div className="flex items-center gap-2 text-xs font-mono font-bold text-blue-300 uppercase tracking-widest mb-3">
                <Workflow size={15} className="text-blue-400" />
                <span>System Architecture & Pipeline Flow</span>
              </div>
              <p className="font-mono text-xs sm:text-sm text-slate-200 bg-black/40 p-4 rounded-xl border border-white/10 shadow-inner leading-relaxed">
                {project.architecture}
              </p>
            </div>
          )}

          {/* Key Metrics */}
          {project.metrics && (
            <div className="mt-6">
              <span className="text-xs font-mono font-bold text-slate-400 uppercase tracking-widest block mb-2.5">
                Performance & Specifications
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {project.metrics.map((metric, idx) => (
                  <div
                    key={idx}
                    className="p-3.5 rounded-2xl bg-white/5 border border-white/10 text-center font-mono"
                  >
                    <span className="text-xs sm:text-sm font-bold text-blue-300">
                      ✦ {metric}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Technical Highlights */}
          {project.highlights && (
            <div className="mt-6">
              <span className="text-xs font-mono font-bold text-slate-400 uppercase tracking-widest block mb-3">
                Technical Highlights & Innovations
              </span>
              <ul className="space-y-3">
                {project.highlights.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-sm text-slate-300 leading-relaxed font-sans">
                    <CheckCircle2 size={16} className="text-blue-400 shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Tech Stack */}
          <div className="mt-8 pt-6 border-t border-white/10">
            <span className="text-xs font-mono font-bold text-slate-400 uppercase tracking-widest block mb-3">
              Technologies & Frameworks
            </span>
            <div className="flex flex-wrap gap-2">
              {project.stack.map((tech) => (
                <span
                  key={tech}
                  className="px-3 py-1.5 rounded-xl bg-white/5 border border-white/10 text-xs font-mono font-medium text-slate-200"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Footer CTAs */}
          <div className="mt-8 pt-6 border-t border-white/10 flex flex-wrap items-center justify-between gap-4">
            <button
              onClick={onClose}
              className="px-5 py-2.5 rounded-full border border-white/15 font-mono text-xs uppercase tracking-wider font-semibold text-slate-300 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
            >
              Close Window
            </button>

            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="glossy-pill-blue px-6 py-2.5 rounded-full font-mono text-xs uppercase tracking-wider font-bold flex items-center gap-2 shadow-lg"
              >
                <Github size={15} />
                <span>View on GitHub ↗</span>
              </a>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
