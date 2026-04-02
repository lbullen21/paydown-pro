'use client';

import { useMemo } from 'react';
import { useDebts } from '@/src/store/debts';
import { calculatePayoff } from '@/src/lib/payoff';

export default function Results() {
  const { debts, strategy, extraPayment } = useDebts();

  const result = useMemo(
    () => calculatePayoff(debts, extraPayment, strategy),
    [debts, strategy, extraPayment],
  );

  if (debts.length === 0) return null;

  const years = Math.floor(result.totalMonths / 12);
  const months = result.totalMonths % 12;
  const timeLabel = [years > 0 && `${years}y`, months > 0 && `${months}mo`].filter(Boolean).join(' ');

  const payoffMonthByDebt = new Map<string, number>();
  for (const snap of result.schedule) {
    if (snap.balance === 0 && !payoffMonthByDebt.has(snap.debtId)) {
      payoffMonthByDebt.set(snap.debtId, snap.month);
    }
  }

  return (
    <div className="card">
      <span className="section-label">Projection</span>

      {/* Key stats */}
      <div className="mt-4 grid grid-cols-3 gap-2">
        <StatCard label="Debt-free" value={timeLabel || '—'} highlight />
        <StatCard label="Interest" value={`$${result.totalInterestPaid.toLocaleString(undefined, { maximumFractionDigits: 0 })}`} />
        <StatCard label="Months" value={String(result.totalMonths)} />
      </div>

      {/* Payoff order */}
      <div className="mt-5 pt-4" style={{ borderTop: '1px solid var(--border)' }}>
        <p className="mb-3 text-xs tracking-[0.15em] uppercase" style={{ color: 'var(--text-subtle)' }}>
          Payoff order
        </p>

        <div className="flex flex-col gap-1.5">
          {debts.map((debt, i) => {
            const mo = payoffMonthByDebt.get(debt.id) ?? result.totalMonths;
            const y = Math.floor(mo / 12);
            const m = mo % 12;
            const label = [y > 0 && `${y}y`, m > 0 && `${m}mo`].filter(Boolean).join(' ') || '< 1mo';

            return (
              <div
                key={debt.id}
                className="flex items-center gap-3 rounded-xl px-3 py-2.5"
                style={{
                  background: 'rgba(var(--accent-rgb), 0.03)',
                  border: '1px solid var(--border)',
                }}
              >
                {/* Rank badge */}
                <span
                  className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-xs font-medium"
                  style={{
                    background: 'rgba(var(--accent-rgb), 0.12)',
                    color: 'var(--accent)',
                  }}
                >
                  {i + 1}
                </span>

                {/* Debt name */}
                <span className="flex-1 truncate text-sm" style={{ color: 'var(--text)' }}>
                  {debt.name}
                </span>

                {/* Timing */}
                <div className="text-right shrink-0">
                  <p className="text-xs font-medium" style={{ color: 'var(--text-muted)' }}>
                    {label}
                  </p>
                  <p className="text-xs" style={{ color: 'var(--text-subtle)' }}>
                    mo. {mo}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function StatCard({ label, value, highlight }: { label: string; value: string; highlight?: boolean }) {
  return (
    <div
      className="flex flex-col gap-1 rounded-xl p-3"
      style={{ background: highlight ? 'rgba(var(--accent-rgb), 0.07)' : 'rgba(var(--accent-rgb), 0.02)' }}
    >
      <p className="text-xs uppercase tracking-[0.12em]" style={{ color: 'var(--text-subtle)' }}>
        {label}
      </p>
      <p
        className="text-xl leading-tight tracking-tight font-semibold"
        style={{ color: highlight ? 'var(--accent-bright)' : 'var(--text)' }}
      >
        {value}
      </p>
    </div>
  );
}
