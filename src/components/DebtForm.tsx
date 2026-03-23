'use client';

import { useState } from 'react';
import { useDebts } from '@/src/store/debts';
import type { Debt } from '@/src/types/debt';

const empty = { name: '', balance: '', interestRate: '', minimumPayment: '' };

export default function DebtForm() {
  const { addDebt } = useDebts();
  const [fields, setFields] = useState(empty);

  const set = (key: keyof typeof empty) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setFields((f) => ({ ...f, [key]: e.target.value }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const debt: Debt = {
      id: crypto.randomUUID(),
      name: fields.name.trim(),
      balance: parseFloat(fields.balance),
      interestRate: parseFloat(fields.interestRate),
      minimumPayment: parseFloat(fields.minimumPayment),
    };
    if (!debt.name || isNaN(debt.balance) || isNaN(debt.interestRate) || isNaN(debt.minimumPayment)) return;
    addDebt(debt);
    setFields(empty);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3 rounded-xl border border-zinc-200 bg-white p-5 shadow-sm dark:border-zinc-700 dark:bg-zinc-900">
      <h2 className="text-sm font-semibold uppercase tracking-wide text-zinc-500">Add a debt</h2>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        <input
          className="input"
          placeholder="Name"
          value={fields.name}
          onChange={set('name')}
          required
        />
        <input
          className="input"
          placeholder="Balance ($)"
          type="number"
          min="0"
          step="0.01"
          value={fields.balance}
          onChange={set('balance')}
          required
        />
        <input
          className="input"
          placeholder="APR (%)"
          type="number"
          min="0"
          step="0.01"
          value={fields.interestRate}
          onChange={set('interestRate')}
          required
        />
        <input
          className="input"
          placeholder="Min. payment ($)"
          type="number"
          min="0"
          step="0.01"
          value={fields.minimumPayment}
          onChange={set('minimumPayment')}
          required
        />
      </div>
      <button type="submit" className="btn-primary self-end">
        Add Debt
      </button>
    </form>
  );
}
