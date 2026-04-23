export default function RiskFormulaCard() {
  const levels = [
    { label: "Critical", range: "15–25", color: "#DC2626" },
    { label: "High", range: "9–14", color: "#EA580C" },
    { label: "Medium", range: "4–8", color: "#D97706" },
    { label: "Low", range: "1–3", color: "#059669" },
  ];

  return (
    <div className="card">
      <div className="card-title" style={{ marginBottom: 14 }}>
        Risk Formula
      </div>
      <div style={{ textAlign: "center", padding: "16px 0" }}>
        <div
          style={{
            fontSize: 16,
            fontWeight: 800,
            color: "var(--text-primary)",
            letterSpacing: -0.5,
          }}
        >
          Risk Score = Likelihood × Severity
        </div>
        <div style={{ fontSize: 12, color: "var(--text-muted)", marginTop: 8 }}>
          Scored 1–5 on each axis
        </div>
      </div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 8,
          marginTop: 8,
        }}
      >
        {levels.map((r) => (
          <div
            key={r.label}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              padding: "8px 12px",
              background: "var(--surface-raised)",
              borderRadius: "var(--radius-sm)",
            }}
          >
            <div
              style={{
                width: 10,
                height: 10,
                borderRadius: 3,
                background: r.color,
                flexShrink: 0,
              }}
            />
            <span
              style={{
                fontSize: 12,
                fontWeight: 600,
                color: "var(--text-primary)",
              }}
            >
              {r.label}
            </span>
            <span
              style={{
                fontSize: 11,
                color: "var(--text-muted)",
                marginLeft: "auto",
                fontFamily: "JetBrains Mono, monospace",
              }}
            >
              {r.range}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
