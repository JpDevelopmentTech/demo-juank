"use client";

import { useState } from "react";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";
import { PieChart as PieIcon, BarChart3 } from "lucide-react";

const grays = ["#71717a", "#a1a1aa", "#d4d4d8", "#52525b", "#e4e4e7"];

export default function BreakdownChart({
  title,
  data,
}: {
  title: string;
  data: { name: string; value: number }[];
}) {
  const [view, setView] = useState<"donut" | "bar">("donut");

  return (
    <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-4 flex flex-col min-h-0 h-full">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-medium text-zinc-900 dark:text-zinc-50">{title}</h3>
        <div className="flex items-center gap-1 rounded-lg bg-zinc-100 dark:bg-zinc-800 p-1">
          <button
            onClick={() => setView("donut")}
            className={`flex h-6 w-6 items-center justify-center rounded-md transition-colors ${
              view === "donut"
                ? "bg-white dark:bg-zinc-700 text-zinc-900 dark:text-zinc-50 shadow-sm"
                : "text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300"
            }`}
            aria-label="Vista de dona"
          >
            <PieIcon size={13} strokeWidth={1.75} />
          </button>
          <button
            onClick={() => setView("bar")}
            className={`flex h-6 w-6 items-center justify-center rounded-md transition-colors ${
              view === "bar"
                ? "bg-white dark:bg-zinc-700 text-zinc-900 dark:text-zinc-50 shadow-sm"
                : "text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300"
            }`}
            aria-label="Vista de barras"
          >
            <BarChart3 size={13} strokeWidth={1.75} />
          </button>
        </div>
      </div>

      <div className="flex-1 min-h-0 mt-2">
        <ResponsiveContainer width="100%" height="100%">
          {view === "donut" ? (
            <PieChart>
              <Pie
                data={data}
                dataKey="value"
                nameKey="name"
                innerRadius={55}
                outerRadius={80}
                paddingAngle={0}
                isAnimationActive={false}
              >
                {data.map((_, i) => {
                  const color = grays[i % grays.length];
                  return <Cell key={i} fill={color} stroke={color} strokeWidth={1} />;
                })}
              </Pie>
              <Tooltip
                formatter={(v) => `$${Number(v).toLocaleString()}`}
                contentStyle={{ borderRadius: 12, border: "1px solid #e4e4e7", fontSize: 12 }}
              />
              <Legend iconType="circle" iconSize={8} wrapperStyle={{ fontSize: 12, color: "#71717a" }} />
            </PieChart>
          ) : (
            <BarChart data={data} layout="vertical" margin={{ top: 5, right: 16, left: 0, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#e4e4e7" />
              <XAxis type="number" tick={{ fontSize: 12, fill: "#71717a" }} axisLine={false} tickLine={false} tickFormatter={(v) => `$${v / 1000}K`} />
              <YAxis type="category" dataKey="name" width={100} tick={{ fontSize: 12, fill: "#71717a" }} axisLine={false} tickLine={false} />
              <Tooltip
                formatter={(v) => `$${Number(v).toLocaleString()}`}
                contentStyle={{ borderRadius: 12, border: "1px solid #e4e4e7", fontSize: 12 }}
                cursor={{ fill: "#f4f4f5" }}
              />
              <Bar dataKey="value" radius={[0, 6, 6, 0]}>
                {data.map((_, i) => (
                  <Cell key={i} fill={grays[i % grays.length]} />
                ))}
              </Bar>
            </BarChart>
          )}
        </ResponsiveContainer>
      </div>
    </div>
  );
}
