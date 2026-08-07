import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

const SKILLS_DATA = [
  { name: 'Agentic AI', category: 'Intelligence', level: '95%', color: 'text-violet-600 border-violet-200 bg-violet-50/90' },
  { name: 'Python & PyTorch', category: 'Core ML', level: '98%', color: 'text-indigo-600 border-indigo-200 bg-indigo-50/90' },
  { name: 'LangChain & RAG', category: 'Retrieval', level: '92%', color: 'text-teal-600 border-teal-200 bg-teal-50/90' },
  { name: 'Apache Spark', category: 'Data Infra', level: '88%', color: 'text-amber-600 border-amber-200 bg-amber-50/90' },
  { name: 'Kafka & Streams', category: 'Data Infra', level: '85%', color: 'text-rose-600 border-rose-200 bg-rose-50/90' },
  { name: 'FastAPI & REST', category: 'Backend', level: '94%', color: 'text-cyan-600 border-cyan-200 bg-cyan-50/90' },
  { name: 'Gemini API', category: 'LLMs', level: '96%', color: 'text-violet-600 border-violet-200 bg-violet-50/90' },
  { name: 'PostgreSQL & Redis', category: 'Databases', level: '90%', color: 'text-indigo-600 border-indigo-200 bg-indigo-50/90' },
  { name: 'React & Motion', category: 'Frontend', level: '91%', color: 'text-teal-600 border-teal-200 bg-teal-50/90' },
  { name: 'System Architecture', category: 'Systems', level: '93%', color: 'text-rose-600 border-rose-200 bg-rose-50/90' },
  { name: 'Competitive Coding', category: 'Algorithms', level: '500+ Solved', color: 'text-amber-600 border-amber-200 bg-amber-50/90' },
  { name: 'Docker & Microservices', category: 'DevOps', level: '87%', color: 'text-cyan-600 border-cyan-200 bg-cyan-50/90' },
];

export default function Skills3DSphere() {
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);

  useEffect(() => {
    if (isDragging) return;
    const interval = setInterval(() => {
      setRotation((prev) => ({
        x: prev.x + 0.3,
        y: prev.y + 0.5,
      }));
    }, 30);
    return () => clearInterval(interval);
  }, [isDragging]);

  const radius = 180;
  const count = SKILLS_DATA.length;

  return (
    <div className="relative w-full py-12 flex flex-col items-center">
      {/* 3D Skill Tag Cloud Container */}
      <div className="relative w-full max-w-4xl h-[450px] flex items-center justify-center overflow-hidden rounded-3xl border border-slate-200 bg-gradient-to-b from-white via-amber-50/20 to-violet-50/30 shadow-xl">
        {/* Ambient 3D Backdrop Glow */}
        <div className="absolute inset-0 bg-radial-gradient from-violet-500/10 via-transparent to-transparent pointer-events-none" />

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
                onDragStart={() => setIsDragging(true)}
                onDragEnd={() => setIsDragging(false)}
                onDrag={(e, info) => {
                  setRotation((prev) => ({
                    x: prev.x - info.delta.y * 0.4,
                    y: prev.y + info.delta.x * 0.4,
                  }));
                }}
                whileHover={{ scale: scale * 1.3, zIndex: 999 }}
                style={{
                  position: 'absolute',
                  transform: `translate3d(${x1}px, ${y2}px, ${z2}px) scale(${scale})`,
                  opacity,
                  zIndex,
                }}
                className={`cursor-grab active:cursor-grabbing px-4 py-2 rounded-2xl border ${skill.color} backdrop-blur-md text-center shadow-md transition-all hover:shadow-xl hover:scale-110`}
              >
                <span className="block font-mono text-[9px] font-bold uppercase tracking-widest">
                  {skill.category}
                </span>
                <span className="block font-serif text-lg text-slate-900 font-normal my-0.5">
                  {skill.name}
                </span>
                <span className="block font-mono text-[10px] text-slate-600 font-semibold">
                  {skill.level}
                </span>
              </motion.div>
            );
          })}
        </div>

        {/* Floating Instruction Cue */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 font-mono text-[10px] text-slate-600 font-semibold tracking-widest uppercase bg-white/90 px-4 py-1.5 rounded-full border border-slate-200 backdrop-blur-md shadow-sm">
          <span className="w-1.5 h-1.5 rounded-full bg-violet-600 animate-pulse" /> Drag to rotate 3D skill matrix
        </div>
      </div>
    </div>
  );
}
