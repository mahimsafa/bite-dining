# Bite Dining

Restaurant website — React 19, TypeScript, Vite, Tailwind CSS v4.

## Tech stack

- React 19, TypeScript (strict)
- Vite 7, Tailwind CSS v4
- Vitest, React Testing Library, Storybook
- pnpm

## Prerequisites

- [Node.js](https://nodejs.org/) (LTS)
- [pnpm](https://pnpm.io/): `npm install -g pnpm`

## Getting started

```bash
git clone https://github.com/mahimsafa/bite-dining.git
cd bite-dining
pnpm install
pnpm run dev
```

Open [http://localhost:5173](http://localhost:5173).

## Scripts

| Command           | Description                    |
|-------------------|--------------------------------|
| `pnpm run dev`    | Dev server with HMR            |
| `pnpm run build`  | Type-check + production build  |
| `pnpm run preview`| Preview production build       |
| `pnpm run lint`   | Run ESLint                     |
| `pnpm run test`   | Vitest watch mode              |
| `pnpm run test:run` | Vitest once (CI)             |
| `pnpm run storybook` | Storybook on port 6006     |

## Deploy (GitHub Pages)

Deployment is **manual**. To publish:

1. Open the repo on GitHub → **Actions**.
2. Select **Deploy to GitHub Pages**.
3. Click **Run workflow** → **Run workflow**.

The workflow runs lint, tests, and build, then deploys the `dist/` output to GitHub Pages. Ensure **Settings → Pages → Build and deployment** uses **GitHub Actions** as the source.

## Project structure

- `src/components/` — React components (e.g. Header, Hero, Footer).
- `src/hooks/` — Custom hooks.
- Conventions and agent guidance: see **AGENTS.md**.
