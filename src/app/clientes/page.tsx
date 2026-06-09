import PageShell from "@/components/PageShell";
import { Card, Badge, Table, NewItemButton } from "@/components/ui";
import { Star } from "lucide-react";

const rows = [
  ["Maluma", "Artista", "Colombia", "Activo", <Star key="1" size={14} className="fill-amber-400 text-amber-400" />, "$48,200", "$31,000"],
  ["Karol G", "Artista", "Colombia", "Activo", <Star key="2" size={14} className="fill-amber-400 text-amber-400" />, "$62,500", "$38,400"],
  ["+Vallenato", "Sello", "Colombia", "Activo", "—", "$21,300", "$15,600"],
  ["Manuel Turizo", "Artista", "Colombia", "Prospecto", "—", "$0", "$0"],
  ["Visual Films", "Agencia", "México", "Activo", "—", "$8,400", "$6,200"],
];

export default function ClientesPage() {
  return (
    <PageShell title="Clientes">
      <div className="flex items-center justify-end">
        <NewItemButton label="Nuevo cliente" />
      </div>

      <section className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card>
          <p className="text-sm text-zinc-500 dark:text-zinc-400">Clientes activos</p>
          <p className="mt-2 text-2xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">4</p>
        </Card>
        <Card>
          <p className="text-sm text-zinc-500 dark:text-zinc-400">Clientes estratégicos</p>
          <p className="mt-2 text-2xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">2</p>
        </Card>
        <Card>
          <p className="text-sm text-zinc-500 dark:text-zinc-400">Facturación total</p>
          <p className="mt-2 text-2xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">$140,400</p>
        </Card>
      </section>

      <Card title="Directorio de clientes">
        <Table
          columns={["Nombre", "Tipo", "País", "Estado", "Estratégico", "Facturación", "Utilidad"]}
          rows={rows.map((r) => [
            r[0],
            r[1],
            r[2],
            <Badge key={`s-${r[0]}`} color={r[3] === "Activo" ? "green" : "gray"}>{r[3]}</Badge>,
            r[4],
            r[5],
            r[6],
          ])}
        />
      </Card>
    </PageShell>
  );
}
