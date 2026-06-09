"use client";

import { useState } from "react";
import PageShell from "@/components/PageShell";
import { Card, Badge, Table, NewItemButton } from "@/components/ui";

const tabs = ["Empleados", "Proveedores"] as const;

const empleados = [
  ["Juan Camilo Escorcia", "A&R / Dirección", "Activo", "98%", <Badge key="1" color="green">Bajo</Badge>],
  ["María Fernanda Ríos", "Mánager de Catálogo", "Activo", "92%", <Badge key="2" color="green">Bajo</Badge>],
  ["Andrés Pabón", "Producción", "Activo", "76%", <Badge key="3" color="amber">Medio</Badge>],
  ["Laura Gómez", "Marketing Digital", "Suspendido", "54%", <Badge key="4" color="red">Alto</Badge>],
];

const proveedores = [
  ["Estudio Frecuencia", "Producción", "Activo", "100%", <Badge key="1" color="green">Bajo</Badge>],
  ["Diseño GAP", "Diseño", "Activo", "88%", <Badge key="2" color="green">Bajo</Badge>],
  ["Legal & Co.", "Legal", "Activo", "70%", <Badge key="3" color="amber">Medio</Badge>],
  ["Visual Films", "Video", "Inactivo", "40%", <Badge key="4" color="red">Alto</Badge>],
];

export default function EquipoPage() {
  const [tab, setTab] = useState<(typeof tabs)[number]>("Empleados");
  const rows = tab === "Empleados" ? empleados : proveedores;

  return (
    <PageShell title="Equipo">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1 rounded-lg bg-zinc-100 dark:bg-zinc-800 p-1 w-fit">
          {tabs.map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`rounded-md px-3.5 py-1.5 text-sm transition-colors ${
                tab === t
                  ? "bg-white dark:bg-zinc-700 text-zinc-900 dark:text-zinc-50 font-medium shadow-sm"
                  : "text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-50"
              }`}
            >
              {t}
            </button>
          ))}
        </div>
        <NewItemButton label={tab === "Empleados" ? "Nuevo empleado" : "Nuevo proveedor"} />
      </div>

      <section className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card>
          <p className="text-sm text-zinc-500 dark:text-zinc-400">Total {tab.toLowerCase()}</p>
          <p className="mt-2 text-2xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">{rows.length}</p>
        </Card>
        <Card>
          <p className="text-sm text-zinc-500 dark:text-zinc-400">Activos</p>
          <p className="mt-2 text-2xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
            {rows.filter((r) => r[2] === "Activo").length}
          </p>
        </Card>
        <Card>
          <p className="text-sm text-zinc-500 dark:text-zinc-400">Compliance promedio</p>
          <p className="mt-2 text-2xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">81%</p>
        </Card>
      </section>

      <Card title={tab}>
        <Table
          columns={["Nombre", tab === "Empleados" ? "Rol" : "Categoría", "Estado", "Compliance", "Riesgo"]}
          rows={rows}
        />
      </Card>
    </PageShell>
  );
}
