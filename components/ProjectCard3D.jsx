'use client';

import React, { useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import {
  Github,
  ExternalLink,
  Sparkles,
  Play,
  Terminal,
  Radio,
} from 'lucide-react';

export default function ProjectCard3D({
  project,
  onOpenDetails,
  onNoDeployment,
  delay = 0,
}) {
  const cardRef = useRef(null);
  const rectRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);

  // Mouse position inside card (normalized from -0.5 to 0.5)
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springConfig = { damping: 22, stiffness: 220, mass: 0.5 };
  const springX = useSpring(x, springConfig);
  const springY = useSpring(y, springConfig);

  const rotateX = useTransform(springY, [-0.5, 0.5], [8, -8]);
  const rotateY = useTransform(springX, [-0.5, 0.5], [-8, 8]);

  // Dynamic light beam glare position
  const glareX = useTransform(springX, [-0.5, 0.5], [0, 100]);
  const glareY = useTransform(springY, [-0.5, 0.5], [0, 100]);

  const handlePointerEnter = () => {
    if (cardRef.current) {
      rectRef.current = cardRef.current.getBoundingClientRect();
    }
    setIsHovered(true);
  };

  const handlePointerMove = (e) => {
    if (!rectRef.current) {
      if (cardRef.current) rectRef.current = cardRef.current.getBoundingClientRect();
      else return;
    }
    const rect = rectRef.current;
    const normalizedX = (e.clientX - rect.left) / rect.width - 0.5;
    const normalizedY = (e.clientY - rect.top) / rect.height - 0.5;
    x.set(normalizedX);
    y.set(normalizedY);
  };

  const handlePointerLeave = () => {
    rectRef.current = null;
    setIsHovered(false);
    x.set(0);
    y.set(0);
  };

  const handleLiveDemoClick = (e) => {
    e.stopPropagation();
    if (project.liveUrl) {
      window.open(project.liveUrl, '_blank', 'noopener,noreferrer');
    } else {
      if (onNoDeployment) {
        onNoDeployment(project);
      }
    }
  };

  return (
    <motion.article
      ref={cardRef}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-30px' }}
      transition={{ duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] }}
      onPointerMove={handlePointerMove}
      onPointerEnter={handlePointerEnter}
      onPointerLeave={handlePointerLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: 'preserve-3d',
        perspective: 1200,
      }}
      className="glossy-glass-card relative overflow-hidden rounded-[24px] sm:rounded-[28px] p-5 sm:p-7 lg:p-8 min-h-[440px] sm:min-h-[490px] flex flex-col justify-between group cursor-pointer transition-all duration-300 will-change-transform"
    >
      {/* Dynamic Specular Light Glare Overlay */}
      <motion.div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none z-10 transition-opacity duration-300 rounded-[24px] sm:rounded-[28px]"
        style={{
          opacity: isHovered ? 0.35 : 0,
          background: useTransform(
            [glareX, glareY],
            ([gx, gy]) =>
              `radial-gradient(circle at ${gx}% ${gy}%, rgba(255,255,255,0.7) 0%, rgba(255,255,255,0.08) 45%, transparent 70%)`
          ),
        }}
      />

      {/* Top Header Row (Z-Depth: 25px) */}
      <motion.div
        style={{ transform: 'translateZ(25px)' }}
        className="relative z-20 flex flex-wrap items-center justify-between gap-2.5"
      >
        {/* Category Tag Chip */}
        <div className="flex items-center gap-2">
          <span className="glossy-chip px-2.5 sm:px-3 py-1 rounded-full text-[10px] sm:text-[11px] font-mono tracking-wider uppercase font-semibold flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-400 shadow-[0_0_8px_#3b82f6]" />
            {project.tag}
          </span>
          <span className="text-[10px] sm:text-[11px] font-mono text-slate-400 font-medium">
            #{project.id}
          </span>
        </div>

        {/* Live Demo or Details Button */}
        <div className="flex items-center gap-2">
          {/* Live Demo Button with Deployment Detection */}
          <button
            onClick={handleLiveDemoClick}
            title={project.liveUrl ? 'Open Live Deployment' : 'No live deployment available (Click for info)'}
            className={`px-2.5 sm:px-3.5 py-1 sm:py-1.5 rounded-full text-[11px] sm:text-xs font-mono font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
              project.liveUrl
                ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 hover:bg-emerald-500/30 shadow-[0_0_12px_rgba(16,185,129,0.3)]'
                : 'glossy-chip text-slate-400 hover:text-amber-300 hover:border-amber-400/40'
            }`}
          >
            <Radio size={11} className={project.liveUrl ? 'text-emerald-400 animate-pulse' : 'text-slate-500'} />
            <span>{project.liveUrl ? 'Live Demo ↗' : 'Deployment Status'}</span>
          </button>

          {/* Architecture Details Trigger */}
          <button
            onClick={() => onOpenDetails && onOpenDetails(project)}
            className="glossy-pill-blue px-3 sm:px-3.5 py-1 sm:py-1.5 rounded-full text-[11px] sm:text-xs flex items-center gap-1 cursor-pointer"
          >
            <span>Details</span>
            <ExternalLink size={11} />
          </button>
        </div>
      </motion.div>

      {/* Main Original Project Title (Z-Depth: 35px) */}
      <motion.div
        style={{ transform: 'translateZ(35px)' }}
        className="relative z-20 my-3 sm:my-4"
      >
        <h3 className="text-xl sm:text-2xl lg:text-[26px] font-serif font-bold text-white tracking-tight leading-snug group-hover:text-blue-300 transition-colors">
          {project.title}
        </h3>

        {project.subtitle && (
          <p className="font-mono text-xs text-blue-400/90 mt-1.5 sm:mt-2 font-medium flex items-center gap-1.5">
            <Terminal size={12} className="text-blue-400 shrink-0" />
            <span className="truncate">{project.subtitle}</span>
          </p>
        )}

        <p className="mt-2.5 sm:mt-3 text-slate-300 text-xs sm:text-sm font-sans leading-relaxed line-clamp-3">
          {project.description}
        </p>
      </motion.div>

      {/* Feature Action Chips Row */}
      <motion.div
        style={{ transform: 'translateZ(28px)' }}
        className="relative z-20 flex flex-wrap items-center gap-1.5 sm:gap-2 mb-3 sm:mb-4 text-[10px] sm:text-[11px] font-sans text-slate-300"
      >
        <span className="glossy-chip px-2.5 sm:px-3 py-1 rounded-full flex items-center gap-1">
          <Sparkles size={11} className="text-blue-400" />
          <span>Verified System</span>
        </span>

        {project.metrics && project.metrics.slice(0, 2).map((m, i) => (
          <span key={i} className="glossy-chip px-2.5 sm:px-3 py-1 rounded-full flex items-center gap-1">
            <span className="text-slate-400">·</span>
            <span>{m}</span>
          </span>
        ))}
      </motion.div>

      {/* Bottom Glossy Inner Bar */}
      <motion.div
        style={{ transform: 'translateZ(30px)' }}
        className="glossy-inner-bar relative z-20 rounded-2xl p-2.5 sm:p-3 flex items-center justify-between gap-2.5"
      >
        {/* Left Tech Stack */}
        <div className="flex flex-wrap items-center gap-1 sm:gap-1.5 overflow-hidden">
          <div className="hidden xs:flex items-center gap-1 text-[11px] font-mono text-slate-400 mr-1 sm:mr-2 shrink-0">
            <kbd className="px-1.5 py-0.5 rounded bg-white/10 border border-white/15 text-[10px] text-slate-200 font-sans">
              ⌘
            </kbd>
            <kbd className="px-1.5 py-0.5 rounded bg-white/10 border border-white/15 text-[10px] text-slate-200 font-sans">
              ↵
            </kbd>
            <span className="hidden sm:inline text-slate-400 ml-1">Stack:</span>
          </div>

          {project.stack.slice(0, 3).map((tech) => (
            <span
              key={tech}
              className="px-2 sm:px-2.5 py-0.5 rounded-lg bg-white/5 border border-white/10 text-[9px] sm:text-[10px] font-mono text-slate-200 truncate max-w-[110px]"
            >
              {tech}
            </span>
          ))}

          {project.stack.length > 3 && (
            <span className="text-[9px] sm:text-[10px] font-mono text-slate-400">
              +{project.stack.length - 3}
            </span>
          )}
        </div>

        {/* Right Action Icons: GitHub and Live/Play */}
        <div className="flex items-center gap-2 shrink-0">
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              aria-label={`View ${project.title} on GitHub`}
              className="w-7 sm:w-8 h-7 sm:h-8 rounded-full bg-white/10 hover:bg-white/20 border border-white/15 flex items-center justify-center text-slate-200 hover:text-white transition-all shadow-sm"
            >
              <Github size={13} />
            </a>
          )}

          <button
            onClick={handleLiveDemoClick}
            aria-label={project.liveUrl ? 'Launch Live App' : 'Check Deployment Status'}
            className="glossy-circle-btn w-7 sm:w-8 h-7 sm:h-8 rounded-full flex items-center justify-center text-white cursor-pointer shadow-md"
          >
            <Play size={11} className="ml-0.5 fill-white" />
          </button>
        </div>
      </motion.div>
    </motion.article>
  );
}
