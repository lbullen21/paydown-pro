import { DebtProvider } from '@/src/store/debts';
import DebtForm from '@/src/components/DebtForm';
import DebtList from '@/src/components/DebtList';
import StrategyToggle from '@/src/components/StrategyToggle';
import Results from '@/src/components/Results';

export default function Home() {
  return (
    <DebtProvider>
      <div className="relative z-10 flex flex-col min-h-screen" suppressHydrationWarning>

        {/* Header */}
        <header style={{ borderBottom: '1px solid var(--border)' }} className="px-6 py-5 lg:px-10">
          <div className="mx-auto flex max-w-6xl items-end justify-between">
            <div>
              <h1
                className="text-4xl leading-none"
                style={{ fontFamily: 'var(--font-geist)', fontWeight: 300, color: 'var(--text)', letterSpacing: '-0.01em' }}
              >
                Paydown <span style={{ color: 'var(--accent)' }}>Pro</span>
              </h1>
              <p
                className="mt-1 text-xs tracking-[0.18em] uppercase"
                style={{ color: 'var(--text-subtle)' }}
              >
                Debt Payoff Simulator
              </p>
            </div>
          </div>
        </header>

        {/* Main content */}
        <main className="mx-auto w-full max-w-6xl flex-1 px-6 py-8 lg:px-10">
          <div className="grid grid-cols-1 gap-5 lg:grid-cols-[1fr_380px]">

            {/* Left column — debt entry */}
            <div className="flex flex-col gap-5">
              <DebtForm />
              <DebtList />
            </div>

            {/* Right column — strategy + results */}
            <div className="flex flex-col gap-5">
              <StrategyToggle />
              <Results />
            </div>

          </div>
        </main>

        {/* Footer */}
        <footer
          className="px-6 py-4 text-center text-xs"
          style={{ borderTop: '1px solid var(--border)', color: 'var(--text-subtle)' }}
        >
          Paydown Pro · All figures are estimates for planning purposes only
        </footer>

      </div>
    </DebtProvider>
  );
}
