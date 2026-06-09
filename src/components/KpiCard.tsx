type Trend = "up" | "down" | "neutral";

export default function KpiCard({
  label,
  value,
  delta,
  trend = "neutral",
}: {
  label: string;
  value: string;
  delta?: string;
  trend?: Trend;
}) {
  const deltaColor =
    trend === "up"
      ? "text-emerald-600 dark:text-emerald-400"
      : trend === "down"
      ? "text-red-500 dark:text-red-400"
      : "text-zinc-400";

  return (
    <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 px-5 py-3">
      <p className="text-xs text-zinc-500 dark:text-zinc-400">{label}</p>
      <p className="mt-1 text-xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
        {value}
      </p>
      {delta && <p className={`mt-0.5 text-xs font-medium ${deltaColor}`}>{delta}</p>}
    </div>
  );
}
