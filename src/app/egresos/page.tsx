"use client";

import { useState } from "react";
import PageShell from "@/components/PageShell";
import { Card, Badge, Table, DualValue, NewItemButton } from "@/components/ui";
import { Infinity as InfinityIcon } from "lucide-react";

const TrmTag = ({ value }: { value: string }) => (
  <span
    className="block italic text-zinc-400 dark:text-zinc-500"
    title="Cada transacción guarda su propia TRM del día; este es solo un valor de referencia aproximado"
  >
    ≈ {value} TRM
  </span>
);

const rows = [
  ["12 Jun 2026", "Nómina", "—", "Equipo Producción", <DualValue key="v1" usd="$5,200.00" cop="$21,081,060" original="USD" />, <Badge key="1" color="green">Soportado</Badge>],
  ["10 Jun 2026", "Software", "Maluma", "Estudio Mezcla", <DualValue key="v2" usd="$340.00" cop="$1,378,377" original="USD" />, <Badge key="2" color="amber">Pendiente de Soporte</Badge>],
  ["08 Jun 2026", "Ads", "Karol G", "Inversión Meta", <DualValue key="v3" usd="$296.01" cop="$1,200,000" original="COP" />, <Badge key="3" color="green">Soportado</Badge>],
  ["05 Jun 2026", "Viajes", "—", "Vuelos showcase Bogotá", <DualValue key="v4" usd="$680.00" cop="$2,756,754" original="USD" />, <Badge key="4" color="gray">Registrado</Badge>],
  ["02 Jun 2026", "Proveedores", "+Vallenato", "Diseño gráfico EP", <DualValue key="v5" usd="$111.00" cop="$450,000" original="COP" />, <Badge key="5" color="green">Soportado</Badge>],
  ["28 May 2026", "Comisiones", "Beéle", "Fee distribución digital", <DualValue key="v6" usd="$210.00" cop="$851,351" original="USD" />, <Badge key="6" color="amber">Pendiente de Soporte</Badge>],
];

// Categorías disponibles para el filtro combinado — montos lifetime + cantidad de movimientos generados.
// El orden se recalcula por "count" (cantidad de gastos), de mayor a menor, para que las
// categorías más relevantes queden siempre primero a medida que se alimente con más data.
const categoryData = [
  { name: "Nómina", amount: 62400, count: 14 },
  { name: "Ads", amount: 25000, count: 11 },
  { name: "Proveedores", amount: 18650, count: 9 },
  { name: "Operación", amount: 14200, count: 8 },
  { name: "Music Business", amount: 9400, count: 7 },
  { name: "Viajes", amount: 8900, count: 6 },
  { name: "Marketing", amount: 7600, count: 5 },
  { name: "Comisiones", amount: 6300, count: 5 },
  { name: "Software", amount: 5320, count: 4 },
  { name: "Hoteles", amount: 4100, count: 3 },
  { name: "Otros", amount: 3100, count: 2 },
  { name: "Herramientas", amount: 2750, count: 2 },
];

const categories = [...categoryData].sort((a, b) => b.count - a.count);

export default function EgresosPage() {
  const [selected, setSelected] = useState<string[]>(["Nómina", "Ads"]);

  const toggle = (name: string) =>
    setSelected((prev) => (prev.includes(name) ? prev.filter((n) => n !== name) : [...prev, name]));

  const filteredRows = rows.filter((r) => selected.includes(r[1] as string));

  const combinedTotal = categories
    .filter((c) => selected.includes(c.name))
    .reduce((sum, c) => sum + c.amount, 0);

  return (
    <PageShell title="Egresos">
      <div className="flex items-center justify-end">
        <NewItemButton label="Nuevo egreso" />
      </div>

      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <div className="flex items-center gap-1.5 text-zinc-400 dark:text-zinc-500">
            <InfinityIcon size={13} strokeWidth={2} />
            <p className="text-sm">Egresos Totales (lifetime)</p>
          </div>
          <p className="mt-2 text-2xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
            $164,520.00 <span className="text-sm font-normal text-zinc-400 dark:text-zinc-500">USD</span>
          </p>
          <p className="mt-1 text-xs text-zinc-400 dark:text-zinc-500">
            $152,300 USD + $49,200,000 COP
            <TrmTag value="$4,054.05" />
          </p>
        </Card>
        <Card>
          <p className="text-sm text-zinc-500 dark:text-zinc-400">Egresos del Período</p>
          <p className="mt-2 text-2xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
            $8,080.00 <span className="text-sm font-normal text-zinc-400 dark:text-zinc-500">USD</span>
          </p>
          <p className="mt-1 text-xs text-zinc-400 dark:text-zinc-500">
            $7,820 USD + $1,054,000 COP
            <TrmTag value="$4,054.05" />
          </p>
        </Card>
        <Card>
          <p className="text-sm text-zinc-500 dark:text-zinc-400">Nómina</p>
          <p className="mt-2 text-2xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">$5,200.00</p>
        </Card>
        <Card>
          <p className="text-sm text-zinc-500 dark:text-zinc-400">Ads</p>
          <p className="mt-2 text-2xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">$1,200.00</p>
        </Card>
      </section>

      <Card title="Movimientos recientes">
        <Table
          columns={["Fecha", "Categoría", "Cliente asociado", "Descripción", "Valor", "Estado"]}
          rows={rows}
        />
      </Card>

      <Card title="Filtrar por categoría de gasto">
        <p className="text-xs text-zinc-500 dark:text-zinc-400 -mt-2 mb-4">
          Selecciona una o varias categorías para ver cuánto representan en conjunto
        </p>
        <div className="flex flex-wrap gap-2">
          {categories.map((c) => {
            const active = selected.includes(c.name);
            return (
              <button
                key={c.name}
                onClick={() => toggle(c.name)}
                className={`rounded-full border px-3.5 py-1.5 text-sm transition-colors ${
                  active
                    ? "border-zinc-900 dark:border-zinc-50 bg-zinc-900 dark:bg-zinc-50 text-white dark:text-zinc-900 font-medium"
                    : "border-zinc-200 dark:border-zinc-800 text-zinc-500 dark:text-zinc-400 hover:border-zinc-300 dark:hover:border-zinc-700"
                }`}
              >
                {c.name}
              </button>
            );
          })}
        </div>

        <div className="mt-6 flex items-center justify-between rounded-xl bg-zinc-50 dark:bg-zinc-800/60 px-5 py-4">
          <div>
            <p className="text-sm text-zinc-500 dark:text-zinc-400">
              {selected.length === 0
                ? "Ninguna categoría seleccionada"
                : `Total combinado — ${selected.join(", ")}`}
            </p>
            <p className="mt-1 text-xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
              ${combinedTotal.toLocaleString()}
            </p>
          </div>
          {selected.length > 0 && (
            <button
              onClick={() => setSelected([])}
              className="text-xs font-medium text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-50 transition-colors"
            >
              Limpiar selección
            </button>
          )}
        </div>

        {selected.length > 0 && (
          <div className="mt-6">
            <p className="text-sm font-medium text-zinc-900 dark:text-zinc-50 mb-3">
              Movimientos de las categorías seleccionadas
            </p>
            {filteredRows.length > 0 ? (
              <Table
                columns={["Fecha", "Categoría", "Cliente asociado", "Descripción", "Valor", "Estado"]}
                rows={filteredRows}
              />
            ) : (
              <p className="text-sm text-zinc-400 dark:text-zinc-500">
                No hay movimientos registrados para esta selección todavía.
              </p>
            )}
          </div>
        )}
      </Card>
    </PageShell>
  );
}
