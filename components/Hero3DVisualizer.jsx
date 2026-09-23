'use client';

import React, { useRef, useState, useEffect } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

export default function Hero3DVisualizer() {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 150 };
  const smoothMouseX = useSpring(mouseX, springConfig);
  const smoothMouseY = useSpring(mouseY, springConfig);

  const rotateX = useTransform(smoothMouseY, [-200, 200], [8, -8]);
  const rotateY = useTransform(smoothMouseX, [-200, 200], [-8, 8]);

  const [activeNodes] = useState(140);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext('2d', { alpha: true });
    let animationFrameId;
    let isVisible = true;
    let width = (canvas.width = container.clientWidth || 450);
    let height = (canvas.height = container.clientHeight || 480);

    // Pause animation when scrolled out of view to guarantee 120fps smooth page scrolling!
    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
        if (isVisible && !animationFrameId) {
          animationFrameId = requestAnimationFrame(render);
        }
      },
      { threshold: 0.05 }
    );
    observer.observe(container);

    const handleResize = () => {
      if (!container) return;
      width = canvas.width = container.clientWidth;
      height = canvas.height = container.clientHeight;
    };

    window.addEventListener('resize', handleResize, { passive: true });

    // Generate 3D spherical Fibonacci lattice (140 high-performance points)
    const pointCount = 140;
    const radius = Math.min(width, height) * 0.36;
    const points = [];

    const colorPalette = [
      '#3b82f6', // electric blue
      '#60a5fa', // sky blue
      '#0d9488', // teal
      '#8b5cf6', // violet
      '#38bdf8', // cyan
    ];

    for (let i = 0; i < pointCount; i++) {
      const phi = Math.acos(-1 + (2 * i) / pointCount);
      const theta = Math.sqrt(pointCount * Math.PI) * phi;
      const color = colorPalette[i % colorPalette.length];
      points.push({
        x: radius * Math.cos(theta) * Math.sin(phi),
        y: radius * Math.sin(theta) * Math.sin(phi),
        z: radius * Math.cos(phi),
        color,
        pulseSpeed: 0.02 + (i % 5) * 0.005,
        pulsePhase: (i * 0.2) % (Math.PI * 2),
      });
    }

    let angleX = 0.002;
    let angleY = 0.003;

    const render = () => {
      if (!isVisible) {
        animationFrameId = null;
        return;
      }

      ctx.clearRect(0, 0, width, height);

      const cx = width / 2;
      const cy = height / 2;

      // Mouse influence
      const mx = smoothMouseX.get();
      const my = smoothMouseY.get();
      const targetAngleX = (my / height) * 0.02 + 0.002;
      const targetAngleY = (mx / width) * 0.02 + 0.003;

      angleX += (targetAngleX - angleX) * 0.05;
      angleY += (targetAngleY - angleY) * 0.05;

      const cosX = Math.cos(angleX);
      const sinX = Math.sin(angleX);
      const cosY = Math.cos(angleY);
      const sinY = Math.sin(angleY);

      const projected = [];

      for (let i = 0; i < pointCount; i++) {
        const p = points[i];
        p.pulsePhase += p.pulseSpeed;

        let y1 = p.y * cosX - p.z * sinX;
        let z1 = p.y * sinX + p.z * cosX;

        let x2 = p.x * cosY + z1 * sinY;
        let z2 = -p.x * sinY + z1 * cosY;

        p.x = x2;
        p.y = y1;
        p.z = z2;

        const perspective = 500 / (500 + z2);
        const px = x2 * perspective + cx;
        const py = y1 * perspective + cy;
        const scale = Math.max(0.4, perspective);

        projected.push({
          x: px,
          y: py,
          z: z2,
          scale,
          color: p.color,
          pulse: Math.sin(p.pulsePhase) * 0.5 + 0.5,
        });
      }

      // Draw connection lines between nearby points (optimized distance check)
      ctx.lineWidth = 0.6;
      ctx.strokeStyle = 'rgba(96, 165, 250, 0.15)';
      ctx.beginPath();
      for (let i = 0; i < pointCount; i++) {
        const pi = projected[i];
        // Connect to next 4 points
        for (let j = i + 1; j < Math.min(i + 5, pointCount); j++) {
          const pj = projected[j];
          const dx = pi.x - pj.x;
          const dy = pi.y - pj.y;
          if (dx * dx + dy * dy < 2000) {
            ctx.moveTo(pi.x, pi.y);
            ctx.lineTo(pj.x, pj.y);
          }
        }
      }
      ctx.stroke();

      // Draw nodes
      for (let i = 0; i < pointCount; i++) {
        const p = projected[i];
        const radius = (2.2 + p.pulse * 1.2) * p.scale;

        ctx.beginPath();
        ctx.arc(p.x, p.y, Math.max(1, radius), 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.fill();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener('resize', handleResize);
      observer.disconnect();
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
    };
  }, [smoothMouseX, smoothMouseY]);

  const handlePointerMove = (e) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    mouseX.set(e.clientX - (rect.left + rect.width / 2));
    mouseY.set(e.clientY - (rect.top + rect.height / 2));
  };

  const handlePointerLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <motion.div
      ref={containerRef}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: 'preserve-3d',
        perspective: 1200,
      }}
      className="glossy-glass-card relative w-full h-[440px] sm:h-[480px] flex items-center justify-center rounded-[32px] overflow-hidden group select-none transition-shadow duration-500 will-change-transform"
    >
      {/* Top Floating Telemetry Chips */}
      <div className="absolute top-5 left-5 right-5 z-20 flex items-center justify-between pointer-events-none">
        <span className="glossy-chip px-3.5 py-1 rounded-full text-[10px] font-mono tracking-widest uppercase font-bold text-blue-300 flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-blue-400 shadow-[0_0_8px_#3b82f6] animate-pulse" />
          NEURAL MATRIX · 3D TOPOLOGY
        </span>
        <span className="glossy-chip px-3 py-1 rounded-full text-[10px] font-mono text-slate-400">
          FIBONACCI LATTICE
        </span>
      </div>

      {/* Main 3D Canvas */}
      <canvas ref={canvasRef} className="w-full h-full relative z-10 cursor-grab active:cursor-grabbing" />

      {/* Bottom Floating Telemetry */}
      <div className="absolute bottom-5 left-5 right-5 z-20 flex items-center justify-between pointer-events-none font-mono text-[10px] text-slate-400">
        <span className="glossy-chip px-3 py-1 rounded-full">
          HARDWARE ACCELERATED
        </span>
        <span className="glossy-chip px-3 py-1 rounded-full text-teal-400 font-semibold">
          ACTIVE NODES: {activeNodes}
        </span>
      </div>
    </motion.div>
  );
}
