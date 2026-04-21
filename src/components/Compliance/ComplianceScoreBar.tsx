interface Props {
  score: number
  color: string
}

export default function ComplianceScoreBar({ score, color }: Props) {
  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginBottom: 20,
      padding: 16,
      background: 'var(--surface-raised)',
      borderRadius: 'var(--radius)',
      border: '1px solid var(--border)',
    }}>
      <div>
        <div style={{ fontSize: 13, color: 'var(--text-muted)', marginBottom: 4 }}>Overall compliance score</div>
        <div style={{ fontSize: 32, fontWeight: 800, color, fontFamily: 'JetBrains Mono, monospace', letterSpacing: -1 }}>
          {score}%
        </div>
      </div>
      <div style={{ width: 120 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6, fontSize: 12 }}>
          <span style={{ color: 'var(--text-muted)' }}>Progress</span>
          <span style={{ color, fontWeight: 700 }}>{score}%</span>
        </div>
        <div className="compliance-bar-track" style={{ height: 10 }}>
          <div className="compliance-bar-fill" style={{ width: `${score}%`, background: color }} />
        </div>
      </div>
    </div>
  )
}
