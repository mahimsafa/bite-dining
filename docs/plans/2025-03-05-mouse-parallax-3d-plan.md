# Mouse Parallax 3D — Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Add subtle 3D tilt and mouse parallax to section containers and card-like components via shared hooks (`useSectionParallax`, `useCardParallax`) and optional wrappers (`ParallaxSection`, `ParallaxCard`), with reduced-motion support.

**Architecture:** Shared config in `src/hooks/parallaxConfig.ts`. Two hooks in `src/hooks/` drive Framer Motion styles (rotateX/rotateY, spring); optional wrapper components apply them. Each section (except Header/Hero) wraps in ParallaxSection or uses the section hook; each card-like element wraps in ParallaxCard or uses the card hook. No global context; one listener per section, one set of handlers per card.

**Tech Stack:** React 19, TypeScript strict, Tailwind CSS v4, Framer Motion (existing), Vitest + React Testing Library

---

## Task 1: Create parallax config

**Files:**
- Create: `src/hooks/parallaxConfig.ts`

**Step 1: Add config file**

Create `src/hooks/parallaxConfig.ts`:

```ts
export const PARALLAX_CONFIG = {
  section: {
    maxRotateDeg: 4,
    spring: { damping: 25, stiffness: 150 },
    perspective: 1200,
  },
  card: {
    maxRotateDeg: 6,
    spring: { damping: 22, stiffness: 180 },
    perspective: 800,
  },
} as const;
```

**Step 2: Commit**

```bash
git add src/hooks/parallaxConfig.ts
git commit -m "feat(parallax): add shared parallax config"
```

---

## Task 2: useSectionParallax hook (TDD)

**Files:**
- Create: `src/hooks/useSectionParallax.test.tsx`
- Create: `src/hooks/useSectionParallax.ts`

**Step 1: Write the failing test**

Create `src/hooks/useSectionParallax.test.tsx`:

```tsx
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useRef } from 'react';
import { motion } from 'framer-motion';
import useSectionParallax from './useSectionParallax';

function TestSection() {
  const ref = useRef<HTMLElement>(null);
  const style = useSectionParallax(ref);
  return (
    <motion.section ref={ref} data-testid="section" style={style}>
      Section content
    </motion.section>
  );
}

describe('useSectionParallax', () => {
  beforeEach(() => {
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: jest.fn().mockImplementation((query: string) => ({
        matches: false,
        media: query,
        addListener: jest.fn(),
        removeListener: jest.fn(),
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        dispatchEvent: jest.fn(),
      })),
    });
  });

  it('renders section with content', () => {
    render(<TestSection />);
    expect(screen.getByTestId('section')).toHaveTextContent('Section content');
  });

  it('applies transform style with preserve-3d', () => {
    render(<TestSection />);
    const section = screen.getByTestId('section');
    expect(section).toHaveStyle({ transformStyle: 'preserve-3d' });
  });
});
```

**Step 2: Run test to verify it fails**

Run: `pnpm run test:run src/hooks/useSectionParallax.test.tsx`

Expected: FAIL (hook/useSectionParallax not found or test expectations fail)

**Step 3: Implement useSectionParallax**

Create `src/hooks/useSectionParallax.ts`:

- Import `useRef`, `useCallback`, `useEffect` from React; `useMotionValue`, `useSpring` from `framer-motion`; `PARALLAX_CONFIG` from `./parallaxConfig`.
- Type: `(ref: React.RefObject<HTMLElement | null>) => React.CSSProperties`.
- If `typeof window === 'undefined'`, return `{ transformStyle: 'preserve-3d' }`.
- Check `matchMedia('(prefers-reduced-motion: reduce)').matches`; if true, return `{ transformStyle: 'preserve-3d' }` (no rotation).
- Create `rotateX`, `rotateY` with `useMotionValue(0)`; spring them with `useSpring(..., PARALLAX_CONFIG.section.spring)`.
- In a `useEffect`, if `!ref.current` return. Attach `mousemove` to `ref.current`: compute normalized x/y from event and rect (e.g. `(e.clientX - rect.left) / rect.width - 0.5`), then `rotateX.set(-y * PARALLAX_CONFIG.section.maxRotateDeg)` and `rotateY.set(x * PARALLAX_CONFIG.section.maxRotateDeg)`. Attach `mouseleave` to reset both to 0. Return cleanup that removes both listeners.
- Return style object: `{ rotateX: springX, rotateY: springY, transformStyle: 'preserve-3d', perspective: PARALLAX_CONFIG.section.perspective }` (use Framer Motion value types so motion.section accepts them; if TypeScript expects numbers, use `useTransform` to get current value or document that style is for motion components). Note: Framer Motion accepts motion values in style. So return type can be `{ rotateX: MotionValue<number>; rotateY: MotionValue<number>; transformStyle: string; perspective: number }` or equivalent so that motion.section style prop works.
- Ensure ref is in the effect dependency array; use a callback ref or ensure the effect re-runs when ref.current becomes available.

**Step 4: Run test to verify it passes**

Run: `pnpm run test:run src/hooks/useSectionParallax.test.tsx`

Expected: PASS

**Step 5: Commit**

```bash
git add src/hooks/useSectionParallax.test.tsx src/hooks/useSectionParallax.ts
git commit -m "feat(parallax): add useSectionParallax hook with reduced-motion"
```

---

## Task 3: useCardParallax hook (TDD)

**Files:**
- Create: `src/hooks/useCardParallax.test.tsx`
- Create: `src/hooks/useCardParallax.ts`

**Step 1: Write the failing test**

Create `src/hooks/useCardParallax.test.tsx`:

```tsx
import { render, screen } from '@testing-library/react';
import { useRef } from 'react';
import { motion } from 'framer-motion';
import useCardParallax from './useCardParallax';

function TestCard() {
  const ref = useRef<HTMLDivElement>(null);
  const { style, onMouseMove, onMouseLeave } = useCardParallax(ref);
  return (
    <motion.div
      ref={ref}
      data-testid="card"
      style={style}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
    >
      Card content
    </motion.div>
  );
}

describe('useCardParallax', () => {
  beforeEach(() => {
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: jest.fn().mockImplementation((query: string) => ({
        matches: false,
        media: query,
        addListener: jest.fn(),
        removeListener: jest.fn(),
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        dispatchEvent: jest.fn(),
      })),
    });
  });

  it('renders card with content', () => {
    render(<TestCard />);
    expect(screen.getByTestId('card')).toHaveTextContent('Card content');
  });

  it('applies transform style with preserve-3d', () => {
    render(<TestCard />);
    const card = screen.getByTestId('card');
    expect(card).toHaveStyle({ transformStyle: 'preserve-3d' });
  });

  it('provides onMouseMove and onMouseLeave handlers', () => {
    render(<TestCard />);
    const card = screen.getByTestId('card');
    expect(typeof card.onmousemove).toBe('function');
    expect(typeof card.onmouseleave).toBe('function');
  });
});
```

**Step 2: Run test to verify it fails**

Run: `pnpm run test:run src/hooks/useCardParallax.test.tsx`

Expected: FAIL

**Step 3: Implement useCardParallax**

Create `src/hooks/useCardParallax.ts`:

- Signature: `(ref: React.RefObject<HTMLElement | null>) => { style: ...; onMouseMove: (e: React.MouseEvent<HTMLElement>) => void; onMouseLeave: () => void }`.
- If `typeof window === 'undefined'` or `prefers-reduced-motion: reduce`, return style with only `transformStyle: 'preserve-3d'` and no-op handlers.
- Use `useMotionValue(0)` for rotateX/rotateY, spring with `PARALLAX_CONFIG.card.spring`.
- `onMouseMove`: if `ref.current`, get rect, compute normalized x/y from event and rect center (e.g. `(e.clientX - cx) / (rect.width/2)`, `(e.clientY - cy) / (rect.height/2)`), clamp to [-1,1], then `rotateX.set(-dy * PARALLAX_CONFIG.card.maxRotateDeg)`, `rotateY.set(dx * PARALLAX_CONFIG.card.maxRotateDeg)`.
- `onMouseLeave`: set both to 0.
- Return `{ style: { rotateX: springX, rotateY: springY, transformStyle: 'preserve-3d', perspective }, onMouseMove, onMouseLeave }`.

**Step 4: Run test to verify it passes**

Run: `pnpm run test:run src/hooks/useCardParallax.test.tsx`

Expected: PASS

**Step 5: Commit**

```bash
git add src/hooks/useCardParallax.test.tsx src/hooks/useCardParallax.ts
git commit -m "feat(parallax): add useCardParallax hook with reduced-motion"
```

---

## Task 4: ParallaxSection wrapper component

**Files:**
- Create: `src/components/ParallaxSection/ParallaxSection.tsx`

**Step 1: Implement ParallaxSection**

Create `src/components/ParallaxSection/ParallaxSection.tsx`:

- Use `useRef<HTMLElement>(null)` and `useSectionParallax(ref)`.
- Render `<motion.section ref={ref} style={style} className={className} {...props}>` forwarding `children` and rest props (e.g. `className`, `id`). Type props as `React.ComponentPropsWithoutRef<'section'>` plus optional overrides.

**Step 2: Verify build**

Run: `pnpm run build`

Expected: success

**Step 3: Commit**

```bash
git add src/components/ParallaxSection/ParallaxSection.tsx
git commit -m "feat(parallax): add ParallaxSection wrapper"
```

---

## Task 5: ParallaxCard wrapper component

**Files:**
- Create: `src/components/ParallaxCard/ParallaxCard.tsx`

**Step 1: Implement ParallaxCard**

Create `src/components/ParallaxCard/ParallaxCard.tsx`:

- Use `useRef<HTMLDivElement>(null)` and `useCardParallax(ref)`.
- Render `<motion.div ref={ref} style={style} onMouseMove={onMouseMove} onMouseLeave={onMouseLeave} className={className} {...props}>` forwarding `children` and rest props. Type as `React.ComponentPropsWithoutRef<'div'>`.

**Step 2: Verify build**

Run: `pnpm run build`

Expected: success

**Step 3: Commit**

```bash
git add src/components/ParallaxCard/ParallaxCard.tsx
git commit -m "feat(parallax): add ParallaxCard wrapper"
```

---

## Task 6: Integrate parallax into PopularDishes

**Files:**
- Modify: `src/components/PopularDishes/PopularDishes.tsx`

**Step 1: Add section wrapper**

- Import `ParallaxSection` and `ParallaxCard` (or `motion` + hooks if not using wrappers). Wrap the root `<section>` with `<ParallaxSection>` (so the section is the motion.section) or replace `<section>` with `<ParallaxSection>` and keep existing `className` and `id`.
- Wrap the featured dish card container (the `relative bg-white rounded-2xl...` div) with `<ParallaxCard>`.
- Wrap each regular dish card in the grid (the `group bg-white rounded-2xl...` div) with `<ParallaxCard>`.

**Step 2: Run lint and build**

Run: `pnpm run lint` and `pnpm run build`

Expected: no errors

**Step 3: Commit**

```bash
git add src/components/PopularDishes/PopularDishes.tsx
git commit -m "feat(parallax): add section and card parallax to PopularDishes"
```

---

## Task 7: Integrate parallax into ServiceInfo

**Files:**
- Modify: `src/components/ServiceInfo/ServiceInfo.tsx`

**Step 1: Add section and card wrappers**

- Wrap root `<section>` with `ParallaxSection` (or replace with ParallaxSection preserving className and id).
- Wrap each service tile in the grid (the `group bg-white/5 border...` div) with `ParallaxCard`.

**Step 2: Run lint and build**

Run: `pnpm run lint` and `pnpm run build`

Expected: no errors

**Step 3: Commit**

```bash
git add src/components/ServiceInfo/ServiceInfo.tsx
git commit -m "feat(parallax): add section and card parallax to ServiceInfo"
```

---

## Task 8: Integrate parallax into MenuPack

**Files:**
- Modify: `src/components/MenuPack/MenuPack.tsx`

**Step 1: Add section and card wrappers**

- Wrap root `<section>` with `ParallaxSection`.
- Wrap each menu item/card with `ParallaxCard` (identify the card container in the component).

**Step 2: Run lint and build**

Run: `pnpm run lint` and `pnpm run build`

Expected: no errors

**Step 3: Commit**

```bash
git add src/components/MenuPack/MenuPack.tsx
git commit -m "feat(parallax): add section and card parallax to MenuPack"
```

---

## Task 9: Integrate parallax into ReservationCTA

**Files:**
- Modify: `src/components/ReservationCTA/ReservationCTA.tsx`

**Step 1: Add section and card wrappers**

- Wrap root `<section>` with `ParallaxSection`.
- Wrap the three stat cards at the bottom (the `bg-white/8 backdrop-blur-sm...` divs) with `ParallaxCard` each.

**Step 2: Run lint and build**

Run: `pnpm run lint` and `pnpm run build`

Expected: no errors

**Step 3: Commit**

```bash
git add src/components/ReservationCTA/ReservationCTA.tsx
git commit -m "feat(parallax): add section and card parallax to ReservationCTA"
```

---

## Task 10: Integrate parallax into Testimonials

**Files:**
- Modify: `src/components/Testimonials/Testimonials.tsx`

**Step 1: Add section and card wrappers**

- Wrap root `<section>` with `ParallaxSection`.
- Wrap each testimonial card with `ParallaxCard`.

**Step 2: Run lint and build**

Run: `pnpm run lint` and `pnpm run build`

Expected: no errors

**Step 3: Commit**

```bash
git add src/components/Testimonials/Testimonials.tsx
git commit -m "feat(parallax): add section and card parallax to Testimonials"
```

---

## Task 11: Integrate parallax into Blog and BlogCard

**Files:**
- Modify: `src/components/Blog/Blog.tsx`
- Modify: `src/components/BlogCard/BlogCard.tsx`

**Step 1: Add section wrapper in Blog**

- In `Blog.tsx`, wrap root `<section>` with `ParallaxSection`.

**Step 2: Add card wrapper in BlogCard**

- In `BlogCard.tsx`, wrap the root `<div>` (the `group bg-white rounded-2xl...`) with `ParallaxCard` or replace it with `ParallaxCard` and keep the same className and structure.

**Step 3: Run lint and build**

Run: `pnpm run lint` and `pnpm run build`

Expected: no errors

**Step 4: Commit**

```bash
git add src/components/Blog/Blog.tsx src/components/BlogCard/BlogCard.tsx
git commit -m "feat(parallax): add section and card parallax to Blog and BlogCard"
```

---

## Task 12: Integrate parallax into Chefs

**Files:**
- Modify: `src/components/Chefs/Chefs.tsx`

**Step 1: Add section and card wrappers**

- Wrap root `<section>` with `ParallaxSection`.
- Wrap each chef card with `ParallaxCard`.

**Step 2: Run lint and build**

Run: `pnpm run lint` and `pnpm run build`

Expected: no errors

**Step 3: Commit**

```bash
git add src/components/Chefs/Chefs.tsx
git commit -m "feat(parallax): add section and card parallax to Chefs"
```

---

## Task 13: Integrate parallax into AppDownload

**Files:**
- Modify: `src/components/AppDownload/AppDownload.tsx`

**Step 1: Add section and card wrappers**

- Wrap root `<section>` with `ParallaxSection`.
- Wrap the main app card/panel (or each card if there are multiple) with `ParallaxCard`.

**Step 2: Run lint and build**

Run: `pnpm run lint` and `pnpm run build`

Expected: no errors

**Step 3: Commit**

```bash
git add src/components/AppDownload/AppDownload.tsx
git commit -m "feat(parallax): add section and card parallax to AppDownload"
```

---

## Task 14: Integrate parallax into Footer

**Files:**
- Modify: `src/components/Footer/Footer.tsx`

**Step 1: Add section wrapper**

- Wrap the root `<footer>` with a parallax wrapper. If `ParallaxSection` is section-only, add a `ParallaxSection`-like wrapper for footer (e.g. `ParallaxSection as="footer"` if the component supports `as`, or create a thin `ParallaxFooter` that uses the same hook but renders `<motion.footer>`). Alternatively use the section hook directly on a ref for the footer element and render `<motion.footer ref={ref} style={style}>`. Simplest: use the same `useSectionParallax` hook in Footer with a ref and render `<motion.footer ref={ref} style={style} ...>`.

**Step 2: Run lint and build**

Run: `pnpm run lint` and `pnpm run build`

Expected: no errors

**Step 3: Commit**

```bash
git add src/components/Footer/Footer.tsx
git commit -m "feat(parallax): add parallax to Footer"
```

---

## Task 15: Final verification

**Step 1: Run full test suite**

Run: `pnpm run test:run`

Expected: all tests pass

**Step 2: Run lint**

Run: `pnpm run lint`

Expected: no errors

**Step 3: Run build**

Run: `pnpm run build`

Expected: success

**Step 4: Commit (if any fixes)**

If any fixes were made in this task, commit them. Otherwise no commit needed.

---

## Execution handoff

After saving the plan, offer:

**Plan complete and saved to `docs/plans/2025-03-05-mouse-parallax-3d-plan.md`. Two execution options:**

**1. Subagent-driven (this session)** — Dispatch a fresh subagent per task, review between tasks, fast iteration.

**2. Parallel session (separate)** — Open a new session with executing-plans, batch execution with checkpoints.

**Which approach?**
