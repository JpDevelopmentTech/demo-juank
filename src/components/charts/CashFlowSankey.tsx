"use client";

import { Sankey, Tooltip, ResponsiveContainer, Layer, Rectangle } from "recharts";

const data = {
  nodes: [
    { name: "Regalías" },
    { name: "Ads" },
    { name: "Music Business" },
    { name: "Ingreso Bruto" },
    { name: "Nómina" },
    { name: "Operación" },
    { name: "Egresos" },
    { name: "Utilidad Neta" },
  ],
  links: [
    { source: 0, target: 3, value: 12400 },
    { source: 1, target: 3, value: 7800 },
    { source: 2, target: 3, value: 5700 },
    { source: 3, target: 6, value: 16500 },
    { source: 6, target: 4, value: 7200 },
    { source: 6, target: 5, value: 9300 },
    { source: 3, target: 7, value: 9400 },
  ],
};

const grays = ["#52525b", "#71717a", "#a1a1aa", "#18181b", "#d4d4d8", "#a1a1aa", "#71717a", "#18181b"];

function CustomNode({ x, y, width, height, index, payload }: any) {
  return (
    <Layer>
      <Rectangle x={x} y={y} width={width} height={height} fill={grays[index % grays.length]} fillOpacity={0.9} />
      <text
        x={x + width / 2}
        y={y - 8}
        textAnchor="middle"
        fontSize={12}
        fill="#71717a"
      >
        {payload.name}
      </text>
    </Layer>
  );
}

export default function CashFlowSankey() {
  return (
    <div className="h-96">
      <ResponsiveContainer width="100%" height="100%">
        <Sankey
          data={data}
          node={<CustomNode />}
          nodePadding={28}
          margin={{ top: 24, bottom: 24, left: 16, right: 16 }}
          link={{ stroke: "#a1a1aa", strokeOpacity: 0.25 }}
        >
          <Tooltip
            formatter={(v) => `$${Number(v ?? 0).toLocaleString()}`}
            contentStyle={{ borderRadius: 12, border: "1px solid #e4e4e7", fontSize: 12 }}
          />
        </Sankey>
      </ResponsiveContainer>
    </div>
  );
}
