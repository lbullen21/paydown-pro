'use client';

import { useState } from 'react';
import { useDebts } from '@/src/store/debts';
import type { Debt } from '@/src/types/debt';

const empty = { name: '', balance: '', interestRate: '', minimumPayment: '' };

const FIELDS = [
  { key: 'name' as const,           label: 'Debt name',     placeholder: 'e.g. Chase Sapphire', type: 'text'   },
  { key: 'balance' as const,        label: 'Balance',        placeholder: '0.00',                type: 'number', prefix: '$' },
  { key: 'interestRate' as const,   label: 'APR',            placeholder: '0.00',                type: 'number', suffix: '%' },
  { key: 'minimumPayment' as const, label: 'Min. payment',   placeholder: '0.00',                type: 'number', prefix: '$' },
];

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
    <div className="card">
      {/* Section header with decorative lines */}
      <div className="mb-5 flex items-center gap-3">
        <div className="h-px flex-1" style={{ background: 'linear-gradient(90deg, rgba(var(--accent-rgb),0.35) 0%, transparent 100%)' }} />
        <span className="section-label">Add a Debt</span>
        <div className="h-px flex-1" style={{ background: 'linear-gradient(270deg, rgba(var(--accent-rgb),0.35) 0%, transparent 100%)' }} />
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          {FIELDS.map(({ key, label, placeholder, type, prefix, suffix }) => (
            <div key={key} className="flex flex-col gap-1.5">
              <label className="text-xs font-medium tracking-wide" style={{ color: 'var(--text-muted)' }}>
                {label}
              </label>
              <div className="relative">
                {prefix && (
                  <span
                    className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-sm"
                    style={{ color: 'var(--text-subtle)' }}
                  >
                    {prefix}
                  </span>
                )}
                <input
                  className="input"
                  style={{
                    paddingLeft: prefix ? '1.875rem' : undefined,
                    paddingRight: suffix ? '2rem' : undefined,
                  }}
                  placeholder={placeholder}
                  type={type}
                  min={type === 'number' ? '0' : undefined}
                  step={type === 'number' ? '0.01' : undefined}
                  value={fields[key]}
                  onChange={set(key)}
                  required
                />
                {suffix && (
                  <span
                    className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-sm"
                    style={{ color: 'var(--text-subtle)' }}
                  >
                    {suffix}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>

        <button type="submit" className="btn-primary self-end mt-1">
          Add Debt
        </button>
      </form>
    </div>
  );
}
