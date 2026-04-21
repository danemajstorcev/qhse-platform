type Status = 'Compliant' | 'Partial' | 'Non-Compliant' | 'N/A'

const LEGEND = [
  { label: 'Compliant', color: 'var(--emerald)' },
  { label: 'Partial', color: 'var(--amber)' },
  { label: 'Non-Compliant', color: 'var(--red)' },
  { label: 'N/A', color: 'var(--text-muted)' },
] as const

interface Props {
  items: { status: Status }[]
}

export default function ComplianceLegend({ items }: Props) {
  return (
    <div style={{ marginTop: 16, padding: '12px 0', display: 'flex', gap: 20, flexWrap: 'wrap' }}>
      {LEGEND.map(({ label, color }) => (
        <div key={label} style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 12 }}>
          <div style={{ width: 8, height: 8, borderRadius: 2, background: color }} />
          <span style={{ color: 'var(--text-muted)' }}>{label}:</span>
          <span style={{ color, fontWeight: 700 }}>{items.filter(i => i.status === label).length}</span>
        </div>
      ))}
    </div>
  )
}
