"use client";

import { useEffect, useState } from "react";

const granularities = ["Día", "Mes", "Trimestre", "Año"] as const;
type Granularity = (typeof granularities)[number];

const months = [
  "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
  "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre",
];
const years = ["2023", "2024", "2025", "2026"];
const quarters = ["Q1", "Q2", "Q3", "Q4"];

const selectClass =
  "rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 px-2.5 py-1.5 text-sm text-zinc-700 dark:text-zinc-200";

// Convierte cada selección a un rango de días (timestamp) para poder comparar
// solapamientos entre granularidades distintas (ej. un día vs. un trimestre).
const dayMs = 86400000;
const toDays = (d: Date) => Math.floor(d.getTime() / dayMs);
const monthRange = (monthName: string, year: string) => {
  const m = months.indexOf(monthName);
  const y = Number(year);
  return [toDays(new Date(y, m, 1)), toDays(new Date(y, m + 1, 0))] as [number, number];
};
const quarterRange = (q: string, year: string) => {
  const qi = quarters.indexOf(q);
  const y = Number(year);
  return [toDays(new Date(y, qi * 3, 1)), toDays(new Date(y, qi * 3 + 3, 0))] as [number, number];
};
const yearRange = (year: string) => {
  const y = Number(year);
  return [toDays(new Date(y, 0, 1)), toDays(new Date(y, 11, 31))] as [number, number];
};
const days31 = Array.from({ length: 31 }, (_, i) => String(i + 1));
const dayRange = (monthName: string, year: string, from: string, to: string) => {
  const m = months.indexOf(monthName);
  const y = Number(year);
  const a = toDays(new Date(y, m, Number(from)));
  const b = toDays(new Date(y, m, Number(to)));
  return [Math.min(a, b), Math.max(a, b)] as [number, number];
};

export type PeriodValue = { granularity: Granularity; label: string; range: [number, number] };

export default function PeriodPicker({
  title,
  defaultGranularity = "Mes",
  onChange,
}: {
  title: string;
  defaultGranularity?: Granularity;
  defaultLabel?: string;
  onChange?: (value: PeriodValue) => void;
}) {
  const [granularity, setGranularity] = useState<Granularity>(defaultGranularity);

  // Estado independiente por granularidad — cada modo conserva su propio "desde" y "hasta"
  const [dayMonth, setDayMonth] = useState("Junio");
  const [dayYear, setDayYear] = useState("2026");
  const [dayFrom, setDayFrom] = useState("1");
  const [dayTo, setDayTo] = useState("8");
  const [monthFrom, setMonthFrom] = useState("Abril");
  const [monthTo, setMonthTo] = useState("Junio");
  const [monthYear, setMonthYear] = useState("2026");
  const [quarterFrom, setQuarterFrom] = useState("Q1");
  const [quarterTo, setQuarterTo] = useState("Q2");
  const [quarterYear, setQuarterYear] = useState("2026");
  const [yearFrom, setYearFrom] = useState("2024");
  const [yearTo, setYearTo] = useState("2026");

  const build = (g: Granularity): PeriodValue => {
    switch (g) {
      case "Día":
        return {
          granularity: g,
          label: `${dayMonth} ${dayFrom} — ${dayTo}, ${dayYear}`,
          range: dayRange(dayMonth, dayYear, dayFrom, dayTo),
        };
      case "Mes": {
        const r1 = monthRange(monthFrom, monthYear);
        const r2 = monthRange(monthTo, monthYear);
        return {
          granularity: g,
          label: `${monthFrom} — ${monthTo} ${monthYear}`,
          range: [Math.min(r1[0], r2[0]), Math.max(r1[1], r2[1])],
        };
      }
      case "Trimestre": {
        const r1 = quarterRange(quarterFrom, quarterYear);
        const r2 = quarterRange(quarterTo, quarterYear);
        return {
          granularity: g,
          label: `${quarterFrom} — ${quarterTo} ${quarterYear}`,
          range: [Math.min(r1[0], r2[0]), Math.max(r1[1], r2[1])],
        };
      }
      case "Año": {
        const r1 = yearRange(yearFrom);
        const r2 = yearRange(yearTo);
        return {
          granularity: g,
          label: `${yearFrom} — ${yearTo}`,
          range: [Math.min(r1[0], r2[0]), Math.max(r1[1], r2[1])],
        };
      }
    }
  };

  const current = build(granularity);
  // Re-emite cada vez que cambia cualquier parte de la selección — evita closures obsoletas
  useEffect(() => {
    onChange?.(current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [granularity, dayMonth, dayYear, dayFrom, dayTo, monthFrom, monthTo, monthYear, quarterFrom, quarterTo, quarterYear, yearFrom, yearTo]);

  return (
    <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-5">
      <h3 className="text-sm font-medium text-zinc-900 dark:text-zinc-50">{title}</h3>

      <div className="mt-3 flex flex-wrap gap-1.5">
        {granularities.map((g) => (
          <button
            key={g}
            onClick={() => setGranularity(g)}
            className={`rounded-full border px-3 py-1 text-xs transition-colors ${
              granularity === g
                ? "border-zinc-900 dark:border-zinc-50 bg-zinc-900 dark:bg-zinc-50 text-white dark:text-zinc-900 font-medium"
                : "border-zinc-200 dark:border-zinc-800 text-zinc-500 dark:text-zinc-400 hover:border-zinc-300 dark:hover:border-zinc-700"
            }`}
          >
            {g}
          </button>
        ))}
      </div>

      <div className="mt-4 flex flex-wrap items-center gap-2">
        {granularity === "Día" && (
          <>
            <select value={dayMonth} onChange={(e) => setDayMonth(e.target.value)} className={selectClass}>
              {months.map((m) => <option key={m}>{m}</option>)}
            </select>
            <select value={dayFrom} onChange={(e) => setDayFrom(e.target.value)} className={selectClass}>
              {days31.map((d) => <option key={d}>{d}</option>)}
            </select>
            <span className="text-xs text-zinc-400">hasta</span>
            <select value={dayTo} onChange={(e) => setDayTo(e.target.value)} className={selectClass}>
              {days31.map((d) => <option key={d}>{d}</option>)}
            </select>
            <select value={dayYear} onChange={(e) => setDayYear(e.target.value)} className={selectClass}>
              {years.map((y) => <option key={y}>{y}</option>)}
            </select>
          </>
        )}

        {granularity === "Mes" && (
          <>
            <select value={monthFrom} onChange={(e) => { setMonthFrom(e.target.value); }} className={selectClass}>
              {months.map((m) => <option key={m}>{m}</option>)}
            </select>
            <span className="text-xs text-zinc-400">hasta</span>
            <select value={monthTo} onChange={(e) => { setMonthTo(e.target.value); }} className={selectClass}>
              {months.map((m) => <option key={m}>{m}</option>)}
            </select>
            <select value={monthYear} onChange={(e) => { setMonthYear(e.target.value); }} className={selectClass}>
              {years.map((y) => <option key={y}>{y}</option>)}
            </select>
          </>
        )}

        {granularity === "Trimestre" && (
          <>
            <select value={quarterFrom} onChange={(e) => { setQuarterFrom(e.target.value); }} className={selectClass}>
              {quarters.map((q) => <option key={q}>{q}</option>)}
            </select>
            <span className="text-xs text-zinc-400">hasta</span>
            <select value={quarterTo} onChange={(e) => { setQuarterTo(e.target.value); }} className={selectClass}>
              {quarters.map((q) => <option key={q}>{q}</option>)}
            </select>
            <select value={quarterYear} onChange={(e) => { setQuarterYear(e.target.value); }} className={selectClass}>
              {years.map((y) => <option key={y}>{y}</option>)}
            </select>
          </>
        )}

        {granularity === "Año" && (
          <>
            <select value={yearFrom} onChange={(e) => { setYearFrom(e.target.value); }} className={selectClass}>
              {years.map((y) => <option key={y}>{y}</option>)}
            </select>
            <span className="text-xs text-zinc-400">hasta</span>
            <select value={yearTo} onChange={(e) => { setYearTo(e.target.value); }} className={selectClass}>
              {years.map((y) => <option key={y}>{y}</option>)}
            </select>
          </>
        )}
      </div>

      <p className="mt-3 text-xs text-zinc-400 dark:text-zinc-500">
        Período seleccionado: <span className="text-zinc-600 dark:text-zinc-300 font-medium">{current.label}</span>
      </p>
    </div>
  );
}
