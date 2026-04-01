import { DebtProvider } from '@/src/store/debts';
import DebtForm from '@/src/components/DebtForm';
import DebtList from '@/src/components/DebtList';
import StrategyToggle from '@/src/components/StrategyToggle';
import Results from '@/src/components/Results';

export default function Home() {
  return (
    <DebtProvider>
      <div className="relative z-10 flex flex-col min-h-screen">

        {/* Header */}
        <header style={{ borderBottom: '1px solid rgba(201, 168, 76, 0.1)' }} className="px-6 py-5 lg:px-10">
          <div className="mx-auto flex max-w-6xl items-end justify-between">
            <div>
              <h1
                className="text-4xl tracking-tight leading-none"
                style={{ fontFamily: 'var(--font-dm-serif)', color: '#f0ebe0' }}
              >
                Paydown <span style={{ color: '#c9a84c' }}>Pro</span>
              </h1>
              <p
                className="mt-1 text-xs tracking-[0.18em] uppercase"
                style={{ color: '#3a4455' }}
              >
                Debt Payoff Simulator
              </p>
            </div>

            <div className="hidden sm:flex items-center gap-2 text-xs" style={{ color: '#3a4455' }}>
              <span
                className="h-1.5 w-1.5 rounded-full"
                style={{ backgroundColor: '#4caf82', boxShadow: '0 0 6px rgba(76,175,130,0.6)' }}
              />
              <span style={{ color: '#7a8799' }}>Strategy active</span>
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
          style={{ borderTop: '1px solid rgba(201, 168, 76, 0.07)', color: '#2d3748' }}
        >
          Paydown Pro · All figures are estimates for planning purposes only
        </footer>

      </div>
    </DebtProvider>
  );
}
