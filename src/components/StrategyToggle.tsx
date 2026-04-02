'use client';

import { useDebts } from '@/src/store/debts';
import type { PayoffStrategy } from '@/src/types/debt';

const OPTIONS: { value: PayoffStrategy; label: string; description: string; glyph: string }[] = [
  {
    value: 'avalanche',
    label: 'Avalanche',
    description: 'Highest APR first — minimises total interest paid',
    glyph: '▲',
  },
  {
    value: 'snowball',
    label: 'Snowball',
    description: 'Smallest balance first — builds repayment momentum',
    glyph: '●',
  },
];

export default function StrategyToggle() {
  const { strategy, setStrategy, extraPayment, setExtraPayment } = useDebts();

  return (
    <div className="card">
      <span className="section-label">Strategy</span>

      {/* Strategy cards */}
      <div className="mt-4 flex flex-col gap-2">
        {OPTIONS.map((opt) => {
          const active = strategy === opt.value;
          return (
            <button
              key={opt.value}
              onClick={() => setStrategy(opt.value)}
              className="flex items-start gap-3.5 rounded-xl px-4 py-3.5 text-left transition-all duration-150"
              style={{
                background: active ? 'rgba(var(--accent-rgb), 0.07)' : 'rgba(var(--accent-rgb), 0.02)',
                border: active ? '1px solid var(--border-strong)' : '1px solid var(--border)',
              }}
            >
              {/* Icon */}
              <span
                className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-lg text-xs"
                style={{
                  background: active ? 'rgba(var(--accent-rgb), 0.18)' : 'rgba(var(--accent-rgb), 0.06)',
                  color: active ? 'var(--accent)' : 'var(--text-subtle)',
                }}
              >
                {opt.glyph}
              </span>

              {/* Text */}
              <div className="flex-1">
                <p className="text-sm font-medium" style={{ color: active ? 'var(--accent-bright)' : 'var(--text-muted)' }}>
                  {opt.label}
                </p>
                <p className="mt-0.5 text-xs leading-relaxed" style={{ color: active ? 'var(--accent)' : 'var(--text-subtle)' }}>
                  {opt.description}
                </p>
              </div>

              {/* Active indicator */}
              {active && (
                <span className="shrink-0 text-xs font-semibold" style={{ color: 'var(--accent)' }}>
                  ✓
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Extra payment */}
      <div className="mt-4 pt-4" style={{ borderTop: '1px solid var(--border)' }}>
        <label className="flex flex-col gap-2">
          <span className="text-xs font-medium tracking-wide" style={{ color: 'var(--text-muted)' }}>
            Extra monthly payment
          </span>
          <div className="relative">
            <span
              className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-sm"
              style={{ color: 'var(--text-subtle)' }}
            >
              $
            </span>
            <input
              type="number"
              min="0"
              step="1"
              value={extraPayment}
              onChange={(e) => setExtraPayment(Math.max(0, parseFloat(e.target.value) || 0))}
              className="input w-full"
              style={{ paddingLeft: '1.875rem' }}
            />
          </div>
        </label>
      </div>
    </div>
  );
}
