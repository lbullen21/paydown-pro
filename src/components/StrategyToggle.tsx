'use client';

import { useDebts } from '@/src/store/debts';
import type { PayoffStrategy } from '@/src/types/debt';

const options: { value: PayoffStrategy; label: string; description: string }[] = [
  { value: 'avalanche', label: 'Avalanche', description: 'Pay highest APR first — minimises total interest' },
  { value: 'snowball', label: 'Snowball', description: 'Pay smallest balance first — builds momentum' },
];

export default function StrategyToggle() {
  const { strategy, setStrategy, extraPayment, setExtraPayment } = useDebts();

  return (
    <div className="flex flex-col gap-4 rounded-xl border border-zinc-200 bg-white p-5 shadow-sm dark:border-zinc-700 dark:bg-zinc-900">
      <h2 className="text-sm font-semibold uppercase tracking-wide text-zinc-500">Strategy</h2>
      <div className="flex gap-3">
        {options.map((opt) => (
          <button
            key={opt.value}
            onClick={() => setStrategy(opt.value)}
            className={`flex-1 rounded-lg border px-4 py-3 text-left transition-colors ${
              strategy === opt.value
                ? 'border-blue-500 bg-blue-50 text-blue-700 dark:bg-blue-950 dark:text-blue-300'
                : 'border-zinc-200 hover:border-zinc-300 dark:border-zinc-700'
            }`}
          >
            <p className="font-medium">{opt.label}</p>
            <p className="text-xs text-zinc-500 dark:text-zinc-400">{opt.description}</p>
          </button>
        ))}
      </div>
      <label className="flex flex-col gap-1">
        <span className="text-sm font-medium">Extra monthly payment</span>
        <div className="flex items-center gap-2">
          <span className="text-zinc-400">$</span>
          <input
            type="number"
            min="0"
            step="1"
            value={extraPayment}
            onChange={(e) => setExtraPayment(Math.max(0, parseFloat(e.target.value) || 0))}
            className="input w-32"
          />
        </div>
      </label>
    </div>
  );
}
