import type { RefObject } from 'react';
import { useCallback } from 'react';
import { useMotionValue, useSpring } from 'framer-motion';
import { PARALLAX_CONFIG } from './parallaxConfig';

export default function useSectionParallax(ref: RefObject<HTMLElement | null>) {
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const springX = useSpring(rotateX, PARALLAX_CONFIG.section.spring);
  const springY = useSpring(rotateY, PARALLAX_CONFIG.section.spring);

  const onMouseMove = useCallback(
    (e: React.MouseEvent<HTMLElement>) => {
      if (typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
      const el = ref.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      if (rect.width === 0 || rect.height === 0) return;
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      rotateX.set(-y * PARALLAX_CONFIG.section.maxRotateDeg);
      rotateY.set(x * PARALLAX_CONFIG.section.maxRotateDeg);
    },
    [ref, rotateX, rotateY]
  );

  const onMouseLeave = useCallback(() => {
    rotateX.set(0);
    rotateY.set(0);
  }, [rotateX, rotateY]);

  if (typeof window === 'undefined') {
    return {
      style: { transformStyle: 'preserve-3d' as const },
      onMouseMove: () => {},
      onMouseLeave: () => {},
    };
  }
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    return {
      style: { transformStyle: 'preserve-3d' as const },
      onMouseMove: () => {},
      onMouseLeave: () => {},
    };
  }

  return {
    style: {
      rotateX: springX,
      rotateY: springY,
      transformStyle: 'preserve-3d' as const,
    },
    onMouseMove,
    onMouseLeave,
  };
}
