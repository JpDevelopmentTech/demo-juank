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

const tabs = ["General", "Regalías", "Ads", "Music Business"] as const;

const regalias = [
  ["12 Jun 2026", "Maluma", "Streaming Spotify", "May 2026", <DualValue key="r1" usd="$1,240.00" cop="$5,027,022" original="USD" />, <Badge key="1" color="green">Soportado</Badge>],
  ["10 Jun 2026", "Karol G", "YouTube Content ID", "May 2026", <DualValue key="r2" usd="$890.50" cop="$3,610,131" original="USD" />, <Badge key="2" color="amber">Pendiente de Soporte</Badge>],
  ["08 Jun 2026", "+Vallenato", "Regalías mecánicas", "Abr 2026", <DualValue key="r3" usd="$2,100.00" cop="$8,513,505" original="USD" />, <Badge key="3" color="green">Soportado</Badge>],
  ["02 Jun 2026", "Silvestre Dangond", "Distribución digital", "Abr 2026", <DualValue key="r4" usd="$540.00" cop="$2,189,187" original="USD" />, <Badge key="4" color="gray">Registrado</Badge>],
];

const ads = [
  ["11 Jun 2026", "Peso Pluma", "Meta", <DualValue key="a1" usd="$74.00" cop="$300,000" original="COP" />, "20%", <DualValue key="a1c" usd="$14.80" cop="$60,000" original="COP" />, <Badge key="1" color="green">Soportado</Badge>],
  ["09 Jun 2026", "Manuel Turizo", "TikTok", <DualValue key="a2" usd="$100" cop="$405,405" original="USD" />, "20%", <DualValue key="a2c" usd="$20" cop="$81,081" original="USD" />, <Badge key="2" color="amber">Pendiente de Soporte</Badge>],
  ["05 Jun 2026", "Camilo", "Spotify", <DualValue key="a3" usd="$74.00" cop="$300,000" original="COP" />, "Valor fijo", "—", <Badge key="3" color="green">Soportado</Badge>],
  ["01 Jun 2026", "Beéle", "YouTube", <DualValue key="a4" usd="$100" cop="$405,405" original="USD" />, "20%", <DualValue key="a4c" usd="$20" cop="$81,081" original="USD" />, <Badge key="4" color="gray">Registrado</Badge>],
];

const musicBusiness = [
  ["07 Jun 2026", "Carlos Vives", "Administración de Derechos", <DualValue key="m1" usd="$3,500.00" cop="$14,189,175" original="USD" />, <DualValue key="m1c" usd="$700.00" cop="$2,837,835" original="USD" />, <DualValue key="m1u" usd="$2,800.00" cop="$11,351,340" original="USD" />, <Badge key="1" color="green">Soportado</Badge>],
  ["03 Jun 2026", "Fonseca", "Organización de Catálogo", <DualValue key="m2" usd="$1,800.00" cop="$7,297,290" original="USD" />, <DualValue key="m2c" usd="$300.00" cop="$1,216,215" original="USD" />, <DualValue key="m2u" usd="$1,500.00" cop="$6,081,075" original="USD" />, <Badge key="2" color="amber">Pendiente de Soporte</Badge>],
  ["28 May 2026", "Jessi Uribe", "Consultoría", <DualValue key="m3" usd="$2,200.00" cop="$8,918,910" original="USD" />, <DualValue key="m3c" usd="$0.00" cop="$0" original="USD" />, <DualValue key="m3u" usd="$2,200.00" cop="$8,918,910" original="USD" />, <Badge key="3" color="green">Soportado</Badge>],
];

// Vista consolidada — todas las líneas de negocio en una sola tabla
const general = [
  ["12 Jun 2026", <Badge key="l1" color="gray">Regalías</Badge>, "Maluma", "Streaming Spotify", <DualValue key="g1" usd="$1,240.00" cop="$5,027,022" original="USD" />, <Badge key="1" color="green">Soportado</Badge>],
  ["11 Jun 2026", <Badge key="l2" color="gray">Ads</Badge>, "Peso Pluma", "Meta — Inversión", <DualValue key="g2" usd="$74.00" cop="$300,000" original="COP" />, <Badge key="2" color="green">Soportado</Badge>],
  ["10 Jun 2026", <Badge key="l3" color="gray">Regalías</Badge>, "Karol G", "YouTube Content ID", <DualValue key="g3" usd="$890.50" cop="$3,610,131" original="USD" />, <Badge key="3" color="amber">Pendiente de Soporte</Badge>],
  ["09 Jun 2026", <Badge key="l4" color="gray">Ads</Badge>, "Manuel Turizo", "TikTok — Inversión", <DualValue key="g4" usd="$100" cop="$405,405" original="USD" />, <Badge key="4" color="amber">Pendiente de Soporte</Badge>],
  ["08 Jun 2026", <Badge key="l5" color="gray">Regalías</Badge>, "+Vallenato", "Regalías mecánicas", <DualValue key="g5" usd="$2,100.00" cop="$8,513,505" original="USD" />, <Badge key="5" color="green">Soportado</Badge>],
  ["07 Jun 2026", <Badge key="l6" color="gray">Music Business</Badge>, "Carlos Vives", "Administración de Derechos", <DualValue key="g6" usd="$3,500.00" cop="$14,189,175" original="USD" />, <Badge key="6" color="green">Soportado</Badge>],
  ["05 Jun 2026", <Badge key="l7" color="gray">Ads</Badge>, "Camilo", "Spotify — Inversión", <DualValue key="g7" usd="$74.00" cop="$300,000" original="COP" />, <Badge key="7" color="green">Soportado</Badge>],
  ["03 Jun 2026", <Badge key="l8" color="gray">Music Business</Badge>, "Fonseca", "Organización de Catálogo", <DualValue key="g8" usd="$1,800.00" cop="$7,297,290" original="USD" />, <Badge key="8" color="amber">Pendiente de Soporte</Badge>],
  ["02 Jun 2026", <Badge key="l9" color="gray">Regalías</Badge>, "Silvestre Dangond", "Distribución digital", <DualValue key="g9" usd="$540.00" cop="$2,189,187" original="USD" />, <Badge key="9" color="gray">Registrado</Badge>],
  ["01 Jun 2026", <Badge key="l10" color="gray">Ads</Badge>, "Beéle", "YouTube — Inversión", <DualValue key="g10" usd="$100" cop="$405,405" original="USD" />, <Badge key="10" color="gray">Registrado</Badge>],
  ["28 May 2026", <Badge key="l11" color="gray">Music Business</Badge>, "Jessi Uribe", "Consultoría", <DualValue key="g11" usd="$2,200.00" cop="$8,918,910" original="USD" />, <Badge key="11" color="green">Soportado</Badge>],
];

// Cada transacción guarda su valor original (USD y/o COP) más la TRM del día en que se registró,
// así el sistema siempre puede consolidar todo a un único número de referencia en USD.
const summary: Record<
  (typeof tabs)[number],
  { totalUsd: string; breakdownBase: string; trm?: string; movimientosTotales: number; movimientos: number; pendientes: number }
> = {
  General: { totalUsd: "$13,140.50", breakdownBase: "$12,400.50 USD + $600,000 COP", trm: "$4,054.05", movimientosTotales: 184, movimientos: 11, pendientes: 4 },
  Regalías: { totalUsd: "$4,770.50", breakdownBase: "$4,770.50 USD", movimientosTotales: 96, movimientos: 4, pendientes: 1 },
  Ads: { totalUsd: "$288.02", breakdownBase: "$140 USD + $600,000 COP", trm: "$4,054.05", movimientosTotales: 52, movimientos: 4, pendientes: 1 },
  "Music Business": { totalUsd: "$7,500.00", breakdownBase: "$7,500.00 USD", movimientosTotales: 36, movimientos: 3, pendientes: 2 },
};

export default function IngresosPage() {
  const [tab, setTab] = useState<(typeof tabs)[number]>("General");
  const { totalUsd, breakdownBase, trm, movimientosTotales, movimientos, pendientes } = summary[tab];

  return (
    <PageShell title="Ingresos">
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
        <NewItemButton label="Nuevo ingreso" />
      </div>

      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <div className="flex items-center gap-1.5 text-zinc-400 dark:text-zinc-500">
            <InfinityIcon size={13} strokeWidth={2} />
            <p className="text-sm">Ingresos Totales USD (lifetime)</p>
          </div>
          <p className="mt-2 text-2xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">$184,260.00</p>
        </Card>
        <Card>
          <div className="flex items-center gap-1.5 text-zinc-400 dark:text-zinc-500">
            <InfinityIcon size={13} strokeWidth={2} />
            <p className="text-sm">Ingresos Totales COP (lifetime)</p>
          </div>
          <p className="mt-2 text-2xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">$48,200,000</p>
        </Card>
        <Card>
          <p className="text-sm text-zinc-500 dark:text-zinc-400">Ingresos del Período USD</p>
          <p className="mt-2 text-2xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">$12,400.50</p>
          <p className="mt-1 text-xs text-zinc-400 dark:text-zinc-500">Según el período analizado</p>
        </Card>
        <Card>
          <p className="text-sm text-zinc-500 dark:text-zinc-400">Ingresos del Período COP</p>
          <p className="mt-2 text-2xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">$600,000</p>
          <p className="mt-1 text-xs text-zinc-400 dark:text-zinc-500">Según el período analizado</p>
        </Card>
      </section>

      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <p className="text-sm text-zinc-500 dark:text-zinc-400">
            {tab === "General" ? "Total Ingresos (todas las líneas)" : `Total ${tab}`}
          </p>
          <p className="mt-2 text-2xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
            {totalUsd} <span className="text-sm font-normal text-zinc-400 dark:text-zinc-500">USD</span>
          </p>
          <p className="mt-1 text-xs text-zinc-400 dark:text-zinc-500">
            {breakdownBase}
            {trm && <TrmTag value={trm} />}
          </p>
        </Card>
        <Card>
          <div className="flex items-center gap-1.5 text-zinc-400 dark:text-zinc-500">
            <InfinityIcon size={13} strokeWidth={2} />
            <p className="text-sm">Movimientos registrados totales</p>
          </div>
          <p className="mt-2 text-2xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
            {movimientosTotales}
          </p>
        </Card>
        <Card>
          <p className="text-sm text-zinc-500 dark:text-zinc-400">Movimientos del Período</p>
          <p className="mt-2 text-2xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
            {movimientos}
          </p>
          <p className="mt-1 text-xs text-zinc-400 dark:text-zinc-500">Según el período analizado</p>
        </Card>
        <Card>
          <p className="text-sm text-zinc-500 dark:text-zinc-400">Pendientes de soporte</p>
          <p className="mt-2 text-2xl font-semibold tracking-tight text-amber-500">{pendientes}</p>
        </Card>
      </section>

      <Card title={tab === "General" ? "Movimientos — Todas las líneas de negocio" : `Movimientos — ${tab}`}>
        {tab === "General" && (
          <Table
            columns={["Fecha", "Línea de negocio", "Cliente", "Concepto", "Valor", "Estado"]}
            rows={general}
          />
        )}
        {tab === "Regalías" && (
          <Table
            columns={["Fecha", "Cliente", "Concepto", "Período", "Valor", "Estado"]}
            rows={regalias}
          />
        )}
        {tab === "Ads" && (
          <Table
            columns={["Fecha", "Cliente", "Plataforma", "Inversión", "Comisión", "Utilidad", "Estado"]}
            rows={ads}
          />
        )}
        {tab === "Music Business" && (
          <Table
            columns={["Fecha", "Cliente", "Servicio", "Valor", "Costos", "Utilidad", "Estado"]}
            rows={musicBusiness}
          />
        )}
      </Card>
    </PageShell>
  );
}
