'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Move } from 'lucide-react';

const SKILLS_DATA = [
  { name: 'Agentic AI', category: 'Intelligence', level: 'Production Ready', color: 'border-blue-400/40 text-blue-300' },
  { name: 'Python & PyTorch', category: 'Core ML', level: 'Advanced', color: 'border-indigo-400/40 text-indigo-300' },
  { name: 'LangChain & RAG', category: 'Retrieval', level: 'Advanced', color: 'border-teal-400/40 text-teal-300' },
  { name: 'Apache Spark', category: 'Data Infra', level: 'Streaming', color: 'border-amber-400/40 text-amber-300' },
  { name: 'Kafka & Streams', category: 'Data Infra', level: 'Realtime', color: 'border-rose-400/40 text-rose-300' },
  { name: 'FastAPI & REST', category: 'Backend', level: 'High QPS', color: 'border-cyan-400/40 text-cyan-300' },
  { name: 'Gemini API & LLMs', category: 'Reasoning', level: 'Agent Loops', color: 'border-blue-400/40 text-blue-300' },
  { name: 'PostgreSQL & Redis', category: 'Databases', level: 'Zero-Race-Lock', color: 'border-indigo-400/40 text-indigo-300' },
  { name: 'Next.js & React', category: 'Frontend', level: 'Modern App Router', color: 'border-teal-400/40 text-teal-300' },
  { name: 'Framer Motion 3D', category: 'Animation', level: 'Spatial Physics', color: 'border-rose-400/40 text-rose-300' },
  { name: 'Competitive Coding', category: 'Algorithms', level: '500+ Solved', color: 'border-amber-400/40 text-amber-300' },
  { name: 'Docker & Systems', category: 'DevOps', level: 'Microservices', color: 'border-cyan-400/40 text-cyan-300' },
];

export default function Skills3DSphere() {
  const containerRef = useRef(null);
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const isDraggingRef = useRef(false);
  const isVisibleRef = useRef(false);
  const rotationRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let rafId;

    // IntersectionObserver: Only animate rotation when scrolled into view!
    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisibleRef.current = entry.isIntersecting;
      },
      { threshold: 0.1 }
    );
    observer.observe(container);

    let lastTime = performance.now();

    const loop = (now) => {
      const delta = now - lastTime;
      lastTime = now;

      if (isVisibleRef.current && !isDraggingRef.current) {
        rotationRef.current.x += 0.008 * delta;
        rotationRef.current.y += 0.015 * delta;

        // Throttle React state update to smooth 30fps while keeping physics smooth
        setRotation({
          x: rotationRef.current.x,
          y: rotationRef.current.y,
        });
      }

      rafId = requestAnimationFrame(loop);
    };

    rafId = requestAnimationFrame(loop);

    return () => {
      observer.disconnect();
      cancelAnimationFrame(rafId);
    };
  }, []);

  const radius = 185;
  const count = SKILLS_DATA.length;

  return (
    <div ref={containerRef} className="relative w-full py-8 flex flex-col items-center select-none will-change-transform">
      {/* 3D Sphere Interactive Canvas Box */}
      <div className="glossy-glass-card relative w-full max-w-4xl h-[470px] flex items-center justify-center overflow-hidden rounded-[32px] p-6">
        {/* Floating Instruction Badge */}
        <div className="absolute top-5 left-5 z-20 flex items-center gap-2 font-mono text-[11px] text-slate-300 glossy-chip px-3.5 py-1.5 rounded-full">
          <Move size={12} className="text-blue-400" />
          <span>DRAG TO ROTATE 3D CELESTIAL CLOUD</span>
        </div>

        {/* 3D Transform Space */}
        <div className="relative w-full h-full flex items-center justify-center preserve-3d">
          {SKILLS_DATA.map((skill, index) => {
            const phi = Math.acos(-1 + (2 * index) / count);
            const theta = Math.sqrt(count * Math.PI) * phi;

            const radX = (rotation.x * Math.PI) / 180;
            const radY = (rotation.y * Math.PI) / 180;

            let x0 = radius * Math.cos(theta) * Math.sin(phi);
            let y0 = radius * Math.sin(theta) * Math.sin(phi);
            let z0 = radius * Math.cos(phi);

            let x1 = x0 * Math.cos(radY) + z0 * Math.sin(radY);
            let z1 = -x0 * Math.sin(radY) + z0 * Math.cos(radY);
            let y2 = y0 * Math.cos(radX) - z1 * Math.sin(radX);
            let z2 = y0 * Math.sin(radX) + z1 * Math.cos(radX);

            const scale = (z2 + radius * 1.5) / (radius * 2.5);
            const opacity = Math.max(0.35, (z2 + radius) / (radius * 2));
            const zIndex = Math.round(z2 + radius);

            return (
              <motion.div
                key={index}
                drag
                dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
                dragElastic={0.2}
                onDragStart={() => {
                  isDraggingRef.current = true;
                }}
                onDragEnd={() => {
                  isDraggingRef.current = false;
                }}
                onDrag={(e, info) => {
                  rotationRef.current.x -= info.delta.y * 0.35;
                  rotationRef.current.y += info.delta.x * 0.35;
                  setRotation({ ...rotationRef.current });
                }}
                whileHover={{ scale: scale * 1.25, zIndex: 999 }}
                style={{
                  position: 'absolute',
                  transform: `translate3d(${x1}px, ${y2}px, ${z2}px) scale(${scale})`,
                  opacity,
                  zIndex,
                }}
                className={`cursor-grab active:cursor-grabbing px-4 py-2.5 rounded-2xl border ${skill.color} bg-slate-950/85 backdrop-blur-md text-center shadow-[inset_0_1px_1px_rgba(255,255,255,0.2),0_8px_20px_rgba(0,0,0,0.5)] transition-shadow hover:shadow-[0_0_25px_rgba(59,130,246,0.3)]`}
              >
                <span className="block font-mono text-[9px] font-bold uppercase tracking-widest text-slate-400">
                  {skill.category}
                </span>
                <span className="block font-serif text-lg text-white font-semibold my-0.5">
                  {skill.name}
                </span>
                <span className="block font-mono text-[10px] font-bold text-blue-400">
                  {skill.level}
                </span>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
