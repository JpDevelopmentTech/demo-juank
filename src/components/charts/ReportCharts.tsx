"use client";

import { useState } from "react";
import {
  AreaChart, Area, BarChart, Bar, LineChart, Line, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
} from "recharts";
import { Badge } from "@/components/ui";
import { LayoutGrid, AlignLeft } from "lucide-react";

const grid = <CartesianGrid strokeDasharray="3 3" stroke="currentColor" className="text-zinc-100 dark:text-zinc-800" vertical={false} />;
const axisProps = { tick: { fontSize: 12 }, stroke: "currentColor", className: "text-zinc-400 dark:text-zinc-500" };
const tooltipStyle = { contentStyle: { borderRadius: 12, border: "1px solid #e4e4e7", fontSize: 13 }, cursor: { fill: "rgba(0,0,0,0.04)" } };

// ---------- P&L — Área apilada ----------
const plData = [
  { mes: "Ene", ingresos: 16200, egresos: 9800, utilidad: 6400 },
  { mes: "Feb", ingresos: 17400, egresos: 10500, utilidad: 6900 },
  { mes: "Mar", ingresos: 19100, egresos: 11200, utilidad: 7900 },
  { mes: "Abr", ingresos: 20300, egresos: 12100, utilidad: 8200 },
  { mes: "May", ingresos: 24720, egresos: 15920, utilidad: 8800 },
  { mes: "Jun", ingresos: 25900, egresos: 16500, utilidad: 9400 },
];

export function PnLStackedArea() {
  return (
    <div className="h-80">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={plData} margin={{ top: 8, right: 8, left: -16, bottom: 0 }}>
          <defs>
            <linearGradient id="pnlIngresos" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#22c55e" stopOpacity={0.5} />
              <stop offset="95%" stopColor="#22c55e" stopOpacity={0.05} />
            </linearGradient>
            <linearGradient id="pnlEgresos" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#ef4444" stopOpacity={0.5} />
              <stop offset="95%" stopColor="#ef4444" stopOpacity={0.05} />
            </linearGradient>
            <linearGradient id="pnlUtilidad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.5} />
              <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.05} />
            </linearGradient>
          </defs>
          {grid}
          <XAxis dataKey="mes" {...axisProps} />
          <YAxis {...axisProps} />
          <Tooltip {...tooltipStyle} />
          <Legend verticalAlign="top" align="center" wrapperStyle={{ fontSize: 12, top: 0 }} />
          <Area type="monotone" dataKey="ingresos" name="Ingresos" stackId="1" stroke="#22c55e" fill="url(#pnlIngresos)" />
          <Area type="monotone" dataKey="egresos" name="Egresos" stackId="1" stroke="#ef4444" fill="url(#pnlEgresos)" />
          <Area type="monotone" dataKey="utilidad" name="Utilidad" stackId="1" stroke="#3b82f6" fill="url(#pnlUtilidad)" />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}

// ---------- Resumen Mensual — KPI + sparklines / barras horizontales ----------
const monthlyKpis = [
  { label: "Ingresos", value: "$25,900", deltaPct: 4.8, spark: [16200, 17400, 19100, 20300, 24720, 25900] },
  { label: "Egresos", value: "$16,500", deltaPct: 3.6, spark: [9800, 10500, 11200, 12100, 15920, 16500] },
  { label: "Utilidad", value: "$9,400", deltaPct: 6.8, spark: [6400, 6900, 7900, 8200, 8800, 9400] },
  { label: "Margen", value: "36.3%", deltaPct: 0.7, spark: [39.5, 39.7, 41.4, 40.4, 35.6, 36.3] },
];

function Sparkline({ data, color }: { data: number[]; color: string }) {
  const points = data.map((v, i) => ({ i, v }));
  return (
    <div className="h-10 w-24">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={points}>
          <Line type="monotone" dataKey="v" stroke={color} strokeWidth={2} dot={false} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

const monthlyBars = [
  { label: "Regalías", value: 13140 },
  { label: "Ads", value: 6200 },
  { label: "Music Business", value: 4760 },
  { label: "Nómina", value: 7200 },
  { label: "Proveedores", value: 5100 },
];

export function MonthlySummary() {
  const maxBar = Math.max(...monthlyBars.map((b) => b.value));
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div className="space-y-4">
        <p className="text-xs font-medium text-zinc-400 dark:text-zinc-500 uppercase tracking-wide">KPIs vs. período anterior</p>
        {monthlyKpis.map(({ label, value, deltaPct, spark }) => (
          <div key={label} className="flex items-center justify-between rounded-xl border border-zinc-200 dark:border-zinc-800 px-4 py-3">
            <div>
              <p className="text-xs text-zinc-500 dark:text-zinc-400">{label}</p>
              <p className="text-lg font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">{value}</p>
              <p className={`text-xs font-medium ${deltaPct >= 0 ? "text-emerald-600 dark:text-emerald-400" : "text-red-500 dark:text-red-400"}`}>
                {deltaPct >= 0 ? "+" : ""}{deltaPct}% vs. período anterior
              </p>
            </div>
            <Sparkline data={spark} color={deltaPct >= 0 ? "#22c55e" : "#ef4444"} />
          </div>
        ))}
      </div>

      <div>
        <p className="mb-4 text-xs font-medium text-zinc-400 dark:text-zinc-500 uppercase tracking-wide">Distribución por línea / categoría</p>
        <div className="space-y-3">
          {monthlyBars.map(({ label, value }) => (
            <div key={label}>
              <div className="flex items-center justify-between text-xs mb-1">
                <span className="text-zinc-500 dark:text-zinc-400">{label}</span>
                <span className="font-medium text-zinc-700 dark:text-zinc-200">${value.toLocaleString()}</span>
              </div>
              <div className="h-2.5 rounded-full bg-zinc-100 dark:bg-zinc-800 overflow-hidden">
                <div className="h-full rounded-full bg-zinc-900 dark:bg-zinc-50" style={{ width: `${(value / maxBar) * 100}%` }} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ---------- Resumen por Qs ----------
const quarterData = [
  { q: "Q1 2026", ingresos: 52700, egresos: 31500, utilidad: 21200 },
  { q: "Q2 2026", ingresos: 70920, egresos: 44520, utilidad: 26400 },
  { q: "Q3 2026", ingresos: 38000, egresos: 46500, utilidad: -8500 },
  { q: "Q4 2026", ingresos: 61000, egresos: 39800, utilidad: 21200 },
];
const marginByQ = [
  { q: "Q1 2026", margin: 40.2 },
  { q: "Q2 2026", margin: 37.2 },
  { q: "Q3 2026", margin: -22.4 },
  { q: "Q4 2026", margin: 34.8 },
];
const marginTone = (m: number): "green" | "amber" | "red" => (m >= 30 ? "green" : m >= 0 ? "amber" : "red");
const marginText: Record<"green" | "amber" | "red", string> = {
  green: "text-emerald-600 dark:text-emerald-400",
  amber: "text-amber-500 dark:text-amber-400",
  red: "text-red-500 dark:text-red-400",
};
const marginBg: Record<"green" | "amber" | "red", string> = {
  green: "border-emerald-200 dark:border-emerald-500/30 bg-emerald-50 dark:bg-emerald-500/10",
  amber: "border-amber-200 dark:border-amber-500/30 bg-amber-50 dark:bg-amber-500/10",
  red: "border-red-200 dark:border-red-500/30 bg-red-50 dark:bg-red-500/10",
};

export function QuarterlySummary() {
  return (
    <div className="space-y-6">
      <div className="h-72">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={quarterData} margin={{ top: 8, right: 8, left: -16, bottom: 0 }}>
            {grid}
            <XAxis dataKey="q" {...axisProps} />
            <YAxis {...axisProps} />
            <Tooltip {...tooltipStyle} />
            <Legend verticalAlign="top" align="center" wrapperStyle={{ fontSize: 12, top: 0 }} />
            <Bar dataKey="ingresos" name="Ingresos" fill="#3b82f6" radius={[6, 6, 0, 0]} barSize={16} />
            <Bar dataKey="egresos" name="Egresos" fill="#ef4444" radius={[6, 6, 0, 0]} barSize={16} />
            <Bar dataKey="utilidad" name="Utilidad" radius={[6, 6, 0, 0]} barSize={16}>
              {quarterData.map((d, i) => <Cell key={i} fill={d.utilidad >= 0 ? "#22c55e" : "#ef4444"} />)}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div>
        <p className="mb-3 text-xs font-medium text-zinc-400 dark:text-zinc-500 uppercase tracking-wide">Margen por trimestre</p>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {marginByQ.map(({ q, margin }) => {
            const tone = marginTone(margin);
            return (
              <div key={q} className={`rounded-xl border px-4 py-3 ${marginBg[tone]}`}>
                <p className="text-xs text-zinc-500 dark:text-zinc-400">{q}</p>
                <p className={`text-lg font-semibold tracking-tight ${marginText[tone]}`}>{margin >= 0 ? "+" : ""}{margin}%</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// ---------- Reporte de Nómina ----------
const payrollByCategory = [
  { name: "Equipo Producción", value: 28400 },
  { name: "Equipo Administrativo", value: 14200 },
  { name: "Marketing", value: 9800 },
  { name: "Comerciales / A&R", value: 7600 },
  { name: "Otros", value: 2400 },
];
const donutColors = ["#3b82f6", "#22c55e", "#f59e0b", "#a855f7", "#ef4444"];
const totalPayroll = payrollByCategory.reduce((s, c) => s + c.value, 0);

const payrollTrend = [
  { mes: "Ene", real: 6800, presupuesto: 7000 },
  { mes: "Feb", real: 6950, presupuesto: 7000 },
  { mes: "Mar", real: 7100, presupuesto: 7100 },
  { mes: "Abr", real: 7050, presupuesto: 7100 },
  { mes: "May", real: 7180, presupuesto: 7100 },
  { mes: "Jun", real: 7200, presupuesto: 7100 },
];

export function PayrollReport() {
  const [view, setView] = useState<"donut" | "trend">("donut");
  return (
    <div>
      <div className="flex items-center justify-end mb-4">
        <button
          onClick={() => setView(view === "donut" ? "trend" : "donut")}
          className="flex items-center gap-1.5 rounded-lg border border-zinc-200 dark:border-zinc-800 px-3 py-1.5 text-xs text-zinc-600 dark:text-zinc-300 hover:border-zinc-300 dark:hover:border-zinc-700 transition-colors"
        >
          {view === "donut" ? <AlignLeft size={14} strokeWidth={1.75} /> : <LayoutGrid size={14} strokeWidth={1.75} />}
          Ver {view === "donut" ? "tendencia mensual vs. presupuesto" : "distribución por categoría"}
        </button>
      </div>

      {view === "donut" ? (
        <div className="h-80 grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
          <div className="h-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={payrollByCategory} dataKey="value" nameKey="name" innerRadius={70} outerRadius={100} paddingAngle={2}>
                  {payrollByCategory.map((_, i) => <Cell key={i} fill={donutColors[i % donutColors.length]} />)}
                </Pie>
                <Tooltip {...tooltipStyle} formatter={(v) => `$${Number(v ?? 0).toLocaleString()}`} />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="space-y-2">
            {payrollByCategory.map((c, i) => (
              <div key={c.name} className="flex items-center justify-between text-sm">
                <span className="flex items-center gap-2 text-zinc-600 dark:text-zinc-300">
                  <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: donutColors[i % donutColors.length] }} />
                  {c.name}
                </span>
                <span className="flex items-center gap-3">
                  <span className="font-medium text-zinc-900 dark:text-zinc-50">${c.value.toLocaleString()}</span>
                  <span className="w-12 text-right text-xs text-zinc-400 dark:text-zinc-500">{((c.value / totalPayroll) * 100).toFixed(1)}%</span>
                </span>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={payrollTrend} margin={{ top: 8, right: 8, left: -16, bottom: 0 }}>
              {grid}
              <XAxis dataKey="mes" {...axisProps} />
              <YAxis {...axisProps} />
              <Tooltip {...tooltipStyle} />
              <Legend verticalAlign="top" align="center" wrapperStyle={{ fontSize: 12, top: 0 }} />
              <Line type="monotone" dataKey="real" name="Nómina real" stroke="currentColor" className="text-zinc-900 dark:text-zinc-50" strokeWidth={2.5} dot={{ r: 3 }} />
              <Line type="monotone" dataKey="presupuesto" name="Presupuesto ideal" stroke="#71717a" strokeWidth={2} strokeDasharray="5 4" dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
}

// ---------- Reporte de Proveedores ----------
const proveedoresEstado: Record<string, "green" | "amber" | "red"> = { Pagado: "green", Pendiente: "amber", Vencido: "red" };
const proveedores = [
  { name: "Estudio Sonido Norte", monto: 8400, estado: "Pagado", progreso: 100 },
  { name: "+Vallenato Producciones", monto: 6200, estado: "Pendiente", progreso: 60 },
  { name: "Diseño Visual Co.", monto: 4100, estado: "Pagado", progreso: 100 },
  { name: "Logística Showcases", monto: 3850, estado: "Vencido", progreso: 35 },
  { name: "Agencia Meta Ads", monto: 3200, estado: "Pagado", progreso: 100 },
  { name: "Estudio Mezcla Sur", monto: 2600, estado: "Pendiente", progreso: 50 },
  { name: "Catering Eventos", monto: 1450, estado: "Pagado", progreso: 100 },
];

export function ProvidersReport() {
  const ranked = [...proveedores].sort((a, b) => b.monto - a.monto);
  const max = ranked[0].monto;
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div>
        <p className="mb-3 text-xs font-medium text-zinc-400 dark:text-zinc-500 uppercase tracking-wide">Detalle por proveedor</p>
        <div className="max-h-80 overflow-y-auto pr-1 space-y-3">
          {proveedores.map((p) => (
            <div key={p.name} className="rounded-xl border border-zinc-200 dark:border-zinc-800 px-4 py-3">
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-sm text-zinc-700 dark:text-zinc-200">{p.name}</span>
                <Badge color={proveedoresEstado[p.estado]}>{p.estado}</Badge>
              </div>
              <div className="flex items-center justify-between text-xs mb-1.5">
                <span className="text-zinc-400 dark:text-zinc-500">Monto</span>
                <span className="font-medium text-zinc-700 dark:text-zinc-200">${p.monto.toLocaleString()}</span>
              </div>
              <div className="h-2 rounded-full bg-zinc-100 dark:bg-zinc-800 overflow-hidden">
                <div
                  className={`h-full rounded-full ${p.estado === "Pagado" ? "bg-emerald-500" : p.estado === "Pendiente" ? "bg-amber-400" : "bg-red-500"}`}
                  style={{ width: `${p.progreso}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div>
        <p className="mb-3 text-xs font-medium text-zinc-400 dark:text-zinc-500 uppercase tracking-wide">Ranking de gasto</p>
        <div className="space-y-3">
          {ranked.map((p) => (
            <div key={p.name}>
              <div className="flex items-center justify-between text-xs mb-1">
                <span className="flex items-center gap-2 text-zinc-600 dark:text-zinc-300">
                  {p.name}
                  <Badge color={proveedoresEstado[p.estado]}>{p.estado}</Badge>
                </span>
                <span className="font-medium text-zinc-700 dark:text-zinc-200">${p.monto.toLocaleString()}</span>
              </div>
              <div className="h-2.5 rounded-full bg-zinc-100 dark:bg-zinc-800 overflow-hidden">
                <div className="h-full rounded-full bg-zinc-900 dark:bg-zinc-50" style={{ width: `${(p.monto / max) * 100}%` }} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ---------- Reporte por Cliente ----------
const clientesReport = [
  { name: "Karol G", ingreso: 62500, ultima: "05 Jun 2026", facturasPendientes: 1, saldoPendiente: 3200 },
  { name: "Maluma", ingreso: 48200, ultima: "12 Jun 2026", facturasPendientes: 0, saldoPendiente: 0 },
  { name: "+Vallenato", ingreso: 21300, ultima: "02 Jun 2026", facturasPendientes: 2, saldoPendiente: 5400 },
  { name: "Visual Films", ingreso: 8400, ultima: "28 May 2026", facturasPendientes: 1, saldoPendiente: 1100 },
  { name: "Manuel Turizo", ingreso: 0, ultima: "—", facturasPendientes: 0, saldoPendiente: 0 },
];

export function ClientsReport() {
  const ranked = [...clientesReport].sort((a, b) => b.ingreso - a.ingreso);
  const total = ranked.reduce((s, c) => s + c.ingreso, 0);
  const max = ranked[0].ingreso;
  return (
    <div className="space-y-8">
      <div>
        <p className="mb-3 text-xs font-medium text-zinc-400 dark:text-zinc-500 uppercase tracking-wide">Ranking por ingreso generado</p>
        <div className="space-y-3">
          {ranked.map((c) => (
            <div key={c.name}>
              <div className="flex items-center justify-between text-xs mb-1">
                <span className="flex items-center gap-2 text-zinc-600 dark:text-zinc-300">
                  {c.name}
                  {c.saldoPendiente > 0 && <Badge color="amber">Saldo pendiente ${c.saldoPendiente.toLocaleString()}</Badge>}
                </span>
                <span className="font-medium text-zinc-700 dark:text-zinc-200">${c.ingreso.toLocaleString()}</span>
              </div>
              <div className="h-2.5 rounded-full bg-zinc-100 dark:bg-zinc-800 overflow-hidden">
                <div className="h-full rounded-full bg-zinc-900 dark:bg-zinc-50" style={{ width: `${max ? (c.ingreso / max) * 100 : 0}%` }} />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div>
        <p className="mb-3 text-xs font-medium text-zinc-400 dark:text-zinc-500 uppercase tracking-wide">Tabla ejecutiva</p>
        <div className="max-h-72 overflow-y-auto -mx-1">
          <table className="w-full text-sm">
            <thead className="sticky top-0 bg-white dark:bg-zinc-900">
              <tr className="text-left text-xs text-zinc-400 dark:text-zinc-500 uppercase tracking-wide">
                <th className="px-3 py-2 font-medium">Cliente</th>
                <th className="px-3 py-2 font-medium">Ingreso total</th>
                <th className="px-3 py-2 font-medium">Última compra</th>
                <th className="px-3 py-2 font-medium">Facturas pendientes</th>
                <th className="px-3 py-2 font-medium">% del total</th>
              </tr>
            </thead>
            <tbody>
              {ranked.map((c) => (
                <tr key={c.name} className="border-t border-zinc-100 dark:border-zinc-800">
                  <td className="px-3 py-3 text-zinc-700 dark:text-zinc-200">{c.name}</td>
                  <td className="px-3 py-3 text-zinc-700 dark:text-zinc-200">${c.ingreso.toLocaleString()}</td>
                  <td className="px-3 py-3 text-zinc-500 dark:text-zinc-400">{c.ultima}</td>
                  <td className="px-3 py-3 text-zinc-500 dark:text-zinc-400">{c.facturasPendientes}</td>
                  <td className="px-3 py-3 text-zinc-500 dark:text-zinc-400">{total ? ((c.ingreso / total) * 100).toFixed(1) : "0.0"}%</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

// ---------- Reporte por Unidad de Negocio ----------
const businessUnits = [
  { name: "Regalías", ingresos: 13140, egresos: 2400, color: "#27272a" },
  { name: "Ads", ingresos: 6200, egresos: 1800, color: "#52525b" },
  { name: "Music Business", ingresos: 4760, egresos: 1100, color: "#71717a" },
  { name: "Catálogo / Sync", ingresos: 1800, egresos: 600, color: "#a1a1aa" },
];
const unitTotal = businessUnits.reduce((s, u) => s + u.ingresos, 0);

export function BusinessUnitReport() {
  return (
    <div className="space-y-8">
      <div>
        <p className="mb-3 text-xs font-medium text-zinc-400 dark:text-zinc-500 uppercase tracking-wide">Mix de negocio — % del ingreso total</p>
        <div className="flex h-8 w-full overflow-hidden rounded-lg">
          {businessUnits.map((u) => (
            <div key={u.name} style={{ width: `${(u.ingresos / unitTotal) * 100}%`, backgroundColor: u.color }} title={u.name} />
          ))}
        </div>
        <div className="mt-3 flex flex-wrap gap-4">
          {businessUnits.map((u) => (
            <span key={u.name} className="flex items-center gap-2 text-xs text-zinc-500 dark:text-zinc-400">
              <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: u.color }} />
              {u.name} — {((u.ingresos / unitTotal) * 100).toFixed(1)}%
            </span>
          ))}
        </div>
      </div>

      <div>
        <p className="mb-3 text-xs font-medium text-zinc-400 dark:text-zinc-500 uppercase tracking-wide">Ingresos vs. egresos por unidad</p>
        <div className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={businessUnits} margin={{ top: 8, right: 8, left: -16, bottom: 0 }}>
              {grid}
              <XAxis dataKey="name" {...axisProps} />
              <YAxis {...axisProps} />
              <Tooltip {...tooltipStyle} />
              <Legend verticalAlign="top" align="center" wrapperStyle={{ fontSize: 12, top: 0 }} />
              <Bar dataKey="ingresos" name="Ingresos" fill="#3b82f6" radius={[6, 6, 0, 0]} barSize={20} />
              <Bar dataKey="egresos" name="Egresos" fill="#ef4444" radius={[6, 6, 0, 0]} barSize={20} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div>
        <p className="mb-3 text-xs font-medium text-zinc-400 dark:text-zinc-500 uppercase tracking-wide">Scorecard por unidad</p>
        <div className="max-h-72 overflow-y-auto -mx-1">
          <table className="w-full text-sm">
            <thead className="sticky top-0 bg-white dark:bg-zinc-900">
              <tr className="text-left text-xs text-zinc-400 dark:text-zinc-500 uppercase tracking-wide">
                <th className="px-3 py-2 font-medium">Unidad</th>
                <th className="px-3 py-2 font-medium">Tipo</th>
                <th className="px-3 py-2 font-medium">Utilidad</th>
                <th className="px-3 py-2 font-medium">Margen</th>
                <th className="px-3 py-2 font-medium">Tendencia</th>
              </tr>
            </thead>
            <tbody>
              {businessUnits.map((u) => {
                const utilidad = u.ingresos - u.egresos;
                const margen = (utilidad / u.ingresos) * 100;
                const tone = marginTone(margen);
                return (
                  <tr key={u.name} className="border-t border-zinc-100 dark:border-zinc-800">
                    <td className="px-3 py-3 text-zinc-700 dark:text-zinc-200">{u.name}</td>
                    <td className="px-3 py-3"><Badge color="green">Ingreso</Badge></td>
                    <td className="px-3 py-3 text-zinc-700 dark:text-zinc-200">${utilidad.toLocaleString()}</td>
                    <td className={`px-3 py-3 font-medium ${marginText[tone]}`}>{margen.toFixed(1)}%</td>
                    <td className="px-3 py-3">
                      <span className={`text-xs font-medium ${marginText[tone]}`}>{margen >= 30 ? "↑ Saludable" : margen >= 0 ? "→ Estable" : "↓ Atención"}</span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
