const indicators = [
  { label: "Margen Neto", value: 36.3, suffix: "%" },
  { label: "Peso de Nómina / Ingresos", value: 28.1, suffix: "%" },
  { label: "Costo Operativo / Ingresos", value: 17.4, suffix: "%" },
];

export default function IndicatorsPanel() {
  return (
    <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-5">
      <h3 className="text-sm font-medium text-zinc-900 dark:text-zinc-50">Indicadores</h3>
      <div className="mt-4 space-y-4">
        {indicators.map(({ label, value, suffix }) => (
          <div key={label}>
            <div className="flex items-center justify-between text-sm">
              <span className="text-zinc-500 dark:text-zinc-400">{label}</span>
              <span className="font-medium text-zinc-900 dark:text-zinc-50">
                {value}
                {suffix}
              </span>
            </div>
            <div className="mt-1.5 h-1.5 w-full rounded-full bg-zinc-100 dark:bg-zinc-800">
              <div
                className="h-1.5 rounded-full bg-zinc-900 dark:bg-zinc-50"
                style={{ width: `${value}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
