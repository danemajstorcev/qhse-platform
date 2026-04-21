import type { RiskLevel } from '../../types'

const LEVEL_CONFIG: Record<RiskLevel, { color: string; dim: string }> = {
  Critical: { color: 'var(--red)', dim: 'var(--red-dim)' },
  High: { color: '#FB923C', dim: 'rgba(251,146,60,0.12)' },
  Medium: { color: 'var(--amber)', dim: 'var(--amber-dim)' },
  Low: { color: 'var(--emerald)', dim: 'var(--emerald-dim)' },
}

interface Props {
  risks: { level: RiskLevel }[]
}

export default function RiskLevelStats({ risks }: Props) {
  return (
    <div className="stat-grid" style={{ gridTemplateColumns: 'repeat(4, 1fr)', marginBottom: 24 }}>
      {(['Critical', 'High', 'Medium', 'Low'] as RiskLevel[]).map(level => {
        const count = risks.filter(r => r.level === level).length
        const { color } = LEVEL_CONFIG[level]
        return (
          <div className="stat-card" key={level}>
            <div className="stat-card-accent" style={{ background: color }} />
            <div className="stat-card-value" style={{ color }}>{count}</div>
            <div className="stat-card-label">{level} Risks</div>
            <div style={{ marginTop: 6, height: 4, background: 'var(--surface-raised)', borderRadius: 99, overflow: 'hidden' }}>
              <div style={{ height: '100%', width: `${(count / risks.length) * 100}%`, background: color, borderRadius: 99 }} />
            </div>
          </div>
        )
      })}
    </div>
  )
}
