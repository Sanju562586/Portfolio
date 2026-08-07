import React, { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

export default function StatCard3D({ index, number, title, description, delay = 0 }) {
  const cardRef = useRef(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springConfig = { damping: 15, stiffness: 180 };
  const springX = useSpring(x, springConfig);
  const springY = useSpring(y, springConfig);

  const rotateX = useTransform(springY, [-0.5, 0.5], [10, -10]);
  const rotateY = useTransform(springX, [-0.5, 0.5], [-10, 10]);

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
      className="stat relative min-h-[270px] p-8 bg-white border-r border-b border-slate-200 overflow-hidden transition-all duration-300 hover:bg-slate-50 group cursor-pointer"
    >
      <span style={{ transform: 'translateZ(20px)' }} className="text-violet-600 font-mono text-[10px] font-bold tracking-widest block uppercase">
        {index}
      </span>
      <strong
        style={{ transform: 'translateZ(45px)' }}
        className="block mt-10 font-serif text-5xl sm:text-6xl text-slate-900 tracking-tighter leading-none group-hover:text-violet-600 transition-colors duration-300 font-normal"
      >
        {number}
      </strong>
      <p style={{ transform: 'translateZ(25px)' }} className="max-w-[200px] mt-4 text-xs font-sans text-slate-600 leading-relaxed font-medium">
        {description}
      </p>

      {/* Decorative 3D Ring Element */}
      <div className="absolute -right-12 -bottom-16 w-40 aspect-square rounded-full border border-violet-200/60 pointer-events-none transition-transform duration-500 group-hover:scale-125 group-hover:-translate-x-3 group-hover:-translate-y-3" />
    </motion.article>
  );
}
