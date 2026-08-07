import React, { useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Github, ExternalLink, CheckCircle2 } from 'lucide-react';

export default function ProjectCard3D({
  number,
  tag,
  title,
  description,
  stack = [],
  githubUrl,
  highlights = [],
  className = '',
  cardStyle = 'card-1',
  delay = 0,
}) {
  const cardRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);

  // Mouse position inside card (normalized from -0.5 to 0.5)
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Smooth Framer Motion spring physics
  const springConfig = { damping: 20, stiffness: 200, mass: 0.5 };
  const springX = useSpring(x, springConfig);
  const springY = useSpring(y, springConfig);

  // 3D rotation mappings
  const rotateX = useTransform(springY, [-0.5, 0.5], [14, -14]);
  const rotateY = useTransform(springX, [-0.5, 0.5], [-14, 14]);

  // Dynamic light beam glare position
  const glareX = useTransform(springX, [-0.5, 0.5], [0, 100]);
  const glareY = useTransform(springY, [-0.5, 0.5], [0, 100]);

  const handlePointerMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const normalizedX = (e.clientX - rect.left) / rect.width - 0.5;
    const normalizedY = (e.clientY - rect.top) / rect.height - 0.5;
    x.set(normalizedX);
    y.set(normalizedY);
  };

  const handlePointerEnter = () => setIsHovered(true);

  const handlePointerLeave = () => {
    setIsHovered(false);
    x.set(0);
    y.set(0);
  };

  return (
    <motion.article
      ref={cardRef}
      initial={{ opacity: 0, y: 35 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }}
      onPointerMove={handlePointerMove}
      onPointerEnter={handlePointerEnter}
      onPointerLeave={handlePointerLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: 'preserve-3d',
        perspective: 1200,
      }}
      className={`work-card ${cardStyle} ${className} relative overflow-hidden rounded-3xl border p-8 min-h-[600px] flex flex-col justify-between group transition-shadow duration-500 cursor-pointer shadow-lg hover:shadow-2xl`}
    >
      {/* 3D Dynamic Light Glare Overlay */}
      <motion.div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none z-10 transition-opacity duration-300"
        style={{
          opacity: isHovered ? 0.45 : 0,
          background: useTransform(
            [glareX, glareY],
            ([gx, gy]) =>
              `radial-gradient(circle at ${gx}% ${gy}%, rgba(255,255,255,0.85) 0%, rgba(255,255,255,0.1) 45%, transparent 70%)`
          ),
        }}
      />

      {/* Decorative Background Art */}
      <div className="card-art absolute inset-0 z-0 opacity-90 transition-transform duration-700 ease-out group-hover:scale-105" />

      {/* Card Header Tag & Number (Z-Depth: 25px) */}
      <motion.div
        style={{ transform: 'translateZ(25px)' }}
        className="relative z-20 flex items-center justify-between gap-4"
      >
        <span className="tag px-3.5 py-1.5 text-[10px] font-mono tracking-wider border border-slate-900/20 rounded-lg bg-white/80 backdrop-blur-md text-slate-800 font-bold uppercase shadow-sm">
          {tag}
        </span>
        <span className="work-number text-[11px] font-mono text-slate-700 font-bold tracking-widest">
          {number}
        </span>
      </motion.div>

      {/* Card Main Body Content (Z-Depth: 55px) */}
      <motion.div
        style={{ transform: 'translateZ(55px)' }}
        className="work-body relative z-20 mt-auto pt-8"
      >
        <div className="flex items-start justify-between gap-4 mb-3">
          <h2 className="text-3xl sm:text-4xl font-serif leading-tight tracking-tight text-slate-900 font-normal group-hover:text-violet-700 transition-colors duration-300">
            {title}
          </h2>

          {githubUrl && (
            <a
              href={githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="p-2 rounded-xl bg-white/90 border border-slate-300 text-slate-800 hover:text-violet-700 hover:border-violet-400 hover:scale-110 shadow-sm transition-all flex items-center gap-1 shrink-0 font-mono text-[10px] font-bold"
              title="View on GitHub"
            >
              <Github size={14} />
              <span className="hidden sm:inline">Repo</span> ↗
            </a>
          )}
        </div>

        <p className="text-sm text-slate-700 font-sans leading-relaxed max-w-md mb-5 font-medium">
          {description}
        </p>

        {/* Feature Highlights list */}
        {highlights.length > 0 && (
          <ul className="space-y-1.5 mb-6 text-xs text-slate-800 font-sans font-medium">
            {highlights.map((item, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <span className="text-violet-600 mt-0.5 shrink-0">✦</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        )}

        {/* Tech Stack Pills (Z-Depth: 35px) */}
        <motion.div
          style={{ transform: 'translateZ(35px)' }}
          className="stack flex flex-wrap gap-2 mt-4"
        >
          {stack.map((item, idx) => (
            <span
              key={idx}
              className="px-3 py-1 text-[10px] font-mono rounded-md bg-white/90 text-slate-800 font-semibold border border-slate-900/10 shadow-sm hover:border-violet-500 transition-colors"
            >
              {item}
            </span>
          ))}
        </motion.div>
      </motion.div>
    </motion.article>
  );
}
