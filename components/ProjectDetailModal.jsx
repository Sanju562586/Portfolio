'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  Github,
  ExternalLink,
  Cpu,
  CheckCircle2,
  Workflow,
  Radio,
  AlertCircle,
  Terminal,
} from 'lucide-react';

export default function ProjectDetailModal({ project, onClose, onNoDeployment }) {
  const [showLocalNotice, setShowLocalNotice] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    if (project) {
      document.body.style.overflow = 'hidden';
      if (typeof window !== 'undefined' && window.__lenis) {
        window.__lenis.stop();
      }
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = '';
      if (typeof window !== 'undefined' && window.__lenis) {
        window.__lenis.start();
      }
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [project, onClose]);

  if (!project) return null;

  const handleLiveDemoClick = () => {
    if (project.liveUrl) {
      window.open(project.liveUrl, '_blank', 'noopener,noreferrer');
    } else {
      setShowLocalNotice(true);
      if (onNoDeployment) onNoDeployment(project);
    }
  };

  return (
    <AnimatePresence>
      <div
        data-lenis-prevent
        className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-6 overflow-hidden"
      >
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/80 backdrop-blur-2xl"
        />

        {/* Modal Window (Glossy Glass with Native Smooth Scroll) */}
        <motion.div
          data-lenis-prevent
          tabIndex={0}
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
          className="glossy-glass-card modal-custom-scroll relative z-10 w-full max-w-3xl max-h-[88vh] overflow-y-auto overscroll-contain rounded-[32px] p-6 sm:p-10 my-auto text-white shadow-2xl focus:outline-none"
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
              {project.liveUrl ? (
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-[10px] font-mono font-bold flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  LIVE DEPLOYED
                </span>
              ) : (
                <span className="px-2.5 py-0.5 rounded-full bg-amber-500/10 text-amber-300 border border-amber-500/20 text-[10px] font-mono font-semibold">
                  SOURCE / LOCAL BUILD
                </span>
              )}
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

          {/* Inline No Deployment Notice Alert (If clicked) */}
          <AnimatePresence>
            {showLocalNotice && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="mt-6 p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-200 text-xs font-sans flex items-start justify-between gap-3"
              >
                <div className="flex items-start gap-2.5">
                  <AlertCircle size={16} className="text-amber-400 shrink-0 mt-0.5" />
                  <div>
                    <strong className="block font-bold text-amber-300">
                      No Live Deployment Link Available
                    </strong>
                    <p className="mt-1 text-slate-300">
                      This system requires dedicated local environment, GPU inference checkpoints, or distributed message queues. Please review the complete setup instructions and source code on GitHub.
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setShowLocalNotice(false)}
                  className="text-slate-400 hover:text-white p-1 cursor-pointer"
                >
                  <X size={14} />
                </button>
              </motion.div>
            )}
          </AnimatePresence>

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

          {/* Footer Action Buttons */}
          <div className="mt-8 pt-6 border-t border-white/10 flex flex-wrap items-center justify-between gap-4">
            <button
              onClick={onClose}
              className="px-5 py-2.5 rounded-full border border-white/15 font-mono text-xs uppercase tracking-wider font-semibold text-slate-300 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
            >
              Close Window
            </button>

            <div className="flex items-center gap-3">
              {/* Live Demo Button */}
              <button
                onClick={handleLiveDemoClick}
                className={`px-5 py-2.5 rounded-full font-mono text-xs uppercase tracking-wider font-bold flex items-center gap-2 transition-all cursor-pointer ${
                  project.liveUrl
                    ? 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-lg'
                    : 'border border-amber-500/40 bg-amber-500/10 hover:bg-amber-500/20 text-amber-300'
                }`}
              >
                <Radio size={13} className={project.liveUrl ? 'animate-pulse' : ''} />
                <span>{project.liveUrl ? 'Launch Live App ↗' : 'Check Live Demo'}</span>
              </button>

              {/* GitHub Link */}
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="glossy-pill-blue px-6 py-2.5 rounded-full font-mono text-xs uppercase tracking-wider font-bold flex items-center gap-2 shadow-lg"
                >
                  <Github size={15} />
                  <span>GitHub Repository ↗</span>
                </a>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
