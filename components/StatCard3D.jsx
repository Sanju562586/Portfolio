'use client';

import React, { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

export default function StatCard3D({ index, number, title, description, delay = 0 }) {
  const cardRef = useRef(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springConfig = { damping: 20, stiffness: 200 };
  const springX = useSpring(x, springConfig);
  const springY = useSpring(y, springConfig);

  const rotateX = useTransform(springY, [-0.5, 0.5], [8, -8]);
  const rotateY = useTransform(springX, [-0.5, 0.5], [-8, 8]);

  const handlePointerMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const handlePointerLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.article
      ref={cardRef}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] }}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: 'preserve-3d',
        perspective: 1000,
      }}
      className="glossy-glass-card relative min-h-[210px] sm:min-h-[250px] p-5 sm:p-8 rounded-[24px] sm:rounded-3xl border overflow-hidden transition-all duration-300 group cursor-pointer"
    >
      {/* Top Index Tag */}
      <span
        style={{ transform: 'translateZ(20px)' }}
        className="text-blue-400 font-mono text-[10px] sm:text-[11px] font-bold tracking-widest block uppercase"
      >
        {index}
      </span>

      {/* Primary Number */}
      <strong
        style={{ transform: 'translateZ(45px)' }}
        className="block mt-4 sm:mt-6 font-serif text-4xl sm:text-5xl lg:text-6xl text-white tracking-tight leading-none group-hover:text-blue-300 transition-colors duration-300 font-semibold"
      >
        {number}
      </strong>

      {/* Description */}
      <p
        style={{ transform: 'translateZ(25px)' }}
        className="mt-3 sm:mt-4 text-xs font-sans text-slate-300 leading-relaxed font-normal max-w-full sm:max-w-[240px]"
      >
        {description}
      </p>

      {/* Decorative Specular Glow Accent */}
      <div className="absolute -right-10 -bottom-14 w-36 aspect-square rounded-full bg-blue-500/10 blur-2xl pointer-events-none transition-transform duration-500 group-hover:scale-150" />
    </motion.article>
  );
}
