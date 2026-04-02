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

A debt payoff simulator. Users add debts, choose a payoff strategy (avalanche or snowball), set an extra monthly payment, and see a month-by-month payoff schedule.

**Key technology choices:**
- Next.js 16.2.1 App Router (not Pages Router)
- React 19
- TypeScript with strict mode
- Tailwind CSS v4 (configured via `@tailwindcss/postcss` in `postcss.config.mjs` — no `tailwind.config.*` file)
- ESLint flat config (`eslint.config.mjs`)
- No external state management library — uses React context (`store/debts.tsx`)

**Import alias:** `@/` maps to the project root.

**Fonts:** Inter (all UI, weights 300–700) and Geist (weight 300, header only) loaded via `next/font/google` in `app/layout.tsx`, exposed as `--font-inter` and `--font-geist`. Tailwind theme aliases: `--font-sans`, `--font-mono` → Inter; `--font-display` → Geist.

**Theme:** Slate + Emerald dark-only palette. Always dark regardless of user OS setting.

**Design tokens:** All defined as CSS custom properties in `app/globals.css`. Never use raw hex values in components — always use a token:
- `--bg`, `--surface`, `--surface-2` — background layers
- `--border`, `--border-strong` — border colours
- `--accent`, `--accent-bright`, `--accent-rgb` — emerald accent (use `rgba(var(--accent-rgb), 0.X)` for opacity variants)
- `--text`, `--text-muted`, `--text-subtle` — text hierarchy
- `--danger`, `--danger-rgb` — destructive/error states
- `--success` — positive states
- `--card-shadow` — box shadow (none in dark, subtle in light)

**Global CSS classes:** Defined as Tailwind `@layer components` in `app/globals.css`:
- `.card` — surface card with gradient background and emerald top-edge shimmer
- `.input` — styled text/number input
- `.btn-primary` — emerald gradient submit button
- `.section-label` — small uppercase emerald label

## Feature structure

| Path | Purpose |
|---|---|
| `types/debt.ts` | Shared TypeScript types: `Debt`, `PayoffStrategy`, `MonthSnapshot`, `PayoffResult` |
| `lib/payoff.ts` | Pure `calculatePayoff(debts, extraPayment, strategy)` — no React, safe to unit test |
| `store/debts.tsx` | `DebtProvider` context + `useDebts()` hook — holds debts list, strategy, extra payment |
| `components/DebtForm.tsx` | Controlled form to add a debt |
| `components/DebtList.tsx` | Renders debt list with remove buttons |
| `components/StrategyToggle.tsx` | Avalanche/snowball toggle + extra payment input |
| `components/Results.tsx` | Calls `calculatePayoff` via `useMemo`, renders payoff schedule |
| `app/page.tsx` | Server component — wraps everything in `<DebtProvider>` |

All components are Client Components (`'use client'`) because they consume the context or handle events. `lib/payoff.ts` and `types/debt.ts` are framework-agnostic.

**Next.js docs:** Before writing any Next.js code, check `node_modules/next/dist/docs/` — this version may differ from training data.
