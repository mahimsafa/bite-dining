import { useRef } from 'react';
import { motion } from 'framer-motion';
import useSectionParallax from '../../hooks/useSectionParallax';
import { PARALLAX_CONFIG } from '../../hooks/parallaxConfig';

interface ParallaxSectionProps {
  children?: React.ReactNode;
  className?: string;
  id?: string;
}

export default function ParallaxSection({ children, className, id }: ParallaxSectionProps) {
  const ref = useRef<HTMLElement>(null);
  const { style, onMouseMove, onMouseLeave } = useSectionParallax(ref);
  return (
    <div style={{ perspective: PARALLAX_CONFIG.section.perspective }}>
      <motion.section
        ref={ref}
        style={style}
        onMouseMove={onMouseMove}
        onMouseLeave={onMouseLeave}
        className={className}
        id={id}
      >
        {children}
      </motion.section>
    </div>
  );
}
