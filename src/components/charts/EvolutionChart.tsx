"use client";

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const data = [
  { mes: "Ene", ingresos: 18200, egresos: 11400 },
  { mes: "Feb", ingresos: 21500, egresos: 13100 },
  { mes: "Mar", ingresos: 19800, egresos: 12600 },
  { mes: "Abr", ingresos: 24300, egresos: 14800 },
  { mes: "May", ingresos: 27100, egresos: 15900 },
  { mes: "Jun", ingresos: 25900, egresos: 16500 },
];

export default function EvolutionChart() {
  return (
    <div className="h-full min-h-0">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ top: 28, right: 10, left: -10, bottom: 0 }}>
          <defs>
            <linearGradient id="ingresos" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#22c55e" stopOpacity={0.28} />
              <stop offset="95%" stopColor="#22c55e" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="egresos" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#ef4444" stopOpacity={0.32} />
              <stop offset="95%" stopColor="#ef4444" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e4e4e7" />
          <XAxis dataKey="mes" tick={{ fontSize: 12, fill: "#71717a" }} axisLine={false} tickLine={false} />
          <YAxis tick={{ fontSize: 12, fill: "#71717a" }} axisLine={false} tickLine={false} tickFormatter={(v) => `$${v / 1000}K`} />
          <Tooltip
            formatter={(v: number) => `$${v.toLocaleString()}`}
            contentStyle={{ borderRadius: 12, border: "1px solid #e4e4e7", fontSize: 12 }}
          />
          <Legend verticalAlign="top" align="center" wrapperStyle={{ fontSize: 12, top: 0 }} />
          {/* Ingresos primero (atrás), Egresos al final para que quede siempre visualmente adelante */}
          <Area type="monotone" dataKey="ingresos" name="Ingresos" stroke="#22c55e" strokeWidth={2.5} fill="url(#ingresos)" dot={{ r: 3, fill: "#22c55e" }} activeDot={{ r: 5 }} />
          <Area type="monotone" dataKey="egresos" name="Egresos" stroke="#ef4444" strokeWidth={2.5} fill="url(#egresos)" dot={{ r: 3, fill: "#ef4444" }} activeDot={{ r: 5 }} />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
