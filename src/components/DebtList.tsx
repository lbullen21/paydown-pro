'use client';

import { useDebts } from '@/src/store/debts';

export default function DebtList() {
  const { debts, removeDebt } = useDebts();

  if (debts.length === 0) {
    return <p className="text-sm text-zinc-400">No debts added yet.</p>;
  }

  return (
    <ul className="flex flex-col gap-2">
      {debts.map((debt) => (
        <li
          key={debt.id}
          className="flex items-center justify-between rounded-lg border border-zinc-200 bg-white px-4 py-3 dark:border-zinc-700 dark:bg-zinc-900"
        >
          <div>
            <p className="font-medium">{debt.name}</p>
            <p className="text-sm text-zinc-500">
              ${debt.balance.toLocaleString()} · {debt.interestRate}% APR · ${debt.minimumPayment}/mo min
            </p>
          </div>
          <button
            onClick={() => removeDebt(debt.id)}
            className="text-sm text-red-500 hover:text-red-700"
            aria-label={`Remove ${debt.name}`}
          >
            Remove
          </button>
        </li>
      ))}
    </ul>
  );
}
