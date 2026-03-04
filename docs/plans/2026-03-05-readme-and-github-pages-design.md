# README and GitHub Pages CI/CD — Design

**Date:** 2026-03-05  
**Project:** Bite Dining (restaurant website)

## Summary

- **README:** Single README for Bite Dining: project intro, stack, prerequisites, getting started, scripts, and manual deploy instructions.
- **CI/CD:** One GitHub Actions workflow, manually triggered only (`workflow_dispatch`), that runs lint, test, build, then deploys `dist/` to GitHub Pages.
- **Vite:** `base: '/bite-dining/'` so the app works when served at `https://<user>.github.io/bite-dining/`.

## README

- Title: Bite Dining — restaurant website.
- Tech: React 19, TypeScript, Vite, Tailwind CSS v4, pnpm.
- Prerequisites: Node (LTS), pnpm.
- Getting started: clone, `pnpm install`, `pnpm run dev`.
- Scripts table: dev, build, preview, lint, test, test:run, storybook.
- Deploy: manual run of "Deploy to GitHub Pages" workflow in Actions.
- Optional: brief structure note; point to AGENTS.md for conventions.

## CI/CD

- **Trigger:** `workflow_dispatch` only.
- **Workflow name:** Deploy to GitHub Pages.
- **Steps:** checkout → Node + pnpm setup → pnpm install (frozen lockfile) → lint → test:run → build → upload-pages-artifact → deploy-pages.
- **Permissions:** `pages: write`, `id-token: write`.
- **Repo:** github.com:mahimsafa/bite-dining.git. Pages source: GitHub Actions (user-configured).

## Vite base

- Set `base: '/bite-dining/'` in `vite.config.ts` for correct asset paths on GitHub Pages project site.
