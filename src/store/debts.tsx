'use client';

import { createContext, useContext, useState } from 'react';
import type { Debt, PayoffStrategy } from '@/src/types/debt';

interface DebtStore {
  debts: Debt[];
  strategy: PayoffStrategy;
  extraPayment: number;
  addDebt: (debt: Debt) => void;
  removeDebt: (id: string) => void;
  setStrategy: (s: PayoffStrategy) => void;
  setExtraPayment: (amount: number) => void;
}

const DebtContext = createContext<DebtStore | null>(null);

export function DebtProvider({ children }: { children: React.ReactNode }): React.JSX.Element {
  const [debts, setDebts] = useState<Debt[]>([]);
  const [strategy, setStrategy] = useState<PayoffStrategy>('avalanche');
  const [extraPayment, setExtraPayment] = useState(0);

  const addDebt = (debt: Debt) => setDebts((prev) => [...prev, debt]);
  const removeDebt = (id: string) => setDebts((prev) => prev.filter((d) => d.id !== id));

  return (
    <DebtContext.Provider value={{ debts, strategy, extraPayment, addDebt, removeDebt, setStrategy, setExtraPayment }}>
      {children}
    </DebtContext.Provider>
  );
}

export function useDebts(): DebtStore {
  const ctx = useContext(DebtContext);
  if (!ctx) throw new Error('useDebts must be used inside <DebtProvider>');
  return ctx;
}
