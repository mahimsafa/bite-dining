# Bites Restaurant — Full Visual Overhaul Design

**Date:** 2026-03-04  
**Approach:** B — Visual Overhaul  
**Vibe:** Warm & Modern  

---

## Goals

Transform the Bites restaurant landing page from a generic SaaS-style layout into a premium, warm, and editorial restaurant brand. Every component gets a full visual rethink: new grid system, a theatrical full-bleed Hero, dark section variants using deep warm brown, richer imagery framing, and a serif/sans-serif type pairing.

---

## Design Tokens

### Colors

| Token | Value | Role |
|---|---|---|
| `cream` | `#FAF6F0` | Page background |
| `cream-deep` | `#F2EBE0` | Alternate section background |
| `primary` | `#C8621A` | Buttons, accents, highlights |
| `primary-light` | `#E8834A` | Hover states, tints |
| `espresso` | `#1C1107` | Dark sections, footer |
| `charcoal` | `#2C1A0E` | Body text on light backgrounds |
| `stone` | `#8C7B6B` | Secondary/muted text |

### Typography

| Role | Font | Weight |
|---|---|---|
| Display H1, section titles | Fraunces (Google Font) | 700–900, italic for emphasis |
| H2–H3 | Fraunces | 600–700 |
| Body, UI labels, nav | Poppins | 400–600 |
| Prices, stat numbers | Fraunces | 700 |

Load via Google Fonts: `Fraunces:ital,opsz,wght@0,9..144,400..900;1,9..144,400..900` and `Poppins:wght@400;500;600;700`.

### Spacing

- Base unit: `8px`
- Section padding: `py-24 md:py-32`
- Section header margin-bottom: `mb-16 md:mb-20`
- Card grid gaps: `gap-6 md:gap-8`
- Prose max-width: `max-w-2xl mx-auto`
- Card border-radius: `rounded-2xl`

---

## Section Backgrounds (Rhythm)

| Section | Background |
|---|---|
| Hero | Full-bleed food image |
| Popular Dishes | `cream` |
| Service Info | `espresso` (dark) |
| Menu Pack | `cream-deep` |
| Reservation CTA | Full-bleed image with overlay |
| Testimonials | `cream` |
| Blog | `cream-deep` |
| Chefs | `espresso` (dark) |
| App Download | `cream` |
| Footer | `espresso` |

---

## Component Specs

### Header
- Fixed; transparent → `bg-cream/95 backdrop-blur-lg border-b border-stone/10` on scroll
- Logo: Fraunces italic, `text-4xl`
- Nav links: Poppins `text-sm uppercase tracking-wide`
- CTA: `bg-primary` pill with `ring-1 ring-primary/30`
- Mobile: full-height right-side drawer (replaces accordion)

### Hero
- Full-bleed viewport image background
- Dark gradient overlay left-to-right: `from-espresso/85 via-espresso/50 to-transparent`
- H1: Fraunces italic `text-6xl md:text-7xl lg:text-8xl` — "We Serve The *Taste* You Love" with "Taste" in `text-primary`
- Two CTAs: filled primary + white ghost outline
- Social proof (avatars + stars) anchored bottom-left
- No circular image crop on right — image breathes freely

### Cards (Dishes, Blog, Chefs)
- `rounded-2xl shadow-sm` default → `shadow-lg -translate-y-1` on hover
- Dish cards: `aspect-[4/3]` image
- Chef cards: `aspect-[3/4]` image
- Prices in Fraunces bold `text-primary`
- Internal padding: `p-6`

### Dark Sections (Service Info, Chefs)
- Background: `bg-espresso`
- Headings: `text-cream`
- Body text: `text-stone`
- Accent elements: `text-primary` or `bg-primary`
- Subtle texture overlay: SVG dot/grain pattern at `opacity-5`

### Reservation CTA
- Full-bleed restaurant interior image
- Overlay: `bg-espresso/75`
- Headline in Fraunces `text-5xl md:text-6xl text-cream`
- Stats row: warm glassmorphism cards (`bg-white/8 backdrop-blur-sm`)

### Footer
- `bg-espresso`
- Logo in Fraunces italic
- Four columns: brand/social, quick links, contact, opening hours
- Divider: `border-stone/20`

---

## index.css Changes

```css
@import "tailwindcss";
@import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,400..900;1,9..144,400..900&family=Poppins:wght@400;500;600;700&display=swap');

@theme {
  --color-cream: #FAF6F0;
  --color-cream-deep: #F2EBE0;
  --color-primary: #C8621A;
  --color-primary-light: #E8834A;
  --color-espresso: #1C1107;
  --color-charcoal: #2C1A0E;
  --color-stone: #8C7B6B;
  --font-family-display: 'Fraunces', serif;
  --font-family-sans: 'Poppins', sans-serif;
}
```
