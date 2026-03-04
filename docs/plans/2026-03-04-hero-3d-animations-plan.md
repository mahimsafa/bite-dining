# Hero 3D Animations — Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Add Framer Motion mouse parallax + 3 floating 3D-tilt dish cards to the Hero section.

**Architecture:** Single file change (`Hero.tsx`) + install `framer-motion`. No new components. Mouse tracking via `useMotionValue`/`useSpring` on the section element. Cards use separate `motion.div` wrappers to compose entrance + bob animations without conflict. 3D tilt uses per-card `onMouseMove` with `rotateX`/`rotateY` motion values.

**Tech Stack:** React 19, TypeScript strict, Tailwind CSS v4, Framer Motion v11

---

## Task 1: Install framer-motion

**Files:**
- Modify: `package.json` (via pnpm install)

**Step 1: Install the dependency**

Run from `/Users/mahim/work/rnd/facetory/facetory-frontend`:
```bash
pnpm add framer-motion
```

Expected: `framer-motion` added to `dependencies` in `package.json`

**Step 2: Verify build still passes**

```bash
pnpm run build
```
Expected: clean build

**Step 3: Commit**

```bash
git add package.json pnpm-lock.yaml
git commit -m "feat: add framer-motion dependency"
```

---

## Task 2: Rewrite Hero.tsx with parallax + floating 3D cards

**Files:**
- Modify: `src/components/Hero/Hero.tsx`

**Step 1: Read the current Hero.tsx**

File: `src/components/Hero/Hero.tsx`

**Step 2: Replace the full file contents**

```tsx
'use client';
import { useRef, useCallback } from 'react';
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from 'framer-motion';
import { FiArrowRight, FiSearch } from 'react-icons/fi';

interface DishCard {
  name: string;
  price: string;
  image: string;
  bobDuration: number;
  delay: number;
  className: string;
}

const dishCards: DishCard[] = [
  {
    name: 'Creamy Pasta',
    price: '$35',
    image: 'https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=120&h=120&fit=crop',
    bobDuration: 3,
    delay: 0.3,
    className: 'top-12 right-4',
  },
  {
    name: 'Dragon Roll',
    price: '$38',
    image: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=120&h=120&fit=crop',
    bobDuration: 3.7,
    delay: 0.5,
    className: 'top-1/2 -translate-y-1/2 right-24',
  },
  {
    name: 'Margherita Pizza',
    price: '$32',
    image: 'https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?w=120&h=120&fit=crop',
    bobDuration: 4.2,
    delay: 0.7,
    className: 'bottom-20 right-8',
  },
];

function FloatingDishCard({ card }: { card: DishCard }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const springConfig = { damping: 20, stiffness: 200 };
  const springRotateX = useSpring(rotateX, springConfig);
  const springRotateY = useSpring(rotateY, springConfig);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = (e.clientX - cx) / (rect.width / 2);
    const dy = (e.clientY - cy) / (rect.height / 2);
    rotateX.set(-dy * 15);
    rotateY.set(dx * 15);
  }, [rotateX, rotateY]);

  const handleMouseLeave = useCallback(() => {
    rotateX.set(0);
    rotateY.set(0);
  }, [rotateX, rotateY]);

  return (
    <motion.div
      className={`absolute ${card.className}`}
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: card.delay, ease: 'easeOut' }}
    >
      <motion.div
        animate={{ y: [0, -10, 0] }}
        transition={{
          duration: card.bobDuration,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      >
        <motion.div
          ref={cardRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          style={{
            rotateX: springRotateX,
            rotateY: springRotateY,
            transformStyle: 'preserve-3d',
            perspective: 800,
          }}
          className="bg-white/15 backdrop-blur-md border border-white/20 rounded-2xl p-4 flex items-center gap-3 cursor-pointer w-48 shadow-xl"
        >
          <img
            src={card.image}
            alt={card.name}
            className="w-14 h-14 rounded-full object-cover shrink-0 shadow-md"
          />
          <div>
            <p className="font-display font-bold text-cream text-sm leading-tight">
              {card.name}
            </p>
            <p className="font-display font-bold text-primary-light text-lg mt-1">
              {card.price}
            </p>
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const smoothX = useSpring(mouseX, { damping: 25, stiffness: 150 });
  const smoothY = useSpring(mouseY, { damping: 25, stiffness: 150 });

  // Parallax transforms for each layer
  const bgX = useTransform(smoothX, [-0.5, 0.5], [12, -12]);
  const bgY = useTransform(smoothY, [-0.5, 0.5], [12, -12]);
  const textX = useTransform(smoothX, [-0.5, 0.5], [-6, 6]);
  const textY = useTransform(smoothY, [-0.5, 0.5], [-6, 6]);
  const cardsX = useTransform(smoothX, [-0.5, 0.5], [-18, 18]);
  const cardsY = useTransform(smoothY, [-0.5, 0.5], [-18, 18]);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLElement>) => {
    if (!sectionRef.current) return;
    const rect = sectionRef.current.getBoundingClientRect();
    mouseX.set((e.clientX - rect.left) / rect.width - 0.5);
    mouseY.set((e.clientY - rect.top) / rect.height - 0.5);
  }, [mouseX, mouseY]);

  const handleMouseLeave = useCallback(() => {
    mouseX.set(0);
    mouseY.set(0);
  }, [mouseX, mouseY]);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex items-center overflow-hidden"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* Parallax background image */}
      <motion.div
        className="absolute inset-0"
        style={{ x: bgX, y: bgY, scale: 1.08 }}
      >
        <img
          src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1600&h=900&fit=crop"
          alt="Restaurant atmosphere"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-espresso/88 via-espresso/55 to-espresso/10" />
      </motion.div>

      {/* Content layer */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-32 pt-40">
        <div className="grid lg:grid-cols-12 gap-8 items-center">

          {/* Left: text content */}
          <motion.div
            className="lg:col-span-7"
            style={{ x: textX, y: textY }}
          >
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
            >
              <div className="inline-flex items-center gap-2 bg-primary/20 border border-primary/30 backdrop-blur-sm px-5 py-2.5 rounded-full mb-8">
                <span className="w-2 h-2 bg-primary-light rounded-full animate-pulse" />
                <span className="text-primary-light font-semibold text-sm tracking-wide uppercase">
                  Now Open — Order Online
                </span>
              </div>

              <h1 className="font-display italic font-bold text-cream leading-[1.05] text-6xl md:text-7xl lg:text-8xl">
                We Serve The{' '}
                <span className="text-primary-light">Taste</span>{' '}
                You Love
              </h1>

              <p className="mt-8 text-lg md:text-xl text-cream/70 max-w-lg leading-relaxed">
                Experience culinary excellence with dishes made from the freshest ingredients. Your satisfaction is our priority.
              </p>

              <div className="mt-12 flex flex-col sm:flex-row gap-4">
                <button className="group bg-primary text-white px-10 py-5 rounded-full font-bold text-lg hover:bg-primary-light hover:shadow-2xl hover:shadow-primary/40 transition-all flex items-center justify-center gap-3 hover:-translate-y-1">
                  Explore Menu
                  <FiArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
                <button className="border-2 border-cream/30 text-cream px-10 py-5 rounded-full font-semibold text-lg hover:bg-cream hover:text-charcoal hover:border-cream transition-all flex items-center justify-center gap-3">
                  <FiSearch className="w-5 h-5" />
                  Search Dishes
                </button>
              </div>

              {/* Social proof */}
              <div className="mt-16 flex items-center gap-8">
                <div className="flex -space-x-3">
                  {[1, 2, 3, 4].map((i) => (
                    <img
                      key={i}
                      src={`https://randomuser.me/api/portraits/${i % 2 === 0 ? 'women' : 'men'}/${i + 20}.jpg`}
                      alt="Customer"
                      className="w-12 h-12 rounded-full border-2 border-cream/30 object-cover shadow-md"
                    />
                  ))}
                  <div className="w-12 h-12 rounded-full border-2 border-cream/30 bg-primary flex items-center justify-center text-white font-bold text-xs shadow-md">
                    +2.5k
                  </div>
                </div>
                <div>
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} className="w-4 h-4 text-primary-light fill-primary-light" viewBox="0 0 20 20">
                        <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                      </svg>
                    ))}
                  </div>
                  <p className="text-cream/60 text-sm font-medium mt-1">2,500+ happy customers</p>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Right: floating dish cards (desktop only) */}
          <motion.div
            className="hidden lg:block lg:col-span-5 relative h-[500px]"
            style={{ x: cardsX, y: cardsY }}
          >
            {dishCards.map((card) => (
              <FloatingDishCard key={card.name} card={card} />
            ))}
          </motion.div>

        </div>
      </div>
    </section>
  );
}
```

**Step 3: Run lint**

```bash
pnpm run lint
```
Expected: no errors

**Step 4: Run build**

```bash
pnpm run build
```
Expected: clean TypeScript + Vite build

**Step 5: Self-review checklist**

- [ ] `'use client'` directive removed if it causes issues (it's harmless in Vite/React but not needed — remove if lint warns)
- [ ] No `any` types
- [ ] `useCallback` used for all event handlers to avoid re-renders
- [ ] `useRef` typed correctly (`useRef<HTMLElement>`, `useRef<HTMLDivElement>`)
- [ ] `noUnusedLocals` — all imports used
- [ ] Cards hidden on mobile with `hidden lg:block`

**Step 6: Commit**

```bash
git add src/components/Hero/Hero.tsx
git commit -m "feat: add mouse parallax and floating 3D dish cards to Hero"
```

---

## Final Verification

Run: `pnpm run lint && pnpm run build`

Expected: zero errors, clean build.

Open browser at `http://localhost:5173` and verify:
- [ ] Background image shifts subtly on mouse move (opposite direction)
- [ ] Text column shifts slightly with mouse (same direction as cursor)
- [ ] 3 dish cards visible on desktop right side
- [ ] Cards entrance: fade up on load, staggered
- [ ] Cards bob continuously at different speeds
- [ ] Cards tilt in 3D toward cursor on hover, spring back on leave
- [ ] Mobile: cards hidden, text full width
- [ ] No layout shift or overflow
