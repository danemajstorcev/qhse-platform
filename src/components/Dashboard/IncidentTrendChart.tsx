import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts'
import ChartTooltip from '../ui/ChartTooltip'
import { incidentTrend } from '../../data/mockData'

export default function IncidentTrendChart() {
  return (
    <div className="card">
      <div className="card-header">
        <div>
          <div className="card-title">Incident Trend</div>
          <div className="card-subtitle">Last 6 months by severity</div>
        </div>
      </div>
      <ResponsiveContainer width="100%" height={220}>
        <AreaChart data={incidentTrend} margin={{ top: 4, right: 4, left: -20, bottom: 0 }}>
          <defs>
            <linearGradient id="gCrit" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#DC2626" stopOpacity={0.25} />
              <stop offset="95%" stopColor="#DC2626" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="gMaj" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#FB923C" stopOpacity={0.25} />
              <stop offset="95%" stopColor="#FB923C" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="gMin" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#FBBF24" stopOpacity={0.2} />
              <stop offset="95%" stopColor="#FBBF24" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="var(--border-subtle)" />
          <XAxis dataKey="month" tick={{ fill: 'var(--text-muted)', fontSize: 11 }} axisLine={false} tickLine={false} />
          <YAxis tick={{ fill: 'var(--text-muted)', fontSize: 11 }} axisLine={false} tickLine={false} />
          <Tooltip content={<ChartTooltip />} />
          <Legend wrapperStyle={{ fontSize: 11, color: 'var(--text-muted)' }} />
          <Area type="monotone" dataKey="critical" name="Critical" stroke="#DC2626" fill="url(#gCrit)" strokeWidth={2} />
          <Area type="monotone" dataKey="major" name="Major" stroke="#FB923C" fill="url(#gMaj)" strokeWidth={2} />
          <Area type="monotone" dataKey="minor" name="Minor" stroke="#FBBF24" fill="url(#gMin)" strokeWidth={2} />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  )
}
