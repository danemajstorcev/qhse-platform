type Status = 'Compliant' | 'Partial' | 'Non-Compliant' | 'N/A'

const BUTTON_LABELS: Record<Status, string> = {
  Compliant: '✓',
  Partial: '~',
  'Non-Compliant': '✗',
  'N/A': 'N/A',
}

const ACTIVE_COLORS: Record<Status, string> = {
  Compliant: 'var(--emerald)',
  Partial: 'var(--amber)',
  'Non-Compliant': 'var(--red)',
  'N/A': 'var(--text-muted)',
}

interface Item {
  id: string
  clause: string
  requirement: string
  status: Status
  evidence?: string
  lastAudited?: string
}

interface Props {
  item: Item
  clauseColor: string
  onStatusChange: (id: string, status: Status) => void
}

const ALL_STATUSES: Status[] = ['Compliant', 'Partial', 'Non-Compliant', 'N/A']

export default function ComplianceItem({ item, clauseColor, onStatusChange }: Props) {
  return (
    <div style={{ display: 'flex', alignItems: 'flex-start', gap: 16, padding: '14px 0', borderBottom: '1px solid var(--border-subtle)' }}>
      <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 12, color: clauseColor, fontWeight: 700, minWidth: 60, paddingTop: 2 }}>
        {item.clause}
      </span>

      <div style={{ flex: 1 }}>
        <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-primary)', marginBottom: 4 }}>
          {item.requirement}
        </div>
        {item.evidence && (
          <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>
            <span style={{ marginRight: 4 }}>📎</span>{item.evidence}
          </div>
        )}
        {item.lastAudited && (
          <div style={{ fontSize: 11, color: 'var(--text-muted)', marginTop: 3, fontFamily: 'JetBrains Mono, monospace' }}>
            Last audited: {item.lastAudited}
          </div>
        )}
      </div>

      <div style={{ display: 'flex', gap: 6, flexShrink: 0 }}>
        {ALL_STATUSES.map(s => (
          <button
            key={s}
            className="btn btn-sm btn-ghost"
            style={item.status === s ? { background: ACTIVE_COLORS[s], color: '#fff', borderColor: 'transparent' } : {}}
            onClick={() => onStatusChange(item.id, s)}
          >
            {BUTTON_LABELS[s]}
          </button>
        ))}
      </div>
    </div>
  )
}
