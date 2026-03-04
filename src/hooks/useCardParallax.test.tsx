/**
 * @vitest-environment jsdom
 */
import '@testing-library/jest-dom/vitest';
import { render, screen } from '@testing-library/react';
import { useRef } from 'react';
import { motion } from 'framer-motion';
import useCardParallax from './useCardParallax';
import { beforeEach, describe, expect, it, vi } from 'vitest';

function TestCard() {
  const ref = useRef<HTMLDivElement>(null);
  const result = useCardParallax(ref);
  return (
    <motion.div
      ref={ref}
      data-testid="card"
      style={result.style}
      onMouseMove={result.onMouseMove}
      onMouseLeave={result.onMouseLeave}
    >
      Card content
    </motion.div>
  );
}

function TestCardWithExposedResult({ onResult }: { onResult: (r: ReturnType<typeof useCardParallax>) => void }) {
  const ref = useRef<HTMLDivElement>(null);
  const result = useCardParallax(ref);
  onResult(result);
  return null;
}

describe('useCardParallax', () => {
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

  it('renders card with content', () => {
    render(<TestCard />);
    const cards = screen.getAllByTestId('card');
    expect(cards[0]).toHaveTextContent('Card content');
  });

  it('applies transform style with preserve-3d', () => {
    render(<TestCard />);
    const cards = screen.getAllByTestId('card');
    expect(cards[0]).toHaveStyle({ transformStyle: 'preserve-3d' });
  });

  it('provides onMouseMove and onMouseLeave handlers', () => {
    let result: ReturnType<typeof useCardParallax> | null = null;
    render(<TestCardWithExposedResult onResult={(r) => { result = r; }} />);
    expect(result).not.toBeNull();
    expect(typeof result!.onMouseMove).toBe('function');
    expect(typeof result!.onMouseLeave).toBe('function');
  });
});
