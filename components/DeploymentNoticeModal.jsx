'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertCircle, Github, X, ExternalLink, Terminal } from 'lucide-react';

export default function DeploymentNoticeModal({ isOpen, project, onClose }) {
  if (!isOpen || !project) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[120] flex items-center justify-center p-3 xs:p-4 sm:p-6">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/80 backdrop-blur-xl"
        />

        {/* Glossy Alert Box */}
        <motion.div
          initial={{ opacity: 0, scale: 0.92, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.92, y: 15 }}
          transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
          className="glossy-glass-card relative z-10 w-full max-w-lg rounded-[24px] sm:rounded-[28px] p-5 sm:p-8 text-white shadow-2xl border border-white/20"
        >
          {/* Close Icon */}
          <button
            onClick={onClose}
            aria-label="Close notification"
            className="absolute top-4 right-4 sm:top-5 sm:right-5 p-2 rounded-full bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white transition-colors cursor-pointer"
          >
            <X size={16} />
          </button>

          {/* Icon Badge */}
          <div className="flex items-center gap-3 mb-3 sm:mb-4 pr-8">
            <div className="w-9 sm:w-10 h-9 sm:h-10 rounded-2xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400 shrink-0">
              <AlertCircle size={18} />
            </div>
            <div>
              <span className="font-mono text-[9px] sm:text-[10px] uppercase font-bold tracking-widest text-amber-400 block">
                STATUS NOTIFICATION
              </span>
              <h3 className="font-serif text-lg sm:text-2xl font-bold text-white leading-snug">
                No Live Deployment Available
              </h3>
            </div>
          </div>

          {/* Body Copy */}
          <div className="space-y-2.5 sm:space-y-3 text-slate-300 text-xs sm:text-sm font-sans leading-relaxed my-3 sm:my-4">
            <p>
              A public live hosted deployment is currently not available for{' '}
              <strong className="text-white font-semibold">{project.title}</strong>.
            </p>
            <p className="text-slate-400 text-xs font-mono bg-white/5 p-3 rounded-xl border border-white/10 flex items-start gap-2">
              <Terminal size={14} className="text-blue-400 shrink-0 mt-0.5" />
              <span>
                This system runs on dedicated local hardware, local Google OAuth stdio subprocesses, or distributed streaming clusters (Kafka/Spark).
              </span>
            </p>
            <p>
              You can explore the complete codebase, system architecture, benchmarks, and local run/Docker commands directly in the official GitHub repository!
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col-reverse xs:flex-row items-stretch xs:items-center justify-end gap-2.5 sm:gap-3 mt-5 sm:mt-6 pt-4 sm:pt-5 border-t border-white/10">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-full border border-white/15 text-xs font-mono text-slate-300 hover:text-white hover:bg-white/10 transition-colors cursor-pointer text-center"
            >
              Dismiss
            </button>

            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={onClose}
                className="glossy-pill-blue px-5 py-2.5 rounded-full text-xs font-mono font-bold flex items-center justify-center gap-1.5 shadow-lg text-center"
              >
                <Github size={14} />
                <span>Open GitHub Repository ↗</span>
              </a>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
