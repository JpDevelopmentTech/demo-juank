"use client";

import { useState } from "react";
import { Card } from "@/components/ui";
import {
  TrendingUp, TrendingDown, Lightbulb, AlertTriangle, Sparkles, Send,
  CircleCheck, CircleAlert, CircleX,
} from "lucide-react";

type Status = "green" | "amber" | "red";

type Metric = {
  key: string;
  name: string;
  value: string;
  formula: string;
  status: Status;
  explanation: string;
  interpretation: string;
  actions: string[];
};

const dot: Record<Status, string> = {
  green: "bg-emerald-500",
  amber: "bg-amber-500",
  red: "bg-red-500",
};

const statusIcon: Record<Status, typeof CircleCheck> = {
  green: CircleCheck,
  amber: CircleAlert,
  red: CircleX,
};

const statusText: Record<Status, string> = {
  green: "text-emerald-600 dark:text-emerald-400",
  amber: "text-amber-600 dark:text-amber-400",
  red: "text-red-500 dark:text-red-400",
};

const statusBg: Record<Status, string> = {
  green: "bg-emerald-50 dark:bg-emerald-500/10",
  amber: "bg-amber-50 dark:bg-amber-500/10",
  red: "bg-red-50 dark:bg-red-500/10",
};

const statusBorder: Record<Status, string> = {
  green: "border-emerald-500",
  amber: "border-amber-500",
  red: "border-red-500",
};

const statusLabel: Record<Status, string> = {
  green: "Saludable",
  amber: "Atención",
  red: "Crítico",
};

// Catálogo de métricas — valores calculados a partir de los datos del mes en curso (Jun 2026).
const metrics: Record<string, Metric> = {
  margenBruto: {
    key: "margenBruto",
    name: "Margen Bruto",
    value: "58.2%",
    formula: "(Ingresos − Costo directo) / Ingresos",
    status: "green",
    explanation: "Mide cuánto te queda de cada dólar que facturas, después de cubrir los costos directamente ligados a producir ese ingreso (ej. honorarios de producción, costos de distribución).",
    interpretation: "Por cada $100 que factura Escorcia Music, quedan $58.2 antes de gastos generales — un margen sólido para el sector de management musical.",
    actions: [
      "Mantén la mezcla actual de líneas de ingreso (Regalías, Ads, Music Business) que sostiene este margen.",
      "Evalúa renegociar tarifas con proveedores de costo directo para llevar el margen aún más arriba.",
      "Documenta qué clientes generan el mejor margen bruto y prioriza su crecimiento.",
    ],
  },
  margenNeto: {
    key: "margenNeto",
    name: "Margen Neto",
    value: "16.4%",
    formula: "Utilidad Neta / Ingresos Totales",
    status: "amber",
    explanation: "Es el porcentaje de cada dólar de ingreso que realmente se convierte en ganancia, después de pagar absolutamente todo: nómina, operación, impuestos y demás gastos.",
    interpretation: "De cada $100 que entra a Escorcia Music, $16.4 se quedan como utilidad real — está en zona de atención: saludable, pero con espacio para mejorar antes de considerarse robusto.",
    actions: [
      "Revisa las categorías de egreso con mayor crecimiento este mes (Ads y Nómina) y evalúa si el retorno justifica el gasto.",
      "Define una meta de margen neto del 20% para el próximo trimestre y monitoréala mensualmente.",
      "Negocia condiciones de pago con proveedores recurrentes para mejorar el flujo sin sacrificar el margen.",
    ],
  },
  ebitda: {
    key: "ebitda",
    name: "EBITDA",
    value: "$10,850",
    formula: "Utilidad Operativa + Depreciación + Amortización",
    status: "green",
    explanation: "Muestra cuánto efectivo genera el negocio con su operación principal, sin contar gastos financieros ni contables que no implican salida real de dinero.",
    interpretation: "Escorcia Music genera cerca de $10,850 USD de caja operativa este mes, lo cual da margen para invertir en crecimiento sin depender de financiamiento externo.",
    actions: [
      "Destina una porción fija del EBITDA mensual a un fondo de reinversión (ej. marketing o nuevas firmas).",
      "Compara el EBITDA mes a mes para detectar cambios de tendencia temprano.",
      "Usa este indicador — no la utilidad neta — al evaluar la salud operativa real del negocio.",
    ],
  },
  margenEbitda: {
    key: "margenEbitda",
    name: "Margen EBITDA",
    value: "27.3%",
    formula: "EBITDA / Ingresos Totales",
    status: "green",
    explanation: "Indica qué porcentaje de tus ingresos se convierte en efectivo operativo, antes de gastos financieros, impuestos y depreciación.",
    interpretation: "Con un margen EBITDA de 27.3%, la operación de Escorcia Music es eficiente generando caja — está por encima del benchmark del sector (15–25%).",
    actions: [
      "Mantén el control de costos operativos que ha permitido sostener este margen.",
      "Usa el excedente de caja operativa para amortizar deudas o construir un colchón de reserva.",
      "Replica las prácticas de las unidades de negocio con mejor margen EBITDA en las demás.",
    ],
  },
  margenOperativo: {
    key: "margenOperativo",
    name: "Margen Operativo",
    value: "21.6%",
    formula: "Utilidad Operativa / Ingresos Totales",
    status: "amber",
    explanation: "Mide la rentabilidad del negocio considerando solo los ingresos y gastos de la operación diaria, sin contar impuestos ni gastos financieros.",
    interpretation: "El 21.6% de margen operativo es saludable, pero conviene vigilar el crecimiento de los gastos de operación para que no erosionen este número en los próximos meses.",
    actions: [
      "Identifica qué línea operativa creció más este trimestre y evalúa si es un gasto puntual o estructural.",
      "Establece un presupuesto operativo mensual por categoría y compáralo contra lo ejecutado.",
      "Prioriza inversiones operativas que tengan retorno medible en menos de 6 meses.",
    ],
  },
  roe: {
    key: "roe",
    name: "ROE",
    value: "14.8%",
    formula: "Utilidad Neta / Patrimonio",
    status: "amber",
    explanation: "Muestra qué tan bien estás usando el capital propio del negocio para generar ganancias — entre más alto, mejor retorno le estás dando a lo invertido.",
    interpretation: "Por cada $100 de patrimonio, el negocio genera $14.8 de utilidad al año — un retorno aceptable, con espacio para optimizarse reinvirtiendo en líneas de mayor margen.",
    actions: [
      "Evalúa redirigir utilidades retenidas hacia las unidades de negocio con mejor retorno (ej. Regalías).",
      "Revisa si hay activos subutilizados que estén reduciendo el retorno sobre el patrimonio.",
      "Compara este ROE contra el de periodos anteriores para confirmar si la tendencia es positiva.",
    ],
  },
  roa: {
    key: "roa",
    name: "ROA",
    value: "11.2%",
    formula: "Utilidad Neta / Activos Totales",
    status: "green",
    explanation: "Indica qué tan eficientemente el negocio convierte sus activos (cuentas por cobrar, equipos, efectivo) en ganancias.",
    interpretation: "Cada $100 en activos generan $11.2 de utilidad — una eficiencia saludable que indica que los recursos del negocio están bien aprovechados.",
    actions: [
      "Sigue priorizando activos que generen ingreso recurrente (catálogos, contratos a largo plazo).",
      "Revisa periódicamente activos inactivos o de bajo rendimiento que puedan liquidarse o reasignarse.",
      "Usa este indicador junto al ROE para tener una vista completa de la eficiencia del capital.",
    ],
  },
  puntoEquilibrio: {
    key: "puntoEquilibrio",
    name: "Punto de Equilibrio",
    value: "$14,200 / mes",
    formula: "Costos Fijos / (1 − (Costos Variables / Ingresos))",
    status: "green",
    explanation: "Es el monto mínimo que necesitas facturar al mes para cubrir todos tus costos — por encima de esa línea, todo es ganancia.",
    interpretation: "Con ingresos actuales de $25,900, Escorcia Music opera $11,700 por encima de su punto de equilibrio — un colchón saludable ante meses más flojos.",
    actions: [
      "Mantén un fondo de reserva equivalente a 1–2 meses de punto de equilibrio para amortiguar caídas estacionales.",
      "Recalcula este número cada vez que se firme un contrato grande de costo fijo (ej. nuevas contrataciones).",
      "Usa este valor como referencia mínima al planear campañas o inversiones nuevas.",
    ],
  },
  flujoCajaLibre: {
    key: "flujoCajaLibre",
    name: "Flujo de Caja Libre",
    value: "$6,420",
    formula: "Flujo Operativo − Inversiones de Capital (CapEx)",
    status: "green",
    explanation: "Es el efectivo que le queda al negocio después de pagar sus gastos operativos e inversiones — el dinero realmente disponible para crecer, repartir o ahorrar.",
    interpretation: "Escorcia Music genera $6,420 de caja libre este mes, lo que permite financiar crecimiento sin necesidad de deuda adicional.",
    actions: [
      "Define con anticipación en qué se usará este excedente (reserva, inversión, distribución).",
      "Evita comprometer el flujo libre en gastos fijos nuevos sin evaluar el impacto en meses bajos.",
      "Monitorea esta cifra mes a mes — una caída sostenida suele anticipar problemas de liquidez.",
    ],
  },
  diasCobro: {
    key: "diasCobro",
    name: "Días de Cobro (DSO)",
    value: "29 días",
    formula: "(Cuentas por Cobrar / Ingresos) × Días del período",
    status: "amber",
    explanation: "Indica, en promedio, cuántos días tardas en recibir el pago después de facturar a un cliente.",
    interpretation: "Te toma en promedio 29 días cobrar — está dentro del rango aceptable, pero reducirlo a 20 días liberaría cerca de $3,200 adicionales en flujo de caja mensual.",
    actions: [
      "Activa recordatorios automáticos de pago a los 7 y 15 días de emitida la factura.",
      "Ofrece un pequeño descuento por pronto pago a los clientes con mayor historial de mora.",
      "Prioriza el seguimiento de las cuentas con más de 30 días de antigüedad.",
    ],
  },
  crecimientoYoY: {
    key: "crecimientoYoY",
    name: "Crecimiento YoY",
    value: "+12.6%",
    formula: "(Ingresos período actual − Ingresos mismo período año anterior) / Ingresos año anterior",
    status: "green",
    explanation: "Compara los ingresos de este momento contra el mismo momento del año pasado, para ver si el negocio está creciendo de verdad (no solo por estacionalidad).",
    interpretation: "Escorcia Music creció 12.6% frente al mismo mes del año pasado — un ritmo saludable que supera el benchmark del sector (10%).",
    actions: [
      "Identifica qué línea de negocio impulsó este crecimiento y evalúa si es replicable.",
      "Define una meta de crecimiento YoY para el cierre de año y revísala trimestralmente.",
      "Reinvierte parte del crecimiento en las áreas que más contribuyeron a este resultado.",
    ],
  },
  razonCorriente: {
    key: "razonCorriente",
    name: "Razón Corriente",
    value: "1.8",
    formula: "Activos Corrientes / Pasivos Corrientes",
    status: "green",
    explanation: "Mide si tienes suficiente efectivo y activos de corto plazo para cubrir tus deudas inmediatas — entre más alto (sin ser excesivo), más tranquilidad financiera.",
    interpretation: "Por cada $1 de deuda de corto plazo, Escorcia Music tiene $1.80 disponibles para cubrirla — una posición de liquidez cómoda.",
    actions: [
      "Mantén un colchón de liquidez similar de cara a compromisos estacionales (ej. fin de año).",
      "Evita inmovilizar demasiado efectivo en activos poco líquidos que reduzcan este ratio.",
      "Revisa este indicador antes de asumir nuevas obligaciones de pago a corto plazo.",
    ],
  },
  pruebaAcida: {
    key: "pruebaAcida",
    name: "Prueba Ácida",
    value: "1.4",
    formula: "(Activos Corrientes − Inventario) / Pasivos Corrientes",
    status: "green",
    explanation: "Es una versión más estricta de la razón corriente: mide tu capacidad de pagar deudas inmediatas sin depender de vender inventario o activos menos líquidos.",
    interpretation: "Con 1.4, Escorcia Music puede cubrir sus obligaciones de corto plazo solo con activos líquidos — una señal de solidez financiera.",
    actions: [
      "Sigue priorizando el efectivo y las cuentas por cobrar de rápida rotación sobre activos menos líquidos.",
      "Usa este indicador junto a la razón corriente para validar la calidad real de tu liquidez.",
      "Revisa este número antes de comprometerte con pagos grandes o anticipados a proveedores.",
    ],
  },
  diasCaja: {
    key: "diasCaja",
    name: "Días de Caja",
    value: "47 días",
    formula: "Efectivo disponible / (Gastos operativos diarios promedio)",
    status: "amber",
    explanation: "Indica cuántos días podría operar el negocio usando solo el efectivo disponible, sin recibir ningún ingreso nuevo.",
    interpretation: "Escorcia Music podría sostener su operación 47 días sin nuevos ingresos — aceptable, aunque se recomienda construir hacia 60+ días para mayor tranquilidad.",
    actions: [
      "Destina un porcentaje fijo del flujo de caja libre mensual a fortalecer la reserva de efectivo.",
      "Revisa gastos operativos recurrentes que puedan reducirse sin afectar la operación.",
      "Define un mínimo de días de caja como política interna antes de aprobar gastos grandes.",
    ],
  },
  rotacionCxC: {
    key: "rotacionCxC",
    name: "Rotación CxC",
    value: "8.4x / año",
    formula: "Ingresos a Crédito / Cuentas por Cobrar promedio",
    status: "green",
    explanation: "Mide cuántas veces al año cobras y vuelves a generar tus cuentas por cobrar — entre más alto, más rápido conviertes ventas en efectivo.",
    interpretation: "Escorcia Music recupera su cartera cerca de 8.4 veces al año, lo que refleja una gestión de cobro eficiente frente al tamaño del negocio.",
    actions: [
      "Mantén las políticas de crédito actuales con los clientes de buen historial de pago.",
      "Sé más selectivo al otorgar crédito a clientes nuevos sin historial comprobado.",
      "Combina este indicador con el DSO para detectar oportunidades puntuales de mejora.",
    ],
  },
  diasPago: {
    key: "diasPago",
    name: "Días de Pago (DPO)",
    value: "34 días",
    formula: "(Cuentas por Pagar / Costo de Ventas) × Días del período",
    status: "green",
    explanation: "Indica cuántos días, en promedio, te toma pagarle a tus proveedores — un número saludable te da margen de maniobra sin dañar tus relaciones comerciales.",
    interpretation: "Escorcia Music paga a sus proveedores cada 34 días en promedio, un balance razonable entre conservar efectivo y mantener buenas relaciones comerciales.",
    actions: [
      "Aprovecha este margen para alinear mejor las salidas de efectivo con los cobros entrantes (DSO).",
      "Negocia plazos preferenciales con los proveedores estratégicos de mayor volumen.",
      "Evita extender este plazo más allá de lo acordado para no afectar la confianza comercial.",
    ],
  },
  nominaIngresos: {
    key: "nominaIngresos",
    name: "% Nómina sobre Ingresos",
    value: "27.8%",
    formula: "Gasto en Nómina / Ingresos Totales",
    status: "amber",
    explanation: "Muestra qué porcentaje de lo que factura el negocio se destina a pagar a su equipo — útil para saber si la estructura de personal es sostenible frente a lo que entra.",
    interpretation: "La nómina representa el 27.8% de los ingresos — está por encima del benchmark del sector (20–25%), lo que vale la pena vigilar de cerca.",
    actions: [
      "Evalúa si el equipo actual está alineado con la carga de trabajo real antes de nuevas contrataciones.",
      "Busca formas de aumentar los ingresos por persona (ej. nuevas líneas de negocio) en vez de reducir personal.",
      "Revisa este ratio cada trimestre — una tendencia al alza sostenida amerita un plan de ajuste.",
    ],
  },
  cac: {
    key: "cac",
    name: "CAC",
    value: "$340",
    formula: "Gasto total en adquisición / Nuevos clientes adquiridos",
    status: "green",
    explanation: "Es lo que cuesta, en promedio, conseguir un cliente nuevo — sumando todo lo invertido en marketing, publicidad y comercial.",
    interpretation: "Cada cliente nuevo le cuesta a Escorcia Music alrededor de $340 — una cifra saludable considerando el valor promedio que generan los clientes actuales (LTV).",
    actions: [
      "Compara el CAC contra el LTV regularmente — un LTV de al menos 3x el CAC es una buena señal.",
      "Identifica qué canal de adquisición trae clientes al menor costo y prioriza la inversión ahí.",
      "Revisa este número cada vez que ajustes el presupuesto de marketing o Ads.",
    ],
  },
  deudaPatrimonio: {
    key: "deudaPatrimonio",
    name: "Ratio Deuda/Patrimonio",
    value: "0.42",
    formula: "Pasivo Total / Patrimonio",
    status: "green",
    explanation: "Compara cuánto debe el negocio frente a lo que realmente posee — un número bajo indica que dependes poco de financiamiento externo.",
    interpretation: "Por cada $1 de patrimonio, Escorcia Music debe $0.42 — una estructura financiera sana y con baja dependencia de deuda.",
    actions: [
      "Aprovecha esta posición para negociar mejores condiciones si necesitas financiamiento futuro.",
      "Evita incrementar la deuda sin un plan claro de retorno que justifique el apalancamiento.",
      "Revisa este ratio antes de asumir compromisos financieros de largo plazo.",
    ],
  },
  coberturaIntereses: {
    key: "coberturaIntereses",
    name: "Cobertura de Intereses",
    value: "9.2x",
    formula: "Utilidad Operativa / Gastos por Intereses",
    status: "green",
    explanation: "Indica qué tan fácil es para el negocio pagar los intereses de su deuda con lo que genera operativamente — entre más alto, menor el riesgo de no poder cumplir.",
    interpretation: "Escorcia Music genera 9.2 veces lo necesario para cubrir sus intereses — una posición muy cómoda frente a sus obligaciones financieras actuales.",
    actions: [
      "Mantén el nivel de endeudamiento actual, que no compromete la operación del negocio.",
      "Usa esta solidez como argumento si necesitas negociar nuevas líneas de crédito.",
      "Vigila este indicador si decides aumentar el apalancamiento en el futuro.",
    ],
  },
  deudaNetaEbitda: {
    key: "deudaNetaEbitda",
    name: "Deuda Neta / EBITDA",
    value: "1.1x",
    formula: "(Deuda Total − Efectivo) / EBITDA",
    status: "green",
    explanation: "Muestra cuántos años de generación de caja operativa tomaría pagar toda la deuda neta del negocio — entre más bajo, menos riesgoso.",
    interpretation: "Con 1.1x, Escorcia Music podría pagar su deuda neta con poco más de un año de EBITDA — un nivel de apalancamiento bajo y manejable.",
    actions: [
      "Mantén este nivel de apalancamiento conservador, que da flexibilidad ante imprevistos.",
      "Si planeas tomar nueva deuda, evalúa el impacto proyectado en este ratio antes de comprometerte.",
      "Usa este indicador como referencia clave si buscas inversión o financiamiento externo.",
    ],
  },
  crecimientoMoM: {
    key: "crecimientoMoM",
    name: "Crecimiento MoM",
    value: "+3.1%",
    formula: "(Ingresos mes actual − Ingresos mes anterior) / Ingresos mes anterior",
    status: "green",
    explanation: "Compara los ingresos de este mes contra el mes inmediatamente anterior — útil para detectar cambios de corto plazo en el negocio.",
    interpretation: "Los ingresos crecieron 3.1% respecto al mes pasado — una tendencia positiva de corto plazo que vale la pena sostener.",
    actions: [
      "Identifica qué generó el incremento este mes y evalúa si es algo replicable o puntual.",
      "Compara esta cifra con el crecimiento YoY para distinguir tendencias reales de variaciones estacionales.",
      "Documenta los meses con crecimiento fuerte para identificar patrones estacionales del negocio.",
    ],
  },
  ltv: {
    key: "ltv",
    name: "LTV",
    value: "$4,850",
    formula: "Valor promedio de compra × Frecuencia × Duración de la relación",
    status: "green",
    explanation: "Estima cuánto dinero genera, en promedio, un cliente durante todo el tiempo que trabaja con Escorcia Music.",
    interpretation: "Cada cliente le genera en promedio $4,850 a lo largo de su relación con la empresa — un valor saludable frente al costo de adquisición (CAC) actual.",
    actions: [
      "Invierte en mantener relaciones de largo plazo — pequeñas mejoras en retención impactan fuertemente este número.",
      "Identifica el perfil de los clientes con mayor LTV y prioriza la búsqueda de perfiles similares.",
      "Combina este dato con el CAC para decidir cuánto invertir de forma sostenible en adquisición.",
    ],
  },
  retencion: {
    key: "retencion",
    name: "Tasa de Retención",
    value: "91.4%",
    formula: "(Clientes al final − Clientes nuevos) / Clientes al inicio del período",
    status: "green",
    explanation: "Mide qué porcentaje de tus clientes se quedan contigo durante un período determinado — un número alto refleja relaciones sólidas y servicio consistente.",
    interpretation: "Escorcia Music retiene al 91.4% de sus clientes — una señal muy positiva de la calidad de las relaciones comerciales y del servicio prestado.",
    actions: [
      "Identifica qué prácticas han contribuido a esta retención y formalízalas como estándar del equipo.",
      "Da seguimiento cercano al pequeño porcentaje de clientes que no se retiene para entender las causas.",
      "Aprovecha la confianza de los clientes retenidos para explorar nuevas líneas de servicio con ellos.",
    ],
  },
};

const tabs = [
  { name: "Esenciales", metrics: ["margenBruto", "margenNeto", "ebitda", "flujoCajaLibre", "diasCobro", "crecimientoYoY"] },
  { name: "Rentabilidad", metrics: ["margenBruto", "margenNeto", "ebitda", "margenEbitda", "margenOperativo", "roe", "roa", "puntoEquilibrio"] },
  { name: "Liquidez", metrics: ["razonCorriente", "pruebaAcida", "flujoCajaLibre", "diasCaja"] },
  { name: "Eficiencia operativa", metrics: ["rotacionCxC", "diasCobro", "diasPago", "nominaIngresos", "cac"] },
  { name: "Deuda y solvencia", metrics: ["deudaPatrimonio", "coberturaIntereses", "deudaNetaEbitda"] },
  { name: "Crecimiento", metrics: ["crecimientoYoY", "crecimientoMoM", "ltv", "retencion"] },
];

const insights: { icon: typeof TrendingUp; text: string; tag: "Alerta" | "Oportunidad" | "Tendencia" }[] = [
  { icon: TrendingUp, text: "Tu margen neto subió 1.4 pts vs. el mes anterior, impulsado por la reducción en egresos de Ads.", tag: "Tendencia" },
  { icon: AlertTriangle, text: "El DSO está en 29 días. Si lo reduces a 20 días liberarías ~$3,200 adicionales en flujo de caja mensual.", tag: "Oportunidad" },
  { icon: AlertTriangle, text: "La nómina representa el 27.8% de los ingresos. El benchmark del sector está entre 20–25%.", tag: "Alerta" },
  { icon: TrendingDown, text: "Music Business es la única unidad con margen negativo este trimestre. Considerar revisión de estructura de costos.", tag: "Alerta" },
  { icon: TrendingUp, text: "El crecimiento YoY de 12.6% supera el benchmark del sector (10%) — la mezcla de Regalías y Ads está funcionando.", tag: "Oportunidad" },
];

const tagStyles: Record<string, string> = {
  Alerta: "bg-red-50 text-red-600 dark:bg-red-500/10 dark:text-red-400",
  Oportunidad: "bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400",
  Tendencia: "bg-blue-50 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400",
};

export default function FinancialMetrics() {
  const [tab, setTab] = useState(tabs[0].name);
  const [selectedKey, setSelectedKey] = useState("margenNeto");
  const [question, setQuestion] = useState("");

  const active = tabs.find((t) => t.name === tab) ?? tabs[0];
  const selected = metrics[selectedKey];
  const StatusIcon = statusIcon[selected.status];

  return (
    <div className="space-y-5">
      {/* 1. Pestañas horizontales */}
      <div className="flex flex-nowrap gap-1 overflow-x-auto pb-1 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
        {tabs.map((t) => (
          <button
            key={t.name}
            onClick={() => { setTab(t.name); setSelectedKey(t.metrics[0]); }}
            className={`shrink-0 whitespace-nowrap rounded-full border px-2.5 py-1.5 text-xs transition-colors ${
              tab === t.name
                ? "border-zinc-900 dark:border-zinc-50 bg-zinc-900 dark:bg-zinc-50 text-white dark:text-zinc-900 font-medium"
                : "border-zinc-200 dark:border-zinc-800 text-zinc-500 dark:text-zinc-400 hover:border-zinc-300 dark:hover:border-zinc-700"
            }`}
          >
            {t.name}
          </button>
        ))}
      </div>

      {/* 2. Panel de detalle */}
      <Card key={selectedKey} className="animate-[fadeIn_0.25s_ease-out]">
        {/* Sección superior — Concepto */}
        <div>
          <p className="text-xs font-medium text-zinc-400 dark:text-zinc-500 uppercase tracking-wide">Concepto</p>
          <h3 className="mt-1.5 text-base font-medium text-zinc-900 dark:text-zinc-50">{selected.name}</h3>
          <p className="mt-1.5 inline-block rounded-md bg-zinc-100 dark:bg-zinc-800 px-2 py-1 font-mono text-xs text-zinc-500 dark:text-zinc-400">
            {selected.formula}
          </p>
          <p className="mt-2 text-sm leading-relaxed text-zinc-500 dark:text-zinc-400">{selected.explanation}</p>
        </div>

        {/* Línea divisoria horizontal */}
        <div className="my-5 border-t border-zinc-200 dark:border-zinc-800" />

        {/* Sección inferior — Valor + Acciones */}
        <div className="flex flex-col lg:flex-row lg:items-stretch gap-5">
          {/* Columna izquierda — Valor + Interpretación (1fr) */}
          <div className="lg:flex-1 flex flex-col gap-4">
            <div>
              <p className="text-xs font-medium text-zinc-400 dark:text-zinc-500 uppercase tracking-wide">Valor actual</p>
              <div className="mt-1.5 flex items-center gap-3">
                <p className="text-3xl font-medium leading-none tracking-tight text-zinc-900 dark:text-zinc-50">{selected.value}</p>
                <span className={`flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium ${statusBg[selected.status]} ${statusText[selected.status]}`}>
                  <StatusIcon size={14} strokeWidth={1.75} />
                  {statusLabel[selected.status]}
                </span>
              </div>
            </div>
            <div>
              <p className="text-xs font-medium text-zinc-400 dark:text-zinc-500 uppercase tracking-wide">Interpretación</p>
              <p className="mt-1.5 text-sm leading-relaxed text-zinc-600 dark:text-zinc-300">{selected.interpretation}</p>
            </div>
          </div>

          {/* Divisoria vertical */}
          <div className="hidden lg:block w-px shrink-0 mx-1 bg-zinc-200 dark:bg-zinc-800" />

          {/* Columna derecha — ¿Qué puedo hacer? (1.6fr) */}
          <div className="lg:flex-[1.6] flex flex-col">
            <p className="text-xs font-medium text-zinc-400 dark:text-zinc-500 uppercase tracking-wide">¿Qué puedo hacer?</p>
            <div className="mt-2.5 flex flex-col gap-2.5">
              {selected.actions.map((a, i) => (
                <div key={i} className={`flex items-start gap-3 rounded-lg border-l-2 ${statusBorder[selected.status]} bg-zinc-50 dark:bg-zinc-800/60 px-3 py-2.5`}>
                  <span className={`text-xs font-medium ${statusText[selected.status]}`}>{i + 1}</span>
                  <p className="text-sm leading-relaxed text-zinc-600 dark:text-zinc-300">{a}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Card>

      {/* 3. Grid de métricas */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
        {active.metrics.map((key) => {
          const m = metrics[key];
          const isActive = m.key === selectedKey;
          return (
            <button
              key={key}
              onClick={() => setSelectedKey(key)}
              className={`text-left rounded-2xl border p-4 transition-colors ${
                isActive
                  ? "border-zinc-900 dark:border-zinc-50 bg-zinc-50 dark:bg-zinc-800/60"
                  : "border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 hover:border-zinc-300 dark:hover:border-zinc-700"
              }`}
            >
              <div className="flex items-center justify-between gap-2">
                <p className="text-sm font-medium text-zinc-900 dark:text-zinc-50">{m.name}</p>
                <span className={`h-2 w-2 shrink-0 rounded-full ${dot[m.status]}`} />
              </div>
              <p className="mt-1.5 text-lg font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">{m.value}</p>
            </button>
          );
        })}
      </div>

      {/* 4. Insights automáticos */}
      <Card title="Insights automáticos" className="bg-zinc-50/60 dark:bg-zinc-800/30">
        <div className="space-y-3">
          {insights.map(({ icon: Icon, text, tag }, i) => (
            <div key={i} className="flex items-start gap-3">
              <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-500 dark:text-zinc-400">
                <Icon size={14} strokeWidth={1.75} />
              </span>
              <p className="flex-1 text-sm text-zinc-600 dark:text-zinc-300">{text}</p>
              <span className={`shrink-0 rounded-full px-2.5 py-0.5 text-xs font-medium ${tagStyles[tag]}`}>{tag}</span>
            </div>
          ))}
        </div>

        {/* 5. Barra de consulta inteligente */}
        <form
          onSubmit={(e) => { e.preventDefault(); setQuestion(""); }}
          className="mt-5 flex items-center gap-2 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 px-3 py-2"
        >
          <Sparkles size={16} className="text-zinc-400 dark:text-zinc-500 shrink-0" />
          <input
            type="text"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder="Consulta cualquier reporte... ej: ¿Cuál fue mi margen neto en Q1? ¿Qué cliente generó más ingresos en mayo?"
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
          Próximamente: respuestas generadas por IA a partir de los reportes y métricas disponibles en el sistema.
        </p>
      </Card>
    </div>
  );
}
