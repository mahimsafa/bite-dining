# Bites Design Overhaul — Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Full visual overhaul of the Bites restaurant landing page — warm & modern, Fraunces serif headings, richer terracotta-amber palette, alternating dark/light sections, and a theatrical full-bleed Hero.

**Architecture:** Pure visual changes — no new components, no routing, no data layer changes. Every existing component is modified in-place. New design tokens live in `src/index.css`. No new dependencies needed beyond the Google Fonts import.

**Tech Stack:** React 19, TypeScript, Tailwind CSS v4, Poppins + Fraunces (Google Fonts via CSS @import)

---

## Task 1: Update Design Tokens in `src/index.css`

**Files:**
- Modify: `src/index.css`

**Step 1: Replace the entire file contents**

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

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: var(--font-family-sans);
  background-color: var(--color-cream);
  color: var(--color-charcoal);
  line-height: 1.6;
}

html {
  scroll-behavior: smooth;
}
```

**Step 2: Verify build still passes**

Run: `pnpm run build`  
Expected: no TypeScript or Tailwind errors

**Step 3: Commit**

```bash
git add src/index.css
git commit -m "feat: update design tokens — warm palette, Fraunces + Poppins fonts"
```

---

## Task 2: Update Header

**Files:**
- Modify: `src/components/Header/Header.tsx`

**Step 1: Replace the full component**

Key changes:
- Logo: `font-display` (Fraunces) italic, `text-4xl`
- Nav links: `text-sm uppercase tracking-widest`
- Mobile: full-height right-side drawer with overlay backdrop
- Scroll state: add `border-b border-stone/10` when scrolled

```tsx
import { useState, useEffect } from 'react';
import { FiMenu, FiX } from 'react-icons/fi';

const navLinks = ['About', 'Menu', 'Reviews', 'Blog', 'Contacts'];

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-cream/95 backdrop-blur-lg shadow-sm border-b border-stone/10'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <div className="flex-shrink-0">
              <h1 className="text-4xl font-bold italic font-display text-charcoal cursor-pointer tracking-tight">
                <span className="text-primary">B</span>ites
              </h1>
            </div>

            <nav className="hidden md:flex items-center gap-1">
              {navLinks.map((link) => (
                <a
                  key={link}
                  href={`#${link.toLowerCase()}`}
                  className="px-4 py-2 text-sm font-medium uppercase tracking-widest text-charcoal/70 hover:text-primary transition-colors rounded-lg hover:bg-primary/5"
                >
                  {link}
                </a>
              ))}
            </nav>

            <div className="hidden md:block">
              <button className="bg-primary text-white px-7 py-3 rounded-full font-semibold text-sm tracking-wide ring-1 ring-primary/30 hover:bg-primary-light hover:shadow-lg hover:shadow-primary/25 transition-all hover:-translate-y-0.5">
                Reserve Table
              </button>
            </div>

            <div className="md:hidden">
              <button
                onClick={() => setIsOpen(true)}
                className="text-charcoal p-2 hover:bg-primary/10 rounded-lg transition-colors"
                aria-label="Open menu"
              >
                <FiMenu size={24} />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile drawer backdrop */}
      <div
        className={`fixed inset-0 z-40 bg-espresso/50 backdrop-blur-sm md:hidden transition-opacity duration-300 ${
          isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setIsOpen(false)}
      />

      {/* Mobile drawer */}
      <div
        className={`fixed top-0 right-0 bottom-0 z-50 w-72 bg-cream shadow-2xl md:hidden transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between p-6 border-b border-stone/15">
          <h2 className="text-2xl font-bold italic font-display text-charcoal">
            <span className="text-primary">B</span>ites
          </h2>
          <button
            onClick={() => setIsOpen(false)}
            className="p-2 hover:bg-primary/10 rounded-lg transition-colors text-charcoal"
            aria-label="Close menu"
          >
            <FiX size={22} />
          </button>
        </div>
        <nav className="p-6 space-y-1">
          {navLinks.map((link) => (
            <a
              key={link}
              href={`#${link.toLowerCase()}`}
              className="block py-3 px-4 text-sm font-medium uppercase tracking-widest text-charcoal/70 hover:text-primary hover:bg-primary/5 rounded-xl transition-colors"
              onClick={() => setIsOpen(false)}
            >
              {link}
            </a>
          ))}
          <div className="pt-6">
            <button className="w-full bg-primary text-white px-6 py-3.5 rounded-full font-semibold text-sm tracking-wide hover:bg-primary-light transition-all">
              Reserve Table
            </button>
          </div>
        </nav>
      </div>
    </>
  );
}
```

**Step 2: Run lint**

Run: `pnpm run lint`  
Expected: no errors

**Step 3: Commit**

```bash
git add src/components/Header/Header.tsx
git commit -m "feat: redesign Header — Fraunces logo, refined nav, right-side mobile drawer"
```

---

## Task 3: Update Hero

**Files:**
- Modify: `src/components/Hero/Hero.tsx`

**Step 1: Replace the full component**

Key changes:
- Full-bleed viewport background image
- Dark gradient overlay left half: `from-espresso/85 via-espresso/50 to-transparent`
- H1 in Fraunces italic at `text-6xl md:text-7xl lg:text-8xl`
- "Taste" word in `text-primary-light` (lighter amber pops on dark)
- No circular image crop — image breathes freely on right
- CTAs: filled primary + white ghost
- Social proof anchored bottom-left of text column

```tsx
import { FiArrowRight, FiSearch } from 'react-icons/fi';

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Full-bleed background image */}
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1600&h=900&fit=crop"
          alt="Restaurant atmosphere"
          className="w-full h-full object-cover"
        />
        {/* Left-to-right dark gradient */}
        <div className="absolute inset-0 bg-gradient-to-r from-espresso/88 via-espresso/55 to-espresso/10" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-32 pt-40">
        <div className="max-w-2xl">
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
                  className="w-12 h-12 rounded-full border-3 border-cream/30 object-cover shadow-md"
                />
              ))}
              <div className="w-12 h-12 rounded-full border-3 border-cream/30 bg-primary flex items-center justify-center text-white font-bold text-xs shadow-md">
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
        </div>
      </div>
    </section>
  );
}
```

**Step 2: Run lint**

Run: `pnpm run lint`  
Expected: no errors

**Step 3: Commit**

```bash
git add src/components/Hero/Hero.tsx
git commit -m "feat: redesign Hero — full-bleed image, Fraunces italic headline, dark gradient overlay"
```

---

## Task 4: Update PopularDishes

**Files:**
- Modify: `src/components/PopularDishes/PopularDishes.tsx`

**Step 1: Replace the full component**

Key changes:
- Section bg: `bg-cream`
- Section heading uses `font-display` for H2
- Section label pill: border-based instead of bg fill
- Featured card: asymmetric layout, `rounded-2xl`, image `aspect-[4/3]`
- Regular cards: `rounded-2xl shadow-sm hover:shadow-xl hover:-translate-y-1`
- Price in `font-display font-bold text-primary`
- Remove duplicate star rating on cards (keep one clean location)

```tsx
import { FiStar, FiShoppingCart, FiHeart } from 'react-icons/fi';

interface Dish {
  id: number;
  name: string;
  price: number;
  image: string;
  rating: number;
  isFeatured?: boolean;
}

const dishes: Dish[] = [
  { id: 1, name: 'Creamy Pasta', price: 35, image: 'https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=600&h=450&fit=crop', rating: 5, isFeatured: true },
  { id: 2, name: 'Crispy Fries', price: 18, image: 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=400&h=300&fit=crop', rating: 5 },
  { id: 3, name: 'Classic Burger', price: 28, image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&h=300&fit=crop', rating: 4 },
  { id: 4, name: 'Margherita Pizza', price: 32, image: 'https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?w=400&h=300&fit=crop', rating: 5 },
];

export default function PopularDishes() {
  const featuredDish = dishes.find(d => d.isFeatured);
  const regularDishes = dishes.filter(d => !d.isFeatured);

  return (
    <section className="py-24 md:py-32 bg-cream" id="menu">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 md:mb-20">
          <span className="inline-block border border-primary/40 text-primary px-5 py-2 rounded-full text-xs font-semibold mb-5 tracking-widest uppercase">
            Popular Menu
          </span>
          <h2 className="text-4xl md:text-5xl font-bold font-display text-charcoal">
            Our Popular Dishes
          </h2>
          <p className="mt-4 text-stone max-w-2xl mx-auto text-lg">
            Discover our most loved selections, crafted with passion
          </p>
        </div>

        {featuredDish && (
          <div className="mb-10">
            <div className="relative bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-500 group">
              <div className="grid md:grid-cols-2 items-stretch">
                <div className="relative aspect-[4/3] md:aspect-auto overflow-hidden">
                  <img
                    src={featuredDish.image}
                    alt={featuredDish.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-espresso/50 via-transparent to-transparent" />
                  <div className="absolute top-5 left-5 bg-primary text-white px-4 py-1.5 rounded-full font-semibold text-xs tracking-wide shadow-md">
                    Chef's Pick
                  </div>
                </div>
                <div className="p-8 md:p-12 flex flex-col justify-center">
                  <h3 className="text-3xl md:text-4xl font-bold font-display text-charcoal mb-4">
                    {featuredDish.name}
                  </h3>
                  <div className="flex items-center gap-1.5 mb-6">
                    {[...Array(5)].map((_, i) => (
                      <FiStar
                        key={i}
                        className={`w-5 h-5 ${i < featuredDish.rating ? 'text-primary fill-primary' : 'text-stone/40'}`}
                      />
                    ))}
                    <span className="text-stone text-sm ml-2">({featuredDish.rating}.0)</span>
                  </div>
                  <p className="text-stone text-lg mb-8 leading-relaxed">
                    Our signature dish, crafted with love using the finest ingredients. A customer favorite that keeps them coming back for more.
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-4xl font-bold font-display text-primary">${featuredDish.price}</span>
                    <button className="bg-primary text-white px-8 py-4 rounded-full font-bold hover:bg-primary-light hover:shadow-lg hover:shadow-primary/30 transition-all flex items-center gap-3 hover:scale-105">
                      <FiShoppingCart className="w-5 h-5" />
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
              <button className="absolute top-5 right-5 w-11 h-11 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-md hover:bg-primary hover:text-white transition-all text-charcoal">
                <FiHeart className="w-5 h-5" />
              </button>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {regularDishes.map((dish) => (
            <div
              key={dish.id}
              className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <img
                  src={dish.image}
                  alt={dish.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-2.5 py-1 rounded-full flex items-center gap-1 shadow-sm">
                  <FiStar className="w-3.5 h-3.5 text-primary fill-primary" />
                  <span className="text-xs font-semibold text-charcoal">{dish.rating}.0</span>
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-espresso/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-5">
                  <button className="bg-white text-charcoal px-6 py-2.5 rounded-full font-semibold shadow-lg translate-y-3 group-hover:translate-y-0 transition-transform flex items-center gap-2 text-sm">
                    <FiShoppingCart className="w-4 h-4" />
                    Add to Cart
                  </button>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-lg font-bold text-charcoal group-hover:text-primary transition-colors">
                  {dish.name}
                </h3>
                <div className="flex items-center justify-between mt-4">
                  <span className="text-2xl font-bold font-display text-primary">${dish.price.toFixed(2)}</span>
                  <button className="w-11 h-11 bg-primary/10 text-primary rounded-full hover:bg-primary hover:text-white transition-all flex items-center justify-center hover:scale-105">
                    <FiShoppingCart className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-16">
          <button className="inline-flex items-center gap-3 border border-primary/40 text-primary px-8 py-3.5 rounded-full font-semibold hover:bg-primary hover:text-white hover:border-primary transition-all text-sm tracking-wide uppercase">
            View All Dishes
          </button>
        </div>
      </div>
    </section>
  );
}
```

**Step 2: Run lint**

Run: `pnpm run lint`  
Expected: no errors

**Step 3: Commit**

```bash
git add src/components/PopularDishes/PopularDishes.tsx
git commit -m "feat: redesign PopularDishes — rounded-2xl cards, Fraunces prices, refined hover"
```

---

## Task 5: Update ServiceInfo (Dark Section)

**Files:**
- Modify: `src/components/ServiceInfo/ServiceInfo.tsx`

**Step 1: Replace the full component**

Key changes:
- Background: `bg-espresso` (dark)
- Headings: `text-cream`, body: `text-stone`, accents: `text-primary`
- Remove blob backgrounds — use subtle dot texture instead
- Service cards: `bg-white/5 hover:bg-white/10 border border-white/8`
- Icon containers: `bg-primary/20 group-hover:bg-primary`
- Image: rectangular crop in a `rounded-2xl` frame (not circular)
- Floating badges updated to espresso-dark style

```tsx
import { FiShoppingBag, FiClock, FiShield, FiTruck, FiHeart, FiAward } from 'react-icons/fi';

const services = [
  { icon: FiShoppingBag, title: 'Online Order', description: 'Order easily through our website or app' },
  { icon: FiClock, title: '24/7 Service', description: 'We are available around the clock' },
  { icon: FiShield, title: 'Clean Kitchen', description: '100% hygiene guaranteed always' },
  { icon: FiTruck, title: 'Fast Delivery', description: 'Quick delivery right to your door' },
  { icon: FiHeart, title: 'Fresh Food', description: 'Made daily with fresh ingredients' },
  { icon: FiAward, title: 'Best Quality', description: 'Award-winning recipes and chefs' },
];

export default function ServiceInfo() {
  return (
    <section className="py-24 md:py-32 bg-espresso relative overflow-hidden" id="about">
      {/* Subtle dot texture */}
      <div
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(circle, #FAF6F0 1px, transparent 1px)`,
          backgroundSize: '28px 28px',
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center mb-16 md:mb-20">
          <span className="inline-block border border-primary/40 text-primary px-5 py-2 rounded-full text-xs font-semibold mb-5 tracking-widest uppercase">
            Why Choose Us
          </span>
          <h2 className="text-4xl md:text-5xl font-bold font-display text-cream">
            We Are More Than<br className="hidden md:block" /> A Restaurant
          </h2>
          <p className="mt-4 text-stone max-w-2xl mx-auto text-lg">
            What makes us special and different from the rest
          </p>
        </div>

        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-full max-w-md">
              <div className="rounded-2xl overflow-hidden shadow-2xl aspect-[4/5]">
                <img
                  src="https://images.unsplash.com/photo-1577219491135-ce391730fb2c?w=500&h=625&fit=crop"
                  alt="Professional Chef"
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="absolute -bottom-5 -right-5 bg-cream rounded-2xl shadow-xl p-5 flex items-center gap-4">
                <div className="w-12 h-12 bg-primary/15 rounded-xl flex items-center justify-center">
                  <FiAward className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <p className="font-bold text-charcoal text-lg font-display">15+ Years</p>
                  <p className="text-xs text-stone">Of Excellence</p>
                </div>
              </div>

              <div className="absolute -top-5 -left-5 bg-cream rounded-2xl shadow-xl p-4 flex items-center gap-3">
                <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center">
                  <FiShield className="w-5 h-5 text-green-600" />
                </div>
                <p className="font-bold text-green-700 text-sm">100% Safe</p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {services.map((service, index) => (
                <div
                  key={index}
                  className="group bg-white/5 border border-white/8 rounded-2xl p-6 hover:bg-white/10 hover:border-white/15 transition-all duration-300"
                >
                  <div className="w-14 h-14 bg-primary/20 rounded-xl flex items-center justify-center mb-5 group-hover:bg-primary transition-all">
                    <service.icon className="w-7 h-7 text-primary group-hover:text-white transition-colors" />
                  </div>
                  <h3 className="text-base font-bold text-cream mb-2">{service.title}</h3>
                  <p className="text-stone text-sm leading-relaxed">{service.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
```

**Step 2: Run lint**

Run: `pnpm run lint`  
Expected: no errors

**Step 3: Commit**

```bash
git add src/components/ServiceInfo/ServiceInfo.tsx
git commit -m "feat: redesign ServiceInfo — dark espresso section, rectangular image, refined cards"
```

---

## Task 6: Update MenuPack

**Files:**
- Modify: `src/components/MenuPack/MenuPack.tsx`

**Step 1: Replace the full component**

Key changes:
- Background: `bg-cream-deep`
- H2 uses `font-display`
- Filter tabs: minimal pill style with underline-indicator active state (not scale-105 jump)
- Cards: `rounded-2xl`, `aspect-[4/3]` images, Fraunces prices
- Remove duplicate star ratings on each card (cluttered)

```tsx
import { useState } from 'react';
import { FiShoppingCart, FiHeart } from 'react-icons/fi';

interface MenuItem {
  id: number;
  name: string;
  price: number;
  image: string;
  category: string;
  rating: number;
}

const menuItems: MenuItem[] = [
  { id: 1, name: 'Mexican Tacos', price: 28, image: 'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=400&h=300&fit=crop', category: 'Mexican', rating: 4 },
  { id: 2, name: 'Chicken Burrito', price: 32, image: 'https://images.unsplash.com/photo-1626700051175-6818013e1d4f?w=400&h=300&fit=crop', category: 'Mexican', rating: 5 },
  { id: 3, name: 'Classic Lasagna', price: 35, image: 'https://images.unsplash.com/photo-1574894709920-11b28e7367e3?w=400&h=300&fit=crop', category: 'Italian', rating: 5 },
  { id: 4, name: 'Cheese Ravioli', price: 30, image: 'https://images.unsplash.com/photo-1551183053-bf91a1d81141?w=400&h=300&fit=crop', category: 'Italian', rating: 4 },
  { id: 5, name: 'Dragon Roll', price: 38, image: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=400&h=300&fit=crop', category: 'Japanese', rating: 5 },
  { id: 6, name: 'Tonkotsu Ramen', price: 25, image: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=400&h=300&fit=crop', category: 'Japanese', rating: 4 },
  { id: 7, name: 'Shrimp Tempura', price: 28, image: 'https://images.unsplash.com/photo-1606850780554-b55ea4dd0b70?w=400&h=300&fit=crop', category: 'Japanese', rating: 5 },
  { id: 8, name: 'Pizza Margherita', price: 32, image: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=400&h=300&fit=crop', category: 'Italian', rating: 5 },
];

const categories = ['All', 'Mexican', 'Italian', 'Japanese'];

export default function MenuPack() {
  const [activeCategory, setActiveCategory] = useState('All');

  const filteredItems = activeCategory === 'All'
    ? menuItems
    : menuItems.filter(item => item.category === activeCategory);

  return (
    <section className="py-24 md:py-32 bg-cream-deep" id="menu">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 md:mb-20">
          <span className="inline-block border border-primary/40 text-primary px-5 py-2 rounded-full text-xs font-semibold mb-5 tracking-widest uppercase">
            Our Menu
          </span>
          <h2 className="text-4xl md:text-5xl font-bold font-display text-charcoal">
            Explore Our Menu
          </h2>
          <p className="mt-4 text-stone max-w-2xl mx-auto text-lg">
            A world of flavors, curated with care
          </p>
        </div>

        {/* Category filter */}
        <div className="flex justify-center gap-2 mb-14 flex-wrap">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-7 py-3 rounded-full font-semibold text-sm tracking-wide transition-all duration-200 ${
                activeCategory === category
                  ? 'bg-primary text-white shadow-lg shadow-primary/25'
                  : 'bg-white text-charcoal/70 border border-stone/25 hover:border-primary/40 hover:text-primary'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 left-3 bg-espresso/80 backdrop-blur-sm text-cream px-3 py-1 rounded-full text-xs font-semibold">
                  {item.category}
                </div>
                <button className="absolute top-3 right-3 w-9 h-9 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-sm opacity-0 group-hover:opacity-100 transition-all hover:bg-primary hover:text-white text-charcoal">
                  <FiHeart className="w-4 h-4" />
                </button>
              </div>
              <div className="p-5">
                <h3 className="font-bold text-charcoal group-hover:text-primary transition-colors">
                  {item.name}
                </h3>
                <div className="flex items-center justify-between mt-4">
                  <span className="text-2xl font-bold font-display text-primary">${item.price}</span>
                  <button className="bg-primary text-white p-3 rounded-full hover:bg-primary-light hover:shadow-md hover:shadow-primary/30 transition-all hover:scale-105">
                    <FiShoppingCart className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
```

**Step 2: Run lint**

Run: `pnpm run lint`  
Expected: no errors

**Step 3: Commit**

```bash
git add src/components/MenuPack/MenuPack.tsx
git commit -m "feat: redesign MenuPack — cream-deep bg, refined filter tabs, Fraunces prices"
```

---

## Task 7: Update ReservationCTA

**Files:**
- Modify: `src/components/ReservationCTA/ReservationCTA.tsx`

**Step 1: Replace the full component**

Key changes:
- Full-bleed restaurant image with `bg-espresso/75` overlay (not charcoal)
- Remove SVG dot pattern inline style — use CSS dot background
- Headline: Fraunces italic, large
- Stats: `bg-white/8 backdrop-blur-sm border border-white/10`

```tsx
import { FiCalendar, FiArrowRight, FiPhone, FiAward, FiUsers, FiHeart } from 'react-icons/fi';

export default function ReservationCTA() {
  return (
    <section className="py-24 md:py-32 relative overflow-hidden">
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1600&h=800&fit=crop"
          alt="Restaurant interior"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-espresso/78" />
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
        <div className="inline-flex items-center gap-2 bg-primary/20 border border-primary/30 text-primary px-5 py-2.5 rounded-full mb-8">
          <FiCalendar className="w-4 h-4" />
          <span className="font-semibold text-sm tracking-wide">Reserve Now</span>
        </div>

        <h2 className="font-display italic font-bold text-cream leading-tight text-4xl md:text-5xl lg:text-6xl">
          Do You Have A Dinner<br />Plan Tonight?{' '}
          <span className="text-primary-light not-italic">Reserve Your Table</span>
        </h2>

        <p className="mt-6 text-cream/60 text-lg max-w-2xl mx-auto leading-relaxed">
          Book your table now and enjoy an unforgettable dining experience with us. Limited seats available for tonight.
        </p>

        <div className="mt-12 flex flex-col sm:flex-row gap-4 justify-center">
          <button className="group bg-primary text-white px-10 py-5 rounded-full font-bold text-lg hover:bg-primary-light hover:shadow-2xl hover:shadow-primary/40 transition-all flex items-center justify-center gap-3 hover:-translate-y-1">
            Make Reservation
            <FiArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
          <button className="border-2 border-cream/25 text-cream px-10 py-5 rounded-full font-bold text-lg hover:bg-cream hover:text-charcoal hover:border-cream transition-all flex items-center justify-center gap-3">
            <FiPhone className="w-5 h-5" />
            +1 (555) 123-4567
          </button>
        </div>

        <div className="mt-20 grid grid-cols-3 gap-6 max-w-3xl mx-auto">
          {[
            { icon: FiAward, value: '15+', label: 'Years Experience' },
            { icon: FiUsers, value: '50+', label: 'Expert Chefs' },
            { icon: FiHeart, value: '10K+', label: 'Happy Customers' },
          ].map(({ icon: Icon, value, label }) => (
            <div key={label} className="bg-white/8 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:bg-white/12 transition-all">
              <div className="w-12 h-12 bg-primary/20 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Icon className="w-6 h-6 text-primary" />
              </div>
              <p className="text-3xl font-bold font-display text-cream">{value}</p>
              <p className="text-stone text-sm mt-2">{label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
```

**Step 2: Run lint + build**

Run: `pnpm run lint && pnpm run build`  
Expected: no errors

**Step 3: Commit**

```bash
git add src/components/ReservationCTA/ReservationCTA.tsx
git commit -m "feat: redesign ReservationCTA — Fraunces italic headline, refined glassmorphism stats"
```

---

## Task 8: Update Testimonials

**Files:**
- Modify: `src/components/Testimonials/Testimonials.tsx`

**Step 1: Replace the full component**

Key changes:
- Background: `bg-cream`
- Remove duplicate star row at bottom of each card (already shown in header)
- Cards: `rounded-2xl bg-white shadow-sm hover:shadow-lg`
- H2: `font-display`
- Remove blob backgrounds

```tsx
import { useState } from 'react';
import { FiStar, FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { FaQuoteRight } from 'react-icons/fa';

interface Review {
  id: number;
  name: string;
  image: string;
  rating: number;
  text: string;
}

const reviews: Review[] = [
  { id: 1, name: 'Sarah Johnson', image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&crop=face', rating: 5, text: 'Amazing food and excellent service! The pasta was absolutely delicious. Will definitely come back again.' },
  { id: 2, name: 'Michael Chen', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face', rating: 5, text: 'Best restaurant in town! The ambiance is perfect for a family dinner. Great experience overall.' },
  { id: 3, name: 'Emily Davis', image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face', rating: 5, text: 'The staff was very friendly and the food exceeded our expectations. Will be back soon!' },
  { id: 4, name: 'James Wilson', image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face', rating: 4, text: 'Wonderful ambiance and great food. The chef really knows how to balance flavors. Highly recommend!' },
];

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => setCurrentIndex((prev) => (prev + 1) % reviews.length);
  const prevSlide = () => setCurrentIndex((prev) => (prev - 1 + reviews.length) % reviews.length);

  const visibleReviews = [
    reviews[currentIndex],
    reviews[(currentIndex + 1) % reviews.length],
    reviews[(currentIndex + 2) % reviews.length],
  ];

  return (
    <section className="py-24 md:py-32 bg-cream" id="reviews">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 md:mb-20">
          <span className="inline-block border border-primary/40 text-primary px-5 py-2 rounded-full text-xs font-semibold mb-5 tracking-widest uppercase">
            Testimonials
          </span>
          <h2 className="text-4xl md:text-5xl font-bold font-display text-charcoal">
            What Our Guests Say
          </h2>
          <p className="mt-4 text-stone max-w-2xl mx-auto text-lg">
            Real reviews from our valued guests
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {visibleReviews.map((review) => (
            <div
              key={review.id}
              className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1 relative"
            >
              <FaQuoteRight className="absolute top-6 right-6 w-10 h-10 text-primary/10" />

              <div className="flex items-center gap-4 mb-6">
                <img
                  src={review.image}
                  alt={review.name}
                  className="w-14 h-14 rounded-full object-cover border-4 border-cream shadow-sm"
                />
                <div>
                  <h3 className="font-bold text-charcoal">{review.name}</h3>
                  <div className="flex items-center gap-1 mt-1">
                    {[...Array(5)].map((_, i) => (
                      <FiStar
                        key={i}
                        className={`w-3.5 h-3.5 ${i < review.rating ? 'text-primary fill-primary' : 'text-stone/30'}`}
                      />
                    ))}
                  </div>
                </div>
              </div>

              <p className="text-stone leading-relaxed text-sm">"{review.text}"</p>
            </div>
          ))}
        </div>

        <div className="flex justify-center gap-4 mt-12">
          <button
            onClick={prevSlide}
            className="w-12 h-12 bg-white border border-stone/20 rounded-full flex items-center justify-center hover:bg-primary hover:border-primary hover:text-white transition-all shadow-sm text-charcoal"
          >
            <FiChevronLeft className="w-5 h-5" />
          </button>
          <div className="flex items-center gap-2">
            {reviews.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  index === currentIndex ? 'bg-primary w-8' : 'bg-stone/30 w-2 hover:bg-primary/50'
                }`}
              />
            ))}
          </div>
          <button
            onClick={nextSlide}
            className="w-12 h-12 bg-white border border-stone/20 rounded-full flex items-center justify-center hover:bg-primary hover:border-primary hover:text-white transition-all shadow-sm text-charcoal"
          >
            <FiChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </section>
  );
}
```

**Step 2: Run lint**

Run: `pnpm run lint`  
Expected: no errors

**Step 3: Commit**

```bash
git add src/components/Testimonials/Testimonials.tsx
git commit -m "feat: redesign Testimonials — clean white cards, Fraunces heading, simplified layout"
```

---

## Task 9: Update BlogCard + Blog

**Files:**
- Modify: `src/components/BlogCard/BlogCard.tsx`
- Modify: `src/components/Blog/Blog.tsx`

**Step 1: Replace BlogCard**

Key changes:
- `rounded-2xl` (was `rounded-3xl`)
- `bg-white` (was `bg-cream`)
- Title: `font-display`
- Hover: `hover:-translate-y-1 hover:shadow-lg` (was `-translate-y-2 shadow-2xl`)
- Cleaner meta row

```tsx
import { FiArrowRight, FiClock, FiUser } from 'react-icons/fi';

export interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  image: string;
  date: string;
  author: string;
  category: string;
}

interface BlogCardProps {
  post: BlogPost;
}

export default function BlogCard({ post }: BlogCardProps) {
  return (
    <div className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
      <div className="relative aspect-video overflow-hidden">
        <img
          src={post.image}
          alt={post.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute top-4 left-4">
          <span className="bg-primary text-white px-3 py-1 rounded-full text-xs font-semibold shadow-sm tracking-wide">
            {post.category}
          </span>
        </div>
      </div>
      <div className="p-6">
        <div className="flex items-center gap-4 text-xs text-stone mb-4">
          <div className="flex items-center gap-1.5">
            <FiClock className="w-3.5 h-3.5" />
            <span>{post.date}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <FiUser className="w-3.5 h-3.5" />
            <span>{post.author}</span>
          </div>
        </div>
        <h3 className="text-lg font-bold font-display text-charcoal mb-3 group-hover:text-primary transition-colors leading-snug">
          {post.title}
        </h3>
        <p className="text-stone text-sm mb-5 leading-relaxed">{post.excerpt}</p>
        <button className="inline-flex items-center gap-2 text-primary font-semibold text-sm hover:gap-3 transition-all group/btn">
          Read More
          <FiArrowRight className="w-4 h-4 group-hover/btn:translate-x-0.5 transition-transform" />
        </button>
      </div>
    </div>
  );
}
```

**Step 2: Replace Blog section background**

Change `bg-white` to `bg-cream-deep` and update heading font:

```tsx
import BlogCard from '../BlogCard/BlogCard';
import type { BlogPost } from '../BlogCard/BlogCard';

const posts: BlogPost[] = [
  { id: 1, title: 'The Secret to Perfect Pasta', excerpt: 'Learn the techniques that make our pasta truly exceptional.', image: 'https://images.unsplash.com/photo-1551183053-bf91a1d81141?w=400&h=300&fit=crop', date: 'March 1, 2026', author: 'Chef Gordon', category: 'Recipes' },
  { id: 2, title: 'Seasonal Menu Highlights', excerpt: 'Discover the fresh ingredients we are using this spring.', image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400&h=300&fit=crop', date: 'February 25, 2026', author: 'Team Bites', category: 'News' },
  { id: 3, title: 'Behind the Scenes: Our Kitchen', excerpt: 'A look at how we maintain the highest hygiene standards.', image: 'https://images.unsplash.com/photo-1577219491135-ce391730fb2c?w=400&h=300&fit=crop', date: 'February 20, 2026', author: 'Manager', category: 'Behind the Scenes' },
];

export default function Blog() {
  return (
    <section className="py-24 md:py-32 bg-cream-deep" id="blog">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 md:mb-20">
          <span className="inline-block border border-primary/40 text-primary px-5 py-2 rounded-full text-xs font-semibold mb-5 tracking-widest uppercase">
            Our Blog
          </span>
          <h2 className="text-4xl md:text-5xl font-bold font-display text-charcoal">
            From Our Kitchen
          </h2>
          <p className="mt-4 text-stone max-w-2xl mx-auto text-lg">
            News, tips, and culinary insights from our team
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {posts.map((post) => (
            <BlogCard key={post.id} post={post} />
          ))}
        </div>
      </div>
    </section>
  );
}
```

**Step 3: Run lint**

Run: `pnpm run lint`  
Expected: no errors

**Step 4: Commit**

```bash
git add src/components/BlogCard/BlogCard.tsx src/components/Blog/Blog.tsx
git commit -m "feat: redesign Blog — cream-deep bg, Fraunces card titles, refined BlogCard"
```

---

## Task 10: Update Chefs (Dark Section)

**Files:**
- Modify: `src/components/Chefs/Chefs.tsx`

**Step 1: Replace the full component**

Key changes:
- Background: `bg-espresso` (dark)
- Cards: `bg-white/5 border border-white/10` — no white cards on dark bg
- Image: `aspect-[3/4]` (portrait, more editorial)
- Name in Fraunces, cream color; role in primary
- Social icons always visible (not hidden behind hover overlay)
- Same dot texture as ServiceInfo

```tsx
import { FiFacebook, FiTwitter, FiInstagram } from 'react-icons/fi';

interface Chef {
  id: number;
  name: string;
  role: string;
  image: string;
}

const chefs: Chef[] = [
  { id: 1, name: 'Gordon Ramsay', role: 'Head Chef', image: 'https://images.unsplash.com/photo-1577219491135-ce391730fb2c?w=400&h=533&fit=crop&crop=face' },
  { id: 2, name: 'Marco Pierre', role: 'Sous Chef', image: 'https://images.unsplash.com/photo-1581299894007-aaa50297cf16?w=400&h=533&fit=crop&crop=face' },
  { id: 3, name: 'Jamie Oliver', role: 'Pastry Chef', image: 'https://images.unsplash.com/photo-1595273670150-bd0c3c392e46?w=400&h=533&fit=crop&crop=face' },
  { id: 4, name: 'Thomas Keller', role: 'Grill Master', image: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=400&h=533&fit=crop&crop=face' },
];

export default function Chefs() {
  return (
    <section className="py-24 md:py-32 bg-espresso relative overflow-hidden" id="contacts">
      <div
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(circle, #FAF6F0 1px, transparent 1px)`,
          backgroundSize: '28px 28px',
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center mb-16 md:mb-20">
          <span className="inline-block border border-primary/40 text-primary px-5 py-2 rounded-full text-xs font-semibold mb-5 tracking-widest uppercase">
            Our Team
          </span>
          <h2 className="text-4xl md:text-5xl font-bold font-display text-cream">
            Meet Our Chefs
          </h2>
          <p className="mt-4 text-stone max-w-2xl mx-auto text-lg">
            The talented people behind our delicious dishes
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {chefs.map((chef) => (
            <div
              key={chef.id}
              className="group rounded-2xl overflow-hidden hover:-translate-y-1 transition-all duration-300"
            >
              <div className="relative aspect-[3/4] overflow-hidden rounded-2xl">
                <img
                  src={chef.image}
                  alt={chef.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-espresso/90 via-espresso/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <h3 className="text-lg font-bold font-display text-cream">{chef.name}</h3>
                  <p className="text-primary text-sm font-medium mt-1">{chef.role}</p>
                  <div className="flex gap-2 mt-4">
                    {[FiFacebook, FiTwitter, FiInstagram].map((Icon, i) => (
                      <button
                        key={i}
                        className="w-9 h-9 bg-white/15 backdrop-blur-sm rounded-full flex items-center justify-center text-cream hover:bg-primary transition-colors"
                      >
                        <Icon className="w-4 h-4" />
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
```

**Step 2: Run lint**

Run: `pnpm run lint`  
Expected: no errors

**Step 3: Commit**

```bash
git add src/components/Chefs/Chefs.tsx
git commit -m "feat: redesign Chefs — dark espresso section, portrait cards, gradient overlay info"
```

---

## Task 11: Update AppDownload

**Files:**
- Modify: `src/components/AppDownload/AppDownload.tsx`

**Step 1: Replace the full component**

Key changes:
- Background: `bg-cream`
- Phone mockup: `bg-espresso` framing (consistent with dark tokens)
- H2: `font-display`
- Store buttons: `bg-espresso hover:bg-primary`
- Remove blob background gradients

```tsx
import { FaApple, FaGooglePlay } from 'react-icons/fa';
import { FiArrowRight } from 'react-icons/fi';

export default function AppDownload() {
  return (
    <section className="py-24 md:py-32 bg-cream">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="relative flex justify-center order-2 lg:order-1">
            <div className="relative bg-espresso rounded-3xl p-6 shadow-2xl w-full max-w-sm">
              <div className="relative mx-auto max-w-[220px]">
                <div className="bg-espresso rounded-[2.5rem] p-3 pb-6 shadow-xl border-6 border-white/10">
                  <img
                    src="https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=300&h=550&fit=crop"
                    alt="Bites Mobile App"
                    className="w-full rounded-[2rem] object-cover"
                  />
                </div>
                <div className="absolute -bottom-3 -right-3 bg-primary text-white px-3 py-1.5 rounded-full font-bold text-xs shadow-md">
                  New v2.0
                </div>
              </div>

              <div className="mt-8 grid grid-cols-3 gap-3">
                {[
                  { value: '4.9', label: 'App Rating' },
                  { value: '1M+', label: 'Downloads' },
                  { value: '100+', label: 'Countries' },
                ].map(({ value, label }) => (
                  <div key={label} className="bg-white/8 rounded-xl p-3 text-center">
                    <p className="text-xl font-bold font-display text-primary">{value}</p>
                    <p className="text-xs text-stone mt-1">{label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="order-1 lg:order-2">
            <span className="inline-block border border-primary/40 text-primary px-5 py-2 rounded-full text-xs font-semibold mb-5 tracking-widest uppercase">
              Mobile App
            </span>
            <h2 className="text-4xl md:text-5xl font-bold font-display text-charcoal leading-tight">
              Order Anywhere,<br />Anytime
            </h2>
            <p className="mt-6 text-stone text-lg leading-relaxed">
              Get the best experience by downloading our app. Order food, make reservations, and earn rewards — all at your fingertips.
            </p>

            <div className="mt-10 flex flex-col sm:flex-row gap-4">
              <button className="group bg-espresso text-cream px-6 py-4 rounded-2xl flex items-center justify-center gap-3 hover:bg-primary transition-all hover:shadow-lg hover:shadow-primary/30 hover:-translate-y-0.5">
                <FaApple className="text-3xl" />
                <div className="text-left">
                  <p className="text-xs text-cream/60">Download on the</p>
                  <p className="font-bold">App Store</p>
                </div>
              </button>
              <button className="group bg-espresso text-cream px-6 py-4 rounded-2xl flex items-center justify-center gap-3 hover:bg-primary transition-all hover:shadow-lg hover:shadow-primary/30 hover:-translate-y-0.5">
                <FaGooglePlay className="text-2xl" />
                <div className="text-left">
                  <p className="text-xs text-cream/60">Get it on</p>
                  <p className="font-bold">Google Play</p>
                </div>
              </button>
            </div>

            <button className="mt-10 inline-flex items-center gap-2 text-primary font-semibold text-sm hover:gap-3 transition-all group">
              Learn More About the App
              <FiArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
```

**Step 2: Run lint**

Run: `pnpm run lint`  
Expected: no errors

**Step 3: Commit**

```bash
git add src/components/AppDownload/AppDownload.tsx
git commit -m "feat: redesign AppDownload — cream bg, espresso mockup, Fraunces heading"
```

---

## Task 12: Update Footer

**Files:**
- Modify: `src/components/Footer/Footer.tsx`

**Step 1: Replace the full component**

Key changes:
- Background: `bg-espresso` (same token as charcoal was)
- Logo: Fraunces italic
- Divider: `border-stone/20`
- Social icons: same dot-texture style as dark sections
- No visual regressions — same content structure

```tsx
import { FiFacebook, FiTwitter, FiInstagram, FiLinkedin, FiMapPin, FiPhone, FiMail } from 'react-icons/fi';

export default function Footer() {
  return (
    <footer className="bg-espresso pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          <div>
            <h3 className="text-3xl font-bold italic font-display text-cream">
              <span className="text-primary">B</span>ites
            </h3>
            <p className="mt-4 text-stone leading-relaxed text-sm">
              Serving the best food with love and passion. Experience culinary excellence at its finest.
            </p>
            <div className="mt-6 flex gap-3">
              {[FiFacebook, FiTwitter, FiInstagram, FiLinkedin].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="w-10 h-10 bg-white/8 border border-white/10 rounded-full flex items-center justify-center text-stone hover:bg-primary hover:border-primary hover:text-white transition-all"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-bold text-cream text-sm uppercase tracking-widest mb-6">Quick Links</h4>
            <ul className="space-y-3">
              {['About', 'Menu', 'Reviews', 'Blog', 'Contacts'].map((link) => (
                <li key={link}>
                  <a href={`#${link.toLowerCase()}`} className="text-stone hover:text-primary transition-colors text-sm">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-cream text-sm uppercase tracking-widest mb-6">Contact</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-stone text-sm">
                <FiMapPin className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                <span>123 Food Street, New York, NY 10001</span>
              </li>
              <li className="flex items-center gap-3 text-stone text-sm">
                <FiPhone className="w-4 h-4 text-primary shrink-0" />
                <span>+1 (555) 123-4567</span>
              </li>
              <li className="flex items-center gap-3 text-stone text-sm">
                <FiMail className="w-4 h-4 text-primary shrink-0" />
                <span>hello@bites.com</span>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-cream text-sm uppercase tracking-widest mb-6">Opening Hours</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex justify-between text-stone">
                <span>Mon – Thu</span>
                <span className="text-primary">11am – 10pm</span>
              </li>
              <li className="flex justify-between text-stone">
                <span>Fri – Sat</span>
                <span className="text-primary">11am – 11pm</span>
              </li>
              <li className="flex justify-between text-stone">
                <span>Sunday</span>
                <span className="text-primary">12pm – 9pm</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-stone/20">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-stone text-xs">
              © 2026 Bites Restaurant. All rights reserved.
            </p>
            <div className="flex gap-6 text-xs">
              <a href="#" className="text-stone hover:text-primary transition-colors">Privacy Policy</a>
              <a href="#" className="text-stone hover:text-primary transition-colors">Terms of Service</a>
              <a href="#" className="text-stone hover:text-primary transition-colors">Cookies</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
```

**Step 2: Final lint + build**

Run: `pnpm run lint && pnpm run build`  
Expected: clean pass, zero errors

**Step 3: Final commit**

```bash
git add src/components/Footer/Footer.tsx
git commit -m "feat: redesign Footer — Fraunces logo, espresso bg, refined typography"
```

---

## Final Verification

Run: `pnpm run lint && pnpm run build`  
Expected: clean build with no TypeScript or ESLint errors.

Open browser at `http://localhost:5173` and visually verify:
- [ ] Fraunces font loads for all headings
- [ ] New terracotta-amber primary color consistent across all sections
- [ ] Dark sections (ServiceInfo, Chefs) display `bg-espresso` correctly
- [ ] Hero full-bleed image with dark gradient visible
- [ ] Section rhythm alternates: cream → espresso → cream-deep → (CTA) → cream → cream-deep → espresso → cream → espresso
- [ ] All hover states work (lift, shadow, color transitions)
- [ ] Mobile header drawer slides in from right
- [ ] Footer matches espresso background
