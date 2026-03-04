import { useRef } from 'react';
import { motion } from 'framer-motion';
import useCardParallax from '../../hooks/useCardParallax';
import { PARALLAX_CONFIG } from '../../hooks/parallaxConfig';

interface ParallaxCardProps {
  children?: React.ReactNode;
  className?: string;
}

export default function ParallaxCard({ children, className }: ParallaxCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { style, onMouseMove, onMouseLeave } = useCardParallax(ref);
  return (
    <div style={{ perspective: PARALLAX_CONFIG.card.perspective }}>
      <motion.div
        ref={ref}
        style={style}
        onMouseMove={onMouseMove}
        onMouseLeave={onMouseLeave}
        className={className}
      >
        {children}
      </motion.div>
    </div>
  );
}
