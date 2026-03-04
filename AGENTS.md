# AGENTS.md - Facetory Frontend

React 19 + TypeScript (strict) + Vite + Tailwind CSS v4. Package manager: **pnpm**.

## Commands
```bash
pnpm run dev           # Vite dev server with HMR
pnpm run build         # tsc -b && vite build (type-check + production build)
pnpm run lint          # ESLint on all files — run before marking tasks done
pnpm run test:run      # Vitest once (CI)
pnpm run test          # Vitest watch mode
pnpm run test:ui       # Vitest interactive UI
npx vitest run src/components/Header.test.tsx  # Run a single test file
pnpm run storybook     # Storybook dev on :6006
```

## Before Marking Complete
1. `pnpm run lint` — no errors
2. `pnpm run build` — must succeed (also runs `tsc -b`)

## Code Style
- **Components**: `export default function ComponentName()` — default export, named function, PascalCase file (`Header.tsx`)
- **No React import needed** — React 19 automatic JSX transform
- **`import type`** required for type-only imports (`verbatimModuleSyntax: true`)
- **Imports**: external packages first, then relative; no barrel/index re-exports; relative paths only (no `@/` alias)
- **Strings**: single quotes in TS/JS; double quotes inside JSX attributes
- **Semicolons**: always; 2-space indent; no Prettier config — follow existing style
- **Types**: interfaces for data shapes; no `any`; `noUnusedLocals`/`noUnusedParameters` are errors; `erasableSyntaxOnly: true` (no decorator metadata)
- **Naming**: PascalCase components/interfaces, camelCase variables/functions/files for utilities
- **Styling**: Tailwind utility classes only — no inline styles, no CSS modules; custom tokens in `src/index.css` `@theme` block (`cream` #FDFBF7, `primary` #F5A623, `charcoal` #2D2D2D); Tailwind v4 has no `tailwind.config.*` file
- **State**: `useState`/`useEffect` for local state; always include `useEffect` cleanup when adding event listeners
- **Async**: wrap in try/catch; no `console.log` in committed code
- **Tests**: colocate test files with components (`Component.test.tsx`); use Vitest + React Testing Library
