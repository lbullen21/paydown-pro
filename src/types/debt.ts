export type PayoffStrategy = 'avalanche' | 'snowball';

export interface Debt {
  id: string;
  name: string;
  balance: number;
  interestRate: number; // annual percentage, e.g. 19.99
  minimumPayment: number;
}

export interface MonthSnapshot {
  month: number;
  debtId: string;
  balance: number;
  interestCharged: number;
  payment: number;
}

export interface PayoffResult {
  schedule: MonthSnapshot[];
  totalMonths: number;
  totalInterestPaid: number;
}
