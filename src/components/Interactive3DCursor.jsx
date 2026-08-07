import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export default function Interactive3DCursor() {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isClicked, setIsClicked] = useState(false);

  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  const springConfig = { damping: 25, stiffness: 250, mass: 0.5 };
  const cursorX = useSpring(mouseX, springConfig);
  const cursorY = useSpring(mouseY, springConfig);

  const ringSpringConfig = { damping: 30, stiffness: 120, mass: 0.8 };
  const ringX = useSpring(mouseX, ringSpringConfig);
  const ringY = useSpring(mouseY, ringSpringConfig);

  useEffect(() => {
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
      return;
    }

    const handleMouseMove = (e) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseDown = () => setIsClicked(true);
    const handleMouseUp = () => setIsClicked(false);
    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    const handleHoverCheck = (e) => {
      const target = e.target;
      const isInteractive = target.closest('a, button, input, .magnetic, .work-card, .skill-row, [role="button"]');
      setIsHovered(!!isInteractive);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mousemove', handleHoverCheck);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousemove', handleHoverCheck);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, [mouseX, mouseY, isVisible]);

  if (!isVisible) return null;

  return (
    <>
      {/* Dynamic Cursor Outer 3D Glow Ring */}
      <motion.div
        aria-hidden="true"
        style={{
          x: ringX,
          y: ringY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          scale: isClicked ? 0.85 : isHovered ? 1.6 : 1,
          borderColor: isHovered ? 'rgba(124, 58, 237, 0.9)' : 'rgba(13, 148, 136, 0.5)',
          backgroundColor: isHovered ? 'rgba(124, 58, 237, 0.08)' : 'rgba(255, 255, 255, 0.2)',
        }}
        transition={{ type: 'spring', damping: 20, stiffness: 300 }}
        className="fixed top-0 left-0 w-10 h-10 rounded-full border border-solid pointer-events-none z-[9999] backdrop-blur-[1px] shadow-[0_0_20px_rgba(124,58,237,0.25)]"
      />

      {/* Center 3D Cursor Dot */}
      <motion.div
        aria-hidden="true"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          scale: isClicked ? 1.5 : isHovered ? 0.5 : 1,
          backgroundColor: isHovered ? '#7c3aed' : '#0d9488',
        }}
        className="fixed top-0 left-0 w-2.5 h-2.5 rounded-full pointer-events-none z-[9999] shadow-[0_0_10px_#7c3aed]"
      />
    </>
  );
}
