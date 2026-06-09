"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  TrendingUp,
  TrendingDown,
  Users,
  Building2,
  GitCompare,
  FileBarChart,
} from "lucide-react";

const items = [
  { label: "Home", href: "/", icon: LayoutDashboard },
  { label: "Ingresos", href: "/ingresos", icon: TrendingUp },
  { label: "Egresos", href: "/egresos", icon: TrendingDown },
  { label: "Equipo", href: "/equipo", icon: Users },
  { label: "Clientes", href: "/clientes", icon: Building2 },
  { label: "Comparativos", href: "/comparativos", icon: GitCompare },
  { label: "Reportes", href: "/reportes", icon: FileBarChart },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-60 shrink-0 h-screen overflow-hidden sticky top-0 border-r border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 flex flex-col">
      <div className="shrink-0 flex items-center justify-center px-6 pt-4 pb-2">
        <Image src="/logo-negro.png" alt="Escorcia Music" width={96} height={96} className="dark:hidden" />
        <Image src="/logo-blanco.png" alt="Escorcia Music" width={96} height={96} className="hidden dark:block" />
      </div>
      <nav className="flex-1 px-3 space-y-1">
        {items.map(({ label, href, icon: Icon }) => {
          const active = pathname === href;
          return (
            <Link
              key={label}
              href={href}
              className={`w-full flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors ${
                active
                  ? "bg-zinc-100 dark:bg-zinc-900 text-zinc-900 dark:text-zinc-50 font-medium"
                  : "text-zinc-500 dark:text-zinc-400 hover:bg-zinc-50 dark:hover:bg-zinc-900/60 hover:text-zinc-900 dark:hover:text-zinc-50"
              }`}
            >
              <Icon size={18} strokeWidth={1.75} />
              {label}
            </Link>
          );
        })}
      </nav>
      <div className="px-3 py-4 border-t border-zinc-100 dark:border-zinc-900">
        <div className="flex items-center gap-3 rounded-xl px-3 py-2 hover:bg-zinc-50 dark:hover:bg-zinc-900/60 transition-colors cursor-pointer">
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-zinc-200 dark:bg-zinc-800 text-xs font-medium text-zinc-600 dark:text-zinc-300">
            JE
          </span>
          <div className="min-w-0">
            <p className="truncate text-sm font-medium text-zinc-900 dark:text-zinc-50">Juan Escorcia</p>
            <p className="truncate text-xs text-zinc-400 dark:text-zinc-500">Director / A&R</p>
          </div>
        </div>
      </div>
    </aside>
  );
}
