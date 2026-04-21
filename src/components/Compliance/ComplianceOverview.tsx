import type { ISOStandard } from '../../types'

type Status = 'Compliant' | 'Partial' | 'Non-Compliant' | 'N/A'

const STANDARD_COLORS: Record<ISOStandard, string> = {
  'ISO 9001': 'var(--blue)',
  'ISO 14001': 'var(--emerald)',
  'ISO 45001': '#FB923C',
  'ISO 27001': 'var(--accent-violet)',
}

function calcScore(items: { status: Status }[]) {
  const applicable = items.filter(i => i.status !== 'N/A')
  if (!applicable.length) return 0
  const compliant = items.filter(i => i.status === 'Compliant').length
  const partial = items.filter(i => i.status === 'Partial').length
  return Math.round(((compliant + partial * 0.5) / applicable.length) * 100)
}

interface Props {
  data: Record<string, { status: Status }[]>
  activeStandard: ISOStandard
  onSelect: (standard: ISOStandard) => void
}

export default function ComplianceOverview({ data, activeStandard, onSelect }: Props) {
  const standards = Object.keys(data) as ISOStandard[]

  return (
    <div className="stat-grid" style={{ gridTemplateColumns: 'repeat(4, 1fr)', marginBottom: 28 }}>
      {standards.map(s => {
        const score = calcScore(data[s] as { status: Status }[])
        const color = STANDARD_COLORS[s]
        const compliant = data[s].filter(i => i.status === 'Compliant').length
        const nc = data[s].filter(i => i.status === 'Non-Compliant').length

        return (
          <div
            key={s}
            className="stat-card"
            style={{ cursor: 'pointer', border: activeStandard === s ? `1px solid ${color}` : undefined }}
            onClick={() => onSelect(s)}
          >
            <div className="stat-card-accent" style={{ background: color }} />
            <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 10 }}>
              <span className={`iso-chip iso-${s.toLowerCase().replace(' ', '')}`}>{s}</span>
              <span style={{ fontSize: 20, fontWeight: 800, color, fontFamily: 'JetBrains Mono, monospace' }}>{score}%</span>
            </div>
            <div style={{ marginBottom: 8 }}>
              <div className="compliance-bar-track">
                <div className="compliance-bar-fill" style={{ width: `${score}%`, background: color }} />
              </div>
            </div>
            <div style={{ display: 'flex', gap: 12, fontSize: 11 }}>
              <span style={{ color: 'var(--emerald)' }}>✓ {compliant} compliant</span>
              {nc > 0 && <span style={{ color: 'var(--red)' }}>✗ {nc} NC</span>}
            </div>
          </div>
        )
      })}
    </div>
  )
}
