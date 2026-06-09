import PageShell from "@/components/PageShell";
import KpiCard from "@/components/KpiCard";
import EvolutionChart from "@/components/charts/EvolutionChart";
import BreakdownChart from "@/components/charts/BreakdownChart";
import AlertsPanel from "@/components/AlertsPanel";
import PayrollPanel from "@/components/PayrollPanel";

const ingresosBreakdown = [
  { name: "Regalías", value: 12400 },
  { name: "Ads", value: 7800 },
  { name: "Music Business", value: 5700 },
];

const egresosBreakdown = [
  { name: "Nómina", value: 7200 },
  { name: "Operación", value: 3100 },
  { name: "Ads", value: 2600 },
  { name: "Music Business", value: 1900 },
  { name: "Otros", value: 1700 },
];

export default function Home() {
  return (
    <PageShell title="Home" noScroll>
      {/* KPIs */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 shrink-0">
            <KpiCard label="Ingresos Brutos Totales" value="$25,900" delta="+4.8% vs mes anterior" trend="up" />
            <KpiCard label="Egresos Totales" value="$16,500" delta="+3.7% vs mes anterior" trend="down" />
            <KpiCard label="Utilidad Neta" value="$9,400" delta="-17.5% vs mes anterior" trend="down" />
            <KpiCard label="Nómina Total" value="$7,200" delta="Sin variación" trend="neutral" />
          </section>

          {/* Evolution + Indicators/Payroll */}
          <section className="grid grid-cols-1 lg:grid-cols-3 gap-3 flex-1 min-h-0">
            <div className="lg:col-span-2 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-4 flex flex-col min-h-0">
              <h3 className="text-sm font-medium text-zinc-900 dark:text-zinc-50">
                Evolución Financiera
              </h3>
              <p className="text-xs text-zinc-500 dark:text-zinc-400">
                Ingresos vs. egresos — últimos 6 meses
              </p>
              <div className="mt-2 flex-1 min-h-0">
                <EvolutionChart />
              </div>
            </div>
            <div className="min-h-0">
              <PayrollPanel />
            </div>
          </section>

          {/* Distribution + Alerts */}
          <section className="grid grid-cols-1 lg:grid-cols-3 gap-3 flex-1 min-h-0">
            <BreakdownChart title="Distribución de Ingresos" data={ingresosBreakdown} />
            <BreakdownChart title="Distribución de Egresos" data={egresosBreakdown} />
            <AlertsPanel />
      </section>
    </PageShell>
  );
}
