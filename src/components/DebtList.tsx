'use client';

import { useDebts } from '@/src/store/debts';

export default function DebtList() {
  const { debts, removeDebt } = useDebts();

  if (debts.length === 0) {
    return (
      <div
        className="flex flex-col items-center justify-center rounded-2xl py-10 text-center"
        style={{ border: '1px dashed var(--border)' }}
      >
        <div
          className="mb-3 flex h-10 w-10 items-center justify-center rounded-full text-lg"
          style={{
            background: 'rgba(var(--accent-rgb), 0.06)',
            border: '1px solid rgba(var(--accent-rgb), 0.15)',
            color: 'rgba(var(--accent-rgb), 0.4)',
          }}
        >
          ◎
        </div>
        <p className="text-sm" style={{ color: 'var(--text-muted)' }}>No debts added yet</p>
        <p className="mt-0.5 text-xs" style={{ color: 'var(--text-subtle)' }}>Fill in the form above to get started.</p>
      </div>
    );
  }

  const total = debts.reduce((sum, d) => sum + d.balance, 0);

  return (
    <div className="card">
      {/* Header */}
      <div className="mb-4 flex items-center justify-between">
        <span className="section-label">Your Debts</span>
        <span className="text-xs" style={{ color: 'var(--text-subtle)' }}>
          {debts.length} debt{debts.length !== 1 ? 's' : ''}&ensp;·&ensp;
          <span style={{ color: 'var(--text-muted)' }}>
            ${total.toLocaleString(undefined, { maximumFractionDigits: 0 })}
          </span>{' '}
          <span style={{ color: 'var(--text-subtle)' }}>total</span>
        </span>
      </div>

      {/* Debt rows */}
      <ul className="flex flex-col gap-2">
        {debts.map((debt) => (
          <li
            key={debt.id}
            className="flex items-center justify-between rounded-xl px-4 py-3 transition-all"
            style={{
              background: 'rgba(var(--accent-rgb), 0.03)',
              border: '1px solid var(--border)',
            }}
          >
            <div className="flex-1 min-w-0 mr-4">
              <p className="truncate text-sm font-medium" style={{ color: 'var(--text)' }}>
                {debt.name}
              </p>
              <p
                className="mt-0.5 text-xs tracking-wide"
                style={{ color: 'var(--text-subtle)' }}
              >
                ${debt.balance.toLocaleString()}&ensp;·&ensp;{debt.interestRate}% APR&ensp;·&ensp;${debt.minimumPayment}/mo
              </p>
            </div>

            <button
              onClick={() => removeDebt(debt.id)}
              className="shrink-0 rounded-lg px-2.5 py-1 text-xs font-medium transition-all"
              style={{
                color: 'var(--danger)',
                border: '1px solid rgba(var(--danger-rgb), 0.18)',
                background: 'rgba(var(--danger-rgb), 0.04)',
              }}
              aria-label={`Remove ${debt.name}`}
            >
              Remove
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
