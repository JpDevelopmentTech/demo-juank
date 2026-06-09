import { AlertTriangle, FileWarning, Clock } from "lucide-react";

const alerts = [
  {
    icon: FileWarning,
    title: "Movimientos sin soporte",
    detail: "7 movimientos pendientes de documentación",
    level: "Alto",
  },
  {
    icon: AlertTriangle,
    title: "Riesgo documental",
    detail: "$4,230 en egresos sin comprobante",
    level: "Medio",
  },
  {
    icon: Clock,
    title: "Pendientes por revisar",
    detail: "12 movimientos en estado 'Registrado'",
    level: "Bajo",
  },
];

const levelStyles: Record<string, string> = {
  Alto: "bg-red-50 text-red-600 dark:bg-red-500/10 dark:text-red-400",
  Medio: "bg-amber-50 text-amber-600 dark:bg-amber-500/10 dark:text-amber-400",
  Bajo: "bg-zinc-100 text-zinc-500 dark:bg-zinc-800 dark:text-zinc-400",
};

export default function AlertsPanel() {
  return (
    <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-5 flex flex-col min-h-0 h-full overflow-hidden">
      <h3 className="shrink-0 text-sm font-medium text-zinc-900 dark:text-zinc-50">Alertas</h3>
      <div className="mt-4 space-y-3 overflow-y-auto min-h-0">
        {alerts.map(({ icon: Icon, title, detail, level }) => (
          <div key={title} className="flex items-start gap-3">
            <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-500 dark:text-zinc-400">
              <Icon size={15} strokeWidth={1.75} />
            </span>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between gap-2">
                <p className="text-sm font-medium text-zinc-900 dark:text-zinc-50 truncate">{title}</p>
                <span className={`shrink-0 rounded-full px-2 py-0.5 text-[11px] font-medium ${levelStyles[level]}`}>
                  {level}
                </span>
              </div>
              <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">{detail}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
