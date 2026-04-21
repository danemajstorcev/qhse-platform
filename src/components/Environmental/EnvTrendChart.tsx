import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ReferenceLine, ResponsiveContainer } from 'recharts'
import { envMetrics } from '../../data/mockData'

type Metric = 'emissions' | 'waste' | 'energy' | 'water'

interface Config {
  label: string
  unit: string
  color: string
  target: number
}

interface Props {
  activeMetric: Metric
  config: Config
}

export default function EnvTrendChart({ activeMetric, config }: Props) {
  return (
    <div className="card" style={{ marginBottom: 20 }}>
      <div className="card-header">
        <div>
          <div className="card-title">{config.label} — Monthly Trend</div>
          <div className="card-subtitle">Actual vs target ({config.unit})</div>
        </div>
        <div style={{ display: 'flex', gap: 16, fontSize: 12 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <div style={{ width: 12, height: 3, background: config.color, borderRadius: 2 }} />
            <span style={{ color: 'var(--text-muted)' }}>Actual</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <div style={{ width: 12, height: 2, background: 'var(--red)', borderRadius: 2 }} />
            <span style={{ color: 'var(--text-muted)' }}>Target</span>
          </div>
        </div>
      </div>
      <ResponsiveContainer width="100%" height={260}>
        <AreaChart data={envMetrics} margin={{ top: 8, right: 8, left: -10, bottom: 0 }}>
          <defs>
            <linearGradient id="envGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor={config.color} stopOpacity={0.2} />
              <stop offset="95%" stopColor={config.color} stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="var(--border-subtle)" />
          <XAxis dataKey="month" tick={{ fill: 'var(--text-muted)', fontSize: 11 }} axisLine={false} tickLine={false} />
          <YAxis tick={{ fill: 'var(--text-muted)', fontSize: 11 }} axisLine={false} tickLine={false} />
          <Tooltip
            contentStyle={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 8, fontSize: 12 }}
            formatter={(v: number) => [`${v.toLocaleString()} ${config.unit}`, config.label]}
          />
          <ReferenceLine
            y={config.target}
            stroke="var(--red)"
            strokeDasharray="5 5"
            strokeWidth={1.5}
            label={{ value: `Target: ${config.target}`, position: 'right', fontSize: 10, fill: 'var(--red)' }}
          />
          <Area
            type="monotone"
            dataKey={activeMetric}
            stroke={config.color}
            fill="url(#envGrad)"
            strokeWidth={2.5}
            dot={{ r: 3, fill: config.color }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  )
}
