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

  const rotateX = useTransform(smoothMouseY, [-200, 200], [15, -15]);
  const rotateY = useTransform(smoothMouseX, [-200, 200], [-15, 15]);

  const [fps, setFps] = useState('98.4');

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let width = (canvas.width = canvas.parentElement.clientWidth || 400);
    let height = (canvas.height = canvas.parentElement.clientHeight || 450);

    const handleResize = () => {
      if (!canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = canvas.parentElement.clientHeight;
    };

    window.addEventListener('resize', handleResize);

    // Create 3D sphere points
    const pointCount = 180;
    const radius = Math.min(width, height) * 0.32;
    const points = [];

    const colorPalette = ['#7c3aed', '#0d9488', '#e11d48', '#0284c7', '#4f46e5'];

    for (let i = 0; i < pointCount; i++) {
      const phi = Math.acos(-1 + (2 * i) / pointCount);
      const theta = Math.sqrt(pointCount * Math.PI) * phi;
      points.push({
        x: radius * Math.cos(theta) * Math.sin(phi),
        y: radius * Math.sin(theta) * Math.sin(phi),
        z: radius * Math.cos(phi),
        color: colorPalette[i % colorPalette.length],
      });
    }

    let angleX = 0.003;
    let angleY = 0.005;

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      const cx = width / 2;
      const cy = height / 2;

      const targetAngleX = (smoothMouseY.get() / height) * 0.03 + 0.002;
      const targetAngleY = (smoothMouseX.get() / width) * 0.03 + 0.003;

      angleX += (targetAngleX - angleX) * 0.05;
      angleY += (targetAngleY - angleY) * 0.05;

      const cosX = Math.cos(angleX);
      const sinX = Math.sin(angleX);
      const cosY = Math.cos(angleY);
      const sinY = Math.sin(angleY);

      const projected = [];

      for (let i = 0; i < points.length; i++) {
        const p = points[i];

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
        const scale = Math.max(0.5, perspective);

        projected.push({ x: px, y: py, z: z2, scale, color: p.color });
      }

      // Draw connection lines between nearby 3D points
      ctx.lineWidth = 0.7;
      for (let i = 0; i < projected.length; i++) {
        for (let j = i + 1; j < projected.length; j++) {
          const dx = projected[i].x - projected[j].x;
          const dy = projected[i].y - projected[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 48) {
            const alpha = (1 - dist / 48) * 0.35 * ((projected[i].z + radius) / (radius * 2));
            ctx.strokeStyle = `rgba(124, 58, 237, ${alpha})`;
            ctx.beginPath();
            ctx.moveTo(projected[i].x, projected[i].y);
            ctx.lineTo(projected[j].x, projected[j].y);
            ctx.stroke();
          }
        }
      }

      // Draw 3D nodes with bright colors
      for (let i = 0; i < projected.length; i++) {
        const p = projected[i];
        const alpha = Math.max(0.25, (p.z + radius) / (radius * 2));
        const r = 2.5 * p.scale;

        ctx.fillStyle = p.color;
        ctx.globalAlpha = alpha;
        ctx.beginPath();
        ctx.arc(p.x, p.y, r, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.globalAlpha = 1.0;
      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [smoothMouseX, smoothMouseY]);

  const handlePointerMove = (e) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left - rect.width / 2);
    mouseY.set(e.clientY - rect.top - rect.height / 2);
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
        perspective: 1000,
      }}
      className="hero-art relative justify-self-end w-full max-w-[490px] aspect-[0.84] rounded-[24px] rounded-bl-[120px] overflow-hidden shadow-2xl transition-shadow duration-500 hover:shadow-[0_0_50px_rgba(124,58,237,0.25)]"
    >
      {/* Background Grid Mesh */}
      <div className="art-grid absolute inset-0 opacity-60 pointer-events-none" />

      {/* 3D Canvas Mesh */}
      <canvas ref={canvasRef} className="absolute inset-0 z-10 w-full h-full" />

      {/* Pulsing Outer 3D Ring */}
      <motion.div
        animate={{
          rotate: [0, 360],
          scale: [1, 1.03, 1],
        }}
        transition={{
          rotate: { duration: 25, repeat: Infinity, ease: 'linear' },
          scale: { duration: 4, repeat: Infinity, ease: 'easeInOut' },
        }}
        style={{ transform: 'translateZ(30px)' }}
        className="orbit absolute left-[-25%] top-[35%] w-[150%] h-[28%] border border-violet-400/40 rounded-full pointer-events-none z-20"
      />

      {/* Floating 3D Node Callouts */}
      <motion.div
        animate={{ y: [-6, 6, -6] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        style={{ transform: 'translateZ(45px)' }}
        className="signal-node node-one absolute top-[28%] right-[16%] z-30 w-3 h-3 rounded-full bg-violet-600 shadow-[0_0_15px_#7c3aed]"
      />

      <motion.div
        animate={{ y: [6, -6, 6] }}
        transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
        style={{ transform: 'translateZ(40px)' }}
        className="signal-node node-two absolute top-[58%] left-[22%] z-30 w-3 h-3 rounded-full bg-rose-500 shadow-[0_0_15px_#e11d48]"
      />

      {/* Live Readout Telemetry (Z-Depth 60px) */}
      <motion.div
        style={{ transform: 'translateZ(60px)' }}
        className="art-readout absolute z-30 right-6 bottom-16 p-3.5 rounded-2xl border border-violet-200 bg-white/90 backdrop-blur-md font-mono text-left shadow-lg"
      >
        <span className="text-[9px] text-slate-500 font-bold tracking-widest uppercase">NEURAL FIELD</span>
        <b className="block my-1 text-2xl font-serif text-slate-900 tracking-tight">{fps}</b>
        <small className="text-[8px] text-violet-700 font-bold tracking-wider uppercase">STABILITY INDEX</small>
      </motion.div>

      {/* Corner Labels */}
      <small className="absolute bottom-6 left-6 text-[10px] font-mono text-slate-600 tracking-widest font-semibold z-30">
        01 — SIGNAL
      </small>
      <small className="absolute bottom-6 right-6 text-[10px] font-mono text-teal-700 font-semibold tracking-widest flex items-center gap-2 z-30">
        <span className="w-2 h-2 rounded-full bg-teal-500 animate-pulse" /> LIVE
      </small>
    </motion.div>
  );
}
