"use client";

import { ChevronDown, Calendar } from "lucide-react";

export default function TimeFilter() {
  return (
    <div className="flex items-center gap-3">
      <span className="text-sm text-zinc-500 dark:text-zinc-400 hidden sm:inline">
        Junio 08 del 2026
      </span>
      <span className="hidden sm:block h-4 w-px bg-zinc-200 dark:bg-zinc-800" />
      <span className="text-sm text-zinc-500 dark:text-zinc-400 hidden sm:inline">
        Período Analizado
      </span>
      <button className="flex items-center gap-2 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 px-3 py-1.5 text-sm text-zinc-700 dark:text-zinc-200 hover:border-zinc-300 dark:hover:border-zinc-700 transition-colors">
        <Calendar size={15} strokeWidth={1.75} />
        Este mes
        <ChevronDown size={15} strokeWidth={1.75} className="text-zinc-400" />
      </button>
    </div>
  );
}
