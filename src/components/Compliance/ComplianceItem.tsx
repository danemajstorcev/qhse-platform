type Status = 'Compliant' | 'Partial' | 'Non-Compliant' | 'N/A'

const STATUS_CONFIG: { status: Status; label: string; shortLabel: string; color: string }[] = [
  { status: 'Compliant',     label: 'Compliant',     shortLabel: '✓',   color: 'var(--emerald)' },
  { status: 'Partial',       label: 'Partial',        shortLabel: '~',   color: 'var(--amber)' },
  { status: 'Non-Compliant', label: 'Non-Compliant', shortLabel: '✗',   color: 'var(--red)' },
  { status: 'N/A',           label: 'N/A',            shortLabel: 'N/A', color: 'var(--text-muted)' },
]

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

export default function ComplianceItem({ item, clauseColor, onStatusChange }: Props) {
  return (
    <div style={{
      padding: '14px 0',
      borderBottom: '1px solid var(--border-subtle)',
    }}>
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: 16 }}>
        <span style={{
          fontFamily: 'JetBrains Mono, monospace',
          fontSize: 12,
          color: clauseColor,
          fontWeight: 700,
          minWidth: 56,
          paddingTop: 2,
          flexShrink: 0,
        }}>
          {item.clause}
        </span>

        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-primary)', marginBottom: 4, lineHeight: 1.4 }}>
            {item.requirement}
          </div>

          {item.evidence && (
            <div style={{ fontSize: 12, color: 'var(--text-muted)', marginBottom: 2 }}>
              <span style={{ marginRight: 4 }}>📎</span>{item.evidence}
            </div>
          )}
          {item.lastAudited && (
            <div style={{ fontSize: 11, color: 'var(--text-muted)', fontFamily: 'JetBrains Mono, monospace' }}>
              Last audited: {item.lastAudited}
            </div>
          )}

          <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginTop: 10 }}>
            {STATUS_CONFIG.map(({ status, label, shortLabel, color }) => {
              const isActive = item.status === status
              return (
                <button
                  key={status}
                  onClick={() => onStatusChange(item.id, status)}
                  style={{
                    padding: '5px 12px',
                    borderRadius: 99,
                    border: `1px solid ${isActive ? color : 'var(--border)'}`,
                    background: isActive ? color : 'transparent',
                    color: isActive ? (status === 'Non-Compliant' || status === 'Compliant' ? '#fff' : '#060E1C') : 'var(--text-muted)',
                    fontSize: 12,
                    fontWeight: 600,
                    cursor: 'pointer',
                    transition: 'all 0.15s ease',
                    whiteSpace: 'nowrap',
                    minHeight: 32,
                  }}
                  title={label}
                >
                  <span className="desktop-only" style={{ display: 'inline' }}>{label}</span>
                  <span className="mobile-only" style={{ display: 'none' }}>{shortLabel}</span>
                </button>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}
