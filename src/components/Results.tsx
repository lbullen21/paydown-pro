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

  // Build per-debt payoff month for summary table.
  const payoffMonthByDebt = new Map<string, number>();
  for (const snap of result.schedule) {
    if (snap.balance === 0 && !payoffMonthByDebt.has(snap.debtId)) {
      payoffMonthByDebt.set(snap.debtId, snap.month);
    }
  }

  return (
    <div className="flex flex-col gap-4 rounded-xl border border-zinc-200 bg-white p-5 shadow-sm dark:border-zinc-700 dark:bg-zinc-900">
      <h2 className="text-sm font-semibold uppercase tracking-wide text-zinc-500">Results</h2>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
        <Stat label="Debt-free in" value={timeLabel || '—'} />
        <Stat label="Total interest" value={`$${result.totalInterestPaid.toLocaleString(undefined, { maximumFractionDigits: 0 })}`} />
        <Stat label="Total months" value={String(result.totalMonths)} />
      </div>

      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-zinc-200 text-left text-xs text-zinc-500 dark:border-zinc-700">
            <th className="pb-2 font-medium">Debt</th>
            <th className="pb-2 font-medium">Paid off</th>
          </tr>
        </thead>
        <tbody>
          {debts.map((debt) => {
            const mo = payoffMonthByDebt.get(debt.id) ?? result.totalMonths;
            const y = Math.floor(mo / 12);
            const m = mo % 12;
            const label = [y > 0 && `${y}y`, m > 0 && `${m}mo`].filter(Boolean).join(' ') || '< 1mo';
            return (
              <tr key={debt.id} className="border-b border-zinc-100 dark:border-zinc-800">
                <td className="py-2">{debt.name}</td>
                <td className="py-2 text-zinc-500">Month {mo} ({label})</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col gap-1">
      <p className="text-xs text-zinc-500">{label}</p>
      <p className="text-xl font-semibold">{value}</p>
    </div>
  );
}
