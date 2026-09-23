'use client';

import React, { useEffect, useState, useRef } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export default function Interactive3DCursor() {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isClicked, setIsClicked] = useState(false);

  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  const springConfig = { damping: 24, stiffness: 300, mass: 0.35 };
  const cursorX = useSpring(mouseX, springConfig);
  const cursorY = useSpring(mouseY, springConfig);

  const ringSpringConfig = { damping: 28, stiffness: 140, mass: 0.6 };
  const ringX = useSpring(mouseX, ringSpringConfig);
  const ringY = useSpring(mouseY, ringSpringConfig);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
      return;
    }

    let rafId = null;

    const handleMouseMove = (e) => {
      // Use RAF to prevent high-frequency mouse event bottlenecks
      if (!rafId) {
        rafId = requestAnimationFrame(() => {
          mouseX.set(e.clientX);
          mouseY.set(e.clientY);
          if (!isVisible) setIsVisible(true);
          rafId = null;
        });
      }
    };

    // Use mouseover/mouseout instead of traversing DOM on every mousemove!
    const handleMouseOver = (e) => {
      const target = e.target;
      const isInteractive = target?.closest(
        'a, button, input, textarea, .glossy-pill-blue, .glossy-chip, .glossy-circle-btn, [role="button"]'
      );
      setIsHovered(!!isInteractive);
    };

    const handleMouseDown = () => setIsClicked(true);
    const handleMouseUp = () => setIsClicked(false);
    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mouseover', handleMouseOver, { passive: true });
    window.addEventListener('mousedown', handleMouseDown, { passive: true });
    window.addEventListener('mouseup', handleMouseUp, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave, { passive: true });
    document.addEventListener('mouseenter', handleMouseEnter, { passive: true });

    return () => {
      if (rafId) cancelAnimationFrame(rafId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseover', handleMouseOver);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, [mouseX, mouseY, isVisible]);

  if (!isVisible) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-[9999] overflow-hidden will-change-transform">
      {/* Outer 3D Aura Ring with Glow */}
      <motion.div
        aria-hidden="true"
        style={{
          x: ringX,
          y: ringY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          scale: isClicked ? 0.75 : isHovered ? 1.6 : 1,
          borderColor: isHovered ? 'rgba(59, 130, 246, 0.85)' : 'rgba(255, 255, 255, 0.25)',
          backgroundColor: isHovered ? 'rgba(59, 130, 246, 0.1)' : 'rgba(255, 255, 255, 0.04)',
        }}
        transition={{ type: 'spring', damping: 20, stiffness: 320 }}
        className="w-10 h-10 rounded-full border border-solid backdrop-blur-[2px] shadow-[0_0_20px_rgba(59,130,246,0.3)] transition-colors duration-200"
      />

      {/* Center Precision Cursor Dot */}
      <motion.div
        aria-hidden="true"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          scale: isClicked ? 1.5 : isHovered ? 0.4 : 1,
          backgroundColor: isHovered ? '#60a5fa' : '#3b82f6',
        }}
        className="w-2 h-2 rounded-full shadow-[0_0_10px_#3b82f6]"
      />
    </div>
  );
}
