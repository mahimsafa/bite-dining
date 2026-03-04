/**
 * @vitest-environment jsdom
 */
import '@testing-library/jest-dom/vitest';
import { render, screen } from '@testing-library/react';
import { useRef } from 'react';
import { motion } from 'framer-motion';
import useSectionParallax from './useSectionParallax';
import { beforeEach, describe, expect, it, vi } from 'vitest';

function TestSection() {
  const ref = useRef<HTMLElement>(null);
  const { style, onMouseMove, onMouseLeave } = useSectionParallax(ref);
  return (
    <motion.section
      ref={ref}
      data-testid="section"
      style={style}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
    >
      Section content
    </motion.section>
  );
}

describe('useSectionParallax', () => {
  beforeEach(() => {
    if (typeof window === 'undefined') return;
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: vi.fn().mockImplementation((query: string) => ({
        matches: false,
        media: query,
        addListener: vi.fn(),
        removeListener: vi.fn(),
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
        dispatchEvent: vi.fn(),
      })),
    });
  });

  it('renders section with content', () => {
    render(<TestSection />);
    const sections = screen.getAllByTestId('section');
    expect(sections[0]).toHaveTextContent('Section content');
  });

  it('applies transform style with preserve-3d', () => {
    render(<TestSection />);
    const sections = screen.getAllByTestId('section');
    expect(sections[0]).toHaveStyle({ transformStyle: 'preserve-3d' });
  });
});
