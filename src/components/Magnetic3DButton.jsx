import React, { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

export default function Magnetic3DButton({
  children,
  className = '',
  onClick,
  href,
  target,
  rel,
  strength = 0.35,
}) {
  const ref = useRef(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Smooth 3D physics spring configuration
  const springConfig = { damping: 15, stiffness: 180, mass: 0.1 };
  const springX = useSpring(x, springConfig);
  const springY = useSpring(y, springConfig);

  // 3D rotation transforms based on magnetic offset
  const rotateX = useTransform(springY, [-30, 30], [12, -12]);
  const rotateY = useTransform(springX, [-30, 30], [-12, 12]);

  const handlePointerMove = (e) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const distanceX = (e.clientX - centerX) * strength;
    const distanceY = (e.clientY - centerY) * strength;

    x.set(distanceX);
    y.set(distanceY);
  };

  const handlePointerLeave = () => {
    x.set(0);
    y.set(0);
  };

  const Component = href ? motion.a : motion.button;
  const props = href ? { href, target, rel } : { onClick };

  return (
    <Component
      ref={ref}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      style={{
        x: springX,
        y: springY,
        rotateX,
        rotateY,
        transformStyle: 'preserve-3d',
      }}
      whileHover={{ scale: 1.06, z: 20 }}
      whileTap={{ scale: 0.96 }}
      className={`relative inline-flex items-center justify-center cursor-pointer transition-shadow duration-300 ${className}`}
      {...props}
    >
      <span style={{ transform: 'translateZ(15px)' }}>{children}</span>
    </Component>
  );
}
