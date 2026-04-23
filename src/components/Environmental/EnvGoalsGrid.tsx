import { envMetrics, envTargets } from "../../data/mockData";

type Metric = "emissions" | "waste" | "energy" | "water";

const METRIC_CONFIG: Record<
  Metric,
  { label: string; unit: string; color: string }
> = {
  emissions: { label: "CO₂ Emissions", unit: "tCO₂e", color: "#EF4444" },
  waste: { label: "Waste Generated", unit: "tonnes", color: "#F59E0B" },
  energy: { label: "Energy Consumption", unit: "MWh", color: "#60A5FA" },
  water: { label: "Water Usage", unit: "m³", color: "#34D399" },
};

export default function EnvGoalsGrid() {
  const latest = envMetrics[envMetrics.length - 1];
  const targets: Record<Metric, number> = {
    emissions: envTargets.emissions,
    waste: envTargets.waste,
    energy: envTargets.energy,
    water: envTargets.water,
  };

  return (
    <div className="card">
      <div className="card-header">
        <div className="card-title">Goals vs Actual — Year End Projection</div>
      </div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          gap: 16,
        }}
      >
        {(
          Object.entries(METRIC_CONFIG) as [
            Metric,
            (typeof METRIC_CONFIG)[Metric],
          ][]
        ).map(([key, cfg]) => {
          const current = latest[key];
          const target = targets[key];
          const pct = Math.round((current / target) * 100);
          const onTrack = current <= target;

          return (
            <div
              key={key}
              style={{
                padding: 16,
                background: "var(--surface-raised)",
                borderRadius: "var(--radius)",
                border: `1px solid ${onTrack ? "var(--emerald-dim)" : "var(--red-dim)"}`,
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginBottom: 8,
                }}
              >
                <span
                  style={{
                    fontSize: 12,
                    fontWeight: 600,
                    color: "var(--text-secondary)",
                  }}
                >
                  {cfg.label}
                </span>
                <span
                  style={{
                    fontSize: 11,
                    fontWeight: 700,
                    color: onTrack ? "var(--emerald)" : "var(--red)",
                    background: onTrack
                      ? "var(--emerald-dim)"
                      : "var(--red-dim)",
                    padding: "2px 8px",
                    borderRadius: 99,
                  }}
                >
                  {onTrack ? "✓ On Track" : "⚠ Over Target"}
                </span>
              </div>

              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginBottom: 10,
                }}
              >
                <div>
                  <div
                    style={{
                      fontSize: 11,
                      color: "var(--text-muted)",
                      marginBottom: 2,
                    }}
                  >
                    Current
                  </div>
                  <div
                    style={{
                      fontSize: 18,
                      fontWeight: 800,
                      color: cfg.color,
                      fontFamily: "JetBrains Mono, monospace",
                    }}
                  >
                    {current.toLocaleString()}
                  </div>
                </div>
                <div style={{ textAlign: "right" }}>
                  <div
                    style={{
                      fontSize: 11,
                      color: "var(--text-muted)",
                      marginBottom: 2,
                    }}
                  >
                    Target
                  </div>
                  <div
                    style={{
                      fontSize: 18,
                      fontWeight: 800,
                      color: "var(--text-secondary)",
                      fontFamily: "JetBrains Mono, monospace",
                    }}
                  >
                    {target.toLocaleString()}
                  </div>
                </div>
              </div>

              <div className="metric-progress-bar" style={{ height: 6 }}>
                <div
                  className="metric-progress-fill"
                  style={{
                    width: `${Math.min(100, pct)}%`,
                    background: onTrack ? cfg.color : "var(--red)",
                  }}
                />
              </div>

              <div
                style={{
                  marginTop: 6,
                  fontSize: 11,
                  color: "var(--text-muted)",
                  textAlign: "right",
                }}
              >
                {pct}% of target · {cfg.unit}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
