# Mouse Parallax 3D — Design

**Date:** 2025-03-05

**Goal:** Add subtle 3D tilt and mouse-parallax to section containers and card-like components across the app, using shared hooks and optional wrappers, with reduced-motion support.

---

## 1. Architecture and hooks

- **Location:** Shared hooks in `src/hooks/` (e.g. `useSectionParallax.ts`, `useCardParallax.ts`). Optional wrapper components in `src/components/` (e.g. `ParallaxSection.tsx`, `ParallaxCard.tsx`) that use these hooks so sections/cards stay presentational.
- **Section hook (`useSectionParallax`):** Accepts a ref to the section element. On mouse move over that section, computes normalized position (e.g. -0.5 to 0.5 in X/Y) and returns a Framer Motion style object: subtle `rotateX` / `rotateY` (e.g. max ±3°–5°) with `transformStyle: 'preserve-3d'` and `perspective`. Uses `useSpring` for smooth follow. On mouse leave, resets to 0. Section tilt is relative to the section’s bounding rect.
- **Card hook (`useCardParallax`):** Same idea per card: ref to the card element, mouse move over the card drives a small tilt (e.g. max ±5°–8°), spring-smoothed, with `preserve-3d`. Returns style plus `onMouseMove` / `onMouseLeave` (or the wrapper attaches these). Card tilt is relative to the card’s rect.
- **Constants:** One place (e.g. `src/hooks/parallaxConfig.ts` or inside the hook files) defines max rotation degrees and spring config so “subtle” is consistent and easy to tune.
- **Reduced motion:** In both hooks, if `prefers-reduced-motion: reduce` matches, return no tilt (identity/zero rotation).

## 2. Which components get section vs card treatment

**Section-level tilt only:** PopularDishes, ServiceInfo, MenuPack, ReservationCTA, Testimonials, Blog, Chefs, AppDownload, Footer.

**No section parallax:** Header (fixed bar; skip). Hero (already has its own; leave as-is).

**Card-level tilt:** PopularDishes (featured + grid cards), ServiceInfo (service cards), MenuPack (menu cards), ReservationCTA (CTA card), Testimonials (testimonial cards), Blog (BlogCard), Chefs (chef cards), AppDownload (app card/panel), Footer (only if card-like blocks exist).

## 3. Data flow and integration

- **Section-level:** Section passes ref to `useSectionParallax(ref)`. Hook returns Framer Motion style. Root is `motion.section` with that style; mouse move/leave handled inside the hook (or section uses handlers from hook).
- **Card-level:** Card uses `useCardParallax()`; gets `{ style, onMouseMove, onMouseLeave }`. Card root is `motion.div` with that style and handlers. Tilt relative to card’s rect.
- **Framer Motion:** Use existing `motion`, `useMotionValue`, `useSpring`, `useEffect`. No new dependencies. No shared context; each hook owns its motion values.
- **Wrappers (optional):** `ParallaxSection` / `ParallaxCard` can wrap children, call the hook, render `motion.section` / `motion.div`. Components may use wrappers or hooks directly.
- **Hero:** No changes; keep existing section and FloatingDishCard logic.

## 4. Accessibility and edge cases

- **Reduced motion:** Both hooks read `matchMedia('(prefers-reduced-motion: reduce)')`; when true, return zero rotation. Optionally listen for `change`.
- **Touch:** No pointer-based parallax on touch-only; hooks react to mouse only. Static on touch.
- **Ref not ready:** Hook checks `ref.current` before use; no-op or skip listeners until set. No throw.
- **SSR:** Guard `window` / `matchMedia` (e.g. in `useEffect` or `typeof window`) if needed.
- **Performance:** One listener per section, one set of handlers per card; no global document listener. Spring config keeps motion smooth.
- **Focus/keyboard:** No change; tilt is mouse-only. Cards remain focusable and clickable.

## 5. Testing

- **Hooks:** Unit-test with a mounted div + ref; simulate mouse move/leave; assert style (or motion values) change and reset. Mock `matchMedia` for reduced-motion on/off.
- **Wrappers:** Test render and pass-through; optional integration for tilt.
- **Components:** Update existing tests only if DOM/structure changes (e.g. root becomes `motion.section`). No new tests per section/card.
- **Storybook:** Existing stories unchanged; optional story for ParallaxSection/ParallaxCard with reduce-motion toggle.
- **E2E:** No new E2E for parallax.
