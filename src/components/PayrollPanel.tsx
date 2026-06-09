import { Wallet } from "lucide-react";

const today = new Date();
const todayLabel = today.toLocaleDateString("es-CO", { day: "2-digit", month: "long", year: "numeric" });

// Ordenados por cercanía de fecha de pago — el más próximo siempre arriba
const payments = [
  { name: "Equipo Producción", role: "Nómina fija", date: "10 Jun 2026", amount: "$5,200.00", urgent: true },
  { name: "Maluma — Equipo", role: "Honorarios", date: "12 Jun 2026", amount: "$1,800.00", urgent: true },
  { name: "Karol G — Equipo", role: "Honorarios", date: "15 Jun 2026", amount: "$2,400.00", urgent: false },
  { name: "+Vallenato — Equipo", role: "Honorarios", date: "18 Jun 2026", amount: "$1,150.00", urgent: false },
  { name: "Beéle — Equipo", role: "Honorarios", date: "20 Jun 2026", amount: "$980.00", urgent: false },
  { name: "Silvestre Dangond — Equipo", role: "Honorarios", date: "25 Jun 2026", amount: "$1,400.00", urgent: false },
  { name: "Equipo Producción", role: "Bono mensual", date: "30 Jun 2026", amount: "$900.00", urgent: false },
];

export default function PayrollPanel() {
  return (
    <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-5 flex flex-col min-h-0 h-full">
      <div className="flex items-center justify-between shrink-0">
        <h3 className="text-sm font-medium text-zinc-900 dark:text-zinc-50">Próximos pagos de Nómina</h3>
        <span className="text-xs text-zinc-400 dark:text-zinc-500">Hoy: {todayLabel}</span>
      </div>
      <div className="mt-4 space-y-3 overflow-y-auto pr-1">
        {payments.map((p, i) => (
          <div key={i} className="flex items-start gap-3">
            <span
              className={`mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${
                p.urgent
                  ? "bg-amber-50 text-amber-600 dark:bg-amber-500/10 dark:text-amber-400"
                  : "bg-zinc-100 text-zinc-500 dark:bg-zinc-800 dark:text-zinc-400"
              }`}
            >
              <Wallet size={15} strokeWidth={1.75} />
            </span>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between gap-2">
                <p className="text-sm font-medium text-zinc-900 dark:text-zinc-50 truncate">{p.name}</p>
                <span className="shrink-0 text-sm font-medium text-zinc-900 dark:text-zinc-50">{p.amount}</span>
              </div>
              <div className="flex items-center justify-between gap-2 mt-0.5">
                <p className="text-xs text-zinc-500 dark:text-zinc-400">{p.role}</p>
                <span className={`text-xs ${p.urgent ? "text-amber-600 dark:text-amber-400 font-medium" : "text-zinc-400 dark:text-zinc-500"}`}>
                  {p.date}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
