import type { Debt, MonthSnapshot, PayoffResult, PayoffStrategy } from '@/src/types/debt';

/**
 * Simulates debt payoff month-by-month using either the avalanche
 * (highest APR first) or snowball (lowest balance first) strategy.
 *
 * @param debts         List of debts to pay off.
 * @param extraPayment  Additional monthly payment beyond all minimums.
 * @param strategy      'avalanche' | 'snowball'
 */
export function calculatePayoff(
  debts: Debt[],
  extraPayment: number,
  strategy: PayoffStrategy,
): PayoffResult {
  if (debts.length === 0) return { schedule: [], totalMonths: 0, totalInterestPaid: 0 };

  // Work with mutable copies of balances.
  const balances = new Map<string, number>(debts.map((d) => [d.id, d.balance]));

  const schedule: MonthSnapshot[] = [];
  let totalInterestPaid = 0;
  let month = 0;
  const MAX_MONTHS = 600; // 50-year safety cap

  while (month < MAX_MONTHS) {
    const remaining = debts.filter((d) => (balances.get(d.id) ?? 0) > 0);
    if (remaining.length === 0) break;

    month++;

    // Determine priority debt (gets the extra payment).
    const priority = [...remaining].sort((a, b) => {
      if (strategy === 'avalanche') return b.interestRate - a.interestRate;
      return (balances.get(a.id) ?? 0) - (balances.get(b.id) ?? 0);
    })[0];

    for (const debt of remaining) {
      const balance = balances.get(debt.id) ?? 0;
      const monthlyRate = debt.interestRate / 100 / 12;
      const interest = balance * monthlyRate;
      totalInterestPaid += interest;

      const extra = debt.id === priority.id ? extraPayment : 0;
      const payment = Math.min(balance + interest, debt.minimumPayment + extra);
      const newBalance = balance + interest - payment;

      balances.set(debt.id, Math.max(0, newBalance));

      schedule.push({ month, debtId: debt.id, balance: Math.max(0, newBalance), interestCharged: interest, payment });
    }
  }

  return { schedule, totalMonths: month, totalInterestPaid };
}
