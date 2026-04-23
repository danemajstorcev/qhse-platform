import type { RiskLevel } from "../../types";

const LEVEL_CONFIG: Record<RiskLevel, { color: string }> = {
  Critical: { color: "var(--red)" },
  High: { color: "#FB923C" },
  Medium: { color: "var(--amber)" },
  Low: { color: "var(--emerald)" },
};

interface Props {
  risks: { level: RiskLevel }[];
}

export default function RiskLevelStats({ risks }: Props) {
  return (
    <div className="stat-grid stat-grid-4" style={{ marginBottom: 24 }}>
      {(["Critical", "High", "Medium", "Low"] as RiskLevel[]).map((level) => {
        const count = risks.filter((r) => r.level === level).length;
        const { color } = LEVEL_CONFIG[level];
        return (
          <div className="stat-card" key={level}>
            <div className="stat-card-accent" style={{ background: color }} />
            <div className="stat-card-value" style={{ color }}>
              {count}
            </div>
            <div className="stat-card-label">{level} Risks</div>
            <div
              style={{
                marginTop: 6,
                height: 4,
                background: "var(--surface-raised)",
                borderRadius: 99,
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  height: "100%",
                  width: risks.length
                    ? `${(count / risks.length) * 100}%`
                    : "0%",
                  background: color,
                  borderRadius: 99,
                }}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}
