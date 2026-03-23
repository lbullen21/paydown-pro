import { DebtProvider } from '@/src/store/debts';
import DebtForm from '@/src/components/DebtForm';
import DebtList from '@/src/components/DebtList';
import StrategyToggle from '@/src/components/StrategyToggle';
import Results from '@/src/components/Results';

export default function Home() {
  return (
    <DebtProvider>
      <main className="mx-auto flex w-full max-w-2xl flex-col gap-6 px-4 py-12">
        <header>
          <h1 className="text-2xl font-bold tracking-tight">Paydown Pro</h1>
          <p className="mt-1 text-sm text-zinc-500">Simulate your debt payoff with avalanche or snowball strategy.</p>
        </header>

        <DebtForm />
        <DebtList />
        <StrategyToggle />
        <Results />
      </main>
    </DebtProvider>
  );
}
