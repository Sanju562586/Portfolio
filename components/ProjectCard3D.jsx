'use client';

import React, { useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import {
  Github,
  ExternalLink,
  Sparkles,
  Play,
  Terminal,
} from 'lucide-react';

export default function ProjectCard3D({
  project,
  onOpenDetails,
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

  const handlePointerEnter = (e) => {
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
      className="glossy-glass-card relative overflow-hidden rounded-[28px] p-7 sm:p-8 min-h-[480px] flex flex-col justify-between group cursor-pointer transition-all duration-300 will-change-transform"
    >
      {/* Dynamic Specular Light Glare Overlay */}
      <motion.div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none z-10 transition-opacity duration-300 rounded-[28px]"
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
        className="relative z-20 flex items-center justify-between gap-4"
      >
        {/* Category Tag Chip */}
        <div className="flex items-center gap-2">
          <span className="glossy-chip px-3 py-1 rounded-full text-[11px] font-mono tracking-wider uppercase font-semibold flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-400 shadow-[0_0_8px_#3b82f6]" />
            {project.tag}
          </span>
          <span className="text-[11px] font-mono text-slate-400 font-medium">
            #{project.id}
          </span>
        </div>

        {/* Glossy Electric Blue Button */}
        <button
          onClick={() => onOpenDetails && onOpenDetails(project)}
          className="glossy-pill-blue px-4 py-1.5 rounded-full text-xs flex items-center gap-1.5 cursor-pointer"
        >
          <span>Architecture</span>
          <ExternalLink size={12} />
        </button>
      </motion.div>

      {/* Main Quote / Statement Title (Z-Depth: 35px) */}
      <motion.div
        style={{ transform: 'translateZ(35px)' }}
        className="relative z-20 my-5"
      >
        <h3 className="text-xl sm:text-2xl font-sans font-semibold text-white tracking-tight leading-snug group-hover:text-blue-200 transition-colors">
          “{project.description}”
        </h3>

        {project.subtitle && (
          <p className="font-mono text-xs text-blue-400/90 mt-3 font-medium flex items-center gap-1.5">
            <Terminal size={13} className="text-blue-400" />
            <span>{project.subtitle}</span>
          </p>
        )}
      </motion.div>

      {/* Feature Action Chips Row */}
      <motion.div
        style={{ transform: 'translateZ(28px)' }}
        className="relative z-20 flex flex-wrap items-center gap-2 mb-5 text-[11px] font-sans text-slate-300"
      >
        <span className="glossy-chip px-3 py-1 rounded-full flex items-center gap-1">
          <Sparkles size={11} className="text-blue-400" />
          <span>Autonomous Loop</span>
        </span>

        {project.metrics && project.metrics.slice(0, 2).map((m, i) => (
          <span key={i} className="glossy-chip px-3 py-1 rounded-full flex items-center gap-1">
            <span className="text-slate-400">·</span>
            <span>{m}</span>
          </span>
        ))}

        <span className="glossy-chip px-3 py-1 rounded-full flex items-center gap-1">
          <span className="text-slate-400">·</span>
          <span>Zero Hallucination</span>
        </span>
      </motion.div>

      {/* Bottom Glossy Inner Bar */}
      <motion.div
        style={{ transform: 'translateZ(30px)' }}
        className="glossy-inner-bar relative z-20 rounded-2xl p-2.5 sm:p-3 flex items-center justify-between gap-3"
      >
        {/* Left Tech Stack */}
        <div className="flex flex-wrap items-center gap-1.5 overflow-hidden">
          <div className="flex items-center gap-1 text-[11px] font-mono text-slate-400 mr-2 shrink-0">
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
              className="px-2.5 py-0.5 rounded-lg bg-white/5 border border-white/10 text-[10px] font-mono text-slate-200"
            >
              {tech}
            </span>
          ))}

          {project.stack.length > 3 && (
            <span className="text-[10px] font-mono text-slate-400">
              +{project.stack.length - 3}
            </span>
          )}
        </div>

        {/* Right Circular Blue Action Button */}
        <div className="flex items-center gap-2 shrink-0">
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`View ${project.title} on GitHub`}
              className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 border border-white/15 flex items-center justify-center text-slate-200 hover:text-white transition-all"
            >
              <Github size={14} />
            </a>
          )}

          <button
            onClick={() => onOpenDetails && onOpenDetails(project)}
            aria-label={`Explore ${project.title}`}
            className="glossy-circle-btn w-8 h-8 rounded-full flex items-center justify-center text-white cursor-pointer shadow-md"
          >
            <Play size={12} className="ml-0.5 fill-white" />
          </button>
        </div>
      </motion.div>
    </motion.article>
  );
}
