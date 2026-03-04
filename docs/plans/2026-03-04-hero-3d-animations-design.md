# Hero 3D Animations — Design Doc

**Date:** 2026-03-04  
**Approach:** Framer Motion — mouse parallax + floating 3D tilt dish cards

---

## Goals

Transform the static Hero into an interactive, 3D animated experience. Mouse movement drives a multi-layer parallax effect across the full section. Three floating dish cards on the right side bob continuously and tilt in 3D toward the cursor on hover. Staggered entrance animations on page load.

---

## New Layout

Split two-column on desktop (hidden right column on mobile):

- **Left (55%)** — existing text content: badge, H1, body, CTAs, social proof. Unchanged.
- **Right (45%)** — 3 absolutely-positioned floating dish cards over the lighter gradient area.
- Full-bleed background image and `from-espresso/88` gradient remain.

---

## Dependency

Install: `framer-motion` (latest v11)

---

## Effect 1: Mouse Parallax

Track mouse position with `useMotionValue` + `useSpring` (damping: 25, stiffness: 150).

Three depth layers at different speeds:

| Layer | Direction | Offset |
|---|---|---|
| Background image | Opposite to cursor | ±12px |
| Left text column | Same as cursor | ±6px |
| Dish cards container | Same as cursor | ±18px |

Implementation:
- `onMouseMove` on section element
- `mouseX = useMotionValue(0)`, `mouseY = useMotionValue(0)`
- `smoothX = useSpring(mouseX, { damping: 25, stiffness: 150 })`
- `smoothY = useSpring(mouseY, { damping: 25, stiffness: 150 })`
- `useTransform(smoothX, [-0.5, 0.5], [-12, 12])` etc. for each layer
- `onMouseLeave` resets `mouseX`/`mouseY` to `0`

---

## Effect 2: Floating Dish Cards

### Card data

```ts
const dishCards = [
  {
    name: 'Creamy Pasta',
    price: '$35',
    image: 'https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=120&h=120&fit=crop',
    position: 'top-8 right-0',
    bobDuration: 3,
    delay: 0.3,
  },
  {
    name: 'Dragon Roll',
    price: '$38',
    image: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=120&h=120&fit=crop',
    position: 'top-1/2 -translate-y-1/2 right-20',
    bobDuration: 3.7,
    delay: 0.5,
  },
  {
    name: 'Margherita Pizza',
    price: '$32',
    image: 'https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?w=120&h=120&fit=crop',
    position: 'bottom-16 right-8',
    bobDuration: 4.2,
    delay: 0.7,
  },
]
```

### Entrance animation (per card)

```ts
initial={{ opacity: 0, y: 40 }}
animate={{ opacity: 1, y: 0 }}
transition={{ duration: 0.6, delay: card.delay, ease: 'easeOut' }}
```

### Bob animation (per card, continuous)

```ts
animate={{ y: [0, -10, 0] }}
transition={{ duration: card.bobDuration, repeat: Infinity, ease: 'easeInOut' }}
```

Note: entrance + bob must be composed — use `variants` or separate `motion.div` wrappers to avoid conflict.

### 3D tilt on hover (per card)

Track mouse position relative to card center using `onMouseMove` on each card:
```ts
const rotateX = useMotionValue(0)
const rotateY = useMotionValue(0)
```
On `mousemove`: compute `dx` / `dy` from card center, map to `±15deg`.  
On `mouseleave`: spring back to `0`.

```ts
style={{
  perspective: 800,
  rotateX,
  rotateY,
  transformStyle: 'preserve-3d',
}}
```

### Card visual style

```
bg-white/15 backdrop-blur-md border border-white/20 rounded-2xl p-4
```

Contents:
- Circular dish image: `w-14 h-14 rounded-full object-cover`
- Dish name: `font-display text-cream font-bold text-sm`
- Price: `text-primary-light font-bold font-display`

---

## Mobile

Cards container: `hidden lg:block` — cards do not render on mobile/tablet. The left column becomes full-width on mobile (existing behavior).

---

## Files Changed

- `src/components/Hero/Hero.tsx` — full rewrite
- `package.json` — add `framer-motion`
