import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { incidentTrend } from "../../data/mockData";

export default function IncidentMonthlyChart() {
  return (
    <div className="card" style={{ marginBottom: 20 }}>
      <div className="card-header">
        <div className="card-title">Monthly Incident Trend</div>
      </div>
      <ResponsiveContainer width="100%" height={200}>
        <BarChart
          data={incidentTrend}
          margin={{ top: 4, right: 4, left: -20, bottom: 0 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="var(--border-subtle)" />
          <XAxis
            dataKey="month"
            tick={{ fill: "var(--text-muted)", fontSize: 11 }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            tick={{ fill: "var(--text-muted)", fontSize: 11 }}
            axisLine={false}
            tickLine={false}
          />
          <Tooltip
            contentStyle={{
              background: "var(--surface)",
              border: "1px solid var(--border)",
              borderRadius: 8,
              fontSize: 12,
            }}
          />
          <Legend wrapperStyle={{ fontSize: 11, color: "var(--text-muted)" }} />
          <Bar dataKey="critical" name="Critical" fill="#DC2626" stackId="a" />
          <Bar dataKey="major" name="Major" fill="#FB923C" stackId="a" />
          <Bar dataKey="minor" name="Minor" fill="#FBBF24" stackId="a" />
          <Bar
            dataKey="nearMiss"
            name="Near Miss"
            fill="#60A5FA"
            stackId="a"
            radius={[4, 4, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
