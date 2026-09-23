'use client';

import { useEffect } from 'react';
import Lenis from 'lenis';

export default function SmoothScroll({ children }) {
  useEffect(() => {
    if (typeof window === 'undefined') return;

    // High performance momentum scrolling
    const lenis = new Lenis({
      duration: 0.95,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1.1,
      touchMultiplier: 1.8,
      infinite: false,
    });

    let animationFrameId;
    function raf(time) {
      lenis.raf(time);
      animationFrameId = requestAnimationFrame(raf);
    }

    animationFrameId = requestAnimationFrame(raf);
    window.__lenis = lenis;

    return () => {
      cancelAnimationFrame(animationFrameId);
      lenis.destroy();
      window.__lenis = null;
    };
  }, []);

  return <>{children}</>;
}
