# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

@AGENTS.md

## Commands

```bash
npm run dev      # Start development server
npm run build    # Production build
npm run lint     # Run ESLint
npm run start    # Start production server
```

There is no test runner configured yet.

## Architecture

This is a **Next.js 16.2.1** app using the **App Router** (`/app` directory). It is currently a fresh scaffold — no application logic has been implemented yet.

**Key technology choices:**
- Next.js App Router (not Pages Router)
- React 19
- TypeScript with strict mode
- Tailwind CSS v4 (configured via `@tailwindcss/postcss` in `postcss.config.mjs` — no `tailwind.config.*` file)
- ESLint flat config (`eslint.config.mjs`)

**Import alias:** `@/` maps to the project root (e.g., `@/app/...`, `@/components/...`).

**Fonts:** Geist and Geist Mono loaded via `next/font` in `app/layout.tsx`, exposed as CSS variables (`--font-geist-sans`, `--font-geist-mono`).

**Next.js docs:** Before writing any Next.js code, check `node_modules/next/dist/docs/` — this version may differ from training data.
