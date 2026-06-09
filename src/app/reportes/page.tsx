"use client";

import { useState } from "react";
import PageShell from "@/components/PageShell";
import { Card } from "@/components/ui";
import CashFlowSankey from "@/components/charts/CashFlowSankey";
import {
  PnLStackedArea, MonthlySummary, QuarterlySummary, PayrollReport,
  ProvidersReport, ClientsReport, BusinessUnitReport,
} from "@/components/charts/ReportCharts";
import FinancialMetrics from "@/components/FinancialMetrics";
import { FileDown, FileSpreadsheet, FileText } from "lucide-react";

const editableClass =
  "w-full rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 px-3 py-1.5 text-sm text-zinc-700 dark:text-zinc-200 outline-none focus:border-zinc-400 dark:focus:border-zinc-600";

function BudgetVsRealityPanel() {
  const [real, setReal] = useState({ nomina: "7,200", productividad: "94%", rotacion: "1" });
  const [meta, setMeta] = useState({ nomina: "7,100", productividad: "90%", rotacion: "≤ 2" });

  const Field = ({ label, value, onChange }: { label: string; value: string; onChange: (v: string) => void }) => (
    <div>
      <p className="mb-1 text-xs text-zinc-500 dark:text-zinc-400">{label}</p>
      <input className={editableClass} value={value} onChange={(e) => onChange(e.target.value)} />
    </div>
  );

  return (
    <div className="mt-8">
      <p className="mb-3 text-xs font-medium text-zinc-400 dark:text-zinc-500 uppercase tracking-wide">Realidad de la empresa (este período)</p>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Field label="Nómina ejecutada (USD)" value={real.nomina} onChange={(v) => setReal((r) => ({ ...r, nomina: v }))} />
        <Field label="Productividad del equipo" value={real.productividad} onChange={(v) => setReal((r) => ({ ...r, productividad: v }))} />
        <Field label="Rotación de personal (mes)" value={real.rotacion} onChange={(v) => setReal((r) => ({ ...r, rotacion: v }))} />
      </div>

      <div className="my-8 border-t border-dashed border-zinc-200 dark:border-zinc-800" />

      <p className="mb-3 text-xs font-medium text-zinc-400 dark:text-zinc-500 uppercase tracking-wide">Expectativa / presupuesto ideal de la empresa</p>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Field label="Presupuesto de nómina (USD)" value={meta.nomina} onChange={(v) => setMeta((m) => ({ ...m, nomina: v }))} />
        <Field label="Meta de productividad" value={meta.productividad} onChange={(v) => setMeta((m) => ({ ...m, productividad: v }))} />
        <Field label="Rotación máxima aceptable" value={meta.rotacion} onChange={(v) => setMeta((m) => ({ ...m, rotacion: v }))} />
      </div>
      <p className="mt-3 text-[11px] text-zinc-400 dark:text-zinc-500">
        Edita estos valores para comparar la realidad de la empresa contra sus propias metas — los datos no están relacionados visualmente a propósito, para que cada bloque se lea de forma independiente.
      </p>
    </div>
  );
}

const reports = [
  "Flujo de Caja",
  "Reportes Financieros",
  "Reporte por Unidad de Negocio",
  "Resumen Trimestral",
  "Reporte Mensual",
  "Reporte por Cliente",
  "Reporte de Nómina",
  "Reporte de Proveedores",
  "Estado de Resultados (P&L)",
];

export default function ReportesPage() {
  const [selected, setSelected] = useState(reports[0]);

  return (
    <PageShell title="Reportes">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
        <Card title="Reportes disponibles" className="lg:col-span-1">
          <div className="space-y-1">
            {reports.map((r) => (
              <button
                key={r}
                onClick={() => setSelected(r)}
                className={`w-full text-left rounded-lg px-3 py-2 text-sm transition-colors ${
                  selected === r
                    ? "bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-50 font-medium"
                    : "text-zinc-500 dark:text-zinc-400 hover:bg-zinc-50 dark:hover:bg-zinc-800/60 hover:text-zinc-900 dark:hover:text-zinc-50"
                }`}
              >
                {r}
              </button>
            ))}
          </div>
        </Card>

        <div className="lg:col-span-3 space-y-4">
          <Card
            title={selected}
            action={
              <div className="flex items-center gap-2">
                <button className="flex items-center gap-1.5 rounded-lg border border-zinc-200 dark:border-zinc-800 px-3 py-1.5 text-xs text-zinc-600 dark:text-zinc-300 hover:border-zinc-300 dark:hover:border-zinc-700 transition-colors">
                  <FileText size={14} strokeWidth={1.75} />
                  PDF
                </button>
                <button className="flex items-center gap-1.5 rounded-lg border border-zinc-200 dark:border-zinc-800 px-3 py-1.5 text-xs text-zinc-600 dark:text-zinc-300 hover:border-zinc-300 dark:hover:border-zinc-700 transition-colors">
                  <FileSpreadsheet size={14} strokeWidth={1.75} />
                  Excel
                </button>
                <button className="flex items-center gap-1.5 rounded-lg border border-zinc-200 dark:border-zinc-800 px-3 py-1.5 text-xs text-zinc-600 dark:text-zinc-300 hover:border-zinc-300 dark:hover:border-zinc-700 transition-colors">
                  <FileDown size={14} strokeWidth={1.75} />
                  CSV
                </button>
              </div>
            }
          >
            {selected === "Flujo de Caja" && (
              <>
                <p className="text-xs text-zinc-500 dark:text-zinc-400 -mt-2 mb-2">
                  Diagrama de Sankey — Ingreso Bruto → Utilidad Neta · Jun 2026
                </p>
                <CashFlowSankey />
              </>
            )}
            {selected === "Estado de Resultados (P&L)" && (
              <>
                <p className="text-xs text-zinc-500 dark:text-zinc-400 -mt-2 mb-2">Área apilada — Ingresos, Egresos y Utilidad · últimos 6 meses</p>
                <PnLStackedArea />
              </>
            )}
            {selected === "Reportes Financieros" && <FinancialMetrics />}
            {selected === "Resumen Trimestral" && (
              <>
                <p className="text-xs text-zinc-500 dark:text-zinc-400 -mt-2 mb-4">Ingresos, Egresos y Utilidad por trimestre — 2026</p>
                <QuarterlySummary />
              </>
            )}
            {selected === "Reporte Mensual" && (
              <>
                <p className="text-xs text-zinc-500 dark:text-zinc-400 -mt-2 mb-4">
                  KPIs comparados contra el mismo período anterior (ej. Enero 2026 vs. Diciembre 2025, o Q1 2025 vs. Q4 2024)
                </p>
                <MonthlySummary />
              </>
            )}
            {selected === "Reporte de Nómina" && (
              <>
                <PayrollReport />
                <BudgetVsRealityPanel />
              </>
            )}
            {selected === "Reporte de Proveedores" && (
              <>
                <p className="text-xs text-zinc-500 dark:text-zinc-400 -mt-2 mb-4">Estado de pago y ranking de gasto por proveedor</p>
                <ProvidersReport />
              </>
            )}
            {selected === "Reporte por Cliente" && (
              <>
                <p className="text-xs text-zinc-500 dark:text-zinc-400 -mt-2 mb-4">Clientes ordenados por ingreso generado, con estado de cuenta</p>
                <ClientsReport />
              </>
            )}
            {selected === "Reporte por Unidad de Negocio" && (
              <>
                <p className="text-xs text-zinc-500 dark:text-zinc-400 -mt-2 mb-4">Mix de negocio, comparación de rentabilidad y scorecard por unidad</p>
                <BusinessUnitReport />
              </>
            )}
          </Card>
        </div>
      </div>
    </PageShell>
  );
}
