import { envMetrics, envTargets } from "../../data/mockData";

type Metric = "emissions" | "waste" | "energy" | "water";

const METRIC_CONFIG: Record<
  Metric,
  { label: string; unit: string; color: string; target: number }
> = {
  emissions: {
    label: "CO₂ Emissions",
    unit: "tCO₂e",
    color: "#EF4444",
    target: envTargets.emissions,
  },
  waste: {
    label: "Waste Generated",
    unit: "tonnes",
    color: "#F59E0B",
    target: envTargets.waste,
  },
  energy: {
    label: "Energy Consumption",
    unit: "MWh",
    color: "#60A5FA",
    target: envTargets.energy,
  },
  water: {
    label: "Water Usage",
    unit: "m³",
    color: "#34D399",
    target: envTargets.water,
  },
};

function calcTrend(metric: Metric) {
  const first = envMetrics[0][metric];
  const last = envMetrics[envMetrics.length - 1][metric];
  return Math.round(((last - first) / first) * 100);
}

interface Props {
  activeMetric: Metric;
  onSelect: (metric: Metric) => void;
}

export default function EnvMetricCards({ activeMetric, onSelect }: Props) {
  const latest = envMetrics[envMetrics.length - 1];

  return (
    <div className="metric-cards">
      {(
        Object.entries(METRIC_CONFIG) as [
          Metric,
          (typeof METRIC_CONFIG)[Metric],
        ][]
      ).map(([key, cfg]) => {
        const val = latest[key];
        const pct = Math.min(100, Math.round((val / cfg.target) * 100));
        const trend = calcTrend(key);

        return (
          <div
            key={key}
            className="metric-card"
            style={{
              cursor: "pointer",
              border:
                activeMetric === key ? `1px solid ${cfg.color}` : undefined,
              boxShadow:
                activeMetric === key ? `0 0 0 1px ${cfg.color}30` : undefined,
            }}
            onClick={() => onSelect(key)}
          >
            <div className="metric-label">{cfg.label}</div>
            <div className="metric-value" style={{ color: cfg.color }}>
              {val.toLocaleString()}
            </div>
            <div style={{ fontSize: 11, color: "var(--text-muted)" }}>
              {cfg.unit} · Target: {cfg.target.toLocaleString()} {cfg.unit}
            </div>
            <div className="metric-progress-bar">
              <div
                className="metric-progress-fill"
                style={{
                  width: `${pct}%`,
                  background:
                    pct > 100
                      ? "var(--red)"
                      : pct > 80
                        ? "var(--amber)"
                        : cfg.color,
                }}
              />
            </div>
            <div
              style={{
                marginTop: 8,
                fontSize: 11,
                fontWeight: 700,
                color: trend < 0 ? "var(--emerald)" : "var(--red)",
              }}
            >
              {trend < 0 ? "↓" : "↑"} {Math.abs(trend)}% YTD
            </div>
          </div>
        );
      })}
    </div>
  );
}
