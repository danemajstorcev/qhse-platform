interface Props {
  value: string | number;
  label: string;
  color: string;
  change?: string;
  changeType?: "positive" | "negative" | "neutral";
}

export default function StatCard({
  value,
  label,
  color,
  change,
  changeType,
}: Props) {
  return (
    <div className="stat-card">
      <div className="stat-card-accent" style={{ background: color }} />
      <div className="stat-card-value" style={{ color }}>
        {value}
      </div>
      <div className="stat-card-label">{label}</div>
      {change && (
        <span className={`stat-card-change ${changeType ?? "neutral"}`}>
          {change}
        </span>
      )}
    </div>
  );
}
