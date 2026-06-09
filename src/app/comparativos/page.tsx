"use client";

import { useState } from "react";
import PageShell from "@/components/PageShell";
import { Card } from "@/components/ui";
import PeriodPicker from "@/components/PeriodPicker";
import { TrendingUp, TrendingDown, Lightbulb, ArrowRight, AlertTriangle, Sparkles, Send } from "lucide-react";
import type { PeriodValue } from "@/components/PeriodPicker";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const presets = [
  { label: "Mes en curso vs. mes anterior", from: "Mayo 2026", to: "Junio 2026" },
  { label: "Este trimestre vs. trimestre anterior", from: "Q1 2026", to: "Q2 2026" },
  { label: "Este año vs. año anterior", from: "2025", to: "2026" },
];

const metrics = [
  { label: "Ingresos", a: "$25,900", b: "$24,720", delta: "+4.8%", up: true },
  { label: "Egresos", a: "$16,500", b: "$15,920", delta: "+3.6%", up: false },
  { label: "Utilidad", a: "$9,400", b: "$8,800", delta: "+6.8%", up: true },
  { label: "Margen", a: "36.3%", b: "35.6%", delta: "+0.7 pts", up: true },
  { label: "Nómina", a: "$7,200", b: "$7,200", delta: "0.0%", up: true },
];

const insights = [
  "Los ingresos crecieron 4.8% frente al período anterior, impulsados por la línea de Regalías.",
  "El margen neto mejoró ligeramente (+0.7 pts), reflejando un mejor control de costos operativos.",
  "La línea de Ads mantiene una participación estable (~30%) sobre el total de ingresos.",
];

export default function ComparativosPage() {
  const [from, setFrom] = useState("Mayo 2026");
  const [to, setTo] = useState("Junio 2026");
  const [rangeA, setRangeA] = useState<[number, number] | null>(null);
  const [rangeB, setRangeB] = useState<[number, number] | null>(null);

  const overlap = !!(rangeA && rangeB && rangeA[0] <= rangeB[1] && rangeB[0] <= rangeA[1]);

  const [question, setQuestion] = useState("");
  const handleA = (v: PeriodValue) => { setFrom(v.label); setRangeA(v.range); };
  const handleB = (v: PeriodValue) => { setTo(v.label); setRangeB(v.range); };

  const numeric = (v: string) => Number(v.replace(/[^0-9.-]/g, "")) || 0;
  const chartData = metrics
    .filter((m) => m.label !== "Margen")
    .map((m) => ({ label: m.label, anterior: numeric(m.b), actual: numeric(m.a) }));

  return (
    <PageShell title="Comparativos">
      <div className="flex flex-wrap items-center gap-2">
        <span className="text-xs text-zinc-400 dark:text-zinc-500 mr-1">Atajos:</span>
        {presets.map((p) => (
          <button
            key={p.label}
            onClick={() => { setFrom(p.from); setTo(p.to); }}
            className="rounded-full border border-zinc-200 dark:border-zinc-800 px-3.5 py-1.5 text-sm text-zinc-500 dark:text-zinc-400 hover:border-zinc-300 dark:hover:border-zinc-700 hover:text-zinc-900 dark:hover:text-zinc-50 transition-colors"
          >
            {p.label}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <PeriodPicker title="Período A" defaultGranularity="Mes" onChange={handleA} />
        <PeriodPicker title="Período B" defaultGranularity="Mes" onChange={handleB} />
      </div>

      {overlap && (
        <Card className="border-amber-300/60 dark:border-amber-500/30">
          <div className="flex items-center gap-3 text-sm text-amber-600 dark:text-amber-400">
            <AlertTriangle size={18} strokeWidth={1.75} />
            <p>
              Los períodos <strong>A</strong> y <strong>B</strong> se solapan — elige rangos de tiempo que no coincidan
              para que la comparación sea válida.
            </p>
          </div>
        </Card>
      )}

      <Card>
        <div className="flex items-center justify-center gap-3 text-sm">
          <span className="font-medium text-zinc-900 dark:text-zinc-50">{from}</span>
          <ArrowRight size={16} className="text-zinc-400" />
          <span className="font-medium text-zinc-900 dark:text-zinc-50">{to}</span>
          <span className="text-zinc-400 dark:text-zinc-500">— comparando ambos períodos</span>
        </div>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 items-stretch">
        <Card title="Comparación de métricas">
          <p className="text-xs text-zinc-500 dark:text-zinc-400 -mt-2 mb-4">
            {from} vs. {to}
          </p>
          <div className="flex items-center justify-between mb-2">
            <span className="w-32 shrink-0" />
            <div className="flex-1 flex items-center gap-6">
              <span className="text-[11px] uppercase tracking-wide font-medium text-zinc-400 dark:text-zinc-500 w-24">Período A</span>
              <span className="text-[11px] uppercase tracking-wide font-medium text-zinc-400 dark:text-zinc-500 w-24">Período B</span>
              <span className="text-[11px] uppercase tracking-wide font-medium text-zinc-400 dark:text-zinc-500">Variación</span>
            </div>
          </div>
          <div className="space-y-4">
            {metrics.map(({ label, a, b, delta, up }) => (
              <div key={label} className="flex items-center justify-between">
                <span className="text-sm text-zinc-500 dark:text-zinc-400 w-32 shrink-0">{label}</span>
                <div className="flex-1 flex items-center gap-6">
                  <span className="text-sm font-medium text-zinc-900 dark:text-zinc-50 w-24">{a}</span>
                  <span className="text-sm text-zinc-400 w-24">{b}</span>
                  <span
                    className={`flex items-center gap-1 text-xs font-medium ${
                      up ? "text-emerald-600 dark:text-emerald-400" : "text-red-500 dark:text-red-400"
                    }`}
                  >
                    {up ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
                    {delta}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card title="Comparación visual">
          <p className="text-xs text-zinc-500 dark:text-zinc-400 -mt-2 mb-4">
            Barras agrupadas — {from} vs. {to}
          </p>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData} margin={{ top: 8, right: 8, left: -16, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="currentColor" className="text-zinc-100 dark:text-zinc-800" vertical={false} />
                <XAxis dataKey="label" tick={{ fontSize: 12 }} stroke="currentColor" className="text-zinc-400 dark:text-zinc-500" />
                <YAxis tick={{ fontSize: 12 }} stroke="currentColor" className="text-zinc-400 dark:text-zinc-500" />
                <Tooltip
                  contentStyle={{ borderRadius: 12, border: "1px solid var(--tw-border-opacity, #e4e4e7)", fontSize: 13 }}
                  cursor={{ fill: "rgba(0,0,0,0.04)" }}
                />
                <Legend verticalAlign="top" align="center" wrapperStyle={{ fontSize: 12, top: 0 }} />
                <Bar dataKey="anterior" name={from} fill="#a1a1aa" radius={[6, 6, 0, 0]} barSize={20} />
                <Bar dataKey="actual" name={to} fill="#27272a" radius={[6, 6, 0, 0]} barSize={20} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>

      <Card title="Insights automáticos">
        <div className="space-y-3">
          {insights.map((text, i) => (
            <div key={i} className="flex items-start gap-3">
              <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-500 dark:text-zinc-400">
                <Lightbulb size={14} strokeWidth={1.75} />
              </span>
              <p className="text-sm text-zinc-600 dark:text-zinc-300">{text}</p>
            </div>
          ))}
        </div>

        <form
          onSubmit={(e) => { e.preventDefault(); setQuestion(""); }}
          className="mt-5 flex items-center gap-2 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-800/60 px-3 py-2"
        >
          <Sparkles size={16} className="text-zinc-400 dark:text-zinc-500 shrink-0" />
          <input
            type="text"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder={`Pregunta algo sobre ${from} vs. ${to}…`}
            className="flex-1 bg-transparent text-sm text-zinc-700 dark:text-zinc-200 placeholder:text-zinc-400 dark:placeholder:text-zinc-500 outline-none"
          />
          <button
            type="submit"
            disabled={!question.trim()}
            className="flex items-center justify-center rounded-lg bg-zinc-900 dark:bg-zinc-50 text-white dark:text-zinc-900 p-1.5 disabled:opacity-30 transition-opacity"
          >
            <Send size={14} />
          </button>
        </form>
        <p className="mt-2 text-[11px] text-zinc-400 dark:text-zinc-500">
          Próximamente: respuestas generadas por IA a partir de los datos de los períodos seleccionados.
        </p>
      </Card>
    </PageShell>
  );
}
