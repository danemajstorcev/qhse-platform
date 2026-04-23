import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";

const STANDARD_COLORS = ["#60A5FA", "#34D399", "#FB923C", "#8B5CF6"];

interface Props {
  data: { standard: string; pct: number }[];
}

export default function ComplianceByStandardChart({ data }: Props) {
  return (
    <div className="card">
      <div className="card-header">
        <div>
          <div className="card-title">Compliance by Standard</div>
          <div className="card-subtitle">% compliant clauses</div>
        </div>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        <ResponsiveContainer width="100%" height={180}>
          <PieChart>
            <Pie
              data={data}
              dataKey="pct"
              cx="50%"
              cy="50%"
              innerRadius={50}
              outerRadius={75}
              paddingAngle={3}
            >
              {data.map((_, i) => (
                <Cell key={i} fill={STANDARD_COLORS[i]} />
              ))}
            </Pie>
            <Tooltip
              formatter={(v) => `${v}%`}
              contentStyle={{
                background: "var(--surface)",
                border: "1px solid var(--border)",
                borderRadius: 8,
                fontSize: 12,
              }}
            />
          </PieChart>
        </ResponsiveContainer>

        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {data.map((s, i) => (
            <div key={s.standard}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginBottom: 5,
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <div
                    style={{
                      width: 10,
                      height: 10,
                      borderRadius: 3,
                      background: STANDARD_COLORS[i],
                      flexShrink: 0,
                    }}
                  />
                  <span
                    style={{
                      fontSize: 12,
                      fontWeight: 600,
                      color: "var(--text-secondary)",
                    }}
                  >
                    {s.standard}
                  </span>
                </div>
                <span
                  style={{
                    fontSize: 12,
                    fontWeight: 700,
                    color: "var(--text-primary)",
                    fontFamily: "JetBrains Mono, monospace",
                  }}
                >
                  {s.pct}%
                </span>
              </div>
              <div className="compliance-bar-track">
                <div
                  className="compliance-bar-fill"
                  style={{ width: `${s.pct}%`, background: STANDARD_COLORS[i] }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
