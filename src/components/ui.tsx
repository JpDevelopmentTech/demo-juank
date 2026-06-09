import { Plus } from "lucide-react";

// Botón "+ Nuevo ..." reutilizable — ancho fijo para que se vea igual en todos los módulos,
// sin importar si el texto es "Nuevo ingreso", "Nuevo empleado", etc.
export function NewItemButton({ label }: { label: string }) {
  return (
    <button className="flex items-center justify-center gap-2 rounded-lg bg-zinc-900 dark:bg-zinc-50 text-white dark:text-zinc-900 w-44 px-4 py-2 text-sm font-medium hover:bg-zinc-800 dark:hover:bg-zinc-200 transition-colors">
      <Plus size={16} strokeWidth={2} />
      {label}
    </button>
  );
}

export function Card({
  title,
  action,
  children,
  className = "",
}: {
  title?: string;
  action?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-5 ${className}`}>
      {(title || action) && (
        <div className="flex items-center justify-between mb-4">
          {title && <h3 className="text-sm font-medium text-zinc-900 dark:text-zinc-50">{title}</h3>}
          {action}
        </div>
      )}
      {children}
    </div>
  );
}

const badgeStyles: Record<string, string> = {
  gray: "bg-zinc-100 text-zinc-600 dark:bg-zinc-800 dark:text-zinc-300",
  green: "bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400",
  red: "bg-red-50 text-red-600 dark:bg-red-500/10 dark:text-red-400",
  amber: "bg-amber-50 text-amber-600 dark:bg-amber-500/10 dark:text-amber-400",
};

export function Badge({ children, color = "gray" }: { children: React.ReactNode; color?: keyof typeof badgeStyles }) {
  return (
    <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${badgeStyles[color]}`}>
      {children}
    </span>
  );
}

// Muestra el valor en US y COP de una transacción, resaltando con fondo gris
// la moneda en la que realmente se registró/pagó (la "original").
export function DualValue({ usd, cop, original }: { usd: string; cop: string; original: "USD" | "COP" }) {
  const chip = (label: string, value: string, isOriginal: boolean) => (
    <span
      className={`inline-flex items-center gap-1 rounded-md px-1.5 py-0.5 ${
        isOriginal ? "bg-zinc-200/70 dark:bg-zinc-700/60 font-medium text-zinc-900 dark:text-zinc-50" : "text-zinc-400 dark:text-zinc-500"
      }`}
      title={isOriginal ? "Moneda en la que se registró esta transacción" : undefined}
    >
      {value} <span className="text-[10px]">{label}</span>
    </span>
  );

  return (
    <span className="inline-flex flex-col gap-0.5 leading-tight">
      {chip("USD", usd, original === "USD")}
      {chip("COP", cop, original === "COP")}
    </span>
  );
}

export function Table({
  columns,
  rows,
}: {
  columns: string[];
  rows: React.ReactNode[][];
}) {
  return (
    <div className="overflow-x-auto -mx-1">
      <table className="w-full text-sm">
        <thead>
          <tr className="text-left text-xs text-zinc-400 dark:text-zinc-500 uppercase tracking-wide">
            {columns.map((c) => (
              <th key={c} className="px-3 py-2 font-medium">
                {c}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr
              key={i}
              className="border-t border-zinc-100 dark:border-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-800/40 transition-colors"
            >
              {row.map((cell, j) => (
                <td key={j} className="px-3 py-3 text-zinc-700 dark:text-zinc-200">
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
